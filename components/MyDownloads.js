import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { formatDistance } from 'date-fns'

import { Document, Page } from 'react-pdf';
import Form from './styles/Form'
import Loader from './Loader'
import gql from 'graphql-tag'
 import {useForm} from '../lib/useForm'
import styled from 'styled-components'
import Error from './ErrorMessage'
 
const USER_DOWNLOADS_QUERY = gql`
  query USER_DOWNLOADS_QUERY($id: ID) {
    allPublicUpdates(  where: { AND: [{ challenge: { user_some: { id: $id }} }, { file_not: null }] }) {
      id
      file {
        id
        filename
        mimetype
        publicUrl
      }
      challenge {
        id
        name
        user {
          id
        }
      }
    }
  }
`


const Inner = styled.div`
  text-align: left;
  max-width: ${(props) => props.theme.innerWidth};
  margin: 0 auto;
  padding: 0rem 0;
  padding-top: 0;
  position: relative;
  z-index: 100;
  .dates {
    text-transform: uppercase;
    opacity: 0.5;
    &:focus {
      opacity: 1;
    }
    &:active {
      opacity: 1;
    }
  }
  button {
    display: flex;
    justify-self: flex-end;
  }
  h2 {
    font-family: 'Bison';

    color: ${(props) => props.theme.second};
    letter-spacing: 3px;
  }
`
const OrderUl = styled.ul`
  display: flex;
 justify-content: flex-start;
 width: 100%;
 flex-flow: row wrap;
  padding: 0;
  list-style: none;
`
const DownloadStyles = styled.li`
 height: 200px;
 width: 170px;
display: grid;
grid-template-rows: 1fr 20px;
margin: 0 auto;

padding: 0;
img {
  grid-column: 1; background: blue;
}
`
function MyDownloads({ userId }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
 
 
  const { data, loading, error } = useQuery(USER_DOWNLOADS_QUERY, {variables: {id: userId}} )
  if (loading)
    return (
      <Inner>
        <Form style={{ minHeight: '300px' }}>
          <fieldset>
          <h2>Available Downloads: 0</h2>
            <Loader />
          </fieldset>
        </Form>
      </Inner>
    )

  if (error) return <Error erorr={error} />
  if (!data || data === undefined) return (      <Inner>
    <Form style={{ minHeight: '300px' }}>
      <fieldset>
      <h2>Available Downloads: 0</h2>
      </fieldset>
    </Form>
  </Inner>)
  const { allPublicUpdates } = data
  console.log(allPublicUpdates)
 

  return (
    <Inner>
      <Form>
        <fieldset>
          {allPublicUpdates.length === 0 ? (
            <h2>Available Downloads: 0</h2>
          ) : (
            <h2>
              Available Downloads: {allPublicUpdates.length}
             
            </h2>
          )}
          <OrderUl>
            {allPublicUpdates.map((publicUpdate) => {
               
              const isAPdf = publicUpdate?.file?.mimetype === "application/pdf"
              
              return(
              <DownloadStyles key={publicUpdate.id}>
              {isAPdf ? <> <Document
        file={
          `/lindsey/live-with-lindsey-back/${publicUpdate.file.publicUrl
        }`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
     
      <a>{publicUpdate.file.filename}
               </a></> : <>
                  <img src={publicUpdate.file.publicUrl} alt={publicUpdate.file.filename}/>
                    
             
                   <a>{publicUpdate.file.filename}
               </a>
                </>
             }
              </DownloadStyles>
            )})}
          </OrderUl>
        </fieldset>
 
      </Form>
    </Inner>
  )
}

export default MyDownloads
 