import React, { Component, useEffect } from 'react';
import { v4 } from "uuid"
import WeaveHelper from "../weaveapi/helper";
import CodeEditor from "@uiw/react-textarea-code-editor";
import SHA256 from "crypto-js/sha256";

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

class Writer extends Component {
    constructor(props) {
        super(props);

        let publicKey = null;
        let privateKey = null;
        if (false) {
            //Keys management needs to be made by the application:
            // - keys generated only once and kept in local app storage
            // - probably the user fills personal details in the app and the keys are uploaded together with that
            // - keys are authorized to have write access from the backend, after reviewing the account (or maybe automatically? however, still to be done from the backend)

            //Sample code to generate a new key
            const keys = WeaveHelper.generateKeys();
            publicKey = keys[0];
            privateKey = keys[1];
        } else {
            publicKey = "weavexUTKAe7J5faqmiq94DXXWntyRBA8bPwmrUbCtebxWd3f";
            privateKey = "FpEPgjyVeYzMSb9jJtk4uhVyoNDAo8qWuoMYPKo1dXdM";
        }

        this.state = {
            currentPhantomAccount: null,
            publicKey: publicKey,
            privateKey: privateKey,
            producerIndex: 0,
            credentials: null,
            wallet: null,
            success: false,
            message: null,

            authors: "Xiang-Xiang Sun, Lu Guo",
            title: "Microscopic study of the compound nucleus formation in cold-fusion reactions",
            category: "Nuclear Theory",
            abstract: "The understanding of the fusion probability is of particular importance to reveal the mechanism of producing superheavy elements. We present a microscopic study of the compound nucleus formation by combining time-dependent density functional theory, coupled-channels approach, and dynamical diffusion models. The fusion probability and compound nucleus formation cross sections for cold-fusion reactions 48Ca+208Pb, 50Ti+208Pb, and 54Cr+208Pb are investigated and it is found that the deduced capture barriers, capture cross sections for these reactions are consistent with experimental data. Above the capture barrier, our calculations reproduce the measured fusion probability reasonably well. Our studies demonstrate that the restrictions from the microscopic dynamic theory improve the predictive power of the coupled-channels and diffusion calculations.",
            keywords: "Cold Fusion, Nuclear, Physics"
        };
    }

    async getCurrentAccount() {
        const response = await window.solana.connect();
        this.setState({ currentPhantomAccount: response.publicKey.toString() });
    }

    async login() {
        const pub = this.state.publicKey;
        const pvk = this.state.privateKey;

        const nodeApi = new WeaveHelper.WeaveAPI().create(WeaveHelper.getConfig(sideChain, pub, pvk));
        await nodeApi.init();
        console.log(nodeApi)
        const pong = await nodeApi.ping();
        console.log(pong)

        const session = await nodeApi.login(organization, pub, data_collection, this.state.credentials);
        console.log(session)
        console.log(session.scopes.length > 0)
        return { nodeApi, session };
    }

    async connect() {
        const pub = this.state.publicKey;
        const pvk = this.state.privateKey;

        this.setState({ currentPhantomAccount: await this.getCurrentAccount() });

        //This message must match what's hashed on server side, changing it here should trigger changing it also in the node
        let msg = "Please sign this message to confirm you own this wallet\nThere will be no blockchain transaction or any gas fees." +
            "\n\nWallet: " + this.state.currentPhantomAccount +
            "\nKey: " + pub;

        const signature = await window.solana.signMessage(new TextEncoder().encode(msg), 'utf8');
        const sig = binary_to_base58(signature.signature);
        //console.log(sig)

        const credentials = {
            "account": authChain + ":" + this.state.currentPhantomAccount,
            "sig": sig,
            "template": "*",
            "role": "*"
        }

        this.setState({
            publicKey: pub,
            privateKey: pvk,
            credentials: credentials,
        });
    }

    async write() {
        const {
            authors,
            title,
            category,
            abstract,
            keywords
        } = this.state;

        //1. login. The login could be done only once if the nodeApi and session variables are kept in the component state
        const { nodeApi, session } = await this.login();

        //const did = "did:inked:" + v4().replace("-", "");
        const did = "did:inked:123456789abcdef";
        const location = sideChain

        //2. write public info
        {
            const items = [
                [
                    null, //_id, filled server side
                    null, // timestamp
                    null, // writer
                    null, // signature of writer
                    did,
                    authors,
                    title,
                    category,
                    abstract,
                    keywords,
                    location
                ]
            ];
            const records = new WeaveHelper.Records(table_abstracts, items);
            const resWrite = await nodeApi.write(session, data_collection, records, WeaveHelper.Options.WRITE_DEFAULT)
            //console.log(resWrite)
        }

        //3. write private info
        {
            try {
                const toBase64 = file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });

                const file = document.querySelector('#uploaded_file').files[0];
                const encoded = await toBase64(file);
                const content = encoded.substr("data:application/pdf;base64,".length);
                const checksum = SHA256(Buffer(content, "base64")).toString(); //result is hex, eventually transform to base58
                console.log(checksum)

                if (false) {
                    const wallet = Keypair.generate(); //TODO: use phantom
                    const metaplex = Metaplex.make(connection)
                        .use(keypairIdentity(wallet))
                        .use(bundlrStorage({
                            address: 'https://' + network + '.bundlr.network',
                            providerUrl: 'https://api.' + network + '.solana.com',
                            timeout: 60000
                        }));
                    console.log(metaplex);

                    const { uri } = await metaplex
                        .nfts()
                        .uploadMetadata({
                            name: did,
                            description: checksum,
                            image: "https://placekitten.com/200/300" //TODO: replace with Inked NFT image
                        });
                    console.log(uri)

                    const { nft } = await metaplex
                        .nfts()
                        .create({
                            uri: uri,
                            name: did,
                            sellerFeeBasisPoints: 500
                        });
                    console.log(nft);
                }

                //TODO: create new NFT to control the access to the document
                const nft_address = "12345"; //TODO

                const access = "nft:solana:" + nft_address;
                const items = [
                    [
                        null, //_id, filled server side
                        null, // timestamp
                        null, // writer
                        null, // signature of writer
                        did,
                        access,
                        content
                    ]
                ];
                const records = new WeaveHelper.Records(table_documents, items);
                const resWrite = await nodeApi.write(session, data_collection, records, WeaveHelper.Options.WRITE_DEFAULT)
                //console.log(resWrite)

                this.setState({
                    success: true,
                    message: "Document published"
                })
            } catch (e) {
                console.log(e);
                this.setState({
                    success: false,
                    message: "Failed publishing document"
                })
            }
        }
    }

    render() {
        const {
            authors,
            title,
            category,
            abstract,
            keywords,
            success,
            message
        } = this.state;

        return <div className="text-gray-800 bg-teal-50 min-h-screen">
            <header className="items-center justify-between pt-12">
                <h1 className="mx-auto text-center pb-2 text-5xl font-extrabold font-mono text-gray-800">
                    Writing a document
                </h1>
                <h1 className="mx-auto text-center m-2 text-2xl font-medium font-mono text-gray-800 underline decoration-indigo-500 ">
                    Writer View
                </h1>
            </header>

            <div className="text-sm items-center text-center mt-6">
                <div className="max-w-2xl p-6 mx-auto text-center backdrop-sepia-0 backdrop-blur-sm border shadow-xl border-blue-500/10">
                    <span className="text-blue-700">Connected Phantom wallet: </span> <span className="text-gray-800"> {this.state.currentPhantomAccount}</span>
                    <br />
                    <br />
                    <span className="text-blue-700">Weavechain public key: </span> <span className="text-gray-800">{this.state.publicKey}</span>
                    <br />
                    <br />
                    <span className="text-gray-800">___</span>
                    <br />
                    <br />

                    <label>File</label>
                    <br/>
                    <input type="file" name="uploaded_file" id="uploaded_file" />
                    <br />
                    <br />

                    <label>Authors</label>
                    &nbsp;
                    <input className='border shadow-xl border-blue-500/10 text-center' style={{width: "600px"}}
                        type="text"
                        placeholder="0"
                        value={authors}
                        onChange={(event) => this.setState({ authors: event.target.value })}
                    />
                    <br />
                    <label>Title</label>
                    &nbsp;
                    <CodeEditor className="mt-12 mx-8 border shadow-xl border-blue-500/10"
                                value={title}
                                language="text"
                                rows={5}
                                placeholder=""
                                onChange={(event) => { this.setState({ title: event.target.value }); } }
                                padding={5}
                                style={{
                                    fontSize: 12,
                                    backgroundColor: "#f5f5f5",
                                    fontFamily:
                                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                                }}
                    />
                    <br />
                    <br />

                    <label>Category</label>
                    &nbsp;
                    <input className='border shadow-xl border-blue-500/10 text-center' style={{width: "600px"}}
                        type="text"
                        placeholder="0"
                        value={category}
                        onChange={(event) => this.setState({ category: event.target.value })}
                    />
                    <br />
                    <br />
                    <label>Abstract</label>
                    <CodeEditor className="mt-12 mx-8 border shadow-xl border-blue-500/10"
                                value={abstract}
                                language="text"
                                rows={20}
                                placeholder=""
                                onChange={(event) => { this.setState({ abstract: event.target.value }); } }
                                padding={5}
                                style={{
                                    fontSize: 12,
                                    backgroundColor: "#f5f5f5",
                                    fontFamily:
                                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                                }}
                    />
                    <br />
                    <br />

                    <label>Keywords</label>
                    &nbsp;
                    <input className='border shadow-xl border-blue-500/10 text-center' style={{width: "600px"}}
                        type="text"
                        placeholder="0"
                        value={keywords}
                        onChange={(event) => this.setState({ keywords: event.target.value })}
                    />

                    <br />
                    <br />

                    {message ? <>
                        <span style={{color: success ? "green" : "red", whiteSpace: "pre-line"}}>{message}</span>
                    </> : null}

                    <br />
                    <br />
                    <button className="px-5 py-2.5 mt-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow" type="submit" onClick={() => this.connect()}>Connect Wallet</button>
                    &nbsp;
                    <button className="px-5 py-2.5 mt-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow" type="submit" onClick={() => this.write()}>Publish</button>
                </div>
            </div>
            <br />
        </div>;
    }
}

export default Writer;
