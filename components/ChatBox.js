import React, { useState, useEffect, useCallback } from 'react'

import { useUser } from './User'
import { formatDistanceToNow } from 'date-fns'
import { useQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { useSocket } from './contexts/SocketProvider'
 

const ADD_TO_CHAT = gql`
  mutation ADD_TO_CHAT($itemId: ID!, $message: String!) {
    addToChat(message: $message, itemId: $itemId) {
      id
      item {
        id
      }
      createdBy {
        id
        businessName
        image {
          publicUrlTransformed
        }
        createdAt
      }
    }
  }
`

const CHAT_QUERY = gql`
  query CHAT_QUERY($id: ID!) {
    allChatMessages(where: { item: { id: $id } }) {
      id
      content
      createdBy {
        id
        businessName
        image {
          publicUrlTransformed
        }
      }
      createdAt
    }
  }
`

const Pic = styled.img`
  border-radius: 50%;
  object-fit: cover;
  margin-right: 6px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
`
const StyledChat = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
  overflow-y: scroll;

  overscroll-behavior: contain;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.88),
    rgba(0, 0, 0, 0.8)
  );

  margin: 0;
  z-index: 300;
  padding: 35px 20px 35px 20px;

  flex-flow: column;
  align-items: flex-start;
  &:after {
    z-index: 400;
    position: absolute;
    height: 100%;
    background: linear-gradient(0deg, black, rgba(0, 0, 0, 1));
  }
  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }

  p {
    margin: 0;
  }
  .chats {
    box-sizing: border-box;
    padding: 0 20px;
    margin: 10px 0 0;
    height: 100%;
    width: 100%;
  }
  .right {
    float: right;
    clear: both;
  }
  a {
    text-decoration: none;
    color: #3498db;
  }
  .postDate {
    font-size: 14px;
  }
  .postSince {
    color: white;
    position: absolute;
    line-height: 4px;
    text-align: right;
    font-family: 'Comfortaa';
    margin: 5px;
    margin-right: 0;
    right: 5px;
    bottom: -15px;
    font-size: 10px;
  }
`
const BigDiv = styled.div`
  display: flex;
  align-self: flex-start;
  margin: 7px 0 30px 0;
  position: relative;

  min-width: 80px;
`

const Message = styled.div`
  padding: 5px 10px;
  background: ${(props) => props.theme.primary};
  font-size: 15px;
  line-height: 22px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  min-width: 100px;
  font-family: 'Comfortaa';
  /* white-space: pre-wrap; */
  word-break: break-all;
  overflow-wrap: break-word; 
`
const UserName = styled.span`
  font-size: 13px;
  color: white;
  position: absolute;
  margin: 0px;
  transform: translateY(-15px);
  font-family: 'Bison';
  letter-spacing: 2px;

  line-height: 10px;
`
const TextInput = styled.form`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  position: fixed;
  z-index: 300;
  bottom: 0;   
  background:  
    rgba(30, 30, 30, 0.88);
 
    
`
const Input = styled.input`
    outline: 0;
    border: none;
    padding: 0 10px;
    height: 40px;
    width: 100%;
    color: darkslategrey;
    box-sizing: border-box;
    font-size: 18px;
  
    display: flex;
`
const Button = styled.button`
background: transparent;
    text-transform: uppercase;
    font-size: 14px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s ease;
    justify-content: center;
    align-items: center;
    right: 0;
    height: 40px;
    border: none;
    width: 50px;
    color: white;
 
    display: flex;
    flex-direction: row;
    position: fixed;
 
    &:focus {
      background: ${props => props.theme.second };
      color: #fff;
    }
    &:hover {
      background: ${props => props.theme.second };
      color: #fff;
    
    }
  
`
const BackArrow = styled.img`
  transform: rotate(90deg);
  position: absolute;
  transition: 0.2s;
 
  z-index: 10000;
  cursor: pointer;
  height: 20px;
  ${Button}:hover & {
     
        transform: rotate(90deg)translateX(-4px);
    
}
${Button}:focus & {
     
     transform: rotate(90deg)translateX(-4px);
 
}
  &:nth-of-type(2) {
    margin-left: 60px;
    border-radius: 5%;
    transform: rotate(90deg);
  }
`
export default function GetChats({ itemId, toggleChat, adminId }) {
  const theId = adminId ? adminId : itemId
  const { data, loading } = useQuery(CHAT_QUERY, { fetchPolicy: "cache-and-network", variables: { id: theId } })
  if (loading) return <p>loading...</p>
  if (!data) return null
  const messages = data.allChatMessages
  return <ChatBox itemId={theId} messages={messages} toggleChat={toggleChat} />
}

function ChatBox({ itemId, messages }) {
  const streamSocket = useSocket()

  const me = useUser()
  const [content, setContent] = useState('')
  const [roomMembers, setRoomMembers] = useState([])

  const [chatMessages, setChatMessages] = useState([])
  const handleContent = (e) => {
    const { value } = e.target
    const val = value
    setContent(val)
  }
console.log(chatMessages)
  const isEmpty = content.length < 1
  const tooLong = content.length > 160

  useEffect(() => {
    setChatMessages(messages)
  }, [])
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // const joinRoom = useCallback((roomName) => {
  //       streamSocket.emit('joinRoom', roomName, (roomMembers) => {
  //         setRoomMembers(roomMembers)
  //       })
  //     })
  // console.log(roomMembers)
  // useEffect(() => {
  //   if (streamSocket == null) return
  //   streamSocket.on('user joined', (userIdHandShake) => {
  //     if (roomMembers.includes(userIdHandShake)) return
  //     else {
  //       setRoomMembers((prev) => [...prev, roomMembers])
  //     }
  //   })
  //   return () => streamSocket.off('user joined')
  // }, [streamSocket])

  // useEffect(() => {
   
  //   if (streamSocket == null) return
   
  //   streamSocket.on('disconnect-count-update', (userIdHandShake) => {
        
  //     if (!roomMembers.includes(userIdHandShake)) return
  //     else {
  //       const filteredRoomies = roomMembers.filter((rm) => {
  //         return rm !== userIdHandShake
  //       })
  //       setRoomMembers(filteredRoomies)
  //     }
  //   })

  //   return () => streamSocket.off('disconnect-count-update')
  // }, [streamSocket])

  useEffect(() => {
    if (streamSocket == null) return
    streamSocket.on('messageToClients', (theMessage) => {
      setChatMessages((prevChatMessages) => [...prevChatMessages, theMessage])
    })
    return () => streamSocket.off('messageToClients')
  }, [streamSocket])

  const [addToChat, { loading, error }] = useMutation(ADD_TO_CHAT, {
    variables: { itemId: itemId, message: content },
  })

  const sendMessage = async (content) => {
    const { businessName, id } = me
    const image = me.image ? me.image.publicUrlTransformed : '../static/img/profpic.svg'
    const createdAt = new Date()
    addToChat()

    streamSocket.emit('newMessageToServer', {
      userId: id,
      createdBy: businessName,
      message: content,
      createdAt: createdAt,
      image: image,
    })
  }
 
  return (
    <>
      <StyledChat>
        {messages &&
          chatMessages.map((message, i) => {
             const profilePic = me.image ?
               message.createdBy.image.publicUrlTransformed
               : '../static/img/profpic.svg'
             // const profilePic = me.image ? me.image.publicUrlTransformed : '../static/img/profpic.svg'
   
            const lastMessage = chatMessages.length - 1 === i

            return (
              <BigDiv
                ref={lastMessage ? setRef : null}
                key={message.createdAt + message.businessName}
              >
                <Pic src={profilePic} className="pic" />
                <UserName>
                  {message.message
                    ? message.createdBy
                    : message.createdBy.businessName}
                </UserName>
                <Message>
                  {message.message ? message.message : message.content}
                </Message>{' '}
                <p className="postSince">
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </BigDiv>
            )
          })}
      </StyledChat>

      <TextInput
        onSubmit={async (e) => {
          e.preventDefault()
          if ((content && content.length < 1) || content.length > 160) {
            return
          }
          await sendMessage(content)

          await setContent('')
        }}
      >
        <Input
          type="text"
          name="content"
          autoComplete="off"
          id="content"
          placeholder="start typing..."
          autoFocus
          onFocus={(e) => e.currentTarget.select()}
          onChange={handleContent}
          value={content}
        />
        <Button disabled={isEmpty || tooLong || loading} type="submit">
          <BackArrow src="../static/img/arrow-back.svg" />
        </Button>
      </TextInput>
    </>
  )
}
