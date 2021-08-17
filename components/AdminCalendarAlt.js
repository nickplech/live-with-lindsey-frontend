import React, { useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { startOfWeek, format } from 'date-fns'
import addDays from 'date-fns/addDays'
import Loader from './Loader'
const STREAMS_ADMIN_QUERY = gql`
  query STREAMS_ADMIN_QUERY($date: String) {
    allItems(where: { date_gte: $date }, orderBy: "date") {
      id
      price
      date
      name
      status
      stillAvailable
      user {
        id
      }
      reason {
        id
        name
        classLength
        classDescription
      }
    }
  }
`
const Calendar = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
   /* grid-auto-rows: 80px; */
  flex-flow: column;
  justify-content: center;
  text-align: center;
  
  margin: 40px auto;  position: relative;
 
.passed {
 padding: 5px 0px;
  background: rgba(20,20,20,.1);
   
}
.today { padding: 5px 0;
  background: rgba(80,80,80,.1);
}
.future { padding: 5px 0px;
background: rgba(140,140,140,.1);
}
  .thirtyMins {
    height: 100%;
    width: 100%;
    border: 1px solid rgba(20, 20, 20, 0.3);
    margin: 0;
  }
  .week {
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    width: 100%;
    height: 100%;
  }
`

const Workout = styled.div`
  background: rgba(240, 240, 240, 0.7);

  grid-template-columns: 30px 1fr 60px;
  grid-template-rows: 1fr  ;
  border: 1px dotted slategrey;
  border-radius: 5px;
  padding: 0px;
  align-items: center;
  width: 90%;
  position: relative;
 margin: 10px auto;
  height: 80px;
  display: grid;
  transition: 0.3s;
  &:hover {
    transform: translateX(5px);
  }
 
  .dayday {
    grid-column: 2;
    grid-row: 1;
    font-size: 20px;
    font-family: 'Bison';
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    line-height: 14px;
  }
  .middle {     

    font-family: 'Bison';
    letter-spacing: 2px;
 padding: 4px;
    line-height: 16px;
    color: slategrey; grid-column: 2;
    flex-flow: column;
   justify-content: center;
   align-items: center;
   text-align: center;
    width: 100%;
  }
 
  .date {
    grid-column: 2;
    grid-row: 2;
    margin: 0;
    line-height: 14px;
    font-size: 16px;
  margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .control_room {
    grid-column: 3;
    border-radius: 0 3px 3px 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1/3;
    background: ${(props) => props.theme.second};
    color: white;
    padding: 0 0px;
    cursor: pointer;
  
  }
img {
    transition: .4s;
    &:hover {
      transform: rotate(360deg);
    }
}
  span {
    background: ${(props) =>
      props.status === 'COMPLETE' ? 'rgba(20,120,20,.7)' : 'grey'};
    border-radius: 3px 0 0 3px;
    height: 100%;
    grid-column: 1;
    grid-row: 1/3;

    color: white;
    padding: 0 0px;
  }
`
const Col1 = styled.div`
  grid-column: 1; 
`
const Col2 = styled.div`
  grid-column: 2; 
`
const Col3 = styled.div`
  grid-column: 3; 
`
function AdminCalendarAlt() {
  const [modalOpen, setModalOpen] = useState(false)
  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })

  const { error, loading, data } = useQuery(STREAMS_ADMIN_QUERY, {
    variables: { date: format(weekStarts, 'yyyy-MM-dd') },
  })
  if (loading) return <Loader />
  if (error) return <Error error={error} />
  if (!data) return null

  const theDataLength = data.allItems.length
  console.log(theDataLength)
    const today = format(new Date(), 'M/dd')
  const passedArray = data.allItems.filter(workout => {
    const date = format(new Date(workout.date), 'M/dd')

   
   
    return date < today
  })


  const todayArray = data.allItems.filter(workout => {
    const date = format(new Date(workout.date), 'M/dd')

  
   
    return date === today
  })
  const futureArray = data.allItems.filter(workout => {
    const date = format(new Date(workout.date), 'M/dd')
 
   
    return date > today
  })
  console.log(todayArray)
   console.log(futureArray)  
   console.log(passedArray)
  theDataLength === 0 && <p>No Classes Scheduled This Week!</p>
  return (
    <Calendar>
    <Col1>
      
        <div className="passed"><h1>Finished Classes</h1></div>
      {passedArray.map((item, i) => {
             const test = format(new Date(item.date), 'eeee - M/dd | h:mm aa')
        return (
          
        
          
          <Workout key={item.id}   status={item.status} >
               
            <span />
            <div className="middle"> <div >{test}</div>
            <div className="title">{item.name}</div>{' '}</div>
           
             
          
            
              <Link
                href={{
                  pathname: '/livecontrolroom',
                  query: { id: item.id },
                }}
              >
                <div className="control_room">
                <img height="30" src="../static/img/gear.svg" />
             </div> 
             </Link>
            
          </Workout>
        )
      })}</Col1><Col2>
      <div className="today"><h1>Today's Classes</h1></div>
      {todayArray.map((item, i) => {
             const test = format(new Date(item.date), 'eeee - M/dd | h:mm aa')
        return (
          
        
          
          <Workout key={item.id}   status={item.status} >
               
            <span />
            <div className="middle"> <div >{test}</div>
            <div className="title">{item.name}</div>{' '}</div>
           
             
          
            
              <Link
                href={{
                  pathname: '/livecontrolroom',
                  query: { id: item.id },
                }}
              >
                <div className="control_room">
                <img height="30" src="../static/img/gear.svg" />
             </div> 
             </Link>
            
          </Workout>
        )
      })}</Col2><Col3>
      <div className="future"><h1>Upcoming Classes</h1></div>

      {futureArray.map((item, i) => {
             const test = format(new Date(item.date), 'eeee - M/dd | h:mm aa')
        return (
          
        
          
          <Workout key={item.id}  status={item.status} >
               
            <span />
            <div className="middle"> <div >{test}</div>
            <div className="title">{item.name}</div>{' '}</div>
           
             
          
            
              <Link
                href={{
                  pathname: '/livecontrolroom',
                  query: { id: item.id },
                }}
              >
                <div className="control_room">
                <img height="30" src="../static/img/gear.svg" />
             </div> 
             </Link>
            
          </Workout>
        )
      })}</Col3>
    </Calendar>
  )
}

export default AdminCalendarAlt
export { STREAMS_ADMIN_QUERY }
