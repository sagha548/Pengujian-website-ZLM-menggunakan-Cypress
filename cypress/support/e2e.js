// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
// ***********************************************************

import './commands'

// Abaikan error JavaScript yang berasal dari aplikasi
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})