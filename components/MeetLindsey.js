import React, { useState } from 'react'
import styled from 'styled-components'
import MeetLindseyModal from './MeetLindseyModal'
const Wrap = styled.div`
   width: 100%;
 
  margin: 0 auto;
  background-image: linear-gradient(145deg,  #f8b0b0 ,#ffd7d4 );


  user-select: none;
  outline: none;
  width: 100%;

  grid-column: 1;
  display: block;
  grid-row: 1;
  margin: 0 auto;
  padding: 10px 55px 0 55px;

  font-family: 'Bison';
  letter-spacing: 2px;
  line-height: 30px;
  font-size: 22px;
  color: white;

  position: relative;
text-align: center; 
 padding-bottom: 30px;

  .about-title {
    position: relative;
    letter-spacing: 3px;
    
    font-family: 'Bison';
    color: white;
    margin: 30px 0 30px  0   ;
    font-size: 38px;
  }

`

 
 
function MeetLindsey(props) {
  return (
    <Wrap>
        
    <h1 className="about-title">Meet Your Trainer</h1>
          Hey babe! For starters, I am so happy you are here. Hey, hi, hello,
          I'm Lindsey, your new virtual fitness coach.
          <br /> <br />
          When you join the Lindsey Harrod Fitness community, we will unlock the confidence and
          strength already within you, transform your perspective towards
          fitness to one of celebration&mdash;not punishment. My goal is to
          inspire you to know anything is possible and guide you, all while
          having the literal BEST time.
          <MeetLindseyModal />
        
    </Wrap>
  )
}

export default MeetLindsey
