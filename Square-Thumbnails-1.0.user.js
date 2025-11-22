// ==UserScript==
// @name         YouTube - Un-Rounded Thumbnails
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks/
// @version      1.0
// @description  Removes rounded borders YouTube thumbnails (.ytThumbnailViewModelLarge).
// @author       Nikoboi
// @match        *://*.youtube.com/*
// @run-at       document-idle
// @grant        none
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function() {
    const style = document.createElement('style');
    style.textContent = `
        yt-thumbnail-view-model.ytThumbnailViewModelLarge {
            border-radius: 0 !important;
        }
    `;
    document.head.appendChild(style);
})();
