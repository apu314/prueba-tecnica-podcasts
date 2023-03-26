import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Podcast from '../components/podcast'
import Search from '../components/search'
import { PODCASTS_URL } from '../lib/consts'
import type { Podcast as IPodcast } from '../types/FilteredPodcastsResponse'
import { FilteredPodcasts } from '../types/FilteredPodcastsResponse'

function Index() {
  const [podcasts, setPodcasts] = useState<IPodcast[]>([])
  const [filteredPodcasts, setFilteredPodcasts] = useState<IPodcast[]>([])
  const [filter, setFilter] = useState<string>('')
  const { data, error, isLoading } = useSWR<FilteredPodcasts>(PODCASTS_URL)

  useEffect(() => {
    data && setPodcasts(data.feed.entry)
  }, [data])

  useEffect(() => {
    error && console.log(error)
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
