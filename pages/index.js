import { useState } from "react";
import { ContractABI } from '../components/contractABI.js';
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <section>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div
        class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
      >
        <Image 
              src="cuate.svg"
              alt="image"
              width={500}
              height={500}
            />
      </div>

      <div class="lg:py-24">
        <h2 class="text-3xl font-bold sm:text-4xl">Proof of Discovery</h2>
        <h2 class="text-3xl font-bold sm:text-4xl">for Research Papers</h2>

        <h2 class="mt-4 text-gray-600 text-xl font-small sm:text-2xl">
          Upload your paper privately and share with
        </h2>
        <h2 class="text-gray-600 text-xl font-small sm:text-2xl">
          colleagues now, reveal to public later.
        </h2>

        <a
          href="/"
          class="mt-8 inline-flex items-center rounded border bg-orange-700 px-8 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          <span class="text-sm font-medium"> Get Started </span>

          <svg
            class="ml-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

  )
}