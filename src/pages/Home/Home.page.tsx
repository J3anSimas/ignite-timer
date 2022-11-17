import { useForm } from 'react-hook-form'
import { Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from './Home.styles'
import { useEffect, useState } from 'react'

type TCycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ter no mínimo 5 minutos.')
    .max(60, 'O ciclo precis ter no máximo 60 minutos.')
})
type TNewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
export default function Home(): JSX.Element {
  const [cycles, setCycles] = useState<TCycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPast, setAmountSecondsPast] = useState(0)
  const { register, handleSubmit, watch, reset } = useForm<TNewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    if (activeCycle != null) {
      const interval = setInterval(() => {
        setAmountSecondsPast(
          differenceInSeconds(new Date(), activeCycle.startDate)
        )
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activeCycle])
  function handleCreateNewCycle(data: TNewCycleFormData): void {
    const newCycle: TCycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    reset()
  }

  const totalSeconds = activeCycle != null ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds =
    activeCycle != null ? totalSeconds - amountSecondsPast : 0

  const minutesLeft = String(Math.floor(currentSeconds / 60)).padStart(2, '0')
  const secondsLeft = String(currentSeconds % 60).padStart(2, '0')

  const task: string = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled: boolean = task === '' || isNaN(minutesAmount)
  return (
    <HomeContainer>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            placeholder="Dê um nome para seu projeto"
            id="task"
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1 " />
            <option value="Projeto 2 " />
            <option value="Projeto 3 " />
            <option value="Projeto 4 " />
            <option value="Projeto 5 " />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinuteAmountInput
            type="number"
            placeholder="00"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {
              valueAsNumber: true
            })}
          />

          <span>minutes.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutesLeft[0]}</span>
          <span>{minutesLeft[1]}</span>
          <Separator>:</Separator>
          <span>{secondsLeft[0]}</span>
          <span>{secondsLeft[1]}</span>
        </CountdownContainer>
        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
