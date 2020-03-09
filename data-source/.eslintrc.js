module.exports = {
    extends: "airbnb-base",
    rules: {
        "arrow-parens": [2, "as-needed"],
        "class-methods-use-this": "off",
        "no-console": ["error", { allow: ["warn", "error", "info", "time", "timeEnd"] }],
        "max-len": ["error", { "code": 120 }],
        "linebreak-style": "off",
        "import/prefer-default-export": "off"
    },
    env: {
        "node": true,
        "mocha": true,
    }
};
