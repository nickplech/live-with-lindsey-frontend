import Checkout from '../components/Checkout'
import PleaseSignIn from '../components/PleaseSignIn'

const checkout = (props) => {
  return <PleaseSignIn>{(me) => <Checkout id={props.query.id} />}</PleaseSignIn>
}

export default checkout
