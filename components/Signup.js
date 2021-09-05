import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { StepList } from './StepList'
import { Step } from './Step'
import Form2 from './styles/Form2'
import Router from 'next/router'
import Error from './ErrorMessage'
import styled from 'styled-components'
import { CURRENT_USER_QUERY } from './User'
import formatPhoneNumber from '../lib/formatPhone'

import useForm from '../lib/useForm'
import ScrollToAgree from './ScrollToAgree'
 

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $firstName: String!
    $lastName: String!
    $cellPhone: String!
    $businessName: String!
    $email: String!
    $password: String!
    $liabilityWaiver: String!
  ) {
    createUser(
      data: {
        firstName: $firstName
        lastName: $lastName
        cellPhone: $cellPhone
        businessName: $businessName
        email: $email
        password: $password
        liabilityWaiver: { create: { status: $liabilityWaiver } }
      }
    ) {
      id
      firstName
      lastName
      cellPhone
      hasPassedTwoFac
      businessName
      email
    }
  }
`
const Background = styled.div`
  background: #ed4264;
  height: calc(100% - 60px);
  width: 100%;
  position: absolute;
  opacity: 0.4;
  background: -webkit-linear-gradient(to bottom, #ffedbc, #ed4264);
  background: linear-gradient(to bottom, #ffedbc, #ed4264);
`
const SignUpTitle = styled.h3`
  font-family: 'Felix';
  font-size: 36px;
  /* line-height: 26px; */
  margin: 26px auto;
  z-index: 1000;
  position: relative;
  color: ${(props) => props.theme.second};
`
const ValidatePass = styled.p`
  margin: 2px;
  padding: 0;
  font-size: 12px;
  color: red;
  opacity: 0.8;
`
const StyledSignUpStepper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
`

function Signup() {
  const [hasAgreedToWaiver, setHasAgreedToWaiver] = useState(null)
  const [phoneValue, setPhoneValue] = useState('')
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    cellPhone: '',
    businessName: '',
  })
  const [signup, { error, loading, data }] = useMutation(SIGNUP_MUTATION, {
    variables: { ...inputs, liabilityWaiver: 'AGREED' },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  const isCompleted = inputs.firstName && inputs.firstName.length
  const isCompletedLastName = inputs.lastName && inputs.lastName.length
  const isCompletedCellPhone = phoneValue.length > 13
  const isCompletedDisplayName =
    inputs.businessName && inputs.businessName.length
  console.log(
    isCompleted,
    isCompletedLastName,
    isCompletedCellPhone,
    isCompletedDisplayName,
  )
  function isComplete(isCompleted, isCompletedLastName, isCompletedCellPhone, isCompletedDisplayName) {
    if(isCompleted === true && isCompletedLastName === true && isCompletedCellPhone === true && isCompletedDisplayName === true) {
      return true
    }
    return false
  }
  return (
    <>
      <StyledSignUpStepper>
        <SignUpTitle>Create an Account</SignUpTitle>
        <Form2
          method="post"
          onSubmit={async (e) => {
            e.preventDefault()
            const doesMatch =
              inputs.password.length &&
              inputs.confirmPassword.length &&
              inputs.password === inputs.confirmPassword
            if (doesMatch) {
              const res = await signup()
              console.log(res)
              Router.push({
                pathname: `/twoFactor/${res.data.createUser.id}`,
              })
            }
            return new Error('Please make sure your passwords match!')
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <StepList
              firstName={inputs.firstName}
              lastName={inputs.lastName}
              cellPhone={inputs.cellPhone}
              businessName={inputs.businessName}
              error={error}
            >
              <Step isComplete={isComplete}>
                <label htmlFor="firstName" style={{ marginTop: '25px' }}>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={
                      inputs.firstName.charAt(0).toUpperCase() +
                      inputs.firstName.slice(1).trim()
                    }
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="lastName">
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={
                      inputs.lastName.charAt(0).toUpperCase() +
                      inputs.lastName.slice(1).trim()
                    }
                    onChange={handleChange}
                  />
                </label>{' '}
                <label htmlFor="lastName">
                  Display Name
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Display Name"
                    required
                    value={inputs.businessName}
                    onChange={handleChange}
                  />
                </label>{' '}
                <label htmlFor="cellPhone">
                  Phone Number
                  <input
                    type="phone"
                    id="cellPhone"
                    name="cellPhone"
                    className="short"
                    minlength="14"
                 
                    maxlength="14"
                    placeholder="(###)###-####"
                    required
                    value={formatPhoneNumber(inputs.cellPhone)}
                    onChange={handleChange}
                  />
                </label>
              </Step>
              <Step>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                    value={inputs.email}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    autoComplete="new-password"
                    value={inputs.password}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  Confirm Your Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    value={inputs.confirmPassword}
                    onChange={handleChange}
                  />
                </label>
              </Step>
              <Step>
                <ScrollToAgree
                  hasAgreedToWaiver={hasAgreedToWaiver}
                  setHasAgreedToWaiver={setHasAgreedToWaiver}
                />
              </Step>
            </StepList>
          </fieldset>
        </Form2>
      </StyledSignUpStepper>
    </>
  )
}

export default Signup
export { SIGNUP_MUTATION }
