import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configStor from "./stores/configureStores.js";

const AppPage = document.getElementById('root');
const app =(<Provider store={configStor}>
                <App/>
            </Provider>);

ReactDOM.render(app,AppPage);
serviceWorker.unregister();
