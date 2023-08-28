'use strict';

import { state } from "./models/State";
import messageHandler from './handlers/messageHandler';

(async () => {
    if (!state.isInstalling) {
        try {
            const sync = chrome.storage.sync.get();
            Object.assign(state, sync);
        } catch (error) {
            console.error(error);
        };
    };
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
    messageHandler(message, sender, sendResponse, state)
);
