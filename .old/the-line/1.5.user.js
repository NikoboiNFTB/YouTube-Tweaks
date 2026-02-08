// ==UserScript==
// @name         YouTube - The Line Filter
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @downloadURL  https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/the-line.user.js
// @version      1.5
// @description  Filter The Line videos by allowed names on both channel pages and subscriptions.
// @author       Nikoboi
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/@qnaline/videos
// @match        https://www.youtube.com/@calltheline/videos
// @match        https://www.youtube.com/feed/subscriptions
// @grant        none
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function () {
    'use strict';

    const REQUIRED_TEXT = [
        'Forrest Valkai',
        'Jimmy Snow',
        'Matt Dillahunty',
        'Seth Andrews'
    ];

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
        if (!IS_SUBSCRIPTIONS) return true;

        const channelLink = item.querySelector('a[href^="/@"]');
        if (!channelLink) return false;

        const href = channelLink.getAttribute('href');
        return THE_LINE_CHANNELS.some(ch => href.startsWith(ch));
    }

    function shouldRemove(item) {
        if (!isTheLineChannel(item)) return false;

        const title = getTitle(item);
        if (!title) return false;

        return !REQUIRED_TEXT.some(name => title.includes(name));
    }

    function checkItem(item) {
        const title = getTitle(item);

        if (shouldRemove(item)) {
            console.log('Nuking video:', title);
            item.remove();
        }
    }

    function sweepAll() {
        const container = document.querySelector('#contents');
        if (!container) return;

        const items = container.querySelectorAll('ytd-rich-item-renderer');
        items.forEach(checkItem);
    }

    function observe() {
        const container = document.querySelector('#contents');
        if (!container) {
            setTimeout(observe, 500);
            return;
        }

        const observer = new MutationObserver(() => {
            sweepAll();
        });

        observer.observe(container, { childList: true, subtree: true });
        console.log('The Line filter observer attached');
    }

    // Initial pass
    sweepAll();

    // Watch for new items
    observe();

    // Periodic brute-force sweep to defeat YouTube virtualization
    setInterval(sweepAll, 2000);
})();
