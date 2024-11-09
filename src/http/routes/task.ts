import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getTasks } from '../../services/get-task'
import z from 'zod'
import { createTask } from '../../services/create-task'
import { updateTask } from '../../services/update-task'
import { deleteTask } from '../../services/delete-task'
import { changeTaskOrder } from '../../services/change-order-task'

export const taskRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/tasks', async (_request, reply) => {
    const tasks = await getTasks()

    return reply.status(200).send(tasks)
  })

  app.post(
    '/tasks',
    {
      schema: {
        body: z.object({
          name: z.string(),
          cost: z.string(),
          limit: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, cost, limit } = request.body as {
        name: string
        cost: string
        limit: string
      }

      const result = await createTask({
        name,
        cost,
        limit,
      })

      return reply.status(201).send(result.task)
    }
  )

  app.put(
    '/tasks/:id',
    {
      schema: {
        body: z.object({
          name: z.string().optional(),
          cost: z.string().optional(),
          limit: z.date().optional(),
        }),
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, cost, limit } = request.body as {
        name?: string
        cost?: string
        limit?: Date
      }

      const id = request.params.id as string

      const result = await updateTask({ id, name, cost, limit })

      return reply.status(201).send(result.task)
    }
  )

  app.delete(
    '/tasks/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }

      const result = await deleteTask(id)

      return reply.status(204).send()
    }
  )

  app.put(
    '/tasks/:id/order',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          order: z.number(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }
      const { order } = request.body as { order: number }

      const result = await changeTaskOrder(id, order)

      return reply.status(201).send(result.task)
    }
  )
}
