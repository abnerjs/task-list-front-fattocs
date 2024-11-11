import { Icon } from '@iconify/react/dist/iconify.js'
import { Button } from './ui/Button'
import { DialogTrigger } from './ui/Dialog'
import illustration from '../assets/illustration.svg'

const EmptyTasks = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-8'>
      <div className='flex items-baseline gap-1'>
        <span className='text-sm'>Fatto</span>
        <span className='font-bold'>Tasklist</span>
      </div>
      <img
        src={illustration}
        alt='Illustration'
        className='h-72'
      />
      <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>
        Você ainda não tem nenhuma tarefa, que tal&nbsp;
        <span className='underline'>cadastrar uma</span> agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Icon
            icon='fluent:add-12-regular'
            className='w-4 h-4'
          />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}

export default EmptyTasks
