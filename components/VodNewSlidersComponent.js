import React, {useRef, useEffect} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { ALL_ITEMS_QUERY } from './Items'
import  gql  from 'graphql-tag'
import VanillaTilt from 'vanilla-tilt'
import Loader from './Loader'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import { useQuery } from '@apollo/client'
import Item from './Item'

const SEARCH_BY_TAGS = gql`
  query SEARCH_BY_TAGS($tags: [String]) {
    allVideoOnDemands(
      where: { AND: [{ tags_some: { name_in: $tags } }] }
      first: 15
    ) {
      id
      thumbnailUrl
      name
      isFavorite {
        id
      }
      tags {
        id
        name
      }
    }
  }
`
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
const Tags = styled.div`
  width: 96%;
  position: relative;
  z-index: 2280;
  font-family: 'Comfortaa';
  margin: 0 auto;
 
  display: flex;
  transform: translateY(-30px);
  flex-flow: row wrap;

  span {
    margin: 3px 3px;
    background: transparent;
    color: ${(props) => props.theme.third};
    max-height: 24px;
    border-radius: 2px;
    padding: 2px 5px;
    letter-spacing: 1px;
    line-height: 16px;
    border: 1px solid ${(props) => props.theme.third};
    opacity: 0.8;
  }
  h2 {
    margin: 0;
    border-left: 3px solid #f8b0b0;
    padding-left: 5px;
    padding-bottom: 3px;
    line-height: 22px;
    transform: translateY(-20px);
    display: flex;
    font-size: 22px;
    /* transform: translateY(-30px); */
    color: ${(props) => props.theme.third};
    font-family: 'Bison';
    letter-spacing: 2px;
  }
  .the_date {
    margin-left: 7px;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 16px;

    border-radius: 8px;
    padding: 0 6px;
    line-height: 18px;
    transform: translateY(1px);
  }
  /* span {
    background: ${(props) => props.theme.primary};
  } */
`

const Tite = styled.h1`
  letter-spacing: 2px;
  font-size: 30px;
  color: ${(props) => props.theme.second};
  font-family: 'Bison';
  line-height: 30px;
`

function MenuItem( {videoOnDemand, subscription} ){
   const tiltRef = useRef()

  useEffect(() => {
    const tiltNode = tiltRef.current
    const options = {
    max: 3,
    scale: 1.01,
    speed: 100,
    glare: true,
    transition: true,
    'max-glare': 0.4,
  }
    VanillaTilt.init(tiltNode, options)
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
  
    <>  <div
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)',
      }}
      ref={tiltRef}
    
    >

      <Item subscription={subscription} videoOnDemand={videoOnDemand}></Item>

     
      {/* <p className="the_date">Live on: <span>{format(new Date(videoOnDemand.date), 'MMM dd, yyyy')}</span></p> */}
   
    </div> <Tags>
        {videoOnDemand.tags.map((tag, i) => {
          return <span key={tag.name}>{tag.name}</span>
        })}
      </Tags> </>

 ) } 


function  VodNewSlidersComponent({id, user, nameOfList}) {
  const { data, error, loading } = useQuery(SEARCH_BY_TAGS, {variables: {tags: nameOfList}})
  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>
  if (data.allVideoOnDemands.length === 0)
    return (
      <>
        <Tite style={{ marginTop: '70px', marginLeft: '30px' }}>
        {nameOfList}
        </Tite>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'center'}}>
      <p>
        No videos matched your search at this time, please modify your search
        and try again!
      </p></div>
      </>
    )
  return (
    <>
      <Link
        href={{
          pathname: '/viewallondemands',
          query: { category: nameOfList },
        }}
      >
        <Tite style={{ marginTop: '70px', marginLeft: '30px' }}>
        {nameOfList}
        </Tite>
      </Link>
      <Wrap>
        <div className="mobile-layout">
          <CarouselProvider
            naturalSlideWidth={350}
            naturalSlideHeight={300}
            orientation="horizontal"
            isIntrinsicHeight="yes"
            infinite="yes"
            visibleSlides={1}
            totalSlides={data.allVideoOnDemands.length}
          >
            <ButtonBack>&lsaquo;</ButtonBack> <ButtonNext>&rsaquo;</ButtonNext>
            <Slider>
              {data.allVideoOnDemands &&
                data.allVideoOnDemands.map((item, i) => {
                  // const isInCart = itemsInCart.some(item.id)
                  return (
                    <Slide key={item.id} index={i}>
                      <MenuItem
                        next={i}
                        theIndex={i}
                        videoOnDemand={item}
                        subscription={user ? user.subscription : null}
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
            totalSlides={data.allVideoOnDemands.length}
          >
            <ButtonBack>&lsaquo;</ButtonBack> <ButtonNext>&rsaquo;</ButtonNext>
            <Slider>
              {data.allVideoOnDemands.map((item, i) => {
                return (
                  <Slide key={item.id + 'desktop'} index={i}>
                    <MenuItem
                      next={i}
                      theIndex={i}
                      videoOnDemand={item}
                      subscription={user ? user.subscription : null}
                    />
                  </Slide>
                )
              })}
            </Slider>
          </CarouselProvider>
        </div>
      </Wrap>
    </>
  )
}

export default VodNewSlidersComponent