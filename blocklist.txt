! Title: YouTube Filters by Nikoboi
! Description: Removes various annoyances.
! Homepage: https://block.nikoboi.dev/
! Author: Nikoboi
! License: GNU General Public License v3.0 | https://github.com/NikoboiNFTB/Blocklists/blob/main/LICENSE
! Source: https://block.nikoboi.dev/list/www.youtube.com
! Issues: https://github.com/NikoboiNFTB/Blocklists/issues
! Pull Requests: https://github.com/NikoboiNFTB/Blocklists/pulls
! Last updated: 2026-08-20 23:58 UTC+03:00
! Expires: 7 days

! ========================================
! Start of Filters
! ========================================

! Add to queue, Download, Share and Hide in three dot menu.
www.youtube.com##yt-list-item-view-model:has(span:has-text("Add to queue"))
www.youtube.com##yt-download-list-item-view-model
www.youtube.com##yt-list-item-view-model:has(span:has-text("Share"))
www.youtube.com##yt-list-item-view-model:has(span:has-text("Hide"))

! Settings entries. Read the next, they say what they are.
! www.youtube.com##button.ytp-size-button[aria-label*="Theater mode"]
www.youtube.com##.ytp-menuitem:has(.ytp-menuitem-label:has-text(Sleep timer))
! www.youtube.com##.ytp-menuitem:has(.ytp-menuitem-label:has-text(Stable Volume))
www.youtube.com##.ytp-menuitem:has(.ytp-menuitem-label:has-text(Ambient mode))
www.youtube.com##.ytp-menuitem:has(.ytp-menuitem-label:has-text(Voice boost))

! Posts in Home Feed
www.youtube.com##ytd-rich-section-renderer.style-scope
www.youtube.com##ytd-rich-section-renderer.ytd-rich-grid-renderer

! Shorts in Search
www.youtube.com##grid-shelf-view-model.ytGridShelfViewModelHost:has(span:has-text(Shorts))

! Channel watermark
www.youtube.com##.branding-img

! "Join"
www.youtube.com###sponsor-button

! Verified Badge
www.youtube.com##.ytd-badge-supported-renderer.style-scope.badge-shape-style-type-verified-artist.badge-shape

! Share
www.youtube.com##yt-button-view-model.ytd-menu-renderer

! Replay button
www.youtube.com##.ytp-left-controls > .ytp-prev-button

! Next button
www.youtube.com##.ytp-left-controls > .ytp-next-button

! Volume
! www.youtube.com##.ytp-left-controls > .ytp-volume-area

! "Watch *movie* on YouTube"
www.youtube.com###offer-module

! The game and category info below the descriptions (hopefully only that)
www.youtube.com##.ytd-rich-metadata-row-renderer

! Voice Search Button
www.youtube.com###voice-search-button

! Fullscreen Bottom-Right: Like, Dislike, Comments and Share
www.youtube.com##.ytp-overlay-bottom-right

! Fullscreen Top-Right: Playlist button
www.youtube.com##.ytp-overlay-top-right

! More videos (v)
www.youtube.com##button[aria-label="More videos"]

! Video title in full-screen
www.youtube.com##.ytp-overlay-top-left

! SponsorBlock: Chapter Vote
www.youtube.com###chapterVote

! AI Summary
www.youtube.com###expandable-metadata

! Paid promotion overlay at top-left when starting a video
! www.youtube.com##.ytp-paid-content-overlay-link

! SponsorBlock: "Skip to highlight?"
! www.youtube.com##.skipButtonControlBarContainer

! Members only videos
www.youtube.com##ytd-rich-item-renderer:has(div:has-text("Members only"))

! Upcoming videos. They're not out yet, I don't care. I'll watch them when they're released.
www.youtube.com##ytd-rich-item-renderer:has(div:has-text("Upcoming")):has(div:has-text("Notify me"))

! WAN Show clips
www.youtube.com##ytd-rich-item-renderer:has(a[href*="/@LMGClipsYT"]):not(:has(a.ytLockupMetadataViewModelTitle:has-text("WAN Show")))

! Past live streams, except for the WAN Show. My blocklist bro.
www.youtube.com##ytd-rich-item-renderer:has(span:has-text(Streamed)):has(span:has-text(ago)):not(:has(a[href*="/@WANShowYT"]))

! The Line except the ones with Forrest Valkai
www.youtube.com##ytd-rich-item-renderer:has(a[href*="/@qnaline"], a[href*="/@calltheline"]):not(:has(a.ytLockupMetadataViewModelTitle:has-text("Forrest Valkai")))

! Bloatware service worker
||www.youtube.com/s/player/*/worker/echo-worker.js$script,domain=www.youtube.com

! ========================================
! End of Filters
! ========================================
