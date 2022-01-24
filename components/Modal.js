import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { format,startOfWeek, formatISO } from 'date-fns'
import Select from 'react-select'
import Error from './ErrorMessage'
import { TODAYS_APPOINTMENTS_QUERY } from './Calendar'

import { createPortal } from 'react-dom'
 
import set from 'date-fns/set'
import { STREAMS_QUERY } from './ScheduledClasses'
import UserSearch from './UserSearch'
import MultiTag from './MultiTag'
import { motion, AnimatePresence,  
  AnimateSharedLayout,
  useTransform,
  layout, } from 'framer-motion'
import styled from 'styled-components'
 


function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root')  
  const [element] = useState(document.createElement('div'))  
  useEffect(() => {
    modalRoot.appendChild(element)
 
    return function cleanup() {
      modalRoot.removeChild(element)
    }
  }, [modalRoot, element])

  return createPortal(children, element)
}


const Wrap = styled.div`
 

 
overscroll-behavior: none;
  height: 100%;
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  
    grid-column: 1/3;
    grid-row: 1/3;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: 1000;
   
 
  justify-content: center;
  align-items: center;
 
  width: 100%;  
 
`
const ModalShell = styled(motion.div)`
 
 width: 90%;
 max-width: 700px;
 /* transform: translateY(-100px); */
 
    background-color: white;
    position:relative;              
 
border-radius:12px;
 
  
    
    margin: 0 auto;
 
   
    z-index: 1001;
 

`
const ModalContent = styled(motion.div)`
 padding: 5px;
 position: relative;
 width: 100%;
 height: 100%;
 
 
 input {
   font-family: 'Bison';
   font-size: 16px;
   padding-left: 10px;
 
   color: slategray;
   &::placeholder {
  
  color: rgb(30,30,30);
  opacity: .2;

}
 }
 textarea {
   resize: none;
   border-radius: 5px;
   width: 100%;
   border: 1px solid lightgrey;
   font-family: 'Bison';
   font-size: 16px;
   letter-spacing: 2px;
   color: slategray;
   padding: 5px;
   &::placeholder {
  
        color: rgb(30,30,30);
        opacity: .2;
     
   }
 }
`
const CREATE_CLASS_MUTATION = gql`
  mutation CREATE_CLASS_MUTATION(
    $name: String
    $reason: ID
    $price: Int
    $classType: String
    $classLength: String
    $date: DateTime!
    $equipment: [ID!]
    $tags: [ID!]
  ) {
    createNewClass(
      name: $name
      reason: $reason
      classType: $classType
      classLength: $classLength
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
const REASON_QUERY = gql`
  query REASON_QUERY($id: ID!) {
    Reason(where: { id: $id }) {
      id
      name
      classLength
      classDescription
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
 

const TimeChunk = styled.div`
grid-row: 2;
grid-column: 1;
padding-left: 20px;
  .cal {
    width: 130px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    /* align-items: center; */
    height: 90px;
    border: none;
    box-shadow: 0px 10px 15px -1px rgba(20, 20, 20, 0.2);
    border-radius: 10px;
    text-align: center;
  }
  .cal__item {
    width: 100%;
    position: absolute;
  }
  .cal__item.month {
    transform: translateY(-65px);
    color: #ffffff;
    font-size: 24px;
    width: 130px;
    line-height: 30px;
   
    background: ${(props) => props.theme.second};
    text-transform: uppercase;
    border-radius: 10px 10px 0 0;
  }
 .day {
    font-size: 30px;
    position: relative;
    opacity: 1;
    transform: translateY(-30px);
    color: slategray;
    align-self: center;
  
  }
  .first-one {
     margin: 0px auto 0px;
     font-size: 50px;
     transform: translateY(10px);
    }

  .timer__item {
    position: absolute;
    top: 50%;
    left: 50%;
    background: #323a44;
    margin-bottom: 10px;
    border-radius: 70px;
  }
  .timer__item.sec {
    width: 40%;
    height: 2.6666666667px;
    margin-top: -1.3333333333px;
    margin-left: -1.3333333333px;
    transform-origin: 1.3333333333px 1.3333333333px;
    background: #e74c3c;
  }
  .timer__item.min {
    width: 40%;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    transform-origin: 4px 4px;
  }
  .timer__item.hour {
    width: 25%;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    transform-origin: 4px 4px;
  }
  .message {
    margin-top: 40px;
    font-size: 20px;
    text-align: center;
    line-height: 2em;
  }
  .label {
    background: #0099ff;
    color: #fff;
    font-weight: bold;
    padding: 4px 8px 6px;
    border-radius: 70px;
  }
  .label.type {
    background: #65ab09;
  }
  .label.month {
    text-transform: uppercase;
  }
`
const TypeOfClassList = styled.div`
display: flex;
background: ${props => props.theme.primary};
color: slategray;
width: 100%;
border-radius: 5px 5px 0 0;
 justify-content: center;

 align-items: center;
 text-align:center;
 position: relative;
font-size: 20px;line-height:  20px;padding: 5px;
 div {
   width: 33.3%; transition: 400ms;
   cursor:pointer;
   &:hover {
     background: #f8b0b0;
     color: white;
   }
 }
`
 

const SickButton = styled.button`
  background: ${(props) => props.theme.second};
  color: #fff;
  font-weight: 800;
  border-radius: 20px;
  margin: 20px auto;
  border: none;
  display: flex;
  font-size: 2rem;
  padding: 6px 12px;
  font-size: 2rem;
  transition: all 0.5s;
  font-family: 'Bison';
  letter-spacing: 3px;
  outline: none;
  cursor: pointer;
  width: 50%;
  justify-content: center;
  justify-self: flex-end;
  align-items: center;
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    background: rgba(20, 100, 200, 0.8);
  }
  &:active {
    box-shadow: none;
  }
`

const SickerButton = styled.div`
  background: transparent;
  color: white;
  font-weight: 800;
  display: flex;
  position: absolute;
  padding: 5px;
  border: 1px solid white;
  border-radius: 6px;
  top: -50px;
  right: 0px;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  height: 35px;
  width: 35px;
  transition: all 0.5s;
  outline: none;
  cursor: pointer;
  background-image: url('../static/img/arrows_remove.svg');
  background-size: contain;
  color: white;
  fill: white;
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    background: rgba(245, 10, 10, 0.2);
  }
  &:active {
    box-shadow: none;
  }
  .imagez {
    color: white;
    height: 50px;
    width: 50px;
    position: relative;
    display: flex;
  }
`
 
const LiveGrid = styled.div`
display: grid;
width: 95%;
margin: 0 auto;
grid-template-columns: 30% 120px 1fr;
grid-template-rows: 30px 1fr  ;
grid-gap: 20px;
.alt-title {
  height: 42px;
  width: 100%;

  border: 1px solid rgba(20,20,20,.2);
  border-radius: 5px;
  &[disabled] {
    opacity: 0.3;
    background: lightgrey;
    cursor: not-allowed;
  }
}
.classLength {
  grid-row: 3;
  grid-column: 2;
  width: 100%;
  margin:  5px auto  ;
}
.classlength__menu {
  transform: translateY(-20px);
 
}
 
`
const Flip1 = styled(motion.div)`
grid-column: 1;
width: 100%;
position: absolute;
pointer-events: ${(props) => (props.flipped ? 'none' : 'auto')};
`
const Flip2 = styled(motion.div)`
grid-column: 1;
width: 100%;
pointer-events: ${(props) => (props.flipped ? 'auto' : 'none')};
`
const ClassBubble = styled.div`
grid-column: 2/4;
grid-row: 1/3;
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
background-image: ${props => props.classType === 'LIVE' ?   'linear-gradient(130deg, #ff8063, #e34040)' : props.classType === 'PRIVATE' ? 'linear-gradient(130deg, #9457e2, #5029bb)' : 'linear-gradient(130deg, #ffe561, #ffd24c)'  };

border-radius: 10px;
width: 95%;
padding: 10px;
transform: translateY(20px);
height: 80%;    box-shadow: 0px 10px 15px -1px rgba(20, 20, 20, 0.2); 
.bottom {
  width: 100%;
  grid-row: 2;
  grid-column: 1/3;
  display: flex;
align-items: flex-end;
 
height: 100%;
  position: relative;
}
 .timer {
 line-height: 30px;
    position: relative;
 
    display: flex;
 font-size: 34px;
 
  color: white;
 
&:after {
  position: relative;
  content: '';
  margin-left: 8px;
 
  width: 4px;
  height: 30px; 
  background: #fff;
}
    /* transform: rotate(-90deg) #a3ffc1; */
  }
  .class-title {
    color: white;
    font-size: 30px;
    margin:  0px;
    line-height: 28px;
grid-row: 1;
grid-column: 1/3;
  }
  .class-length {
 
    position: relative;
    line-height: 30px;
    display: flex;
 font-size: 34px;
 margin-left: 7px;
  color: white;
  }
  .class-status {
    position: absolute;
    justify-self: flex-end;
    letter-spacing: 2px;padding:2px 8px;
    line-height: 15px;
    transform: translate(-10px, -15px);
    border-radius: 5px;
  
    grid-row: 1;
    grid-column: 2;
    color: white;
    background: red;
  }
`
 const typeList = ['LIVE', 'PRIVATE', 'PERSONAL']



  const variants = {
    varientA: { opacity: 1, rotateX: 0 },
    varientB: { opacity: 0, rotateX: 180 },   
  }
  const flipVarients = {
    varientA: { opacity: 0, rotateX: 180 },
    varientB: { opacity: 1, rotateX: 0 },
  }

function processDateAndTime(theDate, theTime) {
  
  const isPm = theTime.includes('PM')
  const hour = theTime.substring(0, theTime.indexOf(':'))
  const militaryHour = isPm ? parseInt(hour) + 12 : hour
  const minutes = parseInt(theTime.substring(theTime.indexOf(':') + 1, theTime.indexOf(' ')))
 return set(new Date(theDate), {hours: militaryHour, minutes: minutes, seconds: 0})
  
 
}

const classLengthOptions = [{value: '5 Min', label: '5 Min'}, {value: '10 Min', label: '10 Min'},{value: '15 Min', label: '15 Min'}, {value: '20 Min', label: '20 Min'}, {value: '25 Min', label: '25 Min'}, {value: '30 Min', label: '30 Min'}, {value: '45 Min', label: '45 Min'},{value: '60 Min', label: '60 Min'},{value: '90 Min', label: '90 Min'}]
const  Modal = ({ reasons, open, children, toggle, selectedDate, selectedTime}) => {
   const [flipped, setFlipped] = useState(false)
const [equipmentId, setEquipmentSearch] = useState('')
 
const [tagsId, setTagsSearch] = useState('')
  const [addDescription, setAddDescription] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedReason, setSelectedReason] = useState(null)
    const [selectedUser, setSelectedUser] = useState('')
    const [selectedEquipment, setSelectedEquipment] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedType, setSelectedType] = useState('LIVE')
    const [date, setDate] = useState(new Date())
    const [classLength, setClassLength] = useState('45 min')
    const [priceState, setPriceState] = useState(2000)
    const [altTitle, setAltTitle] = useState('')
    const [note, setNote] = useState('')

    const [appLength, setAppLength] = useState(60)
    const [isoDate, setIsoDate] = useState('')
   
   const tidiedUpDate = date && selectedTime && processDateAndTime(date, selectedTime)
  // const dateAndTime = set(new Date(date), {})
 console.log(formatISO(tidiedUpDate))
  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })     
const [createNewClass, { error}] = useMutation(CREATE_CLASS_MUTATION,
{variables: {
  date: date && formatISO(tidiedUpDate),
  reason: selectedReason?.value,
  price: parseInt(priceState),
  classType: selectedType,
  classLength: classLength, 
  equipment: selectedEquipment,
  tags: selectedTags,
  name: altTitle ? altTitle : selectedReason?.label 
},refetchQueries: [
  {
    query: STREAMS_QUERY,
    variables: { date: formatISO(new Date()) },
  },
  {
    query: TODAYS_APPOINTMENTS_QUERY,
    variables: {  
      day: format(new Date(date), 'yyyy-MM-dd')},
  },
],
  }
 )


 function handleSelectedOption(e) {
   if (e === null) return
   console.log(e)
  setSelectedReason(e)
}

 
 

const addDescriptionhandler = () => {
  setAddDescription(prev => !prev)
}
const setNoteHandler = (e) => {
  e.preventDefault()
  const {value} = e.target
  setNote(value)
}
const setAltTitleHandler = (e) => {
  e.preventDefault()
  const {value} = e.target
  setAltTitle(value)
}
  const handleUserSearch = (item) => {
    let selectedCopy = [...selectedUsers]
    selectedCopy.push(item.id)

    setSelectedUsers( selectedCopy)
  }
function setFlippedHandler() {
  setFlipped(prev => !prev)
}
  const removeUserSearch = (item) => {
    const theUsers = selectedUsers.filter((i) => i !== item.id)
    setSelectedUsers(theUsers) 
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
const onValueChange = (theType) => {
 
  setSelectedType(theType)
}
 
 const [getReason] = useLazyQuery(REASON_QUERY, {variables: {id: selectedReason && selectedReason.value}})

 async function handleReasonFetch() {
const res = await getReason()
const cLength = res.data.Reason.classLength

setClassLength(cLength)
 }

 function handleClassLength(e) {
   console.log(e)
   const {value} = e
   setClassLength(value)
 }

useEffect(() => {
  if(selectedReason === null) return
  handleReasonFetch()
 
}, [selectedReason])

    const tooShort = selectedReason && selectedReason.length == 0
 
 
    return (
      
        <AnimatePresence >{open &&  
   <Portal key='modal-portal'>
          <Wrap key='modal-wrap' isVisible={open}  onClick={event => event.stopPropagation()}>
            <div  className="shade" />
            <ModalShell  

            initial={{ opacity: 0, 
            y: 60, scale: 0.8 }}
            animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', 
                            stiffness: 100 }
            }}
            exit={{ opacity: 0, scale: 0.7, 
                    transition: { duration: 0.3 } }}>
                      <ModalContent
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1, 
                         transition: { delay: 0.5 } }}>
               
                        <SickerButton
                          onClick={toggle}
                        />
                        {/* <Error error={error} /> */}
                  
               
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault()
                        const res = await createNewClass()
                        await toggle()
                        // const appointment = await res.data.createNewClass
                        // await handleRehydrate(appointment)
                      }}
                    >
                    <TypeOfClassList>
                      {typeList.map(theType => {
                    
                        return <div key={theType} onClick={() => onValueChange(theType)}>
             {theType}
          </div>
         
                        
                      })}


                      
                          
                        </TypeOfClassList> 
                       <LiveGrid>
                       
            
               
                        
                         <TimeChunk>   
                  <div className="cal">
                          <div className="cal__item month">
                            {format(new Date(selectedDate), 'MMM yyyy')}
                          </div>
                          <div className="cal__item day first-one">
                            {format(new Date(selectedDate), 'dd')}
                          </div>
                          <div className="cal__item day">
                            {format(new Date(selectedDate), 'eeee')}
                          </div>
                        </div>
                              
                      </TimeChunk>
             
                
                       <ClassBubble  personal={false} classType={selectedType}>     
                       <p className="class-status">{selectedType}</p>   
                       <div className="bottom">
                         <div className="timer">{selectedTime}</div> 
                         <div className="class-length">{classLength && classLength}</div>
                        </div>       
                       <h3 className="class-title">{altTitle ? altTitle : selectedReason ? selectedReason.label : 'No Class Selected'}</h3>

                   
                </ClassBubble>
            
                    
             
                     <AnimateSharedLayout>
                       <Flip1 
                  key="selecter-for-reasons"
                  flipped={flipped}
                  transition={{
                    type: 'spring',
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                  }}
                  style={{position: 'relative', gridRow:3, gridColumn: 1, margin: '5px 0 0px', transform: 'perspective(600px)'}}
                
                  variants={variants}
                  initial="varientA"
                  animate={flipped  ? 'varientB' : 'varientA'}
                > <Select
                      className="basic-single"
                      classNamePrefix="select"
                      type="select"
                      value={selectedReason}
                      isClearable={false}
                      placeholder="Select a Class"
                      onChange={(e) => handleSelectedOption(e)}
                  
                      isSearchable={true}
                      name="reason-flip"
                      options={reasons}
                    /> </Flip1>
                    <Flip2 
                  variants={flipVarients}
                  flipped={flipped}
                  initial="varientA"
                  animate={flipped ? 'varientB' : 'varientA'}
                  layout
                  transition={{
                    type: 'spring',
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                  }}
                  key="selecter-for-reasons-two"
                  className="content"
                  style={{
                    transform: 'perspective(600px)',
                    position: 'relative',
                      gridRow:3, gridColumn: 1, margin: '5px 0 0px',
                  }}
                >   <input
                style={{color: 'rgba(30,30,30,.7'}}
                      className="alt-title"
                      autoComplete="off"
                      placeholder="type Custom Title"
                    //  disabled={selectedReason}
                      value={altTitle}
                 id="altTitle"
                        name="altTitle"
                      onChange={setAltTitleHandler}
                    />
                   </Flip2>          
                 </AnimateSharedLayout> 
                 
                   <div  onClick={() => setFlippedHandler()} style={{ cursor: 'pointer',  transform: 'translate( 5px, 210px)',color: 'slategray', fontSize: '16px',   }} >{`${flipped ? 'Switch to Class Selector' : 'Switch to One-Time Title'}`} </div>
                  
                
               
                   
                   
             
                      <textarea  id="note"
                      name="note" placeholder="Add additional description" style={{height: '70px', color: 'rgba(30,30,30,.7)', gridRow:3,gridColumn:3 , marginTop: '5px'}} value={note} onChange={setNoteHandler}></textarea>

                      <Select 
                       type="select"
                        
                       classNamePrefix="classlength"
                      value={classLength}
                       isClearable={false}
                  placeholder={classLength}
                       onChange={(e) => handleClassLength(e)}
                   className="classLength"   
                       name="classLength"
                       options={classLengthOptions}
                    />
                   </LiveGrid>
              
                      <div  >  
                    <MultiTag
                      removeTagsSearch={removeTagsSearch}
                      selected={selectedTags}
                      handleTagsSearch={handleTagsSearch}
                      tagsId={tagsId}
                    /></div>
                      {/* <label htmlFor="note">
                        Extra Notes:
                        <StyledTextArea
                          name="note"
                          type="text"
                          value={note}
                          onChange={handleChange}
                        />
                      </label> */}
                      <SickButton disabled={tooShort} type="submit">
                        Schedule Live Workout
                      </SickButton>
                    </form>
                    </ModalContent>
            </ModalShell>  
              </Wrap>
          
 </Portal> 
  } </AnimatePresence>
     
    )
  
}

export default Modal
export { CREATE_CLASS_MUTATION }



   
   
   

 