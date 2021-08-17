import React, { Component } from 'react'
import styled from 'styled-components'
import Error from './ErrorMessage'
import Link from 'next/link'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { Data_15 } from '../lib/timeSlots'
import AppSlot from './DraggerGrid'

import { format, startOfDay } from 'date-fns'
import Slot from './Slot'
import isNowFunc from '../lib/currentTime'
import Loader from './Loader'
import Modal from './Modal'

const ALL_REASONS_QUERY = gql`
  query ALL_REASONS_QUERY {
    allReasons() {
      id
      name
      color
      appointments {
        id

      }
    }
  }
`

const DayView = styled.div`
  position: relative;
  display: grid;
  grid-row: 1/3;
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.05);
  border-radius: 10px 10px 10px 10px;
  z-index: -1;
  .gear {
    position: relative;
    height: 18px;
    width: 18px;
    margin: 0px;
    transition: 0.3s;
    &:hover {
      transform: rotate(45deg);
    }
  }
  .parent {
    display: flex;
    flex-flow: column;
    position: absolute;
    right: 0px;
    align-items: flex-end;
    border-radius: 5px 7px 0 0;
    text-align: center;
    padding-right: 20px;
    margin-top: 1px;
    height: 65px;
    width: 100%;
    background: ${(props) => props.theme.grey};
  }
  .todayButton {
    justify-content: center;
    position: absolute;
    display: flex;
    border-radius: 5px;
    background: white;
    left: 10px;
    border-top: 13px solid red;
    top: 10px;
    box-shadow: 0 1px 1px 2px rgba(0, 0, 0, 0.2);
    width: 48px;
    height: 45px;
    cursor: pointer;
    transition: 0.3s;
    z-index: 50;
    &:before {
      content: 'TODAY';
      color: white;
      position: absolute;
      font-size: 9px;
      top: -14.8px;
    }
    &:hover {
      transform: scale(1.03);
    }
    &:active {
      transform: scale(1);
    }
  }
  .date {
    display: flex;
    text-transform: uppercase;
    margin: 0;
    color: rgba(230, 230, 230, 0.8);
    font-size: 14px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
  .sideDate {
    display: flex;
    color: white;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 26px;
    line-height: 26px;
    padding-top: 10px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
`
const MainDiv = styled.div`
  margin-top: 70px;
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  overflow-y: scroll;
  overscroll-behavior: contain;
`
const DayGrid = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 25px 1fr;
  position: relative;
  width: 100%;
  right: 0px;
  margin-top: 0px;
  height: 100%;
`
const Side = styled.div`
  grid-column: 1;
  grid-auto-rows: 25px;
  grid-row-gap: 0px;
  margin-top: 25px;
`
const Side1 = styled.div`
  height: 25px;
  display: flex;
  background: rgba(20, 20, 20, 0.1);
  color: rgba(20, 20, 20, 0.6);
  z-index: 4;
  position: relative;
  grid-auto-rows: 25px;
  grid-row-gap: 0px;
  font-size: 11px;
  justify-content: center;
  align-items: center;
  &:nth-of-type(4n + 1) {
    color: white;
    background: #f67280;
    &:after {
      content: '';
      width: 0;
      z-index: 2;
      height: 0;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      position: absolute;
      border-left: 10px solid
        ${(props) => (props.valid ? 'rgba(200,100,100,1)' : '#f8b0b0')};
      transform: translate(35px, -1px);
    }
  }
  &:nth-of-type(4n + 2) {
    color: rgba(20, 20, 20, 0.65);
    background: rgba(20, 20, 20, 0.2);
  }
  &:nth-of-type(4n + 3) {
    color: rgba(20, 20, 20, 0.65);
    background: rgba(20, 20, 20, 0.3);
  }
  &:nth-of-type(4n + 4) {
    color: rgba(20, 20, 20, 0.65);
    background: rgba(20, 20, 20, 0.2);
  }
`
const Inputs = styled.div`
  grid-column: 2;
  grid-auto-rows: 25px;
  grid-row-gap: 0px;
  margin: 0 2px;
`
const ProviderBar1 = styled.div`
  grid-column: 2;
  grid-row: 1;
  height: 25px;
  grid-row-gap: 0px;
  display: flex;
  justify-self: center;
  font-family: 'Comfortaa';
  justify-content: center;
  width: 99%;
  position: relative;
  align-items: center;
  background: #e1e1e1;
  z-index: 1000;
  p {
    display: flex;
    margin: 0 auto;
    text-transform: uppercase;
    opacity: 0.7;
  }
`

class SingleDay extends Component {
  intervalID = 0
  constructor() {
    super()
    let d = new Date()
    this.state = {
      isVisible: false,
      selectedTime: '',
      today: startOfDay(d),
      currentTime: d.toLocaleTimeString(),
    }
  }
  update = (e) => {
    this.setState({ selectedTime: e.target.name })
  }
  countingMinute = () => {
    let d = new Date()
    this.setState({
      currentTime: d.toLocaleTimeString(),
    })
  }
  popUpModal = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  }

  render() {
    const { slots, appointments, appointmentIndices } = this.props
    let date = this.props.date
    let today = this.state.today
    let time = this.state.selectedTime

    const { isVisible } = this.state
    const appointmentsArr = appointments.map((appointment) => {
      return appointment
    })
    appointmentIndices.map((appIndex, i) => {
      const start_index = appIndex
      const number_of_elements_to_remove = 1
      const removed_elements = slots.splice(
        start_index,
        number_of_elements_to_remove,
        appointmentsArr[i],
      )
    })
    const stripped = this.state.currentTime.toString().slice(1, -6)
    isNowFunc(stripped)
    return (
      <Query query={ALL_REASONS_QUERY} prefetch>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          return (
            <>
              <DayView>
                <div className="parent">
                  <ApolloConsumer>
                    {(client) => (
                      <div
                        onClick={() => {
                          this.props.handleToday(client)
                        }}
                        className="todayButton"
                      >
                        {format(today, 'ddd')}
                      </div>
                    )}
                  </ApolloConsumer>
                  <div className="sideDate">
                    {format(date, 'MMMM Do, YYYY')}
                  </div>
                  <div className="date">{format(date, 'dddd')}</div>
                </div>

                <MainDiv>
                  <DayGrid>
                    <Side>
                      {Data_15.map((time, i) => {
                        const fullTime = time.time + ' ' + time.ampm
                        const hasMeridian = time.time.toString().includes('00')
                        const isHour = hasMeridian ? fullTime : time.time

                        const isAm = time.ampm.toLowerCase().includes('am')
                        return (
                          <Side1 ampm={time.ampm} key={fullTime}>
                            {isHour}
                          </Side1>
                        )
                      })}
                    </Side>{' '}
                    <ProviderBar1>
                      <p>Lindsey Harrod</p>
                      <Link
                        href={{
                          pathname: 'account',
                          query: { id: this.props.id },
                        }}
                      >
                        <a
                          style={{
                            marginTop: '7px',
                            marginRight: '7px',
                          }}
                        >
                          <img
                            className="gear"
                            src="../static/img/gear.png"
                            alt="edit provider info"
                          />
                        </a>
                      </Link>
                    </ProviderBar1>
                    <Inputs>
                      <AppSlot
                        appointmentIndices={appointmentIndices}
                        appointments={appointments}
                        updateViewerStateLength={
                          this.props.updateViewerStateLength
                        }
                        updateViewerState={this.props.updateViewerState}
                        selectAppointment={this.props.selectAppointment}
                        selectedAppointment={this.state.selectedAppointment}
                        date={date}
                        update={this.update}
                      ></AppSlot>
                      {slots.map((timeblock, i) => {
                        const objy = typeof timeblock !== 'string'

                        return (
                          <Slot
                            key={timeblock + 1 + i}
                            time={timeblock}
                            appointmentObject={false}
                            isVisible={isVisible}
                            popUpModal={this.popUpModal}
                            update={this.update}
                            selectAppointment={this.props.selectAppointment}
                          />
                        )
                      })}
                    </Inputs>
                  </DayGrid>
                </MainDiv>
              </DayView>

              <Modal
                isVisible={isVisible}
                popUpModal={this.popUpModal}
                date={date}
                time={time}
                handleRehydrate={this.props.handleRehydrate}
                reasons={data.reasons}
              />
            </>
          )
        }}
      </Query>
    )
  }
}

export default SingleDay
export { ALL_REASONS_QUERY }
