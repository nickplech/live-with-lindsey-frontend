import { useRouter } from 'next/router'
import PleaseSignIn from '../../components/PleaseSignIn'
import PrivateRoomComponent from '../../components/PrivateRoomComponents'
import styled from 'styled-components'
import { PrivatePeerContextProvider } from '../../components/contexts/PrivatePeerSocket'
 

const privateRoom = () => {
  const router = useRouter()

  console.log(router.query.userId)

  return (
    <PleaseSignIn>
      {(me) => (
        <PrivatePeerContextProvider
          id={router.query.id}
          userId={me.id}
        >
          <PrivateRoomComponent id={router.query.id} userId={me.id} />
        </PrivatePeerContextProvider>
      )}
    </PleaseSignIn>
  )
}
export default privateRoom
