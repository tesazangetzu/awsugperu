import * as React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Banner } from './Banner'

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Banner />
      <main>{children}</main>
      <Footer />
    </>
  )
}
