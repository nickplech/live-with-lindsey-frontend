import React, { useState } from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'
import GetChats from './ChatBox'

const CartStyles = styled.div`
  position: relative;
  grid-row: 3;
  height: 400px;

  width: 100%;

  transform: translateY(-100%);

  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 6000;

  padding-right: 0;

  ${(props) => props.open && `transform: translateY(0)`};

  box-shadow: none;
  width: 100%;
  max-width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`

function Slider({ open, itemId, toggleChat }) {
  return (
    <CartStyles open={open}>
      <GetChats toggleChat={toggleChat} itemId={itemId} />
    </CartStyles>
  )
}

export default Slider
