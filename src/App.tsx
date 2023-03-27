import './styles/globals.css'

import { signal } from '@preact/signals-react'
import { SWRConfig } from 'swr'

import { DAY_IN_MILISECONDS } from './consts'
import MainLayout from './layouts/mainLayout'
import { fetcher } from './lib/fetcher'
import Routes from './Routes'

export const isLoading = signal(false)

const App = () => {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcher,
          refreshInterval: DAY_IN_MILISECONDS
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
