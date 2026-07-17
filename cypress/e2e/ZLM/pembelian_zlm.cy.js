describe("Menu Pembelian ZLM", () => {


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
    // HALAMAN PEMBELIAN
    // ==========================

    cy.visit("https://zlm.hummatech.com/admin/transactions")


    cy.wait(3000)

  })





  // =====================================================
  // PUR-001 - Membuka Menu Pembelian
  // =====================================================

  it("PUR-001 - Membuka Menu Pembelian", () => {


    cy.url()
      .should("include", "/admin/transactions")


    cy.contains("Total Orders")
      .should("be.visible")


  })





  // =====================================================
  // PUR-002 - Menampilkan Statistik Pembelian
  // =====================================================

  it("PUR-002 - Menampilkan Statistik Pembelian", () => {


    cy.contains("Total Orders")
      .should("be.visible")


    cy.contains("Total Revenue")
      .should("be.visible")


    cy.get("body")
      .should("contain.text", "Rp")


  })





  // =====================================================
  // PUR-003 - Menampilkan Data Pembelian
  // =====================================================

  it("PUR-003 - Menampilkan Data Pembelian", () => {


    cy.contains("ORD-")
      .should("be.visible")


    cy.contains("Customer")
      .should("exist")


    cy.contains("Status")
      .should("exist")


  })





  // =====================================================
  // PUR-004 - Menampilkan Nomor Order
  // =====================================================

  it("PUR-004 - Menampilkan Nomor Order", () => {


    cy.contains("ORD-")
      .first()
      .should("be.visible")


  })





  // =====================================================
  // PUR-005 - Filter Status
  // =====================================================

  it("PUR-005 - Filter Status Transaksi", () => {


    cy.get("select")
      .first()
      .find("option")
      .then(($option) => {


        const value = $option
          .eq(1)
          .val()


        cy.get("select")
          .first()
          .select(value)


      })


    cy.wait(2000)


    cy.contains("ORD-")
      .should("exist")


  })





  // =====================================================
  // PUR-006 - Filter Payment
  // =====================================================

  it("PUR-006 - Filter Payment", () => {


    cy.get("select")
      .eq(1)
      .find("option")
      .then(($option) => {


        const value = $option
          .eq(1)
          .val()


        cy.get("select")
          .eq(1)
          .select(value)


      })


    cy.wait(2000)


    cy.contains("ORD-")
      .should("exist")


  })





  // =====================================================
  // PUR-007 - Tombol Filter
  // =====================================================

  it("PUR-007 - Menggunakan Filter", () => {


    cy.get("button")
      .contains("Filter")
      .click({force:true})


    cy.wait(2000)


    cy.contains("ORD-")
      .should("exist")


  })





  // =====================================================
  // PUR-008 - Reset Filter
  // =====================================================

  it("PUR-008 - Reset Filter", () => {


    cy.get("button")
      .then(($button)=>{


        const jumlahButton = $button.length


        cy.get("button")
          .eq(jumlahButton - 1)
          .click({force:true})


      })


    cy.wait(2000)


    cy.contains("ORD-")
      .should("exist")


  })





  // =====================================================
  // PUR-009 - Melihat Detail Pembelian
  // =====================================================

  it("PUR-009 - Melihat Detail Pembelian", () => {


    cy.contains("ORD-")
      .first()
      .click({force:true})


    cy.wait(3000)


    cy.contains("Order")
      .scrollIntoView()
      .should("exist")


  })





})