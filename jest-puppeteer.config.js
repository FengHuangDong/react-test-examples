// jest-puppeteer.config.js
module.exports = {
  launch: {
    slowMo:100,
    headless: false,
    defaultViewport:{
      width:1280,
      height:610,
    },
    args: ['--start-maximized','--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
  },
}