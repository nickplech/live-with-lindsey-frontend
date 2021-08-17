import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components'
import gql from 'graphql-tag'
import Loader from './Loader'
import useClippy from 'use-clippy';
import Error from './ErrorMessage'
import {useQuery} from '@apollo/client'
import {startOfWeek, endOfWeek, format, set} from 'date-fns'
import Popup from 'reactjs-popup';
import { motion } from "framer-motion";


const AD_STREAMS_QUERY = gql`
  query AD_STREAMS_QUERY($date: String) {
    allItems(where: { date_gte: $date }, orderBy: "date") {
      id
      date
      open
      stillAvailable
      status
      reason {
        id
        name
      }
    }
  }
`


const Wrap = styled.div`

width: 100%;
height: 100%;

transform: translateY(20px);
  max-width: ${(props) => props.theme.innerWidth};
transition: .3s;
.title {
  font-family: 'Bison';
  font-size: 30px;
  width: 100%;
  margin: 0;
  color: ${props => props.theme.third};

}
.info {
  font-family: 'Bison';
  font-size: 20px;
}
span {
  color: ${props => props.theme.fourth};
}
p{

  line-height: 30px;
  padding: 5px 15px;
  width: 300px;
  display: flex;
  justify-self: center;
  margin: 0 auto;
  text-align: center;
    font-family: 'Bison';
  font-size: 30px;
  margin-top: 25px;
  background: ${props => props.theme.second};
  color: white;
}

`
const Listy = styled.ul`
text-align: left;
display: flex;
flex-flow: column;
padding-left: 5px;
align-items: flex-start;
  list-style: none;
  font-family: 'Bison';
  color: ${props => props.theme.third};
  h1 {
    font-size: 26px;
  }
p{
  margin: 0;
  line-height:20px;
    font-family: 'Bison';
  font-size: 20px;
  color: ${props => props.theme.third};
}
li {
 display: grid;
 border-radius: 10px;
 grid-template-columns: 100px 125px 1fr;
grid-auto-rows: 100px;
 /* border: 2px solid lightgrey; */
 width: 95%;
 border: 1px solid lightgrey;
 background: ${props => props.theme.white};
 max-width: 600px;
 justify-content:flex-start;
 align-items:flex-start;
 text-align: left;
 box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09);
}

/* &:hover {
  background: rgba(240,240,240,.8);
} */
`
const Bubble = styled.div`
background: white;
animation-name: jiggle;
border: 2px solid black;
border-radius: 10px;
padding: 5px  10px;
font-family: 'Bison';
h4 {
  margin: 0;
font-size: 16px;
letter-spacing: 2px;
}
p{
  font-size: 15px;
  letter-spacing: 2px;
  margin: 0;
  line-height: 18px;
}
`
const Div = styled.div`
display: flex;
grid-column: 1;
border-radius: 10px 0 0 10px;
justify-content: center;
flex-flow: column;
align-items: center;
height: 100%;
width: 100%;
  margin: 0 auto;
  margin-right: 0px;

background: ${props => props.theme.second};
    font-family: 'Bison';

  color: ${props => props.theme.third};
  p {
    margin: 0 auto;
line-height: 26px;
font-size: 26px;
  }

`
const Stacked = styled.div`
grid-column: 2;
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
margin: 0;
margin-right: 20px;
.off {
  display: flex;
  justify-content: center;
  align-items: center;
  background:white;
letter-spacing: 2px;
height: 100%;
width: 100%;
cursor: pointer;
&:hover {
  background-color: rgba(240,240,240,.9);
}
}
.standby {
    display: flex;
  justify-content: center;
  align-items: center;
  background: yellow; opacity: .6;

height: 100%;
width: 100%;
}
.live {
    display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  cursor: pointer;
  opacity: .6;
  color: white;
height: 100%;
width: 100%;
}
`
const Name = styled.div`
grid-column: 3;
width: 100%;
height: 100%;
display: flex;
flex-flow: column;
justify-content: center ;
align-items: center;
h1 {
  margin: 0 auto;
line-height: 18px;
font-size: 18px;
}
p {
  font-size: 16px;
  line-height: 16px;
  margin: 0;
  margin-bottom: 10px;
}
`

function ManageAdmin(props) {

  const [selectedButton, setSelectedButton] = useState(0)
  const [clipboard, setClipboard] = useClippy();
  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const weekEnds = endOfWeek(new Date())




  const {data, loading, error} = useQuery(AD_STREAMS_QUERY, {variables: {date: format(new Date(), 'yyyy-MM-dd') }})
  if(loading ) return <Loader />
  if(error) return <Error error={error} />
  if(!data.allItems) return null
const Items = data.allItems
  return (
    <Wrap>
      <p>The week of:{' '}
            {`${
              format(weekStarts, 'M/dd') +
              ' ' +
              '-' +
              ' ' +
              format(weekEnds, 'M/dd')
            }`}</p>
              <h3 className="title">Your Current Scheduled Classes: <span>{Items.length} Total</span></h3>
            <Listy>
      {Items && Items.map((item, i) => {
        const today = format(new Date(), 'eee')
        const isToday = today === format(new Date(item.date), 'eee')
        console.log(isToday)
        const id = item.id
        return(
        <li key={i} style={{marginBottom: '20px'}}>
        <Div>
          <h1 style={{margin: '0 auto'}}>{format(new Date(item.date), 'eee')}</h1>
          <h2  style={{margin: '0 auto', lineHeight: '15px'}}>{format(new Date(item.date), 'h:mm aa')}</h2>
        </Div>
        <Stacked>
        <Popup
          on={['hover', 'focus']}
          trigger={<div onClick={() => {setClipboard(id)}} className="off"><img src="../static/img/lock-open.svg" height="18" style={{marginRight: '5px'}} />Get StreamId</div>
          }
            position="right center"
            nested
          >
            <Bubble>
            {clipboard === id ? <motion.h4
    className="message-jiggle"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
  >
Stream Id Has Been Copied!</motion.h4> : <h4>{item.id}</h4>}

</Bubble>
        </Popup>
        { selectedButton === 2 ? <div className="live">online</div> : <div className="live">offline</div> }
        </Stacked>
<Name>
        <h1>{item.reason.name}</h1>
        <h2 style={{margin: '0 auto'}}>{format(new Date(item.date), 'MMM, dd yyyy')}</h2>
</Name>
        </li>
    ) })}</Listy>
    </Wrap>
  );
}


export default ManageAdmin;
export {AD_STREAMS_QUERY}