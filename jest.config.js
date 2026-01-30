/*module.exports = {
  testEnvironment: 'jsdom', // needed for React
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};*/
export default {
  preset: 'ts-jest/presets/default-esm',          // if using TypeScript
  testEnvironment: 'jsdom',   // needed for React
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // see next step
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.jest.json' }] // <--- recommended
  },    
};