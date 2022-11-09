import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function DefaultLayout(): JSX.Element {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
