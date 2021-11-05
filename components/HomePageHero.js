import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { motion, useMotionValue, useTransform } from "framer-motion";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 60% 1fr;
  grid-template-rows: 1;
margin-bottom:  0px;
  width: 100%;
  overflow-x: hidden;
  -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    .circle {
    background-color: rgba(255, 82, 82, 1);
    border-radius: 50%;
    animation: pulse-red 2s infinite;
    height: 10px;
   
    margin-top: 12px;
    right: 12px;
    position:absolute;
    width: 10px;
    display: inline-flex;
  }

  @keyframes pulse-red {
    0% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    100% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }
`


const Lindsey = styled.div`
height: 100%;
width: 100%;
grid-column: 2;
display: flex;
 
  img {
      height: 650px;  margin: 0 ;
      margin-top: 30px;
  }
`
 const Title = styled.div`
 grid-column: 1;
 height: 100%;
 width: 100%;
 color: slategray;
 display: flex;
 justify-content:center;
 align-items: center;
 flex-flow: column;
 text-align: left;
 padding-top: 0px;
 margin: 0 auto;
 @media(max-width: 992px) {
   padding-left: 10px;
 }
 h1 {
     font-size:60px;
     line-height:62px;  
     margin: 0 ;
 }
 
 .main-text {
   font-family: 'Comfortaa';
   max-width: 550px;
   font-size:18px;
   line-height:20px;  
 }
 span {
     color: ${props => props.theme.primary};
     font-size: 74px;
     -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
    background-image: linear-gradient(135deg, #f8b0b0, #ffd7d4,  #f8b0b0);
    background-clip: text;
   
 }
  
 `
 const LiveScreen = styled(motion.div)`
  background-image: linear-gradient(195deg,  #f8b0b0 ,#ffd7d4);
 
  border-radius: 5px;
  overflow: hidden;
  background: url('../static/img/fullbodypyramid.gif') center center no-repeat;
  background-size: cover;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09);
 `
 const SignMeUp = styled.a`

 color: white;
  padding: 8px 16px;   font-size: 26px;line-height: 26px;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: .4s;   background: #f8b0b0;
    box-shadow: 0px 8px 40px rgba(10,10,10,.1);
  &:hover {
   background: ${props => props.theme.second};
 background-image: linear-gradient(195deg,  #f8b0b0 ,#ffd7d4, #f8b0b0);
    transform: scale(1.02);
  }
 `
 const GradientDiv = styled.div`
  display: block;
 
  overflow: hidden;
 
  position: absolute;
 z-index:0;
    height: 500px;
 
    width: 100%;
    left: -10%;
 transform: translate(0, -30%) rotate(-15deg);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 20%,
        rgba(255, 215, 212, 1) 100%
    );
   
`
const HomePageHero = () => {
  const x = useMotionValue(195);
  const y = useMotionValue(100);
 

return(
    <> <GradientDiv />
  <Wrapper  >

    <Title>        
        <h1>
            Live <span>&amp;</span> On-Demand workouts<br/>
                
            by <span  >Lindsey Harrod </span>  </h1>
            <div className="main-text">
      
           <p>Get ready to have fun and work hard&mdash;
            my classes range from low impact, 
            to strength training, to high intensity, 
            and cater to all fitness levels. <br/><br/>
             </p>
             </div>
          <Link href={{ pathname: '/signup' }}>
            <SignMeUp>Sign Up for Free </SignMeUp>
          </Link>
    </Title>
        <Lindsey style={{
                 
                perspective: 800
            }}>
      <img src='../static/img/lindsey-harrod-fitness-header.png' alt='Lindsey Harrod Fitness' />
        <motion.div
                style={{
                    width: 280,
                    height: 160,
                    borderRadius: 10,
                    border: '4px solid #f8b0b0',
                    backgroundColor: '#f8b0b0',
                    opacity: ".6",
                    left: -305,
                    top: 400,
                    position: "relative",
                    x: x,
                    y: y,
                  
                    cursor: "grab"
                }}
               
              
                whileTap={{ cursor: "grabbing" }}
            ><div className="circle"/></motion.div>
             <LiveScreen
                style={{
                    width: 180,
                    height: 120,
                    borderRadius: 10,
        

                  
                 
                    opacity: ".8",
                    left: -270,
                    top: 300,
                    position: "absolute",
                    x: x,
                    y: y,
                  
                    cursor: "grab"
                }}
               
              
                whileTap={{ cursor: "grabbing" }}
            ><div className="circle"/></LiveScreen>
   </Lindsey>
     {/* <p>Get ready to have fun and work hard. My classes range from low impact, to strength training, to high intensity, and cater to all fitness levels. Be prepared to gain strength and confidence, connect with like minded women, and leave every class feeling challenged, accomplished, and toned in all the right places.
       </p> */}
  
  </Wrapper>
  </>
)
      }
export default HomePageHero
