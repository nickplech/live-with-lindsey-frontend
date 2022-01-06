 
import React from 'react'
import PleaseSignIn from '../components/PleaseSignIn'
import styled from 'styled-components'
import AdminSettingsContent from '../components/AdminSettingsContent'
 
import Link from 'next/link'
import gql from 'graphql-tag'
import Error from '../components/ErrorMessage'
import { useQuery } from '@apollo/client'
import Loader from '../components/Loader'
import ScheduledClasses from '../components/ScheduledClasses'

const AD_DASH_QUERY = gql`
  query AD_DASH_QUERY {
    adDash {
      message
    }
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 1fr;
  width: 100%;
  height: 100%;
  .back {
    grid-column: 1/3;
    grid-row: 2;
    width: 100%;
    height: 100%;
  }
 .img {
  color: white;
  height: 20px;
  width: 20px;

}
p {
  text-align: center;
margin: 2px;
line-height: 18px;
margin-top: 5px;
  outline: none;
  cursor: pointer;
  font-family: 'Bison';

letter-spacing: 3px;
font-size: 20px;
}
 .shell {
   cursor: pointer;
   width: 98%;
     background: ${props => props.theme.primary};
     display: flex;
     justify-content: center;
     align-items: center;
     flex-flow: column;
margin: 15px auto;
 
border-radius: 5px;
color: white;
box-shadow: 0px 5px 5px -3px rgba(20,20,20,.5);
transition:.3s;
&:hover {
  transform: scale(1.01);
}
 &:nth-child(2) {
  background: ${props => props.theme.second};
 }
 }
`

function AdminDash(props) {
  const { data, loading, error } = useQuery(AD_DASH_QUERY)
  if (loading) return <Loader />
  if (error) return <Error error={error} />
  if (!data) return null
  return (
    <PleaseSignIn>
      {(me) => (
//         <Grid>
//                <a href="http://localhost:3001/admin" className="shell"><img className="img" src="../static/img/servers.svg"/><p>Data Manager</p></a>


// <Link href="/uploadvod">
        
//         <a  className="shell">
//           {' '}
//           <img src="../static/img/plus.svg" className="img" />
//           <p>Video Uploader</p>
//         </a>
        
//             </Link>
      
          
            <AdminSettingsContent />
        
      //   </Grid>
      )}
    </PleaseSignIn>
  )
}

export default AdminDash
