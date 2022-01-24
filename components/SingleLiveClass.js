import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Head from 'next/head'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import Footer from './Footer'
import DetailsLive from './DetailsLive'
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
// const VOD_AUTH_QUERY = gql`
//   query VOD_AUTH_QUERY($id: ID!) {
//     vodViewingAuth(  id: $id ) {
//       id
//       name
//        date
//       description
//       url
//       thumbnailUrl
//         equipment {
//           id
//           description
//           name
//           image {
//             publicUrlTransformed
//           }
//         }
     
//       isFavorite {
//         id
//       }
//       tags {
//         id
//         name
//       }
//     }
//   }
// `
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
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09), 0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09);
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
    box-shadow: 
 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
   0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09);
    height: 400px;
    border-radius: 10px;
    border: 0;
    margin: 0 auto;
    object-fit: contain;
    @media (min-width: 768px) {
      width: 95%;
      height: 95%;
     
      background: grey;
 
      position: absolute;  
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


// const Tags = styled.div`
//   width: 98%;
//   grid-column: 1;
  
//   position: relative;
//   z-index: 2280;
//   margin: 0px 20px;
//   transform: translateY(-70px);
//   text-transform: uppercase;
//   display: flex;
//  align-items: center;
//   flex-flow: row wrap;

//   span {
//     margin: 3px 3px;
//     background: ${(props) => props.theme.third};
//     color: white;
//     max-height: 24px;
//     border-radius: 2px;
//     padding: 0px 3px;
//     letter-spacing: 3px;
//     cursor: pointer;
// font-size: 12px;
// line-height: 16px;
//     font-family: 'Bison';
//     opacity: 0.8;
//     &:hover {
//       opacity: 1;
//     }
//   }
//   div {
//     font-size: 16px;
//     padding: 0;
//     margin: 0 10px 0 0;
//   }
// `
 
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

export default function OwnsIt({ id }) {
  const { data, loading } = useQuery(CURRENT_USER_QUERY)
  if (loading) return <p>loading...</p>
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
  console.log(item.reason.classDescription)
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
              />Go Back to <span>{userId ? 'Dashboard ' : 'Home '}</span>Page</P>
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
        owner={owner && owner}
        date={item.date}
        name={item.reason.name}
        classId={item.id}     
        className="theClass"
            style={{ margin: '0 auto' }}
    />
     
        </SingleItemStyles>

        
        </div>
       
        <DetailsLive    
        status={item.status}
        owner={owner && owner}
        date={item.date}
        name={item.reason.name}
        classId={item.id} 
         classDescription={item.reason.classDescription}  >
        </DetailsLive>
        <EquipmentList>
            
            {item &&  item.equipment.length === 0 ? <p className="noequip">No Equipment For this Workout</p> : 
            item && item.equipment.map((equip) => {
                
              return (
          
                <PopUp description={equip.description} name={equip.name} key={equip.name}>
           <img className="theequipment" style={{borderRadius: '50%',  height: '45px', width: '45px'  }} src={equip.image.publicUrlTransformed} alt={equip.name} /> 
                
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


export { LIVE_STREAM_QUERY }
