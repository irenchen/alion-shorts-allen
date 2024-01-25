import { ShortsContextProvider } from './ShortsContext'
import ShortsCarousel from './ShortsCarousel'

import './shorts.css'

const ShortsPage = () => {
  return (
    <ShortsContextProvider>
      <ShortsCarousel />
    </ShortsContextProvider>
  )
}

export default ShortsPage
