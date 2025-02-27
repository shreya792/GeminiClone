
import React, { useContext, useRef, useState } from 'react';
import './Main.css';
import 'regenerator-runtime/runtime';
import { assets } from '../../assets/assets';
import { context } from '../../context/Context';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Main() {
    const { onSent, recentprompt, showresult, loading, resultdata, setinput, input } = useContext(context);
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
    const fileInputRef = useRef(null);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleMicClick = () => {
        if (isListening) {
            SpeechRecognition.stopListening();
            setinput(transcript);
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
        }
        setIsListening(!isListening);
    };

    const handleGalleryClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Store image data URL in state
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showresult ? (
                    <>
                        <div className="greet">
                            <p>
                                <span>Hello, User</span>
                                <p>How can I help you today?</p>
                            </p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Suggest some interesting travelling places</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>How to optimise the existing code</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentprompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setinput(e.target.value)} value={input} type="text" placeholder='Enter a prompt' />
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <img src={assets.gallery_icon} alt="" onClick={handleGalleryClick} />
                            <img src={assets.mic_icon} alt="" className={isListening ? 'listening' : ''} onClick={handleMicClick} />


                           {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null} 
                        </div>
                    </div>
                    {selectedImage && (
                        <div className="selected-image">
                            <img src={selectedImage} alt="Selected" />
                        </div>
                    )}
                    <p className="bottom-info">
                       
                    Gemini may display inaccurate info,  so double-check its responses.
                    
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
