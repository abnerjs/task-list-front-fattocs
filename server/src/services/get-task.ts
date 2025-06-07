import { db } from '../db'
import { tasks } from '../db/schema'

export async function getTasks() {
  const result = await db.select().from(tasks).orderBy(tasks.order)

  return { result }
}
