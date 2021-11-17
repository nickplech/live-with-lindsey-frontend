import React, {useState} from 'react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import { useToast } from './contexts/LocalState'
 import Emoji from './Emoji'
import {formatDistanceToNow, format} from 'date-fns'
import styled from 'styled-components'
import Error from './ErrorMessage'
import ChartStats from './ChartStats';
import { motion, AnimatePresence } from "framer-motion";
 


 
const  PUBLIC_UPDATE_QUERY = gql`
  query  PUBLIC_UPDATE_QUERY {
    allPublicUpdates (orderBy: "createdAt_DESC") {
      id
      title
      iconImg
      textContent 
    publicHeadline 
    createdAt
    item {
      id
      name
      date
    }
       
    }
  }
`

const StatContainer = styled.div`
position: relative;
width: 100%;
padding: 20px;
height: 100%;
display: flex;
flex-flow: column;
`
const Stats = styled.div`
grid-column: 2;
grid-row: 1;
height: 100%;
width: 100%;
background:white;
display: grid;
position: absolute;
 
overflow-y: visible;
row-gap: 10px;
column-gap: 10px;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows:40% 60%;
.title {
  color: slategray;
  font-size: 12px;
  text-align: left;
  letter-spacing: 2px;
  line-height: 16px;
  padding-left:  5px;  
  margin: 5px;
}
.top-stats {
    grid-row: 1;
    display: flex;
  background: transparent;
  border-radius: 10px;
 
 justify-content: center;
 text-align: center;
  position: relative;
  z-index:200;
  margin: 10px auto 0;
  width: 100%;
padding: 5px 8px;
 
  transition: 0.3s;
  &:nth-of-type(1) {
    background: transparent;
  }
  &:nth-of-type(2) {
    background: transparent;
}
&:nth-of-type(3) {
    background: transparent;
}
}
`
const Chart = styled.div`
grid-row: 1/3;
grid-column: 1/4;
 
 
 
box-shadow: 0 10px 10px  5px rgba(0, 0, 0, 0.2);
width: 100%;
height: 100%;
border-radius: 15px;
background: rgba(250,250,250,1);
padding: 0;
margin: 20px auto 0;

.title {
  margin-left: 20px;
  font-size: 28px;
}

.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  align-items: center;
}
.top-stats {
  border-left: 4px solid #f8b0b0;
  border-radius: 0;
  padding-left: 5px;
  &:nth-of-type(4) {
    grid-row: 2;

  }
  &:nth-of-type(3) {
    grid-row: 2;
    
  }
 
}
  `
 
  const MainBox = styled.div`

 border-radius: 7px;
  display: flex;
align-items: center;
 width: 100%;
 overflow: hidden;
 min-height: 60px;    
 background-image: linear-gradient(45deg,  #f8b0b0 ,#ffd7d4);
box-shadow: 0 10px 11px -6px rgba(0, 0, 0, 0.14),  0 -4px 46px rgba(0, 0, 0, 0.07);
position: relative;
margin-bottom: 40px;
padding: 5px;
flex-flow: column;
  header {
   flex-flow: row;
   display: flex;
 position:relative;
 align-items: center;
   width: 100%;
   height: 100%;
   /* align-items: flex-end; */
  
 }
  
.title {
  color: white;
  font-size: 22px; display: inline-flex;
  text-align: left;
  letter-spacing: 2px;
  margin: 0;
  line-height: 18px;
 
  position: relative;
  padding-left: 15px; 
  /* align-items: flex-end; */
  /* justify-content: center; */
}
.content {
  color: #fff;
  font-family: 'Comfortaa';
  font-size: 16px;
  line-height: 20px;  
  margin-top: 4px;
}

  `
  const IconBox = styled.div`
 box-shadow:   0 1px 10px rgba(0, 0, 0, 0.1);
 display: inline-flex;
   background: white;
  height: 50px;
  align-items: center;
  justify-content: center;
 position: relative;
  width: 50px;
  border-radius: 5px;
  color: white;
  overflow: hidden;
 

  `
  const Sheen = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  content: '';
  width: 200%;
  height: 200%;
  cursor: default;
  user-select: none;
  background-image: linear-gradient(60deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.4), rgba(255,255,255,0) 80%);
  transform: translateX(-100%);
  transition: all 1.2s ease-in-out;
  ${MainBox}:hover & {
    transform: translateX(100%);

  }

`
  const SinceTime = styled.p`
   line-height: 12px;
   font-size: 18px;
   letter-spacing: 4px;
 padding: 0;
  margin: 0;
 color: ${props => props.theme.second};
  right: 0;
  display: flex;
  transform: translate(-4px,-5px);
  align-self:  flex-end; 
 
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
);
function Accordian({i, expanded, setExpanded, update }){
  const isOpen = i === expanded
   const lowerCased = update.iconImg.toLowerCase()
  return(
    <React.Fragment key={update.id}
    > <SinceTime className="sinceTime">   {formatDistanceToNow(new Date(update.createdAt), {
      addSuffix: true,
    })} </SinceTime>
 <MainBox>
 {/* <Sheen/> */}
      <motion.header
        initial={false}
         
        onClick={() => setExpanded(isOpen ? false : i)}
       >
         < IconBox  >
           {lowerCased === 'welcome' ?  <img  style={{padding: '5px'}} height="35" src={`../static/img/lhf.svg`} alt={lowerCased} /> : lowerCased === 'challenge' ? <img  height="35" src={`../static/img/challenge.png`} alt={lowerCased} /> : lowerCased === 'invoice' ? <Emoji symbol="" label="envelope" /> : null}
      
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
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
         <ContentSection createdAt={update.createdAt} textContent={update.textContent} />
          </motion.section>
        )}
      </AnimatePresence>
   </MainBox>
  
      
</React.Fragment>
  )

    
}
 
      
 
  const DashStats = () => {
  const {isToday} = useToast()
   const [expanded, setExpanded] = useState(false);
  const {data, loading, error} = useQuery(PUBLIC_UPDATE_QUERY)
if (loading) return <p>loading...</p>
if (error) return <Error error={error} />
if (!data) return null
  const {allPublicUpdates} = data


   
 return (
 <StatContainer>
{
   isToday === 'today' ? 
   allPublicUpdates.map((update,i) => {
      return(
<Accordian key={i} i={i} expanded={expanded} update={update} setExpanded={setExpanded} />
  )})
 :
         <Stats> 
           <Chart>
             <h4 className="title">Recent Activity</h4>
               <div className="stat-grid">
                 <div className="top-stats">{}</div>
                 <div className="top-stats">hi</div>
                 <div className="top-stats">ho</div>
                 <div className="top-stats">Week Total:</div>
       
               </div>
               <ChartStats/>
             </Chart>
         </Stats>
 }    
</StatContainer>
)}

export default DashStats