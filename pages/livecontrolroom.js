import PleaseSignIn from '../components/PleaseSignIn'
import ControlRoom from '../components/ControlRoom'
import { SocketProvider } from '../components/contexts/SocketProvider'

const dashboard = ({ query }) => {
  return (
    <PleaseSignIn>
      {(me) => (
        <SocketProvider id={query.id} userId={me.id} userName={me.businessName}>
          <ControlRoom adminId={query.id} />
        </SocketProvider>
      )}
    </PleaseSignIn>
  )
}

export default dashboard
