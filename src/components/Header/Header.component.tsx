import { HeaderContainer } from './Header.styles'
import LogoIgnite from '../../assets/logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { Link } from 'react-router-dom'
export default function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <span>
        <img src={LogoIgnite} />
      </span>
      <nav>
        <Link to="">
          <Timer size={24} />
        </Link>
        <Link to="">
          <Scroll size={24} />
        </Link>
      </nav>
    </HeaderContainer>
  )
}
