import HomePageHero from './HomePageHero'
import PublicSchedule from './PublicSchedule'
import Reviews from './Reviews'
 
 
 
import BounceBars from './BounceBars'

import Footer from './Footer'
import Instagram from './Instagram'
 
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
