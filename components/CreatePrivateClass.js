import Router from 'next/router'
import React, { useState } from 'react'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
 import {formatISO} from 'date-fns'
import 'rc-slider/assets/index.css';
import { format } from 'date-fns'
import { useMutation, useQuery } from '@apollo/client'
import SickButton from './styles/SickButton'
import Error from './ErrorMessage'
import { STREAMS_ADMIN_QUERY } from './AdminCalendarAlt'

 

import Select from 'react-select'
 
 
import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`
const Form3 = styled.form`

  background: white;

  padding: 20px;
  margin: 20px 0;
  margin-top: 0px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  position: relative;
  h2 {
    font-family: 'Bison';

    color: ${(props) => props.theme.second};
    letter-spacing: 3px;
  }
  label {
    display: block;
    line-height: 26px;
    font-family: 'Comfortaa';
    font-size: 1.7rem;
    margin-top: 20px;
    text-transform: uppercase;
    color: ${(props) => props.theme.fourth};
  }
  input,
  select {
    width: 100%;
    padding-left: 1rem;
 
 
    font-size: 1.5rem;
 
    background: transparent;
    font-family: 'Comfortaa';
    border:   2px solid rgba(0, 0, 0, 0.2);
    /* margin-top: 0.8rem; */

   
  }
 
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &:before {
      height: 10px;
      margin-bottom: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
         ${(props) => props.theme.second} 0%,
        ${(props) => props.theme.primary} 50%,
         ${(props) => props.theme.second} 100%
      )
 }}
 .basic-single {
   font-size: 16px;    font-family: 'Comfortaa';
 
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
 
 

const CREATE_PRIVATE_CLASS_MUTATION = gql`
  mutation CREATE_PRIVATE_CLASS_MUTATION(

    $price: Int
    $date: DateTime!
    $name: String
   
    $userId: ID!
  ) {
    createNewPrivate(
      name: $name
      price: $price
      date: $date
 
     
userId: $userId
    ) {
      id
      name
      date
      user {     
        id
        firstName
         lastName
         businessName
    }
      private 
    }
  }
`

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    allUsers (orderBy: "lastName") {
      id
     firstName
     lastName
     businessName
    }
  }
`

 
const SignUpTitle = styled.h3`
  font-family: 'Bison';
  font-size: 28px;
  text-align: left;
  margin: 0 0 26px 0px;
  color: ${(props) => props.theme.second};
`

const nameOptions = [{value: '15 Minutes', label: '15 Minute Session'},{value: '30 Minutes', label: '30 Minute Session'}, {value: '45 Minutes', label: '45 Minute Session'},{value: '60 Minutes', label: '60 Minute Session'},{value: '90 Minutes', label: '90 Minute Session'}]

function CreatePrivateClass() {
   const [nameState, setNameState] = useState('')
  const [priceState, setPriceState] = useState('')
  const [usernameState, setUserNameState] = useState('')

  const [selectedOption, setSelectedOption] = useState('')




  function handleSelectedOption(e) {
    setSelectedOption(e)
    setUserNameState(e.label)
  }
  
 


  const { inputs, handleChange } = useForm({
    date: new Date(),

  })
 
  const [createNewPrivate, { loading, error }] = useMutation(
    CREATE_PRIVATE_CLASS_MUTATION,
    {
      variables: {
        date: formatISO(new Date(inputs.date)),
        name: nameState.label,
        price: parseInt(priceState),
        userId: selectedOption && selectedOption.value
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
    const label = `${user.lastName + ',' + ' ' + user.firstName +  ' ' + '(' + user.businessName + ')'}`
    return { value, label }
  })
  

  const needsClass = selectedOption && selectedOption.length
  const needsDateTime = inputs.date && inputs.date !== null

  return (
    <Inner>
    <Form3
         onSubmit={async (e) => {
            e.preventDefault()
            await createNewPrivate()
            Router.push({
              pathname: '/',
            })
          }}
    >
      <Error error={error} />
     
      <fieldset disabled={loading} aria-busy={loading}>
        

                <div className="header">
                  <SignUpTitle>Private Class Scheduler</SignUpTitle>
                </div>
                  <label htmlFor="client">
                      SELECT A CLIENT
                 
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
            </label>
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
                      <label htmlFor="classlength">
                      SELECT SESSION LENGTH
                   
                    <Select
          
                      className="basic-single"
                      classNamePrefix="select"
                      type="select"
                      value={nameState}
                      isClearable={true}
                      required
                      onChange={(e) => setNameState(e)}
                      isSearchable={true}
                      name="classlength"
                      options={nameOptions}
                    />
   </label>
          
                  
 
                    
                    <SickButton
                      disable={
                        loading || needsClass || needsDateTime 
                      }
                      style={{ marginTop: '50px' }}
                      type="submit"
                    >
                      CREATE CLASS
                    </SickButton>
              
        </fieldset>
      </Form3>
    </Inner>
  )
}

export default CreatePrivateClass
export { CREATE_PRIVATE_CLASS_MUTATION }
