// ==UserScript==
// @name         YouTube - Filter Specific Names
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @version      1.1
// @description  Show only videos with specific names in the title on selected channels.
// @author       Nikoboi
// @match        https://www.youtube.com/@qnaline/videos
// @match        https://www.youtube.com/@calltheline/videos
// @grant        none
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function () {
    'use strict';

    // List all names you want to allow here
    const REQUIRED_TEXT = ['Forrest Valkai', 'Jimmy Snow', 'Matt Dillahunty'];

    function nukeRenderer(item, title) {
        console.log('Nuking video:', title);
        item.remove();
    }

    function checkItem(item) {
        const titleEl = item.querySelector('#video-title');
        if (!titleEl) return;

        const title = titleEl.textContent.trim();
        const found = REQUIRED_TEXT.some(name => title.includes(name));

        if (!found) {
            nukeRenderer(item, title);
        }
    }

    function sweepContents() {
        const container = document.querySelector('#contents');
        if (!container) {
            setTimeout(sweepContents, 500);
            return;
        }

        const items = container.querySelectorAll('ytd-rich-item-renderer');
        items.forEach(checkItem);
    }

    function observeContents() {
        const container = document.querySelector('#contents');
        if (!container) {
            setTimeout(observeContents, 500);
            return;
        }

        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        const item = node.closest?.('ytd-rich-item-renderer') || node;
                        if (item.tagName === 'YTD-RICH-ITEM-RENDERER') {
                            checkItem(item);
                        }
                    }
                }
            }
        });

        observer.observe(container, { childList: true, subtree: true });
        console.log('Observer attached');
    }

    sweepContents();
    observeContents();
    setInterval(sweepContents, 2000);
})();
