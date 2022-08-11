module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    WPAPICache: "writable"
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-props-no-spreading": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/no-danger": 0,
    "quote-props": ["error", "consistent"],
    "camelcase": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "max-len": 0,
    "no-template-curly-in-string": 0,
    "no-undef": 0,
    "template-curly-spacing" : "off",
    "indent": ["error", 2, {
      "ignoredNodes": ["TemplateLiteral"]
    }]
  },
  overrides: [
    {
      files: "utils/*.js",
      rules: {
        "import/prefer-default-export": 0
      }
    },
    Object.assign(
      {
        files: "tests/**/*.js",
        env: {
          jest: true
        },
        plugins: ["jest"],
        globals: {
          shallow: 'readonly',
          render: 'readonly',
          mount: 'readonly'
        }
      },
      require('eslint-plugin-jest').configs.recommended
    )
  ]
};
