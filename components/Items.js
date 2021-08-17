
import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Item from './Item'
import Loader from './Loader'



const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    allVideoOnDemands (orderBy: "createdAt_DESC") {
      id
      url
      thumbnailUrl
      name
      description
      customNote
      date
      isFavorite {
        id
      }
      tags {
        id
        name
      }
    }
  }
`

const Center = styled.div`
  text-align: center;
  background: #f2f2f2;
  max-width: 1600px;
  min-height: 900px;
  margin: 0 auto;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  grid-row-gap: 60px;

    grid-column-gap: 20px;
padding: 40px 10px 40px 10px;
`

function Items({ id, name, tagIds, tagName }) {

  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY)
        if (loading) return <Loader/>
        if (error) return <p>Error: {error.message}</p>
        if (!data) return <p>No videos match your search at this time, please modify your search and try again!
        </p>

        return (
          <Center>
          <ItemsList>
            {data.allVideoOnDemands.map((item) => {

              return(
              <Item videoOnDemand={item}  key={item.id} />
            )})}
          </ItemsList></Center>
        )
}


export default Items
export { ALL_ITEMS_QUERY }
