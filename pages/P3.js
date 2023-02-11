import Head from 'next/head'
import Image from 'next/image'

export default function P3() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {/* <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <button className="fixed top-0 left-0 right-0 left">
            Upload
        </button>
    </div>

    

    )
}