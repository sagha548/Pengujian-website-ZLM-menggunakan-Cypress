describe("Menu Testimoni ZLM", () => {
  beforeEach(() => {
    cy.viewport(1400, 900)
    cy.login()

    cy.visit("/admin/testimonials")

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/testimonials")
  })

  // ===================================
  // TES-001
  // Menampilkan daftar testimoni
  // ===================================

  it("TES-001 - Menampilkan daftar testimoni", () => {
    cy.contains("Testimoni")
      .should("be.visible")

    cy.get("table")
      .should("be.visible")

    cy.get("tbody tr")
      .should("have.length.at.least", 1)
  })

  // ===================================
  // TES-002
  // Menambahkan testimoni
  // ===================================

  it("TES-002 - Menambahkan testimoni", () => {
    const testimonialName = `Automation Test ${Date.now()}`

    cy.get('a[href*="testimonials/create"]')
      .should("be.visible")
      .click()

    cy.location("pathname")
      .should("include", "/admin/testimonials/create")

    cy.get('input[name="name"]')
      .should("be.visible")
      .type(testimonialName)

    cy.get('input[name="position"]')
      .should("be.visible")
      .type("Software Engineer")

    cy.get('textarea[name="content"]')
      .should("be.visible")
      .type("Website sangat bagus dan mudah digunakan.")

    cy.get('select[name="rating"]')
      .should("be.visible")
      .select("5")

    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/testimoni.jpg")

    cy.get('input[type="file"]')
      .should(($input) => {
        expect($input[0].files)
          .to.have.length(1)

        expect($input[0].files[0].name)
          .to.equal("testimoni.jpg")
      })

    cy.get('input[type="checkbox"]')
      .check()

    cy.intercept("POST", "**/admin/testimonials")
      .as("createTestimonial")

    cy.contains("button", /Save/i)
      .should("be.visible")
      .click()

    cy.wait("@createTestimonial")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201, 302])

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/testimonials")

    cy.contains("tr", testimonialName)
      .should("be.visible")

    // Cleanup
    cy.on("window:confirm", () => true)

    cy.contains("tr", testimonialName)
      .within(() => {
        cy.get('button[title="Delete"]')
          .should("be.visible")
          .click()
      })

    cy.reload()

    cy.contains(testimonialName)
      .should("not.exist")
  })

  // ===================================
  // TES-003
  // Mengedit testimoni
  // ===================================

  it("TES-003 - Mengedit testimoni", () => {
    const testimonialName = `Automation Edit ${Date.now()}`

    // Buat data testimoni terlebih dahulu
    cy.get('a[href*="testimonials/create"]')
      .should("be.visible")
      .click()

    cy.get('input[name="name"]')
      .should("be.visible")
      .type(testimonialName)

    cy.get('input[name="position"]')
      .should("be.visible")
      .type("Software Engineer")

    cy.get('textarea[name="content"]')
      .should("be.visible")
      .type("Testimoni untuk pengujian edit.")

    cy.get('select[name="rating"]')
      .select("5")

    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/testimoni.jpg")

    cy.get('input[type="checkbox"]')
      .check()

    cy.intercept("POST", "**/admin/testimonials")
      .as("createTestimonial")

    cy.contains("button", /Save/i)
      .should("be.visible")
      .click()

    cy.wait("@createTestimonial")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201, 302])

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/testimonials")

    // Cari data yang baru dibuat
    cy.contains("tr", testimonialName)
      .should("be.visible")
      .within(() => {
        cy.get('a[title="Edit"]')
          .should("be.visible")
          .click()
      })

    cy.location("pathname", { timeout: 10000 })
      .should("include", "/edit")

    // Edit posisi
    cy.get('input[name="position"]')
      .should("be.visible")
      .clear()
      .type("Senior Software Engineer")

    // Monitor request update
    cy.intercept(
      {
        method: "PUT",
        url: "**/admin/testimonials/**"
      }
    ).as("updateTestimonial")

    cy.contains("button", /Update|Save/i)
      .should("be.visible")
      .click()

    cy.wait("@updateTestimonial")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302])

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/testimonials")

    cy.contains("tr", testimonialName)
      .should("contain.text", "Senior Software Engineer")

    // Cleanup
    cy.on("window:confirm", () => true)

    cy.contains("tr", testimonialName)
      .within(() => {
        cy.get('button[title="Delete"]')
          .should("be.visible")
          .click()
      })

    cy.reload()

    cy.contains(testimonialName)
      .should("not.exist")
  })

  // ===================================
  // TES-004
  // Menghapus testimoni
  // ===================================

  it("TES-004 - Menghapus testimoni", () => {
    const testimonialName = `Automation Delete ${Date.now()}`

    // Buat data untuk dihapus
    cy.get('a[href*="testimonials/create"]')
      .should("be.visible")
      .click()

    cy.get('input[name="name"]')
      .type(testimonialName)

    cy.get('input[name="position"]')
      .type("Automation Tester")

    cy.get('textarea[name="content"]')
      .type("Testimoni untuk pengujian delete.")

    cy.get('select[name="rating"]')
      .select("5")

    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/testimoni.jpg")

    cy.get('input[type="checkbox"]')
      .check()

    cy.intercept("POST", "**/admin/testimonials")
      .as("createTestimonial")

    cy.contains("button", /Save/i)
      .click()

    cy.wait("@createTestimonial")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201, 302])

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/testimonials")

    cy.contains("tr", testimonialName)
      .should("be.visible")

    // Hapus data
    cy.on("window:confirm", () => true)

    cy.contains("tr", testimonialName)
      .within(() => {
        cy.get('button[title="Delete"]')
          .should("be.visible")
          .click()
      })

    // Validasi data benar-benar terhapus
    cy.reload()

    cy.contains(testimonialName)
      .should("not.exist")
  })

  // ===================================
  // TES-005
  // Validasi data kosong
  // ===================================

  it("TES-005 - Validasi data kosong", () => {
    cy.get('a[href*="testimonials/create"]')
      .should("be.visible")
      .click()

    cy.location("pathname")
      .should("include", "/admin/testimonials/create")

    cy.get('input[name="name"]')
      .should("have.prop", "validity")
      .and("have.property", "valid", false)

    cy.get('input[name="position"]')
      .should("have.prop", "validity")
      .and("have.property", "valid", false)

    cy.get('textarea[name="content"]')
      .should("have.prop", "validity")
      .and("have.property", "valid", false)
  })

  // ===================================
  // TES-006
  // Validasi upload foto
  // ===================================

  it("TES-006 - Validasi upload foto", () => {
    const testimonialName = `Automation Upload ${Date.now()}`

    cy.get('a[href*="testimonials/create"]')
      .should("be.visible")
      .click()

    cy.get('input[name="name"]')
      .should("be.visible")
      .type(testimonialName)

    cy.get('input[name="position"]')
      .should("be.visible")
      .type("Automation Tester")

    cy.get('textarea[name="content"]')
      .should("be.visible")
      .type("Pengujian upload foto menggunakan Cypress.")

    cy.get('select[name="rating"]')
      .select("5")

    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/testimoni.jpg")

    cy.get('input[type="file"]')
      .should(($input) => {
        expect($input[0].files)
          .to.have.length(1)

        expect($input[0].files[0].name)
          .to.equal("testimoni.jpg")
      })

    cy.get('input[type="checkbox"]')
      .check()

    cy.intercept("POST", "**/admin/testimonials")
      .as("uploadTestimonial")

    cy.contains("button", /Save/i)
      .should("be.visible")
      .click()

    cy.wait("@uploadTestimonial")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201, 302])

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/testimonials")

    // Pastikan data upload berhasil masuk
    cy.contains("tr", testimonialName)
      .should("be.visible")

    // Cleanup
    cy.on("window:confirm", () => true)

    cy.contains("tr", testimonialName)
      .within(() => {
        cy.get('button[title="Delete"]')
          .should("be.visible")
          .click()
      })

    cy.reload()

    cy.contains(testimonialName)
      .should("not.exist")
  })

  // ===================================
  // TES-007
  // Menampilkan rating dan status
  // ===================================

  it("TES-007 - Menampilkan rating dan status", () => {
    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get("iconify-icon[icon='solar:star-bold']")
          .should("have.length", 5)

        cy.contains(/Active|Inactive/)
          .should("be.visible")
      })
  })
})