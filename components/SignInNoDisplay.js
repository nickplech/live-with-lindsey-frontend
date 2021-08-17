import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'

const SignInNoDisplay = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        return null
      }
      return props.children
    }}
  </Query>
)

export default SignInNoDisplay
