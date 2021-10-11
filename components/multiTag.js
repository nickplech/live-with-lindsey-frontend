import React from 'react'
import Downshift, { resetIdCounter } from 'downshift'
import { ApolloConsumer } from '@apollo/client'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import Loader from './Loader'


const ALL_TAGS_SEARCH_QUERY = gql`
  query ALL_TAGS_SEARCH_QUERY($searchTerm: String) {
    allTags(where: { name_contains: $searchTerm} ) {
      id
      name
    }
  }
`
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
  background-color: ${(props) => props.theme.third};
 
  color: white;
  border-radius: 2px;
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

  border-radius: 5px;
  border: 1px solid lightgrey;
  outline: none;
  margin: 10px auto;
  input {
    outline: none;
    width: 100%;
    font-size: 14px;
    border: none;
    padding: 8px;
font-family: 'Bison';
letter-spacing: 3px;
    height: 35px;
    background: transparent;
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
          handleTagsSearch,
          removeTagsSearch,
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
    const { removeTagsSearch } = this.props
    this.setState(({ selectedItems }) => {
      console.log(selectedItems)
      return {
        selectedItems: selectedItems.filter((i) => {
          console.log(i)
          return i !== item
        }),
      }
    }, cb)
    await removeTagsSearch(item)
  }

  addSelectedItem(item, cb) {
    const { handleTagsSearch } = this.props
    this.setState(
      ({ selectedItems }) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
    handleTagsSearch(item)
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
      <div style={{marginTop: '20px'}}>
      <SearchStyles>
        <Downshift
          {...props}
          stateReducer={this.stateReducer}
          onChange={this.handleSelection}
          selectedItem={null}
        >
          {(downshift) => children(this.getStateAndHelpers(downshift))}
        </Downshift>
      </SearchStyles></div>
    )
  }
}

class MultiTag extends React.Component {
  state = { tags: [], loading: false }

  itemToString = (item) => item ? item.name : ''

  onChange = debounce(async (e, client) => {
    console.log('Searching...')
    this.setState({ loading: true })
    const res = await client.query({
      query: ALL_TAGS_SEARCH_QUERY,
      variables: { searchTerm: e.target.value },
    })

    const newTagsArray = await res.data.allTags

const filteredNewArray = await newTagsArray.filter(item => !this.props.selected.includes(item.id))
    this.setState({
      tags: filteredNewArray,
      loading: false,
    })
  }, 350)

  render() {
    return (
      <MultiDownshift
        removeTagsSearch={this.props.removeTagsSearch}
        handleTagsSearch={this.props.handleTagsSearch}
        onChange={this.handleSelection}
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

                    placeholder="Add tags"
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
                {this.state.tags.map((item, index) => (
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

                    {item.name}
                  </DropDownItem>
                ))}
                {!this.state.tags.length && !this.state.loading && (
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
                            {item.name}
                          </span>
                          <Remove {...getRemoveButtonProps({ item })}>
                            <img src="../static/img/xxxx.svg" />
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

export default MultiTag
