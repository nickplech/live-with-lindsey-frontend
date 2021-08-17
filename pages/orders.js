import PleaseSignIn from '../components/PleaseSignIn'
import OrdersList from '../components/OrdersList'

const OrderPage = (props) => (
  <PleaseSignIn>{(me) => <OrdersList />}</PleaseSignIn>
)

export default OrderPage
