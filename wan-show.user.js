// ==UserScript==
// @name         YouTube - WAN Show Filter
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @downloadURL  https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/wan-show.user.js
// @version      1.2
// @description  Filters so that only the WAN Show is displayed on the WAN Show channel, disregarding the clips.
// @author       Nikoboi
// @match        https://www.youtube.com/@WANShow/videos
// @match        https://www.youtube.com/feed/subscriptions
// @grant        none
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function () {
  "use strict";

  const REQUIRED_TEXT = ["WAN Show"];

  const THE_LINE_CHANNELS = ["/@WANShow"];

  const IS_SUBSCRIPTIONS = location.pathname === "/feed/subscriptions";

  function getTitle(item) {
    return (
      (
        item.querySelector("#video-title") ||
        item.querySelector(".yt-lockup-metadata-view-model__title span") ||
        item.querySelector("h3 a span") || // ← THIS is your case
        item.querySelector("h3 a")
      )?.textContent // fallback
        ?.trim() || ""
    );
  }
  function isTheLineChannel(item) {
    if (!IS_SUBSCRIPTIONS) return true;

    const channelLink = item.querySelector('a[href^="/@"]');
    if (!channelLink) return false;

    const href = channelLink.getAttribute("href");
    return THE_LINE_CHANNELS.some((ch) => href.startsWith(ch));
  }

  function shouldRemove(item) {
    if (!isTargetChannel(item)) return false;

    const title = getTitle(item);
    if (!title) return true; // ← if we can't read it, kill it

    return !title.startsWith("WAN Show");
  }
  function checkItem(item) {
    const title = getTitle(item);

    if (shouldRemove(item)) {
      console.log("Nuking video:", title);
      item.remove();
    }
  }

  function sweepAll() {
    const container = document.querySelector("#contents");
    if (!container) return;

    const items = container.querySelectorAll("ytd-rich-item-renderer");
    items.forEach(checkItem);
  }

  function observe() {
    const container = document.querySelector("#contents");
    if (!container) {
      setTimeout(observe, 500);
      return;
    }

    const observer = new MutationObserver(() => {
      sweepAll();
    });

    observer.observe(container, { childList: true, subtree: true });
    console.log("The Line filter observer attached");
  }

  // Initial pass
  sweepAll();

  // Watch for new items
  observe();

  // Periodic brute-force sweep to defeat YouTube virtualization
  setInterval(sweepAll, 2000);
})();
