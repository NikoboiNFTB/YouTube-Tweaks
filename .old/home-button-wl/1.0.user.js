// ==UserScript==
// @name         YouTube - Home Button = Watch Later
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @downloadURL  https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/home-button-wl.user.js
// @version      1.0
// @description  Changes the YouTube home button to go to your Watch Later playlist instead.
// @author       Nikoboi
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// @match        https://www.youtube.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetHref = '/playlist?list=WL';
    const targetTitle = 'Watch Later';
    let lastPatchTime = 0;

    function patchLogo() {
        const now = performance.now();
        if (now - lastPatchTime < 1000) return; // throttle to once per second
        lastPatchTime = now;

        const logo = document.querySelector('a#logo.yt-simple-endpoint');
        if (!logo) return;

        // Avoid reapplying if already patched
        if (logo.dataset.redirected === 'true') return;

        logo.href = targetHref;
        logo.title = targetTitle;
        logo.setAttribute('aria-label', targetTitle);
        logo.dataset.redirected = 'true';

        logo.addEventListener('click', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            window.location.replace(targetHref);
        }, true);
    }

    // Wait for YouTube to load its UI before patching
    const readyObserver = new MutationObserver(() => {
        const logo = document.querySelector('a#logo.yt-simple-endpoint');
        if (logo) {
            patchLogo();
            // Once we find it, switch to a low-intensity observer
            readyObserver.disconnect();
            const safeObserver = new MutationObserver(patchLogo);
            safeObserver.observe(document.querySelector('ytd-masthead') || document.body, {
                childList: true,
                subtree: true
            });
        }
    });

    readyObserver.observe(document.body, { childList: true, subtree: true });
})();
