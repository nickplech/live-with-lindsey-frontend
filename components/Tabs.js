import { scale } from 'chroma-js'
import React, { Component } from 'react'
import styled from 'styled-components'
import Tab from './Tab'

const Wrap = styled.div`
  margin: 60px auto;
  width: 100%;

  color: rgba(17, 29, 74, 0.8);

  font-size: 16px;
  line-height: 26px;

  p {
    color: #98927c;
  }
`
const ListTabs = styled.ul`
  list-style: none;
  margin: 0 auto;
  position: relative;
  padding: 0;
  display: flex;
  justify-content: ${(props) =>
    props.adminStyle ? 'space-evenly' : 'flex-start'};
  max-width: 1200px;
`

const TabTitleItem = styled.li`
  position: relative;
  width: 90%;
`
const ActiveTabBorder = styled.div`
  position: relative;
`
const AccountTab = styled.div`
  cursor: pointer;
  background: ${(props) =>
    props.isActiveTab ? (props) => props.theme.primary : 'lightgrey'};
  line-height: 12px;
  box-shadow: ${(props) =>
    props.isActiveTab ? '0px 0px 1px 1px rgba(0, 0, 0, 0.1)' : 'none'};

  border-bottom: none;
  transition: 0.6s;
  padding: 8px 12px 12px;
  font-family: 'Bison';

  letter-spacing: 2px;
  width: 180px;
  border-radius: 5px;

  transform: translate(6px, 6px);
  user-select: none;
  p {
    margin: 0 auto;
    color: ${(props) => (props.isActiveTab ? 'slategrey' : 'grey')};
    opacity: ${(props) => (props.isActiveTab ? 1 : 0.4)};
  }
`
const TabAnchorItem = styled.a`
  text-transform: uppercase;
  color: #fff;
  font-family: 'Bison';
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 50%; */
  height: 50px;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);

  background: ${(props) => (props.isActiveTab ? '#3b543b' : '#6b996b')};
  opacity: ${(props) => (props.isActiveTab ? 1 : 0.6)};
  cursor: pointer;
  letter-spacing: 3px;
  transition: 0.3s;
  &:hover {
    background: #6b996b;
    opacity: 0.9;
  }

  &:focus {
    background: #6b996b;
  }
  img {
    width: 20px;
    background: transparent;
    position: absolute;
  }
`

const TabzContainer = styled.div`
  position: relative;
  width: 100%;
`

const ReactTabs = styled.div`
  position: relative;
`

class TabsContainer extends Component {
  static Tab = Tab

  state = {
    tabs: [],
    prevActiveTab: {},
    activeTab: this.props.activeTab,
    tabsElements: [],
  }

  addTab = (newTab) => {
    let isNewTabFound

    for (let i in this.state.tabs) {
      let tab = this.state.tabs[i]

      if (tab.id === newTab.id) {
        isNewTabFound = true
        break
      }
    }

    if (!isNewTabFound) {
      this.setState((prevState, props) => {
        return {
          tabs: prevState.tabs.concat(newTab),
        }
      })
    }
  }

  removeTab = (tabId) => {
    this.setState((prevState, props) => {
      return {
        tabs: prevState.tabs.filter((tab) => tab.id !== tabId),
      }
    })
  }

  onClick = (tab) => (event) => {
    this.setState((prevState, props) => {
      return {
        prevActiveTab: prevState.activeTab,
        activeTab: tab,
      }
    })
  }

  render() {
    return (
      <Wrap>
        <ReactTabs>
          <TabzContainer adminStyle={this.state.tabs.length > 2}>
            <ListTabs adminStyle={this.state.tabs.length > 2}>
              {this.state.tabs.map((tab, index) => (
                <TabTitleItem>
                  {tab.title === 'profile' || tab.title === 'order history' ? (
                    <AccountTab
                      key={tab.title}
                      onClick={this.onClick(tab)}
                      id={tab.id}
                      ref={(tabElement) => {
                        if (!this.state.tabsElements[tab.id]) {
                          this.setState((prevState, props) => {
                            const tabsElements = prevState.tabsElements
                            tabsElements[tab.id] = tabElement

                            return {
                              tabsElements,
                            }
                          })
                        }
                      }}
                      isActiveTab={this.state.activeTab.id === tab.id}
                    >
                      <p>{tab.title}</p>
                    </AccountTab>
                  ) : (
                    <TabAnchorItem
                      key={index}
                      onClick={this.onClick(tab)}
                      id={tab.id}
                      ref={(tabElement) => {
                        if (!this.state.tabsElements[tab.id]) {
                          this.setState((prevState, props) => {
                            const tabsElements = prevState.tabsElements
                            tabsElements[tab.id] = tabElement

                            return {
                              tabsElements,
                            }
                          })
                        }
                      }}
                      isActiveTab={this.state.activeTab.id === tab.id}
                    >
                      {' '}
                      <img src={`../static/img/${tab.title}.svg`} />
                    </TabAnchorItem>
                  )}
                </TabTitleItem>
              ))}
            </ListTabs>

            <ActiveTabBorder
              activeTabElement={
                this.state.tabsElements[this.state.activeTab.id]
              }
            />
          </TabzContainer>

          {React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
              activeTab: this.state.activeTab,
              addTab: this.addTab,
            }),
          )}
        </ReactTabs>
      </Wrap>
    )
  }
}

export default TabsContainer
