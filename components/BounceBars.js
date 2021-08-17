import React from 'react'
import { format, startOfWeek, endOfWeek } from 'date-fns'
import styled from 'styled-components'

const StyleMePritay = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 100;
  grid-template-rows: 1fr;
  width: 100%;
  max-height: 750px;

  .left {
    justify-content: center;
    grid-row: 1;
    grid-column: 2;
    transform: translateY(50px);
    padding: 20px 0 0 0px;
  }
  .right {
    grid-column: 1/3;
    justify-content: flex-start;
    grid-row: 1;
    height: 750px;
    background: url('../static/img/phonewithvideotestfinal.png') -140px center;
    background-repeat: no-repeat;
    background-size: auto 750px;

    z-index: 10;
    position: relative;
  }

  .phones {
    transform: translateX(-110px);
  }
.first-bulletpoint{
  margin-left: 10px;
    font-family: 'Bison';
    color: #f8b0b0;
    display: flex;
    max-width: 600px;
    line-height: 18px;
    font-size: 16px;
}
  .bulletpoints {
    margin-left: 10px;
    font-family: 'Bison';
    color: slategrey;
    display: flex;
    max-width: 600px;
    line-height: 18px;
    font-size: 16px;
       &:before {
      content: '+';
      margin-right: 6px;
      font-size: 26px;
      font-family: 'Comfortaa';
      line-height: 22px;
      position: relative;
      transform: translateY(3px);
      color: ${(props) => props.theme.second};
    }
  }
  .all_access {
    color: ${(props) => props.theme.second};
  }
  h1 {
    color: ${(props) => props.theme.second};
    font-family: 'Felix';
    line-height: 3.2rem;
    font-size: 38px;
    width: 600px;
    position: absolute;
    transform: translateY(200px);
  }
  ul {
    list-style: none;
    padding: none;
    position: absolute;
    display: flex;
    flex-flow: column;
  }
  li {
    margin: 0;
    margin-bottom: 10px;
    letter-spacing: 2px;
    align-items: center;
    transform: translateX(-13px);
 
  }
  h3 {
    font-family: 'Bison';
    font-size: 26px;
    margin-bottom: 0px;
  }
`
const Video = styled.div`
  height: 455px;
  position: absolute;
  /* grid-column: 1; */
  transform: translate(250px, -600px) rotate(45deg);
  border-radius: 25px;
  width: 220px;
  overflow: hidden;
  video {
    height: 450px;
    border-radius: 25px;
  }
`

const Schedule = styled.div`
  font-family: 'Felix';
  transform: translate(190px, 560px);
  text-transform: uppercase;
  z-index: 0;
  right: 0;

  position: absolute;
  h1 {
    margin: 2px;
    font-size: 36px;
  }
  p {
    margin: 2px;
    transform: translate(-15px, 60px);
    font-family: 'Bison thickoutline';
    font-size: 36px;
    color: ${(props) => props.theme.fourth};
    width: 500px;
  }
  img {
    transform: translate(5px, 0px);
  }
`
export default function BounceBars() {
  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const weekEnds = endOfWeek(new Date())
  const iconColor = '#f8b0b0'
  return (
    <>
      <StyleMePritay className="white-plain py-5">
        <div className="left">
          <ul className=" list-unstyled">
            <h3>
              {' '}
              <img height="120" src="../static/img/aap.svg" />
            </h3>
            <li className="first-bulletpoint">The Perks of a Live with Lindsey All Access Pass</li>
            <li className="bulletpoints">
              Full Access to Daily Live Stream Workouts + Lindsey's Video
              on-Demand Library of 50+ Workouts and Growing
            </li>
            <li className="bulletpoints">5 New Workouts Every Week</li>
            <li className="bulletpoints">
              Exclusive Mobility and Active Recovery Classes
            </li>
            <li className="bulletpoints">
              Exclusive Challenges &amp; Programs
            </li>{' '}
            <li className="bulletpoints">
              No More Expiration Dates! Retake Classes as Many Times as You Want
            </li>
            <li className="bulletpoints">
              {' '}
              Access to an Amazing Online Community of Women from Around the
              World, United by Self Love + Movement
            </li>
            <li className="bulletpoints">
              A variety of workouts ranging from strength, low impact, body
              weight and cardio, catering to all fitness levels
            </li>
          </ul>

          <Schedule>
            <p>
              Live Schedule:{' '}
              {`${
                format(weekStarts, 'M/dd') +
                ' ' +
                '-' +
                ' ' +
                format(weekEnds, 'M/dd')
              }`}
            </p>
          </Schedule>
        </div>

        <div className="right phones"></div>
      </StyleMePritay>
      <Video>
        <video
          autoPlay
          muted
          playsInline
          loop
          style={{
            transition: 'opacity, 2s ease-in-out',
          }}
        >
          <source src="../static/img/lindseymashup.mp4" type="video/mp4" />
        </video>
      </Video>
    </>
  )
}
