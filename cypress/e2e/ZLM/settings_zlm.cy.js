describe("ZLM - Pengaturan Toko", () => {

  beforeEach(() => {

    cy.visit("https://zlm.hummatech.com/login");

    cy.get("#email", { timeout: 10000 })
      .type("admin@zlm.id");

    cy.get("#password")
      .type("admin123");

    cy.get("#login-btn")
      .click();

    cy.url({ timeout: 15000 })
      .should("include", "/admin");

    cy.visit("https://zlm.hummatech.com/admin/settings");

    cy.contains("Pengaturan Toko", { timeout: 15000 })
      .should("exist");
  });


  //=====================================================
  // SETTINGS-001
  //=====================================================

  it("SETTINGS-001 - Update General Settings", () => {

    cy.contains("button", "General")
      .click({ force: true });

    cy.get("#store_name")
      .clear()
      .type("ZLM Automation");

    cy.get("#store_description")
      .clear()
      .type("Automation Testing menggunakan Cypress");

    cy.get("#store_email")
      .clear()
      .type("automation@test.com");

    cy.get("#store_phone")
      .clear()
      .type("081234567890");

    cy.get("#store_opening_hours")
      .clear()
      .type("08:00 - 17:00");

    cy.contains("button", "Save Settings")
      .click({ force: true });

  });



  //=====================================================
  // SETTINGS-002
  //=====================================================

  it("SETTINGS-002 - Update Social Media", () => {

    cy.contains("button", "Sosial Media")
      .click({ force: true });

    cy.wait(500);

    cy.get("#social_instagram")
      .scrollIntoView()
      .clear({ force: true })
      .type("https://instagram.com/zlmautomation", { force: true });

    cy.get("#social_facebook")
      .clear({ force: true })
      .type("https://facebook.com/zlmautomation", { force: true });

    cy.get("#social_tiktok")
      .clear({ force: true })
      .type("https://tiktok.com/@zlmautomation", { force: true });

    cy.get("#social_youtube")
      .clear({ force: true })
      .type("https://youtube.com/@zlmautomation", { force: true });

    cy.get("#store_whatsapp")
      .clear({ force: true })
      .type("6281234567890", { force: true });

    cy.contains("button", "Save Settings")
      .click({ force: true });

  });



  //=====================================================
  // SETTINGS-003
  //=====================================================

  it("SETTINGS-003 - Update Location", () => {

    cy.contains("button", "Lokasi")
      .click({ force: true });

    cy.wait(500);

    cy.get("#store_address")
      .scrollIntoView()
      .clear({ force: true })
      .type("Jl. Soekarno Hatta No. 99, Malang", { force: true });

    cy.get("#store_google_maps")
      .clear({ force: true })
      .type("https://maps.google.com", { force: true });

    cy.contains("button", "Save Settings")
      .click({ force: true });

  });



  //=====================================================
  // SETTINGS-004
  //=====================================================

  it("SETTINGS-004 - Store Name wajib diisi", () => {

    cy.contains("button", "General")
      .click({ force: true });

    cy.get("#store_name")
      .clear();

    cy.contains("button", "Save Settings")
      .click({ force: true });

    cy.get("#store_name")
      .then(($input) => {
        expect($input[0].checkValidity()).to.equal(false);
      });

  });

});