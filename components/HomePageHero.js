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
 const OnDemandScreen = styled(motion.div)`
 background-image: linear-gradient(195deg,  #f8b0b0 ,#ffd7d4);
    justify-content: center;
       align-items: center;    display: flex;
 border-radius: 5px;
 overflow: hidden;
 background: url('../static/img/lindseyharrodondemand.jpg') center center no-repeat;
 background-size: cover;
 box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
     0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09) 
     ;
     .playbutton {
      box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
     0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09) 
     ;
     opacity: .8;
   border-radius: 50%;
       margin: 0 auto;
       height: 60px;
       width: 60px;
       transition: .3s;
       &:hover {
         transform: scale(1.1);
       }
     }
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
const MailingListInput = styled.input`
 border: none;
height: 50px;
width: 450px;
box-shadow: 0 2px 15px -4px rgba(0, 0, 0, 0.09),
      0 20px 50px rgba(0, 0, 0, 0.09)  ;
border-radius: 25px;
padding: 0 30px ;
font-size: 12px;
font-family: 'Comfortaa';
text-transform: uppercase;
margin: 0 auto;
transform: translate(-3px, 0);
&:focus {
  outline: none;
}
&::-webkit-input-placeholder {
      
     opacity: 0.5; /*Change the opacity between 0 and 1*/
}
 `
const SubmitButton = styled.button`
  background:   #f8b0b0  ;
  color: white;
  font-family: 'Bison';
  position: absolute;
  font-size: 16px;
  transform: translate(-108px, 7px);
  border: none;
  border-radius: 25px;cursor: pointer;
  width: 100px;
  height: 36px;box-shadow: 0 -2px 15px -4px rgba(0, 0, 0, 0.09),
      0 2px  13px rgba(0, 0, 0, 0.15)  ;
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
      
           <p>Always be up-to-date with the Lindsey Harrod Fitness community&mdash;be the first to know about 
             fitness challenges &amp; upcoming community events, Just enter your email below! <br/><br/>
             </p>
               <MailingListInput placeholder="enter your email for updates"/>
             <SubmitButton className="submit-email">Submit to Join</SubmitButton>
             </div>
           
          {/* <Link href={{ pathname: '/signup' }}>
            <SignMeUp>Sign Up for Free </SignMeUp>
          </Link> */}
    </Title>
        <Lindsey style={{
                 
                perspective: 800
            }}>
      <img src='../static/img/lindsey-harrod-fitness-header.png' alt='Lindsey Harrod Fitness' />
        <OnDemandScreen
                style={{
                    width: 240,
                    height: 160,
                    borderRadius: 10,
              
                    backgroundColor: '#f8b0b0',
                    opacity: ".75",
                    left: -305,
                    top: 400,
                    position: "relative",
                    x: x,
                    y: y,
                  
                    cursor: "grab"
                }}
               
              
                whileTap={{ cursor: "grabbing" }}
            ><img src="../static/img/playbutton.svg" className="playbutton"/></OnDemandScreen>
             <LiveScreen
                style={{
                    width: 180,
                    height: 120,
                    borderRadius: 10,
        

                  
                 
                    opacity: ".65",
                    left: -270,
                    top: 300,
                    position: "absolute",
                    x: x,
                    y: y,
                  
                   
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
