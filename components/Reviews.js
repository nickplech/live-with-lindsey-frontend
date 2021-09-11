import React, { useState } from 'react'
import { testimonials } from '../lib/testimonials'
import styled from 'styled-components'
import {
  motion,
  useMotionValue,
  AnimatePresence,
  useTransform,
  AnimateSharedLayout,
} from 'framer-motion'
import Dots from './Dots'

const Overlay = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  position: ${(props) => (props.selectedId === null ? 'absolute' : 'fixed')};
  background: rgba(20, 20, 20, 0.6);
  z-index: 30000;
`
const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  width: 95%;
  max-width: 1800px;
  position: relative;
  height: 450px;
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
const BaseReview = styled(motion.div)`
  border-radius: 10px;
  height: 100%;
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
  align-self: center;
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  box-shadow: 0px 3px 4px -2px rgba(20, 20, 20, 0.2);
  background-color: #f8b0b0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23ffd7d4'/%3E%3Cstop offset='1' stop-color='%23f8b0b0'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23fcc4c2'/%3E%3Cstop offset='1' stop-color='%23f8b0b0'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg %3E%3Cg transform=''%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform=''%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.4' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  z-index: 10000;
  transition: 0.5s;
  color: white;
  font-family: 'Bison';
  @media (min-width: 768px) {
    &:nth-of-type(1) {
      grid-column: 1/3;
      grid-row: 1;
      /* background: url('../static/img/review1bw.jpg') no-repeat center center; */
      background-size: cover;
    }
    &:nth-of-type(2) {
      grid-column: 3/4;
      grid-row: 1;
      /* background: url('../static/img/review2bw.jpg') no-repeat center center; */
      background-size: cover;
    }
    &:nth-of-type(3) {
      grid-column: 4/5;
      grid-row: 1/3;
      /* background: url('../static/img/review3bw.jpg') no-repeat center center; */
      background-size: cover;
    }
    &:nth-of-type(4) {
      grid-column: 1/2;
      grid-row: 2;
      /* background: url('../static/img/review4bw.jpg') no-repeat center center; */
      background-size: cover;
    }
    &:nth-of-type(5) {
      grid-column: 2/4;
      grid-row: 2;
      /* background: url('../static/img/review5bw.jpg') no-repeat center center; */
      background-size: cover;
    }
  }
  &:before {
    background: ${(props) => props.theme.primary};
    z-index: 11000;
    opacity: 0.4;
    height: 100%;
    border-radius: 10px;
    width: 100%;
    position: absolute;
    content: '';
  }
  &:hover {
  }
  h5 {
    margin: 0;
  }
`
const Wind = styled(motion.div)`
  background-size: cover;
  border-radius: 10px;
  width: 90%;
  max-width: 1200px;
  padding: 40px;
  margin: 0 auto;
  grid-column: 1/5;
  grid-row: 1/3;
  display: flex;
  align-self: center;
  justify-self: center;
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  font-size: 22px;  background-color: ${(props) => props.theme.second};
  overflow: hidden;
  box-shadow: 0px 3px 4px -2px rgba(20, 20, 20, 0.2);
  z-index: 40000;
  font-family: 'Bison';
  /* &:before {
  
    z-index: 11000;
    height: 100%;
    border-radius: 10px;
    width: 100%;
    position: absolute;
    content: '';
  } */
  p {
    z-index: 12000;
    margin: 5px;
    font-size: 18px;
    color: white;
  }
  h2 {
    font-size: 22px;
    z-index: 12000;
    margin: 0;
    color: white;
  }
`
const Button = styled(motion.button)`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin: 10px;
  position: absolute;
  right: 0;
  outline: none;
  cursor: pointer;
  z-index: 12000;
  top: 0;
  border: none;
  font-size: 22px;
  box-shadow: 0px 3px 4px -2px rgba(20, 20, 20, 0.2);
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme.second};
  font-family: 'Comfortaa';
`
const FeedBackGraphic = styled.img`
  width: 450px;
  height: auto;
  position: relative;
  transform: translate(50px, 100px);
`
export default function Reviews() {
  const [selectedId, setSelectedId] = useState(null)
  const [item, setItem] = useState(null)
  function setBoth(item) {
    setSelectedId(item.name)
    setItem(item)
  }
  return (
    <>
      <FeedBackGraphic
        src="../static/img/lhffamfeedback.svg"
        alt="lhffamfeedback graphic"
      />
      <Dots />
      <Wrap>
        <AnimateSharedLayout crossfade>
          {testimonials.map((item) => (
            <BaseReview
              key={item.name}
              layoutId={item.name}
              onClick={() => setBoth(item)}
            >
              <motion.h5
                style={{
                  opacity: 1,
                  letterSpacing: '3px',
                  zIndex: 20000,
                  position: 'relative',
                }}
              >
                {item.paraphrase}
              </motion.h5>
              <motion.h5
                style={{ opacity: 1, zIndex: 20000, position: 'relative' }}
              >
                &mdash; {item.name}
              </motion.h5>
            </BaseReview>
          ))}

          <AnimatePresence>
            {selectedId && (
              <>
                <Overlay selectedId={selectedId}>
                  <Wind
                    backgroundPic={item.backgroundPic}
                    style={{ borderRadius: '25px' }}
                    layoutId={selectedId}
                  >
                    <div
                      style={{
                        color: 'white',
                        transform: 'translateY(35%)',
                        left: '20px',
                        fontSize: '182px',
                        position: 'absolute',
                        zIndex: 100000,
                        opacity: '.2',
                      }}
                    >
                      &#10077;
                    </div>
                    <Button onClick={() => setSelectedId(null)}>x</Button>
                    <motion.p>{item.content}</motion.p>
                    <motion.h2>&mdash;{item.name}</motion.h2>
                  </Wind>
                </Overlay>
              </>
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </Wrap>
    </>
  )
}
