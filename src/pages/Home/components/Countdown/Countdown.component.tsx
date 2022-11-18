import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './Countdown.styles'

export default function Countdown(): JSX.Element {
  const {
    activeCycle,
    activeCycleId,
    finishCycle,
    amountSecondsPassed,
    updateSecondsPassed
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle != null ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds =
    activeCycle != null ? totalSeconds - amountSecondsPassed : 0

  const minutesLeft = String(Math.floor(currentSeconds / 60)).padStart(2, '0')
  const secondsLeft = String(currentSeconds % 60).padStart(2, '0')
  useEffect(() => {
    let interval: number
    if (activeCycle != null) {
      interval = setInterval(() => {
        if (
          differenceInSeconds(new Date(), activeCycle.startDate) >= totalSeconds
        ) {
          finishCycle()
          // setActiveCycleId(null)
        } else {
          updateSecondsPassed()
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds, activeCycleId])

  useEffect(() => {
    if (activeCycle != null) {
      document.title = `${minutesLeft}:${secondsLeft} | ${activeCycle.task}`
    } else document.title = `Ignite Timer`
  }, [minutesLeft, secondsLeft, activeCycle])
  return (
    <CountdownContainer>
      <span>{minutesLeft[0]}</span>
      <span>{minutesLeft[1]}</span>
      <Separator>:</Separator>
      <span>{secondsLeft[0]}</span>
      <span>{secondsLeft[1]}</span>
    </CountdownContainer>
  )
}
