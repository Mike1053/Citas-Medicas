import React from 'react';
import ReactDOM from 'react-dom';
//import './VideoChatCall.css';
import App from '../App/App';
import BrowserUnsupported from '../BrowserUnsupported/BrowserUnsupported';
import DailyIframe from '@daily-co/daily-js';



function VideoChatCall() {
    /*
    ReactDOM.render(
        DailyIframe.supportedBrowser().supported ? <App /> : <BrowserUnsupported />,
        document.getElementById('root')
      );*/
  return (
    <div><App /></div>
  )
}

export default VideoChatCall