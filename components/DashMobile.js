import React, { useState } from 'react'
import styled from 'styled-components'
import Loader from './Loader'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import Error from './ErrorMessage'
import WeekViewTwo from './WeekViewTwo'
import Link from 'next/link'
import {
  format,
  formatDistanceToNow,
  isPast,
  isWithinInterval,
  subMinutes,
  isAfter,
  addMinutes,
  startOfWeek,
} from 'date-fns'
import { useToast } from './contexts/LocalState'
import ProductSlider from './ProductSlider'
import TickerFeed from './TickerFeed'
import { useUser } from './User'
import { motion } from 'framer-motion'

const USERS_WEEK_QUERY = gql`
  query USERS_WEEK_QUERY($id: [ID], $date: String) {
    allItems(
      where: { AND: [{ user_some: { id_in: $id } }, { date_gte: $date }] }
      orderBy: "date"
    ) {
      id
      price
      date
      name
      status
      stillAvailable
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

const STREAMS_QUERY = gql`
  query STREAMS_QUERY($date: String) {
    allItems(where: { date_gte: $date }, orderBy: "date") {
      id
      price
      date
      user {
        id
      }
      reason {
        id
        name
        classLength
      }
    }
  }
`

const Pad = styled.div`
  overflow-x: hidden;
  position: relative;
  .line {
    display: none;
    color: white;
    transform: translate(65px, -105px);
    padding: 0;
    position: absolute;
    color: white;
    opacity: 1;
    font-size: 35px;
    margin-top: 0;
    z-index: 999;
    font-family: 'Felix';
    grid-column: 1;

    @media (max-width: 992px) {
      display: flex;
      font-size: 25px;
      transform: translate(105px, -85px);
    }
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr ;
  grid-template-rows: ${(props) =>
    props.items.length === 0 ? '1fr' : 'minmax(150px, 350px) 1fr'};
  /* grid-row-gap: 50px; */
  width: 100%;
  position: relative;
  /* transform: translateY(-165px); */
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const Title = styled.div`
  display: flex;
  margin: 20px 0px 0px 25px;
  width: 100%;
  border-bottom: 3px solid rgba(20, 20, 20, 0.2);
  font-family: 'Felix';
  font-size: 32px;
  color: ${(props) => props.theme.second};
  margin: ${(props) =>
    props.items.length === 0 ? ' -90px 0px 0px 25px' : '20px 0px 0px 25px'};
  @media (max-width: 568px) {
    font-size: 22px;
    margin: ${(props) =>
      props.items.length === 0 ? ' -70px 0px 0px 25px' : '20px 0px 0px 25px'};
  }
`

const Div = styled.div`
  width: 100%;
  height: 350px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  transform: translateY(-30px);
  font-family: 'Bison';
  padding-top: 0px;
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
const P = styled.p`
  color: slategray;
  margin: 5px auto;
  text-align: center;
  justify-self: center;
  display: flex;
  max-width: 500px;
  line-height: 26px;
  font-size: 32px;
  color: ${(props) => props.theme.second};
  letter-spacing: 4px;
  &:nth-of-type(2) {
    max-width: 400px;
    font-size: 18px;
    color: slategray;
    letter-spacing: 3px;
  }
`
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
  grid-column: 1/3;
  grid-row: 1;
  transform: translateY(-25px);
  position: relative;
  z-index: 500;   width: 95%;
   
    margin: 0 auto;
  .complete {
    color: green;
    letter-spacing: 3px;
    font-size: 18px;
  }
  .goingLive {
    color: grey;
    letter-spacing: 3px;
    font-size: 18px;
  }
  .course {
    background-color: #fff;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 60px;
    border-radius: 10px;
    /* border: 1px solid rgba(20, 20, 20, 0.05); */
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.2);
    display: grid;
    width: 95%;
    max-width: 600px;
margin: 0 auto 30px;
    background: linear-gradient(
      90deg,
       rgba(248, 196, 196, 1 )0%,
      rgba(255, 245, 245, 1) 30%,
     rgba(255, 245, 245, 1) 70%,
    rgba(248, 196, 196, 1 ) 100%
    );
    height: 180px;
    overflow: hidden;
  }
  h1 {
    line-height: 10px;
    font-size: 23px;
    align-self: center;
    font-family: 'Bison';
    margin: 0;
    transform: translateY(10px);
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
    fill: #ad7d52;
    transform: translate(-3px, 20px);
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
    transform: translate(-7px, 16px);
  }
  .card__clock-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .course h2 {
    letter-spacing: 1px;
    margin: 10px 0;
    transform: translateY(5px);
    line-height: 24px;
    font-size: 18px;
    color: ${(props) => props.theme.third};
    font-family: 'Bison';
  }

  h5 {
    margin: 0;
    margin-top: 8px;
  }
  .fas {
    transform: rotate(90deg);
  }

  .course-info {
justify-content: center;
text-align: center;
align-items: center;
min-width: 220px;
    padding: 15px;
    position: relative;
    width: 100%;
    grid-column:2;
    grid-row: 1/3;
  }
    h4 {
    letter-spacing: 1px;
    margin: 10px 0;
    line-height: 24px;
    font-size: 26px;
 
    width: 100%;
    color: ${(props) => props.theme.third};
    font-family: 'Bison';
  }

  .butt {
    height: 100%;
    width: 100%;
    position: relative;
    grid-column: 2;
    grid-row: 2;
  }
  .status {
    grid-column: 2;
    text-align: right;
    padding-right: 10px;
    width: 100%;
    grid-row: 1;
    position: absolute;
    font-family: 'Bison';
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
    min-width: 100%;
    margin-top: 35px;
    letter-spacing: 1px;
    cursor: pointer;
    background-color: ${(props) => props.theme.second};
    border: 1px solid;
    outline: none;
    box-shadow: 0 6px 6px  rgba(0, 0, 0, 0.2);
    opacity: 0.5;
    @media (max-width: 768px) {
      
    }
    &:active {
      /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
      transform: scale(0.95); */
      background: lightsalmon;
    }
  }

  .btn {
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
    font-family: 'Bison';
    letter-spacing: 1px;
    cursor: pointer;
    background-color: ${(props) => props.theme.second};
    border: 1px solid;
    outline: none;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2);
    &:active {
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
      transform: scale(0.95);
    }
    &:hover {
      transform: scale(1.02);
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
  .circle {
    background-color: rgba(255, 82, 82, 1);
    border-radius: 50%;
    animation: pulse-red 2s infinite;
    height: 15px;
    margin-left: 6px;
    margin-bottom: -2px;
    width: 15px;
    display: inline-flex;
  }
  .div {
    font-size: 16px;
    display: inline-flex;
  }
  @keyframes pulse-red {
    0% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    100% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }
`
const Schedule = styled.div`
  font-family: 'Felix';
  text-transform: uppercase;
  z-index: 900;
  grid-row: ${(props) => (props.items.length === 0 ? 1 : 2)};
  grid-column: 1/3;
  width: 100%;
  position: relative;
  h1 {
    margin: 2px;
    font-size: 46px;
  }
  .subTight {
    display: ${(props) => (props.items.length === 0 ? 'flex' : 'none')};
    color: white;
    font-family: 'Bison';
    margin: 0;
    transform: translate(30px, -10px);
    letter-spacing: 2px;
  }
`
const TodayName = styled.span`
  transform: translate(65px, -105px);
  padding: 0;
  position: absolute;
  color: white;

  opacity: ${(props) => (props.isSelected === 'today' ? 1 : 0.5)};
  font-size: 35px;
  margin-top: 0;
  z-index: 999;
  font-family: 'Felix';

  @media (max-width: 992px) {
    cursor: pointer;
    font-size: 26px;
    transform: translate(15px, -85px);
  }
`
const WeekName = styled.span`
  display: none;
  color: white;
  transform: translate(65px, -105px);
  padding: 0;
  position: absolute;
  color: white;
  opacity: ${(props) => (props.isSelected === 'week' ? 1 : 0.5)};
  font-size: 35px;
  margin-top: 0;
  z-index: 999;
  font-family: 'Felix';
  grid-column: 1;

  @media (max-width: 992px) {
    display: flex;
    /* font-size: ${(props) =>
      props.isSelected === 'week' ? '35px' : '20px'}; */
    font-size: 26px;
    transform: translate(120px, -85px);
    cursor: pointer;
  }
`
const Status = styled.div`
  grid-column: 3;
  text-align: right;
  padding-right: 10px;
  width: 100%;
  font-family: 'Bison';
  .live-status {
    ${(props) =>
      props.status === 'GOING LIVE'
        ? 'color: grey'
        : props.status === 'COMPLETE'
        ? 'color: green'
        : props.status === 'LIVE'
        ? 'color: red'
        : null};
    letter-spacing: 3px;
    font-size: 18px;
  }
  .circle {
    background-color: rgba(255, 82, 82, 1);
    border-radius: 50%;
    animation: pulse-red 2s infinite;
    height: 15px;
    margin-left: 4px;
    margin-bottom: -1px;
    width: 15px;
    display: inline-flex;
  }
  /* .div {
    font-size: 16px;
    display: inline-flex;
  } */
  @keyframes pulse-red {
    0% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    100% {
      transform: scale(0.9);
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
function DashMobile() {
  const me = useUser()
  const { active, isSelected, setIsSelected } = useToast()

  const today = new Date()
  const count = me.cart.reduce(
    (tally, cartItem) => tally + cartItem.quantity,
    0,
  )

  const inCart = me.cart.map((cartItem) => {
    const cartItemIdArray = cartItem && cartItem.item.id
    return cartItemIdArray
  })

  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const { error, loading, data } = useQuery(USERS_WEEK_QUERY, {
    variables: { date: format(weekStarts, 'yyyy-MM-dd'), id: me.id },
  })
  if (loading) return <Loader />
  if (error) return <Error error={error} />
  if (!data) return null

  const items = data.allItems
  const userPic = me.image && me.image.publicUrlTransformed
  const firstName= me.firstName

  return (
    <>
      <Pad>
        <TickerFeed
          today={today}
          count={count}
          me={me}
 
       firstName={firstName}
       showPic={false}
        />
        <TodayName
          setIsSelected={setIsSelected}
          isSelected={isSelected}
          onClick={(e) => setIsSelected('today')}
          className="today"
        >
          TODAY{' '}
        </TodayName>{' '}
        <span className="line">|</span>
        <WeekName
          setIsSelected={setIsSelected}
          isSelected={isSelected}
          onClick={(e) => setIsSelected('week')}
          className="mobile"
        >
          WEEK
        </WeekName>
        <Grid items={items}>
          {items.length === 0 ? null : (
            <>
              <motion.div
                variants={slideOut}
                initial="in"
                animate={isSelected === 'today' ? 'in' : 'out'}
              >
                <TodaysClasses
                  setIsSelected={setIsSelected}
                  isSelected={isSelected}
                  onClick={(e) => setIsSelected('today')}
                  items={items}
                  active={active}
                  id={me.id}
                />
              </motion.div>
              <motion.div
                variants={slideOut}
                initial="in"
                animate={isSelected === 'today' ? 'out' : 'in'}
              >
                <WeekViewTwo
                  items={items}
                  active={active}
                  today={today}
                  id={me.id}
                />
              </motion.div>
            </>
          )}
          <Schedule items={items}>
            <Title items={items}>Scheduled Live Workouts </Title>
            <p className="subTight">
              Getting Started? Explore this week's Live Workouts below!
            </p>
            <ScheduledClasses active={active} id={me.id} inCart={inCart} />
          </Schedule>
        </Grid>
      </Pad>
    </>
  )
}

function TodaysClasses({ items, active, isSelected, setIsSelected }) {
  const [onHoverState, setOnHoverState] = useState(false)

  const handleSetOnHoverState = () => {
    setOnHoverState(true)
  }
  const noHover = () => {
    setOnHoverState(false)
  }

  const todaysClasses = items
  const changeUi = todaysClasses.map((theClass) => {
    const today = new Date().getDate()
    const todayOnly = new Date(theClass.date)
    const matchesBoth = todayOnly.getDate() === today
    return matchesBoth
  })

  if (!todaysClasses)
    return (
      <>
        <Div>
          <p className="smaller">Rest Day? You've earned it!</p>
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
            </Link>
          </SubText>
        </Div>
      </>
    )

  return (
    <>
      {changeUi.some((fromToday) => {
        return fromToday === true
      }) ? (
        <ClassList>
          {todaysClasses.map((item, i) => {
            const today = new Date().getDate()
            const todayOnly = new Date(item.date)
            const matchesBoth = todayOnly.getDate() === today
            const intLength = item.reason.classLength.split(' ')
            const intSplit = parseInt(intLength[0])
            const endTime = addMinutes(todayOnly, intSplit)

            const intInterval = isWithinInterval(new Date(), {
              start: todayOnly,
              end: new Date(endTime),
            })

            const fifteenBefore = subMinutes(todayOnly, 15)
            const openUp = isAfter(new Date(), new Date(fifteenBefore))

            if (matchesBoth)
              return (
                <div key={item.id} className="course">
                  {/* <div className="course-preview">
                      <div className="card__clock-info">
                        <svg className="card__clock" viewBox="0 0 30 30">
                          <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                        </svg>{' '}
                        <span className="card__time">
                          {' '}
                          {item.reason.classLength}
                        </span>
                      </div>
                    </div> */}
                  <div className="course-info">
                    <h4>{item.reason.name}</h4>
                    <h1> {format(new Date(item.date), 'h:mm aa')}</h1>
                    <h2> {format(new Date(item.date), 'eeee | MMMM dd')}</h2>
                  </div>
                  <div className="butt">
                    {openUp ? (
                      <Link
                        href={{
                          pathname: '/stream/[...id]',
                          query: { id: item.id },
                        }}
                        as={'/stream/' + item.id}
                      >
                        <a className="btn">
                          Join Live{' '}
                          <img
                            style={{
                              transform: 'rotate(180deg)',
                              marginLeft: '3px',
                            }}
                            width="20px"
                            src="../static/img/arrow-back.svg"
                            alt="arrow"
                          />
                        </a>
                      </Link>
                    ) : (
                      <button className="btn-dis">{`Open @ ${format(
                        fifteenBefore,
                        'h:mm aa',
                      )} `}</button>
                    )}
                  </div>

                  <Status status={item.status}>
                    <div className="live-status">
                      {item.status}{' '}
                      {item.status === 'LIVE' && <span className="circle" />}
                    </div>
                    {item.status === 'GOING LIVE' ? (
                      <h6>
                        {formatDistanceToNow(todayOnly, { addSuffix: true })}
                      </h6>
                    ) : null}
                  </Status>
                </div>
              )
          })}{' '}
        </ClassList>
      ) : (
        <Div>
          <p className="smaller">Rest Day? You've earned it!</p>
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
            </Link>
          </SubText>
        </Div>
      )}{' '}
    </>
  )
}

function ScheduledClasses({ inCart, id, active }) {
  const { error, loading, data } = useQuery(STREAMS_QUERY, {
    variables: { date: format(new Date(), 'yyyy-MM-dd') },
  })
  if (loading) return <Loader />
  if (error) return <Error error={error} />
  const ownsItem = data.allItems.map((item) => {
    const theUsers = item.user.find((theUser) => {
      return theUser.id === id
    })
    return theUsers
  })
  if (!data.allItems.length)
    return (
      <Div>
        <P>That's it for this week!</P>
        <P>Please Check back Sunday for the Upcoming Live Schedule</P>
        <img height="60" src="../static/img/heartsig.svg" />
      </Div>
    )
  return (
    <ProductSlider
      active={active}
      inCart={inCart}
      ownsItem={ownsItem}
      allItems={data.allItems}
    />
  )
}

export default DashMobile
export { STREAMS_QUERY, USERS_WEEK_QUERY }
