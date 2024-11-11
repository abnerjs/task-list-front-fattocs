import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  changeTaskOrder,
  completeTask,
  type TasksResponse,
} from '../http/tasks'
import { Button } from './ui/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import Label from './ui/Label'
import dayjs from 'dayjs'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface Props {
  task: TasksResponse
  index: number
  dataLength: number
}

export function SortableItem({ task, index, dataLength }: Props) {
  const queryClient = useQueryClient()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id })
  const [localOrder, setLocalOrder] = useState(task.order)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  async function handleChangeOrder(
    id: string,
    order: number,
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setLocalOrder(order)

    const result = await changeTaskOrder(id, order)

    queryClient.invalidateQueries({ queryKey: ['tasks'] })

    return result
  }

  async function handleCompleteTask() {
    console.log('complete task')
    const result = await completeTask(task.id)

    queryClient.invalidateQueries({ queryKey: ['tasks'] })

    return result
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='group flex items-center gap-2'
      key={task.id}
    >
      <Checkbox.Root
        id={task.id}
        defaultChecked={task.completed}
        className='bg-zinc-900 hover:bg-zinc-800 p-1 rounded-md h-6 w-6'
        onCheckedChange={handleCompleteTask}
      >
        <Checkbox.Indicator className='text-zinc-600'>
          <Icon
            icon='fluent:checkmark-48-regular'
            className='size-4 text-sky-500'
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <Label
        className='flex-1'
        htmlFor={task.id}
      >
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <span className='font-semibold text-nowrap truncate max-w-64 sm:max-w-96 mr-auto'>
              {task.name}
            </span>
            {Number.parseFloat(task.cost) > 1000 && (
              <div className='h-3 w-20 bg-amber-500 rounded-full' />
            )}

            <Button
              variant='roundedsm'
              className='ml-2'
            >
              <Icon
                icon='fluent:edit-12-regular'
                className='w-4 h-4 justify-self-end text-zinc-400'
              />
            </Button>
            <Button
              variant='roundedsm'
              className='hover:bg-red-500'
            >
              <Icon
                icon='fluent:delete-12-regular'
                className='w-4 h-4 justify-self-end text-zinc-400 '
              />
            </Button>
          </div>
          <div className='flex justify-between text-xs text-zinc-400 transition-all group-hover:text-zinc-300'>
            <span className='text-xs text-zinc-400'>id: {task.id}</span>
            <div className='flex gap-2'>
              <span className='flex gap-1'>
                <Icon
                  icon='fluent:money-20-regular'
                  className='w-4 h-4'
                />
                R$ {task.cost.toString().replace('.', ',')}
              </span>
              <span className='flex gap-1'>
                <Icon
                  icon='fluent:calendar-20-regular'
                  className='w-4 h-4'
                />
                {dayjs(task.limit).format('DD/MM/YYYY HH:mm')}
              </span>
            </div>
          </div>
        </div>
      </Label>
      <div className='flex flex-col'>
        <Button
          variant='roundedsm'
          onMouseDown={(e) => handleChangeOrder(task.id, localOrder - 1, e)}
          disabled={index === 0}
          className='text-zinc-400 disabled:text-zinc-700 disabled:hover:bg-transparent'
        >
          <Icon
            icon='fluent:chevron-up-12-regular'
            className='w-4 h-4 justify-self-end'
          />
        </Button>
        <Button
          variant='roundedsm'
          onMouseDown={(e) => handleChangeOrder(task.id, localOrder + 1, e)}
          disabled={index === dataLength - 1}
          className='text-zinc-400 disabled:text-zinc-700 disabled:hover:bg-transparent'
        >
          <Icon
            icon='fluent:chevron-down-12-regular'
            className='w-4 h-4 justify-self-end '
          />
        </Button>
      </div>
      <div
        className='toggle cursor-grab active:cursor-grabbing'
        {...listeners}
      >
        <Icon
          icon='fluent:re-order-dots-vertical-20-filled'
          className='w-4 h-4 justify-self-end'
        />
      </div>
    </div>
  )
}