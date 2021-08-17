import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import { ErrorLink } from '@apollo/link-error'

const ALL_TAGS_QUERY = gql`
  query ALL_TAGS_QUERY {
    allTags(orderBy: "name") {
      id
      name
    }
  }
`
const Tabs = styled.ul`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-evenly;
  margin: 0px auto;
  margin: 4px auto;
  padding: 0;
  text-align: center;
  list-style: none;
  border-bottom: 0px;
  &:after {
    border-bottom: 1px solid rgba(20, 20, 20, 0.2);
    position: absolute;
    content: '';
    width: 100%;
    transform: translateY(28px);
  }
  li {
    font-family: 'Bison';
    letter-spacing: 3px;
    color: grey;
    font-size: 18px;
    line-height: 26px;
    position: relative;
    cursor: pointer;
    height: 25px;
    margin: 0 4px;
  }
`
const linkNames = ['(Re)Live Streams', 'Quick Workouts', 'Search']

function VodCategoriesTabs(props) {
  const [selectCategory, setSelectCategory] = useState('All Videos')
  const { data, loading } = useQuery(ALL_TAGS_QUERY)
  if (loading) return <p>loading...</p>
  // if (error)return <Error error={error} />
  if (!data.allTags) return null
  const tags = data.allTags && data.allTags
  const handleCategory = (e, i) => {
    const selection = linkNames[i]
    setSelectCategory(selection)
  }
  return (
    <Tabs>
      {linkNames.map((link, i) => {
        return (
          <li
            style={{
              background: selectCategory === link ? '#f8b0b0' : 'transparent',
            }}
            onClick={(e) => {
              handleCategory(e, i)
            }}
            key={link}
          >
            {link === 'Favorites' && (
              <span>
                <img
                  style={{ marginRight: '4px', transform: 'translate(0, 1px)' }}
                  height="15px"
                  src={`../static/img/${
                    selectCategory === link ? 'heart6' : 'heart3'
                  }.svg`}
                />
              </span>
            )}
            {link}
          </li>
        )
      })}
    </Tabs>
  )
}

export default VodCategoriesTabs
