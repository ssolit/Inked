import Head from 'next/head'
import Image from 'next/image'

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

      

        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 bg-blue-100">
          <img src="../assets/papers.jpeg" alt="Image" class="w-full rounded-lg"/>
          <div class="pt-4">
            <p class="text-lg font-medium">Paper 1</p>
            <p class="text-sm font-medium">Author:</p>
            <p class="text-sm font-medium">Shared With:</p>
          </div>
        </div>

      </div>
    </div>
  )
}