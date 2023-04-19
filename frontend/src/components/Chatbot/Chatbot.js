import React, { useState } from 'react';
import './Chatbot.css';
import useSpeechToText from 'react-hook-speech-to-text';
import { useSpeechSynthesis } from 'react-speech-kit';
import axios from 'axios';
import { Button } from '@mui/material';

const Chatbot = ({ defaultSTT, autoSpeak, session, webhookID }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [oldInterimResult, setOldInterimResult] = useState('');
    const [speakingIndex, setSpeakingIndex] = useState(0);
    const [isUserSubmitMessage, setIsUserSubmitMessage] = useState(false);
    const objDiv = document.getElementById("chatHistoryWindow");
    const onEnd = () => {
        setMessage('')
    }
    const { speak, voices, speaking, cancel } = useSpeechSynthesis({
        onEnd: onEnd
    });
    const voice = voices[3]
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        speechRecognitionProperties: {
            lang: 'de-DE',
            interimResults: true // Allows for displaying real-time speech results
        }
    });
    if (error) console.log('Web Speech API is not available in this browser 🤷‍');

    const fillMessageBox = () => {
        if (defaultSTT && isRecording && interimResult && interimResult.trim() !== oldInterimResult.trim()) {
            const newMessage = interimResult
            setOldInterimResult(newMessage)
            setMessage(newMessage)
        } else {
            results.filter(r => r).map(result => {
                if (!result?.isReaded) {
                    setMessage(result.transcript);
                    result.isReaded = true;
                }
            })
        }
    }

    fillMessageBox();

    const handleSubmit = (e) => {
        e.preventDefault();
        let history = JSON.parse(JSON.stringify(chatHistory));
        if (isUserSubmitMessage === false) {
            setIsUserSubmitMessage(true)
            history = []
        }
        const senderMessage = message;
        history.push({ type: 'user', message: message });
        const response = '...';
        history.push({ type: 'bot', message: response });
        setMessage('');
        setOldInterimResult('');
        setChatHistory(history);
        setTimeout(() => {
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 500);
        axios.post(`https://dialogflow.cloud.google.com/v1/integrations/messenger/webhook/${webhookID}/sessions/dfMessenger-${session}`,
            {
                "queryInput": {
                    "text": {
                        "text": senderMessage,
                        "languageCode": "de"
                    }
                }
            }).then(res => {
                const responseMessage = JSON.parse(res.data.replace('\)]}\'', '')).queryResult.fulfillmentMessages[0].text.text[0]
                let history2 = JSON.parse(JSON.stringify(history));
                history2 = history2.map((e, index) => {
                    if (e.type === 'bot' && e.message === '...') {
                        e.message = responseMessage
                    }
                    return e
                })
                if (autoSpeak && speaking === false) {
                    setSpeakingIndex(history2.length - 1);
                    speak({ text: history2.slice(-1)[0].message, voice, rate: 1 })
                }
                setChatHistory(history2)
                objDiv.scrollTop = objDiv.scrollHeight;
            })
    };
    const showDemo = (options) => {
        if (chatHistory.length === 0 || options?.fromButton) {
            const history = [];
            history.push({ type: 'user', message: 'Hallo' });
            const response = '...';
            history.push({ type: 'bot', message: 'Hallo, willkommen bei Chek-bot. Sie sind hier genau richtig, wenn Sie zu faul sind, die ganzen Artikel nach Neuigkeiten, Kochrezepten oder allgemeinen Fragen zu bekannten Personen oder zur Geschichte zu durchstöbern und zu lesen.' });
            setChatHistory(history);
        }
    }
    showDemo();
    return (
        <div>
            <div className="chatbot-container">
                <div id="chatHistoryWindow" className="chat-history">
                    {
                        chatHistory.map((chat, index) => (
                            <div key={index} className={`chat-message ${chat.type}`}>
                                {
                                    chat.type !== 'user'
                                        ? speaking === false
                                            ? <div className="chat-button">
                                                <button style={{ border: '1px solid black', borderRadius: '5px' }} disabled={chat.message === '...'} onClick={() => { setSpeakingIndex(index); speak({ text: chat.message, voice, rate: 1 }) }}>Speak</button>
                                            </div>
                                            : speakingIndex === index
                                                ? <div className="chat-button">
                                                    <button style={{ border: '1px solid black', borderRadius: '5px' }} onClick={() => cancel()}>Stop</button>
                                                </div>
                                                : <div className="chat-button">
                                                    <button style={{ border: '1px solid black', borderRadius: '5px' }} disabled={true} onClick={() => speak({ text: chat.message, voice, rate: 1 })}>Speak</button>
                                                </div>
                                        : ''
                                }
                                <p className="chat-paragraph">{chat.type === 'user' ? 'You' : 'Chatbot'}: {chat.message}</p>
                            </div>
                        ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="message-input"
                        placeholder="Schreiben Sie ihre Nachricht hier..."
                    />
                    <button type="submit" className="submit-btn">
                        Send
                    </button>
                </form>
                <div style={{ display: 'flex' }}>
                    <div>
                        <Button variant="outlined" onClick={() => showDemo({ fromButton: true })}>
                            Show Demo
                        </Button>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        {!error && <Button style={{ border: '1px solid black', borderRadius: '5px', justifyContent: 'flex-end', float: 'right' }} onClick={() => {
                            if (isRecording) {
                                stopSpeechToText();
                            } else {
                                startSpeechToText();
                            }
                        }}>
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </Button>}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Chatbot;