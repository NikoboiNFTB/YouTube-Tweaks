// ==UserScript==
// @name         YouTube - Un-Rounded Player
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks/
// @version      1.2
// @description  Removes rounded borders from the main YouTube player element (#ytd-player).
// @author       Nikoboi
// @match        https://www.youtube.com/watch
// @run-at       document-idle
// @grant        none
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Target the main YouTube player by its ID */
        ytd-player#ytd-player {
            border-radius: 0 !important;
        }
    `;
    document.head.appendChild(style);
})();
