import Router from 'next/router'
import React, { useState } from 'react'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import Slider, {createSliderWithTooltip, SliderTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
import { format } from 'date-fns'
import { useMutation, useQuery } from '@apollo/client'
import SickButton from './styles/SickButton'
import Error from './ErrorMessage'
import { STREAMS_ADMIN_QUERY } from './AdminCalendarAlt'
import { STREAMS_QUERY } from './DashboardComponent'
import { REASONS_QUERY } from './UpdateScheduleSettings'
import MultiSelectEquipment from './MultiSelectEquipment'
import MultiTag from './MultiTag'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const CREATE_CLASS_MUTATION = gql`
  mutation CREATE_CLASS_MUTATION(
    $name: String
    $reason: ID!
    $price: Int
    $date: String
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
      message
    }
  }
`

const Background = styled.div`
  background: rgba(20, 20, 20, 0.8);
  height: 100%;
  top: 0;
  left: 0;

  width: 100%;
  position: fixed;
  z-index: 10000;
`
const Wrap = styled.div`
  display: flex;
  position: relative;
  margin: 10px;
  .shell {
    width: 100%;
    cursor: pointer;
    background: ${(props) => props.theme.second};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin: 0px;
    padding: 20px;
    border-radius: 5px;
    color: white;
    box-shadow: 0px 5px 5px -3px rgba(20, 20, 20, 0.5);
    transition: 0.3s;
    &:hover {
      transform: scale(1.01);
    }
  }
  p {
    text-align: center;
    margin: 2px;
    line-height: 18px;
    margin-top: 5px;
    outline: none;
    cursor: pointer;
    font-family: 'Bison';
    letter-spacing: 3px;
    font-size: 20px;
  }
  img {
    color: white;
    height: 30px;
    width: 30px;
  }
`

const Mode = styled.div`
  box-shadow: 0px 10px 5px -3px rgba(20, 20, 20, 0.2);
  z-index: 13000;
  position: relative;
  font-size: 12px;
  display: flex;

  height: 500px;
  padding: 10px;
  font-family: 'Bison';
  letter-spacing: 2px;
  font-size: 17px;
  min-width: 600px;

  border-radius: 15px;
  margin: 0 auto;
  background: white;

  .scroller {
    position: absolute;
    transform: translateY(5px);
    height: 90%;
    width: 98%;
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 0 auto;
  }
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
.foo {
  z-index: 99000;
 color: white;
font-size: 28px;
}
  .actions {
    width: 100%;
    padding: 10px 5px;
    margin: auto;
    text-align: center;
  }
  .close {
    cursor: pointer;
    position: fixed;
    z-index: 999999;
    display: block;
    outline: none;
    padding: 2px 2px;
    border: none;
    line-height: 20px;
    left: 10px;
    top: 10px;
    height: 30px;
    width: 30px;
    font-size: 24px;
    background: #f8b0b0;
    border-radius: 50%;
  }
`
const SignUpTitle = styled.h3`
  font-family: 'Bison';
  font-size: 28px;
  text-align: left;
  margin: 0 0 26px 0px;
  color: ${(props) => props.theme.second};
`
const Pricing = styled.div`
  display: flex; 
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  color: white;
 
`
const ShowPrice = styled.button`
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
  color: white;
  user-select: none;
  padding: 0;
  border: none;
  background:  rgba(20, 120, 20, 1) ;
  border-radius: 5px;
  height: 40px;
  width: 40px;
  transition: .3s;
  font-size: 18px;
  font-family: 'Bison';
  &:hover {
    opacity: .8;
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
function ModalFrame() {
  
  const [equipmentId, setEquipmentSearch] = useState('')
  const [isSelected, setIsSelected] = useState('')
  const [tagsId, setTagsSearch] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [priceState, setPriceState] = useState('1000')
  const [selectedOption, setSelectedOption] = useState('')
  const [sliderValue, setSliderValue] = useState(10)


  const onSliderChange = v => {
  console.log(v)
    setSliderValue(v)
  };
  const onSliderAfterChange = v => {
    console.log(v)
    const thePrice = v + '00'
    setPriceState(thePrice)
    setIsSelected('$' + v)
  }
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
console.log(inputs.date)
  const [createNewClass, { loading, error }] = useMutation(
    CREATE_CLASS_MUTATION,
    {
      variables: {
        date: inputs.date,
        reason: selectedOption && selectedOption.value,
        price: parseInt(priceState),
        name: selectedOption && selectedOption.label,
        equipment: selectedEquipment,
        tags: selectedTags,
      },
      refetchQueries: [
        {
          query: STREAMS_QUERY,
          variables: { date: format(new Date(), 'yyyy-MM-dd') },
        },
        {
          query: STREAMS_ADMIN_QUERY,
          variables: { date: format(new Date(), 'yyyy-MM-dd') },
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
    <Wrap>
      <Popup
        trigger={
          <div className="shell">
            {' '}
            <img src="../static/img/plus.svg" />
            <p>schedule livestream</p>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <>
            <Background />
            <Mode>
              {' '}
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="scroller">
                <div className="header">
                  <SignUpTitle> Class Scheduler</SignUpTitle>
                </div>

                <div className="content">
                  <form
               
                    onSubmit={async (e) => {
                      e.preventDefault()
                      await createNewClass()
                      Router.push({
                        pathname: '/dashboard',
                      })
                    }}
                  >
                    <Error error={error} />
                    <label htmlFor="date">
                      SELECT DATE &amp; TIME
                      <input
                        id="date"
                        name="date"
                        type="datetime-local"
                        required
                        defaultValue={inputs.date}
                        onChange={handleChange}
                      />
                    </label>
                    <p
                      style={{
                        borderTop: '2px solid lightgrey',
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
                      onAfterChange={onSliderAfterChange}
                      tipProps={{ overlayClassName: 'foo'  }}
                      marks={{ 0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:11, 12:12, 13:13, 14:14, 15:15, 16:16, 17:17, 18:18, 19:19, 20:20 }}
        defaultValue={sliderValue}
        trackStyle={{borderRadius: 0,  backgroundColor: 'green', height: 10 }}
        handleStyle={{
          borderColor: 'green',
          height: 20,borderRadius: 0,
          width: 10,
          marginLeft:0,
          marginTop: -5,
          backgroundColor: 'green',
        }}
        railStyle={{ borderRadius: 0,backgroundColor: '#f8b0b0', height: 10 }}
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
              </div>
            </Mode>
          </>
        )}
      </Popup>
    </Wrap>
  )
}

export default ModalFrame
export { CREATE_CLASS_MUTATION }
