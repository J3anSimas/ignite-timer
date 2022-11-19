import { differenceInSeconds } from 'date-fns'
import {
  Children,
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState
} from 'react'
import {
  createNewCycleAction,
  finishCycleAction,
  interruptCurrentCycleAction
} from '../reducers/cycles/cycles.actions'
import {
  cyclesReducer,
  TCycle,
  TCyclesState
} from '../reducers/cycles/cycles.reducer'

type TCyclesContext = {
  cycles: TCycle[]
  activeCycle: TCycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: (data: TCreateCycleData) => void
  stopCycle: () => void
  updateSecondsPassed: () => void
  finishCycle: () => void
}

type TCreateCycleData = {
  task: string
  minutesAmount: number
}

type TCyclesContextProps = {
  children: ReactNode
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const CyclesContext = createContext<TCyclesContext>({} as TCyclesContext)

export default function CyclesContextProvider({
  children
}: TCyclesContextProps): JSX.Element {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer-cycles-state-1.0.0'
      )
      if (storedStateAsJSON != null) {
        return JSON.parse(storedStateAsJSON)
      }
    }
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer-cycles-state-1.0.0', stateJSON)
  }, [cyclesState])
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Helper functions to pass through CyclesContext
  function finishCycle(): void {
    dispatch(finishCycleAction())
  }

  function updateSecondsPassed(): void {
    if (activeCycle == null) return
    setAmountSecondsPassed(
      differenceInSeconds(new Date(), activeCycle.startDate)
    )
  }

  function createNewCycle(data: TCreateCycleData): void {
    const newCycle: TCycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    dispatch(createNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function stopCycle(): void {
    dispatch(interruptCurrentCycleAction())
  }
  /// ///////////////////////////////////////////////////
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        createNewCycle,
        stopCycle,
        finishCycle,
        amountSecondsPassed,
        updateSecondsPassed
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
