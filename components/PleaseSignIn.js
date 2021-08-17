
import { useUser } from './User'

import SignIn from './SignIn'
import styled from 'styled-components'
import Loader from './Loader'
import TwoFacAuth from './TwoFacAuth'
import { useEffect } from 'react'
const MaxWidth = styled.div`
  width: 90%;
  position: relative;
  min-width: 350px;
  margin: 0 auto;
  top: 30px;
  @media (min-width: 768px) {
    width: 70%;
  }
`

const Paragraph = styled.p`
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Bison';
  color: ${(props) => props.theme.third};
  letter-spacing: 2px;
  font-size: 18px;
  @media (min-width: 768px) {
    letter-spacing: 4px;
    font-size: 24px;
  }
`
const PleaseSignIn = ({ children }) => {
  const me = useUser()
  const allClear = me && me.hasPassedTwoFac === true


  if (!allClear && me) return <TwoFacAuth userId={me && me.id} />

  if (allClear) return children(me)

  if (!me)
    return (
      <MaxWidth>
        <Paragraph>You must be Signed In to View this Content</Paragraph>
        <SignIn margin={false} />
      </MaxWidth>
    )
}

export default PleaseSignIn
