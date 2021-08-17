import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Loader from './Loader'
import Error from './ErrorMessage'
import VanillaTilt from 'vanilla-tilt'
import Link from 'next/link'
import { format } from 'date-fns'

const RECOMENDED_BASED_ON_VOD_QUERY = gql`
  query RECOMENDED_BASED_ON_VOD_QUERY($tags: [String], $id: ID!) {
    allVideoOnDemands(
      where: { AND: [{ tags_some: { name_in: $tags } }, { id_not: $id }] }
      first: 3
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
  grid-column: 1;

  grid-row: 3;
  width: 100%;
  flex-flow: column;
  @media (min-width: 768px) {
    grid-column: 1/3;
    grid-row: 3;
    width: 100%;
   
  }
`
const Recomended = styled.div`
  width: 100%;
  flex-flow: column;
  margin: 0px auto 50px auto;
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
/* &:after {
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, .5) 100%);
  content: '';
  width: 90%;
  height: 200px;
  border-radius: 10px;
  position: absolute;  max-width: 400px;
} */
&:hover {
  transform: scale(1.01);
}
  
  @media (min-width: 768px) {
    height: 200px;
    flex-flow: row;
    width: 90%;
    max-width: 400px;
  }
  h2 {
    color: white;
    font-family: 'Bison';
    user-select: none;
    letter-spacing: 2px;
    border-radius: 10px;
    font-size: 26px;
    line-height: 32px;
    padding: 5px;
   
    position: absolute;
    z-index: 9999;
    opacity: 1;
    margin: 15px 0 0;
    line-height: 24px;   
    padding-left: 10px;
  
   
    font-family: 'Bison';
    color: white;
 
  }
`

const H1 = styled.h1`
  color: ${(props) => props.theme.third};

  font-family: 'Bison';
  letter-spacing: 2px;
  margin: 30px 20px 10px;
  font-size: 22px;
  /* transform: translateY(-70px); */
  position: relative;
`
function Recommended({ tags, id }) {
  const tagArr = tags.map((tag) => {
    return tag.name
  })

  console.log(tagArr)
  const { data, loading, error } = useQuery(RECOMENDED_BASED_ON_VOD_QUERY, {
    variables: { tags: tagArr, id: id },
  })

  if (error) return <Error error={error} />
  if (loading) return <Loader />
  if (!data.allVideoOnDemands) return null
  const { allVideoOnDemands } = data

  return (
    <TheSection>
      <H1>Recomended Based on This Workout</H1>
      <Recomended>
        {allVideoOnDemands.map((video, i) => {
          return (
            <Link
            key={video.thumbnailUrl}
              href={{
                pathname: '/item',
                query: { id: video.id },
              }}
            >
              <Videos thumbnailUrl={video.thumbnailUrl} >
                <h2>{video.name}</h2>
              </Videos>
            </Link>
          )
        })}
      </Recomended>
    </TheSection>
  )
}

export default Recommended
export { RECOMENDED_BASED_ON_VOD_QUERY }
