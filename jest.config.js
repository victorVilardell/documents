module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
