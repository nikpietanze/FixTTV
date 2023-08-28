'use strict';

import { state } from "./models/State";
import messageHandler from './handlers/messageHandler';

(async () => {
    if (state.isInstalling) {
        state.isInstalling = false;
        chrome.storage.sync.set(state);
    };

    const sync = chrome.storage.sync.get();
    Object.assign(state, sync);
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
    messageHandler(message, sender, sendResponse, state)
);
