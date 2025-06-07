import { client, db } from '.'
import { tasks } from './schema'

async function seed() {
  await db.delete(tasks)
  await db
    .insert(tasks)
    .values({
      name: 'Task 1',
      cost: '10',
      limit: new Date('2024-12-31'),
    })
    .execute()
  await db
    .insert(tasks)
    .values({
      name: 'Task 2',
      cost: '20',
      limit: new Date('2024-12-31'),
    })
    .execute()
  await db
    .insert(tasks)
    .values({
      name: 'Task 3',
      cost: '30',
      limit: new Date('2024-12-31'),
    })
    .execute()
  await db.insert(tasks).values({
    name: 'Task 4',
    cost: '4000',
    limit: new Date('2024-12-31'),
  })
}

seed().finally(() => {
  client.end()
})
