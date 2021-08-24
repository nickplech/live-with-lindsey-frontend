import PhotoArray from '../components/PhotoArray'
import Footer from '../components/Footer'
import { useUser } from '../components/User'
import MostRecentVideo from '../components/MostRecentVideo'

import VodListSlider from '../components/VodListSlider'
import VodFavoritesSlider from '../components/VodFavoritesSlider'
import CommunityFavoritesSlider from '../components/CommunityFavorites'

const VOD = (props) => {
  const me = useUser()

  console.log(me && me.id)
  return (
    <>
      <PhotoArray />
        <div style={{minHeight: '600px'}}>
          <MostRecentVideo />
          <VodFavoritesSlider  user={me} />
          <VodListSlider  user={me} />
          <CommunityFavoritesSlider user={me} />
        </div>
      <Footer />
    </>
  )
}
export default VOD
