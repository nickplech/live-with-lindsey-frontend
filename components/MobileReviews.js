import React from 'react'
import { testimonials } from '../lib/testimonials'

import Dots from './Dots'
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import styled from 'styled-components'
const Wrapper = styled.div`
  width: 100%;
  height: 500px;

  overflow: hidden;
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  color: white;
  .background {
    background-color: #f8b0b0;

    border-radius: 20px;
  }
`
const FeedBackGraphic = styled.img`
  width: 255px;
  transform: translate( -30px, -120px);
  position: absolute;
`
function Card(props) {
  const x = useMotionValue(0)
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5])
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  })

  function handleDragEnd(event, info) {
    if (info.offset.x < -100) {
      props.setExitX(-250)
      if (props.index >= 3) {
        props.setIndex(0)
      }
      props.setIndex(props.index + 1)
    }
    if (info.offset.x > 100) {
      props.setExitX(250)
      if (props.index >= 3) {
        props.setIndex(0)
      }
      props.setIndex(props.index + 1)
    }
  }
  console.log(props.index)
  return (
    <motion.div
      className="background"
      style={{
        width: '90%',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        x: x,
        padding: '15px 20px',
        fontFamily: 'Bison',
        letterSpacing: '2px',
        fontSize: '16px',
        textAlign: 'center',
        scale: scale,
        rotate: rotate,
        cursor: 'grab',
      }}
      whileTap={{ cursor: 'grabbing' }}
      drag={props.drag}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onDragEnd={handleDragEnd}
      initial={props.initial}
      animate={props.animate}
      transition={props.transition}
      exit={{
        x: props.exitX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      {props.children}
    </motion.div>
  )
}

export default function MobileReviews() {
  const [index, setIndex] = React.useState(1)
  const [exitX, setExitX] = React.useState('100%')

  return (
    <Wrapper>
      <FeedBackGraphic
        src="../static/img/lhffamfeedback.svg"
        alt="lhffamfeedback graphic"
      />
      {/* <Dots /> */}
      <motion.div
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        <AnimatePresence initial={false}>
          <Card
            key={index + 'card 1'}
            initial={{
              scale: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              scale: 0.85,
              y: '150%',
              opacity: 0.7,
            }}
            transition={{
              scale: { duration: 0.2 },
              opacity: { duration: 0.4 },
            }}
          >
            {' '}
            <div
              style={{
                color: 'white',

                fontSize: '132px',
                position: 'absolute',
                zIndex: 100000,
                opacity: '.2',
              }}
            >
              &#10077;
            </div>
            {index <= 3
              ? testimonials[index + 1].paraphrase
              : testimonials[0].paraphrase}
            <p>
              &mdash;{' '}
              {index <= 3 ? testimonials[index + 1].name : testimonials[0].name}
            </p>
          </Card>
          <Card
            key={index + 'card 2'}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              opacity: {
                duration: 0.2,
              },
            }}
            exitX={exitX}
            setExitX={setExitX}
            index={index}
            setIndex={setIndex}
            drag="x"
          >
            <div
              style={{
                color: 'white',

                fontSize: '132px',
                position: 'absolute',
                zIndex: 100000,
                opacity: '.2',
              }}
            >
              &#10077;
            </div>
            {index <= 3
              ? testimonials[index].paraphrase
              : testimonials[0].paraphrase}
            <p>
              &mdash;{' '}
              {index <= 3 ? testimonials[index].name : testimonials[0].name}
            </p>
          </Card>
        </AnimatePresence>
      </motion.div>
    </Wrapper>
  )
}
