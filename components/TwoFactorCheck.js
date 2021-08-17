import { useUser } from './User'
import SignIn from './SignIn'
import styled from 'styled-components'
import Loader from './Loader'
import TwoFacAuth from './TwoFacAuth'
const MaxWidth = styled.div`
  width: 80%;
  position: relative;
  min-width: 350px;
  margin: 0 auto;
  top: 80px;
`

const Paragraph = styled.p`
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Bison';
  color: ${(props) => props.theme.third};
  letter-spacing: 4px;
  font-size: 24px;
`
const TwoFactorCheck = (props) => {
  const me = useUser()
  const allClear = me && me.hasPassedTwoFactor === true
  me && me.loading && <p>loading</p>
  if (allClear) {
    return props.children
  }
  return <TwoFacAuth userId={me && me.id} />
}

export default TwoFactorCheck
