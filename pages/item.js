import SingleItem from '../components/SingleItem'
import PleaseSignIn from '../components/PleaseSignIn'
import Footer from '../components/Footer'
const Item = (props) => (
  <PleaseSignIn>
    {(me) => (
      <>
        <SingleItem id={props.query.id} />
        <Footer />
      </>
    )}
  </PleaseSignIn>
)

export default Item
