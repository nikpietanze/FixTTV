'use strict';

import { state } from "./models/State";
import { handleTwitch } from "./handlers/twitchHandler";
import { handleWiki } from "./handlers/wikiHandler";

// init
(async () => {
    try {
        const sync = chrome.storage.sync.get();
        Object.assign(state, sync);

        if (state.isEnabled) {
            const tab: chrome.tabs.Tab = await chrome.runtime.sendMessage({ msg: "getCurrentTab" });
            const currentUrl = new URL(tab.url);

            if (currentUrl.hostname === "www.twitch.tv") {
                handleTwitch(currentUrl, state.channels);
            } else if (currentUrl.hostname.endsWith("fextralife.com")) {
                handleWiki(currentUrl, state.channels);
            };
        };
    } catch (error) {
        console.error(error);
    };
})();
