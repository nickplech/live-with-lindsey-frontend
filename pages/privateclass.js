import { useRouter } from 'next/router'
import PleaseSignIn from '../components/PleaseSignIn'
import {PeerSocketProvider}  from '../components/contexts/PrivatePeerSocket'
import PrivateRoomComponent from '../components/PrivateRoomComponent'


const aPrivateClass = ({query}) => {
  const router = useRouter()



  return (
    <PleaseSignIn>
      {(me) => (
        <PeerSocketProvider
          classId={query.id}
          isAdmin={me.isAdmin}
          userId={me.id}
name={me.firstName}
        >
          <PrivateRoomComponent     isAdmin={me.isAdmin}  />

        </PeerSocketProvider>
      )}
    </PleaseSignIn>
  )
}
export default aPrivateClass
