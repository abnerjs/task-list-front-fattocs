import { eq } from 'drizzle-orm'
import { db } from '../db'
import { tasks } from '../db/schema'

interface UpdateTaskRequest {
  id: string
  name?: string
  cost?: string
  limit?: string
}

export async function updateTask({ id, name, cost, limit }: UpdateTaskRequest) {
  const dateLimit = limit ? new Date(limit) : undefined

  const result = await db
    .update(tasks)
    .set({
      name,
      cost,
      limit: dateLimit,
    })
    .where(eq(tasks.id, id))
    .returning()

  const task = result[0]

  return { task }
}
