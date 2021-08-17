import React from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { EQUIPMENT_QUERY } from './UpdateEquipment'

const DELETE_EQUIPMENT_MUTATION = gql`
  mutation DeleteEquipment($id: ID!) {
    deleteRequired(id: $id) {
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

function DeleteEquipment(props) {
  const [deleteRequired, { loading, error, called }] = useMutation(
    DELETE_EQUIPMENT_MUTATION,
    {
      variables: { id: props.id },
      refetchQueries: [{ query: EQUIPMENT_QUERY }],
    },
  )

  return (
    <BigButton
      disabled={loading}
      onClick={() => {
        if (
          confirm(`ATTENTION:  Are you sure you want to delete ${props.name}?`)
        ) {
          deleteRequired().catch((err) => alert(err.message))
        }
      }}
      title="Delete Equipment"
    >
      &times;
    </BigButton>
  )
}

export default DeleteEquipment
export { DELETE_EQUIPMENT_MUTATION }
