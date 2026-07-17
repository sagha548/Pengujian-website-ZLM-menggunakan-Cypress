describe("Category Management ZLM", () => {

  beforeEach(() => {

    // Login
    cy.viewport(1920, 1080)

    cy.visit("https://zlm.hummatech.com/login")

    cy.get("#email").type("admin@zlm.id")
    cy.get("#password").type("admin123")

    cy.get("#login-btn").click()

    cy.url().should("include", "/admin")

    // Buka halaman kategori
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
    .should("be.visible")
    .clear()
    .type("Automation Testing")

  cy.get('input[name="search"]')
    .type("{enter}")

  cy.wait(2000)

  cy.contains("Automation Testing", {
    timeout: 10000
  })
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
      .should("include", "/categories/create")

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
// Menambahkan lalu menghapus kategori
// ============================================
it("CATEGORY-005 - Menghapus kategori", () => {

  // Nama kategori unik agar tidak duplicate
  const categoryName = `Automation Delete ${Date.now()}`

  // =============================
  // Tambah kategori
  // =============================
  cy.contains("Add Category").click()

  cy.url().should("include", "/categories/create")

  cy.get('input[name="name"]')
    .type(categoryName)

  cy.get('input[name="icon"]')
    .clear()
    .type("solar:folder-linear")

  cy.get('textarea[name="description"]')
    .type("Kategori khusus automation testing.")

  cy.get('input[type="checkbox"]')
    .check({ force: true })

  cy.contains("Create Category").click()

  cy.url({ timeout: 10000 })
    .should("include", "/admin/categories")

  // =============================
  // Cari kategori yang baru dibuat
  // =============================
  cy.get('input[name="search"]')
    .clear()
    .type(`${categoryName}{enter}`)

  cy.contains(categoryName)
    .should("exist")

  // =============================
  // Hapus kategori tersebut
  // =============================
  cy.on("window:confirm", () => true)

  cy.contains("tr", categoryName)
    .within(() => {
      cy.get('button[title="Delete"]').click()
    })

  // =============================
  // Validasi data sudah terhapus
  // =============================
  cy.reload()

  cy.get('input[name="search"]')
    .clear()
    .type(`${categoryName}{enter}`)

  cy.contains(categoryName)
    .should("not.exist")

})
  // ============================================
  // CATEGORY-006
  // Menambahkan kategori baru
  // ============================================
  it("CATEGORY-006 - Menambahkan kategori baru", () => {

  const categoryName = `Automation Testing ${Date.now()}`


  cy.contains("Add Category")
    .click()


  cy.url()
    .should("include", "/categories/create")


  cy.get('input[name="name"]')
    .type(categoryName)


  cy.get('input[name="icon"]')
    .clear()
    .type("solar:gamepad-linear")


  cy.get('textarea[name="description"]')
    .type("Kategori untuk pengujian automation Cypress.")


  cy.get('input[type="checkbox"]')
    .check({force:true})


  cy.contains("Create Category")
    .click()


  cy.url({timeout:10000})
    .should("include", "/admin/categories")


  cy.contains(categoryName)
    .should("be.visible")

}) 

})