import Router from 'next/router'
import React, { useState } from 'react'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import { startOfWeek, formatISO} from 'date-fns'
import { useMutation, useQuery } from '@apollo/client'
import SickButton from './styles/SickButton'
import Error from './ErrorMessage'
import { STREAMS_ADMIN_QUERY } from './AdminCalendarAlt'
import { STREAMS_QUERY } from './ScheduledClasses'
import { REASONS_QUERY } from './UpdateScheduleSettings'

import MultiTag from './MultiTag'
import Select from 'react-select'
 
import styled from 'styled-components'

const CREATE_CLASS_MUTATION = gql`
  mutation CREATE_CLASS_MUTATION(
    $name: String
    $reason: ID!
    $price: Int
    $date: DateTime!
    $equipment: [ID!]
    $tags: [ID!]
  ) {
    createNewClass(
      name: $name
      reason: $reason
      price: $price
      date: $date
      equipment: $equipment
      tags: $tags
    ) {
      id
      date
      name
    }
  }
`
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
const Mode = styled.form`
  display: flex;
 
 
 justify-content: center;
 align-items: center;
  z-index: 100;
  position: relative;
  font-size: 12px;

 
  height: 100%;
  padding: 20px;
  font-family: 'Bison';
  letter-spacing: 2px;
  font-size: 17px;
width:100%;
 

 
  min-width: 380px;
 
  margin: 0 auto;
  background: white;


  .header {
    width: 100%;
    position: relative;
 
    font-size: 18px;
    text-align: center;
 
  }
 
 
`
const Left = styled.div`
height: 100%;
position: relative;
width: 100%;
 max-width: 1200px;
background: white;
 
 
`
const TheDates = styled.div`
width: 100%;    display: flex; flex-flow: row;   justify-content:center;
   align-items: center;
   margin: 0 auto;
   text-align: center;max-width: 400px;
   p {
     margin: 2px;
   }
` 
const SignUpTitle = styled.h3`
  font-family: 'Bison';
 
  font-size: 28px;
  text-align: left;
  margin: 0 0 0px 0px;
  color: ${(props) => props.theme.second};
`
 
const ShowDate = styled.h4`
grid-column: 2;
grid-row: 2;

  justify-content: center;

text-align: left;
  align-items: center;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  position: relative;
  margin: 5px auto;
  background: #ffd7d4;
  cursor: pointer;
  letter-spacing: 3px;
  color: slategrey;
  user-select: none;
  padding: 10px;
  border: 6px solid white;
width: 50%;
min-width: 390px;
 border-radius: 10px;
  transition: .3s;
  font-size: 22px;
  font-family: 'Bison';
 span {
   color: #f8b0b0;
 }
  p {
    margin:0;
  }
`

  
const EquipmentList = styled.ul`
display: flex;
flex-flow: row wrap;
margin: 0 auto;
cursor: pointer;
 list-style: none; user-select: none;
width: 100%;
 .menu-item-wrapper {
    user-select: none;
/*   
    border-radius: 50%; */
 
  height: 60px;
  width: 60px;
 
    align-items: center;
 
    margin: 20px auto ;
    
 
  }
    img {
margin: 0 10px;
height: 30px;
width: 30px;
  }
  li{
    margin: 10px 20px; user-select: none;
  }
`
const Div = styled.ul`

  display: flex;
 
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  
  
  background: transparent;
  color: ${(props) => props.color};
 padding: 5px;
  
 
 
  text-align: center;
 
  
  transition: 0.2s;
 

`

const MenuItem = ({handleEquipmentSelect, selected}
) => {
  const {data, loading} = useQuery(EQUIPMENT_QUERY)
 if (loading) return <p>loading...</p>
 if (!data) return null
 const theEquipment = data.allRequireds
  return (
    <Div>
  
  <EquipmentList> {theEquipment &&
theEquipment.map((equipment, i) => {
const hasItPicked = selected.includes(equipment.id)
return (
<li key={equipment.id}  onClick={() => handleEquipmentSelect(equipment.id)}>
 
      <img height="auto" width="60" src={equipment.image.publicUrlTransformed} />
        <div style={{textTransform: 'uppercase', background: `${hasItPicked ? '#ffd7d4' : 'transparent'}`}}>
          {equipment.name}
      
        </div>
   </li>
 )
})}</EquipmentList>
</Div>
   
  )
}
 
export default function ScheduleClasses() {

 
  const [equipmentId, setEquipmentSelect] = useState('')
  const [tagsId, setTagsSearch] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [priceState, setPriceState] = useState('1000')
  const [selectedOption, setSelectedOption] = useState('')

  const [weekStarts, setWeekStarts] = useState(startOfWeek(new Date(), {
    weekStartsOn: 0,
  }))

 
 
 console.log(selectedEquipment)
  
  function handleSelectedOption(e) {
    setSelectedOption(e)
  }
  
  const handleEquipmentSelect = (equipmentId) => {
  if(selectedEquipment.includes(equipmentId)) {
     return removeEquipmentSelection(equipmentId)
  }
    let selectedCopy = [...selectedEquipment]
  
    selectedCopy.push(equipmentId)
    setSelectedEquipment(selectedCopy)
 
  }

  const removeEquipmentSelection = (equipmentId) => {
    const filteredEquip = selectedEquipment.filter((i) => i !== equipmentId)
    setSelectedEquipment(filteredEquip)
  }
  const handleTagsSearch = (item) => {
    let selectedCopy = [...selectedTags]
    selectedCopy.push(item.id)
    setSelectedTags(selectedCopy)
    setTagsSearch(item.id)
  }

  const removeTagsSearch = (item) => {
    const filteredEquip = selectedTags.filter((i) => i !== item.id)
    setSelectedTags(filteredEquip)
  }
  const { inputs, handleChange } = useForm({
    date: new Date(),
    reason: '',
  })
 console.log(inputs.date)
 
  const [createNewClass, { loading, error }] = useMutation(
    CREATE_CLASS_MUTATION,
    {
      variables: {
        date: inputs.date && formatISO(new Date(inputs.date)),
        reason: selectedOption && selectedOption.value,
        price: parseInt(priceState),
        name: selectedOption && selectedOption.label,
        equipment: selectedEquipment,
        tags: selectedTags,
      },
      refetchQueries: [
        {
          query: STREAMS_QUERY,
          variables: { date: formatISO(new Date()) },
        },
        {
          query: STREAMS_ADMIN_QUERY,
          variables: {  
            date: formatISO(weekStarts)},
        },
      ],
    },
  )

  const { data } = useQuery(REASONS_QUERY)
 

  if (!data) return null

  const optionList = data.allReasons.map((reason, i) => {
    const value = reason.id
    const label = reason.name
    return { value, label }
  })
 
  const needsClass = selectedOption && selectedOption.length
  const needsDateTime = inputs.date && inputs.date !== null
  const tooManyTags = selectedTags.length > 10

 
  return (
    <Mode
               
    onSubmit={async (e) => {
      e.preventDefault()
      await createNewClass()
      Router.push({
        pathname: '/',
      })
    }}
  > 
  <Left>
   
                  <SignUpTitle> Live Stream Scheduler</SignUpTitle>
                   <Error error={error} />                      
                    <p
                      style={{
                        transform: 'translateY(10px)',
                        color: 'slategrey',
                        fontSize: '22px',
                        textTransform: 'uppercase',
                      }}
                      >
                       DATE &amp; TIME</p>  
                      <input
                        id="date"
                        name="date"
                        type="datetime-local"
                        step="900"
                        required
                        defaultValue={inputs.date}
                        onChange={handleChange}
                      />

                  
                   
<p
                      style={{
                        transform: 'translateY(10px)',
                        color: 'slategrey',
                        fontSize: '22px',
                        textTransform: 'uppercase',
                      }}
                      >
                      SELECT A CLASS
                    </p>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      type="select"
                      value={selectedOption}
                      isClearable={true}
                      required
                      onChange={(e) => handleSelectedOption(e)}
                      
                      isSearchable={true}
                      name="reason"
                      options={optionList}
                    />
                  


                    <p
                      style={{
                        transform: 'translateY(10px)',
                        color: 'slategrey',
                        fontSize: '22px',
                        textTransform: 'uppercase',
                      }}
                      >
    Add Equipment
  </p>     
  
                    <MenuItem handleEquipmentSelect={handleEquipmentSelect} 
                      selected={selectedEquipment}  />
                    <div>
                    <p
                      style={{
                        paddingTop: '10px',
                        transform: 'translateY(10px)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Add Desired Search Tags
                    </p>
                    <MultiTag
                      removeTagsSearch={removeTagsSearch}
                      selected={selectedTags}
                      handleTagsSearch={handleTagsSearch}
                      tagsId={tagsId}
                    /></div>
                    <SickButton
                      disable={
                        loading || needsClass || needsDateTime || tooManyTags
                      }
                      style={{ marginTop: '50px' }}
                      type="submit"
                    >
                      CREATE CLASS
                    </SickButton>                 
          </Left>
      </Mode>
  )
}