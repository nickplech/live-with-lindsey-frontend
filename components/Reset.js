import React from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Form2 from './styles/Form2'
import Error from './ErrorMessage'
import useForm from '../lib/useForm'
import styled from 'styled-components'
import { CURRENT_USER_QUERY } from './User'
import SickButton from './styles/SickButton'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      message
    }
  }
`

const Inner = styled.div`
  text-align: left;
  max-width: ${(props) => props.theme.innerWidth};
  margin: 0 auto;
  padding: 2rem;
  padding-top: 0;
  .dates {
    font-family: montserrat, sans-serif;
    text-transform: uppercase;
    opacity: 0.5;
    &:focus {
      opacity: 1;
    }
    &:active {
      opacity: 1;
    }
    h2 {
      font-family: 'Felix';
      font-size: 32px;
      line-height: 26px;
      margin: 10px auto;
      margin-bottom: 32px;
      color: ${(props) => props.theme.second};
    }
  }
`
const Submitted = styled.p`
  color: green;
  background: white;
  padding: 15px 15px;
  border-left: 5px solid green;
`
function Reset({ resetToken }) {
  const { inputs, handleChange, resetForm } = useForm({
    password: '',
    confirmPassword: '',
  })
  const [resetPassword, { error, loading, data }] = useMutation(
    RESET_MUTATION,
    {
      variables: {
        resetToken,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  )
  return (
    <Inner>
      <Form2
        style={{ margin: '50px auto' }}
        method="post"
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await resetPassword()
          console.log(res)
          resetForm()
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Reset Your Password</h2>
          {data && data.resetPassword && (
            <Submitted>{data.resetPassword.message}</Submitted>
          )}
          <Error error={error} />
          <label htmlFor="password">
            New Password
            <input
              type="password"
              name="password"
              placeholder="password"
              value={inputs.password}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="confirmPassword">
            Confirm New Password
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          <SickButton type="submit">Reset Your Password!</SickButton>
        </fieldset>
      </Form2>
    </Inner>
  )
}

export default Reset
export { RESET_MUTATION }
