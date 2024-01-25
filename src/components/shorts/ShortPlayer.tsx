import React, {
  useState,
  useMemo,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react'
import YouTubePlayer from 'react-player/youtube'

import { SHORT_WIDTH, SHORT_HEIGHT } from './shortConfig'
import MuteIcon from './icons/MuteIcon'
import PlayIcon from './icons/PlayIcon'
import ProgressBar from './ProgressBar'

export type ShortPlayerHandle = {
  play: () => void
  pause: () => void
  togglePlay: () => void
  toggleMute: () => void
  toggleEnter: () => void
  getMuted: () => boolean
}

type ShortPlayerProps = {
  id: string
}

const ShortPlayer = React.forwardRef<ShortPlayerHandle, ShortPlayerProps>(
  ({ id }, ref) => {
    const [played, setPlayed] = useState(0)

    const [muted, setMuted] = useState(true)

    const [playing, setPlaying] = useState(false)

    const url = useMemo(() => {
      return `https://www.youtube-nocookie.com/shorts/${id}`
    }, [id])

    const [mouseEnter, setMouseEnter] = useState(false)

    const mutedRef = useRef(true)
    useEffect(() => {
      mutedRef.current = muted
    }, [muted])

    const playingRef = useRef(false)

    useImperativeHandle(ref, () => ({
      play: () => {
        playingRef.current = true
        setPlaying(true)
      },
      pause: () => {
        playingRef.current = false
        setPlaying(false)
      },
      togglePlay: () => {
        playingRef.current = playingRef.current ? false : true
        setPlaying(playing => !playing)
      },
      toggleMute: () => setMuted(muted => !muted),
      toggleEnter: () => setMouseEnter(enter => !enter),
      getMuted: () => mutedRef.current,
    }))

    const youtubePlayer = useMemo(() => {
      return (
        <YouTubePlayer
          url={url}
          controls={false}
          width={SHORT_WIDTH}
          height={SHORT_HEIGHT}
          playing={playing}
          muted={muted}
          loop={true}
          onProgress={({ played }) => {
            setPlayed(played)
          }}
          onPlay={() => {
            // a hack for 特殊狀況下，影片有可能無法順利暫停，只好切到靜音。
            if (!playingRef.current) {
              setMuted(true)
            }
          }}
          config={{
            playerVars: {
              showinfo: 0,
              rel: 0,
              enablejsapi: 0,
              origin: 'csb.app',
              iv_load_policy: 3,
              fs: 0,
            },
          }}
        />
      )
    }, [url, playing, muted, setPlayed, setMuted])

    return (
      <>
        {youtubePlayer}

        {mouseEnter && (
          <MuteIcon muted={muted} onClick={() => setMuted(muted => !muted)} />
        )}

        {mouseEnter && (
          <PlayIcon
            playing={playing}
            onClick={() => setPlaying(playing => !playing)}
          />
        )}

        {/* bottom progress bar  */}
        <ProgressBar progress={played} />
      </>
    )
  },
)

export default ShortPlayer
