import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import Head from 'next/head'
import Error from './ErrorMessage'
import Footer from './Footer'
import Details from './Details'
import ClassBackground from './ClassBackground'
import Link from 'next/link'
import Loader from './Loader'
 import ShareButtons from './ShareButtons'
 

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
const VOD_AUTH_QUERY = gql`
  query VOD_AUTH_QUERY($id: ID!) {
    vodViewingAuth(  id: $id ) {
      id
      name
       date
      description
      url
      thumbnailUrl
        equipment {
          id
          description
          name
          image {
            publicUrlTransformed
          }
        }
     
      isFavorite {
        id
      }
      tags {
        id
        name
      }
    }
  }
`
const Div = styled.div`
  padding: 0px 8px;
  margin: 2px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bison';
  max-width: 180px;
  opacity: 0.6;
  flex-flow: row;
  font-size: 12px;
  height: 30px;
  color: white;
  letter-spacing: 3px;
  min-width: 50px;
  position: relative;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 0px;
  list-style: none;
  transition: 0.2s;
  background: ${(props) => props.theme.third};
  &:hover {
    opacity: 1;
  }
`
const Wrap = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 30px 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 65vw 1fr;
    grid-template-rows: 30px 1fr;
  }
  

`
const Background = styled.div`
  background: url('../static/img/bg2.jpg') no-repeat center center;
  background-size: cover;
  height: 250px;
  width: 100%;
  grid-column: 1/3;
  grid-row: 2;
`
const Equip = styled.div`
  display: flex;

  .ment {
    height: 50px;
    width: 50px;
    position: relative;
    z-index: 16000;

    border: 3px solid lightgray;
    box-shadow: 0 2px 8px 4px rgba(20, 20, 20, 0.2);
    background: url('${(props) => props.pic}');
    background-size: contain;
    border-radius: 50%;
  }
  h4 {
    transform: translateY(90px);
    color: white;
  }
`

const SingleItemStyles = styled.div`
  position: relative;

  grid-column: 1;
  grid-row: 2;
  border-radius: 10px;
  margin-top: 0px;

  @media (min-width: 768px) {
    grid-column: 1;
    grid-row: 2;
    margin: 0 auto;
    margin-top: 18px;
    border-radius: 10px;
    margin-bottom: 70px;
    position: relative;
    overflow: hidden;
    width: 95%;
  }
  .theClass {
    position: relative;

    height: 400px;
    border-radius: 10px;
    border: 0;
    margin: 0 auto;
    object-fit: contain;
    @media (min-width: 768px) {
      width: 95%;
      height: 95%;
     
      background: grey;
 
      position: absolute; box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
    }
    &:after {
      display: flex;
      position: absolute;
      z-index: 999999;
    }
  }

`


 
const GoBacks = styled.div`
  display: flex;
  grid-row: 1;
  grid-column: 1/3;
  justify-content: flex-start;

  align-items: center;
  cursor: pointer;
  color: white;
  flex-flow: row;
  text-align: center;
  font-family: 'Bison';
  letter-spacing: 2px;
  font-size: 18px;
  width: 100%;
  background: rgba(20, 20, 20, 0.9);
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  a {
    font-family: 'Bison';
    transition: 0.2s;
    letter-spacing: 2px;

    align-items: center;
    cursor: pointer;
    color: white;
  }

`


const Tags = styled.div`
  width: 98%;
  grid-column: 1;
  
  position: relative;
  z-index: 2280;
  margin: 0px 20px;
  transform: translateY(-70px);
  text-transform: uppercase;
  display: flex;
 align-items: center;
  flex-flow: row wrap;

  span {
    margin: 3px 3px;
    background: ${(props) => props.theme.third};
    color: white;
    max-height: 24px;
    border-radius: 2px;
    padding: 0px 3px;
    letter-spacing: 3px;
    cursor: pointer;
font-size: 12px;
line-height: 16px;
    font-family: 'Bison';
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
  div {
    font-size: 16px;
    padding: 0;
    margin: 0 10px 0 0;
  }
`
 
const EquipmentList = styled.div`
  display: flex;
grid-column: 2;
grid-row: 2; margin-left: 0px;
position: relative;
transform: translateY(250px);
  flex-flow: row;
  .noequip {
    font-size: 18px;
    color: slategray;
    opacity: .7;
    margin-top: 0;
    padding-top: 0;
    line-height: 16px;
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
    margin: 10px 10px ;
 display: flex; 
 flex-flow: row;
 width: 100%;
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

 
  
    transition: 0.3s;
    &:hover,
    &:focus,
    &:active {
      background: ${(props) => props.theme.primary};
    }
    .theequipment {
      box-shadow: 
 
    0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09);
    }
`
const Bubble = styled.div`
display: none;
  background: white;
  max-width: 300px;
  border-radius: 10px;
  transform: translate(-50%, 0);
  padding: 5px 10px;
  position: absolute;
  color: grey;
  font-family: 'Bison';
  flex-flow: column;
  justify-content: center;
  box-shadow: 
 
 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
   0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
   0 32px 16px rgba(0, 0, 0, 0.09);
  h4 {
    margin: 0;
    font-size: 24px;  
    justify-self: center;
    letter-spacing: 2px;
    align-self: center;
    margin-left: 5px;
    color: black;
  }
  p {
    font-size: 15px;
    letter-spacing: 2px;
    margin: 0;
    line-height: 18px;
  }
   ${PopUp}:hover & {
display: flex;
  }
  ${PopUp}:active & {
display: flex;
  }
  ${PopUp}:focus & {
display: flex;
  }
`
const P = styled.div`
  span {
    color: #f8b0b0;
    margin-left: 3px;
    margin-right: 2px;
  }
  img {
    transition: 0.2s;
    margin-left: 20px;
    align-self: center;
    transform: translate(0px, 5px);
 
  }
`

const Image = styled.img`
${P}:hover & {
transform: translate(-5px, 5px);
}
`

function OwnsIt({ id }) {
  const { data, loading } = useQuery(CURRENT_USER_QUERY)
  if (loading) return <p>loading</p>
  if (!data.authenticatedUser) return <SingleLiveClass id={id} />
  const me = data.authenticatedUser

  return <SingleLiveClass id={id} userId={me.id} />
}
function SingleLiveClass({ id, userId }) {
 
  const { data, loading, error } = useQuery(LIVE_STREAM_QUERY, {
    variables: { id: id },
  })
  if (!data) return null
  if (loading) return <Loader />
  const item = data.Item
  const owner =
    item &&
    item.user.some((person) =>  person.id === userId)

  // const { loading, error, data } = useQuery(VOD_AUTH_QUERY, {
  //   variables: { id },
  // })
  return (
    <>
      <Head>
        <title>Live with Lindsey | {item.status}</title>
      </Head>
      <Wrap>
        <Background />
        <GoBacks> <Link href={{ pathname: '/' }}>
            <a>
              
              <P><Image
                style={{ marginRight: '7px' }}
                src="../static/img/arrow-back-white.svg"
                alt="back arrow"
              />Go Back to <span>{userId ? 'Dashboard' : 'Home '}</span>Page</P>
            </a>
          </Link> </GoBacks>
         
                  <div
          style={{
           
            width: '100%',
       
            gridColumn: 1,
            gridRow: 2,
            position: 'relative',
            padding: '0',
   
          }}
        >
       
        <SingleItemStyles>
      <ClassBackground         
      tags={item.tags}
        status={item.status}
        owner={owner}
        date={item.date}
        name={item.reason.name}
        classId={item.id}     
        className="theClass"
            style={{ margin: '0 auto' }}
    />
     
        </SingleItemStyles>

        
        </div>
       
        <Details >
         
        </Details>
        <EquipmentList>
            
              {data.vodViewingAuth &&  data.vodViewingAuth.equipment.length === 0 ? <p className="noequip">No Equipment For this Workout</p> : 
              data.vodViewingAuth && data.vodViewingAuth.equipment.map((equip) => {
                  
                return (
                  <PopUp key={equip.name}>
             <img className="theequipment" style={{borderRadius: '50%',  height: '45px', width: '45px'  }} src={equip.image.publicUrlTransformed} alt={equip.name} /> 
                      <Bubble>
                        <div style={{ display: 'inline-flex' }}>
                          {' '}
                          <img  height='40' src={equip.image.publicUrlTransformed} />
                          <h4>{equip.name}</h4>
                        </div>

                        <p>{equip.description}</p>
                      </Bubble>
                    </PopUp>
                 
                )
              })}
           
          </EquipmentList>
      </Wrap>
      <ShareButtons classId={id}/>
      <Footer/>
    </>
  )
}

export default SingleLiveClass
export { VOD_AUTH_QUERY, LIVE_STREAM_QUERY }