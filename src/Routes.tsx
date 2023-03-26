import type { FC } from 'react'
import { Route, Switch } from 'wouter'

import Home from './pages'
import FourOhFour from './pages/404'
import Podcast from './pages/podcast'
import Episode from './pages/podcast/episode'

const Routes: FC = () => {
  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/podcast/:podcastId' component={Podcast} />
      <Route path='/podcast/:podcastId/episode/:episodeId' component={Episode} />
      <Route path='/:rest*' component={FourOhFour} />
    </Switch>
  )
}

export default Routes
