describe("Menu Pelanggan ZLM", () => {

  beforeEach(() => {

    // Ukuran layar desktop agar sidebar tampil
    cy.viewport(1920, 1080)

    // Login
    cy.visit("https://zlm.hummatech.com/login")

    cy.get("#email")
      .type("admin@zlm.id")

    cy.get("#password")
      .type("admin123")

    cy.get("#login-btn")
      .click()

    // Pastikan sudah masuk dashboard
    cy.url().should("include", "/admin")

    // Tunggu dashboard selesai dimuat
    cy.wait(2000)

  })

  // ===================================
  // PEL-001 Membuka menu Pelanggan
  // ===================================
  it("PEL-001 - Membuka Menu Pelanggan", () => {

    cy.contains("Pelanggan")
      .click({ force: true })

    cy.url().should("include", "customer")

  })


  // ===================================
  // PEL-002 Pencarian pelanggan
  // ===================================
  it("PEL-002 - Pencarian Pelanggan", () => {

    cy.contains("Pelanggan")
      .click({ force: true })

    cy.get('input[placeholder*="Cari"]')
      .type("customer")

  })


  // ===================================
  // PEL-003 Filter Active
  // ===================================
  it("PEL-003 - Filter Active", () => {

    cy.contains("Pelanggan")
      .click({ force: true })

    cy.get("select")
      .select("Active")

  })


  // ===================================
  // PEL-004 Filter Inactive
  // ===================================
  it("PEL-004 - Filter Inactive", () => {

    cy.contains("Pelanggan")
      .click({ force: true })

    cy.get("select")
      .select("Inactive")

  })


  // ===================================
  // PEL-005 Detail Pelanggan
  // ===================================
  it("PEL-005 - Detail Pelanggan", () => {

    cy.contains("Pelanggan")
      .click({ force: true })

    cy.contains("Detail")
      .first()
      .click({ force: true })

  })

})