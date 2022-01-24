import React, { useState, useEffect } from 'react'
import { format, startOfDay, addMinutes, startOfMinute, formatISO } from 'date-fns'
 
import Calendar from 'react-calendar'
import styled from 'styled-components'
import SingleDay from './SingleDay'
 
import Error from './ErrorMessage'
import Loader from './Loader'
import { useQuery, useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
 
const Data_15 = [
  {
    time: '7:00',
    ampm: 'am',
    full: '7:00 AM',
  },
  {
    time: '7:15',
    ampm: 'am',
    full: '7:15 AM',
  },
  {
    time: '7:30',
    ampm: 'am',
    full: '7:30 AM',
  },
  {
    time: '7:45',
    ampm: 'am',
    full: '7:45 AM',
  },
  {
    time: '8:00',
    ampm: 'am',
    full: '8:00 AM',
  },
  {
    time: '8:15',
    ampm: 'am',
    full: '8:15 AM',
  },
  {
    time: '8:30',
    ampm: 'am',
    full: '8:30 AM',
  },
  {
    time: '8:45',
    ampm: 'am',
    full: '8:45 AM',
  },
  {
    time: '9:00',
    ampm: 'am',
    full: '9:00 AM',
  },
  {
    time: '9:15',
    ampm: 'am',
    full: '9:15 AM',
  },
  {
    time: '9:30',
    ampm: 'am',
    full: '9:30 AM',
  },
  {
    time: '9:45',
    ampm: 'am',
    full: '9:45 AM',
  },
  {
    time: '10:00',
    ampm: 'am',
    full: '10:00 AM',
  },
  {
    time: '10:15',
    ampm: 'am',
    full: '10:15 AM',
  },
  {
    time: '10:30',
    ampm: 'am',
    full: '10:30 AM',
  },
  {
    time: '10:45',
    ampm: 'am',
    full: '10:45 AM',
  },
  {
    time: '11:00',
    ampm: 'am',
    full: '11:00 AM',
  },
  {
    time: '11:15',
    ampm: 'am',
    full: '11:15 AM',
  },
  {
    time: '11:30',
    ampm: 'am',
    full: '11:30 AM',
  },
  {
    time: '11:45',
    ampm: 'am',
    full: '11:45 AM',
  },
  {
    time: '12:00',
    ampm: 'pm',
    full: '12:00 PM',
  },
  {
    time: '12:15',
    ampm: 'pm',
    full: '12:15 PM',
  },
  {
    time: '12:30',
    ampm: 'pm',
    full: '12:30 PM',
  },
  {
    time: '12:45',
    ampm: 'pm',
    full: '12:45 PM',
  },
  {
    time: '1:00',
    ampm: 'pm',
    full: '1:00 PM',
  },
  {
    time: '1:15',
    ampm: 'pm',
    full: '1:15 PM',
  },
  {
    time: '1:30',
    ampm: 'pm',
    full: '1:30 PM',
  },
  {
    time: '1:45',
    ampm: 'pm',
    full: '1:45 PM',
  },
  {
    time: '2:00',
    ampm: 'pm',
    full: '2:00 PM',
  },
  {
    time: '2:15',
    ampm: 'pm',
    full: '2:15 PM',
  },
  {
    time: '2:30',
    ampm: 'pm',
    full: '2:30 PM',
  },
  {
    time: '2:45',
    ampm: 'pm',
    full: '2:45 PM',
  },
  {
    time: '3:00',
    ampm: 'pm',
    full: '3:00 PM',
  },
  {
    time: '3:15',
    ampm: 'pm',
    full: '3:15 PM',
  },
  {
    time: '3:30',
    ampm: 'pm',
    full: '3:30 PM',
  },
  {
    time: '3:45',
    ampm: 'pm',
    full: '3:45 PM',
  },
  {
    time: '4:00',
    ampm: 'pm',
    full: '4:00 PM',
  },
  {
    time: '4:15',
    ampm: 'pm',
    full: '4:15 PM',
  },
  {
    time: '4:30',
    ampm: 'pm',
    full: '4:30 PM',
  },
  {
    time: '4:45',
    ampm: 'pm',
    full: '4:45 PM',
  },

  {
    time: '5:00',
    ampm: 'pm',
    full: '5:00 PM',
  },
  {
    time: '5:15',
    ampm: 'pm',
    full: '5:15 PM',
  },
  {
    time: '5:30',
    ampm: 'pm',
    full: '5:30 PM',
  },
  {
    time: '5:45',
    ampm: 'pm',
    full: '5:45 PM',
  },
  {
    time: '6:00',
    ampm: 'pm',
    full: '6:00 PM',
  },
  {
    time: '6:15',
    ampm: 'pm',
    full: '6:15 PM',
  },
  {
    time: '6:30',
    ampm: 'pm',
    full: '6:30 PM',
  },
  {
    time: '6:45',
    ampm: 'pm',
    full: '6:45 PM',
  },
  {
    time: '7:00',
    ampm: 'pm',
    full: '7:00 PM',
  },
  {
    time: '7:15',
    ampm: 'pm',
    full: '7:15 PM',
  },
  {
    time: '7:30',
    ampm: 'pm',
    full: '7:30 PM',
  },
  {
    time: '7:45',
    ampm: 'pm',
    full: '7:45 PM',
  },
  {
    time: '8:00',
    ampm: 'pm',
    full: '8:00 PM',
  },
  {
    time: '8:15',
    ampm: 'pm',
    full: '8:15 PM',
  },
  {
    time: '8:30',
    ampm: 'pm',
    full: '8:30 PM',
  },
  {
    time: '8:45',
    ampm: 'pm',
    full: '8:45 PM',
  },
  {
    time: '9:00',
    ampm: 'pm',
    full: '9:00 PM',
  },
  {
    time: '9:15',
    ampm: 'pm',
    full: '9:15 PM',
  },
  {
    time: '9:30',
    ampm: 'pm',
    full: '9:30 PM',
  },
  {
    time: '9:45',
    ampm: 'pm',
    full: '9:45 PM',
  },
]

const TODAYS_APPOINTMENTS_QUERY = gql`
  query TODAYS_APPOINTMENTS_QUERY($day: String) {
    allItems(where: { day: $day }, orderBy: "date") {
      id
      price
      date
      name
      classType 
      status
      classLength
      stillAvailable
      user {
        id
              firstName
        lastName
        businessName
      }
      reason {
        id
    
        classLength
        classDescription
      }
    }
  }
`

const SINGLE_APPOINTMENT_QUERY = gql`
  query SINGLE_APPOINTMENT_QUERY($id: ID!) {
    Item(where: { id: $id }) {
      id
      name
      price
      classLength
      reason {
        color
        name
        classLength
      }
      date
      classType

      user {
        id
      }
    }
  }
`

const Wrap = styled.div`
display: grid;
width:100%;
height: 100%;
grid-template-columns:350px 1fr ;
grid-template-rows:1fr;
`
const Details = styled.div`
 
  display: flex;
 

  font-family: 'Bison';

  padding: 20px;  
 
  flex-flow: column;
  position: relative;

  height: 100%;
  width: 100%;
`
const Names = styled.span`
  color: white;
  display: flex;
  font-family: 'Comfortaa';
  padding: 0px 8px;
  border: 2px solid white;
  border-radius: 20px;
  margin: 5px 5px;
`
const Flex = styled.div`
  display: flex;  font-family: 'Comfortaa';
  flex-flow: row;  background: #fff;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
  align-items: center;  height: 60px;
  margin-bottom: 10px;
  p {
  margin: 0 auto;


  }
 
  background:    #C68DFF ;
   &:nth-child(1) {
  background: #FFC68D ;
  }
`
const Timez = styled.h3`
  color: white;
  display: flex;

  font-size: 18px;
  background: #f8b0b0;
  margin: 0 0;
`
const Datez = styled.h3`
  color: white;
  display: flex;
  font-family: 'Comfortaa';
  background: #f8b0b0;
  margin: 0 0;
  font-size: 22px;
`
const Reasonz = styled.span`
  color: white;
  display: flex;
  padding: 2px 8px;
  font-family: 'Comfortaa';
  border: 2px solid white;
  border-radius: 20px;
  margin: 5px 5px;
`
const StatsDisplay = styled.div`
  position: relative;  grid-column: 1;
  display: grid;
grid-template-columns: 1fr;
  grid-template-rows: 275px 30px 1fr;
 background: rgba(240,240,240,.8);
  width: 100%;
  height: calc(100vh - 130px);
  border-radius: 10px 5px 5px 10px;
  /* box-shadow: 1px 1px 2px 3px rgba(0, 0, 0, 0.05); */
  z-index: 10;

  .react-calendar {
    width: 328px;
    grid-row: 1;
    grid-column: 1;
    border-radius: 7px;
    max-width: 100%;
    position: relative;
    box-shadow: 0px 6px 7px -4px rgba(0,0,0,.2);
    height: 270px;
    border-bottom: 3px solid white;
    background: #fff;
    margin: 0px auto;
    font-family: 'Comfortaa';
    line-height: 1.125em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    z-index: 4;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 45px;
    font-family: 'Bison';
    margin-bottom: 0em;   width: 100%; 
  }
  .react-calendar__navigation button {
height: 45px;
    background: none;
    font-size: 20px;
    background-color: #f8b0b0;
    color: white;
    &:first-child {
      border-radius: 7px 0 0 0;
      width: 10%;
    }
    &:last-child {
      border-radius: 0 7px 0 0;
      width: 10%;
    }
    &:nth-child(2) {
      border-radius: 0;
      width: 10%;
    }
    &:nth-child(3) {
      border-radius: 0;
      width: 60%;
    }
    &:nth-child(4) {
      border-radius: 0;
      width: 10%;
    }
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background: rgba(240, 240, 240, 1);
    border-radius: 5px;
    color:#f8b0b0;
  }
  .react-calendar__navigation button[disabled] {
    background-color: rgba(20, 110, 240, 0.1);
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-decoration: none;
    font-family: 'Comfortaa';
    font-size: 0.9em;
    color: slategray;
 
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: .5em 0;
    color: slategray;
    font-family: 'Bison';
    letter-spacing: 3px;
  }
  .react-calendar__month-view__weekNumbers {
    color: white;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    color: white;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day {
    color: rgba(30,30,30,.7);
  }
  .react-calendar__month-view__days__day--weekend {
    color: rgba(30,30,30,.3);
     
    font-weight: 400;
    
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #969696;
    font-weight: 500;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
    color: white;
    &:hover {
      color: slategray;
    }
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    border-radius: 5px;
    padding: 0.55em 0.5em;
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #ffd7d4;
    border-radius: 5px;
    color: #f8b0b0;
  }
  .react-calendar__tile--hasActive {
    background: #ffd7d4;
    color: #f8b0b0;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
    color: #f8b0b0;
  }
  .react-calendar__tile--active {
    background:#f8b0b0;
    color: #fff;
    /* font-size: 18px;
    line-height: 12px;
    padding: 0; */
    border-radius: 5px;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
color: white;
    background: #f8b0b0;
    border-radius: 5px;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: rgba(100, 100, 240, 1);
    color: white;
  }

  abbr {
    text-decoration: none;
  }
`
const TodayButton = styled.button`
grid-row: 2;
position: relative;
grid-column: 1;
cursor: pointer;
border: none;
font-family: 'Bison';
font-size: 16px;
letter-spacing: 2px;
height: 25px;
text-align: center;
width:328px;
border-radius: 10px;
transition: .3s;
box-shadow: 0px 6px 7px -4px rgba(0,0,0,.2);
margin: 5px auto;
background: white;
&[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
&:hover {
  background: #ffd7d4;
  
}
`
const SingleAppointment = styled.div`
  padding: 20px;  grid-row:3;
  grid-column: 1;
  display: flex;
  flex-flow: column;
  position: relative;

  height: 100%;
  width: 100%;
`

function CalendarStats()  {
//  const [loading, setLoading] = useState(false)
   const [date, setDate] = useState(startOfDay(new Date()))
   
  //  const [dailyTotal, setDailyTotal] = useState(null)
  //  const [weeklyTotal, setWeeklyTotal] = useState(null)
  //  const [monthlyTotal, setMonthlyTotal] = useState(null)
    const [slots, setSlots] =  useState([])
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const today = startOfDay(new Date())
 
const isTheSame = date.toString().includes(today)
  const saveDate = async () => {
 


 
        let slots = Data_15.map(slot => {
      const hasMeridean = slot.time.toString().includes('00')
      if (hasMeridean) {
        let slotTime = slot.time + ' ' + slot.ampm
        return slotTime
      }
      if (!hasMeridean) {
        let slotTime = slot.time
        return slotTime
      }
        })

 
    setSlots(slots)
 
  }
  
  
  useEffect(() => {

    saveDate(date) 
  }, [date])
 

const handleSelectedAppointment = async(selectionArg) => {
  console.log(selectionArg)
  if (!selectionArg) return
 
if(selectionArg.length > 10) {
 const item  = await getItem({variables: {id: selectionArg}})
  const appointment = item.data.Item
  setSelectedAppointment(appointment)
 return
}
setSelectedAppointment(selectionArg) 

}

 const [getItem] = useLazyQuery(SINGLE_APPOINTMENT_QUERY)

    const { data, loading} = useQuery(TODAYS_APPOINTMENTS_QUERY, {variables: { day:format(date, 'yyyy-MM-dd').toString() }})
   
if (loading ) return <Loader />
    if(!data) return null 
    const items = data.allItems
  
 const isAnObj = selectedAppointment && typeof selectedAppointment === 'object'
    return (
      
      <Wrap>
              <StatsDisplay>
                <Calendar
                  name="date"
                  onChange={(date) => setDate(date)}
                  minDetail="decade"
                  value={date}
                  calendarType="US"
                  returnValue="start"
                />
                <TodayButton
                disabled={isTheSame}
                        onClick={(e) => {
                          e.preventDefault()
                        setDate(today)
                        }}
                        className="todayButton"
                      >
                    {isTheSame ? 'CURRENTLY VIEWING TODAY' : 'JUMP TO TODAY'}
                     </TodayButton>
             <SingleAppointment>
            
             
             {isAnObj ?
  
          <Details>
        
         <h2>{ selectedAppointment.name}</h2>
 <Flex> <p style={{background: 'red', color: 'white', fontFamily: 'Bison', letterSpacing: '2px', padding: '0px 4px'}}>{selectedAppointment.classType}</p> 
<p style={{ color: 'white', fontFamily: 'Bison', letterSpacing: '2px'}}>{format(date, 'eeee MMM dd')} </p></Flex>
         
          
        
     
   
       </Details>  : <p style={{width: '100%', textAlign: 'center', opacity: .4}}>no class selected</p>
       }
        </SingleAppointment>  
              </StatsDisplay>
              { loading ? <Loader/> :
              <SingleDay
                slots={slots}
           
            
                date={date}
                items={items}
                setDate={setDate}
                saveDate={saveDate}
                handleSelectedAppointment={handleSelectedAppointment}
                selectedAppointment={selectedAppointment}
                setSelectedAppointment={setSelectedAppointment}
              />   }
         </Wrap>
    ) 
     
}

export default CalendarStats
export {Data_15}