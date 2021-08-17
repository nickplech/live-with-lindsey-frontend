import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import { useUser } from './User'
import Signout from './Signout'
import Menu from './Menu'
import styled from 'styled-components'
const Desktop = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`
const Mobile = styled.div`
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }
`
function Nav({ isOpen, toggle }) {
  const me = useUser()

  const addy = me && me.isAdmin
  const addyTrue = me && addy && true

  return (
    <>
      <Desktop>
        <NavStyles>
                  {!me && !addyTrue && (
            <>
              <Link href="/login">
                <a>Login</a>
              </Link>
              <Link href="/signup">
                <button className="signout">Sign Up</button>
              </Link>
            </>
          )}
          {addyTrue && me && (
            <>
              <Link href="/manageaccount">
                <a>Account</a>
              </Link>
              <Link href="/admdash">
                <a>Admin</a>
              </Link>

              <Signout />
            </>
          )}
          {me && !addyTrue && (
            <>
              <Link href="/manageaccount">
                <a>Account</a>
              </Link>

              <Signout />
            </>
          )}
  
        </NavStyles>
      </Desktop>
      <Mobile>
        <Menu me={me} addy={addy} toggle={toggle} isOpen={isOpen} />
      </Mobile>
    </>
  )
}

export default Nav
