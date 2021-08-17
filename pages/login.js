import SignInSwitch from '../components/SignInSwitch'
import DashboardComponent from '../components/DashboardComponent'
import Footer from '../components/Footer'
import styled from 'styled-components'
import DashMobile from '../components/DashMobile'

const Desktop = styled.div`
  display: none;
  @media (min-width: 992px) {
    display: block;
  }
`
const Mobile = styled.div`
  display: flex;
  flex-flow: column;
  @media (min-width: 992px) {
    display: none;
  }
`
const SignupPage = (props) => (
  <SignInSwitch>
    <Desktop>
      <DashboardComponent />
    </Desktop>
    <Mobile>
      <DashMobile />
    </Mobile>
    <Footer />
  </SignInSwitch>
)

export default SignupPage
