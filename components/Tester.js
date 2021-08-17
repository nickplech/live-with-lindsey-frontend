import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const TESTER_QUERY = gql`
  query {
    tester {
      message
    }
  }
`
function Tester(props) {
  const { data, loading, error } = useQuery(TESTER_QUERY)
  if (loading) return <p>loading</p>
  if (!data) return null
  const numbers = data.tester.message
  return <div>{numbers}</div>
}

export default Tester
