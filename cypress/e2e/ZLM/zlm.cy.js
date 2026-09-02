describe("ZLM Website", () => {
  it("Membuka halaman utama", () => {
    cy.visit("/");

    cy.get("body")
      .should("be.visible");
  });
});