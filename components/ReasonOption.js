import React from 'react'

const ReasonOption = props => {
  return <option value={props.reason.name}>{props.reason.name}</option>
}

export default ReasonOption
