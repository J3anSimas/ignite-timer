import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout.component'
import History from './pages/History/History.page'
import Home from './pages/Home/Home.page'

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
