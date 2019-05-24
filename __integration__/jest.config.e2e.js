module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.test\\.js$',
  "reporters": [
    [
      "../node_modules/jest-html-reporter",
      {
        "useCssFile": true
      }
    ]
  ],
}