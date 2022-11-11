import { useForm } from 'react-hook-form'
import { Play } from 'phosphor-react'
import { useState } from 'react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from './Home.styles'

export default function Home(): JSX.Element {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data: any): void {
    console.log(data)
  }

  const task: string = watch('task')
  const minutesAmount = watch('minutesAmount')
  console.log(minutesAmount)
  const isSubmitDisabled: boolean = task === '' || isNaN(minutesAmount)
  console.log(isSubmitDisabled)
  return (
    <HomeContainer>
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
