import { and, between, eq, not, sql } from 'drizzle-orm'
import { db } from '../db'
import { tasks } from '../db/schema'

export async function changeTaskOrder(id: string, newOrder: number) {
  const orderTask = await db
    .select({ order: tasks.order })
    .from(tasks)
    .where(eq(tasks.id, id))
  const currentOrder = orderTask[0].order

  if (currentOrder < newOrder) {
    await db
      .update(tasks)
      .set({ order: sql/*sql*/ `${tasks.order} - 1` })
      .where(
        and(
          not(eq(tasks.id, id)),
          between(tasks.order, currentOrder + 1, newOrder)
        )
      )
  } else {
    await db
      .update(tasks)
      .set({ order: sql/*sql*/ `${tasks.order} + 1` })
      .where(
        and(
          not(eq(tasks.id, id)),
          between(tasks.order, newOrder, currentOrder - 1)
        )
      )
  }

  const result = await db
    .update(tasks)
    .set({ order: newOrder })
    .where(eq(tasks.id, id))
    .returning()

  const task = result[0]

  return { task }
}
