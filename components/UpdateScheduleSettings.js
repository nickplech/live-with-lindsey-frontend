import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Form3 from './styles/Form3'
import gql from 'graphql-tag'
 
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
    
      classDescription
      classLength
    }
  }
`
const CREATE_REASON_MUTATION = gql`
  mutation CREATE_REASON_MUTATION(
    $name: String!
    $classDescription: String
    
    $classLength: String!
  ) {
    createReason(
      data: {
        name: $name
        classDescription: $classDescription
       
        classLength: $classLength
      }
    ) {
      id
      classDescription
      name
 
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
 
const optionsList = [
  { value: '5 min', label: '5 min' },
  { value: '10 min', label: '10 min' },
  { value: '15 min', label: '15 min' },
  { value: '20 min', label: '20 min' },
  { value: '25 min', label: '25 min' },
  { value: '30 min', label: '30 min' },
  { value: '35 min', label: '35 min' },
  { value: '40 min', label: '40 min' },
  { value: '45 min', label: '45 min' },
  { value: '50 min', label: '50 min' },
  { value: '55 min', label: '55 min' },
  { value: '60 min', label: '60 min' },
  { value: '65 min', label: '65 min' },
  { value: '70 min', label: '70 min' },
  { value: '75 min', label: '75 min' },
  { value: '80 min', label: '80 min' },
  { value: '85 min', label: '85 min' },
  { value: '90 min', label: '90 min' },
]

 
 

function UpdateScheduleSettings() {
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedLength, setSelectedLength] = useState('60 min')

  const handleSelectedLength = (e) => {
    console.log(e)
    setSelectedLength(e)
  }

 

  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    classDescription: '',
  })

  const needsColor = inputs.name.length < 1

  const { data, loading } = useQuery(REASONS_QUERY)

  const [createReason, { called, error }] = useMutation(
    CREATE_REASON_MUTATION,
    {
      variables: {
        ...inputs,
        classLength: selectedLength.value,
  
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

        <fieldset disabled={loading} aria-busy={loading}>
                  <Error error={error} />
        {!error && !loading && called && (
          <Submitted>New Class Type Created SuccessFully!</Submitted>
        )}
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
