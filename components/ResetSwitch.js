import { useUser } from './User'
import TwoFacAuth from './TwoFacAuth'
import Reset from './Reset'

const ResetSwitch = (props) => {
  const me = useUser()
    const allClear = me && me.hasPassedTwoFac === true
  if (!allClear && me)
  return <TwoFacAuth userId={me && me.id}/>

  if(allClear) return props.children
  if (!me) return <Reset resetToken={props.resetToken} />


}

export default ResetSwitch
