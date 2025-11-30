// ==UserScript==
// @name         YouTube - More -> Save
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @version      1.0
// @author       Nikoboi
// @description  Replaces "More" with "Save" on video pages.
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    "use strict";

    // The original vertical three-dots SVG path
    const TARGET_PATH = "M6 10a2 2 0 100 4 2 2 0 000-4Zm6 0a2 2 0 100 4 2 2 0 000-4Zm6 0a2 2 0 100 4 2 2 0 000-4Z";

    // Your bookmark/save icon
    const REPLACEMENT_SVG = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
            <path d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z"></path>
        </svg>
    `;

    function replaceIcon(svgElem) {
        const pathElem = svgElem?.querySelector("path");
        if (!pathElem) return;
        if (pathElem.getAttribute("d") !== TARGET_PATH) return;

        const wrapper = svgElem.parentNode;
        wrapper.innerHTML = REPLACEMENT_SVG.trim();
    }

    function hijackButton(btn) {
        if (btn.dataset.ytSaveReplaced) return;
        btn.dataset.ytSaveReplaced = "1";

        btn.addEventListener("click", evt => {
            evt.stopImmediatePropagation();
            evt.preventDefault();

            // Open YouTube’s menu so Save exists
            btn.click();

            setTimeout(() => {
                const saveItem = Array.from(
                    document.querySelectorAll("ytd-menu-service-item-renderer")
                ).find(el => el.textContent.trim().toLowerCase() === "save");
                if (saveItem) saveItem.click();
            }, 150);
        });
    }

    function scan() {
        // Icon replacement
        const allSvgs = document.querySelectorAll("svg");
        allSvgs.forEach(svg => replaceIcon(svg));

        // Action override
        const moreButtons = document.querySelectorAll(
            'ytd-menu-renderer button[aria-label="More actions"]'
        );
        moreButtons.forEach(btn => hijackButton(btn));
    }

    // One observer for everything
    const observer = new MutationObserver(scan);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    scan();
})();
