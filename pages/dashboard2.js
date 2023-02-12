import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
// import { json } from 'stream/consumers'
import Upload from '../components/Upload'
import PaperSettings from '../components/PaperSettings'

export default function dashboard({ connected, setConnected }) {
  const [buttonClick, setButtonClick] = useState(false)
  const [settingsClick, setSettingsClick] = useState(false)

  var sharedMode = false;
  function flipSharedMode() {
    sharedMode = !sharedMode;
    console.log(sharedMode)
  }
  function getGrey(light) {
    return light ? 
          "bg-gray-100 hover:bg-gray-400 text-slate-600 font-medium py-2 px-4 rounded-none"
          : "bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-none"
  }

  const data_array = [
    {
      hash: "hash 1",
      title: "Title 1",
      author: "Author 1",
      shared: ["address 1.1"],
      reviewed: "Reviewer 1",
      url: "https://url1.com"
    },
    {
      hash: "hash 2",
      title: "Title 2",
      author: "Author 2",
      shared: ["address 2.1"],
      reviewed: "Reviewer 2",
      url: "https://url2.com"
    },
  ];

  const [settingsClickId, setSettingsClickId] = useState(null)

  if (connected === false) {
    return (
      <div class="bg-[url(../public/Pen1.jpeg)] h-screen opacity-75 ">
        <p class="text-[72px] text-center align-middle mt-10"> Welcome to Inked!</p>
        <p class="text-[72px] text-center align-middle"> Please connect your Phantom wallet to continue. </p>
      </div>
    )
  } else {
    return (
      <div class="px-4 pt-12 pb-32 mx-auto max-w-screen-x1 sm:px-6 lg:px-8">
        <div class="flex justify-evenly">
          <div>
            {/* <button onClick={()=> (flipSharedMode())} class="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-none">
             */}
             <button onClick={()=> (flipSharedMode())} class={{getGrey(sharedMode){}}}>
              My Papers
            </button>
          </div>
          <div>
            <button onClick={()=> (flipSharedMode())} class="bg-gray-100 hover:bg-gray-400 text-slate-600 font-medium py-2 px-4 rounded-none">
              Shared With Me
            </button>
          </div>
        </div>


        <div class="relative ">
          <button onClick={() => {
            if (buttonClick === false) {
              setButtonClick(true)
            }

          }} class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>

            <span>Upload</span>
          </button>
          {buttonClick && <Upload buttonClick={buttonClick} setButtonClick={setButtonClick} />}
        </div>

        <div>
          <div class="mt-8 grid grid-cols-3 gap-8 md:grid-cols-2 lg:grid-cols-3 drop-shadow-lg">
            {data_array.map(item => (
              <div class="bg-blue-100 rounded-t" key={item["hash"]}>
                <Image class="rounded-t-lg"
                  src="/../public/papers.jpeg"
                  alt="papers image"
                  width={500}
                  height={500}
                />
                <div class="pt-4 mx-4">
                  <div className="flex flex-row justify-between">
                    <p class="text-lg font-semibold mb-2"> {item["title"]} </p>
                    <button onClick={() => {
                      if (settingsClick === false) {
                        setSettingsClick(true)
                        setSettingsClickId(item["hash"])
                      }
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    {settingsClick && 
                    <PaperSettings key={item["hash"]} 
                    buttonClick={settingsClick} setButtonClick={setSettingsClick} item = {item} 
                    settingsClickId ={settingsClickId} setSettingsClickId = {setSettingsClickId}/>}
                  </div >

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
}