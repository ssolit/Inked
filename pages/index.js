import { useState } from "react";
import { ContractABI } from '../components/contractABI.js';
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div
        className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
      >
        <Image 
              src="cuate.svg"
              alt="image"
              width={500}
              height={500}
            />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Proof of Discovery</h2>
        <h2 className="text-3xl font-bold sm:text-4xl">for Research Papers</h2>

        <h2 className="mt-4 text-gray-600 text-xl font-small sm:text-2xl">
          Upload your paper privately and share with
        </h2>
        <h2 className="text-gray-600 text-xl font-small sm:text-2xl">
          colleagues now, reveal to public later.
        </h2>

        <a
          href="/dashboard"
          className="mt-8 inline-flex items-center rounded border bg-orange-700 px-8 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          <span className="text-sm font-medium"> Get Started </span>

          <svg
            className="ml-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
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