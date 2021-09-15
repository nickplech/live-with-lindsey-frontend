import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import gql from 'graphql-tag'
import {format} from 'date-fns'
import { useQuery } from '@apollo/client'
import Loader from './Loader'
import { motion, useViewportScroll, useTransform } from 'framer-motion'
 
const MOST_RECENT_VIDEO_QUERY = gql`
  query MOST_RECENT_VIDEO_QUERY {
    allVideoOnDemands(orderBy: "createdAt_DESC") {
      id
      url
      date
      thumbnailUrl
      item {
        id
        stillAvailable
      }
      name
      description
    }
  }
`

const TheItem = styled.div`
  height: 320px;
  width: 90%;
  transform: rotate(-3deg);
  border-radius: 2px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  margin: 0 auto;
  transition: 0.2s;
  position: relative;
  z-index: 1000;
 
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
    0 32px 16px rgba(0, 0, 0, 0.03);
  background: ${(props) => props.theme.primary};
  
  &:before {
    position: absolute;
    height: 320px;
    width: 100%;
    content: '';
    grid-column: 1;
    border-radius: 2px;
    opacity: 1;
    margin: 0 auto;
    z-index: 40;
    box-shadow: 0 8px 6px -5px rgba(0, 0, 0, 0.2);
    transform: rotate(3.5deg);
    background: url(${(props) => props.thumbnailUrl}) no-repeat center center;
    background-size: cover;
    @media (min-width: 1100px) {
      width: 100%;
    }
  }
  &:after {
    content: '';
    transform: rotate(3.5deg) translate(0px, 0px);
    position: absolute;
    margin: 0;
    z-index: 9999;
    height: 100%;
    border-radius: 0 0 5px 5px;
    padding: 5px 15px;
    opacity: 0.5;
    width: 100%;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%);
  }
  @media (min-width: 992px) {
    height: 320px;
    width: 90%;
  }
  @media (min-width: 1100px) {
    height: 320px;
    width: 90%;
  }
  h3 {
    color: white;
    font-family: 'Bison';
    user-select: none;
    letter-spacing: 2px;
    border-radius: 10px;
    margin: 0;
    font-size: 32px;
    padding: 5px 15px;
    width: 100%;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%);
  }

  .ribbon {
    width: 210px;
    height: auto;
    z-index: 999999;
    transform: translate(0px, -20px);
    position: absolute;
  left: 0;
  }

 
  button {
    border: none;
    justify-self: center;
    /* transform: translateZ(40px); */
  }
 

`
const Play = styled.img`
  height: 60px;
    padding: 0px;
    width: 100px;
    display: flex;
    z-index: 71000;
    justify-self: center;
    text-align: center;
    position: relative;
    margin: 0 auto;
    /* opacity: 0.8; */
    background: transparent;

    align-self: center;

    opacity: 0;
    cursor: pointer;
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    -o-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    &:hover {
      opacity: 1;
    }
    ${TheItem}:hover & {
opacity: 1;
  }
`
const Wrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 30px auto 0 auto;
  transform: translateY(50px);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 0px;
  font-family: 'Bison';

  @media (min-width: 768px) {
    grid-template-columns: 55% 45%;
    grid-template-rows: 1fr;
    margin-bottom: 155px;
  }
  .left {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    justify-content: center;
    @media (min-width: 768px) {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .right {
    width: 90%;
    grid-row: 2;
    grid-column: 1;
    margin: 0 auto;
    letter-spacing: 0px;
    @media (min-width: 768px) {
      grid-column: 2;
      grid-row: 1;
    }
  }
  h2 {
    margin: 30px auto;
    margin-top: 60px;
    font-size: 32px;
    border-left: 4px solid ${(props) => props.theme.second};
    padding: 0;
    z-index: 80000;
    position: relative;
    line-height: 34px;
    padding-left: 5px;
  }
  img {
    display: inline-flex;
    transform: translate(0px, 3.5px);
  }
  h3 {
    font-size: 18px;
    display: inline-flex;
    margin: 0 15px;
  }
  p {
    margin: 0;
    z-index: 80000;
    font-size: 16px;
    position: relative;
    letter-spacing: 2px;
    color: slategrey;
    line-height: 26px;
    margin-bottom: 10px;
  }
`

const ParallaxImage = ({ src, ...style }) => {
  const [elementTop, setElementTop] = useState(0)
  const ref = useRef(null)
  const { scrollY } = useViewportScroll()

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, -1], {
    clamp: false,
  })

  useLayoutEffect(() => {
    const element = ref.current
    setElementTop(element.offsetTop)
  }, [ref])

  return (
    <div ref={ref} className="image-container">
      <motion.div className="overlay" style={{ ...style, y }} />
      <img src={src} alt="" />
    </div>
  )
}

function MostRecentVideo(props) {
  const [isOpen, toggleOpen] = useState(false)

 
  const { data, error, loading } = useQuery(MOST_RECENT_VIDEO_QUERY)
  if (loading) return <Loader />
  if (!data) return null
  const [mostRecentVod] = data.allVideoOnDemands
  console.log(mostRecentVod)
  return (
    <Wrap>
      <div className="right">
        <h2>{mostRecentVod.name}</h2>
       
        <p>{mostRecentVod.description}</p>
        <span><img src="../static/img/calendar.svg" height="20" width="20" alt="calendar graphic to represent date which video first aired live" />  <h3>aired on: {format(new Date(mostRecentVod.date), 'MMM dd, yyyy')}</h3></span>
       
        <span><img src="../static/img/clock.svg" height="20" width="20" alt="class length icon" />  <h3>60 mins</h3></span>
 
      </div>
      <div className="left">
        <TheItem
          isOpen={isOpen}
          thumbnailUrl={mostRecentVod.thumbnailUrl}
          videoOnDemand={mostRecentVod}    
        >
          <Link
            href={{
              pathname: '/item',
              query: { id: mostRecentVod.id },
            }}
          >
           
              <Play src="../static/img/playme.svg"  className="image1"
              title="play video"
            />
       
          </Link>

          <img className="ribbon" src="../static/img/mostrecent2.svg" />
        </TheItem>{' '}
        <ParallaxImage />
      </div>
    </Wrap>
  )
}

export default MostRecentVideo
