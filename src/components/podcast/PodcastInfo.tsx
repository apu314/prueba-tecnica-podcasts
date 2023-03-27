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
        <img src={image} alt={title} />
      </picture>

      <hr className='h-1 border-b-black' />

      <div>
        <div className='title'>{title}</div>
        <div className='author'>by {author}</div>
      </div>

      {description && (
        <>
          <hr />

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
