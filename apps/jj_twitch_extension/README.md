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

This is an update to the "Unofficial Jingle Jam Schedule", now renamed to "Jingle Jam Community Extension".
The Jingle Jam is a charity registered in England and Wales.
From now JJ is used to shorten Jingle Jam
This Extension is run by the community and not directly associated with the Jingle Jam.

This Extension is for streamers who participates in the Jingle Jam and provides information about the JJ described below.

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

The extension also works on mobile.
The application to enable ios was send shortly before this submission.

https://images.squarespace-cdn.com/content/v1/5e9ffda024070b085edcd9f2/3a8e89ce-eb69-4e96-8a1a-9cb47ea0ce42/autistica.png?format=2500w
https://images.squarespace-cdn.com/content/v1/5e9ffda024070b085edcd9f2/b731e808-7136-44af-8b1b-4958c6116ee5/CALM.jpg?format=2500w
