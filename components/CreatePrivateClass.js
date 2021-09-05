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

import MultiSelectEquipment from './MultiSelectEquipment'

import Select from 'react-select'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const CREATE_PRIVATE_CLASS_MUTATION = gql`
  mutation CREATE_PRIVATE_CLASS_MUTATION(

    $price: Int
    $date: String
    $equipment: [ID!]
   
    $userId: ID!
  ) {
    createPrivate(

      price: $price
      date: $date
      equipment: $equipment
     
userId: $userId
    ) {
      message
    }
  }
`

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    allUsers (orderBy: "lastName") {
      id
     firstName
     lastName
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
function CreatePrivateClass() {
  
  const [equipmentId, setEquipmentSearch] = useState('')
  const [isSelected, setIsSelected] = useState('')

  const [selectedEquipment, setSelectedEquipment] = useState([])

  const [priceState, setPriceState] = useState('1000')
  const [selectedOption, setSelectedOption] = useState('')

  const [privateClassUser, setPrivateClassUser] = useState()



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


  const { inputs, handleChange } = useForm({
    date: new Date(),
    reason: '',
  })
console.log(inputs.date)
  const [createPrivate, { loading, error }] = useMutation(
    CREATE_PRIVATE_CLASS_MUTATION,
    {
      variables: {
        date: inputs.date,

        price: parseInt(priceState),

        equipment: selectedEquipment,
   
        userId: privateClassUser
      },
      refetchQueries: [
  
        {
          query: STREAMS_ADMIN_QUERY,
          variables: { date: format(new Date(), 'yyyy-MM-dd') },
        },
      ],
    },
  )

  const { data } = useQuery(ALL_USERS_QUERY)
  if (!data) return null
  const optionList = data.allUsers.map((user, i) => {
    const value = user.id
    const label = `${user.lastName, user.firstName}`
    return { value, label }
  })
  

  const needsClass = selectedOption && selectedOption.length
  const needsDateTime = inputs.date && inputs.date !== null

  return (
    <Wrap>

                <div className="header">
                  <SignUpTitle>Private Class Scheduler</SignUpTitle>
                </div>

                <div className="content">
                  <form
               
                    onSubmit={async (e) => {
                      e.preventDefault()
                      await createPrivate()
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
                      SELECT A CLIENT
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
                      name="client"
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
              
    </Wrap>
  )
}

export default CreatePrivateClass
export { CREATE_PRIVATE_CLASS_MUTATION }
