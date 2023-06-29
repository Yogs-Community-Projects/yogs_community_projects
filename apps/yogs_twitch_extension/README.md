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

## Twitch description

This a community project which shows the members of the Yogscast Stream Team.
Specifically it shows who is currently live and possible future streams.

There are two tabs:

Yogs Tab:

- Shows the Twitch channel that are part of the Yogscast Stream Team
- Shows the current live streamers at the top

Streams Tab

- Shows "all" planned/regular streams from the stream team
- At the top you can switch between week days or jump back to the current day
- Below you can see a list of streams for the currently selected day
- Clicking on a stream will open a popup which shows more information about the stream and a link to the stream and related channel
