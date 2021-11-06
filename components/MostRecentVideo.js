import React, { useRef, useState, useEffect } from 'react'
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
const Wrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 80px auto 0 auto;
  
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 0px;
  font-family: 'Bison';

  @media (min-width: 768px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr;
    margin-bottom: 155px;
  }
  .left {
    width: 95%;
    grid-row: 2;
    grid-column: 1;
    margin: 0 auto;text-align: right;
    letter-spacing: 0px;
    @media (min-width: 768px) {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .right {
    width: 95%;
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
    border-right: 4px solid ${(props) => props.theme.second};
    padding: 0;
    z-index: 80000;
    position: relative;
    line-height: 34px;
    padding-right: 5px;
  }
  img {
    display: inline-flex;
    transform: translate(0px, 3.5px);
 
  }
  h3 {
    font-size: 18px;
    display: inline-flex;
    margin: 0 5px;
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

const TheItem = styled.div`
  height: 320px;
  width: 100%;
 
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  margin: 0 auto;
  transition: 0.2s;
  position: relative;
  z-index: 1000;
  border: none;
  user-select: none;
  /* box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
    0 32px 16px rgba(0, 0, 0, 0.03); */
  background: ${(props) => props.theme.primary};
  background: url(${(props) => props.thumbnailUrl}) no-repeat ;
  box-shadow: 0px 50px 70px rgba(0,0,0,0.3),
              0px 10px 10px rgba(0,0,0,0.1);
    background-position: bottom;
  background-size: cover;
      transform: perspective(1000px)
    rotateX(8deg)
    rotateY(-16deg)
    rotateZ(4deg)
    skew(2deg);
 
 &:before {
  content:"";
  width:inherit;
  height: 42%;
  position: absolute;
  bottom: -42%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.4),white);
  z-index: 1;  cursor: default;
}
  &:after {
    content:"";
  background-image: inherit;
  width:inherit;
  height:40%;
  background-position: bottom;
  background-size: cover;
  position: absolute;  opacity: 0.5;
  bottom:-41%;
  transform: scaleY(-1) ;
}
  /* &:after {
    content: '';
 
    position: absolute;
    margin: 0;
    z-index: 9999;
    height: 100%;
    border-radius: 0 0 15px 15px;
    padding: 5px 15px;
    opacity: 0.5;
    width: 100%;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%);
    
  } */
  @media (min-width: 992px) {
    height: 320px;
    width: 100%;
  }
  @media (min-width: 1100px) {
    height: 320px;
    width: 100%;
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
    transform: translate(20px, -20px);
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
const Img = styled.img`
position: absolute;
right:100px;
margin-top: 30px;
z-index:9999;
`
const ParallaxImage = ({ src, ...style }) => {
  const [elementTop, setElementTop] = useState(0)
  const ref = useRef(null)
  const { scrollY } = useViewportScroll()

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, -1], {
    clamp: false,
  })

  useEffect(() => {
    const element = ref.current
    setElementTop(element.offsetTop)
  }, [ref])

  return (
    <div ref={ref} className="image-container">
 
      <motion.div style={{ ...style, y }}>hey</motion.div >
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

          <img  className="ribbon" src="../static/img/mostrecent2.svg" />
        </TheItem>{' '}
        <ParallaxImage/>
        
      </div>
      <div className="left">

        <h2>{mostRecentVod.name}</h2>
       
       <p>{mostRecentVod.description}</p>
       <span><img src="../static/img/calendar.svg" height="20" width="20" alt="calendar graphic to represent date which video first aired live" />  <h3>aired on: {format(new Date(mostRecentVod.date), 'MMM dd, yyyy')}</h3></span>
      
       <span><img style={{   marginLeft: '15px' }} src="../static/img/clock.svg" height="20" width="20" alt="class length icon" />  <h3>60 mins</h3></span>

      </div>
    </Wrap>
  )
}

export default MostRecentVideo
{/* <div className="canvas-wrapper">
	<a href="#" className="canvas">
		<div className="canvas_border">
			<svg>
				<defs><linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgb(253,137,68);stop-opacity:1"></stop><stop offset="100%" style="stop-color:rgb(153,75,23);stop-opacity:1"></stop></linearGradient><linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#D34F48"></stop><stop offset="100%" stop-color="#772522"></stop></linearGradient></defs>
				<rect id="rect-grad" className="rect-gradient" fill="none" stroke="url(#grad-orange)" stroke-linecap="square" stroke-width="4" stroke-miterlimit="30" width="100%" height="100%"></rect>
			</svg>
		</div>
		<div className="canvas_img-wrapper">
			<img className="canvas_img" src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Large.png" alt="">
		</div>
		<div className="canvas_copy canvas_copy--left">
			<span className="canvas_copy_subtitle">Heading</span>
			<strong className="canvas_copy_title">Hello</strong>
			<strong className="canvas_copy_title">World</strong>
			<span className="canvas_copy_details">Details and stuff</span>
		</div>
	</a>
	 
</div> */}