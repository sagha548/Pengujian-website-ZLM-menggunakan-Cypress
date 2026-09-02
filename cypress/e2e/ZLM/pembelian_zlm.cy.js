describe("Menu Pembelian ZLM", () => {

  beforeEach(() => {
    cy.login();

    cy.visit("/admin/reports/purchases");

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/admin/reports/purchases");
  });


  // =====================================================
  // PUR-001 - Membuka Menu Pembelian
  // =====================================================

  it("PUR-001 - Membuka Menu Pembelian", () => {

    cy.get("h1")
      .should("be.visible")
      .and("contain.text", "Laporan Pembelian");
  });


  // =====================================================
  // PUR-002 - Menampilkan Statistik Pembelian
  // =====================================================

  it("PUR-002 - Menampilkan Statistik Pembelian", () => {

    cy.contains("div", "Total Orders")
      .should("be.visible");

    cy.contains("div", "Total Revenue")
      .should("be.visible");

    cy.contains("div", "Avg Order Value")
      .should("be.visible");
  });


  // =====================================================
  // PUR-003 - Menampilkan Data Pembelian
  // =====================================================

  it("PUR-003 - Menampilkan Data Pembelian", () => {

    cy.get("table")
      .should("be.visible");

    cy.get("thead")
      .should("contain.text", "Order #")
      .and("contain.text", "Customer")
      .and("contain.text", "Status");

    cy.get("tbody tr")
      .should("have.length.greaterThan", 0);
  });


  // =====================================================
  // PUR-004 - Menampilkan Nomor Order
  // =====================================================

  it("PUR-004 - Menampilkan Nomor Order", () => {

    cy.get("tbody tr")
      .first()
      .within(() => {

        cy.contains("ORD-")
          .should("be.visible");
      });
  });


  // =====================================================
  // PUR-005 - Filter Status
  // =====================================================

  it("PUR-005 - Filter Status Transaksi", () => {

    cy.get('select[name="status"]')
      .should("be.visible")
      .select("pending")
      .should("have.value", "pending");
  });


  // =====================================================
  // PUR-006 - Filter Payment
  // =====================================================

  it("PUR-006 - Filter Payment", () => {

    cy.get('select[name="payment_status"]')
      .should("be.visible")
      .select("paid")
      .should("have.value", "paid");
  });


  // =====================================================
  // PUR-007 - Tombol Filter
  // =====================================================

  it("PUR-007 - Menggunakan Filter", () => {

    cy.contains("button", "Filter")
      .should("be.visible")
      .click();

    cy.location("pathname")
      .should("eq", "/admin/reports/purchases");
  });


  // =====================================================
  // PUR-008 - Reset Filter
  // =====================================================

  it("PUR-008 - Reset Filter", () => {

    cy.get('input[name="start_date"]')
      .should("be.visible")
      .type("2026-01-01");

    cy.get('input[name="end_date"]')
      .should("be.visible")
      .type("2026-08-31");

    cy.get('select[name="status"]')
      .select("pending");

    cy.get('select[name="payment_status"]')
      .select("unpaid");

    cy.contains("a", "Reset")
      .should("be.visible")
      .click();

    cy.location("pathname")
      .should("eq", "/admin/reports/purchases");

    cy.get('input[name="start_date"]')
      .should("have.value", "");

    cy.get('input[name="end_date"]')
      .should("have.value", "");

    cy.get('select[name="status"]')
      .should("have.value", "");

    cy.get('select[name="payment_status"]')
      .should("have.value", "");
  });


  // =====================================================
  // PUR-009 - Melihat Data Pembelian
  // =====================================================

  it("PUR-009 - Melihat Data Pembelian", () => {

    cy.get("tbody tr")
      .should("have.length.greaterThan", 0);

    cy.get("tbody tr")
      .first()
      .within(() => {

        cy.get("td")
          .should("have.length.greaterThan", 0);

        cy.contains("ORD-")
          .should("be.visible");
      });
  });

});