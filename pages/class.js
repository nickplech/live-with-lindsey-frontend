import React from 'react'
import OwnsIt from '../components/SingleLiveClass'
 

const ClassInfo = ({query}) => {
 

  return <OwnsIt id={query.id} />
}

export default ClassInfo
