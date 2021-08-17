import styled from 'styled-components'

import ColorBox from './ColorBoxSlider'
const Wrap = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transform: translate(-10%, -70px);
  display: flex;
  height: 100%;
  position: relative;
  justify-content: flex-end;
  align-items: flex-end;
  /* overflow: hidden; */
  background: transparent;
  .livewith {
    position: relative;
    transform: translateY(-100px);

    @media (max-width: 1400px) {
      transform: translateY(-65px);
    }
    @media (max-width: 992px) {
      transform: translateY(-60px);
    }
    @media (max-width: 768px) {
      transform: translateY(-50px);
    }
  }
  span {
    text-transform: uppercase;
    font-size: 115px;
    transition: 0.3s;
    font-family: 'Bison thickoutline';
    /* animation: glow 2s ease-in-out infinite; */
    color: rgba(240, 240, 240, 0.7);
    text-shadow: 0px 0px 10px #6b996b, 1px 1px 2px #6b996b, 0 0 50px #6b996b,
      0 0 100px #6b996b;
    /* animation: glow 3s infinite; */
    /* border-bottom: 2px solid #6b9969; */
    /* color: rgba(240, 240, 240, 0.7);
    text-shadow: 1px 1px 2px #6b996b, 0 0 50px #6b996b, 0 0 100px #6b996b; */

    @media (max-width: 1400px) {
      font-size: 90px;
      transform: translate(0, 275px);
    }
    @media (max-width: 992px) {
      font-size: 75px;
    }
    @media (max-width: 768px) {
      font-size: 60px;
    }
  }

  .miami {
    width: 385px;
    z-index: 701;
    position: relative;

    @media (max-width: 1400px) {
      width: 280px;
    }
    @media (max-width: 992px) {
      width: 240px;
    }
    @media (max-width: 768px) {
      width: 200px;
    }
  }
`

function ThreeDLindsey() {
  return (
    <Wrap>
      <div className="livewith">
        <span>L</span>
        <span>I</span>
        <span>V</span>
        <span>E</span>
        <span> </span>
        <span>W</span>
        <span>I</span>
        <span>T</span>
        <span>H</span>
      </div>
      <img className="miami" src="../static/img/sampleunderlindsey.svg" />
      {/* <div className="under_line" /> */}
      <ColorBox />
    </Wrap>
  )
}

export default ThreeDLindsey
