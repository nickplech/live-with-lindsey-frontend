import React from 'react'
import styled from 'styled-components'
import DeleteEquipment from './DeleteEquipment'
const Flexy = styled.div`
display: flex;
justify-content: flex-start;
margin: 0 auto;
align-items: center;
 
`
const Div = styled.div`

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 10px 25px;
  font-family: 'Comfortaa';
  font-size: 12px;
  background: transparent;
  color: ${(props) => props.color};
 padding: 5px;
 height: 80px;
 
  width:100px;
  text-align: center;
 
 line-height: 12px;
  list-style: none;
  transition: 0.2s;
 
  img {
margin-bottom: 10px;
height: 50px;
width: 50px;
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
