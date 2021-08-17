import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useQuery } from '@apollo/client'

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import gql from 'graphql-tag'

const TAGS_QUERY = gql`
  query TAGS_QUERY {
    allTags(orderBy: "name") {
      id
      name
      quantity
    }
  }
`
const Wrap = styled.div`
  @media screen and (min-width: 992px) {
    .mobile-layout {
      display: none;

    }
  }

  @media (max-width: 992px) {
    .desktop-layout {
      display: none;
    }
  }

  user-select: none;
  outline: none;
  width: 100%;

  .buttonBack___1mlaL,
  .buttonNext___2mOCa,
  .buttonNext___3Lm3s {
    cursor: pointer;
    border: none;
    outline: none;
    background: rgba(20, 20, 20, 0.3);
    padding: 0;

    transition: 0.2s;
    position: absolute;
    z-index: 9000;
    &:hover {
      opacity: 0.8;
      /* transform: scale(1.04); */
    }
  }
  .buttonBack___1mlaL {
    height: 110px;
    left: 0;

    grid-column: 1;
    grid-row: 1;
  }
  .buttonNext___2mOCa,
  .buttonNext___3Lm3s {
    right: 0;
    grid-column: 1;
    grid-row: 1;
    height: 110px;
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
    display: flex;
    align-items: center;
    width: 98%;
    margin: 5px auto;
    height: 100px;
  }

  .scroll-menu-arrow {
    padding: 15px;
    cursor: pointer;
    font-size: 22px;
    font-family: 'Comfortaa';
    background: ${(props) => props.theme.second};
    height: 100%;
    color: white;
  }
  .scroll-menu-arrow--disabled {
    opacity: 0.3;
    background: rgba(20, 20, 20, 0.6);
  }
`
const MenItem = styled.div`
  /* background: url('${(props) => props.image}') center right no-repeat; */
  /* background-size: cover; */
  display: flex;
  position: relative;
  padding: 0;
  background: ${(props) => props.theme.black};
  color: white;
  cursor: grab;
  width: 100%;
  font-family: 'Bison';
  transition: 0.3s;
  justify-content: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
    cursor: ${(props) => props.theFirst ? 'normal' : 'grab'};
  &:hover {
    background: ${(props) => props.theFirst ? 'black' : '#3b543b'};
    font-family: 'Bison';
    color: white;
  }

  a {
    width: 100%;
    align-self: center;
  }
  .theDiv {
    display: flex;
    text-transform: uppercase;
    text-align: center;
    margin: 0;

    transition: 0.3s;
    z-index: 10000;
    position: relative;
    width: 100%;
    background: transparent;
    justify-content: center;
    align-items: center;
  }
  h3 {
    font-size: 20px;
    margin-bottom: 0;
    line-height: 28px;
    margin: 0;
    background: transparent;
    color: white;
    position: relative;
    transition: 0.3s;
    letter-spacing: 0.175em;
    width: 100%;
    @media(max-width: 768px) {
      font-size: 18px;

    }
  }
  p {
    font-size: 32px;
    margin: 0;

    position: relative;
    align-self: flex-start;
  }
`
const Img = styled.img`
  height: 50px;
  width: 50px;

  z-index: 9999;
  cursor: pointer;
`
const Img2 = styled.img`
  height: 50px;
  width: 50px;

  z-index: 9999;
  cursor: pointer;
`


const MenuItem = ({ id, name, theFirst }) => {
  const cleanName = name.toLowerCase().replace(/\s/g, '')

  return (
    <MenItem
    theFirst={theFirst}
      image={`../static/img/${cleanName}.png`}
      className='menu-item-wrapper'
      id={id}
    >
      {theFirst ?   <div className="theDiv">
            <h3>{name}</h3>
          </div> : <Link href={{ pathname: '/ondemand', query: { id: id, name: name } }}>
        <a>
          <div className="theDiv">
            <h3>{name}</h3>
          </div>
        </a>
      </Link>}

    </MenItem>
  )
}

export function TagSlider(props) {
  const [theTags, setTheTags] = useState(null)
  const { error, loading, data } = useQuery(TAGS_QUERY)

   if (loading) return <p>...loading</p>
  if (error) return <Error error={error} />
   let { allTags } = data
function pushItIn(tags) {
  if(!tags) return
      const obj = {'id': 'titleId', 'name': 'Browse Videos by Content', 'quantity': 1}
    const newArray = tags.slice()
    newArray.unshift(obj)
    setTheTags(newArray)
    console.log(theTags)
}
if (theTags == null) return pushItIn(allTags)
  return (
    <Wrap>
      <div className="mobile-layout">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={75}
          orientation="horizontal"
          isIntrinsicHeight="yes"
          infinite="yes"
          visibleSlides={3}
          totalSlides={theTags.length}
        >
          <Slider>
            {theTags &&
              theTags.map((tag, i) => {
                const theFirst = i === 0 ? 'theFirst' : null
                return (
                  <Slide key={tag.id} index={i}>
                    {' '}
                    <MenuItem
                      next={i}
                      name={tag.name}
                      id={tag.id}
                      key={tag.id}
                      theFirst={theFirst}
                    />
                  </Slide>
                )
              })}
          </Slider>
        </CarouselProvider>
      </div>
      <div className="desktop-layout">
        <CarouselProvider
          naturalSlideWidth={150}
          naturalSlideHeight={125}
          orientation="horizontal"
          isIntrinsicHeight="yes"
          infinite="yes"
          visibleSlides={6}
          totalSlides={theTags.length}
        >
          <ButtonBack>
            <Img src={'../static/img/scrollleft.svg'} />
          </ButtonBack>{' '}
          <ButtonNext>
            <Img2 src={'../static/img/scrollright.svg'} />
          </ButtonNext>
          <Slider>
            {theTags &&
              theTags.map((tag, i) => {
                   const theFirst = i === 0 ? 'theFirst' : null
                return (
                  <Slide key={tag.id} index={i}>
                    <MenuItem theFirst={theFirst} next={i} name={tag.name} id={tag.id} />
                  </Slide>
                )
              })}
          </Slider>
        </CarouselProvider>
      </div>
    </Wrap>
  )
}

export default TagSlider
