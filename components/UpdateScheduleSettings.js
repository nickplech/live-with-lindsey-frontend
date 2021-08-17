import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Form3 from './styles/Form3'
import gql from 'graphql-tag'
import chroma from 'chroma-js'
import Select from 'react-select'
import Error from './ErrorMessage'
import styled from 'styled-components'
import SickButton from './styles/SickButton'
import Reason from './Reason'
import useForm from '../lib/useForm'

const REASONS_QUERY = gql`
  query REASONS_QUERY {
    allReasons {
      id
      name
      color
      classDescription
      classLength
    }
  }
`
const CREATE_REASON_MUTATION = gql`
  mutation CREATE_REASON_MUTATION(
    $name: String!
    $classDescription: String
    $color: String!
    $classLength: String!
  ) {
    createReason(
      data: {
        name: $name
        classDescription: $classDescription
        color: $color
        classLength: $classLength
      }
    ) {
      id
      classDescription
      name
      color
      classLength
    }
  }
`

const Inner = styled.div`
  text-align: left;
  max-width: ${(props) => props.theme.innerWidth};
  margin: 0 auto;
  padding: 2rem 0;
  padding-top: 0;
  position: relative;

  transform: translateY(20px);
  .color {
    margin: 15px 0;
  }
  .dates {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    opacity: 0.5;
    &:focus {
      opacity: 1;
    }
    &:active {
      opacity: 1;
    }
  }
  .content {
    padding-top: 50px;
    overflow-y: hidden;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    width: 98%;
  }
`
const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const Types = styled.h2`
  display: inline-flex;
`

const Submitted = styled.p`
  color: green;
  background: white;
  padding: 15px 15px;
  border-left: 5px solid green;
`
const colourOptions = [
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
  { value: 'black', label: 'Black', color: '#000000' },
]
const optionsList = [
  { value: '15 min', label: '15 min' },
  { value: '30 min', label: '30 min' },
  { value: '45 min', label: '45 min' },
  { value: '60 min', label: '60 min' },
]

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
})
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color)
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
    }
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
}

function UpdateScheduleSettings() {
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedLength, setSelectedLength] = useState('60 min')

  const handleSelectedLength = (e) => {
    console.log(e)
    setSelectedLength(e)
  }

  const handleSelectedOption = (e) => {
    console.log(e)
    setSelectedOption(e)
  }

  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    classDescription: '',
  })

  const needsColor = selectedOption.length < 1

  const { data, loading } = useQuery(REASONS_QUERY)

  const [createReason, { called, error }] = useMutation(
    CREATE_REASON_MUTATION,
    {
      variables: {
        ...inputs,
        classLength: selectedLength.value,
        color: selectedOption.color,
      },
      refetchQueries: [
        {
          query: REASONS_QUERY,
        },
      ],
    },
  )

  return (
    <Inner>
      <Form3
        onSubmit={async (e) => {
          e.preventDefault()
          await createReason()
          await clearForm()
        }}
      >
        <Error error={error} />
        {!error && !loading && called && (
          <Submitted>New Class Type Created SuccessFully!</Submitted>
        )}
        <fieldset disabled={loading} aria-busy={loading}>
          <>
            <Flex>
              <Types>Existing Class Types:</Types>
            </Flex>
            <Flex style={{ padding: '0' }}>
              {!data
                ? null
                : data.allReasons.map((reason) => {
                    return <Reason key={reason.id} reason={reason} />
                  })}
            </Flex>
            <Types>Create New Class Types:</Types>
            <label htmlFor="name">
              Name of Class Type
              <input
                type="text"
                id="name"
                name="name"
                required={true}
                placeholder="Name"
                autoComplete="off"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>{' '}
            <label>
              Select Color to Identify Class Type
              <Select
                className="color"
                type="select"
                id="color"
                name="color"
                required={true}
                styles={colourStyles}
                value={selectedOption}
                onChange={(e) => handleSelectedOption(e)}
                options={colourOptions}
              />
            </label>
            <label style={{ marginTop: '25px' }}>
              Length of Class
              <Select
                type="select"
                value={selectedLength}
                onChange={(e) => handleSelectedLength(e)}
                name="length"
                options={optionsList}
              />
            </label>
            <label htmlFor="classDescription" style={{ marginTop: '25px' }}>
              Class Description:
              <textarea
                resize="false"
                type="text"
                required={true}
                id="classDescription"
                name="classDescription"
                value={inputs.classDescription}
                onChange={handleChange}
              />
            </label>
            <div>
              <SickButton disabled={needsColor} type="submit">
                Creat{loading ? 'ing' : 'e'} Type
              </SickButton>
            </div>
          </>
        </fieldset>
      </Form3>
    </Inner>
  )
}

export default UpdateScheduleSettings
export { CREATE_REASON_MUTATION, REASONS_QUERY }
