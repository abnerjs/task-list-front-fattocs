"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const schema_1 = require("./schema");
async function cleardb() {
    await _1.db.delete(schema_1.tasks);
}
cleardb().finally(() => {
    _1.client.end();
});
