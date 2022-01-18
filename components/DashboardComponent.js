import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Loader from './Loader'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
 
import Error from './ErrorMessage'
import WeekViewTwo from './WeekViewTwo'
import Link from 'next/link'
import {
  format,
  formatISO,
  formatDistanceToNow,

  isAfter,
  startOfWeek,
} from 'date-fns'
import Emoji from './Emoji'

import { useToast } from './contexts/LocalState'

import { useUser } from './User'

const USERS_WEEK_QUERY = gql`
  query USERS_WEEK_QUERY($id: [ID], $date: DateTime) {
    allItems(
      where: { AND: [{ user_some: { id_in: $id } }, { date_gte: $date }] }
      orderBy: "date"
    ) {
      id
      price
      date
      name
      open
      status
      stillAvailable
      private 
      reason {
        id
        name
        classLength
        classDescription
      }
      user {
        id
      }
      createdAt
    }
  }
`


const Pad = styled.div`
  overflow-x: hidden;
  grid-column: 1;
  position: relative;
 
`

 


const Div = styled.div`
  width: 100%;
height:300px;

  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  align-items: center;
margin-top: 0px;
  font-family: 'Bison';
  padding-top: 0px;
overflow: hidden;
  @media (min-width: 992px) {
    width: 100%;
    height:300px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    align-items: center;

    font-family: 'Bison';
    padding-top: 0px;
  
  }
  .smaller {
    margin: 5px auto;
    text-align: center;
    justify-self: center;
    display: flex;
    max-width: 500px;
    line-height: 26px;
    font-size: 32px;
    color: ${(props) => props.theme.second};
    letter-spacing: 4px;
    font-size: 28px;
    transform: translateY(10px);
  }
`
// const P = styled.p`
//   color: slategray;
//   margin: 5px auto;
//   text-align: center;
//   justify-self: center;
//   display: flex;
//   max-width: 500px;
//   line-height: 26px;
//   font-size: 32px;
//   color: ${(props) => props.theme.second};
//   letter-spacing: 4px;
//   &:nth-of-type(2) {
//     max-width: 400px;
//     font-size: 18px;
//     color: slategray;
//     letter-spacing: 3px;
//   }
// `
const SubText = styled.p`
  max-width: 400px;
  font-size: 18px;
  color: slategray;
  letter-spacing: 3px;
  line-height: 20px;
  span {
    cursor: pointer;
    color: ${(props) => props.theme.second};
    font-size: 20px;
    transition: 0.3s;

    &:after {
      height: 2px;
      background: ${(props) => props.theme.second};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-180px);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.55, 0, 1.31);

      margin-top: 2.2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: 170px;
      }
    }
  }
 
`
const ClassList = styled.div`
  transition: 0.2s;
 
margin: 10px 0 15px;
  position: relative;
  z-index: 500;

  .course {
    background-color: #fff;
    grid-template-columns: 140px 1fr 1fr;
    grid-template-rows: 1fr;
    border-radius: 10px;
 
    box-shadow: 0 10px 11px -6px rgba(0, 0, 0, 0.14),  0 -4px 46px rgba(0, 0, 0, 0.07);
    display: grid;

    width: 95%;
    max-width: 800px;
    margin: 0 auto 20px;

    height: 150px;
    overflow: hidden;
    @media (max-width: 568px) {
      grid-template-columns: 140px 1fr 1fr;
    }
  }
  h1 {
    line-height: 10px;
    font-size: 28px;
    align-self: center;
    font-family: 'Bison';
    margin: 0;
    transform: translateY(15px);
    color: ${(props) => props.theme.third};
  }
  .course h6 {
    opacity: 0.8;
    font-family: 'comfortaa';
    margin: 0;
    color: ${(props) => props.theme.third};
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transform: translateY(-4px);
  }
  .card__clock {
    width: 30px;
    align-self: center;
    fill: ${(props) => props.theme.third};
    opacity: 0.6;
    transform: translate(0, 3px); 
  }
  .card__time {
    opacity: 0.6;
    margin: 0;
    color: ${(props) => props.theme.third};
    letter-spacing: 1px;
    font-size: 20px;
    text-transform: uppercase;
    font-family: 'Bison';
    align-self: center;
    /* transform: translate(-7px, 16px); */
  }
  .card__clock-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transform: translate(0, 90px);
  }
  .course h2 {
    letter-spacing: 1px;
    margin: 10px 0;
    transform: translateY(15px);
    line-height: 24px;
    font-size: 16px;
    color: ${(props) => props.theme.third};
    font-family: 'Bison';
  }
  h4 {
    letter-spacing: 1px;
    margin: 10px 0;
    position: absolute;
    max-width: 100px;
    line-height: 24px;
    font-size: 24px;
    color: ${(props) => props.theme.third};
    font-family: 'Bison';
  }
  .course-preview {
    background: rgb(248, 176, 176);
    background: linear-gradient(
      90deg,
      rgba(248, 176, 176, 0.8057598039215687) 8%,
      rgba(252, 199, 198, 0.5396533613445378) 79%,
      rgba(255, 255, 255, 0.2903536414565826) 100%
    );
    color: ${(props) => props.theme.third};
    min-width: 155px;
    max-width: 155px;
    padding: 15px 10px;
    grid-column: 1;
  }
  h5 {
    margin: 0;
    margin-top: 8px;
  }
  .fas {
    transform: rotate(90deg);
  }
  .course-preview a {
    color: #fff;
    display: inline-block;
    font-size: 12px;
    opacity: 0.6;
    margin-top: 10px;
    text-decoration: none;
  }
  .course-info {
    padding: 15px;
    position: relative;
    width: 100%;
    grid-column: 2/3;
  }

  .btn-dis {
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    color: #fff;
    font-size: 16px;
    padding: 8px 5px;
    min-width: 190px;
    margin-top: 35px;
    letter-spacing: 1px;
    cursor: not-allowed;
    background-color: ${(props) => props.theme.second};
border: none;
    outline: none;
    box-shadow: 0 10px 11px -6px rgba(0, 0, 0, 0.14),  0 -4px 46px rgba(0, 0, 0, 0.07);
    opacity: 0.5;
    @media (max-width: 992) {
      width: 150px;
    }
    &:active {
      /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
      transform: scale(0.95); */
      background: lightsalmon;
    }
  }

  

  p {
    &:nth-of-type(1) {
      font-family: 'Bison';
      font-size: 22px;
      margin: 0;
      margin-top: 5px;
      color: ${(props) => props.theme.third};
      opacity: 0.8;
    }
  }
  
`
const Btn = styled.a`
 
    border-radius: 5px;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    color: #fff;
    font-size: 18px;
    padding: 0px 5px;
    min-width: 170px;
    margin-top: 30px;
    font-family: 'Bison';
    letter-spacing: 1px;
    cursor: pointer;
    background-color: ${(props) => props.theme.second};
    border: none;
    outline: none;
    box-shadow: 0 10px 11px -6px rgba(0, 0, 0, 0.2),  0 -4px 46px rgba(0, 0, 0, 0.07);
    @media (max-width: 992) {
      width: 150px;
    }
    &:active {
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  
    }
    &:hover {
      background-image: linear-gradient(195deg,  #f8b0b0 ,#ffd7d4, #f8b0b0);
   
    }
 
`
const Img = styled.img`
      transition: .2s;
      transform: rotate(180deg);
     
    ${Btn}:hover & {
transform: translate(5px,0)     rotate(180deg);
  }
`
const Status = styled.div`
  
  text-align: right;
  padding-right: 8px;
 position: absolute;
 right: 15px;
  font-family: 'Bison';
  .live-status {
    ${(props) =>
      props.status === 'GOING LIVE'
        ? 'color: grey'
        : props.status === 'COMPLETE'
        ? 'color: #6b996b'
        : props.status === 'LIVE'
        ? 'color: red'
        : null};
    letter-spacing: 3px;
    font-size: 18px;
  }
   .live-status2 {
    ${(props) =>
      props.status === 'GOING LIVE'
        ? 'background: lightgrey'
        : props.status === 'COMPLETE'
        ? 'background: lightgrey'
        : props.status === 'LIVE'
        ? 'background: #6b996b'
        : null};
  color: grey;
    letter-spacing: 3px;
    font-size: 17px;
    padding: 3px 3px;
    border-radius: 5px;
    margin-top: 8px;
    line-height: 18px;
      text-align: center;
  }
  .circle {
    background-color: rgba(255, 82, 82, 1);
    border-radius: 50%;
    animation: pulse-red 2s infinite;
    height: 10px;
    margin-left: 4px;
   
    width: 10px;
    position: relative;
    display: inline-flex;
  }
  /* .div {
    font-size: 16px;
    display: inline-flex;
  } */
  @keyframes pulse-red {
    0% {
      transform: translateY(-2px) scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    70% {
      transform: translateY(-2px)  scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    100% {
      transform: translateY(-2px)  scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }
`

const slideOut = {
  in: {
    opacity: 1,
    display: 'flex',
    transition: {
      type: 'tween',
      stiffness: 200,
    },
  },
  out: {
    opacity: 0,
    display: 'none',
    transition: {
      type: 'tween',
      stiffness: 200,
    },
    transitionEnd: {
      display: 'none',
    },
  },
}

  

function DashboardComponent() {
  const me = useUser()

 const { isToday } = useToast()
  const today = new Date()


  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const { error, loading, data } = useQuery(USERS_WEEK_QUERY, {
    variables: { date: formatISO(weekStarts), id: me && me.id },
  })
  if (loading) return <Loader />
  if (error) return <Error error={error} />
  if (!data) return null

  const items = data.allItems
 
  return (

      <Pad>
      
           
              <motion.div
                variants={slideOut}
                initial="in"
                animate={isToday === 'today' ? 'in' : 'out'}
              >
              <TodaysClasses
          
                isToday={isToday}
           
                items={items}
              
                id={me && me.id}
              />
              </motion.div>
              <motion.div
                variants={slideOut}
                initial="in"
                animate={isToday === 'today' ? 'out' : 'in'}
              >
              <WeekViewTwo
                items={items}
              
                today={today}
                id={me && me.id}
              />
              </motion.div>
           
        
      </Pad>

  )
}

function TodaysClasses({ items, id }) {
// const {readyToGoOut} = usePeerSocket()
  const [onHoverState, setOnHoverState] = useState(false)

  const handleSetOnHoverState = () => {
    setOnHoverState(true)
  }
  const noHover = () => {
    setOnHoverState(false)
  }
  const thisOneIsToday = items.some((item) => {
    const today = new Date().getDate()
    const classDate = new Date(item.date).getDate()

    return today === classDate
  }) 
 
  return(
  thisOneIsToday ?
 
        <ClassList>  
      {items.map((item) => {
        const today = new Date().getDate()
        const classDate = new Date(item.date).getDate()
        const classTime = new Date(item.date)
 
        const openUp = isAfter(new Date(), new Date(item.open))

        if(today !== classDate) {
          return 
        }
        return (
          item.private ?
          
          <div key={item.id} className="course ">
            <div className="course-preview private">
              <h4>{item.private && item.name}</h4>
              
            </div>
            <div className="course-info">
              <h1> {format(new Date(item.date), 'h:mm aa')}</h1>
              <h2> {format(new Date(item.date), 'eeee | MMMM dd')}</h2>

              {false ? (
                <Link
                  href={{
                    pathname: '/privateclass',
                    query: { id: item.id },
                  }}
                
                >
                  <Btn  style={{fontSize:'18px'}}>
                    Enter Private Session{' '}
                    
                  </Btn>
                </Link>
              ) : (
                <button className="btn-dis">Opens Upon Invite</button>
              )}
            </div>

            <Status status={item.status}>
              <div className="live-status2">
       
                {item.status && item.status === 'LIVE' && 'Open'}
           
              {item.status &&  item.status === 'GOING LIVE' ? (
               'Upcoming'
              ) : null}
              {item.status &&  item.status === 'COMPLETE' ? (
                'Complete'
              ) : null}   </div>
            </Status>{' '}
          </div>
          :
          <div key={item.id} className="course">
            <div className="course-preview">
              <h4>{item.reason && item.reason.name}</h4>
              <h4>{item.name && item.name} </h4>
              <div className="card__clock-info">
                <svg className="card__clock" viewBox="0 0 30 30">
                  <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>{' '}
                <span className="card__time">
                  {' '}
                  {item.reason && item.reason.classLength}
                </span>
              </div>
            </div>
            <div className="course-info">
              <h1> {format(new Date(item.date), 'h:mm aa')}</h1>
              <h2> {format(new Date(item.date), 'eeee | MMMM dd')}</h2>

              {openUp ? (
                <Link
                  href={{
                    pathname: '/stream/[...id]',
                    query: { id: item.id },
                  }}
                
                >
                  <Btn >
                    Join Live{' '}
                    <Img
                      style={{
                    
                        marginLeft: '3px',
                        marginTop: '1px'
                      }}
                      width="20px"
                      src="../static/img/arrow-back-white.svg"
                      alt="arrow"
                    />
                  </Btn>
                </Link>
              ) : item.status === 'COMPLETE' ? (
                <button className="btn-dis">{`Open @ ${format(
                  new Date(item.open),
                  'h:mm aa',
                )} `}</button>
              ) : (
                <button className="btn-dis">{`Open @ ${format(
                  new Date(item.open),
                  'h:mm aa',
                )} `}</button>
              )}
            </div>

            <Status status={item.status}>
              <div className="live-status">
                {item.status &&  item.status}{' '}
                {item.status && item.status === 'LIVE' && <span className="circle" />}
              </div>
              {item.status &&  item.status === 'GOING LIVE' ? (
                <h6>
                  {formatDistanceToNow(classTime, { addSuffix: true })}
                </h6>
              ) : null}
            </Status>
          </div>
        )
    }
 )}
</ClassList> 
: 
<Div>
          <p className="smaller">Rest Day? You&apos;ve earned it!</p>
          <SubText>
            Still looking to sweat?
            <br /> Crush an
            <Link href="/ondemand">
              <span
                onMouseOver={handleSetOnHoverState}
                onMouseOut={noHover}
                className={onHoverState ? 'animate' : ''}
              >
                {' '}
                on-demand workout
              </span>
            </Link><Emoji  symbol="💪" label="flexed bicep" />
          </SubText>
</Div>
  
  )
}


export default  DashboardComponent  
export { USERS_WEEK_QUERY }
