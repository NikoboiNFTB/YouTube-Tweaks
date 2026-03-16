// ==UserScript==
// @name         YouTube - Move Chapters Above Playlist
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks/
// @downloadURL  https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/move-chapters.user.js
// @version      1.8
// @description  YouTube's new UI fucked it up. Incompetent fools. Probably AI generated code.
// @author       Nikoboi
// @match        https://www.youtube.com/*
// @grant        none
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function () {
  'use strict';

  function movePanels() {
    const container = document.querySelector('div#secondary-inner.style-scope.ytd-watch-flexy');
    if (!container) return;

    const panels = container.querySelector('div#panels.style-scope.ytd-watch-flexy');
    const playlist = container.querySelector('ytd-playlist-panel-renderer#playlist.style-scope.ytd-watch-flexy');
    if (!panels || !playlist) return;

    // Only move if the playlist currently comes before the panels
    if (playlist.compareDocumentPosition(panels) & Node.DOCUMENT_POSITION_FOLLOWING) {
      container.insertBefore(panels, playlist);
    }
  }

  // Observe the real parent of both elements
  const observer = new MutationObserver(movePanels);
  observer.observe(document.body, { childList: true, subtree: true });

  // Periodic backup, because YouTube loves breaking MutationObserver consistency
  setInterval(movePanels, 4000);

  // Initial kick
  movePanels();
})();
