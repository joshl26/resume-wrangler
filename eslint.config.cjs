// eslint.config.cjs — minimal flat config (CommonJS)
const tryRequire = (name) => {
  try {
    return require(name);
  } catch {
    return undefined;
  }
};

const tsParser = tryRequire("@typescript-eslint/parser");

module.exports = [
  // top-level ignores (replaces .eslintignore)
  {
    ignores: ["node_modules/", ".next/", "dist/", "public/"],
  },

  // Minimal project rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      // parser must be the parser module (object) or undefined
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }, // <-- moved here
        // do NOT enable `project` unless you want type-aware rules (slower)
        // project: './tsconfig.json',
      },
      globals: {}, // add any global variables if needed
    },

    rules: {
      // safe, generic rules that don't require plugin objects
      "no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
      "no-console": ["off", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      "no-var": "error",
    },

    settings: {
      react: { version: "detect" },
    },
  },
];
