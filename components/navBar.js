import { useEffect, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ConnectToPhantom from "./ConnectToPhantom";

export function NavBar({connected,setConnected}) {

  // Top Navigation Bar Element
  return (

    <header className="bg-orange-700 font-mono">
      <div className="px-6 mx-auto max-w-screen-xl sm:px-6 lg:px-8 items-center">

        <div className="flex items-center justify-between h-16">
          <div className="flex-1 md:flex md:items-center md:gap-12">

          <Link href="/">
            <Image 
              src="logo.svg"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          </div>

         <div className="flex text-sm items-center gap-6 justify-start pl-4">
         {connected && <Link href="/dashboard">
              <p className="text-white transition hover:text-white/75">
                Dashboard
              </p>
            </Link>}
            <Link href="/Writer">
              <p className="text-white transition hover:text-white/75">
                Writer.js
              </p>
            </Link>

            <Link href="/Reader">
              <p className="text-white transition hover:text-white/75">
                Reader.js
              </p>
            </Link>


            

            <ConnectToPhantom connected={connected} setConnected ={setConnected} />

          




          </div>


        </div>
      </div>
    </header>
  )
}
