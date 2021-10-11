import PleaseSignIn from '../components/PleaseSignIn'
import {PeerSocketProvider}  from '../components/contexts/PrivatePeerSocket'
import PrivateRoomComponent from '../components/PrivateRoomComponent'

const aPrivateClass = ({query}) => {
  return (
    <PleaseSignIn>
      {(me) => (
        <PeerSocketProvider
          classId={query.id}
          isAdmin={me.isAdmin}
          userId={me.id}
          name={me.firstName}
        >
          <PrivateRoomComponent    classId={query.id} isAdmin={me.isAdmin} />
        </PeerSocketProvider>
      )}
    </PleaseSignIn>
  )
}
export default aPrivateClass
