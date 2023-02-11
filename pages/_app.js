import '../styles/globals.css'
import { React,useState } from 'react'
import { NavBar } from "../components/navBar.js";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(false);
  return (
    <>
    <Head>
        <link rel="favicon" href="/favicon.ico" />
      </Head>
      <NavBar connected={connected} setConnected ={setConnected}/>  
        <Component {...pageProps} connected={connected} setConnected ={setConnected}/>
    </>)
}

export default MyApp

