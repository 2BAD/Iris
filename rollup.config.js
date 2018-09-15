import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  {
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ],
    input: 'source/main.js',
    'output': [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ]
  }
]
