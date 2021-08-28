import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import VideoLiveJs from './VideoLiveJs'
import styled from 'styled-components'
import GetChats from './ChatBox'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import { useQuery } from '@apollo/client'
import ChatTrigger from './ChatTrigger'
import Loader from './Loader'
const LIVE_AUTH_QUERY = gql`
  query LIVE_AUTH_QUERY($id: ID!) {
    liveAuth(id: $id) {
      id
      name
      user {
        id
      }
    }
  }
`
const Background = styled.div`
background: #ed4264;
height: 100%;
width: 100%;
position: fixed;
z-index: 0;

opacity: 0.4;
background: -webkit-linear-gradient(to bottom, #ffedbc, #ed4264);
background: linear-gradient(to bottom, #ffedbc, #ed4264);
`
const Griddy = styled.div`
  display: grid;
  height: calc(100vh - 60px);
  width: 100%;
grid-template-columns: ${props => props.open ? '1fr minmax(375px, 30%)' : '1fr'};
grid-template-rows: 1fr;
  /* flex-flow: column; */
position: relative;
 
`
const ChatFrame = styled.div`
  ${props => props.open && 'grid-column: 2'};
   display: ${props => props.open ? 'flex' : 'none'};
  height: 100%;
 
 
 position: relative;
 width: 100%;
   
 z-index: 1000;
 
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none; // Safari and Chrome
    }
 .name {
 z-index:2000;
   width: 100%;
   position: relative;
   justify-content: flex-end;
   height: 40px;
   display: flex;
   align-items: center;
   background: transparent;
   font-family: 'Bison';
   color:white; 
   padding: 0;
   font-size: 17px;
   margin: 0;
   line-height: 13px;
   cursor: pointer;
 }
 .arrow {
   height: 20px;
   width: 20px;
   transform: rotate(90deg);
   margin-left: 10px;
   margin-right: 10px;
 }
`

function LiveStream({ id }) {
  const [itemId, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const videoJsOptions = {
    fluid: true,
    fill: true,
 
    autoplay: true,
    responsive: true,
    controls: true,
    textTrackSettings: false,
    liveui: true,
    errorDisplay: false,
    preload: 'auto',
    notSupportedMessage: 'Sorry, not supported!',
    suppressNotSupportedError: true,
    sources: [
      {
        src: `http://143.110.146.49:8080/hls/${id}.m3u8`,
        type: 'application/x-mpegURL',
      },
    ],
    html5: {
      vhs: {
        enableLowInitialPlaylist: true,
        overrideNative: true,
      },
    },
  }
  const { data, loading, error } = useQuery(LIVE_AUTH_QUERY, {
    variables: { id: id },
  })
  // if (!data) return null
  useEffect(() => {

    if (id !== undefined) {
      setId(id)
    }
  }, [itemId])

  if (loading) return <Loader />
  if (error) return <Error error={error} />

  const name = data.liveAuth.name
  const handleToggleChat = (e) => {
    setOpen(prev => !prev)
  }
 
 
  return (
    <>
     
  <Head>
    <link href="https://vjs.zencdn.net/7.14.3/video-js.css" rel="stylesheet" />
    <title>Live with Lindsey Studio</title>
  </Head>
 <Background />

      <Griddy open={open}>
 
        <VideoLiveJs id={id} options={videoJsOptions}/>
            <ChatFrame     open={open}>
              <div className="name">close chat <img className="arrow" src="../static/img/uparrow.svg" onClick={() => handleToggleChat()} /> </div>
          <GetChats
       
            name={name}
 
            itemId={id}
            open={open}
          />
    </ChatFrame>

    </Griddy>      
         <ChatTrigger handleToggleChat={handleToggleChat} open={open}  />
         </>
  )
}
export default LiveStream
