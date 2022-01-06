import React, {useEffect, useState} from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from 'styled-components'

 const Wrap = styled.div`
 
  display: flex;
  align-items: center;
  border-radius: 20px;
  width: 200px;
  height: 10px;
  margin: auto;
  background-color: lightgrey;
 

.square {
  border-radius: 4px;
  margin: auto;
  height: 30px;
  width: 20px;
margin-top: -10px;
  background-color: #ffd7d4;
}

 `

export default function  DragAnimation({priceState, setPriceState}) {
  const sliderXVal = useMotionValue(0)
 
  useEffect(
    () =>
      sliderXVal.onChange(() => {
        const rounded = Math.floor(sliderXVal.get())
        const plus100 = rounded + 100
    
        setPriceState(plus100)
      }),
    [sliderXVal]
  )
  return (
  
    <Wrap >
    
      <motion.div
        className="square"
        whileHover={{ scale: 1.05 }}
        drag="x"
        style={{ x: sliderXVal }}
        dragTransition={{ power: 0.1 }}
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0}
      />
    </Wrap>
  )
}

 
