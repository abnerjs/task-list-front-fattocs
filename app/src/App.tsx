import { useQuery } from '@tanstack/react-query'
import Summary from './components/Summary'
import Dialog from './components/ui/Dialog'
import { getTasks } from './http/tasks'
import TaskForm from './components/TaskForm'
import EmptyTasks from './components/EmptyTasks'

function App() {
  const { data } = useQuery({ queryKey: ['tasks'], queryFn: getTasks })
  return (
    <Dialog>
      {data && data.length > 0 ? <Summary data={data} /> : <EmptyTasks />}

      <TaskForm />
    </Dialog>
  )
}

export default App
