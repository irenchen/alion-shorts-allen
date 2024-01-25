type Props = {
  playing: boolean
  onClick: () => void
}

const PlayIcon = ({ playing, onClick }: Props) => {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        position: 'absolute',
        bottom: 20,
        left: 20,
        cursor: 'pointer',
        zIndex: 1000,
        // pointerEvents: "",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        focusable="false"
        fill="#fff"
        style={{
          pointerEvents: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      >
        {playing ? (
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
        ) : (
          <path d="M8 5v14l11-7z"></path>
        )}
      </svg>
    </div>
  )
}

export default PlayIcon
