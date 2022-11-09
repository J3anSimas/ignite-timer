import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header.component'
import { LayoutContainer } from './DefaultLayout.styles'

export default function DefaultLayout(): JSX.Element {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
