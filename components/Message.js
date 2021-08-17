import React from 'react'
import styled from 'styled-components'

const TextStyles = styled.div`
  .chat {
    background: ${(props) => props.theme.second};
    position: relative;
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 10px;
    list-style: none;
    float: left;
    clear: both;
    text-align: left;
    line-height: 18px;
    margin: 5px 0;
    width: 100%;
    /* max-width: 200px; */
    color: white;
    display: flex;
    margin-left: 10px;
    align-items: center;
    justify-content: flex-start;
  }

  img {
    width: 45px;
    height: 45px;

    border-radius: 50%;
    position: relative;
    display: flex;
  }

  .right {
    float: right;
    clear: both;
  }

  a {
    text-decoration: none;
    color: white;
  }
`

const Message = ({ message, user }) => {
  console.log(message)
  return (
    <TextStyles>
      <li>
        {/* {user !== chat.username && (
        // <img src={chat.img} alt={`${chat.username}'s profile pic`} />
      )} */}
        {message.content}
      </li>
    </TextStyles>
  )
}

export default Message
