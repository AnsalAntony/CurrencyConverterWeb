module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Specify the correct environment
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks CSS imports
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel for transforming JS/TS
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Ignore these folders
    collectCoverage: true, // Optional: Enable coverage reports
  };
  