describe("Category Management ZLM", () => {

  beforeEach(() => {

    // Login
    cy.viewport(1920, 1080)

    cy.visit("https://zlm.hummatech.com/login")

    cy.get("#email").type("admin@zlm.id")
    cy.get("#password").type("admin123")

    cy.get("#login-btn").click()

    cy.url().should("include", "/admin")

    // Buka menu kategori
    cy.visit("https://zlm.hummatech.com/admin/categories")

  })

  // ============================================
  // CATEGORY-001
  // Menampilkan halaman kategori
  // ============================================
  it("CATEGORY-001 - Menampilkan halaman kategori", () => {

    cy.get("h1")
      .should("contain", "Kategori")

    cy.contains("Manage product categories")
      .should("be.visible")

  })


  // ============================================
  // CATEGORY-002
  // Mencari kategori
  // ============================================
  it("CATEGORY-002 - Mencari kategori", () => {

    cy.get('input[name="search"]')
      .type("Gaming{enter}")

    cy.contains("Gaming")
      .should("be.visible")

  })


  // ============================================
  // CATEGORY-003
  // Membuka halaman tambah kategori
  // ============================================
  it("CATEGORY-003 - Membuka halaman tambah kategori", () => {

    cy.contains("Add Category")
      .click()

    cy.url()
      .should("include", "/create")

  })


  // ============================================
  // CATEGORY-004
  // Membuka halaman edit kategori
  // ============================================
  it("CATEGORY-004 - Membuka halaman edit kategori", () => {

    cy.get('a[href*="/edit"]')
      .first()
      .click()

    cy.url()
      .should("include", "/edit")

  })


  // ============================================
  // CATEGORY-005
  // Menghapus kategori
  // ============================================
  it("CATEGORY-005 - Menghapus kategori", () => {

    cy.on("window:confirm", () => true)

    cy.get('form button')
      .last()
      .click({ force: true })

  })
 // ============================================
// CATEGORY-006 - Menambahkan kategori baru
// ============================================
it("CATEGORY-006 - Menambahkan kategori baru", () => {

  // Buka halaman tambah kategori
  cy.contains("Add Category").click()

  cy.url().should("include", "/categories/create")

  // Isi nama kategori
  cy.get('input[name="name"]')
    .type("Automation Testing")

  // Isi icon
  cy.get('input[name="icon"]')
    .clear()
    .type("solar:gamepad-linear")

  // Isi deskripsi
  cy.get('textarea[name="description"]')
    .type("Kategori untuk pengujian automation menggunakan Cypress.")

  // Status Active (jika belum tercentang)
  cy.get('input[type="checkbox"]')
    .check({ force: true })

  // Klik tombol Create Category
  cy.contains("Create Category")
    .click()

  // Validasi kembali ke halaman kategori
  cy.url()
    .should("include", "/admin/categories")

  // Validasi data berhasil ditambahkan
  cy.contains("Automation Testing")
    .should("be.visible")

})
})