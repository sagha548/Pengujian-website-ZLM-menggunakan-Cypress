describe("Menu Transaksi ZLM", () => {


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
    // MASUK HALAMAN TRANSAKSI
    // ==========================

    cy.visit("https://zlm.hummatech.com/admin/transactions")


    cy.wait(3000)

  })





  // =====================================================
  // TRAN-001 - Membuka Menu Transactions
  // =====================================================

  it("TRAN-001 - Membuka Menu Transactions", () => {


    cy.url()
      .should("include", "/admin/transactions")


    cy.contains("Transactions")
      .should("be.visible")


  })





  // =====================================================
  // TRAN-002 - Menampilkan Data Transaksi
  // =====================================================

  it("TRAN-002 - Menampilkan Data Transaksi", () => {


    cy.contains("Total Orders")
      .should("be.visible")


    cy.contains("Paid")
      .should("be.visible")


    cy.contains("Pending")
      .should("be.visible")


    cy.contains("Order")
      .should("be.visible")


    cy.contains("Customer")
      .should("be.visible")


    cy.contains("Status")
      .should("be.visible")


  })





  // =====================================================
  // TRAN-003 - Mencari Data Order
  // =====================================================

  it("TRAN-003 - Mencari Data Order", () => {


    cy.get('input[placeholder="Search order or customer..."]')
      .type("ORD-JADS83GG")


    cy.wait(2000)


    cy.contains("ORD-JADS83GG")
      .should("be.visible")


  })





  // =====================================================
  // TRAN-004 - Filter Method Pembayaran
  // =====================================================

  it("TRAN-004 - Filter Method Pembayaran", () => {


    // Filter pembayaran Xendit

    cy.get("select")
      .first()
      .select("Xendit")


    cy.wait(2000)


    cy.contains("Xendit")
      .should("be.visible")


  })





  // =====================================================
  // TRAN-005 - Filter Status Transaksi
  // =====================================================

  it("TRAN-005 - Filter Status Transaksi", () => {


    // Filter status Unpaid

    cy.get("select")
      .eq(1)
      .select("Unpaid")


    cy.wait(2000)


    cy.contains("Unpaid")
      .should("be.visible")


  })





  // =====================================================
  // TRAN-006 - Melihat Detail Transaksi
  // =====================================================

  it("TRAN-006 - Melihat Detail Transaksi", () => {


    cy.contains("Detail")
      .first()
      .click()


    cy.wait(3000)


    cy.contains("Order")
      .should("be.visible")


  })


})