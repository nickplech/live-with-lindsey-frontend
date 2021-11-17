import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import Equipment from './Equipment'
import { startOfWeek, formatISO, format,eachDayOfInterval, endOfWeek, addWeeks, subWeeks } from 'date-fns'
import { useMutation, useQuery } from '@apollo/client'
import SickButton from './styles/SickButton'
import Error from './ErrorMessage'
 
 
import { STREAMS_ADMIN_QUERY } from './AdminCalendarAlt'
import { STREAMS_QUERY } from './DashboardComponent'
import { REASONS_QUERY } from './UpdateScheduleSettings'
import MultiSelectEquipment from './MultiSelectEquipment'
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

 
 

const Mode = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 100px   ;
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
position: absolute;
width: 100%;
grid-column: 1;
background: white;
`
const Right = styled.div`
height: 100%;
position: absolute;
width: 100%;
grid-column: 2;
background: linen;
`
const SignUpTitle = styled.h3`
  font-family: 'Bison';
  font-size: 28px;
  text-align: left;
  margin: 0 0 26px 0px;
  color: ${(props) => props.theme.second};
`
 
const ShowDate = styled.h4`
grid-column: 2;
grid-row: 2;
  display: flex;
  justify-content: center;
text-align: center;
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
  padding: 0;
  border: 3px solid #ffd7d4;
width: 50%;
min-width: 390px;
 
  transition: .3s;
  font-size: 28px;
  font-family: 'Bison';
  &:hover {
    opacity: .8;
  }
`

const Schedule = styled.div`
 /* grid-column: 1/3;
 grid-row: 3; */
/* transform: translate(190px, 560px); */
text-transform: uppercase;
z-index: 0;
margin: 0 auto;
display: flex;
flex-flow: row;
align-items: center;
justify-content: center;
width: 100%;
 
 grid-row: 2;
 grid-column: 1;
 

`
const DateBox = styled.div`
 
 
 
   color: #fff;
   height: 35px;
   width: 35px;
   border-radius: 8px;
   justify-content:center;
   align-items: center;
   text-align: center;
 
   transition: .1s;
   cursor: pointer;
   list-style: none;display: flex; 

   line-height: 16px; 
 
font-size: 18px; color: white;
background: #f8b0b0;border-radius: 5px ;
width: 100%;
padding: 0;
   &:hover {
 border-color: red;
 
   }

  


  
`
const Arrow = styled.span`
display: inline-flex;
font-size: 20px;
color: white;
padding: 0 50px;
cursor: pointer;
`
const TimePick = styled.div`

 
 
  display: flex;
  line-height: 20px;
  height: 30px;
  width: 30px;
  position: relative;
  border-radius: 50%;
  background:${props => props.selectedTimeIndex === props.theIndex ? '#f8b0b0' : 'lightgray'};
  color: slategray;
  user-select: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px; font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  &:hover {
    background: #f8b0b0;

  }
  &:active {
    background: #f8b0b0;
  }
  &:focus {
    background: #f8b0b0;
  }
 
`
const MinPick = styled.div`

 
 
  display: flex;
  line-height: 20px;
  height: 30px;
  width: 30px;
  position: relative;
  border-radius: 5%;
  background:${props => props.selectedMinIndex === props.theMinIndex ? '#f8b0b0' : 'lightgray'};
  color: slategray;
  user-select: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px; font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  &:hover {
    background: #f8b0b0;

  }
  &:active {
    background: #f8b0b0;
  }
  &:focus {
    background: #f8b0b0;
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

const MenuItem = ({
  id,
  equipment,
  name,
  image,
 next
}) => {
 
 
  return (
    
      
       <div className="menu-item-wrapper">

<Equipment next={next} key={id} image={image} equipment={equipment} />
       </div>
   
  )
}
const hourArray = [1,2,3,4,5,6,7,8,9,10,11,12]
const minArray = [0,15,30,45]
function ClassScheduler() {

 
  const [equipmentId, setEquipmentSearch] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [tagsId, setTagsSearch] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [priceState, setPriceState] = useState('1000')
  const [selectedOption, setSelectedOption] = useState('')
  const [theWeekList, setTheWeekList] = useState([])
  const [selectedTime, setSelectedTime] = useState(new Date().setHours(9,0))
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null)
  const [selectedMin, setSelectedMin] = useState(new Date().setMinutes(0))
  const [selectedMinIndex, setSelectedMinIndex] = useState(null)
  const [weekStarts, setWeekStarts] = useState(startOfWeek(new Date(), {
    weekStartsOn: 0,
  }))
  const [weekEnds, setWeekEnds] = useState(endOfWeek(new Date()))
 


 
 
 
 
  const submitEquipment = selectedEquipment.map((str, i) => ({ id: str }))

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
const handleLeft = async(e) => {
console.log(e)
const subtractedAWeek =  subWeeks(new Date(weekStarts), 1)
const subtractedAWeekEnds =  subWeeks(new Date(weekEnds), 1)
 setWeekStarts(subtractedAWeek)
 setWeekEnds(subtractedAWeekEnds)
}
const handleRight = async(e) => {
  console.log(e)

const addedAWeek =  addWeeks(new Date(weekStarts), 1)
const addedAWeekEnds =  addWeeks(new Date(weekEnds), 1)
 setWeekStarts(addedAWeek)
 setWeekEnds(addedAWeekEnds)
}
const goToToday = () => {

  const weekStartReset = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const weekEndReset = endOfWeek(new Date())
  setWeekEnds(weekEndReset)

   
   setWeekStarts(weekStartReset
    )
}
  const { inputs, handleChange } = useForm({
    date: new Date(),
    reason: '',
  })
  useEffect(() => {
 
    const arrayOfDays = eachDayOfInterval({
      start: new Date(weekStarts),
      end: new Date(weekEnds)
    })
    setTheWeekList(arrayOfDays)
  
  }, [weekStarts])

 const handleTime = (hour, i) => {
  const cleanHour = new Date().setHours(hour)
  setSelectedTime(cleanHour)
  setSelectedTimeIndex(i)
 }
 const handleMin = (min, i) => {
  const cleanMin = new Date().setMinutes(min)
  setSelectedMin(cleanMin)
  setSelectedMinIndex(i)
 }
  const [createNewClass, { loading, error }] = useMutation(
    CREATE_CLASS_MUTATION,
    {
      variables: {
        date: selectedDate.length < 3 ? 'Please Select a Date' : formatISO(new Date(selectedDate)),
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
                  <Left></Left><Right></Right>           
                <div className="header">
                  <SignUpTitle> Live Stream Scheduler</SignUpTitle>
                </div>  <Error error={error} />          


  <Schedule>        
             <div >  {
               format(weekStarts, 'MMM') 
              }
         {theWeekList.map(day => {
 const isToday = format(new Date(), 'MM d') === format(day, 'MM d')
           return <> { isToday ? <p style={{color: 'red'}}>Today</p> : <p>{format(day, 'eee') }</p>}
           <DateBox month={format(day, 'MMM')} onClick={()=> setSelectedDate(format(day, 'eee MMM dd yyyy'))} selectedDate={selectedDate}
            day={day} key={day} className="dateBox">  {format(day, 'd')}</DateBox>  </>
         })} 
          </div>
          <div onClick={goToToday} style={{margin: '0 auto', cursor: 'pointer'}}>Jump to Current Week</div>
          <p style={{ display: 'block', margin: ' 0px auto', borderRadius: '15px',
 fontSize: '26px',
 background: '#f8b0b0', padding: '5px 0', lineHeight: '18px', textAlign: 'center',color: 'white', marginBottom: '10px'}}>
     <Arrow onClick={(e) => handleLeft(e)}>&#8592;</Arrow>
           
        <Arrow onClick={(e) => handleRight(e)}>&#8594;</Arrow> </p> 
</Schedule> 


    <ShowDate>{ selectedDate.length < 3 ? <p>Please Select a Date</p> :  <p>{format(new Date(selectedDate), 'eeee MMM d') }</p>}
    </ShowDate>



    <div style={{display: 'grid',
gridTemplateColumns: '1fr 1fr 1fr 1fr',
gridTemplateRows: '1fr 1fr 1fr',
height: '120px',
width: '180px',
margin: '0 auto',}}>{hourArray.map((hour, i) => {

      return(
    
        <TimePick selectedTimeIndex={selectedTimeIndex} theIndex={i} onClick={() => handleTime(hour, i) } className="hour">{hour}</TimePick> 
      )
    })}</div>

<div style={{display: 'grid',
gridTemplateColumns: '1fr 1fr 1fr 1fr',
gridTemplateRows: '1fr',
height: '40px',
width: '180px',
margin: '0 auto',}}>{minArray.map((min, i) => {

      return(
    
        <MinPick selectedMinIndex={selectedMinIndex} theMinIndex={i} onClick={() => handleMin(min, i) } className="min">{min}</MinPick> 
      )
    })}</div>
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
                    <div >
                    <p
                      style={{
                        paddingTop: '10px',
                        transform: 'translateY(10px)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Add Necessary Equipment
                    </p>
                    <EquipmentList> {data &&
              data.allRequireds.map((item, i) => {
            
              return (
             
                  <MenuItem
              key={item.id} 
                   index={i}
                    next={i}
                    name={item.name}
                    image={item.image.publicUrlTransformed}
                    id={item.id}
                    theIndex={i}
                    equipment={item}
                  />
               
              )
            })}</EquipmentList>
                    <MultiSelectEquipment
                      removeEquipmentSearch={removeEquipmentSearch}
                      selected={selectedEquipment}
                      handleEquipmentSearch={handleEquipmentSearch}
                      equipmentId={equipmentId}
                    /></div>
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
                  </Mode>
             
       
  
  )
}

export default ClassScheduler
export { CREATE_CLASS_MUTATION }
