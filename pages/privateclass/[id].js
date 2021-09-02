import { useRouter } from 'next/router'
import PleaseSignIn from '../../components/PleaseSignIn'
import VideoState  from '../../components/contexts/PrivatePeerSocket'
import PrivateRoomComponent from '../../components/PrivateRoomComponent'
 

const Stream = () => {
  const router = useRouter()

  console.log(router.query.userId)

  return (
    <PleaseSignIn>
      {(me) => (
        <VideoState
          id={router.query.id}
          userId={me.id}
        >
          <PrivateRoomComponent id={router.query.id} userId={me.id} />
        </VideoState>
      )}
    </PleaseSignIn>
  )
}
export default Stream
