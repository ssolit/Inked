import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
// import { json } from 'stream/consumers'
import Upload from '../components/Upload'

export default function dashboard2() {
  const [buttonClick, setButtonClick] = useState(false)

  const data_array = [
    {title : "Title 1", 
      author : "Author 1", 
      shared : ["address 1.1"],
      reviewed : "Reviewer 1",
      url : "https://url1.com"
    },
    {title : "Title 2", 
      author : "Author 2", 
      shared : ["address 2.1"],
      reviewed : "Reviewer 2",
      url : "https://url2.com"
    },
  ];

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
        <div class="mt-8 grid grid-cols-3 gap-8 md:grid-cols-2 lg:grid-cols-3 drop-shadow-lg">
          {data_array.map(item => (
              <div class = "bg-blue-100 rounded-t">
                <Image class="rounded-t-lg"
                  src="/../public/papers.jpeg"
                  alt="papers image"
                  width={500}
                  height={500}
                />
                <div class="pt-4 mx-4">
                  <p class="text-lg font-semibold mb-2"> {item["title"]} </p>
                  <p class="text-sm font-medium">Author: {item["author"]}</p>
                  <p class="text-sm font-medium">Shared With: {item["shared"]}</p>
                  <div class="text-center text-xs p-1 bg-gray-100 rounded-full w-3/4 mt-2 mb-2">
                    Peer Reviewed By: {item["reviewed"]}
                  </div>
                </div>
                <Link href={item["url"]}>
                  <p className="text-bg-gray-300 hover:text-cyan-600 text-xs text-right underline transition hover:decoration-blue-400 m-1">
                    Open In Explorer
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}