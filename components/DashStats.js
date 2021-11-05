import React from 'react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import { useToast } from './contexts/LocalState'
 
import {format} from 'date-fns'
import styled from 'styled-components'
import Error from './ErrorMessage'
import ChartStats from './ChartStats';

 
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
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows:40% 60%;
.top-stats {
    grid-row: 1;
    display: flex;
  background: transparent;
  border-radius: 10px;
 
 justify-content: center;
 text-align: center;
  position: relative;
  z-index:200;
  margin: 10px auto 0;
  width: 100%;
padding: 5px 8px;
 
  transition: 0.3s;
  &:nth-of-type(1) {
    background: transparent;
  }
  &:nth-of-type(2) {
    background: transparent;
}
&:nth-of-type(3) {
    background: transparent;
}
}
`
const Chart = styled.div`
grid-row: 2;
grid-column: 1/4;
height: 100%;
width: 100%;  
padding: 15px;
margin: 0 auto;  border-radius:15px;
background: transparent; 
 
  `
   const Updates = styled.div`
   display: flex;
 width: 100%;
 height: 110%;
 position: relative;
 padding-top: 20px;
 z-index: 900;
 transform: translate(0, 10px);
flex-flow: column; 
 border-radius: 10px;
 `
 const UpdateImg = styled.div`
 display: grid;
 grid-template-columns: 60px 1fr 50px;
 grid-template-rows:   1fr ;
 /* border: 1px solid lightgray; */
 border-radius: 10px 0 0 10px;
 border-right:5px solid ${props => props.colorType};
  align-items: center;
 background-size: cover;
 width: 100%;
 height: auto;        
position: relative;
margin-bottom: 30px;
padding-left: 10px;
.icon-box {
  grid-column: 1;
   background-image: linear-gradient(195deg,  #f8b0b0 ,#ffd7d4, #f8b0b0);
  height: 60px;
  width: 60px;
  border-radius: 10px;
  color: white;
}
.title {
  color: slategray;
  font-size: 16px;
  text-align: center;
  letter-spacing: 2px;
  line-height: 16px;
  padding-left: 15px; grid-column: 2;grid-row: 1;
}
.content {
  color: slategray;
  font-size: 14px;
  line-height: 15px;
}
.sinceTime {
  grid-column: 2;grid-row: 1;
  position: absolute;align-self: flex-end;
}
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
         const lowerCased = update.iconImg.toLowerCase()
         return(
           <UpdateImg colorType={'#f8b0b0'}>
             <div className="icon-box" >
               <img height="45" src={`../static/img/${lowerCased}.png`} alt={lowerCased} />
           </div> 
           <p className="title">
              {update.title}    
</p>
 
  <p className="sinceTime">{format(new Date(update.createdAt), 'eee')} </p></UpdateImg>
         )
       })}

 
          
        

 </Updates>
:
        <Stats>
            <div className="top-stats">Week Total:</div>
            <div className="top-stats">hi</div>
            <div className="top-stats">ho</div>
             <Chart><ChartStats/></Chart>
        </Stats>
}
</StatContainer>
    )
}
 