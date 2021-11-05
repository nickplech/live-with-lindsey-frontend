import React, { useState } from 'react'

import styled from 'styled-components'
import {
  motion,
 
} from 'framer-motion'
import NewReviews  from './NewReviews'
import Dots from './Dots'

 
const Wrap = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr  ;
  grid-template-rows: 1fr  ;
 
  width: 95%;
  max-width: 1800px;
  position: relative;
  
  justify-content: center;
  align-items: center;
  margin: 130px auto 170px;
  text-align: center;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
  }
`
 
const FeedBackGraphic = styled.img`
  width: 450px;
  height: auto;
  position: relative;
  transform: translate(70px, 150px);
`
export default function Reviews() {
 
  return (
 <Wrap>
   <div style={{gridColumn: 1}}>
      <FeedBackGraphic
        src="../static/img/lhffamfeedback.svg"
        alt="lhffamfeedback graphic"
      />
      <Dots />
     </div>
      < NewReviews/>

      </Wrap>
    
  )
}
