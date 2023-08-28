export function handleWiki(url: URL, badChannels: string[]) {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach(iframe => {
        const iframeUrl = new URL(iframe.src);
        if (iframeUrl.host === "embed.twitch.tv") {
            const channel = iframeUrl.searchParams.has("channel") ? iframeUrl.searchParams.get("channel") : "";
            if (badChannels.includes(channel)) {
                //console.log("FixTTV: Wiki embedded channel removed.");
                iframe.remove();
            };
        };
    });
};
