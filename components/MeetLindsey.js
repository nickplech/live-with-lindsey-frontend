import React, { useState } from 'react'
import styled from 'styled-components'
import MeetLindseyModal from './MeetLindseyModal'
const Wrap = styled.div`
  /* @media screen and (min-width: 992px) {
    .mobile-layout {
      display: none;
    }
  }

  @media screen and (max-width: 991px) {
    .desktop-layout {
      display: none;
    }
  } */

  user-select: none;
  outline: none;
  width: 100%;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  transition: 0.3s;
  grid-template-rows: ${(props) => (props.expand ? '600px' : '365px')};
  width: 90%;
  border-radius: 15px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.second};

  background-size: cover;
  .right {
    grid-column: 2;
    display: flex;
    justify-content: center;
  }

  .about-title {
    position: absolute;
    letter-spacing: 3px;
    transform: translateY(-63px);
    font-family: 'Bison';
    color: ${(props) => props.theme.second};
    margin: 0 20px;
    font-size: 46px;
  }
  .linz {
    height: 510px;
    width: auto;
  /* shape-image-threshold: .2; */
    position: relative;

    transform: translateY(-144px);
  }
`
const Left = styled.div`
  grid-column: 1;
  display: block;
  grid-row: 1;
  margin: 0 auto;
  padding: 40px 55px 0 55px;

  font-family: 'Bison';
  letter-spacing: 2px;
  line-height: 34px;
  font-size: 22px;
  color: white;

  position: relative;
  p {
    position: absolute;
  }
  /* span {
  color: white;
} */
  .hl {
    color: ${(props) => props.theme.second};
    font-size: 22px;
  }
  h5 {
    color: white;
    cursor: pointer;
  }
`

const meetLindseySlides = [
  'My deep rooted love for sports and fitness began with 13+ years of competitive swimming. A desire to further expand my knowledge of strength training and nutrition lead me to compete in IFBB (International Federation of Bodybuilding and Fitness) bikini figure competitions.',
  'After several years I realized the havok these extreme diets and fitness approaches were having on my body and my mind, and decided to pivot towards finding a more sustainable and balanced lifestyle. I went on to discover my passion for group fitness, and sharing my knowledge and love for movement with others.',
  'The journey to where I am today did not come without its trials, I experienced many highs and lows: body image dysmorphia, toxic relationships with food and fitness, and low self esteem and confidence. All of these experiences eventually grew into motivation to find a positive, healthy balance. Today I strive to share my knowledge and experiences to help women become the healthiest versions of themselves.',
]
function MeetLindsey(props) {
  return (
    <Wrap>
      <Grid>
        <h1 className="about-title">Meet Your Trainer</h1>
        <Left>
          Hey babe! For starters, I am so happy you are here. Hey, hi, hello,
          I'm Lindsey, your new virtual fitness coach.
          <br /> <br />
          When you join Live with Lindsey, we will unlock the confidence and
          strength already within you, transform your perspective towards
          fitness to one of celebration&mdash;not punishment. My goal is to
          inspire you to know anything is possible and guide you, all while
          having the literal BEST time.
          <MeetLindseyModal />
        </Left>
        <div className="right">
          <img
            src="../static/img/meetlindsey4.png"
            className="linz"
            alt="picture of lindsey harrod + getting to know your trainer"
          />{' '}
        </div>
      </Grid>
    </Wrap>
  )
}

export default MeetLindsey
