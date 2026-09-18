# MBA Cohort Optimizer

A single static site (`index.html`) for running skill-balanced team formation across
multiple class projects. No server required -- deploys straight to GitHub Pages.

## How it works

- **Admin portal** (visit the site with no `?session=` in the URL, gated by a
  class code): create a **session** per class project, each with its own title and
  its own custom list of relevant skills. Every session gets its own shareable join
  link and its own roster.
- **Public join form** (what students see, via a session's join link): name, email,
  phone, concentration, and top 3 skills (from that session's skill list) with
  self-ratings. Typing an email that's already submitted auto-loads that student's
  info so they can update it instead of creating a duplicate.
- **Roster / Skill Map / Teams**, per session: live skill distribution chart, and a
  "Generate optimized teams" button that balances skill coverage, skill strength, and
  concentration diversity across teams (not random).
- **Email teams**: each generated team has an "Email this team" button that opens a
  pre-filled draft (To: all members, roster in the body) in your default mail app.
  If Outlook is your default mail app, that's what opens -- you review and hit Send.
- **CSV export** of the generated teams (with contact info) for anything else you need.

## Two ways to run it

### 1. Local-only mode (zero setup)
Just open `index.html` (or deploy it as-is). Sessions and submissions are saved to
the browser's local storage on that one device only -- fine for testing, or if
you're the only one entering data. No shared roster across devices.

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
6. Commit and push -- once deployed, sessions and submissions from any device will
   sync live across every device.

**Security note:** this is a no-backend classroom tool, so there's no real login
system. The class code is a light deterrent (it's visible in the page's source to
anyone who looks), not real security -- don't use it for anything sensitive.
- Creating or editing a *session* (an admin action) requires the class code.
- Submitting to a *session's roster* (a student action) does NOT require the class
  code -- anyone with a session's join link can submit or update their own entry,
  by design, so students don't need your code just to join.
- There's no public listing of session IDs; only the admin portal (gated
  client-side by the class code) lists them.
- Hard deletes are disabled entirely (Remove/Archive just hide an entry) so a
  bad-faith request can't wipe data.

## Using it

1. Open the site with no `?session=` param, click **Sign in as admin**, enter
   your class code.
2. Click **New session**, give it a title (e.g. "Fall 2026 Consulting Practicum"),
   and set the skills relevant to that project (starts pre-filled with a default MBA
   skill list you can edit -- add or remove any skill).
3. Click **Copy link** on that session and send it to your students.
4. As students join, watch the roster fill in under that session (live, if Firebase
   is configured). Use the **Skill Map** tab to see coverage, and **Generate
   optimized teams** on the Roster tab when everyone's in.
5. On the Teams tab, click **Email this team** per team to open a pre-filled draft in
   Outlook, or **Export CSV** for a spreadsheet with everyone's contact info.
6. Start a new class project any time with another **New session** -- each keeps its
   own roster and skill list, independent of the others.

## Deploying to GitHub Pages

```bash
git init
git add index.html firebase-config.js firestore.rules README.md
git commit -m "MBA cohort optimizer"
gh repo create mba-cohort-optimizer --public --source=. --remote=origin --push
gh api -X POST repos/{owner}/mba-cohort-optimizer/pages -f "source[branch]=main" -f "source[path]=/"
```

Your site will be live at `https://<your-username>.github.io/mba-cohort-optimizer/`
within a minute or two.

## Making Outlook your default mail app (optional)

If clicking "Email this team" doesn't open Outlook: Windows Settings > Apps > Default
apps > search "Mail" > set Outlook as default for the `mailto` protocol.
