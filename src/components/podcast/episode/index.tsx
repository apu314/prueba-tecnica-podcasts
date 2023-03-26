import { FC } from 'react'

interface Props {
  episode: unknown
}

const Episode: FC<Props> = ({ episode }) => {
  return (
    <div>
      <div>left</div>
      <div>Right</div>
    </div>
  )
}

export default Episode
