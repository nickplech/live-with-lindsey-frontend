import DoDisplay from '../components/DoDisplay'
import Footer from '../components/Footer'
import DashboardComponent from '../components/DashboardComponent'
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
function Home(props) {
  return (
    <DoDisplay>
      <Desktop>
        <DashboardComponent />
      </Desktop>
      <Mobile>
        <DashMobile />
      </Mobile>
      <Footer />
    </DoDisplay>
  )
}

export default Home
