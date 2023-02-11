import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'

const ConnectToPhantom = ({connected,setConnected}) => {
    console.log("connected",connected)
    const router = useRouter();

    // const handleClick = (e, path) => {
    //     e.preventDefault();


    //     if (path === "/dashboard") {
    //         console.log("I clicked on the About Page");
    //         router.push(path);
    //     }
    // };

    const [phantom, setPhantom] = useState(null);
    useEffect(async() => {
        if (window.solana) {
            setPhantom(window.solana);
        }
        const response = await solana.connect({ onlyIfTrusted: false });
          console.log(
            "public key",
            response.publicKey.toString()
          );
    }, []);

    // const [connected, setConnected] = useState(false);

    const connectHandler = () => {
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
                        Connect Phantom
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
                className="bg-purple-500 px-4 py-2 border border-transparent rounded-md text-base font-medium text-white"
            >
                Get Phantom
            </a>
        );
    }


export default ConnectToPhantom;
