describe("Menu Pelanggan ZLM", () => {

  // ===================================
  // SETUP
  // ===================================
  beforeEach(() => {
    cy.viewport(1920, 1080);

    cy.login();

    cy.visit("/admin/customers");

    cy.location("pathname")
      .should("eq", "/admin/customers");
  });


  // ===================================
  // PEL-001
  // Membuka Menu Pelanggan
  // ===================================
  it("PEL-001 - Membuka Menu Pelanggan", () => {

    cy.location("pathname")
      .should("eq", "/admin/customers");

    cy.get("h1")
      .should("contain.text", "Pelanggan");

    cy.get("table")
      .should("be.visible");
  });


  // ===================================
  // PEL-002
  // Pencarian Pelanggan
  // ===================================
  it("PEL-002 - Pencarian Pelanggan", () => {

    cy.get("#search")
      .should("be.visible")
      .type("customer");

    cy.get('button[type="submit"]')
      .contains("Terapkan")
      .should("be.visible")
      .click();

    cy.location("pathname")
      .should("eq", "/admin/customers");

    cy.location("search")
      .should("include", "search=customer");

    cy.get("tbody tr")
      .should("have.length.at.least", 1);

    cy.get("tbody tr")
      .each(($row) => {
        cy.wrap($row)
          .should("contain.text", "customer");
      });
  });


  // ===================================
  // PEL-003
  // Filter Active
  // ===================================
  it("PEL-003 - Filter Active", () => {

    cy.get("#status")
      .should("be.visible")
      .select("active");

    cy.get('button[type="submit"]')
      .contains("Terapkan")
      .should("be.visible")
      .click();

    cy.location("pathname")
      .should("eq", "/admin/customers");

    cy.location("search")
      .should("include", "status=active");

    cy.get("tbody tr")
      .should("have.length.at.least", 1);

    cy.get("tbody tr")
      .each(($row) => {
        cy.wrap($row)
          .find("td")
          .eq(2)
          .should("contain.text", "Active");
      });
  });


  // ===================================
  // PEL-004
  // Filter Inactive
  // ===================================
  it("PEL-004 - Filter Inactive", () => {

    cy.get("#status")
      .should("be.visible")
      .select("inactive");

    cy.get('button[type="submit"]')
      .contains("Terapkan")
      .should("be.visible")
      .click();

    cy.location("pathname")
      .should("eq", "/admin/customers");

    cy.location("search")
      .should("include", "status=inactive");

    cy.get("tbody tr")
      .should("have.length.at.least", 1);

    cy.get("tbody tr")
      .each(($row) => {
        cy.wrap($row)
          .find("td")
          .eq(2)
          .should("contain.text", "Inactive");
      });
  });


  // ===================================
  // PEL-005
  // Detail Pelanggan
  // ===================================
  it("PEL-005 - Detail Pelanggan", () => {

    cy.get('a[href*="/admin/customers/"]')
      .contains("Detail")
      .first()
      .should("be.visible")
      .click();

    cy.location("pathname")
      .should("match", /^\/admin\/customers\/[^/]+$/);
  });

});