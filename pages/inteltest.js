import React from 'react'
import { useState } from 'react'
import Upload from '../components/Upload'

const inteltest = () => {
    // I want a button, when pressed, brings up the modal from Upload.js

    const [buttonClick, setButtonClick] = useState(false)


    return (
        <div>
            <button onClick={() => {
                if (buttonClick === false) {
                    setButtonClick(true)
                }

            }} className="bg-orange-400 hover:bg-orange-700 hover:text-white text-blue font-bold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                
                    
                <span className='pl-2'>Upload</span>
            </button>
            {buttonClick && <Upload buttonClick = {buttonClick} setButtonClick={setButtonClick} />}

        </div>
    )
}

export default inteltest