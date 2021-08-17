import React, { useRef } from 'react'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import Head from 'next/head'
import gql from 'graphql-tag'
import Link from 'next/link'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import styled from 'styled-components'

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    allOrders(where: { id: $id }) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      records {
        id
        name
        quantity
        date
        price
      }
    }
  }
`
const OrderStyles = styled.div`
  max-width: 800px;
  margin: 50px 25px;
  font-family: 'Comfortaa';
  border: 1px solid ${(props) => props.theme.offWhite};
  box-shadow: ${(props) => props.theme.bs};
  padding: 2rem;

  border-top: 10px solid ${(props) => props.theme.second};
  @media (min-width: 768px) {
    margin: 50px auto;
  }

  & > p {
    display: grid;
    align-items: center;
    grid-template-columns: 200px 5fr;
    margin: 0;
    border-bottom: 1px solid ${(props) => props.theme.offWhite};
    span {
      padding: 1rem;
      &:first-child {
        font-weight: 900;
        font-size: 18px;
        color: ${(props) => props.theme.third};
        text-align: left;
      }
    }
  }

  .order-item {
    border-bottom: 1px solid ${(props) => props.theme.offWhite};
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: contain;
    }
  }
  h1 {
    color: ${(props) => props.theme.second};
    font-size: 20px;
  }
`
const GoBacks = styled.a`
  font-family: 'Bison';
  letter-spacing: 2px;
  font-size: 20px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  flex-flow: row;
  text-align: center;

  &:after {
    position: absolute;
    transform: translate(0, 20px);
    content: '';
    height: 3px;
    width: 210px;
    background: #f8b0b0;
  }
  img {
    transition: 0.2s;
    &:hover {
      transform: translate(-10px, 0);
    }
  }
`

const Order = React.forwardRef((props, ref) => {
  const theId = props.id

  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: theId },
  })
  if (!data) return null
  if (error) return <Error error={error} />
  if (loading) return <p>Loading...</p>
  const order = data.allOrders[0]

  return (
    <>
      <OrderStyles>
        <Head>
          <title>Live with Lindsey - Order {theId}</title>
        </Head>
        <h1>Live with Lindsey - Order Receipt</h1>
        <p>
          <span>Order ID:</span>
          <span>{theId}</span>
        </p>
        <p>
          <span>Charge ID:</span>
          <span>{order.charge}</span>
        </p>
        <p>
          <span>Order Placed:</span>
          <span>
            {format(new Date(order.createdAt), 'MMMM d, yyyy h:mm a', {
              awareOfUnicodeTokens: true,
            })}
          </span>
        </p>
        <p>
          <span>Order Total:</span>
          <span>{formatMoney(order.total)}</span>
        </p>
        <p>
          <span>Item Count:</span>
          <span>{order.records.length}</span>
        </p>
        <div className="items">
          {order.records.map((item) => {
            const cleanName = item.name.toLowerCase().replace(/\s/g, '')
            return (
              <div className="order-item" key={item.id}>
                <img
                  className="order-item"
                  src={`../static/img/classbackgrounds/backsplashfinal/${cleanName}.jpg`}
                  alt={item.name}
                />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>
                    Live On:{' '}
                    {format(new Date(item.date), 'MMM dd, yyyy @ hh:mm a')}
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>Each: {formatMoney(item.price)}</p>
                  <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </OrderStyles>
      <Link href="/">
        <GoBacks>
          <img
            style={{ marginRight: '10px' }}
            src="../static/img/arrow-back.svg"
            alt="back arrow"
          />{' '}
          Go Back to Dashboard
        </GoBacks>
      </Link>
    </>
  )
})

export default Order
export { SINGLE_ORDER_QUERY }
