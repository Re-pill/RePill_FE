import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import { globalIgnores } from 'eslint/config'
import neostandard from 'neostandard'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...neostandard({
    ts: true
  }),
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  globalIgnores(['src/types/api-schema.d.ts'])
]

export default eslintConfig
