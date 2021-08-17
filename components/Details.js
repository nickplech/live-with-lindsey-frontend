import React, {useRef, useEffect} from 'react'
import styled from 'styled-components'
 import {format} from 'date-fns'
import VanillaTilt from 'vanilla-tilt'

const Tilty = styled.div`
 grid-row: 3;  height: 220px;
 margin-top: 15px;
    border-radius: 20px;
 width: 95%;
  @media (min-width: 768px) {
      grid-column: 2;
      grid-row: 2;
    }
    .js-tilt-glare {
        border-radius: 20px;
    }
`

const Grid = styled.div`
    
    margin: 0;
   

   
    height: 100%;
 
    width: 100%;
    display: flex;
    flex-flow: column;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.25);
   

  .datecolorchange {
    margin: 0;
    margin-top: 10px;
   
    line-height: 16px;
    font-size: 16px;     
  margin: 10px;
  letter-spacing: 2px;
    color: white;
    padding: 0;
      
  }
 
  
 .extras {
    padding-top: 2px;
     margin: 3px;
    width: 96%;
    margin: 0 auto;
    margin-top: 0;
 }
  h2 {
    margin: 15px 0 0;
    line-height: 24px;   padding-left: 10px;
    font-size: 36px;
    display: inline-flex;
    font-family: 'Bison';
    color: white;
  }
`
 const Heart = styled.img`
    stroke: white;
  stroke-width: 3;
    cursor: pointer;
 bottom: 8px;
 right: 8px;
    margin: 5px;
    position: absolute;
    transition: 0.2s;
    &:hover {
      transform:   scale(1.08);
    }
    &:active {
      transform:   scale(0.98);
    }
  
 `
function Details( { addToFav, removeFromFavoritesButChill, isAFav, videoOnDemand, me} ){
    const tiltRef = useRef()
 
   useEffect(() => {
     const tiltNode = tiltRef.current
     const options = {
     max: 3,
     scale: 1.01,
     speed: 60,
     glare: true,
     transition: true,
     'max-glare': 0.44,
   }
     VanillaTilt.init(tiltNode, options)
     return () => tiltNode.vanillaTilt.destroy()
   }, [])
 
   return (

   <Tilty
       style={{
         transformStyle: 'preserve-3d',
         transform: 'perspective(1000px)',
       }}
       ref={tiltRef}
     
     >
    <Grid>
 <h2>{videoOnDemand.name}</h2> 
           
         {videoOnDemand.date && (
         <p className="datecolorchange">
               Aired On{' '}{format(new Date(videoOnDemand.date), 'MMM dd, yyyy')}
              </p> 
              )
         }
           <p className="datecolorchange">{videoOnDemand.description}</p>
               {!me ? null : (
                    <div className="extras">  
            <Heart 
            height="20"
           src={`../static/img/${isAFav ? 'heart4' : 'heart3'}.svg`}
              title="Save video as a favorite"
              onClick={isAFav ? removeFromFavoritesButChill : addToFav}
   />
          
              </div>
                )
              } 
   </Grid> 
    </Tilty>
     )}

     export default Details
