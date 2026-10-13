// ==UserScript==
// @name         YouTube - Disable Autoplay
// @namespace    https://github.com/NikoboiNFTB/YouTube-Tweaks
// @downloadURL  https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/disable-autoplay.user.js
// @version      1.0
// @description  Pause playlist videos just before the end to prevent autoplay.
// @author       Nikoboi
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// @match        *://*.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
	"use strict";

	const CHECK_INTERVAL = 50;
	const END_MARGIN = 0.12;

	let currentVideo = null;
	let lastUrl = location.href;

	function isPlaylist() {
		return new URL(location.href).searchParams.has("list") || !!document.querySelector("ytd-playlist-panel-renderer");
	}

	function stopNearEnd(video) {
		if (!isPlaylist() || video !== currentVideo || video.paused || video.ended || !Number.isFinite(video.duration) || video.duration <= 0) {
			return;
		}

		if (video.duration - video.currentTime <= END_MARGIN) {
			video.pause();
		}
	}

	function check() {
		if (location.href !== lastUrl) {
			lastUrl = location.href;
		}

		const video = document.querySelector("#movie_player video.html5-main-video") || document.querySelector("video");

		if (!video) return;

		// Reuse the element safely across YouTube SPA navigation.
		currentVideo = video;
		stopNearEnd(video);
	}

	function start() {
		check();
		setInterval(check, CHECK_INTERVAL);

		const observer = new MutationObserver(check);

		observer.observe(document, {
			childList: true,
			subtree: true,
		});

		window.addEventListener("yt-navigate-finish", check);
		window.addEventListener("yt-page-data-updated", check);
		window.addEventListener("popstate", check);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", start, {
			once: true,
		});
	} else {
		start();
	}
})();
