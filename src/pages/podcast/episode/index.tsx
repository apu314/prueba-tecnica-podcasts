import { DefaultParams, RouteComponentProps } from 'wouter'

function Episode(props: RouteComponentProps<DefaultParams>) {
  const { params } = props

  return <h1>Episode id: {params.episodeId}</h1>
}

export default Episode
