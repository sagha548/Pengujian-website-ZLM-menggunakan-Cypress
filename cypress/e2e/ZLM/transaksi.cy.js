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
  // =====================================================
  // TRAN-007 - Membuka Halaman Create Transaction
  // =====================================================

  it("TRAN-007 - Membuka Halaman Create Transaction", () => {


    cy.visit("https://zlm.hummatech.com/admin/transactions/create")


    cy.wait(3000)


    cy.contains("Create Transaction")
      .should("be.visible")


  })





  // =====================================================
  // TRAN-008 - Menampilkan Form Create Transaction
  // =====================================================

  it("TRAN-008 - Menampilkan Form Create Transaction", () => {


    cy.visit("https://zlm.hummatech.com/admin/transactions/create")


    cy.wait(3000)


    cy.contains("Customer")
      .should("be.visible")


    cy.contains("Items")
      .should("be.visible")


    cy.contains("Payment Method")
      .should("be.visible")


    cy.contains("Shipping Address")
      .scrollIntoView()
      .should("be.visible")

    cy.contains("Create Transaction")
      .scrollIntoView()
      .should("be.visible")

  })





  // =====================================================
  // TRAN-009 - Validasi Customer Kosong
  // =====================================================

  it("TRAN-009 - Customer Kosong", () => {


    cy.visit("https://zlm.hummatech.com/admin/transactions/create")


    cy.wait(3000)


    cy.contains("Create Transaction")
      .last()
      .click()


    cy.wait(2000)


    cy.contains(/customer|required|select/i)
      .should("exist")


  })





  // =====================================================
  // TRAN-010 - Menambahkan Item Laptop
  // =====================================================

  it("TRAN-010 - Menambahkan Item Laptop", () => {


    cy.visit("https://zlm.hummatech.com/admin/transactions/create")


    cy.wait(3000)


    // Pilih laptop

    cy.get("select")
      .eq(1)
      .select(1)


    cy.wait(1000)


    cy.get("select")
      .eq(1)
      .should("not.have.value", "")


  })





  // =====================================================
  // TRAN-011 - Tombol Add Item
  // =====================================================

  it("TRAN-011 - Menambahkan Item Baru", () => {


    cy.visit("https://zlm.hummatech.com/admin/transactions/create")


    cy.wait(3000)


    cy.contains("+ Add Item")
      .click()


    cy.wait(1000)


  })





  // =====================================================
  // TRAN-012 - Memilih Payment Method
  // =====================================================

  it("TRAN-012 - Memilih Payment Method", () => {


    cy.visit("https://zlm.hummatech.com/admin/transactions/create")


    cy.wait(3000)


    cy.contains("Manual Transfer")
      .click()


    cy.contains("Customer upload bukti transfer nanti")
      .should("be.visible")


  })
// =====================================================
// TRAN-013 - Menambahkan Transaksi Baru
// =====================================================

it("TRAN-013 - Menambahkan Transaksi Baru", () => {

  // Buka halaman Create Transaction
  cy.visit("https://zlm.hummatech.com/admin/transactions/create");


  cy.contains("Create Transaction", { timeout: 10000 })
    .should("be.visible");



  // ==========================
  // Pilih Customer
  // ==========================

  cy.get("select")
    .eq(0)
    .select(1);



  // ==========================
  // Pilih Laptop
  // ==========================

  cy.get("select")
    .eq(1)
    .select(1);



  // ==========================
  // Isi Quantity
  // ==========================

  cy.get('input[type="number"]')
    .first()
    .clear()
    .type("2");



  // ==========================
  // Pilih Payment Method
  // ==========================

  cy.contains("Manual Transfer")
    .click();



  // ==========================
  // Shipping Address
  // ==========================

  cy.get("textarea")
    .first()
    .type("Jl. Soekarno Hatta No.99 Malang");



  // ==========================
  // Shipping Cost
  // ==========================

  cy.get('input[type="number"]')
    .last()
    .clear()
    .type("20000");



  // ==========================
  // Notes
  // ==========================

  cy.get("textarea")
    .last()
    .type("Automation Testing Cypress");



  // ==========================
  // Klik Create Transaction
  // ==========================

  cy.contains("button", "Create Transaction")
    .scrollIntoView()
    .should("be.visible")
    .click();



  // Tunggu proses Laravel
  cy.wait(5000);



  // ==========================
  // Validasi tidak terjadi error Laravel
  // ==========================

  cy.contains("SQLSTATE")
    .should("not.exist");


  cy.contains("QueryException")
    .should("not.exist");


  cy.contains("Whoops")
    .should("not.exist");



  // ==========================
  // Validasi berhasil kembali
  // ==========================

  cy.url({ timeout: 15000 })
    .should("include", "/admin/transactions");



  // ==========================
  // Pastikan halaman transaksi muncul
  // ==========================

  cy.contains("Transactions")
    .should("be.visible");


});
});