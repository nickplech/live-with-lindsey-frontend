import React from 'react'
import Downshift, { resetIdCounter } from 'downshift'
import Clients from './Clients'
import gql from 'graphql-tag'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'
import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'
const SEARCH_USERS_QUERY = gql`
  query SEARCH_USERS_QUERY($searchTerm: String!) {
    allVideoOnDemands(
      where: {
        OR: [
          { tags_some: $searchTerm }
          { name_contains_i: $searchTerm }
          { item: { required_some: $searchTerm } }
        ]
      }
    ) {
      id
      name
      url
      tags {
        id
        name
      }
      item {
        required {
          id
          name
        }
      }
    }
  }
`
const Img = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

function AutoComplete() {
  const [findUsers, { loading, data }] = useLazyQuery(SEARCH_USERS_QUERY)
  const videoOnDemands = data ? data.allVideoOnDemands : []
  const findUsersButChill = debounce(findUsers, 350)
  resetIdCounter()

  return (
    <>
      {/* <SearchStyles>
        <Downshift
          // onChange={routeToClient}
          itemToString={(user) =>
            user === null ? '' : user.lastName + ',' + ' ' + user.firstName
          }
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
          }) => (
            <div>
              <input
                {...getInputProps({
                  type: 'search',
                  placeholder: 'Search users',
                  id: 'search',
                  className: loading ? 'loading' : '',
                  spellCheck: false,
                  onChange: (e) => {
                    e.persist()
                    findUsersButChill({
                      variables: { searchTerm: e.target.value },
                    })
                  },
                })}
              />

              {isOpen && (
                <DropDown>
                  {users.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <Img
                        src={
                          item.image ? item.image : '../static/img/profpic.svg'
                        }
                        alt={item.firstName}
                      />
                      {item.lastName}, {item.firstName}
                    </DropDownItem>
                  ))}
                  {!users.length && !loading && (
                    <DropDownItem> Nothing Found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles> */}
      <Clients />
    </>
  )
}

export default AutoComplete
export { SEARCH_USERS_QUERY }
