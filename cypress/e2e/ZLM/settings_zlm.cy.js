describe("ZLM - Pengaturan Toko", () => {

  beforeEach(() => {

    // Menggunakan custom command untuk login
    cy.login();

    // Masuk ke halaman Pengaturan
    cy.visit("/admin/settings");

    cy.contains("Pengaturan Toko", { timeout: 15000 })
      .should("be.visible");
  });


  // =====================================================
  // SETTINGS-001
  // Update General Settings
  // =====================================================
  it("SETTINGS-001 - Update General Settings", () => {

    cy.contains("button", "General")
      .should("be.visible")
      .click();

    cy.get("#store_name")
      .should("be.visible")
      .clear()
      .type("ZLM Automation");

    cy.get("#store_description")
      .should("be.visible")
      .clear()
      .type("Automation Testing menggunakan Cypress");

    cy.get("#store_email")
      .should("be.visible")
      .clear()
      .type("automation@test.com");

    cy.get("#store_phone")
      .should("be.visible")
      .clear()
      .type("081234567890");

    cy.get("#store_opening_hours")
      .should("be.visible")
      .clear()
      .type("08:00 - 17:00");


    // Monitor proses penyimpanan
    cy.intercept("PUT", "**/admin/settings*")
      .as("saveSettings");


    cy.contains("button", "Save Settings")
      .should("be.visible")
      .click();


    // Validasi response
    cy.wait("@saveSettings")
      .then(({ response }) => {

        expect(response).to.exist;

        expect([200, 302])
          .to.include(response.statusCode);

      });


    // Validasi data tersimpan
    cy.get("#store_name")
      .should("have.value", "ZLM Automation");

  });


  // =====================================================
  // SETTINGS-002
  // Update Social Media
  // =====================================================
  it("SETTINGS-002 - Update Social Media", () => {

    cy.contains("button", "Sosial Media")
      .should("be.visible")
      .click();


    // Pastikan tab Sosial Media aktif
    cy.get("#social_instagram")
      .should("be.visible")
      .clear()
      .type("https://instagram.com/zlmautomation");

    cy.get("#social_facebook")
      .should("be.visible")
      .clear()
      .type("https://facebook.com/zlmautomation");

    cy.get("#social_tiktok")
      .should("be.visible")
      .clear()
      .type("https://tiktok.com/@zlmautomation");

    cy.get("#social_youtube")
      .should("be.visible")
      .clear()
      .type("https://youtube.com/@zlmautomation");

    cy.get("#store_whatsapp")
      .should("be.visible")
      .clear()
      .type("6281234567890");


    // Monitor proses penyimpanan
    cy.intercept("PUT", "**/admin/settings*")
      .as("saveSettings");


    cy.contains("button", "Save Settings")
      .should("be.visible")
      .click();


    // Validasi response
    cy.wait("@saveSettings")
      .then(({ response }) => {

        expect(response).to.exist;

        expect([200, 302])
          .to.include(response.statusCode);

      });


    // Validasi data tersimpan
    cy.get("#social_instagram")
      .should("have.value", "https://instagram.com/zlmautomation");

  });


  // =====================================================
  // SETTINGS-003
  // Update Location
  // =====================================================
  it("SETTINGS-003 - Update Location", () => {

    cy.contains("button", "Lokasi")
      .should("be.visible")
      .click();


    cy.get("#store_address")
      .should("be.visible")
      .clear()
      .type("Jl. Soekarno Hatta No. 99, Malang");

    cy.get("#store_google_maps")
      .should("be.visible")
      .clear()
      .type("https://maps.google.com");


    // Monitor proses penyimpanan
    cy.intercept("PUT", "**/admin/settings*")
      .as("saveSettings");


    cy.contains("button", "Save Settings")
      .should("be.visible")
      .click();


    // Validasi response
    cy.wait("@saveSettings")
      .then(({ response }) => {

        expect(response).to.exist;

        expect([200, 302])
          .to.include(response.statusCode);

      });


    // Validasi data tersimpan
    cy.get("#store_address")
      .should(
        "have.value",
        "Jl. Soekarno Hatta No. 99, Malang"
      );

  });


  // =====================================================
  // SETTINGS-004
  // Store Name wajib diisi
  // =====================================================
  it("SETTINGS-004 - Store Name wajib diisi", () => {

    cy.contains("button", "General")
      .should("be.visible")
      .click();

    cy.get("#store_name")
      .should("be.visible")
      .clear();

    cy.contains("button", "Save Settings")
      .should("be.visible")
      .click();

    cy.get("#store_name")
      .then(($input) => {

        expect($input[0].checkValidity())
          .to.equal(false);

      });

  });

});