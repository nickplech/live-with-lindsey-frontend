import React from 'react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import { useToast } from './contexts/LocalState'
 
import {format} from 'date-fns'
import styled from 'styled-components'
import Error from './ErrorMessage'

 
const  PUBLIC_UPDATE_QUERY = gql`
  query  PUBLIC_UPDATE_QUERY {
    allPublicUpdates (orderBy: "createdAt_DESC") {
      id
      title
      iconImg
      textContent 
    publicHeadline 
    createdAt
    item {
      id
      name
      date
    }
       
    }
  }
`

const StatContainer = styled.div`
position: relative;
width: 90%;
height: 100%;
display: flex;
 
overflow-x:hidden;
`
const Stats = styled.div`
grid-column: 2;
grid-row: 1;
height: 100%;
width: 100%;
background:white;
display: grid;
position: absolute;
 
overflow-y: visible;
row-gap: 10px;
column-gap: 10px;
grid-template-columns: 1fr 1fr;
grid-template-rows:80px 200px;
.top-stats {
    grid-row: 1;
    display: flex;
  background: slategrey;
  border-radius: 10px;
 
 
  position: relative;
  z-index:200;
  margin: 10px auto 0;
  width: 100%;
padding: 5px 8px;
 
  transition: 0.3s;
  &:nth-of-type(1) {
    background: slategrey;
  }
  &:nth-of-type(2) {
    background: slategrey;
}
&:nth-of-type(3) {
    background: slategrey;
}
}
`
const Chart = styled.div`
grid-row: 2;
grid-column: 1/3;
height: 100%;
width: 100%;  
padding: 15px;
margin: 0 auto;  border-radius:15px;
background: slategrey; 
 
  `
   const Updates = styled.div`
   display: flex;
 width: 100%;
 height: 90%;
 position: relative;
 z-index: 9900;
 transform: translate(0, 10px);
 background: ${props => props.theme.primary};
 border-radius: 10px;
 `
export default function DashStats() {
  const {isToday} = useToast()
  const {data, loading, error} = useQuery(PUBLIC_UPDATE_QUERY)
if (loading) return <p>loading...</p>
if (error) return <Error error={error} />
if (!data) return null
  const {allPublicUpdates} = data
    return (
      <StatContainer>
      {isToday === 'today' ? <Updates>
       {allPublicUpdates.map(update => {
         return(
           <div>{update.textContent}    
  
  <p>{format(new Date(update.createdAt), 'dd mmm eee')}</p></div>
         )
       })}

 
          
        

 </Updates>
:
        <Stats>
            <div className="top-stats">Week Total:</div>
            <div className="top-stats">hi</div>
           
             <Chart>hey</Chart>
        </Stats>
}
</StatContainer>
    )
}
 