"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTaskOrder = changeTaskOrder;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
async function changeTaskOrder(id, newOrder) {
    const orderTask = await db_1.db
        .select({ order: schema_1.tasks.order })
        .from(schema_1.tasks)
        .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
    const currentOrder = orderTask[0].order;
    if (currentOrder < newOrder) {
        await db_1.db
            .update(schema_1.tasks)
            .set({ order: (0, drizzle_orm_1.sql /*sql*/) `${schema_1.tasks.order} - 1` })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.not)((0, drizzle_orm_1.eq)(schema_1.tasks.id, id)), (0, drizzle_orm_1.between)(schema_1.tasks.order, currentOrder + 1, newOrder)));
    }
    else {
        await db_1.db
            .update(schema_1.tasks)
            .set({ order: (0, drizzle_orm_1.sql /*sql*/) `${schema_1.tasks.order} + 1` })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.not)((0, drizzle_orm_1.eq)(schema_1.tasks.id, id)), (0, drizzle_orm_1.between)(schema_1.tasks.order, newOrder, currentOrder - 1)));
    }
    const result = await db_1.db
        .update(schema_1.tasks)
        .set({ order: newOrder })
        .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id))
        .returning();
    const task = result[0];
    return { task };
}
