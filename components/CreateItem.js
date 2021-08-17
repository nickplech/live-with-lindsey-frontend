import React, { useState, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'
import formatMoney from '../lib/formatMoney'
import useForm from '../lib/useForm'
import { format } from 'date-fns'
import styled from 'styled-components'
import Form from './styles/Form'
import SickButton from './styles/SickButton'
import Error from './ErrorMessage'
import { STREAMS_ADMIN_QUERY } from './AdminCalendarAlt'
import { REASONS_QUERY } from './UpdateScheduleSettings'
import SelectEquipment from './SelectEquipment'
import Select from 'react-select'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $reason: ID!
    $price: Int
    $date: String
    $required: [ID!]
  ) {
    createItem(
      data: {
        reason: { connect: { id: $reason } }
        price: $price
        date: $date
        required: { disconnectAll: true, connect: [{ id: $required }] }
      }
    ) {
      id
      date
      price
      required {
        id
        name
        description
        image {
          publicUrlTransformed
        }
      }
      reason {
        id
        color
        classLength
        name
        classDescription
      }
    }
  }
`
const Wrap = styled.div`
  margin: 0px auto;
  width: 90%;

  input,
  select {
    font-family: 'PT Sans', sans-serif;
    font-size: 2.2rem;
    display: block;
    padding: 0.5rem 1rem;
  }
`
const SignUpTitle = styled.h3`
  font-family: 'Felix';
  font-size: 32px;
  text-align: center;
  /* line-height: 26px; */
  margin: 0 0 26px 0;
  color: ${(props) => props.theme.second};
`
const ShowPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0;
  letter-spacing: 3px;
  color: white;
  background: rgba(20, 120, 20, 1);
  border-radius: 50%;
  height: 80px;
  width: 80px;
  font-size: 36px;
  font-family: 'Bison';
`
const UpdatePrice = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  color: white;
  button {
    letter-spacing: 3px;
    font-size: 16px;
    font-family: 'Comfortaa';
    outline: none;
    height: 40px;
    width: 70px; /* background: rgba(20,120,20,1); */
    max-width: 70px;
    min-width: 70px;
    cursor: pointer;
    margin: 20px 10px;
    background: transparent;
    border-radius: 5px;
    color: rgba(20, 120, 20, 1);
    padding: 0;
    border: 3px solid rgba(20, 120, 20, 1);
    &:hover {
      transform: scale(1.1);
      background: rgba(20, 120, 20, 0.3);
    }
  }
  .row1 {
    grid-row: 1;
  }
`

function CreateItem() {
  const [equipmentId, setEquipmentId] = useState('')
  const [priceState, setPriceState] = useState(1000)
  const [selectedOption, setSelectedOption] = useState('')

  function handleSelectedOption(e) {
    setSelectedOption(e)
  }
  function changeToPrice(e) {
    e.preventDefault()
    const { value } = e.target
    setPriceState(value)
  }
  function handleEquipmentId(e) {
    setEquipmentId(e)
  }

  const { inputs, handleChange } = useForm({
    date: new Date(),
    reason: '',
  })

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    variables: {
      date: inputs.date,
      reason: selectedOption && selectedOption.value,
      price: parseInt(priceState),
      required: equipmentId && equipmentId.value,
    },
    refetchQueries: [
      {
        query: STREAMS_ADMIN_QUERY,
        variables: { date: format(new Date(), 'yyyy-MM-dd') },
      },
    ],
  })

  const { data } = useQuery(REASONS_QUERY)
  if (!data) return null
  const optionList = data.allReasons.map((reason, i) => {
    const value = reason.id
    const label = reason.name
    return { value, label }
  })
  console.log(equipmentId)
  return (
    <Wrap>
      <form
        data-testid="form"
        onSubmit={async (e) => {
          e.preventDefault()
          await createItem()
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <SignUpTitle> Class Scheduler</SignUpTitle>
          <Error error={error} />

          <label htmlFor="date">
            DATE &amp; TIME
            <input
              id="date"
              name="date"
              type="datetime-local"
              required
              defaultValue={inputs.date}
              onChange={handleChange}
            />
          </label>
          <label>
            SELECT A CLASS
            <Select
              style={{ color: 'black' }}
              className="basic-single"
              classNamePrefix="select"
              type="select"
              value={selectedOption.label}
              isClearable={true}
              onChange={(e) => handleSelectedOption(e)}
              isSearchable={true}
              name="reason"
              options={optionList}
            />
          </label>
          <MultiSelectEquipment
            handleEquipmentId={handleEquipmentId}
            equipmentId={equipmentId}
          />
          <ShowPrice>
            <p>{formatMoney(priceState)}</p>
          </ShowPrice>
          <UpdatePrice>
            <button
              style={{
                color: 'rgba(20,120,20,1)',
                border: '3px solid rgba(20,120,20,1)',
              }}
              value={100}
              className="row1"
              onClick={(e) => changeToPrice(e)}
            >
              $1
            </button>
            <button
              style={{
                color: 'rgba(20,120,20,1)',
                border: '3px solid rgba(20,120,20,1)',
              }}
              value={500}
              className="row1"
              onClick={(e) => changeToPrice(e)}
            >
              $5
            </button>
            <button
              style={{
                color: 'rgba(20,120,20,1)',
                border: '3px solid rgba(20,120,20,1)',
              }}
              value={1000}
              className="row1"
              onClick={(e) => changeToPrice(e)}
            >
              $10
            </button>
          </UpdatePrice>

          <SickButton
            disable={loading}
            style={{ marginTop: '50px' }}
            type="submit"
          >
            CREATE CLASS
          </SickButton>
        </fieldset>
      </form>
    </Wrap>
  )
}

export default CreateItem
export { CREATE_ITEM_MUTATION }
