// ==UserScript==
// @name         YouTube - Remove WL Banner
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks/
// @downloadURL  https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/remove-wl-banner.user.js
// @version      1.2
// @description  Removes the Watch Later playlist banner and aligns videos fully to the left on the Watch Later page.
// @author       Nikoboi
// @match        *://*.youtube.com/*
// @grant        none
// @run-at       document-idle
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function () {
	"use strict";

	function isWatchLaterPage() {
		return location.pathname === "/playlist" && new URLSearchParams(location.search).get("list") === "WL";
	}

	const observer = new MutationObserver(() => {
		const containers = document.querySelectorAll('ytd-two-column-browse-results-renderer[page-subtype="playlist"]');

		if (!isWatchLaterPage()) {
			// Restore default padding when leaving WL
			containers.forEach((el) => {
				el.style.padding = "";
			});

			return;
		}

		const browse = document.querySelector('ytd-browse[page-subtype="playlist"]');

		if (!browse) return;

		// Remove the playlist banner
		const banner = browse.querySelector("ytd-playlist-header-renderer");

		if (banner) banner.remove();

		// Push videos fully to the left
		containers.forEach((el) => {
			el.style.padding = "0";
		});
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
})();
