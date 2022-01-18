import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import Head from 'next/head'
import Error from './ErrorMessage'
import { ALL_FAVORITES_QUERY } from './VodFavoritesSlider'
import Details from './Details'
import Recommended from './RecommendedVods'
import Link from 'next/link'

import Loader from './Loader'
import { useUser } from './User'
import debounce from 'lodash.debounce'
import { toast } from 'react-toastify'

const VOD_MUTATION = gql`
  mutation VOD_MUTATION($id: ID!, $isFavorite: ID!) {
    updateVideoOnDemand(
      id: $id
      data: { isFavorite: { connect: { id: $isFavorite } } }
    ) {
      id
      isFavorite {
        id
      }
    }
  }
`
const REMOVE_MUTATION = gql`
  mutation REMOVE_MUTATION($id: ID!, $isFavorite: ID!) {
    updateVideoOnDemand(
      id: $id
      data: { isFavorite: { disconnect: { id: $isFavorite } } }
    ) {
      id
      isFavorite {
        id
      }
    }
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
  margin-top: 30px;

  @media (min-width: 768px) {
    grid-column: 1;
    grid-row: 2;
    margin-top: 0px;
    border-radius: 10px;
    margin-bottom: 70px;
    position: relative;
    overflow: hidden;
    padding-top: 56.25%;
    transform: translate(0px, 15px)
  }
  iframe {
    position: relative;
    width: 95%;
    height: 400px;
    border-radius: 10px;
    border: 0;
    margin: 0 auto;
    object-fit: contain;      box-shadow: 
 
 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
   0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09);
    @media (min-width: 768px) {
      width: 95%;
      height: 95%;
      margin: 0;
      top: 0;
      background: grey;
      left: 20px;
      position: absolute; box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09);
    }
    &:after {
      display: flex;
      position: absolute;
      z-index: 999999;
    }
  }
.no-url-version-luvs {
  position: relative;
    width: 95%;
    height: 400px;
    border-radius: 10px;
    border: 0;
    margin: 0 auto;
    object-fit: contain;      box-shadow: 
 
 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
   0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09);
    @media (min-width: 768px) {
      width: 95%;
      height: 95%;
      margin: 0;
      top: 0;
      background: grey;
      left: 20px;
      position: absolute; box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09);
    }
    &:after {
      display: flex;
      position: absolute;
      z-index: 999999;
    }
}
`

const VOD_AUTH_QUERY = gql`
  query VOD_AUTH_QUERY($id: ID!, $userId: ID) {
    vodViewingAuth(  id: $id, userId: $userId ) {
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
  width: 96%;
  position: relative;
  z-index: 1880;
  font-family: 'Comfortaa';
  margin: 0 auto;
 
  display: flex;
  transform: translate(10px, -65px);
  flex-flow: row wrap;
div {
  margin-left: 15px;
}
  span {
    margin: 3px 3px;
    background: transparent;
    color: ${(props) => props.theme.third};
    max-height: 24px;
    border-radius: 2px;
    padding: 2px 5px;
    letter-spacing: 1px;
    line-height: 16px;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.third};
    opacity: 0.8;
    transition: .3s;
    &:hover {
      background: ${props => props.theme.third};
      color: white;
    }
  }
`
 
const EquipmentList = styled.div`
  display: flex;
grid-column: 2;
justify-content: center;
height: 100px;
align-items: center; 
grid-row: 2; margin-left: 0px;
position: relative;
transform: translateY(250px);
  flex-flow: row;
&:after {
  content: 'EQUIPMENT';
  color: lightgrey;
  opacity:.4;
  transform: translate(-10px);
  font-size: 80px;
  line-height:80px;
  text-align: center;
  width: 100%;
  z-index: 0;
  margin: 10px auto;
  background: rgba(230,230,230,.8);
  font-family: 'Bison';
  position: absolute;
}
  .noequip {
    font-size: 24px;
    color: slategray;
    opacity: .6;
    margin-top: 0;
    z-index: 100;
    transform: translate(0, 5px);
    padding-top: 0;
    color: rgba(200,100,100,.8);
    line-height: 24px;
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
    margin: 15px 15px ;
 display: flex; 
 flex-flow: row;
 width: 100%;
 position: relative;
 z-index: 2000;
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

  -moz-box-shadow: 
    1px 1px 5px rgba(0, 0, 0, 0.2), 
    inset 1px 1px 15px rgba(100, 100, 100, 0.15);
  -webkit-box-shadow: 
    1px 1px 5px rgba(0, 0, 0, 0.2),
    inset 1px 1px 15px rgba(100, 100, 100, 0.15);
  box-shadow: 
    1px 1px 5px rgba(0, 0, 0, 0.2),
    inset 1px 1px 15px rgba(100, 100, 100, 0.15);
  
    transition: 0.3s;
    &:after {
      content:'  ${props => props.description}';
      position: absolute;
      left: 50%;
      margin: 0 auto;
      top: calc(100% + 10px);
      background:rgba(250,250,250,1);
      display: flex;
      padding: 7px 11px;
      text-align: center;
      color: slategrey;
      font-weight: 300;
      border: 2px solid #ffd7d4;
      border-radius: 6px;
    width: 200px;
      opacity: 0;
      font-size: .7em;
      line-height: 16px;
      //transform: translate(-50%, 5px);
      transform-origin: 50% 100%;
      transform: translate(-100%)  ;
      transition-duration: .3s;
      pointer-events: none;
      box-shadow: 0 2px 13px 0 rgba(20,20,20,.2);
    }
    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid  #ffd7d4;
      border-width: 8px 6px;
      border-color:   transparent transparent #ffd7d4 transparent;
      left: 0;
      right: 0;
      margin: auto;
      bottom: -10px;
      opacity: 0;   box-shadow: 0 2px 13px 0 rgba(20,20,20,.2);
      transition-duration: .3s;
      transform: translate(-50%)   ;
    }

    &:hover {
      &:after {
        opacity: 1;
        //transform: translateX(-50%);
        transform: translate(-50%) rotateX(0deg);
        pointer-events: all;
      }

      &:before {
        opacity: 1;   transform: translate(-50%) rotateX(0deg);
      }
    }
    .theequipment {
      box-shadow: 
 
    0 1px 4px rgba(0, 0, 0, 0.19), 0 4px 40px rgba(0, 0, 0, 0.09) ;
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
function SingleItem({ id }) {
  const me = useUser()
  const [fav, setFav] = useState('')

  const [updateVideoOnDemandMake] = useMutation(
    VOD_MUTATION,
    { variables: { id: id, isFavorite:me && me.id } },
    {
      refetchQueries: [
        {
          query: VOD_AUTH_QUERY,
          variables: id,
        },
        {
          query: ALL_FAVORITES_QUERY,
          variables: { id: me && me.id },
        },
      ],
    },
  )

  const [updateVideoOnDemandTake] = useMutation(
    REMOVE_MUTATION,
    { variables: { id: id, isFavorite:me &&  me.id } },
    {
      refetchQueries: [
        {
          query: VOD_AUTH_QUERY,
          variables: id,
        },
        {
          query: ALL_FAVORITES_QUERY,
          variables: { id: me && me.id },
        },
      ],
    },
  )

  const { loading, error, data } = useQuery(VOD_AUTH_QUERY, {
    variables: { id, userId: me && me.id },
  })


useEffect(() => {
    setFav(me && me.id)
  }, [fav, me])

  const addToFav = debounce(addToFavoritesButChill, 500)
  function addToFavoritesButChill() {
    updateVideoOnDemandMake()
    toast(`${data.vodViewingAuth.name} added to Favorites!`)
  }

  const removeFromFavoritesButChill = debounce(updateVideoOnDemandTake, 350)

  if (error) return <Error error={error} />
  if (loading) return <Loader />
  console.log(data)
 
  const url = data.vodViewingAuth.url && data.vodViewingAuth.url
  const isAFav =
    data.vodViewingAuth &&
    data.vodViewingAuth.isFavorite.some((person) => {
      const hasUser = me && person.id === me.id
      if (hasUser) {
        return true
      }
    })

  return (
    <>
      <Head>
        <title>Live with Lindsey | {data.vodViewingAuth && data.vodViewingAuth.name}</title>
      </Head>{' '}
      <Wrap>
        <Background />
        <GoBacks> <Link href="/ondemand">
            <a>
              
              <P><Image
                style={{ marginRight: '7px' }}
                src="../static/img/arrow-back-white.svg"
                alt="back arrow"
              />Go Back to <span>On-Demand</span> Home</P>
            </a>
          </Link> </GoBacks>
         
                  <div
          style={{
           
            width: '100%',
            // bottom: 0,
            gridColumn: 1,
            gridRow: 2,
            position: 'relative',
            padding: '0 0px 0',
   
          }}
        >
       
       {url ? <SingleItemStyles>
      
          <iframe
            className="resp-iframe"
            style={{ margin: '0 auto', gridRow: 1 }}
            src={url}
            width="100%"
            height="100%"
            frameBorder="0"
            fullscreen
            fullscreen="true"
            allow="fullscreen"
            allowFullScreen
          ></iframe>
  
        </SingleItemStyles> : <SingleItemStyles><img src={data.vodViewingAuth &&  data.vodViewingAuth.thumbnailUrl} className="no-url-version-luvs" /></SingleItemStyles>}
        <Tags>    
            {data.vodViewingAuth &&
              data.vodViewingAuth.tags.map((tag) => {
                return <span key={tag.name}>{tag.name}</span>
              })}
          </Tags>

        
        </div>
        <Recommended id={data.vodViewingAuth && data.vodViewingAuth.id} tags={data.vodViewingAuth && data.vodViewingAuth.tags} />
        <Details removeFromFavoritesButChill={removeFromFavoritesButChill} addToFav={addToFav} isAFav={isAFav} fav={fav} me={me} vodViewingAuth={data.vodViewingAuth && data.vodViewingAuth}>
         
        </Details>
        <EquipmentList>
            
              {data.vodViewingAuth &&  data.vodViewingAuth.equipment.length === 0 ? <p className="noequip">No Equipment For this Workout</p> : 
              data.vodViewingAuth && data.vodViewingAuth.equipment.map((equip) => {
                  
                return (
            
                  <PopUp description={equip.description} name={equip.name} key={equip.name}>
             <img className="theequipment" style={{borderRadius: '50%',  height: '45px', width: '45px'  }} src={equip.image.publicUrlTransformed} alt={equip.name} /> 
                  
                   </PopUp>

                )
              })}
           
          </EquipmentList>
      </Wrap>
    </>
  )
}

export default SingleItem
export { VOD_AUTH_QUERY, VOD_MUTATION, REMOVE_MUTATION }
