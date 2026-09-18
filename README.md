# MBA Cohort Optimizer

A single static site (`index.html`) that lets students self-submit their contact info
and top skills, then generates skill-balanced teams and lets you email each team
straight from your Outlook. No server required -- deploys straight to GitHub Pages.

## How it works

- **Public join form** (what students see): name, email, phone, concentration, and
  top 3 skills with self-ratings. Typing an email that's already submitted auto-loads
  that student's info so they can update it instead of creating a duplicate.
- **Instructor dashboard** (behind a class-code prompt): full roster, live skill
  distribution chart, and a "Generate optimized teams" button that balances skill
  coverage, skill strength, and concentration diversity across teams (not random).
- **Email teams**: each generated team has an "Email this team" button that opens a
  pre-filled draft (To: all members, roster in the body) in your default mail app.
  If Outlook is your default mail app, that's what opens -- you review and hit Send.
- **CSV export** of the generated teams (with contact info) for anything else you need.

## Two ways to run it

### 1. Local-only mode (zero setup)
Just open `index.html` (or deploy it as-is). Submissions are saved to the browser's
local storage on that one device only -- fine for testing, or if you're the only one
entering data. No shared roster across devices.

### 2. Shared mode (students submit from their own devices)
Requires a free Firebase project as the shared data store (GitHub Pages itself can't
store data centrally -- it just serves static files).

1. Go to https://console.firebase.google.com, create a project (free Spark plan).
2. In the project, go to **Build > Firestore Database > Create database** (start in
   production mode, pick any region).
3. Go to **Firestore Database > Rules**, paste in the contents of
   [`firestore.rules`](firestore.rules), replace `YOUR_CLASS_CODE` with a code you make
   up (e.g. `gt-mba-fall26`), and click **Publish**.
4. Go to **Project settings > General > Your apps**, click the `</>` (web app) icon,
   register an app (no need for Firebase Hosting), and copy the `firebaseConfig` object.
5. Open [`firebase-config.js`](firebase-config.js) and paste those values into
   `window.FIREBASE_CONFIG`. Set `window.CLASS_CODE` to the **same** code you put in
   the Firestore rules in step 3.
6. Commit and push -- once deployed, submissions from any device will sync live to the
   instructor dashboard on every device.

**Security note:** this is a no-backend classroom tool, so there's no real login system.
The class code is a light deterrent (it's visible in the page's source to anyone who
looks), not real security -- don't use it for anything sensitive. Anyone with the join
link can read the roster; only someone with the class code can write to it. Hard
deletes are disabled entirely (Remove just hides an entry) so a bad-faith request can't
wipe the roster.

## Deploying to GitHub Pages

```bash
git init
git add index.html firebase-config.js firestore.rules README.md
git commit -m "MBA cohort optimizer"
gh repo create mba-cohort-optimizer --public --source=. --remote=origin --push
gh api -X POST repos/{owner}/mba-cohort-optimizer/pages -f "source[branch]=main" -f "source[path]=/"
```

Your site will be live at `https://<your-username>.github.io/mba-cohort-optimizer/`
within a minute or two. Share that link with students for the join form; use the
**Instructor dashboard** link at the bottom of the page (with your class code) to see
the roster and generate teams.

## Making Outlook your default mail app (optional)

If clicking "Email this team" doesn't open Outlook: Windows Settings > Apps > Default
apps > search "Mail" > set Outlook as default for the `mailto` protocol.
