import React from 'react'
import { useMutation } from '@apollo/client'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import Form2 from './styles/Form2'
import Error from './ErrorMessage'
import styled from 'styled-components'
import SickButton from './styles/SickButton'
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`
const Submitted = styled.p`
  color: green;
  background: white;
  padding: 15px 15px;
  font-family: 'Bison';

  border-left: 5px solid green;
`

const Thinner = styled.div`
  max-width: 600px;
  margin: 150px auto;
  h2 {
    font-family: 'Felix';
    font-size: 32px;
    line-height: 26px;
    margin: 10px auto;
    margin-bottom: 32px;
    color: ${(props) => props.theme.second};
  }
`

function RequestReset() {
  const { inputs, handleChange, clearForm } = useForm({ email: '' })
  const [requestReset, { error, loading, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email: inputs.email,
      },
    },
  )

  return (
    <Thinner>
      <Form2
        method="post"
        onSubmit={async (e) => {
          e.preventDefault()
          await requestReset()
          clearForm()
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Reset Your Password?</h2>
          <Error error={error} />
          {!error && !loading && called && (
            <Submitted>Sent! Check your email for a reset link!</Submitted>
          )}
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <SickButton disabled={!inputs.email.length} type="submit">
            Request Reset!
          </SickButton>
        </fieldset>
      </Form2>
    </Thinner>
  )
}

export default RequestReset
export { REQUEST_RESET_MUTATION }
