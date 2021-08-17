import React from 'react'
import OwnsIt from '../../components/SingleClass'
import { useRouter } from 'next/router'

const ClassInfo = () => {
  const router = useRouter()

  return <OwnsIt id={router.query.id} />
}

export default ClassInfo
