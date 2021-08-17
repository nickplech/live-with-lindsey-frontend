import React from 'react'

import styled from 'styled-components'

const StyledAccordian = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 0px auto;
  margin-bottom: 0px;
  width: 90%;
  position: relative;

  max-width: 1200px;
  /* min-height: 280px; */
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;

    margin-bottom: 60px;
  }
  .right {
    grid-column: 2;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    @media (max-width: 768px) {
      grid-column: 1;
    }
  }
  span {
    display: inline-flex;
    position: relative;
  }
  .title {
    cursor: pointer;
    margin: 0;
    position: relative;
    color: ${(props) => props.theme.second};
    width: 100%;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    padding: 0;
    padding-top: 10px;
    margin-bottom: 5px;
    user-select: none;
  }
 
  .content {
    overflow: hidden;
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
    font-family: 'Bison';
    min-width: 330px;
    margin-bottom: 25px;
    width: 95%;
  }

  .content-wrapper {
    padding: 10px 0px;
    font-family: 'Bison';
    font-size: 14px;
    color: slategrey;
    letter-spacing: 2px;
  }
`
const StyledAccordian2 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 0px auto;
  margin-bottom: 0px;
 
  position: relative;
justify-content: center;
align-items: center;
  max-width: 1200px;
  /* min-height: 280px; */
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
  .right2 {
    grid-column: 2;
    display: flex;
    flex-flow: column;
    justify-content: left;
    align-items: center;
 
    transform: translate(0, 45px);
  
    @media (max-width: 992px) {
      grid-column: 1;
    }
  }
  span {
    display: inline-flex;
    position: relative;
  }
  .title {
    cursor: pointer;
    margin: 0;
    position: relative;
    color: ${(props) => props.theme.second};
    width: 100%;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    padding: 0;
    padding-top: 10px;
    margin-bottom: 5px;
    user-select: none;
  }

  .content {
    overflow: hidden;
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
    font-family: 'Bison';
 
    margin-bottom: 25px;
    width: 95%;
  }

  .content-wrapper {
    padding: 10px 0px;
    font-family: 'Bison';
    font-size: 14px;
    color: slategrey;
    letter-spacing: 2px;
    max-width: 600px;
  }
`
const Left = styled.div`
  position: relative;
  grid-column: 1;
  margin: 0 auto;
  img {
    position: relative;
    width: 350px;
    transform: rotate(2deg);
    border-radius: 5px;
    @media (min-width: 992px) {
      width: 340px;
    }
    @media (min-width: 1200px) {
      width: 420px;
    }
  }
  .pinky {
    position: absolute;
    width: 350px;
    transform: rotate(-2deg);
    height: 265px;
    box-shadow: 0 8px 6px -5px rgba(0, 0, 0, 0.2);
    background: ${(props) => props.theme.primary};
    @media (min-width: 992px) {
      width: 340px;
      height: 265px;
    }
    @media (min-width: 1200px) {
      width: 420px;
      height: 325px;
    }
  }
  .title {
    cursor: pointer;
    margin: 0;
    position: relative;
    color: ${(props) => props.theme.second};
    width: 100%;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    padding: 0;
    padding-top: 10px;
    margin-bottom: 5px;
    user-select: none;
  }

  .content {
    overflow: hidden;
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
    font-family: 'Bison';
   
    margin-bottom: 25px;
    width: 95%;
  }

  .content-wrapper {
    padding: 10px 0px;
    font-family: 'Bison';
    font-size: 14px;

    color: slategrey;
    letter-spacing: 2px;
   
  }
`
const Left2 = styled.div`
  position: relative;
  grid-column: 1;
  margin: 0 auto;
  text-align: right;
  width: 95%;
  @media (max-width: 992px) {
    text-align: left;
    }
  img {
    position: relative;
    width: 300px;
    transform: rotate(2deg);
    border-radius: 5px;
    @media (min-width: 992px) {
      width: 340px;
      text-align: right;
    }
    @media (min-width: 1200px) {
      width: 420px;
      text-align: right;
    }
  }

  .tite {
    cursor: pointer;
    margin: 0;
    position: relative;
    color: ${(props) => props.theme.second};
    width: 100%;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-weight: normal;
    font-size: 18px;

    line-height: 18px;
    padding: 0;
    padding-top: 10px;
    margin-bottom: 5px;
    user-select: none;
  }

 
  .content {
    overflow: hidden;
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
    font-family: 'Bison';
   
    margin-bottom: 25px;
    width: 95%;
  }

  .content-wrapper2 {
    padding: 10px 0px;
    font-family: 'Bison';
    font-size: 14px;

    color: slategrey;
    letter-spacing: 2px;
 
  }
`
const data = [
  {
    title: `What Happens if I Can't Make it in Time for the Live?`,
    content: `No worries! All purchased Live Workouts are available for 48 hours after the live has ended`,
  },
  {
    title: `Can I Stream from My Phone and Computer?`,
    content: `Yes! It is entirely up to you. Just access the desired class in your personal dashboard, click, and get moving... all from your web browser. Chrome and Safari are recommended.`,
  },
  {
    title: `Which Payment Types are Accepted?`,
    content: `All major credit cards and Paypal. All card information is stored and handled off-site by the number one provider in online payments, Stripe, ensuring optimal security for your information!`,
  },
]

class Accordian extends React.Component {
  state = { open: false }
  render() {
    return (
      <>
        {' '}
        <StyledAccordian>
          <Left>
            <div className="pinky" />
            <img
              src="../static/img/beach.jpg"
              alt="lindsey harrod questions and answers"
            />
          </Left>
          <div className="right">
            <span>
              <h2 className="title">{data[0].title}</h2>
            </span>

            <div className="content-wrapper">{data[0].content}</div>

            <span style={{ marginTop: '50px' }}>
              <h2 className="title">{data[2].title}</h2>
            </span>

            <div className="content-wrapper">{data[2].content}</div>
          </div>
        </StyledAccordian>
        <StyledAccordian2 >
          <Left2>
            <span>
              <h2 className="tite">{data[1].title}</h2>
            </span>
            <div className="content-wrapper2">{data[1].content}</div>
          </Left2>
          <div
            className="right2"
           
          >
       
            <img
              width="400"
              className="comp"
              src="../static/img/live-with-lindsey-computer-phone.png"
              alt="livewithlindsey on mobile"
            />
          </div>
        </StyledAccordian2>
      </>
    )
  }
}

export default Accordian
