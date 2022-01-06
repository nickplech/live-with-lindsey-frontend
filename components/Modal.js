import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { format, addHours,startOfWeek, addMinutes, formatISO } from 'date-fns'
import Select from 'react-select'
import Error from './ErrorMessage'
import { TODAYS_APPOINTMENTS_QUERY } from './Calendar'
  
import { createPortal } from 'react-dom'
 

import { STREAMS_QUERY } from './ScheduledClasses'
import UserSearch from './UserSearch'
import MultiTag from './MultiTag'
import { motion, AnimatePresence } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
 

// const ALL_REASONS_QUERY = gql`
//   query ALL_REASONS_QUERY {
//     allReasons {
//       id
//       name
//       color
//     }
//   }
// `

// Creates a portal outside the DOM hierarchy
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
 
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;  
 
overscroll-behavior: none;
  height: 100%;
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  .shade {
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
  }

 
`
const ModalShell = styled(motion.div)`
 height:  550px;
 width: 90%;
 max-width: 700px;
 /* transform: translateY(-100px); */
 
    background-color: white;
    position:absolute;              
 
border-radius:12px;
 
    border-radius: 8px;
    
    margin: 0 auto;
margin-top: -700px;
    padding: 20px;
    z-index: 1001;
    box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.3);

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
 }
 textarea {
   resize: none;
   border-radius: 5px;
   border: 1px solid lightgrey;
   font-family: 'Bison';
   font-size: 16px;
   letter-spacing: 2px;
   color: slategray;
   padding: 10px;
 }
`
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
 

const TimeChunk = styled.div`
  .cal {
    width: 130px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    /* align-items: center; */
    height: 120px;
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
    /* transform: translateY(10px); */
    color: #ffffff;
    font-size: 20px;
    width: 130px;
    top: 0;
    background: ${(props) => props.theme.second};
    text-transform: uppercase;
    border-radius: 10px 10px 0 0;
  }
 .day {
    font-size: 30px;
    position: relative;
    opacity: 1;
    color: slategray;
    align-self: center;
  
  }
  .first-one {
     margin: 20px auto 15px;
     font-size: 50px;
    }
  .timer {
  
    position: absolute;
    transform: translateX(150px);
    display: flex;
 font-size: 24px;
    background: white;
  color: slategray;
 
 
    /* transform: rotate(-90deg); */
  }
  .timer__item {
    position: absolute;
    top: 50%;
    left: 50%;
    background: #323a44;
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
const TypeOfClassList = styled.ul`
position: absolute;
transform: translateX(150px) translateY(15px);
list-style: none;
font-size: 20px;padding: 0;
li {
  margin-bottom: 5px;
}
`
const StyledTextArea = styled.textarea`
  padding: 3px 10px;
  margin: 4px auto;
  border-width: 2px;
  border-style: solid;
  position: relative;
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, 0.1);
  color: grey;
  background: white;
  border-color: white;
  padding: 5px;
  width: 100%;
  min-height: 80px;
  font-size: 2rem;
  outline: none;
  resize: none;
  border-radius: 10px;
  &:focus {
    outline: none;
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
  top: -60px;
  right: -20px;
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
 
const Ul = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;

  position: relative;
  justify-content: flex-start;
  span {
    position: relative;
  }
  input {
    background: none;
    border: none;
    grid-column: 1;
    position: absolute;
    text-align: center;
    color: white;
    padding: 0px 6px;
    transition: 0.2s;
    overflow-x: hidden;
    border-radius: 50%;
    font-size: 14px;
    margin: 0px 0px 0 15px;
    width: 17px;
    height: 17px;
    outline: none;
    cursor: pointer;
    z-index: 1000;
  }
  .line {
    width: 45px;
    grid-column: 1;
    height: 17px;
    margin-right: 20px;
    align-self: center;
    border-radius: 20px;
    background: rgba(20, 20, 20, 0.2);
    position: relative;
    transform: translate(0px, 0px);
    z-index: 500;
  }
`
 
function timeConvertor(time) {

  let pm = time.includes('pm')
  if (pm) {
    time = time.split(':')
    let hour = time[0] == '12' ? 12 : 12 + parseInt(time[0], 10)
    let min = time[1]

    return (hour + ':' + min).replace('pm', '')
  }
  if (!pm) {
    time = time.split(':')
    let hour = time[0]
    let min = time[1]

    return (hour + ':' + min).replace('am', '')
  }
}
const  Modal = ({reasons, open, children, toggle, selectedDate, selectedTime}) => {
 
const [equipmentId, setEquipmentSearch] = useState('')
 
const [tagsId, setTagsSearch] = useState('')
  const [addDescription, setAddDescription] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedReason, setSelectedReason] = useState(null)
    const [selectedEquipment, setSelectedEquipment] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedType, setSelectedType] = useState('livestream')
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState('')
    const [priceState, setPriceState] = useState(20)
    const [altTitle, setAltTitle] = useState('')
    const [appLength, setAppLength] = useState( 60)
    const [isoDate, setIsoDate] = useState('')
    const [note, setNote] = useState('')

 
  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })     
const [createNewClass, { error}] = useMutation(CREATE_CLASS_MUTATION,
{variables: {
  date: date && formatISO(new Date(date)),
  reason: selectedReason && selectedReason,
  price: parseInt(priceState),
  equipment: selectedEquipment,
  tags: selectedTags,
  name: selectedUsers && selectedUsers,
},refetchQueries: [
  {
    query: STREAMS_QUERY,
    variables: { date: formatISO(new Date()) },
  },
  {
    query: TODAYS_APPOINTMENTS_QUERY,
    variables: {  
      date: formatISO(weekStarts)},
  },
],
  }
 )
 function handleSelectedOption(e) {
  setSelectedReason(e)
}
const LiveGrid = styled.div`
display: grid;
width: 100%;
grid-template-columns: 1fr 1fr;
grid-gap: 20px;
.alt-title {
  height: 40px;
  width: 100%;
  border: 1px solid rgba(20,20,20,.2);
  border-radius: 3px;
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
`
const addDescriptionhandler = () => {
  setAddDescription(prev => !prev)
}
const setNoteHandler =(e) => {
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
const onValueChange = (e) => {
  const {value} =  e.target
  setSelectedType(value)
}
  
    const tooShort = selectedReason && selectedReason.length == 0
    const military = timeConvertor(time)
    const splitMil = military.split(':')
    const splitDate = date && date.toISOString()
    const withHours = addHours(new Date(date), splitMil[0])
    const withMins = addMinutes(new Date(withHours), splitMil[1])
    const toIso = time.length && withMins.toISOString()
 
    return (
      
        <AnimatePresence>{open &&  
   <Portal>
          <Wrap isVisible={open}>
            <div  className="shade" />
            <ModalShell  
  onClick={event => event.stopPropagation()}
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
                          onClick={() => {
                         
                            setNote('')
                            setSelectedReason(null)
                         
                            setSelectedUsers([])
                        toggle()
                            
                          }}
                        />
                        <Error error={error} />
                  
               
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault()
                        const res = await createNewClass()
                  
                        setNote('')
                        setSelectedReason([])
                        
                        setSelectedUsers([])
                 
                        await toggle()
                        // const appointment = await res.data.createNewClass
                        // await handleRehydrate(appointment)
                      }}
                    >
                      <SickerButton
                        onClick={(e) => {
                          e.preventDefault()
                          toggle()
                          setNote('')
                          setSelectedReason([])
                    
                          setSelectedUsers([])
                          
                        }}
                      />
                       <LiveGrid>
                        <div style={{gridColumn: 1}}>
            
                <TypeOfClassList>
                        <li className="radio">
          <label>
            <input
              type="radio"
              value="livestream"
              checked={selectedType === "livestream"}
              onChange={(e) => onValueChange(e)}
            />
             LiveStream 
          </label>
        </li>
        <li className="radio">
          <label>
            <input
              type="radio"
              value="private"
              checked={selectedType === "private"}
              onChange={(e) => onValueChange(e)}
            />
            Private Class
          </label>
        </li>
        <li className="radio">
          <label>
            <input
              type="radio"
              value="personal"
              checked={selectedType === "personal"}
              onChange={(e) => onValueChange(e)}
            />
            Personal Scheduling
          </label>
        </li>
                      
                          
                        </TypeOfClassList>
                        
                         <TimeChunk> <div className="timer"><img style={{paddingRight: '5px'}} src="../static/img/alarm-clock.ico" />{selectedTime}</div>    
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
             
               
                      </div>  
                       <div style={{gridColumn: 2, textAlign: 'center'}}>             
 
                </div>
                </LiveGrid>
                      <LiveGrid>
                        <div style={{gridColumn: 1, margin: '30px 0 20px'}}>
              
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      type="select"
                      value={selectedReason}
                      isClearable={true}
                      placeholder="Select a Class"
                      onChange={(e) => handleSelectedOption(e)}
                  
                      isSearchable={true}
                      name="reason"
                      options={reasons}
                    /></div>
                    
                      <div style={{gridColumn: 2, margin: '30px 0 20px'}}>
             
                    <input
                      className="alt-title"
                      placeholder=" Or Create a One Time Title Here"
                      disabled={selectedReason}
                      value={altTitle}
                 
                  
                      onChange={(e) => setAltTitleHandler(e)}
                      
                 
                      name="alternateTitle"
        
                    /></div>
                    </LiveGrid>
                    <div style={{margin: 0 , transform: 'translateY(-10px)'}} >
                    <span  onClick={() => addDescriptionhandler()} style={{ cursor: 'pointer' }} >+ click to add custom description</span></div>
                    {addDescription && <LiveGrid><textarea  value={note} onChange={setNoteHandler} style={{gridColumn: '1/3', height: '70px'}}></textarea></LiveGrid>}
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



   
   
   

 