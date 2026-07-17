describe("Statistik Barang ZLM", () => {


  beforeEach(() => {


    // ==========================
    // LOGIN ADMIN
    // ==========================

    cy.visit("https://zlm.hummatech.com/login")


    cy.get("#email")
      .type("admin@zlm.id")


    cy.get("#password")
      .type("admin123")


    cy.get("#login-btn")
      .click()


    cy.url()
      .should("include", "/admin")


    cy.wait(2000)



    // ==========================
    // MASUK MENU STATISTIK BARANG
    // ==========================

    cy.visit(
      "https://zlm.hummatech.com/admin/store/statistics"
    )


    cy.wait(3000)


  })







// =====================================================
// STAT-001 - Membuka Menu Statistik Barang
// =====================================================

it("STAT-001 - Membuka Menu Statistik Barang", () => {


  cy.url()
    .should("include", "/admin")


  cy.contains("Store")
    .should("exist")


})








// =====================================================
// STAT-002 - Menampilkan Statistik Stok Produk
// =====================================================

it("STAT-002 - Menampilkan Statistik Stok Produk", () => {


  cy.contains("Total Produk")
    .should("exist")


  cy.contains("Stok Tersedia")
    .should("exist")


  cy.contains("Stok Habis")
    .should("exist")


  cy.contains("Stok Menipis")
    .should("exist")


})








// =====================================================
// STAT-003 - Validasi Jumlah Total Produk
// =====================================================

it("STAT-003 - Menampilkan Jumlah Produk", () => {


  cy.contains("Total Produk")
    .parent()
    .should("contain.text", "3")


})








// =====================================================
// STAT-004 - Menampilkan Produk Terlaris
// =====================================================

it("STAT-004 - Menampilkan Top Selling Products", () => {


  cy.contains("Top Selling Products")
    .should("exist")


  cy.contains("Produk")
    .should("exist")


  cy.contains("Terjual")
    .should("exist")


  cy.contains("Total Revenue")
    .should("exist")


})








// =====================================================
// STAT-005 - Validasi Data Penjualan Kosong
// =====================================================

it("STAT-005 - Validasi Tidak Ada Data Penjualan", () => {


  cy.contains("No sales data")
    .should("exist")


})








// =====================================================
// STAT-006 - Menampilkan Produk Rating Terbaik
// =====================================================

it("STAT-006 - Menampilkan Top Rated Products", () => {


  cy.contains("Top Rated Products")
    .should("exist")


  cy.contains("Rating")
    .should("exist")


  cy.contains("Reviews")
    .should("exist")


})








// =====================================================
// STAT-007 - Validasi Tidak Ada Review
// =====================================================

it("STAT-007 - Validasi Tidak Ada Review Produk", () => {


  cy.contains("No reviews yet")
    .should("exist")


})








// =====================================================
// STAT-008 - Mengecek Struktur Tabel Produk
// =====================================================

it("STAT-008 - Mengecek Struktur Tabel Statistik", () => {


  cy.contains("No")
    .should("exist")


  cy.contains("Produk")
    .should("exist")


})



})