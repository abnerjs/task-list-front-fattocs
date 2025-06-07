"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = getTasks;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
async function getTasks() {
    const result = await db_1.db.select().from(schema_1.tasks).orderBy(schema_1.tasks.order);
    return { result };
}
