module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    mocha: true,
    node: true,
  },
  plugins: ['react', 'import', 'react-hooks'],
  globals: {
    spyOn: true,
    expect: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    strict: 0,
    'class-methods-use-this': 0,
    camelcase: 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'global-require': 0,
    'no-nested-ternary': 0,
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'new-cap': 2,
    'no-undef': 2,
    'valid-jsdoc': 2,
    'no-unneeded-ternary': 1,
    'no-empty-pattern': 2,
    'no-param-reassign': 0,
    'object-shorthand': 1,
    'prefer-const': 1,
    'no-var': 1,
    radix: 0,
    'jsx-quotes': [1, 'prefer-double'],
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'space-before-function-paren': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-indent': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-boolean-value': 1,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-space-before-closing': 0,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/button-has-type': 0,
    'react/state-in-constructor': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-props-no-spreading': 0,
    'react/sort-comp': 0,
    'react/no-did-mount-set-state': 0,
    'react/no-did-update-set-state': 0,
    'react/no-multi-comp': [
      1,
      {
        ignoreStateless: true,
      },
    ],
    'react/no-unknown-property': 1,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 2,
    'react/require-default-props': 0,
    'react/self-closing-comp': 1,
    'import/no-unresolved': 2,
    'import/named': 2,
    'import/namespace': 2,
    'import/no-named-as-default': 0,
    'import/export': 2,
    'import/no-duplicates': 2,
    'import/imports-first': 2,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.stories.js',
          'webpack.config.*.js',
        ],
      },
    ],
    'import/no-cycle': 0,
    'react-hooks/rules-of-hooks': 'error',
  },
};
