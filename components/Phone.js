import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const MainPhone = styled.div`
  .main-phone {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 185px 137px 40px 1fr;
    background-image: url('../static/img/bg-phone2.png');
    bottom: 0%;
    width: 425px;
    min-height: 570px;
    z-index: 4;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    padding-left: 25px;
    margin: 0 auto;
  }

  .med-text1 {
    grid-row: 2/3;
    height: auto;
    width: 270px;
    z-index: 5;
  }

  .med-text2 {
    margin-left: 255px;
    grid-row: 3/4;
    height: auto;
    width: 110px;

    z-index: 5;
  }
  .med-text3 {
    grid-row: 4/5;
    height: auto;
    width: 270px;

    z-index: 5;
  }
  .typeTitle {
    margin-top: 158px;
    font-size: 12px;
    font-family: 'HelveticaNeue';

    display: flex;
    justify-content: center;
  }
`
const PhoneSlide = posed.div({
  exit: {
    y: '0%',
  },
  enter: {
    y: '0%',
    beforeChildren: true,
    staggerChildren: 500,
  },
})

const Bub1 = posed.img({
  exit: {
    opacity: 0,
    scale: 0.9,
  },
  enter: {
    opacity: 1,
    scale: 0.9,
    transition: { type: 'spring', stiffness: 100 },
  },
})

const Bub2 = posed.img({
  exit: {
    opacity: 0,
    scale: 0.9,
  },
  enter: {
    opacity: 1,
    scale: 0.9,
    transition: { type: 'spring', stiffness: 100 },
  },
})

const Bub3 = posed.img({
  exit: {
    opacity: 0,
    scale: 0.9,
  },
  enter: {
    opacity: 1,
    scale: 0.9,
    transition: { type: 'spring', stiffness: 100 },
  },
})

const Title = posed.p({
  exit: {
    opacity: 0,
    x: -200,
  },
  enter: {
    opacity: 1,
    x: -15,
    transition: {
      x: { type: 'spring', stiffness: 100, damping: 15 },
      default: { duration: 300 },
    },
  },
})

const Phone = ({ text1, text2, confirmation, title }) => {
  return (
    <MainPhone>
      <PhoneSlide initialPose="exit" pose="enter" className="main-phone">
        <Title key="title" id="i4" className="typeTitle">
          {title}
        </Title>
        {/* <Bub1
          key="bub1"
          id="i1"
          className="med-text1"
          src={`../static/img/${text1}.svg`}
        /> */}
        {/* <Bub2
          key="bub2"
          id="i2"
          className="med-text2"
          src={`../static/img/${confirmation}.svg`}
        />
        <Bub3
          key="bub3"
          id="i3"
          className="med-text3"
          src={`../static/img/${text2}.svg`}
        /> */}
      </PhoneSlide>
    </MainPhone>
  )
}

export default Phone
