import React from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import { ALL_TAGS_QUERY } from './UpdateTagSettings'

const DELETE_TAG_MUTATION = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
    }
  }
`

const BigButton = styled.a`
  font-size: 1.8rem;
  background: none;
  border: none;
  color: white;
  margin: 0 4px 0 10px;

  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`

function DeleteTag(props) {
  const [deleteTag, { loading, error, called }] = useMutation(
    DELETE_TAG_MUTATION,
    {
      variables: { id: props.id },
      refetchQueries: [{ query: ALL_TAGS_QUERY }],
    },
  )
  error && <Error error={error} />
  return (
    <BigButton
      style={{ color: props.color === '#F8F8FF' && 'black' }}
      disabled={loading}
      onClick={() => {
        if (confirm(`Sure you want to delete ${props.name}?`)) {
          deleteTag().catch((err) => alert(err.message))
        }
      }}
      title="Delete Tag"
    >
      &times;
    </BigButton>
  )
}

export default DeleteTag
export { DELETE_TAG_MUTATION }
