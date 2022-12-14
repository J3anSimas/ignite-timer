import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;

  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${(props) => props.theme.gray100};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`
const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.gray500};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.gray100};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme.green500};
  }
  &::placeholder {
    color: ${(props) => props.theme.gray500};
  }
  &:disabled {
    cursor: not-allowed;
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinuteAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme.gray100};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme.gray700};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`
export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme.green500};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

type TCountdownButton = {
  action: 'play' | 'stop'
}
export const CountdownButton = styled.button<TCountdownButton>`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background: ${(props) => {
    return props.action === 'play' ? props.theme.green500 : props.theme.red500
  }};
  color: ${(props) => props.theme.gray100};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => {
      return props.action === 'play' ? props.theme.green700 : props.theme.red700
    }};
  }

  &:focus {
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.action === 'stop' ? props.theme.red500 : props.theme.green500};
  }
`
