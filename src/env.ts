import z from 'zod'

const envSchema = z.object({
  APIURL: z.string().url(),
})

export const env = envSchema.parse(process.env)
