import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { Podcast } from '../components/podcast'
import Search from '../components/Search'
import type { Podcast as IPodcast } from '../types/FilteredPodcastsResponse'
import type { FilteredPodcastsResponse } from '../types/FilteredPodcastsResponse'

export const PODCASTS_URL = `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`

function Index() {
  const [podcasts, setPodcasts] = useState<IPodcast[]>([])
  const [filteredPodcasts, setFilteredPodcasts] = useState<IPodcast[]>([]) // TODO: Es necesario tener dos estados que contienen lo mismo? usando data como fuente de datos cambiante y podcasts como los podcasts que se van a mostrar (filtrando también), suficiente.
  const [filter, setFilter] = useState<string>('')
  const { data, error, isLoading } = useSWR<FilteredPodcastsResponse>(PODCASTS_URL)

  useEffect(() => {
    error && console.log(error)
    data && setPodcasts(data.feed.entry)
  }, [data])

  useEffect(() => {
    setFilteredPodcasts(podcasts)
  }, [podcasts])

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  useEffect(() => {
    if (podcasts && filter.length > 0) {
      const filtered = podcasts.filter(
        (podcast) =>
          podcast.title.label.toLowerCase().includes(filter.toLowerCase()) ||
          podcast['im:artist'].label.toLowerCase().includes(filter.toLowerCase())
      )
      setFilteredPodcasts(filtered)
    }
  }, [filter])

  return (
    <>
      <Search onSearch={handleFilterChange} resultsCount={filteredPodcasts.length} />

      <div className='grid gap-4 gap-y-14 grid-cols-3 grid-rows-3 pt-8'>
        {(isLoading || error) && <h3>Loading...</h3>}
        {filteredPodcasts &&
          filteredPodcasts.map((podcast, index) => (
            <Podcast key={index} podcast={podcast} />
          ))}
      </div>
    </>
  )
}

export default Index
