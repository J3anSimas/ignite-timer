import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HomeContainer, CountdownButton } from './Home.styles'
import Countdown from './components/Countdown/Countdown.component'
import NewCycleForm from './components/NewCycleForm/NewCycleForm.component'
import { CyclesContext } from '../../contexts/cycles.context'
import { useContext } from 'react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ter no mínimo 5 minutos.')
    .max(60, 'O ciclo precis ter no máximo 60 minutos.')
})
type TNewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function Home(): JSX.Element {
  const { activeCycle, createNewCycle, stopCycle } = useContext(CyclesContext)
  const newCycleForm = useForm<TNewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const task: string = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled: boolean = task === '' || isNaN(minutesAmount)

  function handleCreateNewCycle(data: TNewCycleFormData): void {
    createNewCycle(data)
    reset()
  }

  function handleStopCycle(): void {
    stopCycle()
  }
  return (
    <HomeContainer>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
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
