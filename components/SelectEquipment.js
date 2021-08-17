import React from 'react';
import Select from 'react-select'
import {useQuery} from '@apollo/client'
import gql from 'graphql-tag'
const EQUIPMENT_QUERY = gql`
  query EQUIPMENT_QUERY {
    allRequireds {
      id
      name
      quantity
      description
      image {
        publicUrlTransformed
      }
    }
  }
`
function SelectEquipment(props) {
    const {data} = useQuery(EQUIPMENT_QUERY)
    console.log(data)
      if (!data) return null
    const equipmentList =  data.allRequireds.map((equipment, i) => {
    const value = equipment.id
    const label = equipment.name
    return { value, label }
  })
  console.log(equipmentList)
  return (
    <>
          <p >
           ADD REQUIRED EQUIPMENT</p>
            <Select
required
              className="basic-single"
              classNamePrefix="select"
              type="select"
              value={props.equipmentId.value}
              isClearable={true}
              onChange={(e) => props.handleEquipmentId(e)}
              isSearchable={true}
              name="equipment"
              options={equipmentList}
            />
</>
  );
}

export default SelectEquipment;