module.exports = {
  "client/src/**/*.{js,jsx,ts,tsx}": [
    "cd client && eslint --fix",
    "cd client && prettier --write",
    "cd client && npm test -- --bail --findRelatedTests",
  ],
  "server/**/*.py": ["cd server && black .", "cd server && flake8"],
};
