var path = require('path');
const convertToPath = (url) => path.resolve(__dirname,url)

module.exports = {
  "rootDir":path.resolve(__dirname,"../"),
  "testMatch":[convertToPath("./src/**/*.test.js")],
  "moduleNameMapper": { 
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": convertToPath("./assetsTransformer.js"), 
    "\\.(css|less)$": convertToPath("./assetsTransformer.js")
  },
  "moduleFileExtensions": [
    "js",
    "jsx"
  ],
  "collectCoverageFrom" : [
    "!./src/reducers/index.js",
    "./src/App.js",
    "./src/actions/*.{js,jsx}",
    "./src/components/*.{js,jsx}",
    "./src/reducers/*.{js,jsx}",
  ],
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
  "setupFilesAfterEnv": [convertToPath("./setupTests.js")],
}