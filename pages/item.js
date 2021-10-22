import SingleItem from '../components/SingleItem'
 
import Footer from '../components/Footer'
const Item = (props) => (
  
      <>
        <SingleItem id={props.query.id} />
        <Footer />
      </>
 
)

export default Item
