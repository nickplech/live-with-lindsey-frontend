import PleaseSignIn from '../components/PleaseSignIn'
import PhotoArray from '../components/PhotoArray'
import Footer from '../components/Footer'
import styled from 'styled-components'
import ViewAllTemplate from '../components/ViewAllTemplate'

const ViewAllOnDemands = (props) => {
  return (
    <>
      <PhotoArray />
   
      <ViewAllTemplate category={'name'} />

      <Footer />
    </>
  )
}
export default ViewAllOnDemands
