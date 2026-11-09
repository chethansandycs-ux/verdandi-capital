/* Verdandi Capital — site script */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* ---------- Portfolio data ----------
     Tvashara and Rattonot are real portfolio companies; their blurb, sector,
     stage and year are still TODO (fill these in from the client).
     The rest are PLACEHOLDER examples: replace or delete before launch. */
  var COMPANIES = [
    { name: "Tvashara", initial: "T", featured: true, sector: "", sectorLabel: "Portfolio company", stage: "Verdandi-backed", year: "",
      blurb: "Building what's next with Verdandi Capital. Company description coming soon." },
    { name: "Rattonot", initial: "R", featured: true, sector: "", sectorLabel: "Portfolio company", stage: "Verdandi-backed", year: "",
      blurb: "Building what's next with Verdandi Capital. Company description coming soon." },
    { name: "Ember Grid", initial: "E", sector: "climate", sectorLabel: "Climate & Energy", stage: "Seed", year: "2026",
      blurb: "Software that lets utilities dispatch home batteries as one virtual power plant." },
    { name: "Loom Robotics", initial: "L", sector: "industrial", sectorLabel: "Industrial", stage: "Pre-seed", year: "2026",
      blurb: "Autonomous textile handling for factories that still sew by hand." },
    { name: "Fjord Ledger", initial: "F", sector: "fintech", sectorLabel: "Fintech", stage: "Seed", year: "2025",
      blurb: "Real-time treasury and settlement rails for cross-border marketplaces." },
    { name: "Sága", initial: "S", sector: "ai", sectorLabel: "Applied AI", stage: "Seed", year: "2025",
      blurb: "Research agents that turn decades of regulatory filings into answers in seconds." },
    { name: "Tidewater Carbon", initial: "T", sector: "climate", sectorLabel: "Climate & Energy", stage: "Pre-seed", year: "2025",
      blurb: "Measurable ocean-alkalinity carbon removal, verified from sensor to registry." },
    { name: "Heimdal", initial: "H", sector: "ai", sectorLabel: "Applied AI", stage: "Seed", year: "2026",
      blurb: "A security layer that watches what AI agents do inside enterprise systems." },
    { name: "Northwind Materials", initial: "N", sector: "industrial", sectorLabel: "Industrial", stage: "Seed", year: "2024",
      blurb: "Low-carbon cement additives made from industrial by-products." },
    { name: "Bifrost Pay", initial: "B", sector: "fintech", sectorLabel: "Fintech", stage: "Pre-seed", year: "2024",
      blurb: "Embedded payroll and payouts for the gig economy in emerging markets." }
  ];

  function companyCard(c) {
    return (
      '<article class="company' + (c.featured ? " is-featured" : "") + '" data-sector="' + c.sector + '">' +
        '<div class="company-top">' +
          '<div class="company-logo" aria-hidden="true">' + c.initial + "</div>" +
          '<span class="company-stage">' + c.stage + "</span>" +
        "</div>" +
        "<h3>" + c.name + "</h3>" +
        "<p>" + c.blurb + "</p>" +
        '<div class="company-meta"><span>' + c.sectorLabel + "</span>" + (c.year ? "<span>Since " + c.year + "</span>" : "") + "</div>" +
      "</article>"
    );
  }

  var grid = document.querySelector("[data-portfolio]");
  if (grid) {
    var limit = parseInt(grid.getAttribute("data-limit"), 10) || COMPANIES.length;
    grid.innerHTML = COMPANIES.slice(0, limit).map(companyCard).join("");
  }

  /* ---------- Portfolio filters ---------- */
  var chips = document.querySelectorAll("[data-filter]");
  var count = document.querySelector("[data-count]");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      var shown = 0;
      document.querySelectorAll(".company").forEach(function (card) {
        var match = f === "all" || card.getAttribute("data-sector") === f;
        card.classList.toggle("is-hidden", !match);
        if (match) shown++;
      });
      if (count) count.textContent = shown + (shown === 1 ? " company" : " companies");
    });
  });
  if (count) count.textContent = COMPANIES.length + " companies";

  /* ---------- Header state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav a").forEach(function (a) { a.addEventListener("click", closeNav); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) { closeNav(); toggle.focus(); }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal, .board, .scribble");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Floating cards parallax (desktop, motion allowed) ---------- */
  var collage = document.querySelector(".collage");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktop = window.matchMedia("(min-width: 901px)");
  if (collage) {
    var notes = collage.querySelectorAll(".note");
    var ticking = false;
    var update = function () {
      ticking = false;
      if (reduce.matches || !desktop.matches) return;
      var r = collage.getBoundingClientRect();
      var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight; // -1..1 around center
      notes.forEach(function (n) {
        var depth = parseFloat(n.getAttribute("data-depth")) || 0.3;
        n.style.transform = "translate3d(0," + (p * depth * -160).toFixed(1) + "px,0)";
      });
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
