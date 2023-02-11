import '../styles/globals.css'
import { React,useState } from 'react'
import { NavBar } from "../components/navBar.js";

function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(false);
  return (
    <>
      <NavBar connected={connected} setConnected ={setConnected}/>  
        <Component {...pageProps} connected={connected} setConnected ={setConnected}/>
    </>)
}

export default MyApp

