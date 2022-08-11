if (Math.floor(Math.random() * (100 - 1 + 1) + 1) === 1) {
  const NRconfig = {
    accountID: '2734288',
    trustKey: '767312',
    agentID: '498038495',
    licenseKey: 'NRJS-df7fb4a4ddc7a3d4f87',
    appID: '498038495',
  };

  if (window.location.host === 'inews.co.uk') {
    NRconfig.agentID = '501394439';
    NRconfig.appID = '501394439';
  }

  window.NREUM || (NREUM = {});
  NREUM.init = {
    distributed_tracing: {
      enabled: true,
    },
    privacy: {
      cookies_enabled: false,
    },
  };
  window.NREUM || (NREUM = {}), __nr_require = (function (t, e, n) {
    function r(n) {
      if (!e[n]) {
        const o = e[n] = {
          exports: {},
        };
        t[n][0].call(o.exports, (e) => {
          const o = t[n][1][e];
          return r(o || e);
        }, o, o.exports);
      }
      return e[n].exports;
    }
    if (typeof __nr_require === 'function') return __nr_require;
    for (let o = 0; o < n.length; o++) r(n[o]);
    return r;
  }({
    '1': [function (t, e, n) {
      function r(t) {
        try {
          c.console && console.log(t);
        } catch (e) { }
      }
      let o; const i = t('ee');
      const a = t(29);
      var c = {};
      try {
        o = localStorage.getItem('__nr_flags').split(','), console && typeof console.log === 'function' && (c.console = !0, o.indexOf('dev') !== -1 && (c.dev = !0), o.indexOf('nr_dev') !== -1 && (c.nrDev = !0));
      } catch (s) { }
      c.nrDev && i.on('internal-error', (t) => {
        r(t.stack);
      }), c.dev && i.on('fn-err', (t, e, n) => {
        r(n.stack);
      }), c.dev && (r('NR AGENT IN DEVELOPMENT MODE'), r(`flags: ${a(c, (t, e) => t).join(', ')}`));
    }, {}],
    '2': [function (t, e, n) {
      function r(t, e, n, r, c) {
        try {
          p ? p -= 1 : o(c || new UncaughtException(t, e, n), !0);
        } catch (f) {
          try {
            i('ierr', [f, s.now(), !0]);
          } catch (d) { }
        }
        return typeof u === 'function' && u.apply(this, a(arguments));
      }

      function UncaughtException(t, e, n) {
        this.message = t || 'Uncaught error with no additional information', this.sourceURL = e, this.line = n;
      }

      function o(t, e) {
        const n = e ? null : s.now();
        i('err', [t, n]);
      }
      var i = t('handle');
      var a = t(30);
      const c = t('ee');
      var s = t('loader');
      const f = t('gos');
      var u = window.onerror;
      let d = !1;
      const l = 'nr@seenError';
      if (!s.disabled) {
        var p = 0;
        s.features.err = !0, t(1), window.onerror = r;
        try {
          throw new Error();
        } catch (h) {
          'stack' in h && (t(13), t(12), 'addEventListener' in window && t(6), s.xhrWrappable && t(14), d = !0);
        }
        c.on('fn-start', (t, e, n) => {
          d && (p += 1);
        }), c.on('fn-err', function (t, e, n) {
          d && !n[l] && (f(n, l, () => !0), this.thrown = !0, o(n));
        }), c.on('fn-end', function () {
          d && !this.thrown && p > 0 && (p -= 1);
        }), c.on('internal-error', (t) => {
          i('ierr', [t, s.now(), !0]);
        });
      }
    }, {}],
    '3': [function (t, e, n) {
      const r = t('loader');
      r.disabled || (r.features.ins = !0);
    }, {}],
    '4': [function (t, e, n) {
      function r() {
        L++, T = g.hash, this[u] = y.now();
      }

      function o() {
        L--, g.hash !== T && i(0, !0);
        const t = y.now();
        this[h] = ~~this[h] + t - this[u], this[d] = t;
      }

      function i(t, e) {
        E.emit('newURL', [`${g}`, e]);
      }

      function a(t, e) {
        t.on(e, function () {
          this[e] = y.now();
        });
      }
      const c = '-start';
      const s = '-end';
      const f = '-body';
      var u = `fn${c}`;
      var d = `fn${s}`;
      const l = `cb${c}`;
      const p = `cb${s}`;
      var h = 'jsTime';
      const m = 'fetch';
      const v = 'addEventListener';
      const w = window;
      var g = w.location;
      var y = t('loader');
      if (w[v] && y.xhrWrappable && !y.disabled) {
        const x = t(10);
        const b = t(11);
        var E = t(8);
        const R = t(6);
        const O = t(13);
        const N = t(7);
        const M = t(14);
        const P = t(9);
        const C = t('ee');
        const S = C.get('tracer');
        t(16), y.features.spa = !0;
        var T; var
          L = 0;
        C.on(u, r), b.on(l, r), P.on(l, r), C.on(d, o), b.on(p, o), P.on(p, o), C.buffer([u, d, 'xhr-done', 'xhr-resolved']), R.buffer([u]), O.buffer([`setTimeout${s}`, `clearTimeout${c}`, u]), M.buffer([u, 'new-xhr', `send-xhr${c}`]), N.buffer([m + c, `${m}-done`, m + f + c, m + f + s]), E.buffer(['newURL']), x.buffer([u]), b.buffer(['propagate', l, p, 'executor-err', `resolve${c}`]), S.buffer([u, `no-${u}`]), P.buffer(['new-jsonp', 'cb-start', 'jsonp-error', 'jsonp-end']), a(M, `send-xhr${c}`), a(C, 'xhr-resolved'), a(C, 'xhr-done'), a(N, m + c), a(N, `${m}-done`), a(P, 'new-jsonp'), a(P, 'jsonp-end'), a(P, 'cb-start'), E.on('pushState-end', i), E.on('replaceState-end', i), w[v]('hashchange', i, !0), w[v]('load', i, !0), w[v]('popstate', () => {
          i(0, L > 1);
        }, !0);
      }
    }, {}],
    '5': [function (t, e, n) {
      function r(t) { }
      if (window.performance && window.performance.timing && window.performance.getEntriesByType) {
        const o = t('ee');
        const i = t('handle');
        const a = t(13);
        const c = t(12);
        const s = 'learResourceTimings';
        const f = 'addEventListener';
        const u = 'resourcetimingbufferfull';
        const d = 'bstResource';
        const l = 'resource';
        const p = '-start';
        const h = '-end';
        const m = `fn${p}`;
        const v = `fn${h}`;
        const w = 'bstTimer';
        const g = 'pushState';
        const y = t('loader');
        if (!y.disabled) {
          y.features.stn = !0, t(8), 'addEventListener' in window && t(6);
          const x = NREUM.o.EV;
          o.on(m, function (t, e) {
            const n = t[0];
            n instanceof x && (this.bstStart = y.now());
          }), o.on(v, function (t, e) {
            const n = t[0];
            n instanceof x && i('bst', [n, e, this.bstStart, y.now()]);
          }), a.on(m, function (t, e, n) {
            this.bstStart = y.now(), this.bstType = n;
          }), a.on(v, function (t, e) {
            i(w, [e, this.bstStart, y.now(), this.bstType]);
          }), c.on(m, function () {
            this.bstStart = y.now();
          }), c.on(v, function (t, e) {
            i(w, [e, this.bstStart, y.now(), 'requestAnimationFrame']);
          }), o.on(g + p, function (t) {
            this.time = y.now(), this.startPath = location.pathname + location.hash;
          }), o.on(g + h, function (t) {
            i('bstHist', [location.pathname + location.hash, this.startPath, this.time]);
          }), f in window.performance && (window.performance[`c${s}`] ? window.performance[f](u, (t) => {
            i(d, [window.performance.getEntriesByType(l)]), window.performance[`c${s}`]();
          }, !1) : window.performance[f](`webkit${u}`, (t) => {
            i(d, [window.performance.getEntriesByType(l)]), window.performance[`webkitC${s}`]();
          }, !1)), document[f]('scroll', r, {
            passive: !0,
          }), document[f]('keypress', r, !1), document[f]('click', r, !1);
        }
      }
    }, {}],
    '6': [function (t, e, n) {
      function r(t) {
        for (var e = t; e && !e.hasOwnProperty(u);) e = Object.getPrototypeOf(e);
        e && o(e);
      }

      function o(t) {
        c.inPlace(t, [u, d], '-', i);
      }

      function i(t, e) {
        return t[1];
      }
      const a = t('ee').get('events');
      var c = t('wrap-function')(a, !0);
      const s = t('gos');
      const f = XMLHttpRequest;
      var u = 'addEventListener';
      var d = 'removeEventListener';
      e.exports = a, 'getPrototypeOf' in Object ? (r(document), r(window), r(f.prototype)) : f.prototype.hasOwnProperty(u) && (o(window), o(f.prototype)), a.on(`${u}-start`, function (t, e) {
        const n = t[1];
        const r = s(n, 'nr@wrapped', () => {
          function t() {
            if (typeof n.handleEvent === 'function') return n.handleEvent.apply(n, arguments);
          }
          const e = {
            'object': t,
            'function': n,
          }[typeof n];
          return e ? c(e, 'fn-', null, e.name || 'anonymous') : n;
        });
        this.wrapped = t[1] = r;
      }), a.on(`${d}-start`, function (t) {
        t[1] = this.wrapped || t[1];
      });
    }, {}],
    '7': [function (t, e, n) {
      function r(t, e, n) {
        const r = t[e];
        typeof r === 'function' && (t[e] = function () {
          const t = i(arguments);
          const e = {};
          o.emit(`${n}before-start`, [t], e);
          let a;
          e[m] && e[m].dt && (a = e[m].dt);
          const c = r.apply(this, t);
          return o.emit(`${n}start`, [t, a], c), c.then((t) => (o.emit(`${n}end`, [null, t], c), t), (t) => {
            throw o.emit(`${n}end`, [t], c), t;
          });
        });
      }
      var o = t('ee').get('fetch');
      var i = t(30);
      const a = t(29);
      e.exports = o;
      const c = window;
      const s = 'fetch-';
      const f = `${s}body-`;
      const u = ['arrayBuffer', 'blob', 'json', 'text', 'formData'];
      const d = c.Request;
      const l = c.Response;
      const p = c.fetch;
      const h = 'prototype';
      var m = 'nr@context';
      d && l && p && (a(u, (t, e) => {
        r(d[h], e, f), r(l[h], e, f);
      }), r(c, 'fetch', s), o.on(`${s}end`, function (t, e) {
        const n = this;
        if (e) {
          const r = e.headers.get('content-length');
          r !== null && (n.rxSize = r), o.emit(`${s}done`, [null, e], n);
        } else o.emit(`${s}done`, [t], n);
      }));
    }, {}],
    '8': [function (t, e, n) {
      const r = t('ee').get('history');
      const o = t('wrap-function')(r);
      e.exports = r;
      const i = window.history && window.history.constructor && window.history.constructor.prototype;
      let a = window.history;
      i && i.pushState && i.replaceState && (a = i), o.inPlace(a, ['pushState', 'replaceState'], '-');
    }, {}],
    '9': [function (t, e, n) {
      function r(t) {
        function e() {
          s.emit('jsonp-end', [], l), t.removeEventListener('load', e, !1), t.removeEventListener('error', n, !1);
        }

        function n() {
          s.emit('jsonp-error', [], l), s.emit('jsonp-end', [], l), t.removeEventListener('load', e, !1), t.removeEventListener('error', n, !1);
        }
        const r = t && typeof t.nodeName === 'string' && t.nodeName.toLowerCase() === 'script';
        if (r) {
          const o = typeof t.addEventListener === 'function';
          if (o) {
            const a = i(t.src);
            if (a) {
              const u = c(a);
              const d = typeof u.parent[u.key] === 'function';
              if (d) {
                var l = {};
                f.inPlace(u.parent, [u.key], 'cb-', l), t.addEventListener('load', e, !1), t.addEventListener('error', n, !1), s.emit('new-jsonp', [t.src], l);
              }
            }
          }
        }
      }

      function o() {
        return 'addEventListener' in window;
      }

      function i(t) {
        const e = t.match(u);
        return e ? e[1] : null;
      }

      function a(t, e) {
        const n = t.match(l);
        const r = n[1];
        const o = n[3];
        return o ? a(o, e[r]) : e[r];
      }

      function c(t) {
        const e = t.match(d);
        return e && e.length >= 3 ? {
          key: e[2],
          parent: a(e[1], window),
        } : {
          key: t,
          parent: window,
        };
      }
      var s = t('ee').get('jsonp');
      var f = t('wrap-function')(s);
      if (e.exports = s, o()) {
        var u = /[?&](?:callback|cb)=([^&#]+)/;
        var d = /(.*)\.([^.]+)/;
        var l = /^(\w+)(\.|$)(.*)$/;
        const p = ['appendChild', 'insertBefore', 'replaceChild'];
        Node && Node.prototype && Node.prototype.appendChild ? f.inPlace(Node.prototype, p, 'dom-') : (f.inPlace(HTMLElement.prototype, p, 'dom-'), f.inPlace(HTMLHeadElement.prototype, p, 'dom-'), f.inPlace(HTMLBodyElement.prototype, p, 'dom-')), s.on('dom-start', (t) => {
          r(t[0]);
        });
      }
    }, {}],
    '10': [function (t, e, n) {
      const r = t('ee').get('mutation');
      const o = t('wrap-function')(r);
      const i = NREUM.o.MO;
      e.exports = r, i && (window.MutationObserver = function (t) {
        return this instanceof i ? new i(o(t, 'fn-')) : i.apply(this, arguments);
      }, MutationObserver.prototype = i.prototype);
    }, {}],
    '11': [function (t, e, n) {
      function r(t) {
        const e = i.context();
        const n = c(t, 'executor-', e, null, !1);
        const r = new f(n);
        return i.context(r).getCtx = function () {
          return e;
        }, r;
      }
      const o = t('wrap-function');
      var i = t('ee').get('promise');
      const a = t('ee').getOrSetContext;
      var c = o(i);
      const s = t(29);
      var f = NREUM.o.PR;
      e.exports = i, f && (window.Promise = r, ['all', 'race'].forEach((t) => {
        const e = f[t];
        f[t] = function (n) {
          function r(t) {
            return function () {
              i.emit('propagate', [null, !o], a, !1, !1), o = o || !t;
            };
          }
          var o = !1;
          s(n, (e, n) => {
            Promise.resolve(n).then(r(t === 'all'), r(!1));
          });
          var a = e.apply(f, arguments);
          const c = f.resolve(a);
          return c;
        };
      }), ['resolve', 'reject'].forEach((t) => {
        const e = f[t];
        f[t] = function (t) {
          const n = e.apply(f, arguments);
          return t !== n && i.emit('propagate', [t, !0], n, !1, !1), n;
        };
      }), f.prototype.catch = function (t) {
        return this.then(null, t);
      }, f.prototype = Object.create(f.prototype, {
        constructor: {
          value: r,
        },
      }), s(Object.getOwnPropertyNames(f), (t, e) => {
        try {
          r[e] = f[e];
        } catch (n) { }
      }), o.wrapInPlace(f.prototype, 'then', (t) => function () {
        const e = this;
        const n = o.argsToArray.apply(this, arguments);
        const r = a(e);
        r.promise = e, n[0] = c(n[0], 'cb-', r, null, !1), n[1] = c(n[1], 'cb-', r, null, !1);
        const s = t.apply(this, n);
        return r.nextPromise = s, i.emit('propagate', [e, !0], s, !1, !1), s;
      }), i.on('executor-start', function (t) {
        t[0] = c(t[0], 'resolve-', this, null, !1), t[1] = c(t[1], 'resolve-', this, null, !1);
      }), i.on('executor-err', (t, e, n) => {
        t[1](n);
      }), i.on('cb-end', function (t, e, n) {
        i.emit('propagate', [n, !0], this.nextPromise, !1, !1);
      }), i.on('propagate', function (t, e, n) {
        this.getCtx && !e || (this.getCtx = function () {
          if (t instanceof Promise) var e = i.context(t);
          return e && e.getCtx ? e.getCtx() : this;
        });
      }), r.toString = function () {
        return `${f}`;
      });
    }, {}],
    '12': [function (t, e, n) {
      const r = t('ee').get('raf');
      const o = t('wrap-function')(r);
      const i = 'equestAnimationFrame';
      e.exports = r, o.inPlace(window, [`r${i}`, `mozR${i}`, `webkitR${i}`, `msR${i}`], 'raf-'), r.on('raf-start', (t) => {
        t[0] = o(t[0], 'fn-');
      });
    }, {}],
    '13': [function (t, e, n) {
      function r(t, e, n) {
        t[0] = a(t[0], 'fn-', null, n);
      }

      function o(t, e, n) {
        this.method = n, this.timerDuration = isNaN(t[1]) ? 0 : +t[1], t[0] = a(t[0], 'fn-', this, n);
      }
      const i = t('ee').get('timer');
      var a = t('wrap-function')(i);
      const c = 'setTimeout';
      const s = 'setInterval';
      const f = 'clearTimeout';
      const u = '-start';
      const d = '-';
      e.exports = i, a.inPlace(window, [c, 'setImmediate'], c + d), a.inPlace(window, [s], s + d), a.inPlace(window, [f, 'clearImmediate'], f + d), i.on(s + u, r), i.on(c + u, o);
    }, {}],
    '14': [function (t, e, n) {
      function r(t, e) {
        d.inPlace(e, ['onreadystatechange'], 'fn-', c);
      }

      function o() {
        const t = this;
        const e = u.context(t);
        t.readyState > 3 && !e.resolved && (e.resolved = !0, u.emit('xhr-resolved', [], t)), d.inPlace(t, g, 'fn-', c);
      }

      function i(t) {
        y.push(t), h && (b ? b.then(a) : v ? v(a) : (E = -E, R.data = E));
      }

      function a() {
        for (let t = 0; t < y.length; t++) r([], y[t]);
        y.length && (y = []);
      }

      function c(t, e) {
        return e;
      }

      function s(t, e) {
        for (const n in t) e[n] = t[n];
        return e;
      }
      t(6);
      const f = t('ee');
      var u = f.get('xhr');
      var d = t('wrap-function')(u);
      const l = NREUM.o;
      const p = l.XHR;
      var h = l.MO;
      const m = l.PR;
      var v = l.SI;
      const w = 'readystatechange';
      var g = ['onload', 'onerror', 'onabort', 'onloadstart', 'onloadend', 'onprogress', 'ontimeout'];
      var y = [];
      e.exports = u;
      const x = window.XMLHttpRequest = function (t) {
        const e = new p(t);
        try {
          u.emit('new-xhr', [e], e), e.addEventListener(w, o, !1);
        } catch (n) {
          try {
            u.emit('internal-error', [n]);
          } catch (r) { }
        }
        return e;
      };
      if (s(p, x), x.prototype = p.prototype, d.inPlace(x.prototype, ['open', 'send'], '-xhr-', c), u.on('send-xhr-start', (t, e) => {
        r(t, e), i(e);
      }), u.on('open-xhr-start', r), h) {
        var b = m && m.resolve();
        if (!v && !m) {
          var E = 1;
          var R = document.createTextNode(E);
          new h(a).observe(R, {
            characterData: !0,
          });
        }
      } else {
        f.on('fn-end', (t) => {
          t[0] && t[0].type === w || a();
        });
      }
    }, {}],
    '15': [function (t, e, n) {
      function r(t) {
        if (!c(t)) return null;
        const e = window.NREUM;
        if (!e.loader_config) return null;
        const n = (e.loader_config.accountID || '').toString() || null;
        const r = (e.loader_config.agentID || '').toString() || null;
        const f = (e.loader_config.trustKey || '').toString() || null;
        if (!n || !r) return null;
        const h = p.generateSpanId();
        const m = p.generateTraceId();
        const v = Date.now();
        const w = {
          spanId: h,
          traceId: m,
          timestamp: v,
        };
        return (t.sameOrigin || s(t) && l()) && (w.traceContextParentHeader = o(h, m), w.traceContextStateHeader = i(h, v, n, r, f)), (t.sameOrigin && !u() || !t.sameOrigin && s(t) && d()) && (w.newrelicHeader = a(h, m, v, n, r, f)), w;
      }

      function o(t, e) {
        return `00-${e}-${t}-01`;
      }

      function i(t, e, n, r, o) {
        const i = 0;
        const a = '';
        const c = 1;
        const s = '';
        const f = '';
        return `${o}@nr=${i}-${c}-${n}-${r}-${t}-${a}-${s}-${f}-${e}`;
      }

      function a(t, e, n, r, o, i) {
        const a = 'btoa' in window && typeof window.btoa === 'function';
        if (!a) return null;
        const c = {
          v: [0, 1],
          d: {
            ty: 'Browser',
            ac: r,
            ap: o,
            id: t,
            tr: e,
            ti: n,
          },
        };
        return i && r !== i && (c.d.tk = i), btoa(JSON.stringify(c));
      }

      function c(t) {
        return f() && s(t);
      }

      function s(t) {
        let e = !1;
        let n = {};
        if ('init' in NREUM && 'distributed_tracing' in NREUM.init && (n = NREUM.init.distributed_tracing), t.sameOrigin) e = !0;
        else if (n.allowed_origins instanceof Array) {
          for (let r = 0; r < n.allowed_origins.length; r++) {
            const o = h(n.allowed_origins[r]);
            if (t.hostname === o.hostname && t.protocol === o.protocol && t.port === o.port) {
              e = !0;
              break;
            }
          }
        }
        return e;
      }

      function f() {
        return 'init' in NREUM && 'distributed_tracing' in NREUM.init && !!NREUM.init.distributed_tracing.enabled;
      }

      function u() {
        return 'init' in NREUM && 'distributed_tracing' in NREUM.init && !!NREUM.init.distributed_tracing.exclude_newrelic_header;
      }

      function d() {
        return 'init' in NREUM && 'distributed_tracing' in NREUM.init && NREUM.init.distributed_tracing.cors_use_newrelic_header !== !1;
      }

      function l() {
        return 'init' in NREUM && 'distributed_tracing' in NREUM.init && !!NREUM.init.distributed_tracing.cors_use_tracecontext_headers;
      }
      var p = t(26);
      var h = t(17);
      e.exports = {
        generateTracePayload: r,
        shouldGenerateTrace: c,
      };
    }, {}],
    '16': [function (t, e, n) {
      function r(t) {
        const e = this.params;
        const n = this.metrics;
        if (!this.ended) {
          this.ended = !0;
          for (let r = 0; r < l; r++) t.removeEventListener(d[r], this.listener, !1);
          e.aborted || (n.duration = a.now() - this.startTime, this.loadCaptureCalled || t.readyState !== 4 ? e.status == null && (e.status = 0) : i(this, t), n.cbTime = this.cbTime, u.emit('xhr-done', [t], t), c('xhr', [e, n, this.startTime]));
        }
      }

      function o(t, e) {
        const n = s(e);
        const r = t.params;
        r.host = `${n.hostname}:${n.port}`, r.pathname = n.pathname, t.parsedOrigin = s(e), t.sameOrigin = t.parsedOrigin.sameOrigin;
      }

      function i(t, e) {
        t.params.status = e.status;
        const n = v(e, t.lastSize);
        if (n && (t.metrics.rxSize = n), t.sameOrigin) {
          const r = e.getResponseHeader('X-NewRelic-App-Data');
          r && (t.params.cat = r.split(', ').pop());
        }
        t.loadCaptureCalled = !0;
      }
      var a = t('loader');
      if (a.xhrWrappable && !a.disabled) {
        var c = t('handle');
        var s = t(17);
        const f = t(15).generateTracePayload;
        var u = t('ee');
        var d = ['load', 'error', 'abort', 'timeout'];
        var l = d.length;
        const p = t('id');
        const h = t(22);
        const m = t(21);
        var v = t(18);
        const w = window.XMLHttpRequest;
        a.features.xhr = !0, t(14), t(7), u.on('new-xhr', function (t) {
          const e = this;
          e.totalCbs = 0, e.called = 0, e.cbTime = 0, e.end = r, e.ended = !1, e.xhrGuids = {}, e.lastSize = null, e.loadCaptureCalled = !1, e.params = this.params || {}, e.metrics = this.metrics || {}, t.addEventListener('load', (n) => {
            i(e, t);
          }, !1), h && (h > 34 || h < 10) || window.opera || t.addEventListener('progress', (t) => {
            e.lastSize = t.loaded;
          }, !1);
        }), u.on('open-xhr-start', function (t) {
          this.params = {
            method: t[0],
          }, o(this, t[1]), this.metrics = {};
        }), u.on('open-xhr-end', function (t, e) {
          'loader_config' in NREUM && 'xpid' in NREUM.loader_config && this.sameOrigin && e.setRequestHeader('X-NewRelic-ID', NREUM.loader_config.xpid);
          const n = f(this.parsedOrigin);
          if (n) {
            let r = !1;
            n.newrelicHeader && (e.setRequestHeader('newrelic', n.newrelicHeader), r = !0), n.traceContextParentHeader && (e.setRequestHeader('traceparent', n.traceContextParentHeader), n.traceContextStateHeader && e.setRequestHeader('tracestate', n.traceContextStateHeader), r = !0), r && (this.dt = n);
          }
        }), u.on('send-xhr-start', function (t, e) {
          const n = this.metrics;
          const r = t[0];
          const o = this;
          if (n && r) {
            const i = m(r);
            i && (n.txSize = i);
          }
          this.startTime = a.now(), this.listener = function (t) {
            try {
              t.type !== 'abort' || o.loadCaptureCalled || (o.params.aborted = !0), (t.type !== 'load' || o.called === o.totalCbs && (o.onloadCalled || typeof e.onload !== 'function')) && o.end(e);
            } catch (n) {
              try {
                u.emit('internal-error', [n]);
              } catch (r) { }
            }
          };
          for (let c = 0; c < l; c++) e.addEventListener(d[c], this.listener, !1);
        }), u.on('xhr-cb-time', function (t, e, n) {
          this.cbTime += t, e ? this.onloadCalled = !0 : this.called += 1, this.called !== this.totalCbs || !this.onloadCalled && typeof n.onload === 'function' || this.end(n);
        }), u.on('xhr-load-added', function (t, e) {
          const n = `${p(t)}${!!e}`;
          this.xhrGuids && !this.xhrGuids[n] && (this.xhrGuids[n] = !0, this.totalCbs += 1);
        }), u.on('xhr-load-removed', function (t, e) {
          const n = `${p(t)}${!!e}`;
          this.xhrGuids && this.xhrGuids[n] && (delete this.xhrGuids[n], this.totalCbs -= 1);
        }), u.on('addEventListener-end', (t, e) => {
          e instanceof w && t[0] === 'load' && u.emit('xhr-load-added', [t[1], t[2]], e);
        }), u.on('removeEventListener-end', (t, e) => {
          e instanceof w && t[0] === 'load' && u.emit('xhr-load-removed', [t[1], t[2]], e);
        }), u.on('fn-start', function (t, e, n) {
          e instanceof w && (n === 'onload' && (this.onload = !0), ((t[0] && t[0].type) === 'load' || this.onload) && (this.xhrCbStart = a.now()));
        }), u.on('fn-end', function (t, e) {
          this.xhrCbStart && u.emit('xhr-cb-time', [a.now() - this.xhrCbStart, this.onload, e], e);
        }), u.on('fetch-before-start', function (t) {
          function e(t, e) {
            let n = !1;
            return e.newrelicHeader && (t.set('newrelic', e.newrelicHeader), n = !0), e.traceContextParentHeader && (t.set('traceparent', e.traceContextParentHeader), e.traceContextStateHeader && t.set('tracestate', e.traceContextStateHeader), n = !0), n;
          }
          let n; const
            r = t[1] || {};
          typeof t[0] === 'string' ? n = t[0] : t[0] && t[0].url ? n = t[0].url : window.URL && t[0] && t[0] instanceof URL && (n = t[0].href), n && (this.parsedOrigin = s(n), this.sameOrigin = this.parsedOrigin.sameOrigin);
          const o = f(this.parsedOrigin);
          if (o && (o.newrelicHeader || o.traceContextParentHeader)) {
            if (typeof t[0] === 'string' || window.URL && t[0] && t[0] instanceof URL) {
              const i = {};
              for (const a in r) i[a] = r[a];
              i.headers = new Headers(r.headers || {}), e(i.headers, o) && (this.dt = o), t.length > 1 ? t[1] = i : t.push(i);
            } else t[0] && t[0].headers && e(t[0].headers, o) && (this.dt = o);
          }
        });
      }
    }, {}],
    '17': [function (t, e, n) {
      const r = {};
      e.exports = function (t) {
        if (t in r) return r[t];
        const e = document.createElement('a');
        const n = window.location;
        const o = {};
        e.href = t, o.port = e.port;
        const i = e.href.split('://');
        !o.port && i[1] && (o.port = i[1].split('/')[0].split('@').pop().split(':')[1]), o.port && o.port !== '0' || (o.port = i[0] === 'https' ? '443' : '80'), o.hostname = e.hostname || n.hostname, o.pathname = e.pathname, o.protocol = i[0], o.pathname.charAt(0) !== '/' && (o.pathname = `/${o.pathname}`);
        const a = !e.protocol || e.protocol === ':' || e.protocol === n.protocol;
        const c = e.hostname === document.domain && e.port === n.port;
        return o.sameOrigin = a && (!e.hostname || c), o.pathname === '/' && (r[t] = o), o;
      };
    }, {}],
    '18': [function (t, e, n) {
      function r(t, e) {
        const n = t.responseType;
        return n === 'json' && e !== null ? e : n === 'arraybuffer' || n === 'blob' || n === 'json' ? o(t.response) : n === 'text' || n === '' || void 0 === n ? o(t.responseText) : void 0;
      }
      var o = t(21);
      e.exports = r;
    }, {}],
    '19': [function (t, e, n) {
      function r() { }

      function o(t, e, n) {
        return function () {
          return i(t, [f.now()].concat(c(arguments)), e ? null : this, n), e ? void 0 : this;
        };
      }
      var i = t('handle');
      const a = t(29);
      var c = t(30);
      const s = t('ee').get('tracer');
      var f = t('loader');
      const u = NREUM;
      typeof window.newrelic === 'undefined' && (newrelic = u);
      const d = ['setPageViewName', 'setCustomAttribute', 'setErrorHandler', 'finished', 'addToTrace', 'inlineHit', 'addRelease'];
      const l = 'api-';
      const p = `${l}ixn-`;
      a(d, (t, e) => {
        u[e] = o(l + e, !0, 'api');
      }), u.addPageAction = o(`${l}addPageAction`, !0), u.setCurrentRouteName = o(`${l}routeName`, !0), e.exports = newrelic, u.interaction = function () {
        return (new r()).get();
      };
      const h = r.prototype = {
        createTracer(t, e) {
          const n = {};
          const r = this;
          const o = typeof e === 'function';
          return i(`${p}tracer`, [f.now(), t, n], r),
          function () {
            if (s.emit(`${o ? '' : 'no-'}fn-start`, [f.now(), r, o], n), o) {
              try {
                return e.apply(this, arguments);
              } catch (t) {
                throw s.emit('fn-err', [arguments, this, t], n), t;
              } finally {
                s.emit('fn-end', [f.now()], n);
              }
            }
          };
        },
      };
      a('actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get'.split(','), (t, e) => {
        h[e] = o(p + e);
      }), newrelic.noticeError = function (t, e) {
        typeof t === 'string' && (t = new Error(t)), i('err', [t, f.now(), !1, e]);
      };
    }, {}],
    '20': [function (t, e, n) {
      function r(t) {
        if (NREUM.init) {
          for (var e = NREUM.init, n = t.split('.'), r = 0; r < n.length - 1; r++) if (e = e[n[r]], typeof e !== 'object') return;
          return e = e[n[n.length - 1]];
        }
      }
      e.exports = {
        getConfiguration: r,
      };
    }, {}],
    '21': [function (t, e, n) {
      e.exports = function (t) {
        if (typeof t === 'string' && t.length) return t.length;
        if (typeof t === 'object') {
          if (typeof ArrayBuffer !== 'undefined' && t instanceof ArrayBuffer && t.byteLength) return t.byteLength;
          if (typeof Blob !== 'undefined' && t instanceof Blob && t.size) return t.size;
          if (!(typeof FormData !== 'undefined' && t instanceof FormData)) {
            try {
              return JSON.stringify(t).length;
            } catch (e) {

            }
          }
        }
      };
    }, {}],
    '22': [function (t, e, n) {
      let r = 0;
      const o = navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/);
      o && (r = +o[1]), e.exports = r;
    }, {}],
    '23': [function (t, e, n) {
      function r() {
        return c.exists && performance.now ? Math.round(performance.now()) : (i = Math.max((new Date()).getTime(), i)) - a;
      }

      function o() {
        return i;
      }
      var i = (new Date()).getTime();
      var a = i;
      var c = t(31);
      e.exports = r, e.exports.offset = a, e.exports.getLastTimestamp = o;
    }, {}],
    '24': [function (t, e, n) {
      function r(t) {
        return !(!t || !t.protocol || t.protocol === 'file:');
      }
      e.exports = r;
    }, {}],
    '25': [function (t, e, n) {
      function r(t, e) {
        const n = t.getEntries();
        n.forEach((t) => {
          t.name === 'first-paint' ? d('timing', ['fp', Math.floor(t.startTime)]) : t.name === 'first-contentful-paint' && d('timing', ['fcp', Math.floor(t.startTime)]);
        });
      }

      function o(t, e) {
        const n = t.getEntries();
        n.length > 0 && d('lcp', [n[n.length - 1]]);
      }

      function i(t) {
        t.getEntries().forEach((t) => {
          t.hadRecentInput || d('cls', [t]);
        });
      }

      function a(t) {
        if (t instanceof h && !v) {
          let e = Math.round(t.timeStamp);
          const n = {
            type: t.type,
          };
          e <= l.now() ? n.fid = l.now() - e : e > l.offset && e <= Date.now() ? (e -= l.offset, n.fid = l.now() - e) : e = l.now(), v = !0, d('timing', ['fi', e, n]);
        }
      }

      function c(t) {
        d('pageHide', [l.now(), t]);
      }
      if (!('init' in NREUM && 'page_view_timing' in NREUM.init && 'enabled' in NREUM.init.page_view_timing && NREUM.init.page_view_timing.enabled === !1)) {
        let s; let f; let u; var d = t('handle');
        var l = t('loader');
        const p = t(28);
        var h = NREUM.o.EV;
        if ('PerformanceObserver' in window && typeof window.PerformanceObserver === 'function') {
          s = new PerformanceObserver(r);
          try {
            s.observe({
              entryTypes: ['paint'],
            });
          } catch (m) { }
          f = new PerformanceObserver(o);
          try {
            f.observe({
              entryTypes: ['largest-contentful-paint'],
            });
          } catch (m) { }
          u = new PerformanceObserver(i);
          try {
            u.observe({
              type: 'layout-shift',
              buffered: !0,
            });
          } catch (m) { }
        }
        if ('addEventListener' in document) {
          var v = !1;
          const w = ['click', 'keydown', 'mousedown', 'pointerdown', 'touchstart'];
          w.forEach((t) => {
            document.addEventListener(t, a, !1);
          });
        }
        p(c);
      }
    }, {}],
    '26': [function (t, e, n) {
      function r() {
        function t() {
          return e ? 15 & e[n++] : 16 * Math.random() | 0;
        }
        var e = null;
        var n = 0;
        const r = window.crypto || window.msCrypto;
        r && r.getRandomValues && (e = r.getRandomValues(new Uint8Array(31)));
        for (var o, i = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', a = '', c = 0; c < i.length; c++) o = i[c], o === 'x' ? a += t().toString(16) : o === 'y' ? (o = 3 & t() | 8, a += o.toString(16)) : a += o;
        return a;
      }

      function o() {
        return a(16);
      }

      function i() {
        return a(32);
      }

      function a(t) {
        function e() {
          return n ? 15 & n[r++] : 16 * Math.random() | 0;
        }
        var n = null;
        var r = 0;
        const o = window.crypto || window.msCrypto;
        o && o.getRandomValues && Uint8Array && (n = o.getRandomValues(new Uint8Array(31)));
        for (var i = [], a = 0; a < t; a++) i.push(e().toString(16));
        return i.join('');
      }
      e.exports = {
        generateUuid: r,
        generateSpanId: o,
        generateTraceId: i,
      };
    }, {}],
    '27': [function (t, e, n) {
      function r(t, e) {
        if (!o) return !1;
        if (t !== o) return !1;
        if (!e) return !0;
        if (!i) return !1;
        for (let n = i.split('.'), r = e.split('.'), a = 0; a < r.length; a++) if (r[a] !== n[a]) return !1;
        return !0;
      }
      var o = null;
      var i = null;
      const a = /Version\/(\S+)\s+Safari/;
      if (navigator.userAgent) {
        const c = navigator.userAgent;
        const s = c.match(a);
        s && c.indexOf('Chrome') === -1 && c.indexOf('Chromium') === -1 && (o = 'Safari', i = s[1]);
      }
      e.exports = {
        agent: o,
        version: i,
        match: r,
      };
    }, {}],
    '28': [function (t, e, n) {
      function r(t) {
        function e() {
          t(a && document[a] ? document[a] : document[o] ? 'hidden' : 'visible');
        }
        'addEventListener' in document && i && document.addEventListener(i, e, !1);
      }
      e.exports = r;
      let o; let i; let
        a;
      typeof document.hidden !== 'undefined' ? (o = 'hidden', i = 'visibilitychange', a = 'visibilityState') : typeof document.msHidden !== 'undefined' ? (o = 'msHidden', i = 'msvisibilitychange') : typeof document.webkitHidden !== 'undefined' && (o = 'webkitHidden', i = 'webkitvisibilitychange', a = 'webkitVisibilityState');
    }, {}],
    '29': [function (t, e, n) {
      function r(t, e) {
        const n = [];
        let r = '';
        let i = 0;
        for (r in t) o.call(t, r) && (n[i] = e(r, t[r]), i += 1);
        return n;
      }
      var o = Object.prototype.hasOwnProperty;
      e.exports = r;
    }, {}],
    '30': [function (t, e, n) {
      function r(t, e, n) {
        e || (e = 0), typeof n === 'undefined' && (n = t ? t.length : 0);
        for (var r = -1, o = n - e || 0, i = Array(o < 0 ? 0 : o); ++r < o;) i[r] = t[e + r];
        return i;
      }
      e.exports = r;
    }, {}],
    '31': [function (t, e, n) {
      e.exports = {
        exists: typeof window.performance !== 'undefined' && window.performance.timing && typeof window.performance.timing.navigationStart !== 'undefined',
      };
    }, {}],
    'ee': [function (t, e, n) {
      function r() { }

      function o(t) {
        function e(t) {
          return t && t instanceof r ? t : t ? f(t, s, a) : a();
        }

        function n(n, r, o, i, a) {
          if (a !== !1 && (a = !0), !p.aborted || i) {
            t && a && t(n, r, o);
            for (var c = e(o), s = m(n), f = s.length, u = 0; u < f; u++) s[u].apply(c, r);
            const l = d[y[n]];
            return l && l.push([x, n, r, c]), c;
          }
        }

        function i(t, e) {
          g[t] = m(t).concat(e);
        }

        function h(t, e) {
          const n = g[t];
          if (n) for (let r = 0; r < n.length; r++) n[r] === e && n.splice(r, 1);
        }

        function m(t) {
          return g[t] || [];
        }

        function v(t) {
          return l[t] = l[t] || o(n);
        }

        function w(t, e) {
          p.aborted || u(t, (t, n) => {
            e = e || 'feature', y[n] = e, e in d || (d[e] = []);
          });
        }
        var g = {};
        var y = {};
        var x = {
          on: i,
          addEventListener: i,
          removeEventListener: h,
          emit: n,
          get: v,
          listeners: m,
          context: e,
          buffer: w,
          abort: c,
          aborted: !1,
        };
        return x;
      }

      function i(t) {
        return f(t, s, a);
      }

      function a() {
        return new r();
      }

      function c() {
        (d.api || d.feature) && (p.aborted = !0, d = p.backlog = {});
      }
      var s = 'nr@context';
      var f = t('gos');
      var u = t(29);
      var d = {};
      var l = {};
      var p = e.exports = o();
      e.exports.getOrSetContext = i, p.backlog = d;
    }, {}],
    'gos': [function (t, e, n) {
      function r(t, e, n) {
        if (o.call(t, e)) return t[e];
        const r = n();
        if (Object.defineProperty && Object.keys) {
          try {
            return Object.defineProperty(t, e, {
              value: r,
              writable: !0,
              enumerable: !1,
            }), r;
          } catch (i) { }
        }
        return t[e] = r, r;
      }
      var o = Object.prototype.hasOwnProperty;
      e.exports = r;
    }, {}],
    'handle': [function (t, e, n) {
      function r(t, e, n, r) {
        o.buffer([t], r), o.emit(t, e, n);
      }
      var o = t('ee').get('handle');
      e.exports = r, r.ee = o;
    }, {}],
    'id': [function (t, e, n) {
      function r(t) {
        const e = typeof t;
        return !t || e !== 'object' && e !== 'function' ? -1 : t === window ? 0 : a(t, i, () => o++);
      }
      var o = 1;
      var i = 'nr@id';
      var a = t('gos');
      e.exports = r;
    }, {}],
    'loader': [function (t, e, n) {
      function r() {
        if (!N++) {
          const t = O.info = NREUM.info;
          const e = m.getElementsByTagName('script')[0];
          if (setTimeout(f.abort, 3e4), !(t && t.licenseKey && t.applicationID && e)) return f.abort();
          s(E, (e, n) => {
            t[e] || (t[e] = n);
          });
          const n = a();
          c('mark', ['onload', n + O.offset], null, 'api'), c('timing', ['load', n]);
          const r = m.createElement('script');
          t.agent.indexOf('http://') === 0 || t.agent.indexOf('https://') === 0 ? r.src = t.agent : r.src = `${p}://${t.agent}`, e.parentNode.insertBefore(r, e);
        }
      }

      function o() {
        m.readyState === 'complete' && i();
      }

      function i() {
        c('mark', ['domContent', a() + O.offset], null, 'api');
      }
      var a = t(23);
      var c = t('handle');
      var s = t(29);
      var f = t('ee');
      const u = t(27);
      const d = t(24);
      const l = t(20);
      var p = l.getConfiguration('ssl') === !1 ? 'http' : 'https';
      const h = window;
      var m = h.document;
      const v = 'addEventListener';
      const w = 'attachEvent';
      const g = h.XMLHttpRequest;
      const y = g && g.prototype;
      const x = !d(h.location);
      NREUM.o = {
        ST: setTimeout,
        SI: h.setImmediate,
        CT: clearTimeout,
        XHR: g,
        REQ: h.Request,
        EV: h.Event,
        PR: h.Promise,
        MO: h.MutationObserver,
      };
      const b = `${location}`;
      var E = {
        beacon: 'bam.nr-data.net',
        errorBeacon: 'bam.nr-data.net',
        agent: 'js-agent.newrelic.com/nr-spa-1209.min.js',
      };
      const R = g && y && y[v] && !/CriOS/.test(navigator.userAgent);
      var O = e.exports = {
        offset: a.getLastTimestamp(),
        now: a,
        origin: b,
        features: {},
        xhrWrappable: R,
        userAgent: u,
        disabled: x,
      };
      if (!x) {
        t(19), t(25), m[v] ? (m[v]('DOMContentLoaded', i, !1), h[v]('load', r, !1)) : (m[w]('onreadystatechange', o), h[w]('onload', r)), c('mark', ['firstbyte', a.getLastTimestamp()], null, 'api');
        var N = 0;
      }
    }, {}],
    'wrap-function': [function (t, e, n) {
      function r(t, e) {
        function n(e, n, r, s, f) {
          function nrWrapper() {
            let i; let a; let u; let
              l;
            try {
              a = this, i = d(arguments), u = typeof r === 'function' ? r(i, a) : r || {};
            } catch (p) {
              o([p, '', [i, a, s], u], t);
            }
            c(`${n}start`, [i, a, s], u, f);
            try {
              return l = e.apply(a, i);
            } catch (h) {
              throw c(`${n}err`, [i, a, h], u, f), h;
            } finally {
              c(`${n}end`, [i, a, l], u, f);
            }
          }
          return a(e) ? e : (n || (n = ''), nrWrapper[l] = e, i(e, nrWrapper, t), nrWrapper);
        }

        function r(t, e, r, o, i) {
          r || (r = '');
          let c; let s; let f; const
            u = r.charAt(0) === '-';
          for (f = 0; f < e.length; f++) s = e[f], c = t[s], a(c) || (t[s] = n(c, u ? s + r : r, o, s, i));
        }

        function c(n, r, i, a) {
          if (!h || e) {
            const c = h;
            h = !0;
            try {
              t.emit(n, r, i, e, a);
            } catch (s) {
              o([s, n, r, i], t);
            }
            h = c;
          }
        }
        return t || (t = u), n.inPlace = r, n.flag = l, n;
      }

      function o(t, e) {
        e || (e = u);
        try {
          e.emit('internal-error', t);
        } catch (n) { }
      }

      function i(t, e, n) {
        if (Object.defineProperty && Object.keys) {
          try {
            const r = Object.keys(t);
            return r.forEach((n) => {
              Object.defineProperty(e, n, {
                get() {
                  return t[n];
                },
                set(e) {
                  return t[n] = e, e;
                },
              });
            }), e;
          } catch (i) {
            o([i], n);
          }
        }
        for (const a in t) p.call(t, a) && (e[a] = t[a]);
        return e;
      }

      function a(t) {
        return !(t && t instanceof Function && t.apply && !t[l]);
      }

      function c(t, e) {
        const n = e(t);
        return n[l] = t, i(t, n, u), n;
      }

      function s(t, e, n) {
        const r = t[e];
        t[e] = c(r, n);
      }

      function f() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; ++n) e[n] = arguments[n];
        return e;
      }
      var u = t('ee');
      var d = t(30);
      var l = 'nr@original';
      var p = Object.prototype.hasOwnProperty;
      var h = !1;
      e.exports = r, e.exports.wrapFunction = c, e.exports.wrapInPlace = s, e.exports.argsToArray = f;
    }, {}],
  }, {}, ['loader', 2, 16, 5, 3, 4]));
  NREUM.loader_config = {
    accountID: NRconfig.accountID,
    trustKey: NRconfig.trustKey,
    agentID: NRconfig.agentID,
    licenseKey: NRconfig.licenseKey,
    applicationID: NRconfig.appID,
  };
  NREUM.info = {
    beacon: 'bam.nr-data.net',
    errorBeacon: 'bam.nr-data.net',
    licenseKey: NRconfig.licenseKey,
    applicationID: NRconfig.appID,
    sa: 1,
  };
}
