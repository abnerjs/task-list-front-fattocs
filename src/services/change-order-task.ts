import { between, eq } from 'drizzle-orm'
import { db } from '../db'
import { tasks } from '../db/schema'

export async function changeTaskOrder(id: string, order: number) {
  const orderTask = await db
    .select({ order: tasks.order })
    .from(tasks)
    .where(eq(tasks.id, id))

  if (orderTask.length > 0) {
    await db
      .update(tasks)
      .set({ order: order + 1 })
      .where(between(tasks.order, orderTask[0].order, order))
  }

  const result = await db
    .update(tasks)
    .set({ order })
    .where(eq(tasks.id, id))
    .returning()

  const task = result[0]

  return { task }
}
