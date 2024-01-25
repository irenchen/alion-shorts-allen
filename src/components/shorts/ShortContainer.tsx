import { useRef, useEffect } from 'react'

import gsap from 'gsap'
import Observer from 'gsap/Observer'
gsap.registerPlugin(Observer)

import { LOWER_GAP_RATIO, SHORT_HEIGHT, SHORT_WIDTH } from './shortConfig'
import { useShortsContext } from './ShortsContext'
import ShortPlayer, { ShortPlayerHandle } from './ShortPlayer'
import ShortSideBar from './ShortSideBar'

export type ShortContainerHandle = {
  play: () => void
  pause: () => void
}

type ShortContainerProps = {
  index: number
  id: string
}

const ShortContainer = ({ index, id }: ShortContainerProps) => {
  const { items, players, navigate } = useShortsContext()

  const playerRef = useRef<ShortPlayerHandle | null>(null)

  useEffect(() => {
    const div = document.querySelector(`#frame-${id}`)
    if (div) items[index] = div as HTMLDivElement
    players[index] = playerRef.current!
  }, [index, id])

  // const offset = 1100 * 1.1;
  const offset = 2 * SHORT_HEIGHT * LOWER_GAP_RATIO

  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return

    if (index === 0 || index === 1) {
      gsap.set(`#frame-${id}`, {
        yPercent: -(2 - index) * 100 * LOWER_GAP_RATIO,
        opacity: index === 0 ? 1.0 : 0.5,
        onComplete: () => {
          if (index === 0) {
            setTimeout(() => {
              const sideBar = document.querySelector(`#sidebar-${id}`)
              sideBar && sideBar.classList.remove('sidebar-hide')
              sideBar && sideBar.classList.add('sidebar-show')
            }, 500)
          }
        },
      })
      index === 0 && playerRef.current?.play()
    }

    initialized.current = true
  }, [id, index])

  useEffect(() => {
    const o = Observer.create({
      target: `#frame-${id}`,
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
  }, [id, navigate])

  return (
    <div
      id={`frame-${id}`}
      style={{
        position: 'absolute',
        width: SHORT_WIDTH,
        height: SHORT_HEIGHT,
        transform: `translate(0px, ${offset}px)`,
        willChange: `transform opacity`,
        zIndex: 1000 - index,
      }}
    >
      <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          width: SHORT_WIDTH,
          height: SHORT_HEIGHT,
          willChange: `transform opacity`,
          borderRadius: 10,
        }}
        onMouseEnter={() => playerRef.current?.toggleEnter()}
        onMouseLeave={() => playerRef.current?.toggleEnter()}
      >
        <ShortPlayer ref={playerRef} id={id} />

        <div
          id="frame"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
          }}
          onClick={() => {
            playerRef.current?.togglePlay()
          }}
        />
      </div>
      <ShortSideBar id={id} />
    </div>
  )
}

export default ShortContainer
