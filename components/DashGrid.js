import React from 'react'
import DashboardComponent from './DashboardComponent'
import DashStats from './DashStats'
import Footer from './Footer' 
import styled from 'styled-components'
import ScheduledClasses from './ScheduledClasses'
 import  TickerFeed from './TickerFeed'
 import {useUser} from './User'

 const Grid = styled.div`
 display: grid;
 width: 100%;
 grid-template-columns: 1fr  ;
 grid-template-rows: 300px  ;
 @media(min-width: 768px) {

     grid-template-columns: 1fr 1fr;
 grid-template-rows:  300px   ;
 }
 `
 const  DashGrid = (props) => {
const me = useUser()
  const userPic = me?.image ? me.image.publicUrlTransformed : '../static/img/profpic.svg'
const today = new Date() 
  const count =
    me && me.cart.reduce(
    (tally, cartItem) => tally + cartItem.quantity,
    0,
  ) 
  return (
      <>
           <TickerFeed
          today={today}
          count={count}
          me={me}
          pic={userPic}
          showPic={true}
       firstName={me?.firstName}
        />
   <Grid>
        <DashboardComponent />
        <DashStats />
       </Grid>
           <ScheduledClasses     />
    <Footer/>
</>
  )
}


export default DashGrid