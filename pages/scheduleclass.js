import PleaseSignIn from '../components/PleaseSignIn'
import styled from 'styled-components'
 
import ScheduleClasses from '../components/ScheduleClasses'
import gql from 'graphql-tag'
import Error from '../components/ErrorMessage'
import { useQuery } from '@apollo/client'
import Loader from '../components/Loader'

const AD_DASH_QUERY = gql`
  query AD_DASH_QUERY {
    adDash {
      message
    }
  }
`
 
function AdminDash(props) {
  const { data, loading, error } = useQuery(AD_DASH_QUERY)
  if (loading) return <Loader />
  if (error) return <Error error={error} />
  if (!data) return null
  return (
    <PleaseSignIn>
      {(me) => (
     
          <ScheduleClasses   />
       
     
      )}
    </PleaseSignIn>
  )
}

export default AdminDash
