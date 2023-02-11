import React, { useState, useEffect } from "react";
import { Connection, Solana, fetchSigner } from '@solana/web3.js';


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ConnectToPhantom = function () {

    // getting whether user is authenticated
    const [authenticated, setAuthenticated] = useState(false);

    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");


    async function requestSolanaAccounts() {
        console.log(`hi`);
        const connection = new Connection('https://api.mainnet-beta.solana.com');
        const signer = await Solana.fetchSigner(connection);
        const publicKey = signer.publicKey;
      
        console.log(`Public Key: ${publicKey}`);
        
    }

    // talking with metamask to get the accounts with wallet connection
    async function requestAccount() {
        console.log('Requesting account...');

        // check if MetaMask is installed
        if ("solana" in window) {
            console.log('detected phantom wallet');

            // update wallet address and balance
            try {
                const accounts = await requestSolanaAccounts();
                console.log("hi2");
                console.log(accounts);
                console.log("hi3");


                setWalletAddress(accounts[0]);
                
                if (accounts.length > 0) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }

                console.log('auth detected', authenticated)

            } catch (error) {
                console.error(error);
            }

        } else {
            console.log('no phantom detected');
        }
    }




    var _a = (0, react_1.useState)(null), phantom = _a[0], setPhantom = _a[1];
    (0, react_1.useEffect)(function () {
        if ("solana" in window) {
            setPhantom(window["solana"]);
        }
    }, []);
    var _b = (0, react_1.useState)(false), connected = _b[0], setConnected = _b[1];
    (0, react_1.useEffect)(function () {
        phantom === null || phantom === void 0 ? void 0 : phantom.on("connect", function () {
            setConnected(true);
        });
        phantom === null || phantom === void 0 ? void 0 : phantom.on("disconnect", function () {
            setConnected(false);
        });
    }, [phantom]);
    var connectHandler = function () {
        phantom === null || phantom === void 0 ? void 0 : phantom.connect();
    };
    var disconnectHandler = function () {
        phantom === null || phantom === void 0 ? void 0 : phantom.disconnect();
    };
    if (phantom) {
        if (connected) {
            return (<button onClick={disconnectHandler} className="py-2 px-4 border border-purple-700 rounded-md text-sm font-medium text-purple-700 whitespace-nowrap hover:bg-purple-200">
                Disconnect from Phantom
            </button>);
        }
        return (
            <div>
                <button onClick={() => { connectHandler(); requestAccount();}} className="bg-purple-500 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-opacity-75">
                    Connect to Phantomsss
                </button>

                <div>

                    {
                        !authenticated ?
                            null : <Link href="/dashBoard">
                                <p class="text-white transition hover:text-white/75">
                                    Go to Dashboard
                                </p>
                            </Link>
                    }
                </div>
            </div>
        );
    }
    return (<a href="https://phantom.app/" target="_blank" className="bg-purple-500 px-4 py-2 border border-transparent rounded-md text-base font-medium text-white">
        Get Phantom
    </a>);
};
exports["default"] = ConnectToPhantom;
