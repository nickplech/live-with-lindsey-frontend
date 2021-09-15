import PleaseSignIn from '../components/PleaseSignIn'
import PhotoArray from '../components/PhotoArray'
import Footer from '../components/Footer'
import styled from 'styled-components'
import ViewAllTemplate from '../components/ViewAllTemplate'

const ViewAllOnDemands = ({query}) => {
  return (
    <>
      <PhotoArray title={query.category} />
   
      <ViewAllTemplate  title={query.category}/>

      <Footer />
    </>
  )
}
export default ViewAllOnDemands
