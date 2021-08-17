import React, { useState, useMemo } from 'react'
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
import SickButton from './styles/SickButton'
import { useMutation } from '@apollo/client'
import calcTotalPrice from '../lib/calcTotalPrice'
import formatMoney from '../lib/formatMoney'
import { toast } from 'react-toastify'

import { USERS_WEEK_QUERY } from './DashboardComponent'

// We use loadStripe because is load in their lib async
const stripe = loadStripe(
  'pk_test_51Gv310LSeyP7TrUgedUJsGQ7TELPGLBia5KaytXY92CDaGPMW5AEMWBFYmQgzSDYq8fU8qbb7gyTcKYZCuZxSkhO00fs8Qi0yX',
)

const CREATE_ORDER_MUTATION = gql`
  mutation subscribe($token: String!, $userId: ID!, $saveInfo: Boolean!) {
    subscribe(token: $token, userId: $userId, saveInfo: $saveInfo) {
      message
    }
  }
`

const Error = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  background: rgba(250, 20, 20, 0.4);
  transform: translate(0, -80px);
  border-radius: 25px;
  padding: 5px 8px;
  color: white;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`
const Loading = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  background: rgba(20, 20, 200, 0.4);
  transform: translate(0, -80px);
  opacity: 0.8;
  padding: 5px 8px;
  border-radius: 25px;
  color: white;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
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
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: absolute;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    min-width: 350px;
  }

  .right {
    height: 100%;
    width: 100%;
    align-items: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    grid-column: 1;
    padding: 25px;
    @media (max-width: 768px) {
      grid-column: 1;

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
    grid-column: 1;
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

export default function Subscription() {
  const me = useUser()
  !me && <p>Please log in to continue!</p>
  return (
    <>
      <Wrap>
        <div className="right">
          <Elements stripe={stripe}>
            <CheckoutForm userId={me && me.id} />
          </Elements>
        </div>
      </Wrap>
    </>
  )
}

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  position: absolute;
  max-width: 450px;
  height: 50px;
  grid-column: 1;
  display: grid;

  @media (max-width: 768px) {
    grid-column: 1;
    position: relative;
    margin-bottom: 100px;
  }
  button {
    min-width: 150px;
    transform: translateY(45px);
    font-size: 22px;
    @media (max-width: 768px) {
      transform: translateY(5px);
    }
  }
  .switch-text {
    font-size: 13px;
    color: grey;
    margin: 0;
    margin-top: 18px;
    font-family: 'Bison';
    letter-spacing: 2px;
  }
  .switch {
    position: relative;
    display: inline-block;
    transform: translateY(-5px);
    width: 42px;
  }
  .switch-input {
    display: none;
  }
  .switch-label {
    display: block;
    width: 44px;
    height: 21px;
    text-indent: -150%;
    clip: rect(0 0 0 0);
    color: transparent;
    user-select: none;
  }
  .switch-label::before,
  .switch-label::after {
    content: '';
    display: block;
    position: absolute;
    cursor: pointer;
  }
  .switch-label::before {
    width: 100%;
    height: 100%;
    background-color: #dedede;
    border-radius: 5px;
    -webkit-transition: background-color 0.25s ease;
    transition: background-color 0.25s ease;
  }
  .switch-label::after {
    top: 0;
    left: 0;
    width: 21px;
    height: 21px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
    -webkit-transition: left 0.25s ease;
    transition: left 0.25s ease;
  }
  .switch-input:checked + .switch-label::before {
    background-color: ${(props) => props.theme.primary};
  }
  .switch-input:checked + .switch-label::after {
    left: 21px;
    box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.3);
  }
`

function useCheckout() {
  const me = useUser()
  const stripe = useStripe()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [saveInfo, setSaveInfo] = useState(true)
  console.log(saveInfo)
  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const elements = useElements()
  const [checkout] = useMutation(CREATE_ORDER_MUTATION)
  const handleInfoSaving = async (e) => {
    return setSaveInfo((saveInfo) => !saveInfo)
  }
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
        saveInfo: saveInfo,
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
  return { handleSubmit, handleInfoSaving, saveInfo, error, loading }
}

function CheckoutForm({ userId }) {
  const { handleSubmit, handleInfoSaving, saveInfo, error, loading } =
    useCheckout({
      userId: userId,
    })
  return (
    <CheckoutFormStyles onSubmit={(e) => handleSubmit(e)}>
      {error && <Error>{error.message}</Error>}
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
        Subscribe to All Access
      </SickButton>
    </CheckoutFormStyles>
  )
}
