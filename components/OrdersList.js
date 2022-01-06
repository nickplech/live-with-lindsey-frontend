import React from 'react'
import { useQuery } from '@apollo/client'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import Form from './styles/Form'
import Loader from './Loader'
import gql from 'graphql-tag'
import { perPage } from '../config'
import styled from 'styled-components'
import Error from './ErrorMessage'
import formatMoney from '../lib/formatMoney'
import {OrderItemStyles, OrderMeta} from './styles/OrderItemStyles'
import Pagination from './Pagination'
const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY($id: ID, $skip: Int = 0, $first: Int = ${perPage} ) {
    allOrders(first: $first, skip: $skip, where: { user: { id: $id } }, orderBy: "createdAt_DESC") {
      id
      total
      createdAt
      charge
 
      _recordsMeta {
        count
      }
      records {
        id
        name
      }
      user {
        id
      }
    }
  }
`

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($id: ID!) {
    _allOrdersMeta(where: { user: { id: $id } }) {
      count
    }
  }
`
const Inner = styled.div`
  text-align: left;
  max-width: ${(props) => props.theme.innerWidth};
  /* margin: 0 auto; */
  padding: 0rem 0;
  padding-top: 0;
  position: relative;
  z-index: 100;
  .dates {
    text-transform: uppercase;
    opacity: 0.5;
    &:focus {
      opacity: 1;
    }
    &:active {
      opacity: 1;
    }
  }
  button {
    display: flex;
    justify-self: flex-end;
  }
  h2 {
    font-family: 'Bison';

    color: ${(props) => props.theme.second};
    letter-spacing: 3px;
  }
 
 
`
const Img = styled.img`
    height: 50px;
    width:50px;
`
const OrderUl = styled.ul`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, 1fr);
  padding: 0;
`
function OrderCount({ userId, page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY, {
    variables: { id: userId },
  })
  if (loading) return <p>loading...</p>
  if (error) return <Error erorr={error} />
  if (!data || data === undefined) return null
  const { count } = data._allOrdersMeta
  const pages = Math.ceil(count / perPage)
  return <OrdersList pages={pages} userId={userId} page={page} count={count} />
}
function OrdersList({ userId, page, pages, count }) {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY, {
    variables: { id: userId, skip: page * perPage - perPage, first: 10 },
  })
  if (loading)
    return (
      <Inner>
        <Form style={{ minHeight: '300px' }}>
          <fieldset>
            <Loader />
          </fieldset>
        </Form>
      </Inner>
    )

  if (error) return <Error erorr={error} />
  if (!data || data === undefined) return null
  const { allOrders } = data

  const currentCount = page * perPage - perPage
  const endOfCountRange = page * perPage
  const lastPage = page === pages

  return (
    <Inner>
      <Form>
        <fieldset>
          {allOrders.length === 0 ? (
            <h2>Completed Orders: 0</h2>
          ) : (
            <h2>
              Completed Orders:{' '}
              {currentCount +
                ' ' +
                '—' +
                ' ' +
                `${lastPage ? count : endOfCountRange}`}
            </h2>
          )}
          <OrderUl>
            {allOrders.map((order) => (
              <OrderItemStyles key={order.id}>
                <Link
                  href={{
                    pathname: '/order',
                    query: { id: order.id },
                  }}
                >
                  <a>
                    <OrderMeta>
                      <p>
                        {formatDistance(new Date(order.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </p>
                      <p>
                        {order._recordsMeta.count} Item
                        {order._recordsMeta.count === 1 ? '' : 's'}{' '}
                      </p>
                      <p>{formatMoney(order.total)}</p>
                    </OrderMeta>
                    <div className="images">
                        {order.records.map((item) => {

                          const cleanName = item.name.toLowerCase().replace(/\s/g, '')
                          return(
                          <Img
                            key={item.id}
                  
                            src={`../static/img/classbackgrounds/backsplashfinal/${cleanName}.jpg`}
                            alt={item.title}
                          />
                        )})}
                      </div>
                  </a>
                </Link>
              </OrderItemStyles>
            ))}
          </OrderUl>
        </fieldset>
        <Pagination count={count} pages={pages} page={page} />
      </Form>
    </Inner>
  )
}

export default OrderCount
export { USER_ORDERS_QUERY }
