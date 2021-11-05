import HomePageHero from './HomePageHero'
import PublicSchedule from './PublicSchedule'
import Reviews from './Reviews'
import MeetLindsey from './MeetLindsey'
import CallToAction from './CallToAction'
import Footer from './Footer'
import BounceBars from './BounceBars'
import MainText from './MainText'
import Accordian from './Accordian'
import Instagram from './Instagram'
import styled from 'styled-components'

 
function HomePage() {
  return (
    <>
      <HomePageHero />
       <BounceBars />
      <MeetLindsey />

      <PublicSchedule />
  
        <Reviews />
      
  

      <Instagram />
      <CallToAction />
      <Footer />
    </>
  )
}

export default HomePage
