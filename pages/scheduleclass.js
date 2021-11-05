import PleaseSignIn from '../components/PleaseSignIn'
import styled from 'styled-components'
 
import ClassScheduler from '../components/ClassScheduler'
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
const Grid = styled.div`
  display: grid;
  grid-template-columns: 50vw 50vw;
  grid-template-rows:  1fr;
  width: 100%;
  height: 100%;
 
`
function AdminDash(props) {
  const { data, loading, error } = useQuery(AD_DASH_QUERY)
  if (loading) return <Loader />
  if (error) return <Error error={error} />
  if (!data) return null
  return (
    <PleaseSignIn>
      {(me) => (
        <Grid>
           
          <ClassScheduler   />
       
        </Grid>
      )}
    </PleaseSignIn>
  )
}

export default AdminDash
