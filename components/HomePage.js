import HomePageHero from './HomePageHero'
import PublicSchedule from './PublicSchedule'
import Reviews from './Reviews'
 
import CallToAction from './CallToAction'
 
import BounceBars from './BounceBars'

import Footer from './Footer'
import Instagram from './Instagram'
import styled from 'styled-components'

 
function HomePage() {
  return (
    <>
      <HomePageHero />
       <BounceBars />
  

      <PublicSchedule />
  
        <Reviews />
      
  

      <Instagram />
      <Footer/>
      {/* <CallToAction /> */}
 
    </>
  )
}

export default HomePage
