import React from 'react'
import styled from 'styled-components'
import DeleteEquipment from './DeleteEquipment'
const Flexy = styled.div`
display: flex;
justify-content: center;
margin: 0 auto;
align-items: center;
flex-flow: row;
`
const Div = styled.div`

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  font-family: 'Comfortaa';
  border: 2px dashed rgba(10,10,10,.1);
  background: transparent;
  color: ${(props) => props.color};
  height: 155px;
  width:200px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  list-style: none;
  transition: 0.2s;
  &:hover {
  border: 2px dashed rgba(222, 0, 0, 0.1);
  }
  img {
margin-bottom: 10px;
  }
`

const Equipment = ({ equipment }) => {
  return (
<Flexy>
      <Div
      className="theDiv"

      style={{
        background: 'transparent',
        color: 'black',
      }}
    >
      <img height="auto" width="60" src={equipment.image.publicUrlTransformed} />
        <div style={{textTransform: 'uppercase'}}>
          {equipment.name}
        <DeleteEquipment id={equipment.id} name={equipment.name} />
        </div>
    </Div>
</Flexy>
  )
}

export default Equipment
