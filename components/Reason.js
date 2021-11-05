import React from 'react'
import styled from 'styled-components'
import DeleteReason from './DeleteReason'

const Div = styled.div`
  padding: 3px 7px;
  margin: 4px 3px;
  border-width: 2px;
  letter-spacing: 1px;
  border-style: solid;
  font-family: 'Bison';
  background: transparent;
  color: ${(props) => props.color};

  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  list-style: none;
  transition: 0.2s;
  &:hover {
    box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, 0.1);
  }
`

const Reason = ({ reason }) => {
  return (
    <Div
      color={"#f8b0b0"}
      style={{
        background: 'transparent',
        color: reason.color === '#F8F8FF' && 'black',
        borderColor: `#f8b0b0`,
      }}
    >
      {reason.name}
      <DeleteReason color={reason.color} id={reason.id} name={reason.name} />
    </Div>
  )
}

export default Reason
