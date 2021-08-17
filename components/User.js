import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import Loader from './Loader'

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedUser {
      id
      email
      firstName
      lastName
      image {
        publicUrlTransformed
      }
      cellPhone
      stripeCustomer
      isAdmin
      receiveSms
      classCredits
      businessName
      subscription
      hasPassedTwoFac
      cart {
        id
        quantity
        item {
          id
          price
          date
          stillAvailable
          reason {
            id
            name
          }
        }
      }
      permissions
    }
  }
`

function useUser() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY)
  if (loading) return <Loader />
  if (data) {
    return data.authenticatedUser
  }
}

export { CURRENT_USER_QUERY, useUser }
