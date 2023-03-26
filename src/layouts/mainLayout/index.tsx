import React, { FC } from 'react'

import Header from './Header'

interface Props {
  children: React.ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default MainLayout
