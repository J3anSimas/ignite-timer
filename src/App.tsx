import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button/Button.styles'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
