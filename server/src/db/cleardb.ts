import { client, db } from '.'
import { tasks } from './schema'

async function cleardb() {
  await db.delete(tasks)
}

cleardb().finally(() => {
  client.end()
})
