import React, { useState, useEffect } from 'react'
import { useUserSocket } from './contexts/SignedInSocket'
import {
  motion,
  AnimateSharedLayout,
  useTransform,
  layout,
} from 'framer-motion'
import styled from 'styled-components'
import { format } from 'date-fns'

const Container = styled.div`
  width: 100%;
  margin: 0px auto;
     position: relative;
z-index: 100;
  display: flex;
  height: 100%;
  z-index: 200;
   list-style: none;
  overflow-y: scroll;
 
  overscroll-behavior: contain;
  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
 
`

const ClassList = styled.ul`
  /* transition: 0.2s; */
  display: flex;
  flex-flow: column;

  width: 100%;
  padding-bottom: 15px;
  margin: 0 auto;
  list-style: none;
  background: transparent;

  position: relative;
  overscroll-behavior: contain;
  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
  @media (max-width: 992px) {
    padding: 0;
  }
`
const Course = styled.li`
  display: flex;
  background: #fff;
  border-radius: 10px;
  border: ${(props) =>
    props.isToday ? 'none' : '1px solid rgba(20, 20, 20, 0.05)'};
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 20000;
  margin: 5px auto;
  width: 95%;
  max-width: 600px;
  height: 65px;
  transition: 0.3s;
 
  &:before {
    display: ${props => props.showTodayMarker ? 'flex' : 'none'};
    content: 'Today';
    /* transform: rotate(90deg); */
 letter-spacing: 2px;
    color: white;
  
    justify-content: center;
    align-items: center;
 padding: 2px 8px;
 line-height: 15px;
border-radius: 3px;
text-align: center;
transform: translate(-40px, 23px) rotate(-90deg);
position: absolute;
background: ${props => props.isLive ? 'red' : props.theme.third};

  }
  @media (min-width: 992px) {
    margin: 5px 20px;
  }
  h1 {
    line-height: 24px;
    font-size: 26px;

    font-family: 'Bison';
    margin: 0;
    transform: translateY(2px);
    color: ${(props) => props.theme.third};
  }
  .course h6 {
    opacity: 0.8;
    font-family: 'comfortaa';
    margin: 0;
    color: ${(props) => props.theme.third};
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transform: translateY(-4px);
  }

  h2 {
    letter-spacing: 1px;
    margin: 7px 0;
    transform: translateY(0px);
    line-height: 15px;
    font-size: 15px;
    color: ${(props) => props.theme.third};
    font-family: 'Bison';
    opacity: 0.8;
  }

  .course-preview {
    /* background: rgb(248,176,176); */
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    border-radius: 10px 0 0 10px;
    background: linear-gradient(
      90deg,
      rgba(248, 176, 176, 0.8057598039215687) 8%,
      rgba(252, 199, 198, 0.5396533613445378) 79%,
      rgba(255, 255, 255, 0.2903536414565826) 100%
    );
    color: ${(props) => props.theme.third};
    width: 190px;
    padding: 5px 10px;
    position: relative;
  }
  .flexy {
    display: flex;
    /* align-items: center;
justify-content: center; */
  }
 

  .course-info {
    padding: 0px;
    position: relative;
    display: flex;
    width: 100%;
    font-family: 'Bison';
    font-size: 16px;
    letter-spacing: 2px;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
  h3 {
    margin: 0 auto;
    font-family: 'Bison';
    letter-spacing: 2px;
    ${(props) => (props.isToday ? 'color: black' : 'opacity: .6')};
  }

  .front,
  .back {
    background-size: cover;
  }

  .dotbox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flipbox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 30px;
    opacity: 0.7;
    background: rgba(20, 20, 20, 0.18);
    border-radius: 50%;
    transform: translate(-5px, 5px);
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .reload {
    transform: translate(1px, -1px);
  }
`


function GetItems({ today, id, items }) {
  return <WeekView today={today} id={id} items={items} />
}


const Dot = styled.div`
  display: flex;
  margin: 0 10px;
  border-radius: 50%;
  margin-bottom: 5px;
  padding: 3px;
  opacity: ${(props) => (props.status === props.name ? 1 : 0.5)};
  background: ${(props) =>
    props.status === props.name
      ? (props) => props.theme.second
      : (props) => props.theme.primary};
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  transition: .3s;
`
const Bubble = styled.div`
display: none;
background: white;
  max-width: 300px;
  border-radius: 10px;
  padding: 0 10px;
  color: slategrey;
  font-family: 'Bison';
  box-shadow: 2px 4px 6px 3px rgba(20, 20, 20, 0.2);
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(252, 199, 198, 1) 100%
  );
  position: absolute;
  transform: translate(-70%,-10px);
  z-index: 1000;
  &:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    opacity: 0.7;
    border-left: 7px solid rgba(252, 199, 198, 1);
    position: absolute;
    z-index: 900;
    right: -6px;
    bottom: 7px;
    background: transparent;
  }
  h4 {
    margin: 0;
    font-size: 14px;
    letter-spacing: 2px;
  }
  ${Dot}:hover & {
display: flex;
  }
`

const dotNames = [
  { name: 'GOING LIVE', img: 'timer' },
  { name: 'LIVE', img: 'station' },
  { name: 'COMPLETE', img: 'checkmark' },
]
function WeekView({ id, today, items }) {

  const [flipped, setFlipped] = useState(false)

  const Today = format(today, 'EEEE')
  const variants = {
    varientA: { opacity: 1, rotateX: 0 },
    varientB: { opacity: 0, rotateX: 180 },
  }
  const flipVarients = {
    varientA: { opacity: 0, rotateX: 180 },
    varientB: { opacity: 1, rotateX: 0 },
  }


  return (
 
 
        <AnimateSharedLayout>
        
          <ClassList>
            {items.map((item, i) => {
              const today = format(new Date(), 'M/dd')
              const date = format(new Date(item.date), 'M/dd')
              return (
               
                <motion.div
                  key={i}
                  transition={{
                    type: 'spring',
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                  }}
                  className="content"
                  style={{ transform: 'perspective(600px)' }}
                  variants={variants}
                  initial="varientA"
                  animate={flipped === i ? 'varientB' : 'varientA'}
                >
                  <Course isLive={item.status === 'LIVE'} showTodayMarker={date === today ? true : false}>
                    <div className="course-preview">
                      <h1>{format(new Date(item.date), 'EEEE')}</h1>
                      <h2>
                        {format(new Date(item.date), 'MMM dd')} |{' '}
                        {format(new Date(item.date), 'h:mm aa')}
                      </h2>
                    </div>
                    <div className="course-info">
                      <h3>{item.reason && item.reason.name}</h3>
                      <div className="dotbox">
                        {dotNames.map((dot, i) => {
                          const matches = dot.name === item.status 
                          // const updaterStatus = realTimeClassId = item.id
                          return matches ? (
                            <div
                              key={dot.name + 'dot' + item.id}
                              className="actions example-warper"
                            >
                              
                                  <Dot
                                    key={dot.name}
                                    status={item.status}
                                    name={dot.name}
                                    theTitle={dot.name}
                                  >
                                    <img
                                      height="15"
                                      src={`../static/img/${dot.img}.svg`}
                                    />
                                      <Bubble>
                                  <h4>{dot.name}</h4>
                                </Bubble>
                                  </Dot>
                                     
                                
                            
                            </div>
                          ) : (
                            <div
                              key={dot.name + 'dot2' + item.id}
                              className="actions example-warper"
                            >
                              <Dot
                                key={dot.name}
                                status={item.status}
                                name={dot.name}
                              >
                                <img
                                  height="15"
                                  src={`../static/img/${dot.img}.svg`}
                                />
                              </Dot>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div
                      className="flipbox"
                      onClick={() => setFlipped(flipped === i ? false : i)}
                    >
                      <img
                        className="reload"
                        height="15"
                        src="../static/img/reload.svg"
                      />
                    </div>
                  </Course>
                </motion.div>
               
              )
            })}
          </ClassList>
          <ClassList>
            {items.map((item, i) => {
                            const today = format(new Date(), 'M/dd')
                            const date = format(new Date(item.date), 'M/dd')
              return (
                <motion.div
                  variants={flipVarients}
                  initial="varientA"
                  animate={flipped === i ? 'varientB' : 'varientA'}
                  layout
                  transition={{
                    type: 'spring',
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                  }}
                  key={'a' + i}
                  className="content"
                  style={{
                    transform: 'perspective(600px)',
                    position: 'relative',
                  }}
                >
                  <Course isLive={item.status === 'LIVE'}  showTodayMarker={date === today ? true : false} status={item.status}>
                    <div className="course-preview"></div>
                    <div className="course-info"></div>
                    <div
                      className="flipbox"
                      onClick={() => setFlipped(flipped === i ? false : i)}
                    >
                      <img
                        className="reload"
                        height="15"
                        src="../static/img/reload.svg"
                      />
                    </div>
                  </Course>
                </motion.div>
              )
            })}
          </ClassList>{' '}
        </AnimateSharedLayout>

  
  )
}

export default GetItems
