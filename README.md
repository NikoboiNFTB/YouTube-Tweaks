# YouTube-Tweaks

A collection of userscripts and a uBlock Origin blocklist to enhance your YouTube browsing experience by customizing the interface and removing unwanted features. Also hides some of SponsorBlock's clutter.

## Overview

This repository contains several user scripts designed to tweak YouTube's interface and functionality. These scripts can be used with Violentmonkey or other compatible user script managers. Additionally, there's a uBlock Origin blocklist to hide various elements from YouTube.

### Scripts Included (in order of creation)

1. **Move Chapters Above Playlist ([install](https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/move-chapters-1.8.user.js))**
   - Moves YouTube's video chapters above the playlist in the video player for easier access.

2. **Un-Rounded Player ([install](https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/square-player-1.4.user.js))**
   - Removes the rounded borders around the YouTube player and restores sharp corners.

3. **Square Thumbnails ([install](https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/square-thumbnails-1.1.user.js))**
   - Makes thumbnails square.

4. **Remove WL Banner ([install](https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/remove-wl-banner-1.0.user.js))**
   - Removes the "Watch Later" playlist banner and fully aligns videos to the left on the Watch Later page.

5. **Add Watch Later List ([install](https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/add-wl-1.0.user.js))**
   - Adds the Watch Later menu next to all videos, not just the ones clicked from Watch Later.

6. **Home Button = Watch Later ([install](https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/home-button-wl-1.0.user.js))**
   - Makes the Home button direct to the Watch Later playlist rather than YouTube home page.

7. **More = Save ([install](https://github.com/NikoboiNFTB/YouTube-Tweaks/raw/refs/heads/main/more-save-1.0.user.js))**
   - Makes the More button into a Save button on YouTube video pages.

### uBlock Origin Blocklist

The repository also includes a blocklist for uBlock Origin to block various YouTube UI elements, such as:

- Shorts in search results
- SponsorBlock chapter upvote/downvote buttons
- "Skip to highlight?" buttons
- Useless video controls in fullscreen mode
- And more...

To use the blocklist, simply copy the contents from the `blocklist.txt` file and import it into your uBlock Origin settings.

## Installation Guide

To install the user scripts:

1. **Install Tampermonkey**: If you don't already have it, download and install [Violentmonkey](https://violentmonkey.github.io/) for your browser.

2. **Add the User Scripts**:
   - Click on the installation links for the scripts you want.
   - Tampermonkey should prompt you to install the script. Click "Install" to proceed.
   
3. **Install the uBlock Origin Blocklist**:
   - Copy the filter list [here](https://raw.githubusercontent.com/NikoboiNFTB/YouTube-Tweaks/main/blocklist.txt).
   - Open your uBlock Origin dashboard.
   - Go to "My filters" tab.
   - Paste the contents there, tweak if needed/wanted.
   - Apply

### Usage

Once you've installed the user scripts and added the uBlock Origin blocklist, your YouTube experience should be enhanced according to the features listed above.

- The **Move Chapters Above Playlist** script will move chapters above the playlist.
- The **Un-Rounded Player** script will change the video player to have sharp corners instead of rounded ones.
- The **Remove WL Banner** script will remove the "Watch Later" playlist banner and left-align videos.

The uBlock Origin blocklist will block various elements from the YouTube UI as described in the blocklist section.

## Contributing

Feel free to fork this repository and submit issues or pull requests if you have any suggestions or improvements. If you encounter any bugs or have feature requests, please open an issue.

## License

This repository is licensed under the [GPLv3 License](LICENSE).
