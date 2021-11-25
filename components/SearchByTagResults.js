import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Loader from './Loader'
import Error from './ErrorMessage'
import { ALL_FAVORITES_QUERY } from './VodFavoritesSlider'
import { ALL_TAGS_QUERY } from './UpdateTagSettings'
import VanillaTilt from 'vanilla-tilt'
import Link from 'next/link'
import { format } from 'date-fns'

const SEARCH_BY_TAGS = gql`
  query SEARCH_BY_TAGS($tags: [String]) {
    allVideoOnDemands(
      where: { AND: [{ tags_some: { name_in: $tags } }] }
      first: 15
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 20px;
  height: 100%;
  position: relative;
  width: 100%;
`
const Recommended = styled.div`
  width: 100%;
  flex-flow: column;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
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
  width: 100%;
  max-width: 400px;
  margin: 30px 20px 0 20px;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
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
    font-size: 226px;
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
function SearchByTagResults({ tags, id }) {
    const [tagArr, setTagArr] = useState([])

  const { data, loading, error } = useQuery(SEARCH_BY_TAGS, {
    variables: { tags: tagArr },
  })

  if (error) return <Error error={error} />
  if (loading) return <Loader />
  if (!data.allVideoOnDemands) return null
  const { allVideoOnDemands } = data

  return (
    <TheSection>
      <Recommended>
        {allVideoOnDemands.map((video, i) => {
          return (
            <Link
              href={{
                pathname: '/item',
                query: { id: video.id },
              }}
              key={video.id}
            >
              <Videos thumbnailUrl={video.thumbnailUrl} key={i}>
                <h2>{video.name}</h2>
              </Videos>
            </Link>
          )
        })}
      </Recommended>
    </TheSection>
  )
}

export default SearchByTagResults
export { SEARCH_BY_TAGS }
