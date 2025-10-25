// ==UserScript==
// @name         Remove WL Banner
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks/
// @version      1.0
// @description  Removes the Watch Later playlist banner and aligns videos fully to the left on the Watch Later page.
// @author       Nikoboi
// @match        https://www.youtube.com/playlist?list=WL
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    const observer = new MutationObserver(() => {
        const browse = document.querySelector('ytd-browse[page-subtype="playlist"]');
        if (!browse) return;

        // Remove the playlist banner
        const banner = browse.querySelector('ytd-playlist-header-renderer');
        if (banner) banner.remove();

        // Set padding of the videos container to 0 to push videos fully left
        document.querySelectorAll('ytd-two-column-browse-results-renderer[page-subtype="playlist"]').forEach(el => {
            el.style.padding = '0';
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
