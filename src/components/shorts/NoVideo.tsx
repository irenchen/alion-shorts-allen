const NoVideo = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // backgroundColor: '#0006',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Oops! 目前沒有任何影片...
    </div>
  )
}

export default NoVideo
