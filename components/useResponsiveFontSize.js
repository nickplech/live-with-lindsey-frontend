import { useEffect, useState } from 'react'

export default function useResponsiveSlideSize() {
  const getSlideSize = () => (window.innerWidth < 652 ? 1 : 3)
  const [slideSize, setSlideSize] = useState(getSlideSize)

  useEffect(() => {
    const onResize = () => {
      setSlideSize(getSlideSize())
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return slideSize
}
