import { FC, useEffect, useState } from 'react'
import React from 'react'
import { Route, Switch, useLocation } from 'wouter'

import { isLoading } from './App'
import Home from './pages'
import FourOhFour from './pages/404'
import Podcast from './pages/podcast'
import Episode from './pages/podcast/episode'

interface CustomSwitchProps {
  children: React.ReactNode
}
const CustomSwitch: FC<CustomSwitchProps> = ({ children }) => {
  const [prevLoc, setPrevLoc] = useState('')
  const [location] = useLocation()

  useEffect(() => {
    setPrevLoc(location)
    isLoading.value = true
    if (location === prevLoc) setPrevLoc('')
  }, [location])

  useEffect(() => {
    setTimeout(() => (isLoading.value = false), 1000)
  }, [prevLoc])

  return <Switch>{children}</Switch>
}

const Routes: FC = () => {
  return (
    <CustomSwitch>
      <Route path='/' component={Home} />
      <Route path='/podcast/:podcastId' component={Podcast} />
      <Route path='/podcast/:podcastId/episode/:episodeId' component={Episode} />
      <Route path='/:rest*' component={FourOhFour} />
    </CustomSwitch>
  )
}

export default Routes
