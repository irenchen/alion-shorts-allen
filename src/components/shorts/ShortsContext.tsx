import React, {
  PropsWithChildren,
  useRef,
  useContext,
  useCallback,
} from 'react'
import gsap from 'gsap'
import { create } from 'zustand'

import { CHANNEL_ID, LOWER_GAP_RATIO, UPPER_GAP_RATIO } from './shortConfig'

import { ShortPlayerHandle } from './ShortPlayer'

import useFetchShorts from '../../hooks/shorts/use-fetch-shorts'

type IndexStoreType = {
  value: number
  update: (v: number) => void
}

export const useIndexStore = create<IndexStoreType>(set => ({
  value: 0,
  update: (v: number) => set({ value: v }),
}))

type ShortsContextValue = {
  loading: boolean
  shorts: string[]
  items: HTMLDivElement[]
  players: ShortPlayerHandle[]
  navigate: (direction: 1 | -1) => void
}

const ShortsContext = React.createContext({} as ShortsContextValue)

export const ShortsContextProvider = ({ children }: PropsWithChildren) => {
  const { update: updateIndex } = useIndexStore()

  const { loading, shorts, fetchMoreShorts } = useFetchShorts({
    channelId: CHANNEL_ID,
  })

  const items = useRef<HTMLDivElement[]>([])
  const players = useRef<ShortPlayerHandle[]>([])

  const currentIndex = useRef(0)

  const isAnimating = useRef(false)

  const navigate = useCallback(
    (direction: 1 | -1) => {
      // Check if animation is still running
      if (isAnimating.current) return false

      const size = shorts.length

      // 找出每個位置上需要更新的元件序號
      let upper1: number | null = null
      let upper2: number | null = null
      let current: number | null = null
      let lower1: number | null = null
      let lower2: number | null = null

      if (direction === 1 && currentIndex.current < size - 1) {
        upper2 = currentIndex.current - 1 < 0 ? null : currentIndex.current - 1
        upper1 = currentIndex.current
        current =
          currentIndex.current + 1 > size - 1 ? null : currentIndex.current + 1
        lower1 =
          currentIndex.current + 2 > size - 1 ? null : currentIndex.current + 2
        lower2 =
          currentIndex.current + 3 > size - 1 ? null : currentIndex.current + 3
      }

      if (direction === -1 && currentIndex.current > 0) {
        lower2 =
          currentIndex.current + 1 > size - 1 ? null : currentIndex.current + 1
        lower1 = currentIndex.current
        current = currentIndex.current - 1 < 0 ? null : currentIndex.current - 1
        upper1 = currentIndex.current - 2 < 0 ? null : currentIndex.current - 2
        upper2 = currentIndex.current - 3 < 0 ? null : currentIndex.current - 3
      }

      // 更新currentIndex
      const prevIndex = currentIndex.current
      currentIndex.current =
        currentIndex.current + direction > size - 1
          ? size - 1
          : currentIndex.current + direction < 0
            ? 0
            : currentIndex.current + direction

      // 進入倒數第二個影片的時候，讀取下一筆資料。
      if (currentIndex.current === size - 2) {
        fetchMoreShorts()
      }

      isAnimating.current = true

      const tl = gsap
        .timeline({
          defaults: {
            duration: 0.5,
            ease: 'power3.in',
          },
          onStart: () => {
            const prevPlayer = players.current[prevIndex]
            const currPlayer = players.current[currentIndex.current]

            // 如果前一首是靜音，respect user's setting
            if (prevPlayer?.getMuted() && !currPlayer?.getMuted()) {
              currPlayer?.toggleMute()
            }
            // 如果前一首不是靜音，respect user's setting
            if (!prevPlayer?.getMuted() && currPlayer?.getMuted()) {
              currPlayer?.toggleMute()
            }

            // 暫停原先的撥放，開始撥放下一部Short
            players.current.forEach(p => p.pause())
            prevPlayer?.pause()
            currPlayer?.play()
          },
          onComplete: () => {
            // Reset animation flag
            isAnimating.current = false

            updateIndex(currentIndex.current)

            // toggle sidebars show and hide status
            const prevSideBar = document.querySelector(
              `#sidebar-${shorts[prevIndex]}`,
            )
            prevSideBar && prevSideBar.classList.remove('sidebar-show')
            prevSideBar && prevSideBar.classList.add('sidebar-hide')

            const sideBar = document.querySelector(
              `#sidebar-${shorts[currentIndex.current]}`,
            )
            sideBar && sideBar.classList.remove('sidebar-hide')
            sideBar && sideBar.classList.add('sidebar-show')
          },
        })
        .addLabel('start', 0)

      if (upper2 !== null) {
        tl.to(
          items.current[upper2],
          {
            yPercent: -400 * UPPER_GAP_RATIO,
            opacity: 0.5,
          },
          'start',
        )
      }
      if (upper1 !== null) {
        tl.to(
          items.current[upper1],
          {
            yPercent: -300 * UPPER_GAP_RATIO,
            opacity: 0.5,
          },
          'start',
        )
      }

      if (current !== null) {
        tl.to(
          items.current[current],
          {
            yPercent: -200 * LOWER_GAP_RATIO,
            opacity: 1.0,
          },
          'start',
        )
      }
      if (lower1 !== null) {
        tl.to(
          items.current[lower1],
          {
            yPercent: -100 * LOWER_GAP_RATIO,
            opacity: 0.5,
          },
          'start',
        )
      }
      if (lower2 !== null) {
        tl.to(
          items.current[lower2],
          {
            yPercent: 0 * LOWER_GAP_RATIO,
            opacity: 0.5,
          },
          'start',
        )
      }
    },
    [shorts, fetchMoreShorts],
  )

  return (
    <ShortsContext.Provider
      value={{
        loading,
        shorts,
        items: items.current,
        players: players.current,
        navigate,
      }}
    >
      {children}
    </ShortsContext.Provider>
  )
}

export const useShortsContext = () => useContext(ShortsContext)
