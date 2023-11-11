## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely
be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

### twitch review

Changelog

0.0.8
Updates

- Updated Background colors
  - Updated primary and accent color values
  - Updated background gradient
- Updated Schedule slot layout
  - moved the VOD and Streamer icons to the bottom corners
- Changed the schedule icon
- Added Google Analytics

  0.0.7
  Updates

- Updated the paddings of some ui elements.
- Removed the twitch vod indicator (heart icon) and changed it to a small text saying VOD
- Added an icon to the stream slots indicating if streamers are associated with a stream
- Updated countdown formats
- Added a Donate Button at the top which links to the Jingle Jam page on tiltify.com.
  - Streamer can customize the url in the extension config with their own JJ Tiltify url.
    - The Jingle Jam allows streamers to register a Community Fundraiser with their own donation url.
    - The url must be a tiltify.com url or subdomain. e.g https://jinglejam.tiltify.com
      or https://tiltify.com/my-jj-fundraiser
  - It links to https://jinglejam.tiltify.com by default
  - The Donate Button will only be visible for testing/review purposes and during the Jingle Jam from Dec 1st until
    Dec. 15th.
- Added links to the homepages of the charities on the Charity tab.
  Reasons
- The purpose of the extension is to give as much information about the Jingle Jam which should also include a link to
  the charity donation page.
- The links to the charities are relevant to the extension since they provide more context to the Jingle Jam Charity
  event.

  0.0.6
  Updated capabilities, Allowlist for Image Domains, Added https://assets.jinglejam.no1mann.com
  Reason: In the future the logos for the charities are hosted there.

Extension Description
This is an update to the "Unofficial Jingle Jam Schedule", now renamed to "Jingle Jam Community Extension".
The Jingle Jam is a charity registered in England and Wales.
From now JJ is used to shorten Jingle Jam
This Extension is run by the community and not directly associated with the Jingle Jam.

This Extension is for all streamers who participate in the Jingle Jam and provides information about the JJ described
below.

There are 3 tabs.
Streamers can rearrange or disable tabs.
Streamers can also choose a different color theme for the extension.

The Tabs (in default configuration):

Yogscast Schedule tab

- shows the Yogscast JJ streaming schedule.
- You can click on a stream to get more details on a stream and see who takes part.
- The detail screen can show links to other twitch channels.
- At the bottom is the schedule navigation
- The Navigation allows to go back and forth, filter the schedule and links to a website which shows the whole schedule.
  For demo purposes it shows a Schedule starting from October 15th with random names.
  To see what a "normal" schedule slot looks like, navigate to October 15th and click on the last stream slot.

Charity Tab

- Show the current amount raised during JJ.
- Shows a list of charities that take part in JJ with a short description and the amounts raised for each.
- Links to a website which shows the current amounts in realtime.
- At the top right you can toggle between GBP and USD.
  The current values are all faked for demo purposes.

Community Tab

- Shows a list of community fundraisers (other content creator/streamer) who have (sub-)fundraisers for JJ
- When possible it links to the Twitch Channel of the streamer.
  Currently data from 2022 is shown.
