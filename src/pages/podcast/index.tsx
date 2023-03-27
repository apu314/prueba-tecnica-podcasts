import dateFormatter from 'date-and-time'
import { useEffect } from 'react'
import { DefaultParams, Link, RouteComponentProps } from 'wouter'

import { isLoadingSignal } from '../../App'
import { PodcastInfo } from '../../components/podcast'
import usePodcastDetail from '../../hooks/usePodcastDetail'

function Podcast(props: RouteComponentProps<DefaultParams>) {
  const { params } = props

  const { podcastEpisodes, isLoading, error } = usePodcastDetail(params.podcastId!)

  useEffect(() => {
    if (isLoading) {
      isLoadingSignal.value = true
    } else {
      isLoadingSignal.value = false
    }
  }, [isLoading])

  useEffect(() => {
    error && console.log(error)
  }, [podcastEpisodes])

  const getDate = (date: Date) => dateFormatter.format(new Date(date), 'DD/MM/YYYY')
  const getDuration = (miliseconds: number) => {
    let seconds = Math.floor(miliseconds / 1000)
    let minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    seconds = seconds % 60
    minutes = minutes % 60

    const convertToTwoDigits = (num: number) => num.toString().padStart(2, '0')

    return hours > 0
      ? `${convertToTwoDigits(hours)}:${convertToTwoDigits(minutes)}:${convertToTwoDigits(
          seconds
        )}`
      : `${convertToTwoDigits(minutes)}:${convertToTwoDigits(seconds)}`
  }

  return (
    <>
      {podcastEpisodes && (
        <div className='flex gap-x-8'>
          <div className='w-full md:w-[30%]'>
            <PodcastInfo
              author={
                podcastEpisodes.episodes[0].artistName ||
                podcastEpisodes.episodes[0].trackName
              }
              title={podcastEpisodes.episodes[0].trackName}
              description={podcastEpisodes.episodes[0].description}
              image={podcastEpisodes.episodes[0].artworkUrl100!}
            />
          </div>

          <div className='w-full flex flex-col gap-y-4'>
            <div className='card p-4 w-full'>
              <span className='text-xl font-semibold'>
                Episodes: {podcastEpisodes.episodes.length - 1}
              </span>
            </div>

            <div className='card p-4 w-full'>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-gray-700 uppercase border-b-2'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Title
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Date
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {podcastEpisodes.episodes.map((episode, index) => {
                    if (index === 0) return
                    const isLast = index === podcastEpisodes.episodes.length - 1

                    return (
                      <tr
                        key={episode.trackId}
                        className={`even:bg-gray-100 ${
                          !isLast ? 'border-b' : ''
                        } text-center`}
                      >
                        <td className='px-6 py-4 text-blue hover:underline text-left'>
                          <Link
                            href={`/podcast/${params.podcastId}/episode/${episode.trackId}`}
                          >
                            <a>{episode.trackName}</a>
                          </Link>
                        </td>
                        <td>{getDate(episode.releaseDate)}</td>
                        <td>{getDuration(episode.trackTimeMillis)}</td>
                      </tr>
                    )
                  })}
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Podcast
