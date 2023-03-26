import { DefaultParams, RouteComponentProps } from 'wouter'

function Podcast(props: RouteComponentProps<DefaultParams>) {
  const { params } = props
  console.log({ params })

  return <h1>Podcast id: {params.podcastId}</h1>
}

export default Podcast
