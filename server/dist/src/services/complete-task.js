"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeTask = completeTask;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
const db_1 = require("../db");
async function completeTask(id) {
    const completed = await db_1.db
        .select({ completed: schema_1.tasks.completed })
        .from(schema_1.tasks)
        .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
    const result = await db_1.db
        .update(schema_1.tasks)
        .set({
        completed: !completed[0].completed,
    })
        .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id))
        .returning();
    const task = result[0];
    return { task };
}
