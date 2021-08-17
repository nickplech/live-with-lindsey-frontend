import React from 'react'
import styled, { keyframes } from 'styled-components'
const loader = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
`
const Loadz = styled.div`
  .loading-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .loading-text {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #999;
    width: 100px;
    height: 30px;
    margin: ${(props) => (props.name ? '-7px 0 0 48px' : '-7px 0 0 -34px')};
    line-height: 12px;
    font-family: 'Comfortaa';
    text-align: center;
    font-size: 14px;
  }

  .loading-content {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 170px;
    height: 170px;
    margin: -85px 0 0 -85px;
    border: 3px solid #f00;
    &:after {
      content: '';
      position: absolute;
      border: 3px solid #0f0;
      left: 15px;
      right: 15px;
      top: 15px;
      bottom: 15px;
    }
    &:before {
      content: '';
      position: absolute;
      border: 3px solid #00f;
      left: 5px;
      right: 5px;
      top: 5px;
      bottom: 5px;
    }
  }
  .loading-content {
    border: 3px solid transparent;
    border-top-color: ${props => props.theme.primary};
    border-bottom-color: ${props => props.theme.primary};
    border-radius: 50%;
    animation: ${loader} 2s linear infinite;
    &:before {
      border: 3px solid transparent;
      border-top-color: ${props => props.theme.second};
      border-bottom-color: ${props => props.theme.second};
      border-radius: 50%;
      animation: ${loader} 3s linear infinite;
    }
    &:after {
      border: 3px solid transparent;
      border-top-color: ${props => props.theme.third};
      border-bottom-color: ${props => props.theme.third};
      border-radius: 50%;
      animation: ${loader} 1.5s linear infinite;
    }
  }

  .content-wrapper {
    color: #fff;
    position: fixed;
    left: 0;
    top: 20px;
    width: 100%;
    height: 100%;
  }
`

const Loader = (props) => {
  return (
    <Loadz className="loading-wrapper">
      <div className="loading-text">
        {props.name ? props.name : props.loader}
      </div>
      <div className="loading-content"></div>
    </Loadz>
  )
}

export default Loader
