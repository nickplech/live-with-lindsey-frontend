import { useRouter } from 'next/router'
import PleaseSignIn from '../../components/PleaseSignIn'
import {PeerSocketProvider}  from '../../components/contexts/PrivatePeerSocket'
import PrivateRoomComponent from '../../components/PrivateRoomComponent'


const aPrivateClass = () => {
  const router = useRouter()

  console.log(router.query.userId)

  return (
    <PleaseSignIn>
      {(me) => (
        <PeerSocketProvider
          classId={router.query.id}
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
