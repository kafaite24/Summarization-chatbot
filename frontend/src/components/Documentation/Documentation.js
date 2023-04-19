import React, { useState } from 'react';
import './Documentation.css';
import './../Chatbot/Chatbot.css';
import { useSpeechSynthesis } from 'react-speech-kit';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

const items = [
    {
        id: 1,
        title: 'History',
        messageIndex: 0,
        messages: [
            {
                user: 'Ich möchte Informationen über Nelson Mandela.',
                bot: 'Nelson Rolihlahla Mandela (18. Juli 1918 in Mvezo, Transkei; † 5. Dezember 2013 in Johannesburg), in Südafrika häufig with dem traditionellen Clannamen Madiba bezeichnet, oft auch Tata genannt (isiXhosa für ‘Vater’), Initiationsname Dalibunga. Mandela was der erste schwarze Präsident seines Landes. Er war der wichtigste Wegbereiter des versöhnlichen Übergangs von der Apartheid.'
            },
            {
                user: 'Was ist während der Schlacht von Gettysburg passiert?',
                bot: 'Die Schlacht von Gettysburg fand vom 1. bis zum 3. Juli 1863 bei der Kleinstadt Gettysburg in Pennsylvania wenige Kilometer nördlich der Grenze zu Maryland. Mit mehr als 43.000 Opfern, davon über 5.700 Gefallenen, war sie eine der blutigsten Schlachten auf dem amerikanischen Kontinent. Mit der Niederlage der Nord-Virginia-Armee unter General Robert E. Lee endete die vorletzte Offensive der Konföderation.'
            },
            {
                user: 'Rekapituliere die Schlacht von Waterloo.',
                bot: 'Die Schlacht bei Waterloo (deutsch ˈvɑːtɐloː) vom 18. Juni 1815 war die letzte Schlacht Napoleon Bonapartes. Sie fand rund 15 km südlich von Brüssel in der Nähe des Dorfes Waterloo statt.'
            }
        ]
    },
    {
        id: 2,
        title: 'Music',
        messageIndex: 0,
        messages: [
            {
                user: 'Wer ist Metallica',
                bot: 'Metallica ist eine US-amerikanische Metal-Band. Sie wurde 1981 in Los Angeles gegründet and ist seit 1982 in San Francisco ansässig. Sie gehört zu den erfolgreichsten Metalbands der Welt. In den USA verkaufte die Band über 62 Millionen Alben.'
            },
            {
                user: 'Geben Sie mir Informationen über Elvis Presley.',
                bot: 'Elvis Aaron Presley (* 8. Januar 1935 in Tupelo, Mississippi; † 16. August 1977 in Memphis, Tennessee), häufig nur Elvis genannt, war ein US-amerikanischer Sänger, Musiker and Schauspieler. Er gilt als einer der wichtigsten Vertreter der Rock- and Popkultur des 20. Jahrhunderts. Wegen seiner Erfolge und seiner Ausstrahlung wird er auch als „King of Rock ’n’ Roll’ oder einfach als The King’ bezeichnet.'
            }
        ]
    },
    {
        id: 3,
        title: 'Sports',
        messageIndex: 0,
        messages: [
            {
                user: 'Was ist mit Ronaldo passiert?',
                bot: 'Cristiano Ronaldo (born 5. Februar 1985 in Funchal, Madeira) ist ein portugiesischer Fußballspieler. Er hält die Weltrekorde für die meisten Länderspieltore und die meistsen Pflichtspieltores. Ronaldo ist Kapitän sowie Rekordspieling der portugieischen Nationalmannschaft. Seit 2015 ist er Rekordschütze von Real Madrid.'
            }
        ]
    },
    {
        id: 4,
        title: 'Food',
        messageIndex: 0,
        messages: [
            {
                user: 'Wie man Nudeln kocht?',
                bot: 'Einen großen Topf mit Salzwasser zum Kochen bringen, die Nudeln hineingeben. Die Oliven in Scheiben schneiden. Waschen Sie das Basilikum, geben Sie die Tomaten in eine Salatschüssel.'
            },
            {
                user: 'Kann ich ein Rezept für Pfannkuchen bekommen?',
                bot: 'Mehl, Eier, Milch, 1 Esslöffel Öl und eine Prise Salz in eine Schüssel oder einen großen Krug geben. Eine mittelgroße Bratpfanne oder Crêpe-Pfanne bei mittlerer Hitze aufsetzen.'
            },
            {
                user: 'Wie wird das Frühstück zubereitet?',
                bot: 'Stellen Sie Ihren Backofen auf die niedrigste Stufe, um alles warm zu halten. Die Kartoffeln schälen, 2 davon reiben and beiseite stellen. Die anderen 2 in große Stücke schneiden und 10-15 Minuten lang kochen.'
            }
        ]
    },
    {
        id: 5,
        title: 'Opinion',
        messageIndex: 0,
        messages: [
            {
                user: 'Hallo?',
                bot: 'Einen großen Topf mit Salzwasser zum Kochen bringen, die Nudeln hineingeben. Die Oliven in Scheiben schneiden. Waschen Sie das Basilikum, geben Sie die Tomaten in eine Salatschüssel.'
            }
        ]
    },
    {
        id: 6,
        title: 'News',
        messageIndex: 0,
        messages: [
            {
                user: 'Hallo?',
                bot: 'Einen großen Topf mit Salzwasser zum Kochen bringen, die Nudeln hineingeben. Die Oliven in Scheiben schneiden. Waschen Sie das Basilikum, geben Sie die Tomaten in eine Salatschüssel.'
            }
        ]
    }
];

const Documentation = () => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [speakingIndex, setSpeakingIndex] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const { speak, voices, speaking, cancel } = useSpeechSynthesis();
    const voice = voices[3]
    const handleItemSelection = index => {
        setSelectedIndex(index === selectedIndex ? -1 : index);
        setMessageIndex(0)
        items.forEach(item => {
            item.messageIndex = 0
        })
        cancel()
    };
    const handleRefreshClick = () => {
        items[selectedIndex].messageIndex = (items[selectedIndex].messageIndex + 1) >= items[selectedIndex].messages.length
            ? 0
            : items[selectedIndex].messageIndex + 1
        cancel()
        setMessageIndex(items[selectedIndex].messageIndex)
    }
    const chatWindowRender = (item) => {
        const messages = [
            { type: 'user', message: item.messages[messageIndex].user },
            { type: 'bot', message: item.messages[messageIndex].bot }
        ]
        return (
            <div className="chatbot-container" style={{ margin: '0 auto' }}>
                <div className="conversation-controls">
                    <IconButton onClick={() => { handleRefreshClick() }} size='small' disabled={item.messages.length === 1}>
                        <RefreshIcon />
                    </IconButton>
                </div>
                <div id="chatHistoryWindow" style={{ height: 'auto' }} className="chat-history">
                    {
                        messages.map((chat, index) => (
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
            </div >
        )
    }
    return (
        <ul className="collapsible-list">
            {items.map((item, index) => (
                <li key={item.id} className={`collapsible-item ${selectedIndex === index ? 'open' : ''}`}>
                    <div onClick={() => handleItemSelection(index)} className="collapsible-header">
                        {item.title}
                        <button className={`right-aligned-button ${selectedIndex === index ? 'expanded' : ''}`} >{selectedIndex === index ? '-' : '▼'}</button>
                    </div>
                    {selectedIndex === index && (
                        <div className="collapsible-content">
                            {chatWindowRender(item)}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Documentation;