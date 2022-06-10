import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'react-speech';
import { useEffect, useState } from 'react';
const axios = require('axios').default;

const Dictaphone = () => {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('es');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  let timerId;

  const translate = () => {
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
   
    const params = new URLSearchParams();
    params.append('q', transcript);
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
        console.log(res.data)
        setOutput(res.data.translatedText)
      })
      console.log('algo');
    },100);
  };



  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        console.log(res.data);
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

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

 
  const style = {
    play: {
      button: {
        width: '28',
        height: '28',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'yellow',
        border: 'solid 1px rgba(255,255,255,1)',
        borderRadius: 6
      },
    }
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <div className="App">
      <div>
      
        From ({from}) :
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}) :
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          value={transcript}
        >
          
        </textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={e=>translate()}>Translate</button>
      </div>
    </div>
    <div>
    <Speech text={output}
    voice="Jorge"
    textAsButton={true}    
    displayText="Text-to-Speech" 
    />
    {document.getElementById('node')}
    </div>
    </div>

    
    
  );
};

export default Dictaphone;
