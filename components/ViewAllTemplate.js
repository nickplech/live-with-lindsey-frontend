import React, {Fragment, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Loader from './Loader'
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
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 90%;
`
const Recommended = styled.div`
  width: 100%;
  flex-flow: column;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;

  align-items: center;
  z-index: 10000;
  color: black;
  position: relative;
  @media (min-width: 768px) {
    flex-flow: row;
  }
`
const Videos = styled.div`
  height: 300px;
  min-width: 350px;
  width: 100%;
  max-width: 380px;
  margin: 30px 20px 40px 20px;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
    0 32px 16px rgba(0, 0, 0, 0.03);
  background: url(${(props) => props.thumbnailUrl}) no-repeat center center;
  background-size: cover;

  &:hover {
    transform: scale(1.05);
  }
  @media (min-width: 768px) {
    height: 200px;
    flex-flow: row;
  }
  h2 {
    color: white;
    font-family: 'Bison';
    user-select: none;
    letter-spacing: 2px;
    border-radius: 10px;
    margin: 0;
    height: 50%;
    font-size: 26px;
    line-height: 32px;
    padding: 5px;
    width: 100%;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%);
  }
`

const H1 = styled.h1`
  color: rgba(30, 30, 30, 1);

  font-family: 'Bison';
  letter-spacing: 2px;
  margin: 30px 20px 10px;
  font-size: 22px;
  /* transform: translateY(-70px); */
  position: relative;
`
function ViewAllTemplate({ tags, id }) {
  
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY
  )
  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>

  
  if (data.allVideoOnDemands.length === 0) return null
   
  const { allVideoOnDemands } = data

  return (
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
  )
}

export default ViewAllTemplate
export { SEARCH_BY_TAGS }
