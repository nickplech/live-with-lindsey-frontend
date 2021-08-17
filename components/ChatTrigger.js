import React from 'react'
import styled from 'styled-components'

const Confirmer = styled.div`
  display: flex;
  background: ${(props) => props.theme.second};
  justify-content: center;
  text-align: center;
  margin-left: 10px;
  align-items: center;
  height: 25px;
  width: 25px;
  box-shadow: 2px 2px 7px 3px rgba(20, 20, 20, 0.3);
  border-radius: 50%;
  color: white;
  text-transform: uppercase;
  font-size: 10px;
  padding: 0px 6px;
  z-index: 5000;
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    box-shadow: 3px 3px 8px 4px rgba(20, 20, 20, 0.3);
    transform: scale(1.06);
  }
  .confirmations {
    display: inline-block;
  }
  img {
    color: white;
    background: transparent;
    height: 15px;
  }
`
const ChatTrigger = () => {
  return (
    <Confirmer >
      <img className="confirmations" src="../static/img/chat.svg" />
    </Confirmer>
  )
}

export default ChatTrigger
