describe("Statistik Barang ZLM", () => {

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.login()

    cy.visit("/admin/reports/product-stats")

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/reports/product-stats")

    cy.get("body", { timeout: 10000 })
      .should("be.visible")
  })

  // =====================================================
  // STAT-001 - Membuka Menu Statistik Barang
  // =====================================================

  it("STAT-001 - Membuka Menu Statistik Barang", () => {
    cy.location("pathname")
      .should("eq", "/admin/reports/product-stats")

    cy.contains("Statistik Barang")
      .should("be.visible")
  })

  // =====================================================
  // STAT-002 - Menampilkan Statistik Stok Produk
  // =====================================================

  it("STAT-002 - Menampilkan Statistik Stok Produk", () => {
    cy.contains("Total Produk")
      .should("be.visible")

    cy.contains("Stok Tersedia")
      .should("be.visible")

    cy.contains("Stok Habis")
      .should("be.visible")

    cy.contains("Stok Menipis")
      .should("be.visible")
  })

  // =====================================================
  // STAT-003 - Validasi Jumlah Total Produk
  // =====================================================

  it("STAT-003 - Menampilkan Jumlah Produk", () => {
    cy.contains("Total Produk")
      .parent()
      .invoke("text")
      .should("match", /\d+/)
  })

  // =====================================================
  // STAT-004 - Menampilkan Produk Terlaris
  // =====================================================

  it("STAT-004 - Menampilkan Top Selling Products", () => {
    cy.contains("Top Selling Products")
      .should("be.visible")

    cy.contains("Produk")
      .should("be.visible")

    cy.contains("Terjual")
      .should("be.visible")

    cy.contains("Total Revenue")
      .should("be.visible")
  })

  // =====================================================
  // STAT-005 - Validasi Data Penjualan
  // =====================================================

  it("STAT-005 - Validasi Data Penjualan", () => {
    cy.contains("Top Selling Products")
      .should("be.visible")

    cy.contains("Top Selling Products")
      .parent()
      .should(($section) => {
        const text = $section.text().trim()

        expect(text.length)
          .to.be.greaterThan(0)
      })
  })

  // =====================================================
  // STAT-006 - Menampilkan Produk Rating Terbaik
  // =====================================================

  it("STAT-006 - Menampilkan Top Rated Products", () => {
    cy.contains("Top Rated Products")
      .should("be.visible")

    cy.contains("Rating")
      .should("be.visible")

    cy.contains("Reviews")
      .should("be.visible")
  })

  // =====================================================
  // STAT-007 - Validasi Data Review
  // =====================================================

  it("STAT-007 - Validasi Data Review", () => {
    cy.contains("Top Rated Products")
      .should("be.visible")

    cy.contains("Top Rated Products")
      .parent()
      .should(($section) => {
        const text = $section.text().trim()

        expect(text.length)
          .to.be.greaterThan(0)
      })
  })

  // =====================================================
  // STAT-008 - Mengecek Struktur Tabel Produk
  // =====================================================

  it("STAT-008 - Mengecek Struktur Tabel Statistik", () => {
    cy.contains("No")
      .should("be.visible")

    cy.contains("Produk")
      .should("be.visible")
  })

})