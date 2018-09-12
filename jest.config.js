module.exports = {
  verbose: false,
  testURL: 'http://localhost/',
  transform: {
    '^.*\\.js': 'babel-jest',
    '^.*\\.tsx$': 'ts-jest',
    '^.*\\.ts$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['node_modules', 'common.js', 'jsdom.js'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  transformIgnorePatterns: ['node_modules'],
};