// ==UserScript==
// @name         Remove Player Border-Radius
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks/
// @version      1.0
// @description  Removes the rounded border from YouTube player. give the player its sharp corners back.
// @match        https://*.youtube.com/*
// @run-at       document-start
// @grant        none
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function() {
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --youtube-extension-border-radius: 0 !important;
        }
        #ytd-player.ytd-watch-flexy,
        ytd-reel-video-renderer .player-container.ytd-reel-video-renderer {
            border-radius: 0 !important;
        }
    `;
    document.head.appendChild(style);
})();
