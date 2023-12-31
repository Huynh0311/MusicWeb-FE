import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {AudioPlayerProvider} from "./redux/playern/ActionsUseContext/AudioPlayerProvider";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import WebSocketProvider from "./component/WebSocketProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AudioPlayerProvider>
                    <WebSocketProvider>
                    <App/>
                    </WebSocketProvider>
                </AudioPlayerProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
