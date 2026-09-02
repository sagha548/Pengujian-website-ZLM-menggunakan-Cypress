describe('UAT - Hero Slider ZLM', () => {

  beforeEach(() => {
    // Login sebagai admin
    cy.visit('/login');

    cy.get('input[type="email"]')
      .should('be.visible')
      .type(Cypress.env('ADMIN_EMAIL'));

    cy.get('input[type="password"]')
      .should('be.visible')
      .type(Cypress.env('ADMIN_PASSWORD'));

    cy.get('button[type="submit"]')
      .should('be.visible')
      .click();

    // Pastikan berhasil login
    cy.url()
      .should('include', '/admin');

    // Masuk ke halaman Hero Slider
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

    cy.contains('Tambah Slider')
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/admin/sliders/create');

    // Isi judul
    cy.get('input[name="title"]')
      .should('be.visible')
      .type('Slider Cypress');

    // Isi deskripsi
    cy.get('textarea[name="description"]')
      .should('be.visible')
      .type('Automation Testing');

    // Upload gambar
    cy.get('input[type="file"]')
      .should('exist')
      .selectFile('cypress/fixtures/slider.jpg');

    // Submit form
    // Jangan menggunakan button[type="submit"] karena ada 2 tombol.
    cy.get('form')
      .find('button[type="submit"]')
      .last()
      .should('be.visible')
      .click();

    // Pastikan kembali ke halaman Hero Slider
    cy.url({ timeout: 10000 })
      .should('include', '/admin/sliders');

    // Pastikan data slider muncul
    cy.contains('Slider Cypress')
      .should('be.visible');
  });


  // =====================================================
  // UAT-SLIDER-003
  // Admin dapat mengubah slider
  // =====================================================
  it('Admin dapat mengubah slider', () => {

    // Ambil tombol Edit pertama
    cy.get('a[title="Edit"]')
      .first()
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/edit');

    // Ubah judul
    cy.get('input[name="title"]')
      .should('be.visible')
      .clear()
      .type('Slider Cypress Updated');

    // Ubah deskripsi
    cy.get('textarea[name="description"]')
      .should('be.visible')
      .clear()
      .type('Automation Testing Updated');

    // Klik tombol submit FORM, bukan logout
    cy.get('form')
      .find('button[type="submit"]')
      .last()
      .should('be.visible')
      .click();

    // Pastikan kembali ke daftar slider
    cy.url({ timeout: 10000 })
      .should('include', '/admin/sliders');

    cy.contains('Slider Cypress Updated')
      .should('be.visible');
  });


  // =====================================================
  // UAT-SLIDER-004
  // Admin dapat menghapus slider
  // =====================================================
  it('Admin dapat menghapus slider', () => {

    // Konfirmasi browser SEBELUM tombol delete diklik
    cy.on('window:confirm', () => true);

    cy.get('tbody tr')
      .first()
      .within(() => {

        cy.get('button[title="Delete"]')
          .should('be.visible')
          .click();
      });

    // Pastikan tetap berada di halaman Hero Slider
    cy.url()
      .should('include', '/admin/sliders');
  });


  // =====================================================
  // UAT-SLIDER-005
  // Admin dapat melihat daftar slider
  // =====================================================
  it('Admin dapat melihat daftar slider', () => {

    // Pastikan tabel tampil
    cy.get('table')
      .should('be.visible');

    // Header tabel
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

    // Pastikan ada data slider
    cy.get('tbody tr')
      .should('have.length.greaterThan', 0);
  });


  // UAT-SLIDER-006
it('Admin dapat menggunakan pagination slider', () => {

  // Pastikan pagination tersedia
  cy.get('nav[role="navigation"]')
    .should('exist');

  // Pastikan tombol halaman 2 tersedia
  cy.get('a[aria-label="Go to page 2"]')
    .should('exist')
    .click();

  // Pastikan URL berubah ke halaman 2
  cy.url()
    .should('include', 'page=2');

  // Pastikan tabel slider tetap tampil
  cy.get('table')
    .should('be.visible');
});
});