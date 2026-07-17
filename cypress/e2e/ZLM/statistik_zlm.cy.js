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
      "https://zlm.hummatech.com/admin/reports/product-stats"
    )


    cy.wait(3000)


  })







// =====================================================
// STAT-001 - Membuka Menu Statistik Barang
// =====================================================

it("STAT-001 - Membuka Menu Statistik Barang", () => {


  cy.url()
    .should("include", "/admin/reports/product-stats")


  cy.contains("Store")
    .should("exist")


})







// =====================================================
// STAT-002 - Menampilkan Statistik Produk
// =====================================================

it("STAT-002 - Menampilkan Statistik Produk", () => {


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

it("STAT-003 - Validasi Total Produk", () => {


  cy.contains("Total Produk")
    .parent()
    .should("contain.text","3")


})







// =====================================================
// STAT-004 - Validasi Stok Tersedia
// =====================================================

it("STAT-004 - Validasi Stok Tersedia", () => {


  cy.contains("Stok Tersedia")
    .should("exist")


})







// =====================================================
// STAT-005 - Validasi Produk Habis
// =====================================================

it("STAT-005 - Validasi Stok Habis", () => {


  cy.contains("Stok Habis")
    .should("exist")


  cy.contains("0")
    .should("exist")


})







// =====================================================
// STAT-006 - Menampilkan Top Selling Products
// =====================================================

it("STAT-006 - Menampilkan Produk Terlaris", () => {


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
// STAT-007 - Validasi Tidak Ada Data Penjualan
// =====================================================

it("STAT-007 - Validasi Data Penjualan Kosong", () => {


  cy.contains("No sales data")
    .should("exist")


})







// =====================================================
// STAT-008 - Menampilkan Top Rated Products
// =====================================================

it("STAT-008 - Menampilkan Produk Rating Terbaik", () => {


  cy.contains("Top Rated Products")
    .should("exist")


  cy.contains("Rating")
    .should("exist")


  cy.contains("Reviews")
    .should("exist")


})







// =====================================================
// STAT-009 - Validasi Tidak Ada Review
// =====================================================

it("STAT-009 - Validasi Review Kosong", () => {


  cy.contains("No reviews yet")
    .should("exist")


})







// =====================================================
// STAT-010 - Cek Struktur Tabel Produk
// =====================================================

it("STAT-010 - Cek Struktur Tabel", () => {


  cy.contains("No")
    .should("exist")


  cy.contains("Produk")
    .should("exist")


})



})