import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { format, addHours, addMinutes } from 'date-fns'
import User from './User'
import Error from './ErrorMessage'
import { TODAYS_APPOINTMENTS_QUERY } from './CalendarStats'
import styled from 'styled-components'
import Loader from './Loader'
import UserSearch from './UserSearch'
import posed, { PoseGroup } from 'react-pose'
const ModalShell = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
})

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
})
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  .shade {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: 1000;
  }
  .modal {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    position: absolute;
    justify-content: center;
    margin: 0 auto;
    max-width: 700px;
    width: 80%;
    min-height: 400px;
    padding: 20px;
    z-index: 1001;
    box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.3);
  }
`
const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CREATE_APPOINTMENT_MUTATION(
    $user: [ID!]
    $reason: [ID!]
    $note: String
    $date: String!
    $start: String!
    $appLength: Int!
  ) {
    createAppointment(
      user: $user
      reason: $reason
      note: $note
      date: $date
      start: $start

      appLength: $appLength
    ) {
      id
      date
      appLength
      user {
        id
        firstName
        lastName
        image
      }
      reason {
        id
        color
        name
        classDescription
      }

      item {
        id
        price
        date
        time
        name
      }
      note
    }
  }
`
const ReasonSlide = posed.li({
  closed: {
    x: '-40%',
  },
  open: {
    x: '30%',

    transition: {
      stiffness: 100,
      duration: 400,
    },
  },
})

const TimeChunk = styled.div`
  .cal {
    width: 150px;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    height: 140px;
    border: none;
    box-shadow: 0px 10px 5px 3px rgba(20, 20, 20, 0.1);
    border-radius: 10px;
    text-align: center;
  }
  .cal__item {
    width: 100%;
    position: absolute;
  }
  .cal__item.month {
    /* transform: translateY(10px); */
    color: #ffffff;
    font-size: 16px;
    width: 150px;

    background: ${(props) => props.theme.second};
    text-transform: uppercase;
    border-radius: 10px 10px 0 0;
  }
  .cal__item.day {
    font-size: 40px;
    position: absolute;
    opacity: 0.8;
    transform: translateY(20px);
    align-self: center;
  }

  .timer {
    width: 140px;
    height: 140px;
    position: absolute;
    transform: translateX(210px);
    display: flex;
    border: 8px solid #323a44;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 0 12px white;
    /* transform: rotate(-90deg); */
  }
  .timer__item {
    position: absolute;
    top: 50%;
    left: 50%;
    background: #323a44;
    border-radius: 70px;
  }
  .timer__item.sec {
    width: 40%;
    height: 2.6666666667px;
    margin-top: -1.3333333333px;
    margin-left: -1.3333333333px;
    transform-origin: 1.3333333333px 1.3333333333px;
    background: #e74c3c;
  }
  .timer__item.min {
    width: 40%;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    transform-origin: 4px 4px;
  }
  .timer__item.hour {
    width: 25%;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    transform-origin: 4px 4px;
  }
  .message {
    margin-top: 40px;
    font-size: 20px;
    text-align: center;
    line-height: 2em;
  }
  .label {
    background: #0099ff;
    color: #fff;
    font-weight: bold;
    padding: 4px 8px 6px;
    border-radius: 70px;
  }
  .label.type {
    background: #65ab09;
  }
  .label.month {
    text-transform: uppercase;
  }
`

const StyledTextArea = styled.textarea`
  padding: 3px 10px;
  margin: 4px auto;
  border-width: 2px;
  border-style: solid;
  position: relative;
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, 0.1);
  color: grey;
  background: white;
  border-color: white;
  padding: 5px;
  width: 100%;
  min-height: 80px;
  font-size: 2rem;
  outline: none;
  resize: none;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`

const SickButton = styled.button`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.second};
  font-weight: 800;
  border: 2px solid ${(props) => props.theme.second};
  margin: 20px auto;
  display: flex;
  font-size: 2rem;
  padding: 6px 12px;
  font-size: 2rem;
  transition: all 0.5s;
  font-family: 'Comfortaa';
  outline: none;
  cursor: pointer;
  width: 80%;
  justify-content: center;
  justify-self: flex-end;
  align-items: center;
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    background: rgba(20, 100, 200, 0.8);
  }
  &:active {
    box-shadow: none;
  }
`

const SickerButton = styled.div`
  background: transparent;
  color: white;
  font-weight: 800;
  display: flex;
  position: absolute;
  padding: 5px;
  border: 1px solid white;
  border-radius: 3px;
  top: -40px;
  right: 0px;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  height: 35px;
  width: 35px;
  transition: all 0.5s;
  outline: none;
  cursor: pointer;
  background-image: url('../static/img/arrows_remove.svg');
  background-size: contain;
  color: white;
  fill: white;
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    background: rgba(245, 10, 10, 0.2);
  }
  &:active {
    box-shadow: none;
  }
  .imagez {
    color: white;
    height: 50px;
    width: 50px;
    position: relative;
    display: flex;
  }
`
const ReasonName = styled.div`
  display: flex;
  width: 100px;
  font-size: 10px;
  text-align: left;
  line-height: 12px;
`
const Ul = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;

  position: relative;
  justify-content: flex-start;
  span {
    position: relative;
  }
  input {
    background: none;
    border: none;
    grid-column: 1;
    position: absolute;
    text-align: center;
    color: white;
    padding: 0px 6px;
    transition: 0.2s;
    overflow-x: hidden;
    border-radius: 50%;
    font-size: 14px;
    margin: 0px 0px 0 15px;
    width: 17px;
    height: 17px;
    outline: none;
    cursor: pointer;
    z-index: 1000;
  }
  .line {
    width: 45px;
    grid-column: 1;
    height: 17px;
    margin-right: 20px;
    align-self: center;
    border-radius: 20px;
    background: rgba(20, 20, 20, 0.2);
    position: relative;
    transform: translate(0px, 0px);
    z-index: 500;
  }
`
function timeConvertor(time) {
  let pm = time.includes('pm')
  if (pm) {
    time = time.split(':')
    let hour = time[0] == '12' ? 12 : 12 + parseInt(time[0], 10)
    let min = time[1]

    return (hour + ':' + min).replace('pm', '')
  }
  if (!pm) {
    time = time.split(':')
    let hour = time[0]
    let min = time[1]

    return (hour + ':' + min).replace('am', '')
  }
}

class Modal extends Component {
  state = {
    loading: false,
    selectedUsers: [],
    checkedReasons: [],
    reasons: this.props.reasons,
    date: '',
    openReasons: [],
    appLength: 60,
    isoDate: '',
    note: '',
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val })
  }

  handleUserSearch = (item) => {
    let selectedCopy = [...this.state.selectedUsers]
    selectedCopy.push(item.id)

    this.setState({ selectedUsers: selectedCopy })
  }

  removeUserSearch = (item) => {
    this.setState(({ selectedUsers }) => {
      return {
        selectedUsers: selectedUsers.filter((i) => i !== item.id),
      }
    })
  }
  handleReasonChange = (e, i) => {
    const { name } = e.target
    let checkedReasons = [...this.state.checkedReasons]
    let openReasons = [...this.state.openReasons]
    const isChecked = checkedReasons.some((reason) => {
      if (name === reason) {
        return true
      }
    })
    if (!isChecked) {
      checkedReasons.push(name)
      openReasons.push(i)
    }

    if (isChecked) {
      checkedReasons = checkedReasons.filter((reason) => reason !== name)
      openReasons = openReasons.filter((reason) => reason !== i)
    }

    this.setState({
      checkedReasons: checkedReasons,
      openReasons: openReasons,
    })
  }

  render() {
    const { handleRehydrate, popUpModal, isVisible } = this.props
    const { openReasons } = this.state
    const tooShort = this.state.checkedReasons.length == 0

    const military = timeConvertor(this.props.time)

    const splitMil = military.split(':')
    const splitDate = this.props.date.toISOString()
    const withHours = addHours(new Date(this.props.date), splitMil[0])
    const withMins = addMinutes(new Date(withHours), splitMil[1])

    const toIso = this.props.time.length && withMins.toISOString()
    console.log(toIso)
    return (
      <Wrap isVisible={isVisible}>
        <PoseGroup>
          {isVisible && [
            <Shade key="shade" className="shade" />,
            <ModalShell key="modal" className="modal">
              <Mutation
                mutation={CREATE_APPOINTMENT_MUTATION}
                variables={{
                  users: this.state.selectedUsers,
                  reason: this.state.checkedReasons,
                  note: this.state.note,
                  date: format(this.props.date, 'MMM DD YYYY').toString(),
                  start: this.props.time,
                  isoDate: toIso,
                  appLength: this.state.appLength,
                }}
                awaitRefetchQueries={true}
                refetchQueries={[
                  {
                    query: TODAYS_APPOINTMENTS_QUERY,
                    variables: {
                      date: format(this.props.date, 'MMM DD YYYY').toString(),
                    },
                  },
                ]}
              >
                {(createAppointment, { loading, error }) => {
                  if (loading) return <Loader name="Creating Appointment" />
                  if (error)
                    return (
                      <>
                        <SickerButton
                          onClick={() => {
                            this.setState({
                              reason: '',
                              note: '',
                              checkedReasons: [],
                              openReasons: [],
                              selectedUsers: [],
                            })
                            popUpModal()
                          }}
                        />
                        <Error error={error} />
                      </>
                    )
                  return (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault()
                        const res = await createAppointment()
                        this.setState({
                          reason: '',
                          note: '',
                          checkedReasons: [],
                          openReasons: [],
                          selectedUsers: [],
                        })
                        await popUpModal()
                        const appointment = await res.data.createAppointment
                        await handleRehydrate(appointment)
                      }}
                    >
                      <SickerButton
                        onClick={() => {
                          this.setState({
                            reason: '',
                            note: '',
                            checkedReasons: [],
                            openReasons: [],
                            selectedUsers: [],
                          })
                          popUpModal()
                        }}
                      />{' '}
                      <TimeChunk>
                        <div className="timer">{this.props.time}</div>
                        <div className="cal">
                          <div className="cal__item month">
                            {format(this.props.date, 'MMMM, YYYY')}
                          </div>{' '}
                          <div className="cal__item day">
                            {format(this.props.date, 'Do')}
                          </div>
                        </div>{' '}
                      </TimeChunk>
                      <User>
                        {({ data: { authenticatedUser } }) => {
                          return (
                            <UserSearch
                              removeUserSearch={this.removeUserSearch}
                              handleUserSearch={this.handleUserSearch}
                              user={authenticatedUser}
                              selectedUsers={this.state.selectedUsers}
                            />
                          )
                        }}
                      </User>
                      <>
                        <Ul>
                          {this.state.reasons.map((reason, i) => {
                            return (
                              <Fragment key={reason.id + 'key'}>
                                <label htmlFor={reason.id}>
                                  <div className="line">
                                    <ReasonSlide
                                      pose={
                                        openReasons.includes(i)
                                          ? 'open'
                                          : 'closed'
                                      }
                                    >
                                      <input
                                        readOnly
                                        name={reason.id}
                                        onClick={(e) =>
                                          this.handleReasonChange(e, i)
                                        }
                                        style={{
                                          background: `${reason.color}`,
                                        }}
                                      />
                                    </ReasonSlide>
                                  </div>
                                  <ReasonName
                                    style={{
                                      color: openReasons.includes(i)
                                        ? `${reason.color}`
                                        : '',
                                    }}
                                  >
                                    {' '}
                                    {reason.name}
                                  </ReasonName>{' '}
                                </label>
                              </Fragment>
                            )
                          })}
                        </Ul>
                      </>
                      <label htmlFor="note">
                        Extra Notes:
                        <StyledTextArea
                          name="note"
                          type="text"
                          value={this.state.note}
                          onChange={this.handleChange}
                        />
                      </label>
                      <SickButton disabled={tooShort} type="submit">
                        Schedule Live Workout
                      </SickButton>
                    </form>
                  )
                }}
              </Mutation>
            </ModalShell>,
          ]}
        </PoseGroup>
      </Wrap>
    )
  }
}

export default Modal
export { CREATE_APPOINTMENT_MUTATION }
