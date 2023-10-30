module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "simple-import-sort", "unused-imports", "import"],
  rules: {
    "comma-dangle": [2, "always-multiline"],
    "object-shorthand": [
      2,
      "always",
      {
        ignoreConstructors: false,
        avoidQuotes: false, // this is the override vs airbnb
      },
    ],
    "max-len": [
      2,
      120,
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    "consistent-return": 0,
    "react/prop-types": 1,
    "import/no-absolute-path": "error",
    "react/jsx-curly-brace-presence": [
      "warn",
      {
        props: "never",
        children: "never",
      },
    ],
    "space-infix-ops": ["error", { int32Hint: false }],
    "import/first": ["error"],
    indent: ["warn", 2, { SwitchCase: 1, ObjectExpression: 1 }],
    "object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
  },
};
