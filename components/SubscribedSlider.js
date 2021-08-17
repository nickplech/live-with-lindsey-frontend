import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import ScrollMenu from 'react-horizontal-scrolling-menu'

import CountdownTimer from './CountDownTimer.js'
const Wrap = styled.div`
  user-select: none;
  outline: none;
  width: 100%;
  margin-bottom: 60px;

  margin-top: 60px;
  .menu-item {
    padding: 0 10px;

    text-align: center;
    display: flex;
    height: 220px;
    width: 250px;
    justify-content: center;
    width: 300px;
    background: rgba(20, 20, 20, 0.2);
    height: 250px;
    margin: 0 20px;
    background-color: linear-gradient(
      transparent,
      rgba(67, 17, 51, 0.4),
      #000320
    );
    user-select: none;
    cursor: pointer;
  }
  .menu-item-wrapper {
  }
  .menu-item-wrapper.active {
  }
  .menu-item.active {
    border: 3px green solid;
  }

  .scroll-menu-arrow {
    padding: 15px;
    cursor: pointer;
    font-size: 22px;
    font-family: 'Comfortaa';
    background: ${(props) => props.theme.second};
    height: 100%;
    color: white;
  }

  .scroll-menu-arrow--disabled {
    opacity: 0.3;
    background: rgba(20, 20, 20, 0.6);
  }
  h1 {
    display: flex;
    text-transform: uppercase;
    text-align: center;
    font-size: 14px;
    color: rgba(50, 140, 60, 0.8);
    transition: 0.3s;
    padding: 5px 5px;
    margin: 10px auto;
    width: 280px;

    &:hover {
      background: rgba(50, 170, 60, 0.5);
      color: white;
    }
  }
`
const MenuItem = ({ id, name, selected }) => {
  return (
    <Link href={{ pathname: '/stream', query: { streamId: id } }}>
      <a>
        <img
          key={name}
          className="slide"
          srcclassname={`menu-item ${selected ? 'active' : ''} menu-item`}
          src={`../static/img/${name}.jpg`}
        />
        <h1>{name}</h1>
        <CountdownTimer id={id} />
      </a>
    </Link>
  )
}

export const Menu = (streams, selected) =>
  streams.map((stream) => {
    return (
      <>
        <MenuItem
          name={stream.name}
          id={stream.id}
          key={stream.id}
          // source={null}
          selected={selected}
        />
      </>
    )
  })

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>
}

export const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' })
export const ArrowRight = Arrow({ text: '>', className: 'arrow-next' })

class SubscribedSlider extends Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount:
      this.props.subscribed === null ? 0 : this.props.subscribed.length,
    selected: '',
    translate: 0,
    transition: 0.3,
    wheel: false,
  }

  constructor(props) {
    super(props)
    this.menu = null
    if (this.props.subscribed !== null) {
      this.menuItems = Menu(
        this.props.subscribed.slice(0, this.state.itemsCount),
        this.state.selected,
      )
    }
  }

  onUpdate = ({ translate }) => {
    console.log(`onUpdate: translate: ${translate}`)
    this.setState({ translate })
  }

  onSelect = (key) => {
    console.log(`onSelect: ${key}`)
    this.setState({ selected: key })
  }

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState
    const { alignCenter: alignCenterNew } = this.state
    if (alignCenter !== alignCenterNew) {
      this.menu.setInitial()
    }
  }

  setItemsCount = (ev) => {
    const { itemsCount = this.props.subscribed.length, selected } = this.state
    const val = +ev.target.value
    const itemsCountNew =
      !isNaN(val) && val <= this.props.streams.length && val >= 0
        ? +ev.target.value
        : this.props.streams.length
    const itemsCountChanged = itemsCount !== itemsCountNew

    if (itemsCountChanged) {
      this.menuItems = Menu(
        this.props.streams.slice(0, itemsCountNew),
        selected,
      )
      this.setState({
        itemsCount: itemsCountNew,
      })
    }
  }

  setSelected = (ev) => {
    const { value } = ev.target
    this.setState({ selected: String(value) })
  }

  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      itemsCount,
      selected,
      translate,
      transition,
      wheel,
    } = this.state

    const menu = this.menuItems

    return (
      <Wrap className="App">
        <ScrollMenu
          ref={(el) => (this.menu = el)}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          hideArrows={hideArrows}
          hideSingleArrow={hideSingleArrow}
          transition={+transition}
          onUpdate={this.onUpdate}
          onSelect={this.onSelect}
          selected={selected}
          itemsCount={itemsCount}
          translate={translate}
          alignCenter={alignCenter}
          scrollToSelected={true}
          dragging={dragging}
          clickWhenDrag={clickWhenDrag}
          wheel={wheel}
        />
      </Wrap>
    )
  }
}

export default SubscribedSlider
