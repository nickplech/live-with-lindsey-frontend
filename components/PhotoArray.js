import React from 'react'
import styled, {keyframes} from 'styled-components'
import { motion } from 'framer-motion'
 
const BlackAndWhite = styled.section`
  display: flex;
  flex-direction: column; width: 100%;
  height: 350px;
  position: relative;
letter-spacing: 2px;


  justify-content: center;
  align-items: center;
  opacity: 1;
  background-color: rgb(30, 30, 30);

  overflow: hidden;

  @media (max-width: 768px) {
    height: 250px;
  }
 span {
    color:rgba(0,0,0,.2);
    transition: .6s;
    padding: 0 5px;
    margin: 0;  
    line-height: 30px;
    user-select: none; 
    cursor: default; font-size: 40px;
    &:hover {
      transition: 0s;
      color: rgba(255,215,212,.5);
  
      text-shadow: 0 0 110px #f8b0b0;
 
    }
  }
 .ani {
  &:nth-of-type(even) {
     transform:   translateX(-400px);
   }
   &:nth-of-type(3n + 2) {
     transform:   translateX(-600px);
   }
 }
`
 
const TheTitle = styled.img`
z-index: 9999;
position: absolute;
width: 350px;
left: 20px;
height: auto;
`
const Row = styled(motion.div)`

 
    position: relative;
    width: 100%;
 left: -12%;
    display: flex;
    padding: 10px 0;
    white-space: nowrap;   
       
    transform: rotate(-30deg) ;
    &:nth-child(2n + 1) {
     transform: rotate(-30deg)  translateX(-20%)  ;
   }
  
`

const Img = styled(motion.img)`
    width: 75%;
    max-width: 600px;
    position: absolute;
    @media (max-width: 768px) {
      /* transform: translateY(-50px); */
    }
  `
function PhotoArray({title}) {
 
  return (
   
      <BlackAndWhite>
       <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
          <div  className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>BACK</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>
  <span>CHALLENGES</span>
  <span>BICEPS</span>
  <span>BOOTY</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>

  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>


  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     
       <div className="ani" >
        <span>ABS</span>
    <span>ENDURANCE</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>
  
  <span>CORE</span>

<span>ARMS</span>
  <span>BACK</span>
    <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>CHALLENGES</span>

  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>
  <span>CHEST</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
<span>BANDS</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  <span>HAMSTRINGS</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
       
  
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>
  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>
<span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>

 <span>ABS</span>
  
  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
      
       <div className="ani" >
        <span>ABS</span>
  
    <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>BOOTY</span>
  <span>SQUATS</span><span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>

  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>CHALLENGES</span>
  <span>CHEST</span>

  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>

  <span>UPPER BODY</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>STRENGTH TRAINING</span>
  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
    <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>

  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
   
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>

  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
  
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
      
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
    
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
   
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>

  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>BOOTY</span>

  <span>HAMSTRINGS</span>
  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
<span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>
  <span>HIIT CARDIO</span>
  <span> <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>LATS</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
 

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
    <Row initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>

       <div className="ani" >
        <span>ABS</span>
  
  <span>ARMS</span>
  <span>BACK</span>
  <span>BANDS</span>
  <span>BENCH WORKOUTS</span>
  <span>BICEPS</span>
  <span>BOOTY</span>

  <span>CHALLENGES</span>
  <span>CHEST</span>
  <span>CORE</span>
  <span>ENDURANCE</span>

  <span>HAMSTRINGS</span>
  <span>HIIT CARDIO</span>
  <span>LATS</span>
  <span>LEGS</span>
  <span>POSTERIOR CHAIN</span>
  <span>SHOULDERS</span>
  <span>SQUATS</span>
  <span>STRENGTH TRAINING</span>
  <span>STRETCHING</span>
  <span>TRICEPS</span>
  <span>UPPER BODY</span>

  <span>WEIGHT TRAINING</span>
  <span>YOGA</span>
  </div>
     </Row>
 
<Img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          src="../static/img/vodheaderblur.png"
        />
  
      </BlackAndWhite>
         
  )
}

export default PhotoArray
