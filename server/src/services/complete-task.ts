import { eq, sql } from 'drizzle-orm'
import { tasks } from '../db/schema'
import { db } from '../db'

export async function completeTask(id: string) {
  const completed = await db
    .select({ completed: tasks.completed })
    .from(tasks)
    .where(eq(tasks.id, id))

  const result = await db
    .update(tasks)
    .set({
      completed: !completed[0].completed,
    })
    .where(eq(tasks.id, id))
    .returning()

  const task = result[0]

  return { task }
}
