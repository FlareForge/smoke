### Smoke
<p align="center">
  <img width="150" height="150" src="https://github.com/FlareForge/smoke/assets/137607414/33a8a6c7-4d0f-40c9-82c8-9eaaf67d9446">
</p>

An open source video game hub* that plugs into any service.\
*hub = (library + social + emulators + mods)*

## Download
`Warning: Smoke is currently in even more than early alpha, there are a lot of issues, and it's lacking important features.`\
The fastest way to get Smoke is to download the smoke installer [here](https://mgwbnslnolkjpugojhun.supabase.co/storage/v1/object/public/delivery/smoke_installer.exe).

## State of Smoke
Smoke is currently in early development and only available for Windows x64.\
Available features currently:
- Local windows games scanning using [EqualGames](https://github.com/EqualGames/game-scanner)
- Adding custom emulators from settings (need to specify emulator path, name and roms extension)
- Scanning folders for compatible roms
- IGDB Metadata
- Gamepad mapper customizable per game or per emulator (keyboard key selection will be redone as atm it can only press single letter keys)
- Account, Friends & Messaging systems (account creation is closed atm if you want one hit me up)
- Simple interface customization features 
- Overlay using Shift+Backspace shortcut, it's quite empty atm 
- Modules system, every single core part of the application is modular and can be pluged to multiple services at once. For example, once the addon system will be available, one would be able make a Messaging & Friends module that adds a discord integration to the launcher. modules can be ordered & disabled

![image](https://github.com/FlareForge/smoke/assets/137607414/f83870d6-fe50-4675-a64d-c6a2af5d603c)
![image](https://github.com/FlareForge/smoke/assets/137607414/246efd71-12ad-485d-8e75-9c640b015e6a)
![image](https://github.com/FlareForge/smoke/assets/137607414/a3a8abb4-083e-4fc1-b972-3e77fc6a95de)
![image](https://github.com/FlareForge/smoke/assets/137607414/f123945d-0771-47fe-b97b-749605fb223f)
![image](https://github.com/FlareForge/smoke/assets/137607414/3a485541-0577-4059-b428-568900443847)

## More ...
- [Build Smoke](#build-smoke)
- [Issues, Feedback & Suggestions](#issues-feedback--suggestions)
- [Contribute to Smoke](#contribute-to-smoke)
- [Goal](#goal)
- [Credits](#credits)
- [License](#license)

### [Build Smoke](#build-smoke)
Smoke is very easy to build!
- First, make sure you have [Node.js & npm](https://nodejs.org/en) installed.
- Clone the repo and open your terminal in that directory.
- Run `npm install` to install all the dependencies.
- Run `npm run build` to start the build process. use `build:full` to also build the binaries, you will need [Rust](https://www.rust-lang.org/) installed.

You should now have a fresh installer in the .build directory. Note that for now, if you don't want to receive new updates, you need to remove the `publish` option from `package.json -> "build"`.

### [Issues, Feedback & Suggestions](#issues-feedback--suggestions)
Got issues? Have feedback or early suggestions for Smoke? Drop them in this repo. We're all ears for your thoughts and ideas. Remember, it's your insights that help us fine-tune Smoke to perfection.

### [Contribute to Smoke](#contribute-to-smoke)
We're open to contributions! If you want to implement a new feature, support new emulators, or port Smoke to a new device, please first open a suggestion to make sure it's something we would be willing to add!

## [Goal](#goal)
### [Basic Launcher Features](#basic-launcher-features)
Smoke is envisioned to incorporate all standard features of video game launchers like Steam, Epic Games, and GOG Galaxy. We are committed to integrating with other services to minimize ecosystem fragmentation. Expect interoperable features such as friend lists and messaging. Smoke will scan and support games from various sources, including Steam, GOG, manual additions, and potentially the Smoke store. The launcher will also facilitate the installation of necessary applications in the background, enhancing user convenience. Smoke's cross-platform availability will include Windows, Linux, Android, and macOS, with functionality as a primary OS homescreen.

### [Emulators](#emulators)
While not just an emulator frontend, Smoke will be equipped with necessary features for emulation. It will seamlessly integrate, preconfigure, and silently install popular emulators when attempting to run a ROM. Users can add custom emulators, scan for ROMs, and scrape online metadata, with all customizable via add-ons. Smoke aims to unify your gaming library, providing equal features for emulated and native games. Emulators will be preset with higher render scales and modern options to appeal to contemporary gamers, without losing the retro charm.

### [Modding](#modding)
Inspired by the Steam Workshop, Smoke aims to provide a similar modding experience for all moddable games. Game pages will feature a modding section for easy mod installation and management, including automatic game files local backups. Future plans include a platform for modders to submit and showcase their creations, complete with social features like likes and comments. Smoke will also support modding for emulated games, integrating with online mod libraries and allowing for custom library integrations. Recognizing the importance of community contributions, mods and add-ons will feature dedicated pages highlighting their authors and donation options.

### [Social Features](#social-features)
Smoke will feature a unique social component, where each game has its own mini-feed and forum. We're aiming to integrate with existing services for content richness, specifically looking into platforms like Reddit. However, if integration isn't feasible, we'll develop our own forums, focusing on user engagement and relevant content. After Reddit's recent events, we're also considering peer-to-peer forum technologies for stability and independence. Furthermore, an SDK will be provided in the future for games and mods to integrate with Smoke's social features, including a lightweight multiplayer system to add multiplayer capabilities to games without them. This will be complemented by community votes to select the recommended multiplayer mods for these games, creating a more connected and interactive gaming environment.

### [Speedrun & Competition](#speedrun--competition)
Game pages will serve as hubs for news, updates, guides, and live content. For speedrunning, we'll integrate with speedrun.com, providing access to popular runs, world records, and personal statistics, complete with a built-in chronometer overlay. For esports, we'll offer up-to-date information on games, teams, and amateur tournaments, along with integrations for displaying ranked statistics similar to services like op.gg.

### [Controllers](#controllers)
Designed for cross-platform use, Smoke's interface will be fully controller-compatible, offering utilities for key remapping and sharing configurations online.

### [Cloud Gaming](#cloud-gaming)
Smoke will not directly offer cloud gaming, but it will facilitate connections with services like GeForce Now or Xbox Cloud, enabling gameplay on low-end devices through account linking and automated setup processes.

### [Smoke Store](#smoke-store)
The Smoke store will offer comprehensive game purchasing options, aggregating data from various platforms to present the best and most economical purchasing methods. Transparency and user information are key, with plans to feature public domain games and support direct developer donations. Long-term goals include our own game publishing system and a secondary market, aiming to offer fairer conditions in these areas.

### [Customization & Addons](#customization--addons)
Smoke will allow feature deactivation for simplified use and support extensive add-on customization for functionality (excluding interface design, for now). Developers can create modules to enhance or add new functionalities. An in-game overlay, similar to Steam's, will display dynamic game information based on game compatibility with Smoke's local server.

## [Credits](#credits)

Game Scanner: https://github.com/EqualGames/game-scanner

## [License](#license)

This project is licensed under the CC BY-SA 4.0 License, Creative Commons Attribution-ShareAlike 4.0 International.\
For details, see the [LICENSE](LICENSE) file.
