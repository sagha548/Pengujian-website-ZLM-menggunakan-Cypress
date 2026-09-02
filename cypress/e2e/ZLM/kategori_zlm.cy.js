describe("Category Management ZLM", () => {

  beforeEach(() => {
    // =====================================================
    // SETUP
    // =====================================================

    cy.viewport(1920, 1080);

    // Login menggunakan custom command
    cy.login();

    // Buka halaman kategori
    cy.visit("/admin/categories");

    // Pastikan halaman kategori berhasil dibuka
    cy.location("pathname")
      .should("eq", "/admin/categories");
  });


  // =====================================================
  // CATEGORY-001
  // Menampilkan halaman kategori
  // =====================================================
  it("CATEGORY-001 - Menampilkan halaman kategori", () => {

    cy.get("h1")
      .should("be.visible")
      .and("contain", "Kategori");

    cy.contains("Manage product categories")
      .should("be.visible");

    cy.get('input[name="search"]')
      .should("be.visible");

    // Tombol Add Category
    cy.get('a[href$="/admin/categories/create"]')
      .should("be.visible")
      .and("contain", "Add Category");
  });


  // =====================================================
  // CATEGORY-002
  // Mencari kategori
  // =====================================================
  it("CATEGORY-002 - Mencari kategori", () => {

    const searchKeyword = "gaming";

    // Monitor request pencarian
    cy.intercept(
      "GET",
      "**/admin/categories?search=*"
    ).as("searchCategory");

    // Isi pencarian
    cy.get('input[name="search"]')
      .should("be.visible")
      .clear()
      .type(`${searchKeyword}{enter}`);

    // Pastikan request berhasil
    cy.wait("@searchCategory")
      .its("response.statusCode")
      .should("eq", 200);

    // Validasi parameter search
    cy.location("search")
      .then((search) => {

        const params = new URLSearchParams(search);

        expect(params.get("search"))
          .to.eq(searchKeyword);

      });

    // Validasi hasil pencarian
    cy.contains(searchKeyword, {
      timeout: 10000
    })
      .should("be.visible");
  });


  // =====================================================
  // CATEGORY-003
  // Membuka halaman tambah kategori
  // =====================================================
  it("CATEGORY-003 - Membuka halaman tambah kategori", () => {

    cy.get('a[href$="/admin/categories/create"]')
      .should("be.visible")
      .and("contain", "Add Category")
      .click();

    // Validasi URL
    cy.location("pathname")
      .should("eq", "/admin/categories/create");
  });


  // =====================================================
  // CATEGORY-004
  // Membuka halaman edit kategori
  // =====================================================
  it("CATEGORY-004 - Membuka halaman edit kategori", () => {

    // Cari link edit kategori
    cy.get('a[href*="/admin/categories/"][href$="/edit"]')
      .should("have.length.greaterThan", 0)
      .first()
      .should("be.visible")
      .click();

    // Validasi URL halaman edit
    cy.location("pathname")
      .should(
        "match",
        /\/admin\/categories\/.+\/edit$/
      );
  });


  // =====================================================
  // CATEGORY-005
  // Menambahkan kategori baru
  // =====================================================
  it("CATEGORY-005 - Menambahkan kategori baru", () => {

    const categoryName =
      `Automation Create ${Date.now()}`;


    // -----------------------------------------------------
    // Buka halaman tambah kategori
    // -----------------------------------------------------

    cy.get('a[href$="/admin/categories/create"]')
      .should("be.visible")
      .and("contain", "Add Category")
      .click();

    cy.location("pathname")
      .should("eq", "/admin/categories/create");


    // -----------------------------------------------------
    // Isi form kategori
    // -----------------------------------------------------

    cy.get('input[name="name"]')
      .should("be.visible")
      .type(categoryName);

    cy.get('input[name="icon"]')
      .should("be.visible")
      .clear()
      .type("solar:folder-linear");

    cy.get('textarea[name="description"]')
      .should("be.visible")
      .type(
        "Kategori khusus untuk automation testing."
      );

    cy.get('input[type="checkbox"]')
      .should("exist")
      .check();


    // -----------------------------------------------------
    // Monitor proses create
    // -----------------------------------------------------

    cy.intercept(
      "POST",
      "**/admin/categories"
    ).as("createCategory");


    // -----------------------------------------------------
    // Submit form
    // -----------------------------------------------------

    cy.contains("button", "Create Category")
      .should("be.visible")
      .click();


    // -----------------------------------------------------
    // Validasi response create
    // -----------------------------------------------------

    cy.wait("@createCategory")
      .then(({ response }) => {

        expect(response).to.exist;

        expect([200, 201, 302])
          .to.include(response.statusCode);

      });


    // -----------------------------------------------------
    // Validasi kembali ke halaman kategori
    // -----------------------------------------------------

    cy.location("pathname", {
      timeout: 10000
    })
      .should("eq", "/admin/categories");


    // -----------------------------------------------------
    // Cari kategori yang baru dibuat
    // -----------------------------------------------------

    cy.intercept(
      "GET",
      "**/admin/categories?search=*"
    ).as("searchCreatedCategory");

    cy.get('input[name="search"]')
      .should("be.visible")
      .clear()
      .type(`${categoryName}{enter}`);


    // -----------------------------------------------------
    // Validasi request search
    // -----------------------------------------------------

    cy.wait("@searchCreatedCategory")
      .its("response.statusCode")
      .should("eq", 200);


    // -----------------------------------------------------
    // Validasi parameter URL
    // -----------------------------------------------------

    cy.location("search")
      .then((search) => {

        const params = new URLSearchParams(search);

        expect(params.get("search"))
          .to.eq(categoryName);

      });


    // -----------------------------------------------------
    // Validasi kategori berhasil dibuat
    // -----------------------------------------------------

    cy.contains(categoryName, {
      timeout: 10000
    })
      .should("be.visible");

  });

// =====================================================
// CATEGORY-006
// Menghapus kategori
// =====================================================
it("CATEGORY-006 - Menghapus kategori", () => {

  // ---------------------------------------------
  // Pastikan terdapat kategori yang bisa dihapus
  // ---------------------------------------------
  cy.get("tbody tr", { timeout: 10000 })
    .should("have.length.greaterThan", 0);

  // Simpan jumlah kategori sebelum dihapus
  cy.get("tbody tr")
    .then(($rows) => {

      const totalBefore = $rows.length;

      // ---------------------------------------------
      // Ambil kategori pertama yang memiliki tombol Delete
      // ---------------------------------------------
      cy.get("tbody tr")
        .filter(":has(button[title='Delete'])")
        .first()
        .should("be.visible")
        .within(() => {

          // Pastikan tombol Delete tersedia
          cy.get('button[title="Delete"]')
            .should("be.visible");

          // Konfirmasi browser
          cy.on("window:confirm", (message) => {
            expect(message).to.contain("Delete this category?");
            return true;
          });

          // Klik Delete
          cy.get('button[title="Delete"]')
            .click();
        });

      // ---------------------------------------------
      // Tunggu halaman kembali / refresh
      // ---------------------------------------------
      cy.location("pathname", {
        timeout: 10000
      })
        .should("eq", "/admin/categories");

      // ---------------------------------------------
      // Pastikan jumlah kategori berkurang
      // ---------------------------------------------
      cy.get("tbody tr", {
        timeout: 10000
      })
        .should(($newRows) => {

          expect($newRows.length)
            .to.be.lessThan(totalBefore);

        });

    });

});
});