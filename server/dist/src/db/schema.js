"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.tasks = (0, pg_core_2.pgTable)('tasks', {
    id: (0, pg_core_2.text)('id').primaryKey().$defaultFn(cuid2_1.createId),
    name: (0, pg_core_2.text)('name').notNull(),
    cost: (0, pg_core_1.numeric)('cost', { precision: 12, scale: 2 }).notNull(),
    limit: (0, pg_core_1.timestamp)('limit', { withTimezone: true }).notNull(),
    completed: (0, pg_core_1.boolean)('completed').notNull().default(false),
    order: (0, pg_core_1.integer)('order')
        .notNull()
        .$defaultFn(() => (0, drizzle_orm_1.sql /*sql*/) `(SELECT COALESCE(MAX("order"), 0) + 1 FROM tasks)`),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
