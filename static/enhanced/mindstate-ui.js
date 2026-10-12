/*! Arc UI / UIArc © 2026 Elia Kuratli. MIT: ./UIARC-LICENSE.txt. Other notices: ./THIRD-PARTY-NOTICES.txt. MindState adaptations. */
var s1 = (n) => {
  throw TypeError(n);
};
var r1 = (n, i, o) => i.has(n) || s1("Cannot " + o);
var Ke = (n, i, o) => (r1(n, i, "read from private field"), o ? o.call(n) : i.get(n)), l1 = (n, i, o) => i.has(n) ? s1("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(n) : i.set(n, o), Hh = (n, i, o, r) => (r1(n, i, "write to private field"), r ? r.call(n, o) : i.set(n, o), o);
function VR(n, i) {
  for (var o = 0; o < i.length; o++) {
    const r = i[o];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in n)) {
          const f = Object.getOwnPropertyDescriptor(r, l);
          f && Object.defineProperty(n, l, f.get ? f : {
            enumerable: !0,
            get: () => r[l]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function BR(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Ih = { exports: {} }, Xr = {};
var u1;
function PR() {
  if (u1) return Xr;
  u1 = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(r, l, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), l.key !== void 0 && (d = "" + l.key), "key" in l) {
      f = {};
      for (var h in l)
        h !== "key" && (f[h] = l[h]);
    } else f = l;
    return l = f.ref, {
      $$typeof: n,
      type: r,
      key: d,
      ref: l !== void 0 ? l : null,
      props: f
    };
  }
  return Xr.Fragment = i, Xr.jsx = o, Xr.jsxs = o, Xr;
}
var c1;
function UR() {
  return c1 || (c1 = 1, Ih.exports = PR()), Ih.exports;
}
var x = UR(), qh = { exports: {} }, $r = {}, Gh = { exports: {} }, Yh = {};
var f1;
function HR() {
  return f1 || (f1 = 1, (function(n) {
    function i(q, X) {
      var Y = q.length;
      q.push(X);
      t: for (; 0 < Y; ) {
        var tt = Y - 1 >>> 1, lt = q[tt];
        if (0 < l(lt, X))
          q[tt] = X, q[Y] = lt, Y = tt;
        else break t;
      }
    }
    function o(q) {
      return q.length === 0 ? null : q[0];
    }
    function r(q) {
      if (q.length === 0) return null;
      var X = q[0], Y = q.pop();
      if (Y !== X) {
        q[0] = Y;
        t: for (var tt = 0, lt = q.length, Dt = lt >>> 1; tt < Dt; ) {
          var Mt = 2 * (tt + 1) - 1, te = q[Mt], N = Mt + 1, Q = q[N];
          if (0 > l(te, Y))
            N < lt && 0 > l(Q, te) ? (q[tt] = Q, q[N] = Y, tt = N) : (q[tt] = te, q[Mt] = Y, tt = Mt);
          else if (N < lt && 0 > l(Q, Y))
            q[tt] = Q, q[N] = Y, tt = N;
          else break t;
        }
      }
      return X;
    }
    function l(q, X) {
      var Y = q.sortIndex - X.sortIndex;
      return Y !== 0 ? Y : q.id - X.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, h = d.now();
      n.unstable_now = function() {
        return d.now() - h;
      };
    }
    var m = [], g = [], y = 1, p = null, S = 3, T = !1, E = !1, w = !1, _ = !1, R = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, A = typeof setImmediate < "u" ? setImmediate : null;
    function D(q) {
      for (var X = o(g); X !== null; ) {
        if (X.callback === null) r(g);
        else if (X.startTime <= q)
          r(g), X.sortIndex = X.expirationTime, i(m, X);
        else break;
        X = o(g);
      }
    }
    function U(q) {
      if (w = !1, D(q), !E)
        if (o(m) !== null)
          E = !0, z || (z = !0, et());
        else {
          var X = o(g);
          X !== null && ht(U, X.startTime - q);
        }
    }
    var z = !1, V = -1, I = 5, F = -1;
    function Z() {
      return _ ? !0 : !(n.unstable_now() - F < I);
    }
    function W() {
      if (_ = !1, z) {
        var q = n.unstable_now();
        F = q;
        var X = !0;
        try {
          t: {
            E = !1, w && (w = !1, O(V), V = -1), T = !0;
            var Y = S;
            try {
              e: {
                for (D(q), p = o(m); p !== null && !(p.expirationTime > q && Z()); ) {
                  var tt = p.callback;
                  if (typeof tt == "function") {
                    p.callback = null, S = p.priorityLevel;
                    var lt = tt(
                      p.expirationTime <= q
                    );
                    if (q = n.unstable_now(), typeof lt == "function") {
                      p.callback = lt, D(q), X = !0;
                      break e;
                    }
                    p === o(m) && r(m), D(q);
                  } else r(m);
                  p = o(m);
                }
                if (p !== null) X = !0;
                else {
                  var Dt = o(g);
                  Dt !== null && ht(
                    U,
                    Dt.startTime - q
                  ), X = !1;
                }
              }
              break t;
            } finally {
              p = null, S = Y, T = !1;
            }
            X = void 0;
          }
        } finally {
          X ? et() : z = !1;
        }
      }
    }
    var et;
    if (typeof A == "function")
      et = function() {
        A(W);
      };
    else if (typeof MessageChannel < "u") {
      var st = new MessageChannel(), ft = st.port2;
      st.port1.onmessage = W, et = function() {
        ft.postMessage(null);
      };
    } else
      et = function() {
        R(W, 0);
      };
    function ht(q, X) {
      V = R(function() {
        q(n.unstable_now());
      }, X);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, n.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : I = 0 < q ? Math.floor(1e3 / q) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(q) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = S;
      }
      var Y = S;
      S = X;
      try {
        return q();
      } finally {
        S = Y;
      }
    }, n.unstable_requestPaint = function() {
      _ = !0;
    }, n.unstable_runWithPriority = function(q, X) {
      switch (q) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          q = 3;
      }
      var Y = S;
      S = q;
      try {
        return X();
      } finally {
        S = Y;
      }
    }, n.unstable_scheduleCallback = function(q, X, Y) {
      var tt = n.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? tt + Y : tt) : Y = tt, q) {
        case 1:
          var lt = -1;
          break;
        case 2:
          lt = 250;
          break;
        case 5:
          lt = 1073741823;
          break;
        case 4:
          lt = 1e4;
          break;
        default:
          lt = 5e3;
      }
      return lt = Y + lt, q = {
        id: y++,
        callback: X,
        priorityLevel: q,
        startTime: Y,
        expirationTime: lt,
        sortIndex: -1
      }, Y > tt ? (q.sortIndex = Y, i(g, q), o(m) === null && q === o(g) && (w ? (O(V), V = -1) : w = !0, ht(U, Y - tt))) : (q.sortIndex = lt, i(m, q), E || T || (E = !0, z || (z = !0, et()))), q;
    }, n.unstable_shouldYield = Z, n.unstable_wrapCallback = function(q) {
      var X = S;
      return function() {
        var Y = S;
        S = X;
        try {
          return q.apply(this, arguments);
        } finally {
          S = Y;
        }
      };
    };
  })(Yh)), Yh;
}
var d1;
function IR() {
  return d1 || (d1 = 1, Gh.exports = HR()), Gh.exports;
}
var kh = { exports: {} }, Tt = {};
var h1;
function qR() {
  if (h1) return Tt;
  h1 = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), l = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), h = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), g = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.activity"), S = /* @__PURE__ */ Symbol.for("react.view_transition"), T = Symbol.iterator;
  function E(N) {
    return N === null || typeof N != "object" ? null : (N = T && N[T] || N["@@iterator"], typeof N == "function" ? N : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, _ = Object.assign, R = {};
  function O(N, Q, rt) {
    this.props = N, this.context = Q, this.refs = R, this.updater = rt || w;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(N, Q) {
    if (typeof N != "object" && typeof N != "function" && N != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, N, Q, "setState");
  }, O.prototype.forceUpdate = function(N) {
    this.updater.enqueueForceUpdate(this, N, "forceUpdate");
  };
  function A() {
  }
  A.prototype = O.prototype;
  function D(N, Q, rt) {
    this.props = N, this.context = Q, this.refs = R, this.updater = rt || w;
  }
  var U = D.prototype = new A();
  U.constructor = D, _(U, O.prototype), U.isPureReactComponent = !0;
  var z = Array.isArray;
  function V() {
  }
  var I = { H: null, A: null, T: null, S: null }, F = Object.prototype.hasOwnProperty;
  function Z(N, Q, rt) {
    var ut = rt.ref;
    return {
      $$typeof: n,
      type: N,
      key: Q,
      ref: ut !== void 0 ? ut : null,
      props: rt
    };
  }
  function W(N, Q) {
    return Z(N.type, Q, N.props);
  }
  function et(N) {
    return typeof N == "object" && N !== null && N.$$typeof === n;
  }
  function st(N) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(rt) {
      return Q[rt];
    });
  }
  var ft = /\/+/g;
  function ht(N, Q) {
    return typeof N == "object" && N !== null && N.key != null ? st("" + N.key) : Q.toString(36);
  }
  function q(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (typeof N.status == "string" ? N.then(V, V) : (N.status = "pending", N.then(
          function(Q) {
            N.status === "pending" && (N.status = "fulfilled", N.value = Q);
          },
          function(Q) {
            N.status === "pending" && (N.status = "rejected", N.reason = Q);
          }
        )), N.status) {
          case "fulfilled":
            return N.value;
          case "rejected":
            throw N.reason;
        }
    }
    throw N;
  }
  function X(N, Q, rt, ut, it) {
    var yt = typeof N;
    (yt === "undefined" || yt === "boolean") && (N = null);
    var bt = !1;
    if (N === null) bt = !0;
    else
      switch (yt) {
        case "bigint":
        case "string":
        case "number":
          bt = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case n:
            case i:
              bt = !0;
              break;
            case y:
              return bt = N._init, X(
                bt(N._payload),
                Q,
                rt,
                ut,
                it
              );
          }
      }
    if (bt)
      return it = it(N), bt = ut === "" ? "." + ht(N, 0) : ut, z(it) ? (rt = "", bt != null && (rt = bt.replace(ft, "$&/") + "/"), X(it, Q, rt, "", function(Vt) {
        return Vt;
      })) : it != null && (et(it) && (it = W(
        it,
        rt + (it.key == null || N && N.key === it.key ? "" : ("" + it.key).replace(
          ft,
          "$&/"
        ) + "/") + bt
      )), Q.push(it)), 1;
    bt = 0;
    var nt = ut === "" ? "." : ut + ":";
    if (z(N))
      for (var at = 0; at < N.length; at++)
        ut = N[at], yt = nt + ht(ut, at), bt += X(
          ut,
          Q,
          rt,
          yt,
          it
        );
    else if (at = E(N), typeof at == "function")
      for (N = at.call(N), at = 0; !(ut = N.next()).done; )
        ut = ut.value, yt = nt + ht(ut, at++), bt += X(
          ut,
          Q,
          rt,
          yt,
          it
        );
    else if (yt === "object") {
      if (typeof N.then == "function")
        return X(
          q(N),
          Q,
          rt,
          ut,
          it
        );
      throw Q = String(N), Error(
        "Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return bt;
  }
  function Y(N, Q, rt) {
    if (N == null) return N;
    var ut = [], it = 0;
    return X(N, ut, "", "", function(yt) {
      return Q.call(rt, yt, it++);
    }), ut;
  }
  function tt(N) {
    if (N._status === -1) {
      var Q = N._result, rt = Q();
      rt.then(
        function(ut) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = ut, rt.status === void 0 && (rt.status = "fulfilled", rt.value = ut));
        },
        function(ut) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = ut, rt.status === void 0 && (rt.status = "rejected", rt.reason = ut));
        }
      ), N._status === -1 && (N._status = 0, N._result = rt);
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var lt = typeof reportError == "function" ? reportError : function(N) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
        error: N
      });
      if (!window.dispatchEvent(Q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", N);
      return;
    }
    console.error(N);
  };
  function Dt(N) {
    var Q = I.T, rt = {};
    rt.types = Q !== null ? Q.types : null, I.T = rt;
    try {
      var ut = N(), it = I.S;
      it !== null && it(rt, ut), typeof ut == "object" && ut !== null && typeof ut.then == "function" && ut.then(V, lt);
    } catch (yt) {
      lt(yt);
    } finally {
      Q !== null && rt.types !== null && (Q.types = rt.types), I.T = Q;
    }
  }
  function Mt(N) {
    var Q = I.T;
    if (Q !== null) {
      var rt = Q.types;
      rt === null ? Q.types = [N] : rt.indexOf(N) === -1 && rt.push(N);
    } else Dt(Mt.bind(null, N));
  }
  var te = {
    map: Y,
    forEach: function(N, Q, rt) {
      Y(
        N,
        function() {
          Q.apply(this, arguments);
        },
        rt
      );
    },
    count: function(N) {
      var Q = 0;
      return Y(N, function() {
        Q++;
      }), Q;
    },
    toArray: function(N) {
      return Y(N, function(Q) {
        return Q;
      }) || [];
    },
    only: function(N) {
      if (!et(N))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return N;
    }
  };
  return Tt.Activity = p, Tt.Children = te, Tt.Component = O, Tt.Fragment = o, Tt.Profiler = l, Tt.PureComponent = D, Tt.StrictMode = r, Tt.Suspense = m, Tt.ViewTransition = S, Tt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I, Tt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(N) {
      return I.H.useMemoCache(N);
    }
  }, Tt.addTransitionType = Mt, Tt.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, Tt.cacheSignal = function() {
    return null;
  }, Tt.cloneElement = function(N, Q, rt) {
    if (N == null)
      throw Error(
        "The argument must be a React element, but you passed " + N + "."
      );
    var ut = _({}, N.props), it = N.key;
    if (Q != null)
      for (yt in Q.key !== void 0 && (it = "" + Q.key), Q)
        !F.call(Q, yt) || yt === "key" || yt === "__self" || yt === "__source" || yt === "ref" && Q.ref === void 0 || (ut[yt] = Q[yt]);
    var yt = arguments.length - 2;
    if (yt === 1) ut.children = rt;
    else if (1 < yt) {
      for (var bt = Array(yt), nt = 0; nt < yt; nt++)
        bt[nt] = arguments[nt + 2];
      ut.children = bt;
    }
    return Z(N.type, it, ut);
  }, Tt.createContext = function(N) {
    return N = {
      $$typeof: d,
      _currentValue: N,
      _currentValue2: N,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, N.Provider = N, N.Consumer = {
      $$typeof: f,
      _context: N
    }, N;
  }, Tt.createElement = function(N, Q, rt) {
    var ut, it = {}, yt = null;
    if (Q != null)
      for (ut in Q.key !== void 0 && (yt = "" + Q.key), Q)
        F.call(Q, ut) && ut !== "key" && ut !== "__self" && ut !== "__source" && (it[ut] = Q[ut]);
    var bt = arguments.length - 2;
    if (bt === 1) it.children = rt;
    else if (1 < bt) {
      for (var nt = Array(bt), at = 0; at < bt; at++)
        nt[at] = arguments[at + 2];
      it.children = nt;
    }
    if (N && N.defaultProps)
      for (ut in bt = N.defaultProps, bt)
        it[ut] === void 0 && (it[ut] = bt[ut]);
    return Z(N, yt, it);
  }, Tt.createRef = function() {
    return { current: null };
  }, Tt.forwardRef = function(N) {
    return { $$typeof: h, render: N };
  }, Tt.isValidElement = et, Tt.lazy = function(N) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: N },
      _init: tt
    };
  }, Tt.memo = function(N, Q) {
    return {
      $$typeof: g,
      type: N,
      compare: Q === void 0 ? null : Q
    };
  }, Tt.startTransition = Dt, Tt.unstable_useCacheRefresh = function() {
    return I.H.useCacheRefresh();
  }, Tt.use = function(N) {
    return I.H.use(N);
  }, Tt.useActionState = function(N, Q, rt) {
    return I.H.useActionState(N, Q, rt);
  }, Tt.useCallback = function(N, Q) {
    return I.H.useCallback(N, Q);
  }, Tt.useContext = function(N) {
    return I.H.useContext(N);
  }, Tt.useDebugValue = function() {
  }, Tt.useDeferredValue = function(N, Q) {
    return I.H.useDeferredValue(N, Q);
  }, Tt.useEffect = function(N, Q) {
    return I.H.useEffect(N, Q);
  }, Tt.useEffectEvent = function(N) {
    return I.H.useEffectEvent(N);
  }, Tt.useId = function() {
    return I.H.useId();
  }, Tt.useImperativeHandle = function(N, Q, rt) {
    return I.H.useImperativeHandle(N, Q, rt);
  }, Tt.useInsertionEffect = function(N, Q) {
    return I.H.useInsertionEffect(N, Q);
  }, Tt.useLayoutEffect = function(N, Q) {
    return I.H.useLayoutEffect(N, Q);
  }, Tt.useMemo = function(N, Q) {
    return I.H.useMemo(N, Q);
  }, Tt.useOptimistic = function(N, Q) {
    return I.H.useOptimistic(N, Q);
  }, Tt.useReducer = function(N, Q, rt) {
    return I.H.useReducer(N, Q, rt);
  }, Tt.useRef = function(N) {
    return I.H.useRef(N);
  }, Tt.useState = function(N) {
    return I.H.useState(N);
  }, Tt.useSyncExternalStore = function(N, Q, rt) {
    return I.H.useSyncExternalStore(
      N,
      Q,
      rt
    );
  }, Tt.useTransition = function() {
    return I.H.useTransition();
  }, Tt.version = "19.3.0", Tt;
}
var m1;
function bp() {
  return m1 || (m1 = 1, kh.exports = qR()), kh.exports;
}
var Fh = { exports: {} }, Ge = {};
var p1;
function GR() {
  if (p1) return Ge;
  p1 = 1;
  var n = bp();
  function i(y) {
    var p = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        p += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + y + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var r = {
    d: {
      f: o,
      r: function() {
        throw Error(i(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, l = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.recoverable"), d = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function h(y, p, S) {
    var T = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: l,
      key: T == null ? null : T === d ? d : "" + T,
      children: y,
      containerInfo: p,
      implementation: S
    };
  }
  var m = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(y, p) {
    if (y === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return Ge.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Ge.browser = function(y) {
    return { $$typeof: f, _reason: y };
  }, Ge.createPortal = function(y, p) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(i(299));
    return h(y, p, null, S);
  }, Ge.flushSync = function(y) {
    var p = m.T, S = r.p;
    try {
      if (m.T = null, r.p = 2, y) return y();
    } finally {
      m.T = p, r.p = S, r.d.f();
    }
  }, Ge.preconnect = function(y, p) {
    typeof y == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, r.d.C(y, p));
  }, Ge.prefetchDNS = function(y) {
    typeof y == "string" && r.d.D(y);
  }, Ge.preinit = function(y, p) {
    if (typeof y == "string" && p && typeof p.as == "string") {
      var S = p.as, T = g(S, p.crossOrigin), E = typeof p.integrity == "string" ? p.integrity : void 0, w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      S === "style" ? r.d.S(
        y,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: T,
          integrity: E,
          fetchPriority: w
        }
      ) : S === "script" && r.d.X(y, {
        crossOrigin: T,
        integrity: E,
        fetchPriority: w,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, Ge.preinitModule = function(y, p) {
    if (typeof y == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var S = g(
            p.as,
            p.crossOrigin
          );
          r.d.M(y, {
            crossOrigin: S,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0
          });
        }
      } else p == null && r.d.M(y);
  }, Ge.preload = function(y, p) {
    if (typeof y == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var S = p.as, T = g(S, p.crossOrigin);
      r.d.L(y, S, {
        crossOrigin: T,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, Ge.preloadModule = function(y, p) {
    if (typeof y == "string")
      if (p) {
        var S = g(p.as, p.crossOrigin);
        r.d.m(y, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: S,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0
        });
      } else r.d.m(y);
  }, Ge.requestFormReset = function(y) {
    r.d.r(y);
  }, Ge.unstable_batchedUpdates = function(y, p) {
    return y(p);
  }, Ge.useFormState = function(y, p, S) {
    return m.H.useFormState(y, p, S);
  }, Ge.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, Ge.version = "19.3.0", Ge;
}
var g1;
function Bx() {
  if (g1) return Fh.exports;
  g1 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), Fh.exports = GR(), Fh.exports;
}
var y1;
function YR() {
  if (y1) return $r;
  y1 = 1;
  var n = IR(), i = bp(), o = Bx();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        e += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function f(t) {
    for (var e = t, a = e; a && !a.alternate; )
      e = a, (e.flags & 4098) !== 0 && (t = e.return), a = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function d(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (f(t) !== t)
      throw Error(r(188));
  }
  function g(t) {
    var e = t.alternate;
    if (!e) {
      if (e = f(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var a = t, s = e; ; ) {
      var u = a.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (s = u.return, s !== null) {
          a = s;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === a) return m(u), t;
          if (c === s) return m(u), e;
          c = c.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== s.return) a = u, s = c;
      else {
        for (var b = !1, C = u.child; C; ) {
          if (C === a) {
            b = !0, a = u, s = c;
            break;
          }
          if (C === s) {
            b = !0, s = u, a = c;
            break;
          }
          C = C.sibling;
        }
        if (!b) {
          for (C = c.child; C; ) {
            if (C === a) {
              b = !0, a = c, s = u;
              break;
            }
            if (C === s) {
              b = !0, s = c, a = u;
              break;
            }
            C = C.sibling;
          }
          if (!b) throw Error(r(189));
        }
      }
      if (a.alternate !== s) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? t : e;
  }
  function y(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = y(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function p(t, e, a, s, u, c) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && a(t, s, u, c) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && p(
        t.child,
        e,
        a,
        s,
        u,
        c
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function S(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function T(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function E(t) {
    var e = [null, null], a = S(t);
    return a === null || w(
      e,
      t,
      a.child,
      { foundSelf: !1 }
    ), e;
  }
  function w(t, e, a, s) {
    for (; a !== null; ) {
      if (a === e) s.foundSelf = !0;
      else if (a.tag === 5 || a.tag === 27 || a.tag === 6) {
        if (s.foundSelf) return t[1] = a, !0;
        t[0] = a;
      } else if ((a.tag !== 22 || a.memoizedState === null) && w(
        t,
        e,
        a.child,
        s
      ))
        return !0;
      a = a.sibling;
    }
    return !1;
  }
  function _(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(r(559));
    }
  }
  var R = null, O = null;
  function A(t, e, a) {
    return t === a ? !0 : t === e ? (R = t, !0) : !1;
  }
  function D(t, e, a) {
    return t === a ? (O = t, !1) : t === e ? (O !== null && (R = t), !0) : !1;
  }
  function U(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function z(t, e, a) {
    for (var s = 0, u = t; u; u = a(u)) s++;
    u = 0;
    for (var c = e; c; c = a(c)) u++;
    for (; 0 < s - u; ) t = a(t), s--;
    for (; 0 < u - s; ) e = a(e), u--;
    for (; s--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = a(t), e = a(e);
    }
    return null;
  }
  var V = Object.assign, I = /* @__PURE__ */ Symbol.for("react.element"), F = /* @__PURE__ */ Symbol.for("react.transitional.element"), Z = /* @__PURE__ */ Symbol.for("react.portal"), W = /* @__PURE__ */ Symbol.for("react.fragment"), et = /* @__PURE__ */ Symbol.for("react.strict_mode"), st = /* @__PURE__ */ Symbol.for("react.profiler"), ft = /* @__PURE__ */ Symbol.for("react.consumer"), ht = /* @__PURE__ */ Symbol.for("react.context"), q = /* @__PURE__ */ Symbol.for("react.forward_ref"), X = /* @__PURE__ */ Symbol.for("react.suspense"), Y = /* @__PURE__ */ Symbol.for("react.suspense_list"), tt = /* @__PURE__ */ Symbol.for("react.memo"), lt = /* @__PURE__ */ Symbol.for("react.lazy"), Dt = /* @__PURE__ */ Symbol.for("react.activity"), Mt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), te = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), N = /* @__PURE__ */ Symbol.for("react.view_transition"), Q = /* @__PURE__ */ Symbol.for("react.recoverable"), rt = Symbol.iterator;
  function ut(t) {
    return t === null || typeof t != "object" ? null : (t = rt && t[rt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var it = /* @__PURE__ */ Symbol.for("react.client.reference");
  function yt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === it ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case W:
        return "Fragment";
      case st:
        return "Profiler";
      case et:
        return "StrictMode";
      case X:
        return "Suspense";
      case Y:
        return "SuspenseList";
      case Dt:
        return "Activity";
      case N:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Z:
          return "Portal";
        case ht:
          return t.displayName || "Context";
        case ft:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case tt:
          return e = t.displayName || null, e !== null ? e : yt(t.type) || "Memo";
        case lt:
          e = t._payload, t = t._init;
          try {
            return yt(t(e));
          } catch {
          }
      }
    return null;
  }
  var bt = Array.isArray, nt = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, at = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Vt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, we = [], ae = -1;
  function ce(t) {
    return { current: t };
  }
  function Yt(t) {
    0 > ae || (t.current = we[ae], we[ae] = null, ae--);
  }
  function Bt(t, e) {
    ae++, we[ae] = t.current, t.current = e;
  }
  var _n = ce(null), Ga = ce(null), oi = ce(null), Ya = ce(null);
  function ka(t, e) {
    switch (Bt(oi, e), Bt(Ga, t), Bt(_n, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? pb(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = pb(e), t = gb(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Yt(_n), Bt(_n, t);
  }
  function si() {
    Yt(_n), Yt(Ga), Yt(oi);
  }
  function Zs(t) {
    var e = t.memoizedState;
    e !== null && (Es._currentValue = e.memoizedState, Bt(Ya, t)), e = _n.current;
    var a = gb(e, t.type);
    e !== a && (Bt(Ga, t), Bt(_n, a));
  }
  function jo(t) {
    Ga.current === t && (Yt(_n), Yt(Ga)), Ya.current === t && (Yt(Ya), Es._currentValue = Vt);
  }
  var zo, Qs;
  function qn(t) {
    if (zo === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        zo = e && e[1] || "", Qs = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + zo + t + Qs;
  }
  var J = !1;
  function Et(t, e) {
    if (!t || J) return "";
    J = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var K = function() {
                throw Error();
              };
              if (Object.defineProperty(K.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(K, []);
                } catch (ot) {
                  var L = ot;
                }
                Reflect.construct(t, [], K);
              } else {
                try {
                  K.call();
                } catch (ot) {
                  L = ot;
                }
                K = !1;
                try {
                  var G = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), K = !0, new t();
                } finally {
                  K && (G !== void 0 ? Object.defineProperty(t.prototype, "props", G) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (ot) {
                L = ot;
              }
              (K = t()) && typeof K.catch == "function" && K.catch(function() {
              });
            }
          } catch (ot) {
            if (ot && L && typeof ot.stack == "string")
              return [ot.stack, L.stack];
          }
          return [null, null];
        }
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        s.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = s.DetermineComponentFrameRoot(), b = c[0], C = c[1];
      if (b && C) {
        var M = b.split(`
`), P = C.split(`
`);
        for (u = s = 0; s < M.length && !M[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; u < P.length && !P[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (s === M.length || u === P.length)
          for (s = M.length - 1, u = P.length - 1; 1 <= s && 0 <= u && M[s] !== P[u]; )
            u--;
        for (; 1 <= s && 0 <= u; s--, u--)
          if (M[s] !== P[u]) {
            if (s !== 1 || u !== 1)
              do
                if (s--, u--, 0 > u || M[s] !== P[u]) {
                  var k = `
` + M[s].replace(" at new ", " at ");
                  return t.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", t.displayName)), k;
                }
              while (1 <= s && 0 <= u);
            break;
          }
      }
    } finally {
      J = !1, Error.prepareStackTrace = a;
    }
    return (a = t ? t.displayName || t.name : "") ? qn(a) : "";
  }
  function Ct(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return qn(t.type);
      case 16:
        return qn("Lazy");
      case 13:
        return t.child !== e && e !== null ? qn("Suspense Fallback") : qn("Suspense");
      case 19:
        return qn("SuspenseList");
      case 0:
      case 15:
        return Et(t.type, !1);
      case 11:
        return Et(t.type.render, !1);
      case 1:
        return Et(t.type, !0);
      case 31:
        return qn("Activity");
      case 30:
        return qn("ViewTransition");
      default:
        return "";
    }
  }
  function Ut(t) {
    try {
      var e = "", a = null;
      do
        e += Ct(t, a), a = t, t = t.return;
      while (t);
      return e;
    } catch (s) {
      return `
Error generating stack: ` + s.message + `
` + s.stack;
    }
  }
  var se = Object.prototype.hasOwnProperty, Fe = n.unstable_scheduleCallback, Xe = n.unstable_cancelCallback, Lo = n.unstable_shouldYield, me = n.unstable_requestPaint, Oe = n.unstable_now, Fa = n.unstable_getCurrentPriorityLevel, Vo = n.unstable_ImmediatePriority, Js = n.unstable_UserBlockingPriority, Rt = n.unstable_NormalPriority, _e = n.unstable_LowPriority, ri = n.unstable_IdlePriority, Ws = n.log, Fw = n.unstable_setDisableYieldValue, tr = null, fn = null;
  function ia(t) {
    if (typeof Ws == "function" && Fw(t), fn && typeof fn.setStrictMode == "function")
      try {
        fn.setStrictMode(tr, t);
      } catch {
      }
  }
  var dn = Math.clz32 ? Math.clz32 : Kw, Xw = Math.log, $w = Math.LN2;
  function Kw(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Xw(t) / $w | 0) | 0;
  }
  var _l = 256, Al = 262144, Rl = 4194304;
  function Xa(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Ol(t, e, a) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var u = 0, c = t.suspendedLanes, b = t.pingedLanes;
    t = t.warmLanes;
    var C = s & 134217727;
    return C !== 0 ? (s = C & ~c, s !== 0 ? u = Xa(s) : (b &= C, b !== 0 ? u = Xa(b) : a || (a = C & ~t, a !== 0 && (u = Xa(a))))) : (C = s & ~c, C !== 0 ? u = Xa(C) : b !== 0 ? u = Xa(b) : a || (a = s & ~t, a !== 0 && (u = Xa(a)))), u === 0 ? 0 : e !== 0 && e !== u && (e & c) === 0 && (c = u & -u, a = e & -e, c >= a || c === 32 && (a & 4194048) !== 0) ? e : u;
  }
  function er(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Ig(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var s = 31 - dn(a), u = 1 << s;
        e |= t[s], a &= ~u;
      }
    return e;
  }
  function Zw(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function qg() {
    var t = Rl;
    return Rl <<= 1, (Rl & 62914560) === 0 && (Rl = 4194304), t;
  }
  function hf(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function nr(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Qw(t, e, a, s, u, c) {
    var b = t.pendingLanes;
    t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
    var C = t.entanglements, M = t.expirationTimes, P = t.hiddenUpdates;
    for (a = b & ~a; 0 < a; ) {
      var k = 31 - dn(a), K = 1 << k;
      C[k] = 0, M[k] = -1;
      var L = P[k];
      if (L !== null)
        for (P[k] = null, k = 0; k < L.length; k++) {
          var G = L[k];
          G !== null && (G.lane &= -536870913);
        }
      a &= ~K;
    }
    s !== 0 && Gg(t, s, 0), c !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= c & ~(b & ~e));
  }
  function Gg(t, e, a) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var s = 31 - dn(e);
    t.entangledLanes |= e, t.entanglements[s] = t.entanglements[s] | 1073741824 | a & 261930;
  }
  function Yg(t, e) {
    var a = t.entangledLanes |= e;
    for (t = t.entanglements; a; ) {
      var s = 31 - dn(a), u = 1 << s;
      u & e | t[s] & e && (t[s] |= e), a &= ~u;
    }
  }
  function kg(t, e) {
    var a = e & -e;
    return a = (a & 42) !== 0 ? 1 : mf(a), (a & (t.suspendedLanes | e)) !== 0 ? 0 : a;
  }
  function mf(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function pf(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Fg() {
    var t = at.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Wb(t.type));
  }
  function Xg(t, e) {
    var a = at.p;
    try {
      return at.p = t, e();
    } finally {
      at.p = a;
    }
  }
  var Di = Math.random().toString(36).slice(2), Be = "__reactFiber$" + Di, nn = "__reactProps$" + Di, Bo = "__reactContainer$" + Di, $g = "__reactEvents$" + Di, Jw = "__reactListeners$" + Di, Ww = "__reactHandles$" + Di, Kg = "__reactResources$" + Di, ir = "__reactMarker$" + Di, Dl = "__reactLoad$" + Di;
  function Ml(t) {
    delete t[Be], delete t[nn], delete t[Jw], delete t[Ww];
  }
  function $a(t) {
    var e;
    if (e = t[Be]) return e;
    for (var a = t.parentNode; a; ) {
      if (e = a[Bo] || a[Be]) {
        if (a = e.alternate, e.child !== null || a !== null && a.child !== null)
          for (t = jb(t); t !== null; ) {
            if (a = t[Be]) return a;
            t = jb(t);
          }
        return e;
      }
      t = a, a = t.parentNode;
    }
    return null;
  }
  function Po(t) {
    if (t = t[Be] || t[Bo]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function ar(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Uo(t) {
    var e = t[Kg];
    return e || (e = t[Kg] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function De(t) {
    t[ir] = !0;
  }
  function Zg(t) {
    t[Dl] = void 0;
  }
  var Qg = /* @__PURE__ */ new Set(), Jg = {};
  function Ka(t, e) {
    Ho(t, e), Ho(t + "Capture", e);
  }
  function Ho(t, e) {
    for (Jg[t] = e, t = 0; t < e.length; t++)
      Qg.add(e[t]);
  }
  var t_ = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Wg = {}, ty = {};
  function e_(t) {
    return se.call(ty, t) ? !0 : se.call(Wg, t) ? !1 : t_.test(t) ? ty[t] = !0 : (Wg[t] = !0, !1);
  }
  var It = !1;
  function ey() {
    var t = It;
    return It = !1, t;
  }
  function Nl(t, e, a) {
    if (e_(e))
      if (a === null) t.removeAttribute(e);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var s = e.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, a);
      }
  }
  function jl(t, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, a);
    }
  }
  function Mi(t, e, a, s) {
    if (s === null) t.removeAttribute(a);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(e, a, s);
    }
  }
  function hn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function ny(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function n_(t, e, a) {
    var s = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var u = s.get, c = s.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(b) {
          a = "" + b, c.call(this, b);
        }
      }), Object.defineProperty(t, e, {
        enumerable: s.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(b) {
          a = "" + b;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function gf(t) {
    if (!t._valueTracker) {
      var e = ny(t) ? "checked" : "value";
      t._valueTracker = n_(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function iy(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(), s = "";
    return t && (s = ny(t) ? t.checked ? "true" : "false" : t.value), t = s, t !== a ? (e.setValue(t), !0) : !1;
  }
  var i_ = /[\n"\\]/g;
  function An(t) {
    return t.replace(
      i_,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function yf(t, e, a, s, u, c, b, C) {
    t.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? t.type = b : t.removeAttribute("type"), e != null ? b === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + hn(e)) : t.value !== "" + hn(e) && (t.value = "" + hn(e)) : b !== "submit" && b !== "reset" || t.removeAttribute("value"), e != null ? b === "number" && t.value == e ? vf(t, hn(t.value)) : vf(t, hn(e)) : a != null ? vf(t, hn(a)) : s != null && t.removeAttribute("value"), u == null && c != null && (t.defaultChecked = !!c), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? t.name = "" + hn(C) : t.removeAttribute("name");
  }
  function ay(t, e, a, s, u, c, b, C) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.type = c), e != null || a != null) {
      if (!(c !== "submit" && c !== "reset" || e != null)) {
        gf(t);
        return;
      }
      a = a != null ? "" + hn(a) : "", e = e != null ? "" + hn(e) : a, C || e === t.value || (t.value = e), t.defaultValue = e;
    }
    s = s ?? u, s = typeof s != "function" && typeof s != "symbol" && !!s, t.checked = C ? t.checked : !!s, t.defaultChecked = !!s, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (t.name = b), gf(t);
  }
  function vf(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function Io(t, e, a, s) {
    if (t = t.options, e) {
      e = {};
      for (var u = 0; u < a.length; u++)
        e["$" + a[u]] = !0;
      for (a = 0; a < t.length; a++)
        u = e.hasOwnProperty("$" + t[a].value), t[a].selected !== u && (t[a].selected = u), u && s && (t[a].defaultSelected = !0);
    } else {
      for (a = "" + hn(a), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === a) {
          t[u].selected = !0, s && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function oy(t, e, a) {
    if (e != null && (e = "" + hn(e), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? "" + hn(a) : "";
  }
  function sy(t, e, a, s) {
    if (e == null) {
      if (s != null) {
        if (a != null) throw Error(r(92));
        if (bt(s)) {
          if (1 < s.length) throw Error(r(93));
          s = s[0];
        }
        a = s;
      }
      a == null && (a = ""), e = a;
    }
    a = hn(e), t.defaultValue = a, s = t.textContent, s === a && s !== "" && s !== null && (t.value = s), gf(t);
  }
  function qo(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var a_ = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ry(t, e, a) {
    var s = e.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? s ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : s ? t.setProperty(e, a) : typeof a != "number" || a === 0 || a_.has(e) ? e === "float" ? t.cssFloat = a : t[e] = ("" + a).trim() : t[e] = a + "px";
  }
  function ly(t, e, a) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, a != null) {
      for (var s in a)
        !a.hasOwnProperty(s) || e != null && e.hasOwnProperty(s) || (s.indexOf("--") === 0 ? t.setProperty(s, "") : s === "float" ? t.cssFloat = "" : t[s] = "", It = !0);
      for (var u in e)
        s = e[u], e.hasOwnProperty(u) && a[u] !== s && (ry(t, u, s), It = !0);
    } else
      for (var c in e)
        e.hasOwnProperty(c) && ry(t, c, e[c]);
  }
  function bf(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var o_ = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), s_ = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function zl(t) {
    return s_.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function li() {
  }
  var Sf = null;
  function xf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Go = null, Yo = null;
  function uy(t) {
    var e = Po(t);
    if (e && (t = e.stateNode)) {
      var a = t[nn] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (yf(
            t,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), e = a.name, a.type === "radio" && e != null) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + An(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < a.length; e++) {
              var s = a[e];
              if (s !== t && s.form === t.form) {
                var u = s[nn] || null;
                if (!u) throw Error(r(90));
                yf(
                  s,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (e = 0; e < a.length; e++)
              s = a[e], s.form === t.form && iy(s);
          }
          break t;
        case "textarea":
          oy(t, a.value, a.defaultValue);
          break t;
        case "select":
          e = a.value, e != null && Io(t, !!a.multiple, e, !1);
      }
    }
  }
  var Tf = !1;
  function cy(t, e, a) {
    if (Tf) return t(e, a);
    Tf = !0;
    try {
      var s = t(e);
      return s;
    } finally {
      if (Tf = !1, (Go !== null || Yo !== null) && (zu(), Go && (e = Go, t = Yo, Yo = Go = null, uy(e), t)))
        for (e = 0; e < t.length; e++) uy(t[e]);
    }
  }
  function or(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var s = a[nn] || null;
    if (s === null) return null;
    a = s[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (s = !s.disabled) || (t = t.type, s = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !s;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != "function")
      throw Error(
        r(231, e, typeof a)
      );
    return a;
  }
  var Ni = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ef = !1;
  if (Ni)
    try {
      var sr = {};
      Object.defineProperty(sr, "passive", {
        get: function() {
          Ef = !0;
        }
      }), window.addEventListener("test", sr, sr), window.removeEventListener("test", sr, sr);
    } catch {
      Ef = !1;
    }
  var aa = null, Cf = null, Ll = null;
  function fy() {
    if (Ll) return Ll;
    var t, e = Cf, a = e.length, s, u = "value" in aa ? aa.value : aa.textContent, c = u.length;
    for (t = 0; t < a && e[t] === u[t]; t++) ;
    var b = a - t;
    for (s = 1; s <= b && e[a - s] === u[c - s]; s++) ;
    return Ll = u.slice(t, 1 < s ? 1 - s : void 0);
  }
  function Vl(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Bl() {
    return !0;
  }
  function dy() {
    return !1;
  }
  function Ze(t) {
    function e(a, s, u, c, b) {
      this._reactName = a, this._targetInst = u, this.type = s, this.nativeEvent = c, this.target = b, this.currentTarget = null;
      for (var C in t)
        t.hasOwnProperty(C) && (a = t[C], this[C] = a ? a(c) : c[C]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Bl : dy, this.isPropagationStopped = dy, this;
    }
    return V(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Bl);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Bl);
      },
      persist: function() {
      },
      isPersistent: Bl
    }), e;
  }
  var oa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Pl = Ze(oa), rr = V({}, oa, { view: 0, detail: 0 }), r_ = Ze(rr), wf, _f, lr, Ul = V({}, rr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Rf,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== lr && (lr && t.type === "mousemove" ? (wf = t.screenX - lr.screenX, _f = t.screenY - lr.screenY) : _f = wf = 0, lr = t), wf);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : _f;
    }
  }), hy = Ze(Ul), l_ = V({}, Ul, { dataTransfer: 0 }), u_ = Ze(l_), c_ = V({}, rr, { relatedTarget: 0 }), Af = Ze(c_), f_ = V({}, oa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), d_ = Ze(f_), h_ = V({}, oa, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), m_ = Ze(h_), p_ = V({}, oa, { data: 0 }), my = Ze(p_), g_ = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, y_ = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, v_ = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function b_(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = v_[t]) ? !!e[t] : !1;
  }
  function Rf() {
    return b_;
  }
  var S_ = V({}, rr, {
    key: function(t) {
      if (t.key) {
        var e = g_[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Vl(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? y_[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Rf,
    charCode: function(t) {
      return t.type === "keypress" ? Vl(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Vl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), x_ = Ze(S_), T_ = V({}, Ul, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), py = Ze(T_), E_ = V({}, oa, { submitter: 0 }), C_ = Ze(E_), w_ = V({}, rr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Rf
  }), __ = Ze(w_), A_ = V({}, oa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), R_ = Ze(A_), O_ = V({}, Ul, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), D_ = Ze(O_), M_ = V({}, oa, {
    newState: 0,
    oldState: 0,
    source: 0
  }), N_ = Ze(M_), j_ = [9, 13, 27, 32], Of = Ni && "CompositionEvent" in window, ur = null;
  Ni && "documentMode" in document && (ur = document.documentMode);
  var z_ = Ni && "TextEvent" in window && !ur, gy = Ni && (!Of || ur && 8 < ur && 11 >= ur), yy = " ", vy = !1;
  function by(t, e) {
    switch (t) {
      case "keyup":
        return j_.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Sy(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var ko = !1;
  function L_(t, e) {
    switch (t) {
      case "compositionend":
        return Sy(e);
      case "keypress":
        return e.which !== 32 ? null : (vy = !0, yy);
      case "textInput":
        return t = e.data, t === yy && vy ? null : t;
      default:
        return null;
    }
  }
  function V_(t, e) {
    if (ko)
      return t === "compositionend" || !Of && by(t, e) ? (t = fy(), Ll = Cf = aa = null, ko = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return gy && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var B_ = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function xy(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!B_[t.type] : e === "textarea";
  }
  function Ty(t, e, a, s) {
    Go ? Yo ? Yo.push(s) : Yo = [s] : Go = s, e = Hu(e, "onChange"), 0 < e.length && (a = new Pl(
      "onChange",
      "change",
      null,
      a,
      s
    ), t.push({ event: a, listeners: e }));
  }
  var cr = null, fr = null;
  function P_(t) {
    ub(t, 0);
  }
  function Hl(t) {
    var e = ar(t);
    if (iy(e)) return t;
  }
  function Ey(t, e) {
    if (t === "change") return e;
  }
  var Cy = !1;
  if (Ni) {
    var Df;
    if (Ni) {
      var Mf = "oninput" in document;
      if (!Mf) {
        var wy = document.createElement("div");
        wy.setAttribute("oninput", "return;"), Mf = typeof wy.oninput == "function";
      }
      Df = Mf;
    } else Df = !1;
    Cy = Df && (!document.documentMode || 9 < document.documentMode);
  }
  function _y() {
    cr && (cr.detachEvent("onpropertychange", Ay), fr = cr = null);
  }
  function Ay(t) {
    if (t.propertyName === "value" && Hl(fr)) {
      var e = [];
      Ty(
        e,
        fr,
        t,
        xf(t)
      ), cy(P_, e);
    }
  }
  function U_(t, e, a) {
    t === "focusin" ? (_y(), cr = e, fr = a, cr.attachEvent("onpropertychange", Ay)) : t === "focusout" && _y();
  }
  function H_(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Hl(fr);
  }
  function I_(t, e) {
    if (t === "click") return Hl(e);
  }
  function q_(t, e) {
    if (t === "input" || t === "change")
      return Hl(e);
  }
  function G_(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var mn = typeof Object.is == "function" ? Object.is : G_;
  function dr(t, e) {
    if (mn(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var a = Object.keys(t), s = Object.keys(e);
    if (a.length !== s.length) return !1;
    for (s = 0; s < a.length; s++) {
      var u = a[s];
      if (!se.call(e, u) || !mn(t[u], e[u]))
        return !1;
    }
    return !0;
  }
  function Nf(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Ry(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Oy(t, e) {
    var a = Ry(t);
    t = 0;
    for (var s; a; ) {
      if (a.nodeType === 3) {
        if (s = t + a.textContent.length, t <= e && s >= e)
          return { node: a, offset: e - t };
        t = s;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Ry(a);
    }
  }
  function Dy(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Dy(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function My(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Nf(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = Nf(t.document);
    }
    return e;
  }
  function jf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Y_ = Ni && "documentMode" in document && 11 >= document.documentMode, Fo = null, zf = null, hr = null, Lf = !1;
  function Ny(t, e, a) {
    var s = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Lf || Fo == null || Fo !== Nf(s) || (s = Fo, "selectionStart" in s && jf(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), hr && dr(hr, s) || (hr = s, s = Hu(zf, "onSelect"), 0 < s.length && (e = new Pl(
      "onSelect",
      "select",
      null,
      e,
      a
    ), t.push({ event: e, listeners: s }), e.target = Fo)));
  }
  function Za(t, e) {
    var a = {};
    return a[t.toLowerCase()] = e.toLowerCase(), a["Webkit" + t] = "webkit" + e, a["Moz" + t] = "moz" + e, a;
  }
  var Xo = {
    animationend: Za("Animation", "AnimationEnd"),
    animationiteration: Za("Animation", "AnimationIteration"),
    animationstart: Za("Animation", "AnimationStart"),
    transitionrun: Za("Transition", "TransitionRun"),
    transitionstart: Za("Transition", "TransitionStart"),
    transitioncancel: Za("Transition", "TransitionCancel"),
    transitionend: Za("Transition", "TransitionEnd")
  }, Vf = {}, jy = {};
  Ni && (jy = document.createElement("div").style, "AnimationEvent" in window || (delete Xo.animationend.animation, delete Xo.animationiteration.animation, delete Xo.animationstart.animation), "TransitionEvent" in window || delete Xo.transitionend.transition);
  function Qa(t) {
    if (Vf[t]) return Vf[t];
    if (!Xo[t]) return t;
    var e = Xo[t], a;
    for (a in e)
      if (e.hasOwnProperty(a) && a in jy)
        return Vf[t] = e[a];
    return t;
  }
  var zy = Qa("animationend"), Ly = Qa("animationiteration"), Vy = Qa("animationstart"), k_ = Qa("transitionrun"), F_ = Qa("transitionstart"), X_ = Qa("transitioncancel"), By = Qa("transitionend"), Py = /* @__PURE__ */ new Map(), Bf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Bf.push("scrollEnd");
  function Gn(t, e) {
    Py.set(t, e), Ka(e, [t]);
  }
  var $_ = 0;
  function ji(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = Xn.identifierPrefix;
    var a = $_++;
    return t = "_" + t + "t_" + a.toString(32) + "_", e.autoName = t;
  }
  function Uy(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, a = hs;
    if (a !== null)
      for (var s = 0; s < a.length; s++) {
        var u = t[a[s]];
        if (u != null) {
          if (u === "none") return "none";
          e = e == null ? u : e + (" " + u);
        }
      }
    return e ?? t.default;
  }
  function zi(t, e) {
    return t = Uy(t), e = Uy(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var Il = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Rn = [], $o = 0, Pf = 0;
  function ql() {
    for (var t = $o, e = Pf = $o = 0; e < t; ) {
      var a = Rn[e];
      Rn[e++] = null;
      var s = Rn[e];
      Rn[e++] = null;
      var u = Rn[e];
      Rn[e++] = null;
      var c = Rn[e];
      if (Rn[e++] = null, s !== null && u !== null) {
        var b = s.pending;
        b === null ? u.next = u : (u.next = b.next, b.next = u), s.pending = u;
      }
      c !== 0 && Hy(a, u, c);
    }
  }
  function Gl(t, e, a, s) {
    Rn[$o++] = t, Rn[$o++] = e, Rn[$o++] = a, Rn[$o++] = s, Pf |= s, t.lanes |= s, t = t.alternate, t !== null && (t.lanes |= s);
  }
  function Uf(t, e, a, s) {
    return Gl(t, e, a, s), Yl(t);
  }
  function Ja(t, e) {
    return Gl(t, null, null, e), Yl(t);
  }
  function Hy(t, e, a) {
    t.lanes |= a;
    var s = t.alternate;
    s !== null && (s.lanes |= a);
    for (var u = !1, c = t.return; c !== null; )
      c.childLanes |= a, s = c.alternate, s !== null && (s.childLanes |= a), c.tag === 22 && (t = c.stateNode, t === null || t._visibility & 1 || (u = !0)), t = c, c = c.return;
    return t.tag === 3 ? (c = t.stateNode, u && e !== null && (u = 31 - dn(a), t = c.hiddenUpdates, s = t[u], s === null ? t[u] = [e] : s.push(e), e.lane = a | 536870912), c) : null;
  }
  function Yl(t) {
    if (50 < Lr)
      throw Lr = 0, ju = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ko = {};
  function K_(t, e, a, s) {
    this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function an(t, e, a, s) {
    return new K_(t, e, a, s);
  }
  function Hf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Li(t, e) {
    var a = t.alternate;
    return a === null ? (a = an(
      t.tag,
      e,
      t.key,
      t.mode
    ), a.elementType = t.elementType, a.type = t.type, a.stateNode = t.stateNode, a.alternate = t, t.alternate = a) : (a.pendingProps = e, a.type = t.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = t.flags & 1206910976, a.childLanes = t.childLanes, a.lanes = t.lanes, a.child = t.child, a.memoizedProps = t.memoizedProps, a.memoizedState = t.memoizedState, a.updateQueue = t.updateQueue, e = t.dependencies, a.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, a.sibling = t.sibling, a.index = t.index, a.ref = t.ref, a.refCleanup = t.refCleanup, a;
  }
  function Iy(t, e) {
    t.flags &= 1206910978;
    var a = t.alternate;
    return a === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, t.updateQueue = a.updateQueue, t.type = a.type, e = a.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function kl(t, e, a, s, u, c) {
    var b = 0;
    if (s = t, typeof s == "function") Hf(s) && (b = 1);
    else if (typeof s == "string")
      b = ER(
        t,
        a,
        _n.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (s) {
        case Dt:
          return t = an(31, a, e, u), t.elementType = Dt, t.lanes = c, t;
        case W:
          return Wa(a.children, u, c, e);
        case et:
          b = 8, u |= 24;
          break;
        case st:
          return t = an(12, a, e, u | 2), t.elementType = st, t.lanes = c, t;
        case X:
          return t = an(13, a, e, u), t.elementType = X, t.lanes = c, t;
        case Y:
          return t = an(19, a, e, u), t.elementType = Y, t.lanes = c, t;
        case Mt:
        case N:
          return t = u | 32, t = an(30, a, e, t), t.elementType = N, t.lanes = c, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof s == "object" && s !== null)
            switch (s.$$typeof) {
              case ht:
                b = 10;
                break t;
              case ft:
                b = 9;
                break t;
              case q:
                b = 11;
                break t;
              case tt:
                b = 14;
                break t;
              case lt:
                b = 16, s = null;
                break t;
            }
          b = 29, a = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), s = null;
      }
    return e = an(b, a, e, u), e.elementType = t, e.type = s, e.lanes = c, e;
  }
  function Wa(t, e, a, s) {
    return t = an(7, t, s, e), t.lanes = a, t;
  }
  function If(t, e, a) {
    return t = an(6, t, null, e), t.lanes = a, t;
  }
  function qy(t) {
    var e = an(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function qf(t, e, a) {
    return e = an(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = a, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Gy = /* @__PURE__ */ new WeakMap();
  function On(t, e) {
    if (typeof t == "object" && t !== null) {
      var a = Gy.get(t);
      return a !== void 0 ? a : (e = {
        value: t,
        source: e,
        stack: Ut(e)
      }, Gy.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Ut(e)
    };
  }
  var Zo = [], Qo = 0, Fl = null, mr = 0, Dn = [], Mn = 0, sa = null, ui = 1, ci = "";
  function Vi(t, e) {
    Zo[Qo++] = mr, Zo[Qo++] = Fl, Fl = t, mr = e;
  }
  function Yy(t, e, a) {
    Dn[Mn++] = ui, Dn[Mn++] = ci, Dn[Mn++] = sa, sa = t;
    var s = ui;
    t = ci;
    var u = 32 - dn(s) - 1;
    s &= ~(1 << u), a += 1;
    var c = 32 - dn(e) + u;
    if (30 < c) {
      var b = u - u % 5;
      c = (s & (1 << b) - 1).toString(32), s >>= b, u -= b, ui = 1 << 32 - dn(e) + u | a << u | s, ci = c + t;
    } else
      ui = 1 << c | a << u | s, ci = t;
  }
  function Xl(t) {
    t.return !== null && (Vi(t, 1), Yy(t, 1, 0));
  }
  function Gf(t) {
    for (; t === Fl; )
      Fl = Zo[--Qo], Zo[Qo] = null, mr = Zo[--Qo], Zo[Qo] = null;
    for (; t === sa; )
      sa = Dn[--Mn], Dn[Mn] = null, ci = Dn[--Mn], Dn[Mn] = null, ui = Dn[--Mn], Dn[Mn] = null;
  }
  function ky(t, e) {
    Dn[Mn++] = ui, Dn[Mn++] = ci, Dn[Mn++] = sa, ui = e.id, ci = e.overflow, sa = t;
  }
  var Me = null, ee = null, Ot = !1, ra = null, Nn = !1, Yf = Error(r(519));
  function la(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw pr(On(e, t)), Yf;
  }
  function Fy(t) {
    var e = t.stateNode, a = t.type, s = t.memoizedProps;
    switch (e[Be] = t, e[nn] = s, a) {
      case "dialog":
        jt("cancel", e), jt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        jt("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Br.length; a++)
          jt(Br[a], e);
        break;
      case "source":
        jt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        jt("error", e), jt("load", e);
        break;
      case "details":
        jt("toggle", e);
        break;
      case "input":
        jt("invalid", e), ay(
          e,
          s.value,
          s.defaultValue,
          s.checked,
          s.defaultChecked,
          s.type,
          s.name,
          !0
        );
        break;
      case "select":
        jt("invalid", e);
        break;
      case "textarea":
        jt("invalid", e), sy(e, s.value, s.defaultValue, s.children);
    }
    a = s.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || e.textContent === "" + a || s.suppressHydrationWarning === !0 || hb(e.textContent, a) ? (s.popover != null && (jt("beforetoggle", e), jt("toggle", e)), s.onScroll != null && jt("scroll", e), s.onScrollEnd != null && jt("scrollend", e), s.onClick != null && (e.onclick = li), e = !0) : e = !1, e || la(t, !0);
  }
  function $l(t) {
    for (Me = t.return; Me; )
      switch (Me.tag) {
        case 5:
        case 31:
        case 13:
          Nn = !1;
          return;
        case 27:
        case 3:
          Nn = !0;
          return;
        default:
          Me = Me.return;
      }
  }
  function Jo(t) {
    if (t !== Me) return !1;
    if (!Ot) return $l(t), Ot = !0, !1;
    var e = t.tag, a;
    if ((a = e !== 3 && e !== 27) && ((a = e === 5) && (a = t.type, a = !(a !== "form" && a !== "button") || Sh(t.type, t.memoizedProps)), a = !a), a && ee && la(t), $l(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      ee = Nb(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      ee = Nb(t);
    } else
      e === 27 ? (e = ee, Ca(t.type) ? (t = Oh, Oh = null, ee = t) : ee = e) : ee = Me ? zn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function to() {
    ee = Me = null, Ot = !1;
  }
  function kf() {
    var t = ra;
    return t !== null && (rn === null ? rn = t : rn.push.apply(
      rn,
      t
    ), ra = null), t;
  }
  function pr(t) {
    ra === null ? ra = [t] : ra.push(t);
  }
  var Ff = ce(null), eo = null, Bi = null;
  function ua(t, e, a) {
    Bt(Ff, e._currentValue), e._currentValue = a;
  }
  function Pi(t) {
    t._currentValue = Ff.current, Yt(Ff);
  }
  function Kl(t, e, a) {
    for (; t !== null; ) {
      var s = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, s !== null && (s.childLanes |= e)) : s !== null && (s.childLanes & e) !== e && (s.childLanes |= e), t === a) break;
      t = t.return;
    }
  }
  function Xf(t, e, a, s) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var b = u.child;
        c = c.firstContext;
        t: for (; c !== null; ) {
          var C = c;
          c = u;
          for (var M = 0; M < e.length; M++)
            if (C.context === e[M]) {
              c.lanes |= a, C = c.alternate, C !== null && (C.lanes |= a), Kl(
                c.return,
                a,
                t
              ), s || (b = null);
              break t;
            }
          c = C.next;
        }
      } else if (u.tag === 18) {
        if (b = u.return, b === null) throw Error(r(341));
        b.lanes |= a, c = b.alternate, c !== null && (c.lanes |= a), Kl(b, a, t), b = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= a, b = u.alternate, b !== null && (b.lanes |= a), Kl(
          u.return,
          a,
          t
        ), b = u.child, b = b !== null ? b.sibling : null) : b = u.child;
      if (b !== null) b.return = u;
      else
        for (b = u; b !== null; ) {
          if (b === t) {
            b = null;
            break;
          }
          if (u = b.sibling, u !== null) {
            u.return = b.return, b = u;
            break;
          }
          b = b.return;
        }
      u = b;
    }
  }
  function no(t, e, a, s) {
    t = null;
    for (var u = e, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var b = u.alternate;
        if (b === null) throw Error(r(387));
        if (b = b.memoizedProps, b !== null) {
          var C = u.type;
          mn(u.pendingProps.value, b.value) || (t !== null ? t.push(C) : t = [C]);
        }
      } else if (u === Ya.current) {
        if (b = u.alternate, b === null) throw Error(r(387));
        b.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Es) : t = [Es]);
      }
      u = u.return;
    }
    return t !== null && Xf(
      e,
      t,
      a,
      s
    ), e.flags |= 262144, t !== null;
  }
  function Zl(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!mn(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function io(t) {
    eo = t, Bi = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Pe(t) {
    return Xy(eo, t);
  }
  function Ql(t, e) {
    return eo === null && io(t), Xy(t, e);
  }
  function Xy(t, e) {
    var a = e._currentValue;
    if (e = { context: e, memoizedValue: a, next: null }, Bi === null) {
      if (t === null) throw Error(r(308));
      Bi = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Bi = Bi.next = e;
    return a;
  }
  var Z_ = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(a, s) {
        t.push(s);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(a) {
        return a();
      });
    };
  }, Q_ = n.unstable_scheduleCallback, J_ = n.unstable_NormalPriority, ge = {
    $$typeof: ht,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function $f() {
    return {
      controller: new Z_(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function gr(t) {
    t.refCount--, t.refCount === 0 && Q_(J_, function() {
      t.controller.abort();
    });
  }
  function $y(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var a = t.transitionTypes;
      for (a === null && (a = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var s = e[t];
        a.indexOf(s) === -1 && a.push(s);
      }
    }
  }
  var yr = null;
  function W_(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var vr = null, Kf = 0, ao = 0, Wo = null;
  function tA(t, e) {
    if (vr === null) {
      var a = vr = [];
      Kf = 0, ao = fh(), Wo = {
        status: "pending",
        value: void 0,
        then: function(s) {
          a.push(s);
        }
      };
    }
    return Kf++, e.then(Ky, Ky), e;
  }
  function Ky() {
    if (--Kf === 0 && (yr = null, vr !== null)) {
      Wo !== null && (Wo.status = "fulfilled");
      var t = vr;
      vr = null, ao = 0, Wo = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function eA(t, e) {
    var a = [], s = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        a.push(u);
      }
    };
    return t.then(
      function() {
        s.status = "fulfilled", s.value = e;
        for (var u = 0; u < a.length; u++) (0, a[u])(e);
      },
      function(u) {
        for (s.status = "rejected", s.reason = u, u = 0; u < a.length; u++)
          (0, a[u])(void 0);
      }
    ), s;
  }
  var Zy = nt.S;
  nt.S = function(t, e) {
    if (q0 = Oe(), typeof e == "object" && e !== null && typeof e.then == "function" && tA(t, e), yr !== null)
      for (var a = ys; a !== null; )
        $y(a, yr), a = a.next;
    if (a = t.types, a !== null) {
      for (var s = ys; s !== null; )
        $y(s, a), s = s.next;
      if (ao !== 0) {
        s = yr, s === null && (s = yr = []);
        for (var u = 0; u < a.length; u++) {
          var c = a[u];
          s.indexOf(c) === -1 && s.push(c);
        }
      }
    }
    Zy !== null && Zy(t, e);
  };
  var oo = ce(null);
  function Zf() {
    var t = oo.current;
    return t !== null ? t : Wt.pooledCache;
  }
  function Jl(t, e) {
    e === null ? Bt(oo, oo.current) : Bt(oo, e.pool);
  }
  function Qy() {
    var t = Zf();
    return t === null ? null : { parent: ge._currentValue, pool: t };
  }
  var ts = Error(r(460)), Qf = Error(r(474)), Wl = Error(r(542)), tu = { then: function() {
  } };
  function Jy(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Wy(t, e, a) {
    switch (a = t[a], a === void 0 ? t.push(e) : a !== e && (e.then(li, li), e = a), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, ev(t), t === void 0 && !("reason" in e) ? Error(r(600)) : t;
      default:
        if (typeof e.status == "string") e.then(li, li);
        else {
          if (t = Wt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(s) {
              if (e.status === "pending") {
                var u = e;
                u.status = "fulfilled", u.value = s;
              }
            },
            function(s) {
              if (e.status === "pending") {
                var u = e;
                u.status = "rejected", u.reason = s;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, ev(t), t;
        }
        throw ro = e, ts;
    }
  }
  function so(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (ro = a, ts) : a;
    }
  }
  var ro = null;
  function tv() {
    if (ro === null) throw Error(r(459));
    var t = ro;
    return ro = null, t;
  }
  function ev(t) {
    if (t === ts || t === Wl)
      throw Error(r(483));
  }
  var es = null, br = 0;
  function eu(t) {
    var e = br;
    return br += 1, es === null && (es = []), Wy(es, t, e);
  }
  function ca(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function nu(t, e) {
    throw e.$$typeof === I ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function nv(t) {
    function e(B, j) {
      if (t) {
        var H = B.deletions;
        H === null ? (B.deletions = [j], B.flags |= 16) : H.push(j);
      }
    }
    function a(B, j) {
      if (!t) return null;
      for (; j !== null; )
        e(B, j), j = j.sibling;
      return null;
    }
    function s(B) {
      for (var j = /* @__PURE__ */ new Map(); B !== null; )
        B.key === null ? j.set(B.index, B) : j.set(B.key, B), B = B.sibling;
      return j;
    }
    function u(B, j) {
      return B = Li(B, j), B.index = 0, B.sibling = null, B;
    }
    function c(B, j, H) {
      return B.index = H, t ? (H = B.alternate, H !== null ? (H = H.index, H < j ? (B.flags |= 2, j) : H) : (B.flags |= 134217730, j)) : (B.flags |= 1048576, j);
    }
    function b(B) {
      return t && B.alternate === null && (B.flags |= 134217730), B;
    }
    function C(B, j, H, $) {
      return j === null || j.tag !== 6 ? (j = If(H, B.mode, $), j.return = B, j) : (j = u(j, H), j.return = B, j);
    }
    function M(B, j, H, $) {
      var dt = H.type;
      return dt === W ? (B = k(
        B,
        j,
        H.props.children,
        $,
        H.key
      ), ca(B, H), B) : j !== null && (j.elementType === dt || typeof dt == "object" && dt !== null && dt.$$typeof === lt && so(dt) === j.type) ? (j = u(j, H.props), ca(j, H), j.return = B, j) : (j = kl(
        H.type,
        H.key,
        H.props,
        null,
        B.mode,
        $
      ), ca(j, H), j.return = B, j);
    }
    function P(B, j, H, $) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== H.containerInfo || j.stateNode.implementation !== H.implementation ? (j = qf(H, B.mode, $), j.return = B, j) : (j = u(j, H.children || []), j.return = B, j);
    }
    function k(B, j, H, $, dt) {
      return j === null || j.tag !== 7 ? (j = Wa(
        H,
        B.mode,
        $,
        dt
      ), j.return = B, j) : (j = u(j, H), j.return = B, j);
    }
    function K(B, j, H) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return j = If(
          "" + j,
          B.mode,
          H
        ), j.return = B, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case F:
            return H = kl(
              j.type,
              j.key,
              j.props,
              null,
              B.mode,
              H
            ), ca(H, j), H.return = B, H;
          case Z:
            return j = qf(
              j,
              B.mode,
              H
            ), j.return = B, j;
          case lt:
            return j = so(j), K(B, j, H);
        }
        if (bt(j) || ut(j))
          return j = Wa(
            j,
            B.mode,
            H,
            null
          ), j.return = B, j;
        if (typeof j.then == "function")
          return K(B, eu(j), H);
        if (j.$$typeof === ht)
          return K(
            B,
            Ql(B, j),
            H
          );
        nu(B, j);
      }
      return null;
    }
    function L(B, j, H, $) {
      var dt = j !== null ? j.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return dt !== null ? null : C(B, j, "" + H, $);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case F:
            return H.key === dt ? M(B, j, H, $) : null;
          case Z:
            return H.key === dt ? P(B, j, H, $) : null;
          case lt:
            return H = so(H), L(B, j, H, $);
        }
        if (bt(H) || ut(H))
          return dt !== null ? null : k(B, j, H, $, null);
        if (typeof H.then == "function")
          return L(
            B,
            j,
            eu(H),
            $
          );
        if (H.$$typeof === ht)
          return L(
            B,
            j,
            Ql(B, H),
            $
          );
        nu(B, H);
      }
      return null;
    }
    function G(B, j, H, $, dt) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return B = B.get(H) || null, C(j, B, "" + $, dt);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case F:
            return B = B.get(
              $.key === null ? H : $.key
            ) || null, M(j, B, $, dt);
          case Z:
            return B = B.get(
              $.key === null ? H : $.key
            ) || null, P(j, B, $, dt);
          case lt:
            return $ = so($), G(
              B,
              j,
              H,
              $,
              dt
            );
        }
        if (bt($) || ut($))
          return B = B.get(H) || null, k(j, B, $, dt, null);
        if (typeof $.then == "function")
          return G(
            B,
            j,
            H,
            eu($),
            dt
          );
        if ($.$$typeof === ht)
          return G(
            B,
            j,
            H,
            Ql(j, $),
            dt
          );
        nu(j, $);
      }
      return null;
    }
    function ot(B, j, H, $) {
      for (var dt = null, Lt = null, vt = j, St = j = 0, be = null; vt !== null && St < H.length; St++) {
        vt.index > St ? (be = vt, vt = null) : be = vt.sibling;
        var Pt = L(
          B,
          vt,
          H[St],
          $
        );
        if (Pt === null) {
          vt === null && (vt = be);
          break;
        }
        t && vt && Pt.alternate === null && e(B, vt), j = c(Pt, j, St), Lt === null ? dt = Pt : Lt.sibling = Pt, Lt = Pt, vt = be;
      }
      if (St === H.length)
        return a(B, vt), Ot && Vi(B, St), dt;
      if (vt === null) {
        for (; St < H.length; St++)
          vt = K(B, H[St], $), vt !== null && (j = c(
            vt,
            j,
            St
          ), Lt === null ? dt = vt : Lt.sibling = vt, Lt = vt);
        return Ot && Vi(B, St), dt;
      }
      for (vt = s(vt); St < H.length; St++)
        be = G(
          vt,
          B,
          St,
          H[St],
          $
        ), be !== null && (t && (Pt = be.alternate, Pt !== null && vt.delete(Pt.key === null ? St : Pt.key)), j = c(
          be,
          j,
          St
        ), Lt === null ? dt = be : Lt.sibling = be, Lt = be);
      return t && vt.forEach(function(Oa) {
        return e(B, Oa);
      }), Ot && Vi(B, St), dt;
    }
    function mt(B, j, H, $) {
      if (H == null) throw Error(r(151));
      for (var dt = null, Lt = null, vt = j, St = j = 0, be = null, Pt = H.next(); vt !== null && !Pt.done; St++, Pt = H.next()) {
        vt.index > St ? (be = vt, vt = null) : be = vt.sibling;
        var Oa = L(B, vt, Pt.value, $);
        if (Oa === null) {
          vt === null && (vt = be);
          break;
        }
        t && vt && Oa.alternate === null && e(B, vt), j = c(Oa, j, St), Lt === null ? dt = Oa : Lt.sibling = Oa, Lt = Oa, vt = be;
      }
      if (Pt.done)
        return a(B, vt), Ot && Vi(B, St), dt;
      if (vt === null) {
        for (; !Pt.done; St++, Pt = H.next())
          Pt = K(B, Pt.value, $), Pt !== null && (j = c(Pt, j, St), Lt === null ? dt = Pt : Lt.sibling = Pt, Lt = Pt);
        return Ot && Vi(B, St), dt;
      }
      for (vt = s(vt); !Pt.done; St++, Pt = H.next())
        Pt = G(vt, B, St, Pt.value, $), Pt !== null && (t && (be = Pt.alternate, be !== null && vt.delete(
          be.key === null ? St : be.key
        )), j = c(Pt, j, St), Lt === null ? dt = Pt : Lt.sibling = Pt, Lt = Pt);
      return t && vt.forEach(function(LR) {
        return e(B, LR);
      }), Ot && Vi(B, St), dt;
    }
    function _t(B, j, H, $) {
      if (typeof H == "object" && H !== null && H.type === W && H.key === null && H.props.ref === void 0 && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case F:
            t: {
              for (var dt = H.key; j !== null; ) {
                if (j.key === dt) {
                  if (dt = H.type, dt === W) {
                    if (j.tag === 7) {
                      a(
                        B,
                        j.sibling
                      ), $ = u(
                        j,
                        H.props.children
                      ), ca($, H), $.return = B, B = $;
                      break t;
                    }
                  } else if (j.elementType === dt || typeof dt == "object" && dt !== null && dt.$$typeof === lt && so(dt) === j.type) {
                    a(
                      B,
                      j.sibling
                    ), $ = u(j, H.props), ca($, H), $.return = B, B = $;
                    break t;
                  }
                  a(B, j);
                  break;
                } else e(B, j);
                j = j.sibling;
              }
              H.type === W ? ($ = Wa(
                H.props.children,
                B.mode,
                $,
                H.key
              ), ca($, H), $.return = B, B = $) : ($ = kl(
                H.type,
                H.key,
                H.props,
                null,
                B.mode,
                $
              ), ca($, H), $.return = B, B = $);
            }
            return b(B);
          case Z:
            t: {
              for (dt = H.key; j !== null; ) {
                if (j.key === dt)
                  if (j.tag === 4 && j.stateNode.containerInfo === H.containerInfo && j.stateNode.implementation === H.implementation) {
                    a(
                      B,
                      j.sibling
                    ), $ = u(j, H.children || []), $.return = B, B = $;
                    break t;
                  } else {
                    a(B, j);
                    break;
                  }
                else e(B, j);
                j = j.sibling;
              }
              $ = qf(H, B.mode, $), $.return = B, B = $;
            }
            return b(B);
          case lt:
            return H = so(H), _t(
              B,
              j,
              H,
              $
            );
        }
        if (bt(H))
          return ot(
            B,
            j,
            H,
            $
          );
        if (ut(H)) {
          if (dt = ut(H), typeof dt != "function") throw Error(r(150));
          return H = dt.call(H), mt(
            B,
            j,
            H,
            $
          );
        }
        if (typeof H.then == "function")
          return _t(
            B,
            j,
            eu(H),
            $
          );
        if (H.$$typeof === ht)
          return _t(
            B,
            j,
            Ql(B, H),
            $
          );
        nu(B, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, j !== null && j.tag === 6 ? (a(B, j.sibling), $ = u(j, H), $.return = B, B = $) : (a(B, j), $ = If(H, B.mode, $), $.return = B, B = $), b(B)) : a(B, j);
    }
    return function(B, j, H, $) {
      try {
        br = 0;
        var dt = _t(
          B,
          j,
          H,
          $
        );
        return es = null, dt;
      } catch (vt) {
        if (vt === ts || vt === Wl) throw vt;
        var Lt = an(29, vt, null, B.mode);
        return Lt.lanes = $, Lt.return = B, Lt;
      }
    };
  }
  var lo = nv(!0), iv = nv(!1), fa = !1;
  function Jf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Wf(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function da(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ha(t, e, a) {
    var s = t.updateQueue;
    if (s === null) return null;
    if (s = s.shared, (Gt & 2) !== 0) {
      var u = s.pending;
      return u === null ? e.next = e : (e.next = u.next, u.next = e), s.pending = e, e = Yl(t), Hy(t, null, a), e;
    }
    return Gl(t, s, e, a), Yl(t);
  }
  function Sr(t, e, a) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (a & 4194048) !== 0)) {
      var s = e.lanes;
      s &= t.pendingLanes, a |= s, e.lanes = a, Yg(t, a);
    }
  }
  function td(t, e) {
    var a = t.updateQueue, s = t.alternate;
    if (s !== null && (s = s.updateQueue, a === s)) {
      var u = null, c = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var b = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          c === null ? u = c = b : c = c.next = b, a = a.next;
        } while (a !== null);
        c === null ? u = c = e : c = c.next = e;
      } else u = c = e;
      a = {
        baseState: s.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: s.shared,
        callbacks: s.callbacks
      }, t.updateQueue = a;
      return;
    }
    t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = e : t.next = e, a.lastBaseUpdate = e;
  }
  var ed = !1;
  function xr() {
    if (ed) {
      var t = Wo;
      if (t !== null) throw t;
    }
  }
  function Tr(t, e, a, s) {
    ed = !1;
    var u = t.updateQueue;
    fa = !1;
    var c = u.firstBaseUpdate, b = u.lastBaseUpdate, C = u.shared.pending;
    if (C !== null) {
      u.shared.pending = null;
      var M = C, P = M.next;
      M.next = null, b === null ? c = P : b.next = P, b = M;
      var k = t.alternate;
      k !== null && (k = k.updateQueue, C = k.lastBaseUpdate, C !== b && (C === null ? k.firstBaseUpdate = P : C.next = P, k.lastBaseUpdate = M));
    }
    if (c !== null) {
      var K = u.baseState;
      b = 0, k = P = M = null, C = c;
      do {
        var L = C.lane & -536870913, G = L !== C.lane;
        if (G ? (zt & L) === L : (s & L) === L) {
          L !== 0 && L === ao && (ed = !0), k !== null && (k = k.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          t: {
            var ot = t, mt = C;
            L = e;
            var _t = a;
            switch (mt.tag) {
              case 1:
                if (ot = mt.payload, typeof ot == "function") {
                  K = ot.call(_t, K, L);
                  break t;
                }
                K = ot;
                break t;
              case 3:
                ot.flags = ot.flags & -65537 | 128;
              case 0:
                if (ot = mt.payload, L = typeof ot == "function" ? ot.call(_t, K, L) : ot, L == null) break t;
                K = V({}, K, L);
                break t;
              case 2:
                fa = !0;
            }
          }
          L = C.callback, L !== null && (t.flags |= 64, G && (t.flags |= 8192), G = u.callbacks, G === null ? u.callbacks = [L] : G.push(L));
        } else
          G = {
            lane: L,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, k === null ? (P = k = G, M = K) : k = k.next = G, b |= L;
        if (C = C.next, C === null) {
          if (C = u.shared.pending, C === null)
            break;
          G = C, C = G.next, G.next = null, u.lastBaseUpdate = G, u.shared.pending = null;
        }
      } while (!0);
      k === null && (M = K), u.baseState = M, u.firstBaseUpdate = P, u.lastBaseUpdate = k, c === null && (u.shared.lanes = 0), Sa |= b, t.lanes = b, t.memoizedState = K;
    }
  }
  function av(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function ov(t, e) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++)
        av(a[t], e);
  }
  var ma = ce(null), iu = ce(0);
  function sv(t, e) {
    t = Gi, Bt(iu, t), Bt(ma, e), Gi = t | e.baseLanes;
  }
  function nd() {
    Bt(iu, Gi), Bt(ma, ma.current);
  }
  function id() {
    Gi = iu.current, Yt(ma), Yt(iu);
  }
  var Ue = ce(null), $e = null;
  function pa(t) {
    var e = t.alternate;
    Bt(He, He.current & 1), Bt(Ue, t), $e === null && (e === null || ma.current !== null || e.memoizedState !== null) && ($e = t);
  }
  function ad(t) {
    Bt(He, He.current), Bt(Ue, t), $e === null && ($e = t);
  }
  function rv(t) {
    t.tag === 22 ? (Bt(He, He.current), Bt(Ue, t), $e === null && ($e = t)) : ga();
  }
  function ga() {
    Bt(He, He.current), Bt(Ue, Ue.current);
  }
  function pn(t) {
    Yt(Ue), $e === t && ($e = null), Yt(He);
  }
  var He = ce(0);
  function Er(t, e) {
    Bt(Ue, Ue.current), Bt(He, e);
  }
  function od(t) {
    Yt(He), Yt(Ue), $e === t && ($e = null);
  }
  function au(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Ah(a) || Rh(a)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Ui = 0, wt = null, Zt = null, ye = null, ou = !1, ns = !1, uo = !1, su = 0, Cr = 0, is = null, nA = 0;
  function fe() {
    throw Error(r(321));
  }
  function sd(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++)
      if (!mn(t[a], e[a])) return !1;
    return !0;
  }
  function rd(t, e, a, s, u, c) {
    return Ui = c, wt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, nt.H = t === null || t.memoizedState === null ? Yv : kv, uo = !1, c = a(s, u), uo = !1, ns && (c = uv(
      e,
      a,
      s,
      u
    )), lv(t), c;
  }
  function lv(t) {
    nt.H = hu;
    var e = Zt !== null && Zt.next !== null;
    if (Ui = 0, ye = Zt = wt = null, ou = !1, Cr = 0, is = null, e) throw Error(r(300));
    t === null || ve || (t = t.dependencies, t !== null && Zl(t) && (ve = !0));
  }
  function uv(t, e, a, s) {
    wt = t;
    var u = 0;
    do {
      if (ns && (is = null), Cr = 0, ns = !1, 25 <= u) throw Error(r(301));
      if (u += 1, ye = Zt = null, t.updateQueue != null) {
        var c = t.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      nt.H = cA, c = e(a, s);
    } while (ns);
    return c;
  }
  function iA() {
    var t = nt.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? wr(e) : e, t = t.useState()[0], (Zt !== null ? Zt.memoizedState : null) !== t && (wt.flags |= 1024), e;
  }
  function ld() {
    var t = su !== 0;
    return su = 0, t;
  }
  function ud(t, e, a) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~a;
  }
  function cd(t) {
    if (ou) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      ou = !1;
    }
    Ui = 0, ye = Zt = wt = null, ns = !1, Cr = su = 0, is = null;
  }
  function Qe() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ye === null ? wt.memoizedState = ye = t : ye = ye.next = t, ye;
  }
  function pe() {
    if (Zt === null) {
      var t = wt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Zt.next;
    var e = ye === null ? wt.memoizedState : ye.next;
    if (e !== null)
      ye = e, Zt = t;
    else {
      if (t === null)
        throw wt.alternate === null ? Error(r(467)) : Error(r(310));
      Zt = t, t = {
        memoizedState: Zt.memoizedState,
        baseState: Zt.baseState,
        baseQueue: Zt.baseQueue,
        queue: Zt.queue,
        next: null
      }, ye === null ? wt.memoizedState = ye = t : ye = ye.next = t;
    }
    return ye;
  }
  function ru() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function wr(t) {
    var e = Cr;
    return Cr += 1, is === null && (is = []), t = Wy(is, t, e), e = wt, (ye === null ? e.memoizedState : ye.next) === null && (e = e.alternate, nt.H = e === null || e.memoizedState === null ? Yv : kv), t;
  }
  function lu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return wr(t);
      if (t.$$typeof === Q) return;
      if (t.$$typeof === ht) return Pe(t);
    }
    throw Error(r(438, String(t)));
  }
  function fd(t) {
    var e = null, a = wt.updateQueue;
    if (a !== null && (e = a.memoCache), e == null) {
      var s = wt.alternate;
      s !== null && (s = s.updateQueue, s !== null && (s = s.memoCache, s != null && (e = {
        data: s.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), a === null && (a = ru(), wt.updateQueue = a), a.memoCache = e, a = e.data[e.index], a === void 0)
      for (a = e.data[e.index] = Array(t), s = 0; s < t; s++)
        a[s] = te;
    return e.index++, a;
  }
  function Hi(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function uu(t) {
    var e = pe();
    return dd(e, Zt, t);
  }
  function dd(t, e, a) {
    var s = t.queue;
    if (s === null) throw Error(r(311));
    s.lastRenderedReducer = a;
    var u = t.baseQueue, c = s.pending;
    if (c !== null) {
      if (u !== null) {
        var b = u.next;
        u.next = c.next, c.next = b;
      }
      e.baseQueue = u = c, s.pending = null;
    }
    if (c = t.baseState, u === null) t.memoizedState = c;
    else {
      e = u.next;
      var C = b = null, M = null, P = e, k = !1;
      do {
        var K = P.lane & -536870913;
        if (K !== P.lane ? (zt & K) === K : (Ui & K) === K) {
          var L = P.revertLane;
          if (L === 0)
            M !== null && (M = M.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }), K === ao && (k = !0);
          else if ((Ui & L) === L) {
            P = P.next, L === ao && (k = !0);
            continue;
          } else
            K = {
              lane: 0,
              revertLane: P.revertLane,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }, M === null ? (C = M = K, b = c) : M = M.next = K, wt.lanes |= L, Sa |= L;
          K = P.action, uo && a(c, K), c = P.hasEagerState ? P.eagerState : a(c, K);
        } else
          L = {
            lane: K,
            revertLane: P.revertLane,
            gesture: P.gesture,
            action: P.action,
            hasEagerState: P.hasEagerState,
            eagerState: P.eagerState,
            next: null
          }, M === null ? (C = M = L, b = c) : M = M.next = L, wt.lanes |= K, Sa |= K;
        P = P.next;
      } while (P !== null && P !== e);
      if (M === null ? b = c : M.next = C, !mn(c, t.memoizedState) && (ve = !0, k && (a = Wo, a !== null)))
        throw a;
      t.memoizedState = c, t.baseState = b, t.baseQueue = M, s.lastRenderedState = c;
    }
    return u === null && (s.lanes = 0), [t.memoizedState, s.dispatch];
  }
  function hd(t) {
    var e = pe(), a = e.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = t;
    var s = a.dispatch, u = a.pending, c = e.memoizedState;
    if (u !== null) {
      a.pending = null;
      var b = u = u.next;
      do
        c = t(c, b.action), b = b.next;
      while (b !== u);
      mn(c, e.memoizedState) || (ve = !0), e.memoizedState = c, e.baseQueue === null && (e.baseState = c), a.lastRenderedState = c;
    }
    return [c, s];
  }
  function cv(t, e, a) {
    var s = wt, u = pe(), c = Ot;
    if (c) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = e();
    var b = !mn(
      (Zt || u).memoizedState,
      a
    );
    if (b && (u.memoizedState = a, ve = !0), u = u.queue, gd(hv.bind(null, s, u, t), [
      t
    ]), t = u.getSnapshot !== e || b || ye !== null && (ye.memoizedState.tag & 1) !== 0, as(
      t ? 9 : 8,
      { destroy: void 0 },
      dv.bind(null, s, u, a, e),
      null
    ), t) {
      if (s.flags |= 2048, Wt === null) throw Error(r(349));
      c || (Ui & 127) !== 0 || fv(s, e, a);
    }
    return a;
  }
  function fv(t, e, a) {
    t.flags |= 16384, t = { getSnapshot: e, value: a }, e = wt.updateQueue, e === null ? (e = ru(), wt.updateQueue = e, e.stores = [t]) : (a = e.stores, a === null ? e.stores = [t] : a.push(t));
  }
  function dv(t, e, a, s) {
    e.value = a, e.getSnapshot = s, mv(e) && pv(t);
  }
  function hv(t, e, a) {
    return a(function() {
      mv(e) && pv(t);
    });
  }
  function mv(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !mn(t, a);
    } catch {
      return !0;
    }
  }
  function pv(t) {
    var e = Ja(t, 2);
    e !== null && ln(e, t, 2);
  }
  function md(t) {
    var e = Qe();
    if (typeof t == "function") {
      var a = t;
      if (t = a(), uo) {
        ia(!0);
        try {
          a();
        } finally {
          ia(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Hi,
      lastRenderedState: t
    }, e;
  }
  function gv(t, e, a, s) {
    return t.baseState = a, dd(
      t,
      Zt,
      typeof s == "function" ? s : Hi
    );
  }
  function aA(t, e, a, s, u) {
    if (du(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var c = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(b) {
          c.listeners.push(b);
        }
      };
      nt.T !== null ? a(!0) : c.isTransition = !1, s(c), a = e.pending, a === null ? (c.next = e.pending = c, yv(e, c)) : (c.next = a.next, e.pending = a.next = c);
    }
  }
  function yv(t, e) {
    var a = e.action, s = e.payload, u = t.state;
    if (e.isTransition) {
      var c = nt.T, b = {};
      b.types = c !== null ? c.types : null, nt.T = b;
      try {
        var C = a(u, s), M = nt.S;
        M !== null && M(b, C), vv(t, e, C);
      } catch (P) {
        pd(t, e, P);
      } finally {
        c !== null && b.types !== null && (c.types = b.types), nt.T = c;
      }
    } else
      try {
        c = a(u, s), vv(t, e, c);
      } catch (P) {
        pd(t, e, P);
      }
  }
  function vv(t, e, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(s) {
        bv(t, e, s);
      },
      function(s) {
        return pd(t, e, s);
      }
    ) : bv(t, e, a);
  }
  function bv(t, e, a) {
    e.status = "fulfilled", e.value = a, Sv(e), t.state = a, e = t.pending, e !== null && (a = e.next, a === e ? t.pending = null : (a = a.next, e.next = a, yv(t, a)));
  }
  function pd(t, e, a) {
    var s = t.pending;
    if (t.pending = null, s !== null) {
      s = s.next;
      do
        e.status = "rejected", e.reason = a, Sv(e), e = e.next;
      while (e !== s);
    }
    t.action = null;
  }
  function Sv(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function xv(t, e) {
    return e;
  }
  function Tv(t, e) {
    if (Ot) {
      var a = Wt.formState;
      if (a !== null) {
        t: {
          var s = wt;
          if (Ot) {
            if (ee) {
              e: {
                for (var u = ee, c = Nn; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break e;
                  }
                  if (u = zn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                c = u.data, u = c === "F!" || c === "F" ? u : null;
              }
              if (u) {
                ee = zn(
                  u.nextSibling
                ), s = u.data === "F!";
                break t;
              }
            }
            la(s);
          }
          s = !1;
        }
        s && (e = a[0]);
      }
    }
    return a = Qe(), a.memoizedState = a.baseState = e, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xv,
      lastRenderedState: e
    }, a.queue = s, a = Iv.bind(
      null,
      wt,
      s
    ), s.dispatch = a, s = md(!1), c = xd.bind(
      null,
      wt,
      !1,
      s.queue
    ), s = Qe(), u = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, s.queue = u, a = aA.bind(
      null,
      wt,
      u,
      c,
      a
    ), u.dispatch = a, s.memoizedState = t, [e, a, !1];
  }
  function Ev(t) {
    var e = pe();
    return Cv(e, Zt, t);
  }
  function Cv(t, e, a) {
    if (e = dd(
      t,
      e,
      xv
    )[0], t = uu(Hi)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var s = wr(e);
      } catch (b) {
        throw b === ts ? Wl : b;
      }
    else s = e;
    e = pe();
    var u = e.queue, c = u.dispatch;
    return a !== e.memoizedState && (wt.flags |= 2048, as(
      9,
      { destroy: void 0 },
      oA.bind(null, u, a),
      null
    )), [s, c, t];
  }
  function oA(t, e) {
    t.action = e;
  }
  function wv(t) {
    var e = pe(), a = Zt;
    if (a !== null)
      return Cv(e, a, t);
    pe(), e = e.memoizedState, a = pe();
    var s = a.queue.dispatch;
    return a.memoizedState = t, [e, s, !1];
  }
  function as(t, e, a, s) {
    return t = { tag: t, create: a, deps: s, inst: e, next: null }, e = wt.updateQueue, e === null && (e = ru(), wt.updateQueue = e), a = e.lastEffect, a === null ? e.lastEffect = t.next = t : (s = a.next, a.next = t, t.next = s, e.lastEffect = t), t;
  }
  function _v() {
    return pe().memoizedState;
  }
  function cu(t, e, a, s) {
    var u = Qe();
    wt.flags |= t, u.memoizedState = as(
      1 | e,
      { destroy: void 0 },
      a,
      s === void 0 ? null : s
    );
  }
  function fu(t, e, a, s) {
    var u = pe();
    s = s === void 0 ? null : s;
    var c = u.memoizedState.inst;
    Zt !== null && s !== null && sd(s, Zt.memoizedState.deps) ? u.memoizedState = as(e, c, a, s) : (wt.flags |= t, u.memoizedState = as(
      1 | e,
      c,
      a,
      s
    ));
  }
  function Av(t, e) {
    cu(8390656, 8, t, e);
  }
  function gd(t, e) {
    fu(2048, 8, t, e);
  }
  function sA(t) {
    wt.flags |= 4;
    var e = wt.updateQueue;
    if (e === null)
      e = ru(), wt.updateQueue = e, e.events = [t];
    else {
      var a = e.events;
      a === null ? e.events = [t] : a.push(t);
    }
  }
  function Rv(t) {
    var e = pe().memoizedState;
    return sA({ ref: e, nextImpl: t }), function() {
      if ((Gt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Ov(t, e) {
    return fu(4, 2, t, e);
  }
  function Dv(t, e) {
    return fu(4, 4, t, e);
  }
  function Mv(t, e) {
    if (typeof e == "function") {
      t = t();
      var a = e(t);
      return function() {
        typeof a == "function" ? a() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Nv(t, e, a) {
    a = a != null ? a.concat([t]) : null, fu(4, 4, Mv.bind(null, e, t), a);
  }
  function yd() {
  }
  function jv(t, e) {
    var a = pe();
    e = e === void 0 ? null : e;
    var s = a.memoizedState;
    return e !== null && sd(e, s[1]) ? s[0] : (a.memoizedState = [t, e], t);
  }
  function zv(t, e) {
    var a = pe();
    e = e === void 0 ? null : e;
    var s = a.memoizedState;
    if (e !== null && sd(e, s[1]))
      return s[0];
    if (s = t(), uo) {
      ia(!0);
      try {
        t();
      } finally {
        ia(!1);
      }
    }
    return a.memoizedState = [s, e], s;
  }
  function vd(t, e, a) {
    return a === void 0 || (Ui & 1073741824) !== 0 && (zt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = a, t = Y0(), wt.lanes |= t, Sa |= t, a);
  }
  function Lv(t, e, a, s) {
    return mn(a, e) ? a : ma.current !== null ? (t = vd(t, a, s), mn(t, e) || (ve = !0), t) : (Ui & 106) === 0 || (Ui & 1073741824) !== 0 && (zt & 261930) === 0 ? (ve = !0, t.memoizedState = a) : (t = Y0(), wt.lanes |= t, Sa |= t, e);
  }
  function Vv(t, e, a, s, u) {
    var c = at.p;
    at.p = c !== 0 && 8 > c ? c : 8;
    var b = nt.T, C = {};
    C.types = b !== null ? b.types : null, nt.T = C, xd(t, !1, e, a);
    try {
      var M = u(), P = nt.S;
      if (P !== null && P(C, M), M !== null && typeof M == "object" && typeof M.then == "function") {
        var k = eA(
          M,
          s
        );
        _r(
          t,
          e,
          k,
          bn(t)
        );
      } else
        _r(
          t,
          e,
          s,
          bn(t)
        );
    } catch (K) {
      _r(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: K },
        bn()
      );
    } finally {
      at.p = c, b !== null && C.types !== null && (b.types = C.types), nt.T = b;
    }
  }
  function rA() {
  }
  function bd(t, e, a, s) {
    if (t.tag !== 5) throw Error(r(476));
    var u = Bv(t).queue;
    Vv(
      t,
      u,
      e,
      Vt,
      a === null ? rA : function() {
        return Pv(t), a(s);
      }
    );
  }
  function Bv(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Vt,
      baseState: Vt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hi,
        lastRenderedState: Vt
      },
      next: null
    };
    var a = {};
    return e.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hi,
        lastRenderedState: a
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Pv(t) {
    var e = Bv(t);
    e.next === null && (e = t.alternate.memoizedState), _r(
      t,
      e.next.queue,
      {},
      bn()
    );
  }
  function Sd() {
    return Pe(Es);
  }
  function Uv() {
    return pe().memoizedState;
  }
  function Hv() {
    return pe().memoizedState;
  }
  function lA(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = bn();
          t = da(a);
          var s = ha(e, t, a);
          s !== null && (ln(s, e, a), Sr(s, e, a)), e = { cache: $f() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function uA(t, e, a) {
    var s = bn();
    a = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, du(t) ? qv(e, a) : (a = Uf(t, e, a, s), a !== null && (ln(a, t, s), Gv(a, e, s)));
  }
  function Iv(t, e, a) {
    var s = bn();
    _r(t, e, a, s);
  }
  function _r(t, e, a, s) {
    var u = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (du(t)) qv(e, u);
    else {
      var c = t.alternate;
      if (t.lanes === 0 && (c === null || c.lanes === 0) && (c = e.lastRenderedReducer, c !== null))
        try {
          var b = e.lastRenderedState, C = c(b, a);
          if (u.hasEagerState = !0, u.eagerState = C, mn(C, b))
            return Gl(t, e, u, 0), Wt === null && ql(), !1;
        } catch {
        }
      if (a = Uf(t, e, u, s), a !== null)
        return ln(a, t, s), Gv(a, e, s), !0;
    }
    return !1;
  }
  function xd(t, e, a, s) {
    if (s = {
      lane: 2,
      revertLane: fh(),
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, du(t)) {
      if (e) throw Error(r(479));
    } else
      e = Uf(
        t,
        a,
        s,
        2
      ), e !== null && ln(e, t, 2);
  }
  function du(t) {
    var e = t.alternate;
    return t === wt || e !== null && e === wt;
  }
  function qv(t, e) {
    ns = ou = !0;
    var a = t.pending;
    a === null ? e.next = e : (e.next = a.next, a.next = e), t.pending = e;
  }
  function Gv(t, e, a) {
    if ((a & 4194048) !== 0) {
      var s = e.lanes;
      s &= t.pendingLanes, a |= s, e.lanes = a, Yg(t, a);
    }
  }
  var hu = {
    readContext: Pe,
    use: lu,
    useCallback: fe,
    useContext: fe,
    useEffect: fe,
    useImperativeHandle: fe,
    useLayoutEffect: fe,
    useInsertionEffect: fe,
    useMemo: fe,
    useReducer: fe,
    useRef: fe,
    useState: fe,
    useDebugValue: fe,
    useDeferredValue: fe,
    useTransition: fe,
    useSyncExternalStore: fe,
    useId: fe,
    useHostTransitionStatus: fe,
    useFormState: fe,
    useActionState: fe,
    useOptimistic: fe,
    useMemoCache: fe,
    useCacheRefresh: fe,
    useEffectEvent: fe
  }, Yv = {
    readContext: Pe,
    use: lu,
    useCallback: function(t, e) {
      return Qe().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Pe,
    useEffect: Av,
    useImperativeHandle: function(t, e, a) {
      a = a != null ? a.concat([t]) : null, cu(
        4194308,
        4,
        Mv.bind(null, e, t),
        a
      );
    },
    useLayoutEffect: function(t, e) {
      return cu(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      cu(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var a = Qe();
      e = e === void 0 ? null : e;
      var s = t();
      if (uo) {
        ia(!0);
        try {
          t();
        } finally {
          ia(!1);
        }
      }
      return a.memoizedState = [s, e], s;
    },
    useReducer: function(t, e, a) {
      var s = Qe();
      if (a !== void 0) {
        var u = a(e);
        if (uo) {
          ia(!0);
          try {
            a(e);
          } finally {
            ia(!1);
          }
        }
      } else u = e;
      return s.memoizedState = s.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, s.queue = t, t = t.dispatch = uA.bind(
        null,
        wt,
        t
      ), [s.memoizedState, t];
    },
    useRef: function(t) {
      var e = Qe();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = md(t);
      var e = t.queue, a = Iv.bind(null, wt, e);
      return e.dispatch = a, [t.memoizedState, a];
    },
    useDebugValue: yd,
    useDeferredValue: function(t, e) {
      var a = Qe();
      return vd(a, t, e);
    },
    useTransition: function() {
      var t = md(!1);
      return t = Vv.bind(
        null,
        wt,
        t.queue,
        !0,
        !1
      ), Qe().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, a) {
      var s = wt, u = Qe();
      if (Ot) {
        if (a === void 0)
          throw Error(r(407));
        a = a();
      } else {
        if (a = e(), Wt === null)
          throw Error(r(349));
        (zt & 127) !== 0 || fv(s, e, a);
      }
      u.memoizedState = a;
      var c = { value: a, getSnapshot: e };
      return u.queue = c, Av(hv.bind(null, s, c, t), [
        t
      ]), s.flags |= 2048, as(
        9,
        { destroy: void 0 },
        dv.bind(
          null,
          s,
          c,
          a,
          e
        ),
        null
      ), a;
    },
    useId: function() {
      var t = Qe(), e = Wt.identifierPrefix;
      if (Ot) {
        var a = ci, s = ui;
        a = (s & ~(1 << 32 - dn(s) - 1)).toString(32) + a, e = "_" + e + "R_" + a, a = su++, 0 < a && (e += "H" + a.toString(32)), e += "_";
      } else
        a = nA++, e = "_" + e + "r_" + a.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Sd,
    useFormState: Tv,
    useActionState: Tv,
    useOptimistic: function(t) {
      var e = Qe();
      e.memoizedState = e.baseState = t;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = a, e = xd.bind(
        null,
        wt,
        !0,
        a
      ), a.dispatch = e, [t, e];
    },
    useMemoCache: fd,
    useCacheRefresh: function() {
      return Qe().memoizedState = lA.bind(
        null,
        wt
      );
    },
    useEffectEvent: function(t) {
      var e = Qe(), a = { impl: t };
      return e.memoizedState = a, function() {
        if ((Gt & 2) !== 0)
          throw Error(r(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, kv = {
    readContext: Pe,
    use: lu,
    useCallback: jv,
    useContext: Pe,
    useEffect: gd,
    useImperativeHandle: Nv,
    useInsertionEffect: Ov,
    useLayoutEffect: Dv,
    useMemo: zv,
    useReducer: uu,
    useRef: _v,
    useState: function() {
      return uu(Hi);
    },
    useDebugValue: yd,
    useDeferredValue: function(t, e) {
      var a = pe();
      return Lv(
        a,
        Zt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = uu(Hi)[0], e = pe().memoizedState;
      return [
        typeof t == "boolean" ? t : wr(t),
        e
      ];
    },
    useSyncExternalStore: cv,
    useId: Uv,
    useHostTransitionStatus: Sd,
    useFormState: Ev,
    useActionState: Ev,
    useOptimistic: function(t, e) {
      var a = pe();
      return gv(a, Zt, t, e);
    },
    useMemoCache: fd,
    useCacheRefresh: Hv,
    useEffectEvent: Rv
  }, cA = {
    readContext: Pe,
    use: lu,
    useCallback: jv,
    useContext: Pe,
    useEffect: gd,
    useImperativeHandle: Nv,
    useInsertionEffect: Ov,
    useLayoutEffect: Dv,
    useMemo: zv,
    useReducer: hd,
    useRef: _v,
    useState: function() {
      return hd(Hi);
    },
    useDebugValue: yd,
    useDeferredValue: function(t, e) {
      var a = pe();
      return Zt === null ? vd(a, t, e) : Lv(
        a,
        Zt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = hd(Hi)[0], e = pe().memoizedState;
      return [
        typeof t == "boolean" ? t : wr(t),
        e
      ];
    },
    useSyncExternalStore: cv,
    useId: Uv,
    useHostTransitionStatus: Sd,
    useFormState: wv,
    useActionState: wv,
    useOptimistic: function(t, e) {
      var a = pe();
      return Zt !== null ? gv(a, Zt, t, e) : (a.baseState = t, [t, a.queue.dispatch]);
    },
    useMemoCache: fd,
    useCacheRefresh: Hv,
    useEffectEvent: Rv
  };
  function Td(t, e, a, s) {
    e = t.memoizedState, a = a(s, e), a = a == null ? e : V({}, e, a), t.memoizedState = a, t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var Ed = {
    enqueueSetState: function(t, e, a) {
      t = t._reactInternals;
      var s = bn(), u = da(s);
      u.payload = e, a != null && (u.callback = a), e = ha(t, u, s), e !== null && (ln(e, t, s), Sr(e, t, s));
    },
    enqueueReplaceState: function(t, e, a) {
      t = t._reactInternals;
      var s = bn(), u = da(s);
      u.tag = 1, u.payload = e, a != null && (u.callback = a), e = ha(t, u, s), e !== null && (ln(e, t, s), Sr(e, t, s));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var a = bn(), s = da(a);
      s.tag = 2, e != null && (s.callback = e), e = ha(t, s, a), e !== null && (ln(e, t, a), Sr(e, t, a));
    }
  };
  function Fv(t, e, a, s, u, c, b) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(s, c, b) : e.prototype && e.prototype.isPureReactComponent ? !dr(a, s) || !dr(u, c) : !0;
  }
  function Xv(t, e, a, s) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(a, s), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(a, s), e.state !== t && Ed.enqueueReplaceState(e, e.state, null);
  }
  function co(t, e) {
    var a = e;
    if ("ref" in e) {
      a = {};
      for (var s in e)
        s !== "ref" && (a[s] = e[s]);
    }
    if (t = t.defaultProps) {
      a === e && (a = V({}, a));
      for (var u in t)
        a[u] === void 0 && (a[u] = t[u]);
    }
    return a;
  }
  function $v(t) {
    Il(t);
  }
  function Kv(t) {
    console.error(t);
  }
  function Zv(t) {
    Il(t);
  }
  function mu(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Qv(t, e, a) {
    try {
      var s = t.onCaughtError;
      s(a.value, {
        componentStack: a.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Cd(t, e, a) {
    return a = da(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      mu(t, e);
    }, a;
  }
  function Jv(t) {
    return t = da(t), t.tag = 3, t;
  }
  function Wv(t, e, a, s) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = s.value;
      t.payload = function() {
        return u(c);
      }, t.callback = function() {
        Qv(e, a, s);
      };
    }
    var b = a.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (t.callback = function() {
      Qv(e, a, s), typeof u != "function" && (xa === null ? xa = /* @__PURE__ */ new Set([this]) : xa.add(this));
      var C = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function fA(t, e, a, s, u) {
    if (a.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (e = a.alternate, e !== null && no(
        e,
        a,
        u,
        !0
      ), a = Ue.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
          case 19:
            return $e === null ? Lu() : a.alternate === null && de === 0 && (de = 3), a.flags &= -257, a.flags |= 65536, a.lanes = u, s === tu ? a.flags |= 16384 : (e = a.updateQueue, e === null ? a.updateQueue = /* @__PURE__ */ new Set([s]) : e.add(s), lh(t, s, u)), !1;
          case 22:
            return a.flags |= 65536, s === tu ? a.flags |= 16384 : (e = a.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, a.updateQueue = e) : (a = e.retryQueue, a === null ? e.retryQueue = /* @__PURE__ */ new Set([s]) : a.add(s)), lh(t, s, u)), !1;
        }
        throw Error(r(435, a.tag));
      }
      return lh(t, s, u), Lu(), !1;
    }
    if (Ot)
      return e = Ue.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = u, s !== Yf && (t = Error(r(422), { cause: s }), pr(On(t, a)))) : (s !== Yf && (e = Error(r(423), {
        cause: s
      }), pr(
        On(e, a)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, s = On(s, a), u = Cd(
        t.stateNode,
        s,
        u
      ), td(t, u), de !== 4 && (de = 2)), !1;
    var c = Error(r(520), { cause: s });
    if (c = On(c, a), zr === null ? zr = [c] : zr.push(c), de !== 4 && (de = 2), e === null) return !0;
    s = On(s, a), a = e;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, t = u & -u, a.lanes |= t, t = Cd(a.stateNode, s, t), td(a, t), !1;
        case 1:
          if (e = a.type, c = a.stateNode, (a.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (xa === null || !xa.has(c))))
            return a.flags |= 65536, u &= -u, a.lanes |= u, u = Jv(u), Wv(
              u,
              t,
              a,
              s
            ), td(a, u), !1;
          break;
        case 22:
          if (a.memoizedState !== null)
            return a.flags |= 65536, !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var wd = Error(r(461)), ve = !1;
  function Ae(t, e, a, s) {
    e.child = t === null ? iv(e, null, a, s) : lo(
      e,
      t.child,
      a,
      s
    );
  }
  function t0(t, e, a, s, u) {
    a = a.render;
    var c = e.ref;
    if ("ref" in s) {
      var b = {};
      for (var C in s)
        C !== "ref" && (b[C] = s[C]);
    } else b = s;
    return io(e), s = rd(
      t,
      e,
      a,
      b,
      c,
      u
    ), C = ld(), t !== null && !ve ? (ud(t, e, u), Ii(t, e, u)) : (Ot && C && Xl(e), e.flags |= 1, Ae(t, e, s, u), e.child);
  }
  function e0(t, e, a, s, u) {
    if (t === null) {
      var c = a.type;
      return typeof c == "function" && !Hf(c) && c.defaultProps === void 0 && a.compare === null ? (e.tag = 15, e.type = c, n0(
        t,
        e,
        c,
        s,
        u
      )) : (t = kl(
        a.type,
        null,
        s,
        e,
        e.mode,
        u
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (c = t.child, !jd(t, u)) {
      var b = c.memoizedProps;
      if (a = a.compare, a = a !== null ? a : dr, a(b, s) && t.ref === e.ref)
        return Ii(t, e, u);
    }
    return e.flags |= 1, t = Li(c, s), t.ref = e.ref, t.return = e, e.child = t;
  }
  function n0(t, e, a, s, u) {
    if (t !== null) {
      var c = t.memoizedProps;
      if (dr(c, s) && t.ref === e.ref)
        if (ve = !1, e.pendingProps = s = c, jd(t, u))
          (t.flags & 131072) !== 0 && (ve = !0);
        else
          return e.lanes = t.lanes, Ii(t, e, u);
    }
    return _d(
      t,
      e,
      a,
      s,
      u
    );
  }
  function i0(t, e, a, s) {
    var u = s.children, c = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), s.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | a : a, t !== null) {
          for (s = e.child = t.child, u = 0; s !== null; )
            u = u | s.lanes | s.childLanes, s = s.sibling;
          s = u & ~c;
        } else s = 0, e.child = null;
        return a0(
          t,
          e,
          c,
          a,
          s
        );
      }
      if ((a & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Jl(
          e,
          c !== null ? c.cachePool : null
        ), c !== null ? sv(e, c) : nd(), rv(e);
      else
        return s = e.lanes = 536870912, a0(
          t,
          e,
          c !== null ? c.baseLanes | a : a,
          a,
          s
        );
    } else
      c !== null ? (Jl(e, c.cachePool), sv(e, c), ga(), e.memoizedState = null) : (t !== null && Jl(e, null), nd(), ga());
    return Ae(t, e, u, a), e.child;
  }
  function Ar(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function a0(t, e, a, s, u) {
    var c = Zf();
    return c = c === null ? null : { parent: ge._currentValue, pool: c }, e.memoizedState = {
      baseLanes: a,
      cachePool: c
    }, t !== null && Jl(e, null), nd(), rv(e), t !== null && no(t, e, s, !0), e.childLanes = u, null;
  }
  function pu(t, e) {
    return e = gu(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function o0(t, e, a) {
    return lo(e, t.child, null, a), t = pu(e, e.pendingProps), t.flags |= 2, pn(e), e.memoizedState = null, t;
  }
  function dA(t, e, a) {
    var s = e.pendingProps, u = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (Ot) {
        if (s.mode === "hidden")
          return t = pu(e, s), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Ar(null, t);
        if (ad(e), (t = ee) ? (t = Mb(
          t,
          Nn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: sa !== null ? { id: ui, overflow: ci } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = qy(t), a.return = e, e.child = a, Me = e, ee = null)) : t = null, t === null) throw la(e);
        return e.lanes = 536870912, null;
      }
      return pu(e, s);
    }
    var c = t.memoizedState;
    if (c !== null) {
      var b = c.dehydrated;
      if (ad(e), u)
        if (e.flags & 256)
          e.flags &= -257, e = o0(
            t,
            e,
            a
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (ve || no(t, e, a, !1), u = (a & t.childLanes) !== 0, ve || u) {
        if (ma.current === null) {
          if (s = Wt, s !== null && (b = kg(s, a), b !== 0 && b !== c.retryLane))
            throw c.retryLane = b, Ja(t, b), ln(s, t, b), wd;
          Lu();
        }
        e = o0(
          t,
          e,
          a
        );
      } else
        t = c.treeContext, ee = zn(b.nextSibling), Me = e, Ot = !0, ra = null, Nn = !1, t !== null && ky(e, t), e = pu(e, s), e.flags |= 134221824;
      return e;
    }
    return t = Li(t.child, {
      mode: s.mode,
      children: s.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function os(t, e) {
    var a = e.ref;
    if (a === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(r(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function _d(t, e, a, s, u) {
    return io(e), a = rd(
      t,
      e,
      a,
      s,
      void 0,
      u
    ), s = ld(), t !== null && !ve ? (ud(t, e, u), Ii(t, e, u)) : (Ot && s && Xl(e), e.flags |= 1, Ae(t, e, a, u), e.child);
  }
  function s0(t, e, a, s, u, c) {
    return io(e), e.updateQueue = null, a = uv(
      e,
      s,
      a,
      u
    ), lv(t), s = ld(), t !== null && !ve ? (ud(t, e, c), Ii(t, e, c)) : (Ot && s && Xl(e), e.flags |= 1, Ae(t, e, a, c), e.child);
  }
  function r0(t, e, a, s, u) {
    if (io(e), e.stateNode === null) {
      var c = Ko, b = a.contextType;
      typeof b == "object" && b !== null && (c = Pe(b)), c = new a(s, c), e.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = Ed, e.stateNode = c, c._reactInternals = e, c = e.stateNode, c.props = s, c.state = e.memoizedState, c.refs = {}, Jf(e), b = a.contextType, c.context = typeof b == "object" && b !== null ? Pe(b) : Ko, c.state = e.memoizedState, b = a.getDerivedStateFromProps, typeof b == "function" && (Td(
        e,
        a,
        b,
        s
      ), c.state = e.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (b = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), b !== c.state && Ed.enqueueReplaceState(c, c.state, null), Tr(e, s, c, u), xr(), c.state = e.memoizedState), typeof c.componentDidMount == "function" && (e.flags |= 4194308), s = !0;
    } else if (t === null) {
      c = e.stateNode;
      var C = e.memoizedProps, M = co(a, C);
      c.props = M;
      var P = c.context, k = a.contextType;
      b = Ko, typeof k == "object" && k !== null && (b = Pe(k));
      var K = a.getDerivedStateFromProps;
      k = typeof K == "function" || typeof c.getSnapshotBeforeUpdate == "function", C = e.pendingProps !== C, k || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (C || P !== b) && Xv(
        e,
        c,
        s,
        b
      ), fa = !1;
      var L = e.memoizedState;
      c.state = L, Tr(e, s, c, u), xr(), P = e.memoizedState, C || L !== P || fa ? (typeof K == "function" && (Td(
        e,
        a,
        K,
        s
      ), P = e.memoizedState), (M = fa || Fv(
        e,
        a,
        M,
        s,
        L,
        P,
        b
      )) ? (k || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = s, e.memoizedState = P), c.props = s, c.state = P, c.context = b, s = M) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), s = !1);
    } else {
      c = e.stateNode, Wf(t, e), b = e.memoizedProps, k = co(a, b), c.props = k, K = e.pendingProps, L = c.context, P = a.contextType, M = Ko, typeof P == "object" && P !== null && (M = Pe(P)), C = a.getDerivedStateFromProps, (P = typeof C == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (b !== K || L !== M) && Xv(
        e,
        c,
        s,
        M
      ), fa = !1, L = e.memoizedState, c.state = L, Tr(e, s, c, u), xr();
      var G = e.memoizedState;
      b !== K || L !== G || fa || t !== null && t.dependencies !== null && Zl(t.dependencies) ? (typeof C == "function" && (Td(
        e,
        a,
        C,
        s
      ), G = e.memoizedState), (k = fa || Fv(
        e,
        a,
        k,
        s,
        L,
        G,
        M
      ) || t !== null && t.dependencies !== null && Zl(t.dependencies)) ? (P || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(s, G, M), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        s,
        G,
        M
      )), typeof c.componentDidUpdate == "function" && (e.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || b === t.memoizedProps && L === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || b === t.memoizedProps && L === t.memoizedState || (e.flags |= 1024), e.memoizedProps = s, e.memoizedState = G), c.props = s, c.state = G, c.context = M, s = k) : (typeof c.componentDidUpdate != "function" || b === t.memoizedProps && L === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || b === t.memoizedProps && L === t.memoizedState || (e.flags |= 1024), s = !1);
    }
    return c = s, os(t, e), s = (e.flags & 128) !== 0, c || s ? (c = e.stateNode, a = s && typeof a.getDerivedStateFromError != "function" ? null : c.render(), e.flags |= 1, t !== null && s ? (e.child = lo(
      e,
      t.child,
      null,
      u
    ), e.child = lo(
      e,
      null,
      a,
      u
    )) : Ae(t, e, a, u), e.memoizedState = c.state, t = e.child) : t = Ii(
      t,
      e,
      u
    ), t;
  }
  function l0(t, e, a, s) {
    return to(), e.flags |= 256, Ae(t, e, a, s), e.child;
  }
  var Ad = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Rd(t) {
    return { baseLanes: t, cachePool: Qy() };
  }
  function Od(t, e, a) {
    return t = t !== null ? t.childLanes & ~a : 0, e && (t |= vn), t;
  }
  function u0(t, e, a) {
    var s = e.pendingProps, u = !1, c = (e.flags & 128) !== 0, b;
    if ((b = c) || (b = t !== null && t.memoizedState === null ? !1 : (He.current & 2) !== 0), b && (u = !0, e.flags &= -129), b = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Ot) {
        if (u ? pa(e) : ga(), (t = ee) ? (t = Mb(
          t,
          Nn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: sa !== null ? { id: ui, overflow: ci } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = qy(t), a.return = e, e.child = a, Me = e, ee = null)) : t = null, t === null) throw la(e);
        return Rh(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return c = s.children, s = s.fallback, u ? (ga(), u = e.mode, c = gu(
        { mode: "hidden", children: c },
        u
      ), s = Wa(
        s,
        u,
        a,
        null
      ), c.return = e, s.return = e, c.sibling = s, e.child = c, s = e.child, s.memoizedState = Rd(a), s.childLanes = Od(
        t,
        b,
        a
      ), e.memoizedState = Ad, Ar(null, s)) : (pa(e), Dd(e, c));
    }
    var C = t.memoizedState;
    if (C !== null) {
      var M = C.dehydrated;
      if (M !== null)
        return hA(
          t,
          e,
          c,
          b,
          s,
          M,
          C,
          a
        );
    }
    return u ? (ga(), u = s.fallback, c = e.mode, C = t.child, M = C.sibling, s = Li(C, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = C.subtreeFlags & 1206910976, M !== null ? u = Li(M, u) : (u = Wa(
      u,
      c,
      a,
      null
    ), u.flags |= 2), u.return = e, s.return = e, s.sibling = u, e.child = s, Ar(null, s), s = e.child, u = t.child.memoizedState, u === null ? u = Rd(a) : (c = u.cachePool, c !== null ? (C = ge._currentValue, c = c.parent !== C ? { parent: C, pool: C } : c) : c = Qy(), u = {
      baseLanes: u.baseLanes | a,
      cachePool: c
    }), s.memoizedState = u, s.childLanes = Od(
      t,
      b,
      a
    ), e.memoizedState = Ad, Ar(t.child, s)) : (pa(e), a = t.child, t = a.sibling, a = Li(a, {
      mode: "visible",
      children: s.children
    }), a.return = e, a.sibling = null, t !== null && (b = e.deletions, b === null ? (e.deletions = [t], e.flags |= 16) : b.push(t)), e.child = a, e.memoizedState = null, a);
  }
  function Dd(t, e) {
    return e = gu(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function gu(t, e) {
    return t = an(22, t, null, e), t.lanes = 0, t;
  }
  function yu(t, e, a) {
    return lo(e, t.child, null, a), t = Dd(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function hA(t, e, a, s, u, c, b, C) {
    if (a)
      return e.flags & 256 ? (pa(e), e.flags &= -257, yu(
        t,
        e,
        C
      )) : e.memoizedState !== null ? (ga(), e.child = t.child, e.flags |= 128, null) : (ga(), c = u.fallback, b = e.mode, u = gu(
        { mode: "visible", children: u.children },
        b
      ), c = Wa(
        c,
        b,
        C,
        null
      ), c.flags |= 2, u.return = e, c.return = e, u.sibling = c, e.child = u, lo(e, t.child, null, C), u = e.child, u.memoizedState = Rd(C), u.childLanes = Od(
        t,
        s,
        C
      ), e.memoizedState = Ad, Ar(null, u));
    if (pa(e), Rh(c)) {
      if (s = c.nextSibling && c.nextSibling.dataset, s) var M = s.dgst;
      return s = M, s !== "" && (u = Error(r(419)), u.stack = "", u.digest = s, pr({ value: u, source: null, stack: null })), yu(
        t,
        e,
        C
      );
    }
    if (ve || no(t, e, C, !1), s = (C & t.childLanes) !== 0, ve || s) {
      if (ma.current !== null)
        return yu(
          t,
          e,
          C
        );
      if (s = Wt, s !== null && (u = kg(
        s,
        C
      ), u !== 0 && u !== b.retryLane))
        throw b.retryLane = u, Ja(t, u), ln(s, t, u), wd;
      return Ah(c) || Lu(), yu(
        t,
        e,
        C
      );
    }
    return Ah(c) ? (e.flags |= 192, e.child = t.child, null) : (t = b.treeContext, ee = zn(c.nextSibling), Me = e, Ot = !0, ra = null, Nn = !1, t !== null && ky(e, t), e = Dd(
      e,
      u.children
    ), e.flags |= 134221824, e);
  }
  function c0(t, e, a) {
    t.lanes |= e;
    var s = t.alternate;
    s !== null && (s.lanes |= e), Kl(t.return, e, a);
  }
  function f0(t) {
    for (var e = null; t !== null; ) {
      var a = t.alternate;
      a !== null && au(a) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function vu(t, e, a, s, u, c) {
    var b = t.memoizedState;
    b === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: s,
      tail: a,
      tailMode: u,
      treeForkCount: c
    } : (b.isBackwards = e, b.rendering = null, b.renderingStartTime = 0, b.last = s, b.tail = a, b.tailMode = u, b.treeForkCount = c);
  }
  function Md(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var a = e.sibling;
      e.sibling = t.child, t.child = e, e = a;
    }
  }
  function Nd(t, e, a) {
    var s = e.pendingProps, u = s.revealOrder, c = s.tail;
    s = s.children;
    var b = He.current;
    if (e.flags & 128)
      return Er(e, b), null;
    var C = (b & 2) !== 0;
    if (C ? (b = b & 1 | 2, e.flags |= 128) : b &= 1, Er(e, b), u === "backwards" && t !== null ? (Md(t), Ae(t, e, s, a), Md(t)) : Ae(t, e, s, a), s = Ot ? mr : 0, !C && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && c0(t, a, e);
        else if (t.tag === 19)
          c0(t, a, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (u) {
      case "backwards":
        a = f0(e.child), a === null ? (u = e.child, e.child = null) : (u = a.sibling, a.sibling = null, Md(e)), vu(
          e,
          !0,
          u,
          null,
          c,
          s
        );
        break;
      case "unstable_legacy-backwards":
        for (a = null, u = e.child, e.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && au(t) === null) {
            e.child = u;
            break;
          }
          t = u.sibling, u.sibling = a, a = u, u = t;
        }
        vu(
          e,
          !0,
          a,
          null,
          c,
          s
        );
        break;
      case "together":
        vu(
          e,
          !1,
          null,
          null,
          void 0,
          s
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        a = f0(e.child), a === null ? (u = e.child, e.child = null) : (u = a.sibling, a.sibling = null), vu(
          e,
          !1,
          u,
          a,
          c,
          s
        );
    }
    return e.child;
  }
  function d0(t, e, a) {
    var s = e.pendingProps;
    return ua(e, e.type, s.value), Ae(t, e, s.children, a), e.child;
  }
  function Ii(t, e, a) {
    if (t !== null && (e.dependencies = t.dependencies), Sa |= e.lanes, (a & e.childLanes) === 0)
      if (t !== null) {
        if (no(
          t,
          e,
          a,
          !1
        ), (a & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, a = Li(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; )
        t = t.sibling, a = a.sibling = Li(t, t.pendingProps), a.return = e;
      a.sibling = null;
    }
    return e.child;
  }
  function jd(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Zl(t)));
  }
  function mA(t, e, a) {
    switch (e.tag) {
      case 3:
        ka(e, e.stateNode.containerInfo), ua(e, ge, t.memoizedState.cache), to();
        break;
      case 27:
      case 5:
        Zs(e);
        break;
      case 4:
        ka(e, e.stateNode.containerInfo);
        break;
      case 10:
        ua(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, ad(e), null;
        break;
      case 13:
        var s = e.memoizedState;
        if (s !== null) {
          if (s.dehydrated !== null)
            return pa(e), e.flags |= 128, null;
          s = no(
            t,
            e,
            a,
            !1
          );
          var u = e.child.childLanes;
          return s || (a & u) !== 0 ? u0(t, e, a) : (pa(e), t = Ii(
            t,
            e,
            a
          ), t !== null ? t.sibling : null);
        }
        pa(e);
        break;
      case 19:
        if (e.flags & 128)
          return Nd(
            t,
            e,
            a
          );
        if (u = (t.flags & 128) !== 0, s = (a & e.childLanes) !== 0, s || (no(
          t,
          e,
          a,
          !1
        ), s = (a & e.childLanes) !== 0), u) {
          if (s)
            return Nd(
              t,
              e,
              a
            );
          e.flags |= 128;
        }
        if (u = e.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Er(e, He.current), s) break;
        return null;
      case 22:
        return e.lanes = 0, i0(
          t,
          e,
          a,
          e.pendingProps
        );
      case 24:
        ua(e, ge, t.memoizedState.cache);
    }
    return Ii(t, e, a);
  }
  function h0(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        ve = !0;
      else {
        if (!jd(t, a) && (e.flags & 128) === 0)
          return ve = !1, mA(
            t,
            e,
            a
          );
        ve = (t.flags & 131072) !== 0;
      }
    else
      ve = !1, Ot && (e.flags & 1048576) !== 0 && Yy(e, mr, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var s = e.pendingProps;
          if (t = so(e.elementType), e.type = t, typeof t == "function")
            Hf(t) ? (s = co(t, s), e.tag = 1, e = r0(
              null,
              e,
              t,
              s,
              a
            )) : (e.tag = 0, e = _d(
              null,
              e,
              t,
              s,
              a
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === q) {
                e.tag = 11, e = t0(
                  null,
                  e,
                  t,
                  s,
                  a
                );
                break t;
              } else if (u === tt) {
                e.tag = 14, e = e0(
                  null,
                  e,
                  t,
                  s,
                  a
                );
                break t;
              } else if (u === ht) {
                e.tag = 10, e.type = t, e = d0(
                  null,
                  e,
                  a
                );
                break t;
              }
            }
            throw e = yt(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return _d(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 1:
        return s = e.type, u = co(
          s,
          e.pendingProps
        ), r0(
          t,
          e,
          s,
          u,
          a
        );
      case 3:
        t: {
          if (ka(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          s = e.pendingProps;
          var c = e.memoizedState;
          u = c.element, Wf(t, e), Tr(e, s, null, a);
          var b = e.memoizedState;
          if (s = b.cache, ua(e, ge, s), s !== c.cache && Xf(
            e,
            [ge],
            a,
            !0
          ), xr(), s = b.element, c.isDehydrated)
            if (c = {
              element: s,
              isDehydrated: !1,
              cache: b.cache
            }, e.updateQueue.baseState = c, e.memoizedState = c, e.flags & 256) {
              e = l0(
                t,
                e,
                s,
                a
              );
              break t;
            } else if (s !== u) {
              u = On(
                Error(r(424)),
                e
              ), pr(u), e = l0(
                t,
                e,
                s,
                a
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, ee = zn(t.firstChild), Me = e, Ot = !0, ra = null, Nn = !0, a = iv(
                e,
                null,
                s,
                a
              ), e.child = a; a; )
                a.flags = a.flags & -3 | 134221824, a = a.sibling;
          else {
            if (to(), s === u) {
              e = Ii(
                t,
                e,
                a
              );
              break t;
            }
            Ae(t, e, s, a);
          }
          e = e.child;
        }
        return e;
      case 26:
        return os(t, e), t === null ? (a = Pb(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = a : Ot || (e.stateNode = yb(
          e.type,
          e.pendingProps,
          oi.current,
          e
        )) : e.memoizedState = Pb(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Zs(e), t === null && Ot && (s = e.stateNode = zb(
          e.type,
          e.pendingProps,
          oi.current
        ), Me = e, Nn = !0, u = ee, Ca(e.type) ? (Oh = u, ee = zn(s.firstChild)) : ee = u), Ae(
          t,
          e,
          e.pendingProps.children,
          a
        ), os(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Ot && ((u = s = ee) && (s = lR(
          s,
          e.type,
          e.pendingProps,
          Nn
        ), s !== null ? (e.stateNode = s, Me = e, ee = zn(s.firstChild), Nn = !1, u = !0) : u = !1), u || la(e)), Zs(e), u = e.type, c = e.pendingProps, b = t !== null ? t.memoizedProps : null, s = c.children, Sh(u, c) ? s = null : b !== null && Sh(u, b) && (e.flags |= 32), e.memoizedState !== null && (u = rd(
          t,
          e,
          iA,
          null,
          null,
          a
        ), Es._currentValue = u), os(t, e), Ae(t, e, s, a), e.child;
      case 6:
        return t === null && Ot && ((t = a = ee) && (a = uR(
          a,
          e.pendingProps,
          Nn
        ), a !== null ? (e.stateNode = a, Me = e, ee = null, t = !0) : t = !1), t || la(e)), null;
      case 13:
        return u0(t, e, a);
      case 4:
        return ka(
          e,
          e.stateNode.containerInfo
        ), s = e.pendingProps, t === null ? e.child = lo(
          e,
          null,
          s,
          a
        ) : Ae(t, e, s, a), e.child;
      case 11:
        return t0(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 7:
        return s = e.pendingProps, os(t, e), Ae(t, e, s, a), e.child;
      case 8:
        return Ae(
          t,
          e,
          e.pendingProps.children,
          a
        ), e.child;
      case 12:
        return Ae(
          t,
          e,
          e.pendingProps.children,
          a
        ), e.child;
      case 10:
        return d0(t, e, a);
      case 9:
        return u = e.type._context, s = e.pendingProps.children, io(e), u = Pe(u), s = s(u), e.flags |= 1, Ae(t, e, s, a), e.child;
      case 14:
        return e0(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 15:
        return n0(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 19:
        return Nd(t, e, a);
      case 31:
        return dA(t, e, a);
      case 22:
        return i0(
          t,
          e,
          a,
          e.pendingProps
        );
      case 24:
        return io(e), s = Pe(ge), t === null ? (u = Zf(), u === null && (u = Wt, c = $f(), u.pooledCache = c, c.refCount++, c !== null && (u.pooledCacheLanes |= a), u = c), e.memoizedState = { parent: s, cache: u }, Jf(e), ua(e, ge, u)) : ((t.lanes & a) !== 0 && (Wf(t, e), Tr(e, null, null, a), xr()), u = t.memoizedState, c = e.memoizedState, u.parent !== s ? (u = { parent: s, cache: s }, e.memoizedState = u, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u), ua(e, ge, s)) : (s = c.cache, ua(e, ge, s), s !== u.cache && Xf(
          e,
          [ge],
          a,
          !0
        ))), Ae(
          t,
          e,
          e.pendingProps.children,
          a
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), s = e.pendingProps, s.name != null && s.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : Ot && Xl(e), t !== null && t.memoizedProps.name !== s.name ? e.flags |= 4194816 : os(t, e), Ae(t, e, s.children, a), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function qi(t) {
    t.flags |= 4;
  }
  function zd(t, e, a, s, u) {
    var c;
    if ((c = (t.mode & 32) !== 0) && (c = a === null ? qb(e, s) : qb(e, s) && (s.src !== a.src || s.srcSet !== a.srcSet)), c) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if ($0()) t.flags |= 8192;
        else
          throw ro = tu, Qf;
    } else t.flags &= -16777217;
  }
  function m0(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Gb(e))
      if ($0()) t.flags |= 8192;
      else
        throw ro = tu, Qf;
  }
  function bu(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? qg() : 536870912, t.lanes |= e, cs |= e);
  }
  function Rr(t, e) {
    if (!Ot)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var a = t.tail, s = null; a !== null; )
            a.alternate !== null && (s = a), a = a.sibling;
          s === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : s.sibling = null;
          break;
        default:
          for (e = t.tail, a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t.tail = null : a.sibling = null;
      }
  }
  function ne(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, a = 0, s = 0;
    if (e)
      for (var u = t.child; u !== null; )
        a |= u.lanes | u.childLanes, s |= u.subtreeFlags & 1206910976, s |= u.flags & 1206910976, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        a |= u.lanes | u.childLanes, s |= u.subtreeFlags, s |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= s, t.childLanes = a, e;
  }
  function pA(t, e, a) {
    var s = e.pendingProps;
    switch (Gf(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ne(e), null;
      case 1:
        return ne(e), null;
      case 3:
        return a = e.stateNode, s = null, t !== null && (s = t.memoizedState.cache), e.memoizedState.cache !== s && (e.flags |= 2048), Pi(ge), si(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t === null || t.child === null) && (Jo(e) ? qi(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, kf())), ne(e), null;
      case 26:
        var u = e.type, c = e.memoizedState;
        return t === null ? (qi(e), c !== null ? (ne(e), m0(e, c)) : (ne(e), zd(
          e,
          u,
          null,
          s,
          a
        ))) : c ? c !== t.memoizedState ? (qi(e), ne(e), m0(e, c)) : (ne(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== s && qi(e), ne(e), zd(
          e,
          u,
          t,
          s,
          a
        )), null;
      case 27:
        if (jo(e), a = oi.current, u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== s && qi(e);
        else {
          if (!s) {
            if (e.stateNode === null)
              throw Error(r(166));
            return ne(e), e.subtreeFlags &= -33554433, null;
          }
          t = _n.current, Jo(e) ? Fy(e) : (t = zb(u, s, a), e.stateNode = t, qi(e));
        }
        return ne(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (jo(e), u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== s && qi(e);
        else {
          if (!s) {
            if (e.stateNode === null)
              throw Error(r(166));
            return ne(e), e.subtreeFlags &= -33554433, null;
          }
          if (c = _n.current, Jo(e))
            Fy(e);
          else {
            var b = Ur(
              oi.current
            );
            switch (c) {
              case 1:
                c = b.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                c = b.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    c = b.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    c = b.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    c = b.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof s.is == "string" ? b.createElement("select", {
                      is: s.is
                    }) : b.createElement("select"), s.multiple ? c.multiple = !0 : s.size && (c.size = s.size);
                    break;
                  default:
                    c = typeof s.is == "string" ? b.createElement(u, { is: s.is }) : b.createElement(u);
                }
            }
            c[Be] = e, c[nn] = s;
            t: for (b = e.child; b !== null; ) {
              if (b.tag === 5 || b.tag === 6)
                c.appendChild(b.stateNode);
              else if (b.tag !== 4 && b.tag !== 27 && b.child !== null) {
                b.child.return = b, b = b.child;
                continue;
              }
              if (b === e) break t;
              for (; b.sibling === null; ) {
                if (b.return === null || b.return === e)
                  break t;
                b = b.return;
              }
              b.sibling.return = b.return, b = b.sibling;
            }
            e.stateNode = c;
            t: switch (qe(c, u, s), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break t;
              case "img":
                s = !0;
                break t;
              default:
                s = !1;
            }
            s && qi(e);
          }
        }
        return ne(e), e.subtreeFlags &= -33554433, zd(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          a
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== s && qi(e);
        else {
          if (typeof s != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = oi.current, Jo(e)) {
            if (t = e.stateNode, a = e.memoizedProps, s = null, u = Me, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  s = u.memoizedProps;
              }
            t[Be] = e, t = !!(t.nodeValue === a || s !== null && s.suppressHydrationWarning === !0 || hb(t.nodeValue, a)), t || la(e, !0);
          } else
            t = Ur(t).createTextNode(
              s
            ), t[Be] = e, e.stateNode = t;
        }
        return ne(e), null;
      case 31:
        if (a = e.memoizedState, t === null || t.memoizedState !== null) {
          if (s = Jo(e), a !== null) {
            if (t === null) {
              if (!s) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[Be] = e;
            } else
              to(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            ne(e), t = !1;
          } else
            a = kf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), t = !0;
          if (!t)
            return e.flags & 256 ? (pn(e), e) : (pn(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return ne(e), null;
      case 13:
        if (s = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Jo(e), s !== null && s.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(r(318));
              if (u = e.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[Be] = e;
            } else
              to(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            ne(e), u = !1;
          } else
            u = kf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return e.flags & 256 ? (pn(e), e) : (pn(e), null);
        }
        return pn(e), (e.flags & 128) !== 0 ? (e.lanes = a, e) : (a = s !== null, t = t !== null && t.memoizedState !== null, a && (s = e.child, u = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (u = s.alternate.memoizedState.cachePool.pool), c = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (c = s.memoizedState.cachePool.pool), c !== u && (s.flags |= 2048)), a !== t && a && (e.child.flags |= 8192), bu(e, e.updateQueue), ne(e), null);
      case 4:
        return si(), t === null && ph(e.stateNode.containerInfo), e.flags |= 67108864, ne(e), null;
      case 10:
        return Pi(e.type), ne(e), null;
      case 19:
        if (od(e), s = e.memoizedState, s === null) return ne(e), null;
        if (u = (e.flags & 128) !== 0, c = s.rendering, c === null)
          if (u) Rr(s, !1);
          else {
            if (de !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (c = au(t), c !== null) {
                  for (e.flags |= 128, Rr(s, !1), t = c.updateQueue, e.updateQueue = t, bu(e, t), e.subtreeFlags = 0, t = a, a = e.child; a !== null; )
                    Iy(a, t), a = a.sibling;
                  return Er(
                    e,
                    He.current & 1 | 2
                  ), Ot && Vi(e, s.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            s.tail !== null && Oe() > Mu && (e.flags |= 128, u = !0, Rr(s, !1), e.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = au(c), t !== null) {
              if (e.flags |= 128, u = !0, t = t.updateQueue, e.updateQueue = t, bu(e, t), Rr(s, !0), s.tail === null && s.tailMode !== "collapsed" && s.tailMode !== "visible" && !c.alternate && !Ot)
                return ne(e), null;
            } else
              2 * Oe() - s.renderingStartTime > Mu && a !== 536870912 && (e.flags |= 128, u = !0, Rr(s, !1), e.lanes = 4194304);
          s.isBackwards ? (c.sibling = e.child, e.child = c) : (t = s.last, t !== null ? t.sibling = c : e.child = c, s.last = c);
        }
        if (s.tail !== null) {
          t = s.tail;
          t: {
            for (a = t; a !== null; ) {
              if (a.alternate !== null) {
                a = !1;
                break t;
              }
              a = a.sibling;
            }
            a = !0;
          }
          return s.rendering = t, s.tail = t.sibling, s.renderingStartTime = Oe(), t.sibling = null, c = He.current, c = u ? c & 1 | 2 : c & 1, s.tailMode === "visible" || s.tailMode === "collapsed" || !a || Ot ? Er(e, c) : (a = c, Bt(Ue, e), Bt(He, a), $e === null && ($e = e)), Ot && Vi(e, s.treeForkCount), t;
        }
        return ne(e), null;
      case 22:
      case 23:
        return pn(e), id(), s = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== s && (e.flags |= 8192) : s && (e.flags |= 8192), s ? (a & 536870912) !== 0 && (e.flags & 128) === 0 && (ne(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : ne(e), a = e.updateQueue, a !== null && bu(e, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), s = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (s = e.memoizedState.cachePool.pool), s !== a && (e.flags |= 2048), t !== null && Yt(oo), null;
      case 24:
        return a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Pi(ge), ne(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, ne(e), null;
    }
    throw Error(r(156, e.tag));
  }
  function gA(t, e) {
    switch (Gf(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Pi(ge), si(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return jo(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (pn(e), e.alternate === null)
            throw Error(r(340));
          to();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (pn(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          to();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return od(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return si(), null;
      case 10:
        return Pi(e.type), null;
      case 22:
      case 23:
        return pn(e), id(), t !== null && Yt(oo), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Pi(ge), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function p0(t, e) {
    switch (Gf(e), e.tag) {
      case 3:
        Pi(ge), si();
        break;
      case 26:
      case 27:
      case 5:
        jo(e);
        break;
      case 4:
        si();
        break;
      case 31:
        e.memoizedState !== null && pn(e);
        break;
      case 13:
        pn(e);
        break;
      case 19:
        od(e);
        break;
      case 10:
        Pi(e.type);
        break;
      case 22:
      case 23:
        pn(e), id(), t !== null && Yt(oo);
        break;
      case 24:
        Pi(ge);
    }
  }
  function Or(t, e) {
    try {
      var a = e.updateQueue, s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            s = void 0;
            var c = a.create, b = a.inst;
            s = c(), b.destroy = s;
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (C) {
      $t(e, e.return, C);
    }
  }
  function ya(t, e, a) {
    try {
      var s = e.updateQueue, u = s !== null ? s.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        s = c;
        do {
          if ((s.tag & t) === t) {
            var b = s.inst, C = b.destroy;
            if (C !== void 0) {
              b.destroy = void 0, u = e;
              var M = a, P = C;
              try {
                P();
              } catch (k) {
                $t(
                  u,
                  M,
                  k
                );
              }
            }
          }
          s = s.next;
        } while (s !== c);
      }
    } catch (k) {
      $t(e, e.return, k);
    }
  }
  function g0(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        ov(e, a);
      } catch (s) {
        $t(t, t.return, s);
      }
    }
  }
  function y0(t, e, a) {
    a.props = co(
      t.type,
      t.memoizedProps
    ), a.state = t.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (s) {
      $t(t, e, s);
    }
  }
  function fi(t, e) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var s = t.stateNode;
            break;
          case 30:
            var u = t.stateNode, c = ji(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== c) && (u.ref = Cb(c)), s = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var b = new Sn(t);
              p(
                t.child,
                !1,
                sR,
                b,
                void 0,
                void 0
              ), t.stateNode = b;
            }
            s = t.stateNode;
            break;
          default:
            s = t.stateNode;
        }
        typeof a == "function" ? t.refCleanup = a(s) : a.current = s;
      }
    } catch (C) {
      $t(t, e, C);
    }
  }
  function Ie(t, e) {
    var a = t.ref, s = t.refCleanup;
    if (a !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (u) {
          $t(t, e, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          $t(t, e, u);
        }
      else a.current = null;
  }
  function Su(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var a = 0; a < e.length; a++)
        Db(
          t.stateNode,
          e[a]
        );
  }
  function v0(t) {
    for (var e = t.return; e !== null && (Vd(e) && Db(t.stateNode, e.stateNode), !Ld(e)); )
      e = e.return;
  }
  function Dr(t) {
    for (var e = t.return; e !== null && (Vd(e) && rR(t.stateNode, e.stateNode), !Ld(e)); )
      e = e.return;
  }
  function Ld(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Vd(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Bd(t) {
    var e = t.type, a = t.memoizedProps, s = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && s.focus();
          break t;
        case "img":
          a.src ? s.src = a.src : a.srcSet && (s.srcset = a.srcSet);
      }
    } catch (u) {
      $t(t, t.return, u);
    }
  }
  function Pd(t, e, a) {
    try {
      var s = t.stateNode;
      qA(s, t.type, a, e), s[nn] = e;
    } catch (u) {
      $t(t, t.return, u);
    }
  }
  function b0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ca(t.type) || t.tag === 4;
  }
  function Ud(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || b0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ca(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Hd(t, e, a, s) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, e ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(u, e) : (e = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, e.appendChild(u), a = a._reactRootContainer, a != null || e.onclick !== null || (e.onclick = li)), Su(t, s), It = !0;
    else if (u !== 4 && (u === 27 && (Su(t, s), s = null, Ca(t.type) && (a = t.stateNode, e = null)), t = t.child, t !== null))
      for (Hd(
        t,
        e,
        a,
        s
      ), t = t.sibling; t !== null; )
        Hd(
          t,
          e,
          a,
          s
        ), t = t.sibling;
  }
  function xu(t, e, a, s) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, e ? a.insertBefore(u, e) : a.appendChild(u), Su(t, s), It = !0;
    else if (u !== 4 && (u === 27 && (Su(t, s), s = null, Ca(t.type) && (a = t.stateNode)), t = t.child, t !== null))
      for (xu(
        t,
        e,
        a,
        s
      ), t = t.sibling; t !== null; )
        xu(
          t,
          e,
          a,
          s
        ), t = t.sibling;
  }
  function S0(t) {
    var e = t.stateNode, a = t.memoizedProps;
    try {
      for (var s = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      qe(e, s, a), e[Be] = t, e[nn] = a;
    } catch (c) {
      $t(t, t.return, c);
    }
  }
  var Tu = !1, gn = null;
  function x0(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Tu = !0);
  }
  var di = null;
  function T0() {
    var t = di;
    return di = null, t;
  }
  var on = 0;
  function ss(t, e, a, s, u) {
    return on = 0, E0(
      t.child,
      e,
      a,
      s,
      u
    );
  }
  function E0(t, e, a, s, u) {
    for (var c = !1; t !== null; ) {
      if (t.tag === 5) {
        var b = t.stateNode;
        if (s !== null) {
          var C = Eh(b);
          s.push(C), C.view && (c = !0);
        } else
          c || Eh(b).view && (c = !0);
        Tu = !0, Tb(
          b,
          on === 0 ? e : e + "_" + on,
          a
        ), on++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || E0(
        t.child,
        e,
        a,
        s,
        u
      ) && (c = !0));
      t = t.sibling;
    }
    return c;
  }
  function hi(t, e) {
    for (; t !== null; )
      t.tag === 5 ? Eb(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || hi(
        t.child,
        e
      )), t = t.sibling;
  }
  function Eu(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Eu(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(r(544));
          var a = e.name;
          e = zi(e.default, e.share), e !== "none" && (ss(
            t,
            a,
            e,
            null,
            !1
          ) || hi(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Id(t, e) {
    if (t.tag === 30) {
      var a = t.stateNode, s = t.memoizedProps, u = ji(s, a), c = zi(
        s.default,
        a.paired ? s.share : s.enter
      );
      c !== "none" ? ss(t, u, c, null, !1) ? (Eu(t), a.paired || e || ms(t, s.onEnter)) : hi(t.child, !1) : Eu(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Id(t, e), t = t.sibling;
    else Eu(t);
  }
  function qd(t) {
    if (gn !== null && gn.size !== 0) {
      var e = gn;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var a = t.memoizedProps, s = a.name;
              if (s != null && s !== "auto") {
                var u = e.get(s);
                if (u !== void 0) {
                  var c = zi(
                    a.default,
                    a.share
                  );
                  if (c !== "none" && (ss(
                    t,
                    s,
                    c,
                    null,
                    !1
                  ) ? (c = t.stateNode, u.paired = c, c.paired = u, ms(t, a.onShare)) : hi(t.child, !1)), e.delete(s), e.size === 0) break;
                }
              }
            }
            qd(t);
          }
          t = t.sibling;
        }
    }
  }
  function Gd(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, a = ji(e, t.stateNode), s = gn !== null ? gn.get(a) : void 0, u = zi(
        e.default,
        s !== void 0 ? e.share : e.exit
      );
      u !== "none" && (ss(t, a, u, null, !1) ? s !== void 0 ? (u = t.stateNode, s.paired = u, u.paired = s, gn.delete(a), ms(t, e.onShare)) : ms(t, e.onExit) : hi(t.child, !1)), gn !== null && qd(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Gd(t), t = t.sibling;
    else
      gn !== null && qd(t);
  }
  function C0(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, a = ji(e, t.stateNode);
        e = zi(e.default, e.update), t.flags &= -5, e !== "none" && ss(
          t,
          a,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && C0(t);
      t = t.sibling;
    }
  }
  function Yd(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, hi(t.child, !1));
          }
          Yd(t);
        }
        t = t.sibling;
      }
  }
  function Cu(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, hi(t.child, !1), Yd(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Cu(t), t = t.sibling;
    else Yd(t);
  }
  function w0(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? hi(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && w0(t), t = t.sibling;
  }
  function kd(t, e, a, s, u, c, b) {
    for (var C = !1; e !== null; ) {
      if (e.tag === 5) {
        var M = e.stateNode;
        if (c !== null && on < c.length) {
          var P = c[on], k = Eh(M);
          (P.view || k.view) && (C = !0);
          var K;
          if (K = (t.flags & 4) === 0)
            if (k.clip) K = !0;
            else {
              K = P.rect;
              var L = k.rect;
              K = K.y !== L.y || K.x !== L.x || K.height !== L.height || K.width !== L.width;
            }
          K && (t.flags |= 4), k.abs ? k = !P.abs : (P = P.rect, k = k.rect, k = P.height !== k.height || P.width !== k.width), k && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Tb(
          M,
          on === 0 ? a : a + "_" + on,
          u
        ), C && (t.flags & 4) !== 0 || (di === null && (di = []), di.push(
          M,
          on === 0 ? s : s + "_" + on,
          e.memoizedProps
        )), on++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && b ? t.flags |= e.flags & 32 : kd(
        t,
        e.child,
        a,
        s,
        u,
        c,
        b
      ) && (C = !0));
      e = e.sibling;
    }
    return C;
  }
  function _0(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var a = t.memoizedProps, s = t.stateNode, u = ji(a, s), c = zi(a.default, a.update), b;
        b = t.memoizedState, t.memoizedState = null, s = t;
        var C = t.child;
        on = 0, u = kd(
          s,
          C,
          u,
          u,
          c,
          b,
          !1
        ), (t.flags & 4) !== 0 && u && ms(t, a.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && _0(t);
      t = t.sibling;
    }
  }
  var Ne = !1, kt = !1, mi = !1, Fd = !1, A0 = typeof WeakSet == "function" ? WeakSet : Set, je = null, pi = !1, Mr = !1, wu = !1, Xd = !1;
  function yA(t, e, a) {
    if (t = t.containerInfo, vh = Cs, t = My(t), jf(t)) {
      if ("selectionStart" in t)
        var s = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          s = (s = t.ownerDocument) && s.defaultView || window;
          var u = s.getSelection && s.getSelection();
          if (u && u.rangeCount !== 0) {
            s = u.anchorNode;
            var c = u.anchorOffset, b = u.focusNode;
            u = u.focusOffset;
            try {
              s.nodeType, b.nodeType;
            } catch {
              s = null;
              break t;
            }
            var C = 0, M = -1, P = -1, k = 0, K = 0, L = t, G = null;
            e: for (; ; ) {
              for (var ot; L !== s || c !== 0 && L.nodeType !== 3 || (M = C + c), L !== b || u !== 0 && L.nodeType !== 3 || (P = C + u), L.nodeType === 3 && (C += L.nodeValue.length), (ot = L.firstChild) !== null; )
                G = L, L = ot;
              for (; ; ) {
                if (L === t) break e;
                if (G === s && ++k === c && (M = C), G === b && ++K === u && (P = C), (ot = L.nextSibling) !== null) break;
                L = G, G = L.parentNode;
              }
              L = ot;
            }
            s = M === -1 || P === -1 ? null : { start: M, end: P };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (bh = { focusedElem: t, selectionRange: s }, Cs = !1, a = (a & 335544064) === a, je = e, e = a ? 9270 : 1024; je !== null; ) {
      if (t = je, a && (s = t.deletions, s !== null))
        for (c = 0; c < s.length; c++)
          a && Gd(s[c]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        a && x0(t), _u(a);
      else {
        if (t.tag === 22) {
          if (s = t.alternate, t.memoizedState !== null) {
            s !== null && s.memoizedState === null && a && Gd(s), _u(a);
            continue;
          } else if (s !== null && s.memoizedState !== null) {
            a && x0(t), _u(a);
            continue;
          }
        }
        s = t.child, (t.subtreeFlags & e) !== 0 && s !== null ? (s.return = t, je = s) : (a && C0(t), _u(a));
      }
    }
    gn = null;
  }
  function _u(t) {
    for (; je !== null; ) {
      var e = je, a = t, s = e.alternate, u = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && s !== null) {
            a = void 0, u = s.memoizedProps, s = s.memoizedState;
            var c = e.stateNode;
            try {
              var b = co(
                e.type,
                u
              );
              a = c.getSnapshotBeforeUpdate(
                b,
                s
              ), c.__reactInternalSnapshotBeforeUpdate = a;
            } catch (C) {
              $t(e, e.return, C);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (s = e.stateNode.containerInfo, a = s.nodeType, a === 9)
              _h(s);
            else if (a === 1)
              switch (s.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  _h(s);
                  break;
                default:
                  s.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          a && s !== null && (a = ji(
            s.memoizedProps,
            s.stateNode
          ), u = e.memoizedProps, u = zi(u.default, u.update), u !== "none" && ss(
            s,
            a,
            u,
            s.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(r(163));
      }
      if (s = e.sibling, s !== null) {
        s.return = e.return, je = s;
        break;
      }
      je = e.return;
    }
  }
  function R0(t, e, a) {
    var s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        gi(t, a), s & 4 && Or(5, a);
        break;
      case 1:
        if (gi(t, a), s & 4)
          if (t = a.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (b) {
              $t(a, a.return, b);
            }
          else {
            var u = co(
              a.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (b) {
              $t(
                a,
                a.return,
                b
              );
            }
          }
        s & 64 && g0(a), s & 512 && fi(a, a.return);
        break;
      case 3:
        if (gi(t, a), s & 64 && (t = a.updateQueue, t !== null)) {
          if (e = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                e = a.child.stateNode;
                break;
              case 1:
                e = a.child.stateNode;
            }
          try {
            ov(t, e);
          } catch (b) {
            $t(a, a.return, b);
          }
        }
        break;
      case 27:
        e === null && s & 4 && S0(a);
      case 26:
      case 5:
        gi(t, a), e === null && s & 4 && Bd(a), s & 512 && fi(a, a.return);
        break;
      case 12:
        gi(t, a);
        break;
      case 31:
        gi(t, a), s & 4 && N0(t, a);
        break;
      case 13:
        gi(t, a), s & 4 && j0(t, a), s & 64 && (t = a.memoizedState, t !== null && (t = t.dehydrated, t !== null && (a = OA.bind(
          null,
          a
        ), cR(t, a))));
        break;
      case 22:
        if (s = a.memoizedState !== null || Ne, !s) {
          var c = e !== null && e.memoizedState !== null || kt;
          e = Ne, u = kt, Ne = s, (kt = c) && !u ? (s = 2, (a.subtreeFlags & 8772) !== 0 && (s |= 1), Fn(
            t,
            a,
            s
          )) : gi(t, a), Ne = e, kt = u;
        }
        break;
      case 30:
        gi(t, a), s & 512 && fi(a, a.return);
        break;
      case 7:
        s & 512 && fi(a, a.return);
      default:
        gi(t, a);
    }
  }
  function $d(t, e) {
    for (t = t.child; t !== null; )
      O0(t, e), t = t.sibling;
  }
  function O0(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var a = t.stateNode;
          if (e) {
            var s = a.style;
            typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
          } else {
            var u = t.stateNode, c = t.memoizedProps.style, b = c != null && c.hasOwnProperty("display") ? c.display : null;
            u.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
          }
        } catch (M) {
          $t(t, t.return, M);
        }
        Kd(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, It = !0;
        } catch (M) {
          $t(t, t.return, M);
        }
        break;
      case 18:
        try {
          var C = t.stateNode;
          e ? xb(C, !0) : xb(t.stateNode, !1);
        } catch (M) {
          $t(t, t.return, M);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && $d(t, e);
        break;
      default:
        $d(t, e);
    }
  }
  function Kd(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var a = t, s = e;
          switch (a.tag) {
            case 4:
              O0(a, s);
              break t;
            case 22:
              a.memoizedState === null && Kd(a, s);
              break t;
            default:
              Kd(a, s);
          }
        }
        t = t.sibling;
      }
  }
  function D0(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, D0(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Ml(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var oe = null, sn = !1;
  function Yn(t, e, a) {
    for (a = a.child; a !== null; )
      M0(t, e, a), a = a.sibling;
  }
  function M0(t, e, a) {
    if (fn && typeof fn.onCommitFiberUnmount == "function")
      try {
        fn.onCommitFiberUnmount(tr, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        kt || Ie(a, e), Yn(
          t,
          e,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && !kt && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        kt || Ie(a, e), Dr(a);
        var s = oe, u = sn;
        Ca(a.type) && (oe = a.stateNode, sn = !1), Yn(
          t,
          e,
          a
        ), Lb(
          a.stateNode,
          a.type,
          a.memoizedProps
        ), oe = s, sn = u;
        break;
      case 5:
        kt || Ie(a, e), Dr(a);
      case 6:
        if (a.tag === 6 && Dr(a), s = oe, u = sn, oe = null, Yn(
          t,
          e,
          a
        ), oe = s, sn = u, oe !== null)
          if (sn)
            try {
              (oe.nodeType === 9 ? oe.body : oe.nodeName === "HTML" ? oe.ownerDocument.body : oe).removeChild(a.stateNode), It = !0;
            } catch (c) {
              $t(
                a,
                e,
                c
              );
            }
          else
            try {
              oe.removeChild(a.stateNode), It = !0;
            } catch (c) {
              $t(
                a,
                e,
                c
              );
            }
        break;
      case 18:
        oe !== null && (sn ? (t = oe, Sb(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          a.stateNode
        ), ws(t)) : Sb(oe, a.stateNode));
        break;
      case 4:
        s = oe, u = sn, oe = a.stateNode.containerInfo, sn = !0, Yn(
          t,
          e,
          a
        ), oe = s, sn = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ya(2, a, e), kt || ya(4, a, e), Yn(
          t,
          e,
          a
        );
        break;
      case 1:
        kt || (Ie(a, e), s = a.stateNode, typeof s.componentWillUnmount == "function" && y0(
          a,
          e,
          s
        )), Yn(
          t,
          e,
          a
        );
        break;
      case 21:
        Yn(
          t,
          e,
          a
        );
        break;
      case 22:
        kt = (s = kt) || a.memoizedState !== null, Yn(
          t,
          e,
          a
        ), kt = s;
        break;
      case 30:
        Ie(a, e), Yn(
          t,
          e,
          a
        );
        break;
      case 7:
        kt || Ie(a, e), Yn(
          t,
          e,
          a
        );
        break;
      default:
        Yn(
          t,
          e,
          a
        );
    }
  }
  function N0(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ws(t);
      } catch (a) {
        $t(e, e.return, a);
      }
    }
  }
  function j0(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ws(t);
      } catch (a) {
        $t(e, e.return, a);
      }
  }
  function vA(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new A0()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new A0()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Au(t, e) {
    var a = vA(t);
    e.forEach(function(s) {
      if (!a.has(s)) {
        a.add(s);
        var u = DA.bind(null, t, s);
        s.then(u, u);
      }
    });
  }
  function Je(t, e, a) {
    var s = e.deletions;
    if (s !== null)
      for (var u = 0; u < s.length; u++) {
        var c = s[u], b = t, C = e, M = C;
        t: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Ca(M.type)) {
                oe = M.stateNode, sn = !1;
                break t;
              }
              break;
            case 5:
              oe = M.stateNode, sn = !1;
              break t;
            case 3:
            case 4:
              oe = M.stateNode.containerInfo, sn = !0;
              break t;
          }
          M = M.return;
        }
        if (oe === null) throw Error(r(160));
        M0(b, C, c), oe = null, sn = !1, b = c.alternate, b !== null && (b.return = null), c.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        z0(e, t, a), e = e.sibling;
  }
  var kn = null;
  function z0(t, e, a) {
    var s = t.alternate, u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (s = t.updateQueue, s = s !== null ? s.events : null, s !== null))
          for (var c = 0; c < s.length; c++) {
            var b = s[c];
            b.ref.impl = b.nextImpl;
          }
        Je(e, t, a), We(t), u & 4 && (ya(3, t, t.return), Or(3, t), ya(5, t, t.return));
        break;
      case 1:
        Je(e, t, a), We(t), u & 512 && (kt || s === null || Ie(s, s.return)), u & 64 && Ne && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (a = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = a === null ? e : a.concat(e))));
        break;
      case 26:
        if (c = kn, Je(e, t, a), We(t), u & 512 && (kt || s === null || Ie(s, s.return)), u & 4)
          if (u = s !== null ? s.memoizedState : null, a = t.memoizedState, s === null)
            if (a === null)
              if (t.stateNode === null)
                if (Ne)
                  t.stateNode = yb(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, a = t.memoizedProps, u = c.ownerDocument || c;
                    e: switch (e) {
                      case "title":
                        s = u.getElementsByTagName("title")[0], (!s || s[ir] || s[Be] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = u.createElement(e), u.head.insertBefore(
                          s,
                          u.querySelector("head > title")
                        )), qe(s, e, a), s[Be] = t, De(s), e = s;
                        break t;
                      case "link":
                        if (c = Ib(
                          "link",
                          "href",
                          u
                        ).get(e + (a.href || ""))) {
                          for (b = 0; b < c.length; b++)
                            if (s = c[b], s.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && s.getAttribute("rel") === (a.rel == null ? null : a.rel) && s.getAttribute("title") === (a.title == null ? null : a.title) && s.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              c.splice(b, 1);
                              break e;
                            }
                        }
                        s = u.createElement(e), qe(s, e, a), u.head.appendChild(s);
                        break;
                      case "meta":
                        if (c = Ib(
                          "meta",
                          "content",
                          u
                        ).get(e + (a.content || ""))) {
                          for (b = 0; b < c.length; b++)
                            if (s = c[b], s.getAttribute("content") === (a.content == null ? null : "" + a.content) && s.getAttribute("name") === (a.name == null ? null : a.name) && s.getAttribute("property") === (a.property == null ? null : a.property) && s.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && s.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              c.splice(b, 1);
                              break e;
                            }
                        }
                        s = u.createElement(e), qe(s, e, a), u.head.appendChild(s);
                        break;
                      default:
                        throw Error(r(468, e));
                    }
                    s[Be] = t, De(s), e = s;
                  }
                  t.stateNode = e;
                }
              else
                Ne || jh(c, t.type, t.stateNode);
            else
              t.stateNode = Hb(
                c,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? (e = s.stateNode, e === null || kt || e.parentNode.removeChild(e)) : u.count--, a === null ? Ne || jh(c, t.type, t.stateNode) : Hb(c, a, t.memoizedProps)) : a === null && t.stateNode !== null && Pd(
              t,
              t.memoizedProps,
              s.memoizedProps
            );
        break;
      case 27:
        Je(e, t, a), We(t), u & 512 && (kt || s === null || Ie(s, s.return)), s !== null && u & 4 && Pd(
          t,
          t.memoizedProps,
          s.memoizedProps
        );
        break;
      case 5:
        if (c = mi, mi = !1, Je(e, t, a), mi = c, We(t), u & 512 && (kt || s === null || Ie(s, s.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            qo(e, ""), It = !0;
          } catch (k) {
            $t(t, t.return, k);
          }
        }
        u & 4 && t.stateNode != null && (e = t.memoizedProps, Pd(
          t,
          e,
          s !== null ? s.memoizedProps : e
        )), u & 1024 && (Fd = !0);
        break;
      case 6:
        if (Je(e, t, a), We(t), u & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          e = t.memoizedProps, a = t.stateNode;
          try {
            a.nodeValue = e, It = !0;
          } catch (k) {
            $t(t, t.return, k);
          }
        }
        break;
      case 3:
        if (It = !1, qu = null, c = kn, kn = Hr(e.containerInfo), Je(e, t, a), kn = c, We(t), u & 4 && s !== null && s.memoizedState.isDehydrated)
          try {
            ws(e.containerInfo);
          } catch (k) {
            $t(t, t.return, k);
          }
        Fd && (Fd = !1, L0(t)), It = !1;
        break;
      case 4:
        u = mi, mi = Ne, s = ey(), c = kn, kn = Hr(
          t.stateNode.containerInfo
        ), Je(e, t, a), We(t), kn = c, It && Mr && (wu = !0), It = s, mi = u;
        break;
      case 12:
        Je(e, t, a), We(t);
        break;
      case 31:
        Je(e, t, a), We(t), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Au(t, e)));
        break;
      case 13:
        Je(e, t, a), We(t), t.child.flags & 8192 && t.memoizedState !== null != (s !== null && s.memoizedState !== null) && (Du = Oe()), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Au(t, e)));
        break;
      case 22:
        c = t.memoizedState !== null, b = s !== null && s.memoizedState !== null;
        var C = Ne, M = kt, P = mi;
        Ne = C || c, mi = P || c, kt = M || b, Je(e, t, a), kt = M, mi = P, Ne = C, We(t), u & 8192 && (e = t.stateNode, e._visibility = c ? e._visibility & -2 : e._visibility | 1, !c || s === null || b || Ne || kt || (e = b || kt, a = Ne, s = kt, Ne = c || Ne, kt = e, va(t, 2), Ne = a, kt = s), !c && mi || $d(t, c)), u & 4 && (e = t.updateQueue, e !== null && (a = e.retryQueue, a !== null && (e.retryQueue = null, Au(t, a))));
        break;
      case 19:
        Je(e, t, a), We(t), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Au(t, e)));
        break;
      case 30:
        u & 512 && (kt || s === null || Ie(s, s.return)), u = ey(), c = Mr, b = (a & 335544064) === a, C = t.memoizedProps, Mr = b && zi(
          C.default,
          C.update
        ) !== "none", Je(e, t, a), We(t), b && s !== null && It && (t.flags |= 4), Mr = c, It = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (kt || s === null || Ie(s, s.return)), s && s.stateNode !== null && (s.stateNode._fragmentFiber = t);
      default:
        Je(e, t, a), We(t);
    }
  }
  function We(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var a, s = t.return; s !== null; ) {
          if (b0(s)) {
            a = s;
            break;
          }
          s = s.return;
        }
        s = null;
        for (var u = t.return; u !== null; ) {
          if (Vd(u)) {
            var c = u.stateNode;
            s === null ? s = [c] : s.push(c);
          }
          if (Ld(u)) break;
          u = u.return;
        }
        var b = s;
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var C = a.stateNode, M = Ud(t);
            xu(
              t,
              M,
              C,
              b
            );
            break;
          case 5:
            var P = a.stateNode;
            a.flags & 32 && (qo(P, ""), a.flags &= -33);
            var k = Ud(t);
            xu(
              t,
              k,
              P,
              b
            );
            break;
          case 3:
          case 4:
            var K = a.stateNode.containerInfo, L = Ud(t);
            Hd(
              t,
              L,
              K,
              b
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (G) {
        $t(t, t.return, G);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function L0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        L0(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Cs = !0, e.reset(), Cs = !1), t = t.sibling;
      }
  }
  function rs(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        V0(e, t), e = e.sibling;
    else _0(e);
  }
  function V0(t, e) {
    var a = t.alternate;
    if (a === null) Id(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Xd = pi = !1, T0(), rs(e, t), !pi && !wu) {
            if (t = di, t !== null)
              for (var s = 0; s < t.length; s += 3) {
                a = t[s];
                var u = t[s + 1];
                Eb(a, t[s + 2]), a = a.ownerDocument.documentElement, a !== null && a.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), Xd = !0;
          }
          di = null;
          break;
        case 5:
          rs(e, t);
          break;
        case 4:
          s = pi, pi = !1, rs(e, t), pi && (wu = !0), pi = s;
          break;
        case 22:
          t.memoizedState === null && (a.memoizedState !== null ? Id(t, !1) : rs(e, t));
          break;
        case 30:
          s = pi, u = T0(), pi = !1, rs(e, t), pi && (t.flags |= 4);
          var c = t.memoizedProps, b = t.stateNode;
          e = ji(c, b), b = ji(a.memoizedProps, b);
          var C = zi(c.default, c.update);
          C === "none" ? e = !1 : (c = a.memoizedState, a.memoizedState = null, a = t.child, on = 0, e = kd(
            t,
            a,
            e,
            b,
            C,
            c,
            !0
          ), on !== (c === null ? 0 : c.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (ms(
            t,
            t.memoizedProps.onUpdate
          ), di = u) : u !== null && (u.push.apply(u, di), di = u), pi = (t.flags & 32) !== 0 ? !0 : s;
          break;
        default:
          rs(e, t);
      }
  }
  function gi(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        R0(t, e.alternate, e), e = e.sibling;
  }
  function va(t, e) {
    for (t = t.child; t !== null; ) {
      var a = t, s = e;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ya(4, a, a.return), va(
            a,
            s
          );
          break;
        case 1:
          Ie(a, a.return);
          var u = a.stateNode;
          typeof u.componentWillUnmount == "function" && y0(
            a,
            a.return,
            u
          ), va(
            a,
            s
          );
          break;
        case 27:
          (s & 2) !== 0 && Lb(
            a.stateNode,
            a.type,
            a.memoizedProps
          );
        case 5:
          Ie(a, a.return), a.tag !== 5 && a.tag !== 27 || Dr(a), va(
            a,
            s
          );
          break;
        case 6:
          Dr(a);
          break;
        case 26:
          Ie(a, a.return), u = a.stateNode, a.memoizedState !== null || u === null || kt || u.parentNode.removeChild(u), va(
            a,
            s
          );
          break;
        case 22:
          a.memoizedState === null && va(
            a,
            s
          );
          break;
        case 30:
          Ie(a, a.return), va(
            a,
            s
          );
          break;
        case 7:
          Ie(a, a.return);
        default:
          va(
            a,
            s
          );
      }
      t = t.sibling;
    }
  }
  function Fn(t, e, a) {
    for (a = (e.subtreeFlags & 8772) !== 0 ? a : a & -2, e = e.child; e !== null; ) {
      var s = e.alternate, u = t, c = e, b = c.flags, C = (a & 1) !== 0;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Fn(
            u,
            c,
            a
          ), Or(4, c);
          break;
        case 1:
          if (Fn(
            u,
            c,
            a
          ), s = c, u = s.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (k) {
              $t(s, s.return, k);
            }
          if (s = c, u = s.updateQueue, u !== null) {
            var M = s.stateNode;
            try {
              var P = u.shared.hiddenCallbacks;
              if (P !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < P.length; u++)
                  av(P[u], M);
            } catch (k) {
              $t(s, s.return, k);
            }
          }
          C && b & 64 && g0(c), fi(c, c.return);
          break;
        case 27:
          (a & 2) !== 0 && S0(c);
        case 5:
          c.tag !== 5 && c.tag !== 27 || v0(c), Fn(
            u,
            c,
            a
          ), C && s === null && b & 4 && Bd(c), fi(c, c.return);
          break;
        case 6:
          v0(c);
          break;
        case 26:
          M = c.stateNode, c.memoizedState !== null || M === null || Ne || jh(
            Hr(M.ownerDocument),
            c.type,
            M
          ), Fn(
            u,
            c,
            a
          ), C && s === null && b & 4 && Bd(c), fi(c, c.return);
          break;
        case 12:
          Fn(
            u,
            c,
            a
          );
          break;
        case 31:
          Fn(
            u,
            c,
            a
          ), C && b & 4 && N0(u, c);
          break;
        case 13:
          Fn(
            u,
            c,
            a
          ), C && b & 4 && j0(u, c);
          break;
        case 22:
          c.memoizedState === null && Fn(
            u,
            c,
            a
          ), fi(c, c.return);
          break;
        case 30:
          Fn(
            u,
            c,
            a
          ), fi(c, c.return);
          break;
        case 7:
          fi(c, c.return);
        default:
          Fn(
            u,
            c,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Zd(t, e) {
    var a = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== a && (t != null && t.refCount++, a != null && gr(a));
  }
  function Qd(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && gr(t));
  }
  function jn(t, e, a, s) {
    var u = (a & 335544064) === a;
    if (e.subtreeFlags & (u ? 10262 : 10256))
      for (e = e.child; e !== null; )
        B0(
          t,
          e,
          a,
          s
        ), e = e.sibling;
    else u && w0(e);
  }
  function B0(t, e, a, s) {
    var u = (a & 335544064) === a;
    u && e.alternate === null && e.return !== null && e.return.alternate !== null && Cu(e);
    var c = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        jn(
          t,
          e,
          a,
          s
        ), c & 2048 && Or(9, e);
        break;
      case 1:
        jn(
          t,
          e,
          a,
          s
        );
        break;
      case 3:
        jn(
          t,
          e,
          a,
          s
        ), u && Xd && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), c & 2048 && (c = null, e.alternate !== null && (c = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== c && (e.refCount++, c != null && gr(c)));
        break;
      case 12:
        if (c & 2048) {
          jn(
            t,
            e,
            a,
            s
          ), c = e.stateNode;
          try {
            var b = e.memoizedProps, C = b.id, M = b.onPostCommit;
            typeof M == "function" && M(
              C,
              e.alternate === null ? "mount" : "update",
              c.passiveEffectDuration,
              -0
            );
          } catch (P) {
            $t(e, e.return, P);
          }
        } else
          jn(
            t,
            e,
            a,
            s
          );
        break;
      case 31:
        jn(
          t,
          e,
          a,
          s
        );
        break;
      case 13:
        jn(
          t,
          e,
          a,
          s
        );
        break;
      case 23:
        break;
      case 22:
        b = e.stateNode, C = e.alternate, e.memoizedState !== null ? (u && C !== null && C.memoizedState === null && Cu(C), b._visibility & 2 ? jn(
          t,
          e,
          a,
          s
        ) : Nr(
          t,
          e
        )) : (u && C !== null && C.memoizedState !== null && Cu(e), b._visibility & 2 ? jn(
          t,
          e,
          a,
          s
        ) : (b._visibility |= 2, ls(
          t,
          e,
          a,
          s,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), c & 2048 && Zd(C, e);
        break;
      case 24:
        jn(
          t,
          e,
          a,
          s
        ), c & 2048 && Qd(e.alternate, e);
        break;
      case 30:
        u && (c = e.alternate, c !== null && (hi(c.child, !0), hi(e.child, !0))), jn(
          t,
          e,
          a,
          s
        );
        break;
      default:
        jn(
          t,
          e,
          a,
          s
        );
    }
  }
  function ls(t, e, a, s, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var c = t, b = e, C = a, M = s, P = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          ls(
            c,
            b,
            C,
            M,
            u
          ), Or(8, b);
          break;
        case 23:
          break;
        case 22:
          var k = b.stateNode;
          b.memoizedState !== null ? k._visibility & 2 ? ls(
            c,
            b,
            C,
            M,
            u
          ) : Nr(
            c,
            b
          ) : (k._visibility |= 2, ls(
            c,
            b,
            C,
            M,
            u
          )), u && P & 2048 && Zd(
            b.alternate,
            b
          );
          break;
        case 24:
          ls(
            c,
            b,
            C,
            M,
            u
          ), u && P & 2048 && Qd(b.alternate, b);
          break;
        default:
          ls(
            c,
            b,
            C,
            M,
            u
          );
      }
      e = e.sibling;
    }
  }
  function Nr(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t, s = e, u = s.flags;
        switch (s.tag) {
          case 22:
            Nr(a, s), u & 2048 && Zd(
              s.alternate,
              s
            );
            break;
          case 24:
            Nr(a, s), u & 2048 && Qd(s.alternate, s);
            break;
          default:
            Nr(a, s);
        }
        e = e.sibling;
      }
  }
  var fo = 8192;
  function ho(t, e, a) {
    if (t.subtreeFlags & fo)
      for (t = t.child; t !== null; )
        P0(
          t,
          e,
          a
        ), t = t.sibling;
  }
  function P0(t, e, a) {
    switch (t.tag) {
      case 26:
        ho(
          t,
          e,
          a
        ), t.flags & fo && (t.memoizedState !== null ? CR(
          a,
          kn,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && kb(a, t)));
        break;
      case 5:
        ho(
          t,
          e,
          a
        ), t.flags & fo && (t = t.stateNode, (e & 335544128) === e && kb(a, t));
        break;
      case 3:
      case 4:
        var s = kn;
        kn = Hr(t.stateNode.containerInfo), ho(
          t,
          e,
          a
        ), kn = s;
        break;
      case 22:
        t.memoizedState === null && (s = t.alternate, s !== null && s.memoizedState !== null ? (s = fo, fo = 16777216, ho(
          t,
          e,
          a
        ), fo = s) : ho(
          t,
          e,
          a
        ));
        break;
      case 30:
        if ((t.flags & fo) !== 0 && (s = t.memoizedProps.name, s != null && s !== "auto")) {
          var u = t.stateNode;
          u.paired = null, gn === null && (gn = /* @__PURE__ */ new Map()), gn.set(s, u);
        }
        ho(
          t,
          e,
          a
        );
        break;
      default:
        ho(
          t,
          e,
          a
        );
    }
  }
  function U0(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function jr(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var s = e[a];
          je = s, I0(
            s,
            t
          );
        }
      U0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        H0(t), t = t.sibling;
  }
  function H0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        jr(t), t.flags & 2048 && ya(9, t, t.return);
        break;
      case 3:
        jr(t);
        break;
      case 12:
        jr(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Ru(t)) : jr(t);
        break;
      default:
        jr(t);
    }
  }
  function Ru(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var s = e[a];
          je = s, I0(
            s,
            t
          );
        }
      U0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ya(8, e, e.return), Ru(e);
          break;
        case 22:
          a = e.stateNode, a._visibility & 2 && (a._visibility &= -3, Ru(e));
          break;
        default:
          Ru(e);
      }
      t = t.sibling;
    }
  }
  function I0(t, e) {
    for (; je !== null; ) {
      var a = je;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ya(8, a, e);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var s = a.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          gr(a.memoizedState.cache);
      }
      if (s = a.child, s !== null) s.return = a, je = s;
      else
        t: for (a = t; je !== null; ) {
          s = je;
          var u = s.sibling, c = s.return;
          if (D0(s), s === a) {
            je = null;
            break t;
          }
          if (u !== null) {
            u.return = c, je = u;
            break t;
          }
          je = c;
        }
    }
  }
  var bA = {
    getCacheForType: function(t) {
      var e = Pe(ge), a = e.data.get(t);
      return a === void 0 && (a = t(), e.data.set(t, a)), a;
    },
    cacheSignal: function() {
      return Pe(ge).controller.signal;
    }
  }, SA = typeof WeakMap == "function" ? WeakMap : Map, Gt = 0, Wt = null, Nt = null, zt = 0, Xt = 0, yn = null, ba = !1, us = !1, Jd = !1, Gi = 0, de = 0, Sa = 0, mo = 0, Ou = 0, vn = 0, cs = 0, zr = null, rn = null, Wd = !1, Du = 0, q0 = 0, Mu = 1 / 0, Nu = null, xa = null, re = 0, Xn = null, po = null, yi = 0, th = 0, eh = null, G0 = null, fs = null, ds = null, hs = null, Lr = 0, ju = null;
  function bn() {
    return (Gt & 2) !== 0 && zt !== 0 ? zt & -zt : nt.T !== null ? fh() : Fg();
  }
  function Y0() {
    if (vn === 0)
      if ((zt & 536870912) === 0 || Ot) {
        var t = Al;
        Al <<= 1, (Al & 3932160) === 0 && (Al = 262144), vn = t;
      } else vn = 536870912;
    return t = Ue.current, t !== null && (t.flags |= 32), vn;
  }
  function ms(t, e) {
    if (e != null) {
      var a = t.stateNode, s = a.ref;
      s === null && (s = a.ref = Cb(
        ji(t.memoizedProps, a)
      )), ds === null && (ds = []), ds.push(e.bind(null, s));
    }
  }
  function ln(t, e, a) {
    (t === Wt && (Xt === 2 || Xt === 9) || t.cancelPendingCommit !== null) && (ps(t, 0), Ta(
      t,
      zt,
      vn,
      !1
    )), nr(t, a), ((Gt & 2) === 0 || t !== Wt) && (t === Wt && ((Gt & 2) === 0 && (mo |= a), de === 4 && Ta(
      t,
      zt,
      vn,
      !1
    )), vi(t));
  }
  function k0(t, e, a) {
    if ((Gt & 6) !== 0) throw Error(r(327));
    var s = !a && (e & 127) === 0 && (e & t.expiredLanes) === 0 || er(t, e), u = s ? EA(t, e) : ih(t, e, !0), c = s;
    do {
      if (u === 0) {
        us && !s && Ta(t, e, 0, !1);
        break;
      } else {
        if (a = t.current.alternate, c && !xA(a)) {
          u = ih(t, e, !1), c = !1;
          continue;
        }
        if (u === 2) {
          if (c = e, t.errorRecoveryDisabledLanes & c)
            var b = 0;
          else
            b = t.pendingLanes & -536870913, b = b !== 0 ? b : b & 536870912 ? 536870912 : 0;
          if (b !== 0) {
            e = b;
            t: {
              var C = t;
              u = zr;
              var M = C.current.memoizedState.isDehydrated;
              if (M && (ps(C, b).flags |= 256), b = ih(
                C,
                b,
                !1
              ), b !== 2 && b !== 6) {
                if (Jd && !M) {
                  C.errorRecoveryDisabledLanes |= c, mo |= c, u = 4;
                  break t;
                }
                c = rn, rn = u, c !== null && (rn === null ? rn = c : rn.push.apply(
                  rn,
                  c
                ));
              }
              u = b;
            }
            if (c = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          ps(t, 0), Ta(t, e, 0, !0);
          break;
        }
        t: {
          switch (s = t, c = u, c) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              Ta(
                s,
                e,
                vn,
                !ba
              );
              break t;
            case 2:
              rn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (u = Du + 300 - Oe(), 10 < u)) {
            if (Ta(
              s,
              e,
              vn,
              !ba
            ), Ol(s, 0, !0) !== 0) break t;
            yi = e, s.timeoutHandle = Th(
              F0.bind(
                null,
                s,
                a,
                rn,
                Nu,
                Wd,
                e,
                vn,
                mo,
                cs,
                ba,
                c,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          F0(
            s,
            a,
            rn,
            Nu,
            Wd,
            e,
            vn,
            mo,
            cs,
            ba,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    vi(t);
  }
  function F0(t, e, a, s, u, c, b, C, M, P, k, K, L, G) {
    t.timeoutHandle = -1;
    var ot = e.subtreeFlags, mt = (c & 335544064) === c;
    if (K = null, (mt || ot & 8192 || (ot & 16785408) === 16785408) && (K = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: li
    }, gn = null, P0(
      e,
      c,
      K
    ), mt && (ot = K, mt = t.containerInfo, mt = (mt.nodeType === 9 ? mt : mt.ownerDocument).__reactViewTransition, mt != null && (ot.count++, ot.waitingForViewTransition = !0, ot = Gr.bind(ot), mt.finished.then(ot, ot))), ot = (c & 62914560) === c ? Du - Oe() : (c & 4194048) === c ? q0 - Oe() : 0, ot = wR(
      K,
      ot
    ), ot !== null)) {
      yi = c, t.cancelPendingCommit = ot(
        tb.bind(
          null,
          t,
          e,
          c,
          a,
          s,
          u,
          b,
          C,
          M,
          P,
          k,
          K,
          null,
          L,
          G
        )
      ), Ta(t, c, b, !P);
      return;
    }
    tb(
      t,
      e,
      c,
      a,
      s,
      u,
      b,
      C,
      M,
      P,
      k,
      K
    );
  }
  function xA(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if ((a === 0 || a === 11 || a === 15) && e.flags & 16384 && (a = e.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var s = 0; s < a.length; s++) {
          var u = a[s], c = u.getSnapshot;
          u = u.value;
          try {
            if (!mn(c(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = e.child, e.subtreeFlags & 16384 && a !== null)
        a.return = e, e = a;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Ta(t, e, a, s) {
    e = Ig(t, e), e &= ~Ou, e &= ~mo, t.suspendedLanes |= e, t.pingedLanes &= ~e, s && (t.warmLanes |= e), s = t.expirationTimes;
    for (var u = e; 0 < u; ) {
      var c = 31 - dn(u), b = 1 << c;
      s[c] = -1, u &= ~b;
    }
    a !== 0 && Gg(t, a, e);
  }
  function zu() {
    return (Gt & 6) === 0 ? (Vr(0), !1) : !0;
  }
  function nh() {
    if (Nt !== null) {
      if (Xt === 0)
        var t = Nt.return;
      else
        t = Nt, Bi = eo = null, cd(t), es = null, br = 0, t = Nt;
      for (; t !== null; )
        p0(t.alternate, t), t = t.return;
      Nt = null;
    }
  }
  function ps(t, e) {
    var a = t.timeoutHandle;
    return a !== -1 && (t.timeoutHandle = -1, kA(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, a()), yi = 0, nh(), Wt = t, Nt = a = Li(t.current, null), zt = e, Xt = 0, yn = null, ba = !1, us = er(t, e), Jd = !1, cs = vn = Ou = mo = Sa = de = 0, rn = zr = null, Wd = !1, Gi = Ig(t, e), ql(), a;
  }
  function X0(t, e) {
    wt = null, nt.H = hu, e === ts || e === Wl ? (e = tv(), Xt = 3) : e === Qf ? (e = tv(), Xt = 4) : Xt = e === wd ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, yn = e, Nt === null && (de = 1, mu(
      t,
      On(e, t.current)
    ));
  }
  function $0() {
    var t = Ue.current;
    return t === null ? !0 : (zt & 4194048) === zt ? $e === null : (zt & 62914560) === zt || (zt & 536870912) !== 0 ? t === $e : !1;
  }
  function K0() {
    var t = nt.H;
    return nt.H = hu, t === null ? hu : t;
  }
  function Z0() {
    var t = nt.A;
    return nt.A = bA, t;
  }
  function Lu() {
    de = 4, ba || (zt & 4194048) !== zt && Ue.current !== null || (us = !0), (Sa & 134217727) === 0 && (mo & 134217727) === 0 || Wt === null || Ta(
      Wt,
      zt,
      vn,
      !1
    );
  }
  function ih(t, e, a) {
    var s = Gt;
    Gt |= 2;
    var u = K0(), c = Z0();
    (Wt !== t || zt !== e) && (Nu = null, ps(t, e)), e = !1;
    var b = de;
    t: do
      try {
        if (Xt !== 0 && Nt !== null) {
          var C = Nt, M = yn;
          switch (Xt) {
            case 8:
              nh(), b = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ue.current === null && (e = !0);
              var P = Xt;
              if (Xt = 0, yn = null, gs(t, C, M, P), a && us) {
                b = 0;
                break t;
              }
              break;
            default:
              P = Xt, Xt = 0, yn = null, gs(t, C, M, P);
          }
        }
        TA(), b = de;
        break;
      } catch (k) {
        X0(t, k);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Bi = eo = null, Gt = s, nt.H = u, nt.A = c, Nt === null && (Wt = null, zt = 0, ql()), b;
  }
  function TA() {
    for (; Nt !== null; ) Q0(Nt);
  }
  function EA(t, e) {
    var a = Gt;
    Gt |= 2;
    var s = K0(), u = Z0();
    Wt !== t || zt !== e ? (Nu = null, Mu = Oe() + 500, ps(t, e)) : us = er(
      t,
      e
    );
    t: do
      try {
        if (Xt !== 0 && Nt !== null) {
          e = Nt;
          var c = yn;
          e: switch (Xt) {
            case 1:
              Xt = 0, yn = null, gs(t, e, c, 1);
              break;
            case 2:
            case 9:
              if (Jy(c)) {
                Xt = 0, yn = null, J0(e);
                break;
              }
              e = function() {
                Xt !== 2 && Xt !== 9 || Wt !== t || (Xt = 7), vi(t);
              }, c.then(e, e);
              break t;
            case 3:
              Xt = 7;
              break t;
            case 4:
              Xt = 5;
              break t;
            case 7:
              Jy(c) ? (Xt = 0, yn = null, J0(e)) : (Xt = 0, yn = null, gs(t, e, c, 7));
              break;
            case 5:
              var b = null;
              switch (Nt.tag) {
                case 26:
                  b = Nt.memoizedState;
                case 5:
                case 27:
                  var C = Nt;
                  if (b ? Gb(b) : C.stateNode.complete) {
                    Xt = 0, yn = null;
                    var M = C.sibling;
                    if (M !== null) Nt = M;
                    else {
                      var P = C.return;
                      P !== null ? (Nt = P, Vu(P)) : Nt = null;
                    }
                    break e;
                  }
              }
              Xt = 0, yn = null, gs(t, e, c, 5);
              break;
            case 6:
              Xt = 0, yn = null, gs(t, e, c, 6);
              break;
            case 8:
              nh(), de = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        CA();
        break;
      } catch (k) {
        X0(t, k);
      }
    while (!0);
    return Bi = eo = null, nt.H = s, nt.A = u, Gt = a, Nt !== null ? 0 : (Wt = null, zt = 0, ql(), de);
  }
  function CA() {
    for (; Nt !== null && !Lo(); )
      Q0(Nt);
  }
  function Q0(t) {
    var e = h0(t.alternate, t, Gi);
    t.memoizedProps = t.pendingProps, e === null ? Vu(t) : Nt = e;
  }
  function J0(t) {
    var e = t, a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = s0(
          a,
          e,
          e.pendingProps,
          e.type,
          void 0,
          zt
        );
        break;
      case 11:
        e = s0(
          a,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          zt
        );
        break;
      case 5:
        cd(e);
        var s = e;
        s === Me && (Ot ? ($l(s), s.tag === 5 && s.stateNode != null && (ee = s.stateNode)) : ($l(s), Ot = !0));
      default:
        p0(a, e), e = Nt = Iy(e, Gi), e = h0(a, e, Gi);
    }
    t.memoizedProps = t.pendingProps, e === null ? Vu(t) : Nt = e;
  }
  function gs(t, e, a, s) {
    Bi = eo = null, cd(e), es = null, br = 0;
    var u = e.return;
    try {
      if (fA(
        t,
        u,
        e,
        a,
        zt
      )) {
        de = 1, mu(
          t,
          On(a, t.current)
        ), Nt = null;
        return;
      }
    } catch (c) {
      if (u !== null) throw Nt = u, c;
      de = 1, mu(
        t,
        On(a, t.current)
      ), Nt = null;
      return;
    }
    e.flags & 32768 ? (Ot || s === 1 ? t = !0 : us || (zt & 536870912) !== 0 ? t = !1 : (ba = t = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = Ue.current, s !== null && s.tag === 13 && (s.flags |= 16384))), W0(e, t)) : Vu(e);
  }
  function Vu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        W0(
          e,
          ba
        );
        return;
      }
      t = e.return;
      var a = pA(
        e.alternate,
        e,
        Gi
      );
      if (a !== null) {
        Nt = a;
        return;
      }
      if (e = e.sibling, e !== null) {
        Nt = e;
        return;
      }
      Nt = e = t;
    } while (e !== null);
    de === 0 && (de = 5);
  }
  function W0(t, e) {
    do {
      var a = gA(t.alternate, t);
      if (a !== null) {
        a.flags &= 32767, Nt = a;
        return;
      }
      if (a = t.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !e && (t = t.sibling, t !== null)) {
        Nt = t;
        return;
      }
      Nt = t = a;
    } while (t !== null);
    de = 6, Nt = null;
  }
  function tb(t, e, a, s, u, c, b, C, M, P, k, K) {
    t.cancelPendingCommit = null;
    do
      Bu();
    while (re !== 0);
    if ((Gt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      t === Wt && (Nt = Wt = null, zt = 0), po = e, Xn = t, yi = a, eh = u, G0 = s, wA(
        t,
        e,
        a,
        b,
        C,
        M,
        K
      );
    }
  }
  function wA(t, e, a, s, u, c, b) {
    var C = e.lanes | e.childLanes;
    if (th = C, C |= Pf, Qw(
      t,
      a,
      C,
      s,
      u,
      c
    ), ds = null, (a & 335544064) === a ? (hs = W_(t), s = 10262) : (hs = null, s = 10256), (e.subtreeFlags & s) !== 0 || (e.flags & s) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, MA(Rt, function() {
      return rh(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Tu = !1, s = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || s) {
      s = nt.T, nt.T = null, u = at.p, at.p = 2, c = Gt, Gt |= 4;
      try {
        yA(t, e, a);
      } finally {
        Gt = c, at.p = u, nt.T = s;
      }
    }
    re = 1, Tu ? fs = QA(
      b,
      t.containerInfo,
      hs,
      ah,
      oh,
      AA,
      sh,
      rh,
      _A
    ) : (ah(), oh(), sh());
  }
  function _A(t) {
    if (re !== 0) {
      var e = Xn.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function AA() {
    re === 3 && (re = 0, V0(po, Xn), re = 4);
  }
  function ah() {
    if (re === 1) {
      re = 0;
      var t = Xn, e = po, a = yi, s = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || s) {
        s = nt.T, nt.T = null;
        var u = at.p;
        at.p = 2;
        var c = Gt;
        Gt |= 4;
        try {
          Mr = wu = !1, z0(e, t, a), a = bh;
          var b = My(t.containerInfo), C = a.focusedElem, M = a.selectionRange;
          if (b !== C && C && C.ownerDocument && Dy(
            C.ownerDocument.documentElement,
            C
          )) {
            if (M !== null && jf(C)) {
              var P = M.start, k = M.end;
              if (k === void 0 && (k = P), "selectionStart" in C)
                C.selectionStart = P, C.selectionEnd = Math.min(
                  k,
                  C.value.length
                );
              else {
                var K = C.ownerDocument || document, L = K && K.defaultView || window;
                if (L.getSelection) {
                  var G = L.getSelection(), ot = C.textContent.length, mt = Math.min(M.start, ot), _t = M.end === void 0 ? mt : Math.min(M.end, ot);
                  !G.extend && mt > _t && (b = _t, _t = mt, mt = b);
                  var B = Oy(
                    C,
                    mt
                  ), j = Oy(
                    C,
                    _t
                  );
                  if (B && j && (G.rangeCount !== 1 || G.anchorNode !== B.node || G.anchorOffset !== B.offset || G.focusNode !== j.node || G.focusOffset !== j.offset)) {
                    var H = K.createRange();
                    H.setStart(B.node, B.offset), G.removeAllRanges(), mt > _t ? (G.addRange(H), G.extend(j.node, j.offset)) : (H.setEnd(j.node, j.offset), G.addRange(H));
                  }
                }
              }
            }
            for (K = [], G = C; G = G.parentNode; )
              G.nodeType === 1 && K.push({
                element: G,
                left: G.scrollLeft,
                top: G.scrollTop
              });
            for (typeof C.focus == "function" && C.focus(), C = 0; C < K.length; C++) {
              var $ = K[C];
              $.element.scrollLeft = $.left, $.element.scrollTop = $.top;
            }
          }
          Cs = !!vh, bh = vh = null;
        } finally {
          Gt = c, at.p = u, nt.T = s;
        }
      }
      t.current = e, re = 2;
    }
  }
  function oh() {
    if (re === 2) {
      re = 0;
      var t = Xn, e = po, a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        a = nt.T, nt.T = null;
        var s = at.p;
        at.p = 2;
        var u = Gt;
        Gt |= 4;
        try {
          R0(t, e.alternate, e);
        } finally {
          Gt = u, at.p = s, nt.T = a;
        }
      }
      re = 3;
    }
  }
  function sh() {
    if (re === 4 || re === 3) {
      re = 0;
      var t = fs;
      fs = null, me();
      var e = Xn, a = po, s = yi, u = G0, c = (s & 335544064) === s ? 10262 : 10256;
      if ((a.subtreeFlags & c) !== 0 || (a.flags & c) !== 0 ? re = 5 : (re = 0, po = Xn = null, eb(e, e.pendingLanes)), c = e.pendingLanes, c === 0 && (xa = null), pf(s), a = a.stateNode, fn && typeof fn.onCommitFiberRoot == "function")
        try {
          fn.onCommitFiberRoot(
            tr,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        a = nt.T, c = at.p, at.p = 2, nt.T = null;
        try {
          for (var b = e.onRecoverableError, C = 0; C < u.length; C++) {
            var M = u[C];
            b(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          nt.T = a, at.p = c;
        }
      }
      if (u = ds, b = hs, hs = null, u !== null && (ds = null, b === null && (b = []), t !== null))
        for (M = 0; M < u.length; M++)
          a = (0, u[M])(
            b
          ), a !== void 0 && t.finished.finally(a);
      (yi & 3) !== 0 && Bu(), vi(e), c = e.pendingLanes, (s & 261930) !== 0 && (c & 42) !== 0 ? e === ju ? Lr++ : (Lr = 0, ju = e) : (Lr = 0, ju = null), Vr(0);
    }
  }
  function eb(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, gr(e)));
  }
  function Bu() {
    return fs !== null && (fs.skipTransition(), fs = null), ah(), oh(), sh(), rh();
  }
  function rh() {
    if (re !== 5) return !1;
    var t = Xn, e = th;
    th = 0;
    var a = pf(yi), s = nt.T, u = at.p;
    try {
      at.p = 32 > a ? 32 : a, nt.T = null, a = eh, eh = null;
      var c = Xn, b = yi;
      if (re = 0, po = Xn = null, yi = 0, (Gt & 6) !== 0) throw Error(r(331));
      var C = Gt;
      if (Gt |= 4, H0(c.current), B0(
        c,
        c.current,
        b,
        a
      ), Gt = C, Vr(0, !1), fn && typeof fn.onPostCommitFiberRoot == "function")
        try {
          fn.onPostCommitFiberRoot(tr, c);
        } catch {
        }
      return !0;
    } finally {
      at.p = u, nt.T = s, eb(t, e);
    }
  }
  function nb(t, e, a) {
    e = On(a, e), e = Cd(t.stateNode, e, 2), t = ha(t, e, 2), t !== null && (nr(t, 2), vi(t));
  }
  function $t(t, e, a) {
    if (t.tag === 3)
      nb(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          nb(
            e,
            t,
            a
          );
          break;
        } else if (e.tag === 1) {
          var s = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (xa === null || !xa.has(s))) {
            t = On(a, t), a = Jv(2), s = ha(e, a, 2), s !== null && (Wv(
              a,
              s,
              e,
              t
            ), nr(s, 2), vi(s));
            break;
          }
        }
        e = e.return;
      }
  }
  function lh(t, e, a) {
    var s = t.pingCache;
    if (s === null) {
      s = t.pingCache = new SA();
      var u = /* @__PURE__ */ new Set();
      s.set(e, u);
    } else
      u = s.get(e), u === void 0 && (u = /* @__PURE__ */ new Set(), s.set(e, u));
    u.has(a) || (Jd = !0, u.add(a), t = RA.bind(null, t, e, a), e.then(t, t));
  }
  function RA(t, e, a) {
    var s = t.pingCache;
    s !== null && s.delete(e), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, Wt === t && (zt & a) === a && ((de === 4 || de === 3 && (zt & 62914560) === zt && 300 > Oe() - Du) && (Gt & 2) === 0 ? ps(t, 0) : Ou |= a, cs === zt && (cs = 0)), vi(t);
  }
  function ib(t, e) {
    e === 0 && (e = qg()), t = Ja(t, e), t !== null && (nr(t, e), vi(t));
  }
  function OA(t) {
    var e = t.memoizedState, a = 0;
    e !== null && (a = e.retryLane), ib(t, a);
  }
  function DA(t, e) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var s = t.stateNode, u = t.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        s = t.stateNode;
        break;
      case 22:
        s = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    s !== null && s.delete(e), ib(t, a);
  }
  function MA(t, e) {
    return Fe(t, e);
  }
  var ys = null, vs = null, uh = !1, Pu = !1, ch = !1, Ea = 0;
  function vi(t) {
    t !== vs && t.next === null && (vs === null ? ys = vs = t : vs = vs.next = t), Pu = !0, uh || (uh = !0, jA());
  }
  function Vr(t, e) {
    if (!ch && Pu) {
      ch = !0;
      do
        for (var a = !1, s = ys; s !== null; ) {
          if (t !== 0) {
            var u = s.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var b = s.suspendedLanes, C = s.pingedLanes;
              c = (1 << 31 - dn(42 | t) + 1) - 1, c &= u & ~(b & ~C), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (a = !0, rb(s, c));
          } else
            c = zt, c = Ol(
              s,
              s === Wt ? c : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (c & 3) === 0 || er(s, c) || (a = !0, rb(s, c));
          s = s.next;
        }
      while (a);
      ch = !1;
    }
  }
  function NA() {
    ab();
  }
  function ab() {
    Pu = uh = !1;
    var t = 0;
    Ea !== 0 && YA() && (t = Ea);
    for (var e = Oe(), a = null, s = ys; s !== null; ) {
      var u = s.next, c = ob(s, e);
      c === 0 ? (s.next = null, a === null ? ys = u : a.next = u, u === null && (vs = a)) : (a = s, (t !== 0 || (c & 3) !== 0) && (Pu = !0)), s = u;
    }
    re !== 0 && re !== 5 || Vr(t), Ea !== 0 && (Ea = 0);
  }
  function ob(t, e) {
    for (var a = t.suspendedLanes, s = t.pingedLanes, u = t.expirationTimes, c = t.pendingLanes & -62914561; 0 < c; ) {
      var b = 31 - dn(c), C = 1 << b, M = u[b];
      M === -1 ? ((C & a) === 0 || (C & s) !== 0) && (u[b] = Zw(C, e)) : M <= e && (t.expiredLanes |= C), c &= ~C;
    }
    if (e = Wt, a = zt, a = Ol(
      t,
      t === e ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), s = t.callbackNode, a === 0 || t === e && (Xt === 2 || Xt === 9) || t.cancelPendingCommit !== null)
      return s !== null && s !== null && Xe(s), t.callbackNode = null, t.callbackPriority = 0;
    if ((a & 3) === 0 || er(t, a)) {
      if (e = a & -a, e === t.callbackPriority) return e;
      switch (s !== null && Xe(s), pf(a)) {
        case 2:
        case 8:
          a = Js;
          break;
        case 32:
          a = Rt;
          break;
        case 268435456:
          a = ri;
          break;
        default:
          a = Rt;
      }
      return s = sb.bind(null, t), a = Fe(a, s), t.callbackPriority = e, t.callbackNode = a, e;
    }
    return s !== null && s !== null && Xe(s), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function sb(t, e) {
    if (re !== 0 && re !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var a = t.callbackNode;
    if (Bu() && t.callbackNode !== a)
      return null;
    var s = zt;
    return s = Ol(
      t,
      t === Wt ? s : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), s === 0 ? null : (k0(t, s, e), ob(t, Oe()), t.callbackNode != null && t.callbackNode === a ? sb.bind(null, t) : null);
  }
  function rb(t, e) {
    if (Bu()) return null;
    k0(t, e, !0);
  }
  function jA() {
    FA(function() {
      (Gt & 6) !== 0 ? Fe(
        Vo,
        NA
      ) : ab();
    });
  }
  function fh() {
    if (Ea === 0) {
      var t = ao;
      t === 0 && (t = _l, _l <<= 1, (_l & 261888) === 0 && (_l = 256)), Ea = t;
    }
    return Ea;
  }
  function lb(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : zl(t);
  }
  function zA(t, e, a, s, u) {
    if (e === "submit" && a && a.stateNode === u) {
      var c = lb(
        (u[nn] || null).action
      ), b = s.submitter;
      b && (e = (e = b[nn] || null) ? lb(e.formAction) : b.getAttribute("formAction"), e !== null && (c = e, b = null));
      var C = new Pl(
        "action",
        "action",
        null,
        s,
        u
      );
      t.push({
        event: C,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (s.defaultPrevented) {
                if (Ea !== 0) {
                  var M = new FormData(u, b);
                  bd(
                    a,
                    {
                      pending: !0,
                      data: M,
                      method: u.method,
                      action: c
                    },
                    null,
                    M
                  );
                }
              } else
                typeof c == "function" && (C.preventDefault(), M = new FormData(u, b), bd(
                  a,
                  {
                    pending: !0,
                    data: M,
                    method: u.method,
                    action: c
                  },
                  c,
                  M
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var dh = 0; dh < Bf.length; dh++) {
    var hh = Bf[dh], LA = hh.toLowerCase(), VA = hh[0].toUpperCase() + hh.slice(1);
    Gn(
      LA,
      "on" + VA
    );
  }
  Gn(zy, "onAnimationEnd"), Gn(Ly, "onAnimationIteration"), Gn(Vy, "onAnimationStart"), Gn("dblclick", "onDoubleClick"), Gn("focusin", "onFocus"), Gn("focusout", "onBlur"), Gn(k_, "onTransitionRun"), Gn(F_, "onTransitionStart"), Gn(X_, "onTransitionCancel"), Gn(By, "onTransitionEnd"), Ho("onMouseEnter", ["mouseout", "mouseover"]), Ho("onMouseLeave", ["mouseout", "mouseover"]), Ho("onPointerEnter", ["pointerout", "pointerover"]), Ho("onPointerLeave", ["pointerout", "pointerover"]), Ka(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ka(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ka("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ka(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ka(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ka(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Br = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), BA = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Br)
  );
  function ub(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var s = t[a], u = s.event;
      s = s.listeners;
      t: {
        var c = void 0;
        if (e)
          for (var b = s.length - 1; 0 <= b; b--) {
            var C = s[b], M = C.instance, P = C.currentTarget;
            if (C = C.listener, M !== c && u.isPropagationStopped())
              break t;
            c = C, u.currentTarget = P;
            try {
              c(u);
            } catch (k) {
              Il(k);
            }
            u.currentTarget = null, c = M;
          }
        else
          for (b = 0; b < s.length; b++) {
            if (C = s[b], M = C.instance, P = C.currentTarget, C = C.listener, M !== c && u.isPropagationStopped())
              break t;
            c = C, u.currentTarget = P;
            try {
              c(u);
            } catch (k) {
              Il(k);
            }
            u.currentTarget = null, c = M;
          }
      }
    }
  }
  function jt(t, e) {
    var a = e[$g];
    a === void 0 && (a = e[$g] = /* @__PURE__ */ new Set());
    var s = t + "__bubble";
    a.has(s) || (cb(e, t, 2, !1), a.add(s));
  }
  function mh(t, e, a) {
    var s = 0;
    e && (s |= 4), cb(
      a,
      t,
      s,
      e
    );
  }
  var Uu = "_reactListening" + Math.random().toString(36).slice(2);
  function ph(t) {
    if (!t[Uu]) {
      t[Uu] = !0, Qg.forEach(function(a) {
        a !== "selectionchange" && (BA.has(a) || mh(a, !1, t), mh(a, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Uu] || (e[Uu] = !0, mh("selectionchange", !1, e));
    }
  }
  function cb(t, e, a, s) {
    switch (Wb(e)) {
      case 2:
        var u = OR;
        break;
      case 8:
        u = DR;
        break;
      default:
        u = Lh;
    }
    a = u.bind(
      null,
      e,
      a,
      t
    ), u = void 0, !Ef || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (u = !0), s ? u !== void 0 ? t.addEventListener(e, a, {
      capture: !0,
      passive: u
    }) : t.addEventListener(e, a, !0) : u !== void 0 ? t.addEventListener(e, a, {
      passive: u
    }) : t.addEventListener(e, a, !1);
  }
  function gh(t, e, a, s, u) {
    var c = s;
    if ((e & 1) === 0 && (e & 2) === 0 && s !== null)
      t: for (; ; ) {
        if (s === null) return;
        var b = s.tag;
        if (b === 3 || b === 4) {
          var C = s.stateNode.containerInfo;
          if (C === u) break;
          if (b === 4)
            for (b = s.return; b !== null; ) {
              var M = b.tag;
              if ((M === 3 || M === 4) && b.stateNode.containerInfo === u)
                return;
              b = b.return;
            }
          for (; C !== null; ) {
            if (b = $a(C), b === null) return;
            if (M = b.tag, M === 5 || M === 6 || M === 26 || M === 27) {
              s = c = b;
              continue t;
            }
            C = C.parentNode;
          }
        }
        s = s.return;
      }
    cy(function() {
      var P = c, k = xf(a), K = [];
      t: {
        var L = Py.get(t);
        if (L !== void 0) {
          var G = Pl, ot = t;
          switch (t) {
            case "keypress":
              if (Vl(a) === 0) break t;
            case "keydown":
            case "keyup":
              G = x_;
              break;
            case "focusin":
              ot = "focus", G = Af;
              break;
            case "focusout":
              ot = "blur", G = Af;
              break;
            case "beforeblur":
            case "afterblur":
              G = Af;
              break;
            case "click":
              if (a.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              G = hy;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              G = u_;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              G = __;
              break;
            case zy:
            case Ly:
            case Vy:
              G = d_;
              break;
            case By:
              G = R_;
              break;
            case "scroll":
            case "scrollend":
              G = r_;
              break;
            case "wheel":
              G = D_;
              break;
            case "copy":
            case "cut":
            case "paste":
              G = m_;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              G = py;
              break;
            case "submit":
              G = C_;
              break;
            case "toggle":
            case "beforetoggle":
              G = N_;
          }
          var mt = (e & 4) !== 0, _t = !mt && (t === "scroll" || t === "scrollend"), B = mt ? L !== null ? L + "Capture" : null : L;
          mt = [];
          for (var j = P, H; j !== null; ) {
            var $ = j;
            if (H = $.stateNode, $ = $.tag, $ !== 5 && $ !== 26 && $ !== 27 || H === null || B === null || ($ = or(j, B), $ != null && mt.push(
              Pr(j, $, H)
            )), _t) break;
            j = j.return;
          }
          0 < mt.length && (L = new G(
            L,
            ot,
            null,
            a,
            k
          ), K.push({ event: L, listeners: mt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (G = t === "mouseover" || t === "pointerover", L = t === "mouseout" || t === "pointerout", G && a !== Sf && (ot = a.relatedTarget || a.fromElement) && ($a(ot) || ot[Bo]))
            break t;
          (L || G) && (ot = k.window === k ? k : (G = k.ownerDocument) ? G.defaultView || G.parentWindow : window, L ? (G = a.relatedTarget || a.toElement, L = P, G = G ? $a(G) : null, G !== null && (_t = f(G), mt = G.tag, G !== _t || mt !== 5 && mt !== 27 && mt !== 6) && (G = null)) : (L = null, G = P), L !== G && (mt = hy, $ = "onMouseLeave", B = "onMouseEnter", j = "mouse", (t === "pointerout" || t === "pointerover") && (mt = py, $ = "onPointerLeave", B = "onPointerEnter", j = "pointer"), _t = L == null ? ot : ar(L), H = G == null ? ot : ar(G), ot = new mt(
            $,
            j + "leave",
            L,
            a,
            k
          ), ot.target = _t, ot.relatedTarget = H, $ = null, $a(k) === P && (mt = new mt(
            B,
            j + "enter",
            G,
            a,
            k
          ), mt.target = H, mt.relatedTarget = _t, $ = mt), _t = $, mt = L && G ? z(
            L,
            G,
            PA
          ) : null, L !== null && fb(
            K,
            ot,
            L,
            mt,
            !1
          ), G !== null && _t !== null && fb(
            K,
            _t,
            G,
            mt,
            !0
          )));
        }
        t: {
          if (L = P ? ar(P) : window, G = L.nodeName && L.nodeName.toLowerCase(), G === "select" || G === "input" && L.type === "file")
            var dt = Ey;
          else if (xy(L))
            if (Cy)
              dt = q_;
            else {
              dt = H_;
              var Lt = U_;
            }
          else
            G = L.nodeName, !G || G.toLowerCase() !== "input" || L.type !== "checkbox" && L.type !== "radio" ? P && bf(P.elementType) && (dt = Ey) : dt = I_;
          if (dt && (dt = dt(t, P))) {
            Ty(
              K,
              dt,
              a,
              k
            );
            break t;
          }
          Lt && Lt(t, L, P);
        }
        switch (Lt = P ? ar(P) : window, t) {
          case "focusin":
            (xy(Lt) || Lt.contentEditable === "true") && (Fo = Lt, zf = P, hr = null);
            break;
          case "focusout":
            hr = zf = Fo = null;
            break;
          case "mousedown":
            Lf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Lf = !1, Ny(K, a, k);
            break;
          case "selectionchange":
            if (Y_) break;
          case "keydown":
          case "keyup":
            Ny(K, a, k);
        }
        var vt;
        if (Of)
          t: {
            switch (t) {
              case "compositionstart":
                var St = "onCompositionStart";
                break t;
              case "compositionend":
                St = "onCompositionEnd";
                break t;
              case "compositionupdate":
                St = "onCompositionUpdate";
                break t;
            }
            St = void 0;
          }
        else
          ko ? by(t, a) && (St = "onCompositionEnd") : t === "keydown" && a.keyCode === 229 && (St = "onCompositionStart");
        St && (gy && a.locale !== "ko" && (ko || St !== "onCompositionStart" ? St === "onCompositionEnd" && ko && (vt = fy()) : (aa = k, Cf = "value" in aa ? aa.value : aa.textContent, ko = !0)), Lt = Hu(P, St), 0 < Lt.length && (St = new my(
          St,
          t,
          null,
          a,
          k
        ), K.push({ event: St, listeners: Lt }), vt ? St.data = vt : (vt = Sy(a), vt !== null && (St.data = vt)))), (vt = z_ ? L_(t, a) : V_(t, a)) && (St = Hu(P, "onBeforeInput"), 0 < St.length && (Lt = new my(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          k
        ), K.push({
          event: Lt,
          listeners: St
        }), Lt.data = vt)), zA(
          K,
          t,
          P,
          a,
          k
        );
      }
      ub(K, e);
    });
  }
  function Pr(t, e, a) {
    return {
      instance: t,
      listener: e,
      currentTarget: a
    };
  }
  function Hu(t, e) {
    for (var a = e + "Capture", s = []; t !== null; ) {
      var u = t, c = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || c === null || (u = or(t, a), u != null && s.unshift(
        Pr(t, u, c)
      ), u = or(t, e), u != null && s.push(
        Pr(t, u, c)
      )), t.tag === 3) return s;
      t = t.return;
    }
    return [];
  }
  function PA(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function fb(t, e, a, s, u) {
    for (var c = e._reactName, b = []; a !== null && a !== s; ) {
      var C = a, M = C.alternate, P = C.stateNode;
      if (C = C.tag, M !== null && M === s) break;
      C !== 5 && C !== 26 && C !== 27 || P === null || (M = P, u ? (P = or(a, c), P != null && b.unshift(
        Pr(a, P, M)
      )) : u || (P = or(a, c), P != null && b.push(
        Pr(a, P, M)
      ))), a = a.return;
    }
    b.length !== 0 && t.push({ event: e, listeners: b });
  }
  var UA = /\r\n?/g, HA = /\u0000|\uFFFD/g;
  function db(t) {
    return (typeof t == "string" ? t : "" + t).replace(UA, `
`).replace(HA, "");
  }
  function hb(t, e) {
    return e = db(e), db(t) === e;
  }
  function Kt(t, e, a, s, u, c) {
    switch (a) {
      case "children":
        if (typeof s == "string")
          e === "body" || e === "textarea" && s === "" || qo(t, s);
        else if (typeof s == "number" || typeof s == "bigint")
          e !== "body" && qo(t, "" + s);
        else return;
        break;
      case "className":
        jl(t, "class", s);
        break;
      case "tabIndex":
        jl(t, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        jl(t, a, s);
        break;
      case "style":
        ly(t, s, c);
        return;
      case "data":
        if (e !== "object") {
          jl(t, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (e !== "a" || a !== "href")) {
          t.removeAttribute(a);
          break;
        }
        if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
          t.removeAttribute(a);
          break;
        }
        s = zl(s), t.setAttribute(a, s);
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (a === "formAction" ? (e !== "input" && Kt(t, e, "name", u.name, u, null), Kt(
            t,
            e,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Kt(
            t,
            e,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Kt(
            t,
            e,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Kt(t, e, "encType", u.encType, u, null), Kt(t, e, "method", u.method, u, null), Kt(t, e, "target", u.target, u, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          t.removeAttribute(a);
          break;
        }
        s = zl(s), t.setAttribute(a, s);
        break;
      case "onClick":
        s != null && (t.onclick = li);
        return;
      case "onScroll":
        s != null && jt("scroll", t);
        return;
      case "onScrollEnd":
        s != null && jt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(r(61));
          if (a = s.__html, a != null) {
            if (u.children != null) throw Error(r(60));
            c?.__html !== a && (t.innerHTML = a);
          }
        }
        break;
      case "multiple":
        t.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        t.muted = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (s == null || typeof s == "function" || typeof s == "boolean" || typeof s == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        a = zl(s), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        s != null && typeof s != "function" && typeof s != "symbol" ? t.setAttribute(a, s) : t.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        s && typeof s != "function" && typeof s != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
        break;
      case "capture":
      case "download":
        s === !0 ? t.setAttribute(a, "") : s !== !1 && s != null && typeof s != "function" && typeof s != "symbol" ? t.setAttribute(a, s) : t.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null && typeof s != "function" && typeof s != "symbol" && !isNaN(s) && 1 <= s ? t.setAttribute(a, s) : t.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s) ? t.removeAttribute(a) : t.setAttribute(a, s);
        break;
      case "popover":
        jt("beforetoggle", t), jt("toggle", t), Nl(t, "popover", s);
        break;
      case "xlinkActuate":
        Mi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          s
        );
        break;
      case "xlinkArcrole":
        Mi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          s
        );
        break;
      case "xlinkRole":
        Mi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          s
        );
        break;
      case "xlinkShow":
        Mi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          s
        );
        break;
      case "xlinkTitle":
        Mi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          s
        );
        break;
      case "xlinkType":
        Mi(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          s
        );
        break;
      case "xmlBase":
        Mi(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          s
        );
        break;
      case "xmlLang":
        Mi(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          s
        );
        break;
      case "xmlSpace":
        Mi(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          s
        );
        break;
      case "is":
        Nl(t, "is", s);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
          a = o_.get(a) || a, Nl(t, a, s);
        else return;
    }
    It = !0;
  }
  function yh(t, e, a, s, u, c) {
    switch (a) {
      case "style":
        ly(t, s, c);
        return;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(r(61));
          if (a = s.__html, a != null) {
            if (u.children != null) throw Error(r(60));
            c?.__html !== a && (t.innerHTML = a);
          }
        }
        break;
      case "children":
        if (typeof s == "string") qo(t, s);
        else if (typeof s == "number" || typeof s == "bigint")
          qo(t, "" + s);
        else return;
        break;
      case "onScroll":
        s != null && jt("scroll", t);
        return;
      case "onScrollEnd":
        s != null && jt("scrollend", t);
        return;
      case "onClick":
        s != null && (t.onclick = li);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Jg.hasOwnProperty(a))
          t: {
            if (a[0] === "o" && a[1] === "n" && (u = a.endsWith("Capture"), c = a.slice(2, u ? a.length - 7 : void 0), e = t[nn] || null, e = e != null ? e[a] : null, typeof e == "function" && t.removeEventListener(c, e, u), typeof s == "function")) {
              typeof e != "function" && e !== null && (a in t ? t[a] = null : t.hasAttribute(a) && t.removeAttribute(a)), t.addEventListener(c, s, u);
              break t;
            }
            It = !0, a in t ? t[a] = s : s === !0 ? t.setAttribute(a, "") : Nl(t, a, s);
          }
        return;
    }
    It = !0;
  }
  function qe(t, e, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        jt("error", t), jt("load", t);
        var s = !1, u = !1, c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            var b = a[c];
            if (b != null)
              switch (c) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  Kt(t, e, c, b, a, null);
              }
          }
        u && Kt(t, e, "srcSet", a.srcSet, a, null), s && Kt(t, e, "src", a.src, a, null);
        return;
      case "input":
        jt("invalid", t);
        var C = c = b = u = null, M = null, P = null;
        for (s in a)
          if (a.hasOwnProperty(s)) {
            var k = a[s];
            if (k != null)
              switch (s) {
                case "name":
                  u = k;
                  break;
                case "type":
                  b = k;
                  break;
                case "checked":
                  M = k;
                  break;
                case "defaultChecked":
                  P = k;
                  break;
                case "value":
                  c = k;
                  break;
                case "defaultValue":
                  C = k;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (k != null)
                    throw Error(r(137, e));
                  break;
                default:
                  Kt(t, e, s, k, a, null);
              }
          }
        ay(
          t,
          c,
          C,
          M,
          P,
          b,
          u,
          !1
        );
        return;
      case "select":
        jt("invalid", t), s = b = c = null;
        for (u in a)
          if (a.hasOwnProperty(u) && (C = a[u], C != null))
            switch (u) {
              case "value":
                c = C;
                break;
              case "defaultValue":
                b = C;
                break;
              case "multiple":
                s = C;
              default:
                Kt(t, e, u, C, a, null);
            }
        e = c, a = b, t.multiple = !!s, e != null ? Io(t, !!s, e, !1) : a != null && Io(t, !!s, a, !0);
        return;
      case "textarea":
        jt("invalid", t), c = u = s = null;
        for (b in a)
          if (a.hasOwnProperty(b) && (C = a[b], C != null))
            switch (b) {
              case "value":
                s = C;
                break;
              case "defaultValue":
                u = C;
                break;
              case "children":
                c = C;
                break;
              case "dangerouslySetInnerHTML":
                if (C != null) throw Error(r(91));
                break;
              default:
                Kt(t, e, b, C, a, null);
            }
        sy(t, s, u, c);
        return;
      case "option":
        for (M in a)
          a.hasOwnProperty(M) && (s = a[M], s != null) && (M === "selected" ? t.selected = s && typeof s != "function" && typeof s != "symbol" : Kt(t, e, M, s, a, null));
        return;
      case "dialog":
        jt("beforetoggle", t), jt("toggle", t), jt("cancel", t), jt("close", t);
        break;
      case "iframe":
      case "object":
        jt("load", t);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Br.length; s++)
          jt(Br[s], t);
        break;
      case "image":
        jt("error", t), jt("load", t);
        break;
      case "details":
        jt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        jt("error", t), jt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (P in a)
          if (a.hasOwnProperty(P) && (s = a[P], s != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                Kt(t, e, P, s, a, null);
            }
        return;
      default:
        if (bf(e)) {
          for (k in a)
            a.hasOwnProperty(k) && (s = a[k], s !== void 0 && yh(
              t,
              e,
              k,
              s,
              a,
              void 0
            ));
          return;
        }
    }
    for (C in a)
      a.hasOwnProperty(C) && (s = a[C], s != null && Kt(t, e, C, s, a, null));
  }
  var IA = {};
  function qA(t, e, a, s) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, c = null, b = null, C = null, M = null, P = null, k = null;
        for (G in a) {
          var K = a[G];
          if (a.hasOwnProperty(G) && K != null)
            switch (G) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                M = K;
              default:
                s.hasOwnProperty(G) || Kt(t, e, G, null, s, K);
            }
        }
        for (var L in s) {
          var G = s[L];
          if (K = a[L], s.hasOwnProperty(L) && (G != null || K != null))
            switch (L) {
              case "type":
                G !== K && (It = !0), c = G;
                break;
              case "name":
                G !== K && (It = !0), u = G;
                break;
              case "checked":
                G !== K && (It = !0), P = G;
                break;
              case "defaultChecked":
                G !== K && (It = !0), k = G;
                break;
              case "value":
                G !== K && (It = !0), b = G;
                break;
              case "defaultValue":
                G !== K && (It = !0), C = G;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(r(137, e));
                break;
              default:
                G !== K && Kt(
                  t,
                  e,
                  L,
                  G,
                  s,
                  K
                );
            }
        }
        yf(
          t,
          b,
          C,
          M,
          P,
          k,
          c,
          u
        );
        return;
      case "select":
        G = b = C = L = null;
        for (c in a)
          if (M = a[c], a.hasOwnProperty(c) && M != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                G = M;
              default:
                s.hasOwnProperty(c) || Kt(
                  t,
                  e,
                  c,
                  null,
                  s,
                  M
                );
            }
        for (u in s)
          if (c = s[u], M = a[u], s.hasOwnProperty(u) && (c != null || M != null))
            switch (u) {
              case "value":
                c !== M && (It = !0), L = c;
                break;
              case "defaultValue":
                c !== M && (It = !0), C = c;
                break;
              case "multiple":
                c !== M && (It = !0), b = c;
              default:
                c !== M && Kt(
                  t,
                  e,
                  u,
                  c,
                  s,
                  M
                );
            }
        e = C, a = b, s = G, L != null ? Io(t, !!a, L, !1) : !!s != !!a && (e != null ? Io(t, !!a, e, !0) : Io(t, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        G = L = null;
        for (C in a)
          if (u = a[C], a.hasOwnProperty(C) && u != null && !s.hasOwnProperty(C))
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                Kt(t, e, C, null, s, u);
            }
        for (b in s)
          if (u = s[b], c = a[b], s.hasOwnProperty(b) && (u != null || c != null))
            switch (b) {
              case "value":
                u !== c && (It = !0), L = u;
                break;
              case "defaultValue":
                u !== c && (It = !0), G = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== c && Kt(t, e, b, u, s, c);
            }
        oy(t, L, G);
        return;
      case "option":
        for (var ot in a)
          L = a[ot], a.hasOwnProperty(ot) && L != null && !s.hasOwnProperty(ot) && (ot === "selected" ? t.selected = !1 : Kt(
            t,
            e,
            ot,
            null,
            s,
            L
          ));
        for (M in s)
          L = s[M], G = a[M], s.hasOwnProperty(M) && L !== G && (L != null || G != null) && (M === "selected" ? (L !== G && (It = !0), t.selected = L && typeof L != "function" && typeof L != "symbol") : Kt(
            t,
            e,
            M,
            L,
            s,
            G
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var mt in a)
          L = a[mt], a.hasOwnProperty(mt) && L != null && !s.hasOwnProperty(mt) && Kt(t, e, mt, null, s, L);
        for (P in s)
          if (L = s[P], G = a[P], s.hasOwnProperty(P) && L !== G && (L != null || G != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null)
                  throw Error(r(137, e));
                break;
              default:
                Kt(
                  t,
                  e,
                  P,
                  L,
                  s,
                  G
                );
            }
        return;
      default:
        if (bf(e)) {
          for (var _t in a)
            L = a[_t], a.hasOwnProperty(_t) && L !== void 0 && !s.hasOwnProperty(_t) && yh(
              t,
              e,
              _t,
              void 0,
              s,
              L
            );
          for (k in s)
            L = s[k], G = a[k], !s.hasOwnProperty(k) || L === G || L === void 0 && G === void 0 || yh(
              t,
              e,
              k,
              L,
              s,
              G
            );
          return;
        }
    }
    for (var B in a)
      L = a[B], a.hasOwnProperty(B) && L != null && !s.hasOwnProperty(B) && Kt(t, e, B, null, s, L);
    for (K in s)
      L = s[K], G = a[K], !s.hasOwnProperty(K) || L === G || L == null && G == null || Kt(t, e, K, L, s, G);
  }
  function mb(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function GA() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
        var u = a[s], c = u.transferSize, b = u.initiatorType, C = u.duration;
        if (c && C && mb(b)) {
          for (b = 0, C = u.responseEnd, s += 1; s < a.length; s++) {
            var M = a[s], P = M.startTime;
            if (P > C) break;
            var k = M.transferSize, K = M.initiatorType;
            k && mb(K) && (M = M.responseEnd, b += k * (M < C ? 1 : (C - P) / (M - P)));
          }
          if (--s, e += 8 * (c + b) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var vh = null, bh = null;
  function Ur(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function pb(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function gb(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function yb(t, e, a, s) {
    return a = Ur(
      a
    ).createElement(t), a[Be] = s, a[nn] = e, qe(a, t, e), De(a), a;
  }
  function Sh(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var xh = null;
  function YA() {
    var t = window.event;
    return t && t.type === "popstate" ? t === xh ? !1 : (xh = t, !0) : (xh = null, !1);
  }
  var Th = typeof setTimeout == "function" ? setTimeout : void 0, kA = typeof clearTimeout == "function" ? clearTimeout : void 0, vb = typeof Promise == "function" ? Promise : void 0, bb = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Th, FA = typeof queueMicrotask == "function" ? queueMicrotask : typeof vb < "u" ? function(t) {
    return vb.resolve(null).then(t).catch(XA);
  } : Th;
  function XA(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ca(t) {
    return t === "head";
  }
  function Sb(t, e) {
    var a = e, s = 0;
    do {
      var u = a.nextSibling;
      if (t.removeChild(a), u && u.nodeType === 8)
        if (a = u.data, a === "/$" || a === "/&") {
          if (s === 0) {
            t.removeChild(u), ws(e);
            return;
          }
          s--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          s++;
        else if (a === "html")
          Dh(
            t.ownerDocument.documentElement
          );
        else if (a === "head") {
          a = t.ownerDocument.head, Dh(a);
          for (var c = a.firstChild; c; ) {
            var b = c.nextSibling, C = c.nodeName;
            c[ir] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && c.rel.toLowerCase() === "stylesheet" || a.removeChild(c), c = b;
          }
        } else
          a === "body" && Dh(t.ownerDocument.body);
      a = u;
    } while (a);
    ws(e);
  }
  function xb(t, e) {
    var a = t;
    t = 0;
    do {
      var s = a.nextSibling;
      if (a.nodeType === 1 ? e ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (e ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), s && s.nodeType === 8)
        if (a = s.data, a === "/$") {
          if (t === 0) break;
          t--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || t++;
      a = s;
    } while (a);
  }
  function Tb(t, e, a) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, a != null && (t.style.viewTransitionClass = a), a = getComputedStyle(t), a.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var s = 1;
      else
        for (var u = s = 0; u < e.length; u++) {
          var c = e[u];
          0 < c.width && 0 < c.height && s++;
        }
      s === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + a.paddingTop, t.marginBottom = "-" + a.paddingBottom);
    }
  }
  function Eb(t, e) {
    t = t.style, e = e.style;
    var a = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), a = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (a = e.display, t.display = a == null || typeof a == "boolean" ? "" : a, a = e.margin, a != null ? t.margin = a : (a = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = a == null || typeof a == "boolean" ? "" : a, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function $A(t, e, a) {
    return a = a.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= a.innerHeight && t.left <= a.innerWidth
    };
  }
  function Eh(t) {
    var e = t.getBoundingClientRect(), a = getComputedStyle(t);
    return $A(e, a, t);
  }
  function KA(t) {
    return t.documentElement.clientHeight;
  }
  function ZA(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function QA(t, e, a, s, u, c, b, C, M) {
    var P = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var k = P.startViewTransition({
        update: function() {
          var L = P.defaultView, G = L.navigation && L.navigation.transition, ot = P.fonts.status;
          s();
          var mt = [];
          if (ot === "loaded" && (KA(P), P.fonts.status === "loading" && mt.push(P.fonts.ready)), ot = mt.length, t !== null)
            for (var _t = t.suspenseyImages, B = 0, j = 0; j < _t.length; j++) {
              var H = _t[j];
              if (!H.complete) {
                var $ = H.getBoundingClientRect();
                if (0 < $.bottom && 0 < $.right && $.top < L.innerHeight && $.left < L.innerWidth) {
                  if (B += Yb(H), B > Gu) {
                    mt.length = ot;
                    break;
                  }
                  H = new Promise(
                    ZA.bind(H)
                  ), mt.push(H);
                }
              }
            }
          if (0 < mt.length)
            return L = Promise.race([
              Promise.all(mt),
              new Promise(function(dt) {
                return setTimeout(dt, 500);
              })
            ]).then(u, u), (G ? Promise.allSettled([G.finished, L]) : L).then(c, c);
          if (u(), G)
            return G.finished.then(
              c,
              c
            );
          c();
        },
        types: a
      });
      P.__reactViewTransition = k;
      var K = [];
      return k.ready.then(
        function() {
          for (var L = P.documentElement.getAnimations({
            subtree: !0
          }), G = 0; G < L.length; G++) {
            var ot = L[G], mt = ot.effect, _t = mt.pseudoElement;
            if (_t != null && _t.startsWith("::view-transition")) {
              K.push(ot), ot = mt.getKeyframes();
              for (var B = _t = void 0, j = !0, H = 0; H < ot.length; H++) {
                var $ = ot[H], dt = $.width;
                if (_t === void 0) _t = dt;
                else if (_t !== dt) {
                  j = !1;
                  break;
                }
                if (dt = $.height, B === void 0) B = dt;
                else if (B !== dt) {
                  j = !1;
                  break;
                }
                delete $.width, delete $.height, $.transform === "none" && delete $.transform;
              }
              j && _t !== void 0 && B !== void 0 && (mt.setKeyframes(ot), j = getComputedStyle(
                mt.target,
                mt.pseudoElement
              ), j.width !== _t || j.height !== B) && (j = ot[0], j.width = _t, j.height = B, j = ot[ot.length - 1], j.width = _t, j.height = B, mt.setKeyframes(ot));
            }
          }
          b();
        },
        function(L) {
          P.__reactViewTransition === k && (P.__reactViewTransition = null);
          try {
            typeof L == "object" && L !== null && L.name === "InvalidStateError" && (L.message === "View transition was skipped because document visibility state is hidden." || L.message === "Skipping view transition because document visibility state has become hidden." || L.message === "Skipping view transition because viewport size changed." || L.message === "Transition was aborted because of invalid state") && (L = null), L !== null && M(L);
          } finally {
            s(), u(), b();
          }
        }
      ), k.finished.finally(function() {
        for (var L = 0; L < K.length; L++)
          K[L].cancel();
        P.__reactViewTransition === k && (P.__reactViewTransition = null), C();
      }), k;
    } catch {
      return s(), u(), b(), null;
    }
  }
  function go(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  go.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : V({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, go.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, a = t.getAnimations({ subtree: !0 }), s = [], u = 0; u < a.length; u++) {
      var c = a[u].effect;
      c !== null && c.target === t && c.pseudoElement === e && s.push(a[u]);
    }
    return s;
  }, go.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Cb(t) {
    return {
      name: t,
      group: new go("group", t),
      imagePair: new go("image-pair", t),
      old: new go("old", t),
      new: new go("new", t)
    };
  }
  function Sn(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Sn.prototype.addEventListener = function(t, e, a) {
    var s = null, u = null;
    if (!(a != null && typeof a != "boolean" && (s = a.signal || null, s !== null && s.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var c = this._eventListeners;
      if (_b(c, t, e, a) === -1) {
        var b = this, C = e;
        a != null && typeof a != "boolean" && a.once === !0 && (C = function(M) {
          b.removeEventListener(
            t,
            e,
            a
          ), typeof e == "function" ? e.call(this, M) : e.handleEvent(M);
        }), s !== null && (u = b.removeEventListener.bind(
          b,
          t,
          e,
          a
        ), s.addEventListener("abort", u, { once: !0 }), u = s.removeEventListener.bind(s, "abort", u)), s = bs(a), c.push({
          type: t,
          listener: e,
          optionsOrUseCapture: a,
          attachedListener: C,
          cleanup: u
        }), p(
          this._fragmentFiber.child,
          !1,
          JA,
          t,
          C,
          s
        );
      }
      this._eventListeners = c;
    }
  };
  function JA(t, e, a, s) {
    return _(t).addEventListener(
      e,
      a,
      s
    ), !1;
  }
  Sn.prototype.removeEventListener = function(t, e, a) {
    var s = this._eventListeners;
    if (s !== null && (e = _b(
      s,
      t,
      e,
      a
    ), e !== -1)) {
      var u = s[e];
      a = u.attachedListener;
      var c = u.cleanup;
      u = bs(u.optionsOrUseCapture), p(
        this._fragmentFiber.child,
        !1,
        WA,
        t,
        a,
        u
      ), s.splice(e, 1), c !== null && c();
    }
  };
  function WA(t, e, a, s) {
    return _(t).removeEventListener(
      e,
      a,
      s
    ), !1;
  }
  function bs(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function wb(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function _b(t, e, a, s) {
    if (t.length === 0) return -1;
    s = wb(s);
    for (var u = 0; u < t.length; u++) {
      var c = t[u];
      if (c.type === e && c.listener === a && wb(c.optionsOrUseCapture) === s)
        return u;
    }
    return -1;
  }
  Sn.prototype.dispatchEvent = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = _(e);
    var a = this._eventListeners;
    if (a !== null && 0 < a.length || !t.bubbles) {
      var s = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (a)
        for (var u = 0; u < a.length; u++) {
          var c = a[u];
          s.addEventListener(
            c.type,
            c.attachedListener,
            bs(c.optionsOrUseCapture)
          );
        }
      if (e.appendChild(s), t = s.dispatchEvent(t), a)
        for (u = 0; u < a.length; u++)
          c = a[u], s.removeEventListener(
            c.type,
            c.attachedListener,
            bs(c.optionsOrUseCapture)
          );
      return e.removeChild(s), t;
    }
    return e.dispatchEvent(t);
  }, Sn.prototype.focus = function(t) {
    p(
      this._fragmentFiber.child,
      !0,
      Ab,
      t,
      void 0,
      void 0
    );
  };
  function Ab(t, e) {
    return t.tag === 6 ? !1 : (t = _(t), fR(t, e));
  }
  Sn.prototype.focusLast = function(t) {
    var e = [];
    p(
      this._fragmentFiber.child,
      !0,
      Ch,
      e,
      void 0,
      void 0
    );
    for (var a = e.length - 1; 0 <= a && !Ab(e[a], t); a--) ;
  };
  function Ch(t, e) {
    return e.push(t), !1;
  }
  Sn.prototype.blur = function() {
    var t = S(
      this._fragmentFiber
    );
    t !== null && (t = _(t), t = Ur(t).activeElement, t !== null && p(
      this._fragmentFiber.child,
      !1,
      tR,
      t,
      void 0,
      void 0
    ));
  };
  function tR(t, e) {
    return t.tag === 6 ? !1 : (t = _(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Sn.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), p(
      this._fragmentFiber.child,
      !1,
      eR,
      t,
      void 0,
      void 0
    );
  };
  function eR(t, e) {
    return t.tag === 6 || (t = _(t), e.observe(t)), !1;
  }
  Sn.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), p(
        this._fragmentFiber.child,
        !1,
        nR,
        t,
        void 0,
        void 0
      );
      for (var a = e = 0; a < $n.length; a++) {
        var s = $n[a];
        s.fragmentInstance === this && s.observer === t ? t.unobserve(s.instance) : $n[e++] = s;
      }
      $n.length = e;
    }
  };
  function nR(t, e) {
    return t.tag === 6 || (t = _(t), e.unobserve(t)), !1;
  }
  var $n = [], wh = !1;
  function iR(t, e, a) {
    $n.push({
      fragmentInstance: t,
      observer: e,
      instance: a
    }), wh || (wh = !0, dR(function() {
      wh = !1;
      var s = $n;
      $n = [];
      for (var u = 0; u < s.length; u++) {
        var c = s[u];
        c.observer.unobserve(c.instance);
      }
    }));
  }
  Sn.prototype.getClientRects = function() {
    var t = [];
    return p(
      this._fragmentFiber.child,
      !1,
      aR,
      t,
      void 0,
      void 0
    ), t;
  };
  function aR(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var a = t.ownerDocument.createRange();
      a.selectNodeContents(t), e.push.apply(e, a.getClientRects());
    } else
      t = _(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Sn.prototype.getRootNode = function(t) {
    var e = S(
      this._fragmentFiber
    );
    return e === null ? this : _(e).getRootNode(t);
  }, Sn.prototype.compareDocumentPosition = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var a = [];
    p(
      this._fragmentFiber.child,
      !1,
      Ch,
      a,
      void 0,
      void 0
    );
    var s = _(e);
    if (a.length === 0) {
      if (a = s, T(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (a = e);
      }
      e = this._fragmentFiber;
      var u = s = a.compareDocumentPosition(t);
      return a === t ? u = Node.DOCUMENT_POSITION_CONTAINS : s & Node.DOCUMENT_POSITION_CONTAINED_BY && (a = E(e)[1], a === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = _(a).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = _(a[0]), u = _(a[a.length - 1]);
    var c = T(this._fragmentFiber) ? e.parentElement : s;
    if (c == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    s = c.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, c = c.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var b = e.compareDocumentPosition(t), C = u.compareDocumentPosition(t), M = b & Node.DOCUMENT_POSITION_CONTAINED_BY || C & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return C = s && c && b & Node.DOCUMENT_POSITION_FOLLOWING && C & Node.DOCUMENT_POSITION_PRECEDING, e = s && e === t || c && u === t || M || C ? Node.DOCUMENT_POSITION_CONTAINED_BY : !s && e === t || !c && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : b, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || oR(
      e,
      this._fragmentFiber,
      a[0],
      a[a.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function oR(t, e, a, s, u) {
    var c = $a(u);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (a = !!c)
        t: {
          for (; c !== null; ) {
            if (c.tag === 7 && (c === e || c.alternate === e)) {
              a = !0;
              break t;
            }
            c = c.return;
          }
          a = !1;
        }
      return a;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (c === null)
        return c = u.ownerDocument, u === c || u === c.documentElement || u === c.body;
      t: {
        for (c = e, e = S(e); c !== null; ) {
          if (!(c.tag !== 5 && c.tag !== 3 && c.tag !== 27 || c !== e && c.alternate !== e)) {
            c = !0;
            break t;
          }
          c = c.return;
        }
        c = !1;
      }
      return c;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!c) && !(e = c === a) && (e = z(
      a,
      c,
      U
    ), e === null ? e = !1 : (p(
      e,
      !0,
      A,
      c,
      a
    ), c = R, R = null, e = c !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!c) && !(e = c === s) && (e = z(
      s,
      c,
      U
    ), e === null ? e = !1 : (p(
      e,
      !0,
      D,
      c,
      s
    ), c = R, O = R = null, e = c !== null)), e) : !1;
  }
  function Rb(t, e) {
    var a = t.ownerDocument.createRange();
    a.selectNodeContents(t), t = a.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Sn.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(r(566));
    var e = [];
    p(
      this._fragmentFiber.child,
      !1,
      Ch,
      e,
      void 0,
      void 0
    );
    var a = t !== !1;
    if (e.length === 0) {
      var s = E(
        this._fragmentFiber
      );
      if (s = a ? s[1] || s[0] || S(this._fragmentFiber) : s[0] || s[1], s === null) return;
      if (s.tag === 6) {
        t = _(s), Rb(t, a);
        return;
      }
      if (s = _(s), s.nodeType !== 9) {
        if (s.nodeType === 11) {
          a = "host" in s ? s.host : null, a !== null && a.scrollIntoView(t);
          return;
        }
        s.scrollIntoView(t);
      }
    }
    for (s = a ? e.length - 1 : 0; s !== (a ? -1 : e.length); ) {
      var u = e[s];
      u.tag === 6 ? (u = _(u), Rb(u, a)) : _(u).scrollIntoView(t), s += a ? -1 : 1;
    }
  };
  function sR(t, e) {
    return t = _(t), Ob(t, e), !1;
  }
  function Ob(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function Db(t, e) {
    var a = e._eventListeners;
    if (a !== null)
      for (var s = 0; s < a.length; s++) {
        var u = a[s];
        t.addEventListener(
          u.type,
          u.attachedListener,
          bs(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (a = e._observers, a !== null && a.forEach(function(c) {
      for (var b = 0, C = 0; C < $n.length; C++) {
        var M = $n[C];
        (M.fragmentInstance !== e || M.observer !== c || M.instance !== t) && ($n[b++] = M);
      }
      $n.length = b, c.observe(t);
    }), Ob(t, e));
  }
  function rR(t, e) {
    var a = e._eventListeners;
    if (a !== null)
      for (var s = 0; s < a.length; s++) {
        var u = a[s];
        t.removeEventListener(
          u.type,
          u.attachedListener,
          bs(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (a = e._observers, a !== null && a.forEach(function(c) {
      typeof c.rootMargin == "string" ? iR(
        e,
        c,
        t
      ) : c.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function _h(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (e = e.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _h(a), Ml(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function lR(t, e, a, s) {
    for (; t.nodeType === 1; ) {
      var u = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (s) {
        if (!t[ir])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (c = t.getAttribute("rel"), c === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (c !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (c = t.getAttribute("src"), (c !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && c && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var c = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === c)
          return t;
      } else return t;
      if (t = zn(t.nextSibling), t === null) break;
    }
    return null;
  }
  function uR(t, e, a) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a || (t = zn(t.nextSibling), t === null)) return null;
    return t;
  }
  function Mb(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = zn(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ah(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Rh(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function cR(t, e) {
    var a = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || a.readyState !== "loading")
      e();
    else {
      var s = function() {
        e(), a.removeEventListener("DOMContentLoaded", s);
      };
      a.addEventListener("DOMContentLoaded", s), t._reactRetry = s;
    }
  }
  function zn(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Oh = null;
  function Nb(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "/$" || a === "/&") {
          if (e === 0)
            return zn(t.nextSibling);
          e--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function jb(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (e === 0) return t;
          e--;
        } else a !== "/$" && a !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function fR(t, e) {
    function a() {
      s = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var s = !1;
    try {
      t.ownerDocument.addEventListener("focus", a, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", a, !0);
    }
    return s;
  }
  function dR(t) {
    bb(function() {
      bb(function(e) {
        return t(e);
      });
    });
  }
  function zb(t, e, a) {
    switch (e = Ur(a), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Lb(t, e, a) {
    for (var s in a) {
      var u = a[s];
      a.hasOwnProperty(s) && u != null && Kt(t, e, s, null, IA, u);
    }
    a.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === li && (t.onclick = null), Ml(t);
  }
  function Dh(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Ml(t);
  }
  var Ln = /* @__PURE__ */ new Map(), Vb = /* @__PURE__ */ new Set();
  function Hr(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Yi = at.d;
  at.d = {
    f: hR,
    r: mR,
    D: pR,
    C: gR,
    L: yR,
    m: vR,
    X: SR,
    S: bR,
    M: xR
  };
  function hR() {
    var t = Yi.f(), e = zu();
    return t || e;
  }
  function mR(t) {
    var e = Po(t);
    e !== null && e.tag === 5 && e.type === "form" ? Pv(e) : Yi.r(t);
  }
  var Ss = typeof document > "u" ? null : document;
  function Bb(t, e, a) {
    var s = Ss;
    if (s && typeof e == "string" && e) {
      var u = An(e);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof a == "string" && (u += '[crossorigin="' + a + '"]'), Vb.has(u) || (Vb.add(u), t = { rel: t, crossOrigin: a, href: e }, s.querySelector(u) === null && (e = s.createElement("link"), qe(e, "link", t), De(e), s.head.appendChild(e)));
    }
  }
  function pR(t) {
    Yi.D(t), Bb("dns-prefetch", t, null);
  }
  function gR(t, e) {
    Yi.C(t, e), Bb("preconnect", t, e);
  }
  function yR(t, e, a) {
    Yi.L(t, e, a);
    var s = Ss;
    if (s && t && e) {
      var u = 'link[rel="preload"][as="' + An(e) + '"]';
      e === "image" && a && a.imageSrcSet ? (u += '[imagesrcset="' + An(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (u += '[imagesizes="' + An(
        a.imageSizes
      ) + '"]')) : u += '[href="' + An(t) + '"]';
      var c = u;
      switch (e) {
        case "style":
          c = xs(t);
          break;
        case "script":
          c = Ts(t);
      }
      if (!(Ln.has(c) || (t = V(
        {
          rel: "preload",
          href: e === "image" && a && a.imageSrcSet ? void 0 : t,
          as: e
        },
        a
      ), Ln.set(c, t), s.querySelector(u) !== null || e === "style" && s.querySelector(Ir(c)) || e === "script" && s.querySelector(qr(c))))) {
        var b = s.createElement("link");
        qe(b, "link", t), e === "style" && (b[Dl] = !0, b.onload = b.onerror = function() {
          Zg(b);
        }), De(b), s.head.appendChild(b);
      }
    }
  }
  function vR(t, e) {
    Yi.m(t, e);
    var a = Ss;
    if (a && t) {
      var s = e && typeof e.as == "string" ? e.as : "script", u = 'link[rel="modulepreload"][as="' + An(s) + '"][href="' + An(t) + '"]', c = u;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Ts(t);
      }
      if (!Ln.has(c) && (t = V({ rel: "modulepreload", href: t }, e), Ln.set(c, t), a.querySelector(u) === null)) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(qr(c)))
              return;
        }
        s = a.createElement("link"), qe(s, "link", t), De(s), a.head.appendChild(s);
      }
    }
  }
  function bR(t, e, a) {
    Yi.S(t, e, a);
    var s = Ss;
    if (s && t) {
      var u = Uo(s).hoistableStyles, c = xs(t);
      e = e || "default";
      var b = u.get(c);
      if (!b) {
        var C = { loading: 0, preload: null };
        if (b = s.querySelector(
          Ir(c)
        ))
          C.loading = 5;
        else {
          t = V(
            { rel: "stylesheet", href: t, "data-precedence": e },
            a
          ), (a = Ln.get(c)) && Mh(t, a);
          var M = b = s.createElement("link");
          De(M), qe(M, "link", t), M._p = new Promise(function(P, k) {
            M.onload = P, M.onerror = k;
          }), M.addEventListener("load", function() {
            C.loading |= 1;
          }), M.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, Iu(b, e, s);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: C
        }, u.set(c, b);
      }
    }
  }
  function SR(t, e) {
    Yi.X(t, e);
    var a = Ss;
    if (a && t) {
      var s = Uo(a).hoistableScripts, u = Ts(t), c = s.get(u);
      c || (c = a.querySelector(qr(u)), c || (t = V({ src: t, async: !0 }, e), (e = Ln.get(u)) && Nh(t, e), c = a.createElement("script"), De(c), qe(c, "link", t), a.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, s.set(u, c));
    }
  }
  function xR(t, e) {
    Yi.M(t, e);
    var a = Ss;
    if (a && t) {
      var s = Uo(a).hoistableScripts, u = Ts(t), c = s.get(u);
      c || (c = a.querySelector(qr(u)), c || (t = V({ src: t, async: !0, type: "module" }, e), (e = Ln.get(u)) && Nh(t, e), c = a.createElement("script"), De(c), qe(c, "link", t), a.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, s.set(u, c));
    }
  }
  function Pb(t, e, a, s) {
    var u = (u = oi.current) ? Hr(u) : null;
    if (!u) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (a = xs(a.href), e = Uo(
          u
        ).hoistableStyles, s = e.get(a), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(a, s)), s) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          t = xs(a.href);
          var c = Uo(
            u
          ).hoistableStyles, b = c.get(t);
          if (b || (u = u.ownerDocument || u, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(t, b), (c = u.querySelector(
            Ir(t)
          )) ? c._p || (b.instance = c, b.state.loading = 5) : (c = Ln.get(t), c || (c = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Ln.set(t, c)), TR(
            u,
            t,
            c,
            b.state
          ))), e && s === null)
            throw Error(r(528, ""));
          return b;
        }
        if (e && s !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = a.async, a = a.src, typeof a == "string" && e && typeof e != "function" && typeof e != "symbol" ? (a = Ts(a), e = Uo(
          u
        ).hoistableScripts, s = e.get(a), s || (s = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(a, s)), s) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function xs(t) {
    return 'href="' + An(t) + '"';
  }
  function Ir(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Ub(t) {
    return V({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function TR(t, e, a, s) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[Dl] !== !0) {
        s.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[Dl] = !0, e.onload = e.onerror = Zg.bind(null, e), qe(e, "link", a), De(e), t.head.appendChild(e);
    s.preload = e, e.addEventListener("load", function() {
      return s.loading |= 1;
    }), e.addEventListener("error", function() {
      return s.loading |= 2;
    });
  }
  function Ts(t) {
    return '[src="' + An(t) + '"]';
  }
  function qr(t) {
    return "script[async]" + t;
  }
  function Hb(t, e, a) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var s = t.querySelector(
            'style[data-href~="' + An(a.href) + '"]'
          );
          if (s)
            return e.instance = s, De(s), s;
          var u = V({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return s = (t.ownerDocument || t).createElement(
            "style"
          ), De(s), qe(s, "style", u), Iu(s, a.precedence, t), e.instance = s;
        case "stylesheet":
          u = xs(a.href);
          var c = t.querySelector(
            Ir(u)
          );
          if (c)
            return e.state.loading |= 4, e.instance = c, De(c), c;
          s = Ub(a), (u = Ln.get(u)) && Mh(s, u), c = (t.ownerDocument || t).createElement("link"), De(c);
          var b = c;
          return b._p = new Promise(function(C, M) {
            b.onload = C, b.onerror = M;
          }), qe(c, "link", s), e.state.loading |= 4, Iu(c, a.precedence, t), e.instance = c;
        case "script":
          return c = Ts(a.src), (u = t.querySelector(
            qr(c)
          )) ? (e.instance = u, De(u), u) : (s = a, (u = Ln.get(c)) && (s = V({}, a), Nh(s, u)), t = t.ownerDocument || t, u = t.createElement("script"), De(u), qe(u, "link", s), t.head.appendChild(u), e.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (s = e.instance, e.state.loading |= 4, Iu(s, a.precedence, t));
    return e.instance;
  }
  function Iu(t, e, a) {
    for (var s = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = s.length ? s[s.length - 1] : null, c = u, b = 0; b < s.length; b++) {
      var C = s[b];
      if (C.dataset.precedence === e) c = C;
      else if (c !== u) break;
    }
    c ? c.parentNode.insertBefore(t, c.nextSibling) : (e = a.nodeType === 9 ? a.head : a, e.insertBefore(t, e.firstChild));
  }
  function Mh(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Nh(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var qu = null;
  function Ib(t, e, a) {
    if (qu === null) {
      var s = /* @__PURE__ */ new Map(), u = qu = /* @__PURE__ */ new Map();
      u.set(a, s);
    } else
      u = qu, s = u.get(a), s || (s = /* @__PURE__ */ new Map(), u.set(a, s));
    if (s.has(t)) return s;
    for (s.set(t, null), a = a.getElementsByTagName(t), u = 0; u < a.length; u++) {
      var c = a[u];
      if (!(c[ir] || c[Be] || t === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = c.getAttribute(e) || "";
        b = t + b;
        var C = s.get(b);
        C ? C.push(c) : s.set(b, [c]);
      }
    }
    return s;
  }
  function jh(t, e, a) {
    t = t.ownerDocument || t, t.head.insertBefore(
      a,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function ER(t, e, a) {
    if (a === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function qb(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function Gb(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Yb(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function kb(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Yb(e), t.suspenseyImages.push(e)), t = _R.bind(t), e.decode().then(t, t));
  }
  function CR(t, e, a, s) {
    if (a.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var u = xs(s.href), c = e.querySelector(
          Ir(u)
        );
        if (c) {
          e = c._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Gr.bind(t), e.then(t, t)), a.state.loading |= 4, a.instance = c, De(c);
          return;
        }
        c = e.ownerDocument || e, s = Ub(s), (u = Ln.get(u)) && Mh(s, u), c = c.createElement("link"), De(c);
        var b = c;
        b._p = new Promise(function(C, M) {
          b.onload = C, b.onerror = M;
        }), qe(c, "link", s), a.instance = c;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(a, e), (e = a.state.preload) && (a.state.loading & 3) === 0 && (t.count++, a = Gr.bind(t), e.addEventListener("load", a), e.addEventListener("error", a));
    }
  }
  var Gu = 0;
  function wR(t, e) {
    return t.stylesheets && t.count === 0 && ku(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(a) {
      var s = setTimeout(function() {
        if (t.stylesheets && ku(t, t.stylesheets), t.unsuspend) {
          var c = t.unsuspend;
          t.unsuspend = null, c();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Gu === 0 && (Gu = 62500 * GA());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ku(t, t.stylesheets), t.unsuspend)) {
            var c = t.unsuspend;
            t.unsuspend = null, c();
          }
        },
        (t.imgBytes > Gu ? 50 : 800) + e
      );
      return t.unsuspend = a, function() {
        t.unsuspend = null, clearTimeout(s), clearTimeout(u);
      };
    } : null;
  }
  function Fb(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) ku(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Gr() {
    this.count--, Fb(this);
  }
  function _R() {
    this.imgCount--, Fb(this);
  }
  var Yu = null;
  function ku(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Yu = /* @__PURE__ */ new Map(), e.forEach(AR, t), Yu = null, Gr.call(t));
  }
  function AR(t, e) {
    if (!(e.state.loading & 4)) {
      var a = Yu.get(t);
      if (a) var s = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Yu.set(t, a);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < u.length; c++) {
          var b = u[c];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (a.set(b.dataset.precedence, b), s = b);
        }
        s && a.set(null, s);
      }
      u = e.instance, b = u.getAttribute("data-precedence"), c = a.get(b) || s, c === s && a.set(null, u), a.set(b, u), this.count++, s = Gr.bind(this), u.addEventListener("load", s), u.addEventListener("error", s), c ? c.parentNode.insertBefore(u, c.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Es = {
    $$typeof: ht,
    Provider: null,
    Consumer: null,
    _currentValue: Vt,
    _currentValue2: Vt,
    _threadCount: 0
  };
  function RR(t, e, a, s, u, c, b, C, M) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = hf(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = hf(0), this.hiddenUpdates = hf(null), this.identifierPrefix = s, this.onUncaughtError = u, this.onCaughtError = c, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = M, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Xb(t, e, a, s, u, c, b, C, M, P, k, K) {
    return t = new RR(
      t,
      e,
      a,
      b,
      M,
      P,
      k,
      K,
      C
    ), e = 1, c === !0 && (e |= 24), c = an(3, null, null, e), t.current = c, c.stateNode = t, e = $f(), e.refCount++, t.pooledCache = e, e.refCount++, c.memoizedState = {
      element: s,
      isDehydrated: a,
      cache: e
    }, Jf(c), t;
  }
  function $b(t) {
    return t ? (t = Ko, t) : Ko;
  }
  function Kb(t, e, a, s, u, c) {
    u = $b(u), s.context === null ? s.context = u : s.pendingContext = u, s = da(e), s.payload = { element: a }, c = c === void 0 ? null : c, c !== null && (s.callback = c), a = ha(t, s, e), a !== null && (ln(a, t, e), Sr(a, t, e));
  }
  function Zb(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function zh(t, e) {
    Zb(t, e), (t = t.alternate) && Zb(t, e);
  }
  function Qb(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ja(t, 67108864);
      e !== null && ln(e, t, 67108864), zh(t, 67108864);
    }
  }
  function Jb(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = bn();
      e = mf(e);
      var a = Ja(t, e);
      a !== null && ln(a, t, e), zh(t, e);
    }
  }
  var Cs = !0;
  function OR(t, e, a, s) {
    var u = nt.T;
    nt.T = null;
    var c = at.p;
    try {
      at.p = 2, Lh(t, e, a, s);
    } finally {
      at.p = c, nt.T = u;
    }
  }
  function DR(t, e, a, s) {
    var u = nt.T;
    nt.T = null;
    var c = at.p;
    try {
      at.p = 8, Lh(t, e, a, s);
    } finally {
      at.p = c, nt.T = u;
    }
  }
  function Lh(t, e, a, s) {
    if (Cs) {
      var u = Vh(s);
      if (u === null)
        gh(
          t,
          e,
          s,
          Fu,
          a
        ), t1(t, s);
      else if (NR(
        u,
        t,
        e,
        a,
        s
      ))
        s.stopPropagation();
      else if (t1(t, s), e & 4 && -1 < MR.indexOf(t)) {
        for (; u !== null; ) {
          var c = Po(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var b = Xa(c.pendingLanes);
                  if (b !== 0) {
                    var C = c;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; b; ) {
                      var M = 1 << 31 - dn(b);
                      C.entanglements[1] |= M, b &= ~M;
                    }
                    vi(c), (Gt & 6) === 0 && (Mu = Oe() + 500, Vr(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = Ja(c, 2), C !== null && ln(C, c, 2), zu(), zh(c, 2);
            }
          if (c = Vh(s), c === null && gh(
            t,
            e,
            s,
            Fu,
            a
          ), c === u) break;
          u = c;
        }
        u !== null && s.stopPropagation();
      } else
        gh(
          t,
          e,
          s,
          null,
          a
        );
    }
  }
  function Vh(t) {
    return t = xf(t), Bh(t);
  }
  var Fu = null;
  function Bh(t) {
    if (Fu = null, t = $a(t), t !== null) {
      var e = f(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (t = d(e), t !== null) return t;
          t = null;
        } else if (a === 31) {
          if (t = h(e), t !== null) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Fu = t, null;
  }
  function Wb(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Fa()) {
          case Vo:
            return 2;
          case Js:
            return 8;
          case Rt:
          case _e:
            return 32;
          case ri:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ph = !1, wa = null, _a = null, Aa = null, Yr = /* @__PURE__ */ new Map(), kr = /* @__PURE__ */ new Map(), Ra = [], MR = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function t1(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        wa = null;
        break;
      case "dragenter":
      case "dragleave":
        _a = null;
        break;
      case "mouseover":
      case "mouseout":
        Aa = null;
        break;
      case "pointerover":
      case "pointerout":
        Yr.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        kr.delete(e.pointerId);
    }
  }
  function Fr(t, e, a, s, u, c) {
    return t === null || t.nativeEvent !== c ? (t = {
      blockedOn: e,
      domEventName: a,
      eventSystemFlags: s,
      nativeEvent: c,
      targetContainers: [u]
    }, e !== null && (e = Po(e), e !== null && Qb(e)), t) : (t.eventSystemFlags |= s, e = t.targetContainers, u !== null && e.indexOf(u) === -1 && e.push(u), t);
  }
  function NR(t, e, a, s, u) {
    switch (e) {
      case "focusin":
        return wa = Fr(
          wa,
          t,
          e,
          a,
          s,
          u
        ), !0;
      case "dragenter":
        return _a = Fr(
          _a,
          t,
          e,
          a,
          s,
          u
        ), !0;
      case "mouseover":
        return Aa = Fr(
          Aa,
          t,
          e,
          a,
          s,
          u
        ), !0;
      case "pointerover":
        var c = u.pointerId;
        return Yr.set(
          c,
          Fr(
            Yr.get(c) || null,
            t,
            e,
            a,
            s,
            u
          )
        ), !0;
      case "gotpointercapture":
        return c = u.pointerId, kr.set(
          c,
          Fr(
            kr.get(c) || null,
            t,
            e,
            a,
            s,
            u
          )
        ), !0;
    }
    return !1;
  }
  function e1(t) {
    var e = $a(t.target);
    if (e !== null) {
      var a = f(e);
      if (a !== null) {
        if (e = a.tag, e === 13) {
          if (e = d(a), e !== null) {
            t.blockedOn = e, Xg(t.priority, function() {
              Jb(a);
            });
            return;
          }
        } else if (e === 31) {
          if (e = h(a), e !== null) {
            t.blockedOn = e, Xg(t.priority, function() {
              Jb(a);
            });
            return;
          }
        } else if (e === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Xu(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = Vh(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var s = new a.constructor(
          a.type,
          a
        );
        Sf = s, a.target.dispatchEvent(s), Sf = null;
      } else
        return e = Po(a), e !== null && Qb(e), t.blockedOn = a, !1;
      e.shift();
    }
    return !0;
  }
  function n1(t, e, a) {
    Xu(t) && a.delete(e);
  }
  function jR() {
    Ph = !1, wa !== null && Xu(wa) && (wa = null), _a !== null && Xu(_a) && (_a = null), Aa !== null && Xu(Aa) && (Aa = null), Yr.forEach(n1), kr.forEach(n1);
  }
  function $u(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Ph || (Ph = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      jR
    )));
  }
  var Ku = null;
  function i1(t) {
    Ku !== t && (Ku = t, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ku === t && (Ku = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e], s = t[e + 1], u = t[e + 2];
          if (typeof s != "function") {
            if (Bh(s || a) === null)
              continue;
            break;
          }
          var c = Po(a);
          c !== null && (t.splice(e, 3), e -= 3, bd(
            c,
            {
              pending: !0,
              data: u,
              method: a.method,
              action: s
            },
            s,
            u
          ));
        }
      }
    ));
  }
  function ws(t) {
    function e(M) {
      return $u(M, t);
    }
    wa !== null && $u(wa, t), _a !== null && $u(_a, t), Aa !== null && $u(Aa, t), Yr.forEach(e), kr.forEach(e);
    for (var a = 0; a < Ra.length; a++) {
      var s = Ra[a];
      s.blockedOn === t && (s.blockedOn = null);
    }
    for (; 0 < Ra.length && (a = Ra[0], a.blockedOn === null); )
      e1(a), a.blockedOn === null && Ra.shift();
    if (a = (t.ownerDocument || t).$$reactFormReplay, a != null)
      for (s = 0; s < a.length; s += 3) {
        var u = a[s], c = a[s + 1], b = u[nn] || null;
        if (typeof c == "function")
          b || i1(a);
        else if (b) {
          var C = null;
          if (c && c.hasAttribute("formAction")) {
            if (u = c, b = c[nn] || null)
              C = b.formAction;
            else if (Bh(u) !== null) continue;
          } else C = b.action;
          typeof C == "function" ? a[s + 1] = C : (a.splice(s, 3), s -= 3), i1(a);
        }
      }
  }
  function a1() {
    function t(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(b) {
            return u = b;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      u !== null && (u(), u = null), s || setTimeout(a, 20);
    }
    function a() {
      if (!s && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var s = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(a, 100), function() {
        s = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), u !== null && (u(), u = null);
      };
    }
  }
  function Uh(t) {
    this._internalRoot = t;
  }
  Zu.prototype.render = Uh.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var a = e.current, s = bn();
    Kb(a, s, t, e, null, null);
  }, Zu.prototype.unmount = Uh.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Kb(t.current, 2, null, t, null, null), zu(), e[Bo] = null;
    }
  };
  function Zu(t) {
    this._internalRoot = t;
  }
  Zu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Fg();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < Ra.length && e !== 0 && e < Ra[a].priority; a++) ;
      Ra.splice(a, 0, t), a === 0 && e1(t);
    }
  };
  var o1 = i.version;
  if (o1 !== "19.3.0")
    throw Error(
      r(
        527,
        o1,
        "19.3.0"
      )
    );
  at.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = g(e), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var zR = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: nt,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qu.isDisabled && Qu.supportsFiber)
      try {
        tr = Qu.inject(
          zR
        ), fn = Qu;
      } catch {
      }
  }
  return $r.createRoot = function(t, e) {
    if (!l(t)) throw Error(r(299));
    var a = !1, s = "", u = $v, c = Kv, b = Zv;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (s = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (b = e.onRecoverableError)), e = Xb(
      t,
      1,
      !1,
      null,
      null,
      a,
      s,
      null,
      u,
      c,
      b,
      a1
    ), t[Bo] = e.current, ph(t), new Uh(e);
  }, $r.hydrateRoot = function(t, e, a) {
    if (!l(t)) throw Error(r(299));
    var s = !1, u = "", c = $v, b = Kv, C = Zv, M = null;
    return a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (c = a.onUncaughtError), a.onCaughtError !== void 0 && (b = a.onCaughtError), a.onRecoverableError !== void 0 && (C = a.onRecoverableError), a.formState !== void 0 && (M = a.formState)), e = Xb(
      t,
      1,
      !0,
      e,
      a ?? null,
      s,
      u,
      M,
      c,
      b,
      C,
      a1
    ), e.context = $b(null), a = e.current, s = bn(), s = mf(s), u = da(s), u.callback = null, ha(a, u, s), a = s, e.current.lanes = a, nr(e, a), vi(e), t[Bo] = e.current, ph(t), new Zu(e);
  }, $r.version = "19.3.0", $r;
}
var v1;
function kR() {
  if (v1) return qh.exports;
  v1 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), qh.exports = YR(), qh.exports;
}
var FR = kR(), v = bp();
const XR = /* @__PURE__ */ BR(v), qs = /* @__PURE__ */ VR({
  __proto__: null,
  default: XR
}, [v]), il = v.createContext({});
function Oo(n) {
  const i = v.useRef(null);
  return i.current === null && (i.current = n()), i.current;
}
const $R = typeof window < "u", ml = $R ? v.useLayoutEffect : v.useEffect, pl = /* @__PURE__ */ v.createContext(null);
function Sp(n, i) {
  n.indexOf(i) === -1 && n.push(i);
}
function Bs(n, i) {
  const o = n.indexOf(i);
  o > -1 && n.splice(o, 1);
}
const Ci = (n, i, o) => o > i ? i : o < n ? n : o;
let Gc = () => {
};
const za = {}, Px = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n), Ux = (n) => typeof n == "object" && n !== null, Hx = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Ix(n) {
  let i;
  return () => (i === void 0 && (i = n()), i);
}
const Hn = /* @__NO_SIDE_EFFECTS__ */ (n) => n, gl = (...n) => n.reduce((i, o) => (r) => o(i(r))), Ps = /* @__NO_SIDE_EFFECTS__ */ (n, i, o) => {
  const r = i - n;
  return r ? (o - n) / r : 1;
};
class xp {
  constructor() {
    this.subscriptions = [];
  }
  add(i) {
    return Sp(this.subscriptions, i), () => Bs(this.subscriptions, i);
  }
  notify(i, o, r) {
    const l = this.subscriptions.length;
    if (l)
      if (l === 1)
        this.subscriptions[0](i, o, r);
      else
        for (let f = 0; f < l; f++) {
          const d = this.subscriptions[f];
          d && d(i, o, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const un = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, Un = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3, qx = /* @__NO_SIDE_EFFECTS__ */ (n, i) => i ? n * (1e3 / i) : 0, KR = (n, i, o) => {
  const r = i - n;
  return ((o - n) % r + r) % r + n;
}, Gx = (n, i, o) => (((1 - 3 * o + 3 * i) * n + (3 * o - 6 * i)) * n + 3 * i) * n, ZR = 1e-7, QR = 12;
function JR(n, i, o, r, l) {
  let f, d, h = 0;
  do
    d = i + (o - i) / 2, f = Gx(d, r, l) - n, f > 0 ? o = d : i = d;
  while (Math.abs(f) > ZR && ++h < QR);
  return d;
}
// @__NO_SIDE_EFFECTS__
function yl(n, i, o, r) {
  if (n === i && o === r)
    return Hn;
  const l = (f) => JR(f, 0, 1, n, o);
  return (f) => f === 0 || f === 1 ? f : Gx(l(f), i, r);
}
const Yx = /* @__NO_SIDE_EFFECTS__ */ (n) => (i) => i <= 0.5 ? n(2 * i) / 2 : (2 - n(2 * (1 - i))) / 2, Tp = /* @__NO_SIDE_EFFECTS__ */ (n) => (i) => 1 - n(1 - i), kx = /* @__PURE__ */ yl(0.33, 1.53, 0.69, 0.99), Ep = /* @__PURE__ */ Tp(kx), Fx = /* @__PURE__ */ Yx(Ep), Xx = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * Ep(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Cp = (n) => 1 - Math.sin(Math.acos(n)), $x = /* @__PURE__ */ Tp(Cp), Kx = /* @__PURE__ */ Yx(Cp), WR = /* @__PURE__ */ yl(0.42, 0, 1, 1), t2 = /* @__PURE__ */ yl(0, 0, 0.58, 1), Zx = /* @__PURE__ */ yl(0.42, 0, 0.58, 1), Qx = /* @__NO_SIDE_EFFECTS__ */ (n) => Array.isArray(n) && typeof n[0] != "number";
// @__NO_SIDE_EFFECTS__
function Jx(n, i) {
  return /* @__PURE__ */ Qx(n) ? n[KR(0, n.length, i)] : n;
}
const Wx = /* @__NO_SIDE_EFFECTS__ */ (n) => Array.isArray(n) && typeof n[0] == "number", e2 = {
  linear: Hn,
  easeIn: WR,
  easeInOut: Zx,
  easeOut: t2,
  circIn: Cp,
  circInOut: Kx,
  circOut: $x,
  backIn: Ep,
  backInOut: Fx,
  backOut: kx,
  anticipate: Xx
}, n2 = (n) => typeof n == "string", b1 = (n) => {
  if (/* @__PURE__ */ Wx(n)) {
    Gc(n.length === 4);
    const [i, o, r, l] = n;
    return /* @__PURE__ */ yl(i, o, r, l);
  } else if (n2(n))
    return e2[n];
  return n;
}, Ju = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function i2(n) {
  let i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), r = !1, l = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let d = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function h(g) {
    f.has(g) && (m.schedule(g), n()), g(d);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (g, y = !1, p = !1) => {
      const T = p && r ? i : o;
      return y && f.add(g), T.add(g), g;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (g) => {
      o.delete(g), f.delete(g);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (g) => {
      if (d = g, r) {
        l = !0;
        return;
      }
      r = !0;
      const y = i;
      i = o, o = y, i.forEach(h), i.clear(), r = !1, l && (l = !1, m.process(g));
    }
  };
  return m;
}
const a2 = 40;
function tT(n, i) {
  let o = !1, r = !0;
  const l = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, f = () => o = !0, d = Ju.reduce((A, D) => (A[D] = i2(f), A), {}), { setup: h, read: m, resolveKeyframes: g, preUpdate: y, update: p, preRender: S, render: T, postRender: E } = d, w = () => {
    const A = za.useManualTiming, D = A ? l.timestamp : performance.now();
    o = !1, A || (l.delta = r ? 1e3 / 60 : Math.max(Math.min(D - l.timestamp, a2), 1)), l.timestamp = D, l.isProcessing = !0, h.process(l), m.process(l), g.process(l), y.process(l), p.process(l), S.process(l), T.process(l), E.process(l), l.isProcessing = !1, o && i && (r = !1, n(w));
  }, _ = () => {
    o = !0, r = !0, l.isProcessing || n(w);
  };
  return { schedule: Ju.reduce((A, D) => {
    const U = d[D];
    return A[D] = (z, V = !1, I = !1) => (o || _(), U.schedule(z, V, I)), A;
  }, {}), cancel: (A) => {
    for (let D = 0; D < Ju.length; D++)
      d[Ju[D]].cancel(A);
  }, state: l, steps: d };
}
const { schedule: Ft, cancel: Zi, state: Ye, steps: Xh } = /* @__PURE__ */ tT(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Hn, !0);
let hc;
function o2() {
  hc = void 0;
}
const tn = {
  now: () => (hc === void 0 && tn.set(Ye.isProcessing || za.useManualTiming ? Ye.timestamp : performance.now()), hc),
  set: (n) => {
    hc = n, queueMicrotask(o2);
  }
}, eT = (n) => (i) => typeof i == "string" && i.startsWith(n), nT = /* @__PURE__ */ eT("--"), s2 = /* @__PURE__ */ eT("var(--"), wp = (n) => s2(n) ? r2.test(n.split("/*")[0].trim()) : !1, r2 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function S1(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Gs = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, al = {
  ...Gs,
  transform: (n) => Ci(0, 1, n)
}, Wu = {
  ...Gs,
  default: 1
}, Jr = (n) => Math.round(n * 1e5) / 1e5, _p = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function l2(n) {
  return n == null;
}
const u2 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Ap = (n, i) => (o) => !!(typeof o == "string" && u2.test(o) && o.startsWith(n) || i && !l2(o) && Object.prototype.hasOwnProperty.call(o, i)), iT = (n, i, o) => (r) => {
  if (typeof r != "string")
    return r;
  const [l, f, d, h] = r.match(_p);
  return {
    [n]: parseFloat(l),
    [i]: parseFloat(f),
    [o]: parseFloat(d),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, c2 = (n) => Ci(0, 255, n), $h = {
  ...Gs,
  transform: (n) => Math.round(c2(n))
}, To = {
  test: /* @__PURE__ */ Ap("rgb", "red"),
  parse: /* @__PURE__ */ iT("red", "green", "blue"),
  transform: ({ red: n, green: i, blue: o, alpha: r = 1 }) => "rgba(" + $h.transform(n) + ", " + $h.transform(i) + ", " + $h.transform(o) + ", " + Jr(al.transform(r)) + ")"
};
function f2(n) {
  let i = "", o = "", r = "", l = "";
  return n.length > 5 ? (i = n.substring(1, 3), o = n.substring(3, 5), r = n.substring(5, 7), l = n.substring(7, 9)) : (i = n.substring(1, 2), o = n.substring(2, 3), r = n.substring(3, 4), l = n.substring(4, 5), i += i, o += o, r += r, l += l), {
    red: parseInt(i, 16),
    green: parseInt(o, 16),
    blue: parseInt(r, 16),
    alpha: l ? parseInt(l, 16) / 255 : 1
  };
}
const Am = {
  test: /* @__PURE__ */ Ap("#"),
  parse: f2,
  transform: To.transform
}, vl = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (i) => typeof i == "string" && i.endsWith(n) && i.split(" ").length === 1,
  parse: parseFloat,
  transform: (i) => `${i}${n}`
}), ki = /* @__PURE__ */ vl("deg"), Ei = /* @__PURE__ */ vl("%"), pt = /* @__PURE__ */ vl("px"), d2 = /* @__PURE__ */ vl("vh"), h2 = /* @__PURE__ */ vl("vw"), x1 = {
  ...Ei,
  parse: (n) => Ei.parse(n) / 100,
  transform: (n) => Ei.transform(n * 100)
}, Ns = {
  test: /* @__PURE__ */ Ap("hsl", "hue"),
  parse: /* @__PURE__ */ iT("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: i, lightness: o, alpha: r = 1 }) => "hsla(" + Math.round(n) + ", " + Ei.transform(Jr(i)) + ", " + Ei.transform(Jr(o)) + ", " + Jr(al.transform(r)) + ")"
}, Ee = {
  test: (n) => To.test(n) || Am.test(n) || Ns.test(n),
  parse: (n) => To.test(n) ? To.parse(n) : Ns.test(n) ? Ns.parse(n) : Am.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? To.transform(n) : Ns.transform(n),
  getAnimatableNone: (n) => {
    const i = Ee.parse(n);
    return i.alpha = 0, Ee.transform(i);
  }
}, m2 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function p2(n) {
  return isNaN(n) && typeof n == "string" && (n.match(_p)?.length || 0) + (n.match(m2)?.length || 0) > 0;
}
const aT = "number", oT = "color", g2 = "var", y2 = "var(", T1 = "${}", v2 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Us(n) {
  const i = n.toString(), o = [], r = {
    color: [],
    number: [],
    var: []
  }, l = [];
  let f = 0;
  const h = i.replace(v2, (m) => (Ee.test(m) ? (r.color.push(f), l.push(oT), o.push(Ee.parse(m))) : m.startsWith(y2) ? (r.var.push(f), l.push(g2), o.push(m)) : (r.number.push(f), l.push(aT), o.push(parseFloat(m))), ++f, T1)).split(T1);
  return { values: o, split: h, indexes: r, types: l };
}
function b2(n) {
  return Us(n).values;
}
function sT({ split: n, types: i }) {
  const o = n.length;
  return (r) => {
    let l = "";
    for (let f = 0; f < o; f++)
      if (l += n[f], r[f] !== void 0) {
        const d = i[f];
        d === aT ? l += Jr(r[f]) : d === oT ? l += Ee.transform(r[f]) : l += r[f];
      }
    return l;
  };
}
function S2(n) {
  return sT(Us(n));
}
const x2 = (n) => typeof n == "number" ? 0 : Ee.test(n) ? Ee.getAnimatableNone(n) : n, T2 = (n, i) => typeof n == "number" ? i?.trim().endsWith("/") ? n : 0 : x2(n);
function E2(n) {
  const i = Us(n);
  return sT(i)(i.values.map((r, l) => T2(r, i.split[l])));
}
const ti = {
  test: p2,
  parse: b2,
  createTransformer: S2,
  getAnimatableNone: E2
};
function Kh(n, i, o) {
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? n + (i - n) * 6 * o : o < 1 / 2 ? i : o < 2 / 3 ? n + (i - n) * (2 / 3 - o) * 6 : n;
}
function C2({ hue: n, saturation: i, lightness: o, alpha: r }) {
  n /= 360, i /= 100, o /= 100;
  let l = 0, f = 0, d = 0;
  if (!i)
    l = f = d = o;
  else {
    const h = o < 0.5 ? o * (1 + i) : o + i - o * i, m = 2 * o - h;
    l = Kh(m, h, n + 1 / 3), f = Kh(m, h, n), d = Kh(m, h, n - 1 / 3);
  }
  return {
    red: Math.round(l * 255),
    green: Math.round(f * 255),
    blue: Math.round(d * 255),
    alpha: r
  };
}
function Oc(n, i) {
  return (o) => o > 0 ? i : n;
}
const Qt = (n, i, o) => n + (i - n) * o, Zh = (n, i, o) => {
  const r = n * n, l = o * (i * i - r) + r;
  return l < 0 ? 0 : Math.sqrt(l);
}, w2 = [Am, To, Ns], _2 = (n) => w2.find((i) => i.test(n));
function E1(n) {
  const i = _2(n);
  if (!i)
    return !1;
  let o = i.parse(n);
  return i === Ns && (o = C2(o)), o;
}
const C1 = (n, i) => {
  const o = E1(n), r = E1(i);
  if (!o || !r)
    return Oc(n, i);
  const l = { ...o };
  return (f) => (l.red = Zh(o.red, r.red, f), l.green = Zh(o.green, r.green, f), l.blue = Zh(o.blue, r.blue, f), l.alpha = Qt(o.alpha, r.alpha, f), To.transform(l));
}, Rm = /* @__PURE__ */ new Set(["none", "hidden"]);
function A2(n, i) {
  return Rm.has(n) ? (o) => o <= 0 ? n : i : (o) => o >= 1 ? i : n;
}
function R2(n, i) {
  return (o) => Qt(n, i, o);
}
function Rp(n) {
  return typeof n == "number" ? R2 : typeof n == "string" ? wp(n) ? Oc : Ee.test(n) ? C1 : M2 : Array.isArray(n) ? rT : typeof n == "object" ? Ee.test(n) ? C1 : O2 : Oc;
}
function rT(n, i) {
  const o = [...n], r = o.length, l = n.map((f, d) => Rp(f)(f, i[d]));
  return (f) => {
    for (let d = 0; d < r; d++)
      o[d] = l[d](f);
    return o;
  };
}
function O2(n, i) {
  const o = { ...n, ...i }, r = {};
  for (const l in o)
    n[l] !== void 0 && i[l] !== void 0 && (r[l] = Rp(n[l])(n[l], i[l]));
  return (l) => {
    for (const f in r)
      o[f] = r[f](l);
    return o;
  };
}
function D2(n, i) {
  const o = [], r = { color: 0, var: 0, number: 0 };
  for (let l = 0; l < i.values.length; l++) {
    const f = i.types[l], d = n.indexes[f][r[f]], h = n.values[d] ?? 0;
    o[l] = h, r[f]++;
  }
  return o;
}
const M2 = (n, i) => {
  const o = ti.createTransformer(i), r = Us(n), l = Us(i);
  return r.indexes.var.length === l.indexes.var.length && r.indexes.color.length === l.indexes.color.length && r.indexes.number.length >= l.indexes.number.length ? Rm.has(n) && !l.values.length || Rm.has(i) && !r.values.length ? A2(n, i) : gl(rT(D2(r, l), l.values), o) : Oc(n, i);
};
function lT(n, i, o) {
  return typeof n == "number" && typeof i == "number" && typeof o == "number" ? Qt(n, i, o) : Rp(n)(n, i);
}
const N2 = (n) => {
  const i = ({ timestamp: o }) => n(o);
  return {
    start: (o = !0) => Ft.update(i, o),
    stop: () => Zi(i),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Ye.isProcessing ? Ye.timestamp : tn.now()
  };
}, uT = (n, i, o = 10) => {
  let r = "";
  const l = Math.max(Math.round(i / o), 2);
  for (let f = 0; f < l; f++)
    r += Math.round(n(f / (l - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${r.substring(0, r.length - 2)})`;
}, Dc = 2e4;
function Op(n) {
  let i = 0;
  const o = 50;
  let r = n.next(i);
  for (; !r.done && i < Dc; )
    i += o, r = n.next(i);
  return i >= Dc ? 1 / 0 : i;
}
function cT(n, i = 100, o) {
  const r = o({ ...n, keyframes: [0, i] }), l = Math.min(Op(r), Dc);
  return {
    type: "keyframes",
    ease: (f) => r.next(l * f).value / i,
    duration: /* @__PURE__ */ Un(l)
  };
}
const he = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function Om(n, i) {
  return n * Math.sqrt(1 - i * i);
}
const j2 = 12;
function z2(n, i, o) {
  let r = o;
  for (let l = 1; l < j2; l++)
    r = r - n(r) / i(r);
  return r;
}
const Qh = 1e-3;
function L2({ duration: n = he.duration, bounce: i = he.bounce, velocity: o = he.velocity, mass: r = he.mass }) {
  let l, f, d = 1 - i;
  d = Ci(he.minDamping, he.maxDamping, d), n = Ci(he.minDuration, he.maxDuration, /* @__PURE__ */ Un(n)), d < 1 ? (l = (g) => {
    const y = g * d, p = y * n, S = y - o, T = Om(g, d), E = Math.exp(-p);
    return Qh - S / T * E;
  }, f = (g) => {
    const p = g * d * n, S = p * o + o, T = Math.pow(d, 2) * Math.pow(g, 2) * n, E = Math.exp(-p), w = Om(Math.pow(g, 2), d);
    return (-l(g) + Qh > 0 ? -1 : 1) * ((S - T) * E) / w;
  }) : (l = (g) => {
    const y = Math.exp(-g * n), p = (g - o) * n + 1;
    return -Qh + y * p;
  }, f = (g) => {
    const y = Math.exp(-g * n), p = (o - g) * (n * n);
    return y * p;
  });
  const h = 5 / n, m = z2(l, f, h);
  if (n = /* @__PURE__ */ un(n), isNaN(m))
    return {
      stiffness: he.stiffness,
      damping: he.damping,
      duration: n
    };
  {
    const g = Math.pow(m, 2) * r;
    return {
      stiffness: g,
      damping: d * 2 * Math.sqrt(r * g),
      duration: n
    };
  }
}
const V2 = ["duration", "bounce"], B2 = ["stiffness", "damping", "mass"];
function w1(n, i) {
  return i.some((o) => n[o] !== void 0);
}
function P2(n) {
  let i = {
    velocity: he.velocity,
    stiffness: he.stiffness,
    damping: he.damping,
    mass: he.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!w1(n, B2) && w1(n, V2))
    if (i.velocity = 0, n.visualDuration) {
      const o = n.visualDuration, r = 2 * Math.PI / (o * 1.2), l = r * r, f = 2 * Ci(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(l);
      i = {
        ...i,
        mass: he.mass,
        stiffness: l,
        damping: f
      };
    } else {
      const o = L2({ ...n, velocity: 0 });
      i = {
        ...i,
        ...o,
        mass: he.mass
      }, i.isResolvedFromDuration = !0;
    }
  return i;
}
function ol(n = he.visualDuration, i = he.bounce) {
  const o = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: i
  } : n;
  let { restSpeed: r, restDelta: l } = o;
  const f = o.keyframes[0], d = o.keyframes[o.keyframes.length - 1], h = { done: !1, value: f }, { stiffness: m, damping: g, mass: y, duration: p, velocity: S, isResolvedFromDuration: T } = P2({
    ...o,
    velocity: -/* @__PURE__ */ Un(o.velocity || 0)
  }), E = S || 0, w = g / (2 * Math.sqrt(m * y)), _ = d - f, R = /* @__PURE__ */ Un(Math.sqrt(m / y)), O = Math.abs(_) < 5;
  r || (r = O ? he.restSpeed.granular : he.restSpeed.default), l || (l = O ? he.restDelta.granular : he.restDelta.default);
  let A, D, U, z, V, I;
  if (w < 1)
    U = Om(R, w), z = (E + w * R * _) / U, A = (Z) => {
      const W = Math.exp(-w * R * Z);
      return d - W * (z * Math.sin(U * Z) + _ * Math.cos(U * Z));
    }, V = w * R * z + _ * U, I = w * R * _ - z * U, D = (Z) => Math.exp(-w * R * Z) * (V * Math.sin(U * Z) + I * Math.cos(U * Z));
  else if (w === 1) {
    A = (W) => d - Math.exp(-R * W) * (_ + (E + R * _) * W);
    const Z = E + R * _;
    D = (W) => Math.exp(-R * W) * (R * Z * W - E);
  } else {
    const Z = R * Math.sqrt(w * w - 1);
    A = (ft) => {
      const ht = Math.exp(-w * R * ft), q = Math.min(Z * ft, 300);
      return d - ht * ((E + w * R * _) * Math.sinh(q) + Z * _ * Math.cosh(q)) / Z;
    };
    const W = (E + w * R * _) / Z, et = w * R * W - _ * Z, st = w * R * _ - W * Z;
    D = (ft) => {
      const ht = Math.exp(-w * R * ft), q = Math.min(Z * ft, 300);
      return ht * (et * Math.sinh(q) + st * Math.cosh(q));
    };
  }
  const F = {
    calculatedDuration: T && p || null,
    velocity: (Z) => /* @__PURE__ */ un(D(Z)),
    next: (Z) => {
      if (!T && w < 1) {
        const et = Math.exp(-w * R * Z), st = Math.sin(U * Z), ft = Math.cos(U * Z), ht = d - et * (z * st + _ * ft), q = /* @__PURE__ */ un(et * (V * st + I * ft));
        return h.done = Math.abs(q) <= r && Math.abs(d - ht) <= l, h.value = h.done ? d : ht, h;
      }
      const W = A(Z);
      if (T)
        h.done = Z >= p;
      else {
        const et = /* @__PURE__ */ un(D(Z));
        h.done = Math.abs(et) <= r && Math.abs(d - W) <= l;
      }
      return h.value = h.done ? d : W, h;
    },
    toString: () => {
      const Z = Math.min(Op(F), Dc), W = uT((et) => F.next(Z * et).value, Z, 30);
      return Z + "ms " + W;
    },
    toTransition: () => {
    }
  };
  return F;
}
ol.applyToOptions = (n) => {
  const i = cT(n, 100, ol);
  return n.ease = i.ease, n.duration = /* @__PURE__ */ un(i.duration), n.type = "keyframes", n;
};
const U2 = 5;
function fT(n, i, o) {
  const r = Math.max(i - U2, 0);
  return /* @__PURE__ */ qx(o - n(r), i - r);
}
function Dm({ keyframes: n, velocity: i = 0, power: o = 0.8, timeConstant: r = 325, bounceDamping: l = 10, bounceStiffness: f = 500, modifyTarget: d, min: h, max: m, restDelta: g = 0.5, restSpeed: y }) {
  const p = n[0], S = {
    done: !1,
    value: p
  }, T = (I) => h !== void 0 && I < h || m !== void 0 && I > m, E = (I) => h === void 0 ? m : m === void 0 || Math.abs(h - I) < Math.abs(m - I) ? h : m;
  let w = o * i;
  const _ = p + w, R = d === void 0 ? _ : d(_);
  R !== _ && (w = R - p);
  const O = (I) => -w * Math.exp(-I / r), A = (I) => R + O(I), D = (I) => {
    const F = O(I), Z = A(I);
    S.done = Math.abs(F) <= g, S.value = S.done ? R : Z;
  };
  let U, z;
  const V = (I) => {
    T(S.value) && (U = I, z = ol({
      keyframes: [S.value, E(S.value)],
      velocity: fT(A, I, S.value),
      // TODO: This should be passing * 1000
      damping: l,
      stiffness: f,
      restDelta: g,
      restSpeed: y
    }));
  };
  return V(0), {
    calculatedDuration: null,
    next: (I) => {
      let F = !1;
      return !z && U === void 0 && (F = !0, D(I), V(I)), U !== void 0 && I >= U ? z.next(I - U) : (!F && D(I), S);
    }
  };
}
function H2(n, i, o) {
  const r = [], l = o || za.mix || lT, f = n.length - 1;
  for (let d = 0; d < f; d++) {
    let h = l(n[d], n[d + 1]);
    if (i) {
      const m = Array.isArray(i) ? i[d] || Hn : i;
      h = gl(m, h);
    }
    r.push(h);
  }
  return r;
}
function dT(n, i, { clamp: o = !0, ease: r, mixer: l } = {}) {
  const f = n.length;
  if (Gc(f === i.length), f === 1)
    return () => i[0];
  if (f === 2 && i[0] === i[1])
    return () => i[1];
  const d = n[0] === n[1];
  n[0] > n[f - 1] && (n = [...n].reverse(), i = [...i].reverse());
  const h = H2(i, r, l), m = h.length, g = (y) => {
    if (d && y < n[0])
      return i[0];
    let p = 0;
    if (m > 1)
      for (; p < n.length - 2 && !(y < n[p + 1]); p++)
        ;
    const S = /* @__PURE__ */ Ps(n[p], n[p + 1], y);
    return h[p](S);
  };
  return o ? (y) => g(Ci(n[0], n[f - 1], y)) : g;
}
function hT(n, i) {
  const o = n[n.length - 1];
  for (let r = 1; r <= i; r++) {
    const l = /* @__PURE__ */ Ps(0, i, r);
    n.push(Qt(o, 1, l));
  }
}
function mT(n) {
  const i = [0];
  return hT(i, n.length - 1), i;
}
function I2(n, i) {
  return n.map((o) => o * i);
}
function q2(n, i) {
  return n.map(() => i || Zx).splice(0, n.length - 1);
}
function Wr({ duration: n = 300, keyframes: i, times: o, ease: r = "easeInOut" }) {
  const l = /* @__PURE__ */ Qx(r) ? r.map(b1) : b1(r), f = {
    done: !1,
    value: i[0]
  }, d = I2(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    o && o.length === i.length ? o : mT(i),
    n
  ), h = dT(d, i, {
    ease: Array.isArray(l) ? l : q2(i, l)
  });
  return {
    calculatedDuration: n,
    next: (m) => (f.value = h(m), f.done = m >= n, f)
  };
}
const G2 = (n) => n !== null;
function Yc(n, { repeat: i, repeatType: o = "loop" }, r, l = 1) {
  const f = n.filter(G2), h = l < 0 || i && o !== "loop" && i % 2 === 1 ? 0 : f.length - 1;
  return !h || r === void 0 ? f[h] : r;
}
const Y2 = {
  decay: Dm,
  inertia: Dm,
  tween: Wr,
  keyframes: Wr,
  spring: ol
};
function pT(n) {
  typeof n.type == "string" && (n.type = Y2[n.type]);
}
class Dp {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((i) => {
      this.resolve = i;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(i, o) {
    return this.finished.then(i, o);
  }
}
const k2 = (n) => n / 100;
class sl extends Dp {
  constructor(i) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: o } = this.options;
      o && o.updatedAt !== tn.now() && this.tick(tn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = i, this.initAnimation(), this.play(), i.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: i } = this;
    pT(i);
    const { type: o = Wr, repeat: r = 0, repeatDelay: l = 0, repeatType: f, velocity: d = 0 } = i;
    let { keyframes: h } = i;
    const m = o || Wr;
    m !== Wr && typeof h[0] != "number" && (this.mixKeyframes = gl(k2, lT(h[0], h[1])), h = [0, 100]);
    const g = m({ ...i, keyframes: h });
    f === "mirror" && (this.mirroredGenerator = m({
      ...i,
      keyframes: [...h].reverse(),
      velocity: -d
    })), g.calculatedDuration === null && (g.calculatedDuration = Op(g));
    const { calculatedDuration: y } = g;
    this.calculatedDuration = y, this.resolvedDuration = y + l, this.totalDuration = this.resolvedDuration * (r + 1) - l, this.generator = g;
  }
  updateTime(i) {
    const o = Math.round(i - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = o;
  }
  tick(i, o = !1) {
    const { generator: r, totalDuration: l, mixKeyframes: f, mirroredGenerator: d, resolvedDuration: h, calculatedDuration: m } = this;
    if (this.startTime === null)
      return r.next(0);
    const { delay: g = 0, keyframes: y, repeat: p, repeatType: S, repeatDelay: T, type: E, onUpdate: w, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, i) : this.speed < 0 && (this.startTime = Math.min(i - l / this.speed, this.startTime)), o ? this.currentTime = i : this.updateTime(i);
    const R = this.currentTime - g * (this.playbackSpeed >= 0 ? 1 : -1), O = this.playbackSpeed >= 0 ? R < 0 : R > l;
    this.currentTime = Math.max(R, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = l);
    let A = this.currentTime, D = r;
    if (p) {
      const I = Math.min(this.currentTime, l) / h;
      let F = Math.floor(I), Z = I % 1;
      !Z && I >= 1 && (Z = 1), Z === 1 && F--, F = Math.min(F, p + 1), F % 2 && (S === "reverse" ? (Z = 1 - Z, T && (Z -= T / h)) : S === "mirror" && (D = d)), A = Ci(0, 1, Z) * h;
    }
    let U;
    O ? (this.delayState.value = y[0], U = this.delayState) : U = D.next(A), f && !O && (U.value = f(U.value));
    let { done: z } = U;
    !O && m !== null && (z = this.playbackSpeed >= 0 ? this.currentTime >= l : this.currentTime <= 0);
    const V = this.holdTime === null && (this.state === "finished" || this.state === "running" && z);
    return V && E !== Dm && (U.value = Yc(y, this.options, _, this.speed)), w && w(U.value), V && this.finish(), U;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(i, o) {
    return this.finished.then(i, o);
  }
  get duration() {
    return /* @__PURE__ */ Un(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Un(i);
  }
  get time() {
    return /* @__PURE__ */ Un(this.currentTime);
  }
  set time(i) {
    i = /* @__PURE__ */ un(i), this.currentTime = i, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = i : this.driver && (this.startTime = this.driver.now() - i / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = i, this.tick(i));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const i = this.currentTime;
    if (i <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(i);
    const o = this.generator.next(i).value;
    return fT((r) => this.generator.next(r).value, i, o);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(i) {
    const o = this.playbackSpeed !== i;
    o && this.driver && this.updateTime(tn.now()), this.playbackSpeed = i, o && this.driver && (this.time = /* @__PURE__ */ Un(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: i = N2, startTime: o } = this.options;
    this.driver || (this.driver = i((l) => this.tick(l))), this.options.onPlay?.();
    const r = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = o ?? r), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(tn.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(i) {
    return this.startTime = 0, this.tick(i, !0);
  }
  attachTimeline(i) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), i.observe(this);
  }
}
function F2(n) {
  for (let i = 1; i < n.length; i++)
    n[i] ?? (n[i] = n[i - 1]);
}
const Eo = (n) => n * 180 / Math.PI, Mm = (n) => {
  const i = Eo(Math.atan2(n[1], n[0]));
  return Nm(i);
}, X2 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Mm,
  rotateZ: Mm,
  skewX: (n) => Eo(Math.atan(n[1])),
  skewY: (n) => Eo(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, Nm = (n) => (n = n % 360, n < 0 && (n += 360), n), _1 = Mm, A1 = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), R1 = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), $2 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: A1,
  scaleY: R1,
  scale: (n) => (A1(n) + R1(n)) / 2,
  rotateX: (n) => Nm(Eo(Math.atan2(n[6], n[5]))),
  rotateY: (n) => Nm(Eo(Math.atan2(-n[2], n[0]))),
  rotateZ: _1,
  rotate: _1,
  skewX: (n) => Eo(Math.atan(n[4])),
  skewY: (n) => Eo(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function jm(n) {
  return n.includes("scale") ? 1 : 0;
}
function zm(n, i) {
  if (!n || n === "none")
    return jm(i);
  const o = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, l;
  if (o)
    r = $2, l = o;
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    r = X2, l = h;
  }
  if (!l)
    return jm(i);
  const f = r[i], d = l[1].split(",").map(Z2);
  return typeof f == "function" ? f(d) : d[f];
}
const K2 = (n, i) => {
  const { transform: o = "none" } = getComputedStyle(n);
  return zm(o, i);
};
function Z2(n) {
  return parseFloat(n.trim());
}
const Ys = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], ks = /* @__PURE__ */ new Set([...Ys, "pathRotation"]), O1 = (n) => n === Gs || n === pt, Q2 = /* @__PURE__ */ new Set(["x", "y", "z"]), J2 = Ys.filter((n) => !Q2.has(n));
function W2(n) {
  const i = [];
  return J2.forEach((o) => {
    const r = n.getValue(o);
    r !== void 0 && (i.push([o, r.get()]), r.set(o.startsWith("scale") ? 1 : 0));
  }), i;
}
const Na = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: i = "0", paddingRight: o = "0", boxSizing: r }) => {
    const l = n.max - n.min;
    return r === "border-box" ? l : l - parseFloat(i) - parseFloat(o);
  },
  height: ({ y: n }, { paddingTop: i = "0", paddingBottom: o = "0", boxSizing: r }) => {
    const l = n.max - n.min;
    return r === "border-box" ? l : l - parseFloat(i) - parseFloat(o);
  },
  top: (n, { top: i }) => parseFloat(i),
  left: (n, { left: i }) => parseFloat(i),
  bottom: ({ y: n }, { top: i }) => parseFloat(i) + (n.max - n.min),
  right: ({ x: n }, { left: i }) => parseFloat(i) + (n.max - n.min),
  // Transform
  x: (n, { transform: i }) => zm(i, "x"),
  y: (n, { transform: i }) => zm(i, "y")
};
Na.translateX = Na.x;
Na.translateY = Na.y;
const Co = /* @__PURE__ */ new Set();
let Lm = !1, Vm = !1, Bm = !1;
function gT() {
  if (Vm) {
    const n = Array.from(Co).filter((r) => r.needsMeasurement), i = new Set(n.map((r) => r.element)), o = /* @__PURE__ */ new Map();
    i.forEach((r) => {
      const l = W2(r);
      l.length && (o.set(r, l), r.render());
    }), n.forEach((r) => r.measureInitialState()), i.forEach((r) => {
      r.render();
      const l = o.get(r);
      l && l.forEach(([f, d]) => {
        r.getValue(f)?.set(d);
      });
    }), n.forEach((r) => r.measureEndState()), n.forEach((r) => {
      r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
    });
  }
  Vm = !1, Lm = !1, Co.forEach((n) => n.complete(Bm)), Co.clear();
}
function yT() {
  Co.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Vm = !0);
  });
}
function tO() {
  Bm = !0, yT(), gT(), Bm = !1;
}
class Mp {
  constructor(i, o, r, l, f, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...i], this.onComplete = o, this.name = r, this.motionValue = l, this.element = f, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Co.add(this), Lm || (Lm = !0, Ft.read(yT), Ft.resolveKeyframes(gT))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: i, name: o, element: r, motionValue: l } = this;
    if (i[0] === null) {
      const f = l?.get(), d = i[i.length - 1];
      if (f !== void 0)
        i[0] = f;
      else if (r && o) {
        const h = r.readValue(o, d);
        h != null && (i[0] = h);
      }
      i[0] === void 0 && (i[0] = d), l && f === void 0 && l.set(i[0]);
    }
    F2(i);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(i = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, i), Co.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Co.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const eO = (n) => n.startsWith("--");
function vT(n, i, o) {
  eO(i) ? n.style.setProperty(i, o) : n.style[i] = o;
}
const nO = {};
function bT(n, i) {
  const o = /* @__PURE__ */ Ix(n);
  return () => nO[i] ?? o();
}
const iO = /* @__PURE__ */ bT(() => window.ScrollTimeline !== void 0, "scrollTimeline"), ST = /* @__PURE__ */ bT(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Qr = ([n, i, o, r]) => `cubic-bezier(${n}, ${i}, ${o}, ${r})`, D1 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Qr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Qr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Qr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Qr([0.33, 1.53, 0.69, 0.99])
};
function xT(n, i) {
  if (n)
    return typeof n == "function" ? ST() ? uT(n, i) : "ease-out" : /* @__PURE__ */ Wx(n) ? Qr(n) : Array.isArray(n) ? n.map((o) => xT(o, i) || D1.easeOut) : D1[n];
}
function aO(n, i, o, { delay: r = 0, duration: l = 300, repeat: f = 0, repeatType: d = "loop", ease: h = "easeOut", times: m } = {}, g = void 0) {
  const y = {
    [i]: o
  };
  m && (y.offset = m);
  const p = xT(h, l);
  Array.isArray(p) && (y.easing = p);
  const S = {
    delay: r,
    duration: l,
    easing: Array.isArray(p) ? "linear" : p,
    fill: "both",
    iterations: f + 1,
    direction: d === "reverse" ? "alternate" : "normal"
  };
  return g && (S.pseudoElement = g), n.animate(y, S);
}
function Np(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function oO({ type: n, ...i }) {
  return Np(n) && ST() ? n.applyToOptions(i) : (i.duration ?? (i.duration = 300), i.ease ?? (i.ease = "easeOut"), i);
}
class TT extends Dp {
  constructor(i) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !i)
      return;
    const { element: o, name: r, keyframes: l, pseudoElement: f, allowFlatten: d = !1, finalKeyframe: h, onComplete: m } = i;
    this.isPseudoElement = !!f, this.allowFlatten = d, this.options = i, Gc(typeof i.type != "string");
    const g = oO(i);
    this.animation = aO(o, r, l, g, f), g.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !f) {
        const y = Yc(l, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), vT(o, r, y), this.animation.cancel();
      }
      m?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: i } = this;
    i === "idle" || i === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const i = this.options?.element;
    !this.isPseudoElement && i?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const i = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ Un(Number(i));
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Un(i);
  }
  get time() {
    return /* @__PURE__ */ Un(Number(this.animation.currentTime) || 0);
  }
  set time(i) {
    const o = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ un(i), o && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(i) {
    i < 0 && (this.finishedTime = null), this.animation.playbackRate = i;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(i) {
    this.manualStartTime = this.animation.startTime = i;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: i, rangeStart: o, rangeEnd: r, observe: l }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, i && iO() ? (this.animation.timeline = i, o && (this.animation.rangeStart = o), r && (this.animation.rangeEnd = r), Hn) : l(this);
  }
}
const ET = {
  anticipate: Xx,
  backInOut: Fx,
  circInOut: Kx
};
function sO(n) {
  return n in ET;
}
function rO(n) {
  typeof n.ease == "string" && sO(n.ease) && (n.ease = ET[n.ease]);
}
const Jh = 10;
class lO extends TT {
  constructor(i) {
    rO(i), pT(i), super(i), i.startTime !== void 0 && i.autoplay !== !1 && (this.startTime = i.startTime), this.options = i;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(i) {
    const { motionValue: o, onUpdate: r, onComplete: l, element: f, ...d } = this.options;
    if (!o)
      return;
    if (i !== void 0) {
      o.set(i);
      return;
    }
    const h = new sl({
      ...d,
      autoplay: !1
    }), m = Math.max(Jh, tn.now() - this.startTime), g = Ci(0, Jh, m - Jh), y = h.sample(m).value, { name: p } = this.options;
    f && p && vT(f, p, y), o.setWithVelocity(h.sample(Math.max(0, m - g)).value, y, g), h.stop();
  }
}
const M1 = (n, i) => i === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(ti.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function uO(n) {
  const i = n[0];
  if (n.length === 1)
    return !0;
  for (let o = 0; o < n.length; o++)
    if (n[o] !== i)
      return !0;
}
function cO(n, i, o, r) {
  const l = n[0];
  if (l === null)
    return !1;
  if (i === "display" || i === "visibility")
    return !0;
  const f = n[n.length - 1], d = M1(l, i), h = M1(f, i);
  return !d || !h ? !1 : uO(n) || (o === "spring" || Np(o)) && r;
}
function Pm(n) {
  n.duration = 0, n.type = "keyframes";
}
const CT = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), fO = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function dO(n) {
  for (let i = 0; i < n.length; i++)
    if (typeof n[i] == "string" && fO.test(n[i]))
      return !0;
  return !1;
}
const hO = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), mO = /* @__PURE__ */ Ix(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function pO(n) {
  const { motionValue: i, name: o, repeatDelay: r, repeatType: l, damping: f, type: d, keyframes: h } = n, m = i?.owner?.current;
  if (!(m instanceof HTMLElement) && !(m instanceof SVGElement))
    return !1;
  const { onUpdate: g, transformTemplate: y } = i.owner.getProps();
  return mO() && o && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (CT.has(o) || hO.has(o) && dO(h)) && (o !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !g && !r && l !== "mirror" && f !== 0 && d !== "inertia";
}
const gO = 40;
class yO extends Dp {
  constructor({ autoplay: i = !0, delay: o = 0, type: r = "keyframes", repeat: l = 0, repeatDelay: f = 0, repeatType: d = "loop", keyframes: h, name: m, motionValue: g, element: y, ...p }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = tn.now();
    const S = {
      autoplay: i,
      delay: o,
      type: r,
      repeat: l,
      repeatDelay: f,
      repeatType: d,
      name: m,
      motionValue: g,
      element: y,
      ...p
    }, T = y?.KeyframeResolver || Mp;
    this.keyframeResolver = new T(h, (E, w, _) => this.onKeyframesResolved(E, w, S, !_), m, g, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(i, o, r, l) {
    this.keyframeResolver = void 0;
    const { name: f, type: d, velocity: h, delay: m, isHandoff: g, onUpdate: y } = r;
    this.resolvedAt = tn.now();
    let p = !0;
    cO(i, f, d, h) || (p = !1, (za.instantAnimations || !m) && y?.(Yc(i, r, o)), i[0] = i[i.length - 1], Pm(r), r.repeat = 0);
    const T = {
      startTime: l ? this.resolvedAt ? this.resolvedAt - this.createdAt > gO ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: o,
      ...r,
      keyframes: i
    }, E = p && !g && pO(T), w = T.motionValue?.owner?.current;
    let _;
    if (E)
      try {
        _ = new lO({
          ...T,
          element: w
        });
      } catch {
        _ = new sl(T);
      }
    else
      _ = new sl(T);
    _.finished.then(() => {
      this.notifyFinished();
    }).catch(Hn), this.pendingTimeline && (this.stopTimeline = _.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = _;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(i, o) {
    return this.finished.finally(i).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), tO()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(i) {
    this.animation.time = i;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(i) {
    this.animation.speed = i;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(i) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(i) : this.pendingTimeline = i, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
class vO {
  constructor(i) {
    this.stop = () => this.runAll("stop"), this.animations = i.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((i) => i.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(i) {
    return this.animations[0][i];
  }
  setAll(i, o) {
    for (let r = 0; r < this.animations.length; r++)
      this.animations[r][i] = o;
  }
  attachTimeline(i) {
    const o = this.animations.map((r) => r.attachTimeline(i));
    return () => {
      o.forEach((r, l) => {
        r && r(), this.animations[l].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(i) {
    this.setAll("time", i);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(i) {
    this.setAll("speed", i);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return N1(this.animations, "duration");
  }
  get iterationDuration() {
    return N1(this.animations, "iterationDuration");
  }
  runAll(i) {
    this.animations.forEach((o) => o[i]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function N1(n, i) {
  let o = 0;
  for (let r = 0; r < n.length; r++) {
    const l = n[r][i];
    l !== null && l > o && (o = l);
  }
  return o;
}
class bO extends vO {
  then(i, o) {
    return this.finished.finally(i).then(() => {
    });
  }
}
function wT(n, i, o, r = 0, l = 1) {
  const f = Array.from(n).sort((g, y) => g.sortNodePosition(y)).indexOf(i), d = n.size, h = (d - 1) * r;
  return typeof o == "function" ? o(f, d) : l === 1 ? f * r : h - f * r;
}
const j1 = 30, SO = (n) => !isNaN(parseFloat(n)), tl = {
  current: void 0
};
class xO {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(i, o = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (r) => {
      const l = tn.now();
      if (this.updatedAt !== l && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const f of this.dependents)
          f.dirty();
    }, this.hasAnimated = !1, this.setCurrent(i), this.owner = o.owner;
  }
  setCurrent(i) {
    this.current = i, this.updatedAt = tn.now(), this.canTrackVelocity === null && i !== void 0 && (this.canTrackVelocity = SO(this.current));
  }
  setPrevFrameValue(i = this.current) {
    this.prevFrameValue = i, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(i) {
    return this.on("change", i);
  }
  on(i, o) {
    this.events[i] || (this.events[i] = new xp());
    const r = this.events[i].add(o);
    return i === "change" ? () => {
      r(), Ft.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : r;
  }
  clearListeners() {
    for (const i in this.events)
      this.events[i].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(i, o) {
    this.passiveEffect = i, this.stopPassiveEffect = o;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(i) {
    this.passiveEffect ? this.passiveEffect(i, this.updateAndNotify) : this.updateAndNotify(i);
  }
  setWithVelocity(i, o, r) {
    this.set(o), this.prev = void 0, this.prevFrameValue = i, this.prevUpdatedAt = this.updatedAt - r;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(i, o = !0) {
    this.updateAndNotify(i), this.prev = i, this.prevUpdatedAt = this.prevFrameValue = void 0, o && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(i) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(i);
  }
  removeDependent(i) {
    this.dependents && this.dependents.delete(i);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return tl.current && tl.current.push(this), this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const i = tn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || i - this.updatedAt > j1)
      return 0;
    const o = Math.min(this.updatedAt - this.prevUpdatedAt, j1);
    return /* @__PURE__ */ qx(parseFloat(this.current) - parseFloat(this.prevFrameValue), o);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(i) {
    return this.stop(), new Promise((o) => {
      this.hasAnimated = !0, this.animation = i(o), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function La(n, i) {
  return new xO(n, i);
}
function jp(n, i) {
  if (n?.inherit && i) {
    const { inherit: o, ...r } = n;
    return { ...i, ...r };
  }
  return n;
}
function zp(n, i) {
  const o = n?.[i] ?? n?.default ?? n;
  return o !== n ? jp(o, n) : o;
}
const TO = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, EO = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), CO = {
  type: "keyframes",
  duration: 0.8
}, wO = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, _O = (n, { keyframes: i }) => i.length > 2 ? CO : ks.has(n) ? n.startsWith("scale") ? EO(i[1]) : TO : wO, AO = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function RO(n) {
  for (const i in n)
    if (!AO.has(i))
      return !0;
  return !1;
}
const Lp = (n, i, o, r = {}, l, f) => (d) => {
  const h = zp(r, n) || {}, m = h.delay || r.delay || 0;
  let { elapsed: g = 0 } = r;
  g = g - /* @__PURE__ */ un(m);
  const y = {
    keyframes: Array.isArray(o) ? o : [null, o],
    ease: "easeOut",
    velocity: i.getVelocity(),
    ...h,
    delay: -g,
    onUpdate: (S) => {
      i.set(S), h.onUpdate && h.onUpdate(S);
    },
    onComplete: () => {
      d(), h.onComplete && h.onComplete();
    },
    name: n,
    motionValue: i,
    element: f ? void 0 : l
  };
  RO(h) || Object.assign(y, _O(n, y)), y.duration && (y.duration = /* @__PURE__ */ un(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ un(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let p = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (Pm(y), y.delay === 0 && (p = !0)), (za.instantAnimations || za.skipAnimations || l?.shouldSkipAnimations || h.skipAnimations) && (p = !0, Pm(y), y.delay = 0), y.allowFlatten = !h.type && !h.ease, p && !f && i.get() !== void 0) {
    const S = Yc(y.keyframes, h);
    if (S !== void 0) {
      Ft.update(() => {
        y.onUpdate(S), y.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new sl(y) : new yO(y);
}, OO = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function DO(n) {
  const i = OO.exec(n);
  if (!i)
    return [,];
  const [, o, r, l] = i;
  return [`--${o ?? r}`, l];
}
function _T(n, i, o = 1) {
  const [r, l] = DO(n);
  if (!r)
    return;
  const f = window.getComputedStyle(i).getPropertyValue(r);
  if (f) {
    const d = f.trim();
    return Px(d) ? parseFloat(d) : d;
  }
  return wp(l) ? _T(l, i, o + 1) : l;
}
function z1(n) {
  const i = [{}, {}];
  return n?.values.forEach((o, r) => {
    i[0][r] = o.get(), i[1][r] = o.getVelocity();
  }), i;
}
function Vp(n, i, o, r) {
  if (typeof i == "function") {
    const [l, f] = z1(r);
    i = i(o !== void 0 ? o : n.custom, l, f);
  }
  if (typeof i == "string" && (i = n.variants && n.variants[i]), typeof i == "function") {
    const [l, f] = z1(r);
    i = i(o !== void 0 ? o : n.custom, l, f);
  }
  return i;
}
function wo(n, i, o) {
  const r = n.getProps();
  return Vp(r, i, o !== void 0 ? o : r.custom, n);
}
const AT = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Ys
]), Um = (n) => Array.isArray(n);
function MO(n, i, o) {
  n.hasValue(i) ? n.getValue(i).set(o) : n.addValue(i, La(o));
}
function NO(n) {
  return Um(n) ? n[n.length - 1] || 0 : n;
}
function jO(n, i) {
  const o = wo(n, i);
  let { transitionEnd: r = {}, transition: l = {}, ...f } = o || {};
  f = { ...f, ...r };
  for (const d in f) {
    const h = NO(f[d]);
    MO(n, d, h);
  }
}
const le = (n) => !!(n && n.getVelocity);
function zO(n) {
  return !!(le(n) && n.add);
}
function Hm(n, i) {
  const o = n.getValue("willChange");
  if (zO(o))
    return o.add(i);
  if (!o && za.WillChange) {
    const r = new za.WillChange("auto");
    n.addValue("willChange", r), r.add(i);
  }
}
function Bp(n) {
  return n.replace(/([A-Z])/g, (i) => `-${i.toLowerCase()}`);
}
const LO = "framerAppearId", RT = "data-" + Bp(LO);
function OT(n) {
  return n.props[RT];
}
function VO({ protectedKeys: n, needsAnimating: i }, o) {
  const r = n.hasOwnProperty(o) && i[o] !== !0;
  return i[o] = !1, r;
}
function Pp(n, i, { delay: o = 0, transitionOverride: r, type: l } = {}) {
  let { transition: f, transitionEnd: d, ...h } = i;
  const m = n.getDefaultTransition();
  f = f ? jp(f, m) : m;
  const g = f?.reduceMotion, y = f?.skipAnimations;
  r && (f = r);
  const p = [], S = l && n.animationState && n.animationState.getState()[l], T = f?.path;
  T && T.animateVisualElement(n, h, f, o, p);
  for (const E in h) {
    const w = n.getValue(E, n.latestValues[E] ?? null), _ = h[E];
    if (_ === void 0 || S && VO(S, E))
      continue;
    const R = {
      delay: o,
      ...zp(f || {}, E)
    };
    y && (R.skipAnimations = !0);
    const O = w.get();
    if (O !== void 0 && !w.isAnimating() && !Array.isArray(_) && _ === O && !R.velocity) {
      Ft.update(() => w.set(_));
      continue;
    }
    let A = !1;
    if (window.MotionHandoffAnimation) {
      const z = OT(n);
      if (z) {
        const V = window.MotionHandoffAnimation(z, E, Ft);
        V !== null && (R.startTime = V, A = !0);
      }
    }
    Hm(n, E);
    const D = g ?? n.shouldReduceMotion;
    w.start(Lp(E, w, _, D && AT.has(E) ? { type: !1 } : R, n, A));
    const U = w.animation;
    U && p.push(U);
  }
  if (d) {
    const E = () => Ft.update(() => {
      d && jO(n, d);
    });
    p.length ? Promise.all(p).then(E) : E();
  }
  return p;
}
function Im(n, i, o = {}) {
  const r = wo(n, i, o.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: l = n.getDefaultTransition() || {} } = r || {};
  o.transitionOverride && (l = o.transitionOverride);
  const f = r ? () => Promise.all(Pp(n, r, o)) : () => Promise.resolve(), d = n.variantChildren && n.variantChildren.size ? (m = 0) => {
    const { delayChildren: g = 0, staggerChildren: y, staggerDirection: p } = l;
    return BO(n, i, m, g, y, p, o);
  } : () => Promise.resolve(), { when: h } = l;
  if (h) {
    const [m, g] = h === "beforeChildren" ? [f, d] : [d, f];
    return m().then(() => g());
  } else
    return Promise.all([f(), d(o.delay)]);
}
function BO(n, i, o = 0, r = 0, l = 0, f = 1, d) {
  const h = [];
  for (const m of n.variantChildren)
    m.notify("AnimationStart", i), h.push(Im(m, i, {
      ...d,
      delay: o + (typeof r == "function" ? 0 : r) + wT(n.variantChildren, m, r, l, f)
    }).then(() => m.notify("AnimationComplete", i)));
  return Promise.all(h);
}
function PO(n, i, o = {}) {
  n.notify("AnimationStart", i);
  let r;
  if (Array.isArray(i)) {
    const l = i.map((f) => Im(n, f, o));
    r = Promise.all(l);
  } else if (typeof i == "string")
    r = Im(n, i, o);
  else {
    const l = typeof i == "function" ? wo(n, i, o.custom) : i;
    r = Promise.all(Pp(n, l, o));
  }
  return r.then(() => {
    n.notify("AnimationComplete", i);
  });
}
const UO = {
  test: (n) => n === "auto",
  parse: (n) => n
}, DT = (n) => (i) => i.test(n), MT = [Gs, pt, Ei, ki, h2, d2, UO], L1 = (n) => MT.find(DT(n));
function HO(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Hx(n) : !0;
}
const IO = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function qO(n) {
  const [i, o] = n.slice(0, -1).split("(");
  if (i === "drop-shadow")
    return n;
  const [r] = o.match(_p) || [];
  if (!r)
    return n;
  const l = o.replace(r, "");
  let f = IO.has(i) ? 1 : 0;
  return r !== o && (f *= 100), i + "(" + f + l + ")";
}
const GO = /\b([a-z-]*)\(.*?\)/gu, qm = {
  ...ti,
  getAnimatableNone: (n) => {
    const i = n.match(GO);
    return i ? i.map(qO).join(" ") : n;
  }
}, Gm = {
  ...ti,
  getAnimatableNone: (n) => {
    const i = ti.parse(n);
    return ti.createTransformer(n)(i.map((r) => typeof r == "number" ? 0 : typeof r == "object" ? { ...r, alpha: 1 } : r));
  }
}, V1 = {
  ...Gs,
  transform: Math.round
}, YO = {
  rotate: ki,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: ki,
  rotateX: ki,
  rotateY: ki,
  rotateZ: ki,
  scale: Wu,
  scaleX: Wu,
  scaleY: Wu,
  scaleZ: Wu,
  skew: ki,
  skewX: ki,
  skewY: ki,
  distance: pt,
  translateX: pt,
  translateY: pt,
  translateZ: pt,
  x: pt,
  y: pt,
  z: pt,
  perspective: pt,
  transformPerspective: pt,
  opacity: al,
  originX: x1,
  originY: x1,
  originZ: pt
}, Mc = {
  // Border props
  borderWidth: pt,
  borderTopWidth: pt,
  borderRightWidth: pt,
  borderBottomWidth: pt,
  borderLeftWidth: pt,
  borderRadius: pt,
  borderTopLeftRadius: pt,
  borderTopRightRadius: pt,
  borderBottomRightRadius: pt,
  borderBottomLeftRadius: pt,
  // Positioning props
  width: pt,
  maxWidth: pt,
  height: pt,
  maxHeight: pt,
  top: pt,
  right: pt,
  bottom: pt,
  left: pt,
  inset: pt,
  insetBlock: pt,
  insetBlockStart: pt,
  insetBlockEnd: pt,
  insetInline: pt,
  insetInlineStart: pt,
  insetInlineEnd: pt,
  // Spacing props
  padding: pt,
  paddingTop: pt,
  paddingRight: pt,
  paddingBottom: pt,
  paddingLeft: pt,
  paddingBlock: pt,
  paddingBlockStart: pt,
  paddingBlockEnd: pt,
  paddingInline: pt,
  paddingInlineStart: pt,
  paddingInlineEnd: pt,
  margin: pt,
  marginTop: pt,
  marginRight: pt,
  marginBottom: pt,
  marginLeft: pt,
  marginBlock: pt,
  marginBlockStart: pt,
  marginBlockEnd: pt,
  marginInline: pt,
  marginInlineStart: pt,
  marginInlineEnd: pt,
  // Typography
  fontSize: pt,
  // Misc
  backgroundPositionX: pt,
  backgroundPositionY: pt,
  ...YO,
  zIndex: V1,
  // SVG
  fillOpacity: al,
  strokeOpacity: al,
  numOctaves: V1
}, kO = {
  ...Mc,
  // Color props
  color: Ee,
  backgroundColor: Ee,
  outlineColor: Ee,
  fill: Ee,
  stroke: Ee,
  // Border props
  borderColor: Ee,
  borderTopColor: Ee,
  borderRightColor: Ee,
  borderBottomColor: Ee,
  borderLeftColor: Ee,
  filter: qm,
  WebkitFilter: qm,
  mask: Gm,
  WebkitMask: Gm
}, NT = (n) => kO[n], FO = /* @__PURE__ */ new Set([qm, Gm]);
function jT(n, i) {
  let o = NT(n);
  return FO.has(o) || (o = ti), o.getAnimatableNone ? o.getAnimatableNone(i) : void 0;
}
const XO = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function $O(n, i, o) {
  let r = 0, l;
  for (; r < n.length && !l; ) {
    const f = n[r];
    typeof f == "string" && !XO.has(f) && Us(f).values.length && (l = n[r]), r++;
  }
  if (l && o)
    for (const f of i)
      n[f] = jT(o, l);
}
class KO extends Mp {
  constructor(i, o, r, l, f) {
    super(i, o, r, l, f, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: i, element: o, name: r } = this;
    if (!o || !o.current)
      return;
    super.readKeyframes();
    for (let y = 0; y < i.length; y++) {
      let p = i[y];
      if (typeof p == "string" && (p = p.trim(), wp(p))) {
        const S = _T(p, o.current);
        S !== void 0 && (i[y] = S), y === i.length - 1 && (this.finalKeyframe = p);
      }
    }
    if (this.resolveNoneKeyframes(), !AT.has(r) || i.length !== 2)
      return;
    const [l, f] = i, d = L1(l), h = L1(f), m = S1(l), g = S1(f);
    if (m !== g && Na[r]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (O1(d) && O1(h))
        for (let y = 0; y < i.length; y++) {
          const p = i[y];
          typeof p == "string" && (i[y] = parseFloat(p));
        }
      else Na[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: i, name: o } = this, r = [];
    for (let l = 0; l < i.length; l++)
      (i[l] === null || HO(i[l])) && r.push(l);
    r.length && $O(i, r, o);
  }
  measureInitialState() {
    const { element: i, unresolvedKeyframes: o, name: r } = this;
    if (!i || !i.current)
      return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Na[r](i.measureViewportBox(), window.getComputedStyle(i.current)), o[0] = this.measuredOrigin;
    const l = o[o.length - 1];
    l !== void 0 && i.getValue(r, l).jump(l, !1);
  }
  measureEndState() {
    const { element: i, name: o, unresolvedKeyframes: r } = this;
    if (!i || !i.current)
      return;
    const l = i.getValue(o);
    l && l.jump(this.measuredOrigin, !1);
    const f = r.length - 1, d = r[f];
    r[f] = Na[o](i.measureViewportBox(), window.getComputedStyle(i.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([h, m]) => {
      i.getValue(h).set(m);
    }), this.resolveNoneKeyframes();
  }
}
const Up = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Hp(n, i, o) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let r = document;
    i && (r = i.current);
    const l = o?.[n] ?? r.querySelectorAll(n);
    return l ? Array.from(l) : [];
  }
  return Array.from(n).filter((r) => r != null);
}
const Ym = (n, i) => i && typeof n == "number" ? i.transform(n) : n;
function mc(n) {
  return Ux(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Ip } = /* @__PURE__ */ tT(queueMicrotask, !1), Qn = {
  x: !1,
  y: !1
};
function zT() {
  return Qn.x || Qn.y;
}
function ZO(n) {
  return n === "x" || n === "y" ? Qn[n] ? null : (Qn[n] = !0, () => {
    Qn[n] = !1;
  }) : Qn.x || Qn.y ? null : (Qn.x = Qn.y = !0, () => {
    Qn.x = Qn.y = !1;
  });
}
function LT(n, i) {
  const o = Hp(n), r = new AbortController(), l = {
    passive: !0,
    ...i,
    signal: r.signal
  };
  return [o, l, () => r.abort()];
}
function QO(n) {
  return !(n.pointerType === "touch" || zT());
}
function JO(n, i, o = {}) {
  const [r, l, f] = LT(n, o);
  return r.forEach((d) => {
    let h = !1, m = !1, g;
    const y = () => {
      d.removeEventListener("pointerleave", E);
    }, p = (_) => {
      g && (g(_), g = void 0), y();
    }, S = (_) => {
      h = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), m && (m = !1, p(_));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", S, l), window.addEventListener("pointercancel", S, l);
    }, E = (_) => {
      if (_.pointerType !== "touch") {
        if (h) {
          m = !0;
          return;
        }
        p(_);
      }
    }, w = (_) => {
      if (!QO(_))
        return;
      m = !1;
      const R = i(d, _);
      typeof R == "function" && (g = R, d.addEventListener("pointerleave", E, l));
    };
    d.addEventListener("pointerenter", w, l), d.addEventListener("pointerdown", T, l);
  }), f;
}
const VT = (n, i) => i ? n === i ? !0 : VT(n, i.parentElement) : !1, qp = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, WO = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function tD(n) {
  return WO.has(n.tagName) || n.isContentEditable === !0;
}
const eD = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function nD(n) {
  return eD.has(n.tagName) || n.isContentEditable === !0;
}
const pc = /* @__PURE__ */ new WeakSet();
function B1(n) {
  return (i) => {
    i.key === "Enter" && n(i);
  };
}
function Wh(n, i) {
  n.dispatchEvent(new PointerEvent("pointer" + i, { isPrimary: !0, bubbles: !0 }));
}
const iD = (n, i) => {
  const o = n.currentTarget;
  if (!o)
    return;
  const r = B1(() => {
    if (pc.has(o))
      return;
    Wh(o, "down");
    const l = B1(() => {
      Wh(o, "up");
    }), f = () => Wh(o, "cancel");
    o.addEventListener("keyup", l, i), o.addEventListener("blur", f, i);
  });
  o.addEventListener("keydown", r, i), o.addEventListener("blur", () => o.removeEventListener("keydown", r), i);
};
function P1(n) {
  return qp(n) && !zT();
}
const U1 = /* @__PURE__ */ new WeakSet();
function aD(n, i, o = {}) {
  const [r, l, f] = LT(n, o), d = (h) => {
    const m = h.currentTarget;
    if (!P1(h) || U1.has(h))
      return;
    pc.add(m), o.stopPropagation && U1.add(h);
    const g = i(m, h), y = { ...l, capture: !0 }, p = (E, w) => {
      window.removeEventListener("pointerup", S, y), window.removeEventListener("pointercancel", T, y), pc.has(m) && pc.delete(m), P1(E) && typeof g == "function" && g(E, { success: w });
    }, S = (E) => {
      p(E, m === window || m === document || o.useGlobalTarget || VT(m, E.target));
    }, T = (E) => {
      p(E, !1);
    };
    window.addEventListener("pointerup", S, y), window.addEventListener("pointercancel", T, y);
  };
  return r.forEach((h) => {
    (o.useGlobalTarget ? window : h).addEventListener("pointerdown", d, l), mc(h) && (h.addEventListener("focus", (g) => iD(g, l)), !tD(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), f;
}
function kc(n) {
  return Ux(n) && "ownerSVGElement" in n;
}
const gc = /* @__PURE__ */ new WeakMap();
let yc;
const BT = (n, i, o) => (r, l) => l && l[0] ? l[0][n + "Size"] : kc(r) && "getBBox" in r ? r.getBBox()[i] : r[o], oD = /* @__PURE__ */ BT("inline", "width", "offsetWidth"), sD = /* @__PURE__ */ BT("block", "height", "offsetHeight");
function rD({ target: n, borderBoxSize: i }) {
  gc.get(n)?.forEach((o) => {
    o(n, {
      get width() {
        return oD(n, i);
      },
      get height() {
        return sD(n, i);
      }
    });
  });
}
function lD(n) {
  n.forEach(rD);
}
function uD() {
  typeof ResizeObserver > "u" || (yc = new ResizeObserver(lD));
}
function cD(n, i) {
  yc || uD();
  const o = Hp(n);
  return o.forEach((r) => {
    let l = gc.get(r);
    l || (l = /* @__PURE__ */ new Set(), gc.set(r, l)), l.add(i), yc?.observe(r);
  }), () => {
    o.forEach((r) => {
      const l = gc.get(r);
      l?.delete(i), l?.size || yc?.unobserve(r);
    });
  };
}
const vc = /* @__PURE__ */ new Set();
let js;
function fD() {
  js = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    vc.forEach((i) => i(n));
  }, window.addEventListener("resize", js);
}
function dD(n) {
  return vc.add(n), js || fD(), () => {
    vc.delete(n), !vc.size && typeof js == "function" && (window.removeEventListener("resize", js), js = void 0);
  };
}
function H1(n, i) {
  return typeof n == "function" ? dD(n) : cD(n, i);
}
function PT(n) {
  return kc(n) && n.tagName === "svg";
}
function hD(...n) {
  const i = !Array.isArray(n[0]), o = i ? 0 : -1, r = n[0 + o], l = n[1 + o], f = n[2 + o], d = n[3 + o], h = dT(l, f, d);
  return i ? h(r) : h;
}
function mD(n, i, o = {}) {
  const r = n.get();
  let l = null, f = r, d;
  const h = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0, m = () => {
    l && (l.stop(), l = null), n.animation = void 0;
  }, g = () => {
    const p = I1(n.get()), S = I1(f);
    if (p === S) {
      m();
      return;
    }
    const T = l ? l.getGeneratorVelocity() : n.getVelocity();
    m(), l = new sl({
      keyframes: [p, S],
      velocity: T,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...o,
      onUpdate: d
    });
  }, y = () => {
    g(), n.animation = l ?? void 0, n.events.animationStart?.notify(), l?.then(() => {
      n.animation = void 0, n.events.animationComplete?.notify();
    });
  };
  if (n.attach((p, S) => {
    f = p, d = (T) => S(tm(T, h)), Ft.postRender(y);
  }, m), le(i)) {
    let p = o.skipInitialAnimation === !0;
    const S = i.on("change", (E) => {
      p ? (p = !1, n.jump(tm(E, h), !1)) : n.set(tm(E, h));
    }), T = n.on("destroy", S);
    return () => {
      S(), T();
    };
  }
  return m;
}
function tm(n, i) {
  return i ? n + i : n;
}
function I1(n) {
  return typeof n == "number" ? n : parseFloat(n);
}
const pD = [...MT, Ee, ti], gD = (n) => pD.find(DT(n)), q1 = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), zs = () => ({
  x: q1(),
  y: q1()
}), G1 = () => ({ min: 0, max: 0 }), xe = () => ({
  x: G1(),
  y: G1()
}), rl = /* @__PURE__ */ new WeakMap();
function Fc(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function ll(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Gp = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Yp = ["initial", ...Gp];
function Xc(n) {
  return Fc(n.animate) || Yp.some((i) => ll(n[i]));
}
function UT(n) {
  return !!(Xc(n) || n.variants);
}
function yD(n, i, o) {
  for (const r in i) {
    const l = i[r], f = o[r];
    if (le(l))
      n.addValue(r, l);
    else if (le(f))
      n.addValue(r, La(l, { owner: n }));
    else if (f !== l)
      if (n.hasValue(r)) {
        const d = n.getValue(r);
        d.liveStyle === !0 ? d.jump(l) : d.hasAnimated || d.set(l);
      } else {
        const d = n.getStaticValue(r);
        n.addValue(r, La(d !== void 0 ? d : l, { owner: n }));
      }
  }
  for (const r in o)
    i[r] === void 0 && n.removeValue(r);
  return i;
}
const Nc = { current: null }, kp = { current: !1 }, vD = typeof window < "u";
function HT() {
  if (kp.current = !0, !!vD)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), i = () => Nc.current = n.matches;
      n.addEventListener("change", i), i();
    } else
      Nc.current = !1;
}
const Y1 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let jc = {};
function IT(n) {
  jc = n;
}
function bD() {
  return jc;
}
class qT {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(i, o, r) {
    return {};
  }
  constructor({ parent: i, props: o, presenceContext: r, reducedMotionConfig: l, skipAnimations: f, blockInitialAnimation: d, visualState: h }, m = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Mp, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = tn.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Ft.render(this.render, !1, !0));
    };
    const { latestValues: g, renderState: y } = h;
    this.latestValues = g, this.baseTarget = { ...g }, this.initialValues = o.initial ? { ...g } : {}, this.renderState = y, this.parent = i, this.props = o, this.presenceContext = r, this.depth = i ? i.depth + 1 : 0, this.reducedMotionConfig = l, this.skipAnimationsConfig = f, this.options = m, this.blockInitialAnimation = !!d, this.isControllingVariants = Xc(o), this.isVariantNode = UT(o), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(i && i.current);
    const { willChange: p, ...S } = this.scrapeMotionValuesFromProps(o, {}, this);
    for (const T in S) {
      const E = S[T];
      g[T] !== void 0 && le(E) && E.set(g[T]);
    }
  }
  mount(i) {
    if (this.hasBeenMounted)
      for (const o in this.initialValues)
        this.values.get(o)?.jump(this.initialValues[o]), this.latestValues[o] = this.initialValues[o];
    this.current = i, rl.set(i, this), this.projection && !this.projection.instance && this.projection.mount(i), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((o, r) => this.bindToMotionValue(r, o)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (kp.current || HT(), this.shouldReduceMotion = Nc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Zi(this.notifyUpdate), Zi(this.render), this.valueSubscriptions.forEach((i) => i()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const i in this.events)
      this.events[i].clear();
    for (const i in this.features) {
      const o = this.features[i];
      o && (o.unmount(), o.isMounted = !1);
    }
    this.current = null;
  }
  addChild(i) {
    this.children.add(i), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(i);
  }
  removeChild(i) {
    this.children.delete(i), this.enteringChildren && this.enteringChildren.delete(i);
  }
  bindToMotionValue(i, o) {
    if (this.valueSubscriptions.has(i) && this.valueSubscriptions.get(i)(), o.accelerate && CT.has(i) && this.current instanceof HTMLElement) {
      const { factory: d, keyframes: h, times: m, ease: g, duration: y } = o.accelerate, p = new TT({
        element: this.current,
        name: i,
        keyframes: h,
        times: m,
        ease: g,
        duration: /* @__PURE__ */ un(y)
      }), S = d(p);
      this.valueSubscriptions.set(i, () => {
        S(), p.cancel();
      });
      return;
    }
    const r = ks.has(i);
    r && this.onBindTransform && this.onBindTransform();
    const l = o.on("change", (d) => {
      this.latestValues[i] = d, this.props.onUpdate && Ft.preRender(this.notifyUpdate), r && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let f;
    typeof window < "u" && window.MotionCheckAppearSync && (f = window.MotionCheckAppearSync(this, i, o)), this.valueSubscriptions.set(i, () => {
      l(), f && f();
    });
  }
  sortNodePosition(i) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== i.type ? 0 : this.sortInstanceNodePosition(this.current, i.current);
  }
  updateFeatures() {
    let i = "animation";
    for (i in jc) {
      const o = jc[i];
      if (!o)
        continue;
      const { isEnabled: r, Feature: l } = o;
      if (!this.features[i] && l && r(this.props) && (this.features[i] = new l(this)), this.features[i]) {
        const f = this.features[i];
        f.isMounted ? f.update() : (f.mount(), f.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : xe();
  }
  getStaticValue(i) {
    return this.latestValues[i];
  }
  setStaticValue(i, o) {
    this.latestValues[i] = o;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(i, o) {
    (i.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = i, this.prevPresenceContext = this.presenceContext, this.presenceContext = o;
    for (let r = 0; r < Y1.length; r++) {
      const l = Y1[r];
      this.propEventSubscriptions[l] && (this.propEventSubscriptions[l](), delete this.propEventSubscriptions[l]);
      const f = "on" + l, d = i[f];
      d && (this.propEventSubscriptions[l] = this.on(l, d));
    }
    this.prevMotionValues = yD(this, this.scrapeMotionValuesFromProps(i, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(i) {
    return this.props.variants ? this.props.variants[i] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(i) {
    const o = this.getClosestVariantNode();
    if (o)
      return o.variantChildren && o.variantChildren.add(i), () => o.variantChildren.delete(i);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(i, o) {
    const r = this.values.get(i);
    o !== r && (r && this.removeValue(i), this.bindToMotionValue(i, o), this.values.set(i, o), this.latestValues[i] = o.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(i) {
    this.values.delete(i);
    const o = this.valueSubscriptions.get(i);
    o && (o(), this.valueSubscriptions.delete(i)), delete this.latestValues[i], this.removeValueFromRenderState(i, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(i) {
    return this.values.has(i);
  }
  getValue(i, o) {
    if (this.props.values && this.props.values[i])
      return this.props.values[i];
    let r = this.values.get(i);
    return r === void 0 && o !== void 0 && (r = La(o === null ? void 0 : o, { owner: this }), this.addValue(i, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(i, o) {
    let r = this.latestValues[i] !== void 0 || !this.current ? this.latestValues[i] : this.getBaseTargetFromProps(this.props, i) ?? this.readValueFromInstance(this.current, i, this.options);
    return r != null && (typeof r == "string" && (Px(r) || Hx(r)) ? r = parseFloat(r) : !gD(r) && ti.test(o) && (r = jT(i, o)), this.setBaseTarget(i, le(r) ? r.get() : r)), le(r) ? r.get() : r;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(i, o) {
    this.baseTarget[i] = o;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(i) {
    const { initial: o } = this.props;
    let r;
    if (typeof o == "string" || typeof o == "object") {
      const f = Vp(this.props, o, this.presenceContext?.custom);
      f && (r = f[i]);
    }
    if (o && r !== void 0)
      return r;
    const l = this.getBaseTargetFromProps(this.props, i);
    return l !== void 0 && !le(l) ? l : this.initialValues[i] !== void 0 && r === void 0 ? void 0 : this.baseTarget[i];
  }
  on(i, o) {
    return this.events[i] || (this.events[i] = new xp()), this.events[i].add(o);
  }
  notify(i, ...o) {
    this.events[i] && this.events[i].notify(...o);
  }
  scheduleRenderMicrotask() {
    Ip.render(this.render);
  }
}
class GT extends qT {
  constructor() {
    super(...arguments), this.KeyframeResolver = KO;
  }
  sortInstanceNodePosition(i, o) {
    return i.compareDocumentPosition(o) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(i, o) {
    const r = i.style;
    return r ? r[o] : void 0;
  }
  removeValueFromRenderState(i, { vars: o, style: r }) {
    delete o[i], delete r[i];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: i } = this.props;
    le(i) && (this.childSubscription = i.on("change", (o) => {
      this.current && (this.current.textContent = `${o}`);
    }));
  }
}
class Ua {
  constructor(i) {
    this.isMounted = !1, this.node = i;
  }
  update() {
  }
}
function YT({ top: n, left: i, right: o, bottom: r }) {
  return {
    x: { min: i, max: o },
    y: { min: n, max: r }
  };
}
function SD({ x: n, y: i }) {
  return { top: i.min, right: n.max, bottom: i.max, left: n.min };
}
function xD(n, i) {
  if (!i)
    return n;
  const o = i({ x: n.left, y: n.top }), r = i({ x: n.right, y: n.bottom });
  return {
    top: o.y,
    left: o.x,
    bottom: r.y,
    right: r.x
  };
}
function em(n) {
  return n === void 0 || n === 1;
}
function km({ scale: n, scaleX: i, scaleY: o }) {
  return !em(n) || !em(i) || !em(o);
}
function bo(n) {
  return km(n) || kT(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function kT(n) {
  return k1(n.x) || k1(n.y);
}
function k1(n) {
  return n && n !== "0%";
}
function zc(n, i, o) {
  const r = n - o, l = i * r;
  return o + l;
}
function F1(n, i, o, r, l) {
  return l !== void 0 && (n = zc(n, l, r)), zc(n, o, r) + i;
}
function Fm(n, i = 0, o = 1, r, l) {
  n.min = F1(n.min, i, o, r, l), n.max = F1(n.max, i, o, r, l);
}
function FT(n, { x: i, y: o }) {
  Fm(n.x, i.translate, i.scale, i.originPoint), Fm(n.y, o.translate, o.scale, o.originPoint);
}
const X1 = 0.999999999999, $1 = 1.0000000000001;
function TD(n, i, o, r = !1) {
  const l = o.length;
  if (!l)
    return;
  i.x = i.y = 1;
  let f, d;
  for (let h = 0; h < l; h++) {
    f = o[h], d = f.projectionDelta;
    const { visualElement: m } = f.options;
    m && m.props.style && m.props.style.display === "contents" || (r && f.options.layoutScroll && f.scroll && f !== f.root && (Si(n.x, -f.scroll.offset.x), Si(n.y, -f.scroll.offset.y)), d && (i.x *= d.x.scale, i.y *= d.y.scale, FT(n, d)), r && bo(f.latestValues) && bc(n, f.latestValues, f.layout?.layoutBox));
  }
  i.x < $1 && i.x > X1 && (i.x = 1), i.y < $1 && i.y > X1 && (i.y = 1);
}
function Si(n, i) {
  n.min += i, n.max += i;
}
function K1(n, i, o, r, l = 0.5) {
  const f = Qt(n.min, n.max, l);
  Fm(n, i, o, f, r);
}
function Z1(n, i) {
  return typeof n == "string" ? parseFloat(n) / 100 * (i.max - i.min) : n;
}
function bc(n, i, o) {
  const r = o ?? n;
  K1(n.x, Z1(i.x, r.x), i.scaleX, i.scale, i.originX), K1(n.y, Z1(i.y, r.y), i.scaleY, i.scale, i.originY);
}
function XT(n, i) {
  return YT(xD(n.getBoundingClientRect(), i));
}
function ED(n, i, o) {
  const r = XT(n, o), { scroll: l } = i;
  return l && (Si(r.x, l.offset.x), Si(r.y, l.offset.y)), r;
}
const CD = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, wD = Ys.length;
function _D(n, i, o) {
  let r = "", l = !0;
  for (let d = 0; d < wD; d++) {
    const h = Ys[d], m = n[h];
    if (m === void 0)
      continue;
    let g = !0;
    if (typeof m == "number")
      g = m === (h.startsWith("scale") ? 1 : 0);
    else {
      const y = parseFloat(m);
      g = h.startsWith("scale") ? y === 1 : y === 0;
    }
    if (!g || o) {
      const y = Ym(m, Mc[h]);
      if (!g) {
        l = !1;
        const p = CD[h] || h;
        r += `${p}(${y}) `;
      }
      o && (i[h] = y);
    }
  }
  const f = n.pathRotation;
  return f && (l = !1, r += `rotate(${Ym(f, Mc.pathRotation)}) `), r = r.trim(), o ? r = o(i, l ? "" : r) : l && (r = "none"), r;
}
function Fp(n, i, o) {
  const { style: r, vars: l, transformOrigin: f } = n;
  let d = !1, h = !1;
  for (const m in i) {
    const g = i[m];
    if (ks.has(m)) {
      d = !0;
      continue;
    } else if (nT(m)) {
      l[m] = g;
      continue;
    } else {
      const y = Ym(g, Mc[m]);
      m.startsWith("origin") ? (h = !0, f[m] = y) : r[m] = y;
    }
  }
  if (i.transform || (d || o ? r.transform = _D(i, n.transform, o) : r.transform && (r.transform = "none")), h) {
    const { originX: m = "50%", originY: g = "50%", originZ: y = 0 } = f;
    r.transformOrigin = `${m} ${g} ${y}`;
  }
}
function $T(n, { style: i, vars: o }, r, l) {
  const f = n.style;
  let d;
  for (d in i)
    f[d] = i[d];
  l?.applyProjectionStyles(f, r);
  for (d in o)
    f.setProperty(d, o[d]);
}
function Q1(n, i) {
  return i.max === i.min ? 0 : n / (i.max - i.min) * 100;
}
const Kr = {
  correct: (n, i) => {
    if (!i.target)
      return n;
    if (typeof n == "string")
      if (pt.test(n))
        n = parseFloat(n);
      else
        return n;
    const o = Q1(n, i.target.x), r = Q1(n, i.target.y);
    return `${o}% ${r}%`;
  }
}, AD = {
  correct: (n, { treeScale: i, projectionDelta: o }) => {
    const r = n, l = ti.parse(n);
    if (l.length > 5)
      return r;
    const f = ti.createTransformer(n), d = typeof l[0] != "number" ? 1 : 0, h = o.x.scale * i.x, m = o.y.scale * i.y;
    l[0 + d] /= h, l[1 + d] /= m;
    const g = Qt(h, m, 0.5);
    return typeof l[2 + d] == "number" && (l[2 + d] /= g), typeof l[3 + d] == "number" && (l[3 + d] /= g), f(l);
  }
}, Xm = {
  borderRadius: {
    ...Kr,
    applyTo: [...Up]
  },
  borderTopLeftRadius: Kr,
  borderTopRightRadius: Kr,
  borderBottomLeftRadius: Kr,
  borderBottomRightRadius: Kr,
  boxShadow: AD
};
function KT(n, { layout: i, layoutId: o }) {
  return ks.has(n) || n.startsWith("origin") || (i || o !== void 0) && (!!Xm[n] || n === "opacity");
}
function Xp(n, i, o) {
  const r = n.style, l = i?.style, f = {};
  if (!r)
    return f;
  for (const d in r)
    (le(r[d]) || l && le(l[d]) || KT(d, n) || o?.getValue(d)?.liveStyle !== void 0) && (f[d] = r[d]);
  return f;
}
function RD(n) {
  return window.getComputedStyle(n);
}
class ZT extends GT {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = $T;
  }
  mount(i) {
    Gc(!!i.style), super.mount(i);
  }
  readValueFromInstance(i, o) {
    if (ks.has(o))
      return this.projection?.isProjecting ? jm(o) : K2(i, o);
    {
      const r = RD(i), l = (nT(o) ? r.getPropertyValue(o) : r[o]) || 0;
      return typeof l == "string" ? l.trim() : l;
    }
  }
  measureInstanceViewportBox(i, { transformPagePoint: o }) {
    return XT(i, o);
  }
  build(i, o, r) {
    Fp(i, o, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(i, o, r) {
    return Xp(i, o, r);
  }
}
function OD(n, i) {
  return n in i;
}
class DD extends qT {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(i, o) {
    if (OD(o, i)) {
      const r = i[o];
      if (typeof r == "string" || typeof r == "number")
        return r;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(i, o) {
    delete o.output[i];
  }
  measureInstanceViewportBox() {
    return xe();
  }
  build(i, o) {
    Object.assign(i.output, o);
  }
  renderInstance(i, { output: o }) {
    Object.assign(i, o);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const MD = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, ND = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function jD(n, i, o = 1, r = 0, l = !0) {
  n.pathLength = 1;
  const f = l ? MD : ND;
  n[f.offset] = `${-r}`, n[f.array] = `${i} ${o}`;
}
const zD = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function QT(n, {
  attrX: i,
  attrY: o,
  attrScale: r,
  pathLength: l,
  pathSpacing: f = 1,
  pathOffset: d = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, m, g, y) {
  if (Fp(n, h, g), m) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: p, style: S } = n;
  p.transform && (S.transform = p.transform, delete p.transform), (S.transform || p.transformOrigin) && (S.transformOrigin = p.transformOrigin ?? "50% 50%", delete p.transformOrigin), S.transform && (S.transformBox = y?.transformBox ?? "fill-box", delete p.transformBox);
  for (const T of zD)
    p[T] !== void 0 && (S[T] = p[T], delete p[T]);
  i !== void 0 && (p.x = i), o !== void 0 && (p.y = o), r !== void 0 && (p.scale = r), l !== void 0 && jD(p, l, f, d, !1);
}
const JT = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), WT = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function LD(n, i, o, r) {
  $T(n, i, void 0, r);
  for (const l in i.attrs)
    n.setAttribute(JT.has(l) ? l : Bp(l), i.attrs[l]);
}
function tE(n, i, o) {
  const r = Xp(n, i, o);
  for (const l in n)
    if (le(n[l]) || le(i[l])) {
      const f = Ys.indexOf(l) !== -1 ? "attr" + l.charAt(0).toUpperCase() + l.substring(1) : l;
      r[f] = n[l];
    }
  return r;
}
class eE extends GT {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = xe;
  }
  getBaseTargetFromProps(i, o) {
    return i[o];
  }
  readValueFromInstance(i, o) {
    if (ks.has(o)) {
      const r = NT(o);
      return r && r.default || 0;
    }
    return o = JT.has(o) ? o : Bp(o), i.getAttribute(o);
  }
  scrapeMotionValuesFromProps(i, o, r) {
    return tE(i, o, r);
  }
  build(i, o, r) {
    QT(i, o, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(i, o, r, l) {
    LD(i, o, r, l);
  }
  mount(i) {
    this.isSVGTag = WT(i.tagName), super.mount(i);
  }
}
const VD = Yp.length;
function nE(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const o = n.parent ? nE(n.parent) || {} : {};
    return n.props.initial !== void 0 && (o.initial = n.props.initial), o;
  }
  const i = {};
  for (let o = 0; o < VD; o++) {
    const r = Yp[o], l = n.props[r];
    (ll(l) || l === !1) && (i[r] = l);
  }
  return i;
}
function iE(n, i) {
  if (!Array.isArray(i))
    return !1;
  const o = i.length;
  if (o !== n.length)
    return !1;
  for (let r = 0; r < o; r++)
    if (i[r] !== n[r])
      return !1;
  return !0;
}
const BD = [...Gp].reverse(), PD = Gp.length;
function UD(n) {
  return (i) => Promise.all(i.map(({ animation: o, options: r }) => PO(n, o, r)));
}
function HD(n) {
  let i = UD(n), o = J1(), r = !0, l = !1;
  const f = (g) => (y, p) => {
    const S = wo(n, p, g === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: T, transitionEnd: E, ...w } = S;
      y = { ...y, ...w, ...E };
    }
    return y;
  };
  function d(g) {
    i = g(n);
  }
  function h(g) {
    const { props: y } = n, p = nE(n.parent) || {}, S = [], T = /* @__PURE__ */ new Set();
    let E = {}, w = 1 / 0;
    for (let R = 0; R < PD; R++) {
      const O = BD[R], A = o[O], D = y[O] !== void 0 ? y[O] : p[O], U = ll(D), z = O === g ? A.isActive : null;
      z === !1 && (w = R);
      let V = D === p[O] && D !== y[O] && U;
      if (V && (r || l) && n.manuallyAnimateOnMount && (V = !1), A.protectedKeys = { ...E }, // If it isn't active and hasn't *just* been set as inactive
      !A.isActive && z === null || // If we didn't and don't have any defined prop for this animation type
      !D && !A.prevProp || // Or if the prop doesn't define an animation
      Fc(D) || typeof D == "boolean")
        continue;
      if (O === "exit" && A.isActive && z !== !0) {
        A.prevResolvedValues && (E = {
          ...E,
          ...A.prevResolvedValues
        });
        continue;
      }
      const I = ID(A.prevProp, D);
      let F = I || // If we're making this variant active, we want to always make it active
      O === g && A.isActive && !V && U || // If we removed a higher-priority variant (i is in reverse order)
      R > w && U, Z = !1;
      const W = Array.isArray(D) ? D : [D];
      let et = W.reduce(f(O), {});
      z === !1 && (et = {});
      const { prevResolvedValues: st = {} } = A, ft = {
        ...st,
        ...et
      }, ht = (Y) => {
        F = !0, T.has(Y) && (Z = !0, T.delete(Y)), A.needsAnimating[Y] = !0;
        const tt = n.getValue(Y);
        tt && (tt.liveStyle = !1);
      };
      for (const Y in ft) {
        const tt = et[Y], lt = st[Y];
        if (E.hasOwnProperty(Y))
          continue;
        let Dt = !1;
        Um(tt) && Um(lt) ? Dt = !iE(tt, lt) || I : Dt = tt !== lt, Dt ? tt != null ? ht(Y) : T.add(Y) : tt !== void 0 && T.has(Y) ? ht(Y) : A.protectedKeys[Y] = !0;
      }
      A.prevProp = D, A.prevResolvedValues = et, A.isActive && (E = { ...E, ...et }), (r || l) && n.blockInitialAnimation && (F = !1);
      const q = V && I;
      F && (!q || Z) && S.push(...W.map((Y) => {
        const tt = { type: O };
        if (typeof Y == "string" && (r || l) && !q && n.manuallyAnimateOnMount && n.parent) {
          const { parent: lt } = n, Dt = wo(lt, Y);
          if (lt.enteringChildren && Dt) {
            const { delayChildren: Mt } = Dt.transition || {};
            tt.delay = wT(lt.enteringChildren, n, Mt);
          }
        }
        return {
          animation: Y,
          options: tt
        };
      }));
    }
    if (T.size) {
      const R = {};
      if (typeof y.initial != "boolean") {
        const O = wo(n, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        O && O.transition && (R.transition = O.transition);
      }
      T.forEach((O) => {
        const A = n.getBaseTarget(O), D = n.getValue(O);
        D && (D.liveStyle = !0), R[O] = A ?? null;
      }), S.push({ animation: R });
    }
    let _ = !!S.length;
    return r && (y.initial === !1 || y.initial === y.animate) && !n.manuallyAnimateOnMount && (_ = !1), r = !1, l = !1, _ ? i(S) : Promise.resolve();
  }
  function m(g, y) {
    if (o[g].isActive === y)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(g, y)), o[g].isActive = y;
    const p = h(g);
    for (const S in o)
      o[S].protectedKeys = {};
    return p;
  }
  return {
    animateChanges: h,
    setActive: m,
    setAnimateFunction: d,
    getState: () => o,
    reset: () => {
      o = J1(), l = !0;
    }
  };
}
function ID(n, i) {
  return typeof i == "string" ? i !== n : Array.isArray(i) ? !iE(i, n) : !1;
}
function yo(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function J1() {
  return {
    animate: yo(!0),
    whileInView: yo(),
    whileHover: yo(),
    whileTap: yo(),
    whileDrag: yo(),
    whileFocus: yo(),
    exit: yo()
  };
}
function $m(n, i) {
  n.min = i.min, n.max = i.max;
}
function Kn(n, i) {
  $m(n.x, i.x), $m(n.y, i.y);
}
function W1(n, i) {
  n.translate = i.translate, n.scale = i.scale, n.originPoint = i.originPoint, n.origin = i.origin;
}
const aE = 1e-4, qD = 1 - aE, GD = 1 + aE, oE = 0.01, YD = 0 - oE, kD = 0 + oE;
function en(n) {
  return n.max - n.min;
}
function FD(n, i, o) {
  return Math.abs(n - i) <= o;
}
function tS(n, i, o, r = 0.5) {
  n.origin = r, n.originPoint = Qt(i.min, i.max, n.origin), n.scale = en(o) / en(i), n.translate = Qt(o.min, o.max, n.origin) - n.originPoint, (n.scale >= qD && n.scale <= GD || isNaN(n.scale)) && (n.scale = 1), (n.translate >= YD && n.translate <= kD || isNaN(n.translate)) && (n.translate = 0);
}
function el(n, i, o, r) {
  tS(n.x, i.x, o.x, r ? r.originX : void 0), tS(n.y, i.y, o.y, r ? r.originY : void 0);
}
function eS(n, i, o, r = 0) {
  const l = r ? Qt(o.min, o.max, r) : o.min;
  n.min = l + i.min, n.max = n.min + en(i);
}
function XD(n, i, o, r) {
  eS(n.x, i.x, o.x, r?.x), eS(n.y, i.y, o.y, r?.y);
}
function nS(n, i, o, r = 0) {
  const l = r ? Qt(o.min, o.max, r) : o.min;
  n.min = i.min - l, n.max = n.min + en(i);
}
function Lc(n, i, o, r) {
  nS(n.x, i.x, o.x, r?.x), nS(n.y, i.y, o.y, r?.y);
}
function iS(n, i, o, r, l) {
  return n -= i, n = zc(n, 1 / o, r), l !== void 0 && (n = zc(n, 1 / l, r)), n;
}
function $D(n, i = 0, o = 1, r = 0.5, l, f = n, d = n) {
  if (Ei.test(i) && (i = parseFloat(i), i = Qt(d.min, d.max, i / 100) - d.min), typeof i != "number")
    return;
  let h = Qt(f.min, f.max, r);
  n === f && (h -= i), n.min = iS(n.min, i, o, h, l), n.max = iS(n.max, i, o, h, l);
}
function aS(n, i, [o, r, l], f, d) {
  $D(n, i[o], i[r], i[l], i.scale, f, d);
}
const KD = ["x", "scaleX", "originX"], ZD = ["y", "scaleY", "originY"];
function oS(n, i, o, r) {
  aS(n.x, i, KD, o ? o.x : void 0, r ? r.x : void 0), aS(n.y, i, ZD, o ? o.y : void 0, r ? r.y : void 0);
}
function sS(n) {
  return n.translate === 0 && n.scale === 1;
}
function sE(n) {
  return sS(n.x) && sS(n.y);
}
function rS(n, i) {
  return n.min === i.min && n.max === i.max;
}
function QD(n, i) {
  return rS(n.x, i.x) && rS(n.y, i.y);
}
function lS(n, i) {
  return Math.round(n.min) === Math.round(i.min) && Math.round(n.max) === Math.round(i.max);
}
function rE(n, i) {
  return lS(n.x, i.x) && lS(n.y, i.y);
}
function uS(n) {
  return en(n.x) / en(n.y);
}
function cS(n, i) {
  return n.translate === i.translate && n.scale === i.scale && n.originPoint === i.originPoint;
}
function bi(n) {
  return [n("x"), n("y")];
}
function JD(n, i, o) {
  let r = "";
  const l = n.x.translate / i.x, f = n.y.translate / i.y, d = o?.z || 0;
  if ((l || f || d) && (r = `translate3d(${l}px, ${f}px, ${d}px) `), (i.x !== 1 || i.y !== 1) && (r += `scale(${1 / i.x}, ${1 / i.y}) `), o) {
    const { transformPerspective: g, rotate: y, pathRotation: p, rotateX: S, rotateY: T, skewX: E, skewY: w } = o;
    g && (r = `perspective(${g}px) ${r}`), y && (r += `rotate(${y}deg) `), p && (r += `rotate(${p}deg) `), S && (r += `rotateX(${S}deg) `), T && (r += `rotateY(${T}deg) `), E && (r += `skewX(${E}deg) `), w && (r += `skewY(${w}deg) `);
  }
  const h = n.x.scale * i.x, m = n.y.scale * i.y;
  return (h !== 1 || m !== 1) && (r += `scale(${h}, ${m})`), r || "none";
}
const WD = Up.length, fS = (n) => typeof n == "string" ? parseFloat(n) : n, dS = (n) => typeof n == "number" || pt.test(n);
function tM(n, i, o, r, l, f) {
  l ? (n.opacity = Qt(0, o.opacity ?? 1, eM(r)), n.opacityExit = Qt(i.opacity ?? 1, 0, nM(r))) : f && (n.opacity = Qt(i.opacity ?? 1, o.opacity ?? 1, r));
  for (let d = 0; d < WD; d++) {
    const h = Up[d];
    let m = hS(i, h), g = hS(o, h);
    if (m === void 0 && g === void 0)
      continue;
    m || (m = 0), g || (g = 0), m === 0 || g === 0 || dS(m) === dS(g) ? (n[h] = Math.max(Qt(fS(m), fS(g), r), 0), (Ei.test(g) || Ei.test(m)) && (n[h] += "%")) : n[h] = g;
  }
  (i.rotate || o.rotate) && (n.rotate = Qt(i.rotate || 0, o.rotate || 0, r));
}
function hS(n, i) {
  return n[i] !== void 0 ? n[i] : n.borderRadius;
}
const eM = /* @__PURE__ */ lE(0, 0.5, $x), nM = /* @__PURE__ */ lE(0.5, 0.95, Hn);
function lE(n, i, o) {
  return (r) => r < n ? 0 : r > i ? 1 : o(/* @__PURE__ */ Ps(n, i, r));
}
function uE(n, i, o) {
  const r = le(n) ? n : La(n);
  return r.start(Lp("", r, i, o)), r.animation;
}
function ul(n, i, o, r = { passive: !0 }) {
  return n.addEventListener(i, o, r), () => n.removeEventListener(i, o, r);
}
const iM = (n, i) => n.depth - i.depth;
class aM {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(i) {
    Sp(this.children, i), this.isDirty = !0;
  }
  remove(i) {
    Bs(this.children, i), this.isDirty = !0;
  }
  forEach(i) {
    this.isDirty && this.children.sort(iM), this.isDirty = !1, this.children.forEach(i);
  }
}
function oM(n, i) {
  const o = tn.now(), r = ({ timestamp: l }) => {
    const f = l - o;
    f >= i && (Zi(r), n(f - i));
  };
  return Ft.setup(r, !0), () => Zi(r);
}
function Sc(n) {
  return le(n) ? n.get() : n;
}
class sM {
  constructor() {
    this.members = [];
  }
  add(i) {
    Sp(this.members, i);
    for (let o = this.members.length - 1; o >= 0; o--) {
      const r = this.members[o];
      if (r === i || r === this.lead || r === this.prevLead)
        continue;
      const l = r.instance;
      (!l || l.isConnected === !1) && !r.snapshot && (Bs(this.members, r), r.unmount());
    }
    i.scheduleRender();
  }
  remove(i) {
    if (Bs(this.members, i), i === this.prevLead && (this.prevLead = void 0), i === this.lead) {
      const o = this.members[this.members.length - 1];
      o && this.promote(o);
    }
  }
  relegate(i) {
    for (let o = this.members.indexOf(i) - 1; o >= 0; o--) {
      const r = this.members[o];
      if (r.isPresent !== !1 && r.instance?.isConnected !== !1)
        return this.promote(r), !0;
    }
    return !1;
  }
  promote(i, o) {
    const r = this.lead;
    if (i !== r && (this.prevLead = r, this.lead = i, i.show(), r)) {
      r.updateSnapshot(), i.scheduleRender();
      const { layoutDependency: l } = r.options, { layoutDependency: f } = i.options;
      (l === void 0 || l !== f) && (i.resumeFrom = r, o && (r.preserveOpacity = !0), r.snapshot && (i.snapshot = r.snapshot, i.snapshot.latestValues = r.animationValues || r.latestValues), i.root?.isUpdating && (i.isLayoutDirty = !0)), i.options.crossfade === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((i) => {
      i.options.onExitComplete?.(), i.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((i) => i.instance && i.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const xc = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, nm = ["", "X", "Y", "Z"], rM = 1e3;
let lM = 0;
function im(n, i, o, r) {
  const { latestValues: l } = i;
  l[n] && (o[n] = l[n], i.setStaticValue(n, 0), r && (r[n] = 0));
}
function cE(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: i } = n.options;
  if (!i)
    return;
  const o = OT(i);
  if (window.MotionHasOptimisedAnimation(o, "transform")) {
    const { layout: l, layoutId: f } = n.options;
    window.MotionCancelOptimisedAnimation(o, "transform", Ft, !(l || f));
  }
  const { parent: r } = n;
  r && !r.hasCheckedOptimisedAppear && cE(r);
}
function fE({ attachResizeListener: n, defaultParent: i, measureScroll: o, checkIsScrollRoot: r, resetTransform: l }) {
  return class {
    constructor(d = {}, h = i?.()) {
      this.id = lM++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(fM), this.nodes.forEach(yM), this.nodes.forEach(vM), this.nodes.forEach(dM);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let m = 0; m < this.path.length; m++)
        this.path[m].shouldResetTransform = !0;
      this.root === this && (this.nodes = new aM());
    }
    addEventListener(d, h) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new xp()), this.eventHandlers.get(d).add(h);
    }
    notifyListeners(d, ...h) {
      const m = this.eventHandlers.get(d);
      m && m.notify(...h);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    /**
     * Lifecycles
     */
    mount(d) {
      if (this.instance)
        return;
      this.isSVG = kc(d) && !PT(d), this.instance = d;
      const { layoutId: h, layout: m, visualElement: g } = this.options;
      if (g && !g.current && g.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (m || h) && (this.isLayoutDirty = !0), n) {
        let y, p = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        Ft.read(() => {
          p = window.innerWidth;
        }), n(d, () => {
          const T = window.innerWidth;
          T !== p && (p = T, this.root.updateBlockedByResize = !0, y && y(), y = oM(S, 250), xc.hasAnimatedSinceResize && (xc.hasAnimatedSinceResize = !1, this.nodes.forEach(gS)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && g && (h || m) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: p, hasRelativeLayoutChanged: S, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const E = this.options.transition || g.getDefaultTransition() || EM, { onLayoutAnimationStart: w, onLayoutAnimationComplete: _ } = g.getProps(), R = !this.targetLayout || !rE(this.targetLayout, T), O = !p && S;
        if (this.options.layoutRoot || this.resumeFrom || O || p && (R || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const A = {
            ...zp(E, "layout"),
            onPlay: w,
            onComplete: _
          };
          (g.shouldReduceMotion || this.options.layoutRoot) && (A.delay = 0, A.type = !1), this.startAnimation(A), this.setAnimationOrigin(y, O, A.path);
        } else
          p || gS(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Zi(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(bM), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && cE(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let y = 0; y < this.path.length; y++) {
        const p = this.path[y];
        p.shouldResetTransform = !0, (typeof p.latestValues.x == "string" || typeof p.latestValues.y == "string") && (p.isLayoutDirty = !0), p.updateScroll("snapshot"), p.options.layoutRoot && p.willUpdate(!1);
      }
      const { layoutId: h, layout: m } = this.options;
      if (h === void 0 && !m)
        return;
      const g = this.getTransformTemplate();
      this.prevTransformTemplateValue = g ? g(this.latestValues, "") : void 0, this.updateSnapshot(), d && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const m = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), m && this.nodes.forEach(mM), this.nodes.forEach(mS);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(pS);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(pM), this.nodes.forEach(gM), this.nodes.forEach(uM), this.nodes.forEach(cM)) : this.nodes.forEach(pS), this.clearAllSnapshots();
      const h = tn.now();
      Ye.delta = Ci(0, 1e3 / 60, h - Ye.timestamp), Ye.timestamp = h, Ye.isProcessing = !0, Xh.update.process(Ye), Xh.preRender.process(Ye), Xh.render.process(Ye), Ye.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Ip.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(hM), this.sharedNodes.forEach(SM);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Ft.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ft.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !en(this.snapshot.measuredBox.x) && !en(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let m = 0; m < this.path.length; m++)
          this.path[m].updateScroll();
      const d = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = xe()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, d ? d.layoutBox : void 0);
    }
    updateScroll(d = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === d && (h = !1), h && this.instance) {
        const m = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: m,
          offset: o(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : m
        };
      }
    }
    resetTransform() {
      if (!l)
        return;
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !sE(this.projectionDelta), m = this.getTransformTemplate(), g = m ? m(this.latestValues, "") : void 0, y = g !== this.prevTransformTemplateValue;
      d && this.instance && (h || bo(this.latestValues) || y) && (l(this.instance, g), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let m = this.removeElementScroll(h);
      return d && (m = this.removeTransform(m)), CM(m), {
        animationId: this.root.animationId,
        measuredBox: h,
        layoutBox: m,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: d } = this.options;
      if (!d)
        return xe();
      const h = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(wM))) {
        const { scroll: g } = this.root;
        g && (Si(h.x, g.offset.x), Si(h.y, g.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      const h = xe();
      if (Kn(h, d), this.scroll?.wasRoot)
        return h;
      for (let m = 0; m < this.path.length; m++) {
        const g = this.path[m], { scroll: y, options: p } = g;
        g !== this.root && y && p.layoutScroll && (y.wasRoot && Kn(h, d), Si(h.x, y.offset.x), Si(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(d, h = !1, m) {
      const g = m || xe();
      Kn(g, d);
      for (let y = 0; y < this.path.length; y++) {
        const p = this.path[y];
        !h && p.options.layoutScroll && p.scroll && p !== p.root && (Si(g.x, -p.scroll.offset.x), Si(g.y, -p.scroll.offset.y)), bo(p.latestValues) && bc(g, p.latestValues, p.layout?.layoutBox);
      }
      return bo(this.latestValues) && bc(g, this.latestValues, this.layout?.layoutBox), g;
    }
    removeTransform(d) {
      const h = xe();
      Kn(h, d);
      for (let m = 0; m < this.path.length; m++) {
        const g = this.path[m];
        if (!bo(g.latestValues))
          continue;
        let y;
        g.instance && (km(g.latestValues) && g.updateSnapshot(), y = xe(), Kn(y, g.measurePageBox())), oS(h, g.latestValues, g.snapshot?.layoutBox, y);
      }
      return bo(this.latestValues) && oS(h, this.latestValues), h;
    }
    setTargetDelta(d) {
      this.targetDelta = d, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(d) {
      this.options = {
        ...this.options,
        ...d,
        crossfade: d.crossfade !== void 0 ? d.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Ye.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const m = !!this.resumingFrom || this !== h;
      if (!(d || m && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: y, layoutId: p } = this.options;
      if (!this.layout || !(y || p))
        return;
      this.resolvedRelativeTargetAt = Ye.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = xe(), this.targetWithTransforms = xe()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), XD(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Kn(this.target, this.layout.layoutBox), FT(this.target, this.targetDelta)) : Kn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || km(this.parent.latestValues) || kT(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, m) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = xe(), this.relativeTargetOrigin = xe(), Lc(this.relativeTargetOrigin, h, m, this.options.layoutAnchor || void 0), Kn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const d = this.getLead(), h = !!this.resumingFrom || this !== d;
      let m = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (m = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (m = !1), this.resolvedRelativeTargetAt === Ye.timestamp && (m = !1), m)
        return;
      const { layout: g, layoutId: y } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(g || y))
        return;
      Kn(this.layoutCorrected, this.layout.layoutBox);
      const p = this.treeScale.x, S = this.treeScale.y;
      TD(this.layoutCorrected, this.treeScale, this.path, h), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = xe());
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (W1(this.prevProjectionDelta.x, this.projectionDelta.x), W1(this.prevProjectionDelta.y, this.projectionDelta.y)), el(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== p || this.treeScale.y !== S || !cS(this.projectionDelta.x, this.prevProjectionDelta.x) || !cS(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      if (this.options.visualElement?.scheduleRender(), d) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = zs(), this.projectionDelta = zs(), this.projectionDeltaWithTransform = zs();
    }
    setAnimationOrigin(d, h = !1, m) {
      const g = this.snapshot, y = g ? g.latestValues : {}, p = { ...this.latestValues }, S = zs();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const T = xe(), E = g ? g.source : void 0, w = this.layout ? this.layout.source : void 0, _ = E !== w, R = this.getStack(), O = !R || R.members.length <= 1, A = !!(_ && !O && this.options.crossfade === !0 && !this.path.some(TM));
      this.animationProgress = 0;
      let D;
      const U = m?.interpolateProjection(d);
      this.mixTargetDelta = (z) => {
        const V = z / 1e3, I = U?.(V);
        I ? (S.x.translate = I.x, S.x.scale = Qt(d.x.scale, 1, V), S.x.origin = d.x.origin, S.x.originPoint = d.x.originPoint, S.y.translate = I.y, S.y.scale = Qt(d.y.scale, 1, V), S.y.origin = d.y.origin, S.y.originPoint = d.y.originPoint) : (yS(S.x, d.x, V), yS(S.y, d.y, V)), this.setTargetDelta(S), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Lc(T, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), xM(this.relativeTarget, this.relativeTargetOrigin, T, V), D && QD(this.relativeTarget, D) && (this.isProjectionDirty = !1), D || (D = xe()), Kn(D, this.relativeTarget)), _ && (this.animationValues = p, tM(p, y, this.latestValues, V, A, O)), I && I.rotate !== void 0 && (this.animationValues || (this.animationValues = p), this.animationValues.pathRotation = I.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = V;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Zi(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Ft.update(() => {
        xc.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = La(0)), this.motionValue.jump(0, !1), this.currentAnimation = uE(this.motionValue, [0, 1e3], {
          ...d,
          velocity: 0,
          isSync: !0,
          onUpdate: (h) => {
            this.mixTargetDelta(h), d.onUpdate && d.onUpdate(h);
          },
          onComplete: () => {
            d.onComplete && d.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const d = this.getStack();
      d && d.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(rM), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: m, layout: g, latestValues: y } = d;
      if (!(!h || !m || !g)) {
        if (this !== d && this.layout && g && dE(this.options.animationType, this.layout.layoutBox, g.layoutBox)) {
          m = this.target || xe();
          const p = en(this.layout.layoutBox.x);
          m.x.min = d.target.x.min, m.x.max = m.x.min + p;
          const S = en(this.layout.layoutBox.y);
          m.y.min = d.target.y.min, m.y.max = m.y.min + S;
        }
        Kn(h, m), bc(h, y), el(this.projectionDeltaWithTransform, this.layoutCorrected, h, y);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new sM()), this.sharedNodes.get(d).add(h);
      const g = h.options.initialPromotionConfig;
      h.promote({
        transition: g ? g.transition : void 0,
        preserveFollowOpacity: g && g.shouldPreserveFollowOpacity ? g.shouldPreserveFollowOpacity(h) : void 0
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d)
        return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: h, preserveFollowOpacity: m } = {}) {
      const g = this.getStack();
      g && g.promote(this, m), d && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d)
        return;
      let h = !1;
      const { latestValues: m } = d;
      if ((m.z || m.rotate || m.rotateX || m.rotateY || m.rotateZ || m.skewX || m.skewY) && (h = !0), !h)
        return;
      const g = {};
      m.z && im("z", d, g, this.animationValues);
      for (let y = 0; y < nm.length; y++)
        im(`rotate${nm[y]}`, d, g, this.animationValues), im(`skew${nm[y]}`, d, g, this.animationValues);
      d.render();
      for (const y in g)
        d.setStaticValue(y, g[y]), this.animationValues && (this.animationValues[y] = g[y]);
      d.scheduleRender();
    }
    applyProjectionStyles(d, h) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const m = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, d.visibility = "", d.opacity = "", d.pointerEvents = Sc(h?.pointerEvents) || "", d.transform = m ? m(this.latestValues, "") : "none";
        return;
      }
      const g = this.getLead();
      if (!this.projectionDelta || !this.layout || !g.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = Sc(h?.pointerEvents) || ""), this.hasProjected && !bo(this.latestValues) && (d.transform = m ? m({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const y = g.animationValues || g.latestValues;
      this.applyTransformsToTarget();
      let p = JD(this.projectionDeltaWithTransform, this.treeScale, y);
      m && (p = m(y, p)), d.transform = p;
      const { x: S, y: T } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`, g.animationValues ? d.opacity = g === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : d.opacity = g === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const E in Xm) {
        if (y[E] === void 0)
          continue;
        const { correct: w, applyTo: _, isCSSVariable: R } = Xm[E], O = p === "none" ? y[E] : w(y[E], g);
        if (_) {
          const A = _.length;
          for (let D = 0; D < A; D++)
            d[_[D]] = O;
        } else
          R ? this.options.visualElement.renderState.vars[E] = O : d[E] = O;
      }
      this.options.layoutId && (d.pointerEvents = g === this ? Sc(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()), this.root.nodes.forEach(mS), this.root.sharedNodes.clear();
    }
  };
}
function uM(n) {
  n.updateLayout();
}
function cM(n) {
  const i = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && i && n.hasListeners("didUpdate")) {
    const { layoutBox: o, measuredBox: r } = n.layout, { animationType: l } = n.options, f = i.source !== n.layout.source;
    if (l === "size")
      bi((y) => {
        const p = f ? i.measuredBox[y] : i.layoutBox[y], S = en(p);
        p.min = o[y].min, p.max = p.min + S;
      });
    else if (l === "x" || l === "y") {
      const y = l === "x" ? "y" : "x";
      $m(f ? i.measuredBox[y] : i.layoutBox[y], o[y]);
    } else dE(l, i.layoutBox, o) && bi((y) => {
      const p = f ? i.measuredBox[y] : i.layoutBox[y], S = en(o[y]);
      p.max = p.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[y].max = n.relativeTarget[y].min + S);
    });
    const d = zs();
    el(d, o, i.layoutBox);
    const h = zs();
    f ? el(h, n.applyTransform(r, !0), i.measuredBox) : el(h, o, i.layoutBox);
    const m = !sE(d);
    let g = !1;
    if (!n.resumeFrom) {
      const y = n.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: p, layout: S } = y;
        if (p && S) {
          const T = n.options.layoutAnchor || void 0, E = xe();
          Lc(E, i.layoutBox, p.layoutBox, T);
          const w = xe();
          Lc(w, o, S.layoutBox, T), rE(E, w) || (g = !0), y.options.layoutRoot && (n.relativeTarget = w, n.relativeTargetOrigin = E, n.relativeParent = y);
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: o,
      snapshot: i,
      delta: h,
      layoutDelta: d,
      hasLayoutChanged: m,
      hasRelativeLayoutChanged: g
    });
  } else if (n.isLead()) {
    const { onExitComplete: o } = n.options;
    o && o();
  }
  n.options.transition = void 0;
}
function fM(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function dM(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function hM(n) {
  n.clearSnapshot();
}
function mS(n) {
  n.clearMeasurements();
}
function mM(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function pS(n) {
  n.isLayoutDirty = !1;
}
function pM(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function gM(n) {
  const { visualElement: i } = n.options;
  i && i.getProps().onBeforeLayoutMeasure && i.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function gS(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function yM(n) {
  n.resolveTargetDelta();
}
function vM(n) {
  n.calcProjection();
}
function bM(n) {
  n.resetSkewAndRotation();
}
function SM(n) {
  n.removeLeadSnapshot();
}
function yS(n, i, o) {
  n.translate = Qt(i.translate, 0, o), n.scale = Qt(i.scale, 1, o), n.origin = i.origin, n.originPoint = i.originPoint;
}
function vS(n, i, o, r) {
  n.min = Qt(i.min, o.min, r), n.max = Qt(i.max, o.max, r);
}
function xM(n, i, o, r) {
  vS(n.x, i.x, o.x, r), vS(n.y, i.y, o.y, r);
}
function TM(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const EM = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, bS = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), SS = bS("applewebkit/") && !bS("chrome/") ? Math.round : Hn;
function xS(n) {
  n.min = SS(n.min), n.max = SS(n.max);
}
function CM(n) {
  xS(n.x), xS(n.y);
}
function dE(n, i, o) {
  return n === "position" || n === "preserve-aspect" && !FD(uS(i), uS(o), 0.2);
}
function wM(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const _M = fE({
  attachResizeListener: (n, i) => ul(n, "resize", i),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), AM = (n) => !n.isLayoutDirty && n.willUpdate(!1);
function TS() {
  const n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new WeakMap(), o = () => n.forEach(AM);
  return {
    add: (r) => {
      n.add(r), i.set(r, r.addEventListener("willUpdate", o));
    },
    remove: (r) => {
      n.delete(r);
      const l = i.get(r);
      l && (l(), i.delete(r)), o();
    },
    dirty: o
  };
}
const am = {
  current: void 0
}, hE = fE({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!am.current) {
      const n = new _M({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), am.current = n;
    }
    return am.current;
  },
  resetTransform: (n, i) => {
    n.style.transform = i !== void 0 ? i : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
}), Qi = v.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function ES(n, i) {
  if (typeof n == "function")
    return n(i);
  n != null && (n.current = i);
}
function RM(...n) {
  return (i) => {
    let o = !1;
    const r = n.map((l) => {
      const f = ES(l, i);
      return !o && typeof f == "function" && (o = !0), f;
    });
    if (o)
      return () => {
        for (let l = 0; l < r.length; l++) {
          const f = r[l];
          typeof f == "function" ? f() : ES(n[l], null);
        }
      };
  };
}
function OM(...n) {
  return v.useCallback(RM(...n), n);
}
class DM extends v.Component {
  getSnapshotBeforeUpdate(i) {
    const o = this.props.childRef.current;
    if (mc(o) && i.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const r = o.offsetParent, l = mc(r) && r.offsetWidth || 0, f = mc(r) && r.offsetHeight || 0, d = getComputedStyle(o), h = this.props.sizeRef.current;
      h.height = parseFloat(d.height), h.width = parseFloat(d.width), h.top = o.offsetTop, h.left = o.offsetLeft, h.right = l - h.width - h.left, h.bottom = f - h.height - h.top, h.direction = d.direction;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function MM({ children: n, isPresent: i, anchorX: o, anchorY: r, root: l, pop: f }) {
  const d = v.useId(), h = v.useRef(null), m = v.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: g } = v.useContext(Qi), y = f !== !1 ? n.props?.ref ?? n?.ref : void 0, p = OM(h, y);
  return v.useInsertionEffect(() => {
    const { width: S, height: T, top: E, left: w, right: _, bottom: R, direction: O } = m.current;
    if (i || f === !1 || !h.current || !S || !T)
      return;
    const A = O === "rtl", D = o === "left" ? A ? `right: ${_}` : `left: ${w}` : A ? `left: ${w}` : `right: ${_}`, U = r === "bottom" ? `bottom: ${R}` : `top: ${E}`;
    h.current.dataset.motionPopId = d;
    const z = document.createElement("style");
    g && (z.nonce = g);
    const V = l ?? document.head;
    return V.appendChild(z), z.sheet && z.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${T}px !important;
            ${D}px !important;
            ${U}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), V.contains(z) && V.removeChild(z);
    };
  }, [i]), x.jsx(DM, { isPresent: i, childRef: h, sizeRef: m, pop: f, children: f === !1 ? n : v.cloneElement(n, { ref: p }) });
}
const NM = ({ children: n, initial: i, isPresent: o, onExitComplete: r, custom: l, presenceAffectsLayout: f, mode: d, anchorX: h, anchorY: m, root: g }) => {
  const y = Oo(jM), p = v.useId(), S = v.useRef(o), T = v.useRef(r);
  ml(() => {
    S.current = o, T.current = r;
  });
  let E = !0, w = v.useMemo(() => (E = !1, {
    id: p,
    initial: i,
    isPresent: o,
    custom: l,
    onExitComplete: (_) => {
      y.set(_, !0);
      for (const R of y.values())
        if (!R)
          return;
      r && r();
    },
    register: (_) => (y.set(_, !1), () => {
      y.delete(_), !S.current && !y.size && T.current?.();
    })
  }), [o, y, r]);
  return f && E && (w = { ...w }), v.useMemo(() => {
    y.forEach((_, R) => y.set(R, !1));
  }, [o]), v.useEffect(() => {
    !o && !y.size && r && r();
  }, [o]), n = x.jsx(MM, { pop: d === "popLayout", isPresent: o, anchorX: h, anchorY: m, root: g, children: n }), x.jsx(pl.Provider, { value: w, children: n });
};
function jM() {
  return /* @__PURE__ */ new Map();
}
function mE(n = !0) {
  const i = v.useContext(pl);
  if (i === null)
    return [!0, null];
  const { isPresent: o, onExitComplete: r, register: l } = i, f = v.useId();
  v.useEffect(() => {
    if (n)
      return l(f);
  }, [n]);
  const d = v.useCallback(() => n && r && r(f), [f, r, n]);
  return !o && r ? [!1, d] : [!0];
}
function $p() {
  return zM(v.useContext(pl));
}
function zM(n) {
  return n === null ? !0 : n.isPresent;
}
const tc = (n) => n.key || "";
function CS(n) {
  const i = [];
  return v.Children.forEach(n, (o) => {
    v.isValidElement(o) && i.push(o);
  }), i;
}
const ie = ({ children: n, custom: i, initial: o = !0, onExitComplete: r, presenceAffectsLayout: l = !0, mode: f = "sync", propagate: d = !1, anchorX: h = "left", anchorY: m = "top", root: g }) => {
  const [y, p] = mE(d), S = v.useMemo(() => CS(n), [n]), T = d && !y ? [] : S.map(tc), E = v.useRef(!0), w = v.useRef(S), _ = Oo(() => /* @__PURE__ */ new Map()), R = v.useRef(/* @__PURE__ */ new Set()), [O, A] = v.useState(S), [D, U] = v.useState(S);
  ml(() => {
    E.current = !1, w.current = S;
    for (let I = 0; I < D.length; I++) {
      const F = tc(D[I]);
      T.includes(F) ? (_.delete(F), R.current.delete(F)) : _.get(F) !== !0 && _.set(F, !1);
    }
  }, [D, T.length, T.join("-")]);
  const z = [];
  if (S !== O) {
    let I = [...S];
    for (let F = 0; F < D.length; F++) {
      const Z = D[F], W = tc(Z);
      T.includes(W) || (I.splice(F, 0, Z), z.push(Z));
    }
    return f === "wait" && z.length && (I = z), U(CS(I)), A(S), null;
  }
  const { forceRender: V } = v.useContext(il);
  return x.jsx(x.Fragment, { children: D.map((I) => {
    const F = tc(I), Z = d && !y ? !1 : S === D || T.includes(F), W = () => {
      if (R.current.has(F))
        return;
      if (_.has(F))
        R.current.add(F), _.set(F, !0);
      else
        return;
      let et = !0;
      _.forEach((st) => {
        st || (et = !1);
      }), et && (V?.(), U(w.current), d && p?.(), r && r());
    };
    return x.jsx(NM, { isPresent: Z, initial: !E.current || o ? void 0 : !1, custom: i, presenceAffectsLayout: l, mode: f, root: g, onExitComplete: Z ? void 0 : W, anchorX: h, anchorY: m, children: I }, F);
  }) });
}, LM = v.createContext(null);
function VM() {
  const n = v.useRef(!1);
  return ml(() => (n.current = !0, () => {
    n.current = !1;
  }), []), n;
}
function BM() {
  const n = VM(), [i, o] = v.useState(0), r = v.useCallback(() => {
    n.current && o(i + 1);
  }, [i]);
  return [v.useCallback(() => Ft.postRender(r), [r]), i];
}
const pE = (n) => n === !0, PM = (n) => pE(n === !0) || n === "id", UM = ({ children: n, id: i, inherit: o = !0 }) => {
  const r = v.useContext(il), l = v.useContext(LM), [f, d] = BM(), h = v.useRef(null), m = r.id || l;
  h.current === null && (PM(o) && m && (i = i ? m + "-" + i : m), h.current = {
    id: i,
    group: pE(o) && r.group || TS()
  });
  const g = v.useMemo(() => ({ ...h.current, forceRender: f }), [d]);
  return x.jsx(il.Provider, { value: g, children: n });
}, gE = v.createContext({ strict: !1 }), wS = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let _S = !1;
function HM() {
  if (_S)
    return;
  const n = {};
  for (const i in wS)
    n[i] = {
      isEnabled: (o) => wS[i].some((r) => !!o[r])
    };
  IT(n), _S = !0;
}
function yE() {
  return HM(), bD();
}
function IM(n) {
  const i = yE();
  for (const o in n)
    i[o] = {
      ...i[o],
      ...n[o]
    };
  IT(i);
}
const qM = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function Vc(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || qM.has(n);
}
let vE = (n) => !Vc(n);
function bE(n) {
  typeof n == "function" && (vE = (i) => i.startsWith("on") ? !Vc(i) : n(i));
}
try {
  bE(require("@emotion/is-prop-valid").default);
} catch {
}
function GM(n, i, o) {
  const r = {};
  for (const l in n)
    l === "values" && typeof n.values == "object" || le(n[l]) || (vE(l) || o === !0 && Vc(l) || !i && !Vc(l) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && l.startsWith("onDrag")) && (r[l] = n[l]);
  return r;
}
function YM({ children: n, isValidProp: i, ...o }) {
  i && bE(i);
  const r = v.useContext(Qi);
  o = { ...r, ...o }, o.transition = jp(o.transition, r.transition), o.isStatic = Oo(() => o.isStatic);
  const l = v.useMemo(() => o, [
    JSON.stringify(o.transition),
    o.transformPagePoint,
    o.reducedMotion,
    o.skipAnimations
  ]);
  return x.jsx(Qi.Provider, { value: l, children: n });
}
const $c = /* @__PURE__ */ v.createContext({});
function kM(n, i) {
  if (Xc(n)) {
    const { initial: o, animate: r } = n;
    return {
      initial: o === !1 || ll(o) ? o : void 0,
      animate: ll(r) ? r : void 0
    };
  }
  return n.inherit !== !1 ? i : {};
}
function FM(n) {
  const { initial: i, animate: o } = kM(n, v.useContext($c));
  return v.useMemo(() => ({ initial: i, animate: o }), [AS(i), AS(o)]);
}
function AS(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Kp = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function SE(n, i, o) {
  for (const r in i)
    !le(i[r]) && !KT(r, o) && (n[r] = i[r]);
}
function XM({ transformTemplate: n }, i) {
  return v.useMemo(() => {
    const o = Kp();
    return Fp(o, i, n), Object.assign({}, o.vars, o.style);
  }, [i]);
}
function $M(n, i) {
  const o = n.style || {}, r = {};
  return SE(r, o, n), Object.assign(r, XM(n, i)), r;
}
function KM(n, i) {
  const o = {}, r = $M(n, i);
  return n.drag && n.dragListener !== !1 && (o.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (o.tabIndex = 0), o.style = r, o;
}
const xE = () => ({
  ...Kp(),
  attrs: {}
});
function ZM(n, i, o, r) {
  const l = v.useMemo(() => {
    const f = xE();
    return QT(f, i, WT(r), n.transformTemplate, n.style), {
      ...f.attrs,
      style: { ...f.style }
    };
  }, [i]);
  if (n.style) {
    const f = {};
    SE(f, n.style, n), l.style = { ...f, ...l.style };
  }
  return l;
}
const QM = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Zp(n) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof n != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    n.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(QM.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function JM(n, i, o, { latestValues: r }, l, f = !1, d) {
  const m = (d ?? Zp(n) ? ZM : KM)(i, r, l, n), g = GM(i, typeof n == "string", f), y = n !== v.Fragment ? { ...g, ...m, ref: o } : {}, { children: p } = i, S = v.useMemo(() => le(p) ? p.get() : p, [p]);
  return v.createElement(n, {
    ...y,
    children: S
  });
}
function WM({ scrapeMotionValuesFromProps: n, createRenderState: i }, o, r, l) {
  return {
    latestValues: tN(o, r, l, n),
    renderState: i()
  };
}
function tN(n, i, o, r) {
  const l = {}, f = r(n, {});
  for (const S in f)
    l[S] = Sc(f[S]);
  let { initial: d, animate: h } = n;
  const m = Xc(n), g = UT(n);
  i && g && !m && n.inherit !== !1 && (d === void 0 && (d = i.initial), h === void 0 && (h = i.animate));
  let y = o ? o.initial === !1 : !1;
  y = y || d === !1;
  const p = y ? h : d;
  if (p && typeof p != "boolean" && !Fc(p)) {
    const S = Array.isArray(p) ? p : [p];
    for (let T = 0; T < S.length; T++) {
      const E = Vp(n, S[T]);
      if (E) {
        const { transitionEnd: w, transition: _, ...R } = E;
        for (const O in R) {
          let A = R[O];
          if (Array.isArray(A)) {
            const D = y ? A.length - 1 : 0;
            A = A[D];
          }
          A !== null && (l[O] = A);
        }
        for (const O in w)
          l[O] = w[O];
      }
    }
  }
  return l;
}
const TE = (n) => (i, o) => {
  const r = v.useContext($c), l = v.useContext(pl), f = () => WM(n, i, r, l);
  return o ? f() : Oo(f);
}, eN = /* @__PURE__ */ TE({
  scrapeMotionValuesFromProps: Xp,
  createRenderState: Kp
}), nN = /* @__PURE__ */ TE({
  scrapeMotionValuesFromProps: tE,
  createRenderState: xE
}), iN = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function aN(n, i, o) {
  const r = v.useRef(o);
  v.useInsertionEffect(() => {
    r.current = o;
  });
  const l = v.useRef(null);
  return v.useCallback((f) => {
    f && n.onMount?.(f), i && (f ? i.mount(f) : i.unmount());
    const d = r.current;
    if (typeof d == "function")
      if (f) {
        const h = d(f);
        typeof h == "function" && (l.current = h);
      } else l.current ? (l.current(), l.current = null) : d(f);
    else d && (d.current = f);
  }, [i]);
}
const EE = v.createContext({});
function Ds(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function oN(n, i, o, r, l, f) {
  const { visualElement: d } = v.useContext($c), h = v.useContext(gE), m = v.useContext(pl), g = v.useContext(Qi), y = g.reducedMotion, p = g.skipAnimations, S = v.useRef(null), T = v.useRef(!1);
  r = r || h.renderer, !S.current && r && (S.current = r(n, {
    visualState: i,
    parent: d,
    props: o,
    presenceContext: m,
    blockInitialAnimation: m ? m.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: p,
    isSVG: f
  }), T.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const E = S.current, w = v.useContext(EE);
  E && !E.projection && l && (E.type === "html" || E.type === "svg") && sN(S.current, o, l, w);
  const _ = v.useRef(!1);
  v.useInsertionEffect(() => {
    E && _.current && E.update(o, m);
  });
  const R = o[RT], O = v.useRef(!!R && typeof window < "u" && !window.MotionHandoffIsComplete?.(R) && window.MotionHasOptimisedAnimation?.(R));
  return ml(() => {
    T.current = !0, E && (_.current = !0, window.MotionIsMounted = !0, E.updateFeatures(), E.scheduleRenderMicrotask(), O.current && E.animationState && E.animationState.animateChanges());
  }), v.useEffect(() => {
    E && (!O.current && E.animationState && E.animationState.animateChanges(), O.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(R);
    }), O.current = !1), E.enteringChildren = void 0);
  }), E;
}
function sN(n, i, o, r) {
  const { layoutId: l, layout: f, drag: d, dragConstraints: h, layoutScroll: m, layoutRoot: g, layoutAnchor: y, layoutCrossfade: p } = i;
  n.projection = new o(n.latestValues, i["data-framer-portal-id"] ? void 0 : CE(n.parent)), n.projection.setOptions({
    layoutId: l,
    layout: f,
    alwaysMeasureLayout: !!d || h && Ds(h),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof f == "string" ? f : "both",
    initialPromotionConfig: r,
    crossfade: p,
    layoutScroll: m,
    layoutRoot: g,
    layoutAnchor: y
  });
}
function CE(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : CE(n.parent);
}
function om(n, { forwardMotionProps: i = !1, type: o } = {}, r, l) {
  r && IM(r);
  const f = o ? o === "svg" : Zp(n), d = f ? nN : eN;
  function h(g, y) {
    let p;
    const S = {
      ...v.useContext(Qi),
      ...g,
      layoutId: rN(g)
    }, { isStatic: T } = S, E = FM(g), w = d(g, T);
    if (!T && typeof window < "u") {
      lN();
      const _ = uN(S);
      p = _.MeasureLayout, E.visualElement = oN(n, w, S, l, _.ProjectionNode, f);
    }
    return x.jsxs($c.Provider, { value: E, children: [p && E.visualElement ? x.jsx(p, { visualElement: E.visualElement, ...S }) : null, JM(n, g, aN(w, E.visualElement, y), w, T, i, f)] });
  }
  h.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const m = v.forwardRef(h);
  return m[iN] = n, m;
}
function rN({ layoutId: n }) {
  const i = v.useContext(il).id;
  return i && n !== void 0 ? i + "-" + n : n;
}
function lN(n, i) {
  v.useContext(gE).strict;
}
function uN(n) {
  const i = yE(), { drag: o, layout: r } = i;
  if (!o && !r)
    return {};
  const l = { ...o, ...r };
  return {
    MeasureLayout: o?.isEnabled(n) || r?.isEnabled(n) ? l.MeasureLayout : void 0,
    ProjectionNode: l.ProjectionNode
  };
}
function cN(n, i) {
  if (typeof Proxy > "u")
    return om;
  const o = /* @__PURE__ */ new Map(), r = (f, d) => om(f, d, n, i), l = (f, d) => r(f, d);
  return new Proxy(l, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (f, d) => d === "create" ? r : (o.has(d) || o.set(d, om(d, void 0, n, i)), o.get(d))
  });
}
const fN = (n, i) => i.isSVG ?? Zp(n) ? new eE(i) : new ZT(i, {
  allowProjection: n !== v.Fragment
});
class dN extends Ua {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(i) {
    super(i), i.animationState || (i.animationState = HD(i));
  }
  updateAnimationControlsSubscription() {
    const { animate: i } = this.node.getProps();
    Fc(i) && (this.unmountControls = i.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: i } = this.node.getProps(), { animate: o } = this.node.prevProps || {};
    i !== o && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let hN = 0;
class mN extends Ua {
  constructor() {
    super(...arguments), this.id = hN++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: i, onExitComplete: o } = this.node.presenceContext, { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || i === r)
      return;
    if (i && r === !1) {
      if (this.isExitComplete) {
        const { initial: f, custom: d } = this.node.getProps();
        if (typeof f == "string" || typeof f == "object" && f !== null && !Array.isArray(f)) {
          const h = wo(this.node, f, d);
          if (h) {
            const { transition: m, transitionEnd: g, ...y } = h;
            for (const p in y)
              this.node.getValue(p)?.jump(y[p]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const l = this.node.animationState.setActive("exit", !i);
    o && !i && l.then(() => {
      this.isExitComplete = !0, o(this.id);
    });
  }
  mount() {
    const { register: i, onExitComplete: o } = this.node.presenceContext || {};
    o && o(this.id), i && (this.unmount = i(this.id));
  }
  unmount() {
  }
}
const pN = {
  animation: {
    Feature: dN
  },
  exit: {
    Feature: mN
  }
};
function bl(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const gN = (n) => (i) => qp(i) && n(i, bl(i));
function nl(n, i, o, r) {
  return ul(n, i, gN(o), r);
}
const wE = ({ current: n }) => n ? n.ownerDocument.defaultView : null, RS = (n, i) => Math.abs(n - i);
function yN(n, i) {
  const o = RS(n.x, i.x), r = RS(n.y, i.y);
  return Math.sqrt(o ** 2 + r ** 2);
}
const OS = /* @__PURE__ */ new Set(["auto", "scroll"]);
class _E {
  constructor(i, o, { transformPagePoint: r, contextWindow: l = window, dragSnapToOrigin: f = !1, distanceThreshold: d = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (E) => {
      this.handleScroll(E.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = ec(this.lastRawMoveEventInfo, this.transformPagePoint));
      const E = sm(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, _ = yN(E.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !_)
        return;
      const { point: R } = E, { timestamp: O } = Ye;
      this.history.push({ ...R, timestamp: O });
      const { onStart: A, onMove: D } = this.handlers;
      w || (A && A(this.lastMoveEvent, E), this.startEvent = this.lastMoveEvent), D && D(this.lastMoveEvent, E);
    }, this.handlePointerMove = (E, w) => {
      this.lastMoveEvent = E, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = ec(w, this.transformPagePoint), Ft.update(this.updatePoint, !0);
    }, this.handlePointerUp = (E, w) => {
      this.end();
      const { onEnd: _, onSessionEnd: R, resumeAnimation: O } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && O && O(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const A = sm(E.type === "pointercancel" ? this.lastMoveEventInfo : ec(w, this.transformPagePoint), this.history);
      this.startEvent && _ && _(E, A), R && R(E, A);
    }, !qp(i))
      return;
    this.dragSnapToOrigin = f, this.handlers = o, this.transformPagePoint = r, this.distanceThreshold = d, this.contextWindow = l || window;
    const m = bl(i), g = ec(m, this.transformPagePoint), { point: y } = g, { timestamp: p } = Ye;
    this.history = [{ ...y, timestamp: p }];
    const { onSessionStart: S } = o;
    S && S(i, sm(g, this.history));
    const T = { passive: !0, capture: !0 };
    this.removeListeners = gl(nl(this.contextWindow, "pointermove", this.handlePointerMove, T), nl(this.contextWindow, "pointerup", this.handlePointerUp, T), nl(this.contextWindow, "pointercancel", this.handlePointerUp, T)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(i) {
    let o = i.parentElement;
    for (; o; ) {
      const r = getComputedStyle(o);
      (OS.has(r.overflowX) || OS.has(r.overflowY)) && this.scrollPositions.set(o, {
        x: o.scrollLeft,
        y: o.scrollTop
      }), o = o.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(i) {
    const o = this.scrollPositions.get(i);
    if (!o)
      return;
    const r = i === window, l = r ? { x: window.scrollX, y: window.scrollY } : {
      x: i.scrollLeft,
      y: i.scrollTop
    }, f = { x: l.x - o.x, y: l.y - o.y };
    f.x === 0 && f.y === 0 || (r ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += f.x, this.lastMoveEventInfo.point.y += f.y) : this.history.length > 0 && (this.history[0].x -= f.x, this.history[0].y -= f.y), this.scrollPositions.set(i, l), Ft.update(this.updatePoint, !0));
  }
  updateHandlers(i) {
    this.handlers = i;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Zi(this.updatePoint);
  }
}
function ec(n, i) {
  return i ? { point: i(n.point) } : n;
}
function DS(n, i) {
  return { x: n.x - i.x, y: n.y - i.y };
}
function sm({ point: n }, i) {
  return {
    point: n,
    delta: DS(n, AE(i)),
    offset: DS(n, vN(i)),
    velocity: bN(i, 0.1)
  };
}
function vN(n) {
  return n[0];
}
function AE(n) {
  return n[n.length - 1];
}
function bN(n, i) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let o = n.length - 1, r = null;
  const l = AE(n);
  for (; o >= 0 && (r = n[o], !(l.timestamp - r.timestamp > /* @__PURE__ */ un(i))); )
    o--;
  if (!r)
    return { x: 0, y: 0 };
  r === n[0] && n.length > 2 && l.timestamp - r.timestamp > /* @__PURE__ */ un(i) * 2 && (r = n[1]);
  const f = /* @__PURE__ */ Un(l.timestamp - r.timestamp);
  if (f === 0)
    return { x: 0, y: 0 };
  const d = {
    x: (l.x - r.x) / f,
    y: (l.y - r.y) / f
  };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function SN(n, { min: i, max: o }, r) {
  return i !== void 0 && n < i ? n = r ? Qt(i, n, r.min) : Math.max(n, i) : o !== void 0 && n > o && (n = r ? Qt(o, n, r.max) : Math.min(n, o)), n;
}
function MS(n, i, o) {
  return {
    min: i !== void 0 ? n.min + i : void 0,
    max: o !== void 0 ? n.max + o - (n.max - n.min) : void 0
  };
}
function xN(n, { top: i, left: o, bottom: r, right: l }) {
  return {
    x: MS(n.x, o, l),
    y: MS(n.y, i, r)
  };
}
function NS(n, i) {
  let o = i.min - n.min, r = i.max - n.max;
  return i.max - i.min < n.max - n.min && ([o, r] = [r, o]), { min: o, max: r };
}
function TN(n, i) {
  return {
    x: NS(n.x, i.x),
    y: NS(n.y, i.y)
  };
}
function EN(n, i) {
  let o = 0.5;
  const r = en(n), l = en(i);
  return l > r ? o = /* @__PURE__ */ Ps(i.min, i.max - r, n.min) : r > l && (o = /* @__PURE__ */ Ps(n.min, n.max - l, i.min)), Ci(0, 1, o);
}
function CN(n, i) {
  const o = {};
  return i.min !== void 0 && (o.min = i.min - n.min), i.max !== void 0 && (o.max = i.max - n.min), o;
}
const Km = 0.35;
function wN(n = Km) {
  return n === !1 ? n = 0 : n === !0 && (n = Km), {
    x: jS(n, "left", "right"),
    y: jS(n, "top", "bottom")
  };
}
function jS(n, i, o) {
  return {
    min: zS(n, i),
    max: zS(n, o)
  };
}
function zS(n, i) {
  return typeof n == "number" ? n : n[i] || 0;
}
const _N = /* @__PURE__ */ new WeakMap();
class AN {
  constructor(i) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = xe(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = i;
  }
  start(i, { snapToCursor: o = !1, distanceThreshold: r } = {}) {
    const { presenceContext: l } = this.visualElement;
    if (l && l.isPresent === !1)
      return;
    const f = (p) => {
      o && this.snapToCursor(bl(p).point), this.stopAnimation();
    }, d = (p, S) => {
      const { drag: T, dragPropagation: E, onDragStart: w } = this.getProps();
      if (T && !E && (this.openDragLock && this.openDragLock(), this.openDragLock = ZO(T), !this.openDragLock))
        return;
      this.latestPointerEvent = p, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), bi((R) => {
        let O = this.getAxisMotionValue(R).get() || 0;
        if (Ei.test(O)) {
          const { projection: A } = this.visualElement;
          if (A && A.layout) {
            const D = A.layout.layoutBox[R];
            D && (O = en(D) * (parseFloat(O) / 100));
          }
        }
        this.originPoint[R] = O;
      }), w && Ft.update(() => w(p, S), !1, !0), Hm(this.visualElement, "transform");
      const { animationState: _ } = this.visualElement;
      _ && _.setActive("whileDrag", !0);
    }, h = (p, S) => {
      this.latestPointerEvent = p, this.latestPanInfo = S;
      const { dragPropagation: T, dragDirectionLock: E, onDirectionLock: w, onDrag: _ } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: R } = S;
      if (E && this.currentDirection === null) {
        this.currentDirection = ON(R), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, R), this.updateAxis("y", S.point, R), this.visualElement.render(), _ && Ft.update(() => _(p, S), !1, !0);
    }, m = (p, S) => {
      this.latestPointerEvent = p, this.latestPanInfo = S, this.stop(p, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, g = () => {
      const { dragSnapToOrigin: p } = this.getProps();
      (p || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new _E(i, {
      onSessionStart: f,
      onStart: d,
      onMove: h,
      onSessionEnd: m,
      resumeAnimation: g
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: r,
      contextWindow: wE(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(i, o) {
    const r = i || this.latestPointerEvent, l = o || this.latestPanInfo, f = this.isDragging;
    if (this.cancel(), !f || !l || !r)
      return;
    const { velocity: d } = l;
    this.startAnimation(d);
    const { onDragEnd: h } = this.getProps();
    h && Ft.postRender(() => h(r, l));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: i, animationState: o } = this.visualElement;
    i && (i.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: r } = this.getProps();
    !r && this.openDragLock && (this.openDragLock(), this.openDragLock = null), o && o.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(i, o, r) {
    const { drag: l } = this.getProps();
    if (!r || !nc(i, l, this.currentDirection))
      return;
    const f = this.getAxisMotionValue(i);
    let d = this.originPoint[i] + r[i];
    this.constraints && this.constraints[i] && (d = SN(d, this.constraints[i], this.elastic[i])), f.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: i, dragElastic: o } = this.getProps(), r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, l = this.constraints;
    i && Ds(i) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : i && r ? this.constraints = xN(r.layoutBox, i) : this.constraints = !1, this.elastic = wN(o), l !== this.constraints && !Ds(i) && r && this.constraints && !this.hasMutatedConstraints && bi((f) => {
      this.constraints !== !1 && this.getAxisMotionValue(f) && (this.constraints[f] = CN(r.layoutBox[f], this.constraints[f]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: i, onMeasureDragConstraints: o } = this.getProps();
    if (!i || !Ds(i))
      return !1;
    const r = i.current, { projection: l } = this.visualElement;
    if (!l || !l.layout)
      return !1;
    l.root && (l.root.scroll = void 0, l.root.updateScroll());
    const f = ED(r, l.root, this.visualElement.getTransformPagePoint());
    let d = TN(l.layout.layoutBox, f);
    if (o) {
      const h = o(SD(d));
      this.hasMutatedConstraints = !!h, h && (d = YT(h));
    }
    return d;
  }
  startAnimation(i) {
    const { drag: o, dragMomentum: r, dragElastic: l, dragTransition: f, dragSnapToOrigin: d, onDragTransitionEnd: h } = this.getProps(), m = this.constraints || {}, g = bi((y) => {
      if (!nc(y, o, this.currentDirection))
        return;
      let p = m && m[y] || {};
      (d === !0 || d === y) && (p = { min: 0, max: 0 });
      const S = l ? 200 : 1e6, T = l ? 40 : 1e7, E = {
        type: "inertia",
        velocity: r ? i[y] : 0,
        bounceStiffness: S,
        bounceDamping: T,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...f,
        ...p
      };
      return this.startAxisValueAnimation(y, E);
    });
    return Promise.all(g).then(h);
  }
  startAxisValueAnimation(i, o) {
    const r = this.getAxisMotionValue(i);
    return Hm(this.visualElement, i), r.start(Lp(i, r, 0, o, this.visualElement, !1));
  }
  stopAnimation() {
    bi((i) => this.getAxisMotionValue(i).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(i) {
    const o = `_drag${i.toUpperCase()}`, l = this.visualElement.getProps()[o];
    return l || this.visualElement.getValue(i, this.visualElement.latestValues[i] ?? 0);
  }
  snapToCursor(i) {
    bi((o) => {
      const { drag: r } = this.getProps();
      if (!nc(o, r, this.currentDirection))
        return;
      const { projection: l } = this.visualElement, f = this.getAxisMotionValue(o);
      if (l && l.layout) {
        const { min: d, max: h } = l.layout.layoutBox[o], m = f.get() || 0;
        f.set(i[o] - Qt(d, h, 0.5) + m);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: i, dragConstraints: o } = this.getProps(), { projection: r } = this.visualElement;
    if (!Ds(o) || !r || !this.constraints)
      return;
    this.stopAnimation();
    const l = { x: 0, y: 0 };
    bi((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const m = h.get();
        l[d] = EN({ min: m, max: m }, this.constraints[d]);
      }
    });
    const { transformTemplate: f } = this.visualElement.getProps();
    this.visualElement.current.style.transform = f ? f({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.constraints = !1, this.resolveConstraints(), bi((d) => {
      if (!nc(d, i, null))
        return;
      const h = this.getAxisMotionValue(d), { min: m, max: g } = this.constraints[d];
      h.set(Qt(m, g, l[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    _N.set(this.visualElement, this);
    const i = this.visualElement.current, o = nl(i, "pointerdown", (g) => {
      const { drag: y, dragListener: p = !0 } = this.getProps(), S = g.target, T = S !== i && nD(S);
      y && p && !T && this.start(g);
    });
    let r;
    const l = () => {
      const { dragConstraints: g } = this.getProps();
      Ds(g) && g.current && (this.constraints = this.resolveRefConstraints(), r || (r = RN(i, g.current, () => this.scalePositionWithinConstraints())));
    }, { projection: f } = this.visualElement, d = f.addEventListener("measure", l);
    f && !f.layout && (f.root && f.root.updateScroll(), f.updateLayout()), Ft.read(l);
    const h = ul(window, "resize", () => this.scalePositionWithinConstraints()), m = f.addEventListener("didUpdate", (({ delta: g, hasLayoutChanged: y }) => {
      this.isDragging && y && (bi((p) => {
        const S = this.getAxisMotionValue(p);
        S && (this.originPoint[p] += g[p].translate, S.set(S.get() + g[p].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), o(), d(), m && m(), r && r();
    };
  }
  getProps() {
    const i = this.visualElement.getProps(), { drag: o = !1, dragDirectionLock: r = !1, dragPropagation: l = !1, dragConstraints: f = !1, dragElastic: d = Km, dragMomentum: h = !0 } = i;
    return {
      ...i,
      drag: o,
      dragDirectionLock: r,
      dragPropagation: l,
      dragConstraints: f,
      dragElastic: d,
      dragMomentum: h
    };
  }
}
function LS(n) {
  let i = !0;
  return () => {
    if (i) {
      i = !1;
      return;
    }
    n();
  };
}
function RN(n, i, o) {
  const r = H1(n, LS(o)), l = H1(i, LS(o));
  return () => {
    r(), l();
  };
}
function nc(n, i, o) {
  return (i === !0 || i === n) && (o === null || o === n);
}
function ON(n, i = 10) {
  let o = null;
  return Math.abs(n.y) > i ? o = "y" : Math.abs(n.x) > i && (o = "x"), o;
}
class DN extends Ua {
  constructor(i) {
    super(i), this.removeGroupControls = Hn, this.removeListeners = Hn, this.controls = new AN(i);
  }
  mount() {
    const { dragControls: i } = this.node.getProps();
    i && (this.removeGroupControls = i.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Hn;
  }
  update() {
    const { dragControls: i } = this.node.getProps(), { dragControls: o } = this.node.prevProps || {};
    i !== o && (this.removeGroupControls(), i && (this.removeGroupControls = i.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const rm = (n) => (i, o) => {
  n && Ft.update(() => n(i, o), !1, !0);
};
class MN extends Ua {
  constructor() {
    super(...arguments), this.removePointerDownListener = Hn;
  }
  onPointerDown(i) {
    this.session = new _E(i, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: wE(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: i, onPanStart: o, onPan: r, onPanEnd: l } = this.node.getProps();
    return {
      onSessionStart: rm(i),
      onStart: rm(o),
      onMove: rm(r),
      onEnd: (f, d) => {
        delete this.session, l && Ft.postRender(() => l(f, d));
      }
    };
  }
  mount() {
    this.removePointerDownListener = nl(this.node.current, "pointerdown", (i) => this.onPointerDown(i));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let lm = !1;
class NN extends v.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: i, layoutGroup: o, switchLayoutGroup: r, layoutId: l } = this.props, { projection: f } = i;
    f && (o.group && o.group.add(f), r && r.register && l && r.register(f), lm && f.root.didUpdate(), f.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), f.setOptions({
      ...f.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), xc.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(i) {
    const { layoutDependency: o, visualElement: r, drag: l, isPresent: f } = this.props, { projection: d } = r;
    return d && (d.isPresent = f, i.layoutDependency !== o && d.setOptions({
      ...d.options,
      layoutDependency: o
    }), lm = !0, l || i.layoutDependency !== o || o === void 0 || i.isPresent !== f ? d.willUpdate() : this.safeToRemove(), i.isPresent !== f && (f ? d.promote() : d.relegate() || Ft.postRender(() => {
      const h = d.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: i, layoutAnchor: o } = this.props, { projection: r } = i;
    r && (r.options.layoutAnchor = o, r.root.didUpdate(), Ip.postRender(() => {
      !r.currentAnimation && r.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: i, layoutGroup: o, switchLayoutGroup: r } = this.props, { projection: l } = i;
    lm = !0, l && (l.scheduleCheckAfterUnmount(), o && o.group && o.group.remove(l), r && r.deregister && r.deregister(l));
  }
  safeToRemove() {
    const { safeToRemove: i } = this.props;
    i && i();
  }
  render() {
    return null;
  }
}
function RE(n) {
  const [i, o] = mE(), r = v.useContext(il);
  return x.jsx(NN, { ...n, layoutGroup: r, switchLayoutGroup: v.useContext(EE), isPresent: i, safeToRemove: o });
}
const jN = {
  pan: {
    Feature: MN
  },
  drag: {
    Feature: DN,
    ProjectionNode: hE,
    MeasureLayout: RE
  }
};
function VS(n, i, o) {
  const { props: r } = n;
  n.animationState && r.whileHover && n.animationState.setActive("whileHover", o === "Start");
  const l = "onHover" + o, f = r[l];
  f && Ft.postRender(() => f(i, bl(i)));
}
class zN extends Ua {
  mount() {
    const { current: i } = this.node;
    i && (this.unmount = JO(i, (o, r) => (VS(this.node, r, "Start"), (l) => VS(this.node, l, "End"))));
  }
  unmount() {
  }
}
class LN extends Ua {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let i = !1;
    try {
      i = this.node.current.matches(":focus-visible");
    } catch {
      i = !0;
    }
    !i || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = gl(ul(this.node.current, "focus", () => this.onFocus()), ul(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function BS(n, i, o) {
  const { props: r } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && r.whileTap && n.animationState.setActive("whileTap", o === "Start");
  const l = "onTap" + (o === "End" ? "" : o), f = r[l];
  f && Ft.postRender(() => f(i, bl(i)));
}
class VN extends Ua {
  mount() {
    const { current: i } = this.node;
    if (!i)
      return;
    const { globalTapTarget: o, propagate: r } = this.node.props;
    this.unmount = aD(i, (l, f) => (BS(this.node, f, "Start"), (d, { success: h }) => BS(this.node, d, h ? "End" : "Cancel")), {
      useGlobalTarget: o,
      stopPropagation: r?.tap === !1
    });
  }
  unmount() {
  }
}
const Zm = /* @__PURE__ */ new WeakMap(), um = /* @__PURE__ */ new WeakMap(), BN = (n) => {
  const i = Zm.get(n.target);
  i && i(n);
}, PN = (n) => {
  n.forEach(BN);
};
function UN({ root: n, ...i }) {
  const o = n || document;
  um.has(o) || um.set(o, {});
  const r = um.get(o), l = JSON.stringify(i);
  return r[l] || (r[l] = new IntersectionObserver(PN, { root: n, ...i })), r[l];
}
function HN(n, i, o) {
  const r = UN(i);
  return Zm.set(n, o), r.observe(n), () => {
    Zm.delete(n), r.unobserve(n);
  };
}
const IN = {
  some: 0,
  all: 1
};
class qN extends Ua {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: i = {} } = this.node.getProps(), { root: o, margin: r, amount: l = "some", once: f } = i, d = {
      root: o ? o.current : void 0,
      rootMargin: r,
      threshold: typeof l == "number" ? l : IN[l]
    }, h = (m) => {
      const { isIntersecting: g } = m;
      if (this.isInView === g || (this.isInView = g, f && !g && this.hasEnteredView))
        return;
      g && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", g);
      const { onViewportEnter: y, onViewportLeave: p } = this.node.getProps(), S = g ? y : p;
      S && S(m);
    };
    this.stopObserver = HN(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: i, prevProps: o } = this.node;
    ["amount", "margin", "root"].some(GN(i, o)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function GN({ viewport: n = {} }, { viewport: i = {} } = {}) {
  return (o) => n[o] !== i[o];
}
const YN = {
  inView: {
    Feature: qN
  },
  tap: {
    Feature: VN
  },
  focus: {
    Feature: LN
  },
  hover: {
    Feature: zN
  }
}, kN = {
  layout: {
    ProjectionNode: hE,
    MeasureLayout: RE
  }
}, FN = {
  ...pN,
  ...YN,
  ...jN,
  ...kN
}, XN = /* @__PURE__ */ cN(FN, fN);
function $N(n) {
  return v.useEffect(() => () => n(), []);
}
function KN(n, i, o) {
  v.useInsertionEffect(() => n.on(i, o), [n, i, o]);
}
function Ji(n) {
  const i = Oo(() => La(n)), { isStatic: o } = v.useContext(Qi);
  if (o) {
    const [, r] = v.useState(n);
    v.useEffect(() => i.on("change", r), []);
  }
  return i;
}
function Qp(n, i) {
  const o = Ji(i()), r = () => o.set(i());
  return r(), ml(() => {
    const l = () => Ft.preRender(r, !1, !0), f = n.map((d) => d.on("change", l));
    return () => {
      f.forEach((d) => d()), Zi(r);
    };
  }), o;
}
function PS(n, ...i) {
  const o = n.length;
  function r() {
    let l = "";
    for (let f = 0; f < o; f++) {
      l += n[f];
      const d = i[f];
      d && (l += le(d) ? d.get() : d);
    }
    return l;
  }
  return Qp(i.filter(le), r);
}
function ZN(n) {
  tl.current = [], n();
  const i = Qp(tl.current, n);
  return tl.current = void 0, i;
}
function Qm(n, i, o, r) {
  if (typeof n == "function")
    return ZN(n);
  const f = typeof i == "function" ? i : hD(i, o, r), d = Array.isArray(n) ? US(n, f) : US([n], ([m]) => f(m)), h = Array.isArray(n) ? void 0 : n.accelerate;
  return h && !h.isTransformed && typeof i != "function" && Array.isArray(o) && r?.clamp !== !1 && (d.accelerate = {
    ...h,
    times: i,
    keyframes: o,
    isTransformed: !0
  }), d;
}
function US(n, i) {
  const o = Oo(() => []);
  return Qp(n, () => {
    o.length = 0;
    const r = n.length;
    for (let l = 0; l < r; l++)
      o[l] = n[l].get();
    return i(o);
  });
}
function QN(n, i = {}) {
  const { isStatic: o } = v.useContext(Qi), r = () => le(n) ? n.get() : n;
  if (o)
    return Qm(r);
  const l = Ji(r());
  return v.useInsertionEffect(() => mD(l, n, i), [l, JSON.stringify(i)]), l;
}
function HS(n, i = {}) {
  return QN(n, { type: "spring", ...i });
}
function Jp() {
  !kp.current && HT();
  const [n] = v.useState(Nc.current);
  return n;
}
function JN() {
  const n = Jp(), { reducedMotion: i } = v.useContext(Qi);
  return i === "never" ? !1 : i === "always" ? !0 : n;
}
function Wp(n) {
  return typeof n == "object" && !Array.isArray(n);
}
function OE(n, i, o, r) {
  return n == null ? [] : typeof n == "string" && Wp(i) ? Hp(n, o, r) : n instanceof NodeList ? Array.from(n) : Array.isArray(n) ? n.filter((l) => l != null) : [n];
}
function WN(n, i, o) {
  return n * (i + 1) + o * i;
}
function IS(n, i, o, r) {
  return typeof i == "number" ? i : i.startsWith("-") || i.startsWith("+") ? Math.max(0, n + parseFloat(i)) : i === "<" ? o : i.startsWith("<") ? Math.max(0, o + parseFloat(i.slice(1))) : r.get(i) ?? n;
}
function tj(n, i, o) {
  for (let r = 0; r < n.length; r++) {
    const l = n[r];
    l.at > i && l.at < o && (Bs(n, l), r--);
  }
}
function ej(n, i, o, r, l, f) {
  tj(n, l, f);
  for (let d = 0; d < i.length; d++)
    n.push({
      value: i[d],
      at: Qt(l, f, r[d]),
      easing: /* @__PURE__ */ Jx(o, d)
    });
}
function nj(n, i, o = 0) {
  const r = i + 1 + i * o;
  for (let l = 0; l < n.length; l++)
    n[l] = n[l] / r;
}
function ij(n, i) {
  return n.at === i.at ? n.value === null ? 1 : i.value === null ? -1 : 0 : n.at - i.at;
}
const aj = "easeInOut", oj = 20;
function sj(n, { defaultTransition: i = {}, ...o } = {}, r, l) {
  const f = i.duration || 0.3, d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), m = {}, g = /* @__PURE__ */ new Map();
  let y = 0, p = 0, S = 0;
  for (let T = 0; T < n.length; T++) {
    const E = n[T];
    if (typeof E == "string") {
      g.set(E, p);
      continue;
    } else if (!Array.isArray(E)) {
      g.set(E.name, IS(p, E.at, y, g));
      continue;
    }
    let [w, _, R = {}] = E;
    R.at !== void 0 && (p = IS(p, R.at, y, g));
    let O = 0;
    const A = (D, U, z, V = 0, I = 0) => {
      const F = rj(D), { delay: Z = 0, times: W = mT(F), type: et = i.type || "keyframes", repeat: st, repeatType: ft, repeatDelay: ht = 0, ...q } = U;
      let { ease: X = i.ease || "easeOut", duration: Y } = U;
      const tt = typeof Z == "function" ? Z(V, I) : Z, lt = F.length, Dt = Np(et) ? et : l?.[et || "keyframes"];
      if (lt <= 2 && Dt) {
        let Q = 100;
        if (lt === 2 && cj(F)) {
          const it = F[1] - F[0];
          Q = Math.abs(it);
        }
        const rt = {
          ...i,
          ...q
        };
        Y !== void 0 && (rt.duration = /* @__PURE__ */ un(Y));
        const ut = cT(rt, Q, Dt);
        X = ut.ease, Y = ut.duration;
      }
      Y ?? (Y = f);
      const Mt = p + tt;
      W.length === 1 && W[0] === 0 && (W[1] = 1);
      const te = W.length - F.length;
      if (te > 0 && hT(W, te), F.length === 1 && F.unshift(null), st && st < oj) {
        const Q = Y > 0 ? ht / Y : 0;
        Y = WN(Y, st, ht);
        const rt = [...F], ut = [...W];
        X = Array.isArray(X) ? [...X] : [X];
        const it = [...X], yt = ft === "reverse" || ft === "mirror";
        let bt = rt, nt = it;
        yt && (bt = [...rt].reverse(), ft === "reverse" && (nt = [...it].reverse().map((at) => typeof at == "function" ? /* @__PURE__ */ Tp(at) : at)));
        for (let at = 0; at < st; at++) {
          const Vt = yt && at % 2 === 0, we = Vt ? bt : rt, ae = Vt ? nt : it, ce = (at + 1) * (1 + Q);
          Q > 0 && (F.push(F[F.length - 1]), W.push(ce), X.push("linear")), F.push(...we);
          for (let Yt = 0; Yt < we.length; Yt++)
            W.push(ut[Yt] + ce), X.push(Yt === 0 ? "linear" : /* @__PURE__ */ Jx(ae, Yt - 1));
        }
        nj(W, st, Q);
      }
      const N = Mt + Y;
      ej(z, F, X, W, Mt, N), O = Math.max(tt + Y, O), S = Math.max(N, S);
    };
    if (le(w)) {
      const D = qS(w, h);
      A(_, R, GS("default", D));
    } else {
      const D = OE(w, _, r, m), U = D.length;
      for (let z = 0; z < U; z++) {
        _ = _, R = R;
        const V = D[z], I = qS(V, h);
        for (const F in _)
          A(_[F], lj(R, F), GS(F, I), z, U);
      }
    }
    y = p, p += O;
  }
  return h.forEach((T, E) => {
    for (const w in T) {
      const _ = T[w];
      _.sort(ij);
      const R = [], O = [], A = [];
      for (let V = 0; V < _.length; V++) {
        const { at: I, value: F, easing: Z } = _[V];
        R.push(F), O.push(/* @__PURE__ */ Ps(0, S, I)), A.push(Z || "easeOut");
      }
      O[0] !== 0 && (O.unshift(0), R.unshift(R[0]), A.unshift(aj)), O[O.length - 1] !== 1 && (O.push(1), R.push(null)), d.has(E) || d.set(E, {
        keyframes: {},
        transition: {}
      });
      const D = d.get(E);
      D.keyframes[w] = R;
      const { type: U, ...z } = i;
      D.transition[w] = {
        ...z,
        duration: S,
        ease: A,
        times: O,
        ...o
      };
    }
  }), d;
}
function qS(n, i) {
  return !i.has(n) && i.set(n, {}), i.get(n);
}
function GS(n, i) {
  return i[n] || (i[n] = []), i[n];
}
function rj(n) {
  return Array.isArray(n) ? n : [n];
}
function lj(n, i) {
  return n && n[i] ? {
    ...n,
    ...n[i]
  } : { ...n };
}
const uj = (n) => typeof n == "number", cj = (n) => n.every(uj);
function fj(n) {
  const i = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, o = kc(n) && !PT(n) ? new eE(i) : new ZT(i);
  o.mount(n), rl.set(n, o);
}
function dj(n) {
  const i = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, o = new DD(i);
  o.mount(n), rl.set(n, o);
}
function hj(n, i) {
  return le(n) || typeof n == "number" || typeof n == "string" && !Wp(i);
}
function DE(n, i, o, r) {
  const l = [];
  if (hj(n, i))
    l.push(uE(n, Wp(i) && i.default || i, o && (o.default || o)));
  else {
    if (n == null)
      return l;
    const f = OE(n, i, r), d = f.length;
    for (let h = 0; h < d; h++) {
      const m = f[h], g = m instanceof Element ? fj : dj;
      rl.has(m) || g(m);
      const y = rl.get(m), p = { ...o };
      "delay" in p && typeof p.delay == "function" && (p.delay = p.delay(h, d)), l.push(...Pp(y, { ...i, transition: p }, {}));
    }
  }
  return l;
}
function mj(n, i, o) {
  const r = [], l = n.map((d) => {
    if (Array.isArray(d) && typeof d[0] == "function") {
      const h = d[0], m = La(0);
      return m.on("change", h), d.length === 1 ? [m, [0, 1]] : d.length === 2 ? [m, [0, 1], d[1]] : [m, d[1], d[2]];
    }
    return d;
  });
  return sj(l, i, o, { spring: ol }).forEach(({ keyframes: d, transition: h }, m) => {
    r.push(...DE(m, d, h));
  }), r;
}
function pj(n) {
  return Array.isArray(n) && n.some(Array.isArray);
}
function ME(n = {}) {
  const { scope: i, reduceMotion: o, skipAnimations: r } = n;
  function l(f, d, h) {
    let m = [], g;
    const y = {};
    if (o !== void 0 && (y.reduceMotion = o), r !== void 0 && (y.skipAnimations = r), pj(f)) {
      const { onComplete: S, ...T } = d || {};
      typeof S == "function" && (g = S), m = mj(f, { ...y, ...T }, i);
    } else {
      const { onComplete: S, ...T } = h || {};
      typeof S == "function" && (g = S), m = DE(f, d, { ...y, ...T }, i);
    }
    const p = new bO(m);
    return g && p.finished.then(g), i && (i.animations.push(p), p.finished.then(() => {
      Bs(i.animations, p);
    })), p;
  }
  return l;
}
const Hs = ME();
function gj() {
  const n = Oo(() => ({
    current: null,
    // Will be hydrated by React
    animations: []
  })), i = JN() ?? void 0, { skipAnimations: o } = v.useContext(Qi), r = v.useMemo(() => ME({ scope: n, reduceMotion: i, skipAnimations: o }), [n, i, o]);
  return $N(() => {
    n.animations.forEach((l) => l.stop()), n.animations.length = 0;
  }), [n, r];
}
const xt = XN;
function Ve() {
  return Jp(), !0;
}
const ct = {
  duration: { get instant() {
    return typeof matchMedia < "u" && matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.15;
  }, fast: 0.15, standard: 0.15, considered: 0.15 },
  ease: {
    enter: [0.16, 1, 0.3, 1],
    standard: [0.22, 1, 0.36, 1]
  },
  spring: {
    /** Presses, toggles, thumbs, and small indicators. Settles fast with a hint of life. */
    snappy: { type: "spring", visualDuration: 0.26, bounce: 0.12 },
    /** Panels, height changes, and layout shifts. Critically damped, never overshoots. */
    smooth: { type: "spring", visualDuration: 0.4, bounce: 0 },
    /** Shape morphs, shared layout highlights, and width changes that follow new content. */
    morph: { type: "spring", visualDuration: 0.42, bounce: 0.16 }
  },
  /** Blur radii in px for text and content crossfades. Keep blur small and brief. */
  blur: { subtle: 0, soft: 0 }
}, yj = "_field_1y387_3", vj = "_label_1y387_5", bj = "_inputs_1y387_7", Sj = "_slot_1y387_9", xj = "_input_1y387_7", Tj = "_messageSlot_1y387_37", Ej = "_description_1y387_39", Cj = "_error_1y387_39", wj = "_words_1y387_45", _j = "_word_1y387_45", Aj = "_srOnly_1y387_49", Wn = {
  field: yj,
  label: vj,
  inputs: bj,
  slot: Sj,
  input: xj,
  messageSlot: Tj,
  description: Ej,
  error: Cj,
  words: wj,
  word: _j,
  srOnly: Aj
};
function Rj({ text: n }) {
  Ve();
  const i = n.split(" ");
  return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsx("span", { className: Wn.srOnly, children: n }),
    /* @__PURE__ */ x.jsx("span", { className: Wn.words, "aria-hidden": "true", children: /* @__PURE__ */ x.jsx(ie, { initial: !1, mode: "popLayout", children: i.map((o, r) => /* @__PURE__ */ x.jsx(
      xt.span,
      {
        className: Wn.word,
        initial: { opacity: 0 },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, transition: { duration: 0 } },
        transition: { duration: ct.duration.instant },
        children: r < i.length - 1 ? `${o} ` : o
      },
      `${r}:${o}`
    )) }) })
  ] });
}
function YS({ id: n, text: i, className: o, alert: r }) {
  return /* @__PURE__ */ x.jsx(ie, { initial: !1, children: i ? /* @__PURE__ */ x.jsx(Oj, { id: n, text: i, className: o, alert: r }, "message") : null });
}
function Oj({ id: n, text: i, className: o, alert: r }) {
  Ve();
  const l = v.useRef(null), [f, d] = v.useState("auto");
  return v.useEffect(() => {
    const h = l.current;
    if (!h || typeof ResizeObserver > "u") return;
    const m = new ResizeObserver(([g]) => d(g?.borderBoxSize?.[0]?.blockSize ?? h.offsetHeight));
    return m.observe(h), () => m.disconnect();
  }, []), /* @__PURE__ */ x.jsx(xt.span, { className: Wn.messageSlot, initial: { height: 0, opacity: 0 }, animate: { height: f, opacity: 1 }, exit: { height: 0, opacity: 0, transition: { duration: 0 } }, transition: { duration: 0 }, children: /* @__PURE__ */ x.jsx(xt.span, { ref: l, id: n, className: o, role: r ? "alert" : void 0, initial: !1, animate: { y: 0, filter: "blur(0px)" }, transition: { duration: 0, ease: [...ct.ease.enter] }, children: /* @__PURE__ */ x.jsx(Rj, { text: i }) }) });
}
function Dj({ length: n = 6, value: i = "", onChange: o, label: r, description: l, error: f, autoFocus: d = !1, disabled: h = !1, inputMode: m = "numeric", className: g }) {
  const y = v.useId(), p = Ve(), [S, T] = gj(), E = v.useRef([]), w = Array.from({ length: n }, (q, X) => i[X] ?? ""), _ = l ? `${y}-description` : void 0, R = f ? `${y}-error` : void 0, O = [_, R].filter(Boolean).join(" ") || void 0, A = (q) => E.current[Math.max(0, Math.min(q, n - 1))]?.focus(), D = (q) => m === "numeric" ? q.replace(/\D/g, "") : q, [U, z] = v.useState({ x: 0, width: 0, shown: !1, glide: !1 }), [V, I] = v.useState({ value: i, wave: !1 });
  V.value !== i && I({ value: i, wave: Array.from({ length: n }, (q, X) => (V.value[X] ?? "") !== (i[X] ?? "")).filter(Boolean).length > 1 });
  const F = v.useRef(f);
  v.useEffect(() => {
    d && E.current[0]?.focus();
  }, [d]), v.useEffect(() => {
    const q = S.current;
    if (!q || typeof ResizeObserver > "u") return;
    const X = new ResizeObserver(() => {
      const Y = q.contains(document.activeElement) ? document.activeElement?.parentElement : null;
      Y && z((tt) => tt.x === Y.offsetLeft && tt.width === Y.offsetWidth ? tt : { ...tt, x: Y.offsetLeft, width: Y.offsetWidth, glide: !1 });
    });
    return X.observe(q), () => X.disconnect();
  }, [S]), v.useEffect(() => {
    f && F.current, F.current = f;
  }, [f, p, T, S]);
  const Z = (q, X) => {
    const Y = w.slice(), tt = D(X).slice(-1);
    Y[q] = tt, o?.(Y.join("")), tt && q < n - 1 && A(q + 1);
  }, W = (q, X) => {
    const Y = D(X.target.value);
    if (Y.length <= 1) {
      Z(q, Y);
      return;
    }
    const tt = w.slice();
    Y.slice(0, n - q).split("").forEach((lt, Dt) => {
      tt[q + Dt] = lt;
    }), o?.(tt.join("")), A(Math.min(q + Y.length, n - 1));
  }, et = (q, X) => {
    X.preventDefault();
    const Y = D(X.clipboardData.getData("text")).slice(0, n - q);
    if (!Y) return;
    const tt = w.slice();
    Y.split("").forEach((lt, Dt) => {
      tt[q + Dt] = lt;
    }), o?.(tt.join("")), A(Math.min(q + Y.length, n - 1));
  }, st = (q, X) => {
    if (X.key === "ArrowLeft" && (X.preventDefault(), A(q - 1)), X.key === "ArrowRight" && (X.preventDefault(), A(q + 1)), X.key === "Backspace" && !w[q] && q > 0) {
      X.preventDefault();
      const Y = w.slice();
      Y[q - 1] = "", o?.(Y.join("")), A(q - 1);
    }
    if (X.key === "Delete" && w[q]) {
      const Y = w.slice();
      Y[q] = "", o?.(Y.join(""));
    }
  }, ft = (q) => {
    const X = q.currentTarget.parentElement;
    z((Y) => ({ x: X.offsetLeft, width: X.offsetWidth, shown: !0, glide: Y.shown }));
  }, ht = (q) => {
    S.current?.contains(q.relatedTarget) || z((X) => ({ ...X, shown: !1, glide: !1 }));
  };
  return /* @__PURE__ */ x.jsxs("div", { className: [Wn.field, g].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ x.jsx("span", { className: Wn.label, children: r }),
    /* @__PURE__ */ x.jsx("div", { ref: S, className: Wn.inputs, role: "group", "aria-label": r, "data-invalid": f ? "true" : void 0, children: w.map((q, X) => /* @__PURE__ */ x.jsx("div", { className: Wn.slot, children: /* @__PURE__ */ x.jsx(
      "input",
      {
        ref: (Y) => {
          E.current[X] = Y;
        },
        className: Wn.input,
        "aria-label": `${r}, digit ${X + 1} of ${n}`,
        "aria-describedby": O,
        "aria-invalid": f ? !0 : void 0,
        value: q,
        "data-filled": q ? "true" : void 0,
        maxLength: 1,
        inputMode: m,
        autoComplete: X === 0 ? "one-time-code" : "off",
        disabled: h,
        onChange: (Y) => W(X, Y),
        onPaste: (Y) => et(X, Y),
        onKeyDown: (Y) => st(X, Y),
        onFocus: ft,
        onBlur: ht
      }
    ) }, `${y}-${X}`)) }),
    /* @__PURE__ */ x.jsx(YS, { id: _, text: l, className: Wn.description }),
    /* @__PURE__ */ x.jsx(YS, { id: R, text: f, className: Wn.error, alert: !0 })
  ] });
}
var Mj = Object.defineProperty, Pn = (n, i) => Mj(n, "name", { value: i, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Nj(n, i) {
  const o = v.createContext(i);
  o.displayName = n + "Context";
  const r = /* @__PURE__ */ Pn((f) => {
    const { children: d, ...h } = f, m = v.useMemo(() => h, Object.values(h));
    return /* @__PURE__ */ x.jsx(o.Provider, { value: m, children: d });
  }, "Provider");
  r.displayName = n + "Provider";
  function l(f, d = {}) {
    const { optional: h = !1 } = d, m = v.useContext(o);
    if (m) return m;
    if (i !== void 0) return i;
    if (!h)
      throw new Error(`\`${f}\` must be used within \`${n}\``);
  }
  return Pn(l, "useContext"), [r, l];
}
Pn(Nj, "createContext");
// @__NO_SIDE_EFFECTS__
function ii(n, i = []) {
  let o = [];
  function r(f, d) {
    const h = v.createContext(d);
    h.displayName = f + "Context";
    const m = o.length;
    o = [...o, d];
    const g = /* @__PURE__ */ Pn((p) => {
      const { scope: S, children: T, ...E } = p, w = S?.[n]?.[m] || h, _ = v.useMemo(() => E, Object.values(E));
      return /* @__PURE__ */ x.jsx(w.Provider, { value: _, children: T });
    }, "Provider");
    g.displayName = f + "Provider";
    function y(p, S, T = {}) {
      const { optional: E = !1 } = T, w = S?.[n]?.[m] || h, _ = v.useContext(w);
      if (_) return _;
      if (d !== void 0) return d;
      if (!E)
        throw new Error(`\`${p}\` must be used within \`${f}\``);
    }
    return Pn(y, "useContext"), [g, y];
  }
  Pn(r, "createContext");
  const l = /* @__PURE__ */ Pn(() => {
    const f = o.map((d) => v.createContext(d));
    return /* @__PURE__ */ Pn(function(h) {
      const m = h?.[n] || f;
      return v.useMemo(
        () => ({ [`__scope${n}`]: { ...h, [n]: m } }),
        [h, m]
      );
    }, "useScope");
  }, "createScope");
  return l.scopeName = n, [r, NE(l, ...i)];
}
Pn(ii, "createContextScope");
function NE(...n) {
  const i = n[0];
  if (n.length === 1) return i;
  const o = /* @__PURE__ */ Pn(() => {
    const r = n.map((l) => ({
      useScope: l(),
      scopeName: l.scopeName
    }));
    return /* @__PURE__ */ Pn(function(f) {
      const d = r.reduce((h, { useScope: m, scopeName: g }) => {
        const p = m(f)[`__scope${g}`];
        return { ...h, ...p };
      }, {});
      return v.useMemo(() => ({ [`__scope${i.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return o.scopeName = i.scopeName, o;
}
Pn(NE, "composeContextScopes");
var jj = Object.defineProperty, tg = (n, i) => jj(n, "name", { value: i, configurable: !0 });
function Jm(n, i) {
  if (typeof n == "function")
    return n(i);
  n != null && (n.current = i);
}
tg(Jm, "setRef");
function jE(...n) {
  return (i) => {
    let o = !1;
    const r = n.map((l) => {
      const f = Jm(l, i);
      return !o && typeof f == "function" && (o = !0), f;
    });
    if (o)
      return () => {
        for (let l = 0; l < r.length; l++) {
          const f = r[l];
          typeof f == "function" ? f() : Jm(n[l], null);
        }
      };
  };
}
tg(jE, "composeRefs");
function Jt(...n) {
  return v.useCallback(jE(...n), n);
}
tg(Jt, "useComposedRefs");
var zj = Object.defineProperty, In = (n, i) => zj(n, "name", { value: i, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Va(n) {
  const i = v.forwardRef((o, r) => {
    let { children: l, ...f } = o, d = null, h = !1;
    const m = [];
    Wm(l) && typeof ic == "function" && (l = ic(l._payload)), v.Children.forEach(l, (S) => {
      if (PE(S)) {
        h = !0;
        const T = S;
        let E = "child" in T.props ? T.props.child : T.props.children;
        Wm(E) && typeof ic == "function" && (E = ic(E._payload)), d = Lj(T, E), m.push(d?.props?.children);
      } else
        m.push(S);
    }), d ? d = v.cloneElement(d, void 0, m) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !h && v.Children.count(l) === 1 && v.isValidElement(l) && (d = l)
    );
    const g = d ? BE(d) : void 0, y = Jt(r, g);
    if (!d) {
      if (l || l === 0)
        throw new Error(
          h ? Pj(n) : Bj(n)
        );
      return l;
    }
    const p = VE(f, d.props ?? {});
    return d.type !== v.Fragment && (p.ref = r ? y : g), v.cloneElement(d, p);
  });
  return i.displayName = `${n}.Slot`, i;
}
In(Va, "createSlot");
var zE = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function LE(n) {
  const i = /* @__PURE__ */ In((o) => "child" in o ? o.children(o.child) : o.children, "Slottable");
  return i.displayName = `${n}.Slottable`, i.__radixId = zE, i;
}
In(LE, "createSlottable");
var Lj = /* @__PURE__ */ In((n, i) => {
  if ("child" in n.props) {
    const o = n.props.child;
    return v.isValidElement(o) ? v.cloneElement(o, void 0, n.props.children(o.props.children)) : null;
  }
  return v.isValidElement(i) ? i : null;
}, "getSlottableElementFromSlottable");
function VE(n, i) {
  const o = { ...i };
  for (const r in i) {
    const l = n[r], f = i[r];
    /^on[A-Z]/.test(r) ? l && f ? o[r] = (...h) => {
      const m = f(...h);
      return l(...h), m;
    } : l && (o[r] = l) : r === "style" ? o[r] = { ...l, ...f } : r === "className" ? o[r] = [l, f].filter(Boolean).join(" ") : r === "aria-describedby" && (o[r] = HE(f, l));
  }
  return { ...n, ...o };
}
In(VE, "mergeProps");
function BE(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, o = i && "isReactWarning" in i && i.isReactWarning;
  return o ? n.ref : (i = Object.getOwnPropertyDescriptor(n, "ref")?.get, o = i && "isReactWarning" in i && i.isReactWarning, o ? n.props.ref : n.props.ref || n.ref);
}
In(BE, "getElementRef");
function PE(n) {
  return v.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === zE;
}
In(PE, "isSlottable");
var Vj = /* @__PURE__ */ Symbol.for("react.lazy");
function Wm(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === Vj && "_payload" in n && UE(n._payload);
}
In(Wm, "isLazyComponent");
function UE(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
In(UE, "isPromiseLike");
function HE(...n) {
  const i = /* @__PURE__ */ new Set();
  for (const o of n)
    if (typeof o == "string")
      for (const r of String(o).trim().split(/\s+/))
        r && i.add(r);
  return i.size > 0 ? Array.from(i).join(" ") : void 0;
}
In(HE, "concatAriaDescribedby");
var Bj = /* @__PURE__ */ In((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Pj = /* @__PURE__ */ In((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), ic = qs[" use ".trim().toString()], Uj = Object.defineProperty, Le = (n, i) => Uj(n, "name", { value: i, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Kc(n) {
  const i = n + "CollectionProvider", [o, r] = /* @__PURE__ */ ii(i), [l, f] = o(
    i,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ Le((w) => {
    const { scope: _, children: R } = w, O = v.useRef(null), A = v.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ x.jsx(l, { scope: _, itemMap: A, collectionRef: O, children: R });
  }, "CollectionProvider");
  d.displayName = i;
  const h = n + "CollectionSlot", m = /* @__PURE__ */ Va(h), g = v.forwardRef(
    (w, _) => {
      const { scope: R, children: O } = w, A = f(h, R), D = Jt(_, A.collectionRef);
      return /* @__PURE__ */ x.jsx(m, { ref: D, children: O });
    }
  );
  g.displayName = h;
  const y = n + "CollectionItemSlot", p = "data-radix-collection-item", S = /* @__PURE__ */ Va(y), T = v.forwardRef(
    (w, _) => {
      const { scope: R, children: O, ...A } = w, D = v.useRef(null), U = Jt(_, D), z = f(y, R);
      return v.useEffect(() => (z.itemMap.set(D, { ref: D, ...A }), () => {
        z.itemMap.delete(D);
      })), /* @__PURE__ */ x.jsx(S, { [p]: "", ref: U, children: O });
    }
  );
  T.displayName = y;
  function E(w) {
    const _ = f(n + "CollectionConsumer", w);
    return v.useCallback(() => {
      const O = _.collectionRef.current;
      if (!O) return [];
      const A = Array.from(O.querySelectorAll(`[${p}]`));
      return Array.from(_.itemMap.values()).sort(
        (z, V) => A.indexOf(z.ref.current) - A.indexOf(V.ref.current)
      );
    }, [_.collectionRef, _.itemMap]);
  }
  return Le(E, "useCollection"), [
    { Provider: d, Slot: g, ItemSlot: T },
    E,
    r
  ];
}
Le(Kc, "createCollection");
var kS = /* @__PURE__ */ new WeakMap(), Se, Tn, cm = (Tn = class extends Map {
  constructor(o) {
    super(o);
    l1(this, Se);
    Hh(this, Se, [...super.keys()]), kS.set(this, !0);
  }
  set(o, r) {
    return kS.get(this) && (this.has(o) ? Ke(this, Se)[Ke(this, Se).indexOf(o)] = o : Ke(this, Se).push(o)), super.set(o, r), this;
  }
  insert(o, r, l) {
    const f = this.has(r), d = Ke(this, Se).length, h = eg(o);
    let m = h >= 0 ? h : d + h;
    const g = m < 0 || m >= d ? -1 : m;
    if (g === this.size || f && g === this.size - 1 || g === -1)
      return this.set(r, l), this;
    const y = this.size + (f ? 0 : 1);
    h < 0 && m++;
    const p = [...Ke(this, Se)];
    let S, T = !1;
    for (let E = m; E < y; E++)
      if (m === E) {
        let w = p[E];
        p[E] === r && (w = p[E + 1]), f && this.delete(r), S = this.get(w), this.set(r, l);
      } else {
        !T && p[E - 1] === r && (T = !0);
        const w = p[T ? E : E - 1], _ = S;
        S = this.get(w), this.delete(w), this.set(w, _);
      }
    return this;
  }
  with(o, r, l) {
    const f = new Tn(this);
    return f.insert(o, r, l), f;
  }
  before(o) {
    const r = Ke(this, Se).indexOf(o) - 1;
    if (!(r < 0))
      return this.entryAt(r);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(o, r, l) {
    const f = Ke(this, Se).indexOf(o);
    return f === -1 ? this : this.insert(f, r, l);
  }
  after(o) {
    let r = Ke(this, Se).indexOf(o);
    if (r = r === -1 || r === this.size - 1 ? -1 : r + 1, r !== -1)
      return this.entryAt(r);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(o, r, l) {
    const f = Ke(this, Se).indexOf(o);
    return f === -1 ? this : this.insert(f + 1, r, l);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return Hh(this, Se, []), super.clear();
  }
  delete(o) {
    const r = super.delete(o);
    return r && Ke(this, Se).splice(Ke(this, Se).indexOf(o), 1), r;
  }
  deleteAt(o) {
    const r = this.keyAt(o);
    return r !== void 0 ? this.delete(r) : !1;
  }
  at(o) {
    const r = Tc(Ke(this, Se), o);
    if (r !== void 0)
      return this.get(r);
  }
  entryAt(o) {
    const r = Tc(Ke(this, Se), o);
    if (r !== void 0)
      return [r, this.get(r)];
  }
  indexOf(o) {
    return Ke(this, Se).indexOf(o);
  }
  keyAt(o) {
    return Tc(Ke(this, Se), o);
  }
  from(o, r) {
    const l = this.indexOf(o);
    if (l === -1)
      return;
    let f = l + r;
    return f < 0 && (f = 0), f >= this.size && (f = this.size - 1), this.at(f);
  }
  keyFrom(o, r) {
    const l = this.indexOf(o);
    if (l === -1)
      return;
    let f = l + r;
    return f < 0 && (f = 0), f >= this.size && (f = this.size - 1), this.keyAt(f);
  }
  find(o, r) {
    let l = 0;
    for (const f of this) {
      if (Reflect.apply(o, r, [f, l, this]))
        return f;
      l++;
    }
  }
  findIndex(o, r) {
    let l = 0;
    for (const f of this) {
      if (Reflect.apply(o, r, [f, l, this]))
        return l;
      l++;
    }
    return -1;
  }
  filter(o, r) {
    const l = [];
    let f = 0;
    for (const d of this)
      Reflect.apply(o, r, [d, f, this]) && l.push(d), f++;
    return new Tn(l);
  }
  map(o, r) {
    const l = [];
    let f = 0;
    for (const d of this)
      l.push([d[0], Reflect.apply(o, r, [d, f, this])]), f++;
    return new Tn(l);
  }
  reduce(...o) {
    const [r, l] = o;
    let f = 0, d = l ?? this.at(0);
    for (const h of this)
      f === 0 && o.length === 1 ? d = h : d = Reflect.apply(r, this, [d, h, f, this]), f++;
    return d;
  }
  reduceRight(...o) {
    const [r, l] = o;
    let f = l ?? this.at(-1);
    for (let d = this.size - 1; d >= 0; d--) {
      const h = this.at(d);
      d === this.size - 1 && o.length === 1 ? f = h : f = Reflect.apply(r, this, [f, h, d, this]);
    }
    return f;
  }
  toSorted(o) {
    const r = [...this.entries()].sort(o);
    return new Tn(r);
  }
  toReversed() {
    const o = new Tn();
    for (let r = this.size - 1; r >= 0; r--) {
      const l = this.keyAt(r), f = this.get(l);
      o.set(l, f);
    }
    return o;
  }
  toSpliced(...o) {
    const r = [...this.entries()];
    return r.splice(...o), new Tn(r);
  }
  slice(o, r) {
    const l = new Tn();
    let f = this.size - 1;
    if (o === void 0)
      return l;
    o < 0 && (o = o + this.size), r !== void 0 && r > 0 && (f = r - 1);
    for (let d = o; d <= f; d++) {
      const h = this.keyAt(d), m = this.get(h);
      l.set(h, m);
    }
    return l;
  }
  every(o, r) {
    let l = 0;
    for (const f of this) {
      if (!Reflect.apply(o, r, [f, l, this]))
        return !1;
      l++;
    }
    return !0;
  }
  some(o, r) {
    let l = 0;
    for (const f of this) {
      if (Reflect.apply(o, r, [f, l, this]))
        return !0;
      l++;
    }
    return !1;
  }
}, Se = new WeakMap(), Le(Tn, "OrderedDict"), Tn);
function Tc(n, i) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, i);
  const o = IE(n, i);
  return o === -1 ? void 0 : n[o];
}
Le(Tc, "at");
function IE(n, i) {
  const o = n.length, r = eg(i), l = r >= 0 ? r : o + r;
  return l < 0 || l >= o ? -1 : l;
}
Le(IE, "toSafeIndex");
function eg(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
Le(eg, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function Hj(n) {
  const i = n + "CollectionProvider", [o, r] = /* @__PURE__ */ ii(i), [l, f] = o(
    i,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new cm(),
      setItemMap: /* @__PURE__ */ Le(() => {
      }, "setItemMap")
    }
  ), d = /* @__PURE__ */ Le(({ state: A, ...D }) => A ? /* @__PURE__ */ x.jsx(m, { ...D, state: A }) : /* @__PURE__ */ x.jsx(h, { ...D }), "CollectionProvider");
  d.displayName = i;
  const h = /* @__PURE__ */ Le((A) => {
    const D = _();
    return /* @__PURE__ */ x.jsx(m, { ...A, state: D });
  }, "CollectionInit");
  h.displayName = i + "Init";
  const m = /* @__PURE__ */ Le((A) => {
    const { scope: D, children: U, state: z } = A, V = v.useRef(null), [I, F] = v.useState(
      null
    ), Z = Jt(V, F), [W, et] = z;
    return v.useEffect(() => {
      if (!I) return;
      const st = YE(() => {
      });
      return st.observe(I, {
        childList: !0,
        subtree: !0
      }), () => {
        st.disconnect();
      };
    }, [I]), /* @__PURE__ */ x.jsx(
      l,
      {
        scope: D,
        itemMap: W,
        setItemMap: et,
        collectionRef: Z,
        collectionRefObject: V,
        collectionElement: I,
        children: U
      }
    );
  }, "CollectionProviderImpl");
  m.displayName = i + "Impl";
  const g = n + "CollectionSlot", y = /* @__PURE__ */ Va(g), p = v.forwardRef(
    (A, D) => {
      const { scope: U, children: z } = A, V = f(g, U), I = Jt(D, V.collectionRef);
      return /* @__PURE__ */ x.jsx(y, { ref: I, children: z });
    }
  );
  p.displayName = g;
  const S = n + "CollectionItemSlot", T = "data-radix-collection-item", E = /* @__PURE__ */ Va(S), w = v.forwardRef(
    (A, D) => {
      const { scope: U, children: z, ...V } = A, I = v.useRef(null), [F, Z] = v.useState(null), W = Jt(D, I, Z), et = f(S, U), { setItemMap: st } = et, ft = v.useRef(V);
      qE(ft.current, V) || (ft.current = V);
      const ht = ft.current;
      return v.useEffect(() => {
        const q = ht;
        return st((X) => F ? X.has(F) ? X.set(F, { ...q, element: F }).toSorted(tp) : (X.set(F, { ...q, element: F }), X.toSorted(tp)) : X), () => {
          st((X) => !F || !X.has(F) ? X : (X.delete(F), new cm(X)));
        };
      }, [F, ht, st]), /* @__PURE__ */ x.jsx(E, { [T]: "", ref: W, children: z });
    }
  );
  w.displayName = S;
  function _() {
    return v.useState(new cm());
  }
  Le(_, "useInitCollection");
  function R(A) {
    const { itemMap: D } = f(n + "CollectionConsumer", A);
    return D;
  }
  return Le(R, "useCollection"), [
    { Provider: d, Slot: p, ItemSlot: w },
    {
      createCollectionScope: r,
      useCollection: R,
      useInitCollection: _
    }
  ];
}
Le(Hj, "createCollection");
function qE(n, i) {
  if (n === i) return !0;
  if (typeof n != "object" || typeof i != "object" || n == null || i == null) return !1;
  const o = Object.keys(n), r = Object.keys(i);
  if (o.length !== r.length) return !1;
  for (const l of o)
    if (!Object.prototype.hasOwnProperty.call(i, l) || n[l] !== i[l]) return !1;
  return !0;
}
Le(qE, "shallowEqual");
function GE(n, i) {
  return !!(i.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
Le(GE, "isElementPreceding");
function tp(n, i) {
  return !n[1].element || !i[1].element ? 0 : GE(n[1].element, i[1].element) ? -1 : 1;
}
Le(tp, "sortByDocumentPosition");
function YE(n) {
  return new MutationObserver((o) => {
    for (const r of o)
      if (r.type === "childList") {
        n();
        return;
      }
  });
}
Le(YE, "getChildListObserver");
var Ij = Object.defineProperty, Fs = (n, i) => Ij(n, "name", { value: i, configurable: !0 }), kE = !!(typeof window < "u" && window.document && window.document.createElement);
function At(n, i, { checkForDefaultPrevented: o = !0 } = {}) {
  return /* @__PURE__ */ Fs(function(l) {
    if (n?.(l), o === !1 || !l || !l.defaultPrevented)
      return i?.(l);
  }, "handleEvent");
}
Fs(At, "composeEventHandlers");
function qj(n) {
  if (!kE)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
Fs(qj, "getOwnerWindow");
function ep(n) {
  if (!kE)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
Fs(ep, "getOwnerDocument");
function FE(n, i = !1) {
  const { activeElement: o } = ep(n);
  if (!o?.nodeName)
    return null;
  if (XE(o) && o.contentDocument)
    return FE(o.contentDocument.body, i);
  if (i) {
    const r = o.getAttribute("aria-activedescendant");
    if (r) {
      const l = ep(o).getElementById(r);
      if (l)
        return l;
    }
  }
  return o;
}
Fs(FE, "getActiveElement");
function XE(n) {
  return n.tagName === "IFRAME";
}
Fs(XE, "isFrame");
var ue = globalThis?.document ? v.useLayoutEffect : () => {
}, Gj = Object.defineProperty, Yj = (n, i) => Gj(n, "name", { value: i, configurable: !0 }), FS = qs[" useEffectEvent ".trim().toString()], XS = qs[" useInsertionEffect ".trim().toString()];
function $E(n) {
  if (typeof FS == "function")
    return FS(n);
  const i = v.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof XS == "function" ? XS(() => {
    i.current = n;
  }) : ue(() => {
    i.current = n;
  }), v.useMemo(() => ((...o) => i.current?.(...o)), []);
}
Yj($E, "useEffectEvent");
var kj = Object.defineProperty, Sl = (n, i) => kj(n, "name", { value: i, configurable: !0 }), Fj = qs[" useInsertionEffect ".trim().toString()] || ue;
function wi({
  prop: n,
  defaultProp: i,
  onChange: o = /* @__PURE__ */ Sl(() => {
  }, "onChange"),
  caller: r
}) {
  const [l, f, d] = KE({
    defaultProp: i,
    onChange: o
  }), h = n !== void 0, m = h ? n : l, g = v.useCallback(
    (y) => {
      if (h) {
        const p = ZE(y) ? y(n) : y;
        p !== n && d.current?.(p);
      } else
        f(y);
    },
    [h, n, f, d]
  );
  return [m, g];
}
Sl(wi, "useControllableState");
function KE({
  defaultProp: n,
  onChange: i
}) {
  const [o, r] = v.useState(n), l = v.useRef(o), f = v.useRef(i);
  return Fj(() => {
    f.current = i;
  }, [i]), v.useEffect(() => {
    l.current !== o && (f.current?.(o), l.current = o);
  }, [o, l]), [o, r, f];
}
Sl(KE, "useUncontrolledState");
function ZE(n) {
  return typeof n == "function";
}
Sl(ZE, "isFunction");
var $S = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function Xj(n, i, o, r) {
  const { prop: l, defaultProp: f, onChange: d, caller: h } = i, m = l !== void 0, g = $E(d), y = [{ ...o, state: f }];
  r && y.push(r);
  const [p, S] = v.useReducer(
    (_, R) => {
      if (R.type === $S)
        return { ..._, state: R.state };
      const O = n(_, R);
      return m && !Object.is(O.state, _.state) && g(O.state), O;
    },
    ...y
  ), T = p.state, E = v.useRef(T);
  v.useEffect(() => {
    E.current !== T && (E.current = T, m || g(T));
  }, [T, E, m]);
  const w = v.useMemo(() => l !== void 0 ? { ...p, state: l } : p, [p, l]);
  return v.useEffect(() => {
    m && !Object.is(l, p.state) && S({ type: $S, state: l });
  }, [l, p.state, m]), [w, S];
}
Sl(Xj, "useControllableStateReducer");
var xl = Bx(), $j = Object.defineProperty, Kj = (n, i) => $j(n, "name", { value: i, configurable: !0 }), Zj = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], qt = Zj.reduce((n, i) => {
  const o = /* @__PURE__ */ Va(`Primitive.${i}`), r = v.forwardRef((l, f) => {
    const { asChild: d, ...h } = l, m = d ? o : i;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ x.jsx(m, { ...h, ref: f });
  });
  return r.displayName = `Primitive.${i}`, { ...n, [i]: r };
}, {});
function QE(n, i) {
  n && xl.flushSync(() => n.dispatchEvent(i));
}
Kj(QE, "dispatchDiscreteCustomEvent");
var Qj = Object.defineProperty, Wi = (n, i) => Qj(n, "name", { value: i, configurable: !0 });
function JE(n, i) {
  return v.useReducer((o, r) => i[o][r] ?? o, n);
}
Wi(JE, "useStateMachine");
var Ha = /* @__PURE__ */ Wi((n) => {
  const { present: i, children: o } = n, r = WE(i), l = typeof o == "function" ? o({ present: r.isPresent }) : v.Children.only(o), f = tC(r.ref, eC(l));
  return typeof o == "function" || r.isPresent ? v.cloneElement(l, { ref: f }) : null;
}, "Presence");
function WE(n) {
  const [i, o] = v.useState(), r = v.useRef(null), l = v.useRef(n), f = v.useRef("none"), d = v.useRef(void 0), h = n ? "mounted" : "unmounted", [m, g] = JE(h, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return v.useEffect(() => {
    m === "mounted" ? (f.current = d.current ?? Ms(r.current), d.current = void 0) : f.current = "none";
  }, [m]), ue(() => {
    const y = r.current, p = l.current;
    if (p !== n) {
      const T = f.current, E = Ms(y);
      n ? (d.current = E, g("MOUNT")) : E === "none" || y?.display === "none" ? g("UNMOUNT") : g(p && T !== E ? "ANIMATION_OUT" : "UNMOUNT"), l.current = n;
    }
  }, [n, g]), ue(() => {
    if (i) {
      let y;
      const p = i.ownerDocument.defaultView ?? window, S = /* @__PURE__ */ Wi((E) => {
        const _ = Ms(r.current).includes(CSS.escape(E.animationName));
        if (E.target === i && _ && (g("ANIMATION_END"), !l.current)) {
          const R = i.style.animationFillMode;
          i.style.animationFillMode = "forwards", y = p.setTimeout(() => {
            i.style.animationFillMode === "forwards" && (i.style.animationFillMode = R);
          });
        }
      }, "handleAnimationEnd"), T = /* @__PURE__ */ Wi((E) => {
        E.target === i && (f.current = Ms(r.current));
      }, "handleAnimationStart");
      return i.addEventListener("animationstart", T), i.addEventListener("animationcancel", S), i.addEventListener("animationend", S), () => {
        p.clearTimeout(y), i.removeEventListener("animationstart", T), i.removeEventListener("animationcancel", S), i.removeEventListener("animationend", S);
      };
    } else
      g("ANIMATION_END");
  }, [i, g]), {
    isPresent: ["mounted", "unmountSuspended"].includes(m),
    ref: v.useCallback((y) => {
      if (y) {
        const p = getComputedStyle(y);
        r.current = p, d.current = Ms(p);
      } else
        r.current = null;
      o(y);
    }, [])
  };
}
Wi(WE, "usePresence");
function np(n, i) {
  if (typeof n == "function")
    return n(i);
  n != null && (n.current = i);
}
Wi(np, "setRef");
function tC(...n) {
  const i = v.useRef(n);
  return i.current = n, v.useCallback((o) => {
    const r = i.current;
    let l = !1;
    const f = r.map((d) => {
      const h = np(d, o);
      return !l && typeof h == "function" && (l = !0), h;
    });
    if (l)
      return () => {
        for (let d = 0; d < f.length; d++) {
          const h = f[d];
          typeof h == "function" ? h() : np(r[d], null);
        }
      };
  }, []);
}
Wi(tC, "useStableComposedRefs");
function Ms(n) {
  return n?.animationName || "none";
}
Wi(Ms, "getAnimationName");
function eC(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, o = i && "isReactWarning" in i && i.isReactWarning;
  return o ? n.ref : (i = Object.getOwnPropertyDescriptor(n, "ref")?.get, o = i && "isReactWarning" in i && i.isReactWarning, o ? n.props.ref : n.props.ref || n.ref);
}
Wi(eC, "getElementRef");
var Jj = Object.defineProperty, Wj = (n, i) => Jj(n, "name", { value: i, configurable: !0 }), t3 = qs[" useId ".trim().toString()] || (() => {
}), e3 = 0;
function ei(n) {
  const [i, o] = v.useState(t3());
  return ue(() => {
    n || o((r) => r ?? String(e3++));
  }, [n]), n || (i ? `radix-${i}` : "");
}
Wj(ei, "useId");
var n3 = Object.defineProperty, Tl = (n, i) => n3(n, "name", { value: i, configurable: !0 }), ng = "Collapsible", [i3, nC] = /* @__PURE__ */ ii(ng), [a3, ig] = i3(ng), o3 = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Tl(function(i, o) {
    const {
      __scopeCollapsible: r,
      open: l,
      defaultOpen: f,
      disabled: d,
      onOpenChange: h,
      ...m
    } = i, [g, y] = wi({
      prop: l,
      defaultProp: f ?? !1,
      onChange: h,
      caller: ng
    });
    return /* @__PURE__ */ x.jsx(
      a3,
      {
        scope: r,
        disabled: d,
        contentId: ei(),
        open: g,
        onOpenToggle: v.useCallback(() => y((p) => !p), [y]),
        children: /* @__PURE__ */ x.jsx(
          qt.div,
          {
            "data-state": Zc(g),
            "data-disabled": d ? "" : void 0,
            ...m,
            ref: o
          }
        )
      }
    );
  }, "Collapsible")
), s3 = "CollapsibleTrigger", r3 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Tl(function(i, o) {
    const { __scopeCollapsible: r, ...l } = i, f = ig(s3, r);
    return /* @__PURE__ */ x.jsx(
      qt.button,
      {
        type: "button",
        "aria-controls": f.open ? f.contentId : void 0,
        "aria-expanded": f.open || !1,
        "data-state": Zc(f.open),
        "data-disabled": f.disabled ? "" : void 0,
        disabled: f.disabled,
        ...l,
        ref: o,
        onClick: At(i.onClick, f.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), iC = "CollapsibleContent", l3 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Tl(function(i, o) {
    const { forceMount: r, ...l } = i, f = ig(iC, i.__scopeCollapsible);
    return /* @__PURE__ */ x.jsx(Ha, { present: r || f.open, children: ({ present: d }) => /* @__PURE__ */ x.jsx(u3, { ...l, ref: o, present: d }) });
  }, "CollapsibleContent")
), u3 = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Tl(function(i, o) {
  const { __scopeCollapsible: r, present: l, children: f, ...d } = i, h = ig(iC, r), [m, g] = v.useState(l), y = v.useRef(null), p = Jt(o, y), S = v.useRef(0), T = S.current, E = v.useRef(0), w = E.current, _ = h.open || m, R = v.useRef(_), O = v.useRef(void 0);
  return v.useEffect(() => {
    const A = requestAnimationFrame(() => R.current = !1);
    return () => cancelAnimationFrame(A);
  }, []), ue(() => {
    const A = y.current;
    if (A) {
      O.current = O.current || {
        transitionDuration: A.style.transitionDuration,
        animationName: A.style.animationName
      }, A.style.transitionDuration = "0s", A.style.animationName = "none";
      const D = A.getBoundingClientRect();
      S.current = D.height, E.current = D.width, R.current || (A.style.transitionDuration = O.current.transitionDuration, A.style.animationName = O.current.animationName), g(l);
    }
  }, [h.open, l]), /* @__PURE__ */ x.jsx(
    qt.div,
    {
      "data-state": Zc(h.open),
      "data-disabled": h.disabled ? "" : void 0,
      id: h.contentId,
      hidden: !_,
      ...d,
      ref: p,
      style: {
        "--radix-collapsible-content-height": T ? `${T}px` : void 0,
        "--radix-collapsible-content-width": w ? `${w}px` : void 0,
        ...i.style
      },
      children: _ && f
    }
  );
}, "CollapsibleContentImpl"));
function Zc(n) {
  return n ? "open" : "closed";
}
Tl(Zc, "getState");
var c3 = Object.defineProperty, f3 = (n, i) => c3(n, "name", { value: i, configurable: !0 }), d3 = {
  LTR: "ltr"
}, h3 = v.createContext(void 0);
function El(n) {
  const i = v.useContext(h3);
  return n || i || d3.LTR;
}
f3(El, "useDirection");
var m3 = Object.defineProperty, Cn = (n, i) => m3(n, "name", { value: i, configurable: !0 }), p3 = {
  Multiple: "multiple"
}, Zr = {
  Vertical: "vertical",
  Horizontal: "horizontal"
}, g3 = {
  LTR: "ltr"
}, Ri = "Accordion", y3 = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [ag, v3, b3] = /* @__PURE__ */ Kc(Ri), [Qc, FP] = /* @__PURE__ */ ii(Ri, [
  b3,
  nC
]), og = nC(), S3 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(i, o) {
    const { type: r, ...l } = i, f = l, d = l;
    return /* @__PURE__ */ x.jsx(ag.Provider, { scope: i.__scopeAccordion, children: r === p3.Multiple ? /* @__PURE__ */ x.jsx(C3, { ...d, ref: o }) : /* @__PURE__ */ x.jsx(E3, { ...f, ref: o }) });
  }, "Accordion")
), [aC, x3] = Qc(Ri), [oC, T3] = Qc(
  Ri,
  { collapsible: !1 }
), E3 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(i, o) {
    const {
      value: r,
      defaultValue: l,
      onValueChange: f = /* @__PURE__ */ Cn(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...h
    } = i, [m, g] = wi({
      prop: r,
      defaultProp: l ?? "",
      onChange: f,
      caller: Ri
    });
    return /* @__PURE__ */ x.jsx(
      aC,
      {
        scope: i.__scopeAccordion,
        value: v.useMemo(() => m ? [m] : [], [m]),
        onItemOpen: g,
        onItemClose: v.useCallback(() => d && g(""), [d, g]),
        children: /* @__PURE__ */ x.jsx(oC, { scope: i.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ x.jsx(sC, { ...h, ref: o }) })
      }
    );
  }, "AccordionImplSingle")
), C3 = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Cn(function(i, o) {
  const {
    value: r,
    defaultValue: l,
    onValueChange: f = /* @__PURE__ */ Cn(() => {
    }, "onValueChange"),
    ...d
  } = i, [h, m] = wi({
    prop: r,
    defaultProp: l ?? [],
    onChange: f,
    caller: Ri
  }), g = v.useCallback(
    (p) => m((S = []) => [...S, p]),
    [m]
  ), y = v.useCallback(
    (p) => m((S = []) => S.filter((T) => T !== p)),
    [m]
  );
  return /* @__PURE__ */ x.jsx(
    aC,
    {
      scope: i.__scopeAccordion,
      value: h,
      onItemOpen: g,
      onItemClose: y,
      children: /* @__PURE__ */ x.jsx(oC, { scope: i.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ x.jsx(sC, { ...d, ref: o }) })
    }
  );
}, "AccordionImplMultiple")), [w3, Jc] = Qc(Ri), sC = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Cn(function(i, o) {
    const {
      __scopeAccordion: r,
      disabled: l,
      dir: f,
      orientation: d = Zr.Vertical,
      ...h
    } = i, m = v.useRef(null), g = Jt(m, o), y = v3(r), S = El(f) === g3.LTR, T = At(i.onKeyDown, (E) => {
      if (!y3.includes(E.key)) return;
      const w = E.target, _ = y().filter((F) => !F.ref.current?.disabled), R = _.findIndex((F) => F.ref.current === w), O = _.length;
      if (R === -1) return;
      E.preventDefault();
      let A = R;
      const D = 0, U = O - 1, z = /* @__PURE__ */ Cn(() => {
        A = R + 1, A > U && (A = D);
      }, "moveNext"), V = /* @__PURE__ */ Cn(() => {
        A = R - 1, A < D && (A = U);
      }, "movePrev");
      switch (E.key) {
        case "Home":
          A = D;
          break;
        case "End":
          A = U;
          break;
        case "ArrowRight":
          d === Zr.Horizontal && (S ? z() : V());
          break;
        case "ArrowDown":
          d === Zr.Vertical && z();
          break;
        case "ArrowLeft":
          d === Zr.Horizontal && (S ? V() : z());
          break;
        case "ArrowUp":
          d === Zr.Vertical && V();
          break;
      }
      const I = A % O;
      _[I].ref.current?.focus();
    });
    return /* @__PURE__ */ x.jsx(
      w3,
      {
        scope: r,
        disabled: l,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ x.jsx(ag.Slot, { scope: r, children: /* @__PURE__ */ x.jsx(
          qt.div,
          {
            ...h,
            "data-orientation": d,
            ref: g,
            onKeyDown: l ? void 0 : T
          }
        ) })
      }
    );
  }, "AccordionImpl")
), ip = "AccordionItem", [_3, sg] = Qc(ip), A3 = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Cn(function(i, o) {
    const { __scopeAccordion: r, value: l, ...f } = i, d = Jc(ip, r), h = x3(ip, r), m = og(r), g = ei(), y = l && h.value.includes(l) || !1, p = d.disabled || i.disabled;
    return /* @__PURE__ */ x.jsx(
      _3,
      {
        scope: r,
        open: y,
        disabled: p,
        triggerId: g,
        children: /* @__PURE__ */ x.jsx(
          o3,
          {
            "data-orientation": d.orientation,
            "data-state": rg(y),
            ...m,
            ...f,
            ref: o,
            disabled: p,
            open: y,
            onOpenChange: (S) => {
              S ? h.onItemOpen(l) : h.onItemClose(l);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), R3 = "AccordionHeader", O3 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(i, o) {
    const { __scopeAccordion: r, ...l } = i, f = Jc(Ri, r), d = sg(R3, r);
    return /* @__PURE__ */ x.jsx(
      qt.h3,
      {
        "data-orientation": f.orientation,
        "data-state": rg(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        ...l,
        ref: o
      }
    );
  }, "AccordionHeader")
), KS = "AccordionTrigger", D3 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(i, o) {
    const { __scopeAccordion: r, ...l } = i, f = Jc(Ri, r), d = sg(KS, r), h = T3(KS, r), m = og(r);
    return /* @__PURE__ */ x.jsx(ag.ItemSlot, { scope: r, children: /* @__PURE__ */ x.jsx(
      r3,
      {
        "aria-disabled": d.open && !h.collapsible || void 0,
        "data-orientation": f.orientation,
        id: d.triggerId,
        ...m,
        ...l,
        ref: o
      }
    ) });
  }, "AccordionTrigger")
), M3 = "AccordionContent", N3 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(i, o) {
    const { __scopeAccordion: r, ...l } = i, f = Jc(Ri, r), d = sg(M3, r), h = og(r);
    return /* @__PURE__ */ x.jsx(
      l3,
      {
        role: "region",
        "aria-labelledby": d.triggerId,
        "data-orientation": f.orientation,
        ...h,
        ...l,
        ref: o,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...i.style
        }
      }
    );
  }, "AccordionContent")
);
function rg(n) {
  return n ? "open" : "closed";
}
Cn(rg, "getState");
const j3 = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), rC = (...n) => n.filter((i, o, r) => !!i && i.trim() !== "" && r.indexOf(i) === o).join(" ").trim();
var z3 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const L3 = v.forwardRef(
  ({
    color: n = "currentColor",
    size: i = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: r,
    className: l = "",
    children: f,
    iconNode: d,
    ...h
  }, m) => v.createElement(
    "svg",
    {
      ref: m,
      ...z3,
      width: i,
      height: i,
      stroke: n,
      strokeWidth: r ? Number(o) * 24 / Number(i) : o,
      className: rC("lucide", l),
      ...h
    },
    [
      ...d.map(([g, y]) => v.createElement(g, y)),
      ...Array.isArray(f) ? f : [f]
    ]
  )
);
const ke = (n, i) => {
  const o = v.forwardRef(
    ({ className: r, ...l }, f) => v.createElement(L3, {
      ref: f,
      iconNode: i,
      className: rC(`lucide-${j3(n)}`, r),
      ...l
    })
  );
  return o.displayName = `${n}`, o;
};
const V3 = ke("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
const B3 = ke("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const Bc = ke("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const P3 = ke("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
const U3 = ke("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const H3 = ke("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
const lg = ke("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const I3 = ke("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
const q3 = ke("FileArchive", [
  ["path", { d: "M10 12v-1", key: "v7bkov" }],
  ["path", { d: "M10 18v-2", key: "1cjy8d" }],
  ["path", { d: "M10 7V6", key: "dljcrl" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    { d: "M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01", key: "gkbcor" }
  ],
  ["circle", { cx: "10", cy: "20", r: "2", key: "1xzdoj" }]
]);
const G3 = ke("FileCode2", [
  ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m5 12-3 3 3 3", key: "oke12k" }],
  ["path", { d: "m9 18 3-3-3-3", key: "112psh" }]
]);
const Y3 = ke("FileImage", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
]);
const k3 = ke("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
const F3 = ke("FileVideo", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m10 11 5 3-5 3v-6Z", key: "7ntvm4" }]
]);
const X3 = ke("File", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }]
]);
const $3 = ke("Folder", [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
]);
const K3 = ke("RotateCw", [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
]);
const lC = ke("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), Z3 = "_accordion_1rg5q_1", Q3 = "_item_1rg5q_3", J3 = "_header_1rg5q_5", W3 = "_trigger_1rg5q_7", tz = "_icon_1rg5q_9", ez = "_panel_1rg5q_17", nz = "_panelInner_1rg5q_19", iz = "_lg_1rg5q_21", Da = {
  accordion: Z3,
  item: Q3,
  header: J3,
  trigger: W3,
  icon: tz,
  panel: ez,
  panelInner: nz,
  lg: iz
}, az = { height: "auto", opacity: 1, visibility: "visible" }, oz = { height: 0, opacity: 0, transitionEnd: { visibility: "hidden" } }, sz = { y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }, rz = { y: -6, filter: `blur(${ct.blur.subtle}px)` }, lz = { open: { ...az, transition: { duration: 0 } }, closed: { ...oz, transition: { duration: 0 } } }, uz = { open: { ...sz, transition: { duration: 0 } }, closed: { ...rz, transition: { duration: 0 } } };
function cz({ items: n, defaultOpen: i = 0, size: o = "md" }) {
  const r = i >= 0 && i < n.length ? String(i) : "", [l, f] = v.useState(r);
  return Ve(), /* @__PURE__ */ x.jsx(S3, { className: [Da.accordion, o === "lg" ? Da.lg : ""].filter(Boolean).join(" "), type: "single", collapsible: !0, value: l, onValueChange: f, children: n.map((d, h) => {
    const m = l === String(h);
    return /* @__PURE__ */ x.jsxs(A3, { className: Da.item, value: String(h), children: [
      /* @__PURE__ */ x.jsx(O3, { className: Da.header, children: /* @__PURE__ */ x.jsxs(D3, { className: Da.trigger, children: [
        /* @__PURE__ */ x.jsx("span", { children: d.title }),
        /* @__PURE__ */ x.jsx(xt.span, { className: Da.icon, initial: !1, animate: { rotate: m ? 180 : 0 }, transition: { duration: 0 }, children: /* @__PURE__ */ x.jsx(Bc, { width: 17, height: 17, "aria-hidden": "true" }) })
      ] }) }),
      /* @__PURE__ */ x.jsx(N3, { forceMount: !0, asChild: !0, children: /* @__PURE__ */ x.jsx(xt.div, { className: Da.panel, initial: !1, animate: m ? "open" : "closed", variants: lz, children: /* @__PURE__ */ x.jsx(xt.div, { className: Da.panelInner, variants: uz, children: d.content }) }) })
    ] }, `${d.title}-${h}`);
  }) });
}
var fz = Object.defineProperty, dz = (n, i) => fz(n, "name", { value: i, configurable: !0 });
function ni(n) {
  const i = v.useRef(n);
  return v.useEffect(() => {
    i.current = n;
  }), v.useMemo(() => ((...o) => i.current?.(...o)), []);
}
dz(ni, "useCallbackRef");
var hz = Object.defineProperty, ze = (n, i) => hz(n, "name", { value: i, configurable: !0 }), ap = "dismissableLayer.update", mz = "dismissableLayer.pointerDownOutside", pz = "dismissableLayer.focusOutside", ZS, uC = v.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), ug = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ze(function(i, o) {
    const {
      disableOutsidePointerEvents: r = !1,
      deferPointerDownOutside: l = !1,
      onEscapeKeyDown: f,
      onPointerDownOutside: d,
      onFocusOutside: h,
      onInteractOutside: m,
      onDismiss: g,
      ...y
    } = i, p = v.useContext(uC), [S, T] = v.useState(null), E = S?.ownerDocument ?? globalThis?.document, [, w] = v.useState({}), _ = Jt(o, T), R = Array.from(p.layers), [O] = [
      ...p.layersWithOutsidePointerEventsDisabled
    ].slice(-1), A = O ? R.indexOf(O) : -1, D = S ? R.indexOf(S) : -1, U = p.layersWithOutsidePointerEventsDisabled.size > 0, z = D >= A, V = v.useRef(!1), I = fC(
      (et) => {
        d?.(et), m?.(et), et.defaultPrevented || g?.();
      },
      {
        ownerDocument: E,
        deferPointerDownOutside: l,
        isDeferredPointerDownOutsideRef: V,
        dismissableSurfaces: p.dismissableSurfaces,
        shouldHandlePointerDownOutside: v.useCallback(
          (et) => {
            if (!(et instanceof Node))
              return !1;
            const st = [...p.branches].some(
              (ft) => ft.contains(et)
            );
            return z && !st;
          },
          [p.branches, z]
        )
      }
    ), F = dC((et) => {
      if (l && V.current)
        return;
      const st = et.target;
      [...p.branches].some((ht) => ht.contains(st)) || (h?.(et), m?.(et), et.defaultPrevented || g?.());
    }, E), Z = S ? D === R.length - 1 : !1, W = ni((et) => {
      et.key === "Escape" && (f?.(et), !et.defaultPrevented && g && (et.preventDefault(), g()));
    });
    return v.useEffect(() => {
      if (Z)
        return E.addEventListener("keydown", W, { capture: !0 }), () => E.removeEventListener("keydown", W, { capture: !0 });
    }, [E, Z, W]), v.useEffect(() => {
      if (S)
        return r && (p.layersWithOutsidePointerEventsDisabled.size === 0 && (ZS = E.body.style.pointerEvents, E.body.style.pointerEvents = "none"), p.layersWithOutsidePointerEventsDisabled.add(S)), p.layers.add(S), op(), () => {
          r && (p.layersWithOutsidePointerEventsDisabled.delete(S), p.layersWithOutsidePointerEventsDisabled.size === 0 && (E.body.style.pointerEvents = ZS));
        };
    }, [S, E, r, p]), v.useEffect(() => () => {
      S && (p.layers.delete(S), p.layersWithOutsidePointerEventsDisabled.delete(S), op());
    }, [S, p]), v.useEffect(() => {
      const et = /* @__PURE__ */ ze(() => w({}), "handleUpdate");
      return document.addEventListener(ap, et), () => document.removeEventListener(ap, et);
    }, []), /* @__PURE__ */ x.jsx(
      qt.div,
      {
        ...y,
        ref: _,
        style: {
          pointerEvents: U ? z ? "auto" : "none" : void 0,
          ...i.style
        },
        onFocusCapture: At(i.onFocusCapture, F.onFocusCapture),
        onBlurCapture: At(i.onBlurCapture, F.onBlurCapture),
        onPointerDownCapture: At(
          i.onPointerDownCapture,
          I.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function cC() {
  const n = v.useContext(uC), [i, o] = v.useState(null);
  return v.useEffect(() => {
    if (i)
      return n.dismissableSurfaces.add(i), () => {
        n.dismissableSurfaces.delete(i);
      };
  }, [i, n.dismissableSurfaces]), o;
}
ze(cC, "useDismissableLayerSurface");
var gz = /* @__PURE__ */ ze(() => !0, "IS_TRUE");
function fC(n, i) {
  const {
    ownerDocument: o = globalThis?.document,
    deferPointerDownOutside: r = !1,
    isDeferredPointerDownOutsideRef: l,
    dismissableSurfaces: f,
    shouldHandlePointerDownOutside: d = gz
  } = i, h = ni(n), m = v.useRef(!1), g = v.useRef(!1), y = v.useRef(/* @__PURE__ */ new Map()), p = v.useRef(() => {
  });
  return v.useEffect(() => {
    function S() {
      g.current = !1, l.current = !1, y.current.clear();
    }
    ze(S, "resetOutsideInteraction");
    function T() {
      return Array.from(y.current.values()).some(Boolean);
    }
    ze(T, "isOutsideInteractionIntercepted");
    function E(A) {
      if (!g.current)
        return;
      const D = A.target;
      D instanceof Node && [...f].some((z) => z.contains(D)) || y.current.set(A.type, !0), A.type === "click" && window.setTimeout(() => {
        g.current && p.current();
      }, 0);
    }
    ze(E, "handleInteractionCapture");
    function w(A) {
      g.current && y.current.set(A.type, !1);
    }
    ze(w, "handleInteractionBubble");
    const _ = /* @__PURE__ */ ze((A) => {
      if (A.target && !m.current) {
        let D = function() {
          o.removeEventListener("click", p.current);
          const z = T();
          S(), z || cg(
            mz,
            h,
            U,
            { discrete: !0 }
          );
        };
        if (ze(D, "handleAndDispatchPointerDownOutsideEvent"), !d(A.target)) {
          o.removeEventListener("click", p.current), S(), m.current = !1;
          return;
        }
        const U = { originalEvent: A };
        g.current = !0, l.current = r && A.button === 0, y.current.clear(), !r || A.button !== 0 ? D() : (o.removeEventListener("click", p.current), p.current = D, o.addEventListener("click", p.current, { once: !0 }));
      } else
        o.removeEventListener("click", p.current), S();
      m.current = !1;
    }, "handlePointerDown"), R = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const A of R)
      o.addEventListener(A, E, !0), o.addEventListener(A, w);
    const O = window.setTimeout(() => {
      o.addEventListener("pointerdown", _);
    }, 0);
    return () => {
      window.clearTimeout(O), o.removeEventListener("pointerdown", _), o.removeEventListener("click", p.current);
      for (const A of R)
        o.removeEventListener(A, E, !0), o.removeEventListener(A, w);
    };
  }, [
    o,
    h,
    r,
    l,
    f,
    d
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ ze(() => m.current = !0, "onPointerDownCapture")
  };
}
ze(fC, "usePointerDownOutside");
function dC(n, i = globalThis?.document) {
  const o = ni(n), r = v.useRef(!1);
  return v.useEffect(() => {
    const l = /* @__PURE__ */ ze((f) => {
      f.target && !r.current && cg(pz, o, { originalEvent: f }, {
        discrete: !1
      });
    }, "handleFocus");
    return i.addEventListener("focusin", l), () => i.removeEventListener("focusin", l);
  }, [i, o]), {
    onFocusCapture: /* @__PURE__ */ ze(() => r.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ ze(() => r.current = !1, "onBlurCapture")
  };
}
ze(dC, "useFocusOutside");
function op() {
  const n = new CustomEvent(ap);
  document.dispatchEvent(n);
}
ze(op, "dispatchUpdate");
function cg(n, i, o, { discrete: r }) {
  const l = o.originalEvent.target, f = new CustomEvent(n, { bubbles: !1, cancelable: !0, detail: o });
  i && l.addEventListener(n, i, { once: !0 }), r ? QE(l, f) : l.dispatchEvent(f);
}
ze(cg, "handleAndDispatchCustomEvent");
var yz = Object.defineProperty, Ce = (n, i) => yz(n, "name", { value: i, configurable: !0 }), fm = "focusScope.autoFocusOnMount", dm = "focusScope.autoFocusOnUnmount", QS = { bubbles: !1, cancelable: !0 }, hC = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ce(function(i, o) {
    const {
      loop: r = !1,
      trapped: l = !1,
      branches: f,
      onMountAutoFocus: d,
      onUnmountAutoFocus: h,
      ...m
    } = i, [g, y] = v.useState(null), p = ni(d), S = ni(h), T = v.useRef(null), E = Jt(o, y), w = v.useRef(f);
    v.useEffect(() => {
      w.current = f;
    });
    const _ = v.useCallback(
      (A) => A ? g?.contains(A) ? !0 : !!w.current?.some((D) => D.contains(A)) : !1,
      [g]
    ), R = v.useRef({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }).current;
    v.useEffect(() => {
      if (l) {
        let A = function(V) {
          if (R.paused || !g) return;
          const I = V.target;
          _(I) ? T.current = I : Xi(T.current, { select: !0 });
        }, D = function(V) {
          if (R.paused || !g) return;
          const I = V.relatedTarget;
          I !== null && (_(I) || Xi(T.current, { select: !0 }));
        }, U = function(V) {
          if (document.activeElement === document.body)
            for (const F of V)
              F.removedNodes.length > 0 && Xi(g);
        };
        Ce(A, "handleFocusIn"), Ce(D, "handleFocusOut"), Ce(U, "handleMutations"), document.addEventListener("focusin", A), document.addEventListener("focusout", D);
        const z = new MutationObserver(U);
        return g && z.observe(g, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", A), document.removeEventListener("focusout", D), z.disconnect();
        };
      }
    }, [l, g, R.paused, _]), v.useEffect(() => {
      if (g) {
        JS.add(R);
        const A = document.activeElement;
        if (!g.contains(A)) {
          const U = new CustomEvent(fm, QS);
          g.addEventListener(fm, p), g.dispatchEvent(U), U.defaultPrevented || (yC(TC(fg(g)), { select: !0 }), document.activeElement === A && Xi(g));
        }
        return () => {
          g.removeEventListener(fm, p), setTimeout(() => {
            const U = new CustomEvent(dm, QS);
            g.addEventListener(dm, S), g.dispatchEvent(U), U.defaultPrevented || Xi(A ?? document.body, { select: !0 }), g.removeEventListener(dm, S), JS.remove(R);
          }, 0);
        };
      }
    }, [g, p, S, R]);
    const O = v.useCallback(
      (A) => {
        if (!r && !l || R.paused) return;
        const D = A.key === "Tab" && !A.altKey && !A.ctrlKey && !A.metaKey, U = document.activeElement;
        if (D && U) {
          const z = A.currentTarget, [V, I] = vC(z);
          V && I ? !A.shiftKey && U === I ? (A.preventDefault(), r && Xi(V, { select: !0 })) : A.shiftKey && U === V && (A.preventDefault(), r && Xi(I, { select: !0 })) : U === z && A.preventDefault();
        }
      },
      [r, l, R.paused]
    );
    return /* @__PURE__ */ x.jsx(qt.div, { tabIndex: -1, ...m, ref: E, onKeyDown: O });
  }, "FocusScope")
), mC = v.createContext(null);
function pC({ registry: n, children: i }) {
  return n ? /* @__PURE__ */ x.jsx(mC.Provider, { value: n, children: i }) : i;
}
Ce(pC, "FocusScopeBranchProvider");
function gC() {
  const [n, i] = v.useState([]), o = v.useMemo(
    () => ({
      add: /* @__PURE__ */ Ce((r) => i((l) => l.includes(r) ? l : [...l, r]), "add"),
      remove: /* @__PURE__ */ Ce((r) => i((l) => l.filter((f) => f !== r)), "remove")
    }),
    []
  );
  return { nodes: n, registry: o };
}
Ce(gC, "useFocusScopeBranchRegistry");
function vz(n) {
  const i = v.useContext(mC);
  v.useEffect(() => {
    if (!(!n || !i))
      return i.add(n), () => i.remove(n);
  }, [n, i]);
}
Ce(vz, "useFocusScopeBranch");
function yC(n, { select: i = !1 } = {}) {
  const o = document.activeElement;
  for (const r of n)
    if (Xi(r, { select: i }), document.activeElement !== o) return;
}
Ce(yC, "focusFirst");
function vC(n) {
  const i = fg(n), o = sp(i, n), r = sp(i.reverse(), n);
  return [o, r];
}
Ce(vC, "getTabbableEdges");
function fg(n) {
  const i = [], o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ Ce((r) => {
      const l = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || l ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; o.nextNode(); ) i.push(o.currentNode);
  return i;
}
Ce(fg, "getTabbableCandidates");
function sp(n, i) {
  const o = typeof i.checkVisibility == "function" && i.checkVisibility({ checkVisibilityCSS: !0 });
  for (const r of n)
    if (!(o ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : bC(r, { upTo: i })))
      return r;
}
Ce(sp, "findVisible");
function bC(n, { upTo: i }) {
  if (getComputedStyle(n).visibility === "hidden") return !0;
  for (; n; ) {
    if (i !== void 0 && n === i) return !1;
    if (getComputedStyle(n).display === "none") return !0;
    n = n.parentElement;
  }
  return !1;
}
Ce(bC, "isHidden");
function SC(n) {
  return n instanceof HTMLInputElement && "select" in n;
}
Ce(SC, "isSelectableInput");
function Xi(n, { select: i = !1 } = {}) {
  if (n && n.focus) {
    const o = document.activeElement;
    n.focus({ preventScroll: !0 }), n !== o && SC(n) && i && n.select();
  }
}
Ce(Xi, "focus");
var JS = xC();
function xC() {
  let n = [];
  return {
    add(i) {
      const o = n[0];
      i !== o && o?.pause(), n = rp(n, i), n.unshift(i);
    },
    remove(i) {
      n = rp(n, i), n[0]?.resume();
    }
  };
}
Ce(xC, "createFocusScopesStack");
function rp(n, i) {
  const o = [...n], r = o.indexOf(i);
  return r !== -1 && o.splice(r, 1), o;
}
Ce(rp, "arrayRemove");
function TC(n) {
  return n.filter((i) => i.tagName !== "A");
}
Ce(TC, "removeLinks");
var bz = Object.defineProperty, Sz = (n, i) => bz(n, "name", { value: i, configurable: !0 }), dg = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Sz(function(i, o) {
    const { container: r, ...l } = i, [f, d] = v.useState(!1);
    ue(() => d(!0), []);
    const h = r || f && globalThis?.document?.body;
    return h ? xl.createPortal(/* @__PURE__ */ x.jsx(qt.div, { ...l, ref: o }), h) : null;
  }, "Portal")
), xz = Object.defineProperty, hg = (n, i) => xz(n, "name", { value: i, configurable: !0 }), ac = 0, _s = null;
function Tz(n) {
  return Wc(), n.children;
}
hg(Tz, "FocusGuards");
function Wc() {
  v.useEffect(() => {
    _s || (_s = { start: lp(), end: lp() });
    const { start: n, end: i } = _s;
    return document.body.firstElementChild !== n && document.body.insertAdjacentElement("afterbegin", n), document.body.lastElementChild !== i && document.body.insertAdjacentElement("beforeend", i), ac++, () => {
      ac === 1 && (_s?.start.remove(), _s?.end.remove(), _s = null), ac = Math.max(0, ac - 1);
    };
  }, []);
}
hg(Wc, "useFocusGuards");
function lp() {
  const n = document.createElement("span");
  return n.setAttribute("data-radix-focus-guard", ""), n.tabIndex = 0, n.style.outline = "none", n.style.opacity = "0", n.style.position = "fixed", n.style.pointerEvents = "none", n;
}
hg(lp, "createFocusGuard");
var xi = function() {
  return xi = Object.assign || function(i) {
    for (var o, r = 1, l = arguments.length; r < l; r++) {
      o = arguments[r];
      for (var f in o) Object.prototype.hasOwnProperty.call(o, f) && (i[f] = o[f]);
    }
    return i;
  }, xi.apply(this, arguments);
};
function EC(n, i) {
  var o = {};
  for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && i.indexOf(r) < 0 && (o[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var l = 0, r = Object.getOwnPropertySymbols(n); l < r.length; l++)
      i.indexOf(r[l]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[l]) && (o[r[l]] = n[r[l]]);
  return o;
}
function Ez(n, i, o) {
  if (o || arguments.length === 2) for (var r = 0, l = i.length, f; r < l; r++)
    (f || !(r in i)) && (f || (f = Array.prototype.slice.call(i, 0, r)), f[r] = i[r]);
  return n.concat(f || Array.prototype.slice.call(i));
}
var Ec = "right-scroll-bar-position", Cc = "width-before-scroll-bar", Cz = "with-scroll-bars-hidden", wz = "--removed-body-scroll-bar-size";
function hm(n, i) {
  return typeof n == "function" ? n(i) : n && (n.current = i), n;
}
function _z(n, i) {
  var o = v.useState(function() {
    return {
      // value
      value: n,
      // last callback
      callback: i,
      // "memoized" public interface
      facade: {
        get current() {
          return o.value;
        },
        set current(r) {
          var l = o.value;
          l !== r && (o.value = r, o.callback(r, l));
        }
      }
    };
  })[0];
  return o.callback = i, o.facade;
}
var Az = typeof window < "u" ? v.useLayoutEffect : v.useEffect, WS = /* @__PURE__ */ new WeakMap();
function Rz(n, i) {
  var o = _z(null, function(r) {
    return n.forEach(function(l) {
      return hm(l, r);
    });
  });
  return Az(function() {
    var r = WS.get(o);
    if (r) {
      var l = new Set(r), f = new Set(n), d = o.current;
      l.forEach(function(h) {
        f.has(h) || hm(h, null);
      }), f.forEach(function(h) {
        l.has(h) || hm(h, d);
      });
    }
    WS.set(o, n);
  }, [n]), o;
}
function Oz(n) {
  return n;
}
function Dz(n, i) {
  i === void 0 && (i = Oz);
  var o = [], r = !1, l = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return o.length ? o[o.length - 1] : n;
    },
    useMedium: function(f) {
      var d = i(f, r);
      return o.push(d), function() {
        o = o.filter(function(h) {
          return h !== d;
        });
      };
    },
    assignSyncMedium: function(f) {
      for (r = !0; o.length; ) {
        var d = o;
        o = [], d.forEach(f);
      }
      o = {
        push: function(h) {
          return f(h);
        },
        filter: function() {
          return o;
        }
      };
    },
    assignMedium: function(f) {
      r = !0;
      var d = [];
      if (o.length) {
        var h = o;
        o = [], h.forEach(f), d = o;
      }
      var m = function() {
        var y = d;
        d = [], y.forEach(f);
      }, g = function() {
        return Promise.resolve().then(m);
      };
      g(), o = {
        push: function(y) {
          d.push(y), g();
        },
        filter: function(y) {
          return d = d.filter(y), o;
        }
      };
    }
  };
  return l;
}
function Mz(n) {
  n === void 0 && (n = {});
  var i = Dz(null);
  return i.options = xi({ async: !0, ssr: !1 }, n), i;
}
var CC = function(n) {
  var i = n.sideCar, o = EC(n, ["sideCar"]);
  if (!i)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = i.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return v.createElement(r, xi({}, o));
};
CC.isSideCarExport = !0;
function Nz(n, i) {
  return n.useMedium(i), CC;
}
var wC = Mz(), mm = function() {
}, tf = v.forwardRef(function(n, i) {
  var o = v.useRef(null), r = v.useState({
    onScrollCapture: mm,
    onWheelCapture: mm,
    onTouchMoveCapture: mm
  }), l = r[0], f = r[1], d = n.forwardProps, h = n.children, m = n.className, g = n.removeScrollBar, y = n.enabled, p = n.shards, S = n.sideCar, T = n.noRelative, E = n.noIsolation, w = n.inert, _ = n.allowPinchZoom, R = n.as, O = R === void 0 ? "div" : R, A = n.gapMode, D = EC(n, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), U = S, z = Rz([o, i]), V = xi(xi({}, D), l);
  return v.createElement(
    v.Fragment,
    null,
    y && v.createElement(U, { sideCar: wC, removeScrollBar: g, shards: p, noRelative: T, noIsolation: E, inert: w, setCallbacks: f, allowPinchZoom: !!_, lockRef: o, gapMode: A }),
    d ? v.cloneElement(v.Children.only(h), xi(xi({}, V), { ref: z })) : v.createElement(O, xi({}, V, { className: m, ref: z }), h)
  );
});
tf.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
tf.classNames = {
  fullWidth: Cc,
  zeroRight: Ec
};
var jz = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function zz() {
  if (!document)
    return null;
  var n = document.createElement("style");
  n.type = "text/css";
  var i = jz();
  return i && n.setAttribute("nonce", i), n;
}
function Lz(n, i) {
  n.styleSheet ? n.styleSheet.cssText = i : n.appendChild(document.createTextNode(i));
}
function Vz(n) {
  var i = document.head || document.getElementsByTagName("head")[0];
  i.appendChild(n);
}
var Bz = function() {
  var n = 0, i = null;
  return {
    add: function(o) {
      n == 0 && (i = zz()) && (Lz(i, o), Vz(i)), n++;
    },
    remove: function() {
      n--, !n && i && (i.parentNode && i.parentNode.removeChild(i), i = null);
    }
  };
}, Pz = function() {
  var n = Bz();
  return function(i, o) {
    v.useEffect(function() {
      return n.add(i), function() {
        n.remove();
      };
    }, [i && o]);
  };
}, _C = function() {
  var n = Pz(), i = function(o) {
    var r = o.styles, l = o.dynamic;
    return n(r, l), null;
  };
  return i;
}, Uz = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, pm = function(n) {
  return parseInt(n || "", 10) || 0;
}, Hz = function(n) {
  var i = window.getComputedStyle(document.body), o = i[n === "padding" ? "paddingLeft" : "marginLeft"], r = i[n === "padding" ? "paddingTop" : "marginTop"], l = i[n === "padding" ? "paddingRight" : "marginRight"];
  return [pm(o), pm(r), pm(l)];
}, Iz = function(n) {
  if (n === void 0 && (n = "margin"), typeof window > "u")
    return Uz;
  var i = Hz(n), o = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: i[0],
    top: i[1],
    right: i[2],
    gap: Math.max(0, r - o + i[2] - i[0])
  };
}, qz = _C(), Ls = "data-scroll-locked", Gz = function(n, i, o, r) {
  var l = n.left, f = n.top, d = n.right, h = n.gap;
  return o === void 0 && (o = "margin"), `
  .`.concat(Cz, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(h, "px ").concat(r, `;
  }
  body[`).concat(Ls, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    i && "position: relative ".concat(r, ";"),
    o === "margin" && `
    padding-left: `.concat(l, `px;
    padding-top: `).concat(f, `px;
    padding-right: `).concat(d, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(h, "px ").concat(r, `;
    `),
    o === "padding" && "padding-right: ".concat(h, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Ec, ` {
    right: `).concat(h, "px ").concat(r, `;
  }
  
  .`).concat(Cc, ` {
    margin-right: `).concat(h, "px ").concat(r, `;
  }
  
  .`).concat(Ec, " .").concat(Ec, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Cc, " .").concat(Cc, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Ls, `] {
    `).concat(wz, ": ").concat(h, `px;
  }
`);
}, tx = function() {
  var n = parseInt(document.body.getAttribute(Ls) || "0", 10);
  return isFinite(n) ? n : 0;
}, Yz = function() {
  v.useEffect(function() {
    return document.body.setAttribute(Ls, (tx() + 1).toString()), function() {
      var n = tx() - 1;
      n <= 0 ? document.body.removeAttribute(Ls) : document.body.setAttribute(Ls, n.toString());
    };
  }, []);
}, kz = function(n) {
  var i = n.noRelative, o = n.noImportant, r = n.gapMode, l = r === void 0 ? "margin" : r;
  Yz();
  var f = v.useMemo(function() {
    return Iz(l);
  }, [l]);
  return v.createElement(qz, { styles: Gz(f, !i, l, o ? "" : "!important") });
}, up = !1;
if (typeof window < "u")
  try {
    var oc = Object.defineProperty({}, "passive", {
      get: function() {
        return up = !0, !0;
      }
    });
    window.addEventListener("test", oc, oc), window.removeEventListener("test", oc, oc);
  } catch {
    up = !1;
  }
var As = up ? { passive: !1 } : !1, Fz = function(n) {
  return n.tagName === "TEXTAREA";
}, AC = function(n, i) {
  if (!(n instanceof Element))
    return !1;
  var o = window.getComputedStyle(n);
  return (
    // not-not-scrollable
    o[i] !== "hidden" && // contains scroll inside self
    !(o.overflowY === o.overflowX && !Fz(n) && o[i] === "visible")
  );
}, Xz = function(n) {
  return AC(n, "overflowY");
}, $z = function(n) {
  return AC(n, "overflowX");
}, ex = function(n, i) {
  var o = i.ownerDocument, r = i;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var l = RC(n, r);
    if (l) {
      var f = OC(n, r), d = f[1], h = f[2];
      if (d > h)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== o.body);
  return !1;
}, Kz = function(n) {
  var i = n.scrollTop, o = n.scrollHeight, r = n.clientHeight;
  return [
    i,
    o,
    r
  ];
}, Zz = function(n) {
  var i = n.scrollLeft, o = n.scrollWidth, r = n.clientWidth;
  return [
    i,
    o,
    r
  ];
}, RC = function(n, i) {
  return n === "v" ? Xz(i) : $z(i);
}, OC = function(n, i) {
  return n === "v" ? Kz(i) : Zz(i);
}, Qz = function(n, i) {
  return n === "h" && i === "rtl" ? -1 : 1;
}, Jz = function(n, i, o, r, l) {
  var f = Qz(n, window.getComputedStyle(i).direction), d = f * r, h = o.target, m = i.contains(h), g = !1, y = d > 0, p = 0, S = 0;
  do {
    if (!h)
      break;
    var T = OC(n, h), E = T[0], w = T[1], _ = T[2], R = w - _ - f * E;
    (E || R) && RC(n, h) && (p += R, S += E);
    var O = h.parentNode;
    h = O && O.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? O.host : O;
  } while (
    // portaled content
    !m && h !== document.body || // self content
    m && (i.contains(h) || i === h)
  );
  return (y && Math.abs(p) < 1 || !y && Math.abs(S) < 1) && (g = !0), g;
}, sc = function(n) {
  return "changedTouches" in n ? [n.changedTouches[0].clientX, n.changedTouches[0].clientY] : [0, 0];
}, nx = function(n) {
  return [n.deltaX, n.deltaY];
}, ix = function(n) {
  return n && "current" in n ? n.current : n;
}, Wz = function(n, i) {
  return n[0] === i[0] && n[1] === i[1];
}, tL = function(n) {
  return `
  .block-interactivity-`.concat(n, ` {pointer-events: none;}
  .allow-interactivity-`).concat(n, ` {pointer-events: all;}
`);
}, eL = 0, Rs = [];
function nL(n) {
  var i = v.useRef([]), o = v.useRef([0, 0]), r = v.useRef(), l = v.useState(eL++)[0], f = v.useState(_C)[0], d = v.useRef(n);
  v.useEffect(function() {
    d.current = n;
  }, [n]), v.useEffect(function() {
    if (n.inert) {
      document.body.classList.add("block-interactivity-".concat(l));
      var w = Ez([n.lockRef.current], (n.shards || []).map(ix), !0).filter(Boolean);
      return w.forEach(function(_) {
        return _.classList.add("allow-interactivity-".concat(l));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(l)), w.forEach(function(_) {
          return _.classList.remove("allow-interactivity-".concat(l));
        });
      };
    }
  }, [n.inert, n.lockRef.current, n.shards]);
  var h = v.useCallback(function(w, _) {
    if ("touches" in w && w.touches.length === 2 || w.type === "wheel" && w.ctrlKey)
      return !d.current.allowPinchZoom;
    var R = sc(w), O = o.current, A = "deltaX" in w ? w.deltaX : O[0] - R[0], D = "deltaY" in w ? w.deltaY : O[1] - R[1], U, z = w.target, V = Math.abs(A) > Math.abs(D) ? "h" : "v";
    if ("touches" in w && V === "h" && z.type === "range")
      return !1;
    var I = window.getSelection(), F = I && I.anchorNode, Z = F ? F === z || F.contains(z) : !1;
    if (Z)
      return !1;
    var W = ex(V, z);
    if (!W)
      return !0;
    if (W ? U = V : (U = V === "v" ? "h" : "v", W = ex(V, z)), !W)
      return !1;
    if (!r.current && "changedTouches" in w && (A || D) && (r.current = U), !U)
      return !0;
    var et = r.current || U;
    return Jz(et, _, w, et === "h" ? A : D);
  }, []), m = v.useCallback(function(w) {
    var _ = w;
    if (!(!Rs.length || Rs[Rs.length - 1] !== f)) {
      var R = "deltaY" in _ ? nx(_) : sc(_), O = i.current.filter(function(U) {
        return U.name === _.type && (U.target === _.target || _.target === U.shadowParent) && Wz(U.delta, R);
      })[0];
      if (O && O.should) {
        _.cancelable && _.preventDefault();
        return;
      }
      if (!O) {
        var A = (d.current.shards || []).map(ix).filter(Boolean).filter(function(U) {
          return U.contains(_.target);
        }), D = A.length > 0 ? h(_, A[0]) : !d.current.noIsolation;
        D && _.cancelable && _.preventDefault();
      }
    }
  }, []), g = v.useCallback(function(w, _, R, O) {
    var A = { name: w, delta: _, target: R, should: O, shadowParent: iL(R) };
    i.current.push(A), setTimeout(function() {
      i.current = i.current.filter(function(D) {
        return D !== A;
      });
    }, 1);
  }, []), y = v.useCallback(function(w) {
    o.current = sc(w), r.current = void 0;
  }, []), p = v.useCallback(function(w) {
    g(w.type, nx(w), w.target, h(w, n.lockRef.current));
  }, []), S = v.useCallback(function(w) {
    g(w.type, sc(w), w.target, h(w, n.lockRef.current));
  }, []);
  v.useEffect(function() {
    return Rs.push(f), n.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: S
    }), document.addEventListener("wheel", m, As), document.addEventListener("touchmove", m, As), document.addEventListener("touchstart", y, As), function() {
      Rs = Rs.filter(function(w) {
        return w !== f;
      }), document.removeEventListener("wheel", m, As), document.removeEventListener("touchmove", m, As), document.removeEventListener("touchstart", y, As);
    };
  }, []);
  var T = n.removeScrollBar, E = n.inert;
  return v.createElement(
    v.Fragment,
    null,
    E ? v.createElement(f, { styles: tL(l) }) : null,
    T ? v.createElement(kz, { noRelative: n.noRelative, gapMode: n.gapMode }) : null
  );
}
function iL(n) {
  for (var i = null; n !== null; )
    n instanceof ShadowRoot && (i = n.host, n = n.host), n = n.parentNode;
  return i;
}
const aL = Nz(wC, nL);
var mg = v.forwardRef(function(n, i) {
  return v.createElement(tf, xi({}, n, { ref: i, sideCar: aL }));
});
mg.classNames = tf.classNames;
var oL = function(n) {
  if (typeof document > "u")
    return null;
  var i = Array.isArray(n) ? n[0] : n;
  return i.ownerDocument.body;
}, Os = /* @__PURE__ */ new WeakMap(), rc = /* @__PURE__ */ new WeakMap(), lc = {}, gm = 0, DC = function(n) {
  return n && (n.host || DC(n.parentNode));
}, sL = function(n, i) {
  return i.map(function(o) {
    if (n.contains(o))
      return o;
    var r = DC(o);
    return r && n.contains(r) ? r : (console.error("aria-hidden", o, "in not contained inside", n, ". Doing nothing"), null);
  }).filter(function(o) {
    return !!o;
  });
}, rL = function(n, i, o, r) {
  var l = sL(i, Array.isArray(n) ? n : [n]);
  lc[o] || (lc[o] = /* @__PURE__ */ new WeakMap());
  var f = lc[o], d = [], h = /* @__PURE__ */ new Set(), m = new Set(l), g = function(p) {
    !p || h.has(p) || (h.add(p), g(p.parentNode));
  };
  l.forEach(g);
  var y = function(p) {
    !p || m.has(p) || Array.prototype.forEach.call(p.children, function(S) {
      if (h.has(S))
        y(S);
      else
        try {
          var T = S.getAttribute(r), E = T !== null && T !== "false", w = (Os.get(S) || 0) + 1, _ = (f.get(S) || 0) + 1;
          Os.set(S, w), f.set(S, _), d.push(S), w === 1 && E && rc.set(S, !0), _ === 1 && S.setAttribute(o, "true"), E || S.setAttribute(r, "true");
        } catch (R) {
          console.error("aria-hidden: cannot operate on ", S, R);
        }
    });
  };
  return y(i), h.clear(), gm++, function() {
    d.forEach(function(p) {
      var S = Os.get(p) - 1, T = f.get(p) - 1;
      Os.set(p, S), f.set(p, T), S || (rc.has(p) || p.removeAttribute(r), rc.delete(p)), T || p.removeAttribute(o);
    }), gm--, gm || (Os = /* @__PURE__ */ new WeakMap(), Os = /* @__PURE__ */ new WeakMap(), rc = /* @__PURE__ */ new WeakMap(), lc = {});
  };
}, MC = function(n, i, o) {
  o === void 0 && (o = "data-aria-hidden");
  var r = Array.from(Array.isArray(n) ? n : [n]), l = oL(n);
  return l ? (r.push.apply(r, Array.from(l.querySelectorAll("[aria-live], script"))), rL(r, l, o, "aria-hidden")) : function() {
    return null;
  };
}, lL = Object.defineProperty, wn = (n, i) => lL(n, "name", { value: i, configurable: !0 }), pg = "Dialog", [NC, XP] = /* @__PURE__ */ ii(pg), [uL, Oi] = NC(pg), cL = /* @__PURE__ */ wn((n) => {
  const {
    __scopeDialog: i,
    children: o,
    open: r,
    defaultOpen: l,
    onOpenChange: f,
    modal: d = !0
  } = n, h = v.useRef(null), m = v.useRef(null), { nodes: g, registry: y } = gC(), [p, S] = wi({
    prop: r,
    defaultProp: l ?? !1,
    onChange: f,
    caller: pg
  }), [T, E] = v.useState(0), [w, _] = v.useState(0);
  return /* @__PURE__ */ x.jsx(
    uL,
    {
      scope: i,
      triggerRef: h,
      contentRef: m,
      contentId: ei(),
      titleId: ei(),
      descriptionId: ei(),
      titlePresent: T > 0,
      descriptionPresent: w > 0,
      setTitleCount: E,
      setDescriptionCount: _,
      open: p,
      onOpenChange: S,
      onOpenToggle: v.useCallback(() => S((R) => !R), [S]),
      modal: d,
      branchNodes: g,
      branchRegistry: y,
      children: o
    }
  );
}, "Dialog"), jC = "DialogPortal", [fL, zC] = NC(jC, {
  forceMount: void 0
}), ax = /* @__PURE__ */ wn((n) => {
  const { __scopeDialog: i, forceMount: o, children: r, container: l } = n, f = Oi(jC, i);
  return /* @__PURE__ */ x.jsx(fL, { scope: i, forceMount: o, children: v.Children.map(r, (d) => /* @__PURE__ */ x.jsx(Ha, { present: o || f.open, children: /* @__PURE__ */ x.jsx(dg, { asChild: !0, container: l, children: d }) })) });
}, "DialogPortal"), cp = "DialogOverlay", ox = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ wn(function(i, o) {
    const r = zC(cp, i.__scopeDialog), { forceMount: l = r.forceMount, ...f } = i, d = Oi(cp, i.__scopeDialog);
    return d.modal ? /* @__PURE__ */ x.jsx(Ha, { present: l || d.open, children: /* @__PURE__ */ x.jsx(hL, { ...f, ref: o }) }) : null;
  }, "DialogOverlay")
), dL = /* @__PURE__ */ Va("DialogOverlay.RemoveScroll"), hL = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(i, o) {
    const { __scopeDialog: r, ...l } = i, f = Oi(cp, r), d = cC(), h = Jt(o, d);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside
      // `RemoveScroll` (eg. when `Overlay` and `Content` are siblings). Nested
      // layers are registered as branches and added as shards so they remain
      // scrollable too. See https://github.com/radix-ui/primitives/issues/3423
      /* @__PURE__ */ x.jsx(
        mg,
        {
          as: dL,
          allowPinchZoom: !0,
          shards: v.useMemo(
            () => [f.contentRef, ...f.branchNodes.map((m) => ({ current: m }))],
            [f.contentRef, f.branchNodes]
          ),
          children: /* @__PURE__ */ x.jsx(
            qt.div,
            {
              "data-state": gg(f.open),
              ...l,
              ref: h,
              style: { pointerEvents: "auto", ...l.style }
            }
          )
        }
      )
    );
  }, "DialogOverlayImpl")
), cl = "DialogContent", sx = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ wn(function(i, o) {
    const r = zC(cl, i.__scopeDialog), { forceMount: l = r.forceMount, ...f } = i, d = Oi(cl, i.__scopeDialog);
    return /* @__PURE__ */ x.jsx(Ha, { present: l || d.open, children: d.modal ? /* @__PURE__ */ x.jsx(mL, { ...f, ref: o }) : /* @__PURE__ */ x.jsx(pL, { ...f, ref: o }) });
  }, "DialogContent")
), mL = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(i, o) {
    const r = Oi(cl, i.__scopeDialog), l = v.useRef(null), f = Jt(o, r.contentRef, l);
    return v.useEffect(() => {
      const d = l.current;
      if (d) return MC(d);
    }, []), /* @__PURE__ */ x.jsx(
      LC,
      {
        ...i,
        ref: f,
        trapFocus: r.open,
        disableOutsidePointerEvents: r.open,
        onCloseAutoFocus: At(i.onCloseAutoFocus, (d) => {
          d.preventDefault(), r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: At(i.onPointerDownOutside, (d) => {
          const h = d.detail.originalEvent, m = h.button === 0 && h.ctrlKey === !0;
          (h.button === 2 || m) && d.preventDefault();
        }),
        onFocusOutside: At(
          i.onFocusOutside,
          (d) => d.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), pL = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(i, o) {
    const r = Oi(cl, i.__scopeDialog), l = v.useRef(!1), f = v.useRef(!1);
    return /* @__PURE__ */ x.jsx(
      LC,
      {
        ...i,
        ref: o,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (d) => {
          i.onCloseAutoFocus?.(d), d.defaultPrevented || (l.current || r.triggerRef.current?.focus(), d.preventDefault()), l.current = !1, f.current = !1;
        },
        onInteractOutside: (d) => {
          i.onInteractOutside?.(d), d.defaultPrevented || (l.current = !0, d.detail.originalEvent.type === "pointerdown" && (f.current = !0));
          const h = d.target;
          r.triggerRef.current?.contains(h) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && f.current && d.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), LC = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(i, o) {
    const {
      __scopeDialog: r,
      trapFocus: l,
      onOpenAutoFocus: f,
      onCloseAutoFocus: d,
      "aria-describedby": h,
      children: m,
      ...g
    } = i, y = Oi(cl, r);
    return Wc(), /* @__PURE__ */ x.jsx(pC, { registry: y.branchRegistry, children: /* @__PURE__ */ x.jsx(
      hC,
      {
        asChild: !0,
        loop: !0,
        trapped: l,
        branches: y.branchNodes,
        onMountAutoFocus: f,
        onUnmountAutoFocus: d,
        children: /* @__PURE__ */ x.jsx(
          ug,
          {
            role: "dialog",
            id: y.contentId,
            "aria-labelledby": y.titlePresent ? y.titleId : void 0,
            "aria-describedby": y.descriptionPresent ? VC(h, y.descriptionId) : h,
            "data-state": gg(y.open),
            ...g,
            ref: o,
            deferPointerDownOutside: !0,
            onDismiss: () => y.onOpenChange(!1),
            children: m
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), gL = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ wn(function(i, o) {
    const { __scopeDialog: r, ...l } = i, f = Oi("DialogTitle", r), { setTitleCount: d } = f;
    return ue(() => (d((h) => h + 1), () => d((h) => h - 1)), [d]), /* @__PURE__ */ x.jsx(qt.h2, { id: f.titleId, ...l, ref: o });
  }, "DialogTitle")
), yL = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(i, o) {
    const { __scopeDialog: r, ...l } = i, f = Oi("DialogDescription", r), { setDescriptionCount: d } = f;
    return ue(() => (d((h) => h + 1), () => d((h) => h - 1)), [d]), /* @__PURE__ */ x.jsx(qt.p, { id: f.descriptionId, ...l, ref: o });
  }, "DialogDescription")
), vL = "DialogClose", bL = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ wn(function(i, o) {
    const { __scopeDialog: r, ...l } = i, f = Oi(vL, r);
    return /* @__PURE__ */ x.jsx(
      qt.button,
      {
        type: "button",
        ...l,
        ref: o,
        onClick: At(i.onClick, () => f.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function VC(...n) {
  const i = /* @__PURE__ */ new Set();
  for (const o of n)
    if (typeof o == "string")
      for (const r of String(o).trim().split(/\s+/))
        r && i.add(r);
  return i.size > 0 ? Array.from(i).join(" ") : void 0;
}
wn(VC, "concatAriaDescribedby");
function gg(n) {
  return n ? "open" : "closed";
}
wn(gg, "getState");
const SL = "_overlay_1ny52_1", xL = "_content_1ny52_5", TL = "_keyframes_1ny52_9", EL = "_header_1ny52_23", CL = "_title_1ny52_25", wL = "_description_1ny52_27", _L = "_swap_1ny52_31", AL = "_close_1ny52_39", RL = "_body_1ny52_45", Zn = {
  overlay: SL,
  content: xL,
  keyframes: TL,
  header: EL,
  title: CL,
  description: wL,
  swap: _L,
  close: AL,
  body: RL
}, BC = v.createContext(null);
function OL({ open: n, defaultOpen: i = !1, onOpenChange: o, ...r }) {
  const [l, f] = v.useState(i), d = n ?? l, h = v.useCallback((m) => {
    n === void 0 && f(m), o?.(m);
  }, [n, o]);
  return /* @__PURE__ */ x.jsx(BC.Provider, { value: d, children: /* @__PURE__ */ x.jsx(cL, { ...r, open: d, onOpenChange: h }) });
}
const uc = { get duration() {
  return ct.duration.instant;
} };
function rx({ text: n }) {
  return Ve(), /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ x.jsx(xt.span, { className: Zn.swap, initial: !1, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: { opacity: 0, transition: { duration: 0 } }, transition: { duration: ct.duration.standard, ease: [...ct.ease.enter] }, children: n }, n) });
}
function DL({ title: n, description: i, children: o, className: r, onPointerDownOutside: l, ...f }) {
  const d = v.useContext(BC);
  Ve();
  const h = v.useRef({ open: d, at: 0 });
  v.useLayoutEffect(() => {
    h.current = { open: d, at: performance.now() };
  }, [d]);
  const m = (p) => {
    l?.(p), d !== null && (!h.current.open || p.detail.originalEvent.timeStamp < h.current.at) && p.preventDefault();
  }, g = [Zn.content, r].filter(Boolean).join(" "), y = /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsxs("div", { className: Zn.header, children: [
      /* @__PURE__ */ x.jsxs("div", { children: [
        /* @__PURE__ */ x.jsx(gL, { className: Zn.title, children: /* @__PURE__ */ x.jsx(rx, { text: n }) }),
        i ? /* @__PURE__ */ x.jsx(yL, { className: Zn.description, children: /* @__PURE__ */ x.jsx(rx, { text: i }) }) : null
      ] }),
      /* @__PURE__ */ x.jsx(bL, { className: Zn.close, "aria-label": "Close dialog", children: /* @__PURE__ */ x.jsx(lC, { size: 16, strokeWidth: 1.75, "aria-hidden": "true" }) })
    ] }),
    /* @__PURE__ */ x.jsx("div", { className: Zn.body, children: o })
  ] });
  return d === null ? /* @__PURE__ */ x.jsxs(ax, { children: [
    /* @__PURE__ */ x.jsx(ox, { className: `${Zn.overlay} ${Zn.keyframes}` }),
    /* @__PURE__ */ x.jsx(sx, { ...f, onPointerDownOutside: m, className: `${g} ${Zn.keyframes}`, children: y })
  ] }) : /* @__PURE__ */ x.jsx(ie, { children: d && /* @__PURE__ */ x.jsxs(ax, { forceMount: !0, children: [
    /* @__PURE__ */ x.jsx(ox, { asChild: !0, forceMount: !0, children: /* @__PURE__ */ x.jsx(xt.div, { className: `ms-island ms-arc-overlay ${Zn.overlay}`, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0, transition: uc }, transition: uc }) }),
    /* @__PURE__ */ x.jsx(sx, { ...f, onPointerDownOutside: m, asChild: !0, forceMount: !0, children: /* @__PURE__ */ x.jsx(xt.div, { className: g, initial: { opacity: 0 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, transition: uc }, transition: uc, children: y }) })
  ] }, "dialog") });
}
var ML = Object.defineProperty, NL = (n, i) => ML(n, "name", { value: i, configurable: !0 });
function fp(n, [i, o]) {
  return Math.min(o, Math.max(i, n));
}
NL(fp, "clamp");
const jL = ["top", "right", "bottom", "left"], Ba = Math.min, $i = Math.max, Pc = Math.round, cc = Math.floor, Ki = (n) => ({
  x: n,
  y: n
}), zL = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function PC(n, i, o) {
  return $i(n, Ba(i, o));
}
function ta(n, i) {
  return typeof n == "function" ? n(i) : n;
}
function Pa(n) {
  return n.split("-")[0];
}
function Xs(n) {
  return n.split("-")[1];
}
function yg(n) {
  return n === "x" ? "y" : "x";
}
function vg(n) {
  return n === "y" ? "height" : "width";
}
function Ti(n) {
  const i = n[0];
  return i === "t" || i === "b" ? "y" : "x";
}
function bg(n) {
  return yg(Ti(n));
}
function LL(n, i, o) {
  o === void 0 && (o = !1);
  const r = Xs(n), l = bg(n), f = vg(l);
  let d = l === "x" ? r === (o ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return i.reference[f] > i.floating[f] && (d = Uc(d)), [d, Uc(d)];
}
function VL(n) {
  const i = Uc(n);
  return [dp(n), i, dp(i)];
}
function dp(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const lx = ["left", "right"], ux = ["right", "left"], BL = ["top", "bottom"], PL = ["bottom", "top"];
function UL(n, i, o) {
  switch (n) {
    case "top":
    case "bottom":
      return o ? i ? ux : lx : i ? lx : ux;
    case "left":
    case "right":
      return i ? BL : PL;
    default:
      return [];
  }
}
function HL(n, i, o, r) {
  const l = Xs(n);
  let f = UL(Pa(n), o === "start", r);
  return l && (f = f.map((d) => d + "-" + l), i && (f = f.concat(f.map(dp)))), f;
}
function Uc(n) {
  const i = Pa(n);
  return zL[i] + n.slice(i.length);
}
function IL(n) {
  var i, o, r, l;
  return {
    top: (i = n.top) != null ? i : 0,
    right: (o = n.right) != null ? o : 0,
    bottom: (r = n.bottom) != null ? r : 0,
    left: (l = n.left) != null ? l : 0
  };
}
function UC(n) {
  return typeof n != "number" ? IL(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function Hc(n) {
  const {
    x: i,
    y: o,
    width: r,
    height: l
  } = n;
  return {
    width: r,
    height: l,
    top: o,
    left: i,
    right: i + r,
    bottom: o + l,
    x: i,
    y: o
  };
}
function cx(n, i, o) {
  let {
    reference: r,
    floating: l
  } = n;
  const f = Ti(i), d = bg(i), h = vg(d), m = Pa(i), g = f === "y", y = r.x + r.width / 2 - l.width / 2, p = r.y + r.height / 2 - l.height / 2, S = r[h] / 2 - l[h] / 2;
  let T;
  switch (m) {
    case "top":
      T = {
        x: y,
        y: r.y - l.height
      };
      break;
    case "bottom":
      T = {
        x: y,
        y: r.y + r.height
      };
      break;
    case "right":
      T = {
        x: r.x + r.width,
        y: p
      };
      break;
    case "left":
      T = {
        x: r.x - l.width,
        y: p
      };
      break;
    default:
      T = {
        x: r.x,
        y: r.y
      };
  }
  const E = Xs(i);
  return E && (T[d] += S * (E === "end" ? 1 : -1) * (o && g ? -1 : 1)), T;
}
async function qL(n, i) {
  var o;
  i === void 0 && (i = {});
  const {
    x: r,
    y: l,
    platform: f,
    rects: d,
    elements: h,
    strategy: m
  } = n, {
    boundary: g = "clippingAncestors",
    rootBoundary: y = "viewport",
    elementContext: p = "floating",
    altBoundary: S = !1,
    padding: T = 0
  } = ta(i, n), E = UC(T), _ = h[S ? p === "floating" ? "reference" : "floating" : p], R = Hc(await f.getClippingRect({
    element: (o = await (f.isElement == null ? void 0 : f.isElement(_))) == null || o ? _ : _.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(h.floating)),
    boundary: g,
    rootBoundary: y,
    strategy: m
  })), O = p === "floating" ? {
    x: r,
    y: l,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, A = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(h.floating)), D = await (f.isElement == null ? void 0 : f.isElement(A)) && await (f.getScale == null ? void 0 : f.getScale(A)) || {
    x: 1,
    y: 1
  }, U = Hc(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: h,
    rect: O,
    offsetParent: A,
    strategy: m
  }) : O);
  return {
    top: (R.top - U.top + E.top) / D.y,
    bottom: (U.bottom - R.bottom + E.bottom) / D.y,
    left: (R.left - U.left + E.left) / D.x,
    right: (U.right - R.right + E.right) / D.x
  };
}
const GL = 50, YL = async (n, i, o) => {
  const {
    placement: r = "bottom",
    strategy: l = "absolute",
    middleware: f = [],
    platform: d
  } = o, h = d.detectOverflow ? d : {
    ...d,
    detectOverflow: qL
  }, m = await (d.isRTL == null ? void 0 : d.isRTL(i));
  let g = await d.getElementRects({
    reference: n,
    floating: i,
    strategy: l
  }), {
    x: y,
    y: p
  } = cx(g, r, m), S = r, T = 0;
  const E = {};
  for (let w = 0; w < f.length; w++) {
    const _ = f[w];
    if (!_)
      continue;
    const {
      name: R,
      fn: O
    } = _, {
      x: A,
      y: D,
      data: U,
      reset: z
    } = await O({
      x: y,
      y: p,
      initialPlacement: r,
      placement: S,
      strategy: l,
      middlewareData: E,
      rects: g,
      platform: h,
      elements: {
        reference: n,
        floating: i
      }
    });
    y = A ?? y, p = D ?? p, E[R] = {
      ...E[R],
      ...U
    }, z && T < GL && (T++, typeof z == "object" && (z.placement && (S = z.placement), z.rects && (g = z.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: i,
      strategy: l
    }) : z.rects), {
      x: y,
      y: p
    } = cx(g, S, m)), w = -1);
  }
  return {
    x: y,
    y: p,
    placement: S,
    strategy: l,
    middlewareData: E
  };
}, kL = (n) => ({
  name: "arrow",
  options: n,
  async fn(i) {
    const {
      x: o,
      y: r,
      placement: l,
      rects: f,
      platform: d,
      elements: h,
      middlewareData: m
    } = i, {
      element: g,
      padding: y = 0
    } = ta(n, i) || {};
    if (g == null)
      return {};
    const p = UC(y), S = {
      x: o,
      y: r
    }, T = bg(l), E = vg(T), w = await d.getDimensions(g), _ = T === "y", R = _ ? "top" : "left", O = _ ? "bottom" : "right", A = _ ? "clientHeight" : "clientWidth", D = f.reference[E] + f.reference[T] - S[T] - f.floating[E], U = S[T] - f.reference[T], z = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(g));
    let V = z ? z[A] : 0;
    (!V || !await (d.isElement == null ? void 0 : d.isElement(z))) && (V = h.floating[A] || f.floating[E]);
    const I = D / 2 - U / 2, F = V / 2 - w[E] / 2 - 1, Z = Ba(p[R], F), W = Ba(p[O], F), et = V - w[E] - W, st = V / 2 - w[E] / 2 + I, ft = PC(Z, st, et), ht = !m.arrow && Xs(l) != null && st !== ft && f.reference[E] / 2 - (st < Z ? Z : W) - w[E] / 2 < 0, q = ht ? st < Z ? st - Z : st - et : 0;
    return {
      [T]: S[T] + q,
      data: {
        [T]: ft,
        centerOffset: st - ft - q,
        ...ht && {
          alignmentOffset: q
        }
      },
      reset: ht
    };
  }
}), FL = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(i) {
      var o, r;
      const {
        placement: l,
        middlewareData: f,
        rects: d,
        initialPlacement: h,
        platform: m,
        elements: g
      } = i, {
        mainAxis: y = !0,
        crossAxis: p = !0,
        fallbackPlacements: S,
        fallbackStrategy: T = "bestFit",
        fallbackAxisSideDirection: E = "none",
        flipAlignment: w = !0,
        ..._
      } = ta(n, i);
      if ((o = f.arrow) != null && o.alignmentOffset)
        return {};
      const R = Pa(l), O = Ti(h), A = Pa(h) === h, D = await (m.isRTL == null ? void 0 : m.isRTL(g.floating)), U = S || (A || !w ? [Uc(h)] : VL(h)), z = E !== "none";
      !S && z && U.push(...HL(h, w, E, D));
      const V = [h, ...U], I = await m.detectOverflow(i, _), F = [];
      let Z = ((r = f.flip) == null ? void 0 : r.overflows) || [];
      if (y && F.push(I[R]), p) {
        const ft = LL(l, d, D);
        F.push(I[ft[0]], I[ft[1]]);
      }
      if (Z = [...Z, {
        placement: l,
        overflows: F
      }], !F.every((ft) => ft <= 0)) {
        var W, et;
        const ft = (((W = f.flip) == null ? void 0 : W.index) || 0) + 1, ht = V[ft];
        if (ht && (!(p === "alignment" ? O !== Ti(ht) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        Z.every((Y) => Ti(Y.placement) === O ? Y.overflows[0] > 0 : !0)))
          return {
            data: {
              index: ft,
              overflows: Z
            },
            reset: {
              placement: ht
            }
          };
        let q = (et = Z.filter((X) => X.overflows[0] <= 0).sort((X, Y) => X.overflows[1] - Y.overflows[1])[0]) == null ? void 0 : et.placement;
        if (!q)
          switch (T) {
            case "bestFit": {
              var st;
              const X = (st = Z.filter((Y) => {
                if (z) {
                  const tt = Ti(Y.placement);
                  return tt === O || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  tt === "y";
                }
                return !0;
              }).map((Y) => [Y.placement, Y.overflows.filter((tt) => tt > 0).reduce((tt, lt) => tt + lt, 0)]).sort((Y, tt) => Y[1] - tt[1])[0]) == null ? void 0 : st[0];
              X && (q = X);
              break;
            }
            case "initialPlacement":
              q = h;
              break;
          }
        if (l !== q)
          return {
            reset: {
              placement: q
            }
          };
      }
      return {};
    }
  };
};
function fx(n, i) {
  return {
    top: n.top - i.height,
    right: n.right - i.width,
    bottom: n.bottom - i.height,
    left: n.left - i.width
  };
}
function dx(n) {
  return jL.some((i) => n[i] >= 0);
}
const XL = function(n) {
  return n === void 0 && (n = {}), {
    name: "hide",
    options: n,
    async fn(i) {
      const {
        rects: o,
        platform: r
      } = i, {
        strategy: l = "referenceHidden",
        ...f
      } = ta(n, i);
      switch (l) {
        case "referenceHidden": {
          const d = await r.detectOverflow(i, {
            ...f,
            elementContext: "reference"
          }), h = fx(d, o.reference);
          return {
            data: {
              referenceHiddenOffsets: h,
              referenceHidden: dx(h)
            }
          };
        }
        case "escaped": {
          const d = await r.detectOverflow(i, {
            ...f,
            altBoundary: !0
          }), h = fx(d, o.floating);
          return {
            data: {
              escapedOffsets: h,
              escaped: dx(h)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, HC = /* @__PURE__ */ new Set(["left", "top"]);
async function $L(n, i) {
  const {
    placement: o,
    platform: r,
    elements: l
  } = n, f = await (r.isRTL == null ? void 0 : r.isRTL(l.floating)), d = Pa(o), h = Xs(o), m = Ti(o) === "y", g = HC.has(d) ? -1 : 1, y = f && m ? -1 : 1, p = ta(i, n);
  let {
    mainAxis: S,
    crossAxis: T,
    alignmentAxis: E
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return h && typeof E == "number" && (T = h === "end" ? E * -1 : E), m ? {
    x: T * y,
    y: S * g
  } : {
    x: S * g,
    y: T * y
  };
}
const KL = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(i) {
      var o, r;
      const {
        x: l,
        y: f,
        placement: d,
        middlewareData: h
      } = i, m = await $L(i, n);
      return d === ((o = h.offset) == null ? void 0 : o.placement) && (r = h.arrow) != null && r.alignmentOffset ? {} : {
        x: l + m.x,
        y: f + m.y,
        data: {
          ...m,
          placement: d
        }
      };
    }
  };
}, ZL = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(i) {
      const {
        x: o,
        y: r,
        placement: l,
        platform: f
      } = i, {
        mainAxis: d = !0,
        crossAxis: h = !1,
        limiter: m = {
          fn: (O) => {
            let {
              x: A,
              y: D
            } = O;
            return {
              x: A,
              y: D
            };
          }
        },
        ...g
      } = ta(n, i), y = {
        x: o,
        y: r
      }, p = await f.detectOverflow(i, g), S = Ti(l), T = yg(S);
      let E = y[T], w = y[S];
      const _ = (O, A) => PC(A + p[O === "y" ? "top" : "left"], A, A - p[O === "y" ? "bottom" : "right"]);
      d && (E = _(T, E)), h && (w = _(S, w));
      const R = m.fn({
        ...i,
        [T]: E,
        [S]: w
      });
      return {
        ...R,
        data: {
          x: R.x - o,
          y: R.y - r,
          enabled: {
            [T]: d,
            [S]: h
          }
        }
      };
    }
  };
}, QL = function(n) {
  return n === void 0 && (n = {}), {
    options: n,
    fn(i) {
      var o, r;
      const {
        x: l,
        y: f,
        placement: d,
        rects: h,
        middlewareData: m
      } = i, {
        offset: g = 0,
        mainAxis: y = !0,
        crossAxis: p = !0
      } = ta(n, i), S = {
        x: l,
        y: f
      }, T = Ti(d), E = yg(T);
      let w = S[E], _ = S[T];
      const R = ta(g, i), O = typeof R == "number" ? {
        mainAxis: R,
        crossAxis: 0
      } : {
        mainAxis: (o = R.mainAxis) != null ? o : 0,
        crossAxis: (r = R.crossAxis) != null ? r : 0
      };
      if (y) {
        const U = E === "y" ? "height" : "width", z = h.reference[E] - h.floating[U] + O.mainAxis, V = h.reference[E] + h.reference[U] - O.mainAxis;
        w < z ? w = z : w > V && (w = V);
      }
      if (p) {
        var A, D;
        const U = E === "y" ? "width" : "height", z = HC.has(Pa(d)), V = h.reference[T] - h.floating[U] + (z && ((A = m.offset) == null ? void 0 : A[T]) || 0) + (z ? 0 : O.crossAxis), I = h.reference[T] + h.reference[U] + (z ? 0 : ((D = m.offset) == null ? void 0 : D[T]) || 0) - (z ? O.crossAxis : 0);
        _ < V ? _ = V : _ > I && (_ = I);
      }
      return {
        [E]: w,
        [T]: _
      };
    }
  };
}, JL = function(n) {
  return n === void 0 && (n = {}), {
    name: "size",
    options: n,
    async fn(i) {
      const {
        placement: o,
        rects: r,
        platform: l,
        elements: f
      } = i, {
        apply: d = () => {
        },
        ...h
      } = ta(n, i), m = await l.detectOverflow(i, h), g = Pa(o), y = Xs(o), p = Ti(o) === "y", {
        width: S,
        height: T
      } = r.floating;
      let E, w;
      g === "top" || g === "bottom" ? (E = g, w = y === (await (l.isRTL == null ? void 0 : l.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (w = g, E = y === "end" ? "top" : "bottom");
      const _ = T - m.top - m.bottom, R = S - m.left - m.right, O = Ba(T - m[E], _), A = Ba(S - m[w], R), D = i.middlewareData.shift, U = !D;
      let z = O, V = A;
      D != null && D.enabled.x && (V = R), D != null && D.enabled.y && (z = _), U && !y && (p ? V = S - 2 * $i(m.left, m.right) : z = T - 2 * $i(m.top, m.bottom)), await d({
        ...i,
        availableWidth: V,
        availableHeight: z
      });
      const I = await l.getDimensions(f.floating);
      return S !== I.width || T !== I.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ef() {
  return typeof window < "u";
}
function $s(n) {
  return IC(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function cn(n) {
  var i;
  return (n == null || (i = n.ownerDocument) == null ? void 0 : i.defaultView) || window;
}
function ea(n) {
  var i;
  return (i = (IC(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : i.documentElement;
}
function IC(n) {
  return ef() ? n instanceof Node || n instanceof cn(n).Node : !1;
}
function _i(n) {
  return ef() ? n instanceof Element || n instanceof cn(n).Element : !1;
}
function Ia(n) {
  return ef() ? n instanceof HTMLElement || n instanceof cn(n).HTMLElement : !1;
}
function hx(n) {
  return !ef() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof cn(n).ShadowRoot;
}
function nf(n) {
  const {
    overflow: i,
    overflowX: o,
    overflowY: r,
    display: l
  } = Ai(n);
  return /auto|scroll|overlay|hidden|clip/.test(i + r + o) && l !== "inline" && l !== "contents";
}
function WL(n) {
  return /^(table|td|th)$/.test($s(n));
}
function af(n) {
  try {
    if (n.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return n.matches(":modal");
  } catch {
    return !1;
  }
}
const t4 = /transform|translate|scale|rotate|perspective|filter/, e4 = /paint|layout|strict|content/, vo = (n) => !!n && n !== "none";
let ym;
function Sg(n) {
  const i = _i(n) ? Ai(n) : n;
  return vo(i.transform) || vo(i.translate) || vo(i.scale) || vo(i.rotate) || vo(i.perspective) || !xg() && (vo(i.backdropFilter) || vo(i.filter)) || t4.test(i.willChange || "") || e4.test(i.contain || "");
}
function n4(n) {
  let i = _o(n);
  for (; Ia(i) && !fl(i); ) {
    if (Sg(i))
      return i;
    if (af(i))
      return null;
    i = _o(i);
  }
  return null;
}
function xg() {
  return ym == null && (ym = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), ym;
}
function fl(n) {
  return /^(html|body|#document)$/.test($s(n));
}
function Ai(n) {
  return cn(n).getComputedStyle(n);
}
function of(n) {
  return _i(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function _o(n) {
  if ($s(n) === "html")
    return n;
  const i = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    hx(n) && n.host || // Fallback.
    ea(n)
  );
  return hx(i) ? i.host : i;
}
function qC(n) {
  const i = _o(n);
  return fl(i) ? (n.ownerDocument || n).body : Ia(i) && nf(i) ? i : qC(i);
}
function dl(n, i, o) {
  var r;
  i === void 0 && (i = []), o === void 0 && (o = !0);
  const l = qC(n), f = l === ((r = n.ownerDocument) == null ? void 0 : r.body), d = cn(l);
  if (f) {
    const h = hp(d);
    return i.concat(d, d.visualViewport || [], nf(l) ? l : [], h && o ? dl(h) : []);
  } else
    return i.concat(l, dl(l, [], o));
}
function hp(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function GC(n) {
  const i = Ai(n);
  let o = parseFloat(i.width) || 0, r = parseFloat(i.height) || 0;
  const l = Ia(n), f = l ? n.offsetWidth : o, d = l ? n.offsetHeight : r, h = Pc(o) !== f || Pc(r) !== d;
  return h && (o = f, r = d), {
    width: o,
    height: r,
    $: h
  };
}
function Tg(n) {
  return _i(n) ? n : n.contextElement;
}
function Vs(n) {
  const i = Tg(n);
  if (!Ia(i))
    return Ki(1);
  const o = i.getBoundingClientRect(), {
    width: r,
    height: l,
    $: f
  } = GC(i);
  let d = (f ? Pc(o.width) : o.width) / r, h = (f ? Pc(o.height) : o.height) / l;
  return (!d || !Number.isFinite(d)) && (d = 1), (!h || !Number.isFinite(h)) && (h = 1), {
    x: d,
    y: h
  };
}
const i4 = /* @__PURE__ */ Ki(0);
function YC(n) {
  const i = cn(n);
  return !xg() || !i.visualViewport ? i4 : {
    x: i.visualViewport.offsetLeft,
    y: i.visualViewport.offsetTop
  };
}
function a4(n, i, o) {
  return i === void 0 && (i = !1), !!o && i && o === cn(n);
}
function Ao(n, i, o, r) {
  i === void 0 && (i = !1), o === void 0 && (o = !1);
  const l = n.getBoundingClientRect(), f = Tg(n);
  let d = Ki(1);
  i && (r ? _i(r) && (d = Vs(r)) : d = Vs(n));
  const h = a4(f, o, r) ? YC(f) : Ki(0);
  let m = (l.left + h.x) / d.x, g = (l.top + h.y) / d.y, y = l.width / d.x, p = l.height / d.y;
  if (f && r) {
    const S = cn(f), T = _i(r) ? cn(r) : r;
    let E = S, w = hp(E);
    for (; w && T !== E; ) {
      const _ = Vs(w), R = w.getBoundingClientRect(), O = Ai(w), A = R.left + (w.clientLeft + parseFloat(O.paddingLeft)) * _.x, D = R.top + (w.clientTop + parseFloat(O.paddingTop)) * _.y;
      m *= _.x, g *= _.y, y *= _.x, p *= _.y, m += A, g += D, E = cn(w), w = hp(E);
    }
  }
  return Hc({
    width: y,
    height: p,
    x: m,
    y: g
  });
}
function sf(n, i) {
  const o = of(n).scrollLeft;
  return i ? i.left + o : Ao(ea(n)).left + o;
}
function kC(n, i) {
  const o = n.getBoundingClientRect(), r = o.left + i.scrollLeft - sf(n, o), l = o.top + i.scrollTop;
  return {
    x: r,
    y: l
  };
}
function o4(n) {
  let {
    elements: i,
    rect: o,
    offsetParent: r,
    strategy: l
  } = n;
  const f = l === "fixed", d = ea(r), h = i ? af(i.floating) : !1;
  if (r === d || h && f)
    return o;
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  }, g = Ki(1);
  const y = Ki(0), p = Ia(r);
  if ((p || !f) && (($s(r) !== "body" || nf(d)) && (m = of(r)), p)) {
    const T = Ao(r);
    g = Vs(r), y.x = T.x + r.clientLeft, y.y = T.y + r.clientTop;
  }
  const S = d && !p && !f ? kC(d, m) : Ki(0);
  return {
    width: o.width * g.x,
    height: o.height * g.y,
    x: o.x * g.x - m.scrollLeft * g.x + y.x + S.x,
    y: o.y * g.y - m.scrollTop * g.y + y.y + S.y
  };
}
function s4(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function r4(n) {
  const i = of(n), o = n.ownerDocument.body, r = $i(n.scrollWidth, n.clientWidth, o.scrollWidth, o.clientWidth), l = $i(n.scrollHeight, n.clientHeight, o.scrollHeight, o.clientHeight);
  let f = -i.scrollLeft + sf(n);
  const d = -i.scrollTop;
  return Ai(o).direction === "rtl" && (f += $i(n.clientWidth, o.clientWidth) - r), {
    width: r,
    height: l,
    x: f,
    y: d
  };
}
const l4 = 25;
function u4(n, i, o) {
  o === void 0 && (o = "viewport");
  const r = o === "layoutViewport", l = cn(n), f = ea(n), d = l.visualViewport;
  let h = f.clientWidth, m = f.clientHeight, g = 0, y = 0;
  if (d) {
    const S = !xg() || i === "fixed";
    r ? S || (g = -d.offsetLeft, y = -d.offsetTop) : (h = d.width, m = d.height, S && (g = d.offsetLeft, y = d.offsetTop));
  }
  if (sf(f) <= 0) {
    const S = f.ownerDocument, T = S.body, E = getComputedStyle(T), w = S.compatMode === "CSS1Compat" && parseFloat(E.marginLeft) + parseFloat(E.marginRight) || 0, _ = Math.abs(f.clientWidth - T.clientWidth - w), R = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? _ / 2 : _;
    R <= l4 && (h -= R);
  }
  return {
    width: h,
    height: m,
    x: g,
    y
  };
}
function c4(n, i) {
  const o = Ao(n, !0, i === "fixed"), r = o.top + n.clientTop, l = o.left + n.clientLeft, f = Vs(n), d = n.clientWidth * f.x, h = n.clientHeight * f.y, m = l * f.x, g = r * f.y;
  return {
    width: d,
    height: h,
    x: m,
    y: g
  };
}
function mx(n, i, o) {
  let r;
  if (i === "viewport" || i === "layoutViewport")
    r = u4(n, o, i);
  else if (i === "document")
    r = r4(ea(n));
  else if (_i(i))
    r = c4(i, o);
  else {
    const l = YC(n);
    r = {
      x: i.x - l.x,
      y: i.y - l.y,
      width: i.width,
      height: i.height
    };
  }
  return Hc(r);
}
function f4(n, i) {
  const o = i.get(n);
  if (o)
    return o;
  let r = dl(n, [], !1).filter((h) => _i(h) && $s(h) !== "body"), l = null;
  const f = Ai(n).position === "fixed";
  let d = f ? _o(n) : n;
  for (; _i(d) && !fl(d); ) {
    const h = Ai(d), m = Sg(d), g = l ? l.position : f ? "fixed" : "";
    !m && (g === "fixed" || g === "absolute" && h.position === "static") ? r = r.filter((p) => p !== d) : l = h, d = _o(d);
  }
  return i.set(n, r), r;
}
function d4(n) {
  let {
    element: i,
    boundary: o,
    rootBoundary: r,
    strategy: l
  } = n;
  const d = [...o === "clippingAncestors" ? af(i) ? [] : f4(i, this._c) : [].concat(o), r], h = mx(i, d[0], l);
  let m = h.top, g = h.right, y = h.bottom, p = h.left;
  for (let S = 1; S < d.length; S++) {
    const T = mx(i, d[S], l);
    m = $i(T.top, m), g = Ba(T.right, g), y = Ba(T.bottom, y), p = $i(T.left, p);
  }
  return {
    width: g - p,
    height: y - m,
    x: p,
    y: m
  };
}
function h4(n) {
  const {
    width: i,
    height: o
  } = GC(n);
  return {
    width: i,
    height: o
  };
}
function m4(n, i, o) {
  const r = Ia(i), l = ea(i), f = o === "fixed", d = Ao(n, !0, f, i);
  let h = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const m = Ki(0);
  if ((r || !f) && (($s(i) !== "body" || nf(l)) && (h = of(i)), r)) {
    const S = Ao(i, !0, f, i);
    m.x = S.x + i.clientLeft, m.y = S.y + i.clientTop;
  }
  !r && l && (m.x = sf(l));
  const g = l && !r && !f ? kC(l, h) : Ki(0), y = d.left + h.scrollLeft - m.x - g.x, p = d.top + h.scrollTop - m.y - g.y;
  return {
    x: y,
    y: p,
    width: d.width,
    height: d.height
  };
}
function vm(n) {
  return Ai(n).position === "static";
}
function px(n, i) {
  if (!Ia(n) || Ai(n).position === "fixed")
    return null;
  if (i)
    return i(n);
  let o = n.offsetParent;
  return ea(n) === o && (o = o.ownerDocument.body), o;
}
function FC(n, i) {
  const o = cn(n);
  if (af(n))
    return o;
  if (!Ia(n)) {
    let l = _o(n);
    for (; l && !fl(l); ) {
      if (_i(l) && !vm(l))
        return l;
      l = _o(l);
    }
    return o;
  }
  let r = px(n, i);
  for (; r && WL(r) && vm(r); )
    r = px(r, i);
  return r && fl(r) && vm(r) && !Sg(r) ? o : r || n4(n) || o;
}
const p4 = async function(n) {
  const i = this.getOffsetParent || FC, o = this.getDimensions, r = await o(n.floating);
  return {
    reference: m4(n.reference, await i(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function g4(n) {
  return Ai(n).direction === "rtl";
}
const y4 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: o4,
  getDocumentElement: ea,
  getClippingRect: d4,
  getOffsetParent: FC,
  getElementRects: p4,
  getClientRects: s4,
  getDimensions: h4,
  getScale: Vs,
  isElement: _i,
  isRTL: g4
};
function XC(n, i) {
  return n.x === i.x && n.y === i.y && n.width === i.width && n.height === i.height;
}
function v4(n, i, o) {
  let r = null, l;
  const f = ea(n);
  function d() {
    var y;
    clearTimeout(l), (y = r) == null || y.disconnect(), r = null;
  }
  function h(y, p) {
    y === void 0 && (y = !1), p === void 0 && (p = 1), d();
    const S = n.getBoundingClientRect(), {
      left: T,
      top: E,
      width: w,
      height: _
    } = S;
    if (y || i(), !w || !_)
      return;
    const R = cc(E), O = cc(f.clientWidth - (T + w)), A = cc(f.clientHeight - (E + _)), D = cc(T), z = {
      rootMargin: -R + "px " + -O + "px " + -A + "px " + -D + "px",
      threshold: $i(0, Ba(1, p)) || 1
    };
    let V = !0;
    function I(F) {
      const Z = F[0].intersectionRatio;
      if (!XC(S, n.getBoundingClientRect()))
        return h();
      if (Z !== p) {
        if (!V)
          return h();
        Z ? h(!1, Z) : l = setTimeout(() => {
          h(!1, 1e-7);
        }, 1e3);
      }
      V = !1;
    }
    try {
      r = new IntersectionObserver(I, {
        ...z,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(I, z);
    }
    r.observe(n);
  }
  const m = cn(n), g = () => h(o);
  return m.addEventListener("resize", g), h(!0), () => {
    m.removeEventListener("resize", g), d();
  };
}
function b4(n, i, o, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: l = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: h = typeof IntersectionObserver == "function",
    animationFrame: m = !1
  } = r, g = Tg(n), y = l || f ? [...g ? dl(g) : [], ...i ? dl(i) : []] : [];
  y.forEach((R) => {
    l && R.addEventListener("scroll", o), f && R.addEventListener("resize", o);
  });
  const p = g && h ? v4(g, o, f) : null;
  let S = -1, T = null;
  d && (T = new ResizeObserver((R) => {
    let [O] = R;
    O && O.target === g && T && i && (T.unobserve(i), cancelAnimationFrame(S), S = requestAnimationFrame(() => {
      var A;
      (A = T) == null || A.observe(i);
    })), o();
  }), g && !m && T.observe(g), i && T.observe(i));
  let E, w = m ? Ao(n) : null;
  m && _();
  function _() {
    const R = Ao(n);
    w && !XC(w, R) && o(), w = R, E = requestAnimationFrame(_);
  }
  return o(), () => {
    var R;
    y.forEach((O) => {
      l && O.removeEventListener("scroll", o), f && O.removeEventListener("resize", o);
    }), p?.(), (R = T) == null || R.disconnect(), T = null, m && cancelAnimationFrame(E);
  };
}
const S4 = KL, x4 = ZL, T4 = FL, E4 = JL, C4 = XL, gx = kL, w4 = QL, _4 = (n, i, o) => {
  const r = /* @__PURE__ */ new Map(), l = o ?? {}, f = {
    ...y4,
    ...l.platform,
    _c: r
  };
  return YL(n, i, {
    ...l,
    platform: f
  });
};
var A4 = typeof document < "u", R4 = function() {
}, wc = A4 ? v.useLayoutEffect : R4;
function Ic(n, i) {
  if (n === i)
    return !0;
  if (typeof n != typeof i)
    return !1;
  if (typeof n == "function" && n.toString() === i.toString())
    return !0;
  let o, r, l;
  if (n && i && typeof n == "object") {
    if (Array.isArray(n)) {
      if (o = n.length, o !== i.length) return !1;
      for (r = o; r-- !== 0; )
        if (!Ic(n[r], i[r]))
          return !1;
      return !0;
    }
    if (l = Object.keys(n), o = l.length, o !== Object.keys(i).length)
      return !1;
    for (r = o; r-- !== 0; )
      if (!{}.hasOwnProperty.call(i, l[r]))
        return !1;
    for (r = o; r-- !== 0; ) {
      const f = l[r];
      if (!(f === "_owner" && n.$$typeof) && !Ic(n[f], i[f]))
        return !1;
    }
    return !0;
  }
  return n !== n && i !== i;
}
function $C(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function yx(n, i) {
  const o = $C(n);
  return Math.round(i * o) / o;
}
function bm(n) {
  const i = v.useRef(n);
  return wc(() => {
    i.current = n;
  }), i;
}
function O4(n) {
  n === void 0 && (n = {});
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: r = [],
    platform: l,
    elements: {
      reference: f,
      floating: d
    } = {},
    transform: h = !0,
    whileElementsMounted: m,
    open: g
  } = n, [y, p] = v.useState({
    x: 0,
    y: 0,
    strategy: o,
    placement: i,
    middlewareData: {},
    isPositioned: !1
  }), [S, T] = v.useState(r);
  Ic(S, r) || T(r);
  const [E, w] = v.useState(null), [_, R] = v.useState(null), O = v.useCallback((Y) => {
    Y !== z.current && (z.current = Y, w(Y));
  }, []), A = v.useCallback((Y) => {
    Y !== V.current && (V.current = Y, R(Y));
  }, []), D = f || E, U = d || _, z = v.useRef(null), V = v.useRef(null), I = v.useRef(y), F = m != null, Z = bm(m), W = bm(l), et = bm(g), st = v.useCallback(() => {
    if (!z.current || !V.current)
      return;
    const Y = {
      placement: i,
      strategy: o,
      middleware: S
    };
    W.current && (Y.platform = W.current), _4(z.current, V.current, Y).then((tt) => {
      const lt = {
        ...tt,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: et.current !== !1
      };
      ft.current && !Ic(I.current, lt) && (I.current = lt, xl.flushSync(() => {
        p(lt);
      }));
    });
  }, [S, i, o, W, et]);
  wc(() => {
    g === !1 && I.current.isPositioned && (I.current.isPositioned = !1, p((Y) => ({
      ...Y,
      isPositioned: !1
    })));
  }, [g]);
  const ft = v.useRef(!1);
  wc(() => (ft.current = !0, () => {
    ft.current = !1;
  }), []), wc(() => {
    if (D && (z.current = D), U && (V.current = U), D && U) {
      if (Z.current)
        return Z.current(D, U, st);
      st();
    }
  }, [D, U, st, Z, F]);
  const ht = v.useMemo(() => ({
    reference: z,
    floating: V,
    setReference: O,
    setFloating: A
  }), [O, A]), q = v.useMemo(() => ({
    reference: D,
    floating: U
  }), [D, U]), X = v.useMemo(() => {
    const Y = {
      position: o,
      left: 0,
      top: 0
    };
    if (!q.floating)
      return Y;
    const tt = yx(q.floating, y.x), lt = yx(q.floating, y.y);
    return h ? {
      ...Y,
      transform: "translate(" + tt + "px, " + lt + "px)",
      ...$C(q.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: o,
      left: tt,
      top: lt
    };
  }, [o, h, q.floating, y.x, y.y]);
  return v.useMemo(() => ({
    ...y,
    update: st,
    refs: ht,
    elements: q,
    floatingStyles: X
  }), [y, st, ht, q, X]);
}
const D4 = (n) => {
  function i(o) {
    return {}.hasOwnProperty.call(o, "current");
  }
  return {
    name: "arrow",
    options: n,
    fn(o) {
      const {
        element: r,
        padding: l
      } = typeof n == "function" ? n(o) : n;
      return r && i(r) ? r.current != null ? gx({
        element: r.current,
        padding: l
      }).fn(o) : {} : r ? gx({
        element: r,
        padding: l
      }).fn(o) : {};
    }
  };
}, M4 = (n, i) => {
  const o = S4(n);
  return {
    name: o.name,
    fn: o.fn,
    options: [n, i]
  };
}, N4 = (n, i) => {
  const o = x4(n);
  return {
    name: o.name,
    fn: o.fn,
    options: [n, i]
  };
}, j4 = (n, i) => ({
  fn: w4(n).fn,
  options: [n, i]
}), z4 = (n, i) => {
  const o = T4(n);
  return {
    name: o.name,
    fn: o.fn,
    options: [n, i]
  };
}, L4 = (n, i) => {
  const o = E4(n);
  return {
    name: o.name,
    fn: o.fn,
    options: [n, i]
  };
}, V4 = (n, i) => {
  const o = C4(n);
  return {
    name: o.name,
    fn: o.fn,
    options: [n, i]
  };
}, B4 = (n, i) => {
  const o = D4(n);
  return {
    name: o.name,
    fn: o.fn,
    options: [n, i]
  };
};
var P4 = Object.defineProperty, U4 = (n, i) => P4(n, "name", { value: i, configurable: !0 });
function KC(n) {
  const [i, o] = v.useState(void 0);
  return ue(() => {
    if (n) {
      o({ width: n.offsetWidth, height: n.offsetHeight });
      let r = 0;
      const l = new ResizeObserver((f) => {
        if (!Array.isArray(f) || !f.length)
          return;
        const d = f[0];
        window.cancelAnimationFrame(r), r = window.requestAnimationFrame(() => {
          let h, m;
          if ("borderBoxSize" in d) {
            const g = d.borderBoxSize, y = Array.isArray(g) ? g[0] : g;
            h = y.inlineSize, m = y.blockSize;
          } else
            h = n.offsetWidth, m = n.offsetHeight;
          o({ width: h, height: m });
        });
      });
      return l.observe(n, { box: "border-box" }), () => {
        window.cancelAnimationFrame(r), l.unobserve(n);
      };
    } else
      o(void 0);
  }, [n]), i;
}
U4(KC, "useSize");
var H4 = Object.defineProperty, ja = (n, i) => H4(n, "name", { value: i, configurable: !0 }), vx = {
  Partial: "partial"
}, bx = {
  Optimized: "optimized",
  Always: "always"
}, ZC = "Popper", [QC, rf] = /* @__PURE__ */ ii(ZC), [I4, JC] = QC(ZC), WC = /* @__PURE__ */ ja((n) => {
  const { __scopePopper: i, children: o } = n, [r, l] = v.useState(null), [f, d] = v.useState(void 0);
  return /* @__PURE__ */ x.jsx(
    I4,
    {
      scope: i,
      anchor: r,
      onAnchorChange: l,
      placementState: f,
      setPlacementState: d,
      children: o
    }
  );
}, "Popper"), q4 = "PopperAnchor", tw = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ ja(function(i, o) {
    const { __scopePopper: r, virtualRef: l, ...f } = i, d = JC(q4, r), h = v.useRef(null), m = d.onAnchorChange, g = v.useCallback(
      (w) => {
        h.current = w, w && m(w);
      },
      [m]
    ), y = Jt(o, g), p = v.useRef(null);
    v.useEffect(() => {
      if (!l)
        return;
      const w = p.current;
      p.current = l.current, w !== p.current && m(p.current);
    });
    const S = d.placementState && lf(d.placementState), T = S?.[0], E = S?.[1];
    return l ? null : /* @__PURE__ */ x.jsx(
      qt.div,
      {
        "data-radix-popper-side": T,
        "data-radix-popper-align": E,
        ...f,
        ref: y
      }
    );
  }, "PopperAnchor")
), ew = "PopperContent", [G4, $P] = QC(ew), nw = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ ja(function(i, o) {
    const {
      __scopePopper: r,
      side: l = "bottom",
      sideOffset: f = 0,
      align: d = "center",
      alignOffset: h = 0,
      arrowPadding: m = 0,
      avoidCollisions: g = !0,
      collisionBoundary: y = [],
      collisionPadding: p = 0,
      sticky: S = vx.Partial,
      hideWhenDetached: T = !1,
      updatePositionStrategy: E = bx.Optimized,
      onPlaced: w,
      ..._
    } = i, R = JC(ew, r), [O, A] = v.useState(null), D = Jt(o, A), [U, z] = v.useState(null), V = KC(U), I = V?.width ?? 0, F = V?.height ?? 0, Z = l + (d !== "center" ? "-" + d : ""), W = typeof p == "number" ? p : { top: 0, right: 0, bottom: 0, left: 0, ...p }, et = Array.isArray(y) ? y : [y], st = et.length > 0, ft = {
      padding: W,
      boundary: et.filter(iw),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: st
    }, { refs: ht, floatingStyles: q, placement: X, isPositioned: Y, middlewareData: tt } = O4({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: Z,
      whileElementsMounted: /* @__PURE__ */ ja((...yt) => b4(...yt, {
        animationFrame: E === bx.Always
      }), "whileElementsMounted"),
      elements: {
        reference: R.anchor
      },
      middleware: [
        M4({ mainAxis: f + F, alignmentAxis: h }),
        g && N4({
          mainAxis: !0,
          crossAxis: !1,
          limiter: S === vx.Partial ? j4() : void 0,
          ...ft
        }),
        g && z4({ ...ft }),
        L4({
          ...ft,
          apply: /* @__PURE__ */ ja(({ elements: yt, rects: bt, availableWidth: nt, availableHeight: at }) => {
            const { width: Vt, height: we } = bt.reference, ae = yt.floating.style;
            ae.setProperty("--radix-popper-available-width", `${nt}px`), ae.setProperty("--radix-popper-available-height", `${at}px`), ae.setProperty("--radix-popper-anchor-width", `${Vt}px`), ae.setProperty("--radix-popper-anchor-height", `${we}px`);
          }, "apply")
        }),
        U && B4({ element: U, padding: m }),
        Y4({ arrowWidth: I, arrowHeight: F }),
        T && V4({
          strategy: "referenceHidden",
          ...ft,
          // `hide` detects whether the anchor (reference) is clipped, so when
          // no explicit `collisionBoundary` is set we fall back to Floating
          // UI's default clipping ancestors (e.g. a scrollable menu). This
          // lets an occluded submenu hide once its anchor scrolls out of view
          // (#3237). The collision/size middlewares deliberately keep the
          // viewport-based default to avoid clamping content rendered inside
          // transformed or overflow-clipping portal containers.
          boundary: st ? ft.boundary : void 0
        })
      ]
    }), lt = R.setPlacementState;
    ue(() => (lt(X), () => {
      lt(void 0);
    }), [X, lt]);
    const [Dt, Mt] = lf(X), te = ni(w);
    ue(() => {
      Y && te?.();
    }, [Y, te]);
    const N = tt.arrow?.x, Q = tt.arrow?.y, rt = tt.arrow?.centerOffset !== 0, [ut, it] = v.useState();
    return ue(() => {
      O && it(window.getComputedStyle(O).zIndex);
    }, [O]), /* @__PURE__ */ x.jsx(
      "div",
      {
        ref: ht.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...q,
          transform: Y ? q.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ut,
          "--radix-popper-transform-origin": [
            tt.transformOrigin?.x,
            tt.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...tt.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: i.dir,
        children: /* @__PURE__ */ x.jsx(
          G4,
          {
            scope: r,
            placedSide: Dt,
            placedAlign: Mt,
            onArrowChange: z,
            arrowX: N,
            arrowY: Q,
            shouldHideArrow: rt,
            children: /* @__PURE__ */ x.jsx(
              qt.div,
              {
                "data-side": Dt,
                "data-align": Mt,
                ..._,
                ref: D,
                style: {
                  ..._.style,
                  // if the PopperContent hasn't been placed yet (not all
                  // measurements done) we prevent animations so that users'
                  // animations don't kick in too early from the wrong sides.
                  animation: Y ? _.style?.animation : "none"
                }
              }
            )
          }
        )
      }
    );
  }, "PopperContent")
);
function iw(n) {
  return n !== null;
}
ja(iw, "isNotNull");
var Y4 = /* @__PURE__ */ ja((n) => ({
  name: "transformOrigin",
  options: n,
  fn(i) {
    const { placement: o, rects: r, middlewareData: l } = i, d = l.arrow?.centerOffset !== 0, h = d ? 0 : n.arrowWidth, m = d ? 0 : n.arrowHeight, [g, y] = lf(o), p = { start: "0%", center: "50%", end: "100%" }[y], S = (l.arrow?.x ?? 0) + h / 2, T = (l.arrow?.y ?? 0) + m / 2;
    let E = "", w = "";
    return g === "bottom" ? (E = d ? p : `${S}px`, w = `${-m}px`) : g === "top" ? (E = d ? p : `${S}px`, w = `${r.floating.height + m}px`) : g === "right" ? (E = `${-m}px`, w = d ? p : `${T}px`) : g === "left" && (E = `${r.floating.width + m}px`, w = d ? p : `${T}px`), { data: { x: E, y: w } };
  }
}), "transformOrigin");
function lf(n) {
  const [i, o = "center"] = n.split("-");
  return [i, o];
}
ja(lf, "getSideAndAlignFromPlacement");
var k4 = Object.defineProperty, F4 = (n, i) => k4(n, "name", { value: i, configurable: !0 });
function aw(n) {
  const i = v.useRef({ value: n, previous: n });
  return v.useMemo(() => (i.current.value !== n && (i.current.previous = i.current.value, i.current.value = n), i.current.previous), [n]);
}
F4(aw, "usePrevious");
var X4 = Object.defineProperty, $4 = (n, i) => X4(n, "name", { value: i, configurable: !0 }), ow = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), K4 = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ $4(function(i, o) {
    return /* @__PURE__ */ x.jsx(
      qt.span,
      {
        ...i,
        ref: o,
        style: { ...ow, ...i.style }
      }
    );
  }, "VisuallyHidden")
), Z4 = Object.defineProperty, Ht = (n, i) => Z4(n, "name", { value: i, configurable: !0 }), Sx = {
  ItemAligned: "item-aligned",
  Popper: "popper"
}, Q4 = {
  RTL: "rtl"
}, J4 = [" ", "Enter", "ArrowUp", "ArrowDown"], W4 = [" ", "Enter"], Is = "Select", [uf, cf, tV] = /* @__PURE__ */ Kc(Is), [Do, KP] = /* @__PURE__ */ ii(Is, [
  tV,
  rf
]), Eg = rf(), [eV, qa] = Do(Is), [nV, iV] = Do(Is);
function sw(n) {
  const {
    __scopeSelect: i,
    children: o,
    open: r,
    defaultOpen: l,
    onOpenChange: f,
    value: d,
    defaultValue: h,
    onValueChange: m,
    dir: g,
    name: y,
    autoComplete: p,
    disabled: S,
    required: T,
    form: E,
    // @ts-expect-error internal render prop used by `Select` to compose its default parts
    internal_do_not_use_render: w
  } = n, _ = Eg(i), [R, O] = v.useState(null), [A, D] = v.useState(null), [U, z] = v.useState(!1), V = El(g), [I, F] = wi({
    prop: r,
    defaultProp: l ?? !1,
    onChange: f,
    caller: Is
  }), [Z, W] = wi({
    prop: d,
    defaultProp: h,
    onChange: m,
    caller: Is
  }), et = v.useRef(null), st = v.useRef(Z);
  v.useEffect(() => {
    const Mt = E ? R?.ownerDocument.getElementById(E) : R?.form;
    if (Mt instanceof HTMLFormElement) {
      const te = /* @__PURE__ */ Ht(() => W(st.current), "reset");
      return Mt.addEventListener("reset", te), () => Mt.removeEventListener("reset", te);
    }
  }, [E, R, W]);
  const ft = R ? !!E || !!R.closest("form") : !0, [ht, q] = v.useState(/* @__PURE__ */ new Set()), X = ei(), Y = Array.from(ht).map((Mt) => Mt.props.value).join(";"), tt = v.useCallback((Mt) => {
    q((te) => new Set(te).add(Mt));
  }, []), lt = v.useCallback((Mt) => {
    q((te) => {
      const N = new Set(te);
      return N.delete(Mt), N;
    });
  }, []), Dt = {
    required: T,
    trigger: R,
    onTriggerChange: O,
    valueNode: A,
    onValueNodeChange: D,
    valueNodeHasChildren: U,
    onValueNodeHasChildrenChange: z,
    contentId: X,
    value: Z,
    onValueChange: W,
    open: I,
    onOpenChange: F,
    dir: V,
    triggerPointerDownPosRef: et,
    disabled: S,
    name: y,
    autoComplete: p,
    form: E,
    nativeOptions: ht,
    nativeSelectKey: Y,
    isFormControl: ft
  };
  return /* @__PURE__ */ x.jsx(WC, { ..._, children: /* @__PURE__ */ x.jsx(eV, { scope: i, ...Dt, children: /* @__PURE__ */ x.jsx(uf.Provider, { scope: i, children: /* @__PURE__ */ x.jsx(
    nV,
    {
      scope: i,
      onNativeOptionAdd: tt,
      onNativeOptionRemove: lt,
      children: cw(w) ? w(Dt) : o
    }
  ) }) }) });
}
Ht(sw, "SelectProvider");
var aV = /* @__PURE__ */ Ht((n) => {
  const { __scopeSelect: i, children: o, ...r } = n;
  return /* @__PURE__ */ x.jsx(
    sw,
    {
      __scopeSelect: i,
      ...r,
      internal_do_not_use_render: ({ isFormControl: l }) => /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
        o,
        l ? /* @__PURE__ */ x.jsx(
          DV,
          {
            __scopeSelect: i
          }
        ) : null
      ] })
    }
  );
}, "Select"), oV = "SelectTrigger", sV = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ht(function(i, o) {
    const { __scopeSelect: r, disabled: l = !1, ...f } = i, d = Eg(r), h = qa(oV, r), m = h.disabled || l, g = Jt(o, h.onTriggerChange), y = cf(r), p = v.useRef("touch"), [S, T, E] = wg((_) => {
      const R = y().filter((D) => !D.disabled), O = R.find((D) => D.value === h.value), A = _g(R, _, O);
      A !== void 0 && h.onValueChange(A.value);
    }), w = /* @__PURE__ */ Ht((_) => {
      m || (h.onOpenChange(!0), E()), _ && (h.triggerPointerDownPosRef.current = {
        x: Math.round(_.pageX),
        y: Math.round(_.pageY)
      });
    }, "handleOpen");
    return /* @__PURE__ */ x.jsx(tw, { asChild: !0, ...d, children: /* @__PURE__ */ x.jsx(
      qt.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": h.open ? h.contentId : void 0,
        "aria-expanded": h.open,
        "aria-required": h.required,
        "aria-autocomplete": "none",
        dir: h.dir,
        "data-state": h.open ? "open" : "closed",
        disabled: m,
        "data-disabled": m ? "" : void 0,
        "data-placeholder": Cl(h.value) ? "" : void 0,
        ...f,
        ref: g,
        onClick: At(f.onClick, (_) => {
          _.currentTarget.focus(), p.current !== "mouse" && w(_);
        }),
        onPointerDown: At(f.onPointerDown, (_) => {
          p.current = _.pointerType;
          const R = _.target;
          R.hasPointerCapture(_.pointerId) && R.releasePointerCapture(_.pointerId), _.button === 0 && _.ctrlKey === !1 && _.pointerType === "mouse" && (w(_), _.preventDefault());
        }),
        onKeyDown: At(f.onKeyDown, (_) => {
          const R = S.current !== "";
          !(_.ctrlKey || _.altKey || _.metaKey) && _.key.length === 1 && T(_.key), !(R && _.key === " ") && J4.includes(_.key) && (w(), _.preventDefault());
        })
      }
    ) });
  }, "SelectTrigger")
), rV = "SelectValue", lV = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ht(function(i, o) {
    const { __scopeSelect: r, className: l, style: f, children: d, placeholder: h = "", ...m } = i, g = qa(rV, r), { onValueNodeHasChildrenChange: y } = g, p = d !== void 0, S = Jt(o, g.onValueNodeChange);
    ue(() => {
      y(p);
    }, [y, p]);
    const T = Cl(g.value);
    return /* @__PURE__ */ x.jsx(
      qt.span,
      {
        ...m,
        asChild: T ? !1 : m.asChild,
        ref: S,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ x.jsx(v.Fragment, { children: T ? h : d }, T ? "placeholder" : "value")
      }
    );
  }, "SelectValue")
), uV = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ht(function(i, o) {
    const { __scopeSelect: r, children: l, ...f } = i;
    return /* @__PURE__ */ x.jsx(qt.span, { "aria-hidden": !0, ...f, ref: o, children: l || "▼" });
  }, "SelectIcon")
), cV = "SelectPortal", [fV, dV] = Do(cV, {
  forceMount: void 0
}), hV = /* @__PURE__ */ Ht((n) => {
  const { __scopeSelect: i, forceMount: o, ...r } = n;
  return /* @__PURE__ */ x.jsx(fV, { scope: n.__scopeSelect, forceMount: o, children: /* @__PURE__ */ x.jsx(dg, { asChild: !0, ...r }) });
}, "SelectPortal"), Ro = "SelectContent", mV = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ht(function(i, o) {
    const r = dV(Ro, i.__scopeSelect), { forceMount: l = r.forceMount, ...f } = i, d = qa(Ro, i.__scopeSelect), [h, m] = v.useState();
    return ue(() => {
      m(new DocumentFragment());
    }, []), /* @__PURE__ */ x.jsx(Ha, { present: l || d.open, children: ({ present: g }) => g ? /* @__PURE__ */ x.jsx(yV, { ...f, ref: o }) : /* @__PURE__ */ x.jsx(pV, { ...f, fragment: h }) });
  }, "SelectContent")
), pV = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Ht(function(i, o) {
  const { __scopeSelect: r, children: l, fragment: f } = i;
  return f ? xl.createPortal(
    /* @__PURE__ */ x.jsx(rw, { scope: r, children: /* @__PURE__ */ x.jsx(uf.Slot, { scope: r, children: /* @__PURE__ */ x.jsx("div", { ref: o, children: l }) }) }),
    f
  ) : null;
}, "SelectContentFragment")), Jn = 10, [rw, Mo] = Do(Ro), gV = /* @__PURE__ */ Va("SelectContent.RemoveScroll"), yV = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ht(function(i, o) {
    const { __scopeSelect: r } = i, {
      position: l = Sx.ItemAligned,
      onCloseAutoFocus: f,
      onEscapeKeyDown: d,
      onPointerDownOutside: h,
      //
      // PopperContent props
      side: m,
      sideOffset: g,
      align: y,
      alignOffset: p,
      arrowPadding: S,
      collisionBoundary: T,
      collisionPadding: E,
      sticky: w,
      hideWhenDetached: _,
      avoidCollisions: R,
      //
      ...O
    } = i, A = qa(Ro, r), [D, U] = v.useState(null), [z, V] = v.useState(null), I = Jt(o, U), [F, Z] = v.useState(null), [W, et] = v.useState(
      null
    ), st = cf(r), [ft, ht] = v.useState(!1), q = v.useRef(!1);
    v.useEffect(() => {
      if (D) return MC(D);
    }, [D]), Wc();
    const X = v.useCallback(
      (it) => {
        const [yt, ...bt] = st().map((Vt) => Vt.ref.current), [nt] = bt.slice(-1), at = document.activeElement;
        for (const Vt of it)
          if (Vt === at || (Vt?.scrollIntoView({ block: "nearest" }), Vt === yt && z && (z.scrollTop = 0), Vt === nt && z && (z.scrollTop = z.scrollHeight), Vt?.focus(), document.activeElement !== at)) return;
      },
      [st, z]
    ), Y = v.useCallback(
      () => X([F, D]),
      [X, F, D]
    );
    v.useEffect(() => {
      ft && Y();
    }, [ft, Y]);
    const { onOpenChange: tt, triggerPointerDownPosRef: lt } = A;
    v.useEffect(() => {
      if (D) {
        let it = { x: 0, y: 0 };
        const yt = /* @__PURE__ */ Ht((nt) => {
          it = {
            x: Math.abs(Math.round(nt.pageX) - (lt.current?.x ?? 0)),
            y: Math.abs(Math.round(nt.pageY) - (lt.current?.y ?? 0))
          };
        }, "handlePointerMove"), bt = /* @__PURE__ */ Ht((nt) => {
          it.x <= 10 && it.y <= 10 ? nt.preventDefault() : nt.composedPath().includes(D) || tt(!1), document.removeEventListener("pointermove", yt), lt.current = null;
        }, "handlePointerUp");
        return lt.current !== null && (document.addEventListener("pointermove", yt), document.addEventListener("pointerup", bt, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", yt), document.removeEventListener("pointerup", bt, { capture: !0 });
        };
      }
    }, [D, tt, lt]), v.useEffect(() => {
      const it = /* @__PURE__ */ Ht(() => tt(!1), "close");
      return window.addEventListener("blur", it), window.addEventListener("resize", it), () => {
        window.removeEventListener("blur", it), window.removeEventListener("resize", it);
      };
    }, [tt]);
    const [Dt, Mt] = wg((it) => {
      const yt = st().filter((at) => !at.disabled), bt = yt.find((at) => at.ref.current === document.activeElement), nt = _g(yt, it, bt);
      nt && setTimeout(() => nt.ref.current?.focus());
    }), te = v.useCallback(
      (it, yt, bt) => {
        const nt = !q.current && !bt;
        (A.value !== void 0 && A.value === yt || nt) && (Z(it), nt && (q.current = !0));
      },
      [A.value]
    ), N = v.useCallback(() => D?.focus(), [D]), Q = v.useCallback(
      (it, yt, bt) => {
        const nt = !q.current && !bt;
        (A.value !== void 0 && A.value === yt || nt) && et(it);
      },
      [A.value]
    ), rt = l === Sx.Popper ? xx : vV, ut = rt === xx ? {
      side: m,
      sideOffset: g,
      align: y,
      alignOffset: p,
      arrowPadding: S,
      collisionBoundary: T,
      collisionPadding: E,
      sticky: w,
      hideWhenDetached: _,
      avoidCollisions: R
    } : {};
    return /* @__PURE__ */ x.jsx(
      rw,
      {
        scope: r,
        content: D,
        viewport: z,
        onViewportChange: V,
        itemRefCallback: te,
        selectedItem: F,
        onItemLeave: N,
        itemTextRefCallback: Q,
        focusSelectedItem: Y,
        selectedItemText: W,
        position: l,
        isPositioned: ft,
        searchRef: Dt,
        children: /* @__PURE__ */ x.jsx(mg, { as: gV, allowPinchZoom: !0, children: /* @__PURE__ */ x.jsx(
          hC,
          {
            asChild: !0,
            trapped: A.open,
            onMountAutoFocus: (it) => {
              it.preventDefault();
            },
            onUnmountAutoFocus: At(f, (it) => {
              A.trigger?.focus({ preventScroll: !0 }), it.preventDefault();
            }),
            children: /* @__PURE__ */ x.jsx(
              ug,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: d,
                onPointerDownOutside: h,
                onFocusOutside: (it) => it.preventDefault(),
                onDismiss: () => A.onOpenChange(!1),
                children: /* @__PURE__ */ x.jsx(
                  rt,
                  {
                    role: "listbox",
                    id: A.contentId,
                    "data-state": A.open ? "open" : "closed",
                    dir: A.dir,
                    onContextMenu: (it) => it.preventDefault(),
                    ...O,
                    ...ut,
                    onPlaced: () => ht(!0),
                    ref: I,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...O.style
                    },
                    onKeyDown: At(O.onKeyDown, (it) => {
                      const yt = it.ctrlKey || it.altKey || it.metaKey;
                      if (it.key === "Tab" && it.preventDefault(), !yt && it.key.length === 1 && Mt(it.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(it.key)) {
                        let nt = st().filter((at) => !at.disabled).map((at) => at.ref.current);
                        if (["ArrowUp", "End"].includes(it.key) && (nt = nt.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(it.key)) {
                          const at = it.target, Vt = nt.indexOf(at);
                          nt = nt.slice(Vt + 1);
                        }
                        setTimeout(() => X(nt)), it.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }, "SelectContentImpl")
), vV = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Ht(function(i, o) {
  const { __scopeSelect: r, onPlaced: l, ...f } = i, d = qa(Ro, r), h = Mo(Ro, r), [m, g] = v.useState(null), [y, p] = v.useState(null), S = Jt(o, p), T = cf(r), E = v.useRef(!1), w = v.useRef(!0), { viewport: _, selectedItem: R, selectedItemText: O, focusSelectedItem: A } = h, D = v.useCallback(() => {
    if (d.trigger && d.valueNode && m && y && _ && R && O) {
      const I = d.trigger.getBoundingClientRect(), F = y.getBoundingClientRect(), Z = d.valueNode.getBoundingClientRect(), W = O.getBoundingClientRect();
      if (d.dir !== Q4.RTL) {
        const at = W.left - F.left, Vt = Z.left - at, we = I.left - Vt, ae = I.width + we, ce = Math.max(ae, F.width), Yt = window.innerWidth - Jn, Bt = fp(Vt, [
          Jn,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Jn, Yt - ce)
        ]);
        m.style.minWidth = ae + "px", m.style.left = Bt + "px";
      } else {
        const at = F.right - W.right, Vt = window.innerWidth - Z.right - at, we = window.innerWidth - I.right - Vt, ae = I.width + we, ce = Math.max(ae, F.width), Yt = window.innerWidth - Jn, Bt = fp(Vt, [
          Jn,
          Math.max(Jn, Yt - ce)
        ]);
        m.style.minWidth = ae + "px", m.style.right = Bt + "px";
      }
      const et = T(), st = window.innerHeight - Jn * 2, ft = _.scrollHeight, ht = window.getComputedStyle(y), q = parseInt(ht.borderTopWidth, 10), X = parseInt(ht.paddingTop, 10), Y = parseInt(ht.borderBottomWidth, 10), tt = parseInt(ht.paddingBottom, 10), lt = q + X + ft + tt + Y, Dt = Math.min(R.offsetHeight * 5, lt), Mt = window.getComputedStyle(_), te = parseInt(Mt.paddingTop, 10), N = parseInt(Mt.paddingBottom, 10), Q = I.top + I.height / 2 - Jn, rt = st - Q, ut = R.offsetHeight / 2, it = R.offsetTop + ut, yt = q + X + it, bt = lt - yt;
      if (yt <= Q) {
        const at = et.length > 0 && R === et[et.length - 1].ref.current;
        m.style.bottom = "0px";
        const Vt = y.clientHeight - _.offsetTop - _.offsetHeight, we = Math.max(
          rt,
          ut + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (at ? N : 0) + Vt + Y
        ), ae = yt + we;
        m.style.height = ae + "px";
      } else {
        const at = et.length > 0 && R === et[0].ref.current;
        m.style.top = "0px";
        const we = Math.max(
          Q,
          q + _.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (at ? te : 0) + ut
        ) + bt;
        m.style.height = we + "px", _.scrollTop = yt - Q + _.offsetTop;
      }
      m.style.margin = `${Jn}px 0`, m.style.minHeight = Dt + "px", m.style.maxHeight = st + "px", l?.(), requestAnimationFrame(() => E.current = !0);
    }
  }, [
    T,
    d.trigger,
    d.valueNode,
    m,
    y,
    _,
    R,
    O,
    d.dir,
    l
  ]);
  ue(() => D(), [D]);
  const [U, z] = v.useState();
  ue(() => {
    y && z(window.getComputedStyle(y).zIndex);
  }, [y]);
  const V = v.useCallback(
    (I) => {
      I && w.current === !0 && (D(), A?.(), w.current = !1);
    },
    [D, A]
  );
  return /* @__PURE__ */ x.jsx(
    bV,
    {
      scope: r,
      contentWrapper: m,
      shouldExpandOnScrollRef: E,
      onScrollButtonChange: V,
      children: /* @__PURE__ */ x.jsx(
        "div",
        {
          ref: g,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: U
          },
          children: /* @__PURE__ */ x.jsx(
            qt.div,
            {
              ...f,
              ref: S,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...f.style
              }
            }
          )
        }
      )
    }
  );
}, "SelectItemAlignedPosition")), xx = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Ht(function(i, o) {
  const {
    __scopeSelect: r,
    align: l = "start",
    collisionPadding: f = Jn,
    ...d
  } = i, h = Eg(r);
  return /* @__PURE__ */ x.jsx(
    nw,
    {
      ...h,
      ...d,
      ref: o,
      align: l,
      collisionPadding: f,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...d.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
}, "SelectPopperPosition")), [bV, Cg] = Do(Ro, {}), Tx = "SelectViewport", SV = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ht(function(i, o) {
    const { __scopeSelect: r, nonce: l, ...f } = i, d = Mo(Tx, r), h = Cg(Tx, r), m = Jt(o, d.onViewportChange), g = v.useRef(0);
    return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ x.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: l
        }
      ),
      /* @__PURE__ */ x.jsx(uf.Slot, { scope: r, children: /* @__PURE__ */ x.jsx(
        qt.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...f,
          ref: m,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...f.style
          },
          onScroll: At(f.onScroll, (y) => {
            const p = y.currentTarget, { contentWrapper: S, shouldExpandOnScrollRef: T } = h;
            if (T?.current && S) {
              const E = Math.abs(g.current - p.scrollTop);
              if (E > 0) {
                const w = window.innerHeight - Jn * 2, _ = parseFloat(S.style.minHeight), R = parseFloat(S.style.height), O = Math.max(_, R);
                if (O < w) {
                  const A = O + E, D = Math.min(w, A), U = A - D;
                  S.style.height = D + "px", S.style.bottom === "0px" && (p.scrollTop = U > 0 ? U : 0, S.style.justifyContent = "flex-end");
                }
              }
            }
            g.current = p.scrollTop;
          })
        }
      ) })
    ] });
  }, "SelectViewport")
), xV = "SelectGroup", [ZP, QP] = Do(xV), mp = "SelectItem", [TV, lw] = Do(mp), EV = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ht(function(i, o) {
    const {
      __scopeSelect: r,
      value: l,
      disabled: f = !1,
      textValue: d,
      ...h
    } = i, m = qa(mp, r), g = Mo(mp, r), y = m.value === l, [p, S] = v.useState(d ?? ""), [T, E] = v.useState(!1), w = ni(
      (D) => g.itemRefCallback?.(D, l, f)
    ), _ = Jt(o, w), R = ei(), O = v.useRef("touch"), A = /* @__PURE__ */ Ht(() => {
      m.onValueChange(l), m.onOpenChange(!1);
    }, "handleSelect");
    return /* @__PURE__ */ x.jsx(
      TV,
      {
        scope: r,
        value: l,
        disabled: f,
        textId: R,
        isSelected: y,
        onItemTextChange: v.useCallback((D) => {
          S((U) => U || (D?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ x.jsx(
          uf.ItemSlot,
          {
            scope: r,
            value: l,
            disabled: f,
            textValue: p,
            children: /* @__PURE__ */ x.jsx(
              qt.div,
              {
                role: "option",
                "aria-labelledby": R,
                "data-highlighted": T ? "" : void 0,
                "aria-selected": y && T,
                "data-state": y ? "checked" : "unchecked",
                "aria-disabled": f || void 0,
                "data-disabled": f ? "" : void 0,
                tabIndex: f ? void 0 : -1,
                ...h,
                ref: _,
                onFocus: At(h.onFocus, () => E(!0)),
                onBlur: At(h.onBlur, () => E(!1)),
                onClick: At(h.onClick, () => {
                  f || O.current !== "mouse" && A();
                }),
                onPointerUp: At(h.onPointerUp, () => {
                  f || O.current === "mouse" && A();
                }),
                onPointerDown: At(h.onPointerDown, (D) => {
                  O.current = D.pointerType;
                }),
                onPointerMove: At(h.onPointerMove, (D) => {
                  O.current = D.pointerType, f ? g.onItemLeave?.() : O.current === "mouse" && D.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: At(h.onPointerLeave, (D) => {
                  D.currentTarget === document.activeElement && g.onItemLeave?.();
                }),
                onKeyDown: At(h.onKeyDown, (D) => {
                  f || D.target !== D.currentTarget || g.searchRef?.current !== "" && D.key === " " || (W4.includes(D.key) && A(), D.key === " " && D.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }, "SelectItem")
), fc = "SelectItemText", CV = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ht(function(i, o) {
    const { __scopeSelect: r, className: l, style: f, ...d } = i, h = qa(fc, r), m = Mo(fc, r), g = lw(fc, r), y = iV(fc, r), [p, S] = v.useState(null), T = ni(
      (A) => m.itemTextRefCallback?.(A, g.value, g.disabled)
    ), E = Jt(
      o,
      S,
      g.onItemTextChange,
      T
    ), w = p?.textContent, _ = v.useMemo(
      () => /* @__PURE__ */ x.jsx("option", { value: g.value, disabled: g.disabled, children: w }, g.value),
      [g.disabled, g.value, w]
    ), { onNativeOptionAdd: R, onNativeOptionRemove: O } = y;
    return ue(() => (R(_), () => O(_)), [R, O, _]), /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ x.jsx(qt.span, { id: g.textId, ...d, ref: E }),
      g.isSelected && h.valueNode && !h.valueNodeHasChildren && !Cl(h.value) ? xl.createPortal(d.children, h.valueNode) : null
    ] });
  }, "SelectItemText")
), wV = "SelectItemIndicator", _V = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ht(function(i, o) {
    const { __scopeSelect: r, ...l } = i;
    return lw(wV, r).isSelected ? /* @__PURE__ */ x.jsx(qt.span, { "aria-hidden": !0, ...l, ref: o }) : null;
  }, "SelectItemIndicator")
), Ex = "SelectScrollUpButton", AV = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Ht(function(i, o) {
  const r = Mo(Ex, i.__scopeSelect), l = Cg(Ex, i.__scopeSelect), [f, d] = v.useState(!1), h = Jt(o, l.onScrollButtonChange);
  return ue(() => {
    if (r.viewport && r.isPositioned) {
      let m = function() {
        const y = g.scrollTop > 0;
        d(y);
      };
      Ht(m, "handleScroll");
      const g = r.viewport;
      return m(), g.addEventListener("scroll", m), () => g.removeEventListener("scroll", m);
    }
  }, [r.viewport, r.isPositioned]), f ? /* @__PURE__ */ x.jsx(
    uw,
    {
      ...i,
      ref: h,
      onAutoScroll: () => {
        const { viewport: m, selectedItem: g } = r;
        m && g && (m.scrollTop = m.scrollTop - g.offsetHeight);
      }
    }
  ) : null;
}, "SelectScrollUpButton")), Cx = "SelectScrollDownButton", RV = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Ht(function(i, o) {
  const r = Mo(Cx, i.__scopeSelect), l = Cg(Cx, i.__scopeSelect), [f, d] = v.useState(!1), h = Jt(o, l.onScrollButtonChange);
  return ue(() => {
    if (r.viewport && r.isPositioned) {
      let m = function() {
        const y = g.scrollHeight - g.clientHeight, p = Math.ceil(g.scrollTop) < y;
        d(p);
      };
      Ht(m, "handleScroll");
      const g = r.viewport;
      return m(), g.addEventListener("scroll", m), () => g.removeEventListener("scroll", m);
    }
  }, [r.viewport, r.isPositioned]), f ? /* @__PURE__ */ x.jsx(
    uw,
    {
      ...i,
      ref: h,
      onAutoScroll: () => {
        const { viewport: m, selectedItem: g } = r;
        m && g && (m.scrollTop = m.scrollTop + g.offsetHeight);
      }
    }
  ) : null;
}, "SelectScrollDownButton")), uw = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Ht(function(i, o) {
  const { __scopeSelect: r, onAutoScroll: l, ...f } = i, d = Mo("SelectScrollButton", r), h = v.useRef(null), m = cf(r), g = v.useCallback(() => {
    h.current !== null && (window.clearInterval(h.current), h.current = null);
  }, []);
  return v.useEffect(() => () => g(), [g]), ue(() => {
    m().find((p) => p.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [m]), /* @__PURE__ */ x.jsx(
    qt.div,
    {
      "aria-hidden": !0,
      ...f,
      ref: o,
      style: { flexShrink: 0, ...f.style },
      onPointerDown: At(f.onPointerDown, () => {
        h.current === null && (h.current = window.setInterval(l, 50));
      }),
      onPointerMove: At(f.onPointerMove, () => {
        d.onItemLeave?.(), h.current === null && (h.current = window.setInterval(l, 50));
      }),
      onPointerLeave: At(f.onPointerLeave, () => {
        g();
      })
    }
  );
}, "SelectScrollButtonImpl")), OV = "SelectBubbleInput", DV = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ht(function({ __scopeSelect: i, ...o }, r) {
    const l = qa(OV, i), { value: f, onValueChange: d, required: h, disabled: m, name: g, autoComplete: y, form: p } = l, { nativeOptions: S, nativeSelectKey: T } = l, E = v.useRef(null), w = Jt(r, E), _ = f ?? "", R = aw(_), O = Array.from(S).some(
      (A) => (A.props.value ?? "") === ""
    );
    return v.useEffect(() => {
      const A = E.current;
      if (!A) return;
      const D = window.HTMLSelectElement.prototype, z = Object.getOwnPropertyDescriptor(
        D,
        "value"
      ).set;
      if (R !== _ && z) {
        const V = new Event("change", { bubbles: !0 });
        z.call(A, _), A.dispatchEvent(V);
      }
    }, [R, _]), /* @__PURE__ */ x.jsxs(
      qt.select,
      {
        "aria-hidden": !0,
        required: h,
        tabIndex: -1,
        name: g,
        autoComplete: y,
        disabled: m,
        form: p,
        onChange: (A) => d(A.target.value),
        ...o,
        style: { ...ow, ...o.style },
        ref: w,
        defaultValue: _,
        children: [
          Cl(f) && !O ? /* @__PURE__ */ x.jsx("option", { value: "" }) : null,
          Array.from(S)
        ]
      },
      T
    );
  }, "SelectBubbleInput")
);
function cw(n) {
  return typeof n == "function";
}
Ht(cw, "isFunction");
function Cl(n) {
  return n === "" || n === void 0;
}
Ht(Cl, "shouldShowPlaceholder");
function wg(n) {
  const i = ni(n), o = v.useRef(""), r = v.useRef(0), l = v.useCallback(
    (d) => {
      const h = o.current + d;
      i(h), (/* @__PURE__ */ Ht((function m(g) {
        o.current = g, window.clearTimeout(r.current), g !== "" && (r.current = window.setTimeout(() => m(""), 1e3));
      }), "updateSearch"))(h);
    },
    [i]
  ), f = v.useCallback(() => {
    o.current = "", window.clearTimeout(r.current);
  }, []);
  return v.useEffect(() => () => window.clearTimeout(r.current), []), [o, l, f];
}
Ht(wg, "useTypeaheadSearch");
function _g(n, i, o) {
  const l = i.length > 1 && Array.from(i).every((g) => g === i[0]) ? i[0] : i, f = o ? n.indexOf(o) : -1;
  let d = fw(n, Math.max(f, 0));
  l.length === 1 && (d = d.filter((g) => g !== o));
  const m = d.find(
    (g) => g.textValue.toLowerCase().startsWith(l.toLowerCase())
  );
  return m !== o ? m : void 0;
}
Ht(_g, "findNextItem");
function fw(n, i) {
  return n.map((o, r) => n[(i + r) % n.length]);
}
Ht(fw, "wrapArray");
const MV = "_field_w47kp_1", NV = "_trigger_w47kp_7", jV = "_valueText_w47kp_17", zV = "_srOnly_w47kp_23", LV = "_chevron_w47kp_25", VV = "_hint_w47kp_29", BV = "_content_w47kp_33", PV = "_viewport_w47kp_43", UV = "_item_w47kp_45", HV = "_indicator_w47kp_55", IV = "_scrollButton_w47kp_57", Vn = {
  field: MV,
  trigger: NV,
  valueText: jV,
  srOnly: zV,
  chevron: LV,
  hint: VV,
  content: BV,
  viewport: PV,
  item: UV,
  indicator: HV,
  scrollButton: IV
}, qV = { enter: { opacity: 0 }, center: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: ct.duration.instant } }, exit: { opacity: 0, transition: { duration: ct.duration.instant } } }, GV = v.forwardRef(function({ label: i, description: o, placeholder: r = "Select an option", options: l, id: f, className: d, disabled: h, onValueChange: m, ...g }, y) {
  const p = v.useId(), S = f ?? p, T = o ? `${S}-description` : void 0;
  Ve();
  const [E, w] = v.useState(g.defaultValue ?? ""), _ = g.value ?? E, R = l.findIndex((V) => V.value === _), O = _ ? l[R]?.label ?? "" : r, [A, D] = v.useState(R), [U, z] = v.useState(1);
  return A !== R && (D(R), z(R > A ? 1 : -1)), /* @__PURE__ */ x.jsxs("div", { className: Vn.field, children: [
    /* @__PURE__ */ x.jsx("label", { htmlFor: S, children: i }),
    /* @__PURE__ */ x.jsxs(aV, { ...g, disabled: h, onValueChange: (V) => {
      w(V), m?.(V);
    }, children: [
      /* @__PURE__ */ x.jsxs(
        sV,
        {
          ref: y,
          id: S,
          "aria-describedby": T,
          className: [Vn.trigger, d].filter(Boolean).join(" "),
          children: [
            /* @__PURE__ */ x.jsx("span", { className: Vn.srOnly, children: /* @__PURE__ */ x.jsx(lV, { placeholder: r }) }),
            /* @__PURE__ */ x.jsx("span", { className: Vn.valueText, "aria-hidden": "true", children: /* @__PURE__ */ x.jsx(ie, { initial: !1, custom: U, children: /* @__PURE__ */ x.jsx(xt.span, { "data-placeholder": _ ? void 0 : "", custom: U, variants: qV, initial: "enter", animate: "center", exit: "exit", children: O }, _ ? `value-${_}` : "placeholder") }) }),
            /* @__PURE__ */ x.jsx(uV, { className: Vn.chevron, children: /* @__PURE__ */ x.jsx(Bc, { size: 16, strokeWidth: 1.75, "aria-hidden": "true" }) })
          ]
        }
      ),
      /* @__PURE__ */ x.jsx(hV, { children: /* @__PURE__ */ x.jsxs(mV, { className: `ms-island ${Vn.content}`, position: "popper", sideOffset: 4, collisionPadding: 12, children: [
        /* @__PURE__ */ x.jsx(AV, { className: Vn.scrollButton, children: /* @__PURE__ */ x.jsx(H3, { size: 16, strokeWidth: 1.75, "aria-hidden": "true" }) }),
        /* @__PURE__ */ x.jsx(SV, { className: Vn.viewport, children: l.map((V) => /* @__PURE__ */ x.jsxs(EV, { value: V.value, disabled: V.disabled, className: Vn.item, children: [
          /* @__PURE__ */ x.jsx(CV, { children: V.label }),
          /* @__PURE__ */ x.jsx(_V, { className: Vn.indicator, children: /* @__PURE__ */ x.jsx(B3, { size: 16, strokeWidth: 1.75, "aria-hidden": "true" }) })
        ] }, V.value)) }),
        /* @__PURE__ */ x.jsx(RV, { className: Vn.scrollButton, children: /* @__PURE__ */ x.jsx(Bc, { size: 16, strokeWidth: 1.75, "aria-hidden": "true" }) })
      ] }) })
    ] }),
    o && /* @__PURE__ */ x.jsx("span", { id: T, className: Vn.hint, children: o })
  ] });
}), YV = "_wrapper_1aelq_3", kV = "_dropzone_1aelq_5", FV = "_compact_1aelq_9", XV = "_edge_1aelq_13", $V = "_trigger_1aelq_17", KV = "_dragging_1aelq_35", ZV = "_wash_1aelq_41", QV = "_glow_1aelq_41", JV = "_iconSlot_1aelq_51", WV = "_noteSlot_1aelq_51", t5 = "_sheets_1aelq_55", e5 = "_sheet_1aelq_55", n5 = "_label_1aelq_107", i5 = "_labelText_1aelq_109", a5 = "_hint_1aelq_111", o5 = "_note_1aelq_51", s5 = "_input_1aelq_115", r5 = "_messageSlot_1aelq_117", l5 = "_error_1aelq_119", u5 = "_errorIcon_1aelq_123", c5 = "_errorCopy_1aelq_125", f5 = "_list_1aelq_129", d5 = "_inside_1aelq_131", h5 = "_item_1aelq_135", m5 = "_row_1aelq_137", p5 = "_isFailed_1aelq_139", g5 = "_fileIcon_1aelq_141", y5 = "_thumb_1aelq_143", v5 = "_copy_1aelq_147", b5 = "_name_1aelq_149", S5 = "_meta_1aelq_151", x5 = "_dot_1aelq_153", T5 = "_phase_1aelq_157", E5 = "_state_1aelq_159", C5 = "_uploaded_1aelq_161", w5 = "_stateIcon_1aelq_163", _5 = "_failed_1aelq_165", A5 = "_reason_1aelq_169", R5 = "_percent_1aelq_171", O5 = "_barFrame_1aelq_173", D5 = "_bar_1aelq_173", M5 = "_barFill_1aelq_179", N5 = "_actions_1aelq_181", j5 = "_retrySlot_1aelq_183", z5 = "_retryInner_1aelq_185", L5 = "_retry_1aelq_183", V5 = "_remove_1aelq_187", B5 = "_retryLabel_1aelq_193", P5 = "_words_1aelq_215", U5 = "_word_1aelq_215", H5 = "_srOnly_1aelq_219", gt = {
  wrapper: YV,
  dropzone: kV,
  compact: FV,
  edge: XV,
  trigger: $V,
  dragging: KV,
  wash: ZV,
  glow: QV,
  iconSlot: JV,
  noteSlot: WV,
  sheets: t5,
  sheet: e5,
  label: n5,
  labelText: i5,
  hint: a5,
  note: o5,
  input: s5,
  messageSlot: r5,
  error: l5,
  errorIcon: u5,
  errorCopy: c5,
  list: f5,
  inside: d5,
  item: h5,
  row: m5,
  isFailed: p5,
  fileIcon: g5,
  thumb: y5,
  copy: v5,
  name: b5,
  meta: S5,
  dot: x5,
  phase: T5,
  state: E5,
  uploaded: C5,
  stateIcon: w5,
  failed: _5,
  reason: A5,
  percent: R5,
  barFrame: O5,
  bar: D5,
  barFill: M5,
  actions: N5,
  retrySlot: j5,
  retryInner: z5,
  retry: L5,
  remove: V5,
  retryLabel: B5,
  words: P5,
  word: U5,
  srOnly: H5
}, wx = 1024 * 1024, _x = 7, So = { duration: ct.duration.standard, ease: [...ct.ease.enter] }, _c = { duration: ct.duration.fast, ease: [...ct.ease.standard] }, qc = { duration: 0 }, xn = { get duration() {
  return ct.duration.instant;
} }, Sm = { ...ct.spring.smooth, visualDuration: 0.3 }, dw = { opacity: 0, y: "0.3em", filter: `blur(${ct.blur.soft}px)` }, hw = { opacity: 0, y: "-0.3em", filter: `blur(${ct.blur.subtle}px)`, transition: _c }, mw = { opacity: 1, y: "0em", filter: "blur(0px)" }, Ac = (n) => Math.min(Math.max(n, 0), 100), I5 = { x: [0, -7, 6, -4, 3, -1.5, 0] }, q5 = { duration: 0.42, ease: "easeOut" }, Ax = { type: "spring", visualDuration: 0.42, bounce: 0.14 };
function pw(n) {
  if (n < 1024) return `${n} B`;
  if (n < wx) return `${Math.round(n / 1024)} KB`;
  const i = n / wx;
  return `${i >= 10 ? Math.round(i) : Number(i.toFixed(1))} MB`;
}
function G5({ name: n }) {
  const i = { size: 20, strokeWidth: 1.75, "aria-hidden": !0 }, o = n.toLowerCase().split(".").pop() ?? "";
  return ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "heic"].includes(o) ? /* @__PURE__ */ x.jsx(Y3, { ...i }) : ["mov", "mp4", "webm", "m4v", "avi"].includes(o) ? /* @__PURE__ */ x.jsx(F3, { ...i }) : ["zip", "gz", "tar", "rar", "7z"].includes(o) ? /* @__PURE__ */ x.jsx(q3, { ...i }) : ["pdf", "md", "txt", "doc", "docx", "rtf"].includes(o) ? /* @__PURE__ */ x.jsx(k3, { ...i }) : /* @__PURE__ */ x.jsx(X3, { ...i });
}
function gw(n) {
  const i = $p();
  return /* @__PURE__ */ x.jsx(xt.span, { ...n, "aria-hidden": i ? n["aria-hidden"] : !0 });
}
function Y5({ text: n, className: i, reduce: o }) {
  return /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ x.jsx(gw, { className: i, initial: o ? { opacity: 0 } : dw, animate: mw, exit: o ? { opacity: 0, transition: xn } : hw, transition: o ? xn : So, children: n }, n) });
}
function k5({ text: n }) {
  Ve();
  const i = n.split(" ");
  return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsx("span", { className: gt.srOnly, children: n }),
    /* @__PURE__ */ x.jsx("span", { className: gt.words, "aria-hidden": "true", children: /* @__PURE__ */ x.jsx(ie, { initial: !1, mode: "popLayout", children: i.map((o, r) => /* @__PURE__ */ x.jsx(
      xt.span,
      {
        className: gt.word,
        initial: { opacity: 0 },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, transition: { duration: 0 } },
        transition: { duration: ct.duration.instant },
        children: r < i.length - 1 ? `${o} ` : o
      },
      `${r}:${o}`
    )) }) })
  ] });
}
function F5({ text: n }) {
  Ve();
  const i = v.useRef(null), [o, r] = v.useState("auto");
  return v.useEffect(() => {
    const l = i.current;
    if (!l || typeof ResizeObserver > "u") return;
    const f = new ResizeObserver(([d]) => {
      d && r(d.borderBoxSize?.[0]?.blockSize ?? l.offsetHeight);
    });
    return f.observe(l), () => f.disconnect();
  }, []), /* @__PURE__ */ x.jsx(xt.div, { className: gt.messageSlot, initial: { height: 0, opacity: 0 }, animate: { height: o, opacity: 1 }, exit: { height: 0, opacity: 0, transition: { duration: 0 } }, transition: { duration: 0 }, children: /* @__PURE__ */ x.jsxs(xt.div, { ref: i, className: gt.error, role: "alert", initial: !1, animate: { y: 0, filter: "blur(0px)" }, transition: { duration: 0, ease: [...ct.ease.enter] }, children: [
    /* @__PURE__ */ x.jsx(lg, { className: gt.errorIcon, size: 14, strokeWidth: 2.25, "aria-hidden": "true" }),
    /* @__PURE__ */ x.jsx("span", { className: gt.errorCopy, children: /* @__PURE__ */ x.jsx(k5, { text: n }) })
  ] }) });
}
function X5({ reduce: n }) {
  return /* @__PURE__ */ x.jsxs("svg", { className: gt.stateIcon, width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.25, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ x.jsx(xt.path, { d: "M12 2.5a9.5 9.5 0 1 1 0 19a9.5 9.5 0 1 1 0-19", initial: n ? !1 : { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: ct.duration.considered * 0.7, ease: [...ct.ease.enter] } }),
    /* @__PURE__ */ x.jsx(xt.path, { d: "m8.2 12.4 2.6 2.6 5-5.2", initial: n ? !1 : { pathLength: 0 }, animate: { pathLength: 1 }, transition: { ...So, delay: 0.16 } })
  ] });
}
function $5({ item: n }) {
  const [i, o] = v.useState(!1);
  return !n.preview || i ? /* @__PURE__ */ x.jsx("span", { className: gt.fileIcon, children: /* @__PURE__ */ x.jsx(G5, { name: n.name }) }) : /* @__PURE__ */ x.jsx("span", { className: gt.thumb, children: /* @__PURE__ */ x.jsx("img", { src: n.preview, alt: "", width: 40, height: 40, decoding: "async", onError: () => o(!0) }) });
}
function K5({ item: n, reduce: i, delay: o, fresh: r, canRetry: l, onRemove: f, onRetry: d, removeRef: h }) {
  const { status: m } = n, g = v.useRef(null), y = v.useRef(r ? "new" : m);
  v.useEffect(() => {
    const z = y.current;
    if (m === z) return;
    y.current = m;
    const V = g.current;
    m !== "failed" || i || !V || Hs(V, I5, { ...q5, delay: z === "new" ? o + 0.3 : 0 });
  }, [m, i, o]);
  const p = Ji(m === "uploaded" ? 100 : n.progress ?? 0), S = Qm(p, (z) => `${Ac(z) - 100}%`), T = Qm(p, (z) => `${Math.round(Ac(z))}%`), [E, w] = v.useState(m !== "uploading"), [_, R] = v.useState(m);
  _ !== m && (R(m), m === "uploading" && w(!1));
  const O = m === "uploaded" && !E && !i ? "uploading" : m, A = m === "uploaded" ? 100 : n.progress ?? 0;
  v.useEffect(() => {
    if (m !== "uploading" && m !== "uploaded") return;
    if (i || m === "uploading" && A === 0) {
      p.jump(A);
      return;
    }
    const z = Hs(p, A, { ...ct.spring.smooth, onComplete: m === "uploaded" ? () => w(!0) : void 0 });
    return () => z.stop();
  }, [m, A, p, i]), KN(p, "change", (z) => {
    m === "uploaded" && z >= 99.5 && w(!0);
  });
  const D = m === "failed", U = D && l && n.retryable !== !1;
  return /* @__PURE__ */ x.jsx(
    xt.li,
    {
      className: gt.item,
      initial: i ? { opacity: 0 } : { height: 0 },
      animate: { height: "auto", opacity: 1 },
      exit: i ? { opacity: 0, transition: xn } : { height: 0, opacity: 0, transition: { height: Sm, opacity: { ..._c, delay: 0.04 } } },
      transition: i ? xn : { height: { ...ct.spring.smooth, delay: o }, opacity: xn },
      children: /* @__PURE__ */ x.jsxs(
        xt.div,
        {
          ref: g,
          className: `${gt.row} ${D ? gt.isFailed : ""}`,
          initial: i ? !1 : { opacity: 0, y: -22, scale: 0.94, filter: `blur(${ct.blur.soft}px)` },
          animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
          exit: i ? void 0 : { scale: 0.97, filter: `blur(${ct.blur.subtle}px)`, transition: _c },
          transition: i ? qc : { y: { ...Ax, delay: o }, scale: { ...Ax, delay: o }, opacity: { ...So, delay: o }, filter: { ...So, delay: o } },
          children: [
            /* @__PURE__ */ x.jsx($5, { item: n }),
            /* @__PURE__ */ x.jsxs("span", { className: gt.copy, children: [
              /* @__PURE__ */ x.jsx("span", { className: gt.name, title: n.name, children: n.name }),
              /* @__PURE__ */ x.jsxs("span", { className: gt.meta, children: [
                /* @__PURE__ */ x.jsx("span", { children: pw(n.size) }),
                O && /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
                  /* @__PURE__ */ x.jsx("span", { className: gt.dot, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ x.jsx("span", { className: gt.phase, children: /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ x.jsx(gw, { className: `${gt.state} ${O === "uploaded" ? gt.uploaded : O === "failed" ? gt.failed : ""}`, initial: i ? { opacity: 0 } : dw, animate: mw, exit: i ? { opacity: 0, transition: xn } : hw, transition: i ? xn : So, children: O === "uploading" ? /* @__PURE__ */ x.jsxs("span", { children: [
                    "Uploading ",
                    /* @__PURE__ */ x.jsx(xt.span, { className: gt.percent, children: T })
                  ] }) : O === "uploaded" ? /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
                    /* @__PURE__ */ x.jsx(X5, { reduce: i }),
                    /* @__PURE__ */ x.jsx("span", { children: "Uploaded" })
                  ] }) : /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
                    /* @__PURE__ */ x.jsx(lg, { className: gt.stateIcon, size: 14, strokeWidth: 2.25, "aria-hidden": "true" }),
                    /* @__PURE__ */ x.jsxs("span", { className: gt.reason, title: n.error, children: [
                      /* @__PURE__ */ x.jsx("span", { className: gt.srOnly, children: "Failed: " }),
                      n.error || "Upload failed"
                    ] })
                  ] }) }, O) }) })
                ] })
              ] }),
              /* @__PURE__ */ x.jsx(ie, { initial: !1, children: O === "uploading" && /* @__PURE__ */ x.jsx(
                xt.span,
                {
                  className: gt.barFrame,
                  initial: i ? { opacity: 0 } : { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: i ? { opacity: 0, transition: xn } : { height: 0, opacity: 0, transition: { height: { ...Sm, delay: 0.22 }, opacity: { ..._c, delay: 0.16 } } },
                  transition: i ? xn : { height: ct.spring.smooth, opacity: So },
                  children: /* @__PURE__ */ x.jsx("span", { className: gt.bar, role: "progressbar", "aria-label": `Uploading ${n.name}`, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(Ac(A)), children: /* @__PURE__ */ x.jsx(xt.span, { className: gt.barFill, style: { x: S } }) })
                },
                "bar"
              ) })
            ] }),
            /* @__PURE__ */ x.jsxs("span", { className: gt.actions, children: [
              /* @__PURE__ */ x.jsx(ie, { initial: !1, children: U && /* @__PURE__ */ x.jsx(
                xt.span,
                {
                  className: gt.retrySlot,
                  initial: i ? { opacity: 0 } : { width: 0, opacity: 0 },
                  animate: { width: "auto", opacity: 1 },
                  exit: i ? { opacity: 0, transition: xn } : { width: 0, opacity: 0, transition: { width: Sm, opacity: { duration: ct.duration.instant } } },
                  transition: i ? xn : { width: ct.spring.smooth, opacity: So },
                  children: /* @__PURE__ */ x.jsx(xt.span, { className: gt.retryInner, initial: i ? !1 : { scale: 0.8, filter: `blur(${ct.blur.subtle}px)` }, animate: { scale: 1, filter: "blur(0px)" }, transition: i ? qc : ct.spring.snappy, children: /* @__PURE__ */ x.jsxs("button", { type: "button", className: gt.retry, onClick: d, "aria-label": `Retry ${n.name}`, title: "Retry", children: [
                    /* @__PURE__ */ x.jsx(K3, { size: 14, strokeWidth: 2, "aria-hidden": "true" }),
                    /* @__PURE__ */ x.jsx("span", { className: gt.retryLabel, children: "Retry" })
                  ] }) })
                },
                "retry"
              ) }),
              /* @__PURE__ */ x.jsx("button", { ref: h, type: "button", className: gt.remove, onClick: f, "aria-label": `Remove ${n.name}`, title: "Remove", children: /* @__PURE__ */ x.jsx(lC, { size: 16, strokeWidth: 1.75, "aria-hidden": "true" }) })
            ] })
          ]
        }
      )
    }
  );
}
function Z5({ accept: n, multiple: i = !0, maxFiles: o = 5, onFilesChange: r, label: l = "Add files", description: f = "Drop files here or choose from your device", defaultItems: d, onUpload: h, maxSize: m, listPlacement: g = "below", note: y, dropLabel: p, compactAt: S }) {
  const [T, E] = v.useState(() => d ?? []), [w, _] = v.useState(!1), [R, O] = v.useState(""), [A, D] = v.useState(""), [U, z] = v.useState(0), V = v.useRef(null), I = v.useRef(null), F = v.useRef(null), Z = v.useRef(null), W = v.useRef(0), et = v.useRef(0), st = v.useRef(/* @__PURE__ */ new Map()), ft = v.useRef(/* @__PURE__ */ new Map()), ht = v.useId(), q = v.useId(), X = !!Ve(), Y = g === "inside", tt = S !== void 0 && T.length >= S, [lt, Dt] = v.useState(() => /* @__PURE__ */ new Set()), Mt = v.useRef(/* @__PURE__ */ new Map()), [te, N] = v.useState(!1), [Q, rt] = v.useState(!1);
  v.useEffect(() => {
    const J = st.current, Et = Mt.current;
    return () => {
      J.forEach((Ct) => Ct.abort()), Et.forEach((Ct) => URL.revokeObjectURL(Ct));
    };
  }, []);
  const ut = Ji(50), it = Ji(50), yt = { stiffness: 260, damping: 32, mass: 0.8 }, bt = HS(ut, yt), nt = HS(it, yt), at = PS`radial-gradient(180px circle at ${bt}% ${nt}%, var(--accent), transparent 70%)`, Vt = PS`radial-gradient(260px circle at ${bt}% ${nt}%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 70%)`, we = (J) => {
    const Et = F.current;
    if (!Et) return;
    const Ct = Et.getBoundingClientRect(), Ut = (J.clientX - Ct.left) / Math.max(1, Ct.width) * 100, se = (J.clientY - Ct.top) / Math.max(1, Ct.height) * 100;
    ut.jump(Ut), it.jump(se), bt.jump(Ut), nt.jump(se);
  };
  v.useLayoutEffect(() => {
    const J = F.current, Et = Z.current;
    if (!J || !Et) return;
    const Ct = () => {
      const me = J.offsetWidth - 1, Oe = J.offsetHeight - 1, Fa = Math.max(0, Math.min(parseFloat(getComputedStyle(J).borderTopLeftRadius) - 0.5, me / 2, Oe / 2)), Vo = 2 * (me + Oe) - 8 * Fa + 2 * Math.PI * Fa;
      Et.setAttribute("rx", String(Fa)), Et.setAttribute("pathLength", String(Math.max(8, Math.round(Vo / _x)) * _x));
    };
    Ct();
    let Ut = 0;
    const se = () => {
      Ct(), Ut = requestAnimationFrame(se);
    }, Fe = (me) => {
      me.target === J && me.propertyName.includes("radius") && (cancelAnimationFrame(Ut), se());
    }, Xe = (me) => {
      me.target === J && me.propertyName.includes("radius") && (cancelAnimationFrame(Ut), Ct());
    };
    J.addEventListener("transitionrun", Fe), J.addEventListener("transitionend", Xe), J.addEventListener("transitioncancel", Xe);
    const Lo = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(Ct);
    return Lo?.observe(J), () => {
      Lo?.disconnect(), cancelAnimationFrame(Ut), J.removeEventListener("transitionrun", Fe), J.removeEventListener("transitionend", Xe), J.removeEventListener("transitioncancel", Xe);
    };
  }, []);
  const ae = (J) => J.flatMap((Et) => Et.file ? [Et.file] : []), ce = (J, Et) => E((Ct) => Ct.map((Ut) => Ut.id === J ? Et(Ut) : Ut));
  function Yt(J) {
    if (!h) return;
    st.current.get(J.id)?.abort();
    const Et = new AbortController();
    st.current.set(J.id, Et), ce(J.id, (Ct) => ({ ...Ct, status: "uploading", progress: 0, error: void 0 })), h({ ...J, status: "uploading", progress: 0, error: void 0 }, {
      signal: Et.signal,
      onProgress: (Ct) => {
        Et.signal.aborted || ce(J.id, (Ut) => Ut.status === "uploading" ? { ...Ut, progress: Math.max(Ut.progress ?? 0, Ac(Ct)) } : Ut);
      }
    }).then(() => {
      Et.signal.aborted || (ce(J.id, (Ct) => ({ ...Ct, status: "uploaded", progress: 100 })), D(`${J.name} uploaded`));
    }, (Ct) => {
      if (Et.signal.aborted) return;
      const Ut = Ct instanceof Error && Ct.message ? Ct.message : "Upload failed";
      ce(J.id, (se) => ({ ...se, status: "failed", error: Ut, retryable: !0 })), D(`${J.name} failed. ${Ut}`);
    }).finally(() => {
      st.current.get(J.id) === Et && st.current.delete(J.id);
    });
  }
  function Bt(J) {
    const Et = Array.from(J), Ct = n?.split(",").map((Rt) => Rt.trim().toLowerCase()).filter(Boolean) ?? [], Ut = Et.filter((Rt) => Ct.length === 0 || Ct.some((_e) => _e.startsWith(".") ? Rt.name.toLowerCase().endsWith(_e) : _e.endsWith("/*") ? Rt.type.startsWith(_e.slice(0, -1)) : Rt.type === _e)), se = i ? T : [], Fe = (Rt, _e) => Rt.name === _e.name && Rt.size === _e.size && Rt.lastModified === _e.lastModified, Xe = Ut.filter((Rt, _e) => Ut.findIndex((ri) => Fe(ri, Rt)) === _e && !se.some((ri) => ri.file && Fe(ri.file, Rt))), Lo = i ? Math.max(0, o - se.length) : 1, me = Xe.slice(0, Lo).map((Rt) => {
      const _e = m !== void 0 && Rt.size > m, ri = `${Rt.name}-${Rt.size}-${Rt.lastModified}-${et.current++}`, Ws = Rt.type.startsWith("image/") && typeof URL.createObjectURL == "function" ? URL.createObjectURL(Rt) : void 0;
      return Ws && Mt.current.set(ri, Ws), { id: ri, name: Rt.name, size: Rt.size, file: Rt, preview: Ws, status: _e ? "failed" : h ? "uploading" : void 0, progress: 0, error: _e ? `File is larger than ${pw(m)}` : void 0, retryable: !_e };
    }), Oe = Ut.length !== Et.length, Fa = Xe.length > me.length;
    if (O(Oe ? Et.length - Ut.length === 1 && Et.length === 1 ? `${Et[0].name} is not an accepted file type.` : "Some files were not added because their type is not accepted." : Fa ? `You can add up to ${o} ${o === 1 ? "file" : "files"}.` : ""), !me.length) return;
    i || (st.current.forEach((Rt) => Rt.abort()), st.current.clear());
    const Vo = [...se, ...me];
    Dt((Rt) => /* @__PURE__ */ new Set([...Rt, ...me.map((_e) => _e.id)])), z(se.length), E((Rt) => i ? [...Rt, ...me] : me), r?.(ae(Vo));
    const Js = me.filter((Rt) => Rt.status === "failed");
    D(`${me.length} ${me.length === 1 ? "file" : "files"} added.${Js.length ? ` ${Js.map((Rt) => `${Rt.name}: ${Rt.error}`).join(". ")}.` : ""}`), me.filter((Rt) => Rt.status === "uploading").forEach(Yt);
  }
  function _n(J) {
    st.current.get(J.id)?.abort(), st.current.delete(J.id);
    const Et = T.findIndex((Fe) => Fe.id === J.id), Ct = T[Et + 1] ?? T[Et - 1], Ut = T.filter((Fe) => Fe.id !== J.id), se = Mt.current.get(J.id);
    se && (Mt.current.delete(J.id), window.setTimeout(() => URL.revokeObjectURL(se), 600)), E((Fe) => Fe.filter((Xe) => Xe.id !== J.id)), O(""), D(`${J.name} removed`), J.file && r?.(ae(Ut)), requestAnimationFrame(() => (Ct ? ft.current.get(Ct.id) : I.current)?.focus());
  }
  function Ga(J) {
    D(`Retrying ${J.name}`), Yt(J), requestAnimationFrame(() => ft.current.get(J.id)?.focus());
  }
  function oi(J) {
    if (J.key === "Delete" || J.key === "Backspace") {
      const Xe = J.target.closest(`.${gt.row}`)?.querySelector(`.${gt.remove}`);
      Xe && (J.preventDefault(), Xe.click());
      return;
    }
    if (J.key !== "ArrowDown" && J.key !== "ArrowUp") return;
    const Et = J.target.closest("button"), Ct = Array.from(J.currentTarget.querySelectorAll(`.${gt.row}`)), Ut = Et?.closest(`.${gt.row}`);
    if (!Et || !Ut) return;
    const se = Ct[Ct.indexOf(Ut) + (J.key === "ArrowDown" ? 1 : -1)];
    se && (J.preventDefault(), (se.querySelector(`.${Et.classList.contains(gt.retry) ? gt.retry : gt.remove}`) ?? se.querySelector(`.${gt.remove}`))?.focus());
  }
  const Ya = te || Q, ka = v.useRef(Bt);
  v.useLayoutEffect(() => {
    ka.current = Bt;
  }), v.useEffect(() => {
    if (!Ya) return;
    const J = (Et) => {
      const Ct = Et.clipboardData?.files;
      !Ct?.length || Et.target?.closest("input:not([type=file]), textarea, [contenteditable='true']") || (Et.preventDefault(), ka.current(Ct));
    };
    return document.addEventListener("paste", J), () => document.removeEventListener("paste", J);
  }, [Ya]);
  const si = (J) => Array.from(J.dataTransfer?.types ?? []).includes("Files"), Zs = p ?? (h ? "Drop to upload" : i ? "Drop to add files" : "Drop to add the file"), jo = y ?? (n ? `Accepted: ${n}` : `Up to ${o} ${o === 1 ? "file" : "files"}`), zo = { initial: { opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { opacity: 0, transition: xn }, transition: xn }, Qs = Y && T.length > 0, qn = /* @__PURE__ */ x.jsx(
    xt.ul,
    {
      className: gt.list,
      "aria-label": "Files",
      "aria-hidden": T.length ? void 0 : !0,
      onKeyDown: oi,
      initial: !1,
      animate: { paddingTop: T.length && !Y ? 4 : 0, paddingBottom: T.length && Y ? 12 : 0 },
      transition: qc,
      children: /* @__PURE__ */ x.jsx(ie, { initial: !1, children: T.map((J, Et) => /* @__PURE__ */ x.jsx(
        K5,
        {
          item: J,
          reduce: X,
          delay: 0,
          fresh: lt.has(J.id),
          canRetry: !!h,
          onRemove: () => _n(J),
          onRetry: () => Ga(J),
          removeRef: (Ct) => {
            Ct ? ft.current.set(J.id, Ct) : ft.current.delete(J.id);
          }
        },
        J.id
      )) })
    }
  );
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: gt.wrapper,
      onPointerEnter: () => N(!0),
      onPointerLeave: () => N(!1),
      onFocus: () => rt(!0),
      onBlur: (J) => {
        J.currentTarget.contains(J.relatedTarget) || rt(!1);
      },
      children: [
        /* @__PURE__ */ x.jsxs(
          "div",
          {
            ref: F,
            className: `${gt.dropzone} ${w ? gt.dragging : ""} ${Y ? gt.inside : ""} ${tt ? gt.compact : ""}`,
            onDragEnter: (J) => {
              si(J) && (J.preventDefault(), W.current || we(J), W.current += 1, _(!0));
            },
            onDragOver: (J) => {
              si(J) && (J.preventDefault(), J.dataTransfer.dropEffect = "copy", we(J));
            },
            onDragLeave: (J) => {
              si(J) && (W.current = Math.max(0, W.current - 1), W.current || _(!1));
            },
            onDrop: (J) => {
              J.preventDefault(), W.current = 0, _(!1), J.dataTransfer.files.length && Bt(J.dataTransfer.files);
            },
            children: [
              /* @__PURE__ */ x.jsx(xt.span, { className: gt.wash, style: { backgroundImage: Vt }, "aria-hidden": "true" }),
              /* @__PURE__ */ x.jsx("svg", { className: gt.edge, "aria-hidden": "true", children: /* @__PURE__ */ x.jsx("rect", { ref: Z, width: "100%", height: "100%", rx: 33.5, pathLength: 1358 }) }),
              /* @__PURE__ */ x.jsx(xt.span, { className: gt.glow, style: { backgroundImage: at }, "aria-hidden": "true" }),
              /* @__PURE__ */ x.jsxs(
                xt.button,
                {
                  ref: I,
                  type: "button",
                  className: gt.trigger,
                  onClick: () => V.current?.click(),
                  "aria-describedby": tt ? ht : `${ht} ${q}`,
                  initial: !1,
                  animate: { paddingTop: tt ? 16 : 26, paddingBottom: tt ? Qs ? 8 : 16 : Qs ? 26 : 34 },
                  transition: qc,
                  children: [
                    /* @__PURE__ */ x.jsx(ie, { initial: !1, children: (!tt || w) && /* @__PURE__ */ x.jsx(xt.span, { className: gt.iconSlot, ...zo, children: /* @__PURE__ */ x.jsxs("span", { className: gt.sheets, "aria-hidden": "true", children: [
                      /* @__PURE__ */ x.jsx("span", { className: gt.sheet, "data-sheet": "back" }),
                      /* @__PURE__ */ x.jsx("span", { className: gt.sheet, "data-sheet": "side" }),
                      /* @__PURE__ */ x.jsx("span", { className: gt.sheet, "data-sheet": "front", children: /* @__PURE__ */ x.jsx(V3, { size: 14, strokeWidth: 2 }) })
                    ] }) }, "icon") }),
                    /* @__PURE__ */ x.jsx("strong", { className: gt.label, children: /* @__PURE__ */ x.jsx(Y5, { text: w ? Zs : l, className: gt.labelText, reduce: X }) }),
                    /* @__PURE__ */ x.jsx("span", { id: ht, className: gt.hint, children: f }),
                    /* @__PURE__ */ x.jsx(ie, { initial: !1, children: !tt && /* @__PURE__ */ x.jsx(xt.span, { className: gt.noteSlot, ...zo, children: /* @__PURE__ */ x.jsx("small", { id: q, className: gt.note, children: jo }) }, "note") })
                  ]
                }
              ),
              Y && qn
            ]
          }
        ),
        /* @__PURE__ */ x.jsx("input", { ref: V, className: gt.input, type: "file", accept: n, multiple: i, tabIndex: -1, "aria-hidden": "true", onChange: (J) => {
          J.target.files && Bt(J.target.files), J.target.value = "";
        } }),
        /* @__PURE__ */ x.jsx(ie, { initial: !1, children: R ? /* @__PURE__ */ x.jsx(F5, { text: R }, "error") : null }),
        !Y && qn,
        /* @__PURE__ */ x.jsx("span", { className: gt.srOnly, role: "status", "aria-live": "polite", children: A })
      ]
    }
  );
}
function Q5(n = 1900) {
  const [i, o] = v.useState("idle"), [r, l] = v.useState(null), f = v.useRef(null), d = v.useCallback(() => {
    f.current && clearTimeout(f.current), f.current = null, o("idle"), l(null);
  }, []);
  v.useEffect(() => () => {
    f.current && clearTimeout(f.current);
  }, []);
  const h = v.useCallback(async (m, g = "default") => {
    f.current && clearTimeout(f.current), l(g);
    try {
      return await navigator.clipboard.writeText(m), o("copied"), f.current = setTimeout(d, n), !0;
    } catch {
      return o("error"), f.current = setTimeout(d, n), !1;
    }
  }, [n, d]);
  return { state: i, activeKey: r, copy: h, reset: d };
}
const J5 = "_button_xfu12_3", W5 = "_iconOnly_xfu12_7", tB = "_plain_xfu12_9", eB = "_icon_xfu12_7", nB = "_iconInner_xfu12_17", iB = "_label_xfu12_25", aB = "_measure_xfu12_27", oB = "_glyphs_xfu12_27", sB = "_glyph_xfu12_27", rB = "_srOnly_xfu12_39", Bn = {
  button: J5,
  iconOnly: W5,
  plain: tB,
  icon: eB,
  iconInner: nB,
  label: iB,
  measure: aB,
  glyphs: oB,
  glyph: sB,
  srOnly: rB
}, lB = { type: "spring", visualDuration: 0.5, bounce: 0.06 }, uB = { duration: 0.36, ease: [...ct.ease.enter] }, cB = { duration: 0.2, ease: [...ct.ease.standard] }, Ag = { duration: ct.duration.instant }, yw = `blur(${ct.blur.soft}px)`, Rg = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }, vw = { ...Rg, opacity: 0 }, bw = { opacity: 0, transition: Ag }, fB = { opacity: 0, y: 4, filter: yw }, dB = { opacity: 0, y: -3, filter: yw, transition: cB };
function hB({ reduced: n }) {
  return /* @__PURE__ */ x.jsx("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ x.jsx(xt.path, { d: "M4 12l5 5L20 6", initial: n ? !1 : { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { pathLength: { duration: 0.5, ease: [...ct.ease.standard], delay: 0.05 }, opacity: { duration: 0.01, delay: 0.05 } } }) });
}
const Rx = (n, i) => n.map((o, r) => ({ id: `${i}:${r}`, char: o, order: r }));
function mB(n) {
  const [i, o] = v.useState(() => ({ text: n, seq: 0, glyphs: Rx([...n], 0) }));
  if (i.text === n) return i.glyphs;
  const r = [...i.text], l = [...n];
  let f = 0, d = 0;
  for (; f < r.length && f < l.length && r[f] === l[f]; ) f++;
  for (; d < r.length - f && d < l.length - f && r[r.length - 1 - d] === l[l.length - 1 - d]; ) d++;
  f < 2 && (f = 0), d < 2 && (d = 0);
  const h = i.seq + 1, m = [...i.glyphs.slice(0, f), ...Rx(l.slice(f, l.length - d), h), ...i.glyphs.slice(i.glyphs.length - d)];
  return o({ text: n, seq: h, glyphs: m }), m;
}
function pB({ text: n, reduced: i }) {
  const o = mB(n);
  return /* @__PURE__ */ x.jsx(xt.span, { className: Bn.glyphs, layoutRoot: !0, children: /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: o.map((r) => /* @__PURE__ */ x.jsx(xt.span, { className: Bn.glyph, layout: i ? !1 : "position", layoutDependency: n, initial: i ? vw : fB, animate: Rg, exit: i ? bw : dB, transition: i ? Ag : { ...uB, delay: Math.min(r.order * 0.02, 0.12), layout: lB }, children: r.char }, r.id)) }) });
}
function Sw({ value: n, label: i = "Copy", className: o, iconOnly: r = !1, variant: l = "outline", disabled: f, onCopied: d }) {
  const { state: h, copy: m } = Q5(), g = Ve(), y = h === "copied" ? "Copied" : h === "error" ? "Failed" : i;
  async function p() {
    await m(n) && d?.();
  }
  return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsxs(
      "button",
      {
        type: "button",
        className: [Bn.button, r && Bn.iconOnly, l === "plain" && Bn.plain, o].filter(Boolean).join(" "),
        onClick: () => {
          p();
        },
        "aria-label": i,
        "data-copy-state": h,
        disabled: f,
        children: [
          /* @__PURE__ */ x.jsx("span", { className: Bn.icon, "aria-hidden": "true", children: /* @__PURE__ */ x.jsx(ie, { initial: !1, children: /* @__PURE__ */ x.jsx(xt.span, { className: Bn.iconInner, "data-state": h, initial: vw, animate: Rg, exit: bw, transition: Ag, children: h === "copied" ? /* @__PURE__ */ x.jsx(hB, { reduced: g }) : h === "error" ? /* @__PURE__ */ x.jsx(lg, { size: 16, strokeWidth: 1.75 }) : /* @__PURE__ */ x.jsx(I3, { size: 16, strokeWidth: 1.75 }) }, h) }) }),
          !r && /* @__PURE__ */ x.jsxs("span", { className: Bn.label, "aria-hidden": "true", children: [
            /* @__PURE__ */ x.jsx("span", { className: Bn.measure, children: i }),
            /* @__PURE__ */ x.jsx("span", { className: Bn.measure, children: "Copied" }),
            /* @__PURE__ */ x.jsx("span", { className: Bn.measure, children: "Failed" }),
            /* @__PURE__ */ x.jsx(pB, { text: y, reduced: g })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ x.jsx("span", { className: Bn.srOnly, role: "status", "aria-live": "polite", children: h === "idle" ? "" : h === "error" ? `${i}: Could not copy` : `${i}: Copied` })
  ] });
}
const gB = "_block_1hfdy_1", yB = "_header_1hfdy_3", vB = "_file_1hfdy_7", bB = "_filename_1hfdy_11", SB = "_swap_1hfdy_15", xB = "_swapStack_1hfdy_17", TB = "_swapText_1hfdy_21", EB = "_reserve_1hfdy_23", CB = "_sizer_1hfdy_25", wB = "_srOnly_1hfdy_27", _B = "_language_1hfdy_29", AB = "_viewport_1hfdy_35", RB = "_pre_1hfdy_37", OB = "_code_1hfdy_41", DB = "_expand_1hfdy_43", MB = "_chevron_1hfdy_45", NB = "_comment_1hfdy_49", jB = "_string_1hfdy_51", zB = "_number_1hfdy_53", LB = "_keyword_1hfdy_55", VB = "_type_1hfdy_57", BB = "_property_1hfdy_61", PB = "_tag_1hfdy_63", UB = "_punctuation_1hfdy_65", Te = {
  block: gB,
  header: yB,
  file: vB,
  filename: bB,
  swap: SB,
  swapStack: xB,
  swapText: TB,
  reserve: EB,
  sizer: CB,
  srOnly: wB,
  language: _B,
  viewport: AB,
  pre: RB,
  code: OB,
  expand: DB,
  chevron: MB,
  comment: NB,
  string: jB,
  number: zB,
  keyword: LB,
  type: VB,
  function: "_function_1hfdy_59",
  property: BB,
  tag: PB,
  punctuation: UB
}, HB = /^(?:abstract|as|async|await|break|case|catch|class|const|continue|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|private|protected|public|readonly|return|set|static|switch|throw|try|type|typeof|var|void|while|with|yield|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE)$/, IB = /^(?:true|false|null|undefined|NaN|Infinity)$/, qB = /^(?:Array|Boolean|Date|Error|Map|Number|Promise|Record|Set|String|ReactNode|HTMLElement|HTMLButtonElement|Event|unknown|never|void|any|boolean|number|string|object)$/, GB = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|<!--[\s\S]*?-->|`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$-]*\b|[{}[\]();,.<>:=+*/!?|&-]/g;
function YB(n) {
  return n.toLowerCase().replace(/^\./, "");
}
function kB(n, i, o, r) {
  if (n.startsWith("//") || n.startsWith("/*") || n.startsWith("<!--")) return "comment";
  if (n.startsWith('"') || n.startsWith("'") || n.startsWith("`"))
    return r === "json" && /^\s*:/.test(i.slice(o + n.length)) ? "property" : "string";
  if (/^\d/.test(n)) return "number";
  if (HB.test(n) || IB.test(n)) return "keyword";
  if (qB.test(n)) return "type";
  if (/^[{}[\]();,.<>:=+*/!?|&-]$/.test(n)) return "punctuation";
  const l = i.slice(0, o), f = i.slice(o + n.length);
  if ((r === "tsx" || r === "jsx" || r === "html" || r === "vue") && /<\/?$/.test(l)) return "tag";
  if (/^\s*\(/.test(f) && r !== "json") return "function";
  if ((r === "css" || r === "tsx" || r === "jsx") && /^\s*[:=]/.test(f)) return "property";
}
function FB(n, i) {
  const o = [];
  let r = 0;
  for (const l of n.matchAll(GB)) {
    const f = l[0], d = l.index ?? 0;
    r < d && o.push(n.slice(r, d));
    const h = kB(f, n, d, i);
    o.push(h ? /* @__PURE__ */ x.jsx("span", { className: Te[h], children: f }, `${d}-${f}`) : /* @__PURE__ */ x.jsx(v.Fragment, { children: f }, `${d}-${f}`)), r = d + f.length;
  }
  return r < n.length && o.push(n.slice(r)), o;
}
const XB = { duration: ct.duration.standard, ease: [...ct.ease.enter] }, $B = { duration: ct.duration.instant, ease: [...ct.ease.standard] };
function xw({ value: n, reduced: i }) {
  return /* @__PURE__ */ x.jsx(ie, { initial: !1, children: /* @__PURE__ */ x.jsx(xt.span, { className: Te.swapText, initial: i ? !1 : { opacity: 0, y: "0.3em", filter: `blur(${ct.blur.soft}px)` }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: i ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: "-0.3em", filter: `blur(${ct.blur.subtle}px)`, transition: $B }, transition: i ? { duration: 0 } : XB, children: n }, n) });
}
function KB({ name: n, reduced: i }) {
  const o = v.useRef(null), r = v.useRef(0), l = Ji("auto");
  return v.useEffect(() => {
    const f = o.current;
    if (!f) return;
    const d = new ResizeObserver(() => {
      r.current = f.offsetWidth;
    });
    return d.observe(f), () => d.disconnect();
  }, []), v.useLayoutEffect(() => {
    const f = l.get(), d = o.current?.offsetWidth ?? 0, h = typeof f == "number" ? f : r.current;
    if (r.current = d, i || !h || !d || Math.abs(h - d) < 1) {
      l.jump("auto");
      return;
    }
    l.jump(h);
    const m = Hs(l, d, { ...ct.spring.morph, onComplete: () => l.jump("auto") });
    return () => m.stop();
  }, [n, i, l]), /* @__PURE__ */ x.jsxs(xt.span, { className: `${Te.swap} ${Te.filename}`, style: { width: l }, children: [
    /* @__PURE__ */ x.jsx("span", { ref: o, className: Te.sizer, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ x.jsx("span", { className: Te.swapStack, "aria-hidden": "true", children: /* @__PURE__ */ x.jsx(xw, { value: n, reduced: i }) }),
    /* @__PURE__ */ x.jsx("span", { className: Te.srOnly, children: n })
  ] });
}
function Tw({ code: n, filename: i, language: o = "tsx", maxLines: r }) {
  const l = YB(o), f = Ve(), d = v.useId(), h = n.split(`
`).length, m = r != null && r > 0 && h > r, [g, y] = v.useState(!1), p = !m || g, S = v.useRef(null), T = v.useRef(null), E = Ji(p ? "auto" : "var(--code-collapsed)"), w = v.useRef({ open: p, reduced: f }), _ = v.useRef(() => {
  });
  v.useLayoutEffect(() => {
    const O = S.current;
    if (!O) return;
    const A = (U) => {
      const z = T.current;
      if (!z) return;
      const V = w.current.open ? z.full : z.collapsed;
      U || w.current.reduced || typeof E.get() != "number" ? E.jump(V) : Hs(E, V, ct.spring.smooth);
    }, D = new ResizeObserver(() => {
      const U = getComputedStyle(O), z = O.offsetHeight, V = r ? Math.min(z, Math.round(r * parseFloat(U.lineHeight) + parseFloat(U.paddingTop) + parseFloat(U.paddingBottom))) : z, I = !T.current;
      T.current = { full: z, collapsed: V }, A(I);
    });
    return D.observe(O), _.current = A, () => D.disconnect();
  }, [E, r]), v.useLayoutEffect(() => {
    w.current = { open: p, reduced: f }, _.current(!1);
  }, [p, f]);
  const R = [`Show all ${h} lines`, "Show fewer lines"];
  return /* @__PURE__ */ x.jsxs("section", { className: Te.block, "aria-label": i ? `${i} source code` : `${l} source code`, style: r ? { "--code-lines": r } : void 0, children: [
    /* @__PURE__ */ x.jsxs("header", { className: Te.header, children: [
      /* @__PURE__ */ x.jsxs("div", { className: Te.file, children: [
        /* @__PURE__ */ x.jsx(G3, { size: 16, strokeWidth: 1.75, "aria-hidden": "true" }),
        /* @__PURE__ */ x.jsx(KB, { name: i ?? "Source code", reduced: f }),
        /* @__PURE__ */ x.jsx("span", { className: Te.language, children: l })
      ] }),
      /* @__PURE__ */ x.jsx(Sw, { value: n, label: "Copy code" })
    ] }),
    /* @__PURE__ */ x.jsx(xt.div, { className: Te.viewport, style: { height: E }, children: /* @__PURE__ */ x.jsx("pre", { ref: S, id: d, className: Te.pre, tabIndex: 0, "aria-label": "Selectable source code", children: /* @__PURE__ */ x.jsx(ie, { initial: !1, mode: "popLayout", children: /* @__PURE__ */ x.jsx(xt.code, { className: Te.code, initial: !1, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, transition: { duration: 0 } }, transition: { duration: 0 }, children: FB(n, l) }, n) }) }) }),
    m && /* @__PURE__ */ x.jsxs("button", { type: "button", className: Te.expand, "aria-expanded": g, "aria-controls": d, onClick: () => y((O) => !O), children: [
      /* @__PURE__ */ x.jsxs("span", { className: Te.swap, "aria-hidden": "true", children: [
        R.map((O) => /* @__PURE__ */ x.jsx("span", { className: Te.reserve, children: O }, O)),
        /* @__PURE__ */ x.jsx("span", { className: Te.swapStack, children: /* @__PURE__ */ x.jsx(xw, { value: R[g ? 1 : 0], reduced: f }) })
      ] }),
      /* @__PURE__ */ x.jsx("span", { className: Te.srOnly, children: R[g ? 1 : 0] }),
      /* @__PURE__ */ x.jsx(xt.span, { className: Te.chevron, "aria-hidden": "true", initial: !1, animate: { rotate: g ? 180 : 0 }, transition: { duration: 0 }, children: /* @__PURE__ */ x.jsx(Bc, { size: 16, strokeWidth: 1.75 }) })
    ] })
  ] });
}
var ZB = Object.defineProperty, Og = (n, i) => ZB(n, "name", { value: i, configurable: !0 }), xm = !1;
function Ew() {
  const [n, i] = v.useState(xm);
  return v.useEffect(() => {
    xm || (xm = !0, i(!0));
  }, []), n;
}
Og(Ew, "useIsHydrated");
var Cw = qs[" useSyncExternalStore ".trim().toString()];
function ww() {
  return () => {
  };
}
Og(ww, "subscribe");
function _w() {
  return Cw(
    ww,
    () => !0,
    () => !1
  );
}
Og(_w, "useIsHydratedModern");
var QB = typeof Cw == "function" ? _w : Ew, JB = Object.defineProperty, No = (n, i) => JB(n, "name", { value: i, configurable: !0 }), Tm = "rovingFocusGroup.onEntryFocus", WB = { bubbles: !1, cancelable: !0 }, ff = "RovingFocusGroup", [pp, Aw, t6] = /* @__PURE__ */ Kc(ff), [e6, Rw] = /* @__PURE__ */ ii(
  ff,
  [t6]
), Ox = {
  Vertical: "vertical",
  Horizontal: "horizontal"
}, n6 = {
  RTL: "rtl"
}, [i6, a6] = e6(ff), o6 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ No(function(i, o) {
    return /* @__PURE__ */ x.jsx(pp.Provider, { scope: i.__scopeRovingFocusGroup, children: /* @__PURE__ */ x.jsx(pp.Slot, { scope: i.__scopeRovingFocusGroup, children: /* @__PURE__ */ x.jsx(s6, { ...i, ref: o }) }) });
  }, "RovingFocusGroup")
), s6 = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ No(function(i, o) {
  const {
    __scopeRovingFocusGroup: r,
    orientation: l,
    loop: f = !1,
    dir: d,
    currentTabStopId: h,
    defaultCurrentTabStopId: m,
    onCurrentTabStopIdChange: g,
    onEntryFocus: y,
    preventScrollOnEntryFocus: p = !1,
    ...S
  } = i, T = v.useRef(null), E = Jt(o, T), w = El(d), [_, R] = wi({
    prop: h,
    defaultProp: m ?? null,
    onChange: g,
    caller: ff
  }), [O, A] = v.useState(!1), D = ni(y), U = Aw(r), z = v.useRef(!1), [V, I] = v.useState(0);
  return v.useEffect(() => {
    const F = T.current;
    if (F)
      return F.addEventListener(Tm, D), () => F.removeEventListener(Tm, D);
  }, [D]), /* @__PURE__ */ x.jsx(
    i6,
    {
      scope: r,
      orientation: l,
      dir: w,
      loop: f,
      currentTabStopId: _,
      onItemFocus: v.useCallback(
        (F) => R(F),
        [R]
      ),
      onItemShiftTab: v.useCallback(() => A(!0), []),
      onFocusableItemAdd: v.useCallback(
        () => I((F) => F + 1),
        []
      ),
      onFocusableItemRemove: v.useCallback(
        () => I((F) => F - 1),
        []
      ),
      children: /* @__PURE__ */ x.jsx(
        qt.div,
        {
          tabIndex: O || V === 0 ? -1 : 0,
          "data-orientation": l,
          ...S,
          ref: E,
          style: { outline: "none", ...i.style },
          onMouseDown: At(i.onMouseDown, () => {
            z.current = !0;
          }),
          onFocus: At(i.onFocus, (F) => {
            const Z = !z.current;
            if (F.target === F.currentTarget && Z && !O) {
              const W = new CustomEvent(Tm, WB);
              if (F.currentTarget.dispatchEvent(W), !W.defaultPrevented) {
                const et = U().filter((X) => X.focusable), st = et.find((X) => X.active), ft = et.find((X) => X.id === _), q = [st, ft, ...et].filter(
                  Boolean
                ).map((X) => X.ref.current);
                Dg(q, p);
              }
            }
            z.current = !1;
          }),
          onBlur: At(i.onBlur, () => A(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), r6 = "RovingFocusGroupItem", l6 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ No(function(i, o) {
    const {
      __scopeRovingFocusGroup: r,
      focusable: l = !0,
      active: f = !1,
      tabStopId: d,
      children: h,
      ...m
    } = i, g = ei(), y = d || g, p = a6(r6, r), S = p.currentTabStopId === y, T = Aw(r), { onFocusableItemAdd: E, onFocusableItemRemove: w, currentTabStopId: _ } = p, R = QB();
    return ue(() => {
      if (!(!R || !l))
        return E(), () => w();
    }, [R, l, E, w]), v.useEffect(() => {
      if (!(R || !l))
        return E(), () => w();
    }, [R, l, E, w]), /* @__PURE__ */ x.jsx(
      pp.ItemSlot,
      {
        scope: r,
        id: y,
        focusable: l,
        active: f,
        children: /* @__PURE__ */ x.jsx(
          qt.span,
          {
            tabIndex: S ? 0 : -1,
            "data-orientation": p.orientation,
            ...m,
            ref: o,
            onMouseDown: At(i.onMouseDown, (O) => {
              l ? p.onItemFocus(y) : O.preventDefault();
            }),
            onFocus: At(i.onFocus, () => p.onItemFocus(y)),
            onKeyDown: At(i.onKeyDown, (O) => {
              if (O.key === "Tab" && O.shiftKey) {
                p.onItemShiftTab();
                return;
              }
              if (O.target !== O.currentTarget) return;
              const A = Dw(O, p.orientation, p.dir);
              if (A !== void 0) {
                if (O.metaKey || O.ctrlKey || O.altKey || O.shiftKey) return;
                O.preventDefault();
                let U = T().filter((z) => z.focusable).map((z) => z.ref.current);
                if (A === "last") U.reverse();
                else if (A === "prev" || A === "next") {
                  A === "prev" && U.reverse();
                  const z = U.indexOf(O.currentTarget);
                  U = p.loop ? Mw(U, z + 1) : U.slice(z + 1);
                }
                setTimeout(() => Dg(U));
              }
            }),
            children: typeof h == "function" ? h({ isCurrentTabStop: S, hasTabStop: _ != null }) : h
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), u6 = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Ow(n, i) {
  return i !== n6.RTL ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
No(Ow, "getDirectionAwareKey");
function Dw(n, i, o) {
  const r = Ow(n.key, o);
  if (!(i === Ox.Vertical && ["ArrowLeft", "ArrowRight"].includes(r)) && !(i === Ox.Horizontal && ["ArrowUp", "ArrowDown"].includes(r)))
    return u6[r];
}
No(Dw, "getFocusIntent");
function Dg(n, i = !1) {
  const o = document.activeElement;
  for (const r of n)
    if (r === o || (r.focus({ preventScroll: i }), document.activeElement !== o)) return;
}
No(Dg, "focusFirst");
function Mw(n, i) {
  return n.map((o, r) => n[(i + r) % n.length]);
}
No(Mw, "wrapArray");
var c6 = Object.defineProperty, Ks = (n, i) => c6(n, "name", { value: i, configurable: !0 }), Nw = {
  Automatic: "automatic",
  Manual: "manual"
}, Mg = "Tabs", [f6, JP] = /* @__PURE__ */ ii(Mg, [
  Rw
]), jw = Rw(), [d6, Ng] = f6(Mg), h6 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ks(function(i, o) {
    const {
      __scopeTabs: r,
      value: l,
      onValueChange: f,
      defaultValue: d,
      orientation: h = "horizontal",
      dir: m,
      activationMode: g = Nw.Automatic,
      ...y
    } = i, p = El(m), [S, T] = wi({
      prop: l,
      onChange: f,
      defaultProp: d ?? "",
      caller: Mg
    });
    return /* @__PURE__ */ x.jsx(
      d6,
      {
        scope: r,
        baseId: ei(),
        value: S,
        onValueChange: T,
        orientation: h,
        dir: p,
        activationMode: g,
        children: /* @__PURE__ */ x.jsx(
          qt.div,
          {
            dir: p,
            "data-orientation": h,
            ...y,
            ref: o
          }
        )
      }
    );
  }, "Tabs")
), m6 = "TabsList", p6 = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ks(function(i, o) {
    const { __scopeTabs: r, loop: l = !0, ...f } = i, d = Ng(m6, r), h = jw(r);
    return /* @__PURE__ */ x.jsx(
      o6,
      {
        asChild: !0,
        ...h,
        orientation: d.orientation,
        dir: d.dir,
        loop: l,
        children: /* @__PURE__ */ x.jsx(
          qt.div,
          {
            role: "tablist",
            "aria-orientation": d.orientation,
            ...f,
            ref: o
          }
        )
      }
    );
  }, "TabsList")
), g6 = "TabsTrigger", y6 = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ks(function(i, o) {
    const { __scopeTabs: r, value: l, disabled: f = !1, ...d } = i, h = Ng(g6, r), m = jw(r), g = jg(h.baseId, l), y = zg(h.baseId, l), p = l === h.value;
    return /* @__PURE__ */ x.jsx(
      l6,
      {
        asChild: !0,
        ...m,
        focusable: !f,
        active: p,
        children: /* @__PURE__ */ x.jsx(
          qt.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": p,
            "aria-controls": y,
            "data-state": p ? "active" : "inactive",
            "data-disabled": f ? "" : void 0,
            disabled: f,
            id: g,
            ...d,
            ref: o,
            onMouseDown: At(i.onMouseDown, (S) => {
              !f && S.button === 0 && S.ctrlKey === !1 ? (S.currentTarget.focus(), h.onValueChange(l)) : S.preventDefault();
            }),
            onKeyDown: At(i.onKeyDown, (S) => {
              f || S.target !== S.currentTarget || [" ", "Enter"].includes(S.key) && h.onValueChange(l);
            }),
            onFocus: At(i.onFocus, () => {
              const S = h.activationMode !== Nw.Manual;
              !p && !f && S && h.onValueChange(l);
            })
          }
        )
      }
    );
  }, "TabsTrigger")
), v6 = "TabsContent", Dx = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Ks(function(i, o) {
    const { __scopeTabs: r, value: l, forceMount: f, children: d, ...h } = i, m = Ng(v6, r), g = jg(m.baseId, l), y = zg(m.baseId, l), p = l === m.value, S = v.useRef(p);
    return v.useEffect(() => {
      const T = requestAnimationFrame(() => S.current = !1);
      return () => cancelAnimationFrame(T);
    }, []), /* @__PURE__ */ x.jsx(Ha, { present: f || p, children: ({ present: T }) => /* @__PURE__ */ x.jsx(
      qt.div,
      {
        "data-state": p ? "active" : "inactive",
        "data-orientation": m.orientation,
        role: "tabpanel",
        "aria-labelledby": g,
        hidden: !T,
        id: y,
        tabIndex: 0,
        ...h,
        ref: o,
        style: {
          ...i.style,
          animationDuration: S.current ? "0s" : void 0
        },
        children: T && d
      }
    ) });
  }, "TabsContent")
);
function jg(n, i) {
  return `${n}-trigger-${i}`;
}
Ks(jg, "makeTriggerId");
function zg(n, i) {
  return `${n}-content-${i}`;
}
Ks(zg, "makeContentId");
const b6 = "_root_1pfgw_3", S6 = "_listShell_1pfgw_5", x6 = "_viewport_1pfgw_7", T6 = "_list_1pfgw_5", E6 = "_scrollButton_1pfgw_21", C6 = "_scrollLeft_1pfgw_23", w6 = "_scrollRight_1pfgw_25", _6 = "_trigger_1pfgw_31", A6 = "_selection_1pfgw_37", R6 = "_triggerLabel_1pfgw_39", O6 = "_content_1pfgw_43", En = {
  root: b6,
  listShell: S6,
  viewport: x6,
  list: T6,
  scrollButton: E6,
  scrollLeft: C6,
  scrollRight: w6,
  trigger: _6,
  selection: A6,
  triggerLabel: R6,
  content: O6
}, df = v.createContext({ active: "", layoutId: "tabs", direction: 1, panelHeightRef: { current: null }, leavingRectRef: { current: null } });
function D6({ value: n, defaultValue: i, onValueChange: o, className: r, ...l }) {
  const [f, d] = v.useState(i ?? ""), [h, m] = v.useState(1), g = n ?? f, y = v.useId(), p = v.useRef(null), S = v.useRef(null), T = v.useRef(null);
  function E(w) {
    const _ = p.current;
    T.current = _?.querySelector(':scope > [role="tabpanel"][data-state="active"]')?.getBoundingClientRect() ?? null;
    const R = _ ? Array.from(_.querySelectorAll('[role="tab"][data-value]')).filter((D) => D.closest(`.${En.root}`) === _).map((D) => D.dataset.value) : [], O = R.indexOf(g), A = R.indexOf(w);
    O >= 0 && A >= 0 && O !== A && m(A > O ? 1 : -1), n === void 0 && d(w), o?.(w);
  }
  return /* @__PURE__ */ x.jsx(df.Provider, { value: { active: g, layoutId: y, direction: h, panelHeightRef: S, leavingRectRef: T }, children: /* @__PURE__ */ x.jsx(UM, { id: y, children: /* @__PURE__ */ x.jsx(h6, { ...l, ref: p, className: [En.root, r].filter(Boolean).join(" "), value: g, onValueChange: E }) }) });
}
function M6({ className: n, ...i }) {
  const { active: o } = v.useContext(df), r = Ve(), l = v.useRef(null), f = v.useRef(null), d = v.useRef(null), [h, m] = v.useState({ overflow: !1, left: !1, right: !1 }), g = v.useCallback(() => {
    const S = l.current, T = f.current;
    if (!S || !T) return;
    const E = Math.max(0, T.scrollWidth - T.clientWidth), w = { overflow: T.scrollWidth > S.clientWidth + 1, left: T.scrollLeft > 1, right: T.scrollLeft < E - 1 };
    m((_) => _.overflow === w.overflow && _.left === w.left && _.right === w.right ? _ : w);
  }, []), y = v.useCallback((S) => {
    const T = f.current;
    if (!T || !S) return;
    const E = T.getBoundingClientRect(), w = S.getBoundingClientRect(), _ = Math.max(0, T.scrollWidth - T.clientWidth), R = E.left + (T.scrollLeft > 1 ? 34 : 0), O = E.right - (T.scrollLeft < _ - 1 ? 34 : 0), A = w.left < R ? w.left - R : w.right > O ? w.right - O : 0;
    A && T.scrollBy({ left: A, behavior: "instant" });
  }, [r]);
  v.useLayoutEffect(() => {
    const S = l.current, T = f.current, E = d.current;
    if (!S || !T || !E) return;
    const w = new ResizeObserver(g);
    return w.observe(S), w.observe(T), w.observe(E), T.addEventListener("scroll", g, { passive: !0 }), g(), () => {
      w.disconnect(), T.removeEventListener("scroll", g);
    };
  }, [g]), v.useLayoutEffect(() => {
    y(d.current?.querySelector('[role="tab"][data-state="active"]') ?? null);
  }, [o, y]);
  const p = (S) => f.current?.scrollBy({ left: S * (f.current?.clientWidth ?? 0) * 0.75, behavior: "instant" });
  return /* @__PURE__ */ x.jsxs("div", { ref: l, className: En.listShell, "data-overflow": h.overflow, "data-left": h.left, "data-right": h.right, children: [
    h.overflow && /* @__PURE__ */ x.jsx("button", { type: "button", className: `${En.scrollButton} ${En.scrollLeft}`, "aria-label": "Scroll tabs left", disabled: !h.left, onClick: () => p(-1), children: /* @__PURE__ */ x.jsx(P3, { width: 17, height: 17, "aria-hidden": "true" }) }),
    /* @__PURE__ */ x.jsx(xt.div, { ref: f, layoutScroll: !0, className: En.viewport, onFocusCapture: (S) => {
      S.target instanceof HTMLElement && S.target.getAttribute("role") === "tab" && y(S.target);
    }, children: /* @__PURE__ */ x.jsx(p6, { ...i, ref: d, className: [En.list, n].filter(Boolean).join(" ") }) }),
    h.overflow && /* @__PURE__ */ x.jsx("button", { type: "button", className: `${En.scrollButton} ${En.scrollRight}`, "aria-label": "Scroll tabs right", disabled: !h.right, onClick: () => p(1), children: /* @__PURE__ */ x.jsx(U3, { width: 17, height: 17, "aria-hidden": "true" }) })
  ] });
}
function Mx({ className: n, children: i, value: o, ...r }) {
  const { active: l } = v.useContext(df);
  return Ve(), /* @__PURE__ */ x.jsxs(y6, { ...r, value: o, "data-value": o, className: [En.trigger, n].filter(Boolean).join(" "), children: [
    l === o && /* @__PURE__ */ x.jsx(xt.span, { className: En.selection, layoutId: "selection", layoutDependency: l, transition: { duration: 0 }, "aria-hidden": "true" }),
    /* @__PURE__ */ x.jsx("span", { className: En.triggerLabel, children: i })
  ] });
}
const N6 = {
  enter: { opacity: 0, x: 0 },
  center: { opacity: 1, x: 0, transition: { duration: ct.duration.instant } },
  exit: { opacity: 0, x: 0, transition: { duration: 0.1 } }
};
function Nx({ className: n, value: i, forceMount: o, children: r, ...l }) {
  const { active: f, direction: d, panelHeightRef: h, leavingRectRef: m } = v.useContext(df), g = Ve(), y = v.useRef(null), p = f === i, S = [En.content, n].filter(Boolean).join(" ");
  return v.useLayoutEffect(() => {
    const T = y.current;
    if (!T || o) return;
    if (!p) {
      const R = m.current, O = T.getBoundingClientRect();
      R && (T.style.translate = `${R.left - O.left}px ${R.top - O.top}px`), T.inert = !0;
      return;
    }
    T.style.translate = "", T.inert = !1, h.current;
    const E = T.offsetHeight, w = () => {
      T.style.height = "", T.style.overflow = "";
    };
    h.current = E;
    const _ = new ResizeObserver(() => {
      h.current = T.offsetHeight;
    });
    return _.observe(T), () => {
      _.disconnect(), w();
    };
  }, [p, g, o, h, m]), o ? /* @__PURE__ */ x.jsx(Dx, { ...l, value: i, forceMount: !0, className: S, children: r }) : /* @__PURE__ */ x.jsx(ie, { initial: !1, mode: "popLayout", custom: d, children: p && /* @__PURE__ */ v.createElement(Dx, { ...l, key: i, value: i, forceMount: !0, asChild: !0 }, /* @__PURE__ */ x.jsx(xt.div, { ref: y, className: S, custom: d, variants: N6, initial: "enter", animate: "center", exit: "exit", children: r })) });
}
const j6 = "_button_1ipz1_3", z6 = "_labelSlot_1ipz1_17", L6 = "_labelContent_1ipz1_21", V6 = "_labelPhase_1ipz1_23", B6 = "_primary_1ipz1_27", P6 = "_secondary_1ipz1_29", U6 = "_ghost_1ipz1_31", H6 = "_danger_1ipz1_33", I6 = "_sm_1ipz1_63", q6 = "_md_1ipz1_65", G6 = "_lg_1ipz1_67", Y6 = "_loader_1ipz1_69", k6 = "_spinner_1ipz1_71", F6 = "_spin_1ipz1_71", X6 = "_loadingLabel_1ipz1_73", Fi = {
  button: j6,
  labelSlot: z6,
  labelContent: L6,
  labelPhase: V6,
  primary: B6,
  secondary: P6,
  ghost: U6,
  danger: H6,
  sm: I6,
  md: q6,
  lg: G6,
  loader: Y6,
  spinner: k6,
  spin: F6,
  loadingLabel: X6
}, $6 = {
  pressed: (n) => {
    const i = n.current?.offsetWidth ?? 0;
    return { scale: i > 220 ? 0.985 : i && i <= 48 ? 0.96 : 0.97, transition: { duration: ct.duration.instant, ease: [...ct.ease.standard] } };
  }
}, zw = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }, K6 = { opacity: 0, y: 4, filter: `blur(${ct.blur.soft}px)` }, Z6 = { opacity: 0, y: -3, filter: `blur(${ct.blur.soft}px)`, transition: { duration: ct.duration.fast, ease: [...ct.ease.standard] } }, Q6 = { opacity: 0, scale: 0.6, filter: `blur(${ct.blur.subtle}px)` }, J6 = { opacity: 0, scale: 0.6, filter: `blur(${ct.blur.subtle}px)`, transition: { duration: ct.duration.fast, ease: [...ct.ease.standard] } }, W6 = { ...zw, opacity: 0 }, Lw = { opacity: 0, transition: { duration: ct.duration.instant } }, tP = { ...ct.spring.snappy, opacity: { duration: ct.duration.fast, ease: [...ct.ease.enter] }, filter: { duration: ct.duration.fast, ease: [...ct.ease.enter] } };
function gp(n) {
  if (n == null || typeof n == "boolean") return "";
  if (typeof n == "string" || typeof n == "number" || typeof n == "bigint") return String(n);
  if (Array.isArray(n)) return n.map(gp).join("");
  if (!v.isValidElement(n)) return "";
  const i = n.type;
  return `<${typeof i == "string" ? i : i?.displayName ?? i?.name ?? ""}>${gp(n.props.children)}`;
}
function eP(n, i, o) {
  const r = Ji("auto"), l = v.useRef(i), f = v.useRef(0);
  return v.useLayoutEffect(() => {
    l.current !== i && (l.current = i, f.current = performance.now() + 700);
  }, [i]), v.useEffect(() => {
    const d = n.current, h = d?.parentElement;
    if (!d || !h || typeof ResizeObserver > "u") return;
    let m = !1;
    const g = new ResizeObserver(([y]) => {
      if (!y) return;
      const p = y.contentRect.width;
      if (!p || !m || o || performance.now() > f.current) {
        m = p > 0, r.jump(p || "auto"), delete h.dataset.morphing;
        return;
      }
      h.dataset.morphing = "", Hs(r, p, { ...ct.spring.morph, onComplete: () => {
        delete h.dataset.morphing;
      } });
    });
    return g.observe(d), () => g.disconnect();
  }, [n, o, r]), r;
}
function nP({ children: n, icon: i, reduced: o, ref: r }) {
  const l = $p();
  return /* @__PURE__ */ x.jsx(xt.span, { ref: r, className: Fi.labelPhase, "aria-hidden": l ? void 0 : !0, initial: o ? W6 : i ? Q6 : K6, animate: zw, exit: o ? Lw : i ? J6 : Z6, transition: o ? { duration: ct.duration.instant } : i ? tP : { duration: ct.duration.standard, ease: [...ct.ease.enter] }, children: n });
}
const Vw = v.forwardRef(function({ className: i, variant: o = "primary", size: r = "md", loading: l = !1, disabled: f, children: d, onClick: h, ...m }, g) {
  const y = Ve(), p = v.useRef(null), S = v.useRef(null), T = gp(d), E = eP(S, T, y), w = v.useCallback((O) => {
    p.current = O, typeof g == "function" ? g(O) : g && (g.current = O);
  }, [g]), _ = m["aria-haspopup"];
  _ !== void 0 && _ !== !1 && _ !== "false" || m.role === "combobox" || m["data-state"], f || l || m["aria-disabled"] === !0 || m["aria-disabled"];
  const R = [Fi.button, Fi[o], Fi[r], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ x.jsxs(
    xt.button,
    {
      ref: w,
      tabIndex: m.tabIndex ?? 0,
      className: R,
      disabled: f,
      "aria-busy": l || void 0,
      custom: p,
      variants: $6,
      whileTap: void 0,
      transition: ct.spring.snappy,
      ...m,
      "aria-disabled": l || m["aria-disabled"] || void 0,
      onClick: l ? (O) => O.preventDefault() : h,
      children: [
        /* @__PURE__ */ x.jsx(ie, { initial: !1, children: l ? /* @__PURE__ */ x.jsx(xt.span, { className: Fi.loader, "aria-hidden": "true", initial: { opacity: 0 }, animate: { opacity: 1, scale: 1 }, exit: Lw, transition: { duration: ct.duration.instant }, children: /* @__PURE__ */ x.jsx("span", { className: Fi.spinner }) }, "loader") : null }),
        /* @__PURE__ */ x.jsx(xt.span, { className: [Fi.labelSlot, l ? Fi.loadingLabel : ""].filter(Boolean).join(" "), style: { width: E }, children: /* @__PURE__ */ x.jsx("span", { ref: S, className: Fi.labelContent, children: /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ x.jsx(nP, { icon: !/\S/.test(T.replace(/<[^>]*>/g, "")), reduced: y, children: d }, T) }) }) })
      ]
    }
  );
});
Vw.displayName = "Button";
const iP = "_root_1nwo4_1", aP = "_icon_1nwo4_3", oP = "_glyph_1nwo4_5", sP = "_frame_1nwo4_7", rP = "_copy_1nwo4_9", lP = "_line_1nwo4_17", uP = "_action_1nwo4_19", Ma = {
  root: iP,
  icon: aP,
  glyph: oP,
  frame: sP,
  copy: rP,
  line: lP,
  action: uP
}, jx = { opacity: 1, y: "0em", scale: 1, filter: "blur(0px)" }, zx = { opacity: 0, transition: { duration: ct.duration.instant } };
function Em(n) {
  const i = $p();
  return /* @__PURE__ */ x.jsx(xt.span, { ...n, "aria-hidden": i ? n["aria-hidden"] : !0 });
}
function cP(n) {
  if (!v.isValidElement(n)) return "icon";
  const i = n.type;
  return typeof i == "string" ? i : i.displayName ?? i.name ?? "icon";
}
function fP({ reduce: n, morphKey: i, children: o }) {
  const r = v.useRef(null), l = v.useRef(null), f = Ji("auto"), d = v.useRef(0);
  return v.useLayoutEffect(() => {
    d.current = performance.now();
  }, [i]), v.useEffect(() => {
    const h = l.current;
    if (!h || typeof ResizeObserver > "u") return;
    let m, g;
    const y = () => {
      f.jump("auto"), r.current && Object.assign(r.current.style, { overflow: "", height: "auto" });
    }, p = new ResizeObserver(([S]) => {
      if (!S) return;
      const T = S.borderBoxSize?.[0]?.blockSize ?? h.offsetHeight, E = f.get(), w = typeof E == "number" ? E : m;
      if (m = T, g?.stop(), n || w === void 0 || w === T || performance.now() - d.current > 120) return y();
      r.current && Object.assign(r.current.style, { overflow: "hidden", height: `${w}px` }), g = Hs(f, [w, T], { ...ct.spring.smooth, onComplete: y });
    });
    return p.observe(h), () => {
      p.disconnect(), g?.stop();
    };
  }, [f, n]), /* @__PURE__ */ x.jsx(xt.div, { ref: r, className: Ma.frame, style: { height: f }, children: /* @__PURE__ */ x.jsx("div", { ref: l, className: Ma.copy, children: o }) });
}
function dP({ title: n, description: i, action: o, icon: r, className: l, label: f }) {
  const d = Ve(), h = r ?? /* @__PURE__ */ x.jsx($3, { width: 24, height: 24, strokeWidth: 1.5 }), m = { duration: ct.duration.instant }, g = { initial: { opacity: 0 }, animate: jx, exit: zx, transition: m };
  return /* @__PURE__ */ x.jsxs("section", { className: [Ma.root, l].filter(Boolean).join(" "), "aria-label": f, children: [
    /* @__PURE__ */ x.jsx("div", { className: Ma.icon, "aria-hidden": "true", children: /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ x.jsx(Em, { className: Ma.glyph, initial: { opacity: 0 }, animate: jx, exit: zx, transition: m, children: h }, cP(h)) }) }),
    /* @__PURE__ */ x.jsxs(fP, { reduce: d, morphKey: `${n}
${i}`, children: [
      /* @__PURE__ */ x.jsx("h3", { children: /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ x.jsx(Em, { className: Ma.line, ...g, children: n }, n) }) }),
      /* @__PURE__ */ x.jsx("p", { children: /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ x.jsx(Em, { className: Ma.line, ...g, children: i }, i) }) })
    ] }),
    o && /* @__PURE__ */ x.jsx("div", { className: Ma.action, children: o })
  ] });
}
var hP = Object.defineProperty, Re = (n, i) => hP(n, "name", { value: i, configurable: !0 }), [Lg, WP] = /* @__PURE__ */ ii("Tooltip", [
  rf
]), Vg = rf(), mP = "TooltipProvider", pP = 700, yp = "tooltip.open", [gP, Bg] = Lg(mP), yP = /* @__PURE__ */ Re((n) => {
  const {
    __scopeTooltip: i,
    delayDuration: o = pP,
    skipDelayDuration: r = 300,
    disableHoverableContent: l = !1,
    children: f
  } = n, d = v.useRef(!0), h = v.useRef(!1), m = v.useRef(0);
  return v.useEffect(() => {
    const g = m.current;
    return () => window.clearTimeout(g);
  }, []), /* @__PURE__ */ x.jsx(
    gP,
    {
      scope: i,
      isOpenDelayedRef: d,
      delayDuration: o,
      onOpen: v.useCallback(() => {
        r <= 0 || (window.clearTimeout(m.current), d.current = !1);
      }, [r]),
      onClose: v.useCallback(() => {
        r <= 0 || (window.clearTimeout(m.current), m.current = window.setTimeout(
          () => d.current = !0,
          r
        ));
      }, [r]),
      isPointerInTransitRef: h,
      onPointerInTransitChange: v.useCallback((g) => {
        h.current = g;
      }, []),
      disableHoverableContent: l,
      children: f
    }
  );
}, "TooltipProvider"), vp = "Tooltip", [vP, wl] = Lg(vp), bP = /* @__PURE__ */ Re((n) => {
  const {
    __scopeTooltip: i,
    children: o,
    open: r,
    defaultOpen: l,
    onOpenChange: f,
    disableHoverableContent: d,
    delayDuration: h
  } = n, m = Bg(vp, n.__scopeTooltip), g = Vg(i), [y, p] = v.useState(null), [S, T] = v.useState(void 0), E = ei(), w = v.useRef(0), _ = d ?? m.disableHoverableContent, R = h ?? m.delayDuration, O = v.useRef(!1), [A, D] = wi({
    prop: r,
    defaultProp: l ?? !1,
    onChange: /* @__PURE__ */ Re((Z) => {
      Z ? (m.onOpen(), document.dispatchEvent(new CustomEvent(yp))) : m.onClose(), f?.(Z);
    }, "onChange"),
    caller: vp
  }), U = v.useMemo(() => A ? O.current ? "delayed-open" : "instant-open" : "closed", [A]), z = v.useCallback(() => {
    window.clearTimeout(w.current), w.current = 0, O.current = !1, D(!0);
  }, [D]), V = v.useCallback(() => {
    window.clearTimeout(w.current), w.current = 0, D(!1);
  }, [D]), I = v.useCallback(() => {
    window.clearTimeout(w.current), w.current = window.setTimeout(() => {
      O.current = !0, D(!0), w.current = 0;
    }, R);
  }, [R, D]);
  v.useEffect(() => () => {
    w.current && (window.clearTimeout(w.current), w.current = 0);
  }, []);
  const F = S ?? E;
  return /* @__PURE__ */ x.jsx(WC, { ...g, children: /* @__PURE__ */ x.jsx(
    vP,
    {
      scope: i,
      contentId: F,
      setContentId: T,
      open: A,
      stateAttribute: U,
      trigger: y,
      onTriggerChange: p,
      onTriggerEnter: v.useCallback(() => {
        m.isOpenDelayedRef.current ? I() : z();
      }, [m.isOpenDelayedRef, I, z]),
      onTriggerLeave: v.useCallback(() => {
        _ ? V() : (window.clearTimeout(w.current), w.current = 0);
      }, [V, _]),
      onOpen: z,
      onClose: V,
      disableHoverableContent: _,
      children: o
    }
  ) });
}, "Tooltip"), Lx = "TooltipTrigger", SP = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Re(function(i, o) {
    const { __scopeTooltip: r, "aria-describedby": l, ...f } = i, d = wl(Lx, r), h = Bg(Lx, r), m = Vg(r), g = v.useRef(null), y = Jt(o, g, d.onTriggerChange), p = v.useRef(!1), S = v.useRef(!1), T = v.useCallback(() => p.current = !1, []);
    return v.useEffect(() => () => document.removeEventListener("pointerup", T), [T]), /* @__PURE__ */ x.jsx(tw, { asChild: !0, ...m, children: /* @__PURE__ */ x.jsx(
      qt.button,
      {
        "aria-describedby": d.open ? kw(l, d.contentId) : l,
        "data-state": d.stateAttribute,
        ...f,
        ref: y,
        onPointerMove: At(i.onPointerMove, (E) => {
          E.pointerType !== "touch" && !S.current && !h.isPointerInTransitRef.current && (d.onTriggerEnter(), S.current = !0);
        }),
        onPointerLeave: At(i.onPointerLeave, () => {
          d.onTriggerLeave(), S.current = !1;
        }),
        onPointerDown: At(i.onPointerDown, () => {
          d.open && d.onClose(), p.current = !0, document.addEventListener("pointerup", T, { once: !0 });
        }),
        onFocus: At(i.onFocus, () => {
          p.current || d.onOpen();
        }),
        onBlur: At(i.onBlur, d.onClose),
        onClick: At(i.onClick, d.onClose)
      }
    ) });
  }, "TooltipTrigger")
), Bw = "TooltipPortal", [xP, TP] = Lg(Bw, {
  forceMount: void 0
}), EP = /* @__PURE__ */ Re((n) => {
  const { __scopeTooltip: i, forceMount: o, children: r, container: l } = n, f = wl(Bw, i);
  return /* @__PURE__ */ x.jsx(xP, { scope: i, forceMount: o, children: /* @__PURE__ */ x.jsx(Ha, { present: o || f.open, children: /* @__PURE__ */ x.jsx(dg, { asChild: !0, container: l, children: r }) }) });
}, "TooltipPortal"), hl = "TooltipContent", CP = /* @__PURE__ */ v.forwardRef(
  /* @__PURE__ */ Re(function(i, o) {
    const r = TP(hl, i.__scopeTooltip), { forceMount: l = r.forceMount, side: f = "top", ...d } = i, h = wl(hl, i.__scopeTooltip);
    return /* @__PURE__ */ x.jsx(Ha, { present: l || h.open, children: h.disableHoverableContent ? /* @__PURE__ */ x.jsx(Pw, { side: f, ...d, ref: o }) : /* @__PURE__ */ x.jsx(wP, { side: f, ...d, ref: o }) });
  }, "TooltipContent")
), wP = /* @__PURE__ */ v.forwardRef(/* @__PURE__ */ Re(function(i, o) {
  const r = wl(hl, i.__scopeTooltip), l = Bg(hl, i.__scopeTooltip), f = v.useRef(null), d = Jt(o, f), [h, m] = v.useState(null), { trigger: g, onClose: y } = r, p = f.current, { onPointerInTransitChange: S } = l, T = v.useCallback(() => {
    m(null), S(!1);
  }, [S]), E = v.useCallback(
    (w, _) => {
      const R = w.currentTarget, O = { x: w.clientX, y: w.clientY }, A = Uw(O, R.getBoundingClientRect()), D = Hw(O, A), U = Iw(_.getBoundingClientRect()), z = Gw([...D, ...U]);
      m(z), S(!0);
    },
    [S]
  );
  return v.useEffect(() => () => T(), [T]), v.useEffect(() => {
    if (g && p) {
      const w = /* @__PURE__ */ Re((R) => E(R, p), "handleTriggerLeave"), _ = /* @__PURE__ */ Re((R) => E(R, g), "handleContentLeave");
      return g.addEventListener("pointerleave", w), p.addEventListener("pointerleave", _), () => {
        g.removeEventListener("pointerleave", w), p.removeEventListener("pointerleave", _);
      };
    }
  }, [g, p, E, T]), v.useEffect(() => {
    if (h) {
      const w = /* @__PURE__ */ Re((_) => {
        const R = _.target, O = { x: _.clientX, y: _.clientY }, A = g?.contains(R) || p?.contains(R), D = !qw(O, h);
        A ? T() : D && (T(), y());
      }, "handleTrackPointerGrace");
      return document.addEventListener("pointermove", w), () => document.removeEventListener("pointermove", w);
    }
  }, [g, p, h, y, T]), /* @__PURE__ */ x.jsx(Pw, { ...i, ref: d });
}, "TooltipContentHoverable")), _P = /* @__PURE__ */ LE("TooltipContent"), Pw = /* @__PURE__ */ v.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Re(function(i, o) {
    const {
      __scopeTooltip: r,
      children: l,
      "aria-label": f,
      id: d,
      onEscapeKeyDown: h,
      onPointerDownOutside: m,
      ...g
    } = i, y = wl(hl, r), p = Vg(r), { onClose: S } = y;
    v.useEffect(() => (document.addEventListener(yp, S), () => document.removeEventListener(yp, S)), [S]), v.useEffect(() => {
      if (y.trigger) {
        const E = /* @__PURE__ */ Re((w) => {
          w.target instanceof Node && w.target.contains(y.trigger) && S();
        }, "handleScroll");
        return window.addEventListener("scroll", E, { capture: !0 }), () => window.removeEventListener("scroll", E, { capture: !0 });
      }
    }, [y.trigger, S]);
    const { setContentId: T } = y;
    return ue(() => (T(d), () => {
      T(void 0);
    }), [d, T]), /* @__PURE__ */ x.jsx(
      ug,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: h,
        onPointerDownOutside: m,
        onFocusOutside: (E) => E.preventDefault(),
        onDismiss: S,
        children: /* @__PURE__ */ x.jsxs(
          nw,
          {
            "data-state": y.stateAttribute,
            role: f ? void 0 : "tooltip",
            id: f ? void 0 : y.contentId,
            ...p,
            ...g,
            ref: o,
            style: {
              ...g.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ x.jsx(_P, { children: l }),
              f ? /* @__PURE__ */ x.jsx(K4, { id: y.contentId, role: "tooltip", children: f }) : null
            ]
          }
        )
      }
    );
  }, "TooltipContentImpl")
);
function Uw(n, i) {
  const o = Math.abs(i.top - n.y), r = Math.abs(i.bottom - n.y), l = Math.abs(i.right - n.x), f = Math.abs(i.left - n.x);
  switch (Math.min(o, r, l, f)) {
    case f:
      return "left";
    case l:
      return "right";
    case o:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
Re(Uw, "getExitSideFromRect");
function Hw(n, i, o = 5) {
  const r = [];
  switch (i) {
    case "top":
      r.push(
        { x: n.x - o, y: n.y + o },
        { x: n.x + o, y: n.y + o }
      );
      break;
    case "bottom":
      r.push(
        { x: n.x - o, y: n.y - o },
        { x: n.x + o, y: n.y - o }
      );
      break;
    case "left":
      r.push(
        { x: n.x + o, y: n.y - o },
        { x: n.x + o, y: n.y + o }
      );
      break;
    case "right":
      r.push(
        { x: n.x - o, y: n.y - o },
        { x: n.x - o, y: n.y + o }
      );
      break;
  }
  return r;
}
Re(Hw, "getPaddedExitPoints");
function Iw(n) {
  const { top: i, right: o, bottom: r, left: l } = n;
  return [
    { x: l, y: i },
    { x: o, y: i },
    { x: o, y: r },
    { x: l, y: r }
  ];
}
Re(Iw, "getPointsFromRect");
function qw(n, i) {
  const { x: o, y: r } = n;
  let l = !1;
  for (let f = 0, d = i.length - 1; f < i.length; d = f++) {
    const h = i[f], m = i[d], g = h.x, y = h.y, p = m.x, S = m.y;
    y > r != S > r && o < (p - g) * (r - y) / (S - y) + g && (l = !l);
  }
  return l;
}
Re(qw, "isPointInPolygon");
function Gw(n) {
  const i = n.slice();
  return i.sort((o, r) => o.x < r.x ? -1 : o.x > r.x ? 1 : o.y < r.y ? -1 : o.y > r.y ? 1 : 0), Yw(i);
}
Re(Gw, "getHull");
function Yw(n) {
  if (n.length <= 1) return n.slice();
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const l = n[r];
    for (; i.length >= 2; ) {
      const f = i[i.length - 1], d = i[i.length - 2];
      if ((f.x - d.x) * (l.y - d.y) >= (f.y - d.y) * (l.x - d.x)) i.pop();
      else break;
    }
    i.push(l);
  }
  i.pop();
  const o = [];
  for (let r = n.length - 1; r >= 0; r--) {
    const l = n[r];
    for (; o.length >= 2; ) {
      const f = o[o.length - 1], d = o[o.length - 2];
      if ((f.x - d.x) * (l.y - d.y) >= (f.y - d.y) * (l.x - d.x)) o.pop();
      else break;
    }
    o.push(l);
  }
  return o.pop(), i.length === 1 && o.length === 1 && i[0].x === o[0].x && i[0].y === o[0].y ? i : i.concat(o);
}
Re(Yw, "getHullPresorted");
function kw(...n) {
  const i = /* @__PURE__ */ new Set();
  for (const o of n)
    if (typeof o == "string")
      for (const r of String(o).trim().split(/\s+/))
        r && i.add(r);
  return i.size > 0 ? Array.from(i).join(" ") : void 0;
}
Re(kw, "concatAriaDescribedby");
const AP = "_tooltip_wbyc8_1", RP = "_text_wbyc8_23", OP = "_measure_wbyc8_25", DP = "_line_wbyc8_27", Rc = {
  tooltip: AP,
  text: RP,
  measure: OP,
  line: DP
}, Vx = 250, MP = 300;
let Cm = !1, dc = 0, wm = 0;
const _m = /* @__PURE__ */ new Set(), xo = {
  subscribe(n) {
    return _m.add(n), () => {
      _m.delete(n);
    };
  },
  get: () => Cm,
  set(n) {
    Cm !== n && (Cm = n, _m.forEach((i) => i()));
  },
  opened() {
    dc += 1, window.clearTimeout(wm), xo.set(!0);
  },
  closed() {
    dc = Math.max(0, dc - 1), !dc && (window.clearTimeout(wm), wm = window.setTimeout(() => xo.set(!1), MP));
  }
};
function NP({ text: n }) {
  Ve();
  const i = v.useRef(null), o = v.useRef(null), [r, l] = v.useState(null);
  return v.useLayoutEffect(() => {
    const f = i.current;
    if (!f) return;
    const d = new ResizeObserver(([h]) => {
      if (!h) return;
      const m = h.borderBoxSize?.[0], g = f.textContent, y = o.current !== null && o.current !== g;
      o.current = g, l({ width: Math.ceil(m?.inlineSize ?? f.offsetWidth), height: Math.ceil(m?.blockSize ?? f.offsetHeight), animate: y });
    });
    return d.observe(f), () => d.disconnect();
  }, []), /* @__PURE__ */ x.jsxs(xt.span, { className: Rc.text, initial: !1, animate: r ? { width: r.width, height: r.height } : void 0, transition: (r?.animate, { duration: 0 }), children: [
    /* @__PURE__ */ x.jsx("span", { ref: i, className: Rc.measure, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ x.jsx(ie, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ x.jsx(xt.span, { className: Rc.line, initial: !1, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: { opacity: 0, transition: { duration: 0 } }, transition: { duration: ct.duration.standard, ease: [...ct.ease.enter] }, children: n }, n) })
  ] });
}
function jP({ content: n, children: i, side: o = "top" }) {
  const r = v.useSyncExternalStore(xo.subscribe, xo.get, () => !1), [l, f] = v.useState(!1), [d, h] = v.useState(!1);
  return v.useEffect(() => {
    if (l)
      return xo.opened(), xo.closed;
  }, [l]), /* @__PURE__ */ x.jsx(yP, { delayDuration: Vx, skipDelayDuration: 0, children: /* @__PURE__ */ x.jsxs(bP, { open: l, delayDuration: r ? 0 : Vx, onOpenChange: (m) => {
    m && h(xo.get()), f(m);
  }, children: [
    /* @__PURE__ */ x.jsx(SP, { asChild: !0, children: i }),
    /* @__PURE__ */ x.jsx(EP, { children: /* @__PURE__ */ x.jsx(CP, { className: `ms-island ${Rc.tooltip}`, "data-instant": d || void 0, side: o, sideOffset: 8, collisionPadding: 12, children: typeof n == "string" || typeof n == "number" ? /* @__PURE__ */ x.jsx(NP, { text: String(n) }) : n }) })
  ] }) });
}
function zP({ children: n }) {
  const i = Jp();
  return /* @__PURE__ */ x.jsx(YM, { reducedMotion: "always", transition: { duration: i ? 0 : 0.15 }, children: n });
}
function ai(n, i) {
  FR.createRoot(n).render(/* @__PURE__ */ x.jsx(zP, { children: i }));
}
function na(n, i = "div") {
  const o = document.createElement(i);
  return o.className = "ms-island", n.after(o), o;
}
function Pg(n) {
  n.dispatchEvent(new Event("input", { bubbles: !0 })), n.dispatchEvent(new Event("change", { bubbles: !0 }));
}
function Ug(n) {
  n.classList.add("ms-native"), n.setAttribute("aria-hidden", "true"), n.tabIndex = -1;
}
function Hg(n, i) {
  const o = (r) => {
    r.preventDefault(), i.current?.querySelector("input,button")?.focus();
  };
  return n.addEventListener("invalid", o), () => n.removeEventListener("invalid", o);
}
function LP({ input: n }) {
  const [i, o] = v.useState(n.value), r = v.useRef(null);
  return v.useEffect(() => (Ug(n), Hg(n, r)), []), /* @__PURE__ */ x.jsx("div", { ref: r, children: /* @__PURE__ */ x.jsx(Dj, { value: i, label: "Six-digit verification code", inputMode: "numeric", onChange: (l) => {
    o(l), n.value = l, Pg(n);
  } }) });
}
document.querySelectorAll("[data-otp-input]").forEach((n) => {
  const i = na(n);
  ai(i, /* @__PURE__ */ x.jsx(LP, { input: n })), n.labels?.[0]?.addEventListener("click", (o) => {
    o.preventDefault(), i.querySelector("input")?.focus();
  });
});
function VP({ select: n }) {
  const [i, o] = v.useState(n.value), r = v.useRef(null);
  v.useEffect(() => {
    Ug(n), n.parentElement?.querySelectorAll(".choice-trigger,.choice-options").forEach((h) => h.remove());
    const f = () => o(n.value);
    n.addEventListener("change", f);
    const d = Hg(n, r);
    return () => {
      d(), n.removeEventListener("change", f);
    };
  }, []);
  const l = n.labels?.[0]?.textContent || n.getAttribute("aria-label") || "Choose an option";
  return /* @__PURE__ */ x.jsx("div", { ref: r, className: "ms-choice", children: /* @__PURE__ */ x.jsx(GV, { label: l, id: n.id + "-arc", value: i || "__empty__", disabled: n.disabled, options: Array.from(n.options).map((f) => ({ value: f.value || "__empty__", label: f.text, disabled: f.disabled })), onValueChange: (f) => {
    n.value = f === "__empty__" ? "" : f, o(n.value), Pg(n);
  } }) });
}
document.querySelectorAll(".app-main select:not([multiple])").forEach((n) => {
  const i = na(n);
  i.classList.add("ms-select-island"), ai(i, /* @__PURE__ */ x.jsx(VP, { select: n })), n.labels?.[0]?.addEventListener("click", (o) => {
    o.preventDefault(), i.querySelector("button")?.focus();
  });
});
function BP({ details: n }) {
  const i = n.querySelector("summary"), o = v.useRef(null);
  return v.useEffect(() => {
    Array.from(n.children).filter((r) => r !== i).forEach((r) => o.current?.append(r)), n.hidden = !0;
  }, []), /* @__PURE__ */ x.jsx(cz, { defaultOpen: n.open ? 0 : -1, items: [{ title: i.textContent || "Details", content: /* @__PURE__ */ x.jsx("div", { ref: o }) }] });
}
document.querySelectorAll("details[data-enhance-disclosure]").forEach((n) => {
  const i = na(n, "section");
  i.classList.add("workspace-panel"), ai(i, /* @__PURE__ */ x.jsx(BP, { details: n }));
});
function PP({ input: n, box: i }) {
  const o = v.useRef(null);
  v.useEffect(() => (Ug(n), i.classList.add("ms-upload-enhanced"), Hg(n, o)), []);
  const r = n.labels?.[0]?.textContent?.trim() || "Choose a file";
  return /* @__PURE__ */ x.jsx("div", { ref: o, children: /* @__PURE__ */ x.jsx(Z5, { multiple: n.multiple, maxFiles: n.multiple ? 5 : 1, accept: n.accept || void 0, label: r, description: "Choose or drop a file. Choose again to replace it.", maxSize: n.hasAttribute("data-card-photo") ? 5 * 1024 * 1024 : void 0, note: n.dataset.uploadNote || "Files are saved only when you submit this form.", onFilesChange: (l) => {
    const f = new DataTransfer();
    l.forEach((d) => f.items.add(d)), n.files = f.files, Pg(n);
  } }) });
}
document.querySelectorAll(".app-form input[type=file], [data-collaboration-form] input[type=file], [data-card-options] input[type=file]").forEach((n) => {
  if (n.closest("[data-image-upload]")) return;
  const i = n.closest(".image-picker"), o = na(i || n);
  ai(o, /* @__PURE__ */ x.jsx(PP, { input: n, box: i || n }));
});
function UP() {
  const n = v.useRef(null), [i, o] = v.useState(""), [r, l] = v.useState(null), [f, d] = v.useState(!1);
  return v.useEffect(() => {
    const h = (m) => {
      const g = m.target, y = g.closest("[data-collab-preview]"), p = g.closest("[data-expand-image]");
      if (!y && !p) return;
      const S = p?.querySelector("img");
      p && !S || (m.preventDefault(), m.stopImmediatePropagation(), n.current = y || p, d(!1), y ? (l(null), o(y.href + (y.href.includes("?") ? "&" : "?") + "dialog=1")) : (o(""), l({ src: S.src, alt: S.alt || "Enlarged submitted image" })));
    };
    return document.addEventListener("click", h, !0), () => document.removeEventListener("click", h, !0);
  }, []), /* @__PURE__ */ x.jsx(OL, { open: !!i || !!r, onOpenChange: (h) => {
    h || (o(""), l(null));
  }, children: /* @__PURE__ */ x.jsxs(DL, { title: r ? "Enlarged submitted image" : "Preview essay / art", description: r ? "Review the submitted image." : "This work belongs to its creator. Do not copy, reuse or publish it without permission.", className: "ms-island ms-preview " + (f ? "ms-expanded" : ""), onCloseAutoFocus: (h) => {
    h.preventDefault(), n.current?.focus();
  }, children: [
    /* @__PURE__ */ x.jsx("button", { type: "button", className: "ms-button", onClick: () => d(!f), children: f ? "Reduce" : "Expand" }),
    i && /* @__PURE__ */ x.jsx("iframe", { title: "Collaboration work preview", src: i }),
    " ",
    r && /* @__PURE__ */ x.jsx("img", { className: "ms-review-image", src: r.src, alt: r.alt })
  ] }) });
}
if (document.querySelector("[data-collab-preview],[data-expand-image]")) {
  const n = document.createElement("div");
  document.body.append(n), ai(n, /* @__PURE__ */ x.jsx(UP, {}));
}
document.querySelectorAll("[data-copy-component]").forEach((n) => {
  const i = n.closest("details")?.querySelector("pre");
  if (!i) return;
  const o = na(n);
  ai(o, /* @__PURE__ */ x.jsx(Sw, { value: i.textContent || "", label: "Copy code" })), n.hidden = !0;
});
document.querySelectorAll(".design-component pre").forEach((n) => {
  const i = na(n);
  ai(i, /* @__PURE__ */ x.jsx(Tw, { code: n.textContent || "", language: "html", maxLines: 12 })), n.hidden = !0, n.closest("details")?.querySelectorAll("[data-copy-component], [data-copy-component]+.ms-island").forEach((o) => o.hidden = !0);
});
function HP({ original: n }) {
  const [i, o] = v.useState(!1);
  return v.useEffect(() => {
    const r = n.form;
    if (!r) return;
    const l = (d) => {
      d.submitter === n && queueMicrotask(() => {
        d.defaultPrevented || o(!0);
      });
    }, f = () => o(!1);
    return r.addEventListener("submit", l), window.addEventListener("pageshow", f), () => {
      r.removeEventListener("submit", l), window.removeEventListener("pageshow", f);
    };
  }, []), /* @__PURE__ */ x.jsx(Vw, { type: "button", className: n.className + " ms-submit", variant: n.classList.contains("app-outline") ? "secondary" : "primary", loading: i, disabled: n.disabled || i, onClick: () => n.form?.requestSubmit(n), children: /* @__PURE__ */ x.jsx("span", { dangerouslySetInnerHTML: { __html: n.innerHTML } }) });
}
document.querySelectorAll(".app-form button.app-button:not([type=button]):not([name]), .recovery-panel form button.app-button:not([type=button]):not([name])").forEach((n) => {
  const i = na(n, "span");
  ai(i, /* @__PURE__ */ x.jsx(HP, { original: n })), n.hidden = !0;
});
function IP({ empty: n }) {
  const i = v.useRef(null);
  return v.useEffect(() => {
    n.querySelectorAll("a,button").forEach((o) => i.current?.append(o)), n.hidden = !0;
  }, []), /* @__PURE__ */ x.jsx(dP, { title: n.querySelector("h2,h3")?.textContent || "Nothing here yet.", description: n.querySelector("p")?.textContent || n.textContent || "", label: "Empty collection", action: /* @__PURE__ */ x.jsx("div", { ref: i }) });
}
document.querySelectorAll("[data-arc-empty]").forEach((n) => {
  const i = na(n);
  ai(i, /* @__PURE__ */ x.jsx(IP, { empty: n }));
});
function qP({ button: n }) {
  const i = v.useRef(null);
  return v.useEffect(() => {
    i.current?.append(n);
  }, []), /* @__PURE__ */ x.jsx(jP, { content: n.getAttribute("aria-label") || n.title, children: /* @__PURE__ */ x.jsx("span", { ref: i, className: "ms-tooltip-anchor" }) });
}
document.querySelectorAll(".composer-toolbar button[aria-label],.member-card-tools button[aria-label]").forEach((n) => {
  const i = na(n, "span");
  ai(i, /* @__PURE__ */ x.jsx(qP, { button: n }));
});
function GP() {
  return /* @__PURE__ */ x.jsxs(D6, { defaultValue: "behaviour", children: [
    /* @__PURE__ */ x.jsxs(M6, { "aria-label": "Component documentation", children: [
      /* @__PURE__ */ x.jsx(Mx, { value: "behaviour", children: "Behaviour" }),
      /* @__PURE__ */ x.jsx(Mx, { value: "usage", children: "Usage" })
    ] }),
    /* @__PURE__ */ x.jsx(Nx, { value: "behaviour", children: /* @__PURE__ */ x.jsx("p", { children: "Native Django forms remain the source of truth. Enhanced controls retain validation, keyboard access and private-media permissions." }) }),
    /* @__PURE__ */ x.jsx(Nx, { value: "usage", children: /* @__PURE__ */ x.jsx(Tw, { code: `import { Dialog, DialogContent } from "./components/arc/dialog/dialog";
// Mount inside the MindState component skin; see frontend/README.md.`, language: "tsx" }) })
  ] });
}
document.querySelectorAll("[data-arc-examples]").forEach((n) => {
  n.classList.add("ms-island"), ai(n, /* @__PURE__ */ x.jsx(GP, {}));
});
