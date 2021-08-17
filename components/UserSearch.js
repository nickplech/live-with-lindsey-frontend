import React from 'react'
import Downshift, { resetIdCounter } from 'downshift'
import { ApolloConsumer } from '@apollo/client'
import { SEARCH_USERS_QUERY } from './AutoComplete'
import debounce from 'lodash.debounce'
import styled from 'styled-components'

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 5;
  border: 1px solid ${(props) => props.theme.lightgrey};
  max-height: 400px;
  overflow-y: scroll;
  z-index: 1000;
`

const DropDownItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  background: white;
  position: relative;
  padding: 1rem;
  transition: all 0.2s;
  z-index: 1000;
  ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`
const Remove = styled.a`
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
    margin: 0 0 0 5px;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    height: 15px;
    width: 15px;
    opacity: 0.4;
    transition: 0.3s;
    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`
const TheSelected = styled.div`
  margin: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 8px;
  padding-right: 8px;
  display: inline-block;
  font-size: 12px;
  word-wrap: none;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.second};
  color: ${(props) => props.theme.second};
  border-radius: 5px;
`
const SearchStyles = styled.div`
  position: relative;
`
const Img = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
`
const StyledDiv = styled.div`
  cursor: pointer;

  border: 0;
  border-bottom: 3px solid rgba(20, 110, 220, 1);
  outline: none;
  margin: 10px auto;
  input {
    outline: none;
    width: 100%;
    font-size: 20px;
    border: none;
    padding: 8px;

    height: 30px;
    background: rgba(20, 110, 220, 0.2);
  }
`

const OtherDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const XXX = styled.div`
  display: grid;
  grid-gap: 6;
  grid-auto-flow: column;
  align-items: center;
`

class MultiDownshift extends React.Component {
  state = { selectedItems: [] }

  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: false,
          inputValue: '',
        }
      default:
        return changes
    }
  }

  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      const { onSelect, onChange } = this.props
      const { selectedItems } = this.state

      if (onSelect) {
        onSelect(
          selectedItems,
          handleUserSearch,
          removeUserSearch,
          this.getStateAndHelpers(downshift),
        )
      }
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift))
      }
    }
    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)
    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }
  }

  removeItem = async (item, cb) => {
    const { removeUserSearch } = this.props
    this.setState(({ selectedItems }) => {
      console.log(selectedItems)
      return {
        selectedItems: selectedItems.filter((i) => {
          console.log(i)
          return i !== item
        }),
      }
    }, cb)
    await removeUserSearch(item)
  }

  addSelectedItem(item, cb) {
    const { handleUserSearch } = this.props
    this.setState(
      ({ selectedItems }) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
    handleUserSearch(item)
  }

  getRemoveButtonProps = ({ onClick, item, ...props } = {}) => {
    return {
      onClick: (e) => {
        onClick && onClick(e)
        e.stopPropagation()
        this.removeItem(item)
      },
      ...props,
    }
  }

  getStateAndHelpers(downshift) {
    const { selectedItems } = this.state
    const { getRemoveButtonProps, removeItem } = this
    return {
      getRemoveButtonProps,
      removeItem,
      selectedItems,
      ...downshift,
    }
  }
  render() {
    resetIdCounter()
    const { render, children = render, ...props } = this.props

    return (
      <SearchStyles>
        <Downshift
          {...props}
          stateReducer={this.stateReducer}
          onChange={this.handleSelection}
          selectedItem={null}
        >
          {(downshift) => children(this.getStateAndHelpers(downshift))}
        </Downshift>
      </SearchStyles>
    )
  }
}

class UserSearch extends React.Component {
  state = { users: [], loading: false }

  itemToString = (item) =>
    item ? item.lastName + ',' + ' ' + item.firstName : ''

  onChange = debounce(async (e, client) => {
    console.log('Searching...')
    this.setState({ loading: true })
    const res = await client.query({
      query: SEARCH_USERS_QUERY,
      variables: { searchTerm: e.target.value },
    })

    const newUserArray = await res.data.users.filter(
      (user) => !this.props.selectedUsers.includes(user.id),
    )

    this.setState({
      users: newUserArray,
      loading: false,
    })
  }, 350)
  render() {
    return (
      <MultiDownshift
        removeUserSearch={this.props.removeUserSearch}
        handleUserSearch={this.props.handleUserSearch}
        onChange={this.handleChange}
        itemToString={this.itemToString}
      >
        {({
          getInputProps,
          getRemoveButtonProps,
          removeItem,
          isOpen,
          inputValue,
          selectedItems,
          getItemProps,
          highlightedIndex,
        }) => (
          <div
            style={{ maxWidth: '100%', margin: 'auto', position: 'relative' }}
          >
            <StyledDiv>
              <ApolloConsumer>
                {(client) => (
                  <input
                    placeholder="Type Here to Add Client(s)"
                    {...getInputProps({
                      onKeyDown(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          removeItem(selectedItems[selectedItems.length - 1])
                        }
                      },
                      onChange: (e) => {
                        e.persist()
                        this.onChange(e, client)
                      },
                    })}
                  />
                )}
              </ApolloConsumer>{' '}
            </StyledDiv>

            {isOpen && (
              <DropDown>
                {this.state.users.map((item, index) => (
                  <DropDownItem
                    {...getItemProps({
                      item,
                      index,
                      isActive: highlightedIndex === index,
                      isSelected: selectedItems.includes(item),
                    })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    <Img src={item.image} alt={item.firstName} />
                    {item.lastName}, {item.firstName}
                  </DropDownItem>
                ))}
                {!this.state.users.length && !this.state.loading && (
                  <DropDownItem> Nothing Found for {inputValue}</DropDownItem>
                )}
              </DropDown>
            )}
            <OtherDiv>
              {selectedItems.length > 0
                ? selectedItems.map((item) => {
                    return (
                      <TheSelected key={item.id}>
                        <XXX>
                          <span>
                            {item.lastName + ',' + ' ' + item.firstName}
                          </span>
                          <Remove {...getRemoveButtonProps({ item })}>
                            <img src="../static/img/xxx.svg" />
                          </Remove>
                        </XXX>
                      </TheSelected>
                    )
                  })
                : ''}
            </OtherDiv>
          </div>
        )}
      </MultiDownshift>
    )
  }
}

export default UserSearch
