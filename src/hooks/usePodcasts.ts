import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { LOCALSTORAGE_PODCASTS, PODCASTS_URL } from '../consts'
import { isAbleToFetchByDate } from '../helpers/isAbleToFetchByDate'
import { FilteredPodcastsResponse, Podcast } from '../types/FilteredPodcastsResponse'

const isAbleToFetch = isAbleToFetchByDate()

const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [shouldFetch, setShouldFetch] = useState<boolean>(false)
  const { data, error, isLoading } = useSWR<FilteredPodcastsResponse>(() =>
    shouldFetch ? PODCASTS_URL : null
  )

  useEffect(() => {
    setShouldFetch(isAbleToFetch)
  }, [])

  useEffect(() => {
    const podcastsStored = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_PODCASTS)!
    ) as FilteredPodcastsResponse
    if (podcastsStored) {
      setPodcasts(podcastsStored.feed.entry)
    }
  }, [])

  useEffect(() => {
    error && console.log(error)
    if (data) {
      localStorage.setItem(LOCALSTORAGE_PODCASTS, JSON.stringify(data))
      setPodcasts(data.feed.entry)
    }
  }, [data])

  return { podcasts, isLoading, error }
}

export default usePodcasts
