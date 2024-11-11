import type { TasksResponse } from '../http/tasks'
import { z } from 'zod'

interface Props {
  change?: TasksResponse
}

const createTaskSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cost: z.number().min(1, 'Valor deve ser positivo'),
  limit: z.string().min(1, 'Data limite é obrigatória'),
})

const TaskForm = ({ change }: Props) => {
  return null
}

export default TaskForm
