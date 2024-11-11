export const getTasks = async (): Promise<TasksResponse[]> => {
  const response = await fetch('http://localhost:3000/tasks')
  const data = await response.json()
  return data.result
}

export const createTask = async (
  task: CreateTaskRequest
): Promise<TasksResponse> => {
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
  const data = await response.json()
  return data.result
}

export const changeTaskOrder = async (
  id: string,
  order: number
): Promise<TasksResponse> => {
  const response = await fetch(`http://localhost:3000/tasks/order/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order }),
  })
  const data = await response.json()
  return data.result
}

export const updateTask = async (
  task: UpdateTaskRequest
): Promise<TasksResponse> => {
  const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: task.name,
      cost: task.cost,
      limit: task.limit,
    }),
  })
  const data = await response.json()
  return data.result
}

export const deleteTask = async (id: string) => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  })
}

export const completeTask = async (id: string): Promise<TasksResponse> => {
  const response = await fetch(`http://localhost:3000/tasks/complete/${id}`, {
    method: 'PATCH',
  })
  const data = await response.json()
  return data.result
}

export type TasksResponse = {
  id: string
  name: string
  cost: string
  limit: Date
  completed: boolean
  order: number
  createdAt: Date
}

export type CreateTaskRequest = {
  name: string
  cost: string
  limit: Date
}

export type UpdateTaskRequest = {
  id: string
  name?: string
  cost?: string
  limit?: Date
}
