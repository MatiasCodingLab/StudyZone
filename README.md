# Matias's Capitals Game

A friendly, personalized web game for practicing U.S. state capitals - built for Matias, but easy for any parent to
customize and run.

It works completely offline in the browser: **no backend, no login, no external API, and no database.** Everything is
saved right on the device using the browser's `localStorage`, and the whole app can be hosted for free on
**GitHub Pages**.

This README is written for a parent who is **not** an experienced developer. Every step is spelled out - copy and paste
where you can!

---

## Table of Contents

1. [What the game does](#what-the-game-does)
2. [Technology used](#technology-used)
3. [Running it on your own computer](#running-it-on-your-own-computer)
4. [How to use the Parent / Admin area](#how-to-use-the-parent--admin-area)
5. [Customizing Practice Regions](#customizing-practice-regions)
6. [Changing timer settings](#changing-timer-settings)
7. [Export / Import configuration and backups](#export--import-configuration-and-backups)
8. [Deploying Matias's Capitals Game to GitHub Pages](#deploying-matiass-capitals-game-to-github-pages)
9. [Updating the game later](#updating-the-game-later)
10. [Setting it up on Matias's laptop](#setting-it-up-on-matiass-laptop)
11. [Installing as an app (PWA)](#installing-as-an-app-pwa)
12. [Progress is stored separately on each device](#progress-is-stored-separately-on-each-device)
13. [Troubleshooting](#troubleshooting)

---

## What the game does

Matias sees one U.S. state at a time and tries to recall its capital - by typing it, or by saying it out loud while a
parent operates the game. The learning method is **active recall with spaced repetition of missed answers**:

- ✅ **Correct** → that state is done for this round (mastered).
- ❌ **Wrong or Skipped** → that state comes back later, after at least a couple of other states, so it's never asked
  twice in a row.
- The round only ends once **every** state has eventually been answered correctly.

A friendly, original Panda mascot reacts along the way - and a parent can always step in with **Mark Correct** /
**Mark Missed** buttons to run a fully verbal quiz session.

## Technology used

- **React** + **TypeScript**
- **Vite** (build tool and dev server)
- **React Router** (`HashRouter`, so it works reliably on GitHub Pages)
- **Vitest** + **React Testing Library** (automated tests)
- **vite-plugin-pwa** (optional installable app support)

No backend, no database, no external API calls, and no login - everything runs entirely in the browser.

## Running it on your own computer

You'll need [Node.js](https://nodejs.org/) installed (version 20 or newer is recommended). Then, from a terminal in
this project folder:

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

Other useful commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts a local development server with live reload |
| `npm run build` | Builds the production-ready site into a `dist` folder |
| `npm run preview` | Serves the built `dist` folder locally, so you can double-check a build |
| `npm run test` | Runs the automated test suite |
| `npm run lint` | Checks the code for common problems |

## How to use the Parent / Admin area

Click the small **gear icon** in the top-right corner of the app. To avoid Matias entering it by accident, you must
either:

- **Press and hold** the "Hold for Parent / Admin" button for about 2 seconds, or
- Use the **"Can't hold the button? Tap here instead"** link, which asks you to confirm.

There's no password - this is just a light "kid-proof" gate, not real security.

Inside, there are five tabs:

- **States & Capitals** - edit any state's name, capital, region, or enabled status; add custom entries; delete custom
  entries; restore the original defaults.
- **Practice Regions** - rename, enable/disable, reorder, add, or delete Practice Regions, and move any state to a
  different region.
- **Profile & Settings** - change Matias's display name and toggle Panda animations/sounds, celebration effects,
  confetti, fuzzy spelling tolerance, and the All Regions Challenge.
- **Import / Export** - back up or restore configuration and progress (see below).
- **Progress Dashboard** - a lightweight, encouraging overview of how practice is going per region.

## Customizing Practice Regions

Practice Regions are just **editable study groups** - not fixed geography. In the **Practice Regions** tab you can:

- Rename a region (e.g. "West" → "Western States") without breaking any state assignments - regions are matched by a
  stable internal ID, not by name.
- Create a brand new region.
- Delete a region (only once it has no states left assigned to it).
- Reorder regions (they appear on the Home screen in this order).
- Enable or disable a region - disabled regions are hidden from the Home screen and excluded from **All Regions
  Challenge**.
- Move any state into a different region using the dropdown next to it in the "Assign States to Regions" section.

Region state counts on the Home screen always reflect the current configuration - if you move Colorado out of "West,"
the Home screen immediately shows the updated count.

## Changing timer settings

When Matias picks a region, he (or a parent) sees a **Practice Setup** screen before the quiz starts:

- **Recall Timer** - `No Timer`, `10 sec - Learn`, `8 sec - Practice`, `5 sec - Quick Recall`, `4 sec - Fast Recall`,
  `3 sec - Speed Challenge`, or `Custom` (any whole number from 1-30 seconds).
- The very first time, the timer defaults to **8 seconds**. After that, the **last timer used for that specific
  region** is remembered automatically - so "West" and "Northeast" can have different remembered speeds.
- **Strict Timer** (default **off**) - when off, running out of time just shows "Time!" but still lets Matias answer,
  and simply records whether he was within the target time. When on, running out of time automatically counts the
  state as missed, briefly shows the correct capital, and moves on.

## Export / Import configuration and backups

Found in **Parent / Admin → Import / Export**:

- **Export Configuration** - saves states, capitals, and Practice Regions as a `.json` file. Use this to copy your
  customized study content to another computer (like Matias's laptop).
- **Export Full Backup** - everything in Configuration, **plus** Matias's profile, progress, timer preferences, and
  recent misses. Use this to move the *entire* setup to another device.
- **Import Configuration** / **Import Full Backup** - choose a file or paste JSON text. The app checks that the data
  looks valid before doing anything, and always asks you to confirm before overwriting what's currently stored.
- **Restore Defaults** (in the States & Capitals tab) - resets states, capitals, and regions back to the original
  50-state setup. This requires confirmation too.

---

## Deploying Matias's Capitals Game to GitHub Pages

This is the important part for actually getting Matias his own link to play at. It only needs to be done once - after
that, updates happen automatically every time you push a change (see [Updating the game later](#updating-the-game-later)).

### 1. Create a GitHub account

If you don't already have one, go to [github.com](https://github.com) and sign up for a free account. Skip this step
if you already have one.

### 2. Create the repository

A "repository" is just a project folder that lives on GitHub. On GitHub, click **New repository** and:

- Give it a name, for example: `matias-capitals-game`
- Set the visibility to **Public**. (GitHub Pages is free for public repositories on a personal account, which covers
  the vast majority of parents using this project. If your account has GitHub Pages enabled for private repositories
  through a paid plan, that also works fine - just note this project does not require any paid features.)
- You don't need to add a README, `.gitignore`, or license here - this project already includes them.

### 3. Upload/push the project

You have two options. **Option A (GitHub Desktop) is recommended if you're not comfortable with the command line.**

#### Option A - Using GitHub Desktop (recommended for beginners)

1. Install [GitHub Desktop](https://desktop.github.com/) and open it.
2. Sign in with your GitHub account.
3. Choose **File → Add Local Repository**, and select this project's folder on your computer.
4. If prompted that it's not yet a Git repository, choose **create a repository** here.
5. Click **Publish repository**, and pick the repository name you created in Step 2 (or let GitHub Desktop create it
   for you directly). Make sure **Keep this code private** is unchecked if you want it public.
6. From now on, whenever you make changes: GitHub Desktop will show them under "Changes." Write a short summary (a
   "commit message"), click **Commit to main**, then click **Push origin**.

#### Option B - Using the Git command line

Open a terminal in this project's folder and run:

```bash
git init
git add .
git commit -m "Initial Matias capitals game"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/matias-capitals-game.git
git push -u origin main
```

> Replace `https://github.com/YOUR-USERNAME/matias-capitals-game.git` with **your own** repository's URL - this is
> just an example format, not a real link. You can copy your repository's exact URL from the green **Code** button on
> its GitHub page.

### 4. Enable GitHub Pages

1. On your repository's GitHub page, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**. (This project already includes the workflow
   file that GitHub will use automatically - you don't need to configure anything else here.)

### 5. Wait for GitHub Actions to deploy

1. Go to the **Actions** tab on your repository's GitHub page.
2. You should see a workflow run called **"Deploy to GitHub Pages"** in progress (or already completed with a green
   checkmark). This normally takes a minute or two.
3. If it shows a red ✕ instead, see [Troubleshooting](#github-actions-failed) below.

### 6. Find the website URL

Once the deployment finishes, go back to **Settings → Pages** - your live URL will be shown at the top, in the format:

```
https://USERNAME.github.io/REPOSITORY-NAME/
```

(This is only an example format - your actual URL will use your GitHub username and the repository name you chose.)

### 7. Open it on Matias's laptop

On Matias's laptop, simply:

1. Open Microsoft Edge or Google Chrome.
2. Go to the GitHub Pages URL from Step 6.
3. Bookmark the page so he can find it easily next time.

## Updating the game later

Whenever you (the parent) make a change to the app - like editing code, or updating this README:

1. **Save** your changes.
2. **Commit** the changes (write a short description of what changed).
3. **Push** to GitHub.
4. GitHub Actions automatically rebuilds and redeploys the site - Matias keeps using the exact same URL.

#### Using GitHub Desktop

1. Open GitHub Desktop - changed files appear under **Changes**.
2. Type a short commit message describing what changed.
3. Click **Commit to main**.
4. Click **Push origin**.

#### Using the command line

```bash
git add .
git commit -m "Update capitals game"
git push
```

> Note: everyday content changes (states, capitals, regions, timer defaults, profile name, etc.) don't require any of
> this - those are made entirely inside the app's **Parent / Admin** area and saved to `localStorage` on that device.
> You only need to commit and push when you change the **code itself**.

## Setting it up on Matias's laptop

1. Open the GitHub Pages URL in Microsoft Edge or Google Chrome (see Step 7 above).
2. **Bookmark it**, so it's easy to find again.
3. Optionally, create a desktop shortcut to the bookmarked page.
4. If you'd like it to feel like a real app instead of a browser tab, see [Installing as an app](#installing-as-an-app-pwa)
   below.

## Installing as an app (PWA)

This project is a Progressive Web App (PWA), so it can be installed like a regular app and used offline after the
first successful visit.

In Microsoft Edge or Google Chrome, look for an **Install app** or **Install this site as an app** option - usually
found either as an icon in the address bar, or under the browser's **⋮** / **...** menu. The exact wording and
location can vary slightly between browser versions, but it's always somewhere near the address bar or main menu.

Once installed, Matias gets a standalone app window and app icon, and the game continues to work (quizzes, timers,
Panda, and local progress) even without an internet connection, as long as it's been opened successfully at least
once while online. Fetching *updates* to the game (new code you've pushed) still requires an internet connection.

## Progress is stored separately on each device

Because everything is saved with `localStorage`, **Matias's laptop and a parent's computer each have their own,
completely separate copy** of settings, configuration, and progress. They do not automatically sync with each other.

To move your setup from one computer to another:

1. On the source computer, go to **Parent / Admin → Import / Export** and click **Export Full Backup** (or **Export
   Configuration** if you only want to copy the study content, not progress).
2. Copy the downloaded `.json` file to the other computer (e.g. by email, USB drive, or cloud storage).
3. On the destination computer, go to **Parent / Admin → Import / Export**, choose the file (or paste its contents),
   and confirm the import.

## Troubleshooting

### GitHub Pages shows a blank page

- Double-check that **Settings → Pages → Source** is set to **GitHub Actions**.
- Check the **Actions** tab to confirm the latest deployment finished successfully (green checkmark).
- Open the browser's developer console (F12) and look for red errors - a common cause is a mismatched base path, but
  this project is configured with a relative build path (`base: './'`) specifically so it works at any GitHub Pages
  subpath without extra configuration.

### GitHub Actions failed

1. Go to the repository's **Actions** tab.
2. Click the failed run (marked with a red ✕).
3. Click the failing job/step to expand its log and see the specific error message.
4. Most failures are caused by a broken code change - fix the issue, then commit and push again; the workflow will
   automatically re-run.

### Changes don't appear on the live site

- Confirm the latest GitHub Actions run finished successfully.
- Do a normal refresh, then a **hard refresh** (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac) to bypass any cached
  version.
- If the game was installed as an app (PWA), close it completely and reopen it - it may need a moment to fetch the
  updated version in the background.

### Matias's progress is missing

- Remember that progress is stored per device via `localStorage` - it does not appear on a different computer unless
  you specifically transfer it.
- If you have a previously exported **Full Backup** `.json` file for that device, restore it via **Parent / Admin →
  Import / Export → Import Full Backup**.
- Progress can also be lost if browser data/history is cleared for that site - exporting occasional backups is a
  good habit.

---

Made with 🐼 for Matias.
