import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'
import Signup from '../components/Signup'

const SignUpSwitch = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        return <Signup />
      }
      return props.children
    }}
  </Query>
)

export default SignUpSwitch
