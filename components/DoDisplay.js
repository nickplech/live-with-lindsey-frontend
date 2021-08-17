import { useUser } from './User'
import HomePage from './HomePage'
import styled from 'styled-components'
import TwoFactorAuth from './TwoFacAuth'
const NoScroll = styled.div`
  overflow-y: hidden;
`

const DoDisplay = ({ children }) => {
  const me = useUser()
  const allClear = me && me.hasPassedTwoFac === true


  if (!allClear && me)
return <TwoFactorAuth userId={me && me.id}/>

if(allClear) return children

if(!me) return (
      <NoScroll>
        <HomePage />
      </NoScroll>
    )

}

export default DoDisplay
