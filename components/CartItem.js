import React from 'react'
import styled from 'styled-components'
import { format, isPast, isThisHour } from 'date-fns'
import formatMoney from '../lib/formatMoney'
import RemoveFromCart from './RemoveFromCart'

const CartItemStyles = styled.li`
  padding: 2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  font-family: 'Comfortaa';
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
    border-radius: 10px;
        box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09);
  }
  h3,
  h4,
  p {
    margin: 0;
  }
  /* h3 {
font-family: 'Bison';
font-weight: bold;
font-size: 22px;
letter-spacing: 3px;
  } */
`

const CartItem = ({ cartItem, expired }) => {
 const cleanName = cartItem.item.reason.name && cartItem.item.reason.name.toLowerCase().replace(/\s/g, '')

  if (expired)
    return (
      <CartItemStyles>
        <p>This Class is no longer available</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    )
 if(cartItem.item.stillAvailable === false) return (
       <CartItemStyles>
        <p>This Item is no longer available</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
 )
  return (
    <CartItemStyles>
      <img
        width="150"
        src={`../static/img/classbackgrounds/backsplashfinal/${cleanName}.jpg`}
        alt={cleanName}
      />
      <div className="cart-item-details">
        <h3>{cartItem.item.reason.name}</h3>
        <h4>{format(new Date(cartItem.item.date), 'eeee - MMM dd yyyy @ h:mm aa')}</h4>
        <p>
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  )
}

export default CartItem
