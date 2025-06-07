"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = updateTask;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
async function updateTask({ id, name, cost, limit }) {
    const dateLimit = limit ? new Date(limit) : undefined;
    const result = await db_1.db
        .update(schema_1.tasks)
        .set({
        name,
        cost,
        limit: dateLimit,
    })
        .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id))
        .returning();
    const task = result[0];
    return { task };
}
