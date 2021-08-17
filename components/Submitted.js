import React from 'react'
import styled from 'styled-components'

const OuterDiv = styled.div`
  position: absolute;
  right: 20px;
  top: -25px;
`

const Submit = styled.div`
  text-align: center;
  padding: 10px;
  background: rgba(20, 180, 110, 0.9);
  color: white;
  border-radius: 5px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.1),
    0 6px 10px 5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  z-index: 999;
`

const Submitted = props => (
  <OuterDiv>
    <Submit>{props.message}</Submit>
  </OuterDiv>
)
export default Submitted
