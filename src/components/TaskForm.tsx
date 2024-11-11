import { useQueryClient } from '@tanstack/react-query'
import { createTask, updateTask, type TasksResponse } from '../http/tasks'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/Dialog'
import { Button } from './ui/Button'
import Input from './ui/Input'
import Label from './ui/Label'
import { Icon } from '@iconify/react/dist/iconify.js'

interface Props {
  change?: TasksResponse
}

const createTaskSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cost: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
      message: 'Valor deve ser positivo',
    })
    .refine((val) => Number(val) < 100000000000, {
      message: 'Valor deve ser menor que 100 quadrilhões',
    }),
  limit: z
    .string()
    .transform((val) => {
      const date = new Date(val)
      return date
    })
    .refine((val) => val.getTime() > new Date().getTime(), {
      message: 'Data deve ser no futuro',
    }),
})

const editTaskSchema = z.object({
  name: z.string().optional(),
  cost: z.string().optional(),
  limit: z
    .string()
    .transform((val) => {
      const date = new Date(val)
      return date
    })
    .optional(),
})

type CreateTaskSchema = z.infer<typeof createTaskSchema>

type EditTaskSchema = z.infer<typeof editTaskSchema>

const TaskForm = ({ change }: Props) => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(change ? editTaskSchema : createTaskSchema),
  })

  async function onSubmit(data: CreateTaskSchema | EditTaskSchema) {
    if (change) {
      await updateTask({ id: change.id, ...data })
    } else {
      await createTask(data as CreateTaskSchema)
    }

    queryClient.invalidateQueries({ queryKey: ['tasks'] })

    reset()
  }

  return (
    <DialogContent>
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <DialogTitle>
              {change ? 'Editar tarefa' : 'Cadastrar tarefa'}
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant='rounded'
                onClick={() => reset()}
              >
                <Icon icon='fluent:dismiss-12-regular' />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            {change
              ? 'Edite os campos que deseja alterar.'
              : 'Adicione tarefas que você deseja cadastrar para serem realizadas.'}
          </DialogDescription>
        </div>
        <form
          id='create-goal-form'
          onSubmit={handleSubmit(onSubmit)}
          className='flex-1 flex flex-col justify-between'
        >
          <div className='flex flex-col gap-3 pb-2'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Qual a tarefa?</Label>
              <Input
                autoFocus
                id='name'
                type='text'
                placeholder='Praticar exercícios, enviar emails, etc'
                defaultValue={change?.name}
                key={change ? change.id : 'new-task'}
                {...register('name')}
              />
              {formState.errors.name && (
                <p className='text-xs text-red-500'>
                  {formState.errors.name?.message as string}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='cost'>Qual o custo?</Label>
              <div className='relative w-full'>
                <div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fill='currentColor'
                      d='M10 8.52h2a.36.36 0 0 1 .25.11a.35.35 0 0 1 .1.25a.2.2 0 0 1 0 .08a.32.32 0 0 1-.12.2a.35.35 0 0 1-.22.08H10a.35.35 0 0 1-.22-.08a.34.34 0 0 1-.12-.16l-.05-.23h-1.2v.33a1.6 1.6 0 0 0 .52 1a1.57 1.57 0 0 0 1 .41h.43v.94h1.13v-.94h.36a1.6 1.6 0 0 0 1.56-1.41a1 1 0 0 0 0-.18a1.6 1.6 0 0 0-.15-.67a1.6 1.6 0 0 0-.43-.55a1.56 1.56 0 0 0-1-.36H10a.37.37 0 0 1-.25-.1a.36.36 0 0 1-.11-.26a.1.1 0 0 1 0-.05a.3.3 0 0 1 .12-.22a.33.33 0 0 1 .24-.13h1.92a.35.35 0 0 1 .23.09a.4.4 0 0 1 .12.22v.25h1.2v-.33a1.63 1.63 0 0 0-.5-1a1.6 1.6 0 0 0-1.07-.42h-.31v-1h-1.15v1H10a1.57 1.57 0 0 0-1.07.42a1.58 1.58 0 0 0-.5 1v.12a1.58 1.58 0 0 0 .47 1.12a1.53 1.53 0 0 0 1.1.47m-6.27.29h.84a1.63 1.63 0 0 1 1.59 1.62h1.25a2.86 2.86 0 0 0-.79-2a1.69 1.69 0 0 0 .68-1.34a1.71 1.71 0 0 0-1.71-1.71H2.48v5.05h1.25zm1.86-2.18a.47.47 0 0 1 0 .93H3.73v-.93z'
                    />
                    <path
                      fill='currentColor'
                      d='M14.75 2.5H1.25A1.2 1.2 0 0 0 0 3.64v8.72a1.2 1.2 0 0 0 1.25 1.14h13.5A1.2 1.2 0 0 0 16 12.36V3.64a1.2 1.2 0 0 0-1.25-1.14m0 9.75H1.25v-8.5h13.5z'
                    />
                  </svg>
                </div>
                <Input
                  id='cost'
                  type='number'
                  placeholder='1000,00'
                  className='pl-10 w-full'
                  defaultValue={change?.cost}
                  key={change ? change.id : 'new-task'}
                  {...register('cost')}
                />
              </div>
              {formState.errors.cost && (
                <p className='text-xs text-red-500'>
                  {formState.errors.cost?.message as string}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='limit'>Até quando?</Label>
              <Input
                id='limit'
                type='datetime-local'
                defaultValue={
                  change
                    ? new Date(change.limit).toISOString().slice(0, 16)
                    : undefined
                }
                key={change ? change.id : 'new-task'}
                {...register('limit')}
              />
              {formState.errors.limit && (
                <p className='text-xs text-red-500'>
                  {formState.errors.limit?.message as string}
                </p>
              )}
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <DialogClose asChild>
              <Button
                type='button'
                className='flex-1'
                variant='secondary'
                onClick={() => reset()}
              >
                Fechar
              </Button>
            </DialogClose>
            <Button className='flex-1'>Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}

export default TaskForm
