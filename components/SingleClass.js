import React, { useState } from 'react'

import styled from 'styled-components'
import Loader from './Loader'
import { CURRENT_USER_QUERY } from './User'
import { format } from 'date-fns'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { motion } from 'framer-motion'
import Footer from './Footer'
import ClassBackground from './ClassBackground'

const LIVE_STREAM_QUERY = gql`
  query LIVE_STREAM_QUERY($id: ID!) {
    Item(where: { id: $id }) {
      id
      date
      status
      tags {
        id
        name
      }
      user {
        id
      }
      equipment {
        id
        name
        description
        image {
          publicUrlTransformed
        }
      }
      reason {
        id
        name
        classLength
        classDescription
      }
    }
  }
`
const Div = styled.div`
  height: 100%;
  display: flex;
 flex-flow: column;

  position: relative;
  .actions {
    width: 100%;
    padding: 10px 5px;
    margin: auto;
    text-align: center;
  }
  .example-warper {
    width: 100%;
    padding: 20px 5%;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .imga {
    color: ${(props) => props.theme.second};
    background: white;
    border-radius: 50%;
    cursor: pointer;
    width: 55px;
    padding: 3px;
    margin: 10px;
    font-family: 'Bison';
  }
`
const Equip = styled.div`
  height: 45px;
  width: 45px;
  position: relative;
  display: flex;
  justify-self: flex-start;
  z-index: 16000;
  margin-top: 0px;

  border: 2px solid white;
  /* box-shadow: 0 3px 5px -1px rgba(20, 20, 20, 0.2); */
  background: url('${(props) => props.pic}') no-repeat center center;
  margin-right: 4px;
  background-size: contain;

  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  .popup-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 50%;
    padding: 5px;
  }
  .popup-arrow {
    color: rgb(255, 255, 255);
  }
  [role='tooltip'].popup-content {
    width: 200px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 3px;
  }
`
const InfoBar = styled.div`
width: 100%;
height: 50px;
margin: 0;
display: flex;
flex-flow: row;
position: relative;
align-items: center;
padding:  0px;
h1 {
    color: white;
    z-index: 1000;
    background: rgba(30,30,30,1);
    position: relative;
    font-family: 'Bison';
    letter-spacing: 4px;
    font-size: 22px;
    padding: 5px ;
    width: 100%;
    margin: 0;
    line-height: 25px;
  }
  .card__clock {
    width: 30px;
    align-self: center;
    fill: #ad7d52;
    
  }
  .card__time {
    opacity: 0.8;
    margin: 0;
    font-family: 'Bison';
    letter-spacing: 5px;

    font-size: 24px;
    color: white;
    letter-spacing: 1px;
    text-transform: uppercase;
    align-self: center;
     
  }
  .card__clock-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 25px;
  }
  h2 {
    color: slategrey;
    opacity: 1;
    z-index: 20000;
    position: relative;
    font-family: 'Bison';
    margin: 0;
    letter-spacing: 4px;
    border-bottom: 3px solid slategrey;
    font-size: 22px;
  }
`
            
const Background = styled.div`
  background: #ed4264;
 padding: 0;
 margin: 0;
  width: 100%;
  position: relative;
  z-index: 900;
  opacity: 1;
  background: -webkit-linear-gradient(to bottom, white, #ffd7d4);
  background: linear-gradient(to bottom, white, #ffd7d4);
 
  .live {
    color: white;
    background: rgba(240, 20, 20, 0.7);
    margin: 0;
    margin-right: 8px;
    line-height: 23px;
    padding: 2px 4px 2px 8px;
    transform: rotate(-4deg);
    display: inline-flex;
    font-size: 22px;
    font-family: 'Bison';
    letter-spacing: 4px;
    transition: 0.2s;
  }
  svg {
    background: black;
  }
`
const Description = styled.h4`
  color: slategrey;
  position: relative;
  z-index: 20000;
  margin: 0;
  max-width: 900px;
  margin-top: 20px;
  font-size: 18px;
  line-height: 22px;
  font-family: 'Bison';
  letter-spacing: 2px;
`

const EquipmentList = styled.div`
  display: flex;
grid-column: 2;
justify-content: center;
height: 100px;
align-items: center; 
grid-row: 2; margin-left: 0px;
position: relative;
transform: translateY(250px);
  flex-flow: row;
&:after {
  content: 'EQUIPMENT';
  color: lightgrey;
  opacity:.4;
  transform: translate(-10px);
  font-size: 80px;
  line-height:80px;
  text-align: center;
  width: 100%;
  z-index: 0;
  margin: 10px auto;
  background: rgba(230,230,230,.8);
  font-family: 'Bison';
  position: absolute;
}
  .noequip {
    font-size: 24px;
    color: slategray;
    opacity: .6;
    margin-top: 0;
    z-index: 100;
    transform: translate(0, 5px);
    padding-top: 0;
    color: rgba(200,100,100,.8);
    line-height: 24px;
  }
  .title-equip {
    font-family: 'Bison';
    line-height: 20px;
    margin-bottom: 0;
    margin-left: 15px;
    transform: translateY(8px);
    letter-spacing: 2px;
    color: rgba(30, 30, 30, 0.8);
    font-size: 20px;
  }
 
  
  p {
    margin: 3px;
  }
`
const PopUp = styled.span`
  cursor: pointer ;
    margin: 15px 15px ;
 display: flex; 
 flex-flow: row;
 width: 100%;
 position: relative;
 z-index: 2000;
    justify-content: center;
    align-items: center;
    line-height: 26px;
 border-radius: 50%;
 background: ${props => props.theme.second};
 width: 40px;
 height: 40px;
    font-size: 21px;
    font-family: 'Bison';
    list-style: none;
    color: white;

  -moz-box-shadow: 
    1px 1px 5px rgba(0, 0, 0, 0.2), 
    inset 1px 1px 15px rgba(100, 100, 100, 0.15);
  -webkit-box-shadow: 
    1px 1px 5px rgba(0, 0, 0, 0.2),
    inset 1px 1px 15px rgba(100, 100, 100, 0.15);
  box-shadow: 
    1px 1px 5px rgba(0, 0, 0, 0.2),
    inset 1px 1px 15px rgba(100, 100, 100, 0.15);
  
    transition: 0.3s;
    &:after {
      content:'  ${props => props.description}';
      position: absolute;
      left: 50%;
      margin: 0 auto;
      top: calc(100% + 10px);
      background:rgba(250,250,250,1);
      display: flex;
      padding: 7px 11px;
      text-align: center;
      color: slategrey;
      font-weight: 300;
      border: 2px solid #ffd7d4;
      border-radius: 6px;
    width: 200px;
      opacity: 0;
      font-size: .7em;
      line-height: 16px;
      //transform: translate(-50%, 5px);
      transform-origin: 50% 100%;
      transform: translate(-100%)  ;
      transition-duration: .3s;
      pointer-events: none;
      box-shadow: 0 2px 13px 0 rgba(20,20,20,.2);
    }
    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid  #ffd7d4;
      border-width: 8px 6px;
      border-color:   transparent transparent #ffd7d4 transparent;
      left: 0;
      right: 0;
      margin: auto;
      bottom: -10px;
      opacity: 0;   box-shadow: 0 2px 13px 0 rgba(20,20,20,.2);
      transition-duration: .3s;
      transform: translate(-50%)   ;
    }

    &:hover {
      &:after {
        opacity: 1;
        //transform: translateX(-50%);
        transform: translate(-50%) rotateX(0deg);
        pointer-events: all;
      }

      &:before {
        opacity: 1;   transform: translate(-50%) rotateX(0deg);
      }
    }
    .theequipment {
      box-shadow: 
 
    0 1px 4px rgba(0, 0, 0, 0.19), 0 4px 40px rgba(0, 0, 0, 0.09) ;
    }
`
function OwnsIt({ id }) {
  const { data, loading } = useQuery(CURRENT_USER_QUERY)
  if (loading) return <p>loading</p>
  if (!data.authenticatedUser) return <SingleClass id={id} />
  const me = data.authenticatedUser

  return <SingleClass id={id} userId={me.id} />
}
function SingleClass({ id, userId }) {
  
  const parent = {
    variantA: { scale: 1, boxShadow: 'none' },
    variantB: {
      scale: 1.07,
      boxShadow: '0px 3px 5px 3px rgba(20, 20, 20, 0.1)',
    },
  }

  const { data, loading, error } = useQuery(LIVE_STREAM_QUERY, {
    variables: { id: id },
  })
  if (!data) return null
  if (loading) return <Loader />

  const item = data.Item
  const owner = userId
    ? item.user.some((userIds) => {
        return userIds.id === userId
      })
    : false
 
console.log(item.date)
  return (
    <Div>
      <ClassBackground
        tags={item.tags}
        status={item.status}
        owner={owner}
        date={item.date}
        name={item.reason.name}
        classId={item.id}
      
      />

      <Background>
        <InfoBar>
        <div className="card__clock-info">
          {' '}
          <div><h1>{item.reason.name} -</h1>  <svg
            className="card__clock"
            style={{ fill: '#fff' }}
            viewBox="0 0 30 30"
          >
            <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
          </svg> {' '}
          <span className="card__time"> {item.reason.classLength}</span></div>
         
        </div>
        </InfoBar>
        <h2>
          <span className="live">LIVE</span>
          {format(new Date(item.date), 'eeee | MMMM dd') +
            ' ' +
            '@' +
            ' ' +
            format(new Date(item.date), 'h:mm aa')}
        </h2>{' '}
        <Description>{item.reason.classDescription}</Description>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '250px',
          }}
        >
          {' '}
          <EquipmentList>
            
              {item &&  item.equipment.length === 0 ? <p className="noequip">No Equipment For this Workout</p> : 
              item && item.equipment.map((equip) => {
                  
                return (
            
                  <PopUp description={equip.description} name={equip.name} key={equip.name}>
             <img className="theequipment" style={{borderRadius: '50%',  height: '45px', width: '45px'  }} src={equip.image.publicUrlTransformed} alt={equip.name} /> 
                  
                   </PopUp>

                )
              })}
           
          </EquipmentList>
        </div>
      </Background>
      <Footer />
    </Div>
  )
}

export default OwnsIt
export { LIVE_STREAM_QUERY }
