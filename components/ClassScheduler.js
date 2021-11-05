import Router from 'next/router'
import React, { useState } from 'react'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import Slider, {createSliderWithTooltip, SliderTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import { startOfWeek, formatISO, format,eachDayOfInterval, endOfWeek } from 'date-fns'
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

 
 

const Mode = styled.div`
  box-shadow: 0px 10px 5px -3px rgba(20, 20, 20, 0.2);
  z-index: 13000;
  position: relative;
  font-size: 12px;

grid-column: 1/3;
  height: 100%;
  padding: 10px;
  font-family: 'Bison';
  letter-spacing: 2px;
  font-size: 17px;
width:100%;
max-width: 1200px;

  display: flex;
  min-width: 380px;
  border-radius: 15px;
  margin: 0 auto;
  background: white;

 
  .header {
    width: 100%;
    position: relative;

    font-size: 18px;
    text-align: center;
    padding: 5px;
  }
  .content {
    width: 100%;
    padding: 10px 5px;

    position: relative;
  }
 
`
const SignUpTitle = styled.h3`
  font-family: 'Bison';
  font-size: 28px;
  text-align: left;
  margin: 0 0 26px 0px;
  color: ${(props) => props.theme.second};
`
 
const ShowDate = styled.h4`
  display: flex;
  justify-content: center;
text-align: center;
  align-items: center;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  position: relative;
  margin: 5px;
  cursor: pointer;
  letter-spacing: 3px;
  color: slategrey;
  user-select: none;
  padding: 0;
  border: none;
  
 
  transition: .3s;
  font-size: 28px;
  font-family: 'Bison';
  &:hover {
    opacity: .8;
  }
`

const CenterDate = styled.div`
 
width: 100%;
 
  .react-datepicker-wrapper,
.react-datepicker__input-container,
.react-datepicker__input-container input {
  display: block;
  width: 100%;

}
`
const Schedule = styled.div`
 
/* transform: translate(190px, 560px); */
text-transform: uppercase;
z-index: 0;
display: flex;
justify-content: center;
width: 100%;
position: relative;
 
 
 .dateBox {
   border: 2px solid #f8b0b0;
   color: #fff;
   height: 65px;
   width: 70px;
   border-radius: 8px;
   justify-content: space-between;
   align-items: center;
   text-align: center;
 }
 ul {
   transition: .1s;
   list-style: none;display: flex;flex-flow: column;padding: 0; margin: 0 10px;
   &:hover {
     transform: scale(1.02);
   }
 }
 li {
   margin: 0 auto;
   padding: 0;
   line-height: 16px; color: #f8b0b0;
   &:nth-of-type(1) {
margin-bottom: 3px;
font-size: 18px;color: white;
background: #f8b0b0;border-radius: 5px 5px 0 0 ;
width: 100%;
padding: 2px 0;
   }
   &:nth-of-type(2) {
margin-bottom: 2px;
   }
   &:nth-of-type(3) {
margin-bottom: 2px;
   }
 }
`
const SliderWithTooltip = createSliderWithTooltip(Slider);
const { Handle } = SliderWithTooltip;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} %`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};
 
function percentFormatter(v) {
  return `$${v}`;
}
 
const wrapperStyle = { width:'90%', margin: '50px auto'};
function ClassScheduler() {
 
  const [sliderValue, setSliderValue] = React.useState('1000')
  const [equipmentId, setEquipmentSearch] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [tagsId, setTagsSearch] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [priceState, setPriceState] = useState('1000')
  const [selectedOption, setSelectedOption] = useState('')
  const [theWeekList, setTheWeekList] = useState([])
  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })

  const weekEnds = endOfWeek(new Date())
  const weekStart = startOfWeek(new Date(), {weekStartsOn: 1})
  const IsoWeek = formatISO(weekStart)
  const arrayOfDays = eachDayOfInterval({
    start: new Date(weekStarts),
    end: new Date(weekEnds)
  })
  
console.log(arrayOfDays)
  const handleChangeDate = (date) => {
    console.log(date)
    setSelectedDate(date)
  }
 
 
  const onSliderChange = v => {

    setSliderValue(v)
  };

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

  const { inputs, handleChange } = useForm({
    date: new Date(),
    reason: '',
  })
  

 
  const [createNewClass, { loading, error }] = useMutation(
    CREATE_CLASS_MUTATION,
    {
      variables: {
        date: selectedDate && formatISO(new Date(selectedDate)),
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
 
         
   
            <Mode>
            
           
               

                <div className="content">

                <div className="header">
                  <SignUpTitle> Live Stream Scheduler</SignUpTitle>
                </div>
                  <form
               
                    onSubmit={async (e) => {
                      e.preventDefault()
                      await createNewClass()
                      Router.push({
                        pathname: '/',
                      })
                    }}
                  >
                    <Error error={error} />
                    <label htmlFor="date">
                    <p style={{  margin: '0 auto',
 

 fontSize: '26px',
 background: '#f8b0b0', padding: '5px 0', lineHeight: '18px', textAlign: 'center',color: 'white', marginBottom: '10px'}}>
          
             {`${
               format(weekStarts, 'M/dd') +
               ' ' +
               '-' +
               ' ' +
               format(weekEnds, 'M/dd')
             }`}
           </p>
                      
  
    <div
      style={{
       
       
        display: "flex",
     flexFlow: 'column',
     alignItems: 'center'
       
      }}
    >
       <Schedule>
         {arrayOfDays.map(day => {
           return <ul className="dateBox"><li>{format(day, 'eee')}</li><li> {format(day, 'MMM')}</li> <li> {format(day, 'dd')}</li></ul>
         })}
            
          </Schedule>  
    </div>

    {/* <ShowDate>{selectedDate && format(new Date(selectedDate), 'MMMM d, yyyy h:mm aa')}</ShowDate></CenterDate> */}

                    </label>
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
                    <p
                      style={{
                        paddingTop: '10px',
                        transform: 'translateY(10px)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Add Necessary Equipment
                    </p>
                    <MultiSelectEquipment
                      removeEquipmentSearch={removeEquipmentSearch}
                      selected={selectedEquipment}
                      handleEquipmentSearch={handleEquipmentSearch}
                      equipmentId={equipmentId}
                    />
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
                    />
                    <p
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        transform: 'translateY(-10px)',
                      }}
                    >
                      *Enter up to{' '}
                      <span style={{ color: '#f8b0b0', fontSize: '16px' }}>
                        TEN
                      </span>{' '}
                      search tags
                    </p>
                    <div style={wrapperStyle}>
                    <SliderWithTooltip
                      tipFormatter={percentFormatter}
                      min={0} max={20}
                      onChange={onSliderChange}
                    
                      tipProps={{ overlayClassName: 'foo'  }}
                      marks={{ 0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:11, 12:12, 13:13, 14:14, 15:15, 16:16, 17:17, 18:18, 19:19, 20:20 }}
        defaultValue={sliderValue}
        trackStyle={{borderRadius: 0,   height: 5 }}
        handleStyle={{
          borderColor: 'grey',
          height: 20,borderRadius: 15,
          width: 5,
          marginLeft:0,
          marginTop:-5,
          backgroundColor: 'grey',
        }}
        railStyle={{ borderRadius: 0,backgroundColor: 'lightgrey', height: 5 }}
      />
                    </div>
 
                    
                    <SickButton
                      disable={
                        loading || needsClass || needsDateTime || tooManyTags
                      }
                      style={{ marginTop: '50px' }}
                      type="submit"
                    >
                      CREATE CLASS
                    </SickButton>
                  </form>
                </div>
          
            </Mode>
  
  )
}

export default ClassScheduler
export { CREATE_CLASS_MUTATION }
