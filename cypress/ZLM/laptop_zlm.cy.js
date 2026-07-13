describe("Laptop Management ZLM", () => {

  beforeEach(() => {

    // Login terlebih dahulu sebelum setiap test
    cy.visit("https://zlm.hummatech.com/login")

    cy.get("#email")
      .type("admin@zlm.id")

    cy.get("#password")
      .type("admin123")

    cy.get("#login-btn")
      .click()

    // Pastikan sudah masuk admin
    cy.url()
      .should("include", "/admin")

    // Masuk menu laptop
    cy.visit("https://zlm.hummatech.com/admin/laptops")

  })


  it("LAPTOP-001 - Menampilkan halaman daftar laptop", () => {

    // Cek judul halaman
    cy.get("h1")
      .should("be.visible")
      .and("contain", "Laptop")


    // Pastikan tabel tampil
cy.get("table")
  .should("be.visible")

// Pastikan minimal ada 1 data laptop
cy.get("tbody tr")
  .should("have.length.greaterThan", 0)
  })


  it("LAPTOP-002 - Mencari data laptop", () => {

    // Input pencarian
    cy.get('input[name="search"]')
      .type("ASUS")


    cy.get('input[name="search"]')
      .type("{enter}")


    // Validasi hasil pencarian
    cy.contains("ASUS")
      .should("be.visible")

  })


  it("LAPTOP-003 - Membuka halaman tambah laptop", () => {

  // Pastikan tombol Add Laptop ada
  cy.contains("Add Laptop")
    .should("be.visible")
    .click()

  // Pastikan URL berubah ke halaman create
  cy.url()
    .should("include", "/admin/laptops/create")

  // Pastikan form tambah laptop muncul
  cy.get("form")
    .should("be.visible")

})


  it("LAPTOP-004 - Membuka detail laptop", () => {

  // Pastikan tabel sudah muncul
  cy.get("table").should("be.visible")

  // Klik tombol detail pertama
  cy.get('a[title="Lihat Detail"]')
    .first()
    .click()

  // Validasi URL halaman detail
  cy.url()
    .should("match", /\/admin\/laptops\/.+/)

  })


  it("LAPTOP-005 - Membuka halaman edit laptop", () => {

    // klik tombol edit pertama
    cy.get('a[title="Edit"]')
      .first()
      .click()


    // validasi halaman edit
    cy.url()
      .should("include", "/edit")


  })


  it("LAPTOP-006 - Menghapus data laptop", () => {

    // klik tombol delete
    cy.get('button[title="Delete"]')
      .first()
      .click()


    // konfirmasi browser
    cy.on("window:confirm", (text) => {
      expect(text).to.contains("Delete")
    })

  })


})