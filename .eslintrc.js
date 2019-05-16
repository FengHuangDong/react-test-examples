module.exports = {
  env: {
    jest: true,
  },
  parser:"babel-eslint",
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
  },
}