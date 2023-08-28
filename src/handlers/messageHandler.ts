import { State } from "../models/State";

interface Request {
    msg: string;
    data: any | null;
    state: State;
}

interface Response {
    success: boolean,
    error: Error | null,
    data: any | null,
}

export default (
    request: Request,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
    state: State,
): Response | boolean => {
    const { msg, data } = request;
    const res: Response = {
        success: false,
        error: null,
        data: null,
    };
    res.success = true;

    switch (msg) {
        case "getCurrentTab":
            chrome.tabs.query({ active: true }).then((tabs) => {
                sendResponse(tabs[0]);
            });
            return true;
        case 'reloadTabs':
            chrome.tabs.query({}).then((tabs) =>
                tabs.forEach((tab) => {
                    chrome.tabs.reload(tab.id);
                })
            );
            sendResponse(res);
            return true;
        default:
            res.data = { msg: 'No message provided' };
            sendResponse(res);
    };
};
