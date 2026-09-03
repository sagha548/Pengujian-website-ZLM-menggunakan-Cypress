describe('UAT - Hero Slider ZLM', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/admin/sliders');

    cy.url()
      .should('include', '/admin/sliders');
  });


  // =====================================================
  // UAT-SLIDER-001
  // Admin dapat mengakses menu Hero Slider
  // =====================================================
  it('Admin dapat mengakses menu Hero Slider', () => {

    cy.url()
      .should('include', '/admin/sliders');

    cy.contains('Hero Slider')
      .should('exist');

    cy.contains('Tambah Slider')
      .should('be.visible');
  });


  // =====================================================
  // UAT-SLIDER-002
  // Admin dapat menambahkan slider
  // =====================================================
  it('Admin dapat menambahkan slider', () => {

    const sliderTitle = `Slider Cypress ${Date.now()}`;

    cy.contains('Tambah Slider')
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/admin/sliders/create');

    // Isi judul
    cy.get('input[name="title"]')
      .should('be.visible')
      .type(sliderTitle);

    // Isi deskripsi
    cy.get('textarea[name="description"]')
      .should('be.visible')
      .type('Automation Testing');

    // Upload gambar
    cy.get('input[type="file"]')
      .should('exist')
      .selectFile('cypress/fixtures/slider.jpg');

    // Submit form
    cy.get('form')
      .find('button[type="submit"]')
      .last()
      .should('be.visible')
      .click();

    // Pastikan kembali ke halaman Hero Slider
    cy.url({ timeout: 10000 })
      .should('include', '/admin/sliders');

    // Pastikan slider berhasil dibuat
    cy.contains(sliderTitle)
      .should('be.visible');

    // Cleanup slider yang dibuat oleh test
    cy.contains(sliderTitle)
      .closest('tr')
      .within(() => {
        cy.on('window:confirm', () => true);

        cy.get('button[title="Delete"]')
          .should('be.visible')
          .click();
      });

    // Pastikan slider sudah benar-benar hilang
    cy.contains(sliderTitle)
      .should('not.exist');
  });


  // =====================================================
  // UAT-SLIDER-003
  // Admin dapat mengubah slider
  // =====================================================
  it('Admin dapat mengubah slider', () => {

    const sliderTitle = `Slider Cypress ${Date.now()}`;
    const updatedTitle = `Slider Cypress Updated ${Date.now()}`;

    // Buat data slider terlebih dahulu
    cy.contains('Tambah Slider')
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/admin/sliders/create');

    cy.get('input[name="title"]')
      .should('be.visible')
      .type(sliderTitle);

    cy.get('textarea[name="description"]')
      .should('be.visible')
      .type('Automation Testing');

    cy.get('input[type="file"]')
      .should('exist')
      .selectFile('cypress/fixtures/slider.jpg');

    cy.get('form')
      .find('button[type="submit"]')
      .last()
      .should('be.visible')
      .click();

    cy.url({ timeout: 10000 })
      .should('include', '/admin/sliders');

    // Pastikan data berhasil dibuat
    cy.contains(sliderTitle)
      .should('be.visible');

    // Edit slider yang baru dibuat
    cy.contains(sliderTitle)
      .closest('tr')
      .within(() => {
        cy.get('a[title="Edit"]')
          .should('be.visible')
          .click();
      });

    cy.url()
      .should('include', '/edit');

    // Ubah judul
    cy.get('input[name="title"]')
      .should('be.visible')
      .clear()
      .type(updatedTitle);

    // Ubah deskripsi
    cy.get('textarea[name="description"]')
      .should('be.visible')
      .clear()
      .type('Automation Testing Updated');

    // Submit form
    cy.get('form')
      .find('button[type="submit"]')
      .last()
      .should('be.visible')
      .click();

    // Pastikan kembali ke daftar slider
    cy.url({ timeout: 10000 })
      .should('include', '/admin/sliders');

    // Pastikan data sudah berubah
    cy.contains(updatedTitle)
      .should('be.visible');

    // Cleanup slider hasil test
    cy.contains(updatedTitle)
      .closest('tr')
      .within(() => {
        cy.on('window:confirm', () => true);

        cy.get('button[title="Delete"]')
          .should('be.visible')
          .click();
      });

    // Pastikan slider sudah benar-benar hilang
    cy.contains(updatedTitle)
      .should('not.exist');
  });


   // =====================================================
  // UAT-SLIDER-004
  // Admin dapat menghapus slider
  // =====================================================
  it('Admin dapat menghapus slider', () => {

    const sliderTitle = `Slider Cypress Delete ${Date.now()}`;

    // Buat data slider terlebih dahulu
    cy.contains('Tambah Slider')
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/admin/sliders/create');

    cy.get('input[name="title"]')
      .should('be.visible')
      .type(sliderTitle);

    cy.get('textarea[name="description"]')
      .should('be.visible')
      .type('Automation Testing');

    cy.get('input[type="file"]')
      .should('exist')
      .selectFile('cypress/fixtures/slider.jpg');

    cy.get('form')
      .find('button[type="submit"]')
      .last()
      .should('be.visible')
      .click();

    cy.url({ timeout: 10000 })
      .should('include', '/admin/sliders');

    // Pastikan data berhasil dibuat
    cy.contains(sliderTitle)
      .should('be.visible');

    // Hapus slider yang dibuat sendiri
    cy.contains(sliderTitle)
      .closest('tr')
      .within(() => {
        cy.on('window:confirm', () => true);

        cy.get('button[title="Delete"]')
          .should('be.visible')
          .click();
      });

    // Verifikasi slider benar-benar hilang
    cy.contains(sliderTitle)
      .should('not.exist');

    // Pastikan tetap berada di halaman Hero Slider
    cy.url()
      .should('include', '/admin/sliders');
  });


  // =====================================================
  // UAT-SLIDER-005
  // Admin dapat melihat daftar slider
  // =====================================================
  it('Admin dapat melihat daftar slider', () => {

    cy.get('table')
      .should('be.visible');

    cy.contains('Image')
      .should('exist');

    cy.contains('Title')
      .should('exist');

    cy.contains('Order')
      .should('exist');

    cy.contains('Status')
      .should('exist');

    cy.contains('Actions')
      .should('exist');

    cy.get('tbody tr')
      .should('have.length.greaterThan', 0);
  });


  // =====================================================
  // UAT-SLIDER-006
  // Admin dapat menggunakan pagination slider
  // =====================================================
  it('Admin dapat menggunakan pagination slider', () => {

    cy.get('nav[role="navigation"]')
      .should('exist');

    cy.get('a[aria-label="Go to page 2"]')
      .should('exist')
      .click();

    cy.url()
      .should('include', 'page=2');

    cy.get('table')
      .should('be.visible');
  });

});