describe("Menu Laba Rugi ZLM", () => {


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
    // MASUK MENU LABA RUGI
    // ==========================

    cy.visit(
      "https://zlm.hummatech.com/admin/reports/profit-loss"
    )


    cy.wait(3000)


  })





// =====================================================
// LABA-001 - Membuka Menu Laba Rugi
// =====================================================

it("LABA-001 - Membuka Menu Laba Rugi", () => {


  cy.url()
    .should("include", "/admin/reports/profit-loss")


  cy.contains("Laba")
    .should("exist")


})







// =====================================================
// LABA-002 - Menampilkan Filter Periode
// =====================================================

it("LABA-002 - Menampilkan Filter Periode", () => {


  cy.contains("Monthly")
    .should("exist")


  cy.contains("Start Date")
    .should("exist")


  cy.contains("End Date")
    .should("exist")


  cy.contains("Filter")
    .should("exist")


  cy.contains("Reset")
    .should("exist")


})







// =====================================================
// LABA-003 - Menampilkan Periode Laporan
// =====================================================

it("LABA-003 - Menampilkan Periode Laporan", () => {


  cy.contains("Periode")
    .should("exist")


})







// =====================================================
// LABA-004 - Menampilkan Total Transaksi
// =====================================================

it("LABA-004 - Menampilkan Total Transaksi", () => {


  cy.contains("Total Transaksi")
    .should("exist")


})







// =====================================================
// LABA-005 - Menampilkan Pendapatan
// =====================================================

it("LABA-005 - Menampilkan Informasi Pendapatan", () => {


  cy.contains("Pendapatan")
    .should("exist")


  cy.contains("Total Pendapatan")
    .should("exist")


  cy.contains("Biaya Pengiriman")
    .should("exist")


  cy.contains("Pajak")
    .should("exist")


})







// =====================================================
// LABA-006 - Menampilkan HPP dan Laba
// =====================================================

it("LABA-006 - Menampilkan Perhitungan Laba", () => {


  cy.contains("Harga Pokok")
    .should("exist")


  cy.contains("HPP")
    .should("exist")


  cy.contains("Laba Kotor")
    .should("exist")


  cy.contains("Laba Bersih")
    .should("exist")


})







// =====================================================
// LABA-007 - Filter Berdasarkan Tanggal
// =====================================================

it("LABA-007 - Filter Berdasarkan Tanggal", () => {


  cy.get('input[type="date"]')
    .first()
    .clear()
    .type("2026-07-01")


  cy.get('input[type="date"]')
    .last()
    .clear()
    .type("2026-07-17")


  cy.contains("Filter")
    .click()


  cy.wait(3000)


  cy.contains("Periode")
    .should("exist")


})







// =====================================================
// LABA-008 - Reset Filter
// =====================================================

it("LABA-008 - Reset Filter", () => {


  cy.contains("Reset")
    .click()


  cy.wait(2000)


  cy.contains("Start Date")
    .should("exist")


})







// =====================================================
// LABA-009 - Validasi Nilai Keuangan
// =====================================================

it("LABA-009 - Menampilkan Nilai Keuangan", () => {


  cy.contains("Rp")
    .should("exist")


})



})