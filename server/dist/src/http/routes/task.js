"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoute = void 0;
const get_task_1 = require("../../services/get-task");
const zod_1 = __importDefault(require("zod"));
const create_task_1 = require("../../services/create-task");
const update_task_1 = require("../../services/update-task");
const delete_task_1 = require("../../services/delete-task");
const change_order_task_1 = require("../../services/change-order-task");
const complete_task_1 = require("../../services/complete-task");
const taskRoute = async (app) => {
    app.get('/tasks', async (_request, reply) => {
        const tasks = await (0, get_task_1.getTasks)();
        return reply.status(200).send(tasks);
    });
    app.post('/tasks', {
        schema: {
            body: zod_1.default.object({
                name: zod_1.default.string(),
                cost: zod_1.default.string(),
                limit: zod_1.default.string(),
            }),
        },
    }, async (request, reply) => {
        const { name, cost, limit } = request.body;
        const result = await (0, create_task_1.createTask)({
            name,
            cost,
            limit,
        });
        return reply.status(201).send(result.task);
    });
    app.patch('/tasks/:id', {
        schema: {
            body: zod_1.default.object({
                name: zod_1.default.string().optional(),
                cost: zod_1.default.string().optional(),
                limit: zod_1.default.string().optional(),
            }),
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
        },
    }, async (request, reply) => {
        const { name, cost, limit } = request.body;
        const id = request.params.id;
        const result = await (0, update_task_1.updateTask)({ id, name, cost, limit });
        return reply.status(201).send(result.task);
    });
    app.delete('/tasks/:id', {
        schema: {
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const result = await (0, delete_task_1.deleteTask)(id);
        return reply.status(204).send();
    });
    app.patch('/tasks/order/:id', {
        schema: {
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
            body: zod_1.default.object({
                order: zod_1.default.number(),
            }),
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const { order } = request.body;
        const result = await (0, change_order_task_1.changeTaskOrder)(id, order);
        return reply.status(201).send(result.task);
    });
    app.patch('/tasks/complete/:id', {
        schema: {
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const result = await (0, complete_task_1.completeTask)(id);
        return reply.status(201).send(result.task);
    });
};
exports.taskRoute = taskRoute;
