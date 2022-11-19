export type TCycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
export type TCyclesState = {
  cycles: TCycle[]
  activeCycleId: string | null
}

export type TCycleAction = {
  type: 'ADD_NEW_CYCLE' | 'INTERRUPT_CURRENT_CYCLE' | 'FINISH_CURRENT_CYCLE'
  payload?: TCycle
}
export function cyclesReducer(
  state: TCyclesState,
  action: TCycleAction
): TCyclesState {
  switch (action.type) {
    case 'ADD_NEW_CYCLE': {
      if (action.payload != null) {
        return {
          ...state,
          cycles: [action.payload, ...state.cycles],
          activeCycleId: action.payload?.id
        }
      }
      return state
    }

    case 'FINISH_CURRENT_CYCLE': {
      return {
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null
      }
    }
    case 'INTERRUPT_CURRENT_CYCLE': {
      return {
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null
      }
    }
    default:
      return state
  }
}
