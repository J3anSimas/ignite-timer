import {
  FormContainer,
  MinuteAmountInput,
  TaskInput
} from './NewFormCycle.styles'

export default function NewCycleForm(): JSX.Element {
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        placeholder="Dê um nome para seu projeto"
        id="task"
        list="task-suggestions"
        disabled={!(activeCycle == null)}
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
        disabled={!(activeCycle == null)}
        {...register('minutesAmount', {
          valueAsNumber: true
        })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
