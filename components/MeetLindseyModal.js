import React from 'react'
import Popup from 'reactjs-popup'
import Emoji from './Emoji'
import styled from 'styled-components'

const Background = styled.div`
  background: rgba(240, 240, 240, 0.6);
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 89000;
`
const Wrap = styled.div`
  display: flex;
  position: relative; text-align: right;
  .buttonio {
    width: 300px;
    cursor: pointer;
    margin-top: 20px;
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-template-rows: 40px;
    &:nth-child(1) {
      grid-column: 1;
      grid-row: 1;
    }
    &:nth-child(2) {
      grid-column: 2;
      grid-row: 1;
    }
  }
 
`
const Mode = styled.div`
  box-shadow: 0px 10px 5px -3px rgba(20, 20, 20, 0.2);
  z-index: 90000;
  position: relative;
  font-size: 16px;
  display: flex;
  flex-flow: column;
  
  height: 80vh;
  padding: 30px;
  overflow-y: scroll;
  margin: 0 auto;
  overscroll-behavior: contain;
  margin-top: 50px;
  width: 90%;

  font-family: 'Bison';
  letter-spacing: 2px;
  color: white;
  background: ${(props) => props.theme.second};
  border-radius: 15px;
  .content {
    width: 100%;
    padding: 10px 5px;

    position: relative;
  }
  h1 {
    margin: 20px 0px 0 0;
    letter-spacing: 3px;
    font-size: 25px;
  }
  .close {
    cursor: pointer;
    position: fixed;
    z-index: 999999;
    display: block;
    outline: none;
    padding: 2px 5px;
    border: none;
    line-height: 20px;
    right: 10px;
    top: 10px;
    font-size: 24px;
    background: #f8b0b0;
    border-radius: 50%;
  }
`

function ModalPicture({ image }) {
  return (
    <Wrap>
      <Popup
        trigger={
          <div className="buttonio">
           <Emoji symbol="👉" label="backhand index pointing right" /> <span>Click To Read More...</span>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <Background>
            <Background />
            <Mode>
              <button className="close" onClick={close}>
                &times;
              </button>
              <h1><Emoji symbol="👋" label="waving hand sign"/> Meet Your Trainer </h1>
              <div className="content">
                I'm Lindsey, your new virtual fitness coach. I have been an
                athlete my entire life, I was a competitive swimmer for 13+
                years, so my love for sports and fitness is deep rooted. After
                high school I decided to start competing in IFBB (International
                Federation of Bodybuilding and Fitness) bikini figure
                competitions.
                <br />
                <br /> Here is where I really began to dive deep into expanding
                my knowledge of strength training and nutrition. After several
                years I realized the havok these extreme diets and fitness
                approaches were having on my body and my mind, and decided to
                pivot towards finding a more sustainable and balanced lifestyle.
                I went on to discover my passion for group fitness, and sharing
                my knowledge and love for movement with others. The journey to
                where I am today did not come without its trials, I experienced
                many highs and lows, body image dysmorphia, toxic relationships
                with food and fitness, and low self esteem and confidence. All
                of this only fueling my desire to find balance even further.
                <br /> <br />
                Today, I am my happiest, healthiest, strongest, truest self. My
                life is dedicated to helping women become the healthiest
                versions of themselves, unlock the confidence and strength they
                already have within them, change their perspective towards
                fitness to one of celebration, not punishment, inspire them to
                know anything is possible, and guide them along the way, all
                while having the literal BEST time.{' '}
                <h1><Emoji symbol="✨" label="Sparkles
" /> ABOUT LIVE WITH LINDSEY<Emoji symbol="✨" label="Sparkles
" /> </h1>
                So, what can you expect out of these classes? My approach to
                training and fitness in general is first and foremost, FUN! I'm
                here to help you reach your goals, with the biggest smile on
                your face. Get ready for high energy, positive vibes, loads of
                encouragement, and classes that leave you sweaty, smiling, and
                feeling strong AF. Secondly, my approach is science backed and
                based. With over 5 different types of fitness certifications,
                ranging from pilates, to strength, to HIIT, I am able to offer a
                wide range of class types, catering to all fitness levels and
                needs. There is room for everyone here. And lastly, informative!
                <br />
                <br />I truly aim to offer the most unique online fitness
                experience in that I educate you on how to move with proper
                form, connect to your mind and your body, and help you get the
                most out of every single workout, mentally and physically.
              </div>
            </Mode>
          </Background>
        )}
      </Popup>
    </Wrap>
  )
}

export default ModalPicture
