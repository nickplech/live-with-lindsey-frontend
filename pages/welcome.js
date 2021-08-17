import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Submitted = styled.p``
const Wrap = styled.div`
  color: white;
  text-align: center;
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 150px;
  align-items: center;
  overflow-x: hidden;
  padding: 75px 15px;
  h1 {
    z-index: 1000;
    text-align: center;
    font-family: 'Bison';
    letter-spacing: 3px;
    position: absolute;
    font-size: 38px;
    line-height: 36px;
    margin: 0 auto;
    @media (max-width: 992px) {
      font-size: 28px;
    }
    @media (max-width: 768px) {
      font-size: 22px;
    }
  }
  .m-logo {
    display: block;
    width: 1600px;
    /* max-width: 300px;
    min-width: 100px; */
    height: 150px;
    margin: 0 auto;
    position: absolute;
  }
  a {
    color: ${(props) => props.theme.third};
    padding-bottom: 3px;
    border-bottom: 3px solid white;
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
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
  .st0 {
    fill: ${(props) => props.theme.second};
  }
  .st1 {
    fill: ${(props) => props.theme.second};
  }
  .st2 {
    fill: ${(props) => props.theme.second};
  }
  .st3 {
    fill: ${(props) => props.theme.second};
  }
  .st4 {
    fill: ${(props) => props.theme.second};
  }
  .st5 {
    fill: ${(props) => props.theme.second};
  }
  .st6 {
    fill: ${(props) => props.theme.second};
  }
  .st7 {
    fill: ${(props) => props.theme.second};
  }
  .st8 {
    fill: ${(props) => props.theme.second};
  }
  .st9 {
    fill: ${(props) => props.theme.second};
  }
  .st10 {
    fill: ${(props) => props.theme.second};
  }
  .st11 {
    fill: ${(props) => props.theme.second};
  }
  .st12 {
    fill: ${(props) => props.theme.second};
  }
  .st13 {
    fill: ${(props) => props.theme.second};
  }
  .st14 {
    fill: ${(props) => props.theme.second};
  }
  .st15 {
    fill: ${(props) => props.theme.second};
  }
  .st16 {
    fill: ${(props) => props.theme.second};
  }
`
const EmptyFoo = styled.div`
  background-color: white;
  height: calc(100% - 60px);
  width: 100%;

  justify-content: center;
  align-items: center;
  margin: 0;

  z-index: 1000;

  img {
    margin-top: 10px;
  }
`
const Div = styled.div`
  width: 100%;
  height: 350px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-family: 'Bison';

  transform: translateY(30px);
`
const P = styled.p`
  color: slategray;
  margin: 0px auto;
  text-align: center;
  margin-bottom: 8px;
  width: 90%;

  line-height: 26px;
  font-size: 28px;
  color: ${(props) => props.theme.second};
  letter-spacing: 5px;
  @media (max-width: 662px) {
    font-size: 22px;
  }
  &:nth-of-type(2) {
    width: 90%;
    max-width: 500px;
    font-size: 18px;
    color: slategray;
    cursor: pointer;
    letter-spacing: 3px;
    @media (max-width: 662px) {
      font-size: 14px;
    }
  }
`
const Welcome = () => {
  return (
    <Wrap>
      <EmptyFoo>
        <Div>
          <P>Welcome to Live with Lindsey! </P>
          <Link href="/login">
            <P>Click here to Login &amp; Let's Get Fit</P>
          </Link>
          <img height="70" src="../static/img/heartsig.svg" />
        </Div>
      </EmptyFoo>
    </Wrap>
  )
}

export default Welcome
