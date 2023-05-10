const config = {
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    testEnvironment: "node",
    setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};
export default config;