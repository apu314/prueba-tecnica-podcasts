import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { isLoadingSignal as isLoadingSignal } from '../App'
import { LOCALSTORAGE_PODCASTS_EPISODES } from '../consts'
import { isAbleToFetchByDate } from '../helpers/isAbleToFetchByDate'
import { PodcastEpisodes } from '../types/Podcast'
import { PodcastDetailResponse } from '../types/PodcastDetailResponse'

const isAbleToFetch = isAbleToFetchByDate()

const usePodcastDetail = (podcastId: string) => {
  const PODCAST_URL = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
  const PODCAST_URL_ALL_ORIGINS = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    PODCAST_URL
  )}`
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisodes>()
  const [shouldFetch, setShouldFetch] = useState<boolean>(false)
  const { data, error, isLoading } = useSWR<PodcastDetailResponse>(() =>
    shouldFetch ? PODCAST_URL_ALL_ORIGINS : null
  )

  useEffect(() => {
    isLoadingSignal.value = true
  }, [])

  useEffect(() => {
    if (!shouldFetch) {
      // Si este podcast en concreto no existe, entonces setShouldFetch(true)
      const podcastsEpisodesStored =
        (JSON.parse(
          localStorage.getItem(LOCALSTORAGE_PODCASTS_EPISODES)!
        ) as PodcastEpisodes[]) || []
      // si no lo encuentra ejecuta la peticion
      if (
        podcastsEpisodesStored.length &&
        !podcastsEpisodesStored.find((podcast) => `${podcast.collectionId}` === podcastId)
      ) {
        setShouldFetch(true)
      }
    }
  }, [shouldFetch])

  useEffect(() => {
    // Ver si el podcast está en la lista, sino está, sí es able to fetch
    const podcastsEpisodesStored = (JSON.parse(
      localStorage.getItem(LOCALSTORAGE_PODCASTS_EPISODES) || '[]'
    ) || []) as PodcastEpisodes[]
    const podcastEpisodesFound = podcastsEpisodesStored.find(
      (podcastEpisodes) => `${podcastEpisodes.collectionId}` === podcastId
    )
    !podcastEpisodesFound ? setShouldFetch(true) : setShouldFetch(isAbleToFetch)
  }, [])

  useEffect(() => {
    const podcastStored = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_PODCASTS_EPISODES)!
    ) as PodcastEpisodes[]
    // If exists in localStorage, this will be the state to return
    if (podcastStored) {
      const podcastStoredToSave = podcastStored.find(
        (podcast) => `${podcast.collectionId}` === podcastId
      )
      if (podcastStoredToSave) {
        setPodcastEpisodes(podcastStoredToSave)
      }
    }
  }, [])

  useEffect(() => {
    error && console.log(error)
    if (data) {
      const podcastToStore = {
        collectionId: data.results[0].collectionId,
        episodes: data.results
      }

      let podcastsEpisodesStored =
        (JSON.parse(
          localStorage.getItem(LOCALSTORAGE_PODCASTS_EPISODES) || '[]'
        ) as PodcastEpisodes[]) || []

      if (!podcastsEpisodesStored.length) {
        podcastsEpisodesStored.push(podcastToStore)
      }

      const podcastsEpisodesStoredSet = new Set(podcastsEpisodesStored)
      podcastsEpisodesStoredSet.add(podcastToStore)

      podcastsEpisodesStored = [...podcastsEpisodesStoredSet]

      localStorage.setItem(
        LOCALSTORAGE_PODCASTS_EPISODES,
        JSON.stringify(podcastsEpisodesStored)
      )
      setPodcastEpisodes(
        podcastsEpisodesStored.find((podcast) => `${podcast.collectionId}` === podcastId)
      )
    }
  }, [data])

  useEffect(() => {
    if (podcastEpisodes) isLoadingSignal.value = false
  }, [podcastEpisodes])

  return { podcastEpisodes, isLoading, error }
}

export default usePodcastDetail
