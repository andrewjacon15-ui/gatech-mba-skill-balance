// ---------------------------------------------------------------------------
// Fill this in with YOUR Firebase project's config, then commit + push.
// Get it from: Firebase Console > Project settings > General > Your apps > SDK setup and configuration.
// These values are meant to be public (they identify your project, not secrets) --
// access control happens in Firestore security rules (see firestore.rules), not by hiding this file.
//
// Leave apiKey blank to run the app in local-only mode (single device, no shared roster).
// See README.md for full setup steps.
// ---------------------------------------------------------------------------
window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// A shared passcode required to write to the roster (lightweight spam deterrent for
// public write rules) AND to unlock the admin dashboard in the app itself.
// This is NOT strong security -- anyone who reads the page source can see it. It just
// keeps randoms who don't have your class code from writing garbage into your roster
// or casually browsing the class list. Set the SAME value in firestore.rules.
window.CLASS_CODE = "";
