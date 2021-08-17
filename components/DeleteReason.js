import React from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { REASONS_QUERY } from './UpdateScheduleSettings'

const DELETE_REASON_MUTATION = gql`
  mutation deleteReason($id: ID!) {
    deleteReason(id: $id) {
      id
    }
  }
`

const BigButton = styled.a`
  font-size: 1.8rem;
  background: none;
  border: none;
  color: ${(props) => props.color};
  margin: 0 4px 0 10px;

  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`

function DeleteReason(props) {
  const [deleteReason, { loading, error, called }] = useMutation(
    DELETE_REASON_MUTATION,
    {
      variables: { id: props.id },
      refetchQueries: [{ query: REASONS_QUERY }],
    },
  )

  return (
    <BigButton
      disabled={loading}
      onClick={() => {
        if (
          confirm(`ATTENTION:  Are you sure you want to delete ${props.name}?`)
        ) {
          deleteReason().catch((err) => alert(err.message))
        }
      }}
      title="Delete Reason"
    >
      &times;
    </BigButton>
  )
}

export default DeleteReason
export { DELETE_REASON_MUTATION }
