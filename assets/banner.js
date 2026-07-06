// Renders the page banner photo from assets/banners.json (edited via the CMS).
// If the file can't load, the CSS defaults stay visible.
(function () {
  var el = document.querySelector(".page-banner");
  if (!el) return;
  var key = "cyclical";
  ["about", "corporate", "private", "contact"].forEach(function (k) {
    if (el.classList.contains("banner-" + k)) key = k;
  });
  fetch("assets/banners.json", { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var b = d && d[key];
      if (!b || !b.src) return;
      var src = String(b.src).replace(/["\\]/g, "");
      el.classList.add("has-photo");
      el.style.setProperty("--banner-img", 'url("' + src + '")');
      var v = /^\d{1,3}%$/.test(b.focus_v || "") ? b.focus_v : "40%";
      el.style.backgroundPosition = "50% " + v;
    })
    .catch(function () { /* keep CSS fallback */ });
})();
