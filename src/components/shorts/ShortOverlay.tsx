type Props = {
  onClick: () => void
}

const ShortOverlay = ({ onClick }: Props) => {
  return (
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
      onClick={onClick}
    />
  )
}

export default ShortOverlay
