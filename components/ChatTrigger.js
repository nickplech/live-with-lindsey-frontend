import React from 'react'
import styled from 'styled-components'

const Confirmer = styled.div`
  display: flex;
  background: ${(props) => props.theme.second};
  justify-content: center;
  text-align: center;
  margin-left: 10px;
  align-items: center;
  height: 40px;
  width: 40px;
  box-shadow: 0px 6px 7px -3px rgba(20, 20, 20, 0.3);
  border-radius: 50%;
  color: white;
  text-transform: uppercase;
  font-size: 10px;
  padding: 0px 6px;
  bottom: 20px;
  right: 20px;
  z-index: 100000;
  position: fixed;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    box-shadow: 0px 8px 9px -3px rgba(20, 20, 20, 0.3);
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
const ChatTrigger = ({handleToggleChat, open}) => (
    open ?
     
      null :  <Confirmer onClick={handleToggleChat}>
        <img className="confirmations" src="../static/img/chat.svg" />
      </Confirmer> 
    
  )


export default ChatTrigger
