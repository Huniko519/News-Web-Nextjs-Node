require('dotenv').config({ path: './.env.local.inewsint.co.uk' });

/* eslint-disable no-useless-escape */
module.exports = {
  testRegex: '(\/tests\/(?!mocks\/).*\.js?$)$',
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/public/**',
    '!**/webpack.*.js',
    '!**/*.config.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/public/'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/mocks/styleMock.js',
  },
};
/* eslint-enable no-useless-escape */
