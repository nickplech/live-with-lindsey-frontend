/* eslint-disable react/prop-types */
import Link from 'next/link'
import {format} from 'date-fns'
import React, { useRef} from 'react'
import useDimensions from './useDimensions'
import styled from 'styled-components'
import { motion } from 'framer-motion'


const ItemStyle = styled(motion.article)`
  background: white;

  box-shadow: ${(props) => props.theme.bs};
  position: relative;
  justify-content: center;
  display: grid;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
    0 32px 16px rgba(0, 0, 0, 0.09);
  grid-template-rows: 1fr;
  grid-template-columns: 35px 1fr;
  border-radius: 3px;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  /* min-height: 300px; */
  user-select: none;
  cursor: grab;

  /* background: rgba(245, 245, 245, 0.8); */

  align-items: center;
  width: 95%;
  margin: 20px auto 45px;
  height: 300px;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    grid-column: 1;
    grid-row: 1/2;
    height: 100%;
    position: relative;
    width: 100%;
    background: ${(props) => props.theme.second};
  }
  h1 {
    color: white;
    line-height: 24px;
    font-family: 'Bison';
    width: 300px;
    position: absolute;
    font-size: 18px;
    letter-spacing: 4px;
    transform: rotate(-90deg);
    margin: 0;
    margin-bottom: 75px;
    grid-column: 1;
    grid-row: 1/2;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;

    bottom: 0;
    width: 100%;
    background: #fff;
  }

  .middle {
    display: flex;
    flex-flow: column;
    justify-content: center;
    border-radius: 3px;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: lightslategray;
    position: relative;
    grid-column: 1/3;
    grid-row: 1/2;
    background: url('${(props) => props.background}') no-repeat center center;
    background-size: cover;
  }
  .shade {
 
    user-select: none;
    align-self: flex-end;
    margin: 0;
    position: absolute;
    height: 200px;
    border-radius: 3px;
    padding: 0px 5px;
    width: 100%;
    color: white;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 22px;
    z-index: 100;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%);
    opacity: 0.7;
  }
  .classTitle {
    position: relative;
    transform: translateZ(300px);
    border-radius: 0 0 10px 10px;
    padding-top: 5px;
    width: 100%;
    color: white;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 28px;
    margin-bottom: 0;
    z-index: 3180;
    border: none;
    align-self: flex-end;
    user-select: none;
  }

  button {
    border: none;
    z-index: 99000;
    /* box-shadow: 0 4px 4px -5px rgba(20, 20, 20, 0.2); */
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
h2, h3 {
  margin: 0;
  line-height: 20px;
  padding: 0;
}
 h3{
font-size: 18px;
  }

`
const Play = styled.img`
    height:40px;
    padding: 0px;
    width:40px;
    display: flex;
    z-index: 99000;

    position: relative;
    margin: 0 auto;
    /* opacity: 0.8; */
    background: transparent;
  
    /* background: ${(props) => props.theme.second}; */
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    cursor: pointer;
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    -o-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    ${ItemStyle}:hover & {
opacity: 1;
  }
  
`
const Lock = styled.img`
  display: ${(props) =>
    props.subscription === 'ALLACCESS' ? 'none' : 'block'};
  position: absolute;
  height: 20px;
  width: 20px;
  top: 10px;
  left: 10px;
  z-index: 999999;
  opacity: 0.8;
  transform: translate(0px, 0px);
`
export default function Item({ videoOnDemand, subscription }) {
 
 
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)
 
 
   return(   
   <ItemStyle
      
        custom={height}
        background={videoOnDemand.thumbnailUrl}
        ref={containerRef}
 
      >
        <div className="middle">

          <Link
            href={{
              pathname: '/item',
              query: { id: videoOnDemand.id },
            }}
          >
      
              <Play src="../static/img/playbutt.svg"  style={{ transform: 'translateZ(80px)' }}
              className="image1"
              title="play video"/>
    
          </Link>
        </div>{' '}
        <div className="shade">
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexFlow: 'column',
            position: 'absolute',
            justifyContent: 'flex-end',
            bottom: '10px',
            alignItems: 'flex-start',
          }}
        >
           
          <h3 className="the_date"> <span>{format(new Date(videoOnDemand.date), 'MMM dd, yyyy')}</span>
  </h3>
          <h2 style={{ transform: 'skew(-10deg), translateZ(140px)' }} className="classTitle">
       
            {videoOnDemand.name.toUpperCase()} {' '}    
          
          </h2></div>
        </div>  <Lock
              subscription={subscription}
              src="../static/img/lock2.svg"
              alt="locked out"
            /> 
      </ItemStyle>
     
  
  )
}
