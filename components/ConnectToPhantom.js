import React, { useState, useEffect } from "react";
import { Connection, Solana, fetchSigner } from '@solana/web3.js';
import Link from 'next/link'
import { useRouter } from 'next/router'




"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ConnectToPhantom = function () {
    const router = useRouter()

    const handleClick = (e, path) => {
        e.preventDefault()
     
         if (path === "/dashboard") {
           console.log("I clicked on the About Page");
           router.push(path)
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
            return (
                !connected ?
                    null : <Link href="/dashBoard" className="bg-orange-500 py-2 px-4 rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-purple-200">
                        <p onClick={(e) => handleClick(e, "/dashboard")}>
                            Launch Dashboard
                        </p>
                    </Link>
            );


        }
        return (
            <div>
                <button onClick={connectHandler} className="py-2 px-4 border border-white rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-white hover:text-orange-700">
                    Connect Phantom
                </button>
            </div>
        );
    }
    return (<a href="https://phantom.app/" target="_blank" className="bg-purple-500 px-4 py-2 border border-transparent rounded-md text-base font-medium text-white">
        Get Phantom
    </a>);
};
exports["default"] = ConnectToPhantom;
