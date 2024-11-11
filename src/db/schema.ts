import { createId } from '@paralleldrive/cuid2'
import { integer, numeric, timestamp, boolean } from 'drizzle-orm/pg-core'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  cost: numeric('cost', { precision: 12, scale: 2 }).notNull(),
  limit: timestamp('limit', { withTimezone: true }).notNull(),
  completed: boolean('completed').notNull().default(false),
  order: integer('order')
    .notNull()
    .$defaultFn(
      () => sql/*sql*/ `(SELECT COALESCE(MAX("order"), 0) + 1 FROM tasks)`
    ),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
