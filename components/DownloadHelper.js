import React, { Component, useEffect,useState } from 'react';
import { v4 } from "uuid"
import WeaveHelper from "../weaveapi/helper";
import SHA256 from "crypto-js/sha256";
import { LockClosedIcon } from '@heroicons/react/20/solid'

import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

import { base58_to_binary, binary_to_base58 } from "base58-js";
const Buffer = require("buffer").Buffer;

const sideChain = "https://public.weavechain.com:443/92f30f0b6be2732cb817c19839b0940c";
//const sideChain = "http://localhost:18080/92f30f0b6be2732cb817c19839b0940c";

const authChain = "solana";
const network = "devnet"; //"testnet";

const organization = "weavedemo";
const data_collection = "inked";
const table_abstracts = "abstracts"
const table_documents = "documents"
const connection = new Connection(clusterApiUrl(network));



    let publicKey_raw = null;
    let privateKey_raw = null;
    if (false) {
        //Keys management needs to be made by the application:
        // - keys generated only once and kept in local app storage
        // - probably the user fills personal details in the app and the keys are uploaded together with that
        // - keys are authorized to have write access from the backend, after reviewing the account (or maybe automatically? however, still to be done from the backend)

        //Sample code to generate a new key
        const keys = WeaveHelper.generateKeys();
        publicKey_raw = keys[0];
        privateKey_raw = keys[1];
    } else {
        // Sample keys for testing
        publicKey_raw = "weavexUTKAe7J5faqmiq94DXXWntyRBA8bPwmrUbCtebxWd3f";
        privateKey_raw = "FpEPgjyVeYzMSb9jJtk4uhVyoNDAo8qWuoMYPKo1dXdM";
    }


const DownloadHelper = () => {

    const [currentPhantomAccount, setCurrentPhantomAccount] = useState("");
    const [publicKey, setPublicKey] = useState(publicKey_raw);
    const [privateKey, setPrivateKey] = useState(privateKey_raw);
    const [producerIndex, setProducerIndex] = useState(0);
    const [credentials, setCredentials] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);

    const [authors, setAuthors] = useState("Xiang-Xiang Sun, Lu Guo");
    const [title, setTitle] = useState("Microscopic study of the compound nucleus formation in cold-fusion reactions");
    const [category, setCategory] = useState("Nuclear Theory");
    const [abstract, setAbstract] = useState("The understanding of the fusion probability is of particular importance to reveal the mechanism of producing superheavy elements. We present a microscopic study of the compound nucleus formation by combining time-dependent density functional theory, coupled-channels approach, and dynamical diffusion models. The fusion probability and compound nucleus formation cross sections for cold-fusion reactions 48Ca+208Pb, 50Ti+208Pb, and 54Cr+208Pb are investigated and it is found that the deduced capture barriers, capture cross sections for these reactions are consistent with experimental data. Above the capture barrier, our calculations reproduce the measured fusion probability reasonably well. Our studies demonstrate that the restrictions from the microscopic dynamic theory improve the predictive power of the coupled-channels and diffusion calculations.");
    const [keywords, setKeywords] = useState("Cold Fusion, Nuclear, Physics");
    const [did,setDid] = useState("")

  
    const getCurrentAccount = async () => {
        const response = await window.solana.connect();
        setCurrentPhantomAccount(response.publicKey.toString());
    }
    const login = async () => {
        const pub = publicKey;
        const pvk = privateKey;

        const nodeApi = new WeaveHelper.WeaveAPI().create(WeaveHelper.getConfig(sideChain, pub, pvk));
        await nodeApi.init();
        console.log(nodeApi)
        const pong = await nodeApi.ping();
        console.log(pong)

        const session = await nodeApi.login(organization, pub, data_collection, credentials);
        console.log(session)
        console.log(session.scopes.length > 0)
        return { nodeApi, session };
    }

    const connect = async () => {
        // const pub = publicKey;
        const pub = "weavesTYC5AttjALDadRMefaBB46bTb4CVg2j5egchKNCYpJy"
        const pvk = privateKey;
        
        
        setCurrentPhantomAccount(await getCurrentAccount());
        console.log("currentPhantomAccount",currentPhantomAccount)
        //This message must match what's hashed on server side, changing it here should trigger changing it also in the node
        let msg = "Please sign this message to confirm you own this wallet\nThere will be no blockchain transaction or any gas fees." +
            "\n\nWallet: " + currentPhantomAccount +
            "\nKey: " + pub;

        const signature = await window.solana.signMessage(new TextEncoder().encode(msg), 'utf8');
        const sig = binary_to_base58(signature.signature);
        console.log(sig)

        const credentials = {
            "account": authChain + ":" + currentPhantomAccount,
            "sig": sig,
            "template": "*",
            "role": "*"
        }

        console.log("credentials",credentials)

        setPublicKey(pub);
        setPrivateKey(pvk);
        setCredentials(credentials);

    }

    const download = async() => {
        
        
        //1. login. The login could be done only once if the nodeApi and session variables are kept in the component state
        await connect();
        const { nodeApi, session } = await login();
        
        //2. read the private document
        const filter = new WeaveHelper.Filter(WeaveHelper.FilterOp.eq("did", did), null, null, [ "pubkey", "did" ]);
        const resRead = await nodeApi.read(session, data_collection, table_documents, filter, WeaveHelper.Options.READ_DEFAULT_NO_CHAIN)
        // const filter = new WeaveHelper.Filter(null, null, null, [ "pubkey", "did" ]) 
        // const resRead = await nodeApi.read(session, data_collection, table_documents, filter, WeaveHelper.Options.READ_DEFAULT_NO_CHAIN)
        try {
            console.log(resRead)
            const encoded = resRead?.data ? resRead.data[0]["document"] : null;
            if (encoded) {
                const access = resRead.data[0]["access"];
                const contract = access.split(":")[2];
                console.log("contract" + contract);

                // 3. get the hash from the solana NFT (or some contract)
                let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(network), "confirmed");
                const programAccount = new solanaWeb3.PublicKey(storageAccount);
                const accountInfo = await connection.getAccountInfo(programAccount, "confirmed");
                const contractData = accountInfo.data;
                console.log(contractData)

                const data = new Blob([ Buffer.from(encoded, "base64") ], { type: "application/pdf" });
                const checksum = SHA256(data).toString();
                console.log(checksum);

                //TODO: check hash
                const hashMatch = true;

                if (hashMatch) {
                    //4. trigger download
                    const fileName = did + ".pdf";

                    var url = URL.createObjectURL(data);
                    console.log(url)
                    // var hlink = document.createElement("a");
                    // hlink.href = url;
                    // hlink.download = fileName;
                    // hlink.click();

                    
                    setSuccess(true);
                    setMessage("Download successful");
                } else {
                    
                    setSuccess(false);
                    setMessage("Document hash not matching on-chain value");
                }
            } else {
                
                setSuccess(false);
                setMessage("Not authorized or document does not exist");
            }
        } catch (e) {
            console.log(e);
            setSuccess(false);
            setMessage("Error retrieving document");
        }
    

}
const handleDownloadClick = async (e) => {
    // e.preventDefault()
    console.log("download clicked")
    // console.log(id)
    await download()
  }
return (
    <div>
     <button onClick={handleDownloadClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                      </svg>

                    </button>
    </div>
)
}



export default DownloadHelper