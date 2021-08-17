import ResetSwitch from '../components/ResetSwitch'
import DashboardComponent from '../components/DashboardComponent'
import Footer from '../components/Footer'
const reset = (props) => {
  console.log(props)
  return(

  <ResetSwitch resetToken={props.query.resetToken}>
    <DashboardComponent />
    <Footer/>
  </ResetSwitch>
)
  }

export default reset
