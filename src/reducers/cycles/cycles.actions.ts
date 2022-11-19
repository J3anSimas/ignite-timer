import { TCycle, TCycleAction } from './cycles.reducer'

export function createNewCycleAction(newCycle: TCycle): TCycleAction {
  return {
    type: 'ADD_NEW_CYCLE',
    payload: newCycle
  }
}

export function finishCycleAction(): TCycleAction {
  return {
    type: 'FINISH_CURRENT_CYCLE'
  }
}

export function interruptCurrentCycleAction(): TCycleAction {
  return {
    type: 'INTERRUPT_CURRENT_CYCLE'
  }
}
