import { CountdownContainer, Separator } from './Countdown.styles'

export default function Countdown(): JSX.Element {
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
