import React, { useState, useEffect } from 'react'
import NProgress from 'nprogress'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useUser, CURRENT_USER_QUERY } from './User'
import gql from 'graphql-tag'
import Router from 'next/router'
import styled from 'styled-components'
import { format, startOfWeek } from 'date-fns'
import { useMutation } from '@apollo/client'
import calcTotalPrice from '../lib/calcTotalPrice'
import processDiscount from '../lib/processDiscount'
import formatMoney from '../lib/formatMoney'
import Cart from './Cart'
import { USERS_WEEK_QUERY } from './DashboardComponent'

// We use loadStripe because is load in their lib async
const stripe = loadStripe(
  'pk_test_51Gv310LSeyP7TrUgedUJsGQ7TELPGLBia5KaytXY92CDaGPMW5AEMWBFYmQgzSDYq8fU8qbb7gyTcKYZCuZxSkhO00fs8Qi0yX',
)

const CREATE_ORDER_MUTATION = gql`
  mutation checkout($token: String!, $userId: ID!) {
    checkout(token: $token, userId: $userId) {
      id
      total
      charge
      createdAt
    }
  }
`

const Error = styled.div`
  position: absolute;
  text-align: left;
  width: 100%;
  background: transparent;
  transform: translate(0, 45px);
 
  font-size: 16px;
  
  padding: 5px 8px;
  letter-spacing: 3px;
  color: rgba(250, 20, 20, 0.4);
 
`
const Loading = styled.div`
  position: absolute;
  text-align: left;
  width: 100%;
  background: transparent;
  transform: translate(0, 45px);
 
  padding: 5px 8px;
  font-size: 16px;
  color: rgba(20, 20, 200, 0.4);
 
`
const style = {
  base: {
    fontSize: '18px',

    color: '#424770',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#9e2146',
  },
}

const Wrap = styled.div`
  background-color: white;
  height: calc(100% - 60px);
  width: 100%;
  min-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: absolute;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    min-width: 350px;
  }
  .left {
    height: 100%;
    width: 100%;
    grid-column: 1;
    background: rgba(240, 240, 240, 0.6);
    @media (max-width: 768px) {
      grid-column: 1;
      grid-row: 1;
    }
  }
  .right {
    height: 100%;
    width: 100%;
    align-items: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    grid-column: 2;
    padding: 25px;
    @media (max-width: 768px) {
      grid-column: 1;
      grid-row: 2;
      justify-content: flex-start;
      margin-top: 75px;
    }
  }
  .email {
    position: relative;
    height: 60px;
  }
  .container {
    font-family: 'Comfortaa';
    grid-column: 1/3;
    display: flex;
    width: 100%;

    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    @media (max-width: 768px) {
      grid-column: 1;
    }
  }
  .container {
    text-align: center;
  }

  .progress-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 30px;
    max-width: 100%;
    width: 350px;
  }

  .progress {
    background-color: #3498db;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 0%;
    z-index: -1;
    transition: 0.4s ease;
  }

  .progress-container::before {
    content: ' ';
    background-color: #e0e0e0;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: -1;
  }

  .circle {
    background-color: #fff;
    border-radius: 50%;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #e0e0e0;
    font-size: 14px;
    height: 30px;
    width: 30px;
    transition: 0.4s ease;
  }

  .circle.active {
    border-color: #3498db;
    color: #111;
  }

  .breadcrumbs {
    background-color: ${(props) => props.theme.second};
    color: #fff;
    display: flex;
    font-size: 24px;
    position: relative;
  }

  .breadcrumb-item {
    width: 280px;
    align-items: center;
    justify-content: center;
  }

  .number {
    display: block;
    background-color: ${(props) => props.theme.second};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* padding: 6px 10px; */
    float: left;
  }

  .breadcrumb-item::after {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    transform: rotate(130deg);
    float: right;
    position: relative;
    top: calc(50% - 16px);
    left: 14px;

    background-color: ${(props) => props.theme.second};
  }

  .breadcrumb-item.current,
  .breadcrumb-item.current::after {
    background-color: #457f4b;
  }

  .breadcrumb-item.current .number {
    background-color: #61b269;
  }
`
const EmptyFoo = styled.div`
  background-color: white;
  height: calc(100% - 60px);
  width: 100%;

  justify-content: center;
  align-items: center;
  margin: 0;

  z-index: 1000;

  img {
    margin-top: 10px;
  }
`
const Div = styled.div`
  width: 100%;
  height: 350px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-family: 'Bison';

  transform: translateY(30px);
`
const P = styled.p`
  color: slategray;
  margin: 0px auto;
  text-align: center;
  margin-bottom: 8px;
  width: 90%;

  line-height: 26px;
  font-size: 28px;
  color: ${(props) => props.theme.second};
  letter-spacing: 5px;
  @media (max-width: 662px) {
    font-size: 22px;
  }
  &:nth-of-type(2) {
    width: 90%;
    max-width: 500px;
    font-size: 18px;
    color: slategray;
    letter-spacing: 3px;
    @media (max-width: 662px) {
      font-size: 14px;
    }
  }
`
function Checkout() {
  const me = useUser()
  !me && <p>Please log in to continue!</p>
  const [cart, setCart] = useState(null)
  useEffect(() => {
    const cartMap = me.cart.filter(cartItem => {
      const theDate = cartItem.item.date
      const now = Date.now()
      const expiry = new Date(theDate).getTime()
      const expired = now >= expiry ? true : false
    

      return !expired
    })
    setCart(cartMap)
  }, [])
  console.log(cart)
  return (
    <>
      {me && me.cart.length < 1 ? (
        <EmptyFoo>
          <Div>
            <P>It Looks Like Your Cart is Empty!</P>
            <P>
              Take a Look at The Scheduled Live Workouts on Your
              Dashboard&mdash;See One you like? Just Click the Plus Sign to add
              the class, then click the cart and See You Right Back Here for
              Checkout!
            </P>
            <img height="70" src="../static/img/heartsig.svg" />
          </Div>
        </EmptyFoo>
      ) : (
        <Wrap>
          <div className="left">
            <Cart
              cart={me && me.cart}
              cartTotal={me && cart}
              classCredits={me && me.classCredits}
              user={me && me.firstName}
            />
          </div>
          <div className="right">
            <Elements stripe={stripe}>
              <CheckoutForm userId={me && me.id} cart={me && me.cart} />
            </Elements>
          </div>
        </Wrap>
      )}
    </>
  )
}

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  position: relative;
  max-width: 450px;
  height: 50px;
  grid-column: 1; margin-bottom: 100px;
  display: grid;
  grid-gap: 1rem;
  @media (min-width: 768px) {
    grid-column: 2;
    position: absolute;
    margin-bottom:  0px;
  }
  button {
    min-width: 150px;
    transform: translateY(45px);
    font-size: 22px;
    /* @media (max-width: 768px) {
      transform: translateY(5px);
    } */
  }
  
`
const SickButton = styled.button`
  background: ${(props) => props.theme.second};
  color: white;

  border: 0;
  margin: 0 auto;
  border-radius: 5px;
  font-family: 'Bison';

  font-size: 2rem;
  padding: 0.5rem 1.2rem;
  font-size: 1.8rem;
  display: inline-block;
  letter-spacing: 3px;
  transition: all 0.5s;
  outline: none;
  cursor: pointer;
  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.2);
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background: ${(props) => props.theme.primary};
  }
  &:active {
    box-shadow: none;
  }
`
function useCheckout() {
  const me = useUser()
  const stripe = useStripe()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const elements = useElements()
  const classCredits = me &&  me.classCredits
  const [checkout] = useMutation(CREATE_ORDER_MUTATION)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    NProgress.start()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })
    if (error) {
      NProgress.done()
      setLoading(false)
      return setError(error)
    }

    const order = await checkout({
      variables: {
        token: paymentMethod.id,
        userId: me.id,
       
      },
      refetchQueries: [
        {
          query: USERS_WEEK_QUERY,
          variables: { date: format(weekStarts, 'yyyy-MM-dd'), id: me.id },
        },
        { query: CURRENT_USER_QUERY },
      ],
    }).catch((err) => {
      alert(err.message)
    })

    await Router.push({
      pathname: '/order',
      query: { id: order.data.checkout.id },
    })

    setLoading(false)
  }
  return {
    classCredits,
    handleSubmit,

    error,
    loading,
  }
}

function CheckoutForm({ cart, userId }) {
  const {
    classCredits,
    handleSubmit,

    error,
    loading,
  } = useCheckout({
    userId: userId,
  })
  return (
    <CheckoutFormStyles onSubmit={(e) => handleSubmit(e)}>
      
      {!error && loading && (
        <Loading>
          Almost Done! Please Allow The Checkout Process to Finish
        </Loading>
      )}
      <CardElement
        options={{ style }}
        onReady={() => {
          console.log('CardNumberElement [ready]')
        }}
        onChange={(e) => {
          console.log('CardNumberElement [change]', e)
        }}
      />
     
      <SickButton disabled={!stripe || loading} type="submit">
        Pay{' '}
        {`${
          classCredits
            ? processDiscount(cart && cart)
            : formatMoney(calcTotalPrice(cart && cart))
        }`}
      </SickButton>{error && <Error>{error.message}</Error>}
    </CheckoutFormStyles>
  )
}

export default Checkout
export { CREATE_ORDER_MUTATION }
