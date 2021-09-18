import Loader from './Loader'
import gql from 'graphql-tag'
import {formatISO} from 'date-fns'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import {useUser} from './User'
import ProductSlider from './ProductSlider'
 const STREAMS_QUERY = gql`
  query STREAMS_QUERY($date: DateTime) {
    allItems(where: {  AND: [{ private_is_null: true }, { date_gte: $date }]}, orderBy: "date") {
      id
      price
      date
      private {
        
          id
        
      }
      user {
        id
      }
      reason {
        id
        name
        classLength
      }
    }
  }
`
const Schedule = styled.div`
  font-family: 'Felix';
  text-transform: uppercase;
  z-index: 900;
 
  grid-column: 1/3;
  width: 100%;
  position: relative;
  h1 {
    margin: 2px;
    font-size: 46px;
  }
  .subTight {
   
    color: white;
    font-family: 'Bison';
    margin: 0;
    transform: translate(30px, -10px);
    letter-spacing: 2px;
  }
`
const Title = styled.div`
  display: flex;
  margin: 20px 0px 0px 25px;
  width: 100%;
  border-bottom: 3px solid rgba(20, 20, 20, 0.2);
  font-family: 'Felix';
  font-size: 32px;
  color: ${(props) => props.theme.second};
  margin: ${(props) =>
    props.items.length === 0 ? ' -90px 0px 0px 25px' : '20px 0px 0px 25px'};
  @media (max-width: 992) {
    font-size: 22px;
    margin: ${(props) =>
      props.items.length === 0 ? ' -70px 0px 0px 25px' : '20px 0px 0px 25px'};
  }
`
function ScheduledClasses( ) {
 const me = useUser()
const today = new Date().toLocaleString();
const isonow = formatISO(new Date(today)) 
 
  const { error, loading, data } = useQuery(STREAMS_QUERY, {
    variables: { date: isonow },
  })
  if (loading) return <Loader />
  if (error) return <Error error={error} />
   const items = data.allItems
  const ownsItem = items.map((item) => {
    const theUsers = item.user.find((theUser) => {
      return theUser.id === me.id
    })
    return theUsers
  })
  const count = me && me.cart.reduce(
    (tally, cartItem) => tally + cartItem.quantity,
    0,
  )

  const inCart = me && me.cart.map((cartItem) => {
    const cartItemIdArray = cartItem && cartItem.item.id
    return cartItemIdArray
  })
 return (
      <Schedule >
       <Title items={items}>  Scheduled Live Workouts  </Title>
            <p className="subTight">
              Explore this week's Live Workouts below!
            </p>

 {!items.length ?
      <Div>
        <P>That's it for this week!</P>
        <P>Please Check back Sunday for the Upcoming Live Schedule</P>
        <img height="60" src="../static/img/heartsig.svg" />
      </Div>

:
 
    <ProductSlider
    
      inCart={inCart}
      ownsItem={ownsItem}
      allItems={items}
    />
}
</Schedule >
  )
}

export default ScheduledClasses