import React from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { ALL_USERS_QUERY } from './Clients'
import { PAGINATION_QUERY } from './Pagination'

const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER_MUTATION($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

function update(cache, payload) {
  cache.modify('ROOT_QUERY', {
    allUsers(users, { readField }) {
      return users.filter(
        (user) => readField('id', user) !== payload.data.deleteUser.id,
      )
    },
  })
}

function DeleteUser({ id, children }) {
  const [deleteUser, { error }] = useMutation(DELETE_USER_MUTATION, {
    variables: { id },
    update,
    awaitRefetchQueries: true,
    refetchQueries: [{ query: ALL_USERS_QUERY }],
  })
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this user?')) {
          deleteUser().catch((err) => {
            alert(err.message)
          })
        }
      }}
    >
      {children}
    </button>
  )
}

export default DeleteUser
