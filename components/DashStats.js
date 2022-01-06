import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useToast } from './contexts/LocalState'
 import Emoji from './Emoji'
import {formatDistanceToNow, format, startOfWeek, endOfWeek} from 'date-fns'
import styled from 'styled-components'
import Error from './ErrorMessage'
import ChartStats from './ChartStats'
import { motion, AnimatePresence } from 'framer-motion'
 


 
const  PUBLIC_UPDATE_QUERY = gql`
  query  PUBLIC_UPDATE_QUERY {
    allPublicUpdates (orderBy: "createdAt_DESC") {
      id
      title
      iconImg
      textContent 
 
    createdAt

       
    }
  }
`

const StatContainer = styled.div`
position: relative;
width: 95%;

margin: 0 auto;
display: flex;
flex-flow: column; 

`
const Stats = styled.div`
grid-column: 2;
grid-row: 1;
height: 100%;
width: 100%;
background:white;
 
position: absolute;
 
.title {
  color: slategray;
  font-size: 12px;
  text-align: left;
  letter-spacing: 2px;
  line-height: 16px;
  padding-left:  5px;  
  margin: 5px;
}
.stat-grid {
  display: grid;
position: relative;
 
 
column-gap: 10px;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows:1fr 60px;

}
.main-stat {
  grid-row: 1;
  grid-column: 1/4;
  width: 100%;
  height: 130px;
  position:relative;
}
 `
 const TopStats = styled.div`
 grid-row: 1;grid-column: 1;
    display: flex;
  background: transparent;
  border-radius: 5px;
 height:170px;
 align-items: flex-end;
 justify-content: flex-start;
 text-align: right;
 overflow: hidden;
 user-select: none;
 cursor: pointer;
  position: relative;
  color: ${props => props.selectedButton === props.name ? '#f8b0b0' : 'white'};
  font-size: 35px;
  line-height: 30px;
  z-index:200;
  margin: 10px auto 0;
  width: 95%;
padding:5px;
background: ${props => props.selectedButton === props.name ? 'white' : 'linear-gradient(322deg,  #f8b0b0 ,#ffd7d4)'};
box-shadow: 0 10px 11px -6px rgba(0, 0, 0, 0.14),  0 -4px 46px rgba(0, 0, 0, 0.07);
  transition: 0.3s;
 
  &:nth-of-type(2) {
    grid-column: 2;

}
&:nth-of-type(3) {
  grid-column: 3;

}
.primary-stat {
transform: translate(0px, 0px);
font-size: 48px;
line-height: 50px;
position: absolute;
color: #f8b0b0;
/* -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
    background-image: linear-gradient(260deg,#fff, #ffd7d4, #fff );
    background-clip: text; */
 
    
}
 
 .active-style {
   background: white;
   color: #f8b0b0;
 }
span {
  transform: translate(0px, 0px);
}
 `
 
 const AccordianBody = styled.div`
grid-row: 1/3;
grid-column: 1/4;
 
width: 100%;
height: 100%;
border-radius: 10px;
display: flex;
flex-flow: column;
align-items: flex-end;
background: transparent;
padding: 20px;
margin: 0px auto 0;
transform: translate(0, -15px);

.mostRecent {
  align-self: center;
  transform : translate(30%, 10px);
  opacity: .4;
  color: slategray;
}
 `
  const MainBox = styled.div`
/* align-items: flex-end; */
 
 border-radius: 7px;
  display: flex;
 
 width: 90%;
 z-index:7;
 min-height: 60px;    
 background-image: linear-gradient(45deg,  #f8b0b0 ,#ffd7d4);
box-shadow: 0 10px 11px -6px rgba(0, 0, 0, 0.14),  0 -4px 46px rgba(0, 0, 0, 0.07);
position: relative;
margin-bottom: 50px;
padding: 5px;
flex-flow: column;
transform: translate(0, 25px);

  header {

   display: grid;
   grid-template-columns:54px 1fr ;
   
 position:relative;
 align-items: center;
 justify-content: flex-start;
   width: 100%;
   height: 100%;
   /* align-items: flex-end; */
  
 }
  
.title {
  color: white;
  grid-column: 2;
  font-size: 20px; display: inline-flex;
  text-align: left;
  letter-spacing: 2px;
  margin: 0;
  line-height: 24px;
 cursor: pointer;
  position: relative;
  padding:0 10px; 
  /* align-items: flex-end; */
  /* justify-content: center; */
}
.content {
  color: #fff;
  font-family: 'Comfortaa';
  text-align: left;
  font-size: 16px;
  line-height: 20px;  
  margin-top: 4px;
}

  `
  const IconBox = styled.div`
  grid-column: 1;
 box-shadow:   0 1px 10px rgba(0, 0, 0, 0.1);
 display: inline-flex;
 
   background: white;
  min-height: 50px; cursor: pointer;
 
  align-items: center;
  justify-content: center;
 position: relative;
  min-width: 50px;
  border-radius: 5px;
  color: white;
  overflow: hidden;
 

  `
   
  const UpdateType = styled.span`
   line-height: 13px;
   font-size: 16px;
   letter-spacing: 1px;
 padding: 0;
 position: absolute;
  margin: 0;
 
 color:slategray;
 
 
  transform: translate(0, -20px);
 
 
  `
  const SinceTime = styled.span`
  line-height: 13px;
  font-size: 9px;
  text-transform: uppercase;
padding: 0;
position: relative;
 margin: 0;
font-family: 'Comfortaa';
color:slategray;


 transform: translate(-5px, -20px);


 `

const ContentSection = ({textContent, createdAt}) => (
  <motion.div
    variants={{ collapsed: { scale: 1 }, open: { scale: 1 } }}
    transition={{ duration: .3 }}
 className="content"
  >
    
      <p style={{  padding: '0 15px'}} >{textContent}</p>
      <p style={{  padding: '0 15px', fontSize: '12px'}}> Posted: {format(new Date(createdAt), 'MMM dd, yyyy hh:mm a')}</p>
   
  </motion.div>
)
function Accordian({i, expanded, setExpanded, update }){
  const isOpen = i === expanded
   const lowerCased = update.iconImg.toLowerCase()
  return(
    <React.Fragment key={update.id}>
 <MainBox>
<UpdateType>   {update.iconImg}
</UpdateType>

      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
       >
         <IconBox >
           {lowerCased === 'community update' ?  <img  style={{padding: '5px'}} height="35" src={'../static/img/lhf.svg'} alt={lowerCased} /> : lowerCased === 'challenge update' ? <img  height="35" src={'../static/img/challenge.png'} alt={lowerCased} /> : lowerCased === 'invoice' ? <Emoji symbol="" label="envelope" /> : null}
      
      </IconBox>
       
<p className="title">
          {update.title}    
       </p>
   </motion.header> 
    <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
         <ContentSection createdAt={update.createdAt} textContent={update.textContent} />
          </motion.section>
        )}
      </AnimatePresence>
   </MainBox>
  <SinceTime>   {formatDistanceToNow(new Date(update.createdAt), {addSuffix: true})} 
</SinceTime>
      
</React.Fragment>
  )

    
}
 
      const buttonNames = ['week','month','focus'  ]
 
  const DashStats = () => {
  const {isToday} = useToast()
   const [expanded, setExpanded] = useState(false)
   const [selectedButton, setSelectedButton] = useState('week')
   const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const weekEnds = endOfWeek(new Date())

  const {data, loading, error} = useQuery(PUBLIC_UPDATE_QUERY)
if (loading) return <p>loading...</p>
if (error) return <Error error={error} />
if (!data) return null
  const {allPublicUpdates} = data


    console.log(selectedButton)
 return (
 <StatContainer>
{
   isToday === 'today' ? <AccordianBody>
     <div className="mostRecent"><p style={{margin: 0}}>&mdash; Most Recent &mdash;</p></div>
     {
   allPublicUpdates.map((update,i) => {
      return(
<Accordian key={i} i={i} expanded={expanded} update={update} setExpanded={setExpanded} />
  )})}</AccordianBody>
 :
         <Stats > 
         
      
               <div className="stat-grid">
  
      {buttonNames.map((name, i) => {
       
   const active = selectedButton === name ? 'active-style' : null
       
        return(
          <TopStats key={name} selectedButton={selectedButton} name={name}   onClick={()=> setSelectedButton(name)}>
           <>
             {i === 0 ? <span>{    
                format(new Date(), 'eeee') 
           
              }</span> : i === 1 ? <span>{    `${
                format(weekStarts, 'MMM d') +
                ' ' +
                '-' +
                ' ' +
                format(weekEnds, 'MMM d')
              }`}</span> : <span>{format(new Date(), 'MMMM')}</span>}</> 
          </TopStats>
        )
      })}
                 
      
         <ChartStats/>
               </div>
             
          
         </Stats>
 }    
</StatContainer>
)}

export default DashStats