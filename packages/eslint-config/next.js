module.exports = {
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "eslint-config-turbo",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
    react: {
      version: "detect",
    },
    "jsx-a11y": {
      components: {
        Button: "button",
        Input: "input",
        Icon: "span",
        Avatar: "img",
        Badge: "span",
      },
    },
  },
  rules: {
    "react/jsx-key": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  ignorePatterns: [".*.js", "node_modules/", "dist/", ".next/"],
};
