"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = deleteTask;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
async function deleteTask(id) {
    const orderTask = await db_1.db
        .select({ order: schema_1.tasks.order })
        .from(schema_1.tasks)
        .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
    const result = await db_1.db.delete(schema_1.tasks).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id)).returning();
    if (orderTask.length > 0) {
        await db_1.db
            .update(schema_1.tasks)
            .set({ order: orderTask[0].order - 1 })
            .where((0, drizzle_orm_1.gt)(schema_1.tasks.order, orderTask[0].order));
    }
    const task = result[0];
    return { task };
}
