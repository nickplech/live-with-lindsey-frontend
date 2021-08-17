import React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import Error from './ErrorMessage'
import { TODAYS_APPOINTMENTS_QUERY } from './CalendarStats'
import gql from 'graphql-tag'

const DELETE_APPOINTMENT_MUTATION = gql`
  mutation DELETE_APPOINTMENT_MUTATION($id: ID!) {
    deleteAppointment(id: $id) {
      id
      users {
        id
      }
    }
  }
`

const BigButton = styled.button`
  font-size: 1.8rem;
  background: white;
  border: 2px solid white;
  border-radius: 5px;
  margin-top: 10px;
  text-transform: uppercase;
  padding: 4px 8px;
  color: rgba(200, 110, 110, 0.5);
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`

function DeleteAppointment(props) {
  return (
    <Mutation
      mutation={deleteAppointment}
      variables={{ id: props.id }}
      refetchQueries={{
        query: TODAYS_APPOINTMENTS_QUERY,
        variables: { date: props.date },
      }}
    >
      {(deleteAppointment, { data, error, loading }) => {
        error && <Error error={error} />
        return (
          <BigButton
            disabled={loading}
            onClick={async () => {
              if (
                confirm(`Are you sure you want to delete this appointment?`)
              ) {
                await deleteAppointment().catch((err) => {
                  alert(err.message)
                })
              }
            }}
            title="Delete Class"
          >
            Delete Class
          </BigButton>
        )
      }}
    </Mutation>
  )
}

export default DeleteAppointment
export { DELETE_APPOINTMENT_MUTATION }
