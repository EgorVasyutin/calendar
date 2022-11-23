module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: "@typescript-eslint/parser",
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "@vue/typescript",
  ],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "newline-before-return": "error",
  },
};
