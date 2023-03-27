import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { DefaultParams, RouteComponentProps } from 'wouter'

import { PodcastInfo } from '../../components/podcast'
import { PodcastDetail, PodcastDetailResponse } from '../../types/PodcastDetailResponse'

function Podcast(props: RouteComponentProps<DefaultParams>) {
  const { params } = props
  console.log(params.podcastId)

  const PODCAST_URL = `https://itunes.apple.com/lookup?id=${params.podcastId}&media=podcast&entity=podcastEpisode&limit=20`
  const PODCAST_URL_ALL_ORIGINS = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    PODCAST_URL
  )}`

  const [podcast, setPodcast] = useState<PodcastDetail[]>()
  const { data, error, isLoading } = useSWR<PodcastDetailResponse>(
    PODCAST_URL_ALL_ORIGINS
  )

  useEffect(() => {
    error && console.log(error)
    console.log('Podcast detail --> ', data)
    data && setPodcast(data.results)
  }, [data])

  useEffect(() => {
    podcast && console.log(podcast)
  }, [podcast])

  if (error || isLoading) return <>Loading...</>

  return (
    <>
      {podcast && (
        <div className='flex'>
          <div className='w-full md:w-[30%]'>
            <PodcastInfo
              author={podcast[0].artistName || podcast[0].trackName}
              title={podcast[0].trackName}
              description={podcast[0].description}
              image={podcast[0].artworkUrl100!}
            />
          </div>

          <div>
            <div className='episodesCount '>
              <span>Episodes: {podcast.length - 1}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Podcast
