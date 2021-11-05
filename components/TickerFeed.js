// import React, {useRef, useState, useEffect, useCallback} from 'react'
import ModalPicture from '../components/PictureUpdateModal'
import styled from 'styled-components'
import Link from 'next/link'
import { format } from 'date-fns'
import CartCount from './CartCount'
import {useToast} from './contexts/LocalState'
const Offline = styled.div`
  width: 100%;
  height: 230px;
  color: white;
  background: rgb(30, 30, 30);
  z-index: 0;
  padding: 0 10px;
  position: relative;
  display: flex;
  grid-template-columns: 1fr ;
  @media (max-width: 768px) {
    height: 220px;
  }
  h1 {
    padding: 0 10px;
    position: relative;
    letter-spacing: 6px;
    font-size: 60px;
    z-index: 1000;
    line-height: 40px;
    transform: translate(20px, -10px);
    font-family: 'Bison';
    margin-right: 30px;
    @media (max-width: 768px) {
      font-size: 40px;
      line-height: 45px;
      transform: translate(20px, 0px);
    }
    @media (max-width: 568px) {
      font-size: 30px;
      line-height: 35px;
      transform: translate(20px, 0px);
    }
  }
`
const SwithButtons = styled.div`
  color: white;
 width: 300px;
 grid-column: 1;
display: flex;
 position:absolute; user-select: none;
 bottom: 10px;
 .todayName {
 margin-left: 15px;
  padding: 0;
  position: relative;
 
  color: white;
cursor: pointer;
   opacity: ${(props) => (props.isToday === 'today' ? 1 : 0.5)};
  font-size:24px;

  z-index: 999;
  font-family: 'Felix';
 }
   .line {
    display: flex;
   
    padding: 0;
    position: relative;
    transform: translateY(2px);
    opacity: 1;
    font-size:21px;
    margin-left: 3px;
    z-index: 999;
    font-family: 'Felix';
 
  }
 .weekName {
  display: flex;
 
  padding: 0;
  position: relative;
  
  opacity: ${(props) => (props.isToday === 'week' ? 1 : 0.5  )};
    font-size: 24px;
 
  z-index: 999;
  font-family: 'Felix';
 
  cursor: pointer;
 }
`
const TodayButton = styled.div`
  height: 33px;
  width: auto;
  position: absolute;

  transform: translate(70px, 110px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6000;
  color: white;
  padding-right: 20px;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  border-right: 3px solid pink;
  @media (max-width: 768px) {
    transform: translate(40px, 85px);
  }
  span {
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
    position: absolute;
    font-size: 16px;
    font-family: 'Bison';
    transform: translate(0px, 5px);
  }
`
const EnvButton = styled.div`
  color: white;
 width: 100%;
display: flex;
 position:absolute; 
 user-select: none;
 bottom: 10px;
 border-radius: 50%;
 grid-column: 2;
  padding: 0;
 text-transform: uppercase;
 transform: translateX(25px);
  opacity: ${(props) => (props.newUpdate === true ? 1 : 0.5  )};
 
 cursor: pointer;
  z-index: 999;
 
  width: auto;
  position: absolute;

 
  display: flex;
 
  z-index: 6000;
 
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
 
     
  color: white;
cursor: pointer;
   opacity: ${(props) => (props.isToday === 'today' ? 1 : 0.5)};
  font-size:24px;
  font-family: 'Felix';
`
const Envelope = styled.img`
height: 20px;
width: 20px;
transform: translate(-30px, 25px);
position: absolute;
fill: white;
user-select: none;
`
const CartPic = styled.a`
  height: 33px;
  width: auto;
  position: absolute;
  cursor: pointer;
  transform: translate(340px, 108px);
  display: flex;
  z-index: 6000;
  color: white;
  &:hover {
    opacity: 0.6;
  }
  @media (max-width: 768px) {
    transform: translate(270px, 88px);
  }
  img {
    height: 38px;
    width: auto;
    @media (max-width: 768px) {
      height: 28px;
    }
  }
`
const OnDemandPic = styled.a`
  height: 50px;
  width: auto;
  position: absolute;
  cursor: pointer;
  transform: translate(185px, 95px);
  display: flex;
  z-index: 6000;
  color: white;
  &:hover {
    opacity: 0.6;
  }
  @media (max-width: 768px) {
    transform: translate(150px, 75px);
  }
  img {
    height: 50px;
    width: auto;
    @media (max-width: 768px) {
      height: 40px;
    }
  }
`
const Both = styled.div`
grid-column: 1/3;
position: relative;
width: 100%;
`
function TickerFeed({ count,  firstName, showPic, pic, today }) {
   const { isToday, handleIt, active } = useToast()
  // const userPic = me?.image ? me.image.publicUrlTransformed : '../static/img/profpic.svg'
  return (
    <Offline>
 
        <h1>{firstName}'s Dashboard</h1>   
        {showPic &&  
        <ModalPicture image={pic && pic} />}
   
   
      <TodayButton>
        <img height="38px" src="../static/img/cal.svg" alt="users cart" />
        <span>{format(today, 'd')}</span>
      </TodayButton>
      <Link href="/checkout">
        <CartPic>
          <img src="../static/img/shopping-cart.svg" alt="users cart" />
          <CartCount count={count} />
        </CartPic>
      </Link>
      <Link href="/ondemand">
        <OnDemandPic>
          <img src="../static/img/wod.svg" alt="on demand workout videos" />
        </OnDemandPic>
      </Link>
             <SwithButtons  isToday={isToday}
        >
  <div className="todayName"
         
          onClick={(e) => handleIt('today')}
         
        >
          TODAY{' '}
        </div>{' '}
        <span className="line" >|</span>
        <div className="weekName"
        
          onClick={(e) => handleIt('week')}
   
        >
          WEEK
        </div>
   </SwithButtons>
   {/* <EnvButton isToday={isToday} ><Envelope src="../static/img/news.svg" alt="live with lindsey community updates icon" />Community Updates</EnvButton> */}
    </Offline>
  )
}

export default TickerFeed
