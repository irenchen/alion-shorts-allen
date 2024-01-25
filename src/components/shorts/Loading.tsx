import LoaderIcon from './icons/LoaderIcon'

const Loading = () => {
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
      <LoaderIcon width={64} height={64} stroke="#555" />
    </div>
  )
}

export default Loading
