import { _ as d } from "./preload-helper.ea511a32.js";
const a = {},
  f = new Set(["Module", "__esModule", "default", "_export_sfc"]);
let c = {
  "./FormApp1": () => (
    p([], !1, "./FormApp1"),
    h("./__federation_expose_FormApp1.816449a6.js").then((e) =>
      Object.keys(e).every((o) => f.has(o)) ? () => e.default : () => e
    )
  ),
};
const l = {},
  p = (e, o, _) => {
    const s = import.meta.url;
    if (typeof s > "u") {
      console.warn(
        'The remote style takes effect only when the build.target option in the vite.config.ts file is higher than that of "es2020".'
      );
      return;
    }
    const i = s.substring(0, s.lastIndexOf("remoteEntry.js"));
    e.forEach((n) => {
      const t = i + n;
      if (!(t in l))
        if (((l[t] = !0), o)) {
          const r = "css__form-app-1__" + _;
          window[r] == null && (window[r] = []), window[r].push(t);
        } else {
          const r = document.head.appendChild(document.createElement("link"));
          (r.href = t), (r.rel = "stylesheet");
        }
    });
  };
async function h(e) {
  return (a[e] ??= d(() => import(e), [])), a[e];
}
const m = (e) => {
    if (!c[e]) throw new Error("Can not find remote module " + e);
    return c[e]();
  },
  b = (e) => {
    (globalThis.__federation_shared__ = globalThis.__federation_shared__ || {}),
      Object.entries(e).forEach(([o, _]) => {
        const s = Object.keys(_)[0],
          i = Object.values(_)[0],
          n = i.scope || "default";
        globalThis.__federation_shared__[n] =
          globalThis.__federation_shared__[n] || {};
        const t = globalThis.__federation_shared__[n];
        (t[o] = t[o] || {})[s] = i;
      });
  };
export { p as dynamicLoadingCss, m as get, b as init };
