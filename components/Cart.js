import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import processDiscount from '../lib/processDiscount'
import CartItem from './CartItem'
import calcTotalPrice from '../lib/calcTotalPrice'
import formatMoney from '../lib/formatMoney'

function Cart({ user, classCredits, cart, cartTotal }) {
  // const cheapestCartItemList = [...cart].sort((a, b) => {
  //   return a.item.price > b.item.price ? 1 : -1
  // })
  return (
    <CartStyles>
      <header>
        <Supreme>
          <h2>{user && user}'s Cart</h2>
        </Supreme>
        <p className="theCount">Total items in cart: {cart && cart.length}</p>
      </header>
      <ul>
        {cart && cart.map((cartItem) => {
          const theDate = cartItem.item.date
          const now = Date.now()
          const expiry = new Date(theDate).getTime()
          const notFresh = now >= expiry ? 'expired' : null
          console.log(notFresh)
          return <CartItem expired={notFresh} key={cartItem.item.id} cartItem={cartItem} />
        })}
      </ul>
      {cart && cart.length > 0 && (
        <footer>
          {classCredits ? (
            <p style={{ margin: 0 }}>
              Total (pre-discount): {formatMoney(calcTotalPrice(cart && cart))}
            </p>
          ) : null}
          <p>
            {classCredits
              ? processDiscount(cart && cart)
              : formatMoney(calcTotalPrice(cart && cart))}{' '}
            Total
          </p>
          {classCredits ? <p className="class-credz">
           
              Your Free First Workout Credit has Been Applied Towards Checkout!
          </p> : null}
        </footer>
      )}
    </CartStyles>
  )
}

export default Cart
