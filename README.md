<br />
<div align="center">
  <a href="https://github.com/lunamoonmoon/MooseTrackerV2">
    <img src="app/public/moose.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Moose Tracker</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/lunamoonmoon/MooseTrackerV2"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

An updated version of the Moose Tracker application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Typescript](https://img.shields.io/badge/Typescript-blue)](https://www.typescriptlang.org/)
- [![React](https://img.shields.io/badge/React-blue)](https://reactjs.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Please follow these instructions on setting up in an IOS/Android simulation.

### For IOS builds

1. `Brew install cocoapods`

2. `cd MooseTrackerV2/app/ios/App`

3. `pod install`

4. `cd ../..`

5. `nvm use 20` && `npm run build`

6. `npx cap sync`

7. `npx cap open ios`

8. In xcode hit play icon

9. Say yes to install suggested tools

10. Select generic ios device and choose some physical device

11. Hit play button and simulator should start

For bringing into testflight
12. In xcode go to product > click archive

13. Then go to window > click organizer

14. validate then distribute (ensure you update the version code)

Tested on xcode 15.0.1

### For Android builds

1. Download the latest android studio (last tested on Android Studio Hedgehog | 2023.1.1 Patch 2)

2. Run android studio and if needed, set the path of the SDK (can be downloaded and linked in preferences -> Languages & Frameworks -> Android SDK )

3. `cd MooseTrackerV2/app`

4. `npx cap sync`

5. `npx cap open android`

6. Find the device manager tab on the sidebar and create a virtual device (tested on medium phone)

7. Select the device in the top dropdown and hit the play button

