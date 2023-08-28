export function handleTwitch(url: URL, badChannels: string[]) {
    // homepage
    if (url.pathname === "/") {
        try {
            const watcher = setInterval(() => {
                const channelEls: NodeListOf<HTMLDivElement> = document.querySelectorAll(".tw-transition");

                if (channelEls === null || channelEls.length < 1) {
                    return;
                };

                channelEls.forEach(channel => {
                    parseChannel(channel, badChannels);
                    clearInterval(watcher);
                });
            }, 500);
        } catch (err) {
            console.error(err);
        };
    } else if (url.pathname.startsWith("/directory")) {
        try {
            setInterval(() => {
                const channelBlocks: HTMLDivElement = document.querySelector(".tw-tower");
                const sidebarChannels: NodeListOf<HTMLDivElement> = document.querySelectorAll(".tw-transition");

                if (channelBlocks.childNodes === null || channelBlocks.childNodes.length < 1) {
                    return;
                };

                parseVideoPlayer(badChannels);

                channelBlocks.childNodes.forEach((channel: HTMLDivElement) => {
                    parseChannel(channel, badChannels);
                });
                sidebarChannels.forEach(channel => {
                    parseChannel(channel, badChannels);
                });
            }, 2000);
        } catch (err) {
            console.error(err);
        };
    };
};

function parseVideoPlayer(badChannels: string[]) {
    const videoPlayer: HTMLDivElement = document.querySelector(".video-player");

    if (videoPlayer) {
        const as: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".switcher-channel-info a");

        if (as.length > 0) {
            as.forEach(a => {
                if (badChannels.includes(a.innerText.toLowerCase())) {
                    //console.log(`FixTTV: Removing ${a.innerText} from video player.`)
                    videoPlayer.parentElement.remove();
                };
            });
        };
    };
};

function parseChannel(channel: HTMLDivElement, badChannels: string[]) {
    const ps: NodeListOf<HTMLParagraphElement> = channel.querySelectorAll("p");
    const imgs: NodeListOf<HTMLImageElement> = channel.querySelectorAll("img");

    // channel block
    ps.forEach(p => {
        const title = p.hasAttribute("title") ? p.getAttribute("title") : null;
        if (title && badChannels.includes(title.toLowerCase())) {
            //console.log(`FixTTV: Removing ${title} from channels.`)
            channel.remove();
        };
    });

    // channel on sidebar
    imgs.forEach(img => {
        if (img.alt && badChannels.includes(img.alt.toLowerCase())) {
            //console.log(`FixTTV: Removing ${img.alt} from sidebar channels.`);
            channel.remove();
        };
    });
};
