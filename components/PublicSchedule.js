import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import DaySelector from './DaySelector'
import gql from 'graphql-tag'
import { format, startOfWeek, addDays } from 'date-fns'
import { useQuery } from '@apollo/client'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'

const STREAMS_QUERY = gql`
  query STREAMS_QUERY($date: String) {
    allItems(where: { date_gte: $date }, orderBy: "date") {
      id
      price
      date
      reason {
        id
        name
        classLength
        classDescription
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
  background: rgba(240, 240, 240, 0.8);
  user-select: none;
  outline: none;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 0px;
  border-top: 10px solid #f7b0b0;
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
    transform: translate(0, 190px);
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
    transform: translate(0, 190px);
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
  .theDiv {
    display: flex;
    text-transform: uppercase;
    text-align: left;
    margin: 0;
    margin-bottom: 40px;
    color: ${(props) => props.theme.fourth};
    transition: 0.3s;
    z-index: 10000;
    position: relative;
    flex-flow: column;
    background: rgba(255, 255, 255, 0.75);
    width: 100%;
    align-items: flex-start;
    padding: 15px 10px 0;
    font-family: 'Bison thickoutline';

    &:hover {
      background: rgba(255, 255, 255, 0.95);
    }
  }
  h1 {
    font-size: 36px;
    margin: 0;
    line-height: 36px;
    position: relative;
    width: 100%;
    padding: 0px 0px;
    font-family: 'Bison thickoutline';
  }
  p {
    color: ${(props) => props.theme.third};
    font-size: 24px;
    margin: 0;
    margin-left: 3px;
    margin-top: 7px;
    padding: 0px 1px;

    position: relative;
    font-family: 'Bison';
    opacity: 0.5;
    align-self: flex-start;
    line-height: 20px;
  }
  .card__clock {
    width: 25px;
    vertical-align: middle;
    fill: #ad7d52;
  }
  .card__time {
    font-size: 25px;
    color: #ad7d52;
    vertical-align: middle;
    margin-left: 5px;
  }

  .card__clock-info {
    float: right;
    align-self: flex-end;
    line-height: 25px;
    margin-bottom: 5px;
  }
`

const Div = styled.div`
  width: 100%;
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;
  align-items: center;
  font-family: 'Bison';
  padding-top: 30px;
  .para {
    color: slategray;
    margin: 5px auto;
    text-align: center;
    justify-self: center;
    position: relative;
    display: flex;
    max-width: 500px;
    line-height: 26px;
    font-size: 32px;
    color: ${(props) => props.theme.second};
    letter-spacing: 4px;
    &:nth-of-type(2) {
      max-width: 400px;
      font-size: 18px;
      color: slategray;
      letter-spacing: 3px;
    }
  }
`

const MenuItem = ({ id, name, date, classLength }) => {
  const cleanName = name.toLowerCase().replace(/\s/g, '')
 
  return (
    <MenItem
      image={`../static/img/classbackgrounds/smallfinal/${cleanName}.png`}
      className="menu-item-wrapper"
    >
      <Link href={{ pathname: '/class/[id]', query: { id: id } }}>
        <a>
          <div className="theDiv">
            <h1>{name}</h1>
            <p>{format(new Date(date), 'eeee - MMM dd | h:mm aa')}</p>
            <div className="card__clock-info">
              <svg className="card__clock" viewBox="0 0 24 24">
                <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
              </svg>{' '}
              <span className="card__time">{classLength}</span>
            </div>
          </div>
        </a>
      </Link>
    </MenItem>
  )
}

export function ProductSlider() {
  const weekStart = startOfWeek(new Date(), {weekStartsOn: 1})
  const [isSelected, setIsSelected] = useState(
    format(weekStart, 'yyyy-MM-dd'),
  )
 

  const { error, loading, data } = useQuery(STREAMS_QUERY, {
    variables: { date: isSelected ? isSelected : weekStart },
  })
  const addTheDays = (day) => {
    setIsSelected(day)
  }

  if (loading) return <Div></Div>
  if (error) return <Error error={error} />

  return (
    <Wrap>
      {/* <Line/> */}
      <div className="mobile-layout">
        <CarouselProvider
          naturalSlideWidth={350}
          naturalSlideHeight={300}
          orientation="horizontal"
          isIntrinsicHeight="yes"
          infinite="yes"
          visibleSlides={1}
          totalSlides={data.allItems.length}
        >
          {data.allItems.length > 0 ? (
            <>
              <ButtonBack disabled={data.allItems.length < 2}>
                &lsaquo;
              </ButtonBack>
              <ButtonNext disabled={data.allItems.length < 2}>
                &rsaquo;
              </ButtonNext>
              <Slider>
                {data.allItems.map((item, i) => {
                  return (
                    <Slide key={item.id} index={i}>
                      <MenuItem
                        next={i}
                        name={item.reason.name}
                        id={item.id}
                        theIndex={i}
                        date={item.date}
                        classLength={item.reason.classLength}
                        time={item.date}
                      />
                    </Slide>
                  )
                })}
              </Slider>
            </>
          ) : (
            <Div>
              <p className="para">That's it for this week!</p>
              <p className="para">
                Please Check back Sunday for the Upcoming Live Schedule
              </p>
              <img height="60" src="../static/img/heartsig.svg" />
            </Div>
          )}
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
          totalSlides={data.allItems && data.allItems.length}
        >
          {data.allItems && data.allItems.length > 0 ? (
            <>
              <ButtonBack disabled={data.allItems.length < 4}>
                &lsaquo;
              </ButtonBack>
              <ButtonNext disabled={data.allItems.length < 4}>
                &rsaquo;
              </ButtonNext>
              <Slider>
                {data.allItems.map((item, i) => {
                  return (
                    <Slide key={item.id} index={i}>
                      <MenuItem
                        next={i}
                        name={item.reason.name}
                        id={item.id}
                        theIndex={i}
                        date={item.date}
                        classLength={item.reason.classLength}
                        time={item.date}
                      />
                    </Slide>
                  )
                })}
              </Slider>
            </>
          ) : (
            <Div>
              <p className="para">That's it for this week!</p>
              <p className="para">
                Please Check back Sunday for the Upcoming Live Schedule
              </p>
              <img height="60" src="../static/img/heartsig.svg" />
            </Div>
          )}
        </CarouselProvider>
      </div>
      <DaySelector isSelected={isSelected} addTheDays={addTheDays} />
    </Wrap>
  )
}

export default ProductSlider
