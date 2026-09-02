Cypress.Commands.add("login", () => {
  cy.session("admin-login", () => {

    cy.visit("/login")

    cy.get("#email")
      .should("be.visible")
      .type(Cypress.env("ADMIN_EMAIL"))

    cy.get("#password")
      .should("be.visible")
      .type(Cypress.env("ADMIN_PASSWORD"))

    cy.get("#login-btn")
      .should("be.visible")
      .click()

    cy.location("pathname", { timeout: 10000 })
      .should("include", "/admin")
  })
})