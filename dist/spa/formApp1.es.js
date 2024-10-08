import { importShared } from "./__federation_fn_import.js";
function injectProp(target, propName, get, set) {
  Object.defineProperty(target, propName, {
    get,
    set,
    enumerable: true
  });
  return target;
}
const { defineComponent, markRaw, reactive: reactive$2 } = await importShared("vue");
function createComponent(raw) {
  return markRaw(defineComponent(raw));
}
await importShared("vue");
function hSlot(slot, otherwise) {
  return slot !== void 0 ? slot() || otherwise : otherwise;
}
function hMergeSlot(slot, source) {
  return slot !== void 0 ? source.concat(slot()) : source;
}
const layoutKey = "_q_l_";
const pageContainerKey = "_q_pc_";
function emptyRenderFn() {
}
const { h: h$2, computed: computed$1, provide: provide$1, inject, getCurrentInstance: getCurrentInstance$3 } = await importShared("vue");
var QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance$3();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPageContainer needs to be child of QLayout");
      return emptyRenderFn;
    }
    provide$1(pageContainerKey, true);
    const style = computed$1(() => {
      const css2 = {};
      if ($layout.header.space === true) {
        css2.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css2.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css2;
    });
    return () => h$2("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
const { ref: ref$2, reactive: reactive$1 } = await importShared("vue");
const isRuntimeSsrPreHydration = ref$2(
  false
);
let preHydrationBrowser;
function getMatch(userAgent2, platformMatch) {
  const match = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(userAgent2) || /(opr)[\/]([\w.]+)/.exec(userAgent2) || /(vivaldi)[\/]([\w.]+)/.exec(userAgent2) || /(chrome|crios)[\/]([\w.]+)/.exec(userAgent2) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent2) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent2) || /(firefox|fxios)[\/]([\w.]+)/.exec(userAgent2) || /(webkit)[\/]([\w.]+)/.exec(userAgent2) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent2) || [];
  return {
    browser: match[5] || match[3] || match[1] || "",
    version: match[4] || match[2] || "0",
    platform: platformMatch[0] || ""
  };
}
function getPlatformMatch(userAgent2) {
  return /(ipad)/.exec(userAgent2) || /(ipod)/.exec(userAgent2) || /(windows phone)/.exec(userAgent2) || /(iphone)/.exec(userAgent2) || /(kindle)/.exec(userAgent2) || /(silk)/.exec(userAgent2) || /(android)/.exec(userAgent2) || /(win)/.exec(userAgent2) || /(mac)/.exec(userAgent2) || /(linux)/.exec(userAgent2) || /(cros)/.exec(userAgent2) || /(playbook)/.exec(userAgent2) || /(bb)/.exec(userAgent2) || /(blackberry)/.exec(userAgent2) || [];
}
const hasTouch = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function getPlatform(UA) {
  const userAgent2 = UA.toLowerCase();
  const platformMatch = getPlatformMatch(userAgent2);
  const matched = getMatch(userAgent2, platformMatch);
  const browser = {
    mobile: false,
    desktop: false,
    cordova: false,
    capacitor: false,
    nativeMobile: false,
    electron: false,
    bex: false,
    linux: false,
    mac: false,
    win: false,
    cros: false,
    chrome: false,
    firefox: false,
    opera: false,
    safari: false,
    vivaldi: false,
    edge: false,
    edgeChromium: false,
    ie: false,
    webkit: false,
    android: false,
    ios: false,
    ipad: false,
    iphone: false,
    ipod: false,
    kindle: false,
    winphone: false,
    blackberry: false,
    playbook: false,
    silk: false
  };
  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version, 10);
  }
  if (matched.platform) {
    browser[matched.platform] = true;
  }
  const knownMobiles = browser.android || browser.ios || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"];
  if (knownMobiles === true || userAgent2.indexOf("mobile") !== -1) {
    browser.mobile = true;
  } else {
    browser.desktop = true;
  }
  if (browser["windows phone"]) {
    browser.winphone = true;
    delete browser["windows phone"];
  }
  if (browser.edga || browser.edgios || browser.edg) {
    browser.edge = true;
    matched.browser = "edge";
  } else if (browser.crios) {
    browser.chrome = true;
    matched.browser = "chrome";
  } else if (browser.fxios) {
    browser.firefox = true;
    matched.browser = "firefox";
  }
  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }
  if (browser.vivaldi) {
    matched.browser = "vivaldi";
    browser.vivaldi = true;
  }
  if (browser.chrome || browser.opr || browser.safari || browser.vivaldi || browser.mobile === true && browser.ios !== true && knownMobiles !== true) {
    browser.webkit = true;
  }
  if (browser.opr) {
    matched.browser = "opera";
    browser.opera = true;
  }
  if (browser.safari) {
    if (browser.blackberry || browser.bb) {
      matched.browser = "blackberry";
      browser.blackberry = true;
    } else if (browser.playbook) {
      matched.browser = "playbook";
      browser.playbook = true;
    } else if (browser.android) {
      matched.browser = "android";
      browser.android = true;
    } else if (browser.kindle) {
      matched.browser = "kindle";
      browser.kindle = true;
    } else if (browser.silk) {
      matched.browser = "silk";
      browser.silk = true;
    }
  }
  browser.name = matched.browser;
  browser.platform = matched.platform;
  {
    if (userAgent2.indexOf("electron") !== -1) {
      browser.electron = true;
    } else if (document.location.href.indexOf("-extension://") !== -1) {
      browser.bex = true;
    } else {
      if (window.Capacitor !== void 0) {
        browser.capacitor = true;
        browser.nativeMobile = true;
        browser.nativeMobileWrapper = "capacitor";
      } else if (window._cordovaNative !== void 0 || window.cordova !== void 0) {
        browser.cordova = true;
        browser.nativeMobile = true;
        browser.nativeMobileWrapper = "cordova";
      }
      if (isRuntimeSsrPreHydration.value === true) {
        preHydrationBrowser = { is: { ...browser } };
      }
      if (hasTouch === true && browser.mac === true && (browser.desktop === true && browser.safari === true || browser.nativeMobile === true && browser.android !== true && browser.ios !== true && browser.ipad !== true)) {
        delete browser.mac;
        delete browser.desktop;
        const platform = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
        Object.assign(browser, {
          mobile: true,
          ios: true,
          platform,
          [platform]: true
        });
      }
      if (browser.mobile !== true && window.navigator.userAgentData && window.navigator.userAgentData.mobile) {
        delete browser.desktop;
        browser.mobile = true;
      }
    }
  }
  return browser;
}
const userAgent = navigator.userAgent || navigator.vendor || window.opera;
const ssrClient = {
  has: {
    touch: false,
    webStorage: false
  },
  within: { iframe: false }
};
const client = {
  userAgent,
  is: getPlatform(userAgent),
  has: {
    touch: hasTouch
  },
  within: {
    iframe: window.self !== window.top
  }
};
const Platform = {
  install(opts) {
    const { $q } = opts;
    if (isRuntimeSsrPreHydration.value === true) {
      opts.onSSRHydrated.push(() => {
        Object.assign($q.platform, client);
        isRuntimeSsrPreHydration.value = false;
      });
      $q.platform = reactive$1(this);
    } else {
      $q.platform = this;
    }
  }
};
{
  let hasWebStorage;
  injectProp(client.has, "webStorage", () => {
    if (hasWebStorage !== void 0) {
      return hasWebStorage;
    }
    try {
      if (window.localStorage) {
        hasWebStorage = true;
        return true;
      }
    } catch (_) {
    }
    hasWebStorage = false;
    return false;
  });
  Object.assign(Platform, client);
  if (isRuntimeSsrPreHydration.value === true) {
    Object.assign(Platform, preHydrationBrowser, ssrClient);
    preHydrationBrowser = null;
  }
}
const { unref } = await importShared("vue");
function css(element, css2) {
  const style = element.style;
  for (const prop in css2) {
    style[prop] = css2[prop];
  }
}
function getElement(el) {
  if (el === void 0 || el === null) {
    return void 0;
  }
  if (typeof el === "string") {
    try {
      return document.querySelector(el) || void 0;
    } catch (err) {
      return void 0;
    }
  }
  const target = unref(el);
  if (target) {
    return target.$el || target;
  }
}
const scrollTargetProp = [Element, String];
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
const listenOpts = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true
};
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(listenOpts, {
        hasPassive: true,
        passive: { passive: true },
        notPassive: { passive: false },
        passiveCapture: { passive: true, capture: true },
        notPassiveCapture: { passive: false, capture: true }
      });
    }
  });
  window.addEventListener("qtest", null, opts);
  window.removeEventListener("qtest", null, opts);
} catch (_) {
}
function noop() {
}
const { watch: watch$1, onMounted: onMounted$2, onBeforeUnmount: onBeforeUnmount$1, getCurrentInstance: getCurrentInstance$2 } = await importShared("vue");
const { passive } = listenOpts;
const axisValues = ["both", "horizontal", "vertical"];
var QScrollObserver = createComponent({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (v) => axisValues.includes(v),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: scrollTargetProp
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: false,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let clearTimer = null, localScrollTarget, parentEl;
    watch$1(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function emitEvent() {
      clearTimer !== null && clearTimer();
      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);
      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };
      if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) {
        return;
      }
      const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;
      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }
      emit("scroll", { ...scroll });
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener("scroll", trigger, passive);
      trigger(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (clearTimer === null) {
        const [timer, fn] = props.debounce ? [setTimeout(emitEvent, props.debounce), clearTimeout] : [requestAnimationFrame(emitEvent), cancelAnimationFrame];
        clearTimer = () => {
          fn(timer);
          clearTimer = null;
        };
      }
    }
    const { proxy } = getCurrentInstance$2();
    watch$1(() => proxy.$q.lang.rtl, emitEvent);
    onMounted$2(() => {
      parentEl = proxy.$el.parentNode;
      configureScrollTarget();
    });
    onBeforeUnmount$1(() => {
      clearTimer !== null && clearTimer();
      unconfigureScrollTarget();
    });
    Object.assign(proxy, {
      trigger,
      getPosition: () => scroll
    });
    return noop;
  }
});
const { ref: ref$1, onMounted: onMounted$1 } = await importShared("vue");
function useHydration() {
  const isHydrated = ref$1(!isRuntimeSsrPreHydration.value);
  if (isHydrated.value === false) {
    onMounted$1(() => {
      isHydrated.value = true;
    });
  }
  return { isHydrated };
}
const { h: h$1, onMounted, onBeforeUnmount, getCurrentInstance: getCurrentInstance$1, nextTick } = await importShared("vue");
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
var QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer = null, targetEl, size2 = { width: -1, height: -1 };
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = setTimeout(emitEvent, props.debounce);
      }
    }
    function emitEvent() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size2.width || height !== size2.height) {
          size2 = { width, height };
          emit("resize", size2);
        }
      }
    }
    const { proxy } = getCurrentInstance$1();
    proxy.trigger = trigger;
    if (hasObserver === true) {
      let observer;
      const init = (stop) => {
        targetEl = proxy.$el.parentNode;
        if (targetEl) {
          observer = new ResizeObserver(trigger);
          observer.observe(targetEl);
          emitEvent();
        } else if (stop !== true) {
          nextTick(() => {
            init(true);
          });
        }
      };
      onMounted(() => {
        init();
      });
      onBeforeUnmount(() => {
        timer !== null && clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl && targetEl.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger, listenOpts.passive);
          emitEvent();
        }
      };
      const { isHydrated } = useHydration();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      return () => {
        if (isHydrated.value === true) {
          return h$1("object", {
            class: "q--avoid-card-border",
            style: resizeProps.style,
            tabindex: -1,
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
const { h, ref, reactive, computed, watch, provide, onUnmounted, getCurrentInstance } = await importShared("vue");
var QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scrollHeight", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let animateTimer = null;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer === null) {
          if (el.scrollHeight > $q.screen.height) {
            return;
          }
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer !== null && action === "remove") {
          clearTimeout(timer);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer = null;
      const el = document.body;
      watch(
        () => props.container !== true ? "add" : "remove",
        updateScrollEvent
      );
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const { createElementVNode: _createElementVNode, resolveComponent: _resolveComponent, withCtx: _withCtx, createVNode: _createVNode, openBlock: _openBlock, createBlock: _createBlock } = await importShared("vue");
function _sfc_render(_ctx, _cache) {
  return _openBlock(), _createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: _withCtx(() => [
      _createVNode(QPageContainer, null, {
        default: _withCtx(() => _cache[0] || (_cache[0] = [
          _createElementVNode("h1", null, "App 1111", -1)
        ])),
        _: 1
      })
    ]),
    _: 1
  });
}
var FormApp1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { FormApp1 as default };
