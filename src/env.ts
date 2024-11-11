import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_APIURL: z.string().url(),
})

export const env = envSchema.parse(process.env)
