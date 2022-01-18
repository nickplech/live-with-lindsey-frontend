import PhotoArray from '../components/PhotoArray'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import { useUser } from '../components/User'
import MostRecentVideo from '../components/MostRecentVideo'
import VodNewSlidersComponent from '../components/VodNewSlidersComponent'
import VodListSlider from '../components/VodListSlider'
import VodCategoriesTabs from '../components/VodCategoriesTabs'
import VodFavoritesSlider from '../components/VodFavoritesSlider'
import gql from 'graphql-tag'
import CommunityFavoritesSlider from '../components/CommunityFavorites'
import { useQuery } from '@apollo/client'

const ALL_TAG_CATEGORY_QUERY = gql`
  query ALL_TAG_CATEGORY_QUERY {
    allTags(where: {isOnDemandCategory: true}) {
      id
      name
      isOnDemandCategory

    }
  }
`
const VOD = (props) => {
  const me = useUser()

const {data, loading, error} = useQuery(ALL_TAG_CATEGORY_QUERY)
if (loading) return <Loader />
if (!data) return null
console.log(data.allTags.name)
  return (
    <>
      <PhotoArray />
      <VodCategoriesTabs/>
          <MostRecentVideo />
          <VodFavoritesSlider  user={me} />
          <VodListSlider  user={me} />
          <CommunityFavoritesSlider user={me} />
          {data.allTags && data.allTags.map((tag)=> {
            return(
                     <VodNewSlidersComponent key={tag.name} user={me} nameOfList={tag.name} />
            )
          })}
    
      <Footer />
    </>
  )
}
export default VOD
