import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const PublishModal = ({
    setButtonClick,
    buttonClick,
    item,
    settingsClickId,
    setSettingsClickId,
    privatePaperTitle = 'Example Title',
}) => {
    // const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [paperTitle, setPaperTitle] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [title, setTitle] = useState(privatePaperTitle);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handlePaperTitleChange = (event) => {
        setPaperTitle(event.target.value);
    };

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
    const onFileChange = (e) => {
        // Update the state
        setFile({ selectedFile: event.target.files[0] });
    };
    const onFileUpload = (e) => {
        // Create an object of formData
        e.preventDefault();
        // Details of the uploaded file
        console.log(file.selectedFile);
    };

    return (
        <Transition.Root
            show={buttonClick && settingsClickId === item['hash']}
            as={Fragment}
        >
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
                                                as='h3'
                                                className='text-lg font-medium leading-6 text-gray-900 text-center'
                                            >
                                                Publish
                                            </Dialog.Title>
                                            {/* <h1>{item['title']}</h1>
                                            <h1>{item['author']}</h1> */}

                                            <div className='mt-2'>
                                                <form
                                                    className='mt-8 space-y-10 '
                                                    onSubmit={handleSubmit}
                                                >
                                                    <h2>
                                                        You cannot undo once you
                                                        publish your paper.
                                                        Please type in the name
                                                        of the paper in order to
                                                        confirm that you want to
                                                        make the paper public.
                                                    </h2>
                                                    {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                                                    <div className=' rounded-md shadow-sm space-y-5 '>
                                                        <div>
                                                            <div className='container mx-auto'>
                                                                <input
                                                                    id='confirm'
                                                                    name='confirm'
                                                                    type='text'
                                                                    autoComplete='authors'
                                                                    required
                                                                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                                                    placeholder='Enter paper title'
                                                                    value={
                                                                        inputValue
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                />
                                                                {/* <button
                                                                    className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded'
                                                                    id='submitButton'
                                                                    disabled={
                                                                        inputValue !==
                                                                        title
                                                                    }
                                                                >
                                                                    Submit
                                                                </button> */}
                                                            </div>
                                                        </div>
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
                                            setSettingsClickId(null);
                                        }}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type='submit'
                                        className={`group relative flex w-1/4 justify-around rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                            inputValue !== title
                                                ? 'opacity-50 cursor-not-allowed'
                                                : ''
                                        }`}
                                        id='submitButton'
                                        disabled={inputValue !== title}
                                        onClick={() => {
                                            setButtonClick(false);
                                            setSettingsClickId(null);
                                        }}
                                        ref={cancelButtonRef}
                                    >
                                        Publish
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default PublishModal;
