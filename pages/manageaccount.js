import PleaseSignIn from '../components/PleaseSignIn'
import TabParent from '../components/TabParent'
import TwoFactorCheck from '../components/TwoFactorCheck'

const manageaccount = ({ query }) => {
  return (
    <PleaseSignIn>
      {(me) => <TabParent page={parseFloat(query.page) || 1} />}
    </PleaseSignIn>
  )
}
export default manageaccount
