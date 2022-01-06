import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import motion from 'framer-motion'
 

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    allUsers(orderBy: "lastName") {
      id
      firstName
      lastName
      businessName
      email
      cellPhone
      image {
        publicUrlTransformed
      }
      createdAt
    }
  }
`

const List = styled.div`
  display: grid;
  width: 100%;

  grid-template-rows: 1fr calc(100vh - 110px);
  position: relative;
  z-index: 0;
`

const Name = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 280px;
  padding-left: 20px;
  h4 {
    margin: 0;
  }
`

const StyledSubStatus = styled.div`
  display: grid;
  grid-row: 2;
  background: rgba(200, 200, 200, 0.1);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  margin: 0 auto;

  z-index: -1;
  padding: 10px 10px 10px 30px;
  height: calc(100% - 50px);
  width: 100%;
  position: relative;
  overflow: scroll;
  overscroll-behavior: contain;
  ul {
    list-style: none;
    padding: 0;
  }
`
const ClientPill = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  border-radius: 5px;
  margin: 10px 0px;
  min-height: 40px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    background: rgba(10, 110, 220, 0.3);
  }
  &:active {
    box-shadow: none;
  }

  h5 {
    font-size: 16px;
    margin: 5px;
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
  }
  span {
    font-weight: 600;
  }
  .content {
    overflow: hidden;
    font-size: 18px;
    border-radius: 5px;
    background: rgba(240, 240, 240, 1);
    color: black;
    min-width: 330px;
    width: 100%;
    margin-bottom: 0px;
  }
  .content-wrapper {
    padding: 20px 10px;
  }
`
function Clients() {
  const [open, setOpen] = useState(false)
  const handleIsOpen = (i) => {
    setOpen(open === i ? false : i)
  }
 
 
  const Container = {
    notShut: {},
    shut: { delay: 300 },
    initialPose: 'shut',
  }
  const P = {
    notShut: { y: 0, opacity: 1 },
    shut: { y: 20, opacity: 0 },
  }
  
  const Content = {
    closed: { height: 0 },
    open: { height: 'auto' },
  }
  const { data, loading, error } = useQuery(ALL_USERS_QUERY)
  if (loading) return <p>loading...</p>
  error && <p>Error: {error.message}</p>
  return (
    <>
      <List>
        <StyledSubStatus>
          <motion.div varients={Container} initial="notShut">
            {data.allUsers &&
              data.allUsers.map((user, i) => {
                const madeDate = user.createdAt.toString()
                return (
                  <P key={user.id}>
                    <ClientPill onClick={() => handleIsOpen(i)}>
                      <Name>
                        {user.lastName}, {user.firstName}
                      </Name>
                      <Content
                        className="content"
                        pose={open === i ? 'open' : 'closed'}
                      >
                        <div className="content-wrapper">
                          <h5>
                            <span>Cellphone:</span> {user.cellPhone}
                          </h5>

                          <h5>
                            {' '}
                            <span>Subscriber Since:</span>{' '}
                            {/* {format(madeDate, 'MMM DD, YYYY')} */}
                            {madeDate}
                          </h5>

                          <h5>
                            {' '}
                            <span>Email:</span> {user.email}
                          </h5>
                        </div>
                      </Content>
                    </ClientPill>
                  </P>
                )
              })}
          </motion.div>
        </StyledSubStatus>
      </List>
    </>
  )
}

export default Clients
export { ALL_USERS_QUERY }
