import { useQuery } from '@tanstack/react-query'
import Summary from './components/Summary'
import Dialog from './components/ui/Dialog'
import { getTasks } from './http/tasks'
import TaskForm from './components/TaskForm'

function App() {
  const { data } = useQuery({ queryKey: ['tasks'], queryFn: getTasks })
  return (
    <Dialog>
      <Summary data={data} />

      <TaskForm />
    </Dialog>
  )
}

export default App
