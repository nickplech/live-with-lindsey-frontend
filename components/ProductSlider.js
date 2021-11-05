import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
 
import AddToCart from './AddToCart'
import { format } from 'date-fns'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'

const Wrap = styled.div`
  @media screen and (min-width: 992px) {
    .mobile-layout {
      display: none;
    }
  }

  @media screen and (max-width: 991px) {
    .desktop-layout {
      display: none;
    }
  }

  user-select: none;
  outline: none;
  width: 100%;

  margin-top: 0px;
  .buttonBack___1mlaL,
  .buttonNext___2mOCa,
  .buttonNext___3Lm3s {
    cursor: pointer;
    border: none;
    outline: none;
    background: rgba(20, 20, 20, 0.3);
    background: ${(props) => props.theme.second};
    font-size: 32px;
    z-index: 9999;
    cursor: pointer;
    transition: 0.2s;
    position: absolute;
    z-index: 9000;
    &:hover {
      opacity: 0.8;
      /* transform: scale(1.04); */
    }
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
  .buttonBack___1mlaL {
    display: flex;
    transform: translate(0, 180px);
    /* height: 110px; */
    color: white;
    left: 0;
    line-height: 20px;
    height: 120px;

    align-items: center;
  }
  .buttonNext___2mOCa,
  .buttonNext___3Lm3s {
    display: flex;
    align-items: center;
    right: 0;
    transform: translate(0, 180px);
    /* height: 110px; */
    color: white;
    line-height: 20px;
    height: 120px;
  }
  .image___xtQGH {
    display: block;
    width: 100%;
    height: 100%;
  }
  .spinner___27VUp {
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    width: 30px;
    height: 30px;
    animation-name: spin___S3UuE;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    border: 4px solid #a9a9a9;
    border-top-color: #000;
    border-radius: 30px;
  }
  @keyframes spin___S3UuE {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
  .container___2O72F {
    position: relative;
    overflow: hidden;
    height: 100%;
    outline: none;
    width: 100%;
  }
  .overlay___IV4qY {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    cursor: zoom-in;
    transition: opacity 0.3s, transform 0.3s;
  }
  .hover___MYy31,
  .loading___1pvNI,
  .zoom___3kqYk {
    opacity: 1;
  }
  .imageLoadingSpinnerContainer___3UIPD {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f4f4f4;
  }
  .slide___3-Nqo {
    position: relative;
    display: block;
    box-sizing: border-box;
    height: 0;
    margin: 0;
    list-style-type: none;
  }
  .slide___3-Nqo:focus {
    outline: none !important;
  }
  .slideHorizontal___1NzNV {
    float: left;
  }
  [dir='rtl'] .slideHorizontal___1NzNV {
    direction: rtl;
    transform: scaleX(-1);
  }
  .slideInner___2mfX9 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    height: 100%;
  }
  .focusRing___1airF {
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    pointer-events: none;
    outline-width: 5px;
    outline-style: solid;
    outline-color: Highlight;
  }
  @media (-webkit-min-device-pixel-ratio: 0) {
    .focusRing___1airF {
      outline: none;
    }
  }
  .horizontalSlider___281Ls {
    position: relative;
    overflow: hidden;
    outline: none;
  }
  [dir='rtl'] .horizontalSlider___281Ls {
    direction: ltr;
    transform: scaleX(-1);
  }
  .horizontalSliderTray___1L-0W {
    overflow: hidden;
    width: 100%;
    outline: none;
  }
  .verticalSlider___34ZFD {
    position: relative;
    overflow: hidden;
    outline: none;
  }
  .verticalSliderTray___267D8 {
    overflow: hidden;
  }
  .verticalTray___12Key {
    float: left;
  }
  .verticalSlideTrayWrap___2nO7o {
    overflow: hidden;
    outline: none;
  }
  .sliderTray___-vHFQ {
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sliderAnimation___300FY {
    transition: transform 0.56s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: transform;
  }
  .masterSpinnerContainer___1Z6hB {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f4f4f4;
  }
  .menu-item-wrapper {
    user-select: none;
    cursor: grab;
    border-radius: 10px;
    /* background: rgba(245, 245, 245, 0.8); */
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09);
    display: flex;
    align-items: center;
    width: 80%;
    margin: 50px auto 50px;
    height: 400px;
    /* margin-bottom: 70px; */
  }
`

const MenItem = styled.div`
  background: url('${(props) => props.image}') center 30% no-repeat;
  background-size: contain;
  display: flex;
  position: relative;
  padding: 0;
  cursor: grab;
  width: 100%;
  border-radius: 10px;
  transition: 0.3s;
  /* &:hover {
    transform: scale(1.03);
  } */
  &:before {
    content: '';
    top: 0;
    right: 0;
    border-radius: 10px;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      330deg,
      rgba(248, 176, 176, 0.6026785714285714) 0%,
      rgba(255, 215, 212, 0.6643032212885154) 43%,
      rgba(255, 255, 255, 0.3757878151260504) 69%,
      rgba(255, 255, 255, 0.3169642857142857) 100%
    );

    position: absolute;
  }
  a {
    width: 100%;
    align-self: flex-end;
  }
 
  
`

const CurrentlyLive = styled.h4`
  color: rgba(220, 20, 20, 0.8);
  font-size: 18px;
  font-family: 'Bison';
  letter-spacing: 2px;
  margin: 0;
  position: absolute;
  transform: translate(5px, 70px);
  .circle {
    background-color: rgba(255, 82, 82, 1);
    border-radius: 50%;
    animation: pulse-red 2s infinite;
    height: 15px;
    margin-left: 6px;
    margin-bottom: -1px;
    width: 15px;
    display: inline-flex;
  }
  .div {
    font-size: 16px;
    display: inline-flex;
  }
  @keyframes pulse-red {
    0% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    100% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }
`
const TotalClasses = styled.div`
  font-family: 'Comfortaa';
  font-size: 16px;
  position: absolute;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: rgba(20, 20, 20, 0.6);
  transform: translateY(29px);
  margin: 0 auto;
  flex-flow: row nowrap;
  display: flex;
  width: 450px;
`

const DateBlock = styled.a`
  display: flex;
  flex-flow: column;
 position: absolute;
  font-family: 'Bison';
  z-index: 7000;
  letter-spacing: 3px;      
  transform: translateY(-45px) rotate(-5deg) skew(-10deg);
  margin: 15px auto 0;
 justify-content: center;
 align-items: center;
 opacity: .9;
 cursor: pointer;
 transition: .3s;
 &:hover {
   opacity: 1;
 }
  .day {
    text-align: center;
    justify-content: center;
    background: ${(props) => props.theme.second};
    margin: 0 auto 5px;  
  
    font-size: 28px;
    line-height: 28px;
    position: relative;
    color: white;
    padding:  5px;  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.04),
      0 32px 16px rgba(0, 0, 0, 0.04);
  }
      .title {
      font-family: 'Bison';
      letter-spacing: 2px;
      font-size: 46px;
      margin: 0px auto 8px;
      box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.04),
      0 32px 16px rgba(0, 0, 0, 0.04);
    padding: 0 5px;  
    position: relative;
      line-height: 46px;
      color: white;
      text-align: center;
      background: ${(props) => props.theme.second};
    }
     
  .clock {
    width: 22px;
    vertical-align: middle;


  }
  .clocktime {
  

    vertical-align: middle;
    
  }
 
`
const MenuItem = ({
  id,
  active,
 item,
  theIndex,
  classLength,

}) => {
 
  const cleanName = item.reason.name && item.reason.name.toLowerCase().replace(/\s/g, '')
  const currentlyLive = active === id
  console.log(currentlyLive)
  console.log(active)
 

  return (
    <>
      <MenItem
        image={`../static/img/classbackgrounds/smallfinal/${cleanName}.png`}
        className="menu-item-wrapper"
      >
        <AddToCart
        item={item}
       
          theIndex={theIndex}
 
          id={id}
        />
        <Link href={{ pathname: '/class', query: { id: id } }}>
         
            <DateBlock> 
              <h1 className="title">{item.reason.name}</h1>
              <p className="day">{format(new Date(item.date), 'eeee MMM dd | h:mm aa ')}</p>
                    
               {/* <svg className="clock" viewBox="0 0 24 24">
                  <path style={{fill: 'white'}} d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>{' '}
                <span className="clocktime">{classLength}</span>*/}
              
          
              </DateBlock>
        </Link>
      </MenItem>
    </>
  )
}
 
export function ProductSlider({ allItems, active }) {   

  return (
    <Wrap>
      <div className="mobile-layout">
        <CarouselProvider
          naturalSlideWidth={350}
          naturalSlideHeight={300}
          orientation="horizontal"
          isIntrinsicHeight="yes"
          infinite="yes"
          visibleSlides={1}
          totalSlides={allItems.length}
        >
          <ButtonBack disabled={allItems.length <= 1}>&lsaquo;</ButtonBack> <ButtonNext disabled={allItems.length <= 1}>&rsaquo;</ButtonNext>
          <Slider>
            {allItems &&
              allItems.map((item, i) => {
            
               
                return (
                  <Slide key={item.id} index={i}>
                    <MenuItem
                      next={i}
                     
                     item={item}
                      id={item.id}
                      theIndex={i}
                    
                      active={active}
                  
               
                      classLength={item.reason && item.reason.classLength}
                    />
                  </Slide>
                )
              })}
          </Slider>
        </CarouselProvider>
      </div>
      <div className="desktop-layout">
        <CarouselProvider
          naturalSlideWidth={350}
          naturalSlideHeight={300}
          orientation="horizontal"
          isIntrinsicHeight="yes"
          infinite="yes"
          visibleSlides={3}
          totalSlides={allItems.length}
        >
          <ButtonBack disabled={allItems.length === 3}>&lsaquo;</ButtonBack>{' '}
          <ButtonNext disabled={allItems.length === 3}>&rsaquo;</ButtonNext>
          <Slider>
            {allItems.map((item, i) => {
           
          
     
         
     
              return (
                <Slide key={item.id + 'desktop'} index={i}>
                  <MenuItem
                    active={active}
                    next={i}
        
                  
                    id={item.id}
                    theIndex={i}
                    item={item}
                    classLength={item.reason && item.reason.classLength}
                    
            
                    active={active}
                  />
                </Slide>
              )
            })}
          </Slider>
        </CarouselProvider>
      </div>
    </Wrap>
  )
}

export default  ProductSlider 
