export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      diagnostics: {
        warnOnly: true,
      },
    }],
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|scss|sass|css)$': '<rootDir>/src/test/__mocks__/fileMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'scss', 'svg'],
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.(scss|sass|css)$',
    '\\.(svg)$',
  ],
};