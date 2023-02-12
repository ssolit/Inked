import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SignAndInk from './SignAndInk.js';

const Upload = ({ setButtonClick, buttonClick }) => {
    // const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null);
    const [authors, setAuthors] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [abstract, setAbstract] = useState('');
    const [keywords, setKeywords] = useState('');
    const [file, setFile] = useState('');
    const [thumbnail, setThumbnail] = useState('');

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
                                                                Enter Titlt
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
                                        }}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>

                                    <SignAndInk rawfile={file} />
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
