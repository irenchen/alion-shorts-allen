type Props = {
  progress: number
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '-100%',
        height: 3,
        width: '100%',
        backgroundColor: 'red',
        transition: `transform .1 ease-in-out`,
        transform: `translate(${progress * 100}%, 0%)`,
      }}
    />
  )
}

export default ProgressBar
