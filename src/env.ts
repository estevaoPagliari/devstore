import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Error', parsedEnv.error.flatten().fieldErrors)

  throw new Error('Error ')
}

export const env = parsedEnv.data
