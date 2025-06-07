import { eq, gt } from 'drizzle-orm'
import { db } from '../db'
import { tasks } from '../db/schema'

export async function deleteTask(id: string) {
  const orderTask = await db
    .select({ order: tasks.order })
    .from(tasks)
    .where(eq(tasks.id, id))

  const result = await db.delete(tasks).where(eq(tasks.id, id)).returning()

  if (orderTask.length > 0) {
    await db
      .update(tasks)
      .set({ order: orderTask[0].order - 1 })
      .where(gt(tasks.order, orderTask[0].order))
  }

  const task = result[0]

  return { task }
}
