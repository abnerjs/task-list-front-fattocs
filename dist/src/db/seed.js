"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const schema_1 = require("./schema");
async function seed() {
    await _1.db.delete(schema_1.tasks);
    await _1.db
        .insert(schema_1.tasks)
        .values({
        name: 'Task 1',
        cost: '10',
        limit: new Date('2024-12-31'),
    })
        .execute();
    await _1.db
        .insert(schema_1.tasks)
        .values({
        name: 'Task 2',
        cost: '20',
        limit: new Date('2024-12-31'),
    })
        .execute();
    await _1.db
        .insert(schema_1.tasks)
        .values({
        name: 'Task 3',
        cost: '30',
        limit: new Date('2024-12-31'),
    })
        .execute();
    await _1.db.insert(schema_1.tasks).values({
        name: 'Task 4',
        cost: '4000',
        limit: new Date('2024-12-31'),
    });
}
seed().finally(() => {
    _1.client.end();
});
