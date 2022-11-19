import { differenceInSeconds } from 'date-fns'
import { Children, createContext, ReactNode, useState } from 'react'

type TCycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

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
  const [cycles, setCycles] = useState<TCycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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
  function createNewCycle(data: TCreateCycleData): void {
    const newCycle: TCycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    setCycles((state) => [newCycle, ...state])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    // reset()
  }

  function stopCycle(): void {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
    setActiveCycleId(null)
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
