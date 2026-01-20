// ==UserScript==
// @name         YouTube - The Line Filter
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @version      1.3
// @description  Filter The Line videos by allowed names on both channel pages and subscriptions.
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

    // The Line channel identifiers (subscriptions-only use)
    const THE_LINE_CHANNELS = [
        '/@calltheline',
        '/@qnaline'
    ];

    const IS_SUBSCRIPTIONS =
        location.pathname === '/feed/subscriptions';

    function getTitle(item) {
        return (
            item.querySelector('#video-title') ||
            item.querySelector('.yt-lockup-metadata-view-model__title span')
        )?.textContent?.trim() || '';
    }

    function isTheLineChannel(item) {
        if (!IS_SUBSCRIPTIONS) return true; // already on the channel page

        const channelLink = item.querySelector('a[href^="/@"]');
        if (!channelLink) return false;

        const href = channelLink.getAttribute('href');
        return THE_LINE_CHANNELS.some(ch => href.startsWith(ch));
    }

    function shouldNuke(item) {
        if (!isTheLineChannel(item)) return false;

        const title = getTitle(item);
        if (!title) return false;

        return !REQUIRED_TEXT.some(name => title.includes(name));
    }

    function checkItem(item) {
        if (item.dataset.lineFiltered) return;
        item.dataset.lineFiltered = '1';

        if (shouldNuke(item)) {
            console.log('Nuking video:', getTitle(item));
            item.remove();
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
        console.log('The Line filter active');
    }

    sweep();
    observe();
    setInterval(sweep, 2000);
})();
