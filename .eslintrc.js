module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
      "eslint:recommended"
      // , "plugin:import/errors"
      // , "plugin:import/warnings"
      , "plugin:react/recommended"

    ],
    "parser": "babel-eslint",
    "parserOptions": {
       "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },
    "plugins": [
      "react",
      //"import"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ]
        // , "no-unused-vars": ["error", { "vars": "all", "args": "after-used" }]
    },
};
