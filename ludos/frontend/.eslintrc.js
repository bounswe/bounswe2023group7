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
    "no-unused-vars": "warn",
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
      1000,
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
    "space-infix-ops": ["warn", { int32Hint: false }],
    "import/first": ["warn"],
    indent: ["warn", 2, { SwitchCase: 1, ObjectExpression: 1 }],
    "object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
    "no-multi-spaces": ["warn", { ignoreEOLComments: true }],
  },
};
