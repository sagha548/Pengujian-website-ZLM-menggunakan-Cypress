describe("Login ZLM", () => {

  beforeEach(() => {
    cy.visit("https://zlm.hummatech.com/login")
  })

  // =====================================================
  // LOGIN-001 - Memasukkan Email dan Password yang Valid
  // =====================================================
  it("LOGIN-001 - Memasukkan Email dan Password yang Valid", () => {

    cy.get("#email")
      .type("admin@zlm.id")

    cy.get("#password")
      .type("admin123")

    cy.get("#login-btn")
      .click()

    cy.url()
      .should("include", "/admin")

  })


  // ===================================
  // LOGIN-002 - Email Kosong
  // ===================================
  it("LOGIN-002 - Email Kosong", () => {

    cy.get("#password")
      .type("admin123")

    cy.get("#login-btn")
      .click()

    cy.get("#email:invalid")
      .should("exist")

  })


  // ===================================
  // LOGIN-003 - Password Kosong
  // ===================================
  it("LOGIN-003 - Password Kosong", () => {

    cy.get("#email")
      .type("admin@zlm.id")

    cy.get("#login-btn")
      .click()

    cy.get("#password:invalid")
      .should("exist")

  })


  // ===================================
  // LOGIN-004 - Email dan Password Kosong
  // ===================================
  it("LOGIN-004 - Email dan Password Kosong", () => {

    cy.get("#login-btn")
      .click()

    cy.get("#email:invalid")
      .should("exist")

  })


  // ===================================
  // LOGIN-005 - Email Tidak Terdaftar
  // ===================================
  it("LOGIN-005 - Email Tidak Terdaftar", () => {

    cy.get("#email")
      .type("salah@email.com")

    cy.get("#password")
      .type("admin123")

    cy.get("#login-btn")
      .click()

    cy.url()
      .should("include", "/login")

    // Ganti sesuai pesan yang muncul pada website
    cy.contains(/invalid|gagal|email|password/i)
      .should("exist")

  })


  // ===================================
  // LOGIN-006 - Show / Hide Password
  // ===================================
  it("LOGIN-006 - Show Hide Password", () => {

    cy.get("#password")
      .type("admin123")
      .should("have.attr", "type", "password")

    // Sesuaikan selector tombol mata
    cy.get('button[type="button"]')
      .last()
      .click()

    cy.get("#password")
      .should("have.attr", "type", "text")

    cy.get('button[type="button"]')
      .last()
      .click()

    cy.get("#password")
      .should("have.attr", "type", "password")

  })


  // ===================================
  // LOGIN-007 - Logout Session
  // ===================================
  it("LOGIN-007 - Logout Session", () => {

    cy.get("#email")
      .type("admin@zlm.id")

    cy.get("#password")
      .type("admin123")

    cy.get("#login-btn")
      .click()

    cy.url()
      .should("include", "/admin")

    // Klik tombol logout
    cy.get('button[title="Logout"]')
  .click({ force: true })

    cy.url()
  .should("eq", "https://zlm.hummatech.com/")

  })

})