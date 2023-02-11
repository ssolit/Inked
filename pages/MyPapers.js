import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function MyPapers() {
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


      <div class="relative">
        <button class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-none">
          Upload
        </button>
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