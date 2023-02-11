import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Upload from '../components/Upload'

export default function dashboard() {
  const [buttonClick, setButtonClick] = useState(false)

  return (
    <div class="px-4 pt-12 pb-32 mx-auto max-w-screen-x1 sm:px-6 lg:px-8">
      <div class = "flex justify-evenly">
        <div>
          <button class="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-none">
            My Papers
          </button>
        </div>
        <div>
          <button class="bg-gray-100 hover:bg-gray-400 text-slate-600 font-medium py-2 px-4 rounded-none">
            Shared With Me
          </button>
        </div>
      </div>


      <div class="relative ">
        <button onClick={() => {
                if (buttonClick === false) {
                    setButtonClick(true)
                }

            }}class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>

          <span>Upload</span>
        </button>
        {buttonClick && <Upload buttonClick = {buttonClick} setButtonClick={setButtonClick} />}
      </div>

      <div>

        <div class="mt-8 grid grid-cols-3 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div class = "bg-blue-100">
            <Image 
              src="/../public/papers.jpeg"
              alt="papers image"
              width={100}
              height={100}
            />
            <div class="pt-4">
              <p class="text-lg font-medium">Paper 1</p>
              <p class="text-sm font-medium">Author:</p>
              <p class="text-sm font-medium">Shared With:</p>
            </div>
            <div class="text-center text-xs p-5 bg-gray-100 rounded-full w-3/4">
              Peer Reviewed By: Research Gate
            </div>

            <Link href="https://etherscan.io">
              <p className="text-bg-gray-300 hover:text-cyan-600 underline transition hover:decoration-blue-400">
                Open In Explorer
              </p>
            </Link>

          </div>

          
        </div>

        
        

      </div>
    </div>
  )
}