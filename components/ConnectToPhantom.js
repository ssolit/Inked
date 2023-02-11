import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'

const ConnectToPhantom = ({ connected, setConnected }) => {

    const router = useRouter();

    const [phantom, setPhantom] = useState(null);
    const [pubkey, setPubkey] = useState("empty");
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {


        if (window.solana) {
            setPhantom(window.solana);


        }

    }, []);

    useEffect(() => {

        async function getPubkey() {

            const pubkey = await window.solana._publicKey
            if (!pubkey) {
                console.log("no pubkeys")
                return
            }
            setPubkey(pubkey.toString());
        }

        getPubkey()
    }, [phantom]);





    // const [connected, setConnected] = useState(false);

    const connectHandler = async () => {
        await phantom.connect();
        setConnected(true);
        const path = "/dashboard"
        router.push(path)
    };

    if (phantom) {
        if (connected) {
            console.log("connected")
            return (
                <>
                    <button 
                        className="py-2 px-4 border border-white rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-white hover:text-orange-700"
                    >
                        {/* only return the first 3 and last 4 of pubkey */}
                        {pubkey.slice(0, 3)}...{pubkey.slice(-4)}
                    </button>
                </>


            );
        } else {
            console.log("not connected")
            return (
                <div>
                    <button
                        onClick={connectHandler}
                        className="py-2 px-4 border border-white rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-white hover:text-orange-700"
                    >
                        Connect Phantom
                    </button>
                </div>
            );
        }
    } 
        return (
            <a
                href="https://phantom.app/"
                target="_blank"
                className="bg-orange-400 px-4 py-2 border border-transparent rounded-md text-base font-medium text-white"
            >
                Get Phantom
            </a>
        );
    }


export default ConnectToPhantom;
