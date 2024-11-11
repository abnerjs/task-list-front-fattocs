import z from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  APIURL: z.string().url(),
})

export const env = envSchema.parse(process.env)
