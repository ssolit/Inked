import { useEffect, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export function NavBar() {
  // Top Navigation Bar Element
  return (
    <header class="py-1 bg-black font-mono">
      <div class="px-6 mx-auto max-w-screen-xl sm:px-6 lg:px-8 items-center">

        <div class="flex items-center justify-between h-16">
          <div class="flex-1 md:flex md:items-center md:gap-12">

            <Link href="/">
              <button>
                <img src={'../Vector3.png'} alt="GroupPay logo" />
              </button>
            </Link>

          </div>

          <div class="flex text-sm items-center gap-6 justify-end pl-4">
            <Link href="/">
              <p class="text-white transition hover:text-white/75">
                Home
              </p>
            </Link>

            <Link href="/">
              <p class="text-white transition hover:text-white/75">
                About
              </p>
            </Link>

            <Link href="/">
              <p class="text-white transition hover:text-white/75">
                Features
              </p>
            </Link>


            
            <a class="px-5 py-2.5 text-sm font-medium text-white bg-violet-900 hover:bg-violet-800 rounded-md shadow">
             <button onClick={() => connectAccounts()}>Connect Phantom</button>
            </a>

          </div>


        </div>
      </div>
    </header>
  )
}
