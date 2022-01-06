import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { motion, AnimateSharedLayout } from 'framer-motion'


const ALL_TAGS_QUERY = gql`
  query ALL_TAGS_QUERY {
    allTags(orderBy: "name") {
      id
      name
    }
  }
`
const Tabs = styled.ul`
  width: 80%;
  max-width: 1200px;
  display: flex;
  justify-content: space-evenly;
 align-items: center;
  margin: 25px auto 40px;
  height: 50px;
  border-radius:30px;
  background: rgba(50,50,50,1);
  text-align: center;
  list-style: none;
transform: translateY(-50px);
  &:after {
    /* border-bottom: 1px solid rgba(20, 20, 20, 0.2); */
    position: absolute;
    content: '';
    width: 100%;
    transform: translateY(28px);
  }
  li {
    font-family: 'Bison';
    letter-spacing: 3px;
    color: white;
    font-size: 16px;
    /* line-height: 20px;  */
    position: relative;
    cursor: pointer;
   user-select: none;
 transition: .4s;
 &:hover {
   color: #f8b0b0;
 }
  }
`
const linkNames = ['Categories', 'My Favorites', 'Short Sweats', 'Search']
export default function VodCategoriesTabs({  id   }) {
 
   const [selectCategory, setSelectCategory] = useState('Categories')
 
  
   const { data, loading } = useQuery(ALL_TAGS_QUERY)
  if (loading) return <p>loading...</p>
  // if (error)return <Error error={error} />
  if (!data.allTags) return null
  const tags = data.allTags && data.allTags
  const handleCategory = (e, theLink) => {

    setSelectCategory(theLink)
  }


  return (
<AnimateSharedLayout>
      <Tabs>
  
          {linkNames.map((theLink, i) => {
            const isSelected = selectCategory === theLink ? true : false
            return(      
                 <li
                 key={theLink}
         
            className="outline"
        
        
 
    

            onClick={(e) => {
              handleCategory(e, theLink)
            }}
          > {theLink}</li>
            )}
        )}
        
      </Tabs>
</AnimateSharedLayout>
  )
}

 