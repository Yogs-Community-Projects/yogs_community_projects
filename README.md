# Yogs Community Projects

### This is a collection of Yogscast related frontend web projects.

*There is currently no plan to release the backend and admin side of these projects*

### General Info

|                    | Tech                                                         | Notes                           |
|--------------------|--------------------------------------------------------------|---------------------------------|
| DB                 | [Firestore](https://firebase.google.com/docs/firestore)      ||
| Hosting            | [Firebase hosting](https://firebase.google.com/docs/hosting) | This might change in the future |
| Frontend Framework | [SolidJS](https://www.solidjs.com/)                          ||
| CSS Framework      | [Tailwind css](https://tailwindcss.com/)                     ||

---

### Packages

This folder contains code shared between all Apps.

#### Common

- code to communicate with the backend
- Utilities used commonly by all apps.

#### CommonUI

Contains SolidJS Components which are used by most Apps

#### Model

Contains the data models used by all apps

---

### Apps

#### Yogs Schedule Website ([schedule.yogs.app](https://schedule.yogs.app))

Site to show currently reoccurring streams from the [Yogscast Stream Team](https://www.twitch.tv/team/yogscast)
It also shows a list of yogs members and their channels.

#### JJ Schedule Website ([jj.yogs.app](https://jj.yogs.app))

Site to display the current and past JJ Schedules

#### Yogs Twitch Extension

Twitch Extension which show the planed Yogs Streams and links to thei Twitch channels of the Yogs Stream Team.

#### JJ Twitch extension

Twitch Extension which show the current JJ Schedule and links to relevant Twitch channels.
