import SignInSwitch from '../components/SignInSwitch'
import DashboardComponent from '../components/DashboardComponent'
import Footer from '../components/Footer'
import styled from 'styled-components'
import DashMobile from '../components/DashMobile'

const Desktop = styled.div`
 
    display: block;
 
`
 
const SignupPage = (props) => (
  <SignInSwitch>
    <Desktop>
      <DashboardComponent />
    </Desktop>

    <Footer />
  </SignInSwitch>
)

export default SignupPage
   