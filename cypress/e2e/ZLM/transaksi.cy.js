describe("Menu Transaksi ZLM", () => {
  beforeEach(() => {
    cy.viewport(1400, 900);

    cy.login();

    cy.visit("/admin/transactions");

    cy.location("pathname")
      .should("eq", "/admin/transactions");
  });

  // =====================================================
  // TRAN-001 - Membuka Menu Transactions
  // =====================================================

  it("TRAN-001 - Membuka Menu Transactions", () => {
    cy.contains("Transactions")
      .should("be.visible");
  });

  // =====================================================
  // TRAN-002 - Menampilkan Data Transaksi
  // =====================================================

  it("TRAN-002 - Menampilkan Data Transaksi", () => {
    cy.contains("Total Orders")
      .should("be.visible");

    cy.contains("Paid")
      .should("be.visible");

    cy.contains("Pending")
      .should("be.visible");

    cy.contains("Order")
      .should("be.visible");

    cy.contains("Customer")
      .should("be.visible");

    cy.contains("Status")
      .should("be.visible");
  });

  // =====================================================
  // TRAN-003 - Mencari Data Order
  // =====================================================

  it("TRAN-003 - Mencari Data Order", () => {
    cy.get('input[name="search"]')
      .should("be.visible")
      .clear()
      .type("ORD-JADS83GG");

    cy.contains("ORD-JADS83GG")
      .should("be.visible");
  });

  // =====================================================
  // TRAN-004 - Filter Method Pembayaran
  // =====================================================

  it("TRAN-004 - Filter Method Pembayaran", () => {
    cy.get("select")
      .first()
      .should("be.visible")
      .find("option")
      .then(($options) => {
        const option = [...$options].find(
          (el) => el.textContent.trim() === "Xendit"
        );

        expect(option).to.exist;

        cy.get("select")
          .first()
          .select(option.value);
      });

    cy.get("select")
      .first()
      .should("not.have.value", "");
  });

  // =====================================================
  // TRAN-005 - Filter Status Transaksi
  // =====================================================

  it("TRAN-005 - Filter Status Transaksi", () => {
    cy.get("select")
      .eq(1)
      .should("be.visible")
      .find("option")
      .then(($options) => {
        const option = [...$options].find(
          (el) => el.textContent.trim() === "Unpaid"
        );

        expect(option).to.exist;

        cy.get("select")
          .eq(1)
          .select(option.value);
      });

    cy.get("select")
      .eq(1)
      .should("not.have.value", "");
  });

  // =====================================================
  // TRAN-006 - Melihat Detail Transaksi
  // =====================================================

  it("TRAN-006 - Melihat Detail Transaksi", () => {
    cy.contains("Detail")
      .first()
      .should("be.visible")
      .click();

    cy.location("pathname")
      .should("include", "/admin/transactions/");

    cy.contains("Order")
      .should("be.visible");
  });

  // =====================================================
  // TRAN-007 - Membuka dan Menampilkan Form Create Transaction
  // =====================================================

  it("TRAN-007 - Membuka dan Menampilkan Form Create Transaction", () => {
    cy.visit("/admin/transactions/create");

    cy.location("pathname")
      .should("eq", "/admin/transactions/create");

    cy.contains("Create Transaction")
      .should("be.visible");

    cy.contains("Customer")
      .should("be.visible");

    cy.contains("Items")
      .should("be.visible");

    cy.contains("Payment Method")
      .should("be.visible");

    cy.contains("Shipping Address")
      .scrollIntoView()
      .should("be.visible");
  });

  // =====================================================
  // TRAN-008 - Validasi Customer Kosong
  // =====================================================

  it("TRAN-008 - Validasi Customer Kosong", () => {
    cy.visit("/admin/transactions/create");

    cy.get("select")
      .first()
      .should("be.visible")
      .and("have.value", "");

    cy.contains("button", "Create Transaction")
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get("select")
      .first()
      .should("have.prop", "validity")
      .and("have.property", "valid", false);
  });

  // =====================================================
  // TRAN-009 - Menambahkan Item Laptop ke Transaksi
  // =====================================================

  it("TRAN-009 - Menambahkan Item Laptop ke Transaksi", () => {
    cy.visit("/admin/transactions/create");

    // Pastikan item pertama tersedia
    cy.get("select")
      .eq(1)
      .should("be.visible");

    // Pilih laptop
    cy.get("select")
      .eq(1)
      .find("option")
      .then(($options) => {
        const option = [...$options].find(
          (el) => el.value && el.value !== ""
        );

        expect(option).to.exist;

        cy.get("select")
          .eq(1)
          .select(option.value);
      });

    // Pastikan laptop berhasil dipilih
    cy.get("select")
      .eq(1)
      .should("not.have.value", "");

    // Tambahkan item baru
    cy.get("select")
      .then(($selects) => {
        const beforeCount = $selects.length;

        cy.contains("+ Add Item")
          .should("be.visible")
          .click();

        cy.get("select")
          .should("have.length.greaterThan", beforeCount);
      });
  });

  // =====================================================
  // TRAN-010 - Memilih Payment Method
  // =====================================================

  it("TRAN-010 - Memilih Payment Method", () => {
    cy.visit("/admin/transactions/create");

    cy.contains("Manual Transfer")
      .should("be.visible")
      .click();

    cy.contains("Customer upload bukti transfer nanti")
      .should("be.visible");
  });

  // =====================================================
  // TRAN-011 - Validasi Form Transaksi
  // =====================================================

  it("TRAN-011 - Validasi Form Transaksi", () => {
    cy.visit("/admin/transactions/create");

    // Customer
    cy.get("select")
      .first()
      .should("be.visible");

    // Item laptop
    cy.get("select")
      .eq(1)
      .should("be.visible");

    // Quantity
    cy.get('input[type="number"]')
      .first()
      .should("be.visible");

    // Payment method
    cy.contains("Manual Transfer")
      .should("be.visible");

    // Shipping address
    cy.get("textarea")
      .first()
      .should("be.visible");

    // Catatan
    cy.get("textarea")
      .last()
      .should("be.visible");

    // Tombol submit
    cy.contains("button", "Create Transaction")
      .scrollIntoView()
      .should("be.visible");
  });
});