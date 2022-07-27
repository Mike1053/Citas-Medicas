import React, { useContext, useState, useEffect } from 'react';
import CallObjectContext from '../../../CallObjectContext';
import './Chat.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'react-speech';
const axios = require('axios').default;

export default function Chat(props) {
  const callObject = useContext(CallObjectContext);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    callObject.sendAppMessage({ message: inputValue }, '*');
    const name = callObject.participants().local.user_name
      ? callObject.participants().local.user_name
      : 'Guest';
    setChatHistory([
      ...chatHistory,
      {
        sender: name,
        message: inputValue,
      },
    ]);
    setInputValue('');
  }

  /**
   * Update chat state based on a message received to all participants.
   *
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      const participants = callObject.participants();
      const name = participants[event.fromId].user_name
        ? participants[event.fromId].user_name
        : 'Guest';
      setChatHistory([
        ...chatHistory,
        {
          sender: name,
          message: event.data.message,
        },
      ]);
      // Make other icons light up
      props.notification();
    }

    callObject.on('app-message', handleAppMessage);

    return function cleanup() {
      callObject.off('app-message', handleAppMessage);
    };
  }, [callObject, chatHistory]);

  useEffect(() => {}, [chatHistory]);

  {/*Aquí va el pedo del dictaphone----------------------------------------- */}

  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [output, setOutput] = useState('');
  let timerId;

  const translate = (event) => {
    event.preventDefault();
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    const params = new URLSearchParams();
    params.append('q', inputValue);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    clearTimeout(timerId);
    timerId = setTimeout(() => {
        axios.post('https://libretranslate.de/translate',params, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res=>{
        setInputValue(res.data.translatedText)
      })
    },100);
  };

  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        setOptions(res.data);
      });
  }, []);

  const commands = [
    {
      command: '*',
      callback: translate
    }];


    const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  }  = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const isSpeaking = (event) =>{
    event.preventDefault();
    resetTranscript();
    startListening();
  }

  const stopSpeaking = (event) =>{
    event.preventDefault();
    SpeechRecognition.stopListening();
    setInputValue(transcript);
    resetTranscript();
  }

  {/*Aquí va el pedo del dictaphone----------------------------------------- */}

  return props.onClickDisplay ? (
    <div className='chat'>
    <div className="chat-messages">
      {chatHistory.map((entry, index) => (
        <div key={`entry-${index}`} className="messageList">
          <b>{entry.sender}</b>: {entry.message} 
          <Speech text={entry.message}
          voice="Jorge"
          textAsButton={true}    
          displayText="Text-to-Speech" 
    />
        </div>
      ))}
    </div>
    <div className='submit-div'>
      <div className='class-text'>
        Habla para traducir:
      </div>
      <div class="btn-group d-flex justify-content-center">
      <form onSubmit={isSpeaking}>
        <label htmlFor="chatInput"></label>
        <input type="submit" value="Empezar" class="btn btn-success btn-sm mr-1 empezar" />
      </form>
      <form onSubmit={stopSpeaking}>
        <label htmlFor="chatInput"></label>
        <input type="submit" value="Pausar" class="btn btn-danger btn pausar"/>
      </form>
      </div>
      <div className='espacio'></div>
      <div class='d-flex justify-content-center'>
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
         - To - 
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        </div>
        <div className='espacio'></div>
        <div className='centrar'>
        <form onSubmit={translate}>
        <label htmlFor="chatInput"></label>
        <input type="submit" value="Translate" className='btn btn-warning traducir'/>
        </form>
        </div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="chatInput"></label>
        <input
          id="chatInput"
          className="chat-input"
          type="text"
          placeholder="Escribe tu mensaje aqui..."
          value={inputValue}
          onChange={handleChange}
          required
        ></input>
          <input type="submit" value="Enviar" className='send-chat-button btn btn-secondary' />
      </form>
        </div>
    </div>
  ) : null;
}
