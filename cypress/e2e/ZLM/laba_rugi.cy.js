describe("Menu Laba Rugi ZLM", () => {

  beforeEach(() => {

    // Login admin
    cy.login();

    // Buka halaman Laba Rugi
    cy.visit("/admin/reports/profit-loss");

    // Pastikan halaman berhasil dibuka
    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/reports/profit-loss");
  });


  // =====================================================
  // LABA-001
  // Membuka Menu Laba Rugi
  // =====================================================
  it("LABA-001 - Membuka Menu Laba Rugi", () => {

    cy.get("h1")
      .should("be.visible")
      .and("contain", "Laporan Laba Rugi");

  });


  // =====================================================
  // LABA-002
  // Menampilkan Filter Periode
  // =====================================================
  it("LABA-002 - Menampilkan Filter Periode", () => {

    // Pilihan periode
    cy.get('select[name="period"]')
      .should("be.visible");

    cy.get('select[name="period"] option[value="monthly"]')
      .should("exist")
      .and("be.selected");

    // Start Date
    cy.get('input[name="start_date"]')
      .should("be.visible");

    // End Date
    cy.get('input[name="end_date"]')
      .should("be.visible");

    // Tombol Filter
    cy.contains("button", "Filter")
      .should("be.visible");

    // Tombol Reset adalah <a>, bukan <button>
    cy.get('a[href$="/admin/reports/profit-loss"]')
      .filter(":contains('Reset')")
      .should("be.visible");
  });


  // =====================================================
  // LABA-003
  // Menampilkan Periode Laporan
  // =====================================================
  it("LABA-003 - Menampilkan Periode Laporan", () => {

    cy.contains("Periode:")
      .should("be.visible");

  });


  // =====================================================
  // LABA-004
  // Menampilkan Total Transaksi
  // =====================================================
  it("LABA-004 - Menampilkan Total Transaksi", () => {

    cy.contains("Total Transaksi:")
      .should("be.visible");

  });


  // =====================================================
  // LABA-005
  // Menampilkan Informasi Pendapatan
  // =====================================================
  it("LABA-005 - Menampilkan Informasi Pendapatan", () => {

    // Bagian Pendapatan
    cy.contains("h3", "Pendapatan")
      .should("be.visible");

    // Total Pendapatan
    cy.contains("span", "Total Pendapatan")
      .should("be.visible");

    // Biaya Pengiriman
    cy.contains("span", "Biaya Pengiriman")
      .should("be.visible");

    // Pajak
    cy.contains("span", "Pajak (PPN)")
      .should("be.visible");

  });


  // =====================================================
  // LABA-006
  // Menampilkan HPP dan Laba
  // =====================================================
  it("LABA-006 - Menampilkan Perhitungan Laba", () => {

    // Bagian HPP & Laba
    cy.contains("h3", "Harga Pokok & Laba")
      .should("be.visible");

    // HPP
    cy.contains("span", "HPP (Harga Pokok Penjualan)")
      .should("be.visible");

    // Laba Kotor
    cy.contains("span", "Laba Kotor")
      .should("be.visible");

    // Biaya Operasional
    cy.contains("span", "Biaya Operasional (Pengiriman)")
      .should("be.visible");

    // Laba Bersih pada bagian HPP & Laba
    cy.contains("span", "LABA BERSIH")
      .should("be.visible");

  });


  // =====================================================
  // LABA-007
  // Filter Berdasarkan Tanggal
  // =====================================================
  it("LABA-007 - Filter Berdasarkan Tanggal", () => {

    // Isi Start Date
    cy.get('input[name="start_date"]')
      .should("be.visible")
      .type("2026-07-01");

    // Isi End Date
    cy.get('input[name="end_date"]')
      .should("be.visible")
      .type("2026-07-17");

    // Monitor request filter
    cy.intercept(
      "GET",
      "**/admin/reports/profit-loss*"
    ).as("filterProfitLoss");

    // Klik Filter
    cy.contains("button", "Filter")
      .should("be.visible")
      .click();

    // Pastikan request berhasil
    cy.wait("@filterProfitLoss")
      .its("response.statusCode")
      .should("eq", 200);

    // Pastikan halaman tetap Laba Rugi
    cy.location("pathname")
      .should("eq", "/admin/reports/profit-loss");

    // Pastikan periode tampil
    cy.contains("Periode:")
      .should("be.visible");

  });


  // =====================================================
  // LABA-008
  // Reset Filter
  // =====================================================
  it("LABA-008 - Reset Filter", () => {

    // Pastikan tombol Reset tersedia
    cy.get('a[href$="/admin/reports/profit-loss"]')
      .filter(":contains('Reset')")
      .should("be.visible")
      .click();

    // Pastikan kembali ke halaman default
    cy.location("pathname", {
      timeout: 10000
    })
      .should("eq", "/admin/reports/profit-loss");

    // Pastikan filter kembali ke nilai default
    cy.get('select[name="period"]')
      .should("have.value", "monthly");

    cy.get('input[name="start_date"]')
      .should("have.value", "2026-08-01");

    cy.get('input[name="end_date"]')
      .should("have.value", "2026-08-31");

  });


// =====================================================
// LABA-009
// Menampilkan Nilai Keuangan
// =====================================================
it("LABA-009 - Menampilkan Nilai Keuangan", () => {

  // Pastikan halaman Laba Rugi
  cy.location("pathname")
    .should("eq", "/admin/reports/profit-loss");

  // Total Pendapatan
  cy.contains("div.text-xs.text-gray-400", "Total Pendapatan")
    .should("exist")
    .parent()
    .should("contain.text", "Rp");

  // Total HPP
  cy.contains("div.text-xs.text-gray-400", "Total HPP")
    .should("exist")
    .parent()
    .should("contain.text", "Rp");

  // Laba Kotor
  cy.contains("div.text-xs.text-gray-400", "Laba Kotor")
    .should("exist")
    .parent()
    .should("contain.text", "Rp");

  // Laba Bersih
  cy.contains("div.text-xs.text-gray-400", "Laba Bersih")
    .should("exist")
    .parent()
    .should("contain.text", "Rp");

});

});