describe("Menu Transaksi ZLM", () => {

  // ===================================
  // SETUP
  // ===================================
  beforeEach(() => {
    cy.viewport(1400, 900);

    cy.login();

    cy.visit("/admin/transactions");

    cy.location("pathname")
      .should("eq", "/admin/transactions");
  });


  // ===================================
  // TRAN-001
  // Membuka Menu Transactions
  // ===================================
  it("TRAN-001 - Membuka Menu Transactions", () => {

    cy.contains("Transactions")
      .should("be.visible");
  });


  // ===================================
  // TRAN-002
  // Menampilkan Data Transaksi
  // ===================================
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


  // ===================================
  // TRAN-003
  // Mencari Data Order
  // ===================================
  it("TRAN-003 - Mencari Data Order", () => {

    cy.get('input[name="search"]')
      .should("be.visible")
      .clear()
      .type("ORD-JADS83GG");

    cy.contains("ORD-JADS83GG")
      .should("be.visible");
  });


  // ===================================
  // TRAN-004
  // Filter Method Pembayaran
  // ===================================
  it("TRAN-004 - Filter Method Pembayaran", () => {

    cy.get('select[name="payment_method"]')
      .should("be.visible")
      .select("xendit");

    cy.get('select[name="payment_method"]')
      .should("have.value", "xendit");
  });


  // ===================================
  // TRAN-005
  // Filter Status Transaksi
  // ===================================
  it("TRAN-005 - Filter Status Transaksi", () => {

    cy.get('select[name="payment_status"]')
      .should("be.visible")
      .select("unpaid");

    cy.get('select[name="payment_status"]')
      .should("have.value", "unpaid");
  });


  // ===================================
  // TRAN-006
  // Melihat Detail Transaksi
  // ===================================
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


  // ===================================
  // TRAN-007
  // Membuka Form Create Transaction
  // ===================================
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


  // ===================================
  // TRAN-008
  // Validasi Customer Kosong
  // ===================================
  it("TRAN-008 - Validasi Customer Kosong", () => {

    cy.visit("/admin/transactions/create");

    cy.get('select[name="user_id"]')
      .should("be.visible")
      .and("have.value", "");

    cy.contains("button", "Create Transaction")
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get('select[name="user_id"]')
      .should("have.prop", "validity")
      .and("have.property", "valid", false);
  });


  // ===================================
  // TRAN-009
  // Menambahkan Item Laptop ke Transaksi
  // ===================================
  it("TRAN-009 - Menambahkan Item Laptop ke Transaksi", () => {

    cy.visit("/admin/transactions/create");

    cy.get('select[name^="items["][name$="[laptop_id]"]')
      .should("have.length", 1)
      .should("be.visible");

    cy.get('select[name^="items["][name$="[laptop_id]"]')
      .find("option")
      .then(($options) => {

        const option = [...$options].find(
          (el) => el.value && el.value !== ""
        );

        expect(option).to.exist;

        cy.get('select[name^="items["][name$="[laptop_id]"]')
          .select(option.value);
      });

    cy.get('select[name^="items["][name$="[laptop_id]"]')
      .should("not.have.value", "");

    cy.get('select[name^="items["][name$="[laptop_id]"]')
      .its("length")
      .then((beforeCount) => {

        cy.contains("+ Add Item")
          .should("be.visible")
          .click();

        cy.get('select[name^="items["][name$="[laptop_id]"]')
          .should("have.length", beforeCount + 1);
      });
  });


  // ===================================
  // TRAN-010
  // Memilih Payment Method
  // ===================================
  it("TRAN-010 - Memilih Payment Method", () => {

    cy.visit("/admin/transactions/create");

    cy.get('input[name="payment_method"][value="manual_transfer"]')
      .should("be.visible")
      .check();

    cy.get('input[name="payment_method"][value="manual_transfer"]')
      .should("be.checked");

    cy.contains("Customer upload bukti transfer nanti")
      .should("be.visible");
  });


  // ===================================
  // TRAN-011
  // Validasi Form Transaksi
  // ===================================
  it("TRAN-011 - Validasi Form Transaksi", () => {

    cy.visit("/admin/transactions/create");

    cy.get('select[name="user_id"]')
      .should("be.visible");

    cy.get('select[name^="items["][name$="[laptop_id]"]')
      .should("be.visible");

    cy.get('input[name^="items["][name$="[quantity]"]')
      .should("be.visible");

    cy.get('input[name="payment_method"]')
      .should("exist");

    cy.get('textarea[name="shipping_address"]')
      .should("be.visible");

    cy.get('textarea[name="notes"]')
      .should("be.visible");

    cy.get('input[name="shipping_cost"]')
      .should("be.visible");

    cy.contains("button", "Create Transaction")
      .scrollIntoView()
      .should("be.visible");
  });

});