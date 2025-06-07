import { changeTaskOrder, type TasksResponse } from '../http/tasks'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data?: TasksResponse[]
}

const TaskList = ({ data }: Props) => {
  const queryClient = useQueryClient()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  if (!data) return null

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async function handleDragEnd(event: any) {
    const { active, over } = event

    if (over && active && active !== over) {
      const result = await changeTaskOrder(
        active.id,
        over.data.current.sortable.index + 1
      )

      queryClient.invalidateQueries({ queryKey: ['tasks'] })

      return result
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={data}
        strategy={verticalListSortingStrategy}
      >
        <div className='flex flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden'>
          {data.map((task, index) => (
            <SortableItem
              key={task.id}
              task={task}
              index={index}
              dataLength={data.length}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default TaskList
