import React from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import Form2 from './styles/Form2'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import Link from 'next/link'

import styled from 'styled-components'
import SickButton from './styles/SickButton'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
        email
        firstName
        lastName
      }
    }
  }
`
const Background = styled.div`
  background: #ed4264;
  height: 100%;
  width: 100%;
  position: absolute;
  opacity: 0.4;
  background: -webkit-linear-gradient(to bottom, #ffedbc, #ed4264);
  background: linear-gradient(to bottom, #ffedbc, #ed4264);
`
const Margin = styled.div`
  margin: ${(props) => (props.margin ? '150px 25px 0 25px' : '0 25px')};
  h2 {
    font-family: 'Felix';
    font-size: 24px;
    line-height: 26px;
    margin: 10px auto;
    margin-bottom: 45px;
    color: ${(props) => props.theme.second};
    @media (min-width: 768px) {
      font-size: 32px;
      line-height: 26px;
      margin: 10px auto;
      margin-bottom: 45px;
    }
  }
`

const StyledP = styled.p`
  margin-bottom: 0;
  margin-top: 20px;
  font-family: 'Comfortaa';
  cursor: pointer;
  transition: 300ms;
  &:hover {
    transform: translateX(5px);
  }
`

function SignIn(props) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  })
  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  return (
    <>
      <Margin margin={props.margin}>
        <Form2
          method="post"
          onSubmit={async (e) => {
            e.preventDefault()
            const res = await signin()
            console.log(res)
            // var socket = await io()
            // socket.on(
            //   'msg',
            //   function (message) {
            //     console.log(message)
            //   },
            //   function (err) {
            //     console.error(err)
            //     throw new Error(err)
            //   },
            // )
            resetForm()
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign Into Your Account</h2>
            <Error error={error} />
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={inputs.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </label>
            <SickButton type="submit">Sign In!</SickButton>

            <Link href="/resetrequest">
              <StyledP>Forget Your Password?</StyledP>
            </Link>
          </fieldset>
        </Form2>
      </Margin>
    </>
  )
}

export default SignIn
export { SIGNIN_MUTATION }
