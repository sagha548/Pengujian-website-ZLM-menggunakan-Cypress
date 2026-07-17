describe("Hero Slider ZLM", () => {

  beforeEach(() => {
    cy.visit("https://zlm.hummatech.com/login")

    cy.get("#email").type("admin@zlm.id")
    cy.get("#password").type("admin123")
    cy.get("#login-btn").click()

    cy.url().should("include", "/admin")

    cy.visit("https://zlm.hummatech.com/admin/sliders")
  })

  // ============================
  // SLD-001 Menampilkan daftar Hero Slider
  // ============================

  it("SLD-001 - Menampilkan daftar Hero Slider", () => {

    cy.contains("Hero Slider").should("exist")

    cy.get("table").should("exist")

    cy.get("tbody tr")
      .its("length")
      .should("be.greaterThan", 0)

  })

  // ============================
  // SLD-002 Menambahkan Hero Slider
  // ============================

  it("SLD-002 - Menambahkan Hero Slider", () => {

    cy.contains("Tambah Slider").click()

    cy.url().should("include", "/create")

    cy.get("#title")
      .type("Slider Cypress")

    cy.get("#subtitle")
      .type("Automation Testing")

    cy.get("#description")
      .type("Slider dibuat menggunakan Cypress Automation")

    cy.get("#button_text")
      .type("Lihat Produk")

    cy.get("#button_url")
      .type("/products")

    cy.get("#sort_order")
      .clear()
      .type("10")

    cy.get("#is_active")
      .check({ force: true })

    cy.get("#image")
      .selectFile("cypress/fixtures/slider.jpg", {
        force: true
      })

    cy.contains("button", "Save Slider").click()

    cy.url().should("include", "/admin/sliders")

  })

  // ============================
  // SLD-003 Mengedit Hero Slider
  // ============================

  it("SLD-003 - Mengedit Hero Slider", () => {

    cy.get('a[title="Edit"]')
      .first()
      .click()

    cy.get("#title")
      .clear()
      .type("Slider Cypress Update")

    cy.get("#subtitle")
      .clear()
      .type("Subtitle Update")

    cy.get("#description")
      .clear()
      .type("Deskripsi telah diupdate")

    cy.get("#button_text")
      .clear()
      .type("Belanja Sekarang")

    cy.get("#button_url")
      .clear()
      .type("/shop")

    cy.get("#sort_order")
      .clear()
      .type("2")

    cy.contains("button", /save|update/i)
      .click()

    cy.url().should("include", "/admin/sliders")

  })

  // ============================
  // SLD-004 Menghapus Hero Slider
  // ============================

  it("SLD-004 - Menghapus Hero Slider", () => {

    cy.on("window:confirm", () => true)

    cy.get('button[title="Delete"]')
      .first()
      .click()

  })

  // ============================
  // SLD-005 Validasi data kosong
  // ============================

  it("SLD-005 - Validasi data kosong", () => {

    cy.contains("Tambah Slider").click()

    cy.contains("button", "Save Slider")
      .click()

    cy.get("#title:invalid")
      .should("exist")

  })

  // ============================
  // SLD-006 Validasi upload gambar
  // ============================

  it("SLD-006 - Validasi upload gambar", () => {

    cy.contains("Tambah Slider").click()

    cy.get("#title")
      .type("Testing Image")

    cy.get('#image').selectFile(
    'cypress/fixtures/slider.jpg',
        { force: true }
    )

    cy.contains("button", "Save Slider")
      .click()

  })

  // ============================
  // SLD-007 Menampilkan status dan urutan slider
  // ============================

  it("SLD-007 - Menampilkan status dan urutan slider", () => {

    cy.get("tbody tr").first().within(() => {

      cy.contains(/Active|Inactive/)
        .should("exist")

      cy.get("td")
        .eq(2)
        .invoke("text")
        .then((text) => {
        expect(text.trim()).to.match(/^\d+$/)
        })
    })

  })

})