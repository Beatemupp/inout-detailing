// In & Out Detailing: shared data for the layout (Sprint 1). Everything here is SAMPLE data.
const BIZ = {
  name: "In & Out Detailing",
  email: "inoutdetailing@icloud.com", // no phone number on the website (DroGo 2026-11-03)
  area: ["Knightdale", "Wake Forest", "Youngsville", "Raleigh", "Cary", "Apex", "Brier Creek", "Creedmoor"],
  services: ["Washing", "Waxing", "Buffing", "Vacuuming", "Pressure Washing", "Shampooing"],
  site: "https://inoutdetailing.example", // placeholder until Sprint 3 picks a real address
  payBase: "https://beatemupp.github.io/inout-detailing/",   // customer booking / pay links the owner sends = the public website (went public 2026-11-03)
  cardsLive: false,   // true once the owner's own Stripe account is connected (see "pops"). Until then the public site shows cash / Cash App only. // customer booking / pay links the owner texts (the shared website for now)
};

// Sizes add to the package price. Prices are samples from detailing notes; the owner sets the real ones.
const SIZES = [
  // range = what the website shows for the full inside + outside detail (DroGo 2026-11-02)
  { id: "car", label: "Sedan", sub: "Sedan, coupe", add: 0, range: "$55-60" },
  { id: "suv", label: "SUV / Van", sub: "SUV, minivan", add: 10, range: "$65-75" },
  { id: "big", label: "PickUp / 3-row SUV", sub: "Pickup truck, 3-row SUV", add: 30, range: "$85" },
];

// hide: true = not sold on the website (DroGo 2026-11-02: site sells only the full inside + outside detail + add-ons). Kept for the owner app samples.
const PACKAGES = [
  { id: "quick", name: "Quick Wash", price: 45, time: "45 min", starter: true, hide: true,
    has: ["Hand wash", "Wheels + tires", "Quick dry"] },
  { id: "ext", name: "Outside Shine", price: 70, time: "1-1.5 hrs", hide: true,
    has: ["Hand wash", "Wheels + tires", "Glass", "Spray wax"] },
  { id: "int", name: "Inside Reset", price: 120, time: "1.5-2 hrs", hide: true,
    has: ["Full vacuum", "Wipe down every surface", "Inside glass", "Spot stain removal"] },
  { id: "full", name: "In & Out Full", price: 55, time: "30 min - 2 hrs", best: true,
    has: ["Hand wash", "Wheels + tires", "Glass", "Full vacuum", "Wipe down every surface", "Inside glass", "Spot stain removal", "Tire shine", "Air freshener"] },
];

const ADDONS = [
  { id: "shampoo", name: "Seat + carpet shampoo", price: 25 },
  { id: "wax", name: "Wax", price: 25 },
  { id: "engine", name: "Engine Bay", price: 25 },
  { id: "pw", name: "Pressure wash wheels, wells + mats", price: 25 },
  { id: "buff", name: "Buff + polish", price: 80 },
];

// First detail with In & Out: $10 off (DroGo 2026-10-26). The website takes it off; the owner checks it's their first time.
const FIRST_TIME_OFF = 10;

function price(sizeId, pkgId, addonIds) {
  const s = SIZES.find(x => x.id === sizeId), p = PACKAGES.find(x => x.id === pkgId);
  if (!s || !p) return 0;
  return p.price + s.add + (addonIds || []).reduce((t, id) => t + ((ADDONS.find(a => a.id === id) || {}).price || 0), 0);
}

// Owner's jobs (sample). day 0 = today.
const JOBS = [
  { id: "j1", time: "9:00 AM", name: "Keisha M.", phone: "919-555-0142", car: "2019 Honda Accord", size: "car", pkg: "full",
    adds: ["shampoo"], addr: "112 Hodge Rd, Knightdale, NC", status: "done", paid: "Cash App" },
  { id: "j2", time: "12:30 PM", name: "Marcus T.", phone: "919-555-0178", car: "2021 Ford F-150", size: "suv", pkg: "ext",
    adds: ["pw"], addr: "2400 Wake Forest Rd, Wake Forest, NC", status: "next" },
  { id: "j3", time: "3:30 PM", name: "Dana P.", phone: "984-555-0113", car: "2017 Toyota Sienna", size: "big", pkg: "int",
    adds: ["shampoo"], addr: "640 Holly Springs Rd, Apex, NC", status: "later" },
];

// New booking requests from the website (sample + anything booked on this device).
const REQUESTS = [
  { id: "r1", when: "Sat morning", name: "Andre W.", phone: "919-555-0199", car: "2020 Jeep Wrangler", size: "suv", pkg: "full",
    adds: ["wax"], addr: "Youngsville, NC", note: "Lots of mud from a camping trip", photos: 2 },
];

// Past customers for follow-ups (sample). daysAgo = days since their last detail.
const CUSTOMERS = [
  { name: "Keisha M.", phone: "919-555-0142", car: "Honda Accord", daysAgo: 0, reviewAsked: false },
  { name: "Tony R.", phone: "919-555-0121", car: "Chevy Tahoe", daysAgo: 2, reviewAsked: false },
  { name: "Brianna L.", phone: "984-555-0167", car: "Nissan Altima", daysAgo: 31, reviewAsked: true },
  { name: "Greg S.", phone: "919-555-0154", car: "BMW X5", daysAgo: 38, reviewAsked: true },
  { name: "Lena K.", phone: "919-555-0188", car: "Kia Telluride", daysAgo: 44, reviewAsked: true },
];

// Before/after sets from the owner's app (sample, photos are placeholders).
const CONTENT = [
  { id: "c1", car: "Honda Accord", job: "In & Out Full + shampoo", when: "Today", posted: false },
  { id: "c2", car: "Chevy Tahoe", job: "Inside Reset + shampoo", when: "2 days ago", posted: false },
  { id: "c3", car: "BMW X5", job: "Outside Shine + buff", when: "Last week", posted: true },
];

// Leads come from detailing/leads.md (Sprint 2 reads the file itself).
const LEADS = [
  { name: "Automax of Youngsville", type: "Car lot", area: "Youngsville", phone: "252-430-1006", status: "new", note: "About 100 cars. Biggest lot found" },
  { name: "EMC Auto Sales", type: "Car lot", area: "Wake Forest", phone: "919-263-1750", status: "new", note: "About 21 cars" },
  { name: "Drive 1 Auto Sales", type: "Car lot", area: "Wake Forest", phone: "984-235-4070", status: "new", note: "" },
  { name: "Apex Car & Truck Sales", type: "Car lot", area: "Apex", phone: "919-446-3183", status: "new", note: "About 50 cars" },
  { name: "Braxton at Brier Creek", type: "Apartments", area: "Brier Creek", phone: "", status: "new", note: "Pitch a resident detail day" },
  { name: "The Keaton at Brier Creek", type: "Apartments", area: "Brier Creek", phone: "", status: "new", note: "Has garages" },
  { name: "Howard Hanna Allen Tate", type: "Realtors", area: "Wake Forest", phone: "919-453-5700", status: "new", note: "30+ agents. Ask to pitch at the team meeting" },
];

const money = n => "$" + n.toLocaleString();
const pkgName = id => (PACKAGES.find(p => p.id === id) || {}).name || id;
const addName = id => (ADDONS.find(a => a.id === id) || {}).name || id;

// Small local store so a booking made on the website shows up in the owner's app on the same device.
const store = {
  get(k, d) { try { const v = localStorage.getItem("inout." + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("inout." + k, JSON.stringify(v)); } catch (e) {} },
};

function copyText(text, btn) {
  const done = () => { if (btn) { const t = btn.textContent; btn.textContent = "Copied ✓"; setTimeout(() => btn.textContent = t, 1500); } };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallback());
  else fallback();
  function fallback() {
    const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {} ta.remove(); done();
  }
}

// Customer accounts live on Supabase (free plan, project inout-detailing, DroGo 2026-11-02).
// The publishable key is made to sit in a public web page; the database's privacy rules do the protecting.
const SUPA = { url: "https://suagllhlnwubdetsmiqz.supabase.co", key: "sb_publishable_EnOJOuq3uN1MjKCHkIKa-g_NJvk0dBw" };

// Card payments show on the public site only when cardsLive is true. The private preview link + this PC keep the practice cards for testing.
const CARDS_ON = BIZ.cardsLive === true || (typeof location !== "undefined" && /^(127\.0\.0\.1|localhost|inout-preview\.tail235854\.ts\.net|studio-pc\.tail235854\.ts\.net)$/.test(location.hostname));

// "Remember me" on the logins (DroGo 2026-11-03): on = stay logged in on this device (localStorage), off = logged out when the browser closes (sessionStorage).
// The password-reset helper key always goes to localStorage so the emailed link still works from a new tab.
const REMEMBER_KEY = "inout.rememberMe";
const authStore = {
  remember() { try { return localStorage.getItem(REMEMBER_KEY) !== "0"; } catch (e) { return true; } },
  setRemember(on) { try { localStorage.setItem(REMEMBER_KEY, on ? "1" : "0"); } catch (e) {} },
  getItem(k) { try { const v = sessionStorage.getItem(k); return v !== null ? v : localStorage.getItem(k); } catch (e) { return null; } },
  setItem(k, v) { try { const keep = /code-verifier/.test(k) || authStore.remember(); (keep ? localStorage : sessionStorage).setItem(k, v); (keep ? sessionStorage : localStorage).removeItem(k); } catch (e) {} },
  removeItem(k) { try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch (e) {} },
};
