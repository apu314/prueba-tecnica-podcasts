import { FC } from 'react'

interface Props {
  author: string
  description?: string
  image: string
  title?: string
}

const PodcastInfo: FC<Props> = ({ author, description, image, title }) => {
  return (
    <div className='border shadow-md p-4 flex flex-col items-center'>
      <picture>
        <img className='rounded' src={image} alt={title} />
      </picture>

      <div className='border-b h-4 w-full' />

      <div className='text-sm w-full px-4 py-2'>
        <div className='title font-bold'>{title}</div>
        <div className='author italic'>by {author}</div>
      </div>

      {description && (
        <>
          <div className='border-b h-4 w-full' />

          <div className='description'>
            <span>Description:</span>
            <p>{description}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default PodcastInfo
