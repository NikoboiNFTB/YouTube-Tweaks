// ==UserScript==
// @name         YouTube - Disable Timestamp Scroll Up
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @downloadURL  https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/timestamp-no-scroll.user.js
// @version      1.1
// @description  Prevents timestamp clicks from scrolling all the way up.
// @author       Nikoboi
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// @match        *://*.youtube.com/watch*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    function isTimestampLink(a) {
        return (
            a instanceof HTMLAnchorElement &&
            a.closest('ytd-comment-thread-renderer') &&
            a.href.includes('&t=') &&
            /^\d{1,2}:\d{2}(:\d{2})?$/.test(a.textContent.trim())
        );
    }

    function parseTimeFromURL(url) {
        const match = url.match(/[?&]t=(\d+)s?/);
        return match ? parseInt(match[1], 10) : null;
    }

    document.addEventListener('click', function (e) {
        const a = e.target.closest('a');
        if (!a || !isTimestampLink(a)) return;

        const seconds = parseTimeFromURL(a.href);
        if (seconds == null) return;

        const video = document.querySelector('video');
        if (!video) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        video.currentTime = seconds;
        video.play(); // optional, keeps behavior consistent
    }, true);
})();
