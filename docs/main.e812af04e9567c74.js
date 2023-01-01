"use strict";
(self.webpackChunkangular_coding_challenge =
  self.webpackChunkangular_coding_challenge || []).push([
  [179],
  {
    607: () => {
      function se(e) {
        return "function" == typeof e;
      }
      function Ni(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const us = Ni(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Oi(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class Dt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const o of n) o.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (se(r))
              try {
                r();
              } catch (o) {
                t = o instanceof us ? o.errors : [o];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const o of i)
                try {
                  vh(o);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof us ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new us(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) vh(t);
            else {
              if (t instanceof Dt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Oi(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Oi(n, t), t instanceof Dt && t._removeParent(this);
        }
      }
      Dt.EMPTY = (() => {
        const e = new Dt();
        return (e.closed = !0), e;
      })();
      const mh = Dt.EMPTY;
      function yh(e) {
        return (
          e instanceof Dt ||
          (e && "closed" in e && se(e.remove) && se(e.add) && se(e.unsubscribe))
        );
      }
      function vh(e) {
        se(e) ? e() : e.unsubscribe();
      }
      const nr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        cs = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = cs;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = cs;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Dh(e) {
        cs.setTimeout(() => {
          const { onUnhandledError: t } = nr;
          if (!t) throw e;
          t(e);
        });
      }
      function wh() {}
      const zC = kl("C", void 0, void 0);
      function kl(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let rr = null;
      function ds(e) {
        if (nr.useDeprecatedSynchronousErrorHandling) {
          const t = !rr;
          if ((t && (rr = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = rr;
            if (((rr = null), n)) throw r;
          }
        } else e();
      }
      class Pl extends Dt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), yh(t) && t.add(this))
              : (this.destination = ZC);
        }
        static create(t, n, r) {
          return new Fi(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Ol(
                (function qC(e) {
                  return kl("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Ol(
                (function WC(e) {
                  return kl("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Ol(zC, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const YC = Function.prototype.bind;
      function Nl(e, t) {
        return YC.call(e, t);
      }
      class KC {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              fs(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              fs(r);
            }
          else fs(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              fs(n);
            }
        }
      }
      class Fi extends Pl {
        constructor(t, n, r) {
          let i;
          if ((super(), se(t) || !t))
            i = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let o;
            this && nr.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: t.next && Nl(t.next, o),
                  error: t.error && Nl(t.error, o),
                  complete: t.complete && Nl(t.complete, o),
                }))
              : (i = t);
          }
          this.destination = new KC(i);
        }
      }
      function fs(e) {
        nr.useDeprecatedSynchronousErrorHandling
          ? (function GC(e) {
              nr.useDeprecatedSynchronousErrorHandling &&
                rr &&
                ((rr.errorThrown = !0), (rr.error = e));
            })(e)
          : Dh(e);
      }
      function Ol(e, t) {
        const { onStoppedNotification: n } = nr;
        n && cs.setTimeout(() => n(e, t));
      }
      const ZC = {
          closed: !0,
          next: wh,
          error: function QC(e) {
            throw e;
          },
          complete: wh,
        },
        Fl =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function ir(e) {
        return e;
      }
      function bh(e) {
        return 0 === e.length
          ? ir
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, i) => i(r), n);
            };
      }
      let De = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const o = (function e0(e) {
              return (
                (e && e instanceof Pl) ||
                ((function XC(e) {
                  return e && se(e.next) && se(e.error) && se(e.complete);
                })(e) &&
                  yh(e))
              );
            })(n)
              ? n
              : new Fi(n, r, i);
            return (
              ds(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Ch(r))((i, o) => {
              const s = new Fi({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Fl]() {
            return this;
          }
          pipe(...n) {
            return bh(n)(this);
          }
          toPromise(n) {
            return new (n = Ch(n))((r, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Ch(e) {
        var t;
        return null !== (t = e ?? nr.Promise) && void 0 !== t ? t : Promise;
      }
      const t0 = Ni(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Yt = (() => {
        class e extends De {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new _h(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new t0();
          }
          next(n) {
            ds(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            ds(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            ds(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: o } = this;
            return r || i
              ? mh
              : ((this.currentObservers = null),
                o.push(n),
                new Dt(() => {
                  (this.currentObservers = null), Oi(o, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: o } = this;
            r ? n.error(i) : o && n.complete();
          }
          asObservable() {
            const n = new De();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new _h(t, n)), e;
      })();
      class _h extends Yt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : mh;
        }
      }
      function Eh(e) {
        return se(e?.lift);
      }
      function Pe(e) {
        return (t) => {
          if (Eh(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ne(e, t, n, r, i) {
        return new n0(e, t, n, r, i);
      }
      class n0 extends Pl {
        constructor(t, n, r, i, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function K(e, t) {
        return Pe((n, r) => {
          let i = 0;
          n.subscribe(
            Ne(r, (o) => {
              r.next(e.call(t, o, i++));
            })
          );
        });
      }
      function or(e) {
        return this instanceof or ? ((this.v = e), this) : new or(e);
      }
      function s0(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var i,
          r = n.apply(e, t || []),
          o = [];
        return (
          (i = {}),
          s("next"),
          s("throw"),
          s("return"),
          (i[Symbol.asyncIterator] = function () {
            return this;
          }),
          i
        );
        function s(f) {
          r[f] &&
            (i[f] = function (h) {
              return new Promise(function (p, g) {
                o.push([f, h, p, g]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function l(f) {
              f.value instanceof or
                ? Promise.resolve(f.value.v).then(u, c)
                : d(o[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(o[0][3], p);
          }
        }
        function u(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function a0(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function xh(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(o) {
          n[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function i(o, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    o({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      const Mh = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Th(e) {
        return se(e?.then);
      }
      function Ah(e) {
        return se(e[Fl]);
      }
      function Rh(e) {
        return Symbol.asyncIterator && se(e?.[Symbol.asyncIterator]);
      }
      function kh(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Ph = (function u0() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Nh(e) {
        return se(e?.[Ph]);
      }
      function Oh(e) {
        return s0(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield or(n.read());
              if (i) return yield or(void 0);
              yield yield or(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Fh(e) {
        return se(e?.getReader);
      }
      function Kt(e) {
        if (e instanceof De) return e;
        if (null != e) {
          if (Ah(e))
            return (function c0(e) {
              return new De((t) => {
                const n = e[Fl]();
                if (se(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Mh(e))
            return (function d0(e) {
              return new De((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Th(e))
            return (function f0(e) {
              return new De((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Dh);
              });
            })(e);
          if (Rh(e)) return Lh(e);
          if (Nh(e))
            return (function h0(e) {
              return new De((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Fh(e))
            return (function p0(e) {
              return Lh(Oh(e));
            })(e);
        }
        throw kh(e);
      }
      function Lh(e) {
        return new De((t) => {
          (function g0(e, t) {
            var n, r, i, o;
            return (function r0(e, t, n, r) {
              return new (n || (n = Promise))(function (o, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? o(c.value)
                    : (function i(o) {
                        return o instanceof n
                          ? o
                          : new n(function (s) {
                              s(o);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = a0(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  r && !r.done && (o = n.return) && (yield o.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function ln(e, t, n, r = 0, i = !1) {
        const o = t.schedule(function () {
          n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(o), !i)) return o;
      }
      function Fe(e, t, n = 1 / 0) {
        return se(t)
          ? Fe((r, i) => K((o, s) => t(r, o, i, s))(Kt(e(r, i))), n)
          : ("number" == typeof t && (n = t),
            Pe((r, i) =>
              (function m0(e, t, n, r, i, o, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && t.complete();
                  },
                  h = (g) => (u < r ? p(g) : l.push(g)),
                  p = (g) => {
                    o && t.next(g), u++;
                    let y = !1;
                    Kt(n(g, c++)).subscribe(
                      Ne(
                        t,
                        (v) => {
                          i?.(v), o ? h(v) : t.next(v);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (u--; l.length && u < r; ) {
                                const v = l.shift();
                                s ? ln(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ne(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, i, e, n)
            ));
      }
      function Tr(e = 1 / 0) {
        return Fe(ir, e);
      }
      const un = new De((e) => e.complete());
      function jl(e) {
        return e[e.length - 1];
      }
      function Li(e) {
        return (function v0(e) {
          return e && se(e.schedule);
        })(jl(e))
          ? e.pop()
          : void 0;
      }
      function jh(e, t = 0) {
        return Pe((n, r) => {
          n.subscribe(
            Ne(
              r,
              (i) => ln(r, e, () => r.next(i), t),
              () => ln(r, e, () => r.complete(), t),
              (i) => ln(r, e, () => r.error(i), t)
            )
          );
        });
      }
      function $h(e, t = 0) {
        return Pe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Vh(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new De((n) => {
          ln(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            ln(
              n,
              t,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ie(e, t) {
        return t
          ? (function S0(e, t) {
              if (null != e) {
                if (Ah(e))
                  return (function b0(e, t) {
                    return Kt(e).pipe($h(t), jh(t));
                  })(e, t);
                if (Mh(e))
                  return (function _0(e, t) {
                    return new De((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Th(e))
                  return (function C0(e, t) {
                    return Kt(e).pipe($h(t), jh(t));
                  })(e, t);
                if (Rh(e)) return Vh(e, t);
                if (Nh(e))
                  return (function E0(e, t) {
                    return new De((n) => {
                      let r;
                      return (
                        ln(n, t, () => {
                          (r = e[Ph]()),
                            ln(
                              n,
                              t,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                o ? n.complete() : n.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => se(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Fh(e))
                  return (function I0(e, t) {
                    return Vh(Oh(e), t);
                  })(e, t);
              }
              throw kh(e);
            })(e, t)
          : Kt(e);
      }
      function $l(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Fi({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function re(e) {
        for (let t in e) if (e[t] === re) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ie(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ie).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Hl(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const T0 = re({ __forward_ref__: re });
      function Bl(e) {
        return (
          (e.__forward_ref__ = Bl),
          (e.toString = function () {
            return ie(this());
          }),
          e
        );
      }
      function F(e) {
        return (function Ul(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(T0) &&
            e.__forward_ref__ === Bl
          );
        })(e)
          ? e()
          : e;
      }
      class I extends Error {
        constructor(t, n) {
          super(
            (function hs(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function H(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function ps(e, t) {
        throw new I(-201, !1);
      }
      function ct(e, t) {
        null == e &&
          (function te(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function j(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function wt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function gs(e) {
        return Hh(e, ms) || Hh(e, Uh);
      }
      function Hh(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Bh(e) {
        return e && (e.hasOwnProperty(zl) || e.hasOwnProperty(j0))
          ? e[zl]
          : null;
      }
      const ms = re({ ɵprov: re }),
        zl = re({ ɵinj: re }),
        Uh = re({ ngInjectableDef: re }),
        j0 = re({ ngInjectorDef: re });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let Wl;
      function bt(e) {
        const t = Wl;
        return (Wl = e), t;
      }
      function zh(e, t, n) {
        const r = gs(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & N.Optional
          ? null
          : void 0 !== t
          ? t
          : void ps(ie(e));
      }
      function Pn(e) {
        return { toString: e }.toString();
      }
      var Pt = (() => (
          ((Pt = Pt || {})[(Pt.OnPush = 0)] = "OnPush"),
          (Pt[(Pt.Default = 1)] = "Default"),
          Pt
        ))(),
        Qt = (() => {
          return (
            ((e = Qt || (Qt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Qt
          );
          var e;
        })();
      const oe = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Ar = {},
        ee = [],
        ys = re({ ɵcmp: re }),
        ql = re({ ɵdir: re }),
        Gl = re({ ɵpipe: re }),
        Wh = re({ ɵmod: re }),
        dn = re({ ɵfac: re }),
        ji = re({ __NG_ELEMENT_ID__: re });
      let V0 = 0;
      function Ct(e) {
        return Pn(() => {
          const n = !0 === e.standalone,
            r = {},
            i = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Pt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || ee,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Qt.Emulated,
              id: "c" + V0++,
              styles: e.styles || ee,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            o = e.dependencies,
            s = e.features;
          return (
            (i.inputs = Yh(e.inputs, r)),
            (i.outputs = Yh(e.outputs)),
            s && s.forEach((a) => a(i)),
            (i.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(qh).filter(Gh)
              : null),
            (i.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Ke).filter(Gh)
              : null),
            i
          );
        });
      }
      function qh(e) {
        return ne(e) || Ye(e);
      }
      function Gh(e) {
        return null !== e;
      }
      function Nt(e) {
        return Pn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || ee,
          declarations: e.declarations || ee,
          imports: e.imports || ee,
          exports: e.exports || ee,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Yh(e, t) {
        if (null == e) return Ar;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (n[i] = r),
              t && (t[i] = o);
          }
        return n;
      }
      const Ve = Ct;
      function ne(e) {
        return e[ys] || null;
      }
      function Ye(e) {
        return e[ql] || null;
      }
      function Ke(e) {
        return e[Gl] || null;
      }
      function dt(e, t) {
        const n = e[Wh] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${ie(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const W = 11;
      function st(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function Ft(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Ql(e) {
        return 0 != (8 & e.flags);
      }
      function bs(e) {
        return 2 == (2 & e.flags);
      }
      function Cs(e) {
        return 1 == (1 & e.flags);
      }
      function Lt(e) {
        return null !== e.template;
      }
      function q0(e) {
        return 0 != (256 & e[2]);
      }
      function cr(e, t) {
        return e.hasOwnProperty(dn) ? e[dn] : null;
      }
      class K0 {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Nn() {
        return Zh;
      }
      function Zh(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Z0), Q0;
      }
      function Q0() {
        const e = Xh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Ar) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Z0(e, t, n, r) {
        const i =
            Xh(e) ||
            (function J0(e, t) {
              return (e[Jh] = t);
            })(e, { previous: Ar, current: null }),
          o = i.current || (i.current = {}),
          s = i.previous,
          a = this.declaredInputs[n],
          l = s[a];
        (o[a] = new K0(l && l.currentValue, t, s === Ar)), (e[r] = t);
      }
      Nn.ngInherit = !0;
      const Jh = "__ngSimpleChanges__";
      function Xh(e) {
        return e[Jh] || null;
      }
      function we(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function It(e, t) {
        return we(t[e.index]);
      }
      function tu(e, t) {
        return e.data[t];
      }
      function ht(e, t) {
        const n = t[e];
        return st(n) ? n : n[0];
      }
      function Es(e) {
        return 64 == (64 & e[2]);
      }
      function On(e, t) {
        return null == t ? null : e[t];
      }
      function tp(e) {
        e[18] = 0;
      }
      function nu(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const $ = { lFrame: cp(null), bindingsEnabled: !0 };
      function rp() {
        return $.bindingsEnabled;
      }
      function D() {
        return $.lFrame.lView;
      }
      function Z() {
        return $.lFrame.tView;
      }
      function fn(e) {
        return ($.lFrame.contextLView = e), e[8];
      }
      function hn(e) {
        return ($.lFrame.contextLView = null), e;
      }
      function Se() {
        let e = ip();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function ip() {
        return $.lFrame.currentTNode;
      }
      function Zt(e, t) {
        const n = $.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function ru() {
        return $.lFrame.isParent;
      }
      function Lr() {
        return $.lFrame.bindingIndex++;
      }
      function f_(e, t) {
        const n = $.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), ou(t);
      }
      function ou(e) {
        $.lFrame.currentDirectiveIndex = e;
      }
      function au(e) {
        $.lFrame.currentQueryIndex = e;
      }
      function p_(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function lp(e, t, n) {
        if (n & N.SkipSelf) {
          let i = t,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & N.Host ||
              ((i = p_(o)), null === i || ((o = o[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = o);
        }
        const r = ($.lFrame = up());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function lu(e) {
        const t = up(),
          n = e[1];
        ($.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function up() {
        const e = $.lFrame,
          t = null === e ? null : e.child;
        return null === t ? cp(e) : t;
      }
      function cp(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function dp() {
        const e = $.lFrame;
        return (
          ($.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const fp = dp;
      function uu() {
        const e = dp();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ze() {
        return $.lFrame.selectedIndex;
      }
      function Fn(e) {
        $.lFrame.selectedIndex = e;
      }
      function he() {
        const e = $.lFrame;
        return tu(e.tView, e.selectedIndex);
      }
      function Ss(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const o = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = o;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function xs(e, t, n) {
        hp(e, t, 3, n);
      }
      function Ms(e, t, n, r) {
        (3 & e[2]) === n && hp(e, t, n, r);
      }
      function cu(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function hp(e, t, n, r) {
        const o = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[18] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[18] += 65536),
              (a < o || -1 == o) &&
                (__(e, n, t, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++;
      }
      function __(e, t, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          a = e[i ? -n[r] : n[r]];
        if (i) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              o.call(a);
            } finally {
            }
          }
        } else
          try {
            o.call(a);
          } finally {
          }
      }
      class Ui {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Ts(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, o);
          } else {
            const o = i,
              s = n[++r];
            gp(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), r++;
          }
        }
        return r;
      }
      function pp(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function gp(e) {
        return 64 === e.charCodeAt(0);
      }
      function As(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  mp(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function mp(e, t, n, r, i) {
        let o = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (e[o + 1] = i));
            if (r === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, n),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i);
      }
      function yp(e) {
        return -1 !== e;
      }
      function jr(e) {
        return 32767 & e;
      }
      function $r(e, t) {
        let n = (function M_(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let fu = !0;
      function Rs(e) {
        const t = fu;
        return (fu = e), t;
      }
      let T_ = 0;
      const Jt = {};
      function Wi(e, t) {
        const n = pu(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          hu(r.data, e),
          hu(t, null),
          hu(r.blueprint, null));
        const i = ks(e, t),
          o = e.injectorIndex;
        if (yp(i)) {
          const s = jr(i),
            a = $r(i, t),
            l = a[1].data;
          for (let u = 0; u < 8; u++) t[o + u] = a[s + u] | l[s + u];
        }
        return (t[o + 8] = i), o;
      }
      function hu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function pu(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function ks(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          i = t;
        for (; null !== i; ) {
          if (((r = Sp(i)), null === r)) return -1;
          if ((n++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Ps(e, t, n) {
        !(function A_(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(ji) && (r = n[ji]),
            null == r && (r = n[ji] = T_++);
          const i = 255 & r;
          t.data[e + (i >> 5)] |= 1 << i;
        })(e, t, n);
      }
      function wp(e, t, n) {
        if (n & N.Optional) return e;
        ps();
      }
      function bp(e, t, n, r) {
        if (
          (n & N.Optional && void 0 === r && (r = null),
          0 == (n & (N.Self | N.Host)))
        ) {
          const i = e[9],
            o = bt(void 0);
          try {
            return i ? i.get(t, r, n & N.Optional) : zh(t, r, n & N.Optional);
          } finally {
            bt(o);
          }
        }
        return wp(r, 0, n);
      }
      function Cp(e, t, n, r = N.Default, i) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function F_(e, t, n, r, i) {
              let o = e,
                s = t;
              for (
                ;
                null !== o && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = _p(o, s, n, r | N.Self, Jt);
                if (a !== Jt) return a;
                let l = o.parent;
                if (!l) {
                  const u = s[21];
                  if (u) {
                    const c = u.get(n, Jt, r);
                    if (c !== Jt) return c;
                  }
                  (l = Sp(s)), (s = s[15]);
                }
                o = l;
              }
              return i;
            })(e, t, n, r, Jt);
            if (s !== Jt) return s;
          }
          const o = _p(e, t, n, r, Jt);
          if (o !== Jt) return o;
        }
        return bp(t, n, r, i);
      }
      function _p(e, t, n, r, i) {
        const o = (function P_(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(ji) ? e[ji] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : N_) : t;
        })(n);
        if ("function" == typeof o) {
          if (!lp(t, e, r)) return r & N.Host ? wp(i, 0, r) : bp(t, n, r, i);
          try {
            const s = o(r);
            if (null != s || r & N.Optional) return s;
            ps();
          } finally {
            fp();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = pu(e, t),
            l = -1,
            u = r & N.Host ? t[16][6] : null;
          for (
            (-1 === a || r & N.SkipSelf) &&
            ((l = -1 === a ? ks(e, t) : t[a + 8]),
            -1 !== l && Ip(r, !1)
              ? ((s = t[1]), (a = jr(l)), (t = $r(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (Ep(o, a, c.data)) {
              const d = k_(a, t, n, s, r, u);
              if (d !== Jt) return d;
            }
            (l = t[a + 8]),
              -1 !== l && Ip(r, t[1].data[a + 8] === u) && Ep(o, a, t)
                ? ((s = c), (a = jr(l)), (t = $r(l, t)))
                : (a = -1);
          }
        }
        return i;
      }
      function k_(e, t, n, r, i, o) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function Ns(e, t, n, r, i) {
            const o = e.providerIndexes,
              s = t.data,
              a = 1048575 & o,
              l = e.directiveStart,
              c = o >> 20,
              f = i ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (i) {
              const h = s[l];
              if (h && Lt(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? bs(a) && fu : r != s && 0 != (3 & a.type),
            i & N.Host && o === a
          );
        return null !== c ? qi(t, s, c, a) : Jt;
      }
      function qi(e, t, n, r) {
        let i = e[n];
        const o = t.data;
        if (
          (function E_(e) {
            return e instanceof Ui;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function A0(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new I(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function X(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : H(e);
              })(o[n])
            );
          const a = Rs(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? bt(s.injectImpl) : null;
          lp(e, r, N.Default);
          try {
            (i = e[n] = s.factory(void 0, o, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function C_(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (r) {
                    const s = Zh(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, o));
                })(n, o[n], t);
          } finally {
            null !== l && bt(l), Rs(a), (s.resolving = !1), fp();
          }
        }
        return i;
      }
      function Ep(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Ip(e, t) {
        return !(e & N.Self || (e & N.Host && t));
      }
      class Vr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Cp(this._tNode, this._lView, t, r, n);
        }
      }
      function N_() {
        return new Vr(Se(), D());
      }
      function Sp(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const Br = "__parameters__";
      function zr(e, t, n) {
        return Pn(() => {
          const r = (function mu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(t);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(Br)
                ? l[Br]
                : Object.defineProperty(l, Br, { value: [] })[Br];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      class L {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = j({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function mn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? mn(n, t) : t(n)));
      }
      function Mp(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Os(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const Zi = {},
        wu = "__NG_DI_FLAG__",
        Ls = "ngTempTokenPath",
        Y_ = /\n/gm,
        kp = "__source";
      let Ji;
      function qr(e) {
        const t = Ji;
        return (Ji = e), t;
      }
      function Q_(e, t = N.Default) {
        if (void 0 === Ji) throw new I(-203, !1);
        return null === Ji
          ? zh(e, void 0, t)
          : Ji.get(e, t & N.Optional ? null : void 0, t);
      }
      function M(e, t = N.Default) {
        return (
          (function $0() {
            return Wl;
          })() || Q_
        )(F(e), t);
      }
      function ye(e, t = N.Default) {
        return (
          "number" != typeof t &&
            (t =
              0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4)),
          M(e, t)
        );
      }
      function bu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = F(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new I(900, !1);
            let i,
              o = N.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = Z_(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (o |= l)
                : (i = a);
            }
            t.push(M(i, o));
          } else t.push(M(r));
        }
        return t;
      }
      function Xi(e, t) {
        return (e[wu] = t), (e.prototype[wu] = t), e;
      }
      function Z_(e) {
        return e[wu];
      }
      const eo = Xi(zr("Optional"), 8),
        to = Xi(zr("SkipSelf"), 4);
      let _u;
      class Wp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      const bE =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      var be = (() => (
        ((be = be || {})[(be.NONE = 0)] = "NONE"),
        (be[(be.HTML = 1)] = "HTML"),
        (be[(be.STYLE = 2)] = "STYLE"),
        (be[(be.SCRIPT = 3)] = "SCRIPT"),
        (be[(be.URL = 4)] = "URL"),
        (be[(be.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        be
      ))();
      function Kr(e) {
        const t = (function so() {
          const e = D();
          return e && e[12];
        })();
        return t
          ? t.sanitize(be.URL, e) || ""
          : (function io(e, t) {
              const n = (function yE(e) {
                return (e instanceof Wp && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(
                  `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === t;
            })(e, "URL")
          ? (function jn(e) {
              return e instanceof Wp
                ? e.changingThisBreaksApplicationSecurity
                : e;
            })(e)
          : (function Bs(e) {
              return (e = String(e)).match(bE) ? e : "unsafe:" + e;
            })(H(e));
      }
      const Au = new L("ENVIRONMENT_INITIALIZER"),
        eg = new L("INJECTOR", -1),
        tg = new L("INJECTOR_DEF_TYPES");
      class ng {
        get(t, n = Zi) {
          if (n === Zi) {
            const r = new Error(`NullInjectorError: No provider for ${ie(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function OE(...e) {
        return { ɵproviders: rg(0, e) };
      }
      function rg(e, ...t) {
        const n = [],
          r = new Set();
        let i;
        return (
          mn(t, (o) => {
            const s = o;
            Ru(s, n, [], r) && (i || (i = []), i.push(s));
          }),
          void 0 !== i && ig(i, n),
          n
        );
      }
      function ig(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: i } = e[n];
          mn(i, (o) => {
            t.push(o);
          });
        }
      }
      function Ru(e, t, n, r) {
        if (!(e = F(e))) return !1;
        let i = null,
          o = Bh(e);
        const s = !o && ne(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          i = e;
        } else {
          const l = e.ngModule;
          if (((o = Bh(l)), !o)) return !1;
          i = l;
        }
        const a = r.has(i);
        if (s) {
          if (a) return !1;
          if ((r.add(i), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) Ru(u, t, n, r);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let u;
              r.add(i);
              try {
                mn(o.imports, (c) => {
                  Ru(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && ig(u, t);
            }
            if (!a) {
              const u = cr(i) || (() => new i());
              t.push(
                { provide: i, useFactory: u, deps: ee },
                { provide: tg, useValue: i, multi: !0 },
                { provide: Au, useValue: () => M(i), multi: !0 }
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              mn(l, (c) => {
                t.push(c);
              });
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      const FE = re({ provide: String, useValue: re });
      function ku(e) {
        return null !== e && "object" == typeof e && FE in e;
      }
      function dr(e) {
        return "function" == typeof e;
      }
      const Pu = new L("Set Injector scope."),
        zs = {},
        jE = {};
      let Nu;
      function Ws() {
        return void 0 === Nu && (Nu = new ng()), Nu;
      }
      class $n {}
      class ag extends $n {
        constructor(t, n, r, i) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Fu(t, (s) => this.processProvider(s)),
            this.records.set(eg, Qr(void 0, this)),
            i.has("environment") && this.records.set($n, Qr(void 0, this));
          const o = this.records.get(Pu);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(tg.multi, ee, N.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = qr(this),
            r = bt(void 0);
          try {
            return t();
          } finally {
            qr(n), bt(r);
          }
        }
        get(t, n = Zi, r = N.Default) {
          this.assertNotDestroyed();
          const i = qr(this),
            o = bt(void 0);
          try {
            if (!(r & N.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function UE(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof L)
                    );
                  })(t) && gs(t);
                (a = l && this.injectableDefInScope(l) ? Qr(Ou(t), zs) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & N.Self ? Ws() : this.parent).get(
              t,
              (n = r & N.Optional && n === Zi ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Ls] = s[Ls] || []).unshift(ie(t)), i)) throw s;
              return (function J_(e, t, n, r) {
                const i = e[Ls];
                throw (
                  (t[kp] && i.unshift(t[kp]),
                  (e.message = (function X_(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let i = ie(t);
                    if (Array.isArray(t)) i = t.map(ie).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ie(a))
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
                      Y_,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[Ls] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            bt(o), qr(i);
          }
        }
        resolveInjectorInitializers() {
          const t = qr(this),
            n = bt(void 0);
          try {
            const r = this.get(Au.multi, ee, N.Self);
            for (const i of r) i();
          } finally {
            qr(t), bt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(ie(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new I(205, !1);
        }
        processProvider(t) {
          let n = dr((t = F(t))) ? t : F(t && t.provide);
          const r = (function VE(e) {
            return ku(e)
              ? Qr(void 0, e.useValue)
              : Qr(
                  (function lg(e, t, n) {
                    let r;
                    if (dr(e)) {
                      const i = F(e);
                      return cr(i) || Ou(i);
                    }
                    if (ku(e)) r = () => F(e.useValue);
                    else if (
                      (function sg(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...bu(e.deps || []));
                    else if (
                      (function og(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => M(F(e.useExisting));
                    else {
                      const i = F(e && (e.useClass || e.provide));
                      if (
                        !(function HE(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return cr(i) || Ou(i);
                      r = () => new i(...bu(e.deps));
                    }
                    return r;
                  })(e),
                  zs
                );
          })(t);
          if (dr(t) || !0 !== t.multi) this.records.get(n);
          else {
            let i = this.records.get(n);
            i ||
              ((i = Qr(void 0, zs, !0)),
              (i.factory = () => bu(i.multi)),
              this.records.set(n, i)),
              (n = t),
              i.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === zs && ((n.value = jE), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function BE(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = F(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Ou(e) {
        const t = gs(e),
          n = null !== t ? t.factory : cr(e);
        if (null !== n) return n;
        if (e instanceof L) throw new I(204, !1);
        if (e instanceof Function)
          return (function $E(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Qi(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new I(204, !1))
              );
            const n = (function F0(e) {
              const t = e && (e[ms] || e[Uh]);
              if (t) {
                const n = (function L0(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new I(204, !1);
      }
      function Qr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function zE(e) {
        return !!e.ɵproviders;
      }
      function Fu(e, t) {
        for (const n of e)
          Array.isArray(n) ? Fu(n, t) : zE(n) ? Fu(n.ɵproviders, t) : t(n);
      }
      class ug {}
      class GE {
        resolveComponentFactory(t) {
          throw (function qE(e) {
            const t = Error(
              `No component factory found for ${ie(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let ao = (() => {
        class e {}
        return (e.NULL = new GE()), e;
      })();
      function YE() {
        return Zr(Se(), D());
      }
      function Zr(e, t) {
        return new Vn(It(e, t));
      }
      let Vn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = YE), e;
      })();
      class dg {}
      let ZE = (() => {
        class e {}
        return (
          (e.ɵprov = j({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class Gs {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const JE = new Gs("14.2.1"),
        Lu = {};
      function Bu(e) {
        return e.ngOriginalError;
      }
      class Jr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Bu(t);
          for (; n && Bu(n); ) n = Bu(n);
          return n || null;
        }
      }
      const Uu = new Map();
      let cI = 0;
      const Wu = "__ngContext__";
      function Ue(e, t) {
        st(t)
          ? ((e[Wu] = t[20]),
            (function fI(e) {
              Uu.set(e[20], e);
            })(t))
          : (e[Wu] = t);
      }
      function lo(e) {
        const t = e[Wu];
        return "number" == typeof t
          ? (function yg(e) {
              return Uu.get(e) || null;
            })(t)
          : t || null;
      }
      function qu(e) {
        const t = lo(e);
        return t ? (st(t) ? t : t.lView) : null;
      }
      function yn(e) {
        return e instanceof Function ? e() : e;
      }
      var at = (() => (
        ((at = at || {})[(at.Important = 1)] = "Important"),
        (at[(at.DashCase = 2)] = "DashCase"),
        at
      ))();
      function Yu(e, t) {
        return undefined(e, t);
      }
      function uo(e) {
        const t = e[3];
        return Ft(t) ? t[3] : t;
      }
      function Ku(e) {
        return Eg(e[13]);
      }
      function Qu(e) {
        return Eg(e[4]);
      }
      function Eg(e) {
        for (; null !== e && !Ft(e); ) e = e[4];
        return e;
      }
      function ei(e, t, n, r, i) {
        if (null != r) {
          let o,
            s = !1;
          Ft(r) ? (o = r) : st(r) && ((s = !0), (r = r[0]));
          const a = we(r);
          0 === e && null !== n
            ? null == i
              ? Ag(t, n, a)
              : fr(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? fr(t, n, a, i || null, !0)
            : 2 === e
            ? (function Lg(e, t, n) {
                const r = Ys(e, t);
                r &&
                  (function $I(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != o &&
              (function BI(e, t, n, r, i) {
                const o = n[7];
                o !== we(n) && ei(t, e, r, o, i);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  co(l[1], l, e, t, r, o);
                }
              })(t, e, o, n, i);
        }
      }
      function Ju(e, t, n) {
        return e.createElement(t, n);
      }
      function Sg(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          i = t[3];
        512 & t[2] && ((t[2] &= -513), nu(i, -1)), n.splice(r, 1);
      }
      function Xu(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const i = r[17];
          null !== i && i !== e && Sg(i, r), t > 0 && (e[n - 1][4] = r[4]);
          const o = Os(e, 10 + t);
          !(function RI(e, t) {
            co(e, t, t[W], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = o[19];
          null !== s && s.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function xg(e, t) {
        if (!(128 & t[2])) {
          const n = t[W];
          n.destroyNode && co(e, t, n, 3, null, null),
            (function NI(e) {
              let t = e[13];
              if (!t) return ec(e[1], e);
              for (; t; ) {
                let n = null;
                if (st(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    st(t) && ec(t[1], t), (t = t[3]);
                  null === t && (t = e), st(t) && ec(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function ec(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function jI(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]];
                  if (!(i instanceof Ui)) {
                    const o = n[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          l = o[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(i);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function LI(e, t) {
              const n = e.cleanup,
                r = t[7];
              let i = -1;
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ("string" == typeof n[o]) {
                    const s = n[o + 1],
                      a = "function" == typeof s ? s(t) : we(t[s]),
                      l = r[(i = n[o + 2])],
                      u = n[o + 3];
                    "boolean" == typeof u
                      ? a.removeEventListener(n[o], l, u)
                      : u >= 0
                      ? r[(i = u)]()
                      : r[(i = -u)].unsubscribe(),
                      (o += 2);
                  } else {
                    const s = r[(i = n[o + 1])];
                    n[o].call(s);
                  }
              if (null !== r) {
                for (let o = i + 1; o < r.length; o++) (0, r[o])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[W].destroy();
          const n = t[17];
          if (null !== n && Ft(t[3])) {
            n !== t[3] && Sg(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function hI(e) {
            Uu.delete(e[20]);
          })(t);
        }
      }
      function Mg(e, t, n) {
        return (function Tg(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const i = e.data[r.directiveStart].encapsulation;
            if (i === Qt.None || i === Qt.Emulated) return null;
          }
          return It(r, n);
        })(e, t.parent, n);
      }
      function fr(e, t, n, r, i) {
        e.insertBefore(t, n, r, i);
      }
      function Ag(e, t, n) {
        e.appendChild(t, n);
      }
      function Rg(e, t, n, r, i) {
        null !== r ? fr(e, t, n, r, i) : Ag(e, t, n);
      }
      function Ys(e, t) {
        return e.parentNode(t);
      }
      let Ng = function Pg(e, t, n) {
        return 40 & e.type ? It(e, n) : null;
      };
      function Ks(e, t, n, r) {
        const i = Mg(e, r, t),
          o = t[W],
          a = (function kg(e, t, n) {
            return Ng(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != i)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) Rg(o, i, n[l], a, !1);
          else Rg(o, i, n, a, !1);
      }
      function Qs(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return It(t, e);
          if (4 & n) return nc(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Qs(e, r);
            {
              const i = e[t.index];
              return Ft(i) ? nc(-1, i) : we(i);
            }
          }
          if (32 & n) return Yu(t, e)() || we(e[t.index]);
          {
            const r = Fg(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Qs(uo(e[16]), r)
              : Qs(e, t.next);
          }
        }
        return null;
      }
      function Fg(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function nc(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[1].firstChild;
          if (null !== i) return Qs(r, i);
        }
        return t[7];
      }
      function rc(e, t, n, r, i, o, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && Ue(we(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) rc(e, t, n.child, r, i, o, !1), ei(t, e, i, a, o);
            else if (32 & l) {
              const u = Yu(n, r);
              let c;
              for (; (c = u()); ) ei(t, e, i, c, o);
              ei(t, e, i, a, o);
            } else 16 & l ? jg(e, t, r, n, i, o) : ei(t, e, i, a, o);
          n = s ? n.projectionNext : n.next;
        }
      }
      function co(e, t, n, r, i, o) {
        rc(n, r, e.firstChild, t, i, o, !1);
      }
      function jg(e, t, n, r, i, o) {
        const s = n[16],
          l = s[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) ei(t, e, i, l[u], o);
        else rc(e, t, l, s[3], i, o, !0);
      }
      function $g(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function ic(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Vg(e, t, n) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length;
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
          }
          n = i + 1;
        }
      }
      const Hg = "ng-template";
      function zI(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let i = e[r++];
          if (n && "class" === i) {
            if (((i = e[r]), -1 !== Vg(i.toLowerCase(), t, 0))) return !0;
          } else if (1 === i) {
            for (; r < e.length && "string" == typeof (i = e[r++]); )
              if (i.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Bg(e) {
        return 4 === e.type && e.value !== Hg;
      }
      function WI(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Hg);
      }
      function qI(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          o = (function KI(e) {
            for (let t = 0; t < e.length; t++) if (pp(e[t])) return t;
            return e.length;
          })(i);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !WI(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (jt(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!zI(e.attrs, u, n)) {
                    if (jt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = GI(8 & r ? "class" : l, i, Bg(e), n);
                if (-1 === d) {
                  if (jt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > o ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Vg(h, u, 0)) || (2 & r && u !== f)) {
                    if (jt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !jt(r) && !jt(l)) return !1;
            if (s && jt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return jt(r) || s;
      }
      function jt(e) {
        return 0 == (1 & e);
      }
      function GI(e, t, n, r) {
        if (null === t) return -1;
        let i = 0;
        if (r || !n) {
          let o = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++i];
                for (; "string" == typeof a; ) a = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function QI(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Ug(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (qI(e, t[r], n)) return !0;
        return !1;
      }
      function zg(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function JI(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = "",
          o = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
          else
            "" !== i && !jt(s) && ((t += zg(o, i)), (i = "")),
              (r = s),
              (o = o || !jt(r));
          n++;
        }
        return "" !== i && (t += zg(o, i)), t;
      }
      const B = {};
      function q(e) {
        Wg(Z(), D(), Ze() + e, !1);
      }
      function Wg(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const o = e.preOrderCheckHooks;
            null !== o && xs(t, o, n);
          } else {
            const o = e.preOrderHooks;
            null !== o && Ms(t, o, 0, n);
          }
        Fn(n);
      }
      function Kg(e, t = null, n = null, r) {
        const i = Qg(e, t, n, r);
        return i.resolveInjectorInitializers(), i;
      }
      function Qg(e, t = null, n = null, r, i = new Set()) {
        const o = [n || ee, OE(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ie(e))),
          new ag(o, t || Ws(), r || null, i)
        );
      }
      let St = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Kg({ name: "" }, r, n, "");
            {
              const i = n.name ?? "";
              return Kg({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Zi),
          (e.NULL = new ng()),
          (e.ɵprov = j({ token: e, providedIn: "any", factory: () => M(eg) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function T(e, t = N.Default) {
        const n = D();
        return null === n ? M(e, t) : Cp(Se(), n, F(e), t);
      }
      function uc() {
        throw new Error("invalid");
      }
      function hm(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              o = n[r + 1];
            if (-1 !== o) {
              const s = e.data[o];
              au(i), s.contentQueries(2, t[o], o);
            }
          }
      }
      function ta(e, t, n, r, i, o, s, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = i),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          tp(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[W] = a || (e && e[W])),
          (d[12] = l || (e && e[12]) || null),
          (d[9] = u || (e && e[9]) || null),
          (d[6] = o),
          (d[20] = (function dI() {
            return cI++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function ni(e, t, n, r, i) {
        let o = e.data[t];
        if (null === o)
          (o = (function wc(e, t, n, r, i) {
            const o = ip(),
              s = ru(),
              l = (e.data[t] = (function OS(e, t, n, r, i, o) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? o : o && o.parent, n, t, r, i));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && (o.next = l)),
              l
            );
          })(e, t, n, r, i)),
            (function d_() {
              return $.lFrame.inI18n;
            })() && (o.flags |= 64);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = i);
          const s = (function Bi() {
            const e = $.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Zt(o, !0), o;
      }
      function ri(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let o = 0; o < n; o++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function na(e, t, n) {
        lu(t);
        try {
          const r = e.viewQuery;
          null !== r && Tc(1, r, n);
          const i = e.template;
          null !== i && pm(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && hm(e, t),
            e.staticViewQueries && Tc(2, e.viewQuery, n);
          const o = e.components;
          null !== o &&
            (function RS(e, t) {
              for (let n = 0; n < t.length; n++) ZS(e, t[n]);
            })(t, o);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), uu();
        }
      }
      function fo(e, t, n, r) {
        const i = t[2];
        if (128 != (128 & i)) {
          lu(t);
          try {
            tp(t),
              (function op(e) {
                return ($.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && pm(e, t, n, 2, r);
            const s = 3 == (3 & i);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && xs(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && Ms(t, u, 0, null), cu(t, 0);
            }
            if (
              ((function KS(e) {
                for (let t = Ku(e); null !== t; t = Qu(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r],
                      o = i[3];
                    0 == (512 & i[2]) && nu(o, 1), (i[2] |= 512);
                  }
                }
              })(t),
              (function YS(e) {
                for (let t = Ku(e); null !== t; t = Qu(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      i = r[1];
                    Es(r) && fo(i, r, i.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && hm(e, t),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && xs(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && Ms(t, u, 1), cu(t, 1);
            }
            !(function TS(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r];
                    if (i < 0) Fn(~i);
                    else {
                      const o = i,
                        s = n[++r],
                        a = n[++r];
                      f_(s, o), a(2, t[o]);
                    }
                  }
                } finally {
                  Fn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function AS(e, t) {
                for (let n = 0; n < t.length; n++) QS(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && Tc(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && xs(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && Ms(t, u, 2), cu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), nu(t[3], -1));
          } finally {
            uu();
          }
        }
      }
      function kS(e, t, n, r) {
        const i = t[10],
          s = (function ep(e) {
            return 4 == (4 & e[2]);
          })(t);
        try {
          !s && i.begin && i.begin(), s && na(e, t, r), fo(e, t, n, r);
        } finally {
          !s && i.end && i.end();
        }
      }
      function pm(e, t, n, r, i) {
        const o = Ze(),
          s = 2 & r;
        try {
          Fn(-1), s && t.length > 22 && Wg(e, t, 22, !1), n(r, i);
        } finally {
          Fn(o);
        }
      }
      function bc(e, t, n) {
        !rp() ||
          ((function VS(e, t, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd;
            e.firstCreatePass || Wi(n, t), Ue(r, t);
            const s = n.initialInputs;
            for (let a = i; a < o; a++) {
              const l = e.data[a],
                u = Lt(l);
              u && WS(t, n, l);
              const c = qi(t, e, a, n);
              Ue(c, t),
                null !== s && qS(0, a - i, c, l, 0, s),
                u && (ht(n.index, t)[8] = c);
            }
          })(e, t, n, It(n, t)),
          128 == (128 & n.flags) &&
            (function HS(e, t, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                o = n.index,
                s = (function h_() {
                  return $.lFrame.currentDirectiveIndex;
                })();
              try {
                Fn(o);
                for (let a = r; a < i; a++) {
                  const l = e.data[a],
                    u = t[a];
                  ou(a),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Cm(l, u);
                }
              } finally {
                Fn(-1), ou(s);
              }
            })(e, t, n));
      }
      function Cc(e, t, n = It) {
        const r = t.localNames;
        if (null !== r) {
          let i = t.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[i++] = a;
          }
        }
      }
      function mm(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = _c(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function _c(e, t, n, r, i, o, s, a, l, u) {
        const c = 22 + r,
          d = c + i,
          f = (function PS(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : B);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function vm(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const i = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, i)
              : (n[r] = [t, i]);
          }
        return n;
      }
      function Dm(e, t) {
        const r = t.directiveEnd,
          i = e.data,
          o = t.attrs,
          s = [];
        let a = null,
          l = null;
        for (let u = t.directiveStart; u < r; u++) {
          const c = i[u],
            d = c.inputs,
            f = null === o || Bg(t) ? null : GS(d, o);
          s.push(f), (a = vm(d, u, a)), (l = vm(c.outputs, u, l));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = l);
      }
      function mt(e, t, n, r, i, o, s, a) {
        const l = It(t, n);
        let c,
          u = t.inputs;
        !a && null != u && (c = u[r])
          ? (Ac(e, n, c, r, i), bs(t) && wm(n, t.index))
          : 3 & t.type &&
            ((r = (function FS(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (i = null != s ? s(i, t.value || "", r) : i),
            o.setProperty(l, r, i));
      }
      function wm(e, t) {
        const n = ht(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function Ec(e, t, n, r) {
        let i = !1;
        if (rp()) {
          const o = (function BS(e, t, n) {
              const r = e.directiveRegistry;
              let i = null;
              if (r)
                for (let o = 0; o < r.length; o++) {
                  const s = r[o];
                  Ug(n, s.selectors, !1) &&
                    (i || (i = []),
                    Ps(Wi(n, t), e, s.type),
                    Lt(s) ? (_m(e, n), i.unshift(s)) : i.push(s));
                }
              return i;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== o) {
            (i = !0), Em(n, e.data.length, o.length);
            for (let c = 0; c < o.length; c++) {
              const d = o[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = ri(e, t, o.length, null);
            for (let c = 0; c < o.length; c++) {
              const d = o[c];
              (n.mergedAttrs = As(n.mergedAttrs, d.hostAttrs)),
                Im(e, n, t, u, d),
                zS(u, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                u++;
            }
            Dm(e, n);
          }
          s &&
            (function US(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let i = 0; i < t.length; i += 2) {
                  const o = n[t[i + 1]];
                  if (null == o) throw new I(-301, !1);
                  r.push(t[i], o);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = As(n.mergedAttrs, n.attrs)), i;
      }
      function bm(e, t, n, r, i, o) {
        const s = o.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const l = ~t.index;
          (function $S(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, i, s);
        }
      }
      function Cm(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function _m(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function zS(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Lt(t) && (n[""] = e);
        }
      }
      function Em(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Im(e, t, n, r, i) {
        e.data[r] = i;
        const o = i.factory || (i.factory = cr(i.type)),
          s = new Ui(o, Lt(i), T);
        (e.blueprint[r] = s),
          (n[r] = s),
          bm(e, t, 0, r, ri(e, n, i.hostVars, B), i);
      }
      function WS(e, t, n) {
        const r = It(t, e),
          i = mm(n),
          o = e[10],
          s = ra(
            e,
            ta(
              e,
              i,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              o,
              o.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function qS(e, t, n, r, i, o) {
        const s = o[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function GS(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const i = t[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              e.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, e[i], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Sm(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function QS(e, t) {
        const n = ht(t, e);
        if (Es(n)) {
          const r = n[1];
          48 & n[2] ? fo(r, n, r.template, n[8]) : n[5] > 0 && Sc(n);
        }
      }
      function Sc(e) {
        for (let r = Ku(e); null !== r; r = Qu(r))
          for (let i = 10; i < r.length; i++) {
            const o = r[i];
            if (Es(o))
              if (512 & o[2]) {
                const s = o[1];
                fo(s, o, s.template, o[8]);
              } else o[5] > 0 && Sc(o);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = ht(n[r], e);
            Es(i) && i[5] > 0 && Sc(i);
          }
      }
      function ZS(e, t) {
        const n = ht(t, e),
          r = n[1];
        (function JS(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          na(r, n, n[8]);
      }
      function ra(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function xc(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = uo(e);
          if (q0(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Tc(e, t, n) {
        au(0), t(e, n);
      }
      function Mm(e) {
        return e[7] || (e[7] = []);
      }
      function Tm(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Rm(e, t) {
        const n = e[9],
          r = n ? n.get(Jr, null) : null;
        r && r.handleError(t);
      }
      function Ac(e, t, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            a = n[o++],
            l = t[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, i, r, a) : (l[a] = i);
        }
      }
      function Dn(e, t, n) {
        const r = (function _s(e, t) {
          return we(t[e]);
        })(t, e);
        !(function Ig(e, t, n) {
          e.setValue(t, n);
        })(e[W], r, n);
      }
      function ia(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (i = Hl(i, a))
              : 2 == o && (r = Hl(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function oa(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const o = t[n.index];
          if ((null !== o && r.push(we(o)), Ft(o)))
            for (let a = 10; a < o.length; a++) {
              const l = o[a],
                u = l[1].firstChild;
              null !== u && oa(l[1], l, u, r);
            }
          const s = n.type;
          if (8 & s) oa(e, t, n.child, r);
          else if (32 & s) {
            const a = Yu(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Fg(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = uo(t[16]);
              oa(l[1], l, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      class ho {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return oa(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Ft(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Xu(t, r), Os(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          xg(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function ym(e, t, n, r) {
            const i = Mm(t);
            null === n
              ? i.push(r)
              : (i.push(n), e.firstCreatePass && Tm(e).push(r, i.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          xc(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          !(function Mc(e, t, n) {
            const r = t[10];
            r.begin && r.begin();
            try {
              fo(e, t, e.template, n);
            } catch (i) {
              throw (Rm(t, i), i);
            } finally {
              r.end && r.end();
            }
          })(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new I(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function PI(e, t) {
              co(e, t, t[W], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new I(902, !1);
          this._appRef = t;
        }
      }
      class e1 extends ho {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          !(function xm(e) {
            !(function XS(e) {
              for (let t = 0; t < e.components.length; t++) {
                const n = e.components[t],
                  r = qu(n);
                if (null !== r) {
                  const i = r[1];
                  kS(i, r, i.template, n);
                }
              }
            })(e[8]);
          })(this._view);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Rc extends ao {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = ne(t);
          return new po(n, this.ngModule);
        }
      }
      function km(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class n1 {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const i = this.injector.get(t, Lu, r);
          return i !== Lu || n === Lu ? i : this.parentInjector.get(t, n, r);
        }
      }
      class po extends ug {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function XI(e) {
              return e.map(JI).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return km(this.componentDef.inputs);
        }
        get outputs() {
          return km(this.componentDef.outputs);
        }
        create(t, n, r, i) {
          let o = (i = i || this.ngModule) instanceof $n ? i : i?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new n1(t, o) : t,
            a = s.get(dg, null);
          if (null === a) throw new I(407, !1);
          const l = s.get(ZE, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function NS(e, t, n) {
                  return e.selectRootElement(t, n === Qt.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : Ju(
                  a.createRenderer(null, this.componentDef),
                  c,
                  (function t1(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = { components: [] },
            p = _c(0, null, null, 1, 0, null, null, null, null, null),
            g = ta(null, p, h, f, null, null, a, u, l, s, null);
          let y, v;
          lu(g);
          try {
            const w = (function o1(e, t, n, r, i, o) {
              const s = n[1];
              n[22] = e;
              const l = ni(s, 22, 2, "#host", null),
                u = (l.mergedAttrs = t.hostAttrs);
              null !== u &&
                (ia(l, u, !0),
                null !== e &&
                  (Ts(i, e, u),
                  null !== l.classes && ic(i, e, l.classes),
                  null !== l.styles && $g(i, e, l.styles)));
              const c = r.createRenderer(e, t),
                d = ta(
                  n,
                  mm(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  l,
                  r,
                  c,
                  o || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Ps(Wi(l, n), s, t.type), _m(s, l), Em(l, n.length, 1)),
                ra(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, g, a, u);
            if (d)
              if (r) Ts(u, d, ["ng-version", JE.full]);
              else {
                const { attrs: m, classes: _ } = (function eS(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    i = 2;
                  for (; r < e.length; ) {
                    let o = e[r];
                    if ("string" == typeof o)
                      2 === i
                        ? "" !== o && t.push(o, e[++r])
                        : 8 === i && n.push(o);
                    else {
                      if (!jt(i)) break;
                      i = o;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                m && Ts(u, d, m), _ && _.length > 0 && ic(u, d, _.join(" "));
              }
            if (((v = tu(p, 22)), void 0 !== n)) {
              const m = (v.projection = []);
              for (let _ = 0; _ < this.ngContentSelectors.length; _++) {
                const k = n[_];
                m.push(null != k ? Array.from(k) : null);
              }
            }
            (y = (function s1(e, t, n, r, i) {
              const o = n[1],
                s = (function jS(e, t, n) {
                  const r = Se();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Im(e, r, t, ri(e, t, 1, null), n),
                    Dm(e, r));
                  const i = qi(t, e, r.directiveStart, r);
                  Ue(i, t);
                  const o = It(r, t);
                  return o && Ue(o, t), i;
                })(o, n, t);
              if ((r.components.push(s), (e[8] = s), null !== i))
                for (const l of i) l(s, t);
              if (t.contentQueries) {
                const l = Se();
                t.contentQueries(1, s, l.directiveStart);
              }
              const a = Se();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Fn(a.index),
                  bm(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Cm(t, s)),
                s
              );
            })(w, this.componentDef, g, h, [l1])),
              na(p, g, null);
          } finally {
            uu();
          }
          return new i1(this.componentType, y, Zr(v, g), g, v);
        }
      }
      class i1 extends class WE {} {
        constructor(t, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new e1(i)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[t])) {
            const o = this._rootLView;
            Ac(o[1], o, i, t, n), wm(o, this._tNode.index);
          }
        }
        get injector() {
          return new Vr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function l1() {
        const e = Se();
        Ss(D()[1], e);
      }
      let sa = null;
      function hr() {
        if (!sa) {
          const e = oe.Symbol;
          if (e && e.iterator) sa = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (sa = r);
            }
          }
        }
        return sa;
      }
      function go(e) {
        return (
          !!(function Pc(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && hr() in e))
        );
      }
      function ze(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function aa(e, t, n, r, i) {
        const o = (function pr(e, t, n, r) {
          const i = ze(e, t, n);
          return ze(e, t + 1, r) || i;
        })(e, t, n, r);
        return ze(e, t + 2, i) || o;
      }
      function oi(e, t, n, r) {
        return ze(e, Lr(), n) ? t + H(n) + r : B;
      }
      function ai(e, t, n, r, i, o, s, a) {
        const u = aa(
          e,
          (function pn() {
            return $.lFrame.bindingIndex;
          })(),
          n,
          i,
          s
        );
        return (
          (function gn(e) {
            const t = $.lFrame,
              n = t.bindingIndex;
            return (t.bindingIndex = t.bindingIndex + e), n;
          })(3),
          u ? t + H(n) + r + H(i) + o + H(s) + a : B
        );
      }
      function Mt(e, t, n, r, i, o, s, a) {
        const l = D(),
          u = Z(),
          c = e + 22,
          d = u.firstCreatePass
            ? (function w1(e, t, n, r, i, o, s, a, l) {
                const u = t.consts,
                  c = ni(t, e, 4, s || null, On(u, a));
                Ec(t, n, c, On(u, l)), Ss(t, c);
                const d = (c.tViews = _c(
                  2,
                  c,
                  r,
                  i,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, i, o, s)
            : u.data[c];
        Zt(d, !1);
        const f = l[W].createComment("");
        Ks(u, l, f, d),
          Ue(f, l),
          ra(l, (l[c] = Sm(f, l, f, d))),
          Cs(d) && bc(u, l, d),
          null != s && Cc(l, d, a);
      }
      function Le(e, t, n) {
        const r = D();
        return ze(r, Lr(), t) && mt(Z(), he(), r, e, t, r[W], n, !1), Le;
      }
      function Oc(e, t, n, r, i) {
        const s = i ? "class" : "style";
        Ac(e, n, t.inputs[s], s, r);
      }
      function S(e, t, n, r) {
        const i = D(),
          o = Z(),
          s = 22 + e,
          a = i[W],
          l = (i[s] = Ju(
            a,
            t,
            (function b_() {
              return $.lFrame.currentNamespace;
            })()
          )),
          u = o.firstCreatePass
            ? (function _1(e, t, n, r, i, o, s) {
                const a = t.consts,
                  u = ni(t, e, 2, i, On(a, o));
                return (
                  Ec(t, n, u, On(a, s)),
                  null !== u.attrs && ia(u, u.attrs, !1),
                  null !== u.mergedAttrs && ia(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, o, i, 0, t, n, r)
            : o.data[s];
        Zt(u, !0);
        const c = u.mergedAttrs;
        null !== c && Ts(a, l, c);
        const d = u.classes;
        null !== d && ic(a, l, d);
        const f = u.styles;
        return (
          null !== f && $g(a, l, f),
          64 != (64 & u.flags) && Ks(o, i, l, u),
          0 ===
            (function o_() {
              return $.lFrame.elementDepthCount;
            })() && Ue(l, i),
          (function s_() {
            $.lFrame.elementDepthCount++;
          })(),
          Cs(u) &&
            (bc(o, i, u),
            (function gm(e, t, n) {
              if (Ql(t)) {
                const i = t.directiveEnd;
                for (let o = t.directiveStart; o < i; o++) {
                  const s = e.data[o];
                  s.contentQueries && s.contentQueries(1, n[o], o);
                }
              }
            })(o, u, i)),
          null !== r && Cc(i, u),
          S
        );
      }
      function x() {
        let e = Se();
        ru()
          ? (function iu() {
              $.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Zt(e, !1));
        const t = e;
        !(function a_() {
          $.lFrame.elementDepthCount--;
        })();
        const n = Z();
        return (
          n.firstCreatePass && (Ss(n, e), Ql(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function S_(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Oc(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function x_(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            Oc(n, t, D(), t.stylesWithoutHost, !1),
          x
        );
      }
      function Xe(e, t, n, r) {
        return S(e, t, n, r), x(), Xe;
      }
      function la() {
        return D();
      }
      function ua(e) {
        return !!e && "function" == typeof e.then;
      }
      const qm = function Wm(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function We(e, t, n, r) {
        const i = D(),
          o = Z(),
          s = Se();
        return (
          (function Ym(e, t, n, r, i, o, s, a) {
            const l = Cs(r),
              c = e.firstCreatePass && Tm(e),
              d = t[8],
              f = Mm(t);
            let h = !0;
            if (3 & r.type || a) {
              const y = It(r, t),
                v = a ? a(y) : y,
                w = f.length,
                m = a ? (k) => a(we(k[r.index])) : r.index;
              let _ = null;
              if (
                (!a &&
                  l &&
                  (_ = (function I1(e, t, n, r) {
                    const i = e.cleanup;
                    if (null != i)
                      for (let o = 0; o < i.length - 1; o += 2) {
                        const s = i[o];
                        if (s === n && i[o + 1] === r) {
                          const a = t[7],
                            l = i[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(e, t, i, r.index)),
                null !== _)
              )
                ((_.__ngLastListenerFn__ || _).__ngNextListenerFn__ = o),
                  (_.__ngLastListenerFn__ = o),
                  (h = !1);
              else {
                o = Qm(r, t, d, o, !1);
                const k = n.listen(v, i, o);
                f.push(o, k), c && c.push(i, m, w, w + 1);
              }
            } else o = Qm(r, t, d, o, !1);
            const p = r.outputs;
            let g;
            if (h && null !== p && (g = p[i])) {
              const y = g.length;
              if (y)
                for (let v = 0; v < y; v += 2) {
                  const J = t[g[v]][g[v + 1]].subscribe(o),
                    it = f.length;
                  f.push(o, J), c && c.push(i, r.index, it, -(it + 1));
                }
            }
          })(o, i, i[W], s, e, t, 0, r),
          We
        );
      }
      function Km(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (i) {
          return Rm(e, i), !1;
        }
      }
      function Qm(e, t, n, r, i) {
        return function o(s) {
          if (s === Function) return r;
          xc(2 & e.flags ? ht(e.index, t) : t);
          let l = Km(t, 0, r, s),
            u = o.__ngNextListenerFn__;
          for (; u; ) (l = Km(t, 0, u, s) && l), (u = u.__ngNextListenerFn__);
          return i && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function yt(e = 1) {
        return (function g_(e) {
          return ($.lFrame.contextLView = (function m_(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, $.lFrame.contextLView))[8];
        })(e);
      }
      function hi(e, t, n) {
        return pi(e, "", t, "", n), hi;
      }
      function pi(e, t, n, r, i) {
        const o = D(),
          s = oi(o, t, n, r);
        return s !== B && mt(Z(), he(), o, e, s, o[W], i, !1), pi;
      }
      function V(e, t = "") {
        const n = D(),
          r = Z(),
          i = e + 22,
          o = r.firstCreatePass ? ni(r, i, 1, t, null) : r.data[i],
          s = (n[i] = (function Zu(e, t) {
            return e.createText(t);
          })(n[W], t));
        Ks(r, n, s, o), Zt(o, !1);
      }
      function Un(e) {
        return et("", e, ""), Un;
      }
      function et(e, t, n) {
        const r = D(),
          i = oi(r, e, t, n);
        return i !== B && Dn(r, Ze(), i), et;
      }
      function da(e, t, n, r, i, o, s) {
        const a = D(),
          l = ai(a, e, t, n, r, i, o, s);
        return l !== B && Dn(a, Ze(), l), da;
      }
      const yi = "en-US";
      let Vy = yi;
      class mr {}
      class fv {}
      class hv extends mr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Rc(this));
          const r = dt(t);
          (this._bootstrapComponents = yn(r.bootstrap)),
            (this._r3Injector = Qg(
              t,
              n,
              [
                { provide: mr, useValue: this },
                { provide: ao, useValue: this.componentFactoryResolver },
              ],
              ie(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Wc extends fv {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new hv(this.moduleType, t);
        }
      }
      class hM extends mr {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Rc(this)),
            (this.instance = null);
          const i = new ag(
            [
              ...t,
              { provide: mr, useValue: this },
              { provide: ao, useValue: this.componentFactoryResolver },
            ],
            n || Ws(),
            r,
            new Set(["environment"])
          );
          (this.injector = i), i.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function ma(e, t, n = null) {
        return new hM(e, t, n).injector;
      }
      let pM = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = rg(0, n.type),
                i =
                  r.length > 0
                    ? ma([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, i);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = j({
            token: e,
            providedIn: "environment",
            factory: () => new e(M($n)),
          })),
          e
        );
      })();
      function pv(e) {
        e.getStandaloneInjector = (t) =>
          t.get(pM).getOrCreateStandaloneInjector(e);
      }
      function Gc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Te = class VM extends Yt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let i = t,
            o = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (i = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = Gc(o)), i && (i = Gc(i)), s && (s = Gc(s)));
          const a = super.subscribe({ next: i, error: o, complete: s });
          return t instanceof Dt && t.add(a), a;
        }
      };
      let wn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = zM), e;
      })();
      const BM = wn,
        UM = class extends BM {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              i = ta(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            i[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (i[19] = s.createEmbeddedView(r)),
              na(r, i, t),
              new ho(i)
            );
          }
        };
      function zM() {
        return (function ya(e, t) {
          return 4 & e.type ? new UM(t, e, Zr(e, t)) : null;
        })(Se(), D());
      }
      let Bt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = WM), e;
      })();
      function WM() {
        return (function Mv(e, t) {
          let n;
          const r = t[e.index];
          if (Ft(r)) n = r;
          else {
            let i;
            if (8 & e.type) i = we(r);
            else {
              const o = t[W];
              i = o.createComment("");
              const s = It(e, t);
              fr(
                o,
                Ys(o, s),
                i,
                (function VI(e, t) {
                  return e.nextSibling(t);
                })(o, s),
                !1
              );
            }
            (t[e.index] = n = Sm(r, t, i, e)), ra(t, n);
          }
          return new Sv(n, e, t);
        })(Se(), D());
      }
      const qM = Bt,
        Sv = class extends qM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Zr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Vr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = ks(this._hostTNode, this._hostLView);
            if (yp(t)) {
              const n = $r(t, this._hostLView),
                r = jr(t);
              return new Vr(n[1].data[r + 8], n);
            }
            return new Vr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = xv(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let i, o;
            "number" == typeof r
              ? (i = r)
              : null != r && ((i = r.index), (o = r.injector));
            const s = t.createEmbeddedView(n || {}, o);
            return this.insert(s, i), s;
          }
          createComponent(t, n, r, i, o) {
            const s =
              t &&
              !(function Ki(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (o = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new po(ne(t)),
              u = r || this.parentInjector;
            if (!o && null == l.ngModule) {
              const f = (s ? u : this.parentInjector).get($n, null);
              f && (o = f);
            }
            const c = l.create(u, i, void 0, o);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              i = r[1];
            if (
              (function i_(e) {
                return Ft(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new Sv(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const o = this._adjustIndex(n),
              s = this._lContainer;
            !(function OI(e, t, n, r) {
              const i = 10 + r,
                o = n.length;
              r > 0 && (n[i - 1][4] = t),
                r < o - 10
                  ? ((t[4] = n[i]), Mp(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function FI(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(i, r, s, o);
            const a = nc(o, s),
              l = r[W],
              u = Ys(l, s[7]);
            return (
              null !== u &&
                (function kI(e, t, n, r, i, o) {
                  (r[0] = i), (r[6] = t), co(e, r, n, 1, i, o);
                })(i, s[6], l, r, u, a),
              t.attachToViewContainerRef(),
              Mp(Kc(s), o, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = xv(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Xu(this._lContainer, n);
            r && (Os(Kc(this._lContainer), n), xg(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Xu(this._lContainer, n);
            return r && null != Os(Kc(this._lContainer), n) ? new ho(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function xv(e) {
        return e[8];
      }
      function Kc(e) {
        return e[8] || (e[8] = []);
      }
      function Da(...e) {}
      const wa = new L("Application Initializer");
      let ba = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Da),
              (this.reject = Da),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const o = this.appInits[i]();
                if (ua(o)) n.push(o);
                else if (qm(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(wa, 8));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Io = new L("AppId", {
        providedIn: "root",
        factory: function Jv() {
          return `${ld()}${ld()}${ld()}`;
        },
      });
      function ld() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Xv = new L("Platform Initializer"),
        ud = new L("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        eD = new L("appBootstrapListener");
      let CT = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const bn = new L("LocaleId", {
        providedIn: "root",
        factory: () =>
          ye(bn, N.Optional | N.SkipSelf) ||
          (function _T() {
            return (typeof $localize < "u" && $localize.locale) || yi;
          })(),
      });
      class IT {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let cd = (() => {
        class e {
          compileModuleSync(n) {
            return new Wc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              o = yn(dt(n).declarations).reduce((s, a) => {
                const l = ne(a);
                return l && s.push(new po(l)), s;
              }, []);
            return new IT(r, o);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const MT = (() => Promise.resolve(0))();
      function dd(e) {
        typeof Zone > "u"
          ? MT.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Ae {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Te(!1)),
            (this.onMicrotaskEmpty = new Te(!1)),
            (this.onStable = new Te(!1)),
            (this.onError = new Te(!1)),
            typeof Zone > "u")
          )
            throw new I(908, !1);
          Zone.assertZonePatched();
          const i = this;
          if (
            ((i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const o = Zone.AsyncStackTaggingZoneSpec;
            i._inner = i._inner.fork(new o("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function TT() {
              let e = oe.requestAnimationFrame,
                t = oe.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function kT(e) {
              const t = () => {
                !(function RT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(oe, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                hd(e),
                                (e.isCheckStableRunning = !0),
                                fd(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    hd(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, a) => {
                  try {
                    return rD(e), n.invokeTask(i, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      iD(e);
                  }
                },
                onInvoke: (n, r, i, o, s, a, l) => {
                  try {
                    return rD(e), n.invoke(i, o, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), iD(e);
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          hd(e),
                          fd(e))
                        : "macroTask" == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Ae.isInAngularZone()) throw new I(909, !1);
        }
        static assertNotInAngularZone() {
          if (Ae.isInAngularZone()) throw new I(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, t, AT, Da, Da);
          try {
            return o.runTask(s, n, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const AT = {};
      function fd(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function hd(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function rD(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function iD(e) {
        e._nesting--, fd(e);
      }
      class PT {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Te()),
            (this.onMicrotaskEmpty = new Te()),
            (this.onStable = new Te()),
            (this.onError = new Te());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, i) {
          return t.apply(n, r);
        }
      }
      const oD = new L(""),
        Ca = new L("");
      let md,
        pd = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                md ||
                  ((function NT(e) {
                    md = e;
                  })(i),
                  i.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ae.assertNotInAngularZone(),
                        dd(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                dd(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ae), M(gd), M(Ca));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        gd = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return md?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = j({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        zn = null;
      const sD = new L("AllowMultipleToken"),
        yd = new L("PlatformDestroyListeners");
      class aD {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function uD(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new L(r);
        return (o = []) => {
          let s = vd();
          if (!s || s.injector.get(sD, !1)) {
            const a = [...n, ...o, { provide: i, useValue: !0 }];
            e
              ? e(a)
              : (function LT(e) {
                  if (zn && !zn.get(sD, !1)) throw new I(400, !1);
                  zn = e;
                  const t = e.get(dD);
                  (function lD(e) {
                    const t = e.get(Xv, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function cD(e = [], t) {
                    return St.create({
                      name: t,
                      providers: [
                        { provide: Pu, useValue: "platform" },
                        { provide: yd, useValue: new Set([() => (zn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function $T(e) {
            const t = vd();
            if (!t) throw new I(401, !1);
            return t;
          })();
        };
      }
      function vd() {
        return zn?.get(dD) ?? null;
      }
      let dD = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const i = (function hD(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new PT()
                      : ("zone.js" === e ? void 0 : e) || new Ae(t)),
                  n
                );
              })(
                r?.ngZone,
                (function fD(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              o = [{ provide: Ae, useValue: i }];
            return i.run(() => {
              const s = St.create({
                  providers: o,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                l = a.injector.get(Jr, null);
              if (!l) throw new I(402, !1);
              return (
                i.runOutsideAngular(() => {
                  const u = i.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Ea(this._modules, a), u.unsubscribe();
                  });
                }),
                (function pD(e, t, n) {
                  try {
                    const r = n();
                    return ua(r)
                      ? r.catch((i) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, i, () => {
                  const u = a.injector.get(ba);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function Hy(e) {
                          ct(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Vy = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(bn, yi) || yi),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = gD({}, r);
            return (function OT(e, t, n) {
              const r = new Wc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(_a);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new I(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new I(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(yd, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(St));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function gD(e, t) {
        return Array.isArray(t) ? t.reduce(gD, e) : { ...e, ...t };
      }
      let _a = (() => {
        class e {
          constructor(n, r, i) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const o = new De((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new De((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Ae.assertNotInAngularZone(),
                      dd(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  Ae.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function x0(...e) {
              const t = Li(e),
                n = (function w0(e, t) {
                  return "number" == typeof jl(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Kt(r[0])
                  : Tr(n)(Ie(r, t))
                : un;
            })(
              o,
              s.pipe(
                (function M0(e = {}) {
                  const {
                    connector: t = () => new Yt(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: i = !0,
                  } = e;
                  return (o) => {
                    let s,
                      a,
                      l,
                      u = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = l = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return Pe((g, y) => {
                      u++, !d && !c && f();
                      const v = (l = l ?? t());
                      y.add(() => {
                        u--, 0 === u && !d && !c && (a = $l(p, i));
                      }),
                        v.subscribe(y),
                        !s &&
                          u > 0 &&
                          ((s = new Fi({
                            next: (w) => v.next(w),
                            error: (w) => {
                              (d = !0), f(), (a = $l(h, n, w)), v.error(w);
                            },
                            complete: () => {
                              (c = !0), f(), (a = $l(h, r)), v.complete();
                            },
                          })),
                          Kt(g).subscribe(s));
                    })(o);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const i = n instanceof ug;
            if (!this._injector.get(ba).done)
              throw (
                (!i &&
                  (function Rr(e) {
                    const t = ne(e) || Ye(e) || Ke(e);
                    return null !== t && t.standalone;
                  })(n),
                new I(405, false))
              );
            let s;
            (s = i ? n : this._injector.get(ao).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function FT(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(mr),
              u = s.create(St.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(oD, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  Ea(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new I(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Ea(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(eD, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Ea(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new I(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ae), M($n), M(Jr));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Ea(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let yD = !0,
        Dd = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = BT), e;
        })();
      function BT(e) {
        return (function UT(e, t, n) {
          if (bs(e) && !n) {
            const r = ht(e.index, t);
            return new ho(r, r);
          }
          return 47 & e.type ? new ho(t[16], t) : null;
        })(Se(), D(), 16 == (16 & e));
      }
      class CD {
        constructor() {}
        supports(t) {
          return go(t);
        }
        create(t) {
          return new KT(t);
        }
      }
      const YT = (e, t) => t;
      class KT {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || YT);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < ED(r, i, o)) ? n : r,
              a = ED(s, i, o),
              l = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const u = a - i,
                c = l - i;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  c <= p && p < u && (o[f] = h + 1);
                }
                o[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !go(t))) throw new I(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            o,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, o, s, a)),
                    Object.is(n.item, o) || this._addIdentityChange(n, o))
                  : ((n = this._mismatch(n, o, s, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function y1(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[hr()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, i) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, o, i))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, o, i))
              : (t = this._addAfter(new QT(n, r), o, i)),
            t
          );
        }
        _verifyReinsertion(t, n, r, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (t._next = i),
            (t._prev = n),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new _D()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new _D()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class QT {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class ZT {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class _D {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new ZT()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const i = this.map.get(t);
          return i ? i.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function ED(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      function SD() {
        return new xa([new CD()]);
      }
      let xa = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || SD()),
              deps: [[e, new to(), new eo()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new I(901, !1);
          }
        }
        return (e.ɵprov = j({ token: e, providedIn: "root", factory: SD })), e;
      })();
      const nA = uD(null, "core", []);
      let rA = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(_a));
            }),
            (e.ɵmod = Nt({ type: e })),
            (e.ɵinj = wt({})),
            e
          );
        })(),
        Ma = null;
      function Wn() {
        return Ma;
      }
      const rt = new L("DocumentToken");
      let Ed = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({
            token: e,
            factory: function () {
              return (function aA() {
                return M(MD);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const lA = new L("Location Initialized");
      let MD = (() => {
        class e extends Ed {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Wn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Wn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Wn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, i) {
            TD() ? this._history.pushState(n, r, i) : (this.location.hash = i);
          }
          replaceState(n, r, i) {
            TD()
              ? this._history.replaceState(n, r, i)
              : (this.location.hash = i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(rt));
          }),
          (e.ɵprov = j({
            token: e,
            factory: function () {
              return (function uA() {
                return new MD(M(rt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function TD() {
        return !!window.history.pushState;
      }
      function Id(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function AD(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function _n(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let vr = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({
            token: e,
            factory: function () {
              return ye(kD);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const RD = new L("appBaseHref");
      let kD = (() => {
          class e extends vr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  ye(rt).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Id(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  _n(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${r}${i}` : r;
            }
            pushState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + _n(o));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + _n(o));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ed), M(RD, 8));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        cA = (() => {
          class e extends vr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Id(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + _n(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + _n(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ed), M(RD, 8));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Sd = (() => {
          class e {
            constructor(n) {
              (this._subject = new Te()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = AD(PD(r))),
                this._locationStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + _n(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function fA(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, PD(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", i = null) {
              this._locationStrategy.pushState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + _n(r)),
                  i
                );
            }
            replaceState(n, r = "", i = null) {
              this._locationStrategy.replaceState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + _n(r)),
                  i
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((i) => i(n, r));
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (e.normalizeQueryParams = _n),
            (e.joinWithSlash = Id),
            (e.stripTrailingSlash = AD),
            (e.ɵfac = function (n) {
              return new (n || e)(M(vr));
            }),
            (e.ɵprov = j({
              token: e,
              factory: function () {
                return (function dA() {
                  return new Sd(M(vr));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function PD(e) {
        return e.replace(/\/index.html$/, "");
      }
      function BD(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (i.trim() === t) return decodeURIComponent(o);
        }
        return null;
      }
      class ZA {
        constructor(t, n, r, i) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Fd = (() => {
        class e {
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, o, s) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new ZA(i.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = r.get(o);
                r.move(a, s), WD(a, i);
              }
            });
            for (let i = 0, o = r.length; i < o; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              WD(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Bt), T(wn), T(xa));
          }),
          (e.ɵdir = Ve({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function WD(e, t) {
        e.context.$implicit = t.item;
      }
      let To = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new XA()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            qD("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            qD("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Bt), T(wn));
          }),
          (e.ɵdir = Ve({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class XA {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function qD(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ie(t)}'.`
          );
      }
      let KD = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Nt({ type: e })),
          (e.ɵinj = wt({})),
          e
        );
      })();
      let TR = (() => {
        class e {}
        return (
          (e.ɵprov = j({
            token: e,
            providedIn: "root",
            factory: () => new AR(M(rt), window),
          })),
          e
        );
      })();
      class AR {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function RR(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const o = i.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(r - o[0], i - o[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              ZD(this.window.history) ||
              ZD(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function ZD(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class JD {}
      class Ud extends class KR extends class sA {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function oA(e) {
            Ma || (Ma = e);
          })(new Ud());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function QR() {
            return (
              (Ro = Ro || document.querySelector("base")),
              Ro ? Ro.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function ZR(e) {
                ($a = $a || document.createElement("a")),
                  $a.setAttribute("href", e);
                const t = $a.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Ro = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return BD(document.cookie, t);
        }
      }
      let $a,
        Ro = null;
      const nw = new L("TRANSITION_ID"),
        XR = [
          {
            provide: wa,
            useFactory: function JR(e, t, n) {
              return () => {
                n.get(ba).donePromise.then(() => {
                  const r = Wn(),
                    i = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let o = 0; o < i.length; o++) r.remove(i[o]);
                });
              };
            },
            deps: [nw, rt, St],
            multi: !0,
          },
        ];
      let tk = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Va = new L("EventManagerPlugins");
      let Ha = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => (i.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          addGlobalEventListener(n, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const i = this._plugins;
            for (let o = 0; o < i.length; o++) {
              const s = i[o];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Va), M(Ae));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class rw {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const i = Wn().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`);
          return this.addEventListener(i, n, r);
        }
      }
      let iw = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ko = (() => {
          class e extends iw {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, i) {
              n.forEach((o) => {
                const s = this._doc.createElement("style");
                (s.textContent = o), i.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(ow), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(ow));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(rt));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function ow(e) {
        Wn().remove(e);
      }
      const zd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Wd = /%COMP%/g;
      function Ba(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          Array.isArray(i) ? Ba(e, i, n) : ((i = i.replace(Wd, e)), n.push(i));
        }
        return n;
      }
      function lw(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let qd = (() => {
        class e {
          constructor(n, r, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Gd(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Qt.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new ak(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(n),
                  i
                );
              }
              case 1:
              case Qt.ShadowDom:
                return new lk(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = Ba(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ha), M(ko), M(Io));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Gd {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(zd[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (cw(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (cw(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const o = zd[i];
            o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = zd[r];
            i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, i) {
          i & (at.DashCase | at.Important)
            ? t.style.setProperty(n, r, i & at.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & at.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, lw(r))
            : this.eventManager.addEventListener(t, n, lw(r));
        }
      }
      function cw(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class ak extends Gd {
        constructor(t, n, r, i) {
          super(t), (this.component = r);
          const o = Ba(i + "-" + r.id, r.styles, []);
          n.addStyles(o),
            (this.contentAttr = (function ik(e) {
              return "_ngcontent-%COMP%".replace(Wd, e);
            })(i + "-" + r.id)),
            (this.hostAttr = (function ok(e) {
              return "_nghost-%COMP%".replace(Wd, e);
            })(i + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class lk extends Gd {
        constructor(t, n, r, i) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = Ba(i.id, i.styles, []);
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement("style");
            (a.textContent = o[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let uk = (() => {
        class e extends rw {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(rt));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const dw = ["alt", "control", "meta", "shift"],
        ck = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        dk = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let fk = (() => {
        class e extends rw {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const o = e.parseEventName(r),
              s = e.eventCallback(o.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Wn().onAndCancel(n, o.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const o = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              dw.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = i), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let i = ck[n.key] || n.key,
              o = "";
            return (
              r.indexOf("code.") > -1 && ((i = n.code), (o = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                dw.forEach((s) => {
                  s !== i && (0, dk[s])(n) && (o += s + ".");
                }),
                (o += i),
                o === r)
            );
          }
          static eventCallback(n, r, i) {
            return (o) => {
              e.matchEventFullKeyCode(o, n) && i.runGuarded(() => r(o));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(rt));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const mk = uD(nA, "browser", [
          { provide: ud, useValue: "browser" },
          {
            provide: Xv,
            useValue: function hk() {
              Ud.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: rt,
            useFactory: function gk() {
              return (
                (function uE(e) {
                  _u = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        pw = new L(""),
        gw = [
          {
            provide: Ca,
            useClass: class ek {
              addToWindow(t) {
                (oe.getAngularTestability = (r, i = !0) => {
                  const o = t.findTestabilityInTree(r, i);
                  if (null == o)
                    throw new Error("Could not find testability for element.");
                  return o;
                }),
                  (oe.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (oe.getAllAngularRootElements = () => t.getAllRootElements()),
                  oe.frameworkStabilizers || (oe.frameworkStabilizers = []),
                  oe.frameworkStabilizers.push((r) => {
                    const i = oe.getAllAngularTestabilities();
                    let o = i.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && r(s);
                    };
                    i.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Wn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: oD, useClass: pd, deps: [Ae, gd, Ca] },
          { provide: pd, useClass: pd, deps: [Ae, gd, Ca] },
        ],
        mw = [
          { provide: Pu, useValue: "root" },
          {
            provide: Jr,
            useFactory: function pk() {
              return new Jr();
            },
            deps: [],
          },
          { provide: Va, useClass: uk, multi: !0, deps: [rt, Ae, ud] },
          { provide: Va, useClass: fk, multi: !0, deps: [rt] },
          { provide: qd, useClass: qd, deps: [Ha, ko, Io] },
          { provide: dg, useExisting: qd },
          { provide: iw, useExisting: ko },
          { provide: ko, useClass: ko, deps: [rt] },
          { provide: Ha, useClass: Ha, deps: [Va, Ae] },
          { provide: JD, useClass: tk, deps: [] },
          [],
        ];
      let yk = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Io, useValue: n.appId },
                  { provide: nw, useExisting: Io },
                  XR,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(pw, 12));
            }),
            (e.ɵmod = Nt({ type: e })),
            (e.ɵinj = wt({ providers: [...mw, ...gw], imports: [KD, rA] })),
            e
          );
        })(),
        yw = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(rt));
            }),
            (e.ɵprov = j({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function Dk() {
                        return new yw(M(rt));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function R(...e) {
        return Ie(e, Li(e));
      }
      function Gn(e, t) {
        return se(t) ? Fe(e, t, 1) : Fe(e, 1);
      }
      function In(e, t) {
        return Pe((n, r) => {
          let i = 0;
          n.subscribe(Ne(r, (o) => e.call(t, o, i++) && r.next(o)));
        });
      }
      typeof window < "u" && window;
      class ww {}
      class bw {}
      class Sn {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const i = n.slice(0, r),
                                o = i.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(i, o),
                                this.headers.has(o)
                                  ? this.headers.get(o).push(s)
                                  : this.headers.set(o, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const i = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(i, r),
                                this.maybeSetNormalizedName(n, i));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Sn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new Sn();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof Sn
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const i = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              i.push(...r), this.headers.set(n, i);
              break;
            case "d":
              const o = t.value;
              if (o) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class xk {
        encodeKey(t) {
          return Cw(t);
        }
        encodeValue(t) {
          return Cw(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const Tk = /%(\d[a-f0-9])/gi,
        Ak = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Cw(e) {
        return encodeURIComponent(e).replace(Tk, (t, n) => Ak[n] ?? t);
      }
      function Ua(e) {
        return `${e}`;
      }
      class Yn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new xk()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function Mk(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((i) => {
                      const o = i.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [t.decodeKey(i), ""]
                            : [
                                t.decodeKey(i.slice(0, o)),
                                t.decodeValue(i.slice(o + 1)),
                              ],
                        l = n.get(s) || [];
                      l.push(a), n.set(s, l);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    i = Array.isArray(r) ? r.map(Ua) : [Ua(r)];
                  this.map.set(n, i);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const i = t[r];
              Array.isArray(i)
                ? i.forEach((o) => {
                    n.push({ param: r, value: o, op: "a" });
                  })
                : n.push({ param: r, value: i, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new Yn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(Ua(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const i = r.indexOf(Ua(t.value));
                      -1 !== i && r.splice(i, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class Rk {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function _w(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function Ew(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function Iw(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Po {
        constructor(t, n, r, i) {
          let o;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function kk(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== r ? r : null), (o = i))
              : (o = r),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new Sn()),
            this.context || (this.context = new Rk()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Yn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : _w(this.body) ||
              Ew(this.body) ||
              Iw(this.body) ||
              (function Pk(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Yn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Iw(this.body)
            ? null
            : Ew(this.body)
            ? this.body.type || null
            : _w(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Yn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            i = t.responseType || this.responseType,
            o = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            u = t.params || this.params;
          const c = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                l
              )),
            t.setParams &&
              (u = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                u
              )),
            new Po(n, r, o, {
              params: u,
              headers: l,
              context: c,
              reportProgress: a,
              responseType: i,
              withCredentials: s,
            })
          );
        }
      }
      var Ee = (() => (
        ((Ee = Ee || {})[(Ee.Sent = 0)] = "Sent"),
        (Ee[(Ee.UploadProgress = 1)] = "UploadProgress"),
        (Ee[(Ee.ResponseHeader = 2)] = "ResponseHeader"),
        (Ee[(Ee.DownloadProgress = 3)] = "DownloadProgress"),
        (Ee[(Ee.Response = 4)] = "Response"),
        (Ee[(Ee.User = 5)] = "User"),
        Ee
      ))();
      class Qd {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new Sn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Zd extends Qd {
        constructor(t = {}) {
          super(t), (this.type = Ee.ResponseHeader);
        }
        clone(t = {}) {
          return new Zd({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class za extends Qd {
        constructor(t = {}) {
          super(t),
            (this.type = Ee.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new za({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Sw extends Qd {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Jd(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let xw = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, i = {}) {
            let o;
            if (n instanceof Po) o = n;
            else {
              let l, u;
              (l = i.headers instanceof Sn ? i.headers : new Sn(i.headers)),
                i.params &&
                  (u =
                    i.params instanceof Yn
                      ? i.params
                      : new Yn({ fromObject: i.params })),
                (o = new Po(n, r, void 0 !== i.body ? i.body : null, {
                  headers: l,
                  context: i.context,
                  params: u,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || "json",
                  withCredentials: i.withCredentials,
                }));
            }
            const s = R(o).pipe(Gn((l) => this.handler.handle(l)));
            if (n instanceof Po || "events" === i.observe) return s;
            const a = s.pipe(In((l) => l instanceof za));
            switch (i.observe || "body") {
              case "body":
                switch (o.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      K((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      K((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      K((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(K((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new Yn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, i = {}) {
            return this.request("PATCH", n, Jd(i, r));
          }
          post(n, r, i = {}) {
            return this.request("POST", n, Jd(i, r));
          }
          put(n, r, i = {}) {
            return this.request("PUT", n, Jd(i, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(ww));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Mw {
        constructor(t, n) {
          (this.next = t), (this.interceptor = n);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const Tw = new L("HTTP_INTERCEPTORS");
      let Nk = (() => {
        class e {
          intercept(n, r) {
            return r.handle(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ok = /^\)\]\}',?\n/;
      let Aw = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new De((r) => {
              const i = this.xhrFactory.build();
              if (
                (i.open(n.method, n.urlWithParams),
                n.withCredentials && (i.withCredentials = !0),
                n.headers.forEach((h, p) => i.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  i.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && i.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                i.responseType = "json" !== h ? h : "text";
              }
              const o = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = i.statusText || "OK",
                    p = new Sn(i.getAllResponseHeaders()),
                    g =
                      (function Fk(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(i) || n.url;
                  return (
                    (s = new Zd({
                      headers: p,
                      status: i.status,
                      statusText: h,
                      url: g,
                    })),
                    s
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: g, url: y } = a(),
                    v = null;
                  204 !== p &&
                    (v = typeof i.response > "u" ? i.responseText : i.response),
                    0 === p && (p = v ? 200 : 0);
                  let w = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof v) {
                    const m = v;
                    v = v.replace(Ok, "");
                    try {
                      v = "" !== v ? JSON.parse(v) : null;
                    } catch (_) {
                      (v = m), w && ((w = !1), (v = { error: _, text: v }));
                    }
                  }
                  w
                    ? (r.next(
                        new za({
                          body: v,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: y || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new Sw({
                          error: v,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: y || void 0,
                        })
                      );
                },
                u = (h) => {
                  const { url: p } = a(),
                    g = new Sw({
                      error: h,
                      status: i.status || 0,
                      statusText: i.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(g);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: Ee.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      !!i.responseText &&
                      (p.partialText = i.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: Ee.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                i.addEventListener("load", l),
                i.addEventListener("error", u),
                i.addEventListener("timeout", u),
                i.addEventListener("abort", u),
                n.reportProgress &&
                  (i.addEventListener("progress", d),
                  null !== o &&
                    i.upload &&
                    i.upload.addEventListener("progress", f)),
                i.send(o),
                r.next({ type: Ee.Sent }),
                () => {
                  i.removeEventListener("error", u),
                    i.removeEventListener("abort", u),
                    i.removeEventListener("load", l),
                    i.removeEventListener("timeout", u),
                    n.reportProgress &&
                      (i.removeEventListener("progress", d),
                      null !== o &&
                        i.upload &&
                        i.upload.removeEventListener("progress", f)),
                    i.readyState !== i.DONE && i.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(JD));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Xd = new L("XSRF_COOKIE_NAME"),
        ef = new L("XSRF_HEADER_NAME");
      class Rw {}
      let Lk = (() => {
          class e {
            constructor(n, r, i) {
              (this.doc = n),
                (this.platform = r),
                (this.cookieName = i),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const n = this.doc.cookie || "";
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = BD(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(rt), M(ud), M(Xd));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        tf = (() => {
          class e {
            constructor(n, r) {
              (this.tokenService = n), (this.headerName = r);
            }
            intercept(n, r) {
              const i = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                i.startsWith("http://") ||
                i.startsWith("https://")
              )
                return r.handle(n);
              const o = this.tokenService.getToken();
              return (
                null !== o &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, o) })),
                r.handle(n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Rw), M(ef));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        jk = (() => {
          class e {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(Tw, []);
                this.chain = r.reduceRight(
                  (i, o) => new Mw(i, o),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(bw), M(St));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        $k = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: tf, useClass: Nk }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.cookieName ? { provide: Xd, useValue: n.cookieName } : [],
                  n.headerName ? { provide: ef, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Nt({ type: e })),
            (e.ɵinj = wt({
              providers: [
                tf,
                { provide: Tw, useExisting: tf, multi: !0 },
                { provide: Rw, useClass: Lk },
                { provide: Xd, useValue: "XSRF-TOKEN" },
                { provide: ef, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        Vk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Nt({ type: e })),
            (e.ɵinj = wt({
              providers: [
                xw,
                { provide: ww, useClass: jk },
                Aw,
                { provide: bw, useExisting: Aw },
              ],
              imports: [
                $k.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "X-XSRF-TOKEN",
                }),
              ],
            })),
            e
          );
        })(),
        Hk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Nt({ type: e })),
            (e.ɵinj = wt({ imports: [KD] })),
            e
          );
        })();
      class qt extends Yt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Wa = Ni(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: Bk } = Array,
        { getPrototypeOf: Uk, prototype: zk, keys: Wk } = Object;
      const { isArray: Yk } = Array;
      function kw(...e) {
        const t = Li(e),
          n = (function D0(e) {
            return se(jl(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: i } = (function qk(e) {
            if (1 === e.length) {
              const t = e[0];
              if (Bk(t)) return { args: t, keys: null };
              if (
                (function Gk(e) {
                  return e && "object" == typeof e && Uk(e) === zk;
                })(t)
              ) {
                const n = Wk(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return Ie([], t);
        const o = new De(
          (function Jk(e, t, n = ir) {
            return (r) => {
              Pw(
                t,
                () => {
                  const { length: i } = e,
                    o = new Array(i);
                  let s = i,
                    a = i;
                  for (let l = 0; l < i; l++)
                    Pw(
                      t,
                      () => {
                        const u = Ie(e[l], t);
                        let c = !1;
                        u.subscribe(
                          Ne(
                            r,
                            (d) => {
                              (o[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(o.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            i
              ? (s) =>
                  (function Zk(e, t) {
                    return e.reduce((n, r, i) => ((n[r] = t[i]), n), {});
                  })(i, s)
              : ir
          )
        );
        return n
          ? o.pipe(
              (function Qk(e) {
                return K((t) =>
                  (function Kk(e, t) {
                    return Yk(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : o;
      }
      function Pw(e, t, n) {
        e ? ln(n, e, t) : t();
      }
      function nf(...e) {
        return (function Xk() {
          return Tr(1);
        })()(Ie(e, Li(e)));
      }
      function Nw(e) {
        return new De((t) => {
          Kt(e()).subscribe(t);
        });
      }
      function No(e, t) {
        const n = se(e) ? e : () => e,
          r = (i) => i.error(n());
        return new De(t ? (i) => t.schedule(r, 0, i) : r);
      }
      function rf() {
        return Pe((e, t) => {
          let n = null;
          e._refCount++;
          const r = Ne(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const i = e._connection,
              o = n;
            (n = null),
              i && (!o || i === o) && i.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class Ow extends De {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Eh(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Dt();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Ne(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = Dt.EMPTY));
          }
          return t;
        }
        refCount() {
          return rf()(this);
        }
      }
      function on(e, t) {
        return Pe((n, r) => {
          let i = null,
            o = 0,
            s = !1;
          const a = () => s && !i && r.complete();
          n.subscribe(
            Ne(
              r,
              (l) => {
                i?.unsubscribe();
                let u = 0;
                const c = o++;
                Kt(e(l, c)).subscribe(
                  (i = Ne(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (i = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Oo(e) {
        return e <= 0
          ? () => un
          : Pe((t, n) => {
              let r = 0;
              t.subscribe(
                Ne(n, (i) => {
                  ++r <= e && (n.next(i), e <= r && n.complete());
                })
              );
            });
      }
      function qa(e) {
        return Pe((t, n) => {
          let r = !1;
          t.subscribe(
            Ne(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function Fw(e = tP) {
        return Pe((t, n) => {
          let r = !1;
          t.subscribe(
            Ne(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function tP() {
        return new Wa();
      }
      function Kn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? In((i, o) => e(i, o, r)) : ir,
            Oo(1),
            n ? qa(t) : Fw(() => new Wa())
          );
      }
      function Ge(e, t, n) {
        const r = se(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Pe((i, o) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              i.subscribe(
                Ne(
                  o,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      o.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      o.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : ir;
      }
      function Qn(e) {
        return Pe((t, n) => {
          let o,
            r = null,
            i = !1;
          (r = t.subscribe(
            Ne(n, void 0, void 0, (s) => {
              (o = Kt(e(s, Qn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0);
            })
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(n));
        });
      }
      function nP(e, t, n, r, i) {
        return (o, s) => {
          let a = n,
            l = t,
            u = 0;
          o.subscribe(
            Ne(
              s,
              (c) => {
                const d = u++;
                (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
              },
              i &&
                (() => {
                  a && s.next(l), s.complete();
                })
            )
          );
        };
      }
      function Lw(e, t) {
        return Pe(nP(e, t, arguments.length >= 2, !0));
      }
      function sf(e) {
        return e <= 0
          ? () => un
          : Pe((t, n) => {
              let r = [];
              t.subscribe(
                Ne(
                  n,
                  (i) => {
                    r.push(i), e < r.length && r.shift();
                  },
                  () => {
                    for (const i of r) n.next(i);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function jw(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? In((i, o) => e(i, o, r)) : ir,
            sf(1),
            n ? qa(t) : Fw(() => new Wa())
          );
      }
      function af(e) {
        return Pe((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const G = "primary",
        Fo = Symbol("RouteTitle");
      class oP {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Ci(e) {
        return new oP(e);
      }
      function sP(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const i = {};
        for (let o = 0; o < r.length; o++) {
          const s = r[o],
            a = e[o];
          if (s.startsWith(":")) i[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: i };
      }
      function sn(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let o = 0; o < n.length; o++)
          if (((i = n[o]), !$w(e[i], t[i]))) return !1;
        return !0;
      }
      function $w(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((i, o) => r[o] === i);
        }
        return e === t;
      }
      function Vw(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Hw(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function je(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Zn(e) {
        return qm(e) ? e : ua(e) ? Ie(Promise.resolve(e)) : R(e);
      }
      const uP = {
          exact: function zw(e, t, n) {
            if (
              !wr(e.segments, t.segments) ||
              !Ga(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !zw(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Ww,
        },
        Bw = {
          exact: function cP(e, t) {
            return sn(e, t);
          },
          subset: function dP(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => $w(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Uw(e, t, n) {
        return (
          uP[n.paths](e.root, t.root, n.matrixParams) &&
          Bw[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Ww(e, t, n) {
        return qw(e, t, t.segments, n);
      }
      function qw(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length);
          return !(!wr(i, n) || t.hasChildren() || !Ga(i, n, r));
        }
        if (e.segments.length === n.length) {
          if (!wr(e.segments, n) || !Ga(e.segments, n, r)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !Ww(e.children[i], t.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, e.segments.length),
            o = n.slice(e.segments.length);
          return (
            !!(wr(e.segments, i) && Ga(e.segments, i, r) && e.children[G]) &&
            qw(e.children[G], t, o, r)
          );
        }
      }
      function Ga(e, t, n) {
        return t.every((r, i) => Bw[n](e[i].parameters, r.parameters));
      }
      class Dr {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ci(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return pP.serialize(this);
        }
      }
      class Y {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            je(n, (r, i) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Ya(this);
        }
      }
      class Lo {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Ci(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Qw(this);
        }
      }
      function wr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let Gw = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({
            token: e,
            factory: function () {
              return new uf();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class uf {
        parse(t) {
          const n = new _P(t);
          return new Dr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${jo(t.root, !0)}`,
            r = (function yP(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((i) => `${Ka(n)}=${Ka(i)}`).join("&")
                    : `${Ka(n)}=${Ka(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function gP(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const pP = new uf();
      function Ya(e) {
        return e.segments.map((t) => Qw(t)).join("/");
      }
      function jo(e, t) {
        if (!e.hasChildren()) return Ya(e);
        if (t) {
          const n = e.children[G] ? jo(e.children[G], !1) : "",
            r = [];
          return (
            je(e.children, (i, o) => {
              o !== G && r.push(`${o}:${jo(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function hP(e, t) {
            let n = [];
            return (
              je(e.children, (r, i) => {
                i === G && (n = n.concat(t(r, i)));
              }),
              je(e.children, (r, i) => {
                i !== G && (n = n.concat(t(r, i)));
              }),
              n
            );
          })(e, (r, i) =>
            i === G ? [jo(e.children[G], !1)] : [`${i}:${jo(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[G]
            ? `${Ya(e)}/${n[0]}`
            : `${Ya(e)}/(${n.join("//")})`;
        }
      }
      function Yw(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ka(e) {
        return Yw(e).replace(/%3B/gi, ";");
      }
      function cf(e) {
        return Yw(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Qa(e) {
        return decodeURIComponent(e);
      }
      function Kw(e) {
        return Qa(e.replace(/\+/g, "%20"));
      }
      function Qw(e) {
        return `${cf(e.path)}${(function mP(e) {
          return Object.keys(e)
            .map((t) => `;${cf(t)}=${cf(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const vP = /^[^\/()?;=#]+/;
      function Za(e) {
        const t = e.match(vP);
        return t ? t[0] : "";
      }
      const DP = /^[^=?&#]+/,
        bP = /^[^&#]+/;
      class _P {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Y([], {})
              : new Y([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[G] = new Y(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Za(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new I(4009, !1);
          return this.capture(t), new Lo(Qa(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Za(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = Za(this.remaining);
            i && ((r = i), this.capture(r));
          }
          t[Qa(n)] = Qa(r);
        }
        parseQueryParam(t) {
          const n = (function wP(e) {
            const t = e.match(DP);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function CP(e) {
              const t = e.match(bP);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const i = Kw(n),
            o = Kw(r);
          if (t.hasOwnProperty(i)) {
            let s = t[i];
            Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o);
          } else t[i] = o;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Za(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i) throw new I(4010, !1);
            let o;
            r.indexOf(":") > -1
              ? ((o = r.slice(0, r.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = G);
            const s = this.parseChildren();
            (n[o] = 1 === Object.keys(s).length ? s[G] : new Y([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new I(4011, !1);
        }
      }
      function df(e) {
        return e.segments.length > 0 ? new Y([], { [G]: e }) : e;
      }
      function Ja(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const o = Ja(e.children[r]);
          (o.segments.length > 0 || o.hasChildren()) && (t[r] = o);
        }
        return (function EP(e) {
          if (1 === e.numberOfChildren && e.children[G]) {
            const t = e.children[G];
            return new Y(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new Y(e.segments, t));
      }
      function br(e) {
        return e instanceof Dr;
      }
      function xP(e, t, n, r, i) {
        if (0 === n.length) return _i(t.root, t.root, t.root, r, i);
        const o = (function Xw(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new Jw(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((i, o, s) => {
            if ("object" == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  je(o.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...i, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...i, o.segmentPath];
            }
            return "string" != typeof o
              ? [...i, o]
              : 0 === s
              ? (o.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && i.push(a));
                }),
                i)
              : [...i, o];
          }, []);
          return new Jw(n, t, r);
        })(n);
        return o.toRoot()
          ? _i(t.root, t.root, new Y([], {}), r, i)
          : (function s(l) {
              const u = (function TP(e, t, n, r) {
                  if (e.isAbsolute) return new Ei(t.root, !0, 0);
                  if (-1 === r) return new Ei(n, n === t.root, 0);
                  return (function eb(e, t, n) {
                    let r = e,
                      i = t,
                      o = n;
                    for (; o > i; ) {
                      if (((o -= i), (r = r.parent), !r)) throw new I(4005, !1);
                      i = r.segments.length;
                    }
                    return new Ei(r, !1, i - o);
                  })(n, r + ($o(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(o, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? Ho(u.segmentGroup, u.index, o.commands)
                  : hf(u.segmentGroup, u.index, o.commands);
              return _i(t.root, u.segmentGroup, c, r, i);
            })(e.snapshot?._lastPathIndex);
      }
      function $o(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Vo(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function _i(e, t, n, r, i) {
        let s,
          o = {};
        r &&
          je(r, (l, u) => {
            o[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : Zw(e, t, n));
        const a = df(Ja(s));
        return new Dr(a, o, i);
      }
      function Zw(e, t, n) {
        const r = {};
        return (
          je(e.children, (i, o) => {
            r[o] = i === t ? n : Zw(i, t, n);
          }),
          new Y(e.segments, r)
        );
      }
      class Jw {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && $o(r[0]))
          )
            throw new I(4003, !1);
          const i = r.find(Vo);
          if (i && i !== Hw(r)) throw new I(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Ei {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function hf(e, t, n) {
        if (
          (e || (e = new Y([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Ho(e, t, n);
        const r = (function RP(e, t, n) {
            let r = 0,
              i = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= n.length) return o;
              const s = e.segments[i],
                a = n[r];
              if (Vo(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!nb(l, u, s)) return o;
                r += 2;
              } else {
                if (!nb(l, {}, s)) return o;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(e, t, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const o = new Y(e.segments.slice(0, r.pathIndex), {});
          return (
            (o.children[G] = new Y(e.segments.slice(r.pathIndex), e.children)),
            Ho(o, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new Y(e.segments, {})
          : r.match && !e.hasChildren()
          ? pf(e, t, n)
          : r.match
          ? Ho(e, 0, i)
          : pf(e, t, n);
      }
      function Ho(e, t, n) {
        if (0 === n.length) return new Y(e.segments, {});
        {
          const r = (function AP(e) {
              return Vo(e[0]) ? e[0].outlets : { [G]: e };
            })(n),
            i = {};
          return (
            je(r, (o, s) => {
              "string" == typeof o && (o = [o]),
                null !== o && (i[s] = hf(e.children[s], t, o));
            }),
            je(e.children, (o, s) => {
              void 0 === r[s] && (i[s] = o);
            }),
            new Y(e.segments, i)
          );
        }
      }
      function pf(e, t, n) {
        const r = e.segments.slice(0, t);
        let i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (Vo(o)) {
            const l = kP(o.outlets);
            return new Y(r, l);
          }
          if (0 === i && $o(n[0])) {
            r.push(new Lo(e.segments[t].path, tb(n[0]))), i++;
            continue;
          }
          const s = Vo(o) ? o.outlets[G] : `${o}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          s && a && $o(a)
            ? (r.push(new Lo(s, tb(a))), (i += 2))
            : (r.push(new Lo(s, {})), i++);
        }
        return new Y(r, {});
      }
      function kP(e) {
        const t = {};
        return (
          je(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = pf(new Y([], {}), 0, n));
          }),
          t
        );
      }
      function tb(e) {
        const t = {};
        return je(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function nb(e, t, n) {
        return e == n.path && sn(t, n.parameters);
      }
      class xn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class gf extends xn {
        constructor(t, n, r = "imperative", i = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Cr extends xn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Xa extends xn {
        constructor(t, n, r, i) {
          super(t, n), (this.reason = r), (this.code = i), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class rb extends xn {
        constructor(t, n, r, i) {
          super(t, n), (this.error = r), (this.target = i), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class PP extends xn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class NP extends xn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class OP extends xn {
        constructor(t, n, r, i, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class FP extends xn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class LP extends xn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class jP {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class $P {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class VP {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class HP {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class BP {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class UP {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ib {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class ob {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = mf(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = mf(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = yf(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return yf(t, this._root).map((n) => n.value);
        }
      }
      function mf(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = mf(e, n);
          if (r) return r;
        }
        return null;
      }
      function yf(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = yf(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class Mn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Ii(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class sb extends ob {
        constructor(t, n) {
          super(t), (this.snapshot = n), vf(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function ab(e, t) {
        const n = (function WP(e, t) {
            const s = new el([], {}, {}, "", {}, G, t, null, e.root, -1, {});
            return new ub("", new Mn(s, []));
          })(e, t),
          r = new qt([new Lo("", {})]),
          i = new qt({}),
          o = new qt({}),
          s = new qt({}),
          a = new qt(""),
          l = new _r(r, i, s, a, o, G, t, n.root);
        return (l.snapshot = n.root), new sb(new Mn(l, []), n);
      }
      class _r {
        constructor(t, n, r, i, o, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(K((u) => u[Fo])) ?? R(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(K((t) => Ci(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(K((t) => Ci(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function lb(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              o = n[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (o.component) break;
              r--;
            }
          }
        return (function qP(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class el {
        constructor(t, n, r, i, o, s, a, l, u, c, d, f) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.[Fo]),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._correctedLastPathIndex = f ?? c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Ci(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ci(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class ub extends ob {
        constructor(t, n) {
          super(n), (this.url = t), vf(this, n);
        }
        toString() {
          return cb(this._root);
        }
      }
      function vf(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => vf(e, n));
      }
      function cb(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(cb).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Df(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            sn(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            sn(t.params, n.params) || e.params.next(n.params),
            (function aP(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!sn(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            sn(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function wf(e, t) {
        const n =
          sn(e.params, t.params) &&
          (function fP(e, t) {
            return (
              wr(e, t) && e.every((n, r) => sn(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || wf(e.parent, t.parent))
        );
      }
      function Bo(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const i = (function YP(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return Bo(e, r, i);
              return Bo(e, r);
            });
          })(e, t, n);
          return new Mn(r, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const o = e.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Bo(e, a))),
                s
              );
            }
          }
          const r = (function KP(e) {
              return new _r(
                new qt(e.url),
                new qt(e.params),
                new qt(e.queryParams),
                new qt(e.fragment),
                new qt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            i = t.children.map((o) => Bo(e, o));
          return new Mn(r, i);
        }
      }
      const bf = "ngNavigationCancelingError";
      function db(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = br(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          i = fb(!1, 0, t);
        return (i.url = n), (i.navigationBehaviorOptions = r), i;
      }
      function fb(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[bf] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function hb(e) {
        return pb(e) && br(e.url);
      }
      function pb(e) {
        return e && e[bf];
      }
      class QP {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Uo()),
            (this.attachRef = null);
        }
      }
      let Uo = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const i = this.getOrCreateContext(n);
            (i.outlet = r), this.contexts.set(n, i);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new QP()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const tl = !1;
      let gb = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.changeDetector = o),
              (this.environmentInjector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Te()),
              (this.deactivateEvents = new Te()),
              (this.attachEvents = new Te()),
              (this.detachEvents = new Te()),
              (this.name = i || G),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new I(4012, tl);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new I(4012, tl);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new I(4012, tl);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new I(4013, tl);
            this._activatedRoute = n;
            const i = this.location,
              s = n._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new ZP(n, a, i.injector);
            if (
              r &&
              (function JP(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(s);
              this.activated = i.createComponent(u, i.length, l);
            } else
              this.activated = i.createComponent(s, {
                index: i.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              T(Uo),
              T(Bt),
              (function Gi(e) {
                return (function R_(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const n = e.attrs;
                  if (n) {
                    const r = n.length;
                    let i = 0;
                    for (; i < r; ) {
                      const o = n[i];
                      if (pp(o)) break;
                      if (0 === o) i += 2;
                      else if ("number" == typeof o)
                        for (i++; i < r && "string" == typeof n[i]; ) i++;
                      else {
                        if (o === t) return n[i + 1];
                        i += 2;
                      }
                    }
                  }
                  return null;
                })(Se(), e);
              })("name"),
              T(Dd),
              T($n)
            );
          }),
          (e.ɵdir = Ve({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
          })),
          e
        );
      })();
      class ZP {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === _r
            ? this.route
            : t === Uo
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Cf = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Ct({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [pv],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Xe(0, "router-outlet");
            },
            dependencies: [gb],
            encapsulation: 2,
          })),
          e
        );
      })();
      function mb(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = ma(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Ef(e) {
        const t = e.children && e.children.map(Ef),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== G &&
            (n.component = Cf),
          n
        );
      }
      function Rt(e) {
        return e.outlet || G;
      }
      function yb(e, t) {
        const n = e.filter((r) => Rt(r) === t);
        return n.push(...e.filter((r) => Rt(r) !== t)), n;
      }
      function zo(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class rN {
        constructor(t, n, r, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Df(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const i = Ii(n);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, i[s], r), delete i[s];
          }),
            je(i, (o, s) => {
              this.deactivateRouteAndItsChildren(o, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if (i === o)
            if (i.component) {
              const s = r.getContext(i.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else o && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = Ii(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = Ii(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const i = Ii(n);
          t.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], r),
              this.forwardEvent(new UP(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new HP(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if ((Df(i), i === o))
            if (i.component) {
              const s = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (i.component) {
            const s = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Df(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = zo(i.snapshot),
                l = a?.get(ao) ?? null;
              (s.attachRef = null),
                (s.route = i),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(i, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class vb {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class nl {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function iN(e, t, n) {
        const r = e._root;
        return Wo(r, t ? t._root : null, n, [r.value]);
      }
      function Si(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function O0(e) {
              return null !== gs(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Wo(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = Ii(t);
        return (
          e.children.forEach((s) => {
            (function sN(
              e,
              t,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const l = (function aN(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !wr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !wr(e.url, t.url) || !sn(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !wf(e, t) || !sn(e.queryParams, t.queryParams);
                    default:
                      return !wf(e, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new vb(r))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  Wo(e, t, o.component ? (a ? a.children : null) : n, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new nl(a.outlet.component, s));
              } else
                s && qo(t, a, i),
                  i.canActivateChecks.push(new vb(r)),
                  Wo(e, null, o.component ? (a ? a.children : null) : n, r, i);
            })(s, o[s.value.outlet], n, r.concat([s.value]), i),
              delete o[s.value.outlet];
          }),
          je(o, (s, a) => qo(s, n.getContext(a), i)),
          i
        );
      }
      function qo(e, t, n) {
        const r = Ii(e),
          i = e.value;
        je(r, (o, s) => {
          qo(o, i.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new nl(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      function Go(e) {
        return "function" == typeof e;
      }
      function If(e) {
        return e instanceof Wa || "EmptyError" === e?.name;
      }
      const rl = Symbol("INITIAL_VALUE");
      function xi() {
        return on((e) =>
          kw(
            e.map((t) =>
              t.pipe(
                Oo(1),
                (function eP(...e) {
                  const t = Li(e);
                  return Pe((n, r) => {
                    (t ? nf(e, n, t) : nf(e, n)).subscribe(r);
                  });
                })(rl)
              )
            )
          ).pipe(
            K((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === rl) return rl;
                  if (!1 === n || n instanceof Dr) return n;
                }
              return !0;
            }),
            In((t) => t !== rl),
            Oo(1)
          )
        );
      }
      function Db(e) {
        return (function JC(...e) {
          return bh(e);
        })(
          Ge((t) => {
            if (br(t)) throw db(0, t);
          }),
          K((t) => !0 === t)
        );
      }
      const Sf = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function wb(e, t, n, r, i) {
        const o = xf(e, t, n);
        return o.matched
          ? (function EN(e, t, n, r) {
              const i = t.canMatch;
              return i && 0 !== i.length
                ? R(
                    i.map((s) => {
                      const a = Si(s, e);
                      return Zn(
                        (function hN(e) {
                          return e && Go(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(xi(), Db())
                : R(!0);
            })((r = mb(t, r)), t, n).pipe(K((s) => (!0 === s ? o : { ...Sf })))
          : R(o);
      }
      function xf(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Sf }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || sP)(n, e, t);
        if (!i) return { ...Sf };
        const o = {};
        je(i.posParams, (a, l) => {
          o[l] = a.path;
        });
        const s =
          i.consumed.length > 0
            ? { ...o, ...i.consumed[i.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: n.slice(i.consumed.length),
          parameters: s,
          positionalParamSegments: i.posParams ?? {},
        };
      }
      function il(e, t, n, r, i = "corrected") {
        if (
          n.length > 0 &&
          (function xN(e, t, n) {
            return n.some((r) => ol(e, t, r) && Rt(r) !== G);
          })(e, n, r)
        ) {
          const s = new Y(
            t,
            (function SN(e, t, n, r) {
              const i = {};
              (i[G] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const o of n)
                if ("" === o.path && Rt(o) !== G) {
                  const s = new Y([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (i[Rt(o)] = s);
                }
              return i;
            })(e, t, r, new Y(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function MN(e, t, n) {
            return n.some((r) => ol(e, t, r));
          })(e, n, r)
        ) {
          const s = new Y(
            e.segments,
            (function IN(e, t, n, r, i, o) {
              const s = {};
              for (const a of r)
                if (ol(e, n, a) && !i[Rt(a)]) {
                  const l = new Y([], {});
                  (l._sourceSegment = e),
                    (l._segmentIndexShift =
                      "legacy" === o ? e.segments.length : t.length),
                    (s[Rt(a)] = l);
                }
              return { ...i, ...s };
            })(e, t, n, r, e.children, i)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const o = new Y(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function ol(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function bb(e, t, n, r) {
        return (
          !!(Rt(e) === r || (r !== G && ol(t, n, e))) &&
          ("**" === e.path || xf(t, e, n).matched)
        );
      }
      function Cb(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const sl = !1;
      class al {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class _b {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Yo(e) {
        return No(new al(e));
      }
      function Eb(e) {
        return No(new _b(e));
      }
      class kN {
        constructor(t, n, r, i, o) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = o),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = il(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new Y(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, G)
            .pipe(
              K((o) =>
                this.createUrlTree(
                  Ja(o),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Qn((o) => {
                if (o instanceof _b)
                  return (this.allowRedirects = !1), this.match(o.urlTree);
                throw o instanceof al ? this.noMatchError(o) : o;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, G)
            .pipe(
              K((i) => this.createUrlTree(Ja(i), t.queryParams, t.fragment))
            )
            .pipe(
              Qn((i) => {
                throw i instanceof al ? this.noMatchError(i) : i;
              })
            );
        }
        noMatchError(t) {
          return new I(4002, sl);
        }
        createUrlTree(t, n, r) {
          const i = df(t);
          return new Dr(i, n, r);
        }
        expandSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(K((o) => new Y([], o)))
            : this.expandSegment(t, r, n, r.segments, i, !0);
        }
        expandChildren(t, n, r) {
          const i = [];
          for (const o of Object.keys(r.children))
            "primary" === o ? i.unshift(o) : i.push(o);
          return Ie(i).pipe(
            Gn((o) => {
              const s = r.children[o],
                a = yb(n, o);
              return this.expandSegmentGroup(t, a, s, o).pipe(
                K((l) => ({ segment: l, outlet: o }))
              );
            }),
            Lw((o, s) => ((o[s.outlet] = s.segment), o), {}),
            jw()
          );
        }
        expandSegment(t, n, r, i, o, s) {
          return Ie(r).pipe(
            Gn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, i, o, s).pipe(
                Qn((u) => {
                  if (u instanceof al) return R(null);
                  throw u;
                })
              )
            ),
            Kn((a) => !!a),
            Qn((a, l) => {
              if (If(a)) return Cb(n, i, o) ? R(new Y([], {})) : Yo(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, i, o, s, a) {
          return bb(i, n, o, s)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, i, o, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s)
              : Yo(n)
            : Yo(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                i,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
          const o = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? Eb(o)
            : this.lineralizeSegments(r, o).pipe(
                Fe((s) => {
                  const a = new Y(s, {});
                  return this.expandSegment(t, a, n, s, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = xf(n, i, o);
          if (!a) return Yo(n);
          const d = this.applyRedirectCommands(l, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? Eb(d)
            : this.lineralizeSegments(i, d).pipe(
                Fe((f) => this.expandSegment(t, n, r, f.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, i, o) {
          return "**" === r.path
            ? ((t = mb(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? R({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    K(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new Y(i, {})
                      )
                    )
                  )
                : R(new Y(i, {})))
            : wb(n, r, i, t).pipe(
                on(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, i).pipe(
                          Fe((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = il(
                                n,
                                a,
                                l,
                                f
                              ),
                              g = new Y(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                K((m) => new Y(a, m))
                              );
                            if (0 === f.length && 0 === p.length)
                              return R(new Y(a, {}));
                            const y = Rt(r) === o;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              y ? G : o,
                              !0
                            ).pipe(
                              K((w) => new Y(a.concat(w.segments), w.children))
                            );
                          })
                        )
                      : Yo(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? R({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? R({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function _N(e, t, n, r) {
                  const i = t.canLoad;
                  return void 0 === i || 0 === i.length
                    ? R(!0)
                    : R(
                        i.map((s) => {
                          const a = Si(s, e);
                          return Zn(
                            (function uN(e) {
                              return e && Go(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(xi(), Db());
                })(t, n, r).pipe(
                  Fe((i) =>
                    i
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Ge((o) => {
                            (n._loadedRoutes = o.routes),
                              (n._loadedInjector = o.injector);
                          })
                        )
                      : (function AN(e) {
                          return No(fb(sl, 3));
                        })()
                  )
                )
            : R({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return R(r);
            if (i.numberOfChildren > 1 || !i.children[G])
              return No(new I(4e3, sl));
            i = i.children[G];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, i) {
          const o = this.createSegmentGroup(t, n.root, r, i);
          return new Dr(
            o,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            je(t, (i, o) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, i) {
          const o = this.createSegments(t, n.segments, r, i);
          let s = {};
          return (
            je(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, i);
            }),
            new Y(o, s)
          );
        }
        createSegments(t, n, r, i) {
          return n.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, i)
              : this.findOrReturn(o, r)
          );
        }
        findPosParam(t, n, r) {
          const i = r[n.path.substring(1)];
          if (!i) throw new I(4001, sl);
          return i;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const i of n) {
            if (i.path === t.path) return n.splice(r), i;
            r++;
          }
          return t;
        }
      }
      class NN {}
      class LN {
        constructor(t, n, r, i, o, s, a, l) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = i),
            (this.url = o),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = l);
        }
        recognize() {
          const t = il(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            G
          ).pipe(
            K((n) => {
              if (null === n) return null;
              const r = new el(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  G,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                i = new Mn(r, n),
                o = new ub(this.url, i);
              return this.inheritParamsAndData(o._root), o;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = lb(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, i);
        }
        processChildren(t, n, r) {
          return Ie(Object.keys(r.children)).pipe(
            Gn((i) => {
              const o = r.children[i],
                s = yb(n, i);
              return this.processSegmentGroup(t, s, o, i);
            }),
            Lw((i, o) => (i && o ? (i.push(...o), i) : null)),
            (function rP(e, t = !1) {
              return Pe((n, r) => {
                let i = 0;
                n.subscribe(
                  Ne(r, (o) => {
                    const s = e(o, i++);
                    (s || t) && r.next(o), !s && r.complete();
                  })
                );
              });
            })((i) => null !== i),
            qa(null),
            jw(),
            K((i) => {
              if (null === i) return null;
              const o = Ib(i);
              return (
                (function jN(e) {
                  e.sort((t, n) =>
                    t.value.outlet === G
                      ? -1
                      : n.value.outlet === G
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(o),
                o
              );
            })
          );
        }
        processSegment(t, n, r, i, o) {
          return Ie(n).pipe(
            Gn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, i, o)
            ),
            Kn((s) => !!s),
            Qn((s) => {
              if (If(s)) return Cb(r, i, o) ? R([]) : R(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, i, o) {
          if (n.redirectTo || !bb(n, r, i, o)) return R(null);
          let s;
          if ("**" === n.path) {
            const a = i.length > 0 ? Hw(i).parameters : {},
              l = xb(r) + i.length;
            s = R({
              snapshot: new el(
                i,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                Tb(n),
                Rt(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                Sb(r),
                l,
                Ab(n),
                l
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = wb(r, n, i, t).pipe(
              K(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = xb(r) + l.length;
                  return {
                    snapshot: new el(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      Tb(n),
                      Rt(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      Sb(r),
                      d,
                      Ab(n),
                      d
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return s.pipe(
            on((a) => {
              if (null === a) return R(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function $N(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = il(
                  r,
                  u,
                  c,
                  f.filter((y) => void 0 === y.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  K((y) => (null === y ? null : [new Mn(l, y)]))
                );
              if (0 === f.length && 0 === p.length) return R([new Mn(l, [])]);
              const g = Rt(n) === o;
              return this.processSegment(d, f, h, p, g ? G : o).pipe(
                K((y) => (null === y ? null : [new Mn(l, y)]))
              );
            })
          );
        }
      }
      function VN(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Ib(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!VN(r)) {
            t.push(r);
            continue;
          }
          const i = t.find((o) => r.value.routeConfig === o.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
        }
        for (const r of n) {
          const i = Ib(r.children);
          t.push(new Mn(r.value, i));
        }
        return t.filter((r) => !n.has(r));
      }
      function Sb(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function xb(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function Tb(e) {
        return e.data || {};
      }
      function Ab(e) {
        return e.resolve || {};
      }
      function Rb(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Mf(e) {
        return on((t) => {
          const n = e(t);
          return n ? Ie(n).pipe(K(() => t)) : R(t);
        });
      }
      let kb = (() => {
          class e {
            buildTitle(n) {
              let r,
                i = n.root;
              for (; void 0 !== i; )
                (r = this.getResolvedTitleForRoute(i) ?? r),
                  (i = i.children.find((o) => o.outlet === G));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Fo];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = j({
              token: e,
              factory: function () {
                return ye(Pb);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        Pb = (() => {
          class e extends kb {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(yw));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      class YN {}
      class QN extends class KN {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const ul = new L("", { providedIn: "root", factory: () => ({}) }),
        Tf = new L("ROUTES");
      let Af = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return R(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Zn(n.loadComponent()).pipe(
                Ge((o) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = o);
                }),
                af(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              i = new Ow(r, () => new Yt()).pipe(rf());
            return this.componentLoaders.set(n, i), i;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return R({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                K((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = Vw(l.get(Tf, [], N.Self | N.Optional))));
                  return { routes: u.map(Ef), injector: l };
                }),
                af(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new Ow(o, () => new Yt()).pipe(rf());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Zn(n()).pipe(
              Fe((r) =>
                r instanceof fv || Array.isArray(r)
                  ? R(r)
                  : Ie(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(St), M(cd));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class JN {}
      class XN {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function eO(e) {
        throw e;
      }
      function tO(e, t, n) {
        return t.parse("/");
      }
      const nO = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        rO = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function Ob() {
        const e = ye(Gw),
          t = ye(Uo),
          n = ye(Sd),
          r = ye(St),
          i = ye(cd),
          o = ye(Tf, { optional: !0 }) ?? [],
          s = ye(ul, { optional: !0 }) ?? {},
          a = ye(Pb),
          l = ye(kb, { optional: !0 }),
          u = ye(JN, { optional: !0 }),
          c = ye(YN, { optional: !0 }),
          d = new $e(null, e, t, n, r, i, Vw(o));
        return (
          u && (d.urlHandlingStrategy = u),
          c && (d.routeReuseStrategy = c),
          (d.titleStrategy = l ?? a),
          (function iO(e, t) {
            e.errorHandler && (t.errorHandler = e.errorHandler),
              e.malformedUriErrorHandler &&
                (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
              e.onSameUrlNavigation &&
                (t.onSameUrlNavigation = e.onSameUrlNavigation),
              e.paramsInheritanceStrategy &&
                (t.paramsInheritanceStrategy = e.paramsInheritanceStrategy),
              e.relativeLinkResolution &&
                (t.relativeLinkResolution = e.relativeLinkResolution),
              e.urlUpdateStrategy &&
                (t.urlUpdateStrategy = e.urlUpdateStrategy),
              e.canceledNavigationResolution &&
                (t.canceledNavigationResolution =
                  e.canceledNavigationResolution);
          })(s, d),
          d
        );
      }
      let $e = (() => {
        class e {
          constructor(n, r, i, o, s, a, l) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = o),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new Yt()),
              (this.errorHandler = eO),
              (this.malformedUriErrorHandler = tO),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => R(void 0)),
              (this.urlHandlingStrategy = new XN()),
              (this.routeReuseStrategy = new QN()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = s.get(Af)),
              (this.configLoader.onLoadEndListener = (f) =>
                this.triggerEvent(new $P(f))),
              (this.configLoader.onLoadStartListener = (f) =>
                this.triggerEvent(new jP(f))),
              (this.ngModule = s.get(mr)),
              (this.console = s.get(CT));
            const d = s.get(Ae);
            (this.isNgZoneEnabled = d instanceof Ae && Ae.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function lP() {
                return new Dr(new Y([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = ab(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new qt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              In((i) => 0 !== i.id),
              K((i) => ({
                ...i,
                extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
              })),
              on((i) => {
                let o = !1,
                  s = !1;
                return R(i).pipe(
                  Ge((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  on((a) => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Fb(a.source) && (this.browserUrlTree = a.extractedUrl),
                        R(a).pipe(
                          on((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new gf(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? un
                                : Promise.resolve(d)
                            );
                          }),
                          (function PN(e, t, n, r) {
                            return on((i) =>
                              (function RN(e, t, n, r, i) {
                                return new kN(e, t, n, r, i).apply();
                              })(e, t, n, i.extractedUrl, r).pipe(
                                K((o) => ({ ...i, urlAfterRedirects: o }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          Ge((d) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: d.urlAfterRedirects,
                            }),
                              (i.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function BN(e, t, n, r, i, o) {
                            return Fe((s) =>
                              (function FN(
                                e,
                                t,
                                n,
                                r,
                                i,
                                o,
                                s = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new LN(e, t, n, r, i, s, a, o)
                                  .recognize()
                                  .pipe(
                                    on((l) =>
                                      null === l
                                        ? (function ON(e) {
                                            return new De((t) => t.error(e));
                                          })(new NN())
                                        : R(l)
                                    )
                                  );
                              })(
                                e,
                                t,
                                n,
                                s.urlAfterRedirects,
                                r.serialize(s.urlAfterRedirects),
                                r,
                                i,
                                o
                              ).pipe(K((a) => ({ ...s, targetSnapshot: a })))
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Ge((d) => {
                            if (
                              ((i.targetSnapshot = d.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new PP(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: g,
                          extras: y,
                        } = a,
                        v = new gf(f, this.serializeUrl(h), p, g);
                      r.next(v);
                      const w = ab(h, this.rootComponentType).snapshot;
                      return R(
                        (i = {
                          ...a,
                          targetSnapshot: w,
                          urlAfterRedirects: h,
                          extras: {
                            ...y,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), un;
                  }),
                  Ge((a) => {
                    const l = new NP(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  K(
                    (a) =>
                      (i = {
                        ...a,
                        guards: iN(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function gN(e, t) {
                    return Fe((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: o,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === o.length
                        ? R({ ...n, guardsResult: !0 })
                        : (function mN(e, t, n, r) {
                            return Ie(e).pipe(
                              Fe((i) =>
                                (function CN(e, t, n, r, i) {
                                  const o =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return o && 0 !== o.length
                                    ? R(
                                        o.map((a) => {
                                          const l = zo(t) ?? i,
                                            u = Si(a, l);
                                          return Zn(
                                            (function fN(e) {
                                              return e && Go(e.canDeactivate);
                                            })(u)
                                              ? u.canDeactivate(e, t, n, r)
                                              : l.runInContext(() =>
                                                  u(e, t, n, r)
                                                )
                                          ).pipe(Kn());
                                        })
                                      ).pipe(xi())
                                    : R(!0);
                                })(i.component, i.route, n, t, r)
                              ),
                              Kn((i) => !0 !== i, !0)
                            );
                          })(s, r, i, e).pipe(
                            Fe((a) =>
                              a &&
                              (function lN(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function yN(e, t, n, r) {
                                    return Ie(t).pipe(
                                      Gn((i) =>
                                        nf(
                                          (function DN(e, t) {
                                            return (
                                              null !== e && t && t(new VP(e)),
                                              R(!0)
                                            );
                                          })(i.route.parent, r),
                                          (function vN(e, t) {
                                            return (
                                              null !== e && t && t(new BP(e)),
                                              R(!0)
                                            );
                                          })(i.route, r),
                                          (function bN(e, t, n) {
                                            const r = t[t.length - 1],
                                              o = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function oN(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  Nw(() =>
                                                    R(
                                                      s.guards.map((l) => {
                                                        const u =
                                                            zo(s.node) ?? n,
                                                          c = Si(l, u);
                                                        return Zn(
                                                          (function dN(e) {
                                                            return (
                                                              e &&
                                                              Go(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                            ? c.canActivateChild(
                                                                r,
                                                                e
                                                              )
                                                            : u.runInContext(
                                                                () => c(r, e)
                                                              )
                                                        ).pipe(Kn());
                                                      })
                                                    ).pipe(xi())
                                                  )
                                                );
                                            return R(o).pipe(xi());
                                          })(e, i.path, n),
                                          (function wN(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return R(!0);
                                            const i = r.map((o) =>
                                              Nw(() => {
                                                const s = zo(t) ?? n,
                                                  a = Si(o, s);
                                                return Zn(
                                                  (function cN(e) {
                                                    return (
                                                      e && Go(e.canActivate)
                                                    );
                                                  })(a)
                                                    ? a.canActivate(t, e)
                                                    : s.runInContext(() =>
                                                        a(t, e)
                                                      )
                                                ).pipe(Kn());
                                              })
                                            );
                                            return R(i).pipe(xi());
                                          })(e, i.route, n)
                                        )
                                      ),
                                      Kn((i) => !0 !== i, !0)
                                    );
                                  })(r, o, e, t)
                                : R(a)
                            ),
                            K((a) => ({ ...n, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  Ge((a) => {
                    if (((i.guardsResult = a.guardsResult), br(a.guardsResult)))
                      throw db(0, a.guardsResult);
                    const l = new OP(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  In(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  Mf((a) => {
                    if (a.guards.canActivateChecks.length)
                      return R(a).pipe(
                        Ge((l) => {
                          const u = new FP(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        on((l) => {
                          let u = !1;
                          return R(l).pipe(
                            (function UN(e, t) {
                              return Fe((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = n;
                                if (!i.length) return R(n);
                                let o = 0;
                                return Ie(i).pipe(
                                  Gn((s) =>
                                    (function zN(e, t, n, r) {
                                      const i = e.routeConfig,
                                        o = e._resolve;
                                      return (
                                        void 0 !== i?.title &&
                                          !Rb(i) &&
                                          (o[Fo] = i.title),
                                        (function WN(e, t, n, r) {
                                          const i = (function qN(e) {
                                            return [
                                              ...Object.keys(e),
                                              ...Object.getOwnPropertySymbols(
                                                e
                                              ),
                                            ];
                                          })(e);
                                          if (0 === i.length) return R({});
                                          const o = {};
                                          return Ie(i).pipe(
                                            Fe((s) =>
                                              (function GN(e, t, n, r) {
                                                const i = zo(t) ?? r,
                                                  o = Si(e, i);
                                                return Zn(
                                                  o.resolve
                                                    ? o.resolve(t, n)
                                                    : i.runInContext(() =>
                                                        o(t, n)
                                                      )
                                                );
                                              })(e[s], t, n, r).pipe(
                                                Kn(),
                                                Ge((a) => {
                                                  o[s] = a;
                                                })
                                              )
                                            ),
                                            sf(1),
                                            (function iP(e) {
                                              return K(() => e);
                                            })(o),
                                            Qn((s) => (If(s) ? un : No(s)))
                                          );
                                        })(o, e, t, r).pipe(
                                          K(
                                            (s) => (
                                              (e._resolvedData = s),
                                              (e.data = lb(e, n).resolve),
                                              i &&
                                                Rb(i) &&
                                                (e.data[Fo] = i.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  Ge(() => o++),
                                  sf(1),
                                  Fe((s) => (o === i.length ? R(n) : un))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            Ge({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(l, "", 2));
                              },
                            })
                          );
                        }),
                        Ge((l) => {
                          const u = new LP(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  Mf((a) => {
                    const l = (u) => {
                      const c = [];
                      u.routeConfig?.loadComponent &&
                        !u.routeConfig._loadedComponent &&
                        c.push(
                          this.configLoader.loadComponent(u.routeConfig).pipe(
                            Ge((d) => {
                              u.component = d;
                            }),
                            K(() => {})
                          )
                        );
                      for (const d of u.children) c.push(...l(d));
                      return c;
                    };
                    return kw(l(a.targetSnapshot.root)).pipe(qa(), Oo(1));
                  }),
                  Mf(() => this.afterPreactivation()),
                  K((a) => {
                    const l = (function GP(e, t, n) {
                      const r = Bo(e, t._root, n ? n._root : void 0);
                      return new sb(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return (i = { ...a, targetRouterState: l });
                  }),
                  Ge((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    K(
                      (r) => (
                        new rN(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  Ge({
                    next() {
                      o = !0;
                    },
                    complete() {
                      o = !0;
                    },
                  }),
                  af(() => {
                    o || s || this.cancelNavigationTransition(i, "", 1),
                      this.currentNavigation?.id === i.id &&
                        (this.currentNavigation = null);
                  }),
                  Qn((a) => {
                    if (((s = !0), pb(a))) {
                      hb(a) ||
                        ((this.navigated = !0), this.restoreHistory(i, !0));
                      const l = new Xa(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((r.next(l), hb(a))) {
                        const u = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          c = {
                            skipLocationChange: i.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              Fb(i.source),
                          };
                        this.scheduleNavigation(u, "imperative", null, c, {
                          resolve: i.resolve,
                          reject: i.reject,
                          promise: i.promise,
                        });
                      } else i.resolve(!1);
                    } else {
                      this.restoreHistory(i, !0);
                      const l = new rb(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a,
                        i.targetSnapshot ?? void 0
                      );
                      r.next(l);
                      try {
                        i.resolve(this.errorHandler(a));
                      } catch (u) {
                        i.reject(u);
                      }
                    }
                    return un;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next({ ...this.transitions.value, ...n });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    const i = { replaceUrl: !0 },
                      o = n.state?.navigationId ? n.state : null;
                    if (o) {
                      const a = { ...o };
                      delete a.navigationId,
                        delete a.ɵrouterPageId,
                        0 !== Object.keys(a).length && (i.state = a);
                    }
                    const s = this.parseUrl(n.url);
                    this.scheduleNavigation(s, r, o, i);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            (this.config = n.map(Ef)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: i,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = i || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...o };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = o || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              xP(u, this.currentUrlTree, n, d, c ?? null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = br(n) ? n : this.parseUrl(n),
              o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(o, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function oO(e) {
                for (let t = 0; t < e.length; t++) {
                  if (null == e[t]) throw new I(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let i;
            if (((i = !0 === r ? { ...nO } : !1 === r ? { ...rO } : r), br(n)))
              return Uw(this.currentUrlTree, n, i);
            const o = this.parseUrl(n);
            return Uw(this.currentUrlTree, o, i);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, i) => {
              const o = n[i];
              return null != o && (r[i] = o), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new Cr(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, i, o, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, u;
            s
              ? ((a = s.resolve), (l = s.reject), (u = s.promise))
              : (u = new Promise((f, h) => {
                  (a = f), (l = h);
                }));
            const c = ++this.navigationId;
            let d;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (d =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : o.replaceUrl || o.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (d = 0),
              this.setTransition({
                id: c,
                targetPageId: d,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: o,
                resolve: a,
                reject: l,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              u.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(n, r) {
            const i = this.urlSerializer.serialize(n),
              o = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, "", o)
              : this.location.go(i, "", o);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === i
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(i);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r, i) {
            const o = new Xa(n.id, this.serializeUrl(n.extractedUrl), r, i);
            this.triggerEvent(o), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            uc();
          }),
          (e.ɵprov = j({
            token: e,
            factory: function () {
              return Ob();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      function Fb(e) {
        return "imperative" !== e;
      }
      class Lb {}
      let lO = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.router = n),
              (this.injector = i),
              (this.preloadingStrategy = o),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                In((n) => n instanceof Cr),
                Gn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const i = [];
            for (const o of r) {
              o.providers &&
                !o._injector &&
                (o._injector = ma(o.providers, n, `Route: ${o.path}`));
              const s = o._injector ?? n,
                a = o._loadedInjector ?? s;
              (o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) ||
              (o.loadComponent && !o._loadedComponent)
                ? i.push(this.preloadConfig(s, o))
                : (o.children || o._loadedRoutes) &&
                  i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
            }
            return Ie(i).pipe(Tr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let i;
              i =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : R(null);
              const o = i.pipe(
                Fe((s) =>
                  null === s
                    ? R(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Ie([o, this.loader.loadComponent(r)]).pipe(Tr())
                : o;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M($e), M(cd), M($n), M(Lb), M(Af));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Pf = new L("");
      let jb = (() => {
        class e {
          constructor(n, r, i = {}) {
            (this.router = n),
              (this.viewportScroller = r),
              (this.options = i),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (i.scrollPositionRestoration =
                i.scrollPositionRestoration || "disabled"),
              (i.anchorScrolling = i.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof gf
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Cr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.router.parseUrl(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof ib &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.router.triggerEvent(
              new ib(
                n,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                r
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            uc();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Mi(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function Nf(e) {
        return [{ provide: Tf, multi: !0, useValue: e }];
      }
      function Vb() {
        const e = ye(St);
        return (t) => {
          const n = e.get(_a);
          if (t !== n.components[0]) return;
          const r = e.get($e),
            i = e.get(Hb);
          1 === e.get(Of) && r.initialNavigation(),
            e.get(Bb, null, N.Optional)?.setUpPreloading(),
            e.get(Pf, null, N.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            i.next(),
            i.complete();
        };
      }
      const Hb = new L("", { factory: () => new Yt() }),
        Of = new L("", { providedIn: "root", factory: () => 1 });
      const Bb = new L("");
      function fO(e) {
        return Mi(0, [
          { provide: Bb, useExisting: lO },
          { provide: Lb, useExisting: e },
        ]);
      }
      const Ub = new L("ROUTER_FORROOT_GUARD"),
        hO = [
          Sd,
          { provide: Gw, useClass: uf },
          { provide: $e, useFactory: Ob },
          Uo,
          {
            provide: _r,
            useFactory: function $b(e) {
              return e.routerState.root;
            },
            deps: [$e],
          },
          Af,
        ];
      function pO() {
        return new aD("Router", $e);
      }
      let zb = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                hO,
                [],
                Nf(n),
                {
                  provide: Ub,
                  useFactory: vO,
                  deps: [[$e, new eo(), new to()]],
                },
                { provide: ul, useValue: r || {} },
                r?.useHash
                  ? { provide: vr, useClass: cA }
                  : { provide: vr, useClass: kD },
                {
                  provide: Pf,
                  useFactory: () => {
                    const e = ye($e),
                      t = ye(TR),
                      n = ye(ul);
                    return (
                      n.scrollOffset && t.setOffset(n.scrollOffset),
                      new jb(e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? fO(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: aD, multi: !0, useFactory: pO },
                r?.initialNavigation ? DO(r) : [],
                [
                  { provide: Wb, useFactory: Vb },
                  { provide: eD, multi: !0, useExisting: Wb },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [Nf(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ub, 8));
          }),
          (e.ɵmod = Nt({ type: e })),
          (e.ɵinj = wt({ imports: [Cf] })),
          e
        );
      })();
      function vO(e) {
        return "guarded";
      }
      function DO(e) {
        return [
          "disabled" === e.initialNavigation
            ? Mi(3, [
                {
                  provide: wa,
                  multi: !0,
                  useFactory: () => {
                    const t = ye($e);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Of, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Mi(2, [
                { provide: Of, useValue: 0 },
                {
                  provide: wa,
                  multi: !0,
                  deps: [St],
                  useFactory: (t) => {
                    const n = t.get(lA, Promise.resolve());
                    let r = !1;
                    return () =>
                      n.then(
                        () =>
                          new Promise((o) => {
                            const s = t.get($e),
                              a = t.get(Hb);
                            (function i(o) {
                              t.get($e)
                                .events.pipe(
                                  In(
                                    (a) =>
                                      a instanceof Cr ||
                                      a instanceof Xa ||
                                      a instanceof rb
                                  ),
                                  K(
                                    (a) =>
                                      a instanceof Cr ||
                                      (a instanceof Xa &&
                                        (0 === a.code || 1 === a.code) &&
                                        null)
                                  ),
                                  In((a) => null !== a),
                                  Oo(1)
                                )
                                .subscribe(() => {
                                  o();
                                });
                            })(() => {
                              o(!0), (r = !0);
                            }),
                              (s.afterPreactivation = () => (
                                o(!0), r || a.closed ? R(void 0) : a
                              )),
                              s.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const Wb = new L(""),
        bO = [];
      let CO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Nt({ type: e })),
            (e.ɵinj = wt({ imports: [zb.forRoot(bO), zb] })),
            e
          );
        })(),
        Ko = (() => {
          class e {
            constructor(n) {
              (this.http = n), this.getPlanets().subscribe((r) => {});
            }
            getPlanets() {
              return this.http.get("https://swapi.dev/api/planets");
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(xw));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        _O = (() => {
          class e {
            constructor() {
              this.planetDetailsData = {};
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ct({
              type: e,
              selectors: [["app-planet-detail"]],
              inputs: { planetDetailsData: "planetDetailsData" },
              decls: 35,
              vars: 6,
              consts: [
                [1, "text-xl"],
                [1, "my-2"],
                [
                  1,
                  "font-extrabold",
                  "font-chakrapetch",
                  "ease-in-out",
                  "hover:text-yellow-50",
                  "uppercase",
                  "text-yellow-100",
                ],
                [1, "text-teal-100", "capitalize", "hover:text-teal-50"],
                [
                  1,
                  "font-extrabold",
                  "font-chakrapetch",
                  "ease-in-out",
                  "hover:text-yellow-100",
                  "uppercase",
                  "text-yellow-200",
                ],
                [
                  1,
                  "font-extrabold",
                  "font-chakrapetch",
                  "ease-in-out",
                  "hover:text-yellow-200",
                  "uppercase",
                  "text-yellow-300",
                ],
                [
                  1,
                  "font-extrabold",
                  "font-chakrapetch",
                  "ease-in-out",
                  "hover:text-yellow-300",
                  "uppercase",
                  "text-yellow-400",
                ],
                [
                  1,
                  "font-extrabold",
                  "font-chakrapetch",
                  "ease-in-out",
                  "hover:text-yellow-400",
                  "uppercase",
                  "text-yellow-500",
                ],
                [
                  1,
                  "font-extrabold",
                  "font-chakrapetch",
                  "ease-in-out",
                  "hover:text-yellow-500",
                  "uppercase",
                  "text-yellow-600",
                ],
                [
                  1,
                  "mt-2",
                  "flex",
                  "justify-center",
                  "sm:justify-start",
                  "text-teal-400",
                  "hover:scale-105",
                  "md:hover:translate-x-4",
                  "hover:text-teal-300",
                ],
                ["href", "#top", 1, ""],
                [
                  1,
                  "mx-auto",
                  "font-extrabold",
                  "font-chakrapetch",
                  "uppercase",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (S(0, "ul", 0)(1, "li", 1)(2, "span", 2),
                  V(3, "climate: "),
                  x(),
                  S(4, "span", 3),
                  V(5),
                  x()(),
                  S(6, "li", 1)(7, "span", 4),
                  V(8, "terrain: "),
                  x(),
                  S(9, "span", 3),
                  V(10),
                  x()(),
                  S(11, "li", 1)(12, "span", 5),
                  V(13, "Orbital Period: "),
                  x(),
                  S(14, "span", 3),
                  V(15),
                  x()(),
                  S(16, "li", 1)(17, "span", 6),
                  V(18, "diameter: "),
                  x(),
                  S(19, "span", 3),
                  V(20),
                  x()(),
                  S(21, "li", 1)(22, "span", 7),
                  V(23, "rotation period: "),
                  x(),
                  S(24, "span", 3),
                  V(25),
                  x()(),
                  S(26, "li", 1)(27, "span", 8),
                  V(28, "population: "),
                  x(),
                  S(29, "span", 3),
                  V(30),
                  x()(),
                  S(31, "li", 9)(32, "a", 10)(33, "p", 11),
                  V(34, " - Return to Top - "),
                  x()()()()),
                  2 & n &&
                    (q(5),
                    Un(r.planetDetailsData.climate),
                    q(5),
                    Un(r.planetDetailsData.terrain),
                    q(5),
                    et("", r.planetDetailsData.orbital_period, " EH"),
                    q(5),
                    et("", r.planetDetailsData.diameter, " units"),
                    q(5),
                    et("", r.planetDetailsData.rotation_period, " EH"),
                    q(5),
                    Un(r.planetDetailsData.population));
              },
              encapsulation: 2,
            })),
            e
          );
        })();
      function EO(e, t) {
        if (
          (1 & e &&
            (S(0, "div", 9)(1, "div", 10)(2, "div", 11),
            Xe(3, "img", 12),
            x(),
            S(4, "h1", 13),
            V(5),
            x(),
            S(6, "p", 14),
            V(7),
            x()(),
            S(8, "div", 15)(9, "ul", 16)(10, "li", 17)(11, "span", 18),
            V(12, "climate: "),
            x(),
            S(13, "span", 19),
            V(14),
            x()(),
            S(15, "li", 17)(16, "span", 20),
            V(17, "terrain: "),
            x(),
            S(18, "span", 19),
            V(19),
            x()(),
            S(20, "li", 17)(21, "span", 21),
            V(22, "Orbital Period: "),
            x(),
            S(23, "span", 19),
            V(24),
            x()(),
            S(25, "li", 17)(26, "span", 22),
            V(27, "diameter: "),
            x(),
            S(28, "span", 19),
            V(29),
            x()(),
            S(30, "li", 17)(31, "span", 23),
            V(32, "rotation period: "),
            x(),
            S(33, "span", 19),
            V(34),
            x()(),
            S(35, "li", 17)(36, "span", 24),
            V(37, "population: "),
            x(),
            S(38, "span", 19),
            V(39),
            x()()()()()),
          2 & e)
        ) {
          const n = yt(2);
          q(3),
            pi("src", "assets/images/", n.requestedPlanet.name, ".png", Kr),
            q(2),
            et(" ", n.requestedPlanet.name, " "),
            q(2),
            da(
              " The planet known as ",
              n.requestedPlanet.name,
              ", has a terrain that is made up of ",
              n.requestedPlanet.terrain,
              ". It is typically ",
              n.requestedPlanet.climate,
              ". "
            ),
            q(7),
            Un(n.requestedPlanet.climate),
            q(5),
            Un(n.requestedPlanet.terrain),
            q(5),
            et("", n.requestedPlanet.orbital_period, " EH"),
            q(5),
            et("", n.requestedPlanet.diameter, " units"),
            q(5),
            et("", n.requestedPlanet.rotation_period, " EH"),
            q(5),
            Un(n.requestedPlanet.population);
        }
      }
      function IO(e, t) {
        if (1 & e) {
          const n = la();
          S(0, "div", 1),
            We("click", function () {
              return fn(n), hn(yt().closeModal());
            }),
            S(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h3", 5),
            V(5),
            x()(),
            Mt(6, EO, 40, 11, "div", 6),
            S(7, "div", 7)(8, "button", 8),
            We("click", function () {
              return fn(n), hn(yt().closeModal());
            }),
            V(9, " Close "),
            x()()()()();
        }
        if (2 & e) {
          const n = yt();
          q(5),
            et(" ", n.requestedPlanet.name, " "),
            q(1),
            Le("ngIf", n.planetActivated);
        }
      }
      let SO = (() => {
        class e {
          constructor(n) {
            (this.planetsService = n),
              (this.planetActivated = !1),
              (this.deactivationDetails = new Te()),
              (this.modalPlanetData = {}),
              (this.temporaryData = [{}]);
          }
          ngOnInit() {
            this.planetsService.getPlanets().subscribe((n) => {
              (this.temporaryData = n.results), console.log(this.temporaryData);
              for (const r of this.temporaryData)
                if (r.name === this.requestedPlanet.planetName)
                  return console.log(r);
              return (this.modalPlanetData = this.temporaryData);
            });
          }
          ngOnChanges(n) {
            console.log(n);
            for (const i of this.temporaryData)
              if (i.name === this.requestedPlanet.planetName)
                return console.log(i);
            return (this.modalPlanetData = this.temporaryData);
          }
          closeModal() {
            this.deactivationDetails.emit(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Ko));
          }),
          (e.ɵcmp = Ct({
            type: e,
            selectors: [["app-planet-modal"]],
            inputs: {
              planetActivated: "planetActivated",
              requestedPlanet: "requestedPlanet",
            },
            outputs: { deactivationDetails: "deactivationDetails" },
            features: [Nn],
            decls: 1,
            vars: 1,
            consts: [
              [
                "class",
                "overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex",
                3,
                "click",
                4,
                "ngIf",
              ],
              [
                1,
                "overflow-x-hidden",
                "overflow-y-auto",
                "fixed",
                "inset-0",
                "z-50",
                "outline-none",
                "focus:outline-none",
                "justify-center",
                "items-center",
                "flex",
                3,
                "click",
              ],
              [1, "relative", "w-auto", "my-6", "mx-auto", "max-w-6xl"],
              [
                1,
                "border-0",
                "rounded-lg",
                "shadow-lg",
                "relative",
                "flex",
                "flex-col",
                "w-full",
                "planet-bg",
                "outline-none",
                "focus:outline-none",
              ],
              [
                1,
                "flex",
                "items-start",
                "justify-between",
                "p-5",
                "border-b",
                "border-solid",
                "border-zinc-500",
                "rounded-t",
              ],
              [1, "text-3xl", "mx-auto", "text-amber-100", "font-chakrapetch"],
              [
                "class",
                "flex flex-wrap md:scale-90 sm:-m-4 md:space-y-0 space-y-6 p-2",
                4,
                "ngIf",
              ],
              [
                1,
                "flex",
                "items-center",
                "justify-end",
                "p-2",
                "border-t",
                "border-solid",
                "border-zinc-500",
                "rounded-b",
              ],
              [
                "type",
                "button",
                1,
                "text-red-500",
                "hover:scale-105",
                "active:text-red-300",
                "font-bold",
                "uppercase",
                "text-sm",
                "px-3",
                "py-3",
                "hover:drop-shadow-lg",
                "outline-none",
                "focus:outline-none",
                "mr-1",
                "mb-1",
                "ease-linear",
                "transition-all",
                "duration-100",
                3,
                "click",
              ],
              [
                1,
                "flex",
                "flex-wrap",
                "md:scale-90",
                "sm:-m-4",
                "md:space-y-0",
                "space-y-6",
                "p-2",
              ],
              [
                1,
                "py-4",
                "md:w-2/5",
                "flex",
                "flex-col",
                "my-auto",
                "border-zinc-500",
                "md:border-r-2",
              ],
              [
                1,
                "max-h-48",
                "inline-flex",
                "rounded-full",
                "mb-5",
                "flex-shrink-0",
              ],
              [
                1,
                "animate-spin-slow",
                "mx-auto",
                "hover:scale-110",
                "ease-in-out",
                "hover:brightness-125",
                "duration-200",
                3,
                "src",
              ],
              [
                1,
                "text-amber-50",
                "mx-auto",
                "scale-105",
                "text-lg",
                "uppercase",
                "font-chakrapetch",
                "font-bold",
                "mb-3",
              ],
              [
                1,
                "leading-relaxed",
                "text-lg",
                "text-amber-100",
                "p-2",
                "font-chakrapetch",
              ],
              [
                1,
                "pl-4",
                "md:w-3/5",
                "flex",
                "flex-col",
                "text-left",
                "my-auto",
              ],
              [1, "text-xl"],
              [1, "my-2"],
              [
                1,
                "font-extrabold",
                "font-chakrapetch",
                "ease-in-out",
                "hover:text-yellow-50",
                "uppercase",
                "text-yellow-100",
              ],
              [1, "text-teal-100", "capitalize", "hover:text-teal-50"],
              [
                1,
                "font-extrabold",
                "font-chakrapetch",
                "ease-in-out",
                "hover:text-yellow-100",
                "uppercase",
                "text-yellow-200",
              ],
              [
                1,
                "font-extrabold",
                "font-chakrapetch",
                "ease-in-out",
                "hover:text-yellow-200",
                "uppercase",
                "text-yellow-300",
              ],
              [
                1,
                "font-extrabold",
                "font-chakrapetch",
                "ease-in-out",
                "hover:text-yellow-300",
                "uppercase",
                "text-yellow-400",
              ],
              [
                1,
                "font-extrabold",
                "font-chakrapetch",
                "ease-in-out",
                "hover:text-yellow-400",
                "uppercase",
                "text-yellow-500",
              ],
              [
                1,
                "font-extrabold",
                "font-chakrapetch",
                "ease-in-out",
                "hover:text-yellow-500",
                "uppercase",
                "text-yellow-600",
              ],
            ],
            template: function (n, r) {
              1 & n && Mt(0, IO, 10, 2, "div", 0),
                2 & n && Le("ngIf", r.planetActivated);
            },
            dependencies: [To],
          })),
          e
        );
      })();
      function xO(e, t) {
        if (
          (1 & e &&
            (S(0, "div", 16)(1, "div", 17)(2, "div", 18),
            Xe(3, "img", 19),
            x(),
            S(4, "div", 20)(5, "h1", 21),
            V(6),
            x(),
            S(7, "p", 22),
            V(8),
            x()()(),
            S(9, "div", 23),
            Xe(10, "app-planet-detail", 24),
            x()()),
          2 & e)
        ) {
          const n = t.$implicit;
          q(1),
            hi("id", n.name),
            q(2),
            pi("src", "assets/images/", n.name, ".png", Kr),
            q(3),
            et(" ", n.name, " "),
            q(2),
            da(
              " The planet known as ",
              n.name,
              ", is a ",
              n.terrain,
              " planet. It is typically ",
              n.climate,
              ". "
            ),
            q(2),
            Le("planetDetailsData", n);
        }
      }
      function MO(e, t) {
        if (
          (1 & e && (S(0, "div", 14), Mt(1, xO, 11, 7, "div", 15), x()), 2 & e)
        ) {
          const n = yt();
          q(1), Le("ngForOf", n.planetData);
        }
      }
      function TO(e, t) {
        1 & e &&
          (S(0, "div", 25)(1, "p", 26),
          V(
            2,
            " The Star Wars Planet Wiki features the 10 main planets from the fictional universe of the Star Wars franchise. While only the feature films and selected other works are considered canon to the franchise since the 2012 acquisition of Lucasfilm by The Walt Disney Company, some canon planets were first named or explored in works from the non-canon Star Wars expanded universe, now rebranded Star Wars Legends. "
          ),
          x()());
      }
      let AO = (() => {
          class e {
            constructor() {
              (this.planetData = []),
                (this.planetActivated = !1),
                (this.deactivationDetails = new Te()),
                (this.fullList = !1),
                (this.viewButton = "View All Planets"),
                (this.dropDownDisplayed = !0);
            }
            ngOnInit() {}
            showFullList() {
              (this.viewButton =
                "View All Planets" === this.viewButton
                  ? "Hide All Planets"
                  : "View All Planets"),
                (this.fullList = !this.fullList);
            }
            displayDropdown() {
              this.dropDownDisplayed = !this.dropDownDisplayed;
            }
            emitDeactivation() {
              this.deactivationDetails.emit(!1);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ct({
              type: e,
              selectors: [["app-planet-list"]],
              inputs: {
                planetData: "planetData",
                element: ["requestedPlanet", "element"],
                planetActivated: "planetActivated",
              },
              outputs: { deactivationDetails: "deactivationDetails" },
              decls: 18,
              vars: 5,
              consts: [
                [
                  3,
                  "planetActivated",
                  "requestedPlanet",
                  "deactivationDetails",
                ],
                [1, "hidden", "md:flex", "justify-center", "py-8"],
                [1, "w-4/5", "flex", "flex-wrap", "justify-between"],
                [
                  1,
                  "hidden",
                  "md:flex",
                  "flex-col",
                  "justify-center",
                  "text-zinc-700",
                  "shadow-lg",
                  "bg-gray-100",
                  "rounded-xl",
                  "mb-4",
                ],
                [
                  1,
                  "text-xs",
                  "sm:text-sm",
                  "xl:px-24",
                  "lg:px-20",
                  "md:px-14",
                  "font-semibold",
                  "font-chakrapetch",
                  "uppercase",
                  "md:text-md",
                  "lg:text-lg",
                  "xl:text-xl",
                  "mt-4",
                ],
                [
                  1,
                  "text-xs",
                  "sm:text-sm",
                  "xl:px-24",
                  "lg:px-20",
                  "md:px-14",
                  "font-medium",
                  "font-chakrapetch",
                  "md:text-md",
                  "lg:text-lg",
                  "xl:text-xl",
                  "mb-4",
                  "m-2",
                ],
                [1, "hidden", "md:flex", "justify-center", "w-full", "mt-8"],
                [
                  1,
                  "hover:cursor-pointer",
                  "text-teal-200",
                  "hover:text-yellow-200",
                  "hover:scale-105",
                  "ease-linear",
                  "duration-150",
                  3,
                  "click",
                ],
                [1, "px-4", "mx-auto", "rounded-lg", "metal-bg", "max-w-fit"],
                [1, "text-3xl", "py-2", "font-bungee"],
                [
                  "id",
                  "card",
                  "class",
                  "hidden md:flex flex-wrap justify-center my-6 md:my-0",
                  4,
                  "ngIf",
                ],
                [
                  1,
                  "my-10",
                  "flex",
                  "flex-col",
                  "bg-gradient-to-b",
                  "from-zinc-100",
                  "to-zinc-200",
                  "shadow-lg",
                  "bg-opacity-50",
                  "md:hidden",
                  "rounded-xl",
                  "hover:bg-yellow-100",
                ],
                [
                  1,
                  "text-xl",
                  "w-full",
                  "p-2",
                  "mx-auto",
                  "font-bungee",
                  "md:text-2xl",
                  "lg:text-4xl",
                  "my-2",
                  "text-teal-600",
                  "hover:text-yellow-500",
                  3,
                  "click",
                ],
                [
                  "class",
                  "p-2 bg-gradient-to-b from-zinc-100 to-zinc-300",
                  4,
                  "ngIf",
                ],
                [
                  "id",
                  "card",
                  1,
                  "hidden",
                  "md:flex",
                  "flex-wrap",
                  "justify-center",
                  "my-6",
                  "md:my-0",
                ],
                [
                  "class",
                  "lg:w-1/2 flex flex-wrap planet-bg md:scale-75 hover:backdrop-brightness-150 shadow-2xl rounded-xl m-2 px-2 sm:-m-4 md:space-y-0 space-y-6",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [
                  1,
                  "lg:w-1/2",
                  "flex",
                  "flex-wrap",
                  "planet-bg",
                  "md:scale-75",
                  "hover:backdrop-brightness-150",
                  "shadow-2xl",
                  "rounded-xl",
                  "m-2",
                  "px-2",
                  "sm:-m-4",
                  "md:space-y-0",
                  "space-y-6",
                ],
                [
                  1,
                  "p-4",
                  "md:w-1/3",
                  "flex",
                  "flex-col",
                  "text-center",
                  "my-auto",
                  "items-center",
                  "border-zinc-500",
                  "md:border-r-2",
                  3,
                  "id",
                ],
                [
                  1,
                  "max-h-48",
                  "inline-flex",
                  "items-center",
                  "justify-center",
                  "rounded-full",
                  "mb-5",
                  "flex-shrink-0",
                ],
                [
                  1,
                  "ease-in-out",
                  "hover:brightness-125",
                  "duration-200",
                  3,
                  "src",
                ],
                [1, "flex-grow"],
                [
                  1,
                  "text-amber-50",
                  "scale-105",
                  "text-lg",
                  "uppercase",
                  "font-chakrapetch",
                  "font-bold",
                  "mb-3",
                ],
                [
                  1,
                  "leading-relaxed",
                  "text-lg",
                  "text-amber-100",
                  "font-chakrapetch",
                ],
                [
                  1,
                  "p-4",
                  "md:w-2/3",
                  "flex",
                  "flex-col",
                  "text-left",
                  "my-auto",
                ],
                [3, "planetDetailsData"],
                [1, "p-2", "bg-gradient-to-b", "from-zinc-100", "to-zinc-300"],
                [1, "indent-5"],
              ],
              template: function (n, r) {
                1 & n &&
                  (S(0, "app-planet-modal", 0),
                  We("deactivationDetails", function () {
                    return r.emitDeactivation();
                  }),
                  x(),
                  S(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4),
                  V(5, " About "),
                  x(),
                  S(6, "p", 5),
                  V(
                    7,
                    " The Star Wars Planet Wiki features the 10 main planets from the fictional universe of the Star Wars franchise. While only the feature films and selected other works are considered canon to the franchise since the 2012 acquisition of Lucasfilm by The Walt Disney Company, some canon planets were first named or explored in works from the non-canon Star Wars expanded universe, now rebranded Star Wars Legends. "
                  ),
                  x()(),
                  S(8, "div", 6)(9, "a", 7),
                  We("click", function () {
                    return r.showFullList();
                  }),
                  S(10, "div", 8)(11, "h1", 9),
                  V(12),
                  x()()()(),
                  Mt(13, MO, 2, 1, "div", 10),
                  x()(),
                  S(14, "div", 11)(15, "button", 12),
                  We("click", function () {
                    return r.displayDropdown();
                  }),
                  V(16, " About "),
                  x(),
                  Mt(17, TO, 3, 0, "div", 13),
                  x()),
                  2 & n &&
                    (Le("planetActivated", r.planetActivated)(
                      "requestedPlanet",
                      r.element
                    ),
                    q(12),
                    et(" ", r.viewButton, " "),
                    q(1),
                    Le("ngIf", r.fullList),
                    q(4),
                    Le("ngIf", r.dropDownDisplayed));
              },
              dependencies: [Fd, To, _O, SO],
              encapsulation: 2,
            })),
            e
          );
        })(),
        RO = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ct({
              type: e,
              selectors: [["app-footer"]],
              decls: 8,
              vars: 0,
              consts: [
                [1, "sticky", "top-[100vh]"],
                [1, "bg-gradient"],
                [
                  1,
                  "container",
                  "mx-auto",
                  "py-4",
                  "px-5",
                  "flex",
                  "flex-wrap",
                  "flex-row",
                  "my-auto",
                ],
                ["src", "assets/images/starwarslogo2.png", 1, "max-h-20"],
                [
                  1,
                  "text-yellow-400",
                  "text-md",
                  "text-center",
                  "my-auto",
                  "pl-2",
                  "sm:text-left",
                ],
                [
                  "href",
                  "https://www.linkedin.com/in/jringsakabe/",
                  "rel",
                  "noopener noreferrer",
                  "target",
                  "_blank",
                  1,
                  "text-yellow-400",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (S(0, "footer", 0)(1, "div", 1)(2, "div", 2),
                  Xe(3, "img", 3),
                  S(4, "p", 4),
                  V(5, " | The Star Wars Planet Wiki | "),
                  S(6, "a", 5),
                  V(7, "@j-art-fox"),
                  x()()()()());
              },
              encapsulation: 2,
            })),
            e
          );
        })();
      function kO(e, t) {
        1 & e && Xe(0, "img", 8);
      }
      function PO(e, t) {
        1 & e && Xe(0, "img", 9);
      }
      let NO = (() => {
          class e {
            constructor(n) {
              (this.planetsService = n),
                (this.planets = []),
                (this.dropDownClass = "hidden"),
                (this.changeLogo = !1),
                (this.planetsDropDown = !1);
            }
            showAndHide() {
              this.planetsDropDown
                ? ((this.planetsDropDown = !1), (this.dropDownClass = "hidden"))
                : ((this.planetsDropDown = !0),
                  (this.dropDownClass =
                    "drop-down-bg font-chakrapetch absolute z-10 w-44 -translate-x-2 outline-rose-200 rounded-xl divide-y divide-rose-900 shadow ease-in-out duration:200"));
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Ko));
            }),
            (e.ɵcmp = Ct({
              type: e,
              selectors: [["app-header"]],
              inputs: { planets: "planets" },
              decls: 10,
              vars: 2,
              consts: [
                [1, "body-font", "bg-gradient", "shadow-lg"],
                [
                  1,
                  "container",
                  "mx-auto",
                  "flex",
                  "md:justify-center",
                  "lg:justify-between",
                  "flex-wrap",
                  "p-2",
                  "flex-col",
                  "md:flex-row",
                  "items-center",
                ],
                [
                  1,
                  "flex",
                  "title-font",
                  "md:scale-90",
                  "font-medium",
                  "justify-center",
                  "items-center",
                  "mb-4",
                  "md:mb-0",
                ],
                ["href", "/", 1, "cursor-pointer"],
                [
                  1,
                  "ml-2",
                  "mt-3",
                  "md:mt-0",
                  "text-2xl",
                  "md:text-4xl",
                  "text-yellow-400",
                  "font-bungee",
                  "drop-shadow-md",
                  "ease-in-out",
                  "duration-300",
                  "hover:scale-105",
                  "hover:text-yellow-100",
                ],
                [
                  1,
                  "hidden",
                  "lg:inline-flex",
                  "items-center",
                  "border-0",
                  "px-3",
                  "focus:outline-none",
                  "text-base",
                  "mt-0",
                  3,
                  "mouseenter",
                  "mouseleave",
                ],
                [
                  "class",
                  "max-h-28 transition-all ease-in-out duration-150",
                  "src",
                  "assets/images/starwarslogo2.png",
                  4,
                  "ngIf",
                ],
                [
                  "class",
                  "max-h-28 scale-105 transition-all ease-in-out duration-150",
                  "src",
                  "assets/images/starwarslogo2light.png",
                  4,
                  "ngIf",
                ],
                [
                  "src",
                  "assets/images/starwarslogo2.png",
                  1,
                  "max-h-28",
                  "transition-all",
                  "ease-in-out",
                  "duration-150",
                ],
                [
                  "src",
                  "assets/images/starwarslogo2light.png",
                  1,
                  "max-h-28",
                  "scale-105",
                  "transition-all",
                  "ease-in-out",
                  "duration-150",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (S(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3)(
                    4,
                    "h1",
                    4
                  ),
                  V(5, " The Star Wars Planet Wiki "),
                  x()()(),
                  S(6, "a", 3)(7, "div", 5),
                  We("mouseenter", function () {
                    return (r.changeLogo = !0);
                  })("mouseleave", function () {
                    return (r.changeLogo = !1);
                  }),
                  Mt(8, kO, 1, 0, "img", 6),
                  Mt(9, PO, 1, 0, "img", 7),
                  x()()()()),
                  2 & n &&
                    (q(8),
                    Le("ngIf", !r.changeLogo),
                    q(1),
                    Le("ngIf", r.changeLogo));
              },
              dependencies: [To],
              encapsulation: 2,
            })),
            e
          );
        })(),
        OO = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ct({
              type: e,
              selectors: [["app-spinner"]],
              decls: 5,
              vars: 0,
              consts: [
                [1, "sk-folding-cube"],
                [1, "sk-cube1", "sk-cube"],
                [1, "sk-cube2", "sk-cube"],
                [1, "sk-cube4", "sk-cube"],
                [1, "sk-cube3", "sk-cube"],
              ],
              template: function (n, r) {
                1 & n &&
                  (S(0, "div", 0),
                  Xe(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4),
                  x());
              },
              styles: [
                '.sk-folding-cube[_ngcontent-%COMP%]{margin:20px auto;width:40px;height:40px;position:relative;transform:rotate(45deg)}.sk-folding-cube[_ngcontent-%COMP%]   .sk-cube[_ngcontent-%COMP%]{float:left;width:50%;height:50%;position:relative;transform:scale(1.1)}.sk-folding-cube[_ngcontent-%COMP%]   .sk-cube[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff;animation:sk-foldCubeAngle 2.4s infinite linear both;transform-origin:100% 100%}.sk-folding-cube[_ngcontent-%COMP%]   .sk-cube2[_ngcontent-%COMP%]{transform:scale(1.1) rotate(90deg)}.sk-folding-cube[_ngcontent-%COMP%]   .sk-cube3[_ngcontent-%COMP%]{transform:scale(1.1) rotate(180deg)}.sk-folding-cube[_ngcontent-%COMP%]   .sk-cube4[_ngcontent-%COMP%]{transform:scale(1.1) rotate(270deg)}.sk-folding-cube[_ngcontent-%COMP%]   .sk-cube2[_ngcontent-%COMP%]:before{animation-delay:.3s}.sk-folding-cube[_ngcontent-%COMP%]   .sk-cube3[_ngcontent-%COMP%]:before{animation-delay:.6s}.sk-folding-cube[_ngcontent-%COMP%]   .sk-cube4[_ngcontent-%COMP%]:before{animation-delay:.9s}@keyframes sk-foldCubeAngle{0%,10%{transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{transform:perspective(140px) rotateX(0);opacity:1}90%,to{transform:perspective(140px) rotateY(180deg);opacity:0}}',
              ],
            })),
            e
          );
        })();
      function FO(e, t) {
        1 & e && Xe(0, "app-spinner");
      }
      function LO(e, t) {
        if (1 & e) {
          const n = la();
          S(0, "li", 12)(1, "div", 13)(2, "a", 14),
            We("click", function () {
              return fn(n), hn(yt().activatePanel());
            })("click", function (i) {
              return fn(n), hn(yt().showPlanetDetails(i));
            }),
            Xe(3, "img", 15),
            x(),
            S(4, "button", 16),
            We("click", function () {
              return fn(n), hn(yt().activatePanel());
            })("click", function (i) {
              return fn(n), hn(yt().showPlanetDetails(i));
            }),
            V(5),
            x()()();
        }
        if (2 & e) {
          const n = t.$implicit;
          q(3),
            pi("src", "assets/images/", n.name, ".png", Kr),
            hi("id", n.name),
            q(1),
            hi("name", n.name),
            q(1),
            et(" ", n.name, " ");
        }
      }
      function jO(e, t) {
        if (1 & e) {
          const n = la();
          S(0, "ul", 19)(1, "button", 20),
            We("click", function (i) {
              return fn(n), hn(yt(2).showPlanetDetails(i));
            })("click", function () {
              return fn(n), hn(yt(2).activatePanel());
            }),
            V(2),
            x()();
        }
        if (2 & e) {
          const n = t.$implicit;
          q(1), hi("id", n.name), q(1), et(" ", n.name, " ");
        }
      }
      function $O(e, t) {
        if (
          (1 & e && (S(0, "div", 17), Mt(1, jO, 3, 2, "ul", 18), x()), 2 & e)
        ) {
          const n = yt();
          q(1), Le("ngForOf", n.planets);
        }
      }
      let VO = (() => {
          class e {
            constructor(n) {
              (this.planetsService = n),
                (this.requestDetails = new Te()),
                (this.activationDetails = new Te()),
                (this.newPlanetRequest = {}),
                (this.planets = []),
                (this.showSpinner = !0),
                (this.dropDownDisplayed = !0);
            }
            ngOnInit() {
              this.planetsService.getPlanets().subscribe((n) => {
                this.showSpinner = !1;
                let r = [{ name: "Boyd" }, { name: "Aaron" }];
                return (
                  (r = n.results),
                  r.sort(function (i, o) {
                    return i.name.toLowerCase() < o.name.toLowerCase()
                      ? -1
                      : i.name.toLowerCase() > o.name.toLowerCase()
                      ? 1
                      : 0;
                  }),
                  (this.planets = r),
                  (this.showSpinner = !1)
                );
              });
            }
            activatePanel() {
              this.activationDetails.emit(!0), console.log("here");
            }
            showPlanetDetails(n) {
              let r = n.target,
                i = {};
              for (const o of this.planets)
                (o.name === r.id || o.name === r.name) && (i = o);
              (this.newPlanetRequest = i),
                this.requestDetails.emit({
                  name: this.newPlanetRequest.name,
                  rotation_period: this.newPlanetRequest.rotation_period,
                  orbital_period: this.newPlanetRequest.orbital_period,
                  diameter: this.newPlanetRequest.diameter,
                  climate: this.newPlanetRequest.climate,
                  gravity: this.newPlanetRequest.gravity,
                  terrain: this.newPlanetRequest.terrain,
                  surface_water: this.newPlanetRequest.surface_water,
                  population: this.newPlanetRequest.population,
                  residents: [this.newPlanetRequest.residents],
                  films: [this.newPlanetRequest.films],
                  created: this.newPlanetRequest.created,
                  edited: this.newPlanetRequest.edited,
                  url: this.newPlanetRequest.url,
                });
            }
            displayDropdown() {
              this.dropDownDisplayed = !this.dropDownDisplayed;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Ko));
            }),
            (e.ɵcmp = Ct({
              type: e,
              selectors: [["app-jumbotron"]],
              outputs: {
                requestDetails: "requestDetails",
                activationDetails: "activationDetails",
              },
              decls: 15,
              vars: 3,
              consts: [
                [
                  1,
                  "hidden",
                  "jumbotron-bg",
                  "md:flex",
                  "w-4/5",
                  "mx-auto",
                  "my-10",
                  "text-center",
                  "rounded-xl",
                  "shadow-2xl",
                ],
                [
                  1,
                  "top-0",
                  "right-0",
                  "bottom-0",
                  "left-0",
                  "w-full",
                  "h-full",
                ],
                [
                  "id",
                  "home",
                  1,
                  "flex",
                  "justify-center",
                  "flex-wrap",
                  "p-4",
                  "items-center",
                  "h-full",
                ],
                [1, "flex", "flex-col", "justify-center", "text-yellow-300"],
                [
                  1,
                  "text-xl",
                  "mx-auto",
                  "font-bungee",
                  "md:text-2xl",
                  "lg:text-4xl",
                  "mb-4",
                  "hover:shadow-amber-300",
                ],
                [
                  1,
                  "hidden",
                  "mx-auto",
                  "text-xs",
                  "md:flex",
                  "sm:text-sm",
                  "xl:px-24",
                  "lg:px-20",
                  "md:px-14",
                  "font-semibold",
                  "shadow-lg",
                  "font-chakrapetch",
                  "uppercase",
                  "md:text-md",
                  "lg:text-lg",
                  "xl:text-xl",
                  "mb-4",
                ],
                [4, "ngIf"],
                [
                  1,
                  "mx-auto",
                  "flex",
                  "flex-row",
                  "flex-wrap",
                  "justify-around",
                  "w-full",
                  "text-yellow-300",
                ],
                ["class", "hover:shadow-amber-100", 4, "ngFor", "ngForOf"],
                [
                  1,
                  "my-10",
                  "flex",
                  "flex-col",
                  "bg-gradient-to-b",
                  "from-zinc-100",
                  "to-zinc-200",
                  "shadow-lg",
                  "bg-opacity-50",
                  "md:hidden",
                  "rounded-xl",
                  "hover:bg-yellow-100",
                ],
                [
                  1,
                  "text-xl",
                  "w-full",
                  "p-2",
                  "mx-auto",
                  "font-bungee",
                  "md:text-2xl",
                  "lg:text-4xl",
                  "my-2",
                  "text-teal-600",
                  "hover:text-yellow-500",
                  3,
                  "click",
                ],
                [
                  "class",
                  "bg-gradient-to-b from-zinc-100 to-zinc-300",
                  4,
                  "ngIf",
                ],
                [1, "hover:shadow-amber-100"],
                [1, "flex", "flex-col", "justify-center", "mx-2", "mt-2"],
                [1, "cursor-pointer", 3, "click"],
                [
                  1,
                  "(default",
                  "size)",
                  "h-6",
                  "hidden",
                  "md:flex",
                  "md:h-20",
                  "lg:h-24",
                  "xl:h-28",
                  "xl:w-28",
                  "mx-auto",
                  "shadow-lg",
                  "ease-in-out",
                  "duration-200",
                  "hover:scale-110",
                  "hover:brightness-110",
                  3,
                  "src",
                  "id",
                ],
                [
                  1,
                  "md:text-md",
                  "xl:text-2xl",
                  "p-1",
                  "bg-slate-900",
                  "min-w-full",
                  "bg-opacity-60",
                  "md:rounded-md",
                  "xl:rounded-md",
                  "font-chakrapetch",
                  "font-medium",
                  "border-1",
                  "border-yellow-300",
                  "mt-2",
                  "hover:text-white",
                  "hover:bg-yellow-500",
                  3,
                  "name",
                  "click",
                ],
                [1, "bg-gradient-to-b", "from-zinc-100", "to-zinc-300"],
                [
                  "class",
                  "flex justify-center shadow-md",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [1, "flex", "justify-center", "shadow-md"],
                [
                  1,
                  "w-full",
                  "h-full",
                  "font-chakrapetch",
                  "tracking-wide",
                  "font-bold",
                  "p-1",
                  "hover:scale-105",
                  "hover:bg-teal-200",
                  "hover:bg-opacity-40",
                  3,
                  "id",
                  "click",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (S(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
                    4,
                    "h2",
                    4
                  ),
                  V(5, " Bright Suns and welcome "),
                  x(),
                  S(6, "p", 5),
                  V(7, " Select a planet "),
                  x(),
                  Mt(8, FO, 1, 0, "app-spinner", 6),
                  x(),
                  S(9, "ul", 7),
                  Mt(10, LO, 6, 4, "li", 8),
                  x()()()(),
                  S(11, "div", 9)(12, "button", 10),
                  We("click", function () {
                    return r.displayDropdown();
                  }),
                  V(13, " Select a Planet "),
                  x(),
                  Mt(14, $O, 2, 1, "div", 11),
                  x()),
                  2 & n &&
                    (q(8),
                    Le("ngIf", r.showSpinner),
                    q(2),
                    Le("ngForOf", r.planets),
                    q(4),
                    Le("ngIf", r.dropDownDisplayed));
              },
              dependencies: [Fd, To, OO],
              encapsulation: 2,
            })),
            e
          );
        })(),
        HO = (() => {
          class e {
            constructor(n) {
              (this.planetsService = n),
                (this.planetData = []),
                (this.requestedPlanetData = {}),
                (this.activationRequest = !1);
            }
            ngOnInit() {
              this.planetsService.getPlanets().subscribe((n) => {
                let r = [{ name: "Boyd" }, { name: "Aaron" }];
                return (
                  (r = n.results),
                  r.sort(function (i, o) {
                    return i.name.toLowerCase() < o.name.toLowerCase()
                      ? -1
                      : i.name.toLowerCase() > o.name.toLowerCase()
                      ? 1
                      : 0;
                  }),
                  (this.planetData = r)
                );
              });
            }
            onPlanetRequested(n) {
              this.requestedPlanetData = n;
            }
            onActivationRequest(n) {
              this.activationRequest = n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Ko));
            }),
            (e.ɵcmp = Ct({
              type: e,
              selectors: [["app-planets"]],
              decls: 4,
              vars: 4,
              consts: [
                [3, "planets"],
                [3, "requestDetails", "activationDetails"],
                [
                  3,
                  "requestedPlanet",
                  "planetData",
                  "planetActivated",
                  "deactivationDetails",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (Xe(0, "app-header", 0),
                  S(1, "app-jumbotron", 1),
                  We("requestDetails", function (o) {
                    return r.onPlanetRequested(o);
                  })("activationDetails", function () {
                    return r.onActivationRequest(!0);
                  }),
                  x(),
                  S(2, "app-planet-list", 2),
                  We("deactivationDetails", function () {
                    return r.onActivationRequest(!1);
                  }),
                  x(),
                  Xe(3, "app-footer")),
                  2 & n &&
                    (Le("planets", r.planetData),
                    q(2),
                    Le("requestedPlanet", r.requestedPlanetData)(
                      "planetData",
                      r.planetData
                    )("planetActivated", r.activationRequest));
              },
              dependencies: [AO, RO, NO, VO],
              encapsulation: 2,
            })),
            e
          );
        })(),
        BO = (() => {
          class e {
            constructor(n) {
              (this.planetsService = n), (this.title = "StarWars PlanetWiki");
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Ko));
            }),
            (e.ɵcmp = Ct({
              type: e,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && Xe(0, "app-planets");
              },
              dependencies: [HO],
              encapsulation: 2,
            })),
            e
          );
        })();
      function qb(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (i) {
              return Object.getOwnPropertyDescriptor(e, i).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function E(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? qb(Object(n), !0).forEach(function (r) {
                ke(e, r, n[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : qb(Object(n)).forEach(function (r) {
                Object.defineProperty(
                  e,
                  r,
                  Object.getOwnPropertyDescriptor(n, r)
                );
              });
        }
        return e;
      }
      function hl(e) {
        return (hl =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(e);
      }
      function Gb(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function ke(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function Ff(e, t) {
        return (
          (function GO(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function KO(e, t) {
            var n =
              null == e
                ? null
                : (typeof Symbol < "u" && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != n) {
              var s,
                a,
                r = [],
                i = !0,
                o = !1;
              try {
                for (
                  n = n.call(e);
                  !(i = (s = n.next()).done) &&
                  (r.push(s.value), !t || r.length !== t);
                  i = !0
                );
              } catch (l) {
                (o = !0), (a = l);
              } finally {
                try {
                  !i && null != n.return && n.return();
                } finally {
                  if (o) throw a;
                }
              }
              return r;
            }
          })(e, t) ||
          Yb(e, t) ||
          (function ZO() {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function Zo(e) {
        return (
          (function qO(e) {
            if (Array.isArray(e)) return Lf(e);
          })(e) ||
          (function YO(e) {
            if (
              (typeof Symbol < "u" && null != e[Symbol.iterator]) ||
              null != e["@@iterator"]
            )
              return Array.from(e);
          })(e) ||
          Yb(e) ||
          (function QO() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function Yb(e, t) {
        if (e) {
          if ("string" == typeof e) return Lf(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          if (
            ("Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n)
          )
            return Array.from(e);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Lf(e, t);
        }
      }
      function Lf(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      var Kb = function () {},
        jf = {},
        Qb = {},
        Zb = null,
        Jb = { mark: Kb, measure: Kb };
      try {
        typeof window < "u" && (jf = window),
          typeof document < "u" && (Qb = document),
          typeof MutationObserver < "u" && (Zb = MutationObserver),
          typeof performance < "u" && (Jb = performance);
      } catch {}
      var ml,
        yl,
        vl,
        Dl,
        wl,
        Xb = (jf.navigator || {}).userAgent,
        eC = void 0 === Xb ? "" : Xb,
        Jn = jf,
        ue = Qb,
        tC = Zb,
        gl = Jb,
        Tn =
          !!ue.documentElement &&
          !!ue.head &&
          "function" == typeof ue.addEventListener &&
          "function" == typeof ue.createElement,
        nC = ~eC.indexOf("MSIE") || ~eC.indexOf("Trident/"),
        An = "___FONT_AWESOME___",
        iC = "svg-inline--fa",
        Er = "data-fa-i2svg",
        Vf = "data-fa-pseudo-element",
        Hf = "data-prefix",
        Bf = "data-icon",
        oC = "fontawesome-i2svg",
        tF = ["HTML", "HEAD", "STYLE", "SCRIPT"],
        sC = (function () {
          try {
            return !0;
          } catch {
            return !1;
          }
        })(),
        ce = "classic",
        ge = "sharp",
        Uf = [ce, ge];
      function Jo(e) {
        return new Proxy(e, {
          get: function (n, r) {
            return r in n ? n[r] : n[ce];
          },
        });
      }
      var Xo = Jo(
          (ke((ml = {}), ce, {
            fa: "solid",
            fas: "solid",
            "fa-solid": "solid",
            far: "regular",
            "fa-regular": "regular",
            fal: "light",
            "fa-light": "light",
            fat: "thin",
            "fa-thin": "thin",
            fad: "duotone",
            "fa-duotone": "duotone",
            fab: "brands",
            "fa-brands": "brands",
            fak: "kit",
            "fa-kit": "kit",
          }),
          ke(ml, ge, { fa: "solid", fass: "solid", "fa-solid": "solid" }),
          ml)
        ),
        es = Jo(
          (ke((yl = {}), ce, {
            solid: "fas",
            regular: "far",
            light: "fal",
            thin: "fat",
            duotone: "fad",
            brands: "fab",
            kit: "fak",
          }),
          ke(yl, ge, { solid: "fass" }),
          yl)
        ),
        ts = Jo(
          (ke((vl = {}), ce, {
            fab: "fa-brands",
            fad: "fa-duotone",
            fak: "fa-kit",
            fal: "fa-light",
            far: "fa-regular",
            fas: "fa-solid",
            fat: "fa-thin",
          }),
          ke(vl, ge, { fass: "fa-solid" }),
          vl)
        ),
        nF = Jo(
          (ke((Dl = {}), ce, {
            "fa-brands": "fab",
            "fa-duotone": "fad",
            "fa-kit": "fak",
            "fa-light": "fal",
            "fa-regular": "far",
            "fa-solid": "fas",
            "fa-thin": "fat",
          }),
          ke(Dl, ge, { "fa-solid": "fass" }),
          Dl)
        ),
        rF = /fa(s|r|l|t|d|b|k|ss)?[\-\ ]/,
        aC = "fa-layers-text",
        iF =
          /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,
        oF = Jo(
          (ke((wl = {}), ce, {
            900: "fas",
            400: "far",
            normal: "far",
            300: "fal",
            100: "fat",
          }),
          ke(wl, ge, { 900: "fass" }),
          wl)
        ),
        lC = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        sF = lC.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
        aF = [
          "class",
          "data-prefix",
          "data-icon",
          "data-fa-transform",
          "data-fa-mask",
        ],
        ns = new Set();
      Object.keys(es[ce]).map(ns.add.bind(ns)),
        Object.keys(es[ge]).map(ns.add.bind(ns));
      var lF = []
          .concat(Uf, Zo(ns), [
            "2xs",
            "xs",
            "sm",
            "lg",
            "xl",
            "2xl",
            "beat",
            "border",
            "fade",
            "beat-fade",
            "bounce",
            "flip-both",
            "flip-horizontal",
            "flip-vertical",
            "flip",
            "fw",
            "inverse",
            "layers-counter",
            "layers-text",
            "layers",
            "li",
            "pull-left",
            "pull-right",
            "pulse",
            "rotate-180",
            "rotate-270",
            "rotate-90",
            "rotate-by",
            "shake",
            "spin-pulse",
            "spin-reverse",
            "spin",
            "stack-1x",
            "stack-2x",
            "stack",
            "ul",
            "duotone-group",
            "swap-opacity",
            "primary",
            "secondary",
          ])
          .concat(
            lC.map(function (e) {
              return "".concat(e, "x");
            })
          )
          .concat(
            sF.map(function (e) {
              return "w-".concat(e);
            })
          ),
        rs = Jn.FontAwesomeConfig || {};
      ue &&
        "function" == typeof ue.querySelector &&
        [
          ["data-family-prefix", "familyPrefix"],
          ["data-css-prefix", "cssPrefix"],
          ["data-family-default", "familyDefault"],
          ["data-style-default", "styleDefault"],
          ["data-replacement-class", "replacementClass"],
          ["data-auto-replace-svg", "autoReplaceSvg"],
          ["data-auto-add-css", "autoAddCss"],
          ["data-auto-a11y", "autoA11y"],
          ["data-search-pseudo-elements", "searchPseudoElements"],
          ["data-observe-mutations", "observeMutations"],
          ["data-mutate-approach", "mutateApproach"],
          ["data-keep-original-source", "keepOriginalSource"],
          ["data-measure-performance", "measurePerformance"],
          ["data-show-missing-icons", "showMissingIcons"],
        ].forEach(function (e) {
          var t = Ff(e, 2),
            r = t[1],
            i = (function cF(e) {
              return "" === e || ("false" !== e && ("true" === e || e));
            })(
              (function uF(e) {
                var t = ue.querySelector("script[" + e + "]");
                if (t) return t.getAttribute(e);
              })(t[0])
            );
          null != i && (rs[r] = i);
        });
      var uC = {
        styleDefault: "solid",
        familyDefault: "classic",
        cssPrefix: "fa",
        replacementClass: iC,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        mutateApproach: "async",
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0,
      };
      rs.familyPrefix && (rs.cssPrefix = rs.familyPrefix);
      var Ti = E(E({}, uC), rs);
      Ti.autoReplaceSvg || (Ti.observeMutations = !1);
      var A = {};
      Object.keys(uC).forEach(function (e) {
        Object.defineProperty(A, e, {
          enumerable: !0,
          set: function (n) {
            (Ti[e] = n),
              is.forEach(function (r) {
                return r(A);
              });
          },
          get: function () {
            return Ti[e];
          },
        });
      }),
        Object.defineProperty(A, "familyPrefix", {
          enumerable: !0,
          set: function (t) {
            (Ti.cssPrefix = t),
              is.forEach(function (n) {
                return n(A);
              });
          },
          get: function () {
            return Ti.cssPrefix;
          },
        }),
        (Jn.FontAwesomeConfig = A);
      var is = [],
        an = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
      function os() {
        for (var e = 12, t = ""; e-- > 0; )
          t += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
            (62 * Math.random()) | 0
          ];
        return t;
      }
      function Ai(e) {
        for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
        return t;
      }
      function zf(e) {
        return e.classList
          ? Ai(e.classList)
          : (e.getAttribute("class") || "").split(" ").filter(function (t) {
              return t;
            });
      }
      function cC(e) {
        return ""
          .concat(e)
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      function bl(e) {
        return Object.keys(e || {}).reduce(function (t, n) {
          return t + "".concat(n, ": ").concat(e[n].trim(), ";");
        }, "");
      }
      function Wf(e) {
        return (
          e.size !== an.size ||
          e.x !== an.x ||
          e.y !== an.y ||
          e.rotate !== an.rotate ||
          e.flipX ||
          e.flipY
        );
      }
      function dC() {
        var e = "fa",
          t = iC,
          n = A.cssPrefix,
          r = A.replacementClass,
          i =
            ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
        if (n !== e || r !== t) {
          var o = new RegExp("\\.".concat(e, "\\-"), "g"),
            s = new RegExp("\\--".concat(e, "\\-"), "g"),
            a = new RegExp("\\.".concat(t), "g");
          i = i
            .replace(o, ".".concat(n, "-"))
            .replace(s, "--".concat(n, "-"))
            .replace(a, ".".concat(r));
        }
        return i;
      }
      var fC = !1;
      function qf() {
        A.autoAddCss &&
          !fC &&
          ((function hF(e) {
            if (e && Tn) {
              var t = ue.createElement("style");
              t.setAttribute("type", "text/css"), (t.innerHTML = e);
              for (
                var n = ue.head.childNodes, r = null, i = n.length - 1;
                i > -1;
                i--
              ) {
                var o = n[i],
                  s = (o.tagName || "").toUpperCase();
                ["STYLE", "LINK"].indexOf(s) > -1 && (r = o);
              }
              ue.head.insertBefore(t, r);
            }
          })(dC()),
          (fC = !0));
      }
      var DF = {
          mixout: function () {
            return { dom: { css: dC, insertCss: qf } };
          },
          hooks: function () {
            return {
              beforeDOMElementCreation: function () {
                qf();
              },
              beforeI2svg: function () {
                qf();
              },
            };
          },
        },
        Rn = Jn || {};
      Rn[An] || (Rn[An] = {}),
        Rn[An].styles || (Rn[An].styles = {}),
        Rn[An].hooks || (Rn[An].hooks = {}),
        Rn[An].shims || (Rn[An].shims = []);
      var Gt = Rn[An],
        hC = [],
        Cl = !1;
      function bF(e) {
        !Tn || (Cl ? setTimeout(e, 0) : hC.push(e));
      }
      function ss(e) {
        var t = e.tag,
          n = e.attributes,
          r = void 0 === n ? {} : n,
          i = e.children,
          o = void 0 === i ? [] : i;
        return "string" == typeof e
          ? cC(e)
          : "<"
              .concat(t, " ")
              .concat(
                (function gF(e) {
                  return Object.keys(e || {})
                    .reduce(function (t, n) {
                      return t + "".concat(n, '="').concat(cC(e[n]), '" ');
                    }, "")
                    .trim();
                })(r),
                ">"
              )
              .concat(o.map(ss).join(""), "</")
              .concat(t, ">");
      }
      function pC(e, t, n) {
        if (e && e[t] && e[t][n])
          return { prefix: t, iconName: n, icon: e[t][n] };
      }
      Tn &&
        ((Cl = (
          ue.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/
        ).test(ue.readyState)) ||
          ue.addEventListener("DOMContentLoaded", function e() {
            ue.removeEventListener("DOMContentLoaded", e),
              (Cl = 1),
              hC.map(function (t) {
                return t();
              });
          }));
      var Gf = function (t, n, r, i) {
        var l,
          u,
          c,
          o = Object.keys(t),
          s = o.length,
          a =
            void 0 !== i
              ? (function (t, n) {
                  return function (r, i, o, s) {
                    return t.call(n, r, i, o, s);
                  };
                })(n, i)
              : n;
        for (
          void 0 === r ? ((l = 1), (c = t[o[0]])) : ((l = 0), (c = r));
          l < s;
          l++
        )
          c = a(c, t[(u = o[l])], u, t);
        return c;
      };
      function Yf(e) {
        var t = (function _F(e) {
          for (var t = [], n = 0, r = e.length; n < r; ) {
            var i = e.charCodeAt(n++);
            if (i >= 55296 && i <= 56319 && n < r) {
              var o = e.charCodeAt(n++);
              56320 == (64512 & o)
                ? t.push(((1023 & i) << 10) + (1023 & o) + 65536)
                : (t.push(i), n--);
            } else t.push(i);
          }
          return t;
        })(e);
        return 1 === t.length ? t[0].toString(16) : null;
      }
      function gC(e) {
        return Object.keys(e).reduce(function (t, n) {
          var r = e[n];
          return r.icon ? (t[r.iconName] = r.icon) : (t[n] = r), t;
        }, {});
      }
      function Kf(e, t) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          r = n.skipHooks,
          i = void 0 !== r && r,
          o = gC(t);
        "function" != typeof Gt.hooks.addPack || i
          ? (Gt.styles[e] = E(E({}, Gt.styles[e] || {}), o))
          : Gt.hooks.addPack(e, gC(t)),
          "fas" === e && Kf("fa", t);
      }
      var _l,
        El,
        Il,
        Ri = Gt.styles,
        IF = Gt.shims,
        SF =
          (ke((_l = {}), ce, Object.values(ts[ce])),
          ke(_l, ge, Object.values(ts[ge])),
          _l),
        Qf = null,
        mC = {},
        yC = {},
        vC = {},
        DC = {},
        wC = {},
        xF =
          (ke((El = {}), ce, Object.keys(Xo[ce])),
          ke(El, ge, Object.keys(Xo[ge])),
          El);
      function TF(e, t) {
        var n = t.split("-"),
          r = n[0],
          i = n.slice(1).join("-");
        return r !== e ||
          "" === i ||
          (function MF(e) {
            return ~lF.indexOf(e);
          })(i)
          ? null
          : i;
      }
      var bC = function () {
        var t = function (o) {
          return Gf(
            Ri,
            function (s, a, l) {
              return (s[l] = Gf(a, o, {})), s;
            },
            {}
          );
        };
        (mC = t(function (i, o, s) {
          return (
            o[3] && (i[o[3]] = s),
            o[2] &&
              o[2]
                .filter(function (l) {
                  return "number" == typeof l;
                })
                .forEach(function (l) {
                  i[l.toString(16)] = s;
                }),
            i
          );
        })),
          (yC = t(function (i, o, s) {
            return (
              (i[s] = s),
              o[2] &&
                o[2]
                  .filter(function (l) {
                    return "string" == typeof l;
                  })
                  .forEach(function (l) {
                    i[l] = s;
                  }),
              i
            );
          })),
          (wC = t(function (i, o, s) {
            var a = o[2];
            return (
              (i[s] = s),
              a.forEach(function (l) {
                i[l] = s;
              }),
              i
            );
          }));
        var n = "far" in Ri || A.autoFetchSvg,
          r = Gf(
            IF,
            function (i, o) {
              var s = o[0],
                a = o[1],
                l = o[2];
              return (
                "far" === a && !n && (a = "fas"),
                "string" == typeof s &&
                  (i.names[s] = { prefix: a, iconName: l }),
                "number" == typeof s &&
                  (i.unicodes[s.toString(16)] = { prefix: a, iconName: l }),
                i
              );
            },
            { names: {}, unicodes: {} }
          );
        (vC = r.names),
          (DC = r.unicodes),
          (Qf = Sl(A.styleDefault, { family: A.familyDefault }));
      };
      function Zf(e, t) {
        return (mC[e] || {})[t];
      }
      function Sr(e, t) {
        return (wC[e] || {})[t];
      }
      function CC(e) {
        return vC[e] || { prefix: null, iconName: null };
      }
      function er() {
        return Qf;
      }
      function Sl(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = t.family,
          r = void 0 === n ? ce : n,
          i = Xo[r][e],
          o = es[r][e] || es[r][i],
          s = e in Gt.styles ? e : null;
        return o || s || null;
      }
      (function fF(e) {
        is.push(e);
      })(function (e) {
        Qf = Sl(e.styleDefault, { family: A.familyDefault });
      }),
        bC();
      var _C =
        (ke((Il = {}), ce, Object.keys(ts[ce])),
        ke(Il, ge, Object.keys(ts[ge])),
        Il);
      function xl(e) {
        var t,
          n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r = n.skipLookups,
          i = void 0 !== r && r,
          o =
            (ke((t = {}), ce, "".concat(A.cssPrefix, "-").concat(ce)),
            ke(t, ge, "".concat(A.cssPrefix, "-").concat(ge)),
            t),
          s = null,
          a = ce;
        (e.includes(o[ce]) ||
          e.some(function (u) {
            return _C[ce].includes(u);
          })) &&
          (a = ce),
          (e.includes(o[ge]) ||
            e.some(function (u) {
              return _C[ge].includes(u);
            })) &&
            (a = ge);
        var l = e.reduce(
          function (u, c) {
            var d = TF(A.cssPrefix, c);
            if (
              (Ri[c]
                ? ((c = SF[a].includes(c) ? nF[a][c] : c),
                  (s = c),
                  (u.prefix = c))
                : xF[a].indexOf(c) > -1
                ? ((s = c), (u.prefix = Sl(c, { family: a })))
                : d
                ? (u.iconName = d)
                : c !== A.replacementClass &&
                  c !== o[ce] &&
                  c !== o[ge] &&
                  u.rest.push(c),
              !i && u.prefix && u.iconName)
            ) {
              var f = "fa" === s ? CC(u.iconName) : {},
                h = Sr(u.prefix, u.iconName);
              f.prefix && (s = null),
                (u.iconName = f.iconName || h || u.iconName),
                (u.prefix = f.prefix || u.prefix),
                "far" === u.prefix &&
                  !Ri.far &&
                  Ri.fas &&
                  !A.autoFetchSvg &&
                  (u.prefix = "fas");
            }
            return u;
          },
          { prefix: null, iconName: null, rest: [] }
        );
        return (
          (e.includes("fa-brands") || e.includes("fab")) && (l.prefix = "fab"),
          (e.includes("fa-duotone") || e.includes("fad")) && (l.prefix = "fad"),
          !l.prefix &&
            a === ge &&
            (Ri.fass || A.autoFetchSvg) &&
            ((l.prefix = "fass"),
            (l.iconName = Sr(l.prefix, l.iconName) || l.iconName)),
          ("fa" === l.prefix || "fa" === s) && (l.prefix = er() || "fas"),
          l
        );
      }
      var kF = (function () {
          function e() {
            (function UO(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.definitions = {});
          }
          return (
            (function zO(e, t, n) {
              t && Gb(e.prototype, t),
                n && Gb(e, n),
                Object.defineProperty(e, "prototype", { writable: !1 });
            })(e, [
              {
                key: "add",
                value: function () {
                  for (
                    var n = this, r = arguments.length, i = new Array(r), o = 0;
                    o < r;
                    o++
                  )
                    i[o] = arguments[o];
                  var s = i.reduce(this._pullDefinitions, {});
                  Object.keys(s).forEach(function (a) {
                    (n.definitions[a] = E(E({}, n.definitions[a] || {}), s[a])),
                      Kf(a, s[a]);
                    var l = ts[ce][a];
                    l && Kf(l, s[a]), bC();
                  });
                },
              },
              {
                key: "reset",
                value: function () {
                  this.definitions = {};
                },
              },
              {
                key: "_pullDefinitions",
                value: function (n, r) {
                  var i = r.prefix && r.iconName && r.icon ? { 0: r } : r;
                  return (
                    Object.keys(i).map(function (o) {
                      var s = i[o],
                        a = s.prefix,
                        l = s.iconName,
                        u = s.icon,
                        c = u[2];
                      n[a] || (n[a] = {}),
                        c.length > 0 &&
                          c.forEach(function (d) {
                            "string" == typeof d && (n[a][d] = u);
                          }),
                        (n[a][l] = u);
                    }),
                    n
                  );
                },
              },
            ]),
            e
          );
        })(),
        EC = [],
        ki = {},
        Pi = {},
        PF = Object.keys(Pi);
      function Xf(e, t) {
        for (
          var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2;
          i < n;
          i++
        )
          r[i - 2] = arguments[i];
        var o = ki[e] || [];
        return (
          o.forEach(function (s) {
            t = s.apply(null, [t].concat(r));
          }),
          t
        );
      }
      function xr(e) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
          r < t;
          r++
        )
          n[r - 1] = arguments[r];
        var i = ki[e] || [];
        i.forEach(function (o) {
          o.apply(null, n);
        });
      }
      function kn() {
        var e = arguments[0],
          t = Array.prototype.slice.call(arguments, 1);
        return Pi[e] ? Pi[e].apply(null, t) : void 0;
      }
      function eh(e) {
        "fa" === e.prefix && (e.prefix = "fas");
        var t = e.iconName,
          n = e.prefix || er();
        if (t)
          return (
            (t = Sr(n, t) || t), pC(IC.definitions, n, t) || pC(Gt.styles, n, t)
          );
      }
      var IC = new kF(),
        FF = {
          i2svg: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            return Tn
              ? (xr("beforeI2svg", t),
                kn("pseudoElements2svg", t),
                kn("i2svg", t))
              : Promise.reject("Operation requires a DOM of some kind.");
          },
          watch: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = t.autoReplaceSvgRoot;
            !1 === A.autoReplaceSvg && (A.autoReplaceSvg = !0),
              (A.observeMutations = !0),
              bF(function () {
                jF({ autoReplaceSvgRoot: n }), xr("watch", t);
              });
          },
        },
        vt = {
          noAuto: function () {
            (A.autoReplaceSvg = !1), (A.observeMutations = !1), xr("noAuto");
          },
          config: A,
          dom: FF,
          parse: {
            icon: function (t) {
              if (null === t) return null;
              if ("object" === hl(t) && t.prefix && t.iconName)
                return {
                  prefix: t.prefix,
                  iconName: Sr(t.prefix, t.iconName) || t.iconName,
                };
              if (Array.isArray(t) && 2 === t.length) {
                var n = 0 === t[1].indexOf("fa-") ? t[1].slice(3) : t[1],
                  r = Sl(t[0]);
                return { prefix: r, iconName: Sr(r, n) || n };
              }
              if (
                "string" == typeof t &&
                (t.indexOf("".concat(A.cssPrefix, "-")) > -1 || t.match(rF))
              ) {
                var i = xl(t.split(" "), { skipLookups: !0 });
                return {
                  prefix: i.prefix || er(),
                  iconName: Sr(i.prefix, i.iconName) || i.iconName,
                };
              }
              if ("string" == typeof t) {
                var o = er();
                return { prefix: o, iconName: Sr(o, t) || t };
              }
            },
          },
          library: IC,
          findIconDefinition: eh,
          toHtml: ss,
        },
        jF = function () {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = t.autoReplaceSvgRoot,
            r = void 0 === n ? ue : n;
          (Object.keys(Gt.styles).length > 0 || A.autoFetchSvg) &&
            Tn &&
            A.autoReplaceSvg &&
            vt.dom.i2svg({ node: r });
        };
      function Ml(e, t) {
        return (
          Object.defineProperty(e, "abstract", { get: t }),
          Object.defineProperty(e, "html", {
            get: function () {
              return e.abstract.map(function (r) {
                return ss(r);
              });
            },
          }),
          Object.defineProperty(e, "node", {
            get: function () {
              if (Tn) {
                var r = ue.createElement("div");
                return (r.innerHTML = e.html), r.children;
              }
            },
          }),
          e
        );
      }
      function th(e) {
        var t = e.icons,
          n = t.main,
          r = t.mask,
          i = e.prefix,
          o = e.iconName,
          s = e.transform,
          a = e.symbol,
          l = e.title,
          u = e.maskId,
          c = e.titleId,
          d = e.extra,
          f = e.watchable,
          h = void 0 !== f && f,
          p = r.found ? r : n,
          g = p.width,
          y = p.height,
          v = "fak" === i,
          w = [
            A.replacementClass,
            o ? "".concat(A.cssPrefix, "-").concat(o) : "",
          ]
            .filter(function (kt) {
              return -1 === d.classes.indexOf(kt);
            })
            .filter(function (kt) {
              return "" !== kt || !!kt;
            })
            .concat(d.classes)
            .join(" "),
          m = {
            children: [],
            attributes: E(
              E({}, d.attributes),
              {},
              {
                "data-prefix": i,
                "data-icon": o,
                class: w,
                role: d.attributes.role || "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 ".concat(g, " ").concat(y),
              }
            ),
          },
          _ =
            v && !~d.classes.indexOf("fa-fw")
              ? { width: "".concat((g / y) * 16 * 0.0625, "em") }
              : {};
        h && (m.attributes[Er] = ""),
          l &&
            (m.children.push({
              tag: "title",
              attributes: {
                id:
                  m.attributes["aria-labelledby"] || "title-".concat(c || os()),
              },
              children: [l],
            }),
            delete m.attributes.title);
        var k = E(
            E({}, m),
            {},
            {
              prefix: i,
              iconName: o,
              main: n,
              mask: r,
              maskId: u,
              transform: s,
              symbol: a,
              styles: E(E({}, _), d.styles),
            }
          ),
          J =
            r.found && n.found
              ? kn("generateAbstractMask", k) || {
                  children: [],
                  attributes: {},
                }
              : kn("generateAbstractIcon", k) || {
                  children: [],
                  attributes: {},
                },
          Mr = J.attributes;
        return (
          (k.children = J.children),
          (k.attributes = Mr),
          a
            ? (function VF(e) {
                var n = e.iconName,
                  r = e.children,
                  i = e.attributes,
                  o = e.symbol,
                  s =
                    !0 === o
                      ? ""
                          .concat(e.prefix, "-")
                          .concat(A.cssPrefix, "-")
                          .concat(n)
                      : o;
                return [
                  {
                    tag: "svg",
                    attributes: { style: "display: none;" },
                    children: [
                      {
                        tag: "symbol",
                        attributes: E(E({}, i), {}, { id: s }),
                        children: r,
                      },
                    ],
                  },
                ];
              })(k)
            : (function $F(e) {
                var t = e.children,
                  n = e.main,
                  r = e.mask,
                  i = e.attributes,
                  o = e.styles,
                  s = e.transform;
                if (Wf(s) && n.found && !r.found) {
                  var u = { x: n.width / n.height / 2, y: 0.5 };
                  i.style = bl(
                    E(
                      E({}, o),
                      {},
                      {
                        "transform-origin": ""
                          .concat(u.x + s.x / 16, "em ")
                          .concat(u.y + s.y / 16, "em"),
                      }
                    )
                  );
                }
                return [{ tag: "svg", attributes: i, children: t }];
              })(k)
        );
      }
      function SC(e) {
        var t = e.content,
          n = e.width,
          r = e.height,
          i = e.transform,
          o = e.title,
          s = e.extra,
          a = e.watchable,
          l = void 0 !== a && a,
          u = E(
            E(E({}, s.attributes), o ? { title: o } : {}),
            {},
            { class: s.classes.join(" ") }
          );
        l && (u[Er] = "");
        var c = E({}, s.styles);
        Wf(i) &&
          ((c.transform = (function yF(e) {
            var t = e.transform,
              n = e.width,
              i = e.height,
              o = void 0 === i ? 16 : i,
              s = e.startCentered,
              a = void 0 !== s && s,
              l = "";
            return (
              (l +=
                a && nC
                  ? "translate("
                      .concat(t.x / 16 - (void 0 === n ? 16 : n) / 2, "em, ")
                      .concat(t.y / 16 - o / 2, "em) ")
                  : a
                  ? "translate(calc(-50% + "
                      .concat(t.x / 16, "em), calc(-50% + ")
                      .concat(t.y / 16, "em)) ")
                  : "translate("
                      .concat(t.x / 16, "em, ")
                      .concat(t.y / 16, "em) ")),
              (l += "scale("
                .concat((t.size / 16) * (t.flipX ? -1 : 1), ", ")
                .concat((t.size / 16) * (t.flipY ? -1 : 1), ") ")) +
                "rotate(".concat(t.rotate, "deg) ")
            );
          })({ transform: i, startCentered: !0, width: n, height: r })),
          (c["-webkit-transform"] = c.transform));
        var d = bl(c);
        d.length > 0 && (u.style = d);
        var f = [];
        return (
          f.push({ tag: "span", attributes: u, children: [t] }),
          o &&
            f.push({
              tag: "span",
              attributes: { class: "sr-only" },
              children: [o],
            }),
          f
        );
      }
      function HF(e) {
        var t = e.content,
          n = e.title,
          r = e.extra,
          i = E(
            E(E({}, r.attributes), n ? { title: n } : {}),
            {},
            { class: r.classes.join(" ") }
          ),
          o = bl(r.styles);
        o.length > 0 && (i.style = o);
        var s = [];
        return (
          s.push({ tag: "span", attributes: i, children: [t] }),
          n &&
            s.push({
              tag: "span",
              attributes: { class: "sr-only" },
              children: [n],
            }),
          s
        );
      }
      var nh = Gt.styles;
      function rh(e) {
        var t = e[0],
          n = e[1],
          o = Ff(e.slice(4), 1)[0];
        return {
          found: !0,
          width: t,
          height: n,
          icon: Array.isArray(o)
            ? {
                tag: "g",
                attributes: {
                  class: "".concat(A.cssPrefix, "-").concat("duotone-group"),
                },
                children: [
                  {
                    tag: "path",
                    attributes: {
                      class: "".concat(A.cssPrefix, "-").concat("secondary"),
                      fill: "currentColor",
                      d: o[0],
                    },
                  },
                  {
                    tag: "path",
                    attributes: {
                      class: "".concat(A.cssPrefix, "-").concat("primary"),
                      fill: "currentColor",
                      d: o[1],
                    },
                  },
                ],
              }
            : { tag: "path", attributes: { fill: "currentColor", d: o } },
        };
      }
      var BF = { found: !1, width: 512, height: 512 };
      function ih(e, t) {
        var n = t;
        return (
          "fa" === t && null !== A.styleDefault && (t = er()),
          new Promise(function (r, i) {
            if ((kn("missingIconAbstract"), "fa" === n)) {
              var s = CC(e) || {};
              (e = s.iconName || e), (t = s.prefix || t);
            }
            if (e && t && nh[t] && nh[t][e]) return r(rh(nh[t][e]));
            (function UF(e, t) {
              !sC &&
                !A.showMissingIcons &&
                e &&
                console.error(
                  'Icon with name "'
                    .concat(e, '" and prefix "')
                    .concat(t, '" is missing.')
                );
            })(e, t),
              r(
                E(
                  E({}, BF),
                  {},
                  {
                    icon:
                      (A.showMissingIcons && e && kn("missingIconAbstract")) ||
                      {},
                  }
                )
              );
          })
        );
      }
      var xC = function () {},
        oh =
          A.measurePerformance && gl && gl.mark && gl.measure
            ? gl
            : { mark: xC, measure: xC },
        as = 'FA "6.2.1"',
        sh_begin = function (t) {
          return (
            oh.mark("".concat(as, " ").concat(t, " begins")),
            function () {
              return (function (t) {
                oh.mark("".concat(as, " ").concat(t, " ends")),
                  oh.measure(
                    "".concat(as, " ").concat(t),
                    "".concat(as, " ").concat(t, " begins"),
                    "".concat(as, " ").concat(t, " ends")
                  );
              })(t);
            }
          );
        },
        Tl = function () {};
      function TC(e) {
        return "string" == typeof (e.getAttribute ? e.getAttribute(Er) : null);
      }
      function YF(e) {
        return ue.createElementNS("http://www.w3.org/2000/svg", e);
      }
      function KF(e) {
        return ue.createElement(e);
      }
      function AC(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = t.ceFn,
          r = void 0 === n ? ("svg" === e.tag ? YF : KF) : n;
        if ("string" == typeof e) return ue.createTextNode(e);
        var i = r(e.tag);
        Object.keys(e.attributes || []).forEach(function (s) {
          i.setAttribute(s, e.attributes[s]);
        });
        var o = e.children || [];
        return (
          o.forEach(function (s) {
            i.appendChild(AC(s, { ceFn: r }));
          }),
          i
        );
      }
      var Al = {
        replace: function (t) {
          var n = t[0];
          if (n.parentNode)
            if (
              (t[1].forEach(function (i) {
                n.parentNode.insertBefore(AC(i), n);
              }),
              null === n.getAttribute(Er) && A.keepOriginalSource)
            ) {
              var r = ue.createComment(
                (function QF(e) {
                  var t = " ".concat(e.outerHTML, " ");
                  return "".concat(t, "Font Awesome fontawesome.com ");
                })(n)
              );
              n.parentNode.replaceChild(r, n);
            } else n.remove();
        },
        nest: function (t) {
          var n = t[0],
            r = t[1];
          if (~zf(n).indexOf(A.replacementClass)) return Al.replace(t);
          var i = new RegExp("".concat(A.cssPrefix, "-.*"));
          if ((delete r[0].attributes.id, r[0].attributes.class)) {
            var o = r[0].attributes.class.split(" ").reduce(
              function (a, l) {
                return (
                  l === A.replacementClass || l.match(i)
                    ? a.toSvg.push(l)
                    : a.toNode.push(l),
                  a
                );
              },
              { toNode: [], toSvg: [] }
            );
            (r[0].attributes.class = o.toSvg.join(" ")),
              0 === o.toNode.length
                ? n.removeAttribute("class")
                : n.setAttribute("class", o.toNode.join(" "));
          }
          var s = r
            .map(function (a) {
              return ss(a);
            })
            .join("\n");
          n.setAttribute(Er, ""), (n.innerHTML = s);
        },
      };
      function RC(e) {
        e();
      }
      function kC(e, t) {
        var n = "function" == typeof t ? t : Tl;
        if (0 === e.length) n();
        else {
          var r = RC;
          "async" === A.mutateApproach && (r = Jn.requestAnimationFrame || RC),
            r(function () {
              var i = (function GF() {
                  return !0 === A.autoReplaceSvg
                    ? Al.replace
                    : Al[A.autoReplaceSvg] || Al.replace;
                })(),
                o = sh_begin("mutate");
              e.map(i), o(), n();
            });
        }
      }
      var ah = !1;
      function PC() {
        ah = !0;
      }
      function lh() {
        ah = !1;
      }
      var Rl = null;
      function NC(e) {
        if (tC && A.observeMutations) {
          var t = e.treeCallback,
            n = void 0 === t ? Tl : t,
            r = e.nodeCallback,
            i = void 0 === r ? Tl : r,
            o = e.pseudoElementsCallback,
            s = void 0 === o ? Tl : o,
            a = e.observeMutationsRoot,
            l = void 0 === a ? ue : a;
          (Rl = new tC(function (u) {
            if (!ah) {
              var c = er();
              Ai(u).forEach(function (d) {
                if (
                  ("childList" === d.type &&
                    d.addedNodes.length > 0 &&
                    !TC(d.addedNodes[0]) &&
                    (A.searchPseudoElements && s(d.target), n(d.target)),
                  "attributes" === d.type &&
                    d.target.parentNode &&
                    A.searchPseudoElements &&
                    s(d.target.parentNode),
                  "attributes" === d.type &&
                    TC(d.target) &&
                    ~aF.indexOf(d.attributeName))
                )
                  if (
                    "class" === d.attributeName &&
                    (function WF(e) {
                      var t = e.getAttribute ? e.getAttribute(Hf) : null,
                        n = e.getAttribute ? e.getAttribute(Bf) : null;
                      return t && n;
                    })(d.target)
                  ) {
                    var f = xl(zf(d.target)),
                      p = f.iconName;
                    d.target.setAttribute(Hf, f.prefix || c),
                      p && d.target.setAttribute(Bf, p);
                  } else
                    (function qF(e) {
                      return (
                        e &&
                        e.classList &&
                        e.classList.contains &&
                        e.classList.contains(A.replacementClass)
                      );
                    })(d.target) && i(d.target);
              });
            }
          })),
            Tn &&
              Rl.observe(l, {
                childList: !0,
                attributes: !0,
                characterData: !0,
                subtree: !0,
              });
        }
      }
      function JF(e) {
        var t = e.getAttribute("style"),
          n = [];
        return (
          t &&
            (n = t.split(";").reduce(function (r, i) {
              var o = i.split(":"),
                s = o[0],
                a = o.slice(1);
              return s && a.length > 0 && (r[s] = a.join(":").trim()), r;
            }, {})),
          n
        );
      }
      function XF(e) {
        var t = e.getAttribute("data-prefix"),
          n = e.getAttribute("data-icon"),
          r = void 0 !== e.innerText ? e.innerText.trim() : "",
          i = xl(zf(e));
        return (
          i.prefix || (i.prefix = er()),
          t && n && ((i.prefix = t), (i.iconName = n)),
          (i.iconName && i.prefix) ||
            (i.prefix &&
              r.length > 0 &&
              (i.iconName =
                (function AF(e, t) {
                  return (yC[e] || {})[t];
                })(i.prefix, e.innerText) || Zf(i.prefix, Yf(e.innerText))),
            !i.iconName &&
              A.autoFetchSvg &&
              e.firstChild &&
              e.firstChild.nodeType === Node.TEXT_NODE &&
              (i.iconName = e.firstChild.data)),
          i
        );
      }
      function eL(e) {
        var t = Ai(e.attributes).reduce(function (i, o) {
            return (
              "class" !== i.name && "style" !== i.name && (i[o.name] = o.value),
              i
            );
          }, {}),
          n = e.getAttribute("title"),
          r = e.getAttribute("data-fa-title-id");
        return (
          A.autoA11y &&
            (n
              ? (t["aria-labelledby"] = ""
                  .concat(A.replacementClass, "-title-")
                  .concat(r || os()))
              : ((t["aria-hidden"] = "true"), (t.focusable = "false"))),
          t
        );
      }
      function OC(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { styleParser: !0 },
          n = XF(e),
          r = n.iconName,
          i = n.prefix,
          o = n.rest,
          s = eL(e),
          a = Xf("parseNodeAttributes", {}, e),
          l = t.styleParser ? JF(e) : [];
        return E(
          {
            iconName: r,
            title: e.getAttribute("title"),
            titleId: e.getAttribute("data-fa-title-id"),
            prefix: i,
            transform: an,
            mask: { iconName: null, prefix: null, rest: [] },
            maskId: null,
            symbol: !1,
            extra: { classes: o, styles: l, attributes: s },
          },
          a
        );
      }
      var nL = Gt.styles;
      function FC(e) {
        var t =
          "nest" === A.autoReplaceSvg ? OC(e, { styleParser: !1 }) : OC(e);
        return ~t.extra.classes.indexOf(aC)
          ? kn("generateLayersText", e, t)
          : kn("generateSvgReplacementMutation", e, t);
      }
      var tr = new Set();
      function LC(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (!Tn) return Promise.resolve();
        var n = ue.documentElement.classList,
          r = function (d) {
            return n.add("".concat(oC, "-").concat(d));
          },
          i = function (d) {
            return n.remove("".concat(oC, "-").concat(d));
          },
          o = A.autoFetchSvg
            ? tr
            : Uf.map(function (c) {
                return "fa-".concat(c);
              }).concat(Object.keys(nL));
        o.includes("fa") || o.push("fa");
        var s = [".".concat(aC, ":not([").concat(Er, "])")]
          .concat(
            o.map(function (c) {
              return ".".concat(c, ":not([").concat(Er, "])");
            })
          )
          .join(", ");
        if (0 === s.length) return Promise.resolve();
        var a = [];
        try {
          a = Ai(e.querySelectorAll(s));
        } catch {}
        if (!(a.length > 0)) return Promise.resolve();
        r("pending"), i("complete");
        var l = sh_begin("onTree"),
          u = a.reduce(function (c, d) {
            try {
              var f = FC(d);
              f && c.push(f);
            } catch (h) {
              sC || ("MissingIcon" === h.name && console.error(h));
            }
            return c;
          }, []);
        return new Promise(function (c, d) {
          Promise.all(u)
            .then(function (f) {
              kC(f, function () {
                r("active"),
                  r("complete"),
                  i("pending"),
                  "function" == typeof t && t(),
                  l(),
                  c();
              });
            })
            .catch(function (f) {
              l(), d(f);
            });
        });
      }
      function rL(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        FC(e).then(function (n) {
          n && kC([n], t);
        });
      }
      Uf.map(function (e) {
        tr.add("fa-".concat(e));
      }),
        Object.keys(Xo[ce]).map(tr.add.bind(tr)),
        Object.keys(Xo[ge]).map(tr.add.bind(tr)),
        (tr = Zo(tr));
      var oL = function (t) {
          var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            r = n.transform,
            i = void 0 === r ? an : r,
            o = n.symbol,
            s = void 0 !== o && o,
            a = n.mask,
            l = void 0 === a ? null : a,
            u = n.maskId,
            c = void 0 === u ? null : u,
            d = n.title,
            f = void 0 === d ? null : d,
            h = n.titleId,
            p = void 0 === h ? null : h,
            g = n.classes,
            y = void 0 === g ? [] : g,
            v = n.attributes,
            w = void 0 === v ? {} : v,
            m = n.styles,
            _ = void 0 === m ? {} : m;
          if (t) {
            var k = t.prefix,
              J = t.iconName,
              it = t.icon;
            return Ml(E({ type: "icon" }, t), function () {
              return (
                xr("beforeDOMElementCreation", {
                  iconDefinition: t,
                  params: n,
                }),
                A.autoA11y &&
                  (f
                    ? (w["aria-labelledby"] = ""
                        .concat(A.replacementClass, "-title-")
                        .concat(p || os()))
                    : ((w["aria-hidden"] = "true"), (w.focusable = "false"))),
                th({
                  icons: {
                    main: rh(it),
                    mask: l
                      ? rh(l.icon)
                      : { found: !1, width: null, height: null, icon: {} },
                  },
                  prefix: k,
                  iconName: J,
                  transform: E(E({}, an), i),
                  symbol: s,
                  title: f,
                  maskId: c,
                  titleId: p,
                  extra: { attributes: w, styles: _, classes: y },
                })
              );
            });
          }
        },
        sL = {
          mixout: function () {
            return {
              icon:
                ((e = oL),
                function (t) {
                  var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = (t || {}).icon ? t : eh(t || {}),
                    i = n.mask;
                  return (
                    i && (i = (i || {}).icon ? i : eh(i || {})),
                    e(r, E(E({}, n), {}, { mask: i }))
                  );
                }),
            };
            var e;
          },
          hooks: function () {
            return {
              mutationObserverCallbacks: function (n) {
                return (n.treeCallback = LC), (n.nodeCallback = rL), n;
              },
            };
          },
          provides: function (t) {
            (t.i2svg = function (n) {
              var r = n.node,
                o = n.callback;
              return LC(
                void 0 === r ? ue : r,
                void 0 === o ? function () {} : o
              );
            }),
              (t.generateSvgReplacementMutation = function (n, r) {
                var i = r.iconName,
                  o = r.title,
                  s = r.titleId,
                  a = r.prefix,
                  l = r.transform,
                  u = r.symbol,
                  c = r.mask,
                  d = r.maskId,
                  f = r.extra;
                return new Promise(function (h, p) {
                  Promise.all([
                    ih(i, a),
                    c.iconName
                      ? ih(c.iconName, c.prefix)
                      : Promise.resolve({
                          found: !1,
                          width: 512,
                          height: 512,
                          icon: {},
                        }),
                  ])
                    .then(function (g) {
                      var y = Ff(g, 2);
                      h([
                        n,
                        th({
                          icons: { main: y[0], mask: y[1] },
                          prefix: a,
                          iconName: i,
                          transform: l,
                          symbol: u,
                          maskId: d,
                          title: o,
                          titleId: s,
                          extra: f,
                          watchable: !0,
                        }),
                      ]);
                    })
                    .catch(p);
                });
              }),
              (t.generateAbstractIcon = function (n) {
                var u,
                  r = n.children,
                  i = n.attributes,
                  o = n.main,
                  s = n.transform,
                  l = bl(n.styles);
                return (
                  l.length > 0 && (i.style = l),
                  Wf(s) &&
                    (u = kn("generateAbstractTransformGrouping", {
                      main: o,
                      transform: s,
                      containerWidth: o.width,
                      iconWidth: o.width,
                    })),
                  r.push(u || o.icon),
                  { children: r, attributes: i }
                );
              });
          },
        },
        aL = {
          mixout: function () {
            return {
              layer: function (n) {
                var r =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  i = r.classes,
                  o = void 0 === i ? [] : i;
                return Ml({ type: "layer" }, function () {
                  xr("beforeDOMElementCreation", { assembler: n, params: r });
                  var s = [];
                  return (
                    n(function (a) {
                      Array.isArray(a)
                        ? a.map(function (l) {
                            s = s.concat(l.abstract);
                          })
                        : (s = s.concat(a.abstract));
                    }),
                    [
                      {
                        tag: "span",
                        attributes: {
                          class: ["".concat(A.cssPrefix, "-layers")]
                            .concat(Zo(o))
                            .join(" "),
                        },
                        children: s,
                      },
                    ]
                  );
                });
              },
            };
          },
        },
        lL = {
          mixout: function () {
            return {
              counter: function (n) {
                var r =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  i = r.title,
                  o = void 0 === i ? null : i,
                  s = r.classes,
                  a = void 0 === s ? [] : s,
                  l = r.attributes,
                  u = void 0 === l ? {} : l,
                  c = r.styles,
                  d = void 0 === c ? {} : c;
                return Ml({ type: "counter", content: n }, function () {
                  return (
                    xr("beforeDOMElementCreation", { content: n, params: r }),
                    HF({
                      content: n.toString(),
                      title: o,
                      extra: {
                        attributes: u,
                        styles: d,
                        classes: [
                          "".concat(A.cssPrefix, "-layers-counter"),
                        ].concat(Zo(a)),
                      },
                    })
                  );
                });
              },
            };
          },
        },
        uL = {
          mixout: function () {
            return {
              text: function (n) {
                var r =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  i = r.transform,
                  o = void 0 === i ? an : i,
                  s = r.title,
                  a = void 0 === s ? null : s,
                  l = r.classes,
                  u = void 0 === l ? [] : l,
                  c = r.attributes,
                  d = void 0 === c ? {} : c,
                  f = r.styles,
                  h = void 0 === f ? {} : f;
                return Ml({ type: "text", content: n }, function () {
                  return (
                    xr("beforeDOMElementCreation", { content: n, params: r }),
                    SC({
                      content: n,
                      transform: E(E({}, an), o),
                      title: a,
                      extra: {
                        attributes: d,
                        styles: h,
                        classes: [
                          "".concat(A.cssPrefix, "-layers-text"),
                        ].concat(Zo(u)),
                      },
                    })
                  );
                });
              },
            };
          },
          provides: function (t) {
            t.generateLayersText = function (n, r) {
              var i = r.title,
                o = r.transform,
                s = r.extra,
                a = null,
                l = null;
              if (nC) {
                var u = parseInt(getComputedStyle(n).fontSize, 10),
                  c = n.getBoundingClientRect();
                (a = c.width / u), (l = c.height / u);
              }
              return (
                A.autoA11y && !i && (s.attributes["aria-hidden"] = "true"),
                Promise.resolve([
                  n,
                  SC({
                    content: n.innerHTML,
                    width: a,
                    height: l,
                    transform: o,
                    title: i,
                    extra: s,
                    watchable: !0,
                  }),
                ])
              );
            };
          },
        },
        cL = new RegExp('"', "ug"),
        jC = [1105920, 1112319];
      function $C(e, t) {
        var n = ""
          .concat("data-fa-pseudo-element-pending")
          .concat(t.replace(":", "-"));
        return new Promise(function (r, i) {
          if (null !== e.getAttribute(n)) return r();
          var s = Ai(e.children).filter(function (it) {
              return it.getAttribute(Vf) === t;
            })[0],
            a = Jn.getComputedStyle(e, t),
            l = a.getPropertyValue("font-family").match(iF),
            u = a.getPropertyValue("font-weight"),
            c = a.getPropertyValue("content");
          if (s && !l) return e.removeChild(s), r();
          if (l && "none" !== c && "" !== c) {
            var d = a.getPropertyValue("content"),
              f = ~["Sharp"].indexOf(l[2]) ? ge : ce,
              h = ~[
                "Solid",
                "Regular",
                "Light",
                "Thin",
                "Duotone",
                "Brands",
                "Kit",
              ].indexOf(l[2])
                ? es[f][l[2].toLowerCase()]
                : oF[f][u],
              p = (function dL(e) {
                var t = e.replace(cL, ""),
                  n = (function EF(e, t) {
                    var i,
                      n = e.length,
                      r = e.charCodeAt(t);
                    return r >= 55296 &&
                      r <= 56319 &&
                      n > t + 1 &&
                      (i = e.charCodeAt(t + 1)) >= 56320 &&
                      i <= 57343
                      ? 1024 * (r - 55296) + i - 56320 + 65536
                      : r;
                  })(t, 0),
                  r = n >= jC[0] && n <= jC[1],
                  i = 2 === t.length && t[0] === t[1];
                return { value: Yf(i ? t[0] : t), isSecondary: r || i };
              })(d),
              g = p.value,
              y = p.isSecondary,
              v = l[0].startsWith("FontAwesome"),
              w = Zf(h, g),
              m = w;
            if (v) {
              var _ = (function RF(e) {
                var t = DC[e],
                  n = Zf("fas", e);
                return (
                  t ||
                  (n ? { prefix: "fas", iconName: n } : null) || {
                    prefix: null,
                    iconName: null,
                  }
                );
              })(g);
              _.iconName && _.prefix && ((w = _.iconName), (h = _.prefix));
            }
            if (
              !w ||
              y ||
              (s && s.getAttribute(Hf) === h && s.getAttribute(Bf) === m)
            )
              r();
            else {
              e.setAttribute(n, m), s && e.removeChild(s);
              var k = (function tL() {
                  return {
                    iconName: null,
                    title: null,
                    titleId: null,
                    prefix: null,
                    transform: an,
                    symbol: !1,
                    mask: { iconName: null, prefix: null, rest: [] },
                    maskId: null,
                    extra: { classes: [], styles: {}, attributes: {} },
                  };
                })(),
                J = k.extra;
              (J.attributes[Vf] = t),
                ih(w, h)
                  .then(function (it) {
                    var Mr = th(
                        E(
                          E({}, k),
                          {},
                          {
                            icons: {
                              main: it,
                              mask: { prefix: null, iconName: null, rest: [] },
                            },
                            prefix: h,
                            iconName: m,
                            extra: J,
                            watchable: !0,
                          }
                        )
                      ),
                      kt = ue.createElement("svg");
                    "::before" === t
                      ? e.insertBefore(kt, e.firstChild)
                      : e.appendChild(kt),
                      (kt.outerHTML = Mr.map(function (ls) {
                        return ss(ls);
                      }).join("\n")),
                      e.removeAttribute(n),
                      r();
                  })
                  .catch(i);
            }
          } else r();
        });
      }
      function fL(e) {
        return Promise.all([$C(e, "::before"), $C(e, "::after")]);
      }
      function hL(e) {
        return !(
          e.parentNode === document.head ||
          ~tF.indexOf(e.tagName.toUpperCase()) ||
          e.getAttribute(Vf) ||
          (e.parentNode && "svg" === e.parentNode.tagName)
        );
      }
      function VC(e) {
        if (Tn)
          return new Promise(function (t, n) {
            var r = Ai(e.querySelectorAll("*")).filter(hL).map(fL),
              i = sh_begin("searchPseudoElements");
            PC(),
              Promise.all(r)
                .then(function () {
                  i(), lh(), t();
                })
                .catch(function () {
                  i(), lh(), n();
                });
          });
      }
      var HC = !1,
        BC = function (t) {
          return t
            .toLowerCase()
            .split(" ")
            .reduce(
              function (r, i) {
                var o = i.toLowerCase().split("-"),
                  s = o[0],
                  a = o.slice(1).join("-");
                if (s && "h" === a) return (r.flipX = !0), r;
                if (s && "v" === a) return (r.flipY = !0), r;
                if (((a = parseFloat(a)), isNaN(a))) return r;
                switch (s) {
                  case "grow":
                    r.size = r.size + a;
                    break;
                  case "shrink":
                    r.size = r.size - a;
                    break;
                  case "left":
                    r.x = r.x - a;
                    break;
                  case "right":
                    r.x = r.x + a;
                    break;
                  case "up":
                    r.y = r.y - a;
                    break;
                  case "down":
                    r.y = r.y + a;
                    break;
                  case "rotate":
                    r.rotate = r.rotate + a;
                }
                return r;
              },
              { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 }
            );
        },
        uh = { x: 0, y: 0, width: "100%", height: "100%" };
      function UC(e) {
        var t =
          !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return (
          e.attributes &&
            (e.attributes.fill || t) &&
            (e.attributes.fill = "black"),
          e
        );
      }
      !(function NF(e, t) {
        var n = t.mixoutsTo;
        (EC = e),
          (ki = {}),
          Object.keys(Pi).forEach(function (r) {
            -1 === PF.indexOf(r) && delete Pi[r];
          }),
          EC.forEach(function (r) {
            var i = r.mixout ? r.mixout() : {};
            if (
              (Object.keys(i).forEach(function (s) {
                "function" == typeof i[s] && (n[s] = i[s]),
                  "object" === hl(i[s]) &&
                    Object.keys(i[s]).forEach(function (a) {
                      n[s] || (n[s] = {}), (n[s][a] = i[s][a]);
                    });
              }),
              r.hooks)
            ) {
              var o = r.hooks();
              Object.keys(o).forEach(function (s) {
                ki[s] || (ki[s] = []), ki[s].push(o[s]);
              });
            }
            r.provides && r.provides(Pi);
          });
      })(
        [
          DF,
          sL,
          aL,
          lL,
          uL,
          {
            hooks: function () {
              return {
                mutationObserverCallbacks: function (n) {
                  return (n.pseudoElementsCallback = VC), n;
                },
              };
            },
            provides: function (t) {
              t.pseudoElements2svg = function (n) {
                var r = n.node;
                A.searchPseudoElements && VC(void 0 === r ? ue : r);
              };
            },
          },
          {
            mixout: function () {
              return {
                dom: {
                  unwatch: function () {
                    PC(), (HC = !0);
                  },
                },
              };
            },
            hooks: function () {
              return {
                bootstrap: function () {
                  NC(Xf("mutationObserverCallbacks", {}));
                },
                noAuto: function () {
                  !(function ZF() {
                    !Rl || Rl.disconnect();
                  })();
                },
                watch: function (n) {
                  var r = n.observeMutationsRoot;
                  HC
                    ? lh()
                    : NC(
                        Xf("mutationObserverCallbacks", {
                          observeMutationsRoot: r,
                        })
                      );
                },
              };
            },
          },
          {
            mixout: function () {
              return {
                parse: {
                  transform: function (n) {
                    return BC(n);
                  },
                },
              };
            },
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var i = r.getAttribute("data-fa-transform");
                  return i && (n.transform = BC(i)), n;
                },
              };
            },
            provides: function (t) {
              t.generateAbstractTransformGrouping = function (n) {
                var r = n.main,
                  i = n.transform,
                  s = n.iconWidth,
                  a = {
                    transform: "translate(".concat(
                      n.containerWidth / 2,
                      " 256)"
                    ),
                  },
                  l = "translate("
                    .concat(32 * i.x, ", ")
                    .concat(32 * i.y, ") "),
                  u = "scale("
                    .concat((i.size / 16) * (i.flipX ? -1 : 1), ", ")
                    .concat((i.size / 16) * (i.flipY ? -1 : 1), ") "),
                  c = "rotate(".concat(i.rotate, " 0 0)"),
                  h = {
                    outer: a,
                    inner: {
                      transform: "".concat(l, " ").concat(u, " ").concat(c),
                    },
                    path: {
                      transform: "translate(".concat((s / 2) * -1, " -256)"),
                    },
                  };
                return {
                  tag: "g",
                  attributes: E({}, h.outer),
                  children: [
                    {
                      tag: "g",
                      attributes: E({}, h.inner),
                      children: [
                        {
                          tag: r.icon.tag,
                          children: r.icon.children,
                          attributes: E(E({}, r.icon.attributes), h.path),
                        },
                      ],
                    },
                  ],
                };
              };
            },
          },
          {
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var i = r.getAttribute("data-fa-mask"),
                    o = i
                      ? xl(
                          i.split(" ").map(function (s) {
                            return s.trim();
                          })
                        )
                      : { prefix: null, iconName: null, rest: [] };
                  return (
                    o.prefix || (o.prefix = er()),
                    (n.mask = o),
                    (n.maskId = r.getAttribute("data-fa-mask-id")),
                    n
                  );
                },
              };
            },
            provides: function (t) {
              t.generateAbstractMask = function (n) {
                var e,
                  r = n.children,
                  i = n.attributes,
                  o = n.main,
                  s = n.mask,
                  a = n.maskId,
                  c = o.icon,
                  f = s.icon,
                  h = (function mF(e) {
                    var t = e.transform,
                      r = e.iconWidth,
                      i = {
                        transform: "translate(".concat(
                          e.containerWidth / 2,
                          " 256)"
                        ),
                      },
                      o = "translate("
                        .concat(32 * t.x, ", ")
                        .concat(32 * t.y, ") "),
                      s = "scale("
                        .concat((t.size / 16) * (t.flipX ? -1 : 1), ", ")
                        .concat((t.size / 16) * (t.flipY ? -1 : 1), ") "),
                      a = "rotate(".concat(t.rotate, " 0 0)");
                    return {
                      outer: i,
                      inner: {
                        transform: "".concat(o, " ").concat(s, " ").concat(a),
                      },
                      path: {
                        transform: "translate(".concat((r / 2) * -1, " -256)"),
                      },
                    };
                  })({
                    transform: n.transform,
                    containerWidth: s.width,
                    iconWidth: o.width,
                  }),
                  p = {
                    tag: "rect",
                    attributes: E(E({}, uh), {}, { fill: "white" }),
                  },
                  g = c.children ? { children: c.children.map(UC) } : {},
                  y = {
                    tag: "g",
                    attributes: E({}, h.inner),
                    children: [
                      UC(
                        E(
                          {
                            tag: c.tag,
                            attributes: E(E({}, c.attributes), h.path),
                          },
                          g
                        )
                      ),
                    ],
                  },
                  v = { tag: "g", attributes: E({}, h.outer), children: [y] },
                  w = "mask-".concat(a || os()),
                  m = "clip-".concat(a || os()),
                  _ = {
                    tag: "mask",
                    attributes: E(
                      E({}, uh),
                      {},
                      {
                        id: w,
                        maskUnits: "userSpaceOnUse",
                        maskContentUnits: "userSpaceOnUse",
                      }
                    ),
                    children: [p, v],
                  },
                  k = {
                    tag: "defs",
                    children: [
                      {
                        tag: "clipPath",
                        attributes: { id: m },
                        children: ((e = f), "g" === e.tag ? e.children : [e]),
                      },
                      _,
                    ],
                  };
                return (
                  r.push(k, {
                    tag: "rect",
                    attributes: E(
                      {
                        fill: "currentColor",
                        "clip-path": "url(#".concat(m, ")"),
                        mask: "url(#".concat(w, ")"),
                      },
                      uh
                    ),
                  }),
                  { children: r, attributes: i }
                );
              };
            },
          },
          {
            provides: function (t) {
              var n = !1;
              Jn.matchMedia &&
                (n = Jn.matchMedia("(prefers-reduced-motion: reduce)").matches),
                (t.missingIconAbstract = function () {
                  var r = [],
                    i = { fill: "currentColor" },
                    o = {
                      attributeType: "XML",
                      repeatCount: "indefinite",
                      dur: "2s",
                    };
                  r.push({
                    tag: "path",
                    attributes: E(
                      E({}, i),
                      {},
                      {
                        d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
                      }
                    ),
                  });
                  var s = E(E({}, o), {}, { attributeName: "opacity" }),
                    a = {
                      tag: "circle",
                      attributes: E(
                        E({}, i),
                        {},
                        { cx: "256", cy: "364", r: "28" }
                      ),
                      children: [],
                    };
                  return (
                    n ||
                      a.children.push(
                        {
                          tag: "animate",
                          attributes: E(
                            E({}, o),
                            {},
                            { attributeName: "r", values: "28;14;28;28;14;28;" }
                          ),
                        },
                        {
                          tag: "animate",
                          attributes: E(
                            E({}, s),
                            {},
                            { values: "1;0;1;1;0;1;" }
                          ),
                        }
                      ),
                    r.push(a),
                    r.push({
                      tag: "path",
                      attributes: E(
                        E({}, i),
                        {},
                        {
                          opacity: "1",
                          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
                        }
                      ),
                      children: n
                        ? []
                        : [
                            {
                              tag: "animate",
                              attributes: E(
                                E({}, s),
                                {},
                                { values: "1;0;0;0;0;1;" }
                              ),
                            },
                          ],
                    }),
                    n ||
                      r.push({
                        tag: "path",
                        attributes: E(
                          E({}, i),
                          {},
                          {
                            opacity: "0",
                            d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
                          }
                        ),
                        children: [
                          {
                            tag: "animate",
                            attributes: E(
                              E({}, s),
                              {},
                              { values: "0;0;1;1;0;0;" }
                            ),
                          },
                        ],
                      }),
                    { tag: "g", attributes: { class: "missing" }, children: r }
                  );
                });
            },
          },
          {
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var i = r.getAttribute("data-fa-symbol");
                  return (n.symbol = null !== i && ("" === i || i)), n;
                },
              };
            },
          },
        ],
        { mixoutsTo: vt }
      );
      let _L = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Nt({ type: e })),
            (e.ɵinj = wt({})),
            e
          );
        })(),
        EL = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Nt({ type: e, bootstrap: [BO] })),
            (e.ɵinj = wt({ imports: [yk, Vk, CO, Hk, _L] })),
            e
          );
        })();
      (function HT() {
        yD = !1;
      })(),
        mk()
          .bootstrapModule(EL)
          .catch((e) => console.error(e));
    },
  },
  (se) => {
    se((se.s = 607));
  },
]);
