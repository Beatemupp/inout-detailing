// In & Out owner app alerts (DroGo 2026-11-08): shows each pop-up the server sends (edge function "push")
// and puts the number of things waiting on the Home Screen icon. Tapping a pop-up opens the app.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : "" }; }
  const jobs = [self.registration.showNotification(d.title || "In & Out", {
    body: d.body || "", icon: "owner-icon-192.png", badge: "owner-icon-192.png", data: { url: self.registration.scope },
  })];
  if (typeof d.badge === "number" && self.navigator && self.navigator.setAppBadge) {
    jobs.push((d.badge > 0 ? self.navigator.setAppBadge(d.badge) : self.navigator.clearAppBadge()).catch(() => {}));
  }
  e.waitUntil(Promise.all(jobs));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    for (const c of list) if ("focus" in c) return c.focus();
    return self.clients.openWindow(self.registration.scope);
  }));
});
