import React, {Fragment, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Loader from './Loader'
import SearchByTag from './SearchByTag'
import Error from './ErrorMessage'
import { ALL_ITEMS_QUERY } from './Items'
import VanillaTilt from 'vanilla-tilt'
import Link from 'next/link'
import { format } from 'date-fns'

const SEARCH_BY_TAGS = gql`
  query SEARCH_BY_TAGS($tags: [String]) {
    allVideoOnDemands(
      where: { AND: [{ tags_some: { name_in: $tags } }] }
      first: 9
    ) {
      id
      thumbnailUrl
      name
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
const TheSection = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
 margin: 75px auto;
 grid-column-gap: 20px;
 grid-row-gap: 40px;
 width: 95%;
`
 
const Videos = styled.div`
  background-color: deepPink;
  padding: 0px;
  color: #fff;
  /* border: 1px solid deepPink; */
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  height: 200px;
  min-width: 350px;
  justify-content: flex-end;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
    0 32px 16px rgba(0, 0, 0, 0.03);
  background: url(${(props) => props.thumbnailUrl}) no-repeat center center;
  background-size: cover;
  margin: 0 auto;
  &:hover {
    transform: scale(1.01);
  }
  /* @media (min-width: 768px) {
    height: 240px;
    flex-flow: row;
    max-width: 30%;
  } */
  h2 {
    color: white;
    font-family: 'Bison';
    user-select: none;
    letter-spacing: 2px;
    border-radius: 10px;
    justify-self: flex-end;
    align-self: flex-end;
    margin: 0;
    height: 100%;
    font-size: 26px;
    line-height: 32px;
    padding: 5px;
    width: 100%;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, .5) 100%);
  }
`

const Tite = styled.h1`
  letter-spacing: 2px;
  font-size: 30px;
  color: ${(props) => props.theme.second};
  font-family: 'Bison';
  line-height: 30px;
`

function ViewAllTemplate({title}) {
  
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY
  )
  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>

  if (data.allVideoOnDemands.length === 0) return null

  const { allVideoOnDemands } = data

  return (
    <>
        <Tite style={{ marginTop: '70px', marginLeft: '30px' }}>
        {title}
        </Tite>
        <SearchByTag />
    <TheSection>
    
        {allVideoOnDemands.map((video, i) => {
          return (
            <Fragment key={video.id} >
            <Link
              href={{
                pathname: '/item',
                query: { id: video.id },
              }}
            >
              <Videos thumbnailUrl={video.thumbnailUrl} key={i}>
                <h2>{video.name}</h2>
              </Videos>
            </Link></Fragment>
          )
        })}
   
    </TheSection>
    </>
  )
}

export default ViewAllTemplate
export { SEARCH_BY_TAGS }
