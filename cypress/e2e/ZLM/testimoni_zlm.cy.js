describe("Menu Testimoni ZLM", () => {

  beforeEach(() => {

    cy.visit("https://zlm.hummatech.com/login")

    // Login Admin
    cy.get("#email").type("admin@zlm.id")
    cy.get("#password").type("admin123")
    cy.get("#login-btn").click()

    cy.url().should("include", "/admin")

    // Masuk ke menu Testimoni
    cy.visit("https://zlm.hummatech.com/admin/testimonials")

  })

  // ===================================
  // TES-001 Menampilkan daftar testimoni
  // ===================================
  it("TES-001 - Menampilkan daftar testimoni", () => {

    cy.contains("Testimoni").should("exist")
    cy.get("table").should("exist")
    cy.get("tbody tr").should("have.length.at.least", 1)

  })


  // ===================================
  // TES-002 Menambahkan testimoni
  // ===================================
  it("TES-002 - Menambahkan testimoni", () => {

    cy.get('a[href*="testimonials/create"]').click()

    cy.get('input[name="name"]')
      .type("Sagha")

    cy.get('input[name="position"]')
      .type("Software Engineer")

    cy.get('textarea[name="content"]')
      .type("Website sangat bagus dan mudah digunakan.")

    cy.get('select[name="rating"]')
      .select("5")

    // Pastikan file testimoni.jpg ada di cypress/fixtures
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/testimoni.jpg", {
        force: true
      })

    cy.get('input[type="checkbox"]')
      .check({ force: true })

    cy.contains("button", /Save/i)
      .click()

    cy.url().should("include", "/admin/testimonials")

  })


  // ===================================
  // TES-003 Mengedit testimoni
  // ===================================
  it("TES-003 - Mengedit testimoni", () => {

    cy.get('a[title="Edit"]')
      .first()
      .click()

    cy.url()
      .should("include", "/edit")

    cy.get('input[name="position"]')
      .clear()
      .type("Senior Software Engineer")

    cy.contains("button", /Update|Save/i)
      .click()

    cy.url().should("include", "/admin/testimonials")

  })


  // ===================================
  // TES-004 Menghapus testimoni
  // ===================================
  it("TES-004 - Menghapus testimoni", () => {

    // Klik OK pada popup confirm
    cy.on("window:confirm", () => true)

    cy.get('button[title="Delete"]')
      .first()
      .click()

  })


  // ===================================
  // TES-005 Validasi data kosong
  // ===================================
  it("TES-005 - Validasi data kosong", () => {

    cy.get('a[href*="testimonials/create"]')
      .click()

    cy.contains("button", /Save/i)
      .click()

    cy.contains(/required|wajib|name|content/i)
      .should("exist")

  })


  // ===================================
  // TES-006 Validasi upload foto
  // ===================================
  it("TES-006 - Validasi upload foto", () => {

    cy.get('a[href*="testimonials/create"]')
      .click()

    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/testimoni.jpg", {
        force: true
      })

    cy.get('input[type="file"]')
      .should("exist")

  })


  // ===================================
  // TES-007 Menampilkan rating dan status
  // ===================================
  it("TES-007 - Menampilkan rating dan status", () => {

    cy.get("tbody tr").first().within(() => {

      cy.get("iconify-icon[icon='solar:star-bold']")
        .should("have.length", 5)

      cy.contains(/Active|Inactive/)
        .should("exist")

    })

  })

})