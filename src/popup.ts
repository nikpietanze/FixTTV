'use strict';

import './css/popup.scss';
import { state } from "./models/State";
import { Popup } from './models/Popup';

// init
(async () => {
    try {
        const sync = chrome.storage.sync.get();
        Object.assign(state, sync);
        await new Popup(state).init();
    } catch (error) {
        console.error(error);
    }
})();
