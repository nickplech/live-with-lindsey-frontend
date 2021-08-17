import * as React from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import styled from 'styled-components'

const Wrap = styled(motion.div)`
  display: flex;
  flex-flow: row;
  width: 100%;
  position: relative;
  div {
    margin-top: 10px;
    background: ${(props) => props.theme.fourth};
    height: 5px;
    width: 5px;
    border-radius: 50%;
    position: absolute;
    &:nth-of-type(1) {
      left: 120px;
    }
    &:nth-of-type(2) {
      left: 50px;
    }
    &:nth-of-type(3) {
      transform: translateX(60px);
      margin-left: 40px;
    }
    @media (max-width: 992px) {
      top: -80px;
      position: relative;
      &:nth-of-type(1) {
        left: 20px;
      }
      &:nth-of-type(2) {
        left: 0px;
      }
      &:nth-of-type(3) {
        margin-left: -40px;
      }
    }
  }
`
const dots = [1, 2, 3]
export default function Example() {
  return (
    <AnimateSharedLayout>
      {dots.map((dot, i) => {
        return (
          <Wrap
            transition={{
              staggerChildren: 0.8,
            }}
            key={i}
          >
            <motion.div
              initial={{
                opacity: 0,
                x: i * 25 + 390,
                y: i * -2 + 50,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 2,
                delay: i * 0.6,

                loop: Infinity,
              }}
            />
          </Wrap>
        )
      })}
    </AnimateSharedLayout>
  )
}
