import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SignAndInk from './SignAndInk.js';
import WeaveHelper from "../weaveapi/helper";
import SHA256 from "crypto-js/sha256";
import { v4 } from "uuid"
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

const Upload = ({ setButtonClick, buttonClick }) => {
    // const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null);
    const [authors, setAuthors] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [abstract, setAbstract] = useState('');
    const [keywords, setKeywords] = useState('');
    const [nftAddress, setNftAddress] = useState('');
    const [file, setFile] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    
    const [credentials, setCredentials] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);

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


    const [currentPhantomAccount, setCurrentPhantomAccount] = useState(null);
    const [publicKey, setPublicKey] = useState(publicKey_raw);
    const [privateKey, setPrivateKey] = useState(privateKey_raw);

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
        const pub = publicKey;
        const pvk = privateKey;
        
        
        setCurrentPhantomAccount(await getCurrentAccount());
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

        
        setPublicKey(pub);
        setPrivateKey(pvk);
        setCredentials(credentials);

    }

    const write = async () => {
        

        //1. login. The login could be done only once if the nodeApi and session variables are kept in the component state
        const { nodeApi, session } = await login();

        const did = ("did:inked:" + v4()).replaceAll("-", "");
        console.log(did)

        //const did = "did:inked:1234567890abcdef";
        const location = sideChain;

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
                    thumbnail,
                    keywords,
                    nftAddress,
                    location
                ]
            ];
            const records = new WeaveHelper.Records(table_abstracts, items);
            const resWrite = await nodeApi.write(session, data_collection, records, WeaveHelper.Options.WRITE_DEFAULT)
            //console.log(resWrite)
        }
            console.log("Done writing public info")
        //3. write private info
        {
            try {
                // const toBase64 = file => new Promise((resolve, reject) => {
                //     const reader = new FileReader();
                //     reader.readAsDataURL(file);
                //     reader.onload = () => resolve(reader.result);
                //     reader.onerror = error => reject(error);
                // });
                console.log("Uploading file")
                
                const encoded = "data:application/pdf;base64,"
                const content = file.substr("data:application/pdf;base64,".length);
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
                const nft_address = "AXT9R69MVvtxhhLiGAF78ziXBRiC37qAsKYkM1Whm1wg"; //TODO
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
                console.log("Writing private info")
                const resWrite = await nodeApi.write(session, data_collection, records, WeaveHelper.Options.WRITE_DEFAULT)
                console.log("resWrite"+resWrite)

                setSuccess(true);
                setMessage("Document Inked");
            } catch (e) {
                console.log(e);
                setSuccess(false);
                setMessage("Failed inking document");
            }
        }
        console.log("Done writing private info")
        console.log(success)
        console.log(message)
        console.log(authors)
        console.log(nftAddress)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await signupUser({
        //   email,
        //   password
        // });
        // // console.log(response.ok);
        // if(response?.detail) {
        //   console.log(response);
        //   setStatus(response?.detail);

        // }
        // else{
        //   console.log("error");
        //   setStatus(response?.email[0]);
        // }
        // setStatus(response?.detail);
        // setToken(token);
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const onImageChange = async (e) => {
        const thumbnail = e.target.files[0];
        const base64 = await convertBase64(thumbnail);
        console.log(base64);
        setThumbnail(base64);
    };
    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64);
        setFile(base64);
    };
    const onFileUpload = (e) => {
        // Create an object of formData
        e.preventDefault();
        // Details of the uploaded file
        console.log(file.selectedFile);
    };

    // const signAndInk = async e => {
    //   e.preventDefault();
    //   //promp user to sign

    // }

    return (
        <Transition.Root show={buttonClick} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={setButtonClick}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>
                                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                            <Dialog.Title
                                                as='h1'
                                                className='text-2xl font-medium leading-6 text-gray-900'
                                            >
                                                Ink your paper
                                            </Dialog.Title>
                                            <div className='mt-2'>
                                            {message  
                                                ? <div>
                                                    {message}
                                                </div> : 
                                                <form
                                                    className='mt-8 space-y-10 '
                                                    onSubmit={handleSubmit}
                                                >
                                                    {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                                                    <div className=' rounded-md shadow-sm space-y-5 '>
                                                        <div>
                                                            <h2>Authors</h2>
                                                            <label
                                                                htmlFor='authors'
                                                                className='sr-only'
                                                            >
                                                                Authors
                                                            </label>
                                                            <input
                                                                id='authors'
                                                                name='authors'
                                                                type='text'
                                                                autoComplete='authors'
                                                                required
                                                                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                placeholder='abc@def.xyz'
                                                                onChange={(e) =>
                                                                    setAuthors(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2>Title</h2>
                                                            <label
                                                                htmlFor='title'
                                                                className='sr-only'
                                                            >
                                                                Enter Title
                                                            </label>
                                                            <input
                                                                id='title'
                                                                name='title'
                                                                type='text'
                                                                autoComplete='text'
                                                                required
                                                                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                placeholder='ex. Preliminary Findings of Vaccine X12'
                                                                onChange={(e) =>
                                                                    setTitle(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2>Category</h2>
                                                            <label
                                                                htmlFor='title'
                                                                className='sr-only'
                                                            >
                                                                Category
                                                            </label>
                                                            <input
                                                                id='category'
                                                                name='category'
                                                                type='text'
                                                                autoComplete='text'
                                                                required
                                                                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                placeholder='ex. Vaccines, mRNA, etc.'
                                                                onChange={(e) =>
                                                                    setCategory(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2>Abstract</h2>
                                                            <label
                                                                htmlFor='title'
                                                                className='sr-only'
                                                            >
                                                                Abstract
                                                            </label>
                                                            <textarea
                                                                id='abstract'
                                                                name='abstract'
                                                                type='text'
                                                                autoComplete='text'
                                                                required
                                                                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                placeholder='Ipsum Lorem'
                                                                onChange={(e) =>
                                                                    setAbstract(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2>Keywords</h2>
                                                            <label
                                                                htmlFor='title'
                                                                className='sr-only'
                                                            >
                                                                Keywords
                                                            </label>
                                                            <input
                                                                id='keywords'
                                                                name='keywords'
                                                                type='text'
                                                                autoComplete='text'
                                                                required
                                                                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                placeholder='ex. Virus, Vaccines, DNA, RCT, etc.'
                                                                onChange={(e) =>
                                                                    setKeywords(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2>
                                                                Upload Image
                                                            </h2>
                                                            <label
                                                                htmlFor='thumbnail'
                                                                className='sr-only'
                                                            >
                                                                Upload
                                                            </label>
                                                            <div>
                                                                <input
                                                                    id='thumbnail'
                                                                    name='thumbnail'
                                                                    type='file'
                                                                    autoComplete='thumbnail'
                                                                    required
                                                                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                    placeholder='thumbnail'
                                                                    onChange={
                                                                        onImageChange
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h2>NFT Address</h2>
                                                            <label
                                                                htmlFor='title'
                                                                className='sr-only'
                                                            >
                                                                NFT Address
                                                            </label>
                                                            <input
                                                                id='nftAddress'
                                                                name='nftAddress'
                                                                type='text'
                                                                autoComplete='text'
                                                                required
                                                                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                placeholder='ex. AXT9R69MVvtxhhLiGAF78ziXBRiC37qAsKYkM1Whm1wg'
                                                                onChange={(e) =>
                                                                    setNftAddress(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2>Upload File</h2>
                                                            <label
                                                                htmlFor='upload'
                                                                className='sr-only'
                                                            >
                                                                Upload
                                                            </label>
                                                            <div>
                                                                <input
                                                                    id='upload'
                                                                    name='upload'
                                                                    type='file'
                                                                    autoComplete='upload'
                                                                    required
                                                                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                    placeholder='upload'
                                                                    onChange={
                                                                        onFileChange
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        {status && (
                                                            <div className='text-sm'>
                                                                <label className='font-medium text-indigo-600 hover:text-indigo-500'>
                                                                    {status}
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </form>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='button'
                                        className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                        onClick={() => {
                                            setButtonClick(false);
                                            location.reload();
                                        }}
                                        ref={cancelButtonRef}
                                    >
                                        { message ? "Done!" : "Cancel" }
                                    </button>

                                    {message 
                                        ? null 
                                        : <SignAndInk rawfile={file} authors={authors} title={title} category={category} abstract={abstract} keywords={keywords} nftAddress={nftAddress} thumbnail={thumbnail} onSign={() => write()} />
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Upload;
