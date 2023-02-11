import Head from 'next/head'
import Image from 'next/image'

export default function P4() {
  return (
    <div>
      <div class="relative">
        <button class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-none absolute top-10 left-10">
          Upload
        </button>
      </div>
    </div>
  )
}