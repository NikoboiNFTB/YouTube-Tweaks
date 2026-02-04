// ==UserScript==
// @name         YouTube - Add Watch Later List
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @downloadURL  https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/add-wl.user.js
// @version      1.0
// @description  Automatically add &list=WL&index=1 to YouTube video URLs if missing.
// @author       Nikoboi
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const url = new URL(window.location.href);
    const list = url.searchParams.get('list');
    const index = url.searchParams.get('index');

    if (list === 'WL' && index) return;
    if (list === 'WL' && !index) return;
    if (!list) {
        url.searchParams.set('list', 'WL');
        url.searchParams.set('index', '1');
        window.location.replace(url.toString());
    }
})();
