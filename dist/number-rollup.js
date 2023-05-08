const p = (e) => {
  let t = [];
  if (e && e.id) {
    const r = A(e);
    r && t.push(r);
  } else
    t = x(e);
  return t.length === 0 && console.warn("number-rollup animation was triggered but no target elements were found"), t;
}, A = (e) => {
  const t = document.getElementById(e.id);
  if (!N(t)) {
    const r = Number(e.startNumber), n = Number(e.endNumber), u = Number(e.duration), b = (n - r) / u, o = g(r, n);
    return {
      domElement: t,
      startNumber: r,
      endNumber: n,
      incrementPerMillisecond: b,
      formatNumber: e.formatNumber,
      direction: o
    };
  }
}, x = (e) => {
  const t = document.querySelectorAll(".number-rollup"), r = [];
  for (let n = 0; n < t.length; n++) {
    const u = t[n];
    if (!N(u)) {
      const c = T(u, e);
      r.push(c);
    }
  }
  return r;
}, T = (e, t) => {
  const r = w(e), u = (r.endNumber - r.startNumber) / r.duration, c = g(r.startNumber, r.endNumber);
  return {
    domElement: e,
    startNumber: r.startNumber,
    endNumber: r.endNumber,
    prefix: r.prefix,
    suffix: r.suffix,
    incrementPerMillisecond: u,
    formatNumber: t ? t.formatNumber : void 0,
    direction: c
  };
}, w = (e) => {
  const t = Number(e.getAttribute("data-number-rollup-start")), r = Number(e.getAttribute("data-number-rollup-end")), n = Number(e.getAttribute("data-number-rollup-duration")), u = e.getAttribute("data-number-rollup-prefix") ? String(e.getAttribute("data-number-rollup-prefix")) : "", c = e.getAttribute("data-number-rollup-suffix") ? String(e.getAttribute("data-number-rollup-suffix")) : "";
  return {
    startNumber: t,
    endNumber: r,
    duration: n,
    prefix: u,
    suffix: c
  };
}, g = (e, t) => e < t ? d.Ascending : d.Descending, d = Object.freeze({
  Ascending: "ascending",
  Descending: "descending"
}), N = (e) => e.classList.contains("number-rollup-is-active"), D = (e, t) => {
  const r = E(t, e);
  let n = e.domElement;
  n.querySelector(".counter-element") && (n = n.querySelector(".counter-element")), n.innerHTML = `${e.prefix || ""}${r}${e.suffix || ""}`;
}, E = (e, t) => {
  let r = h(e, t.endNumber, t.direction);
  return t.formatNumber && (r = t.formatNumber(r)), r;
}, h = (e, t, r) => {
  let n;
  return r === "ascending" ? e < t ? n = e : n = t : r === "descending" ? e > t ? n = e : n = t : console.error("getNumber() not set"), n;
}, v = {
  root: null,
  rootMargin: "0px",
  threshold: 1
};
function S(e) {
  let t, r = new IntersectionObserver((o, i) => {
    o.forEach((s) => {
      if (s.isIntersecting) {
        let m = s.target, a = t.find((l) => l.domElement === m);
        n(a), i.unobserve(m);
      }
    });
  }, v);
  t = p(e), t.forEach((o) => {
    r.observe(o.domElement);
  });
  const n = (o) => {
    u(o.domElement, !0);
    let i = o.startNumber, s = 0, m = performance.now();
    const a = () => {
      const l = performance.now() - m;
      if (l > 0) {
        i = c(o.incrementPerMillisecond, l, i);
        const f = Math.floor(i);
        f != s && (D(o, f), s = f);
      }
      b(i, o.direction, o.endNumber) ? (m = performance.now(), requestAnimationFrame(a)) : u(o.domElement, !1);
    };
    a();
  }, u = (o, i) => {
    const s = "number-rollup-is-active";
    i ? o.classList.add(s) : o.classList.remove(s);
  }, c = (o, i, s) => {
    const m = o * i;
    return s + m;
  }, b = (o, i, s) => i === "ascending" ? o < s : o > s;
}
export {
  S as default
};
