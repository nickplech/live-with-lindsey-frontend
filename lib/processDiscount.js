import formatMoney from './formatMoney'
export default function processDiscount(cart) {
  const cheapestCartItemList = [...cart].sort((a, b) => {
    return a.item.price > b.item.price ? 1 : -1
  })
  const amount = cart.reduce(
    (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
    0,
  )

  const finalAfterFreebie = amount - cheapestCartItemList[0].item.price

  return formatMoney(finalAfterFreebie)
}
