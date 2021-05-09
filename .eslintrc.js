module.exports = {
  root: true,
  env: {
    es2020: true
  },
  extends: ["react-app"],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      experimantalDecorators: true
    }
  },
  rules: {
    quotes: ["warn", "double"],
    semi: ["error", "always"],
    "no-var": ["error"],
    "no-console": ["off"],
    "no-unused-vars": ["warn"],
    "no-useless-escape": ["warn"],
    "no-new-func": ["off"],
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
    "react-hooks/exhaustive-deps": 0,
    "react/display-name": 0,
    "react/jsx-fragments": 0,
    "jsx-a11y/anchor-is-valid": 0
  }
};
