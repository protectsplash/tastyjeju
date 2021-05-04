module.exports = {
  // 현재 eslintrc 파일을 기준으로 ESLint 규칙을 적용
  root: true,
  // node 언어 eslint 에 적용 옵션
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  // 추가적인 규칙들을 적용
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty-pattern': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
}
