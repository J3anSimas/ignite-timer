import { HeaderContainer } from './Header.styles'
import LogoIgnite from '../../assets/logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
export default function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <span>
        <img src={LogoIgnite} />
      </span>
      <nav>
        <NavLink to="/">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
