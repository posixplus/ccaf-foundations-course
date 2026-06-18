/* ============================================================
   CCAF Course – application engine
   Works offline from file://  (no fetch of local files)
   ============================================================ */
(function () {
  "use strict";

  var COURSE = window.COURSE || { modules: [] };
  var QUESTIONS = window.QUESTIONS || { bank: [], scenarios: {} };
  var RESOURCES = window.RESOURCES || { groups: [] };

  /* ---------------- persistent progress ---------------- */
  var PKEY = "ccaf_progress_v1";
  var store = load();
  function load() {
    try { return JSON.parse(localStorage.getItem(PKEY)) || {}; }
    catch (e) { return {}; }
  }
  function save() { try { localStorage.setItem(PKEY, JSON.stringify(store)); } catch (e) {} }
  function markComplete(id) { store[id] = true; save(); }
  function isComplete(id) { return !!store[id]; }

  /* ---------------- helpers ---------------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return (s == null ? "" : String(s)).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec || 0));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function estDur(text) { // seconds, ~2.7 words/sec energetic
    var w = (text || "").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(2.5, w / 2.7);
  }
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }
  function allLessons() {
    var out = [];
    COURSE.modules.forEach(function (m) { (m.lessons || []).forEach(function (l) { out.push({ m: m, l: l }); }); });
    return out;
  }
  function findLesson(id) {
    var f = null;
    COURSE.modules.forEach(function (m) { (m.lessons || []).forEach(function (l) { if (l.id === id) f = { m: m, l: l }; }); });
    return f;
  }
  function lessonIcon(l) {
    if (l.type === "scenario") return "🎬";
    if (l.type === "lab") return "🧪";
    if (l.type === "quiz") return "📝";
    if (l.type === "page") return "📄";
    return "▶";
  }

  /* ---------------- markdown-lite for body content ---------------- */
  function md(s) {
    if (!s) return "";
    // already-HTML blocks pass through if they start with <
    var lines = s.split("\n"), out = [], i, inUl = false, inOl = false, inCode = false, codeBuf = [];
    function closeLists() { if (inUl) { out.push("</ul>"); inUl = false; } if (inOl) { out.push("</ol>"); inOl = false; } }
    function inline(t) {
      t = esc(t);
      t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
      t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      return t;
    }
    for (i = 0; i < lines.length; i++) {
      var ln = lines[i];
      if (/^```/.test(ln)) {
        if (!inCode) { inCode = true; codeBuf = []; closeLists(); }
        else { inCode = false; out.push("<pre><code>" + esc(codeBuf.join("\n")) + "</code></pre>"); }
        continue;
      }
      if (inCode) { codeBuf.push(ln); continue; }
      if (/^### /.test(ln)) { closeLists(); out.push("<h3>" + inline(ln.slice(4)) + "</h3>"); continue; }
      if (/^## /.test(ln)) { closeLists(); out.push("<h2 style='font-size:22px;margin:26px 0 12px'>" + inline(ln.slice(3)) + "</h2>"); continue; }
      if (/^> /.test(ln)) { closeLists(); out.push("<div class='callout'>" + inline(ln.slice(2)) + "</div>"); continue; }
      if (/^\s*[-*] /.test(ln)) { if (!inUl) { closeLists(); out.push("<ul>"); inUl = true; } out.push("<li>" + inline(ln.replace(/^\s*[-*] /, "")) + "</li>"); continue; }
      if (/^\s*\d+\. /.test(ln)) { if (!inOl) { closeLists(); out.push("<ol>"); inOl = true; } out.push("<li>" + inline(ln.replace(/^\s*\d+\. /, "")) + "</li>"); continue; }
      if (/^\s*$/.test(ln)) { closeLists(); continue; }
      closeLists(); out.push("<p>" + inline(ln) + "</p>");
    }
    closeLists();
    return out.join("\n");
  }

  /* ---------------- routing ---------------- */
  function go(hash) { location.hash = hash; }
  function currentRoute() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    return { name: parts[0] || "home", arg: parts[1] || "" };
  }
  window.addEventListener("hashchange", render);

  /* ---------------- sidebar ---------------- */
  var sidebarEl;
  function totalProgressPct() {
    var ls = allLessons(); if (!ls.length) return 0;
    var done = ls.filter(function (x) { return isComplete(x.l.id); }).length;
    return Math.round(100 * done / ls.length);
  }
  function buildSidebar() {
    var s = el("aside", "sidebar"); sidebarEl = s;
    var brand = el("div", "brand");
    brand.innerHTML =
      '<div class="brand-logo" id="homeLink">' +
      '<div class="brand-mark">C</div>' +
      '<div class="brand-text">Claude Certified Architect<small>Foundations · Free Course</small></div>' +
      '</div>' +
      '<div class="progress-wrap"><div class="progress-label"><span>Your progress</span><span id="pctLabel">0%</span></div>' +
      '<div class="progress-bar"><div class="progress-fill" id="pFill"></div></div></div>';
    s.appendChild(brand);

    var nav = el("nav", "nav");
    COURSE.modules.forEach(function (m, mi) {
      var modDone = (m.lessons || []).length && m.lessons.every(function (l) { return isComplete(l.id); });
      var mod = el("div", "nav-module" + (modDone ? " done" : ""));
      mod.dataset.mid = m.id;
      var head = el("button", "nav-module-head");
      head.innerHTML = '<span class="nav-module-num">' + (m.num != null ? m.num : (mi)) + '</span>' +
        '<span>' + esc(m.title) + '</span>' +
        (m.weight ? '<span class="pill orange" style="margin-left:6px">' + m.weight + '%</span>' : '') +
        '<span class="chev">▶</span>';
      head.onclick = function () { mod.classList.toggle("open"); };
      mod.appendChild(head);
      var ll = el("div", "nav-lessons");
      (m.lessons || []).forEach(function (l) {
        var item = el("div", "nav-lesson" + (isComplete(l.id) ? " complete" : ""));
        item.dataset.lid = l.id;
        item.innerHTML = '<span class="tick">' + (isComplete(l.id) ? "✓" : "") + '</span>' +
          '<span class="type-ic">' + lessonIcon(l) + '</span><span>' + esc(l.title) + '</span>';
        item.onclick = function () { go("lesson/" + l.id); closeMobile(); };
        ll.appendChild(item);
      });
      mod.appendChild(ll);
      nav.appendChild(mod);
    });

    // Practice group
    nav.appendChild(staticGroup("Practice & Exam", [
      { ic: "📚", t: "Question Bank (60)", h: "bank" },
      { ic: "⏱️", t: "Full Mock Exam", h: "mock" }
    ]));
    // Reference group
    nav.appendChild(staticGroup("Reference", [
      { ic: "📖", t: "Written Study Guide", h: "guide" },
      { ic: "🗓️", t: "12-Week Study Plan", h: "plan" },
      { ic: "🧪", t: "Hands-on Labs", h: "labs" },
      { ic: "🔗", t: "Official Anthropic Resources", h: "resources" }
    ]));
    s.appendChild(nav);
    return s;
  }
  function staticGroup(title, items) {
    var mod = el("div", "nav-module open");
    var head = el("button", "nav-module-head");
    head.innerHTML = '<span class="nav-module-num">★</span><span>' + esc(title) + '</span><span class="chev">▶</span>';
    head.onclick = function () { mod.classList.toggle("open"); };
    mod.appendChild(head);
    var ll = el("div", "nav-lessons");
    items.forEach(function (it) {
      var item = el("div", "nav-lesson"); item.dataset.route = it.h;
      item.innerHTML = '<span class="type-ic">' + it.ic + '</span><span>' + esc(it.t) + '</span>';
      item.onclick = function () { go(it.h); closeMobile(); };
      ll.appendChild(item);
    });
    mod.appendChild(ll);
    return mod;
  }
  function refreshSidebarState() {
    var pct = totalProgressPct();
    var pf = document.getElementById("pFill"); if (pf) pf.style.width = pct + "%";
    var pl = document.getElementById("pctLabel"); if (pl) pl.textContent = pct + "%";
    var r = currentRoute();
    document.querySelectorAll(".nav-lesson").forEach(function (n) {
      n.classList.toggle("active", (r.name === "lesson" && n.dataset.lid === r.arg) || (n.dataset.route && n.dataset.route === r.name));
      if (n.dataset.lid) {
        n.classList.toggle("complete", isComplete(n.dataset.lid));
        var tk = n.querySelector(".tick"); if (tk) tk.textContent = isComplete(n.dataset.lid) ? "✓" : "";
      }
    });
    document.querySelectorAll(".nav-module").forEach(function (m) {
      if (!m.dataset.mid) return;
      var mod = COURSE.modules.filter(function (x) { return x.id === m.dataset.mid; })[0];
      if (mod && mod.lessons && mod.lessons.length) {
        var done = mod.lessons.every(function (l) { return isComplete(l.id); });
        m.classList.toggle("done", done);
      }
    });
  }
  function openModuleFor(lid) {
    document.querySelectorAll(".nav-module").forEach(function (m) {
      if (m.querySelector('.nav-lesson[data-lid="' + lid + '"]')) m.classList.add("open");
    });
  }
  function closeMobile() { if (sidebarEl) sidebarEl.classList.remove("open"); var sc = document.querySelector(".scrim"); if (sc) sc.remove(); }

  /* ---------------- shell ---------------- */
  var mainEl, viewEl;
  function buildShell() {
    var app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(buildSidebar());
    mainEl = el("div", "main");
    var top = el("div", "topbar");
    top.innerHTML =
      '<button class="ctrl-btn menu-toggle" id="menuBtn" style="width:38px;height:38px">☰</button>' +
      '<div class="crumb" id="crumb"></div><div class="spacer"></div>' +
      '<button class="btn btn-ghost" id="resetBtn" title="Reset progress">↺ Reset</button>';
    mainEl.appendChild(top);
    viewEl = el("div"); viewEl.id = "viewRoot";
    mainEl.appendChild(viewEl);
    app.appendChild(mainEl);

    document.getElementById("homeLink").onclick = function () { go("home"); };
    document.getElementById("menuBtn").onclick = function () {
      sidebarEl.classList.toggle("open");
      if (sidebarEl.classList.contains("open")) { var sc = el("div", "scrim"); sc.onclick = closeMobile; document.body.appendChild(sc); }
      else closeMobile();
    };
    document.getElementById("resetBtn").onclick = function () {
      if (confirm("Reset all course progress and quiz history?")) { store = {}; save(); toast("Progress reset"); render(); }
    };
  }

  /* ---------------- views ---------------- */
  function setCrumb(html) { var c = document.getElementById("crumb"); if (c) c.innerHTML = html; }

  function viewHome() {
    var v = el("div", "view");
    var totalLessons = allLessons().length;
    v.innerHTML =
      '<div class="hero">' +
      '<span class="pill orange">Free · Self-paced · Exam-aligned</span>' +
      '<h1>Pass the Claude Certified Architect&nbsp;–&nbsp;Foundations exam</h1>' +
      '<p class="lead">A complete video-style course covering all five exam domains, with narrated lessons, ' + QUESTIONS.bank.length + ' scenario practice questions, a timed mock exam, hands-on labs, and a 12-week plan. Built straight from the official exam blueprint.</p>' +
      '<div class="hero-cta">' +
      '<button class="btn btn-primary" id="startBtn">▶ Start the course</button>' +
      '<button class="btn" id="mockBtn">⏱️ Try the mock exam</button>' +
      '</div></div>' +
      '<div class="stat-row">' +
      '<div class="stat"><div class="n">5</div><div class="l">Exam domains</div></div>' +
      '<div class="stat"><div class="n">' + totalLessons + '</div><div class="l">Narrated lessons</div></div>' +
      '<div class="stat"><div class="n">' + QUESTIONS.bank.length + '</div><div class="l">Practice questions</div></div>' +
      '<div class="stat"><div class="n">720</div><div class="l">Score to pass /1000</div></div>' +
      '</div>';

    var wcard = el("div", "card");
    wcard.innerHTML = '<div class="eyebrow">Exam blueprint</div><h2 style="font-size:22px;margin:0 0 6px">How the exam is weighted</h2><p class="muted" style="margin:0 0 14px">Your study time should follow these weights. This course is built to match them.</p>';
    var weights = el("div", "weights");
    COURSE.modules.filter(function (m) { return m.weight; }).forEach(function (m) {
      var row = el("div", "weight-row");
      row.innerHTML = '<div class="nm">' + esc(m.title) + '</div><div class="track"><div class="fillb" style="width:' + (m.weight * 2.6) + '%"></div></div><div class="pc">' + m.weight + '%</div>';
      weights.appendChild(row);
    });
    wcard.appendChild(weights);
    v.appendChild(wcard);

    var modcard = el("div", "card");
    modcard.innerHTML = '<div class="eyebrow">Curriculum</div><h2 style="font-size:22px;margin:0 0 14px">What you\'ll learn</h2>';
    var g = el("div", "grid cols-2");
    COURSE.modules.forEach(function (m) {
      var c = el("div", "card"); c.style.cursor = "pointer"; c.style.boxShadow = "none"; c.style.background = "var(--c-cream)";
      c.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span class="nav-module-num">' + (m.num != null ? m.num : "★") + '</span><strong style="font-family:var(--font-head)">' + esc(m.title) + '</strong></div>' +
        '<p class="muted" style="margin:0;font-size:13px">' + esc(m.summary || "") + '</p>' +
        '<p style="margin:8px 0 0;font-size:12px;color:var(--text-faint)">' + (m.lessons || []).length + ' lessons' + (m.weight ? ' · ' + m.weight + '% of exam' : '') + '</p>';
      c.onclick = function () { var first = (m.lessons || [])[0]; if (first) go("lesson/" + first.id); };
      g.appendChild(c);
    });
    modcard.appendChild(g);
    v.appendChild(modcard);

    viewEl.innerHTML = ""; viewEl.appendChild(v);
    setCrumb("<b>Home</b>");
    document.getElementById("startBtn").onclick = function () { var f = allLessons()[0]; if (f) go("lesson/" + f.l.id); };
    document.getElementById("mockBtn").onclick = function () { go("mock"); };
  }

  /* ---------- LESSON PLAYER ---------- */
  var player = null;
  function viewLesson(id) {
    teardownPlayer();
    var fx = findLesson(id);
    if (!fx) { viewHome(); return; }
    var m = fx.m, l = fx.l;
    openModuleFor(id);

    // page / lab / scenario-with-body types render as rich content
    if (l.type === "page" || l.type === "lab" || (l.body && !l.slides)) {
      return viewLessonPage(m, l);
    }

    var v = el("div", "view");
    var idx = allLessons().map(function (x) { return x.l.id; }).indexOf(id);
    var nav = navLinks(idx);

    var meta = el("div", "player-meta");
    meta.innerHTML = '<span class="pill orange">' + esc(m.title) + '</span>' + (l.task ? '<span class="pill">' + esc(l.task) + '</span>' : '') + '<span class="muted" style="font-size:13px">Lesson ' + (idx + 1) + ' of ' + allLessons().length + '</span>';
    v.appendChild(meta);
    v.appendChild(el("h1", null, esc(l.title)));
    if (l.subtitle) v.appendChild(el("p", "lead", esc(l.subtitle)));

    // stage
    var slides = l.slides || [];
    var stage = el("div", "stage");
    slides.forEach(function (s, i) {
      var sl = el("div", "slide" + (s.center ? " center" : "") + (i === 0 ? " show" : ""));
      var inner = "";
      if (s.kicker) inner += '<div class="s-kicker">' + esc(s.kicker) + '</div>';
      if (s.title) inner += '<h2>' + esc(s.title) + '</h2>';
      if (s.big) inner += '<p class="big">' + esc(s.big) + '</p>';
      if (s.bullets) { inner += '<ul>' + s.bullets.map(function (b) { return '<li>' + inlineSlide(b) + '</li>'; }).join("") + '</ul>'; }
      if (s.text) inner += '<p>' + inlineSlide(s.text) + '</p>';
      if (s.code) inner += '<pre style="margin-top:14px"><code>' + esc(s.code) + '</code></pre>';
      sl.innerHTML = inner + '<div class="slide-counter">' + (i + 1) + " / " + slides.length + '</div>';
      stage.appendChild(sl);
    });
    v.appendChild(stage);
    var cap = el("div", "captions"); cap.id = "captions";
    v.appendChild(cap);

    // controls
    var controls = el("div", "controls");
    controls.innerHTML =
      '<button class="ctrl-btn" id="cPrev" title="Previous slide">⏮</button>' +
      '<button class="ctrl-btn play" id="cPlay" title="Play / pause">▶</button>' +
      '<button class="ctrl-btn" id="cNext" title="Next slide">⏭</button>' +
      '<input type="range" class="scrub" id="cScrub" min="0" max="1000" value="0" />' +
      '<span class="time" id="cTime">0:00 / 0:00</span>' +
      '<select class="speed-sel" id="cSpeed"><option value="0.85">0.85×</option><option value="1" selected>1×</option><option value="1.15">1.15×</option><option value="1.3">1.3×</option><option value="1.5">1.5×</option></select>';
    v.appendChild(controls);

    // tabs: transcript / takeaways
    var tabs = el("div", "tabs");
    tabs.innerHTML = '<button class="tab active" data-t="transcript">Transcript</button>' +
      '<button class="tab" data-t="takeaways">Key takeaways</button>' +
      (l.notes ? '<button class="tab" data-t="notes">Deep notes</button>' : '');
    v.appendChild(tabs);

    var tp = el("div", "tab-panel transcript active"); tp.dataset.p = "transcript";
    tp.innerHTML = slides.map(function (s, i) { return '<p data-si="' + i + '"><span class="ts">[' + (i + 1) + ']</span>' + esc(s.say || s.title || "") + '</p>'; }).join("");
    v.appendChild(tp);
    var tk = el("div", "tab-panel"); tk.dataset.p = "takeaways";
    tk.innerHTML = '<div class="card"><h3 style="margin-top:0">Key takeaways</h3><ul>' + (l.takeaways || []).map(function (t) { return '<li style="margin:8px 0">' + inlineSlide(t) + '</li>'; }).join("") + '</ul></div>';
    v.appendChild(tk);
    if (l.notes) { var nt = el("div", "tab-panel"); nt.dataset.p = "notes"; nt.innerHTML = '<div class="card">' + md(l.notes) + '</div>'; v.appendChild(nt); }

    // footer nav + complete
    var foot = el("div", "lesson-foot");
    foot.innerHTML =
      (nav.prev ? '<button class="btn" id="prevLes">← ' + esc(nav.prevTitle) + '</button>' : '<span></span>') +
      '<button class="btn btn-primary" id="doneLes">' + (isComplete(id) ? "✓ Completed — Next →" : "Mark complete & continue →") + '</button>';
    v.appendChild(foot);

    viewEl.innerHTML = ""; viewEl.appendChild(v);
    setCrumb('<b>' + esc(m.title) + '</b> &nbsp;›&nbsp; ' + esc(l.title));

    // wire tabs
    tabs.querySelectorAll(".tab").forEach(function (b) {
      b.onclick = function () {
        tabs.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        v.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.toggle("active", p.dataset.p === b.dataset.t); });
      };
    });
    if (nav.prev) document.getElementById("prevLes").onclick = function () { go("lesson/" + nav.prev); };
    document.getElementById("doneLes").onclick = function () {
      markComplete(id); refreshSidebarState();
      if (nav.next) go("lesson/" + nav.next);
      else { toast("Module complete! 🎉"); go(nav.afterRoute || "home"); }
    };

    setupPlayer(l, slides, stage);
  }

  function inlineSlide(t) {
    t = esc(t);
    t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return t;
  }

  function navLinks(idx) {
    var ls = allLessons();
    var res = { prev: null, next: null, prevTitle: "", afterRoute: "home" };
    if (idx > 0) { res.prev = ls[idx - 1].l.id; res.prevTitle = ls[idx - 1].l.title; }
    if (idx < ls.length - 1) { res.next = ls[idx + 1].l.id; }
    // if next lesson is in a new module and current module is a domain, route to its quiz
    var cur = ls[idx];
    if (cur && cur.m.quizId && (!ls[idx + 1] || ls[idx + 1].m.id !== cur.m.id)) {
      res.afterRoute = "quiz/" + cur.m.id;
    }
    return res;
  }

  /* ---- player core: per-slide audio with TTS fallback ---- */
  function teardownPlayer() {
    if (player) {
      try { player.audio && player.audio.pause(); } catch (e) {}
      try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
      cancelAnimationFrame(player.raf);
      player = null;
    }
  }
  function pickVoice() {
    if (!("speechSynthesis" in window)) return null;
    var vs = speechSynthesis.getVoices() || [];
    var pref = ["Ava", "Samantha", "Tom", "Allison", "Google US English", "Microsoft Aria"];
    for (var p = 0; p < pref.length; p++) {
      for (var i = 0; i < vs.length; i++) if (vs[i].name.indexOf(pref[p]) >= 0) return vs[i];
    }
    return vs.filter(function (v) { return /en[-_]US/i.test(v.lang); })[0] || vs[0] || null;
  }
  function setupPlayer(l, slides, stage) {
    var P = {
      slides: slides, i: 0, playing: false, audio: new Audio(), raf: 0,
      durations: slides.map(function (s) { return estDur(s.say || s.title); }),
      hasAudio: slides.map(function () { return false; }), mode: "idle", l: l
    };
    player = P;
    P.total = P.durations.reduce(function (a, b) { return a + b; }, 0);
    var capEl = document.getElementById("captions");
    var playBtn = document.getElementById("cPlay");
    var scrub = document.getElementById("cScrub");
    var timeEl = document.getElementById("cTime");
    var speedSel = document.getElementById("cSpeed");

    // probe audio files (set hasAudio true on successful metadata)
    slides.forEach(function (s, i) {
      if (!l.audioBase) return;
      var src = l.audioBase + "-" + (i + 1) + ".m4a";
      var a = new Audio();
      a.preload = "metadata";
      a.onloadedmetadata = function () { if (a.duration && isFinite(a.duration)) { P.hasAudio[i] = true; P.durations[i] = a.duration; P.total = P.durations.reduce(function (x, y) { return x + y; }, 0); } };
      a.onerror = function () { P.hasAudio[i] = false; };
      a.src = src; P["probe" + i] = a;
    });

    function showSlide(i) {
      P.i = i;
      stage.querySelectorAll(".slide").forEach(function (sl, k) { sl.classList.toggle("show", k === i); });
      capEl.innerHTML = slides[i].say ? '<span class="cc-label">Caption</span>' + esc(slides[i].say) : "";
      // highlight transcript line
      document.querySelectorAll(".transcript p").forEach(function (p) { p.style.opacity = (p.dataset.si == i ? "1" : ".5"); });
    }
    function elapsedBefore(i) { var t = 0; for (var k = 0; k < i; k++) t += P.durations[k]; return t; }
    function updateTime(frac) {
      var cur = elapsedBefore(P.i) + frac * P.durations[P.i];
      scrub.value = Math.round(1000 * cur / (P.total || 1));
      timeEl.textContent = fmtTime(cur) + " / " + fmtTime(P.total);
    }

    function playSlide(i) {
      stopAudioOnly();
      showSlide(i);
      var rate = parseFloat(speedSel.value) || 1;
      if (l.audioBase && P.hasAudio[i]) {
        P.mode = "audio";
        P.audio = new Audio(l.audioBase + "-" + (i + 1) + ".m4a");
        P.audio.playbackRate = rate;
        P.audio.onended = function () { nextAuto(); };
        P.audio.ontimeupdate = function () { if (P.audio.duration) updateTime(P.audio.currentTime / P.audio.duration); };
        P.audio.play().catch(function () { ttsSpeak(i, rate); });
      } else {
        ttsSpeak(i, rate);
      }
    }
    function ttsSpeak(i, rate) {
      P.mode = "tts";
      var dur = P.durations[i];
      if ("speechSynthesis" in window) {
        try {
          speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(slides[i].say || slides[i].title || "");
          var voice = pickVoice(); if (voice) u.voice = voice;
          u.rate = Math.min(1.5, 1.06 * rate); u.pitch = 1.05;
          u.onend = function () { if (P.mode === "tts" && P.playing) nextAuto(); };
          P.utter = u; speechSynthesis.speak(u);
        } catch (e) {}
      }
      // timed progress fallback (drives scrub + advance even if TTS silent)
      P.tStart = performance.now(); P.tDur = dur * 1000 / rate;
      tick();
    }
    function tick() {
      if (P.mode !== "tts" || !P.playing) return;
      var frac = Math.min(1, (performance.now() - P.tStart) / P.tDur);
      updateTime(frac);
      if (frac >= 1) { nextAuto(); return; }
      P.raf = requestAnimationFrame(tick);
    }
    function stopAudioOnly() {
      try { P.audio && P.audio.pause(); } catch (e) {}
      try { speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
      cancelAnimationFrame(P.raf);
    }
    function nextAuto() {
      if (P.i < slides.length - 1) { if (P.playing) playSlide(P.i + 1); else { showSlide(P.i + 1); updateTime(0); } }
      else { P.playing = false; playBtn.textContent = "↻"; updateTime(1); markComplete(l.id); refreshSidebarState(); }
    }
    function play() { P.playing = true; playBtn.textContent = "❚❚"; if (P.i >= slides.length - 1 && (scrub.value >= 999)) { P.i = 0; } playSlide(P.i); }
    function pause() { P.playing = false; playBtn.textContent = "▶"; stopAudioOnly(); }

    playBtn.onclick = function () { if (P.playing) pause(); else play(); };
    document.getElementById("cPrev").onclick = function () { var n = Math.max(0, P.i - 1); if (P.playing) playSlide(n); else { showSlide(n); updateTime(0); } };
    document.getElementById("cNext").onclick = function () { var n = Math.min(slides.length - 1, P.i + 1); if (P.playing) playSlide(n); else { showSlide(n); updateTime(0); } };
    scrub.oninput = function () {
      var target = (scrub.value / 1000) * P.total, acc = 0, idx = 0;
      for (var k = 0; k < slides.length; k++) { if (acc + P.durations[k] >= target) { idx = k; break; } acc += P.durations[k]; idx = k; }
      if (P.playing) playSlide(idx); else { showSlide(idx); updateTime(0); }
    };
    speedSel.onchange = function () { var r = parseFloat(speedSel.value) || 1; if (P.audio) P.audio.playbackRate = r; };

    showSlide(0); updateTime(0);
  }

  /* ---------- page-style lesson (labs, scenarios with body) ---------- */
  function viewLessonPage(m, l) {
    var v = el("div", "view");
    var idx = allLessons().map(function (x) { return x.l.id; }).indexOf(l.id);
    var nav = navLinks(idx);
    var meta = el("div", "player-meta");
    meta.innerHTML = '<span class="pill orange">' + esc(m.title) + '</span>' + (l.tag ? '<span class="pill">' + esc(l.tag) + '</span>' : '');
    v.appendChild(meta);
    v.appendChild(el("h1", null, esc(l.title)));
    if (l.subtitle) v.appendChild(el("p", "lead", esc(l.subtitle)));
    var c = el("div", "card"); c.innerHTML = md(l.body || ""); v.appendChild(c);
    var foot = el("div", "lesson-foot");
    foot.innerHTML = (nav.prev ? '<button class="btn" id="prevLes">← Previous</button>' : '<span></span>') +
      '<button class="btn btn-primary" id="doneLes">' + (isComplete(l.id) ? "✓ Completed — Next →" : "Mark complete & continue →") + '</button>';
    v.appendChild(foot);
    viewEl.innerHTML = ""; viewEl.appendChild(v);
    setCrumb('<b>' + esc(m.title) + '</b> &nbsp;›&nbsp; ' + esc(l.title));
    if (nav.prev) document.getElementById("prevLes").onclick = function () { go("lesson/" + nav.prev); };
    document.getElementById("doneLes").onclick = function () { markComplete(l.id); refreshSidebarState(); if (nav.next) go("lesson/" + nav.next); else { toast("Done! 🎉"); go("home"); } };
  }

  /* ---------------- QUIZ ENGINE ---------------- */
  function questionsForDomain(d) { return QUESTIONS.bank.filter(function (q) { return q.domain === d; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function viewDomainQuiz(mid) {
    var m = COURSE.modules.filter(function (x) { return x.id === mid; })[0];
    if (!m || !m.domain) { viewHome(); return; }
    var qs = questionsForDomain(m.domain);
    runQuiz({
      title: m.title + " — Domain Quiz",
      subtitle: qs.length + " questions · instant feedback after each answer",
      questions: qs, mode: "practice", crumb: m.title + " › Quiz",
      onDone: function (score) { go("lesson/" + (m.lessons[0] ? m.lessons[0].id : "")); }
    });
  }
  function viewBank() {
    runQuiz({
      title: "Question Bank", subtitle: QUESTIONS.bank.length + " scenario questions · practice mode with full explanations",
      questions: QUESTIONS.bank, mode: "practice", crumb: "Practice › Question Bank"
    });
  }
  function viewMock() {
    // weighted selection ~40 questions by domain weight
    var plan = [[1, 11], [2, 7], [3, 8], [4, 8], [5, 6]]; // domain, count  (=40)
    var qs = [];
    plan.forEach(function (pc) { qs = qs.concat(shuffle(questionsForDomain(pc[0])).slice(0, pc[1])); });
    qs = shuffle(qs);
    runQuiz({
      title: "Full Mock Exam", subtitle: qs.length + " questions · 50 minutes · scored to the 720/1000 bar",
      questions: qs, mode: "exam", timer: 50 * 60, crumb: "Practice › Mock Exam"
    });
  }

  function runQuiz(cfg) {
    teardownPlayer();
    var qs = cfg.questions;
    var state = { i: 0, answers: {}, revealed: {}, flags: {}, start: Date.now(), tLeft: cfg.timer || 0, done: false };
    var v = el("div", "view"); viewEl.innerHTML = ""; viewEl.appendChild(v);
    setCrumb("<b>" + esc(cfg.crumb || cfg.title) + "</b>");

    function render() {
      if (state.done) return renderResults();
      var q = qs[state.i];
      v.innerHTML = "";
      v.appendChild(el("h1", null, esc(cfg.title)));
      v.appendChild(el("p", "lead", esc(cfg.subtitle)));

      if (cfg.mode === "exam") {
        var bar = el("div", "exam-bar");
        bar.innerHTML = '<span class="timer" id="examTimer">' + fmtTime(state.tLeft) + '</span>' +
          '<span class="q-count">Question ' + (state.i + 1) + ' of ' + qs.length + ' &nbsp;·&nbsp; ' + Object.keys(state.answers).length + ' answered</span>' +
          '<button class="btn flag-btn" id="flagBtn">' + (state.flags[q.id] ? "★ Flagged" : "☆ Flag") + '</button>' +
          '<button class="btn btn-primary" id="submitExam">Submit exam</button>';
        v.appendChild(bar);
      }

      var prog = el("div", "q-progress");
      prog.innerHTML = '<span class="muted" style="font-size:13px">Q' + (state.i + 1) + '/' + qs.length + '</span><div class="bar"><i style="width:' + (100 * (state.i + 1) / qs.length) + '%"></i></div>' +
        '<span class="pill">Domain ' + q.domain + '</span>';
      v.appendChild(prog);

      var card = el("div", "q-card");
      var sc = q.scenario && QUESTIONS.scenarios[q.scenario];
      if (sc) card.appendChild(el("div", "q-scenario", "<b>Scenario — " + esc(sc.title) + ":</b> " + esc(sc.context)));
      card.appendChild(el("div", "q-stem", inlineSlide(q.stem)));

      var revealed = cfg.mode === "practice" && state.revealed[q.id];
      var chosen = state.answers[q.id];
      q.options.forEach(function (o) {
        var cls = "opt";
        if (revealed) { if (o.key === q.answer) cls += " correct"; else if (o.key === chosen) cls += " wrong"; }
        else if (o.key === chosen) cls += " sel";
        var op = el("div", cls);
        op.innerHTML = '<span class="key">' + o.key + '</span><span class="otext">' + inlineSlide(o.text) + '</span>';
        op.onclick = function () {
          if (revealed) return;
          state.answers[q.id] = o.key;
          if (cfg.mode === "practice") { state.revealed[q.id] = true; }
          render();
        };
        card.appendChild(op);
      });

      if (revealed) {
        var right = chosen === q.answer;
        var ex = el("div", "explain show " + (right ? "right" : "wrong-ex"));
        ex.innerHTML = '<div class="ex-verdict">' + (right ? "✓ Correct" : "✗ Not quite — correct answer is " + q.answer) + '</div>' + inlineSlide(q.explanation);
        card.appendChild(ex);
      }
      v.appendChild(card);

      var foot = el("div", "q-foot");
      var left = el("div");
      if (state.i > 0) { var pb = el("button", "btn", "← Previous"); pb.onclick = function () { state.i--; render(); }; left.appendChild(pb); }
      foot.appendChild(left);
      var right2 = el("div");
      if (cfg.mode === "practice" && !state.revealed[q.id] && state.answers[q.id]) {
        // already revealed on click; skip
      }
      if (state.i < qs.length - 1) {
        var nb = el("button", "btn btn-primary", "Next →");
        nb.onclick = function () { state.i++; render(); };
        right2.appendChild(nb);
      } else {
        var fb = el("button", "btn btn-primary", cfg.mode === "exam" ? "Review & submit →" : "See results →");
        fb.onclick = function () { finish(); };
        right2.appendChild(fb);
      }
      foot.appendChild(right2);
      v.appendChild(foot);

      if (cfg.mode === "exam") {
        document.getElementById("submitExam").onclick = function () { if (confirm("Submit the exam now? Unanswered questions are marked incorrect.")) finish(); };
        document.getElementById("flagBtn").onclick = function () { state.flags[q.id] = !state.flags[q.id]; render(); };
      }
    }

    function finish() {
      state.done = true; clearInterval(state.tInt); renderResults();
    }

    function renderResults() {
      var correct = 0, byDom = {};
      qs.forEach(function (q) {
        var ok = state.answers[q.id] === q.answer;
        if (ok) correct++;
        byDom[q.domain] = byDom[q.domain] || { c: 0, t: 0 };
        byDom[q.domain].t++; if (ok) byDom[q.domain].c++;
      });
      var pct = Math.round(100 * correct / qs.length);
      var scaled = Math.round(100 + 900 * (correct / qs.length));
      var pass = scaled >= 720;
      v.innerHTML = "";
      var hero = el("div", "result-hero");
      var ring = '<div class="score-ring"><svg viewBox="0 0 120 120" width="150" height="150"><circle cx="60" cy="60" r="52" fill="none" stroke="#e8e6dc" stroke-width="12"/><circle cx="60" cy="60" r="52" fill="none" stroke="' + (pass ? "#5c7a4a" : "#c0533b") + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + (2 * Math.PI * 52) + '" stroke-dashoffset="' + (2 * Math.PI * 52 * (1 - correct / qs.length)) + '" transform="rotate(-90 60 60)"/></svg><div class="val ' + (pass ? "verdict-pass" : "verdict-fail") + '">' + pct + '%</div></div>';
      hero.innerHTML = ring +
        '<h1 style="margin:6px 0">' + (pass ? "Pass! 🎉" : "Keep going 💪") + '</h1>' +
        '<p class="lead">You scored <b>' + correct + '/' + qs.length + '</b> · scaled <b>' + scaled + '/1000</b> ' +
        '<span class="pill ' + (pass ? "green" : "") + '" style="margin-left:6px">' + (pass ? "Above 720 pass bar" : "Below 720 — aim higher") + '</span></p>';
      v.appendChild(hero);

      var db = el("div", "card domain-break");
      db.innerHTML = '<h3 style="margin-top:0">Performance by domain</h3>';
      Object.keys(byDom).sort().forEach(function (d) {
        var o = byDom[d]; var p = Math.round(100 * o.c / o.t);
        var dm = COURSE.modules.filter(function (mm) { return mm.domain == d; })[0];
        var row = el("div", "weight-row");
        row.innerHTML = '<div class="nm">' + esc(dm ? dm.title : "Domain " + d) + '</div><div class="track"><div class="fillb" style="width:' + p + '%;background:' + (p >= 69 ? "#5c7a4a" : "#d97757") + '"></div></div><div class="pc">' + o.c + '/' + o.t + '</div>';
        db.appendChild(row);
      });
      v.appendChild(db);

      // review list
      var rev = el("div", "card"); rev.innerHTML = '<h3 style="margin-top:0">Review your answers</h3>';
      qs.forEach(function (q, n) {
        var ok = state.answers[q.id] === q.answer;
        var item = el("div"); item.style.cssText = "padding:14px 0;border-bottom:1px solid var(--border)";
        item.innerHTML = '<div style="display:flex;gap:10px;align-items:flex-start">' +
          '<span class="opt-key key" style="background:' + (ok ? "#5c7a4a" : "#c0533b") + ';color:#fff;width:24px;height:24px;border-radius:6px;display:grid;place-items:center;flex:0 0 auto;font-weight:600;font-size:12px">' + (ok ? "✓" : "✗") + '</span>' +
          '<div><div style="font-weight:500;font-size:14px">' + (n + 1) + '. ' + inlineSlide(q.stem) + '</div>' +
          '<div style="font-size:13px;color:var(--text-soft);margin-top:6px">Your answer: <b>' + (state.answers[q.id] || "—") + '</b> · Correct: <b>' + q.answer + '</b></div>' +
          '<div class="explain show" style="margin-top:8px">' + inlineSlide(q.explanation) + '</div></div></div>';
        rev.appendChild(item);
      });
      v.appendChild(rev);

      var foot = el("div", "lesson-foot");
      foot.innerHTML = '<button class="btn" id="retry">↺ Retake</button><button class="btn btn-primary" id="homeR">Back to course →</button>';
      v.appendChild(foot);
      document.getElementById("retry").onclick = function () { if (cfg.mode === "exam") viewMock(); else runQuiz(cfg); };
      document.getElementById("homeR").onclick = function () { if (cfg.onDone) cfg.onDone(scaled); else go("home"); };
      window.scrollTo(0, 0);
    }

    if (cfg.mode === "exam" && cfg.timer) {
      state.tInt = setInterval(function () {
        state.tLeft--;
        var t = document.getElementById("examTimer");
        if (t) { t.textContent = fmtTime(state.tLeft); if (state.tLeft < 300) t.classList.add("warn"); }
        if (state.tLeft <= 0) { clearInterval(state.tInt); toast("Time's up!"); finish(); }
      }, 1000);
    }
    render();
  }

  /* ---------------- simple data-driven pages ---------------- */
  function viewGuide() {
    teardownPlayer();
    var v = el("div", "view"); setCrumb("<b>Written Study Guide</b>");
    v.innerHTML = '<div class="eyebrow">Reference</div><h1>Written Study Guide</h1><p class="lead">Every domain distilled into a printable, skimmable reference. Use this for final-week review.</p>';
    COURSE.modules.filter(function (m) { return m.weight; }).forEach(function (m) {
      var c = el("div", "card");
      var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span class="nav-module-num">' + m.num + '</span><h2 style="font-size:21px;margin:0">' + esc(m.title) + '</h2><span class="pill orange">' + m.weight + '%</span></div>';
      (m.lessons || []).forEach(function (l) {
        if (!l.takeaways) return;
        html += '<h3 style="font-size:15px;margin:16px 0 6px">' + esc(l.title) + (l.task ? ' <span class="muted" style="font-weight:400;font-size:12px">(' + esc(l.task) + ')</span>' : '') + '</h3><ul>' +
          l.takeaways.map(function (t) { return '<li style="margin:5px 0;font-size:13.5px">' + inlineSlide(t) + '</li>'; }).join("") + '</ul>';
      });
      c.innerHTML = html; v.appendChild(c);
    });
    viewEl.innerHTML = ""; viewEl.appendChild(v); window.scrollTo(0, 0);
  }
  function viewPlan() {
    teardownPlayer();
    var v = el("div", "view"); setCrumb("<b>12-Week Study Plan</b>");
    v.innerHTML = '<div class="eyebrow">Reference</div><h1>12-Week Study Plan</h1><p class="lead">A realistic part-time schedule (about 4–6 hours/week). Adjust to your pace — the sequence is what matters.</p>';
    var c = el("div", "card");
    (window.STUDY_PLAN || []).forEach(function (w) {
      var row = el("div", "week");
      row.innerHTML = '<div class="wn">Week<br>' + w.week + '</div><div class="wbody"><h4>' + esc(w.title) + '</h4><p>' + inlineSlide(w.detail) + '</p></div>';
      c.appendChild(row);
    });
    v.appendChild(c); viewEl.innerHTML = ""; viewEl.appendChild(v); window.scrollTo(0, 0);
  }
  function viewLabs() {
    teardownPlayer();
    var v = el("div", "view"); setCrumb("<b>Hands-on Labs</b>");
    var labMod = COURSE.modules.filter(function (m) { return m.id === "labs"; })[0];
    v.innerHTML = '<div class="eyebrow">Reference</div><h1>Hands-on Labs</h1><p class="lead">The four official preparation exercises, expanded into guided, copy-paste walkthroughs. Doing these is the single biggest predictor of passing.</p>';
    (labMod ? labMod.lessons : []).forEach(function (l) {
      var c = el("div", "card");
      c.innerHTML = '<h2 style="font-size:19px;margin:0 0 4px">' + esc(l.title) + '</h2>' + (l.tag ? '<span class="pill">' + esc(l.tag) + '</span>' : '') + '<div style="margin-top:8px"><button class="btn btn-primary" data-lid="' + l.id + '">Open lab →</button></div>';
      c.querySelector("button").onclick = function () { go("lesson/" + l.id); };
      v.appendChild(c);
    });
    viewEl.innerHTML = ""; viewEl.appendChild(v); window.scrollTo(0, 0);
  }
  function viewResources() {
    teardownPlayer();
    var v = el("div", "view"); setCrumb("<b>Official Anthropic Resources</b>");
    v.innerHTML = '<div class="eyebrow">Keep learning</div><h1>Official Anthropic Resources</h1><p class="lead">Curated links to Anthropic\'s own documentation, courses, and videos. Open these for primary-source depth beyond this course.</p>';
    (RESOURCES.groups || []).forEach(function (g) {
      var c = el("div", "card");
      var html = '<h2 style="font-size:19px;margin:0 0 4px">' + esc(g.title) + '</h2><p class="muted" style="margin:0 0 12px;font-size:13.5px">' + esc(g.note || "") + '</p>';
      html += '<table class="tbl"><tbody>';
      g.links.forEach(function (lk) {
        html += '<tr><td style="width:34%"><a href="' + esc(lk.url) + '" target="_blank" rel="noopener">' + esc(lk.title) + '</a></td><td class="muted">' + esc(lk.desc) + '</td></tr>';
      });
      html += '</tbody></table>';
      c.innerHTML = html; v.appendChild(c);
    });
    var note = el("div", "callout"); note.innerHTML = '<div class="ttl">Links verified</div>Links point to official Anthropic domains (docs.claude.com, anthropic.com, anthropic.skilljar.com, github.com/anthropics). If a URL ever moves, search its title on docs.claude.com.';
    v.appendChild(note);
    viewEl.innerHTML = ""; viewEl.appendChild(v); window.scrollTo(0, 0);
  }

  /* ---------------- main render ---------------- */
  function render() {
    if (!mainEl) buildShell();
    var r = currentRoute();
    teardownPlayer();
    switch (r.name) {
      case "home": viewHome(); break;
      case "lesson": viewLesson(r.arg); break;
      case "quiz": viewDomainQuiz(r.arg); break;
      case "bank": viewBank(); break;
      case "mock": viewMock(); break;
      case "guide": viewGuide(); break;
      case "plan": viewPlan(); break;
      case "labs": viewLabs(); break;
      case "resources": viewResources(); break;
      default: viewHome();
    }
    refreshSidebarState();
    window.scrollTo(0, 0);
  }

  // voices may load async
  if ("speechSynthesis" in window) { speechSynthesis.onvoiceschanged = function () {}; }

  function boot() {
    if (!window.COURSE || !COURSE.modules.length) {
      document.getElementById("app").innerHTML = '<div style="padding:60px;text-align:center;width:100%"><p>Course data failed to load. Make sure the <code>assets/js</code> files are present.</p></div>';
      return;
    }
    buildShell();
    if (!location.hash) go("home"); else render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
