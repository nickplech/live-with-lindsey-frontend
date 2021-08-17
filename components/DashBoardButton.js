import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'

const Confirmer = styled.a`
  display: flex;
  background: #f67280;
  justify-content: flex-start;
  text-align: left;
  align-items: center;
  height: 60px;
  width: 80px;
  box-shadow: 2px 2px 7px 3px rgba(20, 20, 20, 0.3);
  left: 10px;
  bottom: 10px;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  font-size: 10px;
  z-index: 16000;
  padding: 5px 20px;
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    box-shadow: 3px 3px 8px 4px rgba(20, 20, 20, 0.3);
    transform: scale(1.03);
  }
  .confirmations {
    display: inline-block;
  }
  span {
    &:nth-of-type(1) {
      height: 80%;
      background: white;
      width: 1px;
      margin-right: 7px;
    }
  }
  img {
    color: white;
    background: transparent;
    width: 40px;
  }
`
const DashBoardButton = (props) => {
  return (
    <div>
      <Link href="/dashboard">
        <Confirmer onClick={props.toggleChat}>
          <span></span>
          <div>Dash</div>
          <div>board</div>
        </Confirmer>
      </Link>
    </div>
  )
}

export default DashBoardButton
