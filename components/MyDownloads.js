import React from 'react'
import { useQuery } from '@apollo/client'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import Form from './styles/Form'
import Loader from './Loader'
import gql from 'graphql-tag'
 import {useForm} from '../lib/useForm'
import styled from 'styled-components'
import Error from './ErrorMessage'
 
const USER_DOWNLOADS_QUERY = gql`
  query USER_DOWNLOADS_QUERY($id: ID) {
    allPublicUpdates( where:  { user_some: { id_in: $id }  }) {
      id

    

 
      user {
        id
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
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, 1fr);
  padding: 0;
`
const DownloadStyles = styled.li`
 
padding: 0;
`
function MyDownloads({ userId }) {
 
 
 
  const { data, loading, error } = useQuery(USER_DOWNLOADS_QUERY, {
    variables: { id: userId}
  })
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
              Available Downloads:{' '}
              {/* {currentCount +
                ' ' +
                '—' +
                ' ' +
                `${lastPage ? count : endOfCountRange}`} */}
            </h2>
          )}
          <OrderUl>
            {allPublicUpdates.map((updateDownload) => (
              <DownloadStyles key={updateDownload.id}>
                <Link
                  href={{
                    pathname: '/order',
                    query: { id: updateDownload.id },
                  }}
                >
                  <a>
                    
                      <p>
                        {formatDistance(new Date(updateDownload.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </p>
                      <p>
                        {updateDownload._recordsMeta.count} Item
                        {updateDownload._recordsMeta.count === 1 ? '' : 's'}{' '}
                      </p>
                       
                   
               
                  </a>
                </Link>
              </DownloadStyles>
            ))}
          </OrderUl>
        </fieldset>
 
      </Form>
    </Inner>
  )
}

export default MyDownloads
 