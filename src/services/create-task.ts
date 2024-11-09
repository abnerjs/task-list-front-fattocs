import { db } from '../db'
import { tasks } from '../db/schema'

interface CreateTaskRequest {
  name: string
  cost: string
  limit: string
}

export async function createTask({ name, cost, limit }: CreateTaskRequest) {
  const dateLimit = new Date(limit)

  const result = await db
    .insert(tasks)
    .values({
      name,
      cost,
      limit: dateLimit,
    })
    .returning()

  const task = result[0]

  return {
    task,
  }
}
