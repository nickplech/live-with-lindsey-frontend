import React, {useRef, useEffect} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { ALL_ITEMS_QUERY } from './Items'
import { motion } from 'framer-motion'

import Loader from './Loader'
 
import { useQuery } from '@apollo/client'
 


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

  margin-bottom: 60px;
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
  }
  .buttonBack___1mlaL {
    display: flex;
    transform: translate(0, 110px);
    height: 120px;
    color: white;
    left: 0;
    line-height: 20px;

    align-items: center;
  }
  .buttonNext___2mOCa,
  .buttonNext___3Lm3s {
    display: flex;
    align-items: center;
    right: 0;
    transform: translate(0, 110px);
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
    transition: transform 0.5s;
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
    border-radius: 3px;
    /* background: rgba(245, 245, 245, 0.8); */
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09);
    display: flex;
    align-items: center;
    width: 80%;
    margin: 20px auto 45px;
    height: 300px;
  }
`
const ScrollWrapper = styled.div`
  width: 300px;
  height: 550px;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  padding: 30px 20px 20px;
  box-shadow: 0 6px 20px 0 rgba(202, 208, 216, 0.15);
  display: flex;
  flex-direction: column;
&::-webkit-scrollbar {
  display: none;
  width: 0;
  background: transparent;
  height: 0;
  -webkit-appearance: none;
}
h1 {
  font-size: 1.4em;
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 800;
}

.scroll {
  padding: 20px 20px 40px;
  white-space: nowrap;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.scroll-wrapper {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin-left: -20px;
  margin-right: -20px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}
.scroll-filler {
  width: 100%;
  height: 100%;
  position: absolute;
}
.scroll-inner {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  display: flex;
  align-items: stretch;
}
.scroll-item {
  width: 160px;
  border-radius: 16px;
  background-image: linear-gradient(130deg, #9457e2, #5029bb);
  transform: perspective(400px);
  box-shadow: 0 8px 20px 0 rgba(108, 79, 197, 0.44);
  padding: 20px 30px;
  vertical-align: top;
  color: white;
  text-decoration: none;
  white-space: normal;
  display: flex;
  flex-direction: column;
}
.scroll-item.red {
  background-image: linear-gradient(130deg, #ff8063, #e34040);
  box-shadow: 0 8px 20px 0 rgba(213, 65, 51, 0.45);
}
.scroll-item.bees {
  background-image: linear-gradient(130deg, #ffe561, #ffd24c);
  box-shadow: 0 8px 20px 0 rgba(227, 169, 55, 0.45);
  color: #333;
}
.scroll-item.blue {
  background-image: linear-gradient(130deg, #1cffb7, #0075ff);
  box-shadow: 0 8px 20px 0 rgba(107, 187, 255, 0.45);
}
.scroll-item.ghost {
  background-image: none;
  box-shadow: none;
  border: 1px dashed #eaeaea;
  color: #bdbdbd;
  cursor: default;
}
.scroll-item:not(:last-child) {
  margin-right: 0;
}
.scroll-item h2 {
  font-size: 1.15em;
  font-weight: 600;
  line-height: 1.5;
  margin: 0 0 30px;
}
.scroll-item .scroll-item-date {
  font-size: 0.8em;
  letter-spacing: 0.02em;
  opacity: 0.8;
  display: block;
  margin-top: auto;
}
.scroll-position {
  height: 1px;
  background-color: #f1f1f1;
  flex: 1;
  margin: 0 5px;
}
.scroll-position-wrapper {
  width: 100%;
  margin-top: -10px;
  display: flex;
  align-items: center;
}
.scroll-position-inner {
  height: 1px;
  background-color: #d0d0d0;
}
.scroll-btn {
  display: block;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border: none;
  background: none;
  width: 26px;
  height: 26px;
  background-color: white;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: center;
  background-size: 20px;
  z-index: 9;
  cursor: pointer;
  opacity: 0.6;
  color: rgba(179, 179, 179, 0.7);
  transition-duration: 0.3s;
}
.scroll-btn:hover {
  opacity: 1;
}
.scroll-btn.prev {
  transform: scaleX(-1);
}
.scroll-btn[disabled] {
  opacity: 0;
  pointer-events: none;
}
.info {
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #ececec;
  margin-top: 30px;
  position: relative;
}
`
const Tite = styled.h1`
  letter-spacing: 2px;
  font-size: 30px;
  color: ${(props) => props.theme.second};
  font-family: 'Bison';
  line-height: 30px;
`

// function MenuItem( {videoOnDemand, subscription} ){
//    const tiltRef = useRef()

//   useEffect(() => {
//     const tiltNode = tiltRef.current
//     const options = {
//     max: 3,
//     scale: 1.01,
//     speed: 100,
//     glare: true,
//     transition: true,
//     'max-glare': 0.4,
//   }
//     VanillaTilt.init(tiltNode, options)
//     return () => tiltNode.vanillaTilt.destroy()
//   }, [])

//   return (
  
//     <>  <div
//       style={{
//         transformStyle: 'preserve-3d',
//         transform: 'perspective(1000px)',
//       }}
//       ref={tiltRef}
    
//     >

//       <Item subscription={subscription} videoOnDemand={videoOnDemand}></Item>

     
//       {/* <p className="the_date">Live on: <span>{format(new Date(videoOnDemand.date), 'MMM dd, yyyy')}</span></p> */}
   
//     </div> 

//  ) } 


function  VodListSlider({id, user}) {
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY)
  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>
  if (!data)
    return (
      <p>
        No videos matched your search at this time, please modify your search
        and try again!
      </p>
    )
  return (
    <>
      <Link
        href={{
          pathname: '/viewallondemands',
          query: { category: 'All Live Streams' },
        }}
      >
        <Tite style={{ marginTop: '70px', marginLeft: '30px' }}>
        (Re)live Streams
        </Tite>
      </Link>
      <Wrap>

     

         
            <ScrollWrapper totalSlides={data.allVideoOnDemands.length}
>
<div className="scroll-filler"></div>
<div className="scroll">
    <div className="scroll-inner">
       {data.allVideoOnDemands.map((vod, i) => {
           return(
                  <MenuItem
                  key={item.id + 'desktop'} index={i}
                      next={i}
                      theIndex={i}
                      videoOnDemand={item}
                      subscription={user ? user.subscription : null}
                    >
                <Link
            href={{
              pathname: '/item',
              query: { id: vod.id },
            }}
          >
        <a className="scroll-item">
            <h2>{vod.name}</h2>
            <span className="scroll-item-date">{vod.date}</span>
        </a>
      </Link> 
      </MenuItem>  
           )
       })}

        <div className="scroll-item ghost">
            <h2>Browse Entire Selection</h2>
            <span className="scroll-item-date">let's go!</span>
        </div>
    </div>
</div>
  <ButtonBack>&lsaquo;</ButtonBack> <ButtonNext>&rsaquo;</ButtonNext>
</ScrollWrapper>

 
  
      </Wrap>
    </>
  )
}

export default VodListSlider

