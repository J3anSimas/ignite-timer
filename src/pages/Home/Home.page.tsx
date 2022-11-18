import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import { HomeContainer, CountdownButton } from './Home.styles'
import { createContext, useEffect, useState } from 'react'
import Countdown from './components/Countdown/Countdown.component'
import NewCycleForm from './components/NewCycleForm/NewCycleForm.component'

type TCycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ter no mínimo 5 minutos.')
    .max(60, 'O ciclo precis ter no máximo 60 minutos.')
})
type TNewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

type TCyclesContext = {
  activeCycle: TCycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  updateSecondsPassed: () => void
  finishCycle: () => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const CyclesContext = createContext<TCyclesContext>({} as TCyclesContext)

export default function Home(): JSX.Element {
  const [cycles, setCycles] = useState<TCycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<TNewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Helper functions to pass through CyclesContext
  function finishCycle(): void {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
    setActiveCycleId(null)
  }

  function updateSecondsPassed(): void {
    if (activeCycle == null) return
    setAmountSecondsPassed(
      differenceInSeconds(new Date(), activeCycle.startDate)
    )
  }
  /// ///////////////////////////////////////////////////

  // Functions to handle User Actions
  function handleCreateNewCycle(data: TNewCycleFormData): void {
    const newCycle: TCycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleStopCycle(): void {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }
  /// ///////////////////////////////////////////////////

  const task: string = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled: boolean = task === '' || isNaN(minutesAmount)

  return (
    <HomeContainer>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            finishCycle,
            amountSecondsPassed,
            updateSecondsPassed
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle === undefined ? (
          <CountdownButton
            type="submit"
            disabled={isSubmitDisabled}
            action="play"
          >
            <Play size={24} />
            Começar
          </CountdownButton>
        ) : (
          <CountdownButton
            action="stop"
            type="button"
            onClick={handleStopCycle}
          >
            <HandPalm size={24} />
            Interromper
          </CountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
