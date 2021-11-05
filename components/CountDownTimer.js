import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  color: white;
  display: flex;

  align-items: center;
  position: absolute;

  justify-content: center;
  transform: translate(0px, 75px);

  width: 100%;
  padding-top: 0px;
  user-select: none;
  font-family: 'comfortaa';
  letter-spacing: 3px;
  text-align: left;transform: translate(0px, 55px);
  align-items: center;
  z-index: 9001;
  @media (max-width: 768px) {
    transform: translate(0px, 45px);
  }
  .isNumber {
    font-size: 28px;
    margin: 0;
    margin: 0px 8px;
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
  .time-figure {
    font-family: 'comfortaa';

    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`

function CountDownTimer(props) {
  const calculateTimeLeft = () => {
    const difference = +new Date(`${props.date}`) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        HR: Math.floor((difference / (1000 * 60 * 60)) % 24),
        MIN: Math.floor((difference / 1000 / 60) % 60),
        SEC: Math.floor((difference / 1000) % 60)
          ? Math.floor((difference / 1000) % 60)
          : '00',
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [timeLeft])

  const timerComponents = []

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return
    }

    timerComponents.push(
      <Fragment key={timeLeft[interval] + interval}>
        <div className="isNumber">
          {timeLeft[interval]}
          <span className="time-figure">{interval}</span>
        </div>
      </Fragment>,
    )
  })

  return (
    <Wrap>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span
          style={{
            textTransform: 'uppercase',
          
          }}
        >
          {props.status === 'LIVE'
            ? 'Currently In Session'
            : props.status === 'COMPLETE'
            ? 'Livestream Ended'
            : 'On Standby'}
        </span>
      )}
    </Wrap>
  )
}

export default CountDownTimer
