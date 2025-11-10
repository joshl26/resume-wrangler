// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2024: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    // Uncomment for type-aware rules (slower):
    // project: './tsconfig.json',
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "import"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
  ],
  settings: {
    react: { version: "detect" },
  },
  ignorePatterns: ["node_modules/", ".next/", "dist/", "public/"],
  rules: {
    // turn off built-in rule
    "no-unused-vars": "off",
    // use the TypeScript-aware rule with exceptions
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        // ignore variables that start with _
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        // ignore catch parameters named _
        caughtErrorsIgnorePattern: "^_",
        // default behavior options (optional)
        vars: "all",
        args: "after-used",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
};
