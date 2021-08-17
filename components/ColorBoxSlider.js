import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  .m-logo {
    display: flex;
    width: 380px;
    /* max-width: 300px;
    min-width: 100px; */
    height: 7px;
    margin: 0 auto;
    transform: translate(-768px, -155px);
    opacity: 0.4;
    z-index: 700;
    position: absolute;

    @media (max-width: 1400px) {
      width: 258px;
      transform: translate(-540px, -112px);
    }
    @media (max-width: 992px) {
      width: 215px;
      transform: translate(-456px, -100px);
    }
    @media (max-width: 768px) {
      width: 258px;
      transform: translate(-540px, -112px);
    }
  }

  .box {
    opacity: 0;
    animation: wavey 3s ease alternate infinite;
  }
  .box.wave2 {
    animation-delay: 0.1s;
  }
  .box.wave3 {
    animation-delay: 0.3s;
  }
  .box.wave4 {
    animation-delay: 0.5s;
  }
  .box.wave5 {
    animation-delay: 0.7s;
  }
  .box.wave6 {
    animation-delay: 0.9s;
  }
  .box.wave7 {
    animation-delay: 1.1s;
  }

  @keyframes wavey {
    90% {
      opacity: 1.2;
    }
    100% {
      opacity: 0.5;
    }
  }
  .st0 {
    fill: ${(props) => props.theme.fourth};
  }
  .st1 {
    fill: ${(props) => props.theme.fourth};
  }
  .st2 {
    fill: ${(props) => props.theme.fourth};
  }
  .st3 {
    fill: ${(props) => props.theme.fourth};
  }
  .st4 {
    fill: ${(props) => props.theme.fourth};
  }
  .st5 {
    fill: ${(props) => props.theme.fourth};
  }
  .st6 {
    fill: ${(props) => props.theme.fourth};
  }
  .st7 {
    fill: ${(props) => props.theme.fourth};
  }
  .st8 {
    fill: ${(props) => props.theme.fourth};
  }
  .st9 {
    fill: ${(props) => props.theme.fourth};
  }
  .st10 {
    fill: ${(props) => props.theme.fourth};
  }
  .st11 {
    fill: ${(props) => props.theme.fourth};
  }
  .st12 {
    fill: ${(props) => props.theme.fourth};
  }
  .st13 {
    fill: ${(props) => props.theme.fourth};
  }
  .st14 {
    fill: ${(props) => props.theme.fourth};
  }
  .st15 {
    fill: ${(props) => props.theme.fourth};
  }
  .st16 {
    fill: ${(props) => props.theme.fourth};
  }
`
const ColorBox = () => {
  return (
    <Wrap>
      <svg
        className="m-logo"
        shapeRendering="crispEdges"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 10"
      >
        <rect className="box wave1 st0" width="50" height="25" />
        <rect x="50" className="box wave2 st1" width="50" height="25" />
        <rect x="100" className="box wave3 st2" width="50" height="25" />
        <rect x="150" className="box wave4 st3" width="50" height="25" />

        <rect x="200" className="box wave2 st4" width="50" height="25" />
        <rect x="250" className="box wave3 st5" width="50" height="25" />
        <rect x="300" className="box wave4 st6" width="50" height="25" />
        <rect x="350" className="box wave5 st7" width="50" height="25" />

        <rect x="400" className="box wave3 st8" width="50" height="25" />
        <rect x="450" className="box wave4 st9" width="50" height="25" />
        <rect x="500" className="box wave5 st10" width="50" height="25" />
        <rect x="550" className="box wave6 st11" width="50" height="25" />

        <rect x="600" className="box wave4 st12" width="50" height="25" />
        <rect x="650" className="box wave5 st13" width="50" height="25" />
        <rect x="700" className="box wave6 st14" width="50" height="25" />
      </svg>
    </Wrap>
  )
}

export default ColorBox
