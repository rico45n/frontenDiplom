import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import root_reduser from "../redusers/RootReduser";
import {logger} from "redux-logger";


let saver = store => next => action => {
    let result=next(action);
    localStorage['RootStore'] = JSON.stringify(store.getState());
    return result
}


let middleware = applyMiddleware(logger, thunkMiddleware, saver);
const store =() => {
    try {
        return JSON.parse(localStorage['RootStore']);
    } catch (err) {
        return undefined;
    }
};
let container = store();

let configStor  = composeWithDevTools(middleware)(createStore)
            (root_reduser,
                container
            );

export default configStor;