import { FC } from 'react'
import { Link } from 'wouter'

import type { Podcast as IPodcast } from '../../types/FilteredPodcastsResponse'

interface Props {
  podcast: IPodcast
}

const Podcast: FC<Props> = ({ podcast }) => {
  return (
    <Link href={`/podcast/${podcast.id.attributes['im:id']}`}>
      <a className='relative rounded border-gray border p-4 pt-12 shadow-md no-underline flex justify-center'>
        <picture className='absolute top-[-2.5rem]'>
          <img
            className='rounded-full h-[80px] w-[80px]'
            src={podcast['im:image'][0].label}
            alt={`${podcast.title.label} preview`}
          />
        </picture>
        <div className='grid self-end'>
          <span className='title  text-center truncate uppercase'>
            {podcast.title.label}
          </span>
          <span className='author font-light text-xs text-center text-gray-500 uppercase'>
            Author: {podcast['im:artist'].label}
          </span>
        </div>
      </a>
    </Link>
  )
}
export default Podcast
