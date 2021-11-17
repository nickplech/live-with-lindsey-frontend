import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'

import { startOfWeek, formatISO, format,eachDayOfInterval, endOfWeek, addWeeks, subWeeks } from 'date-fns'
import { useMutation, useQuery } from '@apollo/client'
import SickButton from './styles/SickButton'
import Error from './ErrorMessage'
 
 
import { STREAMS_ADMIN_QUERY } from './AdminCalendarAlt'
import { STREAMS_QUERY } from './DashboardComponent'
import { REASONS_QUERY } from './UpdateScheduleSettings'
import Equipment from './Equipment'
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr   ;
 grid-row-gap: 10px;
 
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
grid-row: 1;
grid-column: 1;
    font-size: 18px;
    text-align: center;
 
  }
 
 
`
const Left = styled.div`
height: 100%;
position: relative;
width: 100%;
grid-column: 1;
background: white;
padding-right: 20px;
`
const TheDates = styled.div`
width: 100%;  grid-row: 2; display: flex; flex-flow: row;   justify-content:center;
   align-items: center;
   margin: 0 auto;
   text-align: center;max-width: 400px;
   p {
     margin: 2px;
   }
`
const Right = styled.div`
height: 100vh;
position: relative;
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
width: 100%;
grid-column: 2;
background: lightslategray;
`
const SignUpTitle = styled.h3`
  font-family: 'Bison';
  grid-row: 1;
  grid-column: 1;
  font-size: 28px;
  text-align: left;
  margin: 0 0 26px 0px;
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

  
const EquipmentList = styled.div`
display: flex;
flex-flow: row wrap;
margin: 0 auto;
width: 100%;
 .menu-item-wrapper {
    user-select: none;
  
    border-radius: 50%;
 
  
 
    align-items: center;
 
    margin: 20px auto ;
    
 
  }
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
height: 30px;
width: 30px;
  }
`

const MenuItem = (
) => {
  const {data, loading} = useQuery(EQUIPMENT_QUERY)
 if (loading) return <p>loading...</p>
 if (!data) return null
 const theEquipment = data.allRequireds
  return (
    <>
    <p
    style={{
      paddingTop: '10px',
      transform: 'translateY(10px)',
      textTransform: 'uppercase',
    }}
  >
    Add Necessary Equipment
  </p>
  <EquipmentList> {theEquipment &&
theEquipment.map((equipment, i) => {

return (

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
      
        </div>
    </Div>
 )
})}</EquipmentList>
</>
   
  )
}
 
export default function ScheduleClasses() {

 
  const [equipmentId, setEquipmentSearch] = useState('')
  const [tagsId, setTagsSearch] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [priceState, setPriceState] = useState('1000')
  const [selectedOption, setSelectedOption] = useState('')
  const [date, setDate] = useState(new Date())
  const [weekStarts, setWeekStarts] = useState(startOfWeek(new Date(), {
    weekStartsOn: 0,
  }))

 
 
 
  
  function handleSelectedOption(e) {
    setSelectedOption(e)
  }
  
  const handleEquipmentSearch = (item) => {
    let selectedCopy = [...selectedEquipment]
    selectedCopy.push(item.id)
    setSelectedEquipment(selectedCopy)
    setEquipmentSearch(item.id)
  }

  const removeEquipmentSearch = (item) => {
    const filteredEquip = selectedEquipment.filter((i) => i !== item.id)
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
                   <div style={{gridColumn: 1}}>
                    <p
                      style={{
                       
                        paddingTop: '35px',
                        transform: 'translateY(10px)',
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
                    </div>
                     
                    <label htmlFor="date">
                      SELECT DATE &amp; TIME
                      <input
                        id="date"
                        name="date"
                        type="datetime-local"
                        step="900"
                        required
                        defaultValue={inputs.date}
                        onChange={handleChange}
                      />
</label>

                    <div >
                  <MenuItem removeEquipmentSearch={removeEquipmentSearch}
                      selected={selectedEquipment} equipmentId={equipmentId}/>
        </div>
                    <div  >
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