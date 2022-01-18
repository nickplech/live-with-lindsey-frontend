import React, {useState, useMemo, useEffect} from 'react'
import styled from 'styled-components'
import {Data_15} from './Calendar'
import Error from './ErrorMessage'
 
import { useQuery, useMutation  } from '@apollo/client'
import gql from 'graphql-tag'
import AppSlot from './DraggerGrid'
import { format, startOfDay } from 'date-fns'
import Slot from './Slot'
import { TODAYS_APPOINTMENTS_QUERY } from './Calendar'
import Loader from './Loader'
import Modal from './Modal'
import formatISO from 'date-fns/formatISO'
import useToggle from './useToggle'

const MOVE_APPOINTMENT_MUTATION = gql`
  mutation MOVE_APPOINTMENT_MUTATION($id: ID!, $date: DateTime) {
    updateItem(id: $id, date: $date) {
      id
      date
    }
  }
`

const RESIZE_APPOINTMENT_MUTATION = gql`
  mutation RESIZE_APPOINTMENT_MUTATION($id: ID!, $appLength: String) {
    updateLength: updateItem(id: $id, appLength: $appLength) {
      id
      reason {
        id  
        appLength
      }
    }
  }
`
 
const ALL_REASONS_QUERY = gql`
  query ALL_REASONS_QUERY {
    allReasons {
      id
      name
  
      classLength
    }
  }
`

const DayView = styled.div`
  position: relative;
 
margin: 0 auto;
  width: 98%;
  height: calc(100vh - 130px);
  background-color: white;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.05);
  border-radius: 14px 14px 14px 14px;
  z-index: 1;
  .gear {
    position: relative;
    height: 18px;
    width: 18px;
    margin: 0px;
    transition: 0.3s;
    &:hover {
      transform: rotate(180deg);
    }
  }
  .parent {
    display: flex;
  flex-flow: row;
    position: relative;
    right: 0px;
    justify-content: flex-end;
    align-items: flex-start;
    border-radius: 10px 10px 0 0;
    text-align: center;
    padding-right: 20px;
    /* margin-top: 1px; */
    height: 45px;
    width: 100%;
    background: ${(props) => props.theme.second};
  }
  .todayButton {
  
    position: absolute;
    display: flex;
    border-radius: 5px;
    background: white;
    left: 10px;
   justify-content: center;
   align-items: center;
 transform: translateY(10px);
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.1);
    width: 48px;
    height: 20px;
    cursor: pointer;
    transition: 0.3s;
    z-index: 50;
   
    &:hover {
      transform: translateY(10px) scale(1.03);
    }
 
  }
  .date {
    display: flex;
    text-transform: uppercase;
    margin: 0;
    color: rgba(230, 230, 230, 0.8);
    font-size: 14px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
  
  .sideDate {
    display: flex;
    color: white;
    align-items: flex-end;
    transform: translateY(-8px) translateX(5px);
    flex-flow: column;
    margin: 0;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 18px;
    line-height: 20px;
    padding-top: 10px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
  .dayofweek {
    font-size: 20px;
    font-family: 'Bison';
    letter-spacing: 2px;
  }
`
const MainDiv = styled.div`
 
  grid-row: 1/3;
  
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: scroll;
  overscroll-behavior: contain;
`
const DayGrid = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr;
  position: relative;
  width: 100%;
 
  margin-top: 2px;
  height: 100%;
`
const Side = styled.div`
  grid-column: 1;
  grid-auto-rows: 25px;
  grid-row-gap: 0px;
 
`
const Side1 = styled.div`
  height: 25px;
  display: flex;
  background: rgba(20, 20, 20, 0.1);
  color: rgba(20, 20, 20, 0.6);
  z-index: 4;
  position: relative;
  grid-auto-rows: 25px;

  grid-row-gap: 0px;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  &:nth-of-type(4n + 1) {
    color: white;
    background: #f8b0b0;
    &:after {
      content: '';
      width: 0;
      z-index: 2;
      height: 0;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      position: absolute;
      border-left: 10px solid
        ${(props) => (props.valid ? '#f8b0b0' : '#f8b0b0')};
      transform: translate(35px, -1px);
    }
  }
  &:nth-of-type(4n + 2) {
    color: rgba(20, 20, 20, 0.45);
    background: rgba(20, 20, 20, 0.2);
  }
  &:nth-of-type(4n + 3) {
    color: rgba(20, 20, 20, 0.45);
    background: rgba(20, 20, 20, 0.3);
  }
  &:nth-of-type(4n + 4) {
    color: rgba(20, 20, 20, 0.45);
    background: rgba(20, 20, 20, 0.2);
  }
`
const Inputs = styled.div`
  grid-column: 2;
  height: 25px;
 
 
  color: rgba(20, 20, 20, 0.6);
 
  position: relative;
  grid-auto-rows: 24px;

  grid-row-gap: 0px;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  div {
    border-bottom: 1px solid lightgrey;  font-size: 15px;
    padding-left: 5px;
    height: 25px;
    justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  &:hover {
    background: lightgrey;
  }
  }
`
 

function SingleDay ({slots,appointments,handleSelectedAppointment, appointmentIndices, setSelectedAppointment, selectedAppointment, date, setDate}) {
  const [isVisible, setIsVisible] = useState(false)
  const [time, setTime] = useState(new Date().toLocaleTimeString()) 
  const [open, setOpen] = useToggle(false)
 
  
   const update = (e) => {
   setTime( e.target.name )
  }
 
 
  const handleDateTime = (time) => {
    console.log(time)
setTime(time)
 
  }
 
    // const appointmentsArr = appointments &&  appointments.map((appointment) => {
    //   return appointment
    // })
    
    // useEffect(() => {
    //   appointmentIndices && appointmentIndices.map((appIndex, i) => {
    //   const start_index = appIndex
    //   const number_of_elements_to_remove = 1
    //   slots.splice(
    //     start_index,
    //     number_of_elements_to_remove,
    //     appointmentsArr[i],
    //   )
    // })
      
    // }, [])
    
    // const stripped = this.state.currentTime.toString().slice(1, -6)
    // isNowFunc(stripped)

         const [updateAppointment, {error}] = useMutation(MOVE_APPOINTMENT_MUTATION,
         {variables: {
           id: selectedAppointment && selectedAppointment,
         },         refetchQueries:
           {
             query: TODAYS_APPOINTMENTS_QUERY, 
             variables: {
               date: new Date(),
             }
           }
          })

        // const [updateAppointmentLength] = useMutation(RESIZE_APPOINTMENT_MUTATION,
        //   {variables: {
        //     id: this.state.updatingIdFirm,
        
        //   }})
        //  {(updateAppointment, { error }) => {
        //    return (
        //      <Mutation
        //        mutation={RESIZE_APPOINTMENT_MUTATION}
        //        variables={{
        //          id: this.state.updatingIdFirm,
        //        }}
        //        refetchQueries={[
        //          {
        //            query: TODAYS_APPOINTMENTS_QUERY,
        //            variables: {
        //              date: new Date(),
        //            },
        //          },
        //    ]}
        //   >
       const today = new Date()
     
      //  useEffect(() => {
         

      //  })
      //   setReasons(optionList)
     
      //  }, [])

   
    const {data, loading} = useQuery(ALL_REASONS_QUERY)
    if (loading) return <Loader />
    if (!data) return null
 
const {allReasons} = data
              const optionList = allReasons && allReasons.map( reason => {
         const value = reason.id
         const label = reason.name
         return { value, label }
               } )

    return (
      
            <>
              <DayView>
                <div className="parent">
                
                      <div
                        onClick={() => {
                        setDate(today)
                        }}
                        className="todayButton"
                      >
                     TODAY
                      </div>
             
      
                  <div className="sideDate">
                  
                      <div className="dayofweek"> {format(date, 'eeee')} </div>  {format(date, 'MMMM d, yyyy')} 
                  </div>
                
                </div>

                <MainDiv>
                  <DayGrid>
                    <Side>
                      {slots && slots.map((time, i) => {
                        

                 
                        return (
                          <Side1 key={i}>
                            {time}
                          </Side1>
                        )
                      })}
                    </Side>{' '}
        
                    <Inputs>
                    {Data_15.map((slotty, i) => {
                      const theTime = slotty.time + ' ' + slotty.ampm 
                      return(
                      <div onClick={() => handleDateTime(theTime, date)} key={slotty.time + slotty.ampm} onDoubleClick={setOpen} style={{opacity: '.3'}}>{slotty.time.includes('00') ? slotty.time + slotty.ampm : null}</div>
                      )
                    })}
                      {/* <AppSlot
                        appointmentIndices={appointmentIndices}
                        appointments={appointments}
                        // updateViewerStateLength={
                        //   updateViewerStateLength
                        // }
                        // updateViewerState={updateViewerState}
                        handleSelectedAppointment={handleSelectedAppointment}
                       setSelectedAppointment={setSelectedAppointment}
                        selectedAppointment={selectedAppointment}
                        date={date}
                        update={update}
                      ></AppSlot> */}
                      {/* {slots && slots.map((timeblock, i) => {
                        const objy = typeof timeblock !== 'string'

                        return (
                          <Slot
                            key={timeblock + 1 + i}
                            time={timeblock}
                            appointmentObject={false}
                            selectedAppointment={selectedAppointment}
                            isVisible={isVisible}
                            popUpModal={popUpModal}
                            update={update}
                            handleSelectedAppointment={handleSelectedAppointment}
                          />
                        )
                      })} */}
                    </Inputs>
                  </DayGrid>
                </MainDiv>
              </DayView>
             
        <Modal selectedDate={date}
                selectedTime={time}
                setTime={setTime}
               reasons={optionList} 
             
               open={open} 
               toggle={setOpen} />
        
     
            </>
    
    )
  }
 
export default SingleDay
 
