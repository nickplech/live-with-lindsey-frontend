import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'
const Wrap = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 300px 1fr;
  width: 100%;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 300px 1fr;
  }
  .header {
    grid-row: 1;
    grid-column: 1/4;
    background: rgba(30, 30, 30, 1);
    height: 100%;
    width: 100%;
  }
  .packages {
    grid-column: 1;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    position: absolute;
    display: flex;
    @media (min-width: 768px) {
      grid-column: 1/4;
      flex-flow: row;
    }
  }
  .free {
    display: flex;
    width: 80%;
    text-align: center;
    flex-flow: column;
    height: 180px;
    padding: 20px;
    margin: 10px;
    transform: translateY(180px);
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.03);
    &:nth-of-type(2) {
      background: ${(props) => props.theme.primary};
    }
    @media (min-width: 768px) {
      width: 330px;
      text-align: center;
      flex-flow: column;
      height: 270px;
      padding: 20px;
      margin: 30px;
      transform: translateY(190px);
    }
  }
  .all_access_includes {
    justify-content: center;
  }
  h2 {
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 20px;
    margin: 0 auto;
    @media (min-width: 768px) {
      font-size: 24px;
    }
  }
  .item_included {
    justify-content: center;
    text-align: center;
    flex-flow: column;
    margin: 80px 20px;
    width: 30%;
    color: slategrey;
    font-size: 16px;
    line-height: 22px;
    padding: 0 10px;
    font-family: 'Bison';
    letter-spacing: 2px;
    @media (max-width: 768px) {
      width: 50%;
      padding: 0;
    }
    @media (max-width: 550px) {
      width: 80%;
      padding: 0;
    }
  }
  img {
    width: 100px;
    height: auto;
  }
  button {
    padding: 5px 8px;
    border-radius: 5px;
    background: ${(props) => props.theme.second};
    color: white;
    font-family: 'Bison';
    letter-spacing: 3px;
    cursor: pointer;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09);

    font-size: 18px;
    border: 2px solid ${(props) => props.theme.second};
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
function SelectSubscription({ handleSetPlan }) {
  return (
    <>
      <Wrap>
        <div className="header"></div>
        <div className="packages">
          <div className="free">
            <h2>Pay-As-You-Go</h2>
            <p>pay-per-live</p>
            <button onClick={(e) => handleSetPlan(e, 'free')}>
              Free Account
            </button>
          </div>
          <div className="free">
            <h2>UNLIMITED LIVES &amp; On-Demand</h2>
            <h3>$99/mo</h3>
            <button onClick={(e) => handleSetPlan(e, 'allAccess')}>
              All-Access Pass
            </button>
          </div>
        </div>
        <div className="all_access_includes">
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

        </div>
      </Wrap>
      <Footer />
    </>
  )
}

export default SelectSubscription
