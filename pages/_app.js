import '../styles/globals.css'
import { React } from 'react'
import { NavBar } from "../components/navBar.js";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />  
        <Component {...pageProps} />
    </>)
}

export default MyApp

