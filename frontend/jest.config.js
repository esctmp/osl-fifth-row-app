module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "uuid": require.resolve('uuid'),
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@aws-sdk|aws-amplify|@aws-amplify)).+\\.js$"
  ],
  testResultsProcessor: "./node_modules/jest-html-reporter"
};
