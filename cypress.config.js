const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://zlm.hummatech.com",

    env: {
      ADMIN_EMAIL: "admin@zlm.id",
      ADMIN_PASSWORD: "admin123",
    },
  },
});