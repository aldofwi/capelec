import '@/styles/globals.css'
import { Layout } from '../../components'
import React from 'react'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
