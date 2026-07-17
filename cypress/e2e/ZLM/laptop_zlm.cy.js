describe("Laptop Management ZLM", () => {

  beforeEach(() => {

    // Menggunakan tampilan desktop agar sidebar tidak hidden
    cy.viewport(1400, 900)

    // Login
    cy.visit("https://zlm.hummatech.com/login")

    cy.get("#email", { timeout: 10000 })
      .should("be.visible")
      .and("not.be.disabled")
      .clear()
      .type("admin@zlm.id")

    cy.get("#password")
      .should("be.visible")
      .and("not.be.disabled")
      .clear()
      .type("admin123")

    cy.get("#login-btn")
      .should("be.visible")
      .click()

    cy.url({ timeout: 10000 })
      .should("include", "/admin")

    // Masuk ke halaman Laptop
    cy.visit("https://zlm.hummatech.com/admin/laptops")

    cy.url()
      .should("include", "/admin/laptops")
  })


  // =====================================================
  // LAPTOP-001
  // =====================================================
  it("LAPTOP-001 - Menampilkan halaman daftar laptop", () => {

    cy.get("h1")
      .should("contain", "Laptop")

    cy.get("table")
      .should("be.visible")

    cy.get("tbody tr")
      .its("length")
      .should("be.greaterThan", 0)

  })


  // =====================================================
  // LAPTOP-002
  // =====================================================
  it("LAPTOP-002 - Mencari data laptop", () => {

    cy.get('input[name="search"]')
      .should("be.visible")
      .clear()
      .type("ASUS")

    cy.wait(1500)

    cy.contains("ASUS")
      .should("exist")

  })


  // =====================================================
  // LAPTOP-003
  // =====================================================
  it("LAPTOP-003 - Membuka halaman tambah laptop", () => {

    cy.contains("Add Laptop")
      .should("be.visible")
      .click()

    cy.url()
      .should("include", "/admin/laptops/create")

    cy.get("form")
      .should("be.visible")

  })


  // =====================================================
  // LAPTOP-004
  // =====================================================
  it("LAPTOP-004 - Membuka detail laptop", () => {

    cy.get('a[title="Lihat Detail"]')
      .first()
      .should("exist")
      .click()

    cy.url()
      .should("match", /\/admin\/laptops\/.+/)

  })


  // =====================================================
  // LAPTOP-005
  // =====================================================
  it("LAPTOP-005 - Membuka halaman edit laptop", () => {

    cy.visit("https://zlm.hummatech.com/admin/laptops")

    cy.get('a[title="Edit"]')
      .first()
      .should("exist")
      .click()

    cy.url()
      .should("include", "/edit")

  })


  // =====================================================
  // LAPTOP-006
  // =====================================================
  it("LAPTOP-006 - Menghapus data laptop", () => {

    cy.visit("https://zlm.hummatech.com/admin/laptops")

    cy.on("window:confirm", () => true)

    cy.get('button[title="Delete"]')
      .first()
      .should("exist")
      .click()

  })
// =====================================================
// LAPTOP-007
// Menambahkan Laptop Baru
// =====================================================
it("LAPTOP-007 - Menambahkan Laptop Baru", () => {

  const laptopName = `Automation Laptop ${Date.now()}`

  cy.contains("Add Laptop")
    .should("be.visible")
    .click()

  cy.url().should("include", "/admin/laptops/create")

  // ==========================
  // Nama
  // ==========================
  cy.get('input[name="name"]')
    .type(laptopName)

  // ==========================
  // Brand
  // ==========================
  cy.get('input[name="brand"]')
    .type("ASUS")

  // ==========================
  // Description (TRIX)
  // ==========================
  cy.window().then((win) => {
    const input = win.document.querySelector("#description")
    input.value = "Laptop untuk pengujian automation menggunakan Cypress."
    input.dispatchEvent(new Event("input", { bubbles: true }))
    input.dispatchEvent(new Event("change", { bubbles: true }))
  })

  // ==========================
  // Harga
  // ==========================
  cy.get('input[name="price"]')
    .type("15000000")

  // ==========================
  // Stock
  // ==========================
  cy.get('input[name="stock"]')
    .clear()
    .type("10")

  // ==========================
  // Processor
  // ==========================
  cy.get('input[name="processor"]')
    .type("Intel Core i7")

  // ==========================
  // RAM
  // ==========================
  cy.get('input[name="ram"]')
    .type("16 GB")

  // ==========================
  // Storage
  // ==========================
  cy.get('input[name="storage"]')
    .type("512 GB SSD")

  // ==========================
  // Graphics
  // ==========================
  cy.get('input[name="graphics"]')
    .type("NVIDIA RTX 4060")

  // ==========================
  // Display
  // ==========================
  cy.get('input[name="display"]')
    .type('15.6" FHD IPS')

  // ==========================
  // Weight
  // ==========================
  cy.get('input[name="weight"]')
    .type("1.8")

  // ==========================
  // Battery
  // ==========================
  cy.get('input[name="battery_life"]')
    .type("10 Jam")

  // ==========================
  // Upload Gambar
  // ==========================

  // ==========================
  // Kelebihan (TRIX)
  // ==========================
  cy.window().then((win) => {
    const input = win.document.querySelector("#kelebihan")
    input.value = "Performa tinggi\nSSD cepat\nRingan"
    input.dispatchEvent(new Event("input", { bubbles: true }))
    input.dispatchEvent(new Event("change", { bubbles: true }))
  })

  // ==========================
  // Kekurangan (TRIX)
  // ==========================
  cy.window().then((win) => {
    const input = win.document.querySelector("#kekurangan")
    input.value = "Harga cukup mahal"
    input.dispatchEvent(new Event("input", { bubbles: true }))
    input.dispatchEvent(new Event("change", { bubbles: true }))
  })

  // ==========================
  // Pilih Category
  // ==========================
  cy.contains("label", "Automation Testing")
    .find('input[type="checkbox"]')
    .check({ force: true })

  // ==========================
  // Featured
  // ==========================
  cy.get("#is_featured")
    .check({ force: true })

  // ==========================
  // Monitor Request
  // ==========================
  cy.intercept("POST", "**/admin/laptops")
    .as("createLaptop")

  // ==========================
  // Submit
  // ==========================
  cy.contains("Create Laptop")
    .click()

  // ==========================
  // Validasi Response
  // ==========================
  cy.wait("@createLaptop").then(({ response }) => {

    expect([200, 302]).to.include(response.statusCode)

  })

  // ==========================
  // Validasi Halaman
  // ==========================
  cy.url({ timeout: 10000 })
    .should("include", "/admin/laptops")

  cy.contains(laptopName)
    .should("exist")

})
})