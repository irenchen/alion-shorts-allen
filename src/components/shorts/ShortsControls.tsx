import React, { PropsWithChildren, useRef } from 'react'

import { useIndexStore, useShortsContext } from './ShortsContext'

import ArrowUp from './icons/ArrowUp'
import ArrowDown from './icons/ArrowDown'

const THROTTLE_LIMIT = 600 // 0.6 sec

const ShortsControls = () => {
  const { value, update: updateIndex } = useIndexStore()

  const { shorts, navigate } = useShortsContext()

  // for throttle control
  const lastRan = useRef(Date.now())

  const onArrowUp = () => {
    if (Date.now() - lastRan.current < THROTTLE_LIMIT) return
    lastRan.current = Date.now()
    if (value === 0) return
    updateIndex(value - 1)
    navigate(-1)
  }

  const onArrowDown = () => {
    if (Date.now() - lastRan.current < THROTTLE_LIMIT) return
    lastRan.current = Date.now()
    if (value === shorts.length) return
    updateIndex(value + 1)
    navigate(1)
  }

  if (window.innerWidth < 600) return null

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        width: 70,
        height: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {value !== 0 ? (
        <IconBox onClick={onArrowUp}>
          <ArrowUp />
        </IconBox>
      ) : (
        <PlaceHolder />
      )}
      {value !== shorts.length - 1 && (
        <IconBox onClick={onArrowDown}>
          <ArrowDown />
        </IconBox>
      )}
    </div>
  )
}

export default ShortsControls

type IconBoxProps = {
  onClick?: () => void
  style?: React.CSSProperties
}

const IconBox = ({
  children,
  onClick = () => {},
  style = {},
}: PropsWithChildren<IconBoxProps>) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0001',
        borderRadius: 24,
        cursor: 'pointer',
        ...style,
      }}
      className="icon-box"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

const PlaceHolder = () => {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        backgroundColor: 'transparent',
      }}
    />
  )
}
