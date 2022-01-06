import React, { Fragment } from 'react'
import styled from 'styled-components'

const Side1 = styled.div`
  grid-column: 1;
  display: flex;
  background: rgba(20, 110, 240, 0.65);
  color: white;
  font-size: 11px;
  justify-content: center;
  align-items: center;
  &:nth-of-type(4n + 1) {
    background: rgba(20, 110, 240, 1);
    &:after {
      content: '';
      width: 0;
      height: 0;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      position: absolute;
      border-left: 10px solid rgba(20, 110, 240, 1);
      transform: translate(35px, -1px);
    }
  }
`

const StyledInput = styled.button`
  display: grid;
  grid-column: 2;
  text-align: left;
  padding: 0;
  font-weight: 800;
  height: 100%;
  padding-left: 15px;
  margin-left: 2px;
  background: none;
  background: white;
  border: none;
  border-radius: 2px;
  font-size: 1em;
  border-bottom: 1px solid rgba(20, 20, 20, 0.1);

  /* opacity: 1; */
  cursor: pointer;
  color: white;
  button,
  [type='button'] {
    -webkit-appearance: button;
  }
  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
  &:focus {
    outline: none;
  }
`

const Slot = ({
  time,
  i,
  toggleModal,
  update,
  selectedAppointment,
  setSelectedAppointment,
  appointmentObject,
}) => {
  return (
    <Fragment key={time}>
      <Side1>{appointmentObject ? time.start : time}</Side1>
      {appointmentObject ? (
        <StyledInput
          onDoubleClick={toggleModal}
          name={time.start}
          style={{
            background: `${appointmentObject && time.reason[0].color}`,
            borderLeft: `5px solid ${appointmentObject &&
              time.reason[0].color}`,
          }}
          value={time}
          onClick={e => {
            update(e)
            selectedAppointment(time, appointmentObject)
          }}
        >
          {time.client[0].fullName}
        </StyledInput>
      ) : (
        <StyledInput
          onDoubleClick={toggleModal}
          name={time}
          value={time}
          onClick={e => {
            update(e)
            setSelectedAppointment(time, appointmentObject)
          }}
        />
      )}
    </Fragment>
  )
}

export default Slot
