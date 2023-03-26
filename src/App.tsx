import './styles/globals.css'

import { Cache, SWRConfig } from 'swr'

import MainLayout from './layouts/mainLayout'
import { fetcher } from './lib/fetcher'
import Routes from './Routes'

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  // We still use the map for write & read for performance.
  return map as Cache
}

const App = () => {
  return (
    <>
      <SWRConfig
        value={{
          provider: localStorageProvider,
          fetcher: fetcher,
          refreshInterval: 1000 * 60 * 60 * 24 // refreshes each day
        }}
      >
        <MainLayout>
          <Routes />
        </MainLayout>
      </SWRConfig>
    </>
  )
}

export default App
