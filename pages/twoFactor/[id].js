import React from 'react'
import { useRouter } from 'next/router'
import TwoFacAuth from '../../components/TwoFacAuth'

const TwoFac = () => {
  const router = useRouter()
 // console.log(router.query.id)
  return <TwoFacAuth id={router.query.id} />
}

export default TwoFac
