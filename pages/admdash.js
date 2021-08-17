import PleaseSignIn from '../components/PleaseSignIn'
import styled from 'styled-components'
import AdminSettingsContent from '../components/AdminSettingsContent'
import Buttons from '../components/PortalButton'
import ModalFrame from '../components/ModalFrame'
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px 1fr;
  width: 100%;
  height: 100%;
  .back {
    grid-column: 1/3;
    grid-row: 2;
    width: 100%;
    height: 100%;
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
        <Grid>
          <Buttons style={{ gridRow: 1, gridColumn: 1 }} />
          <ModalFrame style={{ gridColumn: 2, gridRow: 1 }} />
          <div className="back">
            <AdminSettingsContent />
          </div>
        </Grid>
      )}
    </PleaseSignIn>
  )
}

export default AdminDash
