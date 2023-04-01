module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
    plugins: ['@typescript-eslint'], // Specifies the ESLint plugins for TypeScript
    extends: [
        'eslint:recommended', // Use the recommended rules from ESLint
        'plugin:@typescript-eslint/recommended', // Use the recommended rules for TypeScript
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2018, // Allows parsing modern ECMAScript features
        sourceType: 'module', // Allows using imports and exports
    },
    rules: {
        // Add or override any rules you want here, for example:
        '@typescript-eslint/no-unused-vars': ['warn'], // Warns when there are unused variables
    },
};
