import { useRouter } from 'next/router'
import PleaseSignIn from '../../components/PleaseSignIn'
import LiveStream from '../../components/LiveStream'
import { SocketProvider } from '../../components/contexts/SocketProvider'
 

const Stream = () => {
  const router = useRouter()

  // console.log(router.query.userId)

  return (
    <PleaseSignIn>
      {(me) => (
        <SocketProvider
          id={router.query.id}
          userId={me.id}
          userName={me.businessName}
        >
          <LiveStream id={router.query.id} userId={me.id} />
        </SocketProvider>
      )}
    </PleaseSignIn>
  )
}
export default Stream
