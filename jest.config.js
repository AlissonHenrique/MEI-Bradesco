const ignorePaths = [
  '<rootDir>/node_modules',
  '<rootDir>/dist',
  '<rootDir>/coverage',
  '<rootDir>/docker/',
  '<rootDir>/logs/',
  '<rootDir>/test/',
  '<rootDir>/setup-jest.ts',
  '<rootDir>/jest.config.js',
  '<rootDir>/src/main.ts',
  '<rootDir>/src/polyfills.ts'
];

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '@env/(.*)': '<rootDir>/src/environments/$1',
    '@modules/(.*)': '<rootDir>/src/app/modules/$1',
    '@services/(.*)': '<rootDir>/src/app/shared/services/$1',
    '@mocks/(.*)': '<rootDir>/src/assets/mocks/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '@models/(.*)': '<rootDir>/src/app/shared/models/$1',
    '@images/(.*)': '<rootDir>/src/assets/images/$1'
  },
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
  coverageReporters: [
    'text',
    'lcov',
    'cobertura',
    'html'
  ],
  testPathIgnorePatterns: ignorePaths,
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  coveragePathIgnorePatterns: ignorePaths,
  modulePathIgnorePatterns: ignorePaths,
  // globalSetup: '<rootDir>/test/setup.js',
  // globalTeardown: '<rootDir>/test/teardown.js',
  resetModules: false



};


