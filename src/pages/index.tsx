import { useEffect, useState } from 'react'

import { isLoadingSignal } from '../App'
import { Podcast } from '../components/podcast'
import Search from '../components/Search'
import { usePodcasts } from '../hooks'
import type { Podcast as IPodcast } from '../types/FilteredPodcastsResponse'

function Index() {
  const { podcasts, isLoading, error } = usePodcasts()
  const [filteredPodcasts, setFilteredPodcasts] = useState<IPodcast[]>([]) // TODO: Es necesario tener dos estados que contienen lo mismo? usando data como fuente de datos cambiante y podcasts como los podcasts que se van a mostrar (filtrando también), suficiente.
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    if (error) console.log(error)
    if (isLoading) {
      isLoadingSignal.value = true
    } else {
      isLoadingSignal.value = false
    }
  }, [isLoading])

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
        {filteredPodcasts &&
          filteredPodcasts.map((podcast, index) => (
            <Podcast key={index} podcast={podcast} />
          ))}
      </div>
    </>
  )
}

export default Index
