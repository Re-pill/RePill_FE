import createClient from 'openapi-fetch'
import type { paths } from '@/types/api-schema'

export const fetchClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
})
