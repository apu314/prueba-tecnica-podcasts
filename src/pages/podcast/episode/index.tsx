import { useEffect, useRef, useState } from 'react'
import { DefaultParams, RouteComponentProps } from 'wouter'

import PodcastInfo from '../../../components/podcast/PodcastInfo'
import usePodcastDetail from '../../../hooks/usePodcastDetail'
import { PodcastInfo as IPodcastInfo } from '../../../types/Podcast'
import { PodcastDetail } from '../../../types/PodcastDetailResponse'

function Episode(props: RouteComponentProps<DefaultParams>) {
  const { params } = props

  const { podcastEpisodes } = usePodcastDetail(params.podcastId!)

  const [podcastInfo, setPodcastInfo] = useState<IPodcastInfo>()
  const [episode, setEpisode] = useState<PodcastDetail>()

  const audioElementRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (podcastEpisodes) {
      setPodcastInfo({
        author:
          podcastEpisodes.episodes[0].artistName || podcastEpisodes.episodes[0].trackName,
        description: podcastEpisodes.episodes[0].description!,
        title: podcastEpisodes.episodes[0].trackName,
        image: podcastEpisodes.episodes[0].artworkUrl100!
      })

      const episodeFiltered = podcastEpisodes.episodes.find(
        (episode) => params.episodeId! === `${episode.trackId}`
      )
      setEpisode(episodeFiltered)
    }
  }, [podcastEpisodes])

  return (
    <>
      {podcastInfo && (
        <div className='flex gap-x-8'>
          <div className='w-full md:w-[30%]'>
            <PodcastInfo
              author={podcastInfo.author}
              title={podcastInfo.title}
              description={podcastInfo.description}
              image={podcastInfo.image}
            />
          </div>

          {episode && (
            <div className='w-full flex flex-col gap-y-4'>
              <div className='card p-4 w-full'>
                <h1 className='text-2xl font-semibold'>{episode.trackName}</h1>

                <p dangerouslySetInnerHTML={{ __html: episode.description! }} />

                {episode.episodeUrl && (
                  <div className='flex flex-col items-center m-5'>
                    <audio className='w-full' ref={audioElementRef} controls>
                      <source src={episode.episodeUrl} type='audio/mp3' />
                      <track kind='captions' />
                    </audio>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Episode
