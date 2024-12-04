module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
  ],
  plugins: ["prettier", "unused-imports", "@typescript-eslint"],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    process: "readonly",
    "RequestInit": true,
    "React": true,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "strict": ["error", "never"],
    "quotes": ["error", "double", { avoidEscape: true }],
    "semi": ["error", "always"],
    "no-empty": "off",
    "unused-imports/no-unused-imports": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
    ],
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "no-irregular-whitespace": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
  },
  ignorePatterns: [
    "node_modules/*", // Ignore files in node_modules directory
    ".next/*", // Ignore files in the .next directory
  ],
};
