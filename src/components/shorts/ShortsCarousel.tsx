import { useEffect, useMemo, useState } from 'react'

import gsap from 'gsap'
import Observer from 'gsap/Observer'
gsap.registerPlugin(Observer)

import { useShortsContext } from './ShortsContext'

import NoVideo from './NoVideo'
import Loading from './Loading'

import ShortContainer from './ShortContainer'
import ShortsControls from './ShortsControls'

const ShortsCarousel = () => {
  const { loading: isFetching, shorts, navigate } = useShortsContext()

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (isFetching) return
    const handle = setTimeout(() => setLoading(false), 1000)
    return () => {
      handle && clearTimeout(handle)
    }
  }, [isFetching])

  useEffect(() => {
    const o = Observer.create({
      type: 'wheel,touch,pointer',
      onDown: () => {
        // 前一支影片
        navigate(-1)
      },
      onUp: () => {
        // 下一支影片
        navigate(1)
      },
      // invert the mouse wheel delta
      wheelSpeed: -1,
      tolerance: 50,
    })

    return () => {
      o.disable()
      o.kill()
    }
  }, [navigate])

  const memoShorts = useMemo(() => {
    return shorts.map((short, idx) => (
      <ShortContainer key={short} id={short} index={idx} />
    ))
  }, [shorts])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {memoShorts}

      {!loading && shorts.length > 0 && <ShortsControls />}
      {!loading && shorts.length === 0 && <NoVideo />}
      {loading && <Loading />}
    </div>
  )
}

export default ShortsCarousel
