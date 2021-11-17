import React from 'react'
import Loader from './Loader'
import gql from 'graphql-tag'
import {formatISO} from 'date-fns'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
 
import ProductSlider from './ProductSlider'

 const STREAMS_QUERY = gql`
  query STREAMS_QUERY($date: DateTime) {
    allItems(where: {  AND: [{ private_not: true }, { date_gte: $date }]}, orderBy: "date") {
      id
      price
      date
      private 
      user {
        id
        cart {
          id
        }
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
 
   
  width: 100%;
  position: relative;
  h1 {
    margin: 2px;
    font-size: 46px;
  }
  .subTight {
   
    color: slategrey;
    font-family: 'Bison';
    margin: 0;
    transform: translate(30px, 0px);
    letter-spacing: 2px;
  }
`
const Div = styled.div`
  width: 100%;

  height: 350px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  align-items: center;
margin-top: 20px;
  font-family: 'Bison';
  padding-top: 0px;

  @media (min-width: 992px) {
    width: 100%;

    height: 350px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    align-items: center;
  margin-top: 20px;
    font-family: 'Bison';
    padding-top: 0px;
  
  }
  .smaller {
    margin: 5px auto;
    text-align: center;
    justify-self: center;
    display: flex;
    max-width: 500px;
    line-height: 26px;
    font-size: 32px;
    color: ${(props) => props.theme.second};
    letter-spacing: 4px;
    font-size: 28px;
    transform: translateY(10px);
  }
`
const P = styled.p`
  color: slategray;
  margin: 5px auto;
  text-align: center;
  justify-self: center;
  display: flex;
  max-width: 500px;
  line-height: 26px;
  font-size: 32px;
  color: ${(props) => props.theme.second};
  letter-spacing: 4px;
  &:nth-of-type(2) {
    max-width: 400px;
    font-size: 18px;
    color: slategray;
    letter-spacing: 3px;
  }
`
const Title = styled.div`
  display: flex;
  margin:  0px 0px 0px 25px;
  width: 95%;
  /* border-top: 3px solid rgba(20, 20, 20, 0.2); */
  font-family: 'Felix';
  font-size: 32px;
  color: ${(props) => props.theme.second};
  margin: ${(props) =>
    props.items.length === 0 ? ' 0px 0px 0px 25px' : '0px 0px 0px 25px'};
  @media (max-width: 992) {
    font-size: 22px;
    margin: ${(props) =>
      props.items.length === 0 ? ' 0px 0px 0px 0px' : '0px 0px 0px 0px'};
  }
`
function ScheduledClasses( ) {

const today = new Date().toLocaleString();
const isonow = formatISO(new Date(today)) 
 
  const { error, loading, data } = useQuery(STREAMS_QUERY, {
    variables: { date: isonow },
  })
  if (loading) return <Loader />
  if (error) return <Error error={error} />
   const items = data.allItems
  
 return (
      <Schedule >
       <Title items={items}>  Scheduled Live Workouts  </Title>


 {!items.length ?
      <Div>
        <P>That's it for this week!</P>
        <P>Please Check back Sunday for the Upcoming Live Schedule</P>
        <img height="60" src="../static/img/heartsig.svg" />
      </Div>

:
 
    <ProductSlider
    

      allItems={items}
    />
}
</Schedule >
  )
}

export default React.memo(ScheduledClasses)