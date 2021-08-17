import Hero from './Hero'
import PublicSchedule from './PublicSchedule'
import Reviews from './Reviews'
import MeetLindsey from './MeetLindsey'
import CallToAction from './CallToAction'
import Footer from './Footer'
import BounceBars from './BounceBars'
import MainText from './MainText'
import Accordian from './Accordian'
import MobileReviews from './MobileReviews'
import styled from 'styled-components'

const Desktop = styled.div`
  display: block;
  @media (max-width: 992px) {
    display: none;
  }
`
const Mobile = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
`
function HomePage() {
  return (
    <>
      <Hero />
      <MainText />
      <MeetLindsey />
      <BounceBars />
      <PublicSchedule />
      <Desktop>
        <Reviews />
      </Desktop>
      <Mobile>
        <MobileReviews />
      </Mobile>

      <Accordian />
      <CallToAction />
      <Footer />
    </>
  )
}

export default HomePage
