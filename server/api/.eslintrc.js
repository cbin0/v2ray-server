module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended"
  ],
  "rules": {
    "semi": [2, "never"],
    "no-console": 0,
    "comma-dangle": [2, "never"],
    "max-len": [1, {
      "code": 150
    }],
    "quotes": [2, "single"],
    "no-unused-expressions": [0, {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "arrow-body-style": [0, "never"],
    "func-names": 0,
    "prefer-const": 0,
    "no-extend-native": 0,
    "no-param-reassign": 0,
    "no-restricted-syntax": 0,
    "no-eval": 0,
    "no-undef": 0,
    "no-continue": 0,
    "no-unused-vars": [2, {
      "ignoreRestSiblings": true
    }],
    "no-underscore-dangle": 0,
    "global-require": 0,
    "no-mixed-operators": 0,
    "no-plusplus": 0,
    "arrow-parens": 0,
    "function-paren-newline": 0,
    "space-before-function-paren": 0,
    "class-methods-use-this": "off"
  },
  "settings": {
  }
}