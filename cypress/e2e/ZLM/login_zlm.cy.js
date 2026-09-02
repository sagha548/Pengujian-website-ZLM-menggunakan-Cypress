describe("Login ZLM", () => {

  beforeEach(() => {
    cy.visit("/login");
  });

  // =====================================================
  // LOGIN-001 - Memasukkan Email dan Password yang Valid
  // =====================================================
  it("LOGIN-001 - Memasukkan Email dan Password yang Valid", () => {

    cy.get("#email")
      .should("be.visible")
      .type(Cypress.env("ADMIN_EMAIL"));

    cy.get("#password")
      .should("be.visible")
      .type(Cypress.env("ADMIN_PASSWORD"));

    cy.get("#login-btn")
      .should("be.visible")
      .click();

    cy.location("pathname", { timeout: 10000 })
      .should("include", "/admin");
  });


  // =====================================================
  // LOGIN-002 - Email Kosong
  // =====================================================
  it("LOGIN-002 - Email Kosong", () => {

    cy.get("#password")
      .should("be.visible")
      .type(Cypress.env("ADMIN_PASSWORD"));

    cy.get("#login-btn")
      .should("be.visible")
      .click();

    cy.get("#email")
      .should("have.prop", "validity")
      .and("have.property", "valid", false);
  });


  // =====================================================
  // LOGIN-003 - Password Kosong
  // =====================================================
  it("LOGIN-003 - Password Kosong", () => {

    cy.get("#email")
      .should("be.visible")
      .type(Cypress.env("ADMIN_EMAIL"));

    cy.get("#login-btn")
      .should("be.visible")
      .click();

    cy.get("#password")
      .should("have.prop", "validity")
      .and("have.property", "valid", false);
  });


  // =====================================================
  // LOGIN-004 - Email dan Password Kosong
  // =====================================================
  it("LOGIN-004 - Email dan Password Kosong", () => {

    cy.get("#login-btn")
      .should("be.visible")
      .click();

    cy.get("#email")
      .should("have.prop", "validity")
      .and("have.property", "valid", false);

    cy.get("#password")
      .should("have.prop", "validity")
      .and("have.property", "valid", false);
  });


  // =====================================================
  // LOGIN-005 - Email Tidak Terdaftar
  // =====================================================
  it("LOGIN-005 - Email Tidak Terdaftar", () => {

    cy.get("#email")
      .should("be.visible")
      .type("salah@email.com");

    cy.get("#password")
      .should("be.visible")
      .type(Cypress.env("ADMIN_PASSWORD"));

    cy.get("#login-btn")
      .should("be.visible")
      .click();

    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/login");

    cy.contains("These credentials do not match our records.")
      .should("be.visible");
  });


  // =====================================================
  // LOGIN-006 - Show / Hide Password
  // =====================================================
  it("LOGIN-006 - Show Hide Password", () => {

    cy.get("#password")
      .should("be.visible")
      .type(Cypress.env("ADMIN_PASSWORD"))
      .should("have.attr", "type", "password");

    // Show password
    cy.get("#eye-icon")
      .closest("button")
      .should("be.visible")
      .click();

    cy.get("#password")
      .should("have.attr", "type", "text");

    // Hide password
    cy.get("#eye-icon")
      .closest("button")
      .should("be.visible")
      .click();

    cy.get("#password")
      .should("have.attr", "type", "password");
  });


  // =====================================================
  // LOGIN-007 - Logout Session
  // =====================================================
  it("LOGIN-007 - Logout Session", () => {

    cy.login();

    cy.visit("/admin");

    cy.location("pathname", { timeout: 10000 })
      .should("include", "/admin");

    // Pastikan sidebar terlihat
    cy.get("#admin-sidebar")
      .invoke("removeClass", "hidden");

    // Logout
    cy.get('button[title="Logout"]')
      .should("be.visible")
      .click();

    // Pastikan berhasil logout
    cy.location("pathname", { timeout: 10000 })
      .should("eq", "/");
  });

});