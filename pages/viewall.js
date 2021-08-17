import PleaseSignIn from '../components/PleaseSignIn'
import PhotoArray from '../components/PhotoArray'
import Footer from '../components/Footer'

import styled from 'styled-components'
import LoadTags from '../components/SearchByTag'
import ViewAllTemplate from '../components/ViewAllTemplate'

const VOD = (props) => {
  return (
    <>
      <PhotoArray />
      <LoadTags />
      <ViewAllTemplate category={'name'} />

      <Footer />
    </>
  )
}
export default VOD
