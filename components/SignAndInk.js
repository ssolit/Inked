import React, { Component, useEffect,useState } from 'react';
import { v4 } from "uuid"
import WeaveHelper from "../weaveapi/helper";
import SHA256 from "crypto-js/sha256";
import { LockClosedIcon } from '@heroicons/react/20/solid'

import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

import { base58_to_binary, binary_to_base58 } from "base58-js";
const Buffer = require("buffer").Buffer;


const connection = new Connection(clusterApiUrl(network));

const SignAndInk = ({authors, title, category, abstract, keywords, nftAddress, rawfile, thumbnail, onSign}) => {
    const [producerIndex, setProducerIndex] = useState(0);

  
    const handleButtonClick = async (e) => {
        e.preventDefault();
        console.log("Sign and Ink")
        onSign();
    }
    return (
        <>
            <button
                type="submit"
                className="group relative flex w-1/2 justify-around rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleButtonClick}
                ref={null}
            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                <span>Sign and Ink</span>
            </button>
        </>
    )
}



export default SignAndInk