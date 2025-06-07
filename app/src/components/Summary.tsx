import { Icon } from '@iconify/react/dist/iconify.js'
import { Button } from './ui/Button'
import { DialogTrigger } from './ui/Dialog'
import type { TasksResponse } from '../http/tasks'
import Progress, { ProgressIndicator } from './ui/ProgressBar'
import Separator from './ui/Separator'
import TaskList from './TaskList'

interface Props {
  data?: TasksResponse[]
}

const Summary = ({ data }: Props) => {
  if (!data) return null

  return (
    <div className='flex flex-col gap-6 py-10 max-w-2xl px-5 mx-auto h-screen'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='logo'>FattoCS</div>
          <span className='text-lg font-semibold'>Tasklist</span>
        </div>

        <DialogTrigger asChild>
          <Button size='sm'>
            <Icon
              icon='fluent:add-12-regular'
              className='w-4 h-4'
            />
            Cadastrar tarefa
          </Button>
        </DialogTrigger>
      </div>

      <div className='flex flex-col gap-3 flex-1'>
        <Progress
          value={data?.filter((task) => task.completed).length}
          max={data?.length}
        >
          <ProgressIndicator
            style={{
              width: `${
                (data?.filter((task) => task.completed).length / data?.length) *
                100
              }%`,
            }}
          />
        </Progress>

        <div className='flex items-center justify-between text-xs text-zinc-400'>
          <span>
            Você completou{' '}
            <span className='text-zinc-100'>
              {data?.filter((task) => task.completed).length}
            </span>{' '}
            de <span className='text-zinc-100'>{data?.length}</span> tarefas.
          </span>
          <span>
            {(
              (data?.filter((task) => task.completed).length / data?.length) *
              100
            ).toFixed(0)}
            %
          </span>
        </div>
        <Separator />

        <h3 className='font-medium'>
          <span className='capitalize'>Tarefas</span>
        </h3>

        <TaskList data={data} />
      </div>

      <legend className='flex gap-2 items-center text-xs'>
        <div className='h-3 w-20 bg-amber-500 rounded-full' />
        <span>
          Indica tarefas com <b>custo</b> acima de <b>R$ 1000,00</b>
        </span>
      </legend>
    </div>
  )
}

export default Summary
