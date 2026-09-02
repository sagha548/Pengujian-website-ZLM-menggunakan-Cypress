describe("Laptop Management ZLM", () => {

  beforeEach(() => {
    // Tampilan desktop
    cy.viewport(1400, 900);

    // Login menggunakan custom command
    cy.login();

    // Masuk ke halaman Laptop
    cy.visit("/admin/laptops");

    cy.location("pathname")
      .should("eq", "/admin/laptops");
  });


  // =====================================================
  // LAPTOP-001
  // Menampilkan halaman daftar laptop
  // =====================================================
  it("LAPTOP-001 - Menampilkan halaman daftar laptop", () => {

    cy.get("h1")
      .should("contain", "Laptop");

    cy.get("table")
      .should("be.visible");

    cy.get("tbody tr")
      .should("have.length.greaterThan", 0);
  });


  // =====================================================
  // LAPTOP-002
  // Mencari data laptop
  // =====================================================
  it("LAPTOP-002 - Mencari data laptop", () => {

    cy.get('input[name="search"]')
      .should("be.visible")
      .clear()
      .type("ASUS");

    // Pastikan hasil pencarian menampilkan laptop MSI
    cy.contains("tbody tr", "MSI", {
      timeout: 10000
    })
      .should("be.visible");
  });


  // =====================================================
  // LAPTOP-003
  // Membuka halaman tambah laptop
  // =====================================================
  it("LAPTOP-003 - Membuka halaman tambah laptop", () => {

    cy.contains("a", "Add Laptop")
      .should("be.visible")
      .click();

    cy.location("pathname", {
      timeout: 10000
    })
      .should("eq", "/admin/laptops/create");

    cy.get("form")
      .should("be.visible");
  });


  // =====================================================
  // LAPTOP-004
  // Membuka detail laptop
  // =====================================================
  it("LAPTOP-004 - Membuka detail laptop", () => {

    cy.get('a[title="Lihat Detail"]')
      .should("exist")
      .first()
      .click();

    cy.location("pathname", {
      timeout: 10000
    })
      .should("match", /\/admin\/laptops\/.+/);
  });


  // =====================================================
  // LAPTOP-005
  // Membuka halaman edit laptop
  // =====================================================
  it("LAPTOP-005 - Membuka halaman edit laptop", () => {

    cy.get('a[title="Edit"]')
      .should("exist")
      .first()
      .click();

    cy.location("pathname", {
      timeout: 10000
    })
      .should("include", "/edit");
  });


  // =====================================================
  // LAPTOP-006
  // Menambahkan laptop baru
  //
  // Laptop dibuat menggunakan nama unik.
  // Data ini nantinya digunakan oleh LAPTOP-007
  // untuk proses penghapusan.
  // =====================================================
  it("LAPTOP-006 - Menambahkan Laptop Baru", () => {

    const laptopName = `Automation Laptop ${Date.now()}`;

    // -----------------------------------------
    // Buka halaman tambah laptop
    // -----------------------------------------
    cy.contains("a", "Add Laptop")
      .should("be.visible")
      .click();

    cy.location("pathname", {
      timeout: 10000
    })
      .should("eq", "/admin/laptops/create");


    // -----------------------------------------
    // Nama
    // -----------------------------------------
    cy.get('input[name="name"]')
      .should("be.visible")
      .type(laptopName);


    // -----------------------------------------
    // Brand
    // -----------------------------------------
    cy.get('input[name="brand"]')
      .should("be.visible")
      .type("ASUS");


    // -----------------------------------------
    // Description - TRIX
    // -----------------------------------------
    cy.window().then((win) => {

      const input = win.document.querySelector("#description");

      if (input) {

        input.value =
          "Laptop untuk pengujian automation menggunakan Cypress.";

        input.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );

        input.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        );
      }
    });


    // -----------------------------------------
    // Harga
    // -----------------------------------------
    cy.get('input[name="price"]')
      .should("be.visible")
      .type("15000000");


    // -----------------------------------------
    // Stock
    // -----------------------------------------
    cy.get('input[name="stock"]')
      .should("be.visible")
      .clear()
      .type("10");


    // -----------------------------------------
    // Processor
    // -----------------------------------------
    cy.get('input[name="processor"]')
      .should("be.visible")
      .type("Intel Core i7");


    // -----------------------------------------
    // RAM
    // -----------------------------------------
    cy.get('input[name="ram"]')
      .should("be.visible")
      .type("16 GB");


    // -----------------------------------------
    // Storage
    // -----------------------------------------
    cy.get('input[name="storage"]')
      .should("be.visible")
      .type("512 GB SSD");


    // -----------------------------------------
    // Graphics
    // -----------------------------------------
    cy.get('input[name="graphics"]')
      .should("be.visible")
      .type("NVIDIA RTX 4060");


    // -----------------------------------------
    // Display
    // -----------------------------------------
    cy.get('input[name="display"]')
      .should("be.visible")
      .type('15.6" FHD IPS');


    // -----------------------------------------
    // Weight
    // -----------------------------------------
    cy.get('input[name="weight"]')
      .should("be.visible")
      .type("1.8");


    // -----------------------------------------
    // Battery
    // -----------------------------------------
    cy.get('input[name="battery_life"]')
      .should("be.visible")
      .type("10 Jam");


    // -----------------------------------------
    // Kelebihan - TRIX
    // -----------------------------------------
    cy.window().then((win) => {

      const input = win.document.querySelector("#kelebihan");

      if (input) {

        input.value =
          "Performa tinggi\nSSD cepat\nRingan";

        input.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );

        input.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        );
      }
    });


    // -----------------------------------------
    // Kekurangan - TRIX
    // -----------------------------------------
    cy.window().then((win) => {

      const input = win.document.querySelector("#kekurangan");

      if (input) {

        input.value =
          "Harga cukup mahal";

        input.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );

        input.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        );
      }
    });


    // -----------------------------------------
    // CATEGORY
    // -----------------------------------------
    // Tidak memilih Automation Testing karena
    // category tersebut tidak tersedia pada halaman.
    //
    // Jika category memang WAJIB diisi pada aplikasi,
    // gunakan category yang benar-benar tersedia.


    // -----------------------------------------
    // Featured
    // -----------------------------------------
    cy.get("#is_featured")
      .check();


    // -----------------------------------------
    // Intercept proses create
    // -----------------------------------------
    cy.intercept("POST", "**/admin/laptops")
      .as("createLaptop");


    // -----------------------------------------
    // Submit
    // -----------------------------------------
    cy.contains("button", "Create Laptop")
      .should("be.visible")
      .click();


    // -----------------------------------------
    // Validasi response
    // -----------------------------------------
    cy.wait("@createLaptop")
      .then(({ response }) => {

        expect(response).to.exist;

        expect([200, 201, 302])
          .to.include(response.statusCode);
      });


    // -----------------------------------------
    // Kembali ke halaman laptop
    // -----------------------------------------
    cy.location("pathname", {
      timeout: 10000
    })
      .should("eq", "/admin/laptops");


    // -----------------------------------------
    // Pastikan laptop berhasil dibuat
    // -----------------------------------------
    cy.contains("tbody tr", laptopName, {
      timeout: 10000
    })
      .should("be.visible");
  });


  // =====================================================
  // LAPTOP-007
  // Menghapus laptop hasil automation
  //
  // Laptop yang dihapus adalah laptop yang dibuat
  // oleh LAPTOP-006, sehingga tidak mengganggu
  // data laptop asli.
  // =====================================================
  it("LAPTOP-007 - Menghapus Laptop Hasil Automation", () => {

    const laptopName = `Automation Laptop ${Date.now()}`;


    // =================================================
    // STEP 1
    // Tambahkan laptop terlebih dahulu
    // =================================================
    cy.contains("a", "Add Laptop")
      .should("be.visible")
      .click();

    cy.location("pathname", {
      timeout: 10000
    })
      .should("eq", "/admin/laptops/create");


    // -----------------------------------------
    // Nama
    // -----------------------------------------
    cy.get('input[name="name"]')
      .should("be.visible")
      .type(laptopName);


    // -----------------------------------------
    // Brand
    // -----------------------------------------
    cy.get('input[name="brand"]')
      .should("be.visible")
      .type("ASUS");


    // -----------------------------------------
    // Description - TRIX
    // -----------------------------------------
    cy.window().then((win) => {

      const input = win.document.querySelector("#description");

      if (input) {

        input.value =
          "Laptop untuk pengujian delete menggunakan Cypress.";

        input.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );

        input.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        );
      }
    });


    // -----------------------------------------
    // Harga
    // -----------------------------------------
    cy.get('input[name="price"]')
      .should("be.visible")
      .type("15000000");


    // -----------------------------------------
    // Stock
    // -----------------------------------------
    cy.get('input[name="stock"]')
      .should("be.visible")
      .clear()
      .type("10");


    // -----------------------------------------
    // Processor
    // -----------------------------------------
    cy.get('input[name="processor"]')
      .should("be.visible")
      .type("Intel Core i7");


    // -----------------------------------------
    // RAM
    // -----------------------------------------
    cy.get('input[name="ram"]')
      .should("be.visible")
      .type("16 GB");


    // -----------------------------------------
    // Storage
    // -----------------------------------------
    cy.get('input[name="storage"]')
      .should("be.visible")
      .type("512 GB SSD");


    // -----------------------------------------
    // Graphics
    // -----------------------------------------
    cy.get('input[name="graphics"]')
      .should("be.visible")
      .type("NVIDIA RTX 4060");


    // -----------------------------------------
    // Display
    // -----------------------------------------
    cy.get('input[name="display"]')
      .should("be.visible")
      .type('15.6" FHD IPS');


    // -----------------------------------------
    // Weight
    // -----------------------------------------
    cy.get('input[name="weight"]')
      .should("be.visible")
      .type("1.8");


    // -----------------------------------------
    // Battery
    // -----------------------------------------
    cy.get('input[name="battery_life"]')
      .should("be.visible")
      .type("10 Jam");


    // -----------------------------------------
    // Kelebihan - TRIX
    // -----------------------------------------
    cy.window().then((win) => {

      const input = win.document.querySelector("#kelebihan");

      if (input) {

        input.value =
          "Performa tinggi\nSSD cepat\nRingan";

        input.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );

        input.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        );
      }
    });


    // -----------------------------------------
    // Kekurangan - TRIX
    // -----------------------------------------
    cy.window().then((win) => {

      const input = win.document.querySelector("#kekurangan");

      if (input) {

        input.value =
          "Harga cukup mahal";

        input.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );

        input.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        );
      }
    });


    // -----------------------------------------
    // Featured
    // -----------------------------------------
    cy.get("#is_featured")
      .check();


    // -----------------------------------------
    // Intercept create
    // -----------------------------------------
    cy.intercept("POST", "**/admin/laptops")
      .as("createLaptopForDelete");


    // -----------------------------------------
    // Submit
    // -----------------------------------------
    cy.contains("button", "Create Laptop")
      .should("be.visible")
      .click();


    // -----------------------------------------
    // Tunggu proses create
    // -----------------------------------------
    cy.wait("@createLaptopForDelete")
      .then(({ response }) => {

        expect(response).to.exist;

        expect([200, 201, 302])
          .to.include(response.statusCode);
      });


    // -----------------------------------------
    // Pastikan kembali ke list
    // -----------------------------------------
    cy.location("pathname", {
      timeout: 10000
    })
      .should("eq", "/admin/laptops");


    // -----------------------------------------
    // Pastikan laptop dibuat
    // -----------------------------------------
    cy.contains("tbody tr", laptopName, {
      timeout: 10000
    })
      .should("be.visible");


    // =================================================
    // STEP 2
    // Hapus laptop yang BARU dibuat
    // =================================================

    cy.contains("tbody tr", laptopName, {
      timeout: 10000
    })
      .should("be.visible")
      .within(() => {

        cy.get('button[title="Delete"]')
          .should("be.visible")
          .click();
      });


    // -----------------------------------------
    // Konfirmasi delete
    // -----------------------------------------
    cy.on("window:confirm", () => true);


    // -----------------------------------------
    // Reload halaman
    // -----------------------------------------
    cy.reload();


    // -----------------------------------------
    // Pastikan laptop automation sudah hilang
    // -----------------------------------------
    cy.contains("tbody tr", laptopName, {
      timeout: 10000
    })
      .should("not.exist");
  });

});