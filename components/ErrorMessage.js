
import React from 'react'
import styled from 'styled-components'
const ErrorStyles = styled.div`
  padding: 1rem;
  background: white;
  font-family: 'Bison';
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  background: white;
  letter-spacing: 2px;
  p {
    margin: 0;
    font-weight: 100;  font-family: 'Bison';

  color: red;
  }
  strong {
    margin-right: 1rem;
  }
`

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-testid="graphql-error">
          <strong>hmm...</strong>
          {error.message.replace('GraphQL error: ' && '[passwordAuth:secret:mismatch]' , '') }
        </p>
      </ErrorStyles>
    ))
  }
  return (
    <ErrorStyles>
      <p data-testid="graphql-error">
        <strong>hmm...</strong>
          {error.message.replace('GraphQL error: ' && '[passwordAuth:secret:mismatch]' , '') }
      </p>
    </ErrorStyles>
  )
}

export default DisplayError
