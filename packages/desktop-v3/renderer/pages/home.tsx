import React from 'react'
import Head from 'next/head'
// import Link from 'next/link'
// import Image from 'next/image'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Greenlight</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        Greenlight
      </div>
    </React.Fragment>
  )
}
