import { useState, useEffect, useRef } from 'react'

import { TEST_MODE } from '../../components/shorts/shortConfig'

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

type Props = {
  channelId: string
}

const PLAYLIST_API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=id,contentDetails&key=${YOUTUBE_API_KEY}`

type ShortItem = {
  id: string
  contentDetails: {
    videoId: string
    videoPublishedAt: string
  }
}

type ListResponse = {
  items: ShortItem[]
  nextPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

const initialShorts = [
  'N9fKBve_qpQ',
  '_XoCezcrKgU',
  'ttMrQkBa38E',
  '5IIBNAa1tCQ',
  'lSwjzAhqL54',
]

const newShorts = [
  'HICr4dgMGG8',
  'e5YROKsmqWE',
  'Ky9q-_cYkYY',
  'SA3-6GQZtEU',
  'pJq6HaMSphU',
]

// ref: https://stackoverflow.com/questions/71192605/how-do-i-get-youtube-shorts-from-youtube-api-data-v3/71194751#71194751
// ref: https://developers.google.com/youtube/v3/docs/playlistItems/list?hl=zh-tw
const useFetchShorts = ({ channelId }: Props) => {
  const [loading, setLoading] = useState(true)

  const [shorts, setShorts] = useState<string[]>([])

  const nextPageToken = useRef('')

  useEffect(() => {
    if (TEST_MODE) {
      setShorts(initialShorts)
      setTimeout(() => setLoading(false), 2000)
      return
    }

    const fetchShorts = async (id: string) => {
      const playlistId = id.replace(/^UC/, 'UUSH')

      const url = `${PLAYLIST_API_URL}&playlistId=${playlistId}`
      try {
        const resp = await fetch(url)
        if (resp.ok) {
          const json = (await resp.json()) as ListResponse

          nextPageToken.current = json.nextPageToken ?? ''
          const items = json.items
          const ids = items.map(item => item.contentDetails.videoId)

          setShorts(ids)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchShorts(channelId)
  }, [channelId, setLoading, setShorts])

  const fetchMoreShorts = async () => {
    if (TEST_MODE) {
      if (shorts.includes(newShorts[0])) return
      const newItems = [...shorts, ...newShorts]
      setShorts(newItems)
      return
    }

    try {
      if (nextPageToken.current === '') {
        // no more items
        return
      }

      const playlistId = channelId.replace(/^UC/, 'UUSH')
      const url = `${PLAYLIST_API_URL}&playlistId=${playlistId}&pageToken=${nextPageToken.current}`

      const resp = await fetch(url)
      if (resp.ok) {
        const json = (await resp.json()) as ListResponse

        nextPageToken.current = json.nextPageToken ?? ''
        const items = json.items
        const newShorts = items.map(item => item.contentDetails.videoId)

        setShorts(shorts => [...shorts, ...newShorts])
      }
    } catch (err) {
      console.error(err)
    }
  }

  return { loading, shorts, fetchMoreShorts }
}

export default useFetchShorts
