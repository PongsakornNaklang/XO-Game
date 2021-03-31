import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>XO</title>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
