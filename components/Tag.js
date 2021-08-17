import React from 'react'
import styled from 'styled-components'

import DeleteTag from './DeleteTag'
const Div = styled.div`
  padding: 0px 8px;
  margin: 2px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Comfortaa';
  height: 30px;
  color: white;
  min-width: 50px;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 5px;
  list-style: none;
  transition: 0.2s;
  background: ${(props) => props.theme.third};
  &:hover {
opacity:.8;
    box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
  }
`

const Tag = ({ tag }) => {
  return (
    <Div>
      {tag.name}
      <DeleteTag color={tag.color} id={tag.id} name={tag.name} />
    </Div>
  )
}

export default Tag
