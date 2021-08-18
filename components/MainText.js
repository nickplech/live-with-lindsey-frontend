import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Title from './styles/Title'
const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: 'rgba(248, 176, 176, 0)',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: 'rgba(248, 176, 176, 1)',
  },
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  margin: 100px auto 170px;
  padding: 0;

  font-family: 'Bison';

  color: ${(props) => props.theme.second};
  h1 {
    margin: 0 auto 10px;
    font-size: 16px;
    line-height: 16px;  letter-spacing: 2px;
    @media (min-width: 768px) {
      margin: 0 auto 10px;
    font-size: 30px;letter-spacing: 3px;
    line-height: 28px;
    }
  }
  p {
    margin: 0 auto;
    text-align: center;
    font-family: 'Bison';
    letter-spacing: 1px;
    padding: 0;
    max-width: 80%;
    line-height: 18px;
    font-size: 14px;
    color: slategrey;
    @media (min-width: 768px) {
    max-width: 700px;
    font-size: 16px;
    letter-spacing: 2px;
    line-height: 26px;
    }
  }
  .plus {
    transform: translate(0, 2px);height: 20px;
    @media (min-width: 768px) {
      height: 30px;
    }
  }
  .buttons {
    display: flex;
    flex-flow: row;

    width: 100%;
    margin: 20px auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;

    .fir {
      border: 3px solid ${(props) => props.theme.second};
      &:hover {
        background: ${(props) => props.theme.primary};
        border: 3px solid ${(props) => props.theme.primary};
      }
    }
    .sec {
      background: white;
      color: ${(props) => props.theme.second};
      border: 3px solid ${(props) => props.theme.second};
    }
  }

  a {
   
    padding: 3px 5px;
    border-radius: 5px;
    border: none;
    margin: 10px;
    background: ${(props) => props.theme.second};
    color: white;
    outline: none;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 16px;
    transition: 0.3s;
    &:hover {
      opacity: 0.95;
      /* background: ${(props) => props.theme.primary};
      color: ${(props) => props.theme.second}; */
    }
  }
  .make_it_pink {
    color: ${(props) => props.theme.second};
  }
`
function MainText(props) {
  return (
    <Container className="container">
      <div className="row">
        <img
          src="../static/img/heartsig.svg"
          alt="lindsey harrod signature on a heart"
          height="50"
        />
        <h1>
          Live Stream{' '}
          <img
         
            className="plus"
            src="../static/img/plus-sydney.svg"
          />{' '}
          On-Demand Workouts by Lindsey Harrod
        </h1>
        <p className="lead" >
          Click Below to Sign up for a free account and simply pay-as-you-go ,
          or consider{' '}
          <span className="make_it_pink">
            Lindsey's All-Access pass for UNLIMITED viewing
          </span>{' '}
          of Lives and access to all on-demand videos!
        </p>
        <div className="buttons">
          <Link href="/signup">
            <a className="fir">Click to Sign Up!</a>
          </Link>
          <Link href="/ondemand">
            <a className="sec">Visit On-Demand Library</a>
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default MainText
