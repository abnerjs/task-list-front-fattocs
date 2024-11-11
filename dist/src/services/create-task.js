"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
async function createTask({ name, cost, limit }) {
    const dateLimit = new Date(limit);
    const result = await db_1.db
        .insert(schema_1.tasks)
        .values({
        name,
        cost,
        limit: dateLimit,
    })
        .returning();
    const task = result[0];
    return {
        task,
    };
}
