// ==UserScript==
// @name         YouTube - The Line Filter
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @version      1.2
// @description  Show only The Line videos that include specific names in the title (channel-aware).
// @author       Nikoboi
// @match        https://www.youtube.com/@qnaline/videos
// @match        https://www.youtube.com/@calltheline/videos
// @match        https://www.youtube.com/feed/subscriptions
// @grant        none
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function () {
    'use strict';

    // Names that MUST appear in the title
    const REQUIRED_TEXT = [
        'Forrest Valkai',
        'Jimmy Snow',
        'Matt Dillahunty',
        'Seth Andrews'
    ];

    // The Line channel identifiers (href prefixes)
    const THE_LINE_CHANNELS = [
        '/@calltheline',
        '/@qnaline'
    ];

    function isTheLineChannel(item) {
        const channelLink = item.querySelector(
            'a[href^="/@"]'
        );

        if (!channelLink) return false;

        const href = channelLink.getAttribute('href');
        return THE_LINE_CHANNELS.some(ch => href.startsWith(ch));
    }

    function getTitle(item) {
        return (
            item.querySelector('#video-title') ||
            item.querySelector('.yt-lockup-metadata-view-model__title span')
        )?.textContent?.trim() || '';
    }

    function nuke(item, title) {
        console.log('Nuking The Line video:', title);
        item.remove();
    }

    function checkItem(item) {
        if (item.dataset.deslopChecked) return;
        item.dataset.deslopChecked = '1';

        if (!isTheLineChannel(item)) return;

        const title = getTitle(item);
        if (!title) return;

        const allowed = REQUIRED_TEXT.some(name => title.includes(name));
        if (!allowed) {
            nuke(item, title);
        }
    }

    function sweep() {
        document
            .querySelectorAll('ytd-rich-item-renderer')
            .forEach(checkItem);
    }

    function observe() {
        const container = document.querySelector('#contents');
        if (!container) {
            setTimeout(observe, 500);
            return;
        }

        const observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (
                        node.nodeType === 1 &&
                        node.tagName === 'YTD-RICH-ITEM-RENDERER'
                    ) {
                        checkItem(node);
                    }
                }
            }
        });

        observer.observe(container, { childList: true, subtree: true });
        console.log('The Line filter observer attached');
    }

    sweep();
    observe();
    setInterval(sweep, 2000);
})();
