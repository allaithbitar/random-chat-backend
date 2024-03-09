var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  var Events = function() {
  };
  var EE = function(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  };
  var addListener = function(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  };
  var clearEvent = function(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events;
    else
      delete emitter._events[evt];
  };
  var EventEmitter = function() {
    this._events = new Events;
    this._eventsCount = 0;
  };
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l);i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS((exports, module) => {
  var decodeURIComponent2 = function(uri) {
    var percentPosition = uri.indexOf("%");
    if (percentPosition === -1)
      return uri;
    var length = uri.length;
    var decoded = "";
    var last = 0;
    var codepoint = 0;
    var startOfOctets = percentPosition;
    var state = UTF8_ACCEPT;
    while (percentPosition > -1 && percentPosition < length) {
      var high = hexCodeToInt(uri[percentPosition + 1], 4);
      var low = hexCodeToInt(uri[percentPosition + 2], 0);
      var byte = high | low;
      var type75 = UTF8_DATA[byte];
      state = UTF8_DATA[256 + state + type75];
      codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type75];
      if (state === UTF8_ACCEPT) {
        decoded += uri.slice(last, startOfOctets);
        decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023));
        codepoint = 0;
        last = percentPosition + 3;
        percentPosition = startOfOctets = uri.indexOf("%", last);
      } else if (state === UTF8_REJECT) {
        return null;
      } else {
        percentPosition += 3;
        if (percentPosition < length && uri.charCodeAt(percentPosition) === 37)
          continue;
        return null;
      }
    }
    return decoded + uri.slice(last);
  };
  var hexCodeToInt = function(c, shift) {
    var i = HEX[c];
    return i === undefined ? 255 : i << shift;
  };
  var UTF8_ACCEPT = 12;
  var UTF8_REJECT = 0;
  var UTF8_DATA = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  var HEX = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  module.exports = decodeURIComponent2;
});

// node_modules/fast-querystring/lib/parse.js
var require_parse = __commonJS((exports, module) => {
  var parse5 = function(input) {
    const result = new Empty;
    if (typeof input !== "string") {
      return result;
    }
    let inputLength = input.length;
    let key = "";
    let value11 = "";
    let startingIndex = -1;
    let equalityIndex = -1;
    let shouldDecodeKey = false;
    let shouldDecodeValue = false;
    let keyHasPlus = false;
    let valueHasPlus = false;
    let hasBothKeyValuePair = false;
    let c = 0;
    for (let i = 0;i < inputLength + 1; i++) {
      c = i !== inputLength ? input.charCodeAt(i) : 38;
      if (c === 38) {
        hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair) {
          equalityIndex = i;
        }
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (keyHasPlus) {
            key = key.replace(plusRegex, " ");
          }
          if (shouldDecodeKey) {
            key = fastDecode(key) || key;
          }
          if (hasBothKeyValuePair) {
            value11 = input.slice(equalityIndex + 1, i);
            if (valueHasPlus) {
              value11 = value11.replace(plusRegex, " ");
            }
            if (shouldDecodeValue) {
              value11 = fastDecode(value11) || value11;
            }
          }
          const currentValue = result[key];
          if (currentValue === undefined) {
            result[key] = value11;
          } else {
            if (currentValue.pop) {
              currentValue.push(value11);
            } else {
              result[key] = [currentValue, value11];
            }
          }
        }
        value11 = "";
        startingIndex = i;
        equalityIndex = i;
        shouldDecodeKey = false;
        shouldDecodeValue = false;
        keyHasPlus = false;
        valueHasPlus = false;
      } else if (c === 61) {
        if (equalityIndex <= startingIndex) {
          equalityIndex = i;
        } else {
          shouldDecodeValue = true;
        }
      } else if (c === 43) {
        if (equalityIndex > startingIndex) {
          valueHasPlus = true;
        } else {
          keyHasPlus = true;
        }
      } else if (c === 37) {
        if (equalityIndex > startingIndex) {
          shouldDecodeValue = true;
        } else {
          shouldDecodeKey = true;
        }
      }
    }
    return result;
  };
  var fastDecode = require_fast_decode_uri_component();
  var plusRegex = /\+/g;
  var Empty = function() {
  };
  Empty.prototype = Object.create(null);
  module.exports = parse5;
});

// node_modules/fast-querystring/lib/internals/querystring.js
var require_querystring = __commonJS((exports, module) => {
  var encodeString = function(str) {
    const len = str.length;
    if (len === 0)
      return "";
    let out = "";
    let lastPos = 0;
    let i = 0;
    outer:
      for (;i < len; i++) {
        let c = str.charCodeAt(i);
        while (c < 128) {
          if (noEscape[c] !== 1) {
            if (lastPos < i)
              out += str.slice(lastPos, i);
            lastPos = i + 1;
            out += hexTable[c];
          }
          if (++i === len)
            break outer;
          c = str.charCodeAt(i);
        }
        if (lastPos < i)
          out += str.slice(lastPos, i);
        if (c < 2048) {
          lastPos = i + 1;
          out += hexTable[192 | c >> 6] + hexTable[128 | c & 63];
          continue;
        }
        if (c < 55296 || c >= 57344) {
          lastPos = i + 1;
          out += hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          continue;
        }
        ++i;
        if (i >= len) {
          throw new Error("URI malformed");
        }
        const c2 = str.charCodeAt(i) & 1023;
        lastPos = i + 1;
        c = 65536 + ((c & 1023) << 10 | c2);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
    if (lastPos === 0)
      return str;
    if (lastPos < len)
      return out + str.slice(lastPos);
    return out;
  };
  var hexTable = Array.from({ length: 256 }, (_, i) => "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  var noEscape = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  module.exports = { encodeString };
});

// node_modules/fast-querystring/lib/stringify.js
var require_stringify = __commonJS((exports, module) => {
  var getAsPrimitive = function(value11) {
    const type75 = typeof value11;
    if (type75 === "string") {
      return encodeString(value11);
    } else if (type75 === "bigint") {
      return value11.toString();
    } else if (type75 === "boolean") {
      return value11 ? "true" : "false";
    } else if (type75 === "number" && Number.isFinite(value11)) {
      return value11 < 1000000000000000000000 ? "" + value11 : encodeString("" + value11);
    }
    return "";
  };
  var stringify = function(input) {
    let result = "";
    if (input === null || typeof input !== "object") {
      return result;
    }
    const separator = "&";
    const keys = Object.keys(input);
    const keyLength = keys.length;
    let valueLength = 0;
    for (let i = 0;i < keyLength; i++) {
      const key = keys[i];
      const value11 = input[key];
      const encodedKey = encodeString(key) + "=";
      if (i) {
        result += separator;
      }
      if (Array.isArray(value11)) {
        valueLength = value11.length;
        for (let j = 0;j < valueLength; j++) {
          if (j) {
            result += separator;
          }
          result += encodedKey;
          result += getAsPrimitive(value11[j]);
        }
      } else {
        result += encodedKey;
        result += getAsPrimitive(value11);
      }
    }
    return result;
  };
  var { encodeString } = require_querystring();
  module.exports = stringify;
});

// node_modules/fast-querystring/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var parse5 = require_parse();
  var stringify = require_stringify();
  var fastQuerystring = {
    parse: parse5,
    stringify
  };
  module.exports = fastQuerystring;
  module.exports.default = fastQuerystring;
  module.exports.parse = parse5;
  module.exports.stringify = stringify;
});

// node_modules/memoirist/dist/index.mjs
var createNode = (part, inert) => ({
  part,
  store: null,
  inert: inert !== undefined ? new Map(inert.map((child) => [child.part.charCodeAt(0), child])) : null,
  params: null,
  wildcardStore: null
});
var cloneNode = (node, part) => ({
  ...node,
  part
});
var createParamNode = (paramName) => ({
  paramName,
  store: null,
  inert: null
});
var Memoirist = class _Memoirist {
  root = {};
  history = [];
  static regex = {
    static: /:.+?(?=\/|$)/,
    params: /:.+?(?=\/|$)/g
  };
  add(method, path, store) {
    if (typeof path !== "string")
      throw new TypeError("Route path must be a string");
    if (path === "")
      path = "/";
    else if (path[0] !== "/")
      path = `/${path}`;
    this.history.push([method, path, store]);
    const isWildcard = path[path.length - 1] === "*";
    if (isWildcard) {
      path = path.slice(0, -1);
    }
    const inertParts = path.split(_Memoirist.regex.static);
    const paramParts = path.match(_Memoirist.regex.params) || [];
    if (inertParts[inertParts.length - 1] === "")
      inertParts.pop();
    let node;
    if (!this.root[method])
      node = this.root[method] = createNode("/");
    else
      node = this.root[method];
    let paramPartsIndex = 0;
    for (let i = 0;i < inertParts.length; ++i) {
      let part = inertParts[i];
      if (i > 0) {
        const param = paramParts[paramPartsIndex++].slice(1);
        if (node.params === null)
          node.params = createParamNode(param);
        else if (node.params.paramName !== param)
          throw new Error(`Cannot create route "${path}" with parameter "${param}" because a route already exists with a different parameter name ("${node.params.paramName}") in the same location`);
        const params = node.params;
        if (params.inert === null) {
          node = params.inert = createNode(part);
          continue;
        }
        node = params.inert;
      }
      for (let j = 0;; ) {
        if (j === part.length) {
          if (j < node.part.length) {
            const childNode = cloneNode(node, node.part.slice(j));
            Object.assign(node, createNode(part, [childNode]));
          }
          break;
        }
        if (j === node.part.length) {
          if (node.inert === null)
            node.inert = new Map;
          else if (node.inert.has(part.charCodeAt(j))) {
            node = node.inert.get(part.charCodeAt(j));
            part = part.slice(j);
            j = 0;
            continue;
          }
          const childNode = createNode(part.slice(j));
          node.inert.set(part.charCodeAt(j), childNode);
          node = childNode;
          break;
        }
        if (part[j] !== node.part[j]) {
          const existingChild = cloneNode(node, node.part.slice(j));
          const newChild = createNode(part.slice(j));
          Object.assign(node, createNode(node.part.slice(0, j), [
            existingChild,
            newChild
          ]));
          node = newChild;
          break;
        }
        ++j;
      }
    }
    if (paramPartsIndex < paramParts.length) {
      const param = paramParts[paramPartsIndex];
      const paramName = param.slice(1);
      if (node.params === null)
        node.params = createParamNode(paramName);
      else if (node.params.paramName !== paramName)
        throw new Error(`Cannot create route "${path}" with parameter "${paramName}" because a route already exists with a different parameter name ("${node.params.paramName}") in the same location`);
      if (node.params.store === null)
        node.params.store = store;
      return node.params.store;
    }
    if (isWildcard) {
      if (node.wildcardStore === null)
        node.wildcardStore = store;
      return node.wildcardStore;
    }
    if (node.store === null)
      node.store = store;
    return node.store;
  }
  find(method, url) {
    const root = this.root[method];
    if (!root)
      return null;
    return matchRoute(url, url.length, root, 0);
  }
};
var matchRoute = (url, urlLength, node, startIndex) => {
  const part = node?.part;
  const endIndex = startIndex + part.length;
  if (part.length > 1) {
    if (endIndex > urlLength)
      return null;
    if (part.length < 15) {
      for (let i = 1, j = startIndex + 1;i < part.length; ++i, ++j)
        if (part.charCodeAt(i) !== url.charCodeAt(j))
          return null;
    } else if (url.substring(startIndex, endIndex) !== part)
      return null;
  }
  if (endIndex === urlLength) {
    if (node.store !== null)
      return {
        store: node.store,
        params: {}
      };
    if (node.wildcardStore !== null)
      return {
        store: node.wildcardStore,
        params: { "*": "" }
      };
    return null;
  }
  if (node.inert !== null) {
    const inert = node.inert.get(url.charCodeAt(endIndex));
    if (inert !== undefined) {
      const route = matchRoute(url, urlLength, inert, endIndex);
      if (route !== null)
        return route;
    }
  }
  if (node.params !== null) {
    const param = node.params;
    const slashIndex = url.indexOf("/", endIndex);
    if (slashIndex !== endIndex) {
      if (slashIndex === -1 || slashIndex >= urlLength) {
        if (param.store !== null) {
          const params = {};
          params[param.paramName] = url.substring(endIndex, urlLength);
          return {
            store: param.store,
            params
          };
        }
      } else if (param.inert !== null) {
        const route = matchRoute(url, urlLength, param.inert, slashIndex);
        if (route !== null) {
          route.params[param.paramName] = url.substring(endIndex, slashIndex);
          return route;
        }
      }
    }
  }
  if (node.wildcardStore !== null)
    return {
      store: node.wildcardStore,
      params: {
        "*": url.substring(endIndex, urlLength)
      }
    };
  return null;
};

// node_modules/eventemitter3/index.mjs
var import_ = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_.default;

// node_modules/@sinclair/typebox/build/import/value/guard/guard.mjs
function IsAsyncIterator(value) {
  return IsObject(value) && (Symbol.asyncIterator in value);
}
function IsIterator(value) {
  return IsObject(value) && (Symbol.iterator in value);
}
function IsStandardObject(value) {
  return IsObject(value) && !IsArray(value) && IsFunction(value.constructor) && value.constructor.name === "Object";
}
function IsPromise(value) {
  return value instanceof Promise;
}
function IsDate(value) {
  return value instanceof Date && Number.isFinite(value.getTime());
}
function IsTypedArray(value) {
  return ArrayBuffer.isView(value);
}
function IsUint8Array(value) {
  return value instanceof globalThis.Uint8Array;
}
function HasPropertyKey(value, key) {
  return key in value;
}
function IsObject(value) {
  return value !== null && typeof value === "object";
}
function IsArray(value) {
  return Array.isArray(value) && !ArrayBuffer.isView(value);
}
function IsUndefined(value) {
  return value === undefined;
}
function IsNull(value) {
  return value === null;
}
function IsBoolean(value) {
  return typeof value === "boolean";
}
function IsNumber(value) {
  return typeof value === "number";
}
function IsInteger(value) {
  return IsNumber(value) && Number.isInteger(value);
}
function IsBigInt(value) {
  return typeof value === "bigint";
}
function IsString(value) {
  return typeof value === "string";
}
function IsFunction(value) {
  return typeof value === "function";
}
function IsSymbol(value) {
  return typeof value === "symbol";
}
function IsValueType(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
}
// node_modules/@sinclair/typebox/build/import/system/policy.mjs
var TypeSystemPolicy;
(function(TypeSystemPolicy2) {
  TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
  TypeSystemPolicy2.AllowArrayObject = false;
  TypeSystemPolicy2.AllowNaN = false;
  TypeSystemPolicy2.AllowNullVoid = false;
  function IsExactOptionalProperty(value, key) {
    return TypeSystemPolicy2.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
  }
  TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    const isObject = IsObject(value);
    return TypeSystemPolicy2.AllowArrayObject ? isObject : isObject && !IsArray(value);
  }
  TypeSystemPolicy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return IsObjectLike(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  }
  TypeSystemPolicy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    const isNumber = IsNumber(value);
    return TypeSystemPolicy2.AllowNaN ? isNumber : isNumber && Number.isFinite(value);
  }
  TypeSystemPolicy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    const isUndefined = IsUndefined(value);
    return TypeSystemPolicy2.AllowNullVoid ? isUndefined || value === null : isUndefined;
  }
  TypeSystemPolicy2.IsVoidLike = IsVoidLike;
})(TypeSystemPolicy || (TypeSystemPolicy = {}));
// node_modules/@sinclair/typebox/build/import/type/registry/format.mjs
var exports_format = {};
__export(exports_format, {
  Set: () => {
    {
      return Set2;
    }
  },
  Has: () => {
    {
      return Has;
    }
  },
  Get: () => {
    {
      return Get;
    }
  },
  Entries: () => {
    {
      return Entries;
    }
  },
  Delete: () => {
    {
      return Delete;
    }
  },
  Clear: () => {
    {
      return Clear;
    }
  }
});
function Entries() {
  return new Map(map);
}
function Clear() {
  return map.clear();
}
function Delete(format) {
  return map.delete(format);
}
function Has(format) {
  return map.has(format);
}
function Set2(format, func) {
  map.set(format, func);
}
function Get(format) {
  return map.get(format);
}
var map = new Map;
// node_modules/@sinclair/typebox/build/import/type/registry/type.mjs
var exports_type = {};
__export(exports_type, {
  Set: () => {
    {
      return Set3;
    }
  },
  Has: () => {
    {
      return Has2;
    }
  },
  Get: () => {
    {
      return Get2;
    }
  },
  Entries: () => {
    {
      return Entries2;
    }
  },
  Delete: () => {
    {
      return Delete2;
    }
  },
  Clear: () => {
    {
      return Clear2;
    }
  }
});
function Entries2() {
  return new Map(map2);
}
function Clear2() {
  return map2.clear();
}
function Delete2(kind) {
  return map2.delete(kind);
}
function Has2(kind) {
  return map2.has(kind);
}
function Set3(kind, func) {
  map2.set(kind, func);
}
function Get2(kind) {
  return map2.get(kind);
}
var map2 = new Map;
// node_modules/@sinclair/typebox/build/import/type/symbols/symbols.mjs
var TransformKind = Symbol.for("TypeBox.Transform");
var ReadonlyKind = Symbol.for("TypeBox.Readonly");
var OptionalKind = Symbol.for("TypeBox.Optional");
var Hint = Symbol.for("TypeBox.Hint");
var Kind = Symbol.for("TypeBox.Kind");
// node_modules/@sinclair/typebox/build/import/type/unsafe/unsafe.mjs
function Unsafe(options = {}) {
  return {
    ...options,
    [Kind]: options[Kind] ?? "Unsafe"
  };
}
// node_modules/@sinclair/typebox/build/import/type/error/error.mjs
class TypeBoxError extends Error {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/import/system/system.mjs
class TypeSystemDuplicateTypeKind extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate type kind '${kind}' detected`);
  }
}

class TypeSystemDuplicateFormat extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate string format '${kind}' detected`);
  }
}
var TypeSystem;
(function(TypeSystem2) {
  function Type(kind, check) {
    if (exports_type.Has(kind))
      throw new TypeSystemDuplicateTypeKind(kind);
    exports_type.Set(kind, check);
    return (options = {}) => Unsafe({ ...options, [Kind]: kind });
  }
  TypeSystem2.Type = Type;
  function Format(format, check) {
    if (exports_format.Has(format))
      throw new TypeSystemDuplicateFormat(format);
    exports_format.Set(format, check);
    return format;
  }
  TypeSystem2.Format = Format;
})(TypeSystem || (TypeSystem = {}));
// node_modules/@sinclair/typebox/build/import/type/mapped/mapped-result.mjs
function MappedResult(properties) {
  return {
    [Kind]: "MappedResult",
    properties
  };
}
// node_modules/@sinclair/typebox/build/import/type/guard/value.mjs
var exports_value = {};
__export(exports_value, {
  IsUndefined: () => {
    {
      return IsUndefined2;
    }
  },
  IsUint8Array: () => {
    {
      return IsUint8Array2;
    }
  },
  IsSymbol: () => {
    {
      return IsSymbol2;
    }
  },
  IsString: () => {
    {
      return IsString2;
    }
  },
  IsRegExp: () => {
    {
      return IsRegExp;
    }
  },
  IsObject: () => {
    {
      return IsObject2;
    }
  },
  IsNumber: () => {
    {
      return IsNumber2;
    }
  },
  IsNull: () => {
    {
      return IsNull2;
    }
  },
  IsIterator: () => {
    {
      return IsIterator2;
    }
  },
  IsFunction: () => {
    {
      return IsFunction2;
    }
  },
  IsDate: () => {
    {
      return IsDate2;
    }
  },
  IsBoolean: () => {
    {
      return IsBoolean2;
    }
  },
  IsBigInt: () => {
    {
      return IsBigInt2;
    }
  },
  IsAsyncIterator: () => {
    {
      return IsAsyncIterator2;
    }
  },
  IsArray: () => {
    {
      return IsArray2;
    }
  }
});
function IsAsyncIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && (Symbol.asyncIterator in value);
}
function IsArray2(value) {
  return Array.isArray(value);
}
function IsBigInt2(value) {
  return typeof value === "bigint";
}
function IsBoolean2(value) {
  return typeof value === "boolean";
}
function IsDate2(value) {
  return value instanceof globalThis.Date;
}
function IsFunction2(value) {
  return typeof value === "function";
}
function IsIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && (Symbol.iterator in value);
}
function IsNull2(value) {
  return value === null;
}
function IsNumber2(value) {
  return typeof value === "number";
}
function IsObject2(value) {
  return typeof value === "object" && value !== null;
}
function IsRegExp(value) {
  return value instanceof globalThis.RegExp;
}
function IsString2(value) {
  return typeof value === "string";
}
function IsSymbol2(value) {
  return typeof value === "symbol";
}
function IsUint8Array2(value) {
  return value instanceof globalThis.Uint8Array;
}
function IsUndefined2(value) {
  return value === undefined;
}

// node_modules/@sinclair/typebox/build/import/type/clone/value.mjs
var ArrayType = function(value) {
  return value.map((value2) => Visit(value2));
};
var DateType = function(value) {
  return new Date(value.getTime());
};
var Uint8ArrayType = function(value) {
  return new Uint8Array(value);
};
var RegExpType = function(value) {
  return new RegExp(value.source, value.flags);
};
var ObjectType = function(value) {
  const clonedProperties = Object.getOwnPropertyNames(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
  const clonedSymbols = Object.getOwnPropertySymbols(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
  return { ...clonedProperties, ...clonedSymbols };
};
var Visit = function(value) {
  return IsArray2(value) ? ArrayType(value) : IsDate2(value) ? DateType(value) : IsUint8Array2(value) ? Uint8ArrayType(value) : IsRegExp(value) ? RegExpType(value) : IsObject2(value) ? ObjectType(value) : value;
};
function Clone(value) {
  return Visit(value);
}

// node_modules/@sinclair/typebox/build/import/type/clone/type.mjs
function CloneRest(schemas) {
  return schemas.map((schema) => CloneType(schema));
}
function CloneType(schema, options = {}) {
  return { ...Clone(schema), ...options };
}

// node_modules/@sinclair/typebox/build/import/type/discard/discard.mjs
var DiscardKey = function(value2, key) {
  const { [key]: _, ...rest } = value2;
  return rest;
};
function Discard(value2, keys) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value2);
}
// node_modules/@sinclair/typebox/build/import/type/array/array.mjs
function Array2(schema, options = {}) {
  return {
    ...options,
    [Kind]: "Array",
    type: "array",
    items: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/import/type/async-iterator/async-iterator.mjs
function AsyncIterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "AsyncIterator",
    type: "AsyncIterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/import/type/constructor/constructor.mjs
function Constructor(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Constructor",
    type: "Constructor",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/import/type/function/function.mjs
function Function2(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Function",
    type: "Function",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/import/type/never/never.mjs
function Never(options = {}) {
  return {
    ...options,
    [Kind]: "Never",
    not: {}
  };
}
// node_modules/@sinclair/typebox/build/import/type/guard/type.mjs
var exports_type2 = {};
__export(exports_type2, {
  TypeGuardUnknownTypeError: () => {
    {
      return TypeGuardUnknownTypeError;
    }
  },
  IsVoid: () => {
    {
      return IsVoid;
    }
  },
  IsUnsafe: () => {
    {
      return IsUnsafe;
    }
  },
  IsUnknown: () => {
    {
      return IsUnknown;
    }
  },
  IsUnionLiteral: () => {
    {
      return IsUnionLiteral;
    }
  },
  IsUnion: () => {
    {
      return IsUnion;
    }
  },
  IsUndefined: () => {
    {
      return IsUndefined3;
    }
  },
  IsUint8Array: () => {
    {
      return IsUint8Array3;
    }
  },
  IsTuple: () => {
    {
      return IsTuple;
    }
  },
  IsTransform: () => {
    {
      return IsTransform;
    }
  },
  IsThis: () => {
    {
      return IsThis;
    }
  },
  IsTemplateLiteral: () => {
    {
      return IsTemplateLiteral;
    }
  },
  IsSymbol: () => {
    {
      return IsSymbol3;
    }
  },
  IsString: () => {
    {
      return IsString3;
    }
  },
  IsSchema: () => {
    {
      return IsSchema;
    }
  },
  IsRegExp: () => {
    {
      return IsRegExp2;
    }
  },
  IsRef: () => {
    {
      return IsRef;
    }
  },
  IsRecursive: () => {
    {
      return IsRecursive;
    }
  },
  IsRecord: () => {
    {
      return IsRecord;
    }
  },
  IsReadonly: () => {
    {
      return IsReadonly;
    }
  },
  IsProperties: () => {
    {
      return IsProperties;
    }
  },
  IsPromise: () => {
    {
      return IsPromise2;
    }
  },
  IsOptional: () => {
    {
      return IsOptional;
    }
  },
  IsObject: () => {
    {
      return IsObject3;
    }
  },
  IsNumber: () => {
    {
      return IsNumber3;
    }
  },
  IsNull: () => {
    {
      return IsNull3;
    }
  },
  IsNot: () => {
    {
      return IsNot;
    }
  },
  IsNever: () => {
    {
      return IsNever;
    }
  },
  IsMappedResult: () => {
    {
      return IsMappedResult;
    }
  },
  IsMappedKey: () => {
    {
      return IsMappedKey;
    }
  },
  IsLiteralValue: () => {
    {
      return IsLiteralValue;
    }
  },
  IsLiteralString: () => {
    {
      return IsLiteralString;
    }
  },
  IsLiteralNumber: () => {
    {
      return IsLiteralNumber;
    }
  },
  IsLiteralBoolean: () => {
    {
      return IsLiteralBoolean;
    }
  },
  IsLiteral: () => {
    {
      return IsLiteral;
    }
  },
  IsKindOf: () => {
    {
      return IsKindOf;
    }
  },
  IsKind: () => {
    {
      return IsKind;
    }
  },
  IsIterator: () => {
    {
      return IsIterator3;
    }
  },
  IsIntersect: () => {
    {
      return IsIntersect;
    }
  },
  IsInteger: () => {
    {
      return IsInteger2;
    }
  },
  IsFunction: () => {
    {
      return IsFunction3;
    }
  },
  IsDate: () => {
    {
      return IsDate3;
    }
  },
  IsConstructor: () => {
    {
      return IsConstructor;
    }
  },
  IsBoolean: () => {
    {
      return IsBoolean3;
    }
  },
  IsBigInt: () => {
    {
      return IsBigInt3;
    }
  },
  IsAsyncIterator: () => {
    {
      return IsAsyncIterator3;
    }
  },
  IsArray: () => {
    {
      return IsArray3;
    }
  },
  IsAny: () => {
    {
      return IsAny;
    }
  }
});
var IsPattern = function(value2) {
  try {
    new RegExp(value2);
    return true;
  } catch {
    return false;
  }
};
var IsControlCharacterFree = function(value2) {
  if (!IsString2(value2))
    return false;
  for (let i = 0;i < value2.length; i++) {
    const code = value2.charCodeAt(i);
    if (code >= 7 && code <= 13 || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
};
var IsAdditionalProperties = function(value2) {
  return IsOptionalBoolean(value2) || IsSchema(value2);
};
var IsOptionalBigInt = function(value2) {
  return IsUndefined2(value2) || IsBigInt2(value2);
};
var IsOptionalNumber = function(value2) {
  return IsUndefined2(value2) || IsNumber2(value2);
};
var IsOptionalBoolean = function(value2) {
  return IsUndefined2(value2) || IsBoolean2(value2);
};
var IsOptionalString = function(value2) {
  return IsUndefined2(value2) || IsString2(value2);
};
var IsOptionalPattern = function(value2) {
  return IsUndefined2(value2) || IsString2(value2) && IsControlCharacterFree(value2) && IsPattern(value2);
};
var IsOptionalFormat = function(value2) {
  return IsUndefined2(value2) || IsString2(value2) && IsControlCharacterFree(value2);
};
var IsOptionalSchema = function(value2) {
  return IsUndefined2(value2) || IsSchema(value2);
};
function IsReadonly(value2) {
  return IsObject2(value2) && value2[ReadonlyKind] === "Readonly";
}
function IsOptional(value2) {
  return IsObject2(value2) && value2[OptionalKind] === "Optional";
}
function IsAny(value2) {
  return IsKindOf(value2, "Any") && IsOptionalString(value2.$id);
}
function IsArray3(value2) {
  return IsKindOf(value2, "Array") && value2.type === "array" && IsOptionalString(value2.$id) && IsSchema(value2.items) && IsOptionalNumber(value2.minItems) && IsOptionalNumber(value2.maxItems) && IsOptionalBoolean(value2.uniqueItems) && IsOptionalSchema(value2.contains) && IsOptionalNumber(value2.minContains) && IsOptionalNumber(value2.maxContains);
}
function IsAsyncIterator3(value2) {
  return IsKindOf(value2, "AsyncIterator") && value2.type === "AsyncIterator" && IsOptionalString(value2.$id) && IsSchema(value2.items);
}
function IsBigInt3(value2) {
  return IsKindOf(value2, "BigInt") && value2.type === "bigint" && IsOptionalString(value2.$id) && IsOptionalBigInt(value2.exclusiveMaximum) && IsOptionalBigInt(value2.exclusiveMinimum) && IsOptionalBigInt(value2.maximum) && IsOptionalBigInt(value2.minimum) && IsOptionalBigInt(value2.multipleOf);
}
function IsBoolean3(value2) {
  return IsKindOf(value2, "Boolean") && value2.type === "boolean" && IsOptionalString(value2.$id);
}
function IsConstructor(value2) {
  return IsKindOf(value2, "Constructor") && value2.type === "Constructor" && IsOptionalString(value2.$id) && IsArray2(value2.parameters) && value2.parameters.every((schema) => IsSchema(schema)) && IsSchema(value2.returns);
}
function IsDate3(value2) {
  return IsKindOf(value2, "Date") && value2.type === "Date" && IsOptionalString(value2.$id) && IsOptionalNumber(value2.exclusiveMaximumTimestamp) && IsOptionalNumber(value2.exclusiveMinimumTimestamp) && IsOptionalNumber(value2.maximumTimestamp) && IsOptionalNumber(value2.minimumTimestamp) && IsOptionalNumber(value2.multipleOfTimestamp);
}
function IsFunction3(value2) {
  return IsKindOf(value2, "Function") && value2.type === "Function" && IsOptionalString(value2.$id) && IsArray2(value2.parameters) && value2.parameters.every((schema) => IsSchema(schema)) && IsSchema(value2.returns);
}
function IsInteger2(value2) {
  return IsKindOf(value2, "Integer") && value2.type === "integer" && IsOptionalString(value2.$id) && IsOptionalNumber(value2.exclusiveMaximum) && IsOptionalNumber(value2.exclusiveMinimum) && IsOptionalNumber(value2.maximum) && IsOptionalNumber(value2.minimum) && IsOptionalNumber(value2.multipleOf);
}
function IsProperties(value2) {
  return IsObject2(value2) && Object.entries(value2).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema(schema));
}
function IsIntersect(value2) {
  return IsKindOf(value2, "Intersect") && (IsString2(value2.type) && value2.type !== "object" ? false : true) && IsArray2(value2.allOf) && value2.allOf.every((schema) => IsSchema(schema) && !IsTransform(schema)) && IsOptionalString(value2.type) && (IsOptionalBoolean(value2.unevaluatedProperties) || IsOptionalSchema(value2.unevaluatedProperties)) && IsOptionalString(value2.$id);
}
function IsIterator3(value2) {
  return IsKindOf(value2, "Iterator") && value2.type === "Iterator" && IsOptionalString(value2.$id) && IsSchema(value2.items);
}
function IsKindOf(value2, kind) {
  return IsObject2(value2) && (Kind in value2) && value2[Kind] === kind;
}
function IsLiteralString(value2) {
  return IsLiteral(value2) && IsString2(value2.const);
}
function IsLiteralNumber(value2) {
  return IsLiteral(value2) && IsNumber2(value2.const);
}
function IsLiteralBoolean(value2) {
  return IsLiteral(value2) && IsBoolean2(value2.const);
}
function IsLiteral(value2) {
  return IsKindOf(value2, "Literal") && IsOptionalString(value2.$id) && IsLiteralValue(value2.const);
}
function IsLiteralValue(value2) {
  return IsBoolean2(value2) || IsNumber2(value2) || IsString2(value2);
}
function IsMappedKey(value2) {
  return IsKindOf(value2, "MappedKey") && IsArray2(value2.keys) && value2.keys.every((key) => IsNumber2(key) || IsString2(key));
}
function IsMappedResult(value2) {
  return IsKindOf(value2, "MappedResult") && IsProperties(value2.properties);
}
function IsNever(value2) {
  return IsKindOf(value2, "Never") && IsObject2(value2.not) && Object.getOwnPropertyNames(value2.not).length === 0;
}
function IsNot(value2) {
  return IsKindOf(value2, "Not") && IsSchema(value2.not);
}
function IsNull3(value2) {
  return IsKindOf(value2, "Null") && value2.type === "null" && IsOptionalString(value2.$id);
}
function IsNumber3(value2) {
  return IsKindOf(value2, "Number") && value2.type === "number" && IsOptionalString(value2.$id) && IsOptionalNumber(value2.exclusiveMaximum) && IsOptionalNumber(value2.exclusiveMinimum) && IsOptionalNumber(value2.maximum) && IsOptionalNumber(value2.minimum) && IsOptionalNumber(value2.multipleOf);
}
function IsObject3(value2) {
  return IsKindOf(value2, "Object") && value2.type === "object" && IsOptionalString(value2.$id) && IsProperties(value2.properties) && IsAdditionalProperties(value2.additionalProperties) && IsOptionalNumber(value2.minProperties) && IsOptionalNumber(value2.maxProperties);
}
function IsPromise2(value2) {
  return IsKindOf(value2, "Promise") && value2.type === "Promise" && IsOptionalString(value2.$id) && IsSchema(value2.item);
}
function IsRecord(value2) {
  return IsKindOf(value2, "Record") && value2.type === "object" && IsOptionalString(value2.$id) && IsAdditionalProperties(value2.additionalProperties) && IsObject2(value2.patternProperties) && ((schema) => {
    const keys = Object.getOwnPropertyNames(schema.patternProperties);
    return keys.length === 1 && IsPattern(keys[0]) && IsObject2(schema.patternProperties) && IsSchema(schema.patternProperties[keys[0]]);
  })(value2);
}
function IsRecursive(value2) {
  return IsObject2(value2) && (Hint in value2) && value2[Hint] === "Recursive";
}
function IsRef(value2) {
  return IsKindOf(value2, "Ref") && IsOptionalString(value2.$id) && IsString2(value2.$ref);
}
function IsRegExp2(value2) {
  return IsKindOf(value2, "RegExp") && IsOptionalString(value2.$id) && IsString2(value2.source) && IsString2(value2.flags) && IsOptionalNumber(value2.maxLength) && IsOptionalNumber(value2.minLength);
}
function IsString3(value2) {
  return IsKindOf(value2, "String") && value2.type === "string" && IsOptionalString(value2.$id) && IsOptionalNumber(value2.minLength) && IsOptionalNumber(value2.maxLength) && IsOptionalPattern(value2.pattern) && IsOptionalFormat(value2.format);
}
function IsSymbol3(value2) {
  return IsKindOf(value2, "Symbol") && value2.type === "symbol" && IsOptionalString(value2.$id);
}
function IsTemplateLiteral(value2) {
  return IsKindOf(value2, "TemplateLiteral") && value2.type === "string" && IsString2(value2.pattern) && value2.pattern[0] === "^" && value2.pattern[value2.pattern.length - 1] === "$";
}
function IsThis(value2) {
  return IsKindOf(value2, "This") && IsOptionalString(value2.$id) && IsString2(value2.$ref);
}
function IsTransform(value2) {
  return IsObject2(value2) && (TransformKind in value2);
}
function IsTuple(value2) {
  return IsKindOf(value2, "Tuple") && value2.type === "array" && IsOptionalString(value2.$id) && IsNumber2(value2.minItems) && IsNumber2(value2.maxItems) && value2.minItems === value2.maxItems && (IsUndefined2(value2.items) && IsUndefined2(value2.additionalItems) && value2.minItems === 0 || IsArray2(value2.items) && value2.items.every((schema) => IsSchema(schema)));
}
function IsUndefined3(value2) {
  return IsKindOf(value2, "Undefined") && value2.type === "undefined" && IsOptionalString(value2.$id);
}
function IsUnionLiteral(value2) {
  return IsUnion(value2) && value2.anyOf.every((schema) => IsLiteralString(schema) || IsLiteralNumber(schema));
}
function IsUnion(value2) {
  return IsKindOf(value2, "Union") && IsOptionalString(value2.$id) && IsObject2(value2) && IsArray2(value2.anyOf) && value2.anyOf.every((schema) => IsSchema(schema));
}
function IsUint8Array3(value2) {
  return IsKindOf(value2, "Uint8Array") && value2.type === "Uint8Array" && IsOptionalString(value2.$id) && IsOptionalNumber(value2.minByteLength) && IsOptionalNumber(value2.maxByteLength);
}
function IsUnknown(value2) {
  return IsKindOf(value2, "Unknown") && IsOptionalString(value2.$id);
}
function IsUnsafe(value2) {
  return IsKindOf(value2, "Unsafe");
}
function IsVoid(value2) {
  return IsKindOf(value2, "Void") && value2.type === "void" && IsOptionalString(value2.$id);
}
function IsKind(value2) {
  return IsObject2(value2) && (Kind in value2) && IsString2(value2[Kind]) && !KnownTypes.includes(value2[Kind]);
}
function IsSchema(value2) {
  return IsObject2(value2) && (IsAny(value2) || IsArray3(value2) || IsBoolean3(value2) || IsBigInt3(value2) || IsAsyncIterator3(value2) || IsConstructor(value2) || IsDate3(value2) || IsFunction3(value2) || IsInteger2(value2) || IsIntersect(value2) || IsIterator3(value2) || IsLiteral(value2) || IsMappedKey(value2) || IsMappedResult(value2) || IsNever(value2) || IsNot(value2) || IsNull3(value2) || IsNumber3(value2) || IsObject3(value2) || IsPromise2(value2) || IsRecord(value2) || IsRef(value2) || IsRegExp2(value2) || IsString3(value2) || IsSymbol3(value2) || IsTemplateLiteral(value2) || IsThis(value2) || IsTuple(value2) || IsUndefined3(value2) || IsUnion(value2) || IsUint8Array3(value2) || IsUnknown(value2) || IsUnsafe(value2) || IsVoid(value2) || IsKind(value2));
}

class TypeGuardUnknownTypeError extends TypeBoxError {
}
var KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];

// node_modules/@sinclair/typebox/build/import/type/optional/optional.mjs
var RemoveOptional = function(schema) {
  return Discard(CloneType(schema), [OptionalKind]);
};
var AddOptional = function(schema) {
  return { ...CloneType(schema), [OptionalKind]: "Optional" };
};
var OptionalWithFlag = function(schema, F) {
  return F === false ? RemoveOptional(schema) : AddOptional(schema);
};
function Optional(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? OptionalFromMappedResult(schema, F) : OptionalWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/import/type/optional/optional-from-mapped-result.mjs
var FromProperties = function(P, F) {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Optional(P[K2], F) };
  }, {});
};
var FromMappedResult = function(R, F) {
  return FromProperties(R.properties, F);
};
function OptionalFromMappedResult(R, F) {
  const P = FromMappedResult(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/intersect/intersect-create.mjs
function IntersectCreate(T, options) {
  const allObjects = T.every((schema) => IsObject3(schema));
  const clonedUnevaluatedProperties = IsSchema(options.unevaluatedProperties) ? { unevaluatedProperties: CloneType(options.unevaluatedProperties) } : {};
  return options.unevaluatedProperties === false || IsSchema(options.unevaluatedProperties) || allObjects ? { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", type: "object", allOf: CloneRest(T) } : { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", allOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/import/type/intersect/intersect-evaluated.mjs
var IsIntersectOptional = function(T) {
  return T.every((L) => IsOptional(L));
};
var RemoveOptionalFromType = function(T) {
  return Discard(T, [OptionalKind]);
};
var RemoveOptionalFromRest = function(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType(L) : L);
};
var ResolveIntersect = function(T, options) {
  return IsIntersectOptional(T) ? Optional(IntersectCreate(RemoveOptionalFromRest(T), options)) : IntersectCreate(RemoveOptionalFromRest(T), options);
};
function IntersectEvaluated(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return ResolveIntersect(T, options);
}
// node_modules/@sinclair/typebox/build/import/type/intersect/intersect.mjs
function Intersect(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return IntersectCreate(T, options);
}
// node_modules/@sinclair/typebox/build/import/type/union/union-create.mjs
function UnionCreate(T, options) {
  return { ...options, [Kind]: "Union", anyOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/import/type/union/union-evaluated.mjs
var IsUnionOptional = function(T) {
  return T.some((L) => IsOptional(L));
};
var RemoveOptionalFromRest2 = function(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType2(L) : L);
};
var RemoveOptionalFromType2 = function(T) {
  return Discard(T, [OptionalKind]);
};
var ResolveUnion = function(T, options) {
  return IsUnionOptional(T) ? Optional(UnionCreate(RemoveOptionalFromRest2(T), options)) : UnionCreate(RemoveOptionalFromRest2(T), options);
};
function UnionEvaluated(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : ResolveUnion(T, options);
}
// node_modules/@sinclair/typebox/build/import/type/union/union.mjs
function Union(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : UnionCreate(T, options);
}
// node_modules/@sinclair/typebox/build/import/type/template-literal/parse.mjs
var IsNonEscaped = function(pattern, index, char) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
};
var IsOpenParen = function(pattern, index) {
  return IsNonEscaped(pattern, index, "(");
};
var IsCloseParen = function(pattern, index) {
  return IsNonEscaped(pattern, index, ")");
};
var IsSeparator = function(pattern, index) {
  return IsNonEscaped(pattern, index, "|");
};
var IsGroup = function(pattern) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
    return false;
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (count === 0 && index !== pattern.length - 1)
      return false;
  }
  return true;
};
var InGroup = function(pattern) {
  return pattern.slice(1, pattern.length - 1);
};
var IsPrecedenceOr = function(pattern) {
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0)
      return true;
  }
  return false;
};
var IsPrecedenceAnd = function(pattern) {
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      return true;
  }
  return false;
};
var Or = function(pattern) {
  let [count, start] = [0, 0];
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0) {
      const range2 = pattern.slice(start, index);
      if (range2.length > 0)
        expressions.push(TemplateLiteralParse(range2));
      start = index + 1;
    }
  }
  const range = pattern.slice(start);
  if (range.length > 0)
    expressions.push(TemplateLiteralParse(range));
  if (expressions.length === 0)
    return { type: "const", const: "" };
  if (expressions.length === 1)
    return expressions[0];
  return { type: "or", expr: expressions };
};
var And = function(pattern) {
  function Group(value2, index) {
    if (!IsOpenParen(value2, index))
      throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
    let count = 0;
    for (let scan = index;scan < value2.length; scan++) {
      if (IsOpenParen(value2, scan))
        count += 1;
      if (IsCloseParen(value2, scan))
        count -= 1;
      if (count === 0)
        return [index, scan];
    }
    throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
  }
  function Range(pattern2, index) {
    for (let scan = index;scan < pattern2.length; scan++) {
      if (IsOpenParen(pattern2, scan))
        return [index, scan];
    }
    return [index, pattern2.length];
  }
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index);
      const range = pattern.slice(start, end + 1);
      expressions.push(TemplateLiteralParse(range));
      index = end;
    } else {
      const [start, end] = Range(pattern, index);
      const range = pattern.slice(start, end);
      if (range.length > 0)
        expressions.push(TemplateLiteralParse(range));
      index = end - 1;
    }
  }
  return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
};
function TemplateLiteralParse(pattern) {
  return IsGroup(pattern) ? TemplateLiteralParse(InGroup(pattern)) : IsPrecedenceOr(pattern) ? Or(pattern) : IsPrecedenceAnd(pattern) ? And(pattern) : { type: "const", const: pattern };
}
function TemplateLiteralParseExact(pattern) {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}

class TemplateLiteralParserError extends TypeBoxError {
}

// node_modules/@sinclair/typebox/build/import/type/template-literal/finite.mjs
var IsNumberExpression = function(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
};
var IsBooleanExpression = function(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
};
var IsStringExpression = function(expression) {
  return expression.type === "const" && expression.const === ".*";
};
function IsTemplateLiteralExpressionFinite(expression) {
  return IsNumberExpression(expression) || IsStringExpression(expression) ? false : IsBooleanExpression(expression) ? true : expression.type === "and" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "or" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "const" ? true : (() => {
    throw new TemplateLiteralFiniteError(`Unknown expression type`);
  })();
}
function IsTemplateLiteralFinite(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}

class TemplateLiteralFiniteError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/import/type/template-literal/generate.mjs
function* GenerateReduce(buffer) {
  if (buffer.length === 1)
    return yield* buffer[0];
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`;
    }
  }
}
function* GenerateAnd(expression) {
  return yield* GenerateReduce(expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)]));
}
function* GenerateOr(expression) {
  for (const expr of expression.expr)
    yield* TemplateLiteralExpressionGenerate(expr);
}
function* GenerateConst(expression) {
  return yield expression.const;
}
function* TemplateLiteralExpressionGenerate(expression) {
  return expression.type === "and" ? yield* GenerateAnd(expression) : expression.type === "or" ? yield* GenerateOr(expression) : expression.type === "const" ? yield* GenerateConst(expression) : (() => {
    throw new TemplateLiteralGenerateError("Unknown expression");
  })();
}
function TemplateLiteralGenerate(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression) ? [...TemplateLiteralExpressionGenerate(expression)] : [];
}

class TemplateLiteralGenerateError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/import/type/literal/literal.mjs
function Literal(value2, options = {}) {
  return {
    ...options,
    [Kind]: "Literal",
    const: value2,
    type: typeof value2
  };
}
// node_modules/@sinclair/typebox/build/import/type/boolean/boolean.mjs
function Boolean(options = {}) {
  return {
    ...options,
    [Kind]: "Boolean",
    type: "boolean"
  };
}
// node_modules/@sinclair/typebox/build/import/type/bigint/bigint.mjs
function BigInt2(options = {}) {
  return {
    ...options,
    [Kind]: "BigInt",
    type: "bigint"
  };
}
// node_modules/@sinclair/typebox/build/import/type/number/number.mjs
function Number2(options = {}) {
  return {
    ...options,
    [Kind]: "Number",
    type: "number"
  };
}
// node_modules/@sinclair/typebox/build/import/type/string/string.mjs
function String2(options = {}) {
  return { ...options, [Kind]: "String", type: "string" };
}
// node_modules/@sinclair/typebox/build/import/type/template-literal/syntax.mjs
function* FromUnion(syntax) {
  const trim = syntax.trim().replace(/"|'/g, "");
  return trim === "boolean" ? yield Boolean() : trim === "number" ? yield Number2() : trim === "bigint" ? yield BigInt2() : trim === "string" ? yield String2() : yield (() => {
    const literals = trim.split("|").map((literal3) => Literal(literal3.trim()));
    return literals.length === 0 ? Never() : literals.length === 1 ? literals[0] : UnionEvaluated(literals);
  })();
}
function* FromTerminal(syntax) {
  if (syntax[1] !== "{") {
    const L = Literal("$");
    const R = FromSyntax(syntax.slice(1));
    return yield* [L, ...R];
  }
  for (let i = 2;i < syntax.length; i++) {
    if (syntax[i] === "}") {
      const L = FromUnion(syntax.slice(2, i));
      const R = FromSyntax(syntax.slice(i + 1));
      return yield* [...L, ...R];
    }
  }
  yield Literal(syntax);
}
function* FromSyntax(syntax) {
  for (let i = 0;i < syntax.length; i++) {
    if (syntax[i] === "$") {
      const L = Literal(syntax.slice(0, i));
      const R = FromTerminal(syntax.slice(i));
      return yield* [L, ...R];
    }
  }
  yield Literal(syntax);
}
function TemplateLiteralSyntax(syntax) {
  return [...FromSyntax(syntax)];
}
// node_modules/@sinclair/typebox/build/import/type/patterns/patterns.mjs
var PatternBoolean = "(true|false)";
var PatternNumber = "(0|[1-9][0-9]*)";
var PatternString = "(.*)";
var PatternBooleanExact = `^${PatternBoolean}\$`;
var PatternNumberExact = `^${PatternNumber}\$`;
var PatternStringExact = `^${PatternString}\$`;
// node_modules/@sinclair/typebox/build/import/type/template-literal/pattern.mjs
var Escape = function(value2) {
  return value2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var Visit2 = function(schema, acc) {
  return IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : IsUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit2(schema2, acc)).join("|")})` : IsNumber3(schema) ? `${acc}${PatternNumber}` : IsInteger2(schema) ? `${acc}${PatternNumber}` : IsBigInt3(schema) ? `${acc}${PatternNumber}` : IsString3(schema) ? `${acc}${PatternString}` : IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : IsBoolean3(schema) ? `${acc}${PatternBoolean}` : (() => {
    throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`);
  })();
};
function TemplateLiteralPattern(kinds) {
  return `^${kinds.map((schema) => Visit2(schema, "")).join("")}$`;
}

class TemplateLiteralPatternError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/import/type/template-literal/union.mjs
function TemplateLiteralToUnion(schema) {
  const R = TemplateLiteralGenerate(schema);
  const L = R.map((S) => Literal(S));
  return UnionEvaluated(L);
}
// node_modules/@sinclair/typebox/build/import/type/template-literal/template-literal.mjs
function TemplateLiteral(unresolved, options = {}) {
  const pattern2 = IsString2(unresolved) ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved)) : TemplateLiteralPattern(unresolved);
  return { ...options, [Kind]: "TemplateLiteral", type: "string", pattern: pattern2 };
}
// node_modules/@sinclair/typebox/build/import/type/indexed/indexed-property-keys.mjs
var FromTemplateLiteral = function(T) {
  const R = TemplateLiteralGenerate(T);
  return R.map((S) => S.toString());
};
var FromUnion2 = function(T) {
  return T.reduce((Acc, L) => {
    return [...Acc, ...IndexPropertyKeys(L)];
  }, []);
};
var FromLiteral = function(T) {
  return [T.toString()];
};
function IndexPropertyKeys(T) {
  return [...new Set(IsTemplateLiteral(T) ? FromTemplateLiteral(T) : IsUnion(T) ? FromUnion2(T.anyOf) : IsLiteral(T) ? FromLiteral(T.const) : IsNumber3(T) ? ["[number]"] : IsInteger2(T) ? ["[number]"] : [])];
}

// node_modules/@sinclair/typebox/build/import/type/indexed/indexed-from-mapped-result.mjs
var FromProperties2 = function(T, P, options) {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Index(T, IndexPropertyKeys(P[K2]), options) };
  }, {});
};
var FromMappedResult2 = function(T, R, options) {
  return FromProperties2(T, R.properties, options);
};
function IndexFromMappedResult(T, R, options) {
  const P = FromMappedResult2(T, R, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/import/type/indexed/indexed.mjs
var FromRest = function(T, K) {
  return T.map((L) => IndexFromPropertyKey(L, K));
};
var FromIntersectRest = function(T) {
  return T.filter((L) => !IsNever(L));
};
var FromIntersect = function(T, K) {
  return IntersectEvaluated(FromIntersectRest(FromRest(T, K)));
};
var FromUnionRest = function(T) {
  return T;
};
var FromUnion3 = function(T, K) {
  return UnionEvaluated(FromUnionRest(FromRest(T, K)));
};
var FromTuple = function(T, K) {
  return K in T ? T[K] : K === "[number]" ? UnionEvaluated(T) : Never();
};
var FromArray = function(T, K) {
  return K === "[number]" ? T : Never();
};
var FromProperty = function(T, K) {
  return K in T ? T[K] : Never();
};
function IndexFromPropertyKey(T, K) {
  return IsIntersect(T) ? FromIntersect(T.allOf, K) : IsUnion(T) ? FromUnion3(T.anyOf, K) : IsTuple(T) ? FromTuple(T.items ?? [], K) : IsArray3(T) ? FromArray(T.items, K) : IsObject3(T) ? FromProperty(T.properties, K) : Never();
}
function IndexFromPropertyKeys(T, K) {
  return K.map((L) => IndexFromPropertyKey(T, L));
}
var FromSchema = function(T, K) {
  return UnionEvaluated(IndexFromPropertyKeys(T, K));
};
function Index(T, K, options = {}) {
  return IsMappedResult(K) ? CloneType(IndexFromMappedResult(T, K, options)) : IsMappedKey(K) ? CloneType(IndexFromMappedKey(T, K, options)) : IsSchema(K) ? CloneType(FromSchema(T, IndexPropertyKeys(K)), options) : CloneType(FromSchema(T, K), options);
}

// node_modules/@sinclair/typebox/build/import/type/indexed/indexed-from-mapped-key.mjs
var MappedIndexPropertyKey = function(T, K, options) {
  return { [K]: Index(T, [K], options) };
};
var MappedIndexPropertyKeys = function(T, K, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIndexPropertyKey(T, L, options) };
  }, {});
};
var MappedIndexProperties = function(T, K, options) {
  return MappedIndexPropertyKeys(T, K.keys, options);
};
function IndexFromMappedKey(T, K, options) {
  const P = MappedIndexProperties(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/iterator/iterator.mjs
function Iterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "Iterator",
    type: "Iterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/import/type/object/object.mjs
var _Object = function(properties, options = {}) {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter((key) => IsOptional(properties[key]));
  const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
  const clonedAdditionalProperties = IsSchema(options.additionalProperties) ? { additionalProperties: CloneType(options.additionalProperties) } : {};
  const clonedProperties = propertyKeys.reduce((acc, key) => ({ ...acc, [key]: CloneType(properties[key]) }), {});
  return requiredKeys.length > 0 ? { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys } : { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties };
};
var Object2 = _Object;
// node_modules/@sinclair/typebox/build/import/type/promise/promise.mjs
function Promise2(item, options = {}) {
  return {
    ...options,
    [Kind]: "Promise",
    type: "Promise",
    item: CloneType(item)
  };
}
// node_modules/@sinclair/typebox/build/import/type/readonly/readonly.mjs
var RemoveReadonly = function(schema) {
  return Discard(CloneType(schema), [ReadonlyKind]);
};
var AddReadonly = function(schema) {
  return { ...CloneType(schema), [ReadonlyKind]: "Readonly" };
};
var ReadonlyWithFlag = function(schema, F) {
  return F === false ? RemoveReadonly(schema) : AddReadonly(schema);
};
function Readonly(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? ReadonlyFromMappedResult(schema, F) : ReadonlyWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/import/type/readonly/readonly-from-mapped-result.mjs
var FromProperties3 = function(K, F) {
  return globalThis.Object.getOwnPropertyNames(K).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Readonly(K[K2], F) };
  }, {});
};
var FromMappedResult3 = function(R, F) {
  return FromProperties3(R.properties, F);
};
function ReadonlyFromMappedResult(R, F) {
  const P = FromMappedResult3(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/tuple/tuple.mjs
function Tuple(items, options = {}) {
  const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
  return items.length > 0 ? { ...options, [Kind]: "Tuple", type: "array", items: CloneRest(items), additionalItems, minItems, maxItems } : { ...options, [Kind]: "Tuple", type: "array", minItems, maxItems };
}
// node_modules/@sinclair/typebox/build/import/type/sets/set.mjs
function SetIncludes(T, S) {
  return T.includes(S);
}
function SetDistinct(T) {
  return [...new Set(T)];
}
function SetIntersect(T, S) {
  return T.filter((L) => S.includes(L));
}
var SetIntersectManyResolve = function(T, Init) {
  return T.reduce((Acc, L) => {
    return SetIntersect(Acc, L);
  }, Init);
};
function SetIntersectMany(T) {
  return T.length === 1 ? T[0] : T.length > 1 ? SetIntersectManyResolve(T.slice(1), T[0]) : [];
}
function SetUnionMany(T) {
  return T.reduce((Acc, L) => [...Acc, ...L], []);
}
// node_modules/@sinclair/typebox/build/import/type/mapped/mapped.mjs
var FromMappedResult4 = function(K, P) {
  return K in P ? FromSchemaType(K, P[K]) : MappedResult(P);
};
var MappedKeyToKnownMappedResultProperties = function(K) {
  return { [K]: Literal(K) };
};
var MappedKeyToUnknownMappedResultProperties = function(P) {
  return P.reduce((Acc, L) => {
    return { ...Acc, [L]: Literal(L) };
  }, {});
};
var MappedKeyToMappedResultProperties = function(K, P) {
  return SetIncludes(P, K) ? MappedKeyToKnownMappedResultProperties(K) : MappedKeyToUnknownMappedResultProperties(P);
};
var FromMappedKey = function(K, P) {
  const R = MappedKeyToMappedResultProperties(K, P);
  return FromMappedResult4(K, R);
};
var FromRest2 = function(K, T) {
  return T.map((L) => FromSchemaType(K, L));
};
var FromProperties4 = function(K, T) {
  return globalThis.Object.getOwnPropertyNames(T).reduce((Acc, K2) => {
    return { ...Acc, [K2]: FromSchemaType(K, T[K2]) };
  }, {});
};
var FromSchemaType = function(K, T) {
  return IsOptional(T) ? Optional(FromSchemaType(K, Discard(T, [OptionalKind]))) : IsReadonly(T) ? Readonly(FromSchemaType(K, Discard(T, [ReadonlyKind]))) : IsMappedResult(T) ? FromMappedResult4(K, T.properties) : IsMappedKey(T) ? FromMappedKey(K, T.keys) : IsConstructor(T) ? Constructor(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsFunction3(T) ? Function2(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsAsyncIterator3(T) ? AsyncIterator(FromSchemaType(K, T.items)) : IsIterator3(T) ? Iterator(FromSchemaType(K, T.items)) : IsIntersect(T) ? Intersect(FromRest2(K, T.allOf)) : IsUnion(T) ? Union(FromRest2(K, T.anyOf)) : IsTuple(T) ? Tuple(FromRest2(K, T.items ?? [])) : IsObject3(T) ? Object2(FromProperties4(K, T.properties)) : IsArray3(T) ? Array2(FromSchemaType(K, T.items)) : IsPromise2(T) ? Promise2(FromSchemaType(K, T.item)) : T;
};
function MappedFunctionReturnType(K, T, Acc = {}) {
  return K.reduce((Acc2, L) => {
    return { ...Acc2, [L]: FromSchemaType(L, T) };
  }, {});
}
function Mapped(key, map3, options = {}) {
  const K = IsSchema(key) ? IndexPropertyKeys(key) : key;
  const RT = map3({ [Kind]: "MappedKey", keys: K });
  const R = MappedFunctionReturnType(K, RT);
  return CloneType(Object2(R), options);
}
// node_modules/@sinclair/typebox/build/import/type/keyof/keyof-property-keys.mjs
var FromRest3 = function(T) {
  return T.reduce((Acc, L) => {
    return [...Acc, KeyOfPropertyKeys(L)];
  }, []);
};
var FromIntersect2 = function(T) {
  const C = FromRest3(T);
  const R = SetUnionMany(C);
  return R;
};
var FromUnion4 = function(T) {
  const C = FromRest3(T);
  const R = SetIntersectMany(C);
  return R;
};
var FromTuple2 = function(T) {
  return T.map((_, I) => I.toString());
};
var FromArray2 = function(_) {
  return ["[number]"];
};
var FromProperties5 = function(T) {
  return globalThis.Object.getOwnPropertyNames(T);
};
var FromPatternProperties = function(patternProperties) {
  if (!includePatternProperties)
    return [];
  const patternPropertyKeys = globalThis.Object.getOwnPropertyNames(patternProperties);
  return patternPropertyKeys.map((key) => {
    return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
  });
};
function KeyOfPropertyKeys(T) {
  return IsIntersect(T) ? FromIntersect2(T.allOf) : IsUnion(T) ? FromUnion4(T.anyOf) : IsTuple(T) ? FromTuple2(T.items ?? []) : IsArray3(T) ? FromArray2(T.items) : IsObject3(T) ? FromProperties5(T.properties) : IsRecord(T) ? FromPatternProperties(T.patternProperties) : [];
}
function KeyOfPattern(schema) {
  includePatternProperties = true;
  const keys = KeyOfPropertyKeys(schema);
  includePatternProperties = false;
  const pattern3 = keys.map((key) => `(${key})`);
  return `^(${pattern3.join("|")})\$`;
}
var includePatternProperties = false;

// node_modules/@sinclair/typebox/build/import/type/keyof/keyof.mjs
function KeyOfPropertyKeysToRest(T) {
  return T.map((L) => L === "[number]" ? Number2() : Literal(L));
}
function KeyOf(T, options = {}) {
  if (IsMappedResult(T)) {
    return KeyOfFromMappedResult(T, options);
  } else {
    const K = KeyOfPropertyKeys(T);
    const S = KeyOfPropertyKeysToRest(K);
    const U = UnionEvaluated(S);
    return CloneType(U, options);
  }
}

// node_modules/@sinclair/typebox/build/import/type/keyof/keyof-from-mapped-result.mjs
var FromProperties6 = function(K, options) {
  return globalThis.Object.getOwnPropertyNames(K).reduce((Acc, K2) => {
    return { ...Acc, [K2]: KeyOf(K[K2], options) };
  }, {});
};
var FromMappedResult5 = function(R, options) {
  return FromProperties6(R.properties, options);
};
function KeyOfFromMappedResult(R, options) {
  const P = FromMappedResult5(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/extends/extends-undefined.mjs
var Intersect2 = function(schema) {
  return schema.allOf.every((schema2) => ExtendsUndefinedCheck(schema2));
};
var Union2 = function(schema) {
  return schema.anyOf.some((schema2) => ExtendsUndefinedCheck(schema2));
};
var Not = function(schema) {
  return !ExtendsUndefinedCheck(schema.not);
};
function ExtendsUndefinedCheck(schema) {
  return schema[Kind] === "Intersect" ? Intersect2(schema) : schema[Kind] === "Union" ? Union2(schema) : schema[Kind] === "Not" ? Not(schema) : schema[Kind] === "Undefined" ? true : false;
}

// node_modules/@sinclair/typebox/build/import/errors/function.mjs
function DefaultErrorFunction(error8) {
  switch (error8.errorType) {
    case ValueErrorType.ArrayContains:
      return "Expected array to contain at least one matching value";
    case ValueErrorType.ArrayMaxContains:
      return `Expected array to contain no more than ${error8.schema.maxContains} matching values`;
    case ValueErrorType.ArrayMinContains:
      return `Expected array to contain at least ${error8.schema.minContains} matching values`;
    case ValueErrorType.ArrayMaxItems:
      return `Expected array length to be less or equal to ${error8.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `Expected array length to be greater or equal to ${error8.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "Expected array elements to be unique";
    case ValueErrorType.Array:
      return "Expected array";
    case ValueErrorType.AsyncIterator:
      return "Expected AsyncIterator";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${error8.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${error8.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `Expected bigint to be less or equal to ${error8.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${error8.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${error8.schema.multipleOf}`;
    case ValueErrorType.BigInt:
      return "Expected bigint";
    case ValueErrorType.Boolean:
      return "Expected boolean";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${error8.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${error8.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${error8.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${error8.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${error8.schema.multipleOfTimestamp}`;
    case ValueErrorType.Date:
      return "Expected Date";
    case ValueErrorType.Function:
      return "Expected function";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${error8.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${error8.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `Expected integer to be less or equal to ${error8.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `Expected integer to be greater or equal to ${error8.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${error8.schema.multipleOf}`;
    case ValueErrorType.Integer:
      return "Expected integer";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "Unexpected property";
    case ValueErrorType.Intersect:
      return "Expected all values to match";
    case ValueErrorType.Iterator:
      return "Expected Iterator";
    case ValueErrorType.Literal:
      return `Expected ${typeof error8.schema.const === "string" ? `'${error8.schema.const}'` : error8.schema.const}`;
    case ValueErrorType.Never:
      return "Never";
    case ValueErrorType.Not:
      return "Value should not match";
    case ValueErrorType.Null:
      return "Expected null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `Expected number to be less than ${error8.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `Expected number to be greater than ${error8.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `Expected number to be less or equal to ${error8.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `Expected number to be greater or equal to ${error8.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `Expected number to be a multiple of ${error8.schema.multipleOf}`;
    case ValueErrorType.Number:
      return "Expected number";
    case ValueErrorType.Object:
      return "Expected object";
    case ValueErrorType.ObjectAdditionalProperties:
      return "Unexpected property";
    case ValueErrorType.ObjectMaxProperties:
      return `Expected object to have no more than ${error8.schema.maxProperties} properties`;
    case ValueErrorType.ObjectMinProperties:
      return `Expected object to have at least ${error8.schema.minProperties} properties`;
    case ValueErrorType.ObjectRequiredProperty:
      return "Required property";
    case ValueErrorType.Promise:
      return "Expected Promise";
    case ValueErrorType.RegExp:
      return "Expected string to match regular expression";
    case ValueErrorType.StringFormatUnknown:
      return `Unknown format '${error8.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `Expected string to match '${error8.schema.format}' format`;
    case ValueErrorType.StringMaxLength:
      return `Expected string length less or equal to ${error8.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `Expected string length greater or equal to ${error8.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `Expected string to match '${error8.schema.pattern}'`;
    case ValueErrorType.String:
      return "Expected string";
    case ValueErrorType.Symbol:
      return "Expected symbol";
    case ValueErrorType.TupleLength:
      return `Expected tuple to have ${error8.schema.maxItems || 0} elements`;
    case ValueErrorType.Tuple:
      return "Expected tuple";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${error8.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${error8.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "Expected Uint8Array";
    case ValueErrorType.Undefined:
      return "Expected undefined";
    case ValueErrorType.Union:
      return "Expected union value";
    case ValueErrorType.Void:
      return "Expected void";
    case ValueErrorType.Kind:
      return `Expected kind '${error8.schema[Kind]}'`;
    default:
      return "Unknown error type";
  }
}
function GetErrorFunction() {
  return errorFunction;
}
var errorFunction = DefaultErrorFunction;

// node_modules/@sinclair/typebox/build/import/value/deref/deref.mjs
function Deref(schema, references) {
  const index = references.findIndex((target) => target.$id === schema.$ref);
  if (index === -1)
    throw new TypeDereferenceError(schema);
  return references[index];
}

class TypeDereferenceError extends TypeBoxError {
  schema;
  constructor(schema) {
    super(`Unable to dereference schema with \$id '${schema.$id}'`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/import/value/hash/hash.mjs
function* NumberToBytes(value3) {
  const byteCount = value3 === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value3) + 1) / 8);
  for (let i = 0;i < byteCount; i++) {
    yield value3 >> 8 * (byteCount - 1 - i) & 255;
  }
}
var ArrayType2 = function(value3) {
  FNV1A64(ByteMarker.Array);
  for (const item of value3) {
    Visit3(item);
  }
};
var BooleanType = function(value3) {
  FNV1A64(ByteMarker.Boolean);
  FNV1A64(value3 ? 1 : 0);
};
var BigIntType = function(value3) {
  FNV1A64(ByteMarker.BigInt);
  F64In.setBigInt64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
};
var DateType2 = function(value3) {
  FNV1A64(ByteMarker.Date);
  Visit3(value3.getTime());
};
var NullType = function(value3) {
  FNV1A64(ByteMarker.Null);
};
var NumberType = function(value3) {
  FNV1A64(ByteMarker.Number);
  F64In.setFloat64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
};
var ObjectType2 = function(value3) {
  FNV1A64(ByteMarker.Object);
  for (const key of globalThis.Object.keys(value3).sort()) {
    Visit3(key);
    Visit3(value3[key]);
  }
};
var StringType = function(value3) {
  FNV1A64(ByteMarker.String);
  for (let i = 0;i < value3.length; i++) {
    for (const byte of NumberToBytes(value3.charCodeAt(i))) {
      FNV1A64(byte);
    }
  }
};
var SymbolType = function(value3) {
  FNV1A64(ByteMarker.Symbol);
  Visit3(value3.description);
};
var Uint8ArrayType2 = function(value3) {
  FNV1A64(ByteMarker.Uint8Array);
  for (let i = 0;i < value3.length; i++) {
    FNV1A64(value3[i]);
  }
};
var UndefinedType = function(value3) {
  return FNV1A64(ByteMarker.Undefined);
};
var Visit3 = function(value3) {
  if (IsArray(value3))
    return ArrayType2(value3);
  if (IsBoolean(value3))
    return BooleanType(value3);
  if (IsBigInt(value3))
    return BigIntType(value3);
  if (IsDate(value3))
    return DateType2(value3);
  if (IsNull(value3))
    return NullType(value3);
  if (IsNumber(value3))
    return NumberType(value3);
  if (IsStandardObject(value3))
    return ObjectType2(value3);
  if (IsString(value3))
    return StringType(value3);
  if (IsSymbol(value3))
    return SymbolType(value3);
  if (IsUint8Array(value3))
    return Uint8ArrayType2(value3);
  if (IsUndefined(value3))
    return UndefinedType(value3);
  throw new ValueHashError(value3);
};
var FNV1A64 = function(byte) {
  Accumulator = Accumulator ^ Bytes[byte];
  Accumulator = Accumulator * Prime % Size;
};
function Hash(value3) {
  Accumulator = BigInt("14695981039346656037");
  Visit3(value3);
  return Accumulator;
}

class ValueHashError extends TypeBoxError {
  value;
  constructor(value3) {
    super(`Unable to hash value`);
    this.value = value3;
  }
}
var ByteMarker;
(function(ByteMarker2) {
  ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
  ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
  ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
  ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
  ByteMarker2[ByteMarker2["String"] = 4] = "String";
  ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
  ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
  ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
  ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
  ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
  ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
})(ByteMarker || (ByteMarker = {}));
var Accumulator = BigInt("14695981039346656037");
var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
var F64In = new DataView(F64.buffer);
var F64Out = new Uint8Array(F64.buffer);
// node_modules/@sinclair/typebox/build/import/errors/errors.mjs
var EscapeKey = function(key) {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
};
var IsDefined = function(value3) {
  return value3 !== undefined;
};
var Create = function(errorType, schema, path, value3) {
  return { type: errorType, schema, path, value: value3, message: GetErrorFunction()({ errorType, path, schema, value: value3 }) };
};
function* FromAny(schema, references, path, value3) {
}
function* FromArray3(schema, references, path, value3) {
  if (!IsArray(value3)) {
    return yield Create(ValueErrorType.Array, schema, path, value3);
  }
  if (IsDefined(schema.minItems) && !(value3.length >= schema.minItems)) {
    yield Create(ValueErrorType.ArrayMinItems, schema, path, value3);
  }
  if (IsDefined(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    yield Create(ValueErrorType.ArrayMaxItems, schema, path, value3);
  }
  for (let i = 0;i < value3.length; i++) {
    yield* Visit4(schema.items, references, `${path}/${i}`, value3[i]);
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = new Set;
    for (const element of value3) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value3);
  }
  if (!(IsDefined(schema.contains) || IsDefined(schema.minContains) || IsDefined(schema.maxContains))) {
    return;
  }
  const containsSchema = IsDefined(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce((acc, value4, index) => Visit4(containsSchema, references, `${path}${index}`, value4).next().done === true ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    yield Create(ValueErrorType.ArrayContains, schema, path, value3);
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    yield Create(ValueErrorType.ArrayMinContains, schema, path, value3);
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    yield Create(ValueErrorType.ArrayMaxContains, schema, path, value3);
  }
}
function* FromAsyncIterator(schema, references, path, value3) {
  if (!IsAsyncIterator(value3))
    yield Create(ValueErrorType.AsyncIterator, schema, path, value3);
}
function* FromBigInt(schema, references, path, value3) {
  if (!IsBigInt(value3))
    return yield Create(ValueErrorType.BigInt, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.BigIntMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.BigIntMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === BigInt(0))) {
    yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value3);
  }
}
function* FromBoolean(schema, references, path, value3) {
  if (!IsBoolean(value3))
    yield Create(ValueErrorType.Boolean, schema, path, value3);
}
function* FromConstructor(schema, references, path, value3) {
  yield* Visit4(schema.returns, references, path, value3.prototype);
}
function* FromDate(schema, references, path, value3) {
  if (!IsDate(value3))
    return yield Create(ValueErrorType.Date, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value3.getTime() < schema.exclusiveMaximumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMaximumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value3.getTime() > schema.exclusiveMinimumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMinimumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.maximumTimestamp) && !(value3.getTime() <= schema.maximumTimestamp)) {
    yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.minimumTimestamp) && !(value3.getTime() >= schema.minimumTimestamp)) {
    yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.multipleOfTimestamp) && !(value3.getTime() % schema.multipleOfTimestamp === 0)) {
    yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path, value3);
  }
}
function* FromFunction(schema, references, path, value3) {
  if (!IsFunction(value3))
    yield Create(ValueErrorType.Function, schema, path, value3);
}
function* FromInteger(schema, references, path, value3) {
  if (!IsInteger(value3))
    return yield Create(ValueErrorType.Integer, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.IntegerMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.IntegerMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value3);
  }
}
function* FromIntersect3(schema, references, path, value3) {
  for (const inner of schema.allOf) {
    const next = Visit4(inner, references, path, value3).next();
    if (!next.done) {
      yield Create(ValueErrorType.Intersect, schema, path, value3);
      yield next.value;
    }
  }
  if (schema.unevaluatedProperties === false) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        yield Create(ValueErrorType.IntersectUnevaluatedProperties, schema, `${path}/${valueKey}`, value3);
      }
    }
  }
  if (typeof schema.unevaluatedProperties === "object") {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        const next = Visit4(schema.unevaluatedProperties, references, `${path}/${valueKey}`, value3[valueKey]).next();
        if (!next.done)
          yield next.value;
      }
    }
  }
}
function* FromIterator(schema, references, path, value3) {
  if (!IsIterator(value3))
    yield Create(ValueErrorType.Iterator, schema, path, value3);
}
function* FromLiteral2(schema, references, path, value3) {
  if (!(value3 === schema.const))
    yield Create(ValueErrorType.Literal, schema, path, value3);
}
function* FromNever(schema, references, path, value3) {
  yield Create(ValueErrorType.Never, schema, path, value3);
}
function* FromNot(schema, references, path, value3) {
  if (Visit4(schema.not, references, path, value3).next().done === true)
    yield Create(ValueErrorType.Not, schema, path, value3);
}
function* FromNull(schema, references, path, value3) {
  if (!IsNull(value3))
    yield Create(ValueErrorType.Null, schema, path, value3);
}
function* FromNumber(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return yield Create(ValueErrorType.Number, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.NumberMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.NumberMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.NumberMultipleOf, schema, path, value3);
  }
}
function* FromObject(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  const unknownKeys = Object.getOwnPropertyNames(value3);
  for (const requiredKey of requiredKeys) {
    if (unknownKeys.includes(requiredKey))
      continue;
    yield Create(ValueErrorType.ObjectRequiredProperty, schema.properties[requiredKey], `${path}/${EscapeKey(requiredKey)}`, undefined);
  }
  if (schema.additionalProperties === false) {
    for (const valueKey of unknownKeys) {
      if (!knownKeys.includes(valueKey)) {
        yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(valueKey)}`, value3[valueKey]);
      }
    }
  }
  if (typeof schema.additionalProperties === "object") {
    for (const valueKey of unknownKeys) {
      if (knownKeys.includes(valueKey))
        continue;
      yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(valueKey)}`, value3[valueKey]);
    }
  }
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value3[knownKey]);
      if (ExtendsUndefinedCheck(schema) && !(knownKey in value3)) {
        yield Create(ValueErrorType.ObjectRequiredProperty, property, `${path}/${EscapeKey(knownKey)}`, undefined);
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey)) {
        yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value3[knownKey]);
      }
    }
  }
}
function* FromPromise(schema, references, path, value3) {
  if (!IsPromise(value3))
    yield Create(ValueErrorType.Promise, schema, path, value3);
}
function* FromRecord(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  for (const [propertyKey, propertyValue] of Object.entries(value3)) {
    if (regex.test(propertyKey))
      yield* Visit4(patternSchema, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
  }
  if (typeof schema.additionalProperties === "object") {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (!regex.test(propertyKey))
        yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
  if (schema.additionalProperties === false) {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (regex.test(propertyKey))
        continue;
      return yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
}
function* FromRef(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromRegExp(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  const regex = new RegExp(schema.source, schema.flags);
  if (!regex.test(value3)) {
    return yield Create(ValueErrorType.RegExp, schema, path, value3);
  }
}
function* FromString(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  if (IsString(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3)) {
      yield Create(ValueErrorType.StringPattern, schema, path, value3);
    }
  }
  if (IsString(schema.format)) {
    if (!exports_format.Has(schema.format)) {
      yield Create(ValueErrorType.StringFormatUnknown, schema, path, value3);
    } else {
      const format = exports_format.Get(schema.format);
      if (!format(value3)) {
        yield Create(ValueErrorType.StringFormat, schema, path, value3);
      }
    }
  }
}
function* FromSymbol(schema, references, path, value3) {
  if (!IsSymbol(value3))
    yield Create(ValueErrorType.Symbol, schema, path, value3);
}
function* FromTemplateLiteral2(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  const regex = new RegExp(schema.pattern);
  if (!regex.test(value3)) {
    yield Create(ValueErrorType.StringPattern, schema, path, value3);
  }
}
function* FromThis(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromTuple3(schema, references, path, value3) {
  if (!IsArray(value3))
    return yield Create(ValueErrorType.Tuple, schema, path, value3);
  if (schema.items === undefined && !(value3.length === 0)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!(value3.length === schema.maxItems)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!schema.items) {
    return;
  }
  for (let i = 0;i < schema.items.length; i++) {
    yield* Visit4(schema.items[i], references, `${path}/${i}`, value3[i]);
  }
}
function* FromUndefined(schema, references, path, value3) {
  if (!IsUndefined(value3))
    yield Create(ValueErrorType.Undefined, schema, path, value3);
}
function* FromUnion5(schema, references, path, value3) {
  let count = 0;
  for (const subschema of schema.anyOf) {
    const errors2 = [...Visit4(subschema, references, path, value3)];
    if (errors2.length === 0)
      return;
    count += errors2.length;
  }
  if (count > 0) {
    yield Create(ValueErrorType.Union, schema, path, value3);
  }
}
function* FromUint8Array(schema, references, path, value3) {
  if (!IsUint8Array(value3))
    return yield Create(ValueErrorType.Uint8Array, schema, path, value3);
  if (IsDefined(schema.maxByteLength) && !(value3.length <= schema.maxByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value3);
  }
  if (IsDefined(schema.minByteLength) && !(value3.length >= schema.minByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path, value3);
  }
}
function* FromUnknown(schema, references, path, value3) {
}
function* FromVoid(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsVoidLike(value3))
    yield Create(ValueErrorType.Void, schema, path, value3);
}
function* FromKind(schema, references, path, value3) {
  const check = exports_type.Get(schema[Kind]);
  if (!check(schema, value3))
    yield Create(ValueErrorType.Kind, schema, path, value3);
}
function* Visit4(schema, references, path, value3) {
  const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return yield* FromAny(schema_, references_, path, value3);
    case "Array":
      return yield* FromArray3(schema_, references_, path, value3);
    case "AsyncIterator":
      return yield* FromAsyncIterator(schema_, references_, path, value3);
    case "BigInt":
      return yield* FromBigInt(schema_, references_, path, value3);
    case "Boolean":
      return yield* FromBoolean(schema_, references_, path, value3);
    case "Constructor":
      return yield* FromConstructor(schema_, references_, path, value3);
    case "Date":
      return yield* FromDate(schema_, references_, path, value3);
    case "Function":
      return yield* FromFunction(schema_, references_, path, value3);
    case "Integer":
      return yield* FromInteger(schema_, references_, path, value3);
    case "Intersect":
      return yield* FromIntersect3(schema_, references_, path, value3);
    case "Iterator":
      return yield* FromIterator(schema_, references_, path, value3);
    case "Literal":
      return yield* FromLiteral2(schema_, references_, path, value3);
    case "Never":
      return yield* FromNever(schema_, references_, path, value3);
    case "Not":
      return yield* FromNot(schema_, references_, path, value3);
    case "Null":
      return yield* FromNull(schema_, references_, path, value3);
    case "Number":
      return yield* FromNumber(schema_, references_, path, value3);
    case "Object":
      return yield* FromObject(schema_, references_, path, value3);
    case "Promise":
      return yield* FromPromise(schema_, references_, path, value3);
    case "Record":
      return yield* FromRecord(schema_, references_, path, value3);
    case "Ref":
      return yield* FromRef(schema_, references_, path, value3);
    case "RegExp":
      return yield* FromRegExp(schema_, references_, path, value3);
    case "String":
      return yield* FromString(schema_, references_, path, value3);
    case "Symbol":
      return yield* FromSymbol(schema_, references_, path, value3);
    case "TemplateLiteral":
      return yield* FromTemplateLiteral2(schema_, references_, path, value3);
    case "This":
      return yield* FromThis(schema_, references_, path, value3);
    case "Tuple":
      return yield* FromTuple3(schema_, references_, path, value3);
    case "Undefined":
      return yield* FromUndefined(schema_, references_, path, value3);
    case "Union":
      return yield* FromUnion5(schema_, references_, path, value3);
    case "Uint8Array":
      return yield* FromUint8Array(schema_, references_, path, value3);
    case "Unknown":
      return yield* FromUnknown(schema_, references_, path, value3);
    case "Void":
      return yield* FromVoid(schema_, references_, path, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueErrorsUnknownTypeError(schema);
      return yield* FromKind(schema_, references_, path, value3);
  }
}
function Errors(...args) {
  const iterator3 = args.length === 3 ? Visit4(args[0], args[1], "", args[2]) : Visit4(args[0], [], "", args[1]);
  return new ValueErrorIterator(iterator3);
}
var ValueErrorType;
(function(ValueErrorType2) {
  ValueErrorType2[ValueErrorType2["ArrayContains"] = 0] = "ArrayContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 1] = "ArrayMaxContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
  ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 3] = "ArrayMinContains";
  ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 4] = "ArrayMinItems";
  ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 5] = "ArrayUniqueItems";
  ValueErrorType2[ValueErrorType2["Array"] = 6] = "Array";
  ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 8] = "BigIntExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 9] = "BigIntExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 10] = "BigIntMaximum";
  ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 11] = "BigIntMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 12] = "BigIntMultipleOf";
  ValueErrorType2[ValueErrorType2["BigInt"] = 13] = "BigInt";
  ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
  ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 15] = "DateExclusiveMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 17] = "DateMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMultipleOfTimestamp"] = 19] = "DateMultipleOfTimestamp";
  ValueErrorType2[ValueErrorType2["Date"] = 20] = "Date";
  ValueErrorType2[ValueErrorType2["Function"] = 21] = "Function";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 22] = "IntegerExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 24] = "IntegerMaximum";
  ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 26] = "IntegerMultipleOf";
  ValueErrorType2[ValueErrorType2["Integer"] = 27] = "Integer";
  ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
  ValueErrorType2[ValueErrorType2["Intersect"] = 29] = "Intersect";
  ValueErrorType2[ValueErrorType2["Iterator"] = 30] = "Iterator";
  ValueErrorType2[ValueErrorType2["Kind"] = 31] = "Kind";
  ValueErrorType2[ValueErrorType2["Literal"] = 32] = "Literal";
  ValueErrorType2[ValueErrorType2["Never"] = 33] = "Never";
  ValueErrorType2[ValueErrorType2["Not"] = 34] = "Not";
  ValueErrorType2[ValueErrorType2["Null"] = 35] = "Null";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 36] = "NumberExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 37] = "NumberExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["NumberMaximum"] = 38] = "NumberMaximum";
  ValueErrorType2[ValueErrorType2["NumberMinimum"] = 39] = "NumberMinimum";
  ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 40] = "NumberMultipleOf";
  ValueErrorType2[ValueErrorType2["Number"] = 41] = "Number";
  ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 42] = "ObjectAdditionalProperties";
  ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 43] = "ObjectMaxProperties";
  ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 44] = "ObjectMinProperties";
  ValueErrorType2[ValueErrorType2["ObjectRequiredProperty"] = 45] = "ObjectRequiredProperty";
  ValueErrorType2[ValueErrorType2["Object"] = 46] = "Object";
  ValueErrorType2[ValueErrorType2["Promise"] = 47] = "Promise";
  ValueErrorType2[ValueErrorType2["RegExp"] = 48] = "RegExp";
  ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 49] = "StringFormatUnknown";
  ValueErrorType2[ValueErrorType2["StringFormat"] = 50] = "StringFormat";
  ValueErrorType2[ValueErrorType2["StringMaxLength"] = 51] = "StringMaxLength";
  ValueErrorType2[ValueErrorType2["StringMinLength"] = 52] = "StringMinLength";
  ValueErrorType2[ValueErrorType2["StringPattern"] = 53] = "StringPattern";
  ValueErrorType2[ValueErrorType2["String"] = 54] = "String";
  ValueErrorType2[ValueErrorType2["Symbol"] = 55] = "Symbol";
  ValueErrorType2[ValueErrorType2["TupleLength"] = 56] = "TupleLength";
  ValueErrorType2[ValueErrorType2["Tuple"] = 57] = "Tuple";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 58] = "Uint8ArrayMaxByteLength";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 59] = "Uint8ArrayMinByteLength";
  ValueErrorType2[ValueErrorType2["Uint8Array"] = 60] = "Uint8Array";
  ValueErrorType2[ValueErrorType2["Undefined"] = 61] = "Undefined";
  ValueErrorType2[ValueErrorType2["Union"] = 62] = "Union";
  ValueErrorType2[ValueErrorType2["Void"] = 63] = "Void";
})(ValueErrorType || (ValueErrorType = {}));

class ValueErrorsUnknownTypeError extends TypeBoxError {
  schema;
  constructor(schema) {
    super("Unknown type");
    this.schema = schema;
  }
}

class ValueErrorIterator {
  iterator;
  constructor(iterator3) {
    this.iterator = iterator3;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  First() {
    const next = this.iterator.next();
    return next.done ? undefined : next.value;
  }
}
// node_modules/@sinclair/typebox/build/import/type/any/any.mjs
function Any(options = {}) {
  return { ...options, [Kind]: "Any" };
}
// node_modules/@sinclair/typebox/build/import/type/unknown/unknown.mjs
function Unknown(options = {}) {
  return {
    ...options,
    [Kind]: "Unknown"
  };
}
// node_modules/@sinclair/typebox/build/import/type/extends/extends-check.mjs
var IntoBooleanResult = function(result) {
  return result === ExtendsResult.False ? result : ExtendsResult.True;
};
var Throw = function(message) {
  throw new ExtendsResolverError(message);
};
var IsStructuralRight = function(right) {
  return exports_type2.IsNever(right) || exports_type2.IsIntersect(right) || exports_type2.IsUnion(right) || exports_type2.IsUnknown(right) || exports_type2.IsAny(right);
};
var StructuralRight = function(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : Throw("StructuralRight");
};
var FromAnyRight = function(left, right) {
  return ExtendsResult.True;
};
var FromAny2 = function(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) && right.anyOf.some((schema) => exports_type2.IsAny(schema) || exports_type2.IsUnknown(schema)) ? ExtendsResult.True : exports_type2.IsUnion(right) ? ExtendsResult.Union : exports_type2.IsUnknown(right) ? ExtendsResult.True : exports_type2.IsAny(right) ? ExtendsResult.True : ExtendsResult.Union;
};
var FromArrayRight = function(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromArray4 = function(left, right) {
  return exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsArray(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromAsyncIterator2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsAsyncIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromBigInt2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBigInt(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromBooleanRight = function(left, right) {
  return exports_type2.IsLiteralBoolean(left) ? ExtendsResult.True : exports_type2.IsBoolean(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromBoolean2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBoolean(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromConstructor2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsConstructor(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
};
var FromDate2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsDate(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromFunction2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsFunction(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
};
var FromIntegerRight = function(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsNumber(left.const) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromInteger2 = function(left, right) {
  return exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : ExtendsResult.False;
};
var FromIntersectRight = function(left, right) {
  return right.allOf.every((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromIntersect4 = function(left, right) {
  return left.allOf.some((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromIterator2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromLiteral3 = function(left, right) {
  return exports_type2.IsLiteral(right) && right.const === left.const ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : ExtendsResult.False;
};
var FromNeverRight = function(left, right) {
  return ExtendsResult.False;
};
var FromNever2 = function(left, right) {
  return ExtendsResult.True;
};
var UnwrapTNot = function(schema) {
  let [current, depth] = [schema, 0];
  while (true) {
    if (!exports_type2.IsNot(current))
      break;
    current = current.not;
    depth += 1;
  }
  return depth % 2 === 0 ? current : Unknown();
};
var FromNot2 = function(left, right) {
  return exports_type2.IsNot(left) ? Visit5(UnwrapTNot(left), right) : exports_type2.IsNot(right) ? Visit5(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
};
var FromNull2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsNull(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromNumberRight = function(left, right) {
  return exports_type2.IsLiteralNumber(left) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromNumber2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : ExtendsResult.False;
};
var IsObjectPropertyCount = function(schema, count) {
  return Object.getOwnPropertyNames(schema.properties).length === count;
};
var IsObjectStringLike = function(schema) {
  return IsObjectArrayLike(schema);
};
var IsObjectSymbolLike = function(schema) {
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && ("description" in schema.properties) && exports_type2.IsUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (exports_type2.IsString(schema.properties.description.anyOf[0]) && exports_type2.IsUndefined(schema.properties.description.anyOf[1]) || exports_type2.IsString(schema.properties.description.anyOf[1]) && exports_type2.IsUndefined(schema.properties.description.anyOf[0]));
};
var IsObjectNumberLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectBooleanLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectBigIntLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectDateLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectUint8ArrayLike = function(schema) {
  return IsObjectArrayLike(schema);
};
var IsObjectFunctionLike = function(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && ("length" in schema.properties) && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
};
var IsObjectConstructorLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectArrayLike = function(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && ("length" in schema.properties) && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
};
var IsObjectPromiseLike = function(schema) {
  const then = Function2([Any()], Any());
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && ("then" in schema.properties) && IntoBooleanResult(Visit5(schema.properties["then"], then)) === ExtendsResult.True;
};
var Property = function(left, right) {
  return Visit5(left, right) === ExtendsResult.False ? ExtendsResult.False : exports_type2.IsOptional(left) && !exports_type2.IsOptional(right) ? ExtendsResult.False : ExtendsResult.True;
};
var FromObjectRight = function(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) || exports_type2.IsLiteralString(left) && IsObjectStringLike(right) || exports_type2.IsLiteralNumber(left) && IsObjectNumberLike(right) || exports_type2.IsLiteralBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsBigInt(left) && IsObjectBigIntLike(right) || exports_type2.IsString(left) && IsObjectStringLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsNumber(left) && IsObjectNumberLike(right) || exports_type2.IsInteger(left) && IsObjectNumberLike(right) || exports_type2.IsBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsUint8Array(left) && IsObjectUint8ArrayLike(right) || exports_type2.IsDate(left) && IsObjectDateLike(right) || exports_type2.IsConstructor(left) && IsObjectConstructorLike(right) || exports_type2.IsFunction(left) && IsObjectFunctionLike(right) ? ExtendsResult.True : exports_type2.IsRecord(left) && exports_type2.IsString(RecordKey(left)) ? (() => {
    return right[Hint] === "Record" ? ExtendsResult.True : ExtendsResult.False;
  })() : exports_type2.IsRecord(left) && exports_type2.IsNumber(RecordKey(left)) ? (() => {
    return IsObjectPropertyCount(right, 0) ? ExtendsResult.True : ExtendsResult.False;
  })() : ExtendsResult.False;
};
var FromObject2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : !exports_type2.IsObject(right) ? ExtendsResult.False : (() => {
    for (const key of Object.getOwnPropertyNames(right.properties)) {
      if (!(key in left.properties) && !exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.False;
      }
      if (exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.True;
      }
      if (Property(left.properties[key], right.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })();
};
var FromPromise2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectPromiseLike(right) ? ExtendsResult.True : !exports_type2.IsPromise(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.item, right.item));
};
var RecordKey = function(schema) {
  return PatternNumberExact in schema.patternProperties ? Number2() : (PatternStringExact in schema.patternProperties) ? String2() : Throw("Unknown record key pattern");
};
var RecordValue = function(schema) {
  return PatternNumberExact in schema.patternProperties ? schema.patternProperties[PatternNumberExact] : (PatternStringExact in schema.patternProperties) ? schema.patternProperties[PatternStringExact] : Throw("Unable to get record value schema");
};
var FromRecordRight = function(left, right) {
  const [Key, Value] = [RecordKey(right), RecordValue(right)];
  return exports_type2.IsLiteralString(left) && exports_type2.IsNumber(Key) && IntoBooleanResult(Visit5(left, Value)) === ExtendsResult.True ? ExtendsResult.True : exports_type2.IsUint8Array(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsString(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsArray(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsObject(left) ? (() => {
    for (const key of Object.getOwnPropertyNames(left.properties)) {
      if (Property(Value, left.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })() : ExtendsResult.False;
};
var FromRecord2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsRecord(right) ? ExtendsResult.False : Visit5(RecordValue(left), RecordValue(right));
};
var FromRegExp2 = function(left, right) {
  const L = exports_type2.IsRegExp(left) ? String2() : left;
  const R = exports_type2.IsRegExp(right) ? String2() : right;
  return Visit5(L, R);
};
var FromStringRight = function(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsString(left.const) ? ExtendsResult.True : exports_type2.IsString(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromString2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromSymbol2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsSymbol(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromTemplateLiteral3 = function(left, right) {
  return exports_type2.IsTemplateLiteral(left) ? Visit5(TemplateLiteralToUnion(left), right) : exports_type2.IsTemplateLiteral(right) ? Visit5(left, TemplateLiteralToUnion(right)) : Throw("Invalid fallthrough for TemplateLiteral");
};
var IsArrayOfTuple = function(left, right) {
  return exports_type2.IsArray(right) && left.items !== undefined && left.items.every((schema) => Visit5(schema, right.items) === ExtendsResult.True);
};
var FromTupleRight = function(left, right) {
  return exports_type2.IsNever(left) ? ExtendsResult.True : exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : ExtendsResult.False;
};
var FromTuple4 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : exports_type2.IsArray(right) && IsArrayOfTuple(left, right) ? ExtendsResult.True : !exports_type2.IsTuple(right) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) || !exports_value.IsUndefined(left.items) && exports_value.IsUndefined(right.items) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) ? ExtendsResult.True : left.items.every((schema, index) => Visit5(schema, right.items[index]) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUint8Array2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsUint8Array(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUndefined2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsVoid(right) ? FromVoidRight(left, right) : exports_type2.IsUndefined(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnionRight = function(left, right) {
  return right.anyOf.some((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnion6 = function(left, right) {
  return left.anyOf.every((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnknownRight = function(left, right) {
  return ExtendsResult.True;
};
var FromUnknown2 = function(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : exports_type2.IsArray(right) ? FromArrayRight(left, right) : exports_type2.IsTuple(right) ? FromTupleRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsUnknown(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromVoidRight = function(left, right) {
  return exports_type2.IsUndefined(left) ? ExtendsResult.True : exports_type2.IsUndefined(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromVoid2 = function(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsVoid(right) ? ExtendsResult.True : ExtendsResult.False;
};
var Visit5 = function(left, right) {
  return exports_type2.IsTemplateLiteral(left) || exports_type2.IsTemplateLiteral(right) ? FromTemplateLiteral3(left, right) : exports_type2.IsRegExp(left) || exports_type2.IsRegExp(right) ? FromRegExp2(left, right) : exports_type2.IsNot(left) || exports_type2.IsNot(right) ? FromNot2(left, right) : exports_type2.IsAny(left) ? FromAny2(left, right) : exports_type2.IsArray(left) ? FromArray4(left, right) : exports_type2.IsBigInt(left) ? FromBigInt2(left, right) : exports_type2.IsBoolean(left) ? FromBoolean2(left, right) : exports_type2.IsAsyncIterator(left) ? FromAsyncIterator2(left, right) : exports_type2.IsConstructor(left) ? FromConstructor2(left, right) : exports_type2.IsDate(left) ? FromDate2(left, right) : exports_type2.IsFunction(left) ? FromFunction2(left, right) : exports_type2.IsInteger(left) ? FromInteger2(left, right) : exports_type2.IsIntersect(left) ? FromIntersect4(left, right) : exports_type2.IsIterator(left) ? FromIterator2(left, right) : exports_type2.IsLiteral(left) ? FromLiteral3(left, right) : exports_type2.IsNever(left) ? FromNever2(left, right) : exports_type2.IsNull(left) ? FromNull2(left, right) : exports_type2.IsNumber(left) ? FromNumber2(left, right) : exports_type2.IsObject(left) ? FromObject2(left, right) : exports_type2.IsRecord(left) ? FromRecord2(left, right) : exports_type2.IsString(left) ? FromString2(left, right) : exports_type2.IsSymbol(left) ? FromSymbol2(left, right) : exports_type2.IsTuple(left) ? FromTuple4(left, right) : exports_type2.IsPromise(left) ? FromPromise2(left, right) : exports_type2.IsUint8Array(left) ? FromUint8Array2(left, right) : exports_type2.IsUndefined(left) ? FromUndefined2(left, right) : exports_type2.IsUnion(left) ? FromUnion6(left, right) : exports_type2.IsUnknown(left) ? FromUnknown2(left, right) : exports_type2.IsVoid(left) ? FromVoid2(left, right) : Throw(`Unknown left type operand '${left[Kind]}'`);
};
function ExtendsCheck(left, right) {
  return Visit5(left, right);
}

class ExtendsResolverError extends TypeBoxError {
}
var ExtendsResult;
(function(ExtendsResult2) {
  ExtendsResult2[ExtendsResult2["Union"] = 0] = "Union";
  ExtendsResult2[ExtendsResult2["True"] = 1] = "True";
  ExtendsResult2[ExtendsResult2["False"] = 2] = "False";
})(ExtendsResult || (ExtendsResult = {}));
// node_modules/@sinclair/typebox/build/import/type/extends/extends-from-mapped-result.mjs
var FromProperties7 = function(P, Right, True, False, options) {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Extends(P[K2], Right, True, False, options) };
  }, {});
};
var FromMappedResult6 = function(Left, Right, True, False, options) {
  return FromProperties7(Left.properties, Right, True, False, options);
};
function ExtendsFromMappedResult(Left, Right, True, False, options) {
  const P = FromMappedResult6(Left, Right, True, False, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/import/type/extends/extends.mjs
var ExtendsResolve = function(left, right, trueType, falseType) {
  const R = ExtendsCheck(left, right);
  return R === ExtendsResult.Union ? Union([trueType, falseType]) : R === ExtendsResult.True ? trueType : falseType;
};
function Extends(L, R, T, F, options = {}) {
  return IsMappedResult(L) ? ExtendsFromMappedResult(L, R, T, F, options) : IsMappedKey(L) ? CloneType(ExtendsFromMappedKey(L, R, T, F, options)) : CloneType(ExtendsResolve(L, R, T, F), options);
}

// node_modules/@sinclair/typebox/build/import/type/extends/extends-from-mapped-key.mjs
var FromPropertyKey = function(K, U, L, R, options) {
  return {
    [K]: Extends(Literal(K), U, L, R, options)
  };
};
var FromPropertyKeys = function(K, U, L, R, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey(LK, U, L, R, options) };
  }, {});
};
var FromMappedKey2 = function(K, U, L, R, options) {
  return FromPropertyKeys(K.keys, U, L, R, options);
};
function ExtendsFromMappedKey(T, U, L, R, options) {
  const P = FromMappedKey2(T, U, L, R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/value/check/check.mjs
var IsAnyOrUnknown = function(schema) {
  return schema[Kind] === "Any" || schema[Kind] === "Unknown";
};
var IsDefined2 = function(value3) {
  return value3 !== undefined;
};
var FromAny3 = function(schema, references, value3) {
  return true;
};
var FromArray5 = function(schema, references, value3) {
  if (!IsArray(value3))
    return false;
  if (IsDefined2(schema.minItems) && !(value3.length >= schema.minItems)) {
    return false;
  }
  if (IsDefined2(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    return false;
  }
  if (!value3.every((value4) => Visit6(schema.items, references, value4))) {
    return false;
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = new Set;
    for (const element of value3) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    return false;
  }
  if (!(IsDefined2(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
    return true;
  }
  const containsSchema = IsDefined2(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce((acc, value4) => Visit6(containsSchema, references, value4) ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    return false;
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    return false;
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    return false;
  }
  return true;
};
var FromAsyncIterator3 = function(schema, references, value3) {
  return IsAsyncIterator(value3);
};
var FromBigInt3 = function(schema, references, value3) {
  if (!IsBigInt(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === BigInt(0))) {
    return false;
  }
  return true;
};
var FromBoolean3 = function(schema, references, value3) {
  return IsBoolean(value3);
};
var FromConstructor3 = function(schema, references, value3) {
  return Visit6(schema.returns, references, value3.prototype);
};
var FromDate3 = function(schema, references, value3) {
  if (!IsDate(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximumTimestamp) && !(value3.getTime() < schema.exclusiveMaximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimumTimestamp) && !(value3.getTime() > schema.exclusiveMinimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.maximumTimestamp) && !(value3.getTime() <= schema.maximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.minimumTimestamp) && !(value3.getTime() >= schema.minimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.multipleOfTimestamp) && !(value3.getTime() % schema.multipleOfTimestamp === 0)) {
    return false;
  }
  return true;
};
var FromFunction3 = function(schema, references, value3) {
  return IsFunction(value3);
};
var FromInteger3 = function(schema, references, value3) {
  if (!IsInteger(value3)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
};
var FromIntersect5 = function(schema, references, value3) {
  const check1 = schema.allOf.every((schema2) => Visit6(schema2, references, value3));
  if (schema.unevaluatedProperties === false) {
    const keyPattern = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) => keyPattern.test(key));
    return check1 && check2;
  } else if (IsSchema(schema.unevaluatedProperties)) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) => keyCheck.test(key) || Visit6(schema.unevaluatedProperties, references, value3[key]));
    return check1 && check2;
  } else {
    return check1;
  }
};
var FromIterator3 = function(schema, references, value3) {
  return IsIterator(value3);
};
var FromLiteral4 = function(schema, references, value3) {
  return value3 === schema.const;
};
var FromNever3 = function(schema, references, value3) {
  return false;
};
var FromNot3 = function(schema, references, value3) {
  return !Visit6(schema.not, references, value3);
};
var FromNull3 = function(schema, references, value3) {
  return IsNull(value3);
};
var FromNumber3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
};
var FromObject3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return false;
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    return false;
  }
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      if (!Visit6(property, references, value3[knownKey])) {
        return false;
      }
      if ((ExtendsUndefinedCheck(property) || IsAnyOrUnknown(property)) && !(knownKey in value3)) {
        return false;
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey) && !Visit6(property, references, value3[knownKey])) {
        return false;
      }
    }
  }
  if (schema.additionalProperties === false) {
    const valueKeys = Object.getOwnPropertyNames(value3);
    if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
      return true;
    } else {
      return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
    }
  } else if (typeof schema.additionalProperties === "object") {
    const valueKeys = Object.getOwnPropertyNames(value3);
    return valueKeys.every((key) => knownKeys.includes(key) || Visit6(schema.additionalProperties, references, value3[key]));
  } else {
    return true;
  }
};
var FromPromise3 = function(schema, references, value3) {
  return IsPromise(value3);
};
var FromRecord3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3)) {
    return false;
  }
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    return false;
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  const check1 = Object.entries(value3).every(([key, value4]) => {
    return regex.test(key) ? Visit6(patternSchema, references, value4) : true;
  });
  const check2 = typeof schema.additionalProperties === "object" ? Object.entries(value3).every(([key, value4]) => {
    return !regex.test(key) ? Visit6(schema.additionalProperties, references, value4) : true;
  }) : true;
  const check3 = schema.additionalProperties === false ? Object.getOwnPropertyNames(value3).every((key) => {
    return regex.test(key);
  }) : true;
  return check1 && check2 && check3;
};
var FromRef2 = function(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
};
var FromRegExp3 = function(schema, references, value3) {
  const regex = new RegExp(schema.source, schema.flags);
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength))
      return false;
  }
  return regex.test(value3);
};
var FromString3 = function(schema, references, value3) {
  if (!IsString(value3)) {
    return false;
  }
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength))
      return false;
  }
  if (IsDefined2(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3))
      return false;
  }
  if (IsDefined2(schema.format)) {
    if (!exports_format.Has(schema.format))
      return false;
    const func = exports_format.Get(schema.format);
    return func(value3);
  }
  return true;
};
var FromSymbol3 = function(schema, references, value3) {
  return IsSymbol(value3);
};
var FromTemplateLiteral4 = function(schema, references, value3) {
  return IsString(value3) && new RegExp(schema.pattern).test(value3);
};
var FromThis2 = function(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
};
var FromTuple5 = function(schema, references, value3) {
  if (!IsArray(value3)) {
    return false;
  }
  if (schema.items === undefined && !(value3.length === 0)) {
    return false;
  }
  if (!(value3.length === schema.maxItems)) {
    return false;
  }
  if (!schema.items) {
    return true;
  }
  for (let i = 0;i < schema.items.length; i++) {
    if (!Visit6(schema.items[i], references, value3[i]))
      return false;
  }
  return true;
};
var FromUndefined3 = function(schema, references, value3) {
  return IsUndefined(value3);
};
var FromUnion7 = function(schema, references, value3) {
  return schema.anyOf.some((inner) => Visit6(inner, references, value3));
};
var FromUint8Array3 = function(schema, references, value3) {
  if (!IsUint8Array(value3)) {
    return false;
  }
  if (IsDefined2(schema.maxByteLength) && !(value3.length <= schema.maxByteLength)) {
    return false;
  }
  if (IsDefined2(schema.minByteLength) && !(value3.length >= schema.minByteLength)) {
    return false;
  }
  return true;
};
var FromUnknown3 = function(schema, references, value3) {
  return true;
};
var FromVoid3 = function(schema, references, value3) {
  return TypeSystemPolicy.IsVoidLike(value3);
};
var FromKind2 = function(schema, references, value3) {
  if (!exports_type.Has(schema[Kind]))
    return false;
  const func = exports_type.Get(schema[Kind]);
  return func(schema, value3);
};
var Visit6 = function(schema, references, value3) {
  const references_ = IsDefined2(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny3(schema_, references_, value3);
    case "Array":
      return FromArray5(schema_, references_, value3);
    case "AsyncIterator":
      return FromAsyncIterator3(schema_, references_, value3);
    case "BigInt":
      return FromBigInt3(schema_, references_, value3);
    case "Boolean":
      return FromBoolean3(schema_, references_, value3);
    case "Constructor":
      return FromConstructor3(schema_, references_, value3);
    case "Date":
      return FromDate3(schema_, references_, value3);
    case "Function":
      return FromFunction3(schema_, references_, value3);
    case "Integer":
      return FromInteger3(schema_, references_, value3);
    case "Intersect":
      return FromIntersect5(schema_, references_, value3);
    case "Iterator":
      return FromIterator3(schema_, references_, value3);
    case "Literal":
      return FromLiteral4(schema_, references_, value3);
    case "Never":
      return FromNever3(schema_, references_, value3);
    case "Not":
      return FromNot3(schema_, references_, value3);
    case "Null":
      return FromNull3(schema_, references_, value3);
    case "Number":
      return FromNumber3(schema_, references_, value3);
    case "Object":
      return FromObject3(schema_, references_, value3);
    case "Promise":
      return FromPromise3(schema_, references_, value3);
    case "Record":
      return FromRecord3(schema_, references_, value3);
    case "Ref":
      return FromRef2(schema_, references_, value3);
    case "RegExp":
      return FromRegExp3(schema_, references_, value3);
    case "String":
      return FromString3(schema_, references_, value3);
    case "Symbol":
      return FromSymbol3(schema_, references_, value3);
    case "TemplateLiteral":
      return FromTemplateLiteral4(schema_, references_, value3);
    case "This":
      return FromThis2(schema_, references_, value3);
    case "Tuple":
      return FromTuple5(schema_, references_, value3);
    case "Undefined":
      return FromUndefined3(schema_, references_, value3);
    case "Union":
      return FromUnion7(schema_, references_, value3);
    case "Uint8Array":
      return FromUint8Array3(schema_, references_, value3);
    case "Unknown":
      return FromUnknown3(schema_, references_, value3);
    case "Void":
      return FromVoid3(schema_, references_, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCheckUnknownTypeError(schema_);
      return FromKind2(schema_, references_, value3);
  }
};
function Check(...args) {
  return args.length === 3 ? Visit6(args[0], args[1], args[2]) : Visit6(args[0], [], args[1]);
}

class ValueCheckUnknownTypeError extends TypeBoxError {
  schema;
  constructor(schema) {
    super(`Unknown type`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/import/value/clone/clone.mjs
var ObjectType3 = function(value3) {
  const keys = [...Object.getOwnPropertyNames(value3), ...Object.getOwnPropertySymbols(value3)];
  return keys.reduce((acc, key) => ({ ...acc, [key]: Clone2(value3[key]) }), {});
};
var ArrayType3 = function(value3) {
  return value3.map((element) => Clone2(element));
};
var TypedArrayType = function(value3) {
  return value3.slice();
};
var DateType3 = function(value3) {
  return new Date(value3.toISOString());
};
var ValueType = function(value3) {
  return value3;
};
function Clone2(value3) {
  if (IsArray(value3))
    return ArrayType3(value3);
  if (IsDate(value3))
    return DateType3(value3);
  if (IsStandardObject(value3))
    return ObjectType3(value3);
  if (IsTypedArray(value3))
    return TypedArrayType(value3);
  if (IsValueType(value3))
    return ValueType(value3);
  throw new Error("ValueClone: Unable to clone value");
}
// node_modules/@sinclair/typebox/build/import/value/create/create.mjs
var FromDefault = function(value3) {
  return typeof value3 === "function" ? value3 : Clone2(value3);
};
var FromAny4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
};
var FromArray6 = function(schema, references) {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the uniqueItems constraint requires a default value");
  } else if (("contains" in schema) && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the contains constraint requires a default value");
  } else if ("default" in schema) {
    return FromDefault(schema.default);
  } else if (schema.minItems !== undefined) {
    return Array.from({ length: schema.minItems }).map((item) => {
      return Visit7(schema.items, references);
    });
  } else {
    return [];
  }
};
var FromAsyncIterator4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return async function* () {
    }();
  }
};
var FromBigInt4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return BigInt(0);
  }
};
var FromBoolean4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return false;
  }
};
var FromConstructor4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value3 = Visit7(schema.returns, references);
    if (typeof value3 === "object" && !Array.isArray(value3)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value3)) {
            const self = this;
            self[key] = val;
          }
        }
      };
    } else {
      return class {
      };
    }
  }
};
var FromDate4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimumTimestamp !== undefined) {
    return new Date(schema.minimumTimestamp);
  } else {
    return new Date;
  }
};
var FromFunction4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return () => Visit7(schema.returns, references);
  }
};
var FromInteger4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
};
var FromIntersect6 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value3 = schema.allOf.reduce((acc, schema2) => {
      const next = Visit7(schema2, references);
      return typeof next === "object" ? { ...acc, ...next } : next;
    }, {});
    if (!Check(schema, references, value3))
      throw new ValueCreateError(schema, "Intersect produced invalid value. Consider using a default value.");
    return value3;
  }
};
var FromIterator4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return function* () {
    }();
  }
};
var FromLiteral5 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return schema.const;
  }
};
var FromNever4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Never types cannot be created. Consider using a default value.");
  }
};
var FromNot4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Not types must have a default value");
  }
};
var FromNull4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return null;
  }
};
var FromNumber4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
};
var FromObject4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const required = new Set(schema.required);
    return FromDefault(schema.default) || Object.entries(schema.properties).reduce((acc, [key, schema2]) => {
      return required.has(key) ? { ...acc, [key]: Visit7(schema2, references) } : { ...acc };
    }, {});
  }
};
var FromPromise4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Promise.resolve(Visit7(schema.item, references));
  }
};
var FromRecord4 = function(schema, references) {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (!(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
    return propertyKeys.reduce((acc, key) => {
      return { ...acc, [key]: Visit7(valueSchema, references) };
    }, {});
  } else {
    return {};
  }
};
var FromRef3 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
};
var FromRegExp4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "RegExp types cannot be created. Consider using a default value.");
  }
};
var FromString4 = function(schema, references) {
  if (schema.pattern !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with patterns must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else if (schema.format !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with formats must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else {
    if (HasPropertyKey(schema, "default")) {
      return FromDefault(schema.default);
    } else if (schema.minLength !== undefined) {
      return Array.from({ length: schema.minLength }).map(() => " ").join("");
    } else {
      return "";
    }
  }
};
var FromSymbol4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if ("value" in schema) {
    return Symbol.for(schema.value);
  } else {
    return Symbol();
  }
};
var FromTemplateLiteral5 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(schema, "Can only create template literals that produce a finite variants. Consider using a default value.");
  const generated = TemplateLiteralGenerate(schema);
  return generated[0];
};
var FromThis3 = function(schema, references) {
  if (recursiveDepth++ > recursiveMaxDepth)
    throw new ValueCreateError(schema, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
};
var FromTuple6 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (schema.items === undefined) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) => Visit7(schema.items[index], references));
  }
};
var FromUndefined4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
};
var FromUnion8 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.anyOf.length === 0) {
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  } else {
    return Visit7(schema.anyOf[0], references);
  }
};
var FromUint8Array4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minByteLength !== undefined) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
};
var FromUnknown4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
};
var FromVoid4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
};
var FromKind3 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new Error("User defined types must specify a default value");
  }
};
var Visit7 = function(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny4(schema_, references_);
    case "Array":
      return FromArray6(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator4(schema_, references_);
    case "BigInt":
      return FromBigInt4(schema_, references_);
    case "Boolean":
      return FromBoolean4(schema_, references_);
    case "Constructor":
      return FromConstructor4(schema_, references_);
    case "Date":
      return FromDate4(schema_, references_);
    case "Function":
      return FromFunction4(schema_, references_);
    case "Integer":
      return FromInteger4(schema_, references_);
    case "Intersect":
      return FromIntersect6(schema_, references_);
    case "Iterator":
      return FromIterator4(schema_, references_);
    case "Literal":
      return FromLiteral5(schema_, references_);
    case "Never":
      return FromNever4(schema_, references_);
    case "Not":
      return FromNot4(schema_, references_);
    case "Null":
      return FromNull4(schema_, references_);
    case "Number":
      return FromNumber4(schema_, references_);
    case "Object":
      return FromObject4(schema_, references_);
    case "Promise":
      return FromPromise4(schema_, references_);
    case "Record":
      return FromRecord4(schema_, references_);
    case "Ref":
      return FromRef3(schema_, references_);
    case "RegExp":
      return FromRegExp4(schema_, references_);
    case "String":
      return FromString4(schema_, references_);
    case "Symbol":
      return FromSymbol4(schema_, references_);
    case "TemplateLiteral":
      return FromTemplateLiteral5(schema_, references_);
    case "This":
      return FromThis3(schema_, references_);
    case "Tuple":
      return FromTuple6(schema_, references_);
    case "Undefined":
      return FromUndefined4(schema_, references_);
    case "Union":
      return FromUnion8(schema_, references_);
    case "Uint8Array":
      return FromUint8Array4(schema_, references_);
    case "Unknown":
      return FromUnknown4(schema_, references_);
    case "Void":
      return FromVoid4(schema_, references_);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCreateError(schema_, "Unknown type");
      return FromKind3(schema_, references_);
  }
};
function Create2(...args) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit7(args[0], args[1]) : Visit7(args[0], []);
}

class ValueCreateError extends TypeBoxError {
  schema;
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
var recursiveMaxDepth = 512;
var recursiveDepth = 0;
// node_modules/@sinclair/typebox/build/import/value/cast/cast.mjs
var ScoreUnion = function(schema, references, value3) {
  if (schema[Kind] === "Object" && typeof value3 === "object" && !IsNull(value3)) {
    const object3 = schema;
    const keys = Object.getOwnPropertyNames(value3);
    const entries = Object.entries(object3.properties);
    const [point, max] = [1 / entries.length, entries.length];
    return entries.reduce((acc, [key, schema2]) => {
      const literal7 = schema2[Kind] === "Literal" && schema2.const === value3[key] ? max : 0;
      const checks = Check(schema2, references, value3[key]) ? point : 0;
      const exists = keys.includes(key) ? point : 0;
      return acc + (literal7 + checks + exists);
    }, 0);
  } else {
    return Check(schema, references, value3) ? 1 : 0;
  }
};
var SelectUnion = function(union9, references, value3) {
  let [select, best] = [union9.anyOf[0], 0];
  for (const schema of union9.anyOf) {
    const score = ScoreUnion(schema, references, value3);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
};
var CastUnion = function(union9, references, value3) {
  if ("default" in union9) {
    return typeof value3 === "function" ? union9.default : Clone2(union9.default);
  } else {
    const schema = SelectUnion(union9, references, value3);
    return Cast(schema, references, value3);
  }
};
var DefaultClone = function(schema, references, value3) {
  return Check(schema, references, value3) ? Clone2(value3) : Create2(schema, references);
};
var Default = function(schema, references, value3) {
  return Check(schema, references, value3) ? value3 : Create2(schema, references);
};
var FromArray7 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  const created = IsArray(value3) ? Clone2(value3) : Create2(schema, references);
  const minimum = IsNumber(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
  const maximum = IsNumber(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
  const casted = maximum.map((value4) => Visit8(schema.items, references, value4));
  if (schema.uniqueItems !== true)
    return casted;
  const unique = [...new Set(casted)];
  if (!Check(schema, references, unique))
    throw new ValueCastError(schema, "Array cast produced invalid data due to uniqueItems constraint");
  return unique;
};
var FromConstructor5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Create2(schema, references);
  const required = new Set(schema.returns.required || []);
  const result = function() {
  };
  for (const [key, property] of Object.entries(schema.returns.properties)) {
    if (!required.has(key) && value3.prototype[key] === undefined)
      continue;
    result.prototype[key] = Visit8(property, references, value3.prototype[key]);
  }
  return result;
};
var FromIntersect7 = function(schema, references, value3) {
  const created = Create2(schema, references);
  const mapped9 = IsStandardObject(created) && IsStandardObject(value3) ? { ...created, ...value3 } : value3;
  return Check(schema, references, mapped9) ? mapped9 : Create2(schema, references);
};
var FromNever5 = function(schema, references, value3) {
  throw new ValueCastError(schema, "Never types cannot be cast");
};
var FromObject5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return value3;
  if (value3 === null || typeof value3 !== "object")
    return Create2(schema, references);
  const required = new Set(schema.required || []);
  const result = {};
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!required.has(key) && value3[key] === undefined)
      continue;
    result[key] = Visit8(property, references, value3[key]);
  }
  if (typeof schema.additionalProperties === "object") {
    const propertyNames = Object.getOwnPropertyNames(schema.properties);
    for (const propertyName of Object.getOwnPropertyNames(value3)) {
      if (propertyNames.includes(propertyName))
        continue;
      result[propertyName] = Visit8(schema.additionalProperties, references, value3[propertyName]);
    }
  }
  return result;
};
var FromRecord5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  if (value3 === null || typeof value3 !== "object" || Array.isArray(value3) || value3 instanceof Date)
    return Create2(schema, references);
  const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const subschema = schema.patternProperties[subschemaPropertyName];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit8(subschema, references, propValue);
  }
  return result;
};
var FromRef4 = function(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
};
var FromThis4 = function(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
};
var FromTuple7 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  if (!IsArray(value3))
    return Create2(schema, references);
  if (schema.items === undefined)
    return [];
  return schema.items.map((schema2, index) => Visit8(schema2, references, value3[index]));
};
var FromUnion9 = function(schema, references, value3) {
  return Check(schema, references, value3) ? Clone2(value3) : CastUnion(schema, references, value3);
};
var Visit8 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray7(schema_, references_, value3);
    case "Constructor":
      return FromConstructor5(schema_, references_, value3);
    case "Intersect":
      return FromIntersect7(schema_, references_, value3);
    case "Never":
      return FromNever5(schema_, references_, value3);
    case "Object":
      return FromObject5(schema_, references_, value3);
    case "Record":
      return FromRecord5(schema_, references_, value3);
    case "Ref":
      return FromRef4(schema_, references_, value3);
    case "This":
      return FromThis4(schema_, references_, value3);
    case "Tuple":
      return FromTuple7(schema_, references_, value3);
    case "Union":
      return FromUnion9(schema_, references_, value3);
    case "Date":
    case "Symbol":
    case "Uint8Array":
      return DefaultClone(schema, references, value3);
    default:
      return Default(schema_, references_, value3);
  }
};
function Cast(...args) {
  return args.length === 3 ? Visit8(args[0], args[1], args[2]) : Visit8(args[0], [], args[1]);
}

class ValueCastError extends TypeBoxError {
  schema;
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/import/value/clean/clean.mjs
var IsCheckable = function(schema) {
  return IsSchema(schema) && schema[Kind] !== "Unsafe";
};
var FromArray8 = function(schema, references, value3) {
  if (!IsArray(value3))
    return value3;
  return value3.map((value4) => Visit9(schema.items, references, value4));
};
var FromIntersect8 = function(schema, references, value3) {
  const unevaluatedProperties = schema.unevaluatedProperties;
  const intersections = schema.allOf.map((schema2) => Visit9(schema2, references, Clone2(value3)));
  const composite = intersections.reduce((acc, value4) => IsObject(value4) ? { ...acc, ...value4 } : value4, {});
  if (!IsObject(value3) || !IsObject(composite) || !IsSchema(unevaluatedProperties))
    return composite;
  const knownkeys = KeyOfPropertyKeys(schema);
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (knownkeys.includes(key))
      continue;
    if (Check(unevaluatedProperties, references, value3[key])) {
      composite[key] = Visit9(unevaluatedProperties, references, value3[key]);
    }
  }
  return composite;
};
var FromObject6 = function(schema, references, value3) {
  if (!IsObject(value3) || IsArray(value3))
    return value3;
  const additionalProperties = schema.additionalProperties;
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (key in schema.properties) {
      value3[key] = Visit9(schema.properties[key], references, value3[key]);
      continue;
    }
    if (IsSchema(additionalProperties) && Check(additionalProperties, references, value3[key])) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
};
var FromRecord6 = function(schema, references, value3) {
  if (!IsObject(value3))
    return value3;
  const additionalProperties = schema.additionalProperties;
  const propertyKeys = Object.keys(value3);
  const [propertyKey, propertySchema] = Object.entries(schema.patternProperties)[0];
  const propertyKeyTest = new RegExp(propertyKey);
  for (const key of propertyKeys) {
    if (propertyKeyTest.test(key)) {
      value3[key] = Visit9(propertySchema, references, value3[key]);
      continue;
    }
    if (IsSchema(additionalProperties) && Check(additionalProperties, references, value3[key])) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
};
var FromRef5 = function(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
};
var FromThis5 = function(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
};
var FromTuple8 = function(schema, references, value3) {
  if (!IsArray(value3))
    return value3;
  if (IsUndefined(schema.items))
    return [];
  const length = Math.min(value3.length, schema.items.length);
  for (let i = 0;i < length; i++) {
    value3[i] = Visit9(schema.items[i], references, value3[i]);
  }
  return value3.length > length ? value3.slice(0, length) : value3;
};
var FromUnion10 = function(schema, references, value3) {
  for (const inner of schema.anyOf) {
    if (IsCheckable(inner) && Check(inner, value3)) {
      return Visit9(inner, references, value3);
    }
  }
  return value3;
};
var Visit9 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray8(schema_, references_, value3);
    case "Intersect":
      return FromIntersect8(schema_, references_, value3);
    case "Object":
      return FromObject6(schema_, references_, value3);
    case "Record":
      return FromRecord6(schema_, references_, value3);
    case "Ref":
      return FromRef5(schema_, references_, value3);
    case "This":
      return FromThis5(schema_, references_, value3);
    case "Tuple":
      return FromTuple8(schema_, references_, value3);
    case "Union":
      return FromUnion10(schema_, references_, value3);
    default:
      return value3;
  }
};
function Clean(...args) {
  return args.length === 3 ? Visit9(args[0], args[1], args[2]) : Visit9(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/import/type/composite/composite.mjs
var CompositeKeys = function(T) {
  return T.reduce((Acc, L) => {
    return SetDistinct([...Acc, ...KeyOfPropertyKeys(L)]);
  }, []);
};
var FilterNever = function(T) {
  return T.filter((L) => !IsNever(L));
};
var CompositeProperty = function(T, K) {
  return T.reduce((Acc, L) => {
    return FilterNever([...Acc, ...IndexFromPropertyKeys(L, [K])]);
  }, []);
};
var CompositeProperties = function(T, K) {
  return K.reduce((Acc, L) => {
    return { ...Acc, [L]: IntersectEvaluated(CompositeProperty(T, L)) };
  }, {});
};
function Composite(T, options = {}) {
  const K = CompositeKeys(T);
  const P = CompositeProperties(T, K);
  const R = Object2(P, options);
  return R;
}
// node_modules/@sinclair/typebox/build/import/value/convert/convert.mjs
var IsStringNumeric = function(value3) {
  return IsString(value3) && !isNaN(value3) && !isNaN(parseFloat(value3));
};
var IsValueToString = function(value3) {
  return IsBigInt(value3) || IsBoolean(value3) || IsNumber(value3);
};
var IsValueTrue = function(value3) {
  return value3 === true || IsNumber(value3) && value3 === 1 || IsBigInt(value3) && value3 === BigInt("1") || IsString(value3) && (value3.toLowerCase() === "true" || value3 === "1");
};
var IsValueFalse = function(value3) {
  return value3 === false || IsNumber(value3) && (value3 === 0 || Object.is(value3, -0)) || IsBigInt(value3) && value3 === BigInt("0") || IsString(value3) && (value3.toLowerCase() === "false" || value3 === "0" || value3 === "-0");
};
var IsTimeStringWithTimeZone = function(value3) {
  return IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value3);
};
var IsTimeStringWithoutTimeZone = function(value3) {
  return IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3);
};
var IsDateTimeStringWithTimeZone = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value3);
};
var IsDateTimeStringWithoutTimeZone = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3);
};
var IsDateString = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value3);
};
var TryConvertLiteralString = function(value3, target) {
  const conversion = TryConvertString(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteralNumber = function(value3, target) {
  const conversion = TryConvertNumber(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteralBoolean = function(value3, target) {
  const conversion = TryConvertBoolean(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteral = function(schema, value3) {
  return IsString(schema.const) ? TryConvertLiteralString(value3, schema.const) : IsNumber(schema.const) ? TryConvertLiteralNumber(value3, schema.const) : IsBoolean(schema.const) ? TryConvertLiteralBoolean(value3, schema.const) : Clone2(value3);
};
var TryConvertBoolean = function(value3) {
  return IsValueTrue(value3) ? true : IsValueFalse(value3) ? false : value3;
};
var TryConvertBigInt = function(value3) {
  return IsStringNumeric(value3) ? BigInt(parseInt(value3)) : IsNumber(value3) ? BigInt(value3 | 0) : IsValueFalse(value3) ? BigInt(0) : IsValueTrue(value3) ? BigInt(1) : value3;
};
var TryConvertString = function(value3) {
  return IsValueToString(value3) ? value3.toString() : IsSymbol(value3) && value3.description !== undefined ? value3.description.toString() : value3;
};
var TryConvertNumber = function(value3) {
  return IsStringNumeric(value3) ? parseFloat(value3) : IsValueTrue(value3) ? 1 : IsValueFalse(value3) ? 0 : value3;
};
var TryConvertInteger = function(value3) {
  return IsStringNumeric(value3) ? parseInt(value3) : IsNumber(value3) ? value3 | 0 : IsValueTrue(value3) ? 1 : IsValueFalse(value3) ? 0 : value3;
};
var TryConvertNull = function(value3) {
  return IsString(value3) && value3.toLowerCase() === "null" ? null : value3;
};
var TryConvertUndefined = function(value3) {
  return IsString(value3) && value3 === "undefined" ? undefined : value3;
};
var TryConvertDate = function(value3) {
  return IsDate(value3) ? value3 : IsNumber(value3) ? new Date(value3) : IsValueTrue(value3) ? new Date(1) : IsValueFalse(value3) ? new Date(0) : IsStringNumeric(value3) ? new Date(parseInt(value3)) : IsTimeStringWithoutTimeZone(value3) ? new Date(`1970-01-01T${value3}.000Z`) : IsTimeStringWithTimeZone(value3) ? new Date(`1970-01-01T${value3}`) : IsDateTimeStringWithoutTimeZone(value3) ? new Date(`${value3}.000Z`) : IsDateTimeStringWithTimeZone(value3) ? new Date(value3) : IsDateString(value3) ? new Date(`${value3}T00:00:00.000Z`) : value3;
};
var Default2 = function(value3) {
  return value3;
};
var FromArray9 = function(schema, references, value3) {
  if (IsArray(value3)) {
    return value3.map((value4) => Visit10(schema.items, references, value4));
  }
  return value3;
};
var FromBigInt5 = function(schema, references, value3) {
  return TryConvertBigInt(value3);
};
var FromBoolean5 = function(schema, references, value3) {
  return TryConvertBoolean(value3);
};
var FromDate5 = function(schema, references, value3) {
  return TryConvertDate(value3);
};
var FromInteger5 = function(schema, references, value3) {
  return TryConvertInteger(value3);
};
var FromIntersect9 = function(schema, references, value3) {
  const allObjects = schema.allOf.every((schema2) => IsObject3(schema2));
  if (allObjects)
    return Visit10(Composite(schema.allOf), references, value3);
  return Visit10(schema.allOf[0], references, value3);
};
var FromLiteral6 = function(schema, references, value3) {
  return TryConvertLiteral(schema, value3);
};
var FromNull5 = function(schema, references, value3) {
  return TryConvertNull(value3);
};
var FromNumber5 = function(schema, references, value3) {
  return TryConvertNumber(value3);
};
var FromObject7 = function(schema, references, value3) {
  const isConvertable = IsObject(value3);
  if (!isConvertable)
    return value3;
  return Object.getOwnPropertyNames(schema.properties).reduce((value4, key) => {
    return !IsUndefined(value4[key]) ? { ...value4, [key]: Visit10(schema.properties[key], references, value4[key]) } : { ...value4 };
  }, value3);
};
var FromRecord7 = function(schema, references, value3) {
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[propertyKey];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit10(property, references, propValue);
  }
  return result;
};
var FromRef6 = function(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
};
var FromString5 = function(schema, references, value3) {
  return TryConvertString(value3);
};
var FromSymbol5 = function(schema, references, value3) {
  return IsString(value3) || IsNumber(value3) ? Symbol(value3) : value3;
};
var FromThis6 = function(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
};
var FromTuple9 = function(schema, references, value3) {
  const isConvertable = IsArray(value3) && !IsUndefined(schema.items);
  if (!isConvertable)
    return value3;
  return value3.map((value4, index) => {
    return index < schema.items.length ? Visit10(schema.items[index], references, value4) : value4;
  });
};
var FromUndefined5 = function(schema, references, value3) {
  return TryConvertUndefined(value3);
};
var FromUnion11 = function(schema, references, value3) {
  for (const subschema of schema.anyOf) {
    const converted = Visit10(subschema, references, value3);
    if (Check(subschema, references, converted)) {
      return converted;
    }
  }
  return value3;
};
var Visit10 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray9(schema_, references_, value3);
    case "BigInt":
      return FromBigInt5(schema_, references_, value3);
    case "Boolean":
      return FromBoolean5(schema_, references_, value3);
    case "Date":
      return FromDate5(schema_, references_, value3);
    case "Integer":
      return FromInteger5(schema_, references_, value3);
    case "Intersect":
      return FromIntersect9(schema_, references_, value3);
    case "Literal":
      return FromLiteral6(schema_, references_, value3);
    case "Null":
      return FromNull5(schema_, references_, value3);
    case "Number":
      return FromNumber5(schema_, references_, value3);
    case "Object":
      return FromObject7(schema_, references_, value3);
    case "Record":
      return FromRecord7(schema_, references_, value3);
    case "Ref":
      return FromRef6(schema_, references_, value3);
    case "String":
      return FromString5(schema_, references_, value3);
    case "Symbol":
      return FromSymbol5(schema_, references_, value3);
    case "This":
      return FromThis6(schema_, references_, value3);
    case "Tuple":
      return FromTuple9(schema_, references_, value3);
    case "Undefined":
      return FromUndefined5(schema_, references_, value3);
    case "Union":
      return FromUnion11(schema_, references_, value3);
    default:
      return Default2(value3);
  }
};
function Convert(...args) {
  return args.length === 3 ? Visit10(args[0], args[1], args[2]) : Visit10(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/import/value/default/default.mjs
var ValueOrDefault = function(schema, value3) {
  return value3 === undefined && ("default" in schema) ? Clone2(schema.default) : value3;
};
var IsCheckable2 = function(schema) {
  return IsSchema(schema) && schema[Kind] !== "Unsafe";
};
var IsDefaultSchema = function(value3) {
  return IsSchema(value3) && ("default" in value3);
};
var FromArray10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted))
    return defaulted;
  for (let i = 0;i < defaulted.length; i++) {
    defaulted[i] = Visit11(schema.items, references, defaulted[i]);
  }
  return defaulted;
};
var FromIntersect10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  return schema.allOf.reduce((acc, schema2) => {
    const next = Visit11(schema2, references, defaulted);
    return IsObject(next) ? { ...acc, ...next } : next;
  }, {});
};
var FromObject8 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const knownPropertyKeys = Object.getOwnPropertyNames(schema.properties);
  for (const key of knownPropertyKeys) {
    if (!IsDefaultSchema(schema.properties[key]))
      continue;
    defaulted[key] = Visit11(schema.properties[key], references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKeys.includes(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
};
var FromRecord8 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const [propertyKeyPattern, propertySchema] = Object.entries(schema.patternProperties)[0];
  const knownPropertyKey = new RegExp(propertyKeyPattern);
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (!(knownPropertyKey.test(key) && IsDefaultSchema(propertySchema)))
      continue;
    defaulted[key] = Visit11(propertySchema, references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKey.test(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
};
var FromRef7 = function(schema, references, value3) {
  return Visit11(Deref(schema, references), references, ValueOrDefault(schema, value3));
};
var FromThis7 = function(schema, references, value3) {
  return Visit11(Deref(schema, references), references, value3);
};
var FromTuple10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted) || IsUndefined(schema.items))
    return defaulted;
  const [items, max] = [schema.items, Math.max(schema.items.length, defaulted.length)];
  for (let i = 0;i < max; i++) {
    if (i < items.length)
      defaulted[i] = Visit11(items[i], references, defaulted[i]);
  }
  return defaulted;
};
var FromUnion12 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  for (const inner of schema.anyOf) {
    const result = Visit11(inner, references, defaulted);
    if (IsCheckable2(inner) && Check(inner, result)) {
      return result;
    }
  }
  return defaulted;
};
var Visit11 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray10(schema_, references_, value3);
    case "Intersect":
      return FromIntersect10(schema_, references_, value3);
    case "Object":
      return FromObject8(schema_, references_, value3);
    case "Record":
      return FromRecord8(schema_, references_, value3);
    case "Ref":
      return FromRef7(schema_, references_, value3);
    case "This":
      return FromThis7(schema_, references_, value3);
    case "Tuple":
      return FromTuple10(schema_, references_, value3);
    case "Union":
      return FromUnion12(schema_, references_, value3);
    default:
      return ValueOrDefault(schema_, value3);
  }
};
function Default3(...args) {
  return args.length === 3 ? Visit11(args[0], args[1], args[2]) : Visit11(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/import/value/pointer/pointer.mjs
var exports_pointer = {};
__export(exports_pointer, {
  ValuePointerRootSetError: () => {
    {
      return ValuePointerRootSetError;
    }
  },
  ValuePointerRootDeleteError: () => {
    {
      return ValuePointerRootDeleteError;
    }
  },
  Set: () => {
    {
      return Set4;
    }
  },
  Has: () => {
    {
      return Has3;
    }
  },
  Get: () => {
    {
      return Get3;
    }
  },
  Format: () => {
    {
      return Format;
    }
  },
  Delete: () => {
    {
      return Delete3;
    }
  }
});
var Escape2 = function(component) {
  return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
};
function* Format(pointer) {
  if (pointer === "")
    return;
  let [start, end] = [0, 0];
  for (let i = 0;i < pointer.length; i++) {
    const char = pointer.charAt(i);
    if (char === "/") {
      if (i === 0) {
        start = i + 1;
      } else {
        end = i;
        yield Escape2(pointer.slice(start, end));
        start = i + 1;
      }
    } else {
      end = i;
    }
  }
  yield Escape2(pointer.slice(start));
}
function Set4(value3, pointer, update) {
  if (pointer === "")
    throw new ValuePointerRootSetError(value3, pointer, update);
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      next[component] = {};
    owner = next;
    next = next[component];
    key = component;
  }
  owner[key] = update;
}
function Delete3(value3, pointer) {
  if (pointer === "")
    throw new ValuePointerRootDeleteError(value3, pointer);
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined || next[component] === null)
      return;
    owner = next;
    next = next[component];
    key = component;
  }
  if (Array.isArray(owner)) {
    const index = parseInt(key);
    owner.splice(index, 1);
  } else {
    delete owner[key];
  }
}
function Has3(value3, pointer) {
  if (pointer === "")
    return true;
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      return false;
    owner = next;
    next = next[component];
    key = component;
  }
  return Object.getOwnPropertyNames(owner).includes(key);
}
function Get3(value3, pointer) {
  if (pointer === "")
    return value3;
  let current = value3;
  for (const component of Format(pointer)) {
    if (current[component] === undefined)
      return;
    current = current[component];
  }
  return current;
}

class ValuePointerRootSetError extends TypeBoxError {
  value;
  path;
  update;
  constructor(value3, path, update) {
    super("Cannot set root value");
    this.value = value3;
    this.path = path;
    this.update = update;
  }
}

class ValuePointerRootDeleteError extends TypeBoxError {
  value;
  path;
  constructor(value3, path) {
    super("Cannot delete root value");
    this.value = value3;
    this.path = path;
  }
}
// node_modules/@sinclair/typebox/build/import/value/delta/delta.mjs
var CreateUpdate = function(path, value3) {
  return { type: "update", path, value: value3 };
};
var CreateInsert = function(path, value3) {
  return { type: "insert", path, value: value3 };
};
var CreateDelete = function(path) {
  return { type: "delete", path };
};
function* ObjectType4(path, current, next) {
  if (!IsStandardObject(next))
    return yield CreateUpdate(path, next);
  const currentKeys = [...globalThis.Object.keys(current), ...globalThis.Object.getOwnPropertySymbols(current)];
  const nextKeys = [...globalThis.Object.keys(next), ...globalThis.Object.getOwnPropertySymbols(next)];
  for (const key of currentKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && nextKeys.includes(key))
      yield CreateUpdate(`${path}/${globalThis.String(key)}`, undefined);
  }
  for (const key of nextKeys) {
    if (IsUndefined(current[key]) || IsUndefined(next[key]))
      continue;
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    yield* Visit12(`${path}/${globalThis.String(key)}`, current[key], next[key]);
  }
  for (const key of nextKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(current[key]))
      yield CreateInsert(`${path}/${globalThis.String(key)}`, next[key]);
  }
  for (const key of currentKeys.reverse()) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && !nextKeys.includes(key))
      yield CreateDelete(`${path}/${globalThis.String(key)}`);
  }
}
function* ArrayType4(path, current, next) {
  if (!IsArray(next))
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
  for (let i = 0;i < next.length; i++) {
    if (i < current.length)
      continue;
    yield CreateInsert(`${path}/${i}`, next[i]);
  }
  for (let i = current.length - 1;i >= 0; i--) {
    if (i < next.length)
      continue;
    yield CreateDelete(`${path}/${i}`);
  }
}
function* TypedArrayType2(path, current, next) {
  if (!IsTypedArray(next) || current.length !== next.length || globalThis.Object.getPrototypeOf(current).constructor.name !== globalThis.Object.getPrototypeOf(next).constructor.name)
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
}
function* ValueType2(path, current, next) {
  if (current === next)
    return;
  yield CreateUpdate(path, next);
}
function* Visit12(path, current, next) {
  if (IsStandardObject(current))
    return yield* ObjectType4(path, current, next);
  if (IsArray(current))
    return yield* ArrayType4(path, current, next);
  if (IsTypedArray(current))
    return yield* TypedArrayType2(path, current, next);
  if (IsValueType(current))
    return yield* ValueType2(path, current, next);
  throw new ValueDeltaError(current, "Unable to create diff edits for unknown value");
}
function Diff(current, next) {
  return [...Visit12("", current, next)];
}
var IsRootUpdate = function(edits) {
  return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
};
var IsIdentity = function(edits) {
  return edits.length === 0;
};
function Patch(current, edits) {
  if (IsRootUpdate(edits)) {
    return Clone2(edits[0].value);
  }
  if (IsIdentity(edits)) {
    return Clone2(current);
  }
  const clone8 = Clone2(current);
  for (const edit of edits) {
    switch (edit.type) {
      case "insert": {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case "update": {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case "delete": {
        exports_pointer.Delete(clone8, edit.path);
        break;
      }
    }
  }
  return clone8;
}
var Insert = Object2({
  type: Literal("insert"),
  path: String2(),
  value: Unknown()
});
var Update = Object2({
  type: Literal("update"),
  path: String2(),
  value: Unknown()
});
var Delete4 = Object2({
  type: Literal("delete"),
  path: String2()
});
var Edit = Union([Insert, Update, Delete4]);

class ValueDeltaError extends TypeBoxError {
  value;
  constructor(value3, message) {
    super(message);
    this.value = value3;
  }
}

class ValueDeltaSymbolError extends ValueDeltaError {
  value;
  constructor(value3) {
    super(value3, "Cannot diff objects with symbol keys");
    this.value = value3;
  }
}
// node_modules/@sinclair/typebox/build/import/value/equal/equal.mjs
var ObjectType5 = function(left, right) {
  if (!IsStandardObject(right))
    return false;
  const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
  const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
  if (leftKeys.length !== rightKeys.length)
    return false;
  return leftKeys.every((key) => Equal(left[key], right[key]));
};
var DateType4 = function(left, right) {
  return IsDate(right) && left.getTime() === right.getTime();
};
var ArrayType5 = function(left, right) {
  if (!IsArray(right) || left.length !== right.length)
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
};
var TypedArrayType3 = function(left, right) {
  if (!IsTypedArray(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
};
var ValueType3 = function(left, right) {
  return left === right;
};
function Equal(left, right) {
  if (IsStandardObject(left))
    return ObjectType5(left, right);
  if (IsDate(left))
    return DateType4(left, right);
  if (IsTypedArray(left))
    return TypedArrayType3(left, right);
  if (IsArray(left))
    return ArrayType5(left, right);
  if (IsValueType(left))
    return ValueType3(left, right);
  throw new Error("ValueEquals: Unable to compare value");
}
// node_modules/@sinclair/typebox/build/import/value/mutate/mutate.mjs
var ObjectType6 = function(root, path, current, next) {
  if (!IsStandardObject(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    const currentKeys = Object.keys(current);
    const nextKeys = Object.keys(next);
    for (const currentKey of currentKeys) {
      if (!nextKeys.includes(currentKey)) {
        delete current[currentKey];
      }
    }
    for (const nextKey of nextKeys) {
      if (!currentKeys.includes(nextKey)) {
        current[nextKey] = null;
      }
    }
    for (const nextKey of nextKeys) {
      Visit13(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
    }
  }
};
var ArrayType6 = function(root, path, current, next) {
  if (!IsArray(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    for (let index = 0;index < next.length; index++) {
      Visit13(root, `${path}/${index}`, current[index], next[index]);
    }
    current.splice(next.length);
  }
};
var TypedArrayType4 = function(root, path, current, next) {
  if (IsTypedArray(current) && current.length === next.length) {
    for (let i = 0;i < current.length; i++) {
      current[i] = next[i];
    }
  } else {
    exports_pointer.Set(root, path, Clone2(next));
  }
};
var ValueType4 = function(root, path, current, next) {
  if (current === next)
    return;
  exports_pointer.Set(root, path, next);
};
var Visit13 = function(root, path, current, next) {
  if (IsArray(next))
    return ArrayType6(root, path, current, next);
  if (IsTypedArray(next))
    return TypedArrayType4(root, path, current, next);
  if (IsStandardObject(next))
    return ObjectType6(root, path, current, next);
  if (IsValueType(next))
    return ValueType4(root, path, current, next);
};
var IsNonMutableValue = function(value3) {
  return IsTypedArray(value3) || IsValueType(value3);
};
var IsMismatchedValue = function(current, next) {
  return IsStandardObject(current) && IsArray(next) || IsArray(current) && IsStandardObject(next);
};
function Mutate(current, next) {
  if (IsNonMutableValue(current) || IsNonMutableValue(next))
    throw new ValueMutateError("Only object and array types can be mutated at the root level");
  if (IsMismatchedValue(current, next))
    throw new ValueMutateError("Cannot assign due type mismatch of assignable values");
  Visit13(current, "", current, next);
}

class ValueMutateError extends TypeBoxError {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/import/value/transform/decode.mjs
var Default4 = function(schema, value3) {
  try {
    return IsTransform(schema) ? schema[TransformKind].Decode(value3) : value3;
  } catch (error19) {
    throw new TransformDecodeError(schema, value3, error19);
  }
};
var FromArray11 = function(schema, references, value3) {
  return IsArray(value3) ? Default4(schema, value3.map((value4) => Visit14(schema.items, references, value4))) : Default4(schema, value3);
};
var FromIntersect11 = function(schema, references, value3) {
  if (!IsStandardObject(value3) || IsValueType(value3))
    return Default4(schema, value3);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = knownKeys.reduce((value4, key) => {
    return key in value4 ? { ...value4, [key]: Visit14(Index(schema, [key]), references, value4[key]) } : value4;
  }, value3);
  if (!IsTransform(schema.unevaluatedProperties)) {
    return Default4(schema, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const unknownProperties = unknownKeys.reduce((value4, key) => {
    return !knownKeys.includes(key) ? { ...value4, [key]: Default4(unevaluatedProperties, value4[key]) } : value4;
  }, knownProperties);
  return Default4(schema, unknownProperties);
};
var FromNot5 = function(schema, references, value3) {
  return Default4(schema, Visit14(schema.not, references, value3));
};
var FromObject9 = function(schema, references, value3) {
  if (!IsStandardObject(value3))
    return Default4(schema, value3);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = knownKeys.reduce((value4, key) => {
    return key in value4 ? { ...value4, [key]: Visit14(schema.properties[key], references, value4[key]) } : value4;
  }, value3);
  if (!IsSchema(schema.additionalProperties)) {
    return Default4(schema, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = unknownKeys.reduce((value4, key) => {
    return !knownKeys.includes(key) ? { ...value4, [key]: Default4(additionalProperties, value4[key]) } : value4;
  }, knownProperties);
  return Default4(schema, unknownProperties);
};
var FromRecord9 = function(schema, references, value3) {
  if (!IsStandardObject(value3))
    return Default4(schema, value3);
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = Object.getOwnPropertyNames(value3).reduce((value4, key) => {
    return knownKeys.test(key) ? { ...value4, [key]: Visit14(schema.patternProperties[pattern3], references, value4[key]) } : value4;
  }, value3);
  if (!IsSchema(schema.additionalProperties)) {
    return Default4(schema, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = unknownKeys.reduce((value4, key) => {
    return !knownKeys.test(key) ? { ...value4, [key]: Default4(additionalProperties, value4[key]) } : value4;
  }, knownProperties);
  return Default4(schema, unknownProperties);
};
var FromRef8 = function(schema, references, value3) {
  const target = Deref(schema, references);
  return Default4(schema, Visit14(target, references, value3));
};
var FromThis8 = function(schema, references, value3) {
  const target = Deref(schema, references);
  return Default4(schema, Visit14(target, references, value3));
};
var FromTuple11 = function(schema, references, value3) {
  return IsArray(value3) && IsArray(schema.items) ? Default4(schema, schema.items.map((schema2, index) => Visit14(schema2, references, value3[index]))) : Default4(schema, value3);
};
var FromUnion13 = function(schema, references, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3))
      continue;
    const decoded = Visit14(subschema, references, value3);
    return Default4(schema, decoded);
  }
  return Default4(schema, value3);
};
var Visit14 = function(schema, references, value3) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray11(schema_, references_, value3);
    case "Intersect":
      return FromIntersect11(schema_, references_, value3);
    case "Not":
      return FromNot5(schema_, references_, value3);
    case "Object":
      return FromObject9(schema_, references_, value3);
    case "Record":
      return FromRecord9(schema_, references_, value3);
    case "Ref":
      return FromRef8(schema_, references_, value3);
    case "Symbol":
      return Default4(schema_, value3);
    case "This":
      return FromThis8(schema_, references_, value3);
    case "Tuple":
      return FromTuple11(schema_, references_, value3);
    case "Union":
      return FromUnion13(schema_, references_, value3);
    default:
      return Default4(schema_, value3);
  }
};
function TransformDecode(schema, references, value3) {
  return Visit14(schema, references, value3);
}

class TransformDecodeCheckError extends TypeBoxError {
  schema;
  value;
  error;
  constructor(schema, value3, error19) {
    super(`Unable to decode due to invalid value`);
    this.schema = schema;
    this.value = value3;
    this.error = error19;
  }
}

class TransformDecodeError extends TypeBoxError {
  schema;
  value;
  constructor(schema, value3, error19) {
    super(`${error19 instanceof Error ? error19.message : "Unknown error"}`);
    this.schema = schema;
    this.value = value3;
  }
}
// node_modules/@sinclair/typebox/build/import/value/transform/encode.mjs
var Default5 = function(schema, value3) {
  try {
    return IsTransform(schema) ? schema[TransformKind].Encode(value3) : value3;
  } catch (error20) {
    throw new TransformEncodeError(schema, value3, error20);
  }
};
var FromArray12 = function(schema, references, value3) {
  const defaulted = Default5(schema, value3);
  return IsArray(defaulted) ? defaulted.map((value4) => Visit15(schema.items, references, value4)) : defaulted;
};
var FromIntersect12 = function(schema, references, value3) {
  const defaulted = Default5(schema, value3);
  if (!IsStandardObject(value3) || IsValueType(value3))
    return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = knownKeys.reduce((value4, key) => {
    return key in defaulted ? { ...value4, [key]: Visit15(Index(schema, [key]), references, value4[key]) } : value4;
  }, defaulted);
  if (!IsTransform(schema.unevaluatedProperties)) {
    return Default5(schema, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  return unknownKeys.reduce((value4, key) => {
    return !knownKeys.includes(key) ? { ...value4, [key]: Default5(unevaluatedProperties, value4[key]) } : value4;
  }, knownProperties);
};
var FromNot6 = function(schema, references, value3) {
  return Default5(schema.not, Default5(schema, value3));
};
var FromObject10 = function(schema, references, value3) {
  const defaulted = Default5(schema, value3);
  if (!IsStandardObject(value3))
    return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = knownKeys.reduce((value4, key) => {
    return key in value4 ? { ...value4, [key]: Visit15(schema.properties[key], references, value4[key]) } : value4;
  }, defaulted);
  if (!IsSchema(schema.additionalProperties)) {
    return knownProperties;
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  return unknownKeys.reduce((value4, key) => {
    return !knownKeys.includes(key) ? { ...value4, [key]: Default5(additionalProperties, value4[key]) } : value4;
  }, knownProperties);
};
var FromRecord10 = function(schema, references, value3) {
  const defaulted = Default5(schema, value3);
  if (!IsStandardObject(value3))
    return defaulted;
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = Object.getOwnPropertyNames(value3).reduce((value4, key) => {
    return knownKeys.test(key) ? { ...value4, [key]: Visit15(schema.patternProperties[pattern3], references, value4[key]) } : value4;
  }, defaulted);
  if (!IsSchema(schema.additionalProperties)) {
    return Default5(schema, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  return unknownKeys.reduce((value4, key) => {
    return !knownKeys.test(key) ? { ...value4, [key]: Default5(additionalProperties, value4[key]) } : value4;
  }, knownProperties);
};
var FromRef9 = function(schema, references, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, value3);
  return Default5(schema, resolved);
};
var FromThis9 = function(schema, references, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, value3);
  return Default5(schema, resolved);
};
var FromTuple12 = function(schema, references, value3) {
  const value1 = Default5(schema, value3);
  return IsArray(schema.items) ? schema.items.map((schema2, index) => Visit15(schema2, references, value1[index])) : [];
};
var FromUnion14 = function(schema, references, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3))
      continue;
    const value1 = Visit15(subschema, references, value3);
    return Default5(schema, value1);
  }
  for (const subschema of schema.anyOf) {
    const value1 = Visit15(subschema, references, value3);
    if (!Check(schema, references, value1))
      continue;
    return Default5(schema, value1);
  }
  return Default5(schema, value3);
};
var Visit15 = function(schema, references, value3) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray12(schema_, references_, value3);
    case "Intersect":
      return FromIntersect12(schema_, references_, value3);
    case "Not":
      return FromNot6(schema_, references_, value3);
    case "Object":
      return FromObject10(schema_, references_, value3);
    case "Record":
      return FromRecord10(schema_, references_, value3);
    case "Ref":
      return FromRef9(schema_, references_, value3);
    case "This":
      return FromThis9(schema_, references_, value3);
    case "Tuple":
      return FromTuple12(schema_, references_, value3);
    case "Union":
      return FromUnion14(schema_, references_, value3);
    default:
      return Default5(schema_, value3);
  }
};
function TransformEncode(schema, references, value3) {
  return Visit15(schema, references, value3);
}

class TransformEncodeCheckError extends TypeBoxError {
  schema;
  value;
  error;
  constructor(schema, value3, error20) {
    super(`Unable to encode due to invalid value`);
    this.schema = schema;
    this.value = value3;
    this.error = error20;
  }
}

class TransformEncodeError extends TypeBoxError {
  schema;
  value;
  constructor(schema, value3, error20) {
    super(`${error20 instanceof Error ? error20.message : "Unknown error"}`);
    this.schema = schema;
    this.value = value3;
  }
}
// node_modules/@sinclair/typebox/build/import/value/transform/has.mjs
var FromArray13 = function(schema, references) {
  return IsTransform(schema) || Visit16(schema.items, references);
};
var FromAsyncIterator5 = function(schema, references) {
  return IsTransform(schema) || Visit16(schema.items, references);
};
var FromConstructor6 = function(schema, references) {
  return IsTransform(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
};
var FromFunction5 = function(schema, references) {
  return IsTransform(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
};
var FromIntersect13 = function(schema, references) {
  return IsTransform(schema) || IsTransform(schema.unevaluatedProperties) || schema.allOf.some((schema2) => Visit16(schema2, references));
};
var FromIterator5 = function(schema, references) {
  return IsTransform(schema) || Visit16(schema.items, references);
};
var FromNot7 = function(schema, references) {
  return IsTransform(schema) || Visit16(schema.not, references);
};
var FromObject11 = function(schema, references) {
  return IsTransform(schema) || Object.values(schema.properties).some((schema2) => Visit16(schema2, references)) || IsSchema(schema.additionalProperties) && Visit16(schema.additionalProperties, references);
};
var FromPromise5 = function(schema, references) {
  return IsTransform(schema) || Visit16(schema.item, references);
};
var FromRecord11 = function(schema, references) {
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[pattern3];
  return IsTransform(schema) || Visit16(property, references) || IsSchema(schema.additionalProperties) && IsTransform(schema.additionalProperties);
};
var FromRef10 = function(schema, references) {
  if (IsTransform(schema))
    return true;
  return Visit16(Deref(schema, references), references);
};
var FromThis10 = function(schema, references) {
  if (IsTransform(schema))
    return true;
  return Visit16(Deref(schema, references), references);
};
var FromTuple13 = function(schema, references) {
  return IsTransform(schema) || !IsUndefined(schema.items) && schema.items.some((schema2) => Visit16(schema2, references));
};
var FromUnion15 = function(schema, references) {
  return IsTransform(schema) || schema.anyOf.some((schema2) => Visit16(schema2, references));
};
var Visit16 = function(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  if (schema.$id && visited.has(schema.$id))
    return false;
  if (schema.$id)
    visited.add(schema.$id);
  switch (schema[Kind]) {
    case "Array":
      return FromArray13(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator5(schema_, references_);
    case "Constructor":
      return FromConstructor6(schema_, references_);
    case "Function":
      return FromFunction5(schema_, references_);
    case "Intersect":
      return FromIntersect13(schema_, references_);
    case "Iterator":
      return FromIterator5(schema_, references_);
    case "Not":
      return FromNot7(schema_, references_);
    case "Object":
      return FromObject11(schema_, references_);
    case "Promise":
      return FromPromise5(schema_, references_);
    case "Record":
      return FromRecord11(schema_, references_);
    case "Ref":
      return FromRef10(schema_, references_);
    case "This":
      return FromThis10(schema_, references_);
    case "Tuple":
      return FromTuple13(schema_, references_);
    case "Union":
      return FromUnion15(schema_, references_);
    default:
      return IsTransform(schema);
  }
};
function HasTransform(schema, references) {
  visited.clear();
  return Visit16(schema, references);
}
var visited = new Set;
// node_modules/@sinclair/typebox/build/import/value/value/value.mjs
var exports_value2 = {};
__export(exports_value2, {
  Patch: () => {
    {
      return Patch2;
    }
  },
  Mutate: () => {
    {
      return Mutate2;
    }
  },
  Hash: () => {
    {
      return Hash2;
    }
  },
  Errors: () => {
    {
      return Errors2;
    }
  },
  Equal: () => {
    {
      return Equal2;
    }
  },
  Encode: () => {
    {
      return Encode;
    }
  },
  Diff: () => {
    {
      return Diff2;
    }
  },
  Default: () => {
    {
      return Default6;
    }
  },
  Decode: () => {
    {
      return Decode;
    }
  },
  Create: () => {
    {
      return Create3;
    }
  },
  Convert: () => {
    {
      return Convert2;
    }
  },
  Clone: () => {
    {
      return Clone3;
    }
  },
  Clean: () => {
    {
      return Clean2;
    }
  },
  Check: () => {
    {
      return Check2;
    }
  },
  Cast: () => {
    {
      return Cast2;
    }
  }
});
function Cast2(...args) {
  return Cast.apply(Cast, args);
}
function Create3(...args) {
  return Create2.apply(Create2, args);
}
function Check2(...args) {
  return Check.apply(Check, args);
}
function Clean2(...args) {
  return Clean.apply(Clean, args);
}
function Convert2(...args) {
  return Convert.apply(Convert, args);
}
function Clone3(value3) {
  return Clone2(value3);
}
function Decode(...args) {
  const [schema, references, value3] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  if (!Check2(schema, references, value3))
    throw new TransformDecodeCheckError(schema, value3, Errors2(schema, references, value3).First());
  return TransformDecode(schema, references, value3);
}
function Default6(...args) {
  return Default3.apply(Default3, args);
}
function Encode(...args) {
  const [schema, references, value3] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  const encoded = TransformEncode(schema, references, value3);
  if (!Check2(schema, references, encoded))
    throw new TransformEncodeCheckError(schema, value3, Errors2(schema, references, value3).First());
  return encoded;
}
function Errors2(...args) {
  return Errors.apply(Errors, args);
}
function Equal2(left, right) {
  return Equal(left, right);
}
function Diff2(current, next) {
  return Diff(current, next);
}
function Hash2(value3) {
  return Hash(value3);
}
function Patch2(current, edits) {
  return Patch(current, edits);
}
function Mutate2(current, next) {
  Mutate(current, next);
}
// node_modules/@sinclair/typebox/build/import/type/awaited/awaited.mjs
var FromRest4 = function(T) {
  return T.map((L) => AwaitedResolve(L));
};
var FromIntersect14 = function(T) {
  return Intersect(FromRest4(T));
};
var FromUnion16 = function(T) {
  return Union(FromRest4(T));
};
var FromPromise6 = function(T) {
  return AwaitedResolve(T);
};
var AwaitedResolve = function(T) {
  return IsIntersect(T) ? FromIntersect14(T.allOf) : IsUnion(T) ? FromUnion16(T.anyOf) : IsPromise2(T) ? FromPromise6(T.item) : T;
};
function Awaited(T, options = {}) {
  return CloneType(AwaitedResolve(T), options);
}
// node_modules/@sinclair/typebox/build/import/type/date/date.mjs
function Date2(options = {}) {
  return {
    ...options,
    [Kind]: "Date",
    type: "Date"
  };
}
// node_modules/@sinclair/typebox/build/import/type/null/null.mjs
function Null(options = {}) {
  return {
    ...options,
    [Kind]: "Null",
    type: "null"
  };
}
// node_modules/@sinclair/typebox/build/import/type/symbol/symbol.mjs
function Symbol2(options) {
  return { ...options, [Kind]: "Symbol", type: "symbol" };
}
// node_modules/@sinclair/typebox/build/import/type/undefined/undefined.mjs
function Undefined(options = {}) {
  return { ...options, [Kind]: "Undefined", type: "undefined" };
}
// node_modules/@sinclair/typebox/build/import/type/uint8array/uint8array.mjs
function Uint8Array2(options = {}) {
  return { ...options, [Kind]: "Uint8Array", type: "Uint8Array" };
}
// node_modules/@sinclair/typebox/build/import/type/const/const.mjs
var FromArray14 = function(T) {
  return T.map((L) => FromValue(L, false));
};
var FromProperties8 = function(value5) {
  return globalThis.Object.getOwnPropertyNames(value5).reduce((acc, key) => {
    return { ...acc, [key]: Readonly(FromValue(value5[key], false)) };
  }, {});
};
var ConditionalReadonly = function(T, root) {
  return root === true ? T : Readonly(T);
};
var FromValue = function(value5, root) {
  return IsAsyncIterator2(value5) ? ConditionalReadonly(Any(), root) : IsIterator2(value5) ? ConditionalReadonly(Any(), root) : IsArray2(value5) ? Readonly(Tuple(FromArray14(value5))) : IsUint8Array2(value5) ? Uint8Array2() : IsDate2(value5) ? Date2() : IsObject2(value5) ? ConditionalReadonly(Object2(FromProperties8(value5)), root) : IsFunction2(value5) ? ConditionalReadonly(Function2([], Unknown()), root) : IsUndefined2(value5) ? Undefined() : IsNull2(value5) ? Null() : IsSymbol2(value5) ? Symbol2() : IsBigInt2(value5) ? BigInt2() : IsNumber2(value5) ? Literal(value5) : IsBoolean2(value5) ? Literal(value5) : IsString2(value5) ? Literal(value5) : Object2({});
};
function Const(T, options = {}) {
  return CloneType(FromValue(T, true), options);
}
// node_modules/@sinclair/typebox/build/import/type/constructor-parameters/constructor-parameters.mjs
function ConstructorParameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/import/type/deref/deref.mjs
var FromRest5 = function(schema, references) {
  return schema.map((schema2) => Deref2(schema2, references));
};
var FromProperties9 = function(properties, references) {
  return globalThis.Object.getOwnPropertyNames(properties).reduce((acc, key) => {
    return { ...acc, [key]: Deref2(properties[key], references) };
  }, {});
};
var FromConstructor7 = function(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
};
var FromFunction6 = function(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
};
var FromIntersect15 = function(schema, references) {
  schema.allOf = FromRest5(schema.allOf, references);
  return schema;
};
var FromUnion17 = function(schema, references) {
  schema.anyOf = FromRest5(schema.anyOf, references);
  return schema;
};
var FromTuple14 = function(schema, references) {
  if (IsUndefined2(schema.items))
    return schema;
  schema.items = FromRest5(schema.items, references);
  return schema;
};
var FromArray15 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromObject12 = function(schema, references) {
  schema.properties = FromProperties9(schema.properties, references);
  return schema;
};
var FromPromise7 = function(schema, references) {
  schema.item = Deref2(schema.item, references);
  return schema;
};
var FromAsyncIterator6 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromIterator6 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromRef11 = function(schema, references) {
  const target = references.find((remote) => remote.$id === schema.$ref);
  if (target === undefined)
    throw Error(`Unable to dereference schema with \$id ${schema.$ref}`);
  const discard8 = Discard(target, ["$id"]);
  return Deref2(discard8, references);
};
var DerefResolve = function(schema, references) {
  return IsConstructor(schema) ? FromConstructor7(schema, references) : IsFunction3(schema) ? FromFunction6(schema, references) : IsIntersect(schema) ? FromIntersect15(schema, references) : IsUnion(schema) ? FromUnion17(schema, references) : IsTuple(schema) ? FromTuple14(schema, references) : IsArray3(schema) ? FromArray15(schema, references) : IsObject3(schema) ? FromObject12(schema, references) : IsPromise2(schema) ? FromPromise7(schema, references) : IsAsyncIterator3(schema) ? FromAsyncIterator6(schema, references) : IsIterator3(schema) ? FromIterator6(schema, references) : IsRef(schema) ? FromRef11(schema, references) : schema;
};
function Deref2(schema, references) {
  return DerefResolve(CloneType(schema), CloneRest(references));
}
// node_modules/@sinclair/typebox/build/import/type/enum/enum.mjs
function Enum(item, options = {}) {
  if (IsUndefined2(item))
    throw new Error("Enum undefined or empty");
  const values1 = globalThis.Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
  const values2 = [...new Set(values1)];
  const anyOf = values2.map((value7) => Literal(value7));
  return Union(anyOf, { ...options, [Hint]: "Enum" });
}
// node_modules/@sinclair/typebox/build/import/type/exclude/exclude-from-template-literal.mjs
function ExcludeFromTemplateLiteral(L, R) {
  return Exclude(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/import/type/exclude/exclude.mjs
var ExcludeRest = function(L, R) {
  const excluded = L.filter((inner) => ExtendsCheck(inner, R) === ExtendsResult.False);
  return excluded.length === 1 ? excluded[0] : Union(excluded);
};
function Exclude(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExcludeFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExcludeFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExcludeRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? Never() : L, options);
}

// node_modules/@sinclair/typebox/build/import/type/exclude/exclude-from-mapped-result.mjs
var FromProperties10 = function(P, U) {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Exclude(P[K2], U) };
  }, {});
};
var FromMappedResult7 = function(R, T) {
  return FromProperties10(R.properties, T);
};
function ExcludeFromMappedResult(R, T) {
  const P = FromMappedResult7(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/extract/extract-from-template-literal.mjs
function ExtractFromTemplateLiteral(L, R) {
  return Extract(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/import/type/extract/extract.mjs
var ExtractRest = function(L, R) {
  const extracted = L.filter((inner) => ExtendsCheck(inner, R) !== ExtendsResult.False);
  return extracted.length === 1 ? extracted[0] : Union(extracted);
};
function Extract(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExtractFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExtractFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExtractRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? L : Never(), options);
}

// node_modules/@sinclair/typebox/build/import/type/extract/extract-from-mapped-result.mjs
var FromProperties11 = function(P, T) {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Extract(P[K2], T) };
  }, {});
};
var FromMappedResult8 = function(R, T) {
  return FromProperties11(R.properties, T);
};
function ExtractFromMappedResult(R, T) {
  const P = FromMappedResult8(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/instance-type/instance-type.mjs
function InstanceType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/import/type/integer/integer.mjs
function Integer(options = {}) {
  return {
    ...options,
    [Kind]: "Integer",
    type: "integer"
  };
}
// node_modules/@sinclair/typebox/build/import/type/intrinsic/intrinsic-from-mapped-key.mjs
var MappedIntrinsicPropertyKey = function(K, M, options) {
  return {
    [K]: Intrinsic(Literal(K), M, options)
  };
};
var MappedIntrinsicPropertyKeys = function(K, M, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIntrinsicPropertyKey(L, M, options) };
  }, {});
};
var MappedIntrinsicProperties = function(T, M, options) {
  return MappedIntrinsicPropertyKeys(T["keys"], M, options);
};
function IntrinsicFromMappedKey(T, M, options) {
  const P = MappedIntrinsicProperties(T, M, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/import/type/intrinsic/intrinsic.mjs
var ApplyUncapitalize = function(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toLowerCase(), rest].join("");
};
var ApplyCapitalize = function(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toUpperCase(), rest].join("");
};
var ApplyUppercase = function(value7) {
  return value7.toUpperCase();
};
var ApplyLowercase = function(value7) {
  return value7.toLowerCase();
};
var FromTemplateLiteral6 = function(schema, mode, options) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  const finite3 = IsTemplateLiteralExpressionFinite(expression);
  if (!finite3)
    return { ...schema, pattern: FromLiteralValue(schema.pattern, mode) };
  const strings = [...TemplateLiteralExpressionGenerate(expression)];
  const literals = strings.map((value7) => Literal(value7));
  const mapped12 = FromRest6(literals, mode);
  const union15 = Union(mapped12);
  return TemplateLiteral([union15], options);
};
var FromLiteralValue = function(value7, mode) {
  return typeof value7 === "string" ? mode === "Uncapitalize" ? ApplyUncapitalize(value7) : mode === "Capitalize" ? ApplyCapitalize(value7) : mode === "Uppercase" ? ApplyUppercase(value7) : mode === "Lowercase" ? ApplyLowercase(value7) : value7 : value7.toString();
};
var FromRest6 = function(T, M) {
  return T.map((L) => Intrinsic(L, M));
};
function Intrinsic(schema, mode, options = {}) {
  return IsMappedKey(schema) ? IntrinsicFromMappedKey(schema, mode, options) : IsTemplateLiteral(schema) ? FromTemplateLiteral6(schema, mode, schema) : IsUnion(schema) ? Union(FromRest6(schema.anyOf, mode), options) : IsLiteral(schema) ? Literal(FromLiteralValue(schema.const, mode), options) : schema;
}

// node_modules/@sinclair/typebox/build/import/type/intrinsic/capitalize.mjs
function Capitalize(T, options = {}) {
  return Intrinsic(T, "Capitalize", options);
}
// node_modules/@sinclair/typebox/build/import/type/intrinsic/lowercase.mjs
function Lowercase(T, options = {}) {
  return Intrinsic(T, "Lowercase", options);
}
// node_modules/@sinclair/typebox/build/import/type/intrinsic/uncapitalize.mjs
function Uncapitalize(T, options = {}) {
  return Intrinsic(T, "Uncapitalize", options);
}
// node_modules/@sinclair/typebox/build/import/type/intrinsic/uppercase.mjs
function Uppercase(T, options = {}) {
  return Intrinsic(T, "Uppercase", options);
}
// node_modules/@sinclair/typebox/build/import/type/not/not.mjs
function Not2(schema, options) {
  return {
    ...options,
    [Kind]: "Not",
    not: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/import/type/omit/omit-from-mapped-result.mjs
var FromProperties12 = function(P, K, options) {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Omit(P[K2], K, options) };
  }, {});
};
var FromMappedResult9 = function(R, K, options) {
  return FromProperties12(R.properties, K, options);
};
function OmitFromMappedResult(R, K, options) {
  const P = FromMappedResult9(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/import/type/omit/omit.mjs
var FromIntersect16 = function(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
};
var FromUnion18 = function(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
};
var FromProperty2 = function(T, K) {
  const { [K]: _, ...R } = T;
  return R;
};
var FromProperties13 = function(T, K) {
  return K.reduce((T2, K2) => {
    return FromProperty2(T2, K2);
  }, T);
};
var OmitResolve = function(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect16(T.allOf, K)) : IsUnion(T) ? Union(FromUnion18(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties13(T.properties, K)) : Object2({});
};
function Omit(T, K, options = {}) {
  if (IsMappedKey(K))
    return OmitFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return OmitFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(OmitResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/import/type/omit/omit-from-mapped-key.mjs
var FromPropertyKey2 = function(T, K, options) {
  return {
    [K]: Omit(T, [K], options)
  };
};
var FromPropertyKeys2 = function(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey2(T, LK, options) };
  }, {});
};
var FromMappedKey3 = function(T, K, options) {
  return FromPropertyKeys2(T, K.keys, options);
};
function OmitFromMappedKey(T, K, options) {
  const P = FromMappedKey3(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/parameters/parameters.mjs
function Parameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/import/type/partial/partial.mjs
var FromRest7 = function(T) {
  return T.map((L) => PartialResolve(L));
};
var FromProperties14 = function(T) {
  return globalThis.Object.getOwnPropertyNames(T).reduce((Acc, K) => {
    return { ...Acc, [K]: Optional(T[K]) };
  }, {});
};
var PartialResolve = function(T) {
  return IsIntersect(T) ? Intersect(FromRest7(T.allOf)) : IsUnion(T) ? Union(FromRest7(T.anyOf)) : IsObject3(T) ? Object2(FromProperties14(T.properties)) : Object2({});
};
function Partial(T, options = {}) {
  if (IsMappedResult(T))
    return PartialFromMappedResult(T, options);
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PartialResolve(T), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/import/type/partial/partial-from-mapped-result.mjs
var FromProperties15 = function(K, options) {
  return globalThis.Object.getOwnPropertyNames(K).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Partial(K[K2], options) };
  }, {});
};
var FromMappedResult10 = function(R, options) {
  return FromProperties15(R.properties, options);
};
function PartialFromMappedResult(R, options) {
  const P = FromMappedResult10(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/pick/pick-from-mapped-result.mjs
var FromProperties16 = function(P, K, options) {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Pick(P[K2], K, options) };
  }, {});
};
var FromMappedResult11 = function(R, K, options) {
  return FromProperties16(R.properties, K, options);
};
function PickFromMappedResult(R, K, options) {
  const P = FromMappedResult11(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/import/type/pick/pick.mjs
var FromIntersect17 = function(T, K) {
  return T.map((T2) => PickResolve(T2, K));
};
var FromUnion19 = function(T, K) {
  return T.map((T2) => PickResolve(T2, K));
};
var FromProperties17 = function(T, K) {
  return K.reduce((Acc, K2) => {
    return K2 in T ? { ...Acc, [K2]: T[K2] } : Acc;
  }, {});
};
var PickResolve = function(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect17(T.allOf, K)) : IsUnion(T) ? Union(FromUnion19(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties17(T.properties, K)) : Object2({});
};
function Pick(T, K, options = {}) {
  if (IsMappedKey(K))
    return PickFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return PickFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PickResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/import/type/pick/pick-from-mapped-key.mjs
var FromPropertyKey3 = function(T, K, options) {
  return {
    [K]: Pick(T, [K], options)
  };
};
var FromPropertyKeys3 = function(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey3(T, LK, options) };
  }, {});
};
var FromMappedKey4 = function(T, K, options) {
  return FromPropertyKeys3(T, K.keys, options);
};
function PickFromMappedKey(T, K, options) {
  const P = FromMappedKey4(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/readonly-optional/readonly-optional.mjs
function ReadonlyOptional(schema) {
  return Readonly(Optional(schema));
}
// node_modules/@sinclair/typebox/build/import/type/record/record.mjs
var RecordCreateFromPattern = function(pattern3, T, options) {
  return {
    ...options,
    [Kind]: "Record",
    type: "object",
    patternProperties: { [pattern3]: CloneType(T) }
  };
};
var RecordCreateFromKeys = function(K, T, options) {
  const P = K.reduce((Acc, K2) => ({ ...Acc, [K2]: CloneType(T) }), {});
  return Object2(P, { ...options, [Hint]: "Record" });
};
var FromTemplateLiteralKey = function(K, T, options) {
  return IsTemplateLiteralFinite(K) ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options) : RecordCreateFromPattern(K.pattern, T, options);
};
var FromUnionKey = function(K, T, options) {
  return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options);
};
var FromLiteralKey = function(K, T, options) {
  return RecordCreateFromKeys([K.toString()], T, options);
};
var FromRegExpKey = function(K, T, options) {
  return RecordCreateFromPattern(K.source, T, options);
};
var FromStringKey = function(K, T, options) {
  const pattern3 = IsUndefined2(K.pattern) ? PatternStringExact : K.pattern;
  return RecordCreateFromPattern(pattern3, T, options);
};
var FromIntegerKey = function(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
};
var FromNumberKey = function(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
};
function Record(K, T, options = {}) {
  return IsUnion(K) ? FromUnionKey(K.anyOf, T, options) : IsTemplateLiteral(K) ? FromTemplateLiteralKey(K, T, options) : IsLiteral(K) ? FromLiteralKey(K.const, T, options) : IsInteger2(K) ? FromIntegerKey(K, T, options) : IsNumber3(K) ? FromNumberKey(K, T, options) : IsRegExp2(K) ? FromRegExpKey(K, T, options) : IsString3(K) ? FromStringKey(K, T, options) : Never(options);
}
// node_modules/@sinclair/typebox/build/import/type/recursive/recursive.mjs
function Recursive(callback, options = {}) {
  if (IsUndefined2(options.$id))
    options.$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: "This", $ref: `${options.$id}` });
  thisType.$id = options.$id;
  return CloneType({ ...options, [Hint]: "Recursive", ...thisType });
}
var Ordinal = 0;
// node_modules/@sinclair/typebox/build/import/type/ref/ref.mjs
function Ref(unresolved, options = {}) {
  if (IsString2(unresolved))
    return { ...options, [Kind]: "Ref", $ref: unresolved };
  if (IsUndefined2(unresolved.$id))
    throw new Error("Reference target type must specify an $id");
  return {
    ...options,
    [Kind]: "Ref",
    $ref: unresolved.$id
  };
}
// node_modules/@sinclair/typebox/build/import/type/regexp/regexp.mjs
function RegExp2(unresolved, options = {}) {
  const expr = IsString2(unresolved) ? new globalThis.RegExp(unresolved) : unresolved;
  return { ...options, [Kind]: "RegExp", type: "RegExp", source: expr.source, flags: expr.flags };
}
// node_modules/@sinclair/typebox/build/import/type/required/required.mjs
var FromRest8 = function(T) {
  return T.map((L) => RequiredResolve(L));
};
var FromProperties18 = function(T) {
  return globalThis.Object.getOwnPropertyNames(T).reduce((Acc, K) => {
    return { ...Acc, [K]: Discard(T[K], [OptionalKind]) };
  }, {});
};
var RequiredResolve = function(T) {
  return IsIntersect(T) ? Intersect(FromRest8(T.allOf)) : IsUnion(T) ? Union(FromRest8(T.anyOf)) : IsObject3(T) ? Object2(FromProperties18(T.properties)) : Object2({});
};
function Required(T, options = {}) {
  if (IsMappedResult(T)) {
    return RequiredFromMappedResult(T, options);
  } else {
    const D = Discard(T, [TransformKind, "$id", "required"]);
    const R = CloneType(RequiredResolve(T), options);
    return { ...D, ...R };
  }
}

// node_modules/@sinclair/typebox/build/import/type/required/required-from-mapped-result.mjs
var FromProperties19 = function(P, options) {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return { ...Acc, [K2]: Required(P[K2], options) };
  }, {});
};
var FromMappedResult12 = function(R, options) {
  return FromProperties19(R.properties, options);
};
function RequiredFromMappedResult(R, options) {
  const P = FromMappedResult12(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/import/type/rest/rest.mjs
var RestResolve = function(T) {
  return IsIntersect(T) ? [...T.allOf] : IsUnion(T) ? [...T.anyOf] : IsTuple(T) ? [...T.items ?? []] : [];
};
function Rest(T) {
  return CloneRest(RestResolve(T));
}
// node_modules/@sinclair/typebox/build/import/type/return-type/return-type.mjs
function ReturnType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/import/type/strict/strict.mjs
function Strict(schema2) {
  return JSON.parse(JSON.stringify(schema2));
}
// node_modules/@sinclair/typebox/build/import/type/transform/transform.mjs
function Transform(schema2) {
  return new TransformDecodeBuilder(schema2);
}

class TransformDecodeBuilder {
  schema;
  constructor(schema2) {
    this.schema = schema2;
  }
  Decode(decode2) {
    return new TransformEncodeBuilder(this.schema, decode2);
  }
}

class TransformEncodeBuilder {
  schema;
  decode;
  constructor(schema2, decode2) {
    this.schema = schema2;
    this.decode = decode2;
  }
  EncodeTransform(encode2, schema2) {
    const Encode2 = (value11) => schema2[TransformKind].Encode(encode2(value11));
    const Decode2 = (value11) => this.decode(schema2[TransformKind].Decode(value11));
    const Codec = { Encode: Encode2, Decode: Decode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  EncodeSchema(encode2, schema2) {
    const Codec = { Decode: this.decode, Encode: encode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  Encode(encode2) {
    const schema2 = CloneType(this.schema);
    return IsTransform(schema2) ? this.EncodeTransform(encode2, schema2) : this.EncodeSchema(encode2, schema2);
  }
}
// node_modules/@sinclair/typebox/build/import/type/void/void.mjs
function Void(options = {}) {
  return {
    ...options,
    [Kind]: "Void",
    type: "void"
  };
}
// node_modules/@sinclair/typebox/build/import/type/type/type.mjs
var exports_type3 = {};
__export(exports_type3, {
  Void: () => {
    {
      return Void;
    }
  },
  Uppercase: () => {
    {
      return Uppercase;
    }
  },
  Unsafe: () => {
    {
      return Unsafe;
    }
  },
  Unknown: () => {
    {
      return Unknown;
    }
  },
  Union: () => {
    {
      return Union;
    }
  },
  Undefined: () => {
    {
      return Undefined;
    }
  },
  Uncapitalize: () => {
    {
      return Uncapitalize;
    }
  },
  Uint8Array: () => {
    {
      return Uint8Array2;
    }
  },
  Tuple: () => {
    {
      return Tuple;
    }
  },
  Transform: () => {
    {
      return Transform;
    }
  },
  TemplateLiteral: () => {
    {
      return TemplateLiteral;
    }
  },
  Symbol: () => {
    {
      return Symbol2;
    }
  },
  String: () => {
    {
      return String2;
    }
  },
  Strict: () => {
    {
      return Strict;
    }
  },
  ReturnType: () => {
    {
      return ReturnType;
    }
  },
  Rest: () => {
    {
      return Rest;
    }
  },
  Required: () => {
    {
      return Required;
    }
  },
  RegExp: () => {
    {
      return RegExp2;
    }
  },
  Ref: () => {
    {
      return Ref;
    }
  },
  Recursive: () => {
    {
      return Recursive;
    }
  },
  Record: () => {
    {
      return Record;
    }
  },
  ReadonlyOptional: () => {
    {
      return ReadonlyOptional;
    }
  },
  Readonly: () => {
    {
      return Readonly;
    }
  },
  Promise: () => {
    {
      return Promise2;
    }
  },
  Pick: () => {
    {
      return Pick;
    }
  },
  Partial: () => {
    {
      return Partial;
    }
  },
  Parameters: () => {
    {
      return Parameters;
    }
  },
  Optional: () => {
    {
      return Optional;
    }
  },
  Omit: () => {
    {
      return Omit;
    }
  },
  Object: () => {
    {
      return Object2;
    }
  },
  Number: () => {
    {
      return Number2;
    }
  },
  Null: () => {
    {
      return Null;
    }
  },
  Not: () => {
    {
      return Not2;
    }
  },
  Never: () => {
    {
      return Never;
    }
  },
  Mapped: () => {
    {
      return Mapped;
    }
  },
  Lowercase: () => {
    {
      return Lowercase;
    }
  },
  Literal: () => {
    {
      return Literal;
    }
  },
  KeyOf: () => {
    {
      return KeyOf;
    }
  },
  Iterator: () => {
    {
      return Iterator;
    }
  },
  Intersect: () => {
    {
      return Intersect;
    }
  },
  Integer: () => {
    {
      return Integer;
    }
  },
  InstanceType: () => {
    {
      return InstanceType;
    }
  },
  Index: () => {
    {
      return Index;
    }
  },
  Function: () => {
    {
      return Function2;
    }
  },
  Extract: () => {
    {
      return Extract;
    }
  },
  Extends: () => {
    {
      return Extends;
    }
  },
  Exclude: () => {
    {
      return Exclude;
    }
  },
  Enum: () => {
    {
      return Enum;
    }
  },
  Deref: () => {
    {
      return Deref2;
    }
  },
  Date: () => {
    {
      return Date2;
    }
  },
  ConstructorParameters: () => {
    {
      return ConstructorParameters;
    }
  },
  Constructor: () => {
    {
      return Constructor;
    }
  },
  Const: () => {
    {
      return Const;
    }
  },
  Composite: () => {
    {
      return Composite;
    }
  },
  Capitalize: () => {
    {
      return Capitalize;
    }
  },
  Boolean: () => {
    {
      return Boolean;
    }
  },
  BigInt: () => {
    {
      return BigInt2;
    }
  },
  Awaited: () => {
    {
      return Awaited;
    }
  },
  AsyncIterator: () => {
    {
      return AsyncIterator;
    }
  },
  Array: () => {
    {
      return Array2;
    }
  },
  Any: () => {
    {
      return Any;
    }
  }
});

// node_modules/@sinclair/typebox/build/import/type/type/index.mjs
var Type = exports_type3;
// node_modules/@sinclair/typebox/build/import/compiler/compiler.mjs
class TypeCheck {
  schema;
  references;
  checkFunc;
  code;
  hasTransform;
  constructor(schema3, references, checkFunc, code) {
    this.schema = schema3;
    this.references = references;
    this.checkFunc = checkFunc;
    this.code = code;
    this.hasTransform = HasTransform(schema3, references);
  }
  Code() {
    return this.code;
  }
  Errors(value11) {
    return Errors(this.schema, this.references, value11);
  }
  Check(value11) {
    return this.checkFunc(value11);
  }
  Decode(value11) {
    if (!this.checkFunc(value11))
      throw new TransformDecodeCheckError(this.schema, value11, this.Errors(value11).First());
    return this.hasTransform ? TransformDecode(this.schema, this.references, value11) : value11;
  }
  Encode(value11) {
    const encoded = this.hasTransform ? TransformEncode(this.schema, this.references, value11) : value11;
    if (!this.checkFunc(encoded))
      throw new TransformEncodeCheckError(this.schema, value11, this.Errors(value11).First());
    return encoded;
  }
}
var Character;
(function(Character2) {
  function DollarSign(code) {
    return code === 36;
  }
  Character2.DollarSign = DollarSign;
  function IsUnderscore(code) {
    return code === 95;
  }
  Character2.IsUnderscore = IsUnderscore;
  function IsAlpha(code) {
    return code >= 65 && code <= 90 || code >= 97 && code <= 122;
  }
  Character2.IsAlpha = IsAlpha;
  function IsNumeric(code) {
    return code >= 48 && code <= 57;
  }
  Character2.IsNumeric = IsNumeric;
})(Character || (Character = {}));
var MemberExpression;
(function(MemberExpression2) {
  function IsFirstCharacterNumeric(value11) {
    if (value11.length === 0)
      return false;
    return Character.IsNumeric(value11.charCodeAt(0));
  }
  function IsAccessor(value11) {
    if (IsFirstCharacterNumeric(value11))
      return false;
    for (let i = 0;i < value11.length; i++) {
      const code = value11.charCodeAt(i);
      const check11 = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
      if (!check11)
        return false;
    }
    return true;
  }
  function EscapeHyphen(key) {
    return key.replace(/'/g, "\\'");
  }
  function Encode2(object13, key) {
    return IsAccessor(key) ? `${object13}.${key}` : `${object13}['${EscapeHyphen(key)}']`;
  }
  MemberExpression2.Encode = Encode2;
})(MemberExpression || (MemberExpression = {}));
var Identifier;
(function(Identifier2) {
  function Encode2($id) {
    const buffer = [];
    for (let i = 0;i < $id.length; i++) {
      const code = $id.charCodeAt(i);
      if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
        buffer.push($id.charAt(i));
      } else {
        buffer.push(`_${code}_`);
      }
    }
    return buffer.join("").replace(/__/g, "_");
  }
  Identifier2.Encode = Encode2;
})(Identifier || (Identifier = {}));
var LiteralString;
(function(LiteralString2) {
  function Escape3(content) {
    return content.replace(/'/g, "\\'");
  }
  LiteralString2.Escape = Escape3;
})(LiteralString || (LiteralString = {}));

class TypeCompilerUnknownTypeError extends TypeBoxError {
  schema;
  constructor(schema3) {
    super("Unknown type");
    this.schema = schema3;
  }
}

class TypeCompilerTypeGuardError extends TypeBoxError {
  schema;
  constructor(schema3) {
    super("Preflight validation check failed to guard for the given schema");
    this.schema = schema3;
  }
}
var Policy;
(function(Policy2) {
  function IsExactOptionalProperty(value11, key, expression) {
    return TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${key}' in ${value11} ? ${expression} : true)` : `(${MemberExpression.Encode(value11, key)} !== undefined ? ${expression} : true)`;
  }
  Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}))` : `(typeof ${value11} === 'object' && ${value11} !== null)`;
  }
  Policy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}) && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))` : `(typeof ${value11} === 'object' && ${value11} !== null && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))`;
  }
  Policy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value11) {
    return !TypeSystemPolicy.AllowNaN ? `(typeof ${value11} === 'number' && Number.isFinite(${value11}))` : `typeof ${value11} === 'number'`;
  }
  Policy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value11) {
    return TypeSystemPolicy.AllowNullVoid ? `(${value11} === undefined || ${value11} === null)` : `${value11} === undefined`;
  }
  Policy2.IsVoidLike = IsVoidLike;
})(Policy || (Policy = {}));
var TypeCompiler;
(function(TypeCompiler2) {
  function IsAnyOrUnknown2(schema3) {
    return schema3[Kind] === "Any" || schema3[Kind] === "Unknown";
  }
  function* FromAny5(schema3, references, value11) {
    yield "true";
  }
  function* FromArray16(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
    if (IsNumber(schema3.maxItems))
      yield `${value11}.length <= ${schema3.maxItems}`;
    if (IsNumber(schema3.minItems))
      yield `${value11}.length >= ${schema3.minItems}`;
    const elementExpression = CreateExpression(schema3.items, references, "value");
    yield `${value11}.every((${parameter}) => ${elementExpression})`;
    if (IsSchema(schema3.contains) || IsNumber(schema3.minContains) || IsNumber(schema3.maxContains)) {
      const containsSchema = IsSchema(schema3.contains) ? schema3.contains : Never();
      const checkExpression = CreateExpression(containsSchema, references, "value");
      const checkMinContains = IsNumber(schema3.minContains) ? [`(count >= ${schema3.minContains})`] : [];
      const checkMaxContains = IsNumber(schema3.maxContains) ? [`(count <= ${schema3.maxContains})`] : [];
      const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
      const check11 = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
      yield `((${parameter}) => { ${checkCount}; return ${check11}})(${value11})`;
    }
    if (schema3.uniqueItems === true) {
      const check11 = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
      const block = `const set = new Set(); for(const element of value) { ${check11} }`;
      yield `((${parameter}) => { ${block} )(${value11})`;
    }
  }
  function* FromAsyncIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${value11})`;
  }
  function* FromBigInt6(schema3, references, value11) {
    yield `(typeof ${value11} === 'bigint')`;
    if (IsBigInt(schema3.exclusiveMaximum))
      yield `${value11} < BigInt(${schema3.exclusiveMaximum})`;
    if (IsBigInt(schema3.exclusiveMinimum))
      yield `${value11} > BigInt(${schema3.exclusiveMinimum})`;
    if (IsBigInt(schema3.maximum))
      yield `${value11} <= BigInt(${schema3.maximum})`;
    if (IsBigInt(schema3.minimum))
      yield `${value11} >= BigInt(${schema3.minimum})`;
    if (IsBigInt(schema3.multipleOf))
      yield `(${value11} % BigInt(${schema3.multipleOf})) === 0`;
  }
  function* FromBoolean6(schema3, references, value11) {
    yield `(typeof ${value11} === 'boolean')`;
  }
  function* FromConstructor8(schema3, references, value11) {
    yield* Visit17(schema3.returns, references, `${value11}.prototype`);
  }
  function* FromDate6(schema3, references, value11) {
    yield `(${value11} instanceof Date) && Number.isFinite(${value11}.getTime())`;
    if (IsNumber(schema3.exclusiveMaximumTimestamp))
      yield `${value11}.getTime() < ${schema3.exclusiveMaximumTimestamp}`;
    if (IsNumber(schema3.exclusiveMinimumTimestamp))
      yield `${value11}.getTime() > ${schema3.exclusiveMinimumTimestamp}`;
    if (IsNumber(schema3.maximumTimestamp))
      yield `${value11}.getTime() <= ${schema3.maximumTimestamp}`;
    if (IsNumber(schema3.minimumTimestamp))
      yield `${value11}.getTime() >= ${schema3.minimumTimestamp}`;
    if (IsNumber(schema3.multipleOfTimestamp))
      yield `(${value11}.getTime() % ${schema3.multipleOfTimestamp}) === 0`;
  }
  function* FromFunction7(schema3, references, value11) {
    yield `(typeof ${value11} === 'function')`;
  }
  function* FromInteger6(schema3, references, value11) {
    yield `(typeof ${value11} === 'number' && Number.isInteger(${value11}))`;
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromIntersect18(schema3, references, value11) {
    const check1 = schema3.allOf.map((schema4) => CreateExpression(schema4, references, value11)).join(" && ");
    if (schema3.unevaluatedProperties === false) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key))`;
      yield `(${check1} && ${check22})`;
    } else if (IsSchema(schema3.unevaluatedProperties)) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema3.unevaluatedProperties, references, `${value11}[key]`)})`;
      yield `(${check1} && ${check22})`;
    } else {
      yield `(${check1})`;
    }
  }
  function* FromIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.iterator in ${value11})`;
  }
  function* FromLiteral7(schema3, references, value11) {
    if (typeof schema3.const === "number" || typeof schema3.const === "boolean") {
      yield `(${value11} === ${schema3.const})`;
    } else {
      yield `(${value11} === '${LiteralString.Escape(schema3.const)}')`;
    }
  }
  function* FromNever6(schema3, references, value11) {
    yield `false`;
  }
  function* FromNot8(schema3, references, value11) {
    const expression = CreateExpression(schema3.not, references, value11);
    yield `(!${expression})`;
  }
  function* FromNull6(schema3, references, value11) {
    yield `(${value11} === null)`;
  }
  function* FromNumber6(schema3, references, value11) {
    yield Policy.IsNumberLike(value11);
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromObject13(schema3, references, value11) {
    yield Policy.IsObjectLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const knownKeys = Object.getOwnPropertyNames(schema3.properties);
    for (const knownKey of knownKeys) {
      const memberExpression = MemberExpression.Encode(value11, knownKey);
      const property = schema3.properties[knownKey];
      if (schema3.required && schema3.required.includes(knownKey)) {
        yield* Visit17(property, references, memberExpression);
        if (ExtendsUndefinedCheck(property) || IsAnyOrUnknown2(property))
          yield `('${knownKey}' in ${value11})`;
      } else {
        const expression = CreateExpression(property, references, memberExpression);
        yield Policy.IsExactOptionalProperty(value11, knownKey, expression);
      }
    }
    if (schema3.additionalProperties === false) {
      if (schema3.required && schema3.required.length === knownKeys.length) {
        yield `Object.getOwnPropertyNames(${value11}).length === ${knownKeys.length}`;
      } else {
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key))`;
      }
    }
    if (typeof schema3.additionalProperties === "object") {
      const expression = CreateExpression(schema3.additionalProperties, references, `${value11}[key]`);
      const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
      yield `(Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key) || ${expression}))`;
    }
  }
  function* FromPromise8(schema3, references, value11) {
    yield `(typeof value === 'object' && typeof ${value11}.then === 'function')`;
  }
  function* FromRecord12(schema3, references, value11) {
    yield Policy.IsRecordLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const [patternKey, patternSchema] = Object.entries(schema3.patternProperties)[0];
    const variable = CreateVariable(`${new RegExp(patternKey)}`);
    const check1 = CreateExpression(patternSchema, references, "value");
    const check22 = IsSchema(schema3.additionalProperties) ? CreateExpression(schema3.additionalProperties, references, value11) : schema3.additionalProperties === false ? "false" : "true";
    const expression = `(${variable}.test(key) ? ${check1} : ${check22})`;
    yield `(Object.entries(${value11}).every(([key, value]) => ${expression}))`;
  }
  function* FromRef12(schema3, references, value11) {
    const target = Deref(schema3, references);
    if (state.functions.has(schema3.$ref))
      return yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
    yield* Visit17(target, references, value11);
  }
  function* FromRegExp5(schema3, references, value11) {
    const variable = CreateVariable(`${new RegExp(schema3.source, schema3.flags)};`);
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    yield `${variable}.test(${value11})`;
  }
  function* FromString6(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    if (schema3.pattern !== undefined) {
      const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
      yield `${variable}.test(${value11})`;
    }
    if (schema3.format !== undefined) {
      yield `format('${schema3.format}', ${value11})`;
    }
  }
  function* FromSymbol6(schema3, references, value11) {
    yield `(typeof ${value11} === 'symbol')`;
  }
  function* FromTemplateLiteral7(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
    yield `${variable}.test(${value11})`;
  }
  function* FromThis11(schema3, references, value11) {
    yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
  }
  function* FromTuple15(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    if (schema3.items === undefined)
      return yield `${value11}.length === 0`;
    yield `(${value11}.length === ${schema3.maxItems})`;
    for (let i = 0;i < schema3.items.length; i++) {
      const expression = CreateExpression(schema3.items[i], references, `${value11}[${i}]`);
      yield `${expression}`;
    }
  }
  function* FromUndefined6(schema3, references, value11) {
    yield `${value11} === undefined`;
  }
  function* FromUnion20(schema3, references, value11) {
    const expressions = schema3.anyOf.map((schema4) => CreateExpression(schema4, references, value11));
    yield `(${expressions.join(" || ")})`;
  }
  function* FromUint8Array5(schema3, references, value11) {
    yield `${value11} instanceof Uint8Array`;
    if (IsNumber(schema3.maxByteLength))
      yield `(${value11}.length <= ${schema3.maxByteLength})`;
    if (IsNumber(schema3.minByteLength))
      yield `(${value11}.length >= ${schema3.minByteLength})`;
  }
  function* FromUnknown5(schema3, references, value11) {
    yield "true";
  }
  function* FromVoid5(schema3, references, value11) {
    yield Policy.IsVoidLike(value11);
  }
  function* FromKind4(schema3, references, value11) {
    const instance = state.instances.size;
    state.instances.set(instance, schema3);
    yield `kind('${schema3[Kind]}', ${instance}, ${value11})`;
  }
  function* Visit17(schema3, references, value11, useHoisting = true) {
    const references_ = IsString(schema3.$id) ? [...references, schema3] : references;
    const schema_ = schema3;
    if (useHoisting && IsString(schema3.$id)) {
      const functionName = CreateFunctionName(schema3.$id);
      if (state.functions.has(functionName)) {
        return yield `${functionName}(${value11})`;
      } else {
        const functionCode = CreateFunction(functionName, schema3, references, "value", false);
        state.functions.set(functionName, functionCode);
        return yield `${functionName}(${value11})`;
      }
    }
    switch (schema_[Kind]) {
      case "Any":
        return yield* FromAny5(schema_, references_, value11);
      case "Array":
        return yield* FromArray16(schema_, references_, value11);
      case "AsyncIterator":
        return yield* FromAsyncIterator7(schema_, references_, value11);
      case "BigInt":
        return yield* FromBigInt6(schema_, references_, value11);
      case "Boolean":
        return yield* FromBoolean6(schema_, references_, value11);
      case "Constructor":
        return yield* FromConstructor8(schema_, references_, value11);
      case "Date":
        return yield* FromDate6(schema_, references_, value11);
      case "Function":
        return yield* FromFunction7(schema_, references_, value11);
      case "Integer":
        return yield* FromInteger6(schema_, references_, value11);
      case "Intersect":
        return yield* FromIntersect18(schema_, references_, value11);
      case "Iterator":
        return yield* FromIterator7(schema_, references_, value11);
      case "Literal":
        return yield* FromLiteral7(schema_, references_, value11);
      case "Never":
        return yield* FromNever6(schema_, references_, value11);
      case "Not":
        return yield* FromNot8(schema_, references_, value11);
      case "Null":
        return yield* FromNull6(schema_, references_, value11);
      case "Number":
        return yield* FromNumber6(schema_, references_, value11);
      case "Object":
        return yield* FromObject13(schema_, references_, value11);
      case "Promise":
        return yield* FromPromise8(schema_, references_, value11);
      case "Record":
        return yield* FromRecord12(schema_, references_, value11);
      case "Ref":
        return yield* FromRef12(schema_, references_, value11);
      case "RegExp":
        return yield* FromRegExp5(schema_, references_, value11);
      case "String":
        return yield* FromString6(schema_, references_, value11);
      case "Symbol":
        return yield* FromSymbol6(schema_, references_, value11);
      case "TemplateLiteral":
        return yield* FromTemplateLiteral7(schema_, references_, value11);
      case "This":
        return yield* FromThis11(schema_, references_, value11);
      case "Tuple":
        return yield* FromTuple15(schema_, references_, value11);
      case "Undefined":
        return yield* FromUndefined6(schema_, references_, value11);
      case "Union":
        return yield* FromUnion20(schema_, references_, value11);
      case "Uint8Array":
        return yield* FromUint8Array5(schema_, references_, value11);
      case "Unknown":
        return yield* FromUnknown5(schema_, references_, value11);
      case "Void":
        return yield* FromVoid5(schema_, references_, value11);
      default:
        if (!exports_type.Has(schema_[Kind]))
          throw new TypeCompilerUnknownTypeError(schema3);
        return yield* FromKind4(schema_, references_, value11);
    }
  }
  const state = {
    language: "javascript",
    functions: new Map,
    variables: new Map,
    instances: new Map
  };
  function CreateExpression(schema3, references, value11, useHoisting = true) {
    return `(${[...Visit17(schema3, references, value11, useHoisting)].join(" && ")})`;
  }
  function CreateFunctionName($id) {
    return `check_${Identifier.Encode($id)}`;
  }
  function CreateVariable(expression) {
    const variableName = `local_${state.variables.size}`;
    state.variables.set(variableName, `const ${variableName} = ${expression}`);
    return variableName;
  }
  function CreateFunction(name, schema3, references, value11, useHoisting = true) {
    const [newline, pad] = ["\n", (length) => "".padStart(length, " ")];
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const expression = [...Visit17(schema3, references, value11, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
    return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})\n}`;
  }
  function CreateParameter(name, type75) {
    const annotation = state.language === "typescript" ? `: ${type75}` : "";
    return `${name}${annotation}`;
  }
  function CreateReturns(type75) {
    return state.language === "typescript" ? `: ${type75}` : "";
  }
  function Build(schema3, references, options) {
    const functionCode = CreateFunction("check", schema3, references, "value");
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const functions = [...state.functions.values()];
    const variables = [...state.variables.values()];
    const checkFunction = IsString(schema3.$id) ? `return function check(${parameter})${returns} {\n  return ${CreateFunctionName(schema3.$id)}(value)\n}` : `return ${functionCode}`;
    return [...variables, ...functions, checkFunction].join("\n");
  }
  function Code(...args) {
    const defaults = { language: "javascript" };
    const [schema3, references, options] = args.length === 2 && IsArray(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !IsArray(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
    state.language = options.language;
    state.variables.clear();
    state.functions.clear();
    state.instances.clear();
    if (!IsSchema(schema3))
      throw new TypeCompilerTypeGuardError(schema3);
    for (const schema4 of references)
      if (!IsSchema(schema4))
        throw new TypeCompilerTypeGuardError(schema4);
    return Build(schema3, references, options);
  }
  TypeCompiler2.Code = Code;
  function Compile(schema3, references = []) {
    const generatedCode = Code(schema3, references, { language: "javascript" });
    const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
    const instances = new Map(state.instances);
    function typeRegistryFunction(kind, instance, value11) {
      if (!exports_type.Has(kind) || !instances.has(instance))
        return false;
      const checkFunc = exports_type.Get(kind);
      const schema4 = instances.get(instance);
      return checkFunc(schema4, value11);
    }
    function formatRegistryFunction(format, value11) {
      if (!exports_format.Has(format))
        return false;
      const checkFunc = exports_format.Get(format);
      return checkFunc(value11);
    }
    function hashFunction(value11) {
      return Hash(value11);
    }
    const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, hashFunction);
    return new TypeCheck(schema3, references, checkFunction, generatedCode);
  }
  TypeCompiler2.Compile = Compile;
})(TypeCompiler || (TypeCompiler = {}));
// node_modules/cookie/index.js
var parse4 = function(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode2;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key = str.slice(index, eqIdx).trim();
    if (obj[key] === undefined) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
};
var serialize = function(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode2;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value11 = enc(val);
  if (value11 && !fieldContentRegExp.test(value11)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value11;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
};
var decode2 = function(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
};
var encode2 = function(val) {
  return encodeURIComponent(val);
};
var isDate = function(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
};
var tryDecode = function(str, decode3) {
  try {
    return decode3(str);
  } catch (e) {
    return str;
  }
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var $parse = parse4;
var $serialize = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

// node_modules/elysia/dist/index.mjs
var import_fast_querystring = __toESM(require_lib(), 1);
var import_fast_decode_uri_component = __toESM(require_fast_decode_uri_component(), 1);
var import_fast_querystring2 = __toESM(require_lib(), 1);
var resolver = () => {
  let resolve;
  const promise5 = new Promise((r) => {
    resolve = r;
  });
  return [promise5, resolve];
};
var createSignal = () => {
  const [start, resolveStart] = resolver();
  const [end, resolveEnd] = resolver();
  const children = [];
  const resolvers = [];
  return {
    signal: start,
    consume: (trace) => {
      switch (trace.type) {
        case "begin":
          if (trace.unit && children.length === 0)
            for (let i = 0;i < trace.unit; i++) {
              const [start2, resolveStart2] = resolver();
              const [end2, resolveEnd2] = resolver();
              children.push(start2);
              resolvers.push([
                (trace2) => {
                  resolveStart2({
                    children: [],
                    end: end2,
                    name: trace2.name ?? "",
                    skip: false,
                    time: trace2.time
                  });
                },
                (time) => {
                  resolveEnd2(time);
                }
              ]);
            }
          resolveStart({
            children,
            end,
            name: trace.name ?? "",
            skip: false,
            time: trace.time
          });
          break;
        case "end":
          resolveEnd(trace.time);
          break;
      }
    },
    consumeChild(trace) {
      switch (trace.type) {
        case "begin":
          if (!resolvers[0])
            return;
          const [resolveStart2] = resolvers[0];
          resolveStart2({
            children: [],
            end,
            name: trace.name ?? "",
            skip: false,
            time: trace.time
          });
          break;
        case "end":
          const child = resolvers.shift();
          if (!child)
            return;
          child[1](trace.time);
      }
    },
    resolve() {
      resolveStart({
        children: [],
        end: new Promise((resolve) => resolve(0)),
        name: "",
        skip: true,
        time: 0
      });
      for (const [resolveStart2, resolveEnd2] of resolvers) {
        resolveStart2({
          children: [],
          end: new Promise((resolve) => resolve(0)),
          name: "",
          skip: true,
          time: 0
        });
        resolveEnd2(0);
      }
      resolveEnd(0);
    }
  };
};
var createTraceListener = (getReporter, totalListener, handler) => {
  return async function trace(trace) {
    if (trace.event !== "request" || trace.type !== "begin")
      return;
    const id = trace.id;
    const reporter = getReporter();
    const request = createSignal();
    const parse22 = createSignal();
    const transform7 = createSignal();
    const beforeHandle = createSignal();
    const handle = createSignal();
    const afterHandle = createSignal();
    const error22 = createSignal();
    const response = createSignal();
    request.consume(trace);
    const reducer = (event) => {
      if (event.id === id)
        switch (event.event) {
          case "request":
            request.consume(event);
            break;
          case "request.unit":
            request.consumeChild(event);
            break;
          case "parse":
            parse22.consume(event);
            break;
          case "parse.unit":
            parse22.consumeChild(event);
            break;
          case "transform":
            transform7.consume(event);
            break;
          case "transform.unit":
            transform7.consumeChild(event);
            break;
          case "beforeHandle":
            beforeHandle.consume(event);
            break;
          case "beforeHandle.unit":
            beforeHandle.consumeChild(event);
            break;
          case "handle":
            handle.consume(event);
            break;
          case "afterHandle":
            afterHandle.consume(event);
            break;
          case "afterHandle.unit":
            afterHandle.consumeChild(event);
            break;
          case "error":
            error22.consume(event);
            break;
          case "error.unit":
            error22.consumeChild(event);
            break;
          case "response":
            if (event.type === "begin") {
              request.resolve();
              parse22.resolve();
              transform7.resolve();
              beforeHandle.resolve();
              handle.resolve();
              afterHandle.resolve();
              error22.resolve();
            } else
              reporter.off("event", reducer);
            response.consume(event);
            break;
          case "response.unit":
            response.consumeChild(event);
            break;
          case "exit":
            request.resolve();
            parse22.resolve();
            transform7.resolve();
            beforeHandle.resolve();
            handle.resolve();
            afterHandle.resolve();
            error22.resolve();
            break;
        }
    };
    reporter.on("event", reducer);
    await handler({
      id,
      context: trace.ctx,
      set: trace.ctx?.set,
      store: trace.ctx?.store,
      time: trace.time,
      request: request.signal,
      parse: parse22.signal,
      transform: transform7.signal,
      beforeHandle: beforeHandle.signal,
      handle: handle.signal,
      afterHandle: afterHandle.signal,
      error: error22.signal,
      response: response.signal
    });
    reporter.emit(`res${id}.${totalListener}`, undefined);
  };
};
var Cookie = class {
  constructor(_value, property = {}) {
    this._value = _value;
    this.property = property;
  }
  get() {
    return this._value;
  }
  get value() {
    return this._value;
  }
  set value(value15) {
    if (typeof value15 === "object") {
      if (JSON.stringify(this.value) === JSON.stringify(value15))
        return;
    } else if (this.value === value15)
      return;
    this._value = value15;
    this.sync();
  }
  add(config) {
    const updated = Object.assign(this.property, typeof config === "function" ? config(Object.assign(this.property, this.value)) : config);
    if ("value" in updated) {
      this._value = updated.value;
      delete updated.value;
    }
    this.property = updated;
    return this.sync();
  }
  set(config) {
    const updated = typeof config === "function" ? config(Object.assign(this.property, this.value)) : config;
    if ("value" in updated) {
      this._value = updated.value;
      delete updated.value;
    }
    this.property = updated;
    return this.sync();
  }
  remove(options) {
    if (this.value === undefined)
      return;
    this.set({
      domain: options?.domain,
      expires: new Date(0),
      maxAge: 0,
      path: options?.path,
      sameSite: options?.sameSite,
      secure: options?.secure,
      value: ""
    });
  }
  get domain() {
    return this.property.domain;
  }
  set domain(value15) {
    if (this.property.domain === value15)
      return;
    this.property.domain = value15;
    this.sync();
  }
  get expires() {
    return this.property.expires;
  }
  set expires(value15) {
    if (this.property.expires?.getTime() === value15?.getTime())
      return;
    this.property.expires = value15;
    this.sync();
  }
  get httpOnly() {
    return this.property.httpOnly;
  }
  set httpOnly(value15) {
    if (this.property.domain === value15)
      return;
    this.property.httpOnly = value15;
    this.sync();
  }
  get maxAge() {
    return this.property.maxAge;
  }
  set maxAge(value15) {
    if (this.property.maxAge === value15)
      return;
    this.property.maxAge = value15;
    this.sync();
  }
  get path() {
    return this.property.path;
  }
  set path(value15) {
    if (this.property.path === value15)
      return;
    this.property.path = value15;
    this.sync();
  }
  get priority() {
    return this.property.priority;
  }
  set priority(value15) {
    if (this.property.priority === value15)
      return;
    this.property.priority = value15;
    this.sync();
  }
  get sameSite() {
    return this.property.sameSite;
  }
  set sameSite(value15) {
    if (this.property.sameSite === value15)
      return;
    this.property.sameSite = value15;
    this.sync();
  }
  get secure() {
    return this.property.secure;
  }
  set secure(value15) {
    if (this.property.secure === value15)
      return;
    this.property.secure = value15;
    this.sync();
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
  sync() {
    if (!this.name || !this.setter)
      return this;
    if (!this.setter.cookie)
      this.setter.cookie = {
        [this.name]: Object.assign(this.property, {
          value: this.toString()
        })
      };
    else
      this.setter.cookie[this.name] = Object.assign(this.property, {
        value: this.toString()
      });
    return this;
  }
};
var createCookieJar = (initial, set2, properties) => new Proxy(initial, {
  get(target, key) {
    if (key in target)
      return target[key];
    const cookie = new Cookie(undefined, properties ? { ...properties } : undefined);
    cookie.setter = set2;
    cookie.name = key;
    return cookie;
  },
  set(target, key, value15) {
    if (!(value15 instanceof Cookie))
      return false;
    if (!set2.cookie)
      set2.cookie = {};
    value15.setter = set2;
    value15.name = key;
    value15.sync();
    target[key] = value15;
    return true;
  }
});
var parseCookie = async (set2, cookieString, {
  secret,
  sign,
  ...properties
} = {}) => {
  if (!cookieString)
    return createCookieJar({}, set2, properties);
  const jar = {};
  const isStringKey = typeof secret === "string";
  if (sign && sign !== true && !Array.isArray(sign))
    sign = [sign];
  const cookieKeys = Object.keys($parse(cookieString));
  for (let i = 0;i < cookieKeys.length; i++) {
    const key = cookieKeys[i];
    let value15 = $parse(cookieString)[key];
    if (sign === true || sign?.includes(key)) {
      if (!secret)
        throw new Error("No secret is provided to cookie plugin");
      if (isStringKey) {
        value15 = await unsignCookie(value15, secret);
        if (value15 === false)
          throw new InvalidCookieSignature(key);
      } else {
        let fail = true;
        for (let i2 = 0;i2 < secret.length; i2++) {
          const temp = await unsignCookie(value15, secret[i2]);
          if (temp !== false) {
            value15 = temp;
            fail = false;
            break;
          }
        }
        if (fail)
          throw new InvalidCookieSignature(key);
      }
    }
    if (value15 === undefined)
      continue;
    const start = value15.charCodeAt(0);
    if (start === 123 || start === 91)
      try {
        const cookie2 = new Cookie(JSON.parse(value15));
        cookie2.setter = set2;
        cookie2.name = key;
        jar[key] = cookie2;
        continue;
      } catch {
      }
    if (isNumericString(value15))
      value15 = +value15;
    else if (value15 === "true")
      value15 = true;
    else if (value15 === "false")
      value15 = false;
    const cookie = new Cookie(value15, properties);
    cookie.setter = set2;
    cookie.name = key;
    jar[key] = cookie;
  }
  return createCookieJar(jar, set2);
};
var hasHeaderShorthand = "toJSON" in new Headers;
var isNotEmpty = (obj) => {
  for (const x in obj)
    return true;
  return false;
};
var handleFile = (response, set2) => {
  const size = response.size;
  if (size && set2 && set2.status !== 206 && set2.status !== 304 && set2.status !== 412 && set2.status !== 416 || !set2 && size) {
    if (set2) {
      if (set2.headers instanceof Headers) {
        if (hasHeaderShorthand)
          set2.headers = set2.headers.toJSON();
        else
          for (const [key, value15] of set2.headers.entries())
            if (key in set2.headers)
              set2.headers[key] = value15;
      }
      return new Response(response, {
        status: set2.status,
        headers: Object.assign({
          "accept-ranges": "bytes",
          "content-range": `bytes 0-${size - 1}/${size}`
        }, set2.headers)
      });
    }
    return new Response(response, {
      headers: {
        "accept-ranges": "bytes",
        "content-range": `bytes 0-${size - 1}/${size}`
      }
    });
  }
  return new Response(response);
};
var parseSetCookies = (headers, setCookie) => {
  if (!headers || !Array.isArray(setCookie))
    return headers;
  headers.delete("Set-Cookie");
  for (let i = 0;i < setCookie.length; i++) {
    const index = setCookie[i].indexOf("=");
    headers.append("Set-Cookie", `${setCookie[i].slice(0, index)}=${setCookie[i].slice(index + 1)}`);
  }
  return headers;
};
var cookieToHeader = (cookies) => {
  if (!cookies || typeof cookies !== "object" || !isNotEmpty(cookies))
    return;
  const set2 = [];
  for (const [key, property] of Object.entries(cookies)) {
    if (!key || !property)
      continue;
    if (Array.isArray(property.value)) {
      for (let i = 0;i < property.value.length; i++) {
        let value15 = property.value[i];
        if (value15 === undefined || value15 === null)
          continue;
        if (typeof value15 === "object")
          value15 = JSON.stringify(value15);
        set2.push($serialize(key, value15, property));
      }
    } else {
      let value15 = property.value;
      if (value15 === undefined || value15 === null)
        continue;
      if (typeof value15 === "object")
        value15 = JSON.stringify(value15);
      set2.push($serialize(key, property.value, property));
    }
  }
  if (set2.length === 0)
    return;
  if (set2.length === 1)
    return set2[0];
  return set2;
};
var mapResponse = (response, set2) => {
  if (response?.[response.$passthrough])
    response = response[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE]) {
    set2.status = response[ELYSIA_RESPONSE];
    response = response.response;
  }
  if (isNotEmpty(set2.headers) || set2.status !== 200 || set2.redirect || set2.cookie) {
    if (typeof set2.status === "string")
      set2.status = StatusMap[set2.status];
    if (set2.redirect) {
      set2.headers.Location = set2.redirect;
      if (!set2.status || set2.status < 300 || set2.status >= 400)
        set2.status = 302;
    }
    if (set2.cookie && isNotEmpty(set2.cookie))
      set2.headers["Set-Cookie"] = cookieToHeader(set2.cookie);
    if (set2.headers["Set-Cookie"] && Array.isArray(set2.headers["Set-Cookie"]))
      set2.headers = parseSetCookies(new Headers(set2.headers), set2.headers["Set-Cookie"]);
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set2);
      case "Blob":
        return handleFile(response, set2);
      case "Object":
      case "Array":
        return Response.json(response, set2);
      case "ReadableStream":
        if (!set2.headers["content-type"]?.startsWith("text/event-stream"))
          set2.headers["content-type"] = "text/event-stream; charset=utf-8";
        return new Response(response, set2);
      case undefined:
        if (!response)
          return new Response("", set2);
        return Response.json(response, set2);
      case "Response":
        const inherits = { ...set2.headers };
        if (hasHeaderShorthand)
          set2.headers = response.headers.toJSON();
        else
          for (const [key, value15] of response.headers.entries())
            if (key in set2.headers)
              set2.headers[key] = value15;
        for (const key in inherits)
          response.headers.append(key, inherits[key]);
        return response;
      case "Error":
        return errorToResponse(response, set2);
      case "Promise":
        return response.then((x) => mapResponse(x, set2));
      case "Function":
        return mapResponse(response(), set2);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set2);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response) {
          const inherits2 = { ...set2.headers };
          if (hasHeaderShorthand)
            set2.headers = response.headers.toJSON();
          else
            for (const [key, value15] of response.headers.entries())
              if (key in set2.headers)
                set2.headers[key] = value15;
          for (const key in inherits2)
            response.headers.append(key, inherits2[key]);
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        const r = JSON.stringify(response);
        if (r.charCodeAt(0) === 123) {
          if (!set2.headers["Content-Type"])
            set2.headers["Content-Type"] = "application/json";
          return new Response(JSON.stringify(response), set2);
        }
        return new Response(r, set2);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set2);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "ReadableStream":
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        return response;
      case "Error":
        return errorToResponse(response, set2);
      case "Promise":
        return response.then((x) => {
          const r2 = mapCompactResponse(x);
          if (r2 !== undefined)
            return r2;
          return new Response("");
        });
      case "Function":
        return mapCompactResponse(response());
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response)
          return new Response(response.body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        const r = JSON.stringify(response);
        if (r.charCodeAt(0) === 123)
          return new Response(JSON.stringify(response), {
            headers: {
              "Content-Type": "application/json"
            }
          });
        return new Response(r);
    }
};
var mapEarlyResponse = (response, set2) => {
  if (response === undefined || response === null)
    return;
  if (response?.$passthrough)
    response = response[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE]) {
    set2.status = response[ELYSIA_RESPONSE];
    response = response.response;
  }
  if (isNotEmpty(set2.headers) || set2.status !== 200 || set2.redirect || set2.cookie) {
    if (typeof set2.status === "string")
      set2.status = StatusMap[set2.status];
    if (set2.redirect) {
      set2.headers.Location = set2.redirect;
      if (!set2.status || set2.status < 300 || set2.status >= 400)
        set2.status = 302;
    }
    if (set2.cookie && isNotEmpty(set2.cookie))
      set2.headers["Set-Cookie"] = cookieToHeader(set2.cookie);
    if (set2.headers["Set-Cookie"] && Array.isArray(set2.headers["Set-Cookie"]))
      set2.headers = parseSetCookies(new Headers(set2.headers), set2.headers["Set-Cookie"]);
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set2);
      case "Blob":
        return handleFile(response, set2);
      case "Object":
      case "Array":
        return Response.json(response, set2);
      case "ReadableStream":
        if (!set2.headers["content-type"]?.startsWith("text/event-stream"))
          set2.headers["content-type"] = "text/event-stream; charset=utf-8";
        return new Response(response, set2);
      case undefined:
        if (!response)
          return;
        return Response.json(response, set2);
      case "Response":
        const inherits = Object.assign({}, set2.headers);
        if (hasHeaderShorthand)
          set2.headers = response.headers.toJSON();
        else
          for (const [key, value15] of response.headers.entries())
            if (!(key in set2.headers))
              set2.headers[key] = value15;
        for (const key in inherits)
          response.headers.append(key, inherits[key]);
        if (response.status !== set2.status)
          set2.status = response.status;
        return response;
      case "Promise":
        return response.then((x) => {
          const r2 = mapEarlyResponse(x, set2);
          if (r2 !== undefined)
            return r2;
          return;
        });
      case "Error":
        return errorToResponse(response, set2);
      case "Function":
        return mapEarlyResponse(response(), set2);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set2);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response) {
          const inherits2 = { ...set2.headers };
          if (hasHeaderShorthand)
            set2.headers = response.headers.toJSON();
          else
            for (const [key, value15] of response.headers.entries())
              if (key in set2.headers)
                set2.headers[key] = value15;
          for (const key in inherits2)
            response.headers.append(key, inherits2[key]);
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        const r = JSON.stringify(response);
        if (r.charCodeAt(0) === 123) {
          if (!set2.headers["Content-Type"])
            set2.headers["Content-Type"] = "application/json";
          return new Response(JSON.stringify(response), set2);
        }
        return new Response(r, set2);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set2);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "ReadableStream":
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        return response;
      case "Promise":
        return response.then((x) => {
          const r2 = mapEarlyResponse(x, set2);
          if (r2 !== undefined)
            return r2;
          return;
        });
      case "Error":
        return errorToResponse(response, set2);
      case "Function":
        return mapCompactResponse(response());
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response)
          return new Response(response.body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        const r = JSON.stringify(response);
        if (r.charCodeAt(0) === 123)
          return new Response(JSON.stringify(response), {
            headers: {
              "Content-Type": "application/json"
            }
          });
        return new Response(r);
    }
};
var mapCompactResponse = (response) => {
  if (response?.$passthrough)
    response = response[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE])
    return mapResponse(response.response, {
      status: response[ELYSIA_RESPONSE],
      headers: {}
    });
  switch (response?.constructor?.name) {
    case "String":
      return new Response(response);
    case "Blob":
      return handleFile(response);
    case "Object":
    case "Array":
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "ReadableStream":
      return new Response(response, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8"
        }
      });
    case undefined:
      if (!response)
        return new Response("");
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "Response":
      return response;
    case "Error":
      return errorToResponse(response);
    case "Promise":
      return response.then(mapCompactResponse);
    case "Function":
      return mapCompactResponse(response());
    case "Number":
    case "Boolean":
      return new Response(response.toString());
    default:
      if (response instanceof Response)
        return new Response(response.body, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      if (response instanceof Promise)
        return response.then(mapCompactResponse);
      if (response instanceof Error)
        return errorToResponse(response);
      const r = JSON.stringify(response);
      if (r.charCodeAt(0) === 123)
        return new Response(JSON.stringify(response), {
          headers: {
            "Content-Type": "application/json"
          }
        });
      return new Response(r);
  }
};
var errorToResponse = (error22, set2) => new Response(JSON.stringify({
  name: error22?.name,
  message: error22?.message,
  cause: error22?.cause
}), {
  status: set2?.status !== 200 ? set2?.status ?? 500 : 500,
  headers: set2?.headers
});
var isObject = (item) => item && typeof item === "object" && !Array.isArray(item);
var replaceUrlPath = (url, pathname) => {
  const urlObject = new URL(url);
  urlObject.pathname = pathname;
  return urlObject.toString();
};
var isClass = (v) => typeof v === "function" && /^\s*class\s+/.test(v.toString()) || v.toString().startsWith("[object ") || isNotEmpty(Object.getPrototypeOf(v));
var mergeDeep = (target, source, {
  skipKeys
} = {}) => {
  if (isObject(target) && isObject(source))
    for (const [key, value15] of Object.entries(source)) {
      if (skipKeys?.includes(key))
        continue;
      if (!isObject(value15)) {
        target[key] = value15;
        continue;
      }
      if (!(key in target)) {
        target[key] = value15;
        continue;
      }
      if (isClass(value15)) {
        target[key] = value15;
        continue;
      }
      target[key] = mergeDeep(target[key], value15);
    }
  return target;
};
var mergeCookie = (target, source) => mergeDeep(target, source, {
  skipKeys: ["properties"]
});
var mergeObjectArray = (a, b) => {
  if (!a)
    return [];
  const array5 = [...Array.isArray(a) ? a : [a]];
  const checksums = [];
  for (const item of array5) {
    if (item.$elysiaChecksum)
      checksums.push(item.$elysiaChecksum);
  }
  for (const item of Array.isArray(b) ? b : [b]) {
    if (!checksums.includes(item?.$elysiaChecksum)) {
      array5.push(item);
    }
  }
  return array5;
};
var primitiveHooks = [
  "start",
  "request",
  "parse",
  "transform",
  "resolve",
  "beforeHandle",
  "afterHandle",
  "onResponse",
  "mapResponse",
  "trace",
  "error",
  "stop",
  "body",
  "headers",
  "params",
  "query",
  "response",
  "type",
  "detail"
];
var mergeHook = (a, b) => {
  return {
    ...a,
    ...b,
    body: b?.body ?? a?.body,
    headers: b?.headers ?? a?.headers,
    params: b?.params ?? a?.params,
    query: b?.query ?? a?.query,
    response: b?.response ?? a?.response,
    type: a?.type || b?.type,
    detail: mergeDeep(b?.detail ?? {}, a?.detail ?? {}),
    parse: mergeObjectArray(a?.parse ?? [], b?.parse ?? []),
    transform: mergeObjectArray(a?.transform ?? [], b?.transform ?? []),
    beforeHandle: mergeObjectArray(a?.beforeHandle ?? [], b?.beforeHandle ?? []),
    afterHandle: mergeObjectArray(a?.afterHandle ?? [], b?.afterHandle ?? []),
    onResponse: mergeObjectArray(a?.onResponse ?? [], b?.onResponse ?? []),
    mapResponse: mergeObjectArray(a?.mapResponse ?? [], b?.mapResponse ?? []),
    trace: mergeObjectArray(a?.trace ?? [], b?.trace ?? []),
    error: mergeObjectArray(a?.error ?? [], b?.error ?? [])
  };
};
var getSchemaValidator = (s, {
  models = {},
  additionalProperties = false,
  dynamic = false
}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const schema3 = typeof s === "string" ? models[s] : s;
  if (schema3.type === "object" && ("additionalProperties" in schema3) === false)
    schema3.additionalProperties = additionalProperties;
  if (dynamic)
    return {
      schema: schema3,
      references: "",
      checkFunc: () => {
      },
      code: "",
      Check: (value15) => exports_value2.Check(schema3, value15),
      Errors: (value15) => exports_value2.Errors(schema3, value15),
      Code: () => ""
    };
  return TypeCompiler.Compile(schema3, Object.values(models));
};
var getResponseSchemaValidator = (s, {
  models = {},
  additionalProperties = false,
  dynamic = false
}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const maybeSchemaOrRecord = typeof s === "string" ? models[s] : s;
  const compile = (schema3, references) => {
    if (dynamic)
      return {
        schema: schema3,
        references: "",
        checkFunc: () => {
        },
        code: "",
        Check: (value15) => exports_value2.Check(schema3, value15),
        Errors: (value15) => exports_value2.Errors(schema3, value15),
        Code: () => ""
      };
    return TypeCompiler.Compile(schema3, references);
  };
  if (Kind in maybeSchemaOrRecord) {
    if (("additionalProperties" in maybeSchemaOrRecord) === false)
      maybeSchemaOrRecord.additionalProperties = additionalProperties;
    return {
      200: compile(maybeSchemaOrRecord, Object.values(models))
    };
  }
  const record4 = {};
  Object.keys(maybeSchemaOrRecord).forEach((status) => {
    const maybeNameOrSchema = maybeSchemaOrRecord[+status];
    if (typeof maybeNameOrSchema === "string") {
      if (maybeNameOrSchema in models) {
        const schema3 = models[maybeNameOrSchema];
        schema3.type === "object" && ("additionalProperties" in schema3);
        record4[+status] = (Kind in schema3) ? compile(schema3, Object.values(models)) : schema3;
      }
      return;
    }
    if (maybeNameOrSchema.type === "object" && ("additionalProperties" in maybeNameOrSchema) === false)
      maybeNameOrSchema.additionalProperties = additionalProperties;
    record4[+status] = (Kind in maybeNameOrSchema) ? compile(maybeNameOrSchema, Object.values(models)) : maybeNameOrSchema;
  });
  return record4;
};
var isBun = typeof Bun !== "undefined";
var hasHash = isBun && typeof Bun.hash === "function";
var checksum = (s) => {
  if (hasHash)
    return Bun.hash(s);
  let h = 9;
  for (let i = 0;i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return h = h ^ h >>> 9;
};
var mergeLifeCycle = (a, b, checksum2) => {
  const injectChecksum = (x) => {
    if (checksum2 && !x.$elysiaChecksum)
      x.$elysiaChecksum = checksum2;
    return x;
  };
  return {
    ...a,
    ...b,
    start: mergeObjectArray(a.start, ("start" in b ? b.start ?? [] : []).map(injectChecksum)),
    request: mergeObjectArray(a.request, ("request" in b ? b.request ?? [] : []).map(injectChecksum)),
    parse: mergeObjectArray(a.parse, "parse" in b ? b?.parse ?? [] : []).map(injectChecksum),
    transform: mergeObjectArray(a.transform, (b?.transform ?? []).map(injectChecksum)),
    beforeHandle: mergeObjectArray(a.beforeHandle, (b?.beforeHandle ?? []).map(injectChecksum)),
    afterHandle: mergeObjectArray(a.afterHandle, (b?.afterHandle ?? []).map(injectChecksum)),
    mapResponse: mergeObjectArray(a.mapResponse, (b?.mapResponse ?? []).map(injectChecksum)),
    onResponse: mergeObjectArray(a.onResponse, (b?.onResponse ?? []).map(injectChecksum)),
    trace: a.trace,
    error: mergeObjectArray(a.error, (b?.error ?? []).map(injectChecksum)),
    stop: mergeObjectArray(a.stop, ("stop" in b ? b.stop ?? [] : []).map(injectChecksum))
  };
};
var asGlobal = (fn, inject = true) => {
  if (!fn)
    return fn;
  if (typeof fn === "function") {
    if (inject)
      fn.$elysiaHookType = "global";
    else
      fn.$elysiaHookType = undefined;
    return fn;
  }
  return fn.map((x) => {
    if (inject)
      x.$elysiaHookType = "global";
    else
      x.$elysiaHookType = undefined;
    return x;
  });
};
var filterGlobal = (fn) => {
  if (!fn)
    return fn;
  if (typeof fn === "function") {
    return fn.$elysiaHookType === "global" ? fn : undefined;
  }
  return fn.filter((x) => x.$elysiaHookType === "global");
};
var filterGlobalHook = (hook) => {
  return {
    ...hook,
    type: hook?.type,
    detail: hook?.detail,
    parse: filterGlobal(hook?.parse),
    transform: filterGlobal(hook?.transform),
    beforeHandle: filterGlobal(hook?.beforeHandle),
    afterHandle: filterGlobal(hook?.afterHandle),
    onResponse: filterGlobal(hook?.onResponse),
    error: filterGlobal(hook?.error)
  };
};
var StatusMap = {
  Continue: 100,
  "Switching Protocols": 101,
  Processing: 102,
  "Early Hints": 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-Authoritative Information": 203,
  "No Content": 204,
  "Reset Content": 205,
  "Partial Content": 206,
  "Multi-Status": 207,
  "Already Reported": 208,
  "Multiple Choices": 300,
  "Moved Permanently": 301,
  Found: 302,
  "See Other": 303,
  "Not Modified": 304,
  "Temporary Redirect": 307,
  "Permanent Redirect": 308,
  "Bad Request": 400,
  Unauthorized: 401,
  "Payment Required": 402,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  "Not Acceptable": 406,
  "Proxy Authentication Required": 407,
  "Request Timeout": 408,
  Conflict: 409,
  Gone: 410,
  "Length Required": 411,
  "Precondition Failed": 412,
  "Payload Too Large": 413,
  "URI Too Long": 414,
  "Unsupported Media Type": 415,
  "Range Not Satisfiable": 416,
  "Expectation Failed": 417,
  "I'm a teapot": 418,
  "Misdirected Request": 421,
  "Unprocessable Content": 422,
  Locked: 423,
  "Failed Dependency": 424,
  "Too Early": 425,
  "Upgrade Required": 426,
  "Precondition Required": 428,
  "Too Many Requests": 429,
  "Request Header Fields Too Large": 431,
  "Unavailable For Legal Reasons": 451,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
  "Service Unavailable": 503,
  "Gateway Timeout": 504,
  "HTTP Version Not Supported": 505,
  "Variant Also Negotiates": 506,
  "Insufficient Storage": 507,
  "Loop Detected": 508,
  "Not Extended": 510,
  "Network Authentication Required": 511
};
var signCookie = async (val, secret) => {
  if (typeof val !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const encoder = new TextEncoder;
  const secretKey = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const hmacBuffer = await crypto.subtle.sign("HMAC", secretKey, encoder.encode(val));
  const hmacArray = Array.from(new Uint8Array(hmacBuffer));
  const digest = btoa(String.fromCharCode(...hmacArray));
  return `${val}.${digest.replace(/=+$/, "")}`;
};
var unsignCookie = async (input, secret) => {
  if (typeof input !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const tentativeValue = input.slice(0, input.lastIndexOf("."));
  const expectedInput = await signCookie(tentativeValue, secret);
  return expectedInput === input ? tentativeValue : false;
};
var traceBackMacro = (extension, property, hooks = property) => {
  for (const [key, value15] of Object.entries(property ?? {})) {
    if (primitiveHooks.includes(key) || !(key in extension))
      continue;
    if (typeof extension[key] === "function") {
      extension[key](value15);
    } else if (typeof extension[key] === "object")
      traceBackMacro(extension[key], value15, hooks);
  }
};
var isNumericString = (message) => {
  if (message.length < 16)
    return message.trim().length !== 0 && !Number.isNaN(Number(message));
  if (message.length === 16) {
    const numVal = Number(message);
    if (numVal.toString() === message)
      return message.trim().length !== 0 && !Number.isNaN(numVal);
  }
  return false;
};
var env = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : undefined;
var ERROR_CODE = Symbol("ElysiaErrorCode");
var ELYSIA_RESPONSE = Symbol("ElysiaResponse");
var isProduction = (env?.NODE_ENV ?? env?.ENV) === "production";
var InternalServerError = class extends Error {
  constructor(message) {
    super(message ?? "INTERNAL_SERVER_ERROR");
    this.code = "INTERNAL_SERVER_ERROR";
    this.status = 500;
  }
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message ?? "NOT_FOUND");
    this.code = "NOT_FOUND";
    this.status = 404;
  }
};
var InvalidCookieSignature = class extends Error {
  constructor(key, message) {
    super(message ?? `"${key}" has invalid cookie signature`);
    this.key = key;
    this.code = "INVALID_COOKIE_SIGNATURE";
    this.status = 400;
  }
};
var ValidationError = class _ValidationError extends Error {
  constructor(type75, validator, value15) {
    const error22 = isProduction ? undefined : ("Errors" in validator) ? validator.Errors(value15).First() : exports_value2.Errors(validator, value15).First();
    const customError = error22?.schema.error ? typeof error22.schema.error === "function" ? error22.schema.error(type75, validator, value15) : error22.schema.error : undefined;
    const accessor = error22?.path?.slice(1) || "root";
    let message = "";
    if (customError) {
      message = typeof customError === "object" ? JSON.stringify(customError) : customError + "";
    } else if (isProduction) {
      message = JSON.stringify({
        type: type75,
        message: error22?.message
      });
    } else {
      message = JSON.stringify({
        type: type75,
        at: accessor,
        message: error22?.message,
        expected: exports_value2.Create(validator.schema),
        found: value15,
        errors: [...validator.Errors(value15)]
      }, null, 2);
    }
    super(message);
    this.type = type75;
    this.validator = validator;
    this.value = value15;
    this.code = "VALIDATION";
    this.status = 400;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  static simplifyModel(validator) {
    const model = "schema" in validator ? validator.schema : validator;
    try {
      return exports_value2.Create(model);
    } catch {
      return model;
    }
  }
  get model() {
    return _ValidationError.simplifyModel(this.validator);
  }
  toResponse(headers) {
    return new Response(this.message, {
      status: 400,
      headers
    });
  }
};
var websocket = {
  open(ws) {
    ws.data.open?.(ws);
  },
  message(ws, message) {
    ws.data.message?.(ws, message);
  },
  drain(ws) {
    ws.data.drain?.(ws);
  },
  close(ws, code, reason) {
    ws.data.close?.(ws, code, reason);
  }
};
var ElysiaWS = class {
  constructor(raw, data) {
    this.raw = raw;
    this.data = data;
    this.validator = raw.data.validator;
    if (raw.data.id) {
      this.id = raw.data.id;
    } else {
      const array5 = new Uint32Array(1);
      crypto.getRandomValues(array5);
      this.id = array5[0].toString();
    }
  }
  get id() {
    return this.raw.data.id;
  }
  set id(newID) {
    this.raw.data.id = newID;
  }
  get publish() {
    return (topic, data = undefined, compress) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.publish(topic, data, compress);
      return this;
    };
  }
  get send() {
    return (data) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (Buffer.isBuffer(data)) {
        this.raw.send(data);
        return this;
      }
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.send(data);
      return this;
    };
  }
  get subscribe() {
    return (room) => {
      this.raw.subscribe(room);
      return this;
    };
  }
  get unsubscribe() {
    return (room) => {
      this.raw.unsubscribe(room);
      return this;
    };
  }
  get cork() {
    return (callback) => {
      this.raw.cork(callback);
      return this;
    };
  }
  get close() {
    return () => {
      this.raw.close();
      return this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
};
var headersHasToJSON = new Headers().toJSON;
var findAliases = new RegExp(` (\\w+) = context`, "g");
var requestId = { value: 0 };
var createReport = ({
  hasTrace,
  hasTraceSet = false,
  addFn,
  condition = {}
}) => {
  if (hasTrace) {
    addFn(`
const reporter = getReporter()
`);
    return (event, {
      name,
      attribute = "",
      unit = 0
    } = {}) => {
      const dotIndex = event.indexOf(".");
      const isGroup = dotIndex === -1;
      if (event !== "request" && event !== "response" && !condition[isGroup ? event : event.slice(0, dotIndex)])
        return () => {
          if (hasTraceSet && event === "afterHandle")
            addFn(`
await traceDone
`);
        };
      if (isGroup)
        name ||= event;
      else
        name ||= "anonymous";
      addFn("\n" + `reporter.emit('event', {
					id,
					event: '${event}',
					type: 'begin',
					name: '${name}',
					time: performance.now(),
					${isGroup ? `unit: ${unit},` : ""}
					${attribute}
				})`.replace(/(\t| |\n)/g, "") + "\n");
      let handled = false;
      return () => {
        if (handled)
          return;
        handled = true;
        addFn("\n" + `reporter.emit('event', {
							id,
							event: '${event}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, "") + "\n");
        if (hasTraceSet && event === "afterHandle")
          addFn(`
await traceDone
`);
      };
    };
  } else {
    return () => () => {
    };
  }
};
var hasReturn = (fnLiteral) => {
  const parenthesisEnd = fnLiteral.indexOf(")");
  if (fnLiteral.charCodeAt(parenthesisEnd + 2) === 61 && fnLiteral.charCodeAt(parenthesisEnd + 5) !== 123) {
    return true;
  }
  return fnLiteral.includes("return");
};
var composeValidationFactory = (hasErrorHandler, {
  injectResponse = ""
} = {}) => ({
  composeValidation: (type75, value15 = `c.${type75}`) => hasErrorHandler ? `c.set.status = 400; throw new ValidationError(
'${type75}',
${type75},
${value15}
)` : `c.set.status = 400; return new ValidationError(
	'${type75}',
	${type75},
	${value15}
).toResponse(c.set.headers)`,
  composeResponseValidation: (name = "r") => {
    const returnError = hasErrorHandler ? `throw new ValidationError(
'response',
response[c.set.status],
${name}
)` : `return new ValidationError(
'response',
response[c.set.status],
${name}
).toResponse(c.set.headers)`;
    return `
${injectResponse}
		if(!(${name} instanceof Response) && response[c.set.status]?.Check(${name}) === false) {
	if(!(response instanceof Error))
		${returnError}
}
`;
  }
});
var isFnUse = (keyword, fnLiteral) => {
  if (fnLiteral.startsWith("[object "))
    return false;
  fnLiteral = fnLiteral.trimStart();
  fnLiteral = fnLiteral.replaceAll(/^async /g, "");
  if (/^(\w+)\(/g.test(fnLiteral))
    fnLiteral = fnLiteral.slice(fnLiteral.indexOf("("));
  const argument = fnLiteral.charCodeAt(0) === 40 || fnLiteral.startsWith("function") ? fnLiteral.slice(fnLiteral.indexOf("(") + 1, fnLiteral.indexOf(")")) : fnLiteral.slice(0, fnLiteral.indexOf("=") - 1);
  if (argument === "")
    return false;
  const restIndex = argument.charCodeAt(0) === 123 ? argument.indexOf("...") : -1;
  if (argument.charCodeAt(0) === 123) {
    if (argument.includes(keyword))
      return true;
    if (restIndex === -1)
      return false;
  }
  if (fnLiteral.match(new RegExp(`${argument}(.${keyword}|\\["${keyword}"\\])`))) {
    return true;
  }
  const restAlias = restIndex !== -1 ? argument.slice(restIndex + 3, argument.indexOf(" ", restIndex + 3)) : undefined;
  if (fnLiteral.match(new RegExp(`${restAlias}(.${keyword}|\\["${keyword}"\\])`)))
    return true;
  const aliases = [argument];
  if (restAlias)
    aliases.push(restAlias);
  for (const found of fnLiteral.matchAll(findAliases))
    aliases.push(found[1]);
  const destructuringRegex = new RegExp(`{.*?} = (${aliases.join("|")})`, "g");
  for (const [params] of fnLiteral.matchAll(destructuringRegex))
    if (params.includes(`{ ${keyword}`) || params.includes(`, ${keyword}`))
      return true;
  return false;
};
var isContextPassToFunction = (fnLiteral) => {
  fnLiteral = fnLiteral.trimStart();
  if (fnLiteral.startsWith("[object"))
    return false;
  fnLiteral = fnLiteral.replaceAll(/^async /g, "");
  if (/^(\w+)\(/g.test(fnLiteral))
    fnLiteral = fnLiteral.slice(fnLiteral.indexOf("("));
  const argument = fnLiteral.charCodeAt(0) === 40 || fnLiteral.startsWith("function") ? fnLiteral.slice(fnLiteral.indexOf("(") + 1, fnLiteral.indexOf(")")) : fnLiteral.slice(0, fnLiteral.indexOf("=") - 1);
  if (argument === "")
    return false;
  const restIndex = argument.charCodeAt(0) === 123 ? argument.indexOf("...") : -1;
  const restAlias = restIndex !== -1 ? argument.slice(restIndex + 3, argument.indexOf(" ", restIndex + 3)) : undefined;
  const aliases = [argument];
  if (restAlias)
    aliases.push(restAlias);
  for (const found of fnLiteral.matchAll(findAliases))
    aliases.push(found[1]);
  for (const alias of aliases)
    if (new RegExp(`\\b\\w+\\([^)]*\\b${alias}\\b[^)]*\\)`).test(fnLiteral))
      return true;
  const destructuringRegex = new RegExp(`{.*?} = (${aliases.join("|")})`, "g");
  for (const [renamed] of fnLiteral.matchAll(destructuringRegex))
    if (new RegExp(`\\b\\w+\\([^)]*\\b${renamed}\\b[^)]*\\)`).test(fnLiteral))
      return true;
  return false;
};
var KindSymbol = Symbol.for("TypeBox.Kind");
var hasType = (type75, schema3) => {
  if (!schema3)
    return;
  if ((KindSymbol in schema3) && schema3[KindSymbol] === type75)
    return true;
  if (schema3.type === "object") {
    const properties = schema3.properties;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasType(type75, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasType(type75, property.anyOf[i]))
            return true;
      }
      if ((KindSymbol in property) && property[KindSymbol] === type75)
        return true;
    }
    return false;
  }
  return schema3.properties && (KindSymbol in schema3.properties) && schema3.properties[KindSymbol] === type75;
};
var hasProperty = (expectedProperty, schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object") {
    const properties = schema3.properties;
    if (!properties)
      return false;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (expectedProperty in property)
        return true;
      if (property.type === "object") {
        if (hasProperty(expectedProperty, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++) {
          if (hasProperty(expectedProperty, property.anyOf[i]))
            return true;
        }
      }
    }
    return false;
  }
  return expectedProperty in schema3;
};
var TransformSymbol = Symbol.for("TypeBox.Transform");
var hasTransform = (schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object" && schema3.properties) {
    const properties = schema3.properties;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasTransform(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasTransform(property.anyOf[i]))
            return true;
      }
      const hasTransformSymbol = TransformSymbol in property;
      if (hasTransformSymbol)
        return true;
    }
    return false;
  }
  return (TransformSymbol in schema3) || schema3.properties && (TransformSymbol in schema3.properties);
};
var getUnionedType = (validator) => {
  if (!validator)
    return;
  const schema3 = validator?.schema;
  if (schema3 && ("anyOf" in schema3)) {
    let foundDifference = false;
    const type75 = schema3.anyOf[0].type;
    for (const validator2 of schema3.anyOf) {
      if (validator2.type !== type75) {
        foundDifference = true;
        break;
      }
    }
    if (!foundDifference)
      return type75;
  }
  return validator.schema?.type;
};
var matchFnReturn = /(?:return|=>) \S+\(/g;
var isAsync = (fn) => {
  if (fn.constructor.name === "AsyncFunction")
    return true;
  const literal14 = fn.toString();
  if (literal14.includes("=> response.clone("))
    return false;
  return !!literal14.match(matchFnReturn);
};
var getDestructureQuery = (fn) => {
  if (!fn.includes("query: {") || fn.includes("query,") || fn.includes("query }"))
    return false;
  const start = fn.indexOf("query: {");
  fn = fn.slice(start + 9);
  fn = fn.slice(0, fn.indexOf("}"));
  return fn.split(",").map((x) => {
    const indexOf = x.indexOf(":");
    if (indexOf === -1)
      return x.trim();
    return x.slice(0, indexOf).trim();
  });
};
var composeHandler = ({
  path,
  method,
  hooks,
  validator,
  handler,
  handleError,
  definitions,
  schema: schema3,
  onRequest,
  config,
  getReporter,
  setHeader
}) => {
  const hasErrorHandler = config.forceErrorEncapsulation || hooks.error.length > 0 || typeof Bun === "undefined" || hooks.onResponse.length > 0 || !!hooks.trace.length;
  const isHandleFn = typeof handler === "function";
  const handle = isHandleFn ? `handler(c)` : `handler`;
  const handleResponse = hooks.onResponse.length ? `
;(async () => {${hooks.onResponse.map((_, i) => `await res${i}(c)`).join(";")}})();
` : "";
  const traceLiteral = hooks.trace.map((x) => x.toString());
  let hasUnknownContext = false;
  if (isHandleFn && isContextPassToFunction(handler.toString()))
    hasUnknownContext = true;
  if (!hasUnknownContext)
    for (const [key, value15] of Object.entries(hooks)) {
      if (!Array.isArray(value15) || !value15.length || ![
        "parse",
        "transform",
        "beforeHandle",
        "afterHandle",
        "onResponse"
      ].includes(key))
        continue;
      for (const handle2 of value15) {
        if (typeof handle2 !== "function")
          continue;
        if (isContextPassToFunction(handle2.toString())) {
          hasUnknownContext = true;
          break;
        }
      }
      if (hasUnknownContext)
        break;
    }
  const traceConditions = {
    parse: traceLiteral.some((x) => isFnUse("parse", x)),
    transform: traceLiteral.some((x) => isFnUse("transform", x)),
    handle: traceLiteral.some((x) => isFnUse("handle", x)),
    beforeHandle: traceLiteral.some((x) => isFnUse("beforeHandle", x)),
    afterHandle: traceLiteral.some((x) => isFnUse("afterHandle", x)),
    error: hasErrorHandler || traceLiteral.some((x) => isFnUse("error", x))
  };
  const hasTrace = hooks.trace.length > 0;
  let fnLiteral = "";
  const lifeCycleLiteral = validator || method !== "GET" && method !== "HEAD" ? [
    handler,
    ...hooks.transform,
    ...hooks.beforeHandle,
    ...hooks.afterHandle,
    ...hooks.mapResponse
  ].map((x) => typeof x === "function" ? x.toString() : `${x}`) : [];
  const hasBody = method !== "GET" && method !== "HEAD" && (hasUnknownContext || hooks.type !== "none" && (!!validator.body || !!hooks.type || lifeCycleLiteral.some((fn) => isFnUse("body", fn))));
  const hasHeaders = hasUnknownContext || validator.headers || lifeCycleLiteral.some((fn) => isFnUse("headers", fn)) || setHeader && Object.keys(setHeader).length;
  const hasCookie = hasUnknownContext || !!validator.cookie || lifeCycleLiteral.some((fn) => isFnUse("cookie", fn));
  const cookieMeta = validator?.cookie?.schema;
  let encodeCookie = "";
  if (cookieMeta?.sign) {
    if (!cookieMeta.secrets)
      throw new Error(`t.Cookie required secret which is not set in (${method}) ${path}.`);
    const secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
    encodeCookie += `const _setCookie = c.set.cookie
		if(_setCookie) {`;
    if (cookieMeta.sign === true) {
      encodeCookie += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${secret}')
			}`;
    } else
      for (const name of cookieMeta.sign) {
        encodeCookie += `if(_setCookie['${name}']?.value) { c.set.cookie['${name}'].value = await signCookie(_setCookie['${name}'].value, '${secret}') }
`;
      }
    encodeCookie += "}\n";
  }
  const { composeValidation, composeResponseValidation } = composeValidationFactory(hasErrorHandler);
  if (hasHeaders) {
    fnLiteral += headersHasToJSON ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  }
  if (hasCookie) {
    const get = (name, defaultValue) => {
      const value15 = cookieMeta?.[name] ?? defaultValue;
      if (!value15)
        return typeof defaultValue === "string" ? `${name}: "${defaultValue}",` : `${name}: ${defaultValue},`;
      if (typeof value15 === "string")
        return `${name}: '${value15}',`;
      if (value15 instanceof Date)
        return `${name}: new Date(${value15.getTime()}),`;
      return `${name}: ${value15},`;
    };
    const options = cookieMeta ? `{
			secret: ${cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? `'${cookieMeta.secrets}'` : "[" + cookieMeta.secrets.reduce((a, b) => a + `'${b}',`, "") + "]" : "undefined"},
			sign: ${cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? "[" + cookieMeta.sign.reduce((a, b) => a + `'${b}',`, "") + "]" : "undefined"},
			${get("domain")}
			${get("expires")}
			${get("httpOnly")}
			${get("maxAge")}
			${get("path", "/")}
			${get("priority")}
			${get("sameSite")}
			${get("secure")}
		}` : "undefined";
    if (hasHeaders)
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${options})
`;
    else
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${options})
`;
  }
  const hasQuery = hasUnknownContext || validator.query || lifeCycleLiteral.some((fn) => isFnUse("query", fn));
  if (hasQuery) {
    let destructured = [];
    let referenceFullQuery = false;
    if (validator.query && validator.query.schema.type === "object") {
      destructured = Object.keys(validator.query.schema.properties);
    } else
      for (const event of lifeCycleLiteral) {
        const queries = getDestructureQuery(event);
        if (!queries) {
          referenceFullQuery = true;
          continue;
        }
        for (const query of queries)
          if (destructured.indexOf(query) === -1)
            destructured.push(query);
      }
    if (!referenceFullQuery && destructured.length) {
      fnLiteral += `
			let requestUrl = c.request.url.slice(c.qi + 1)
			if(requestUrl.includes('+')) requestUrl = requestUrl.replaceAll('+', ' ')

			if(c.qi !== -1) {	
				const url = decodeURIComponent(requestUrl)
				let memory = 0

				${destructured.map((name, index) => `
						memory = url.indexOf('${name}=')

						const a${index} = memory === -1 ? undefined : url.slice(memory = memory + ${name.length + 1}, (memory = url.indexOf('&', memory)) === -1 ? undefined : memory)`).join("\n")}

				c.query = {
					${destructured.map((name, index) => `'${name}': a${index}`).join(", ")}
				}
			} else {
				c.query = {}
			}`;
    } else {
      fnLiteral += `c.query = c.qi !== -1 ? parseQuery(decodeURIComponent(c.request.url.slice(c.qi + 1))) : {}`;
    }
  }
  const traceLiterals = hooks.trace.map((x) => x.toString());
  const hasTraceSet = traceLiterals.some((fn) => isFnUse("set", fn) || isContextPassToFunction(fn));
  hasUnknownContext || hooks.trace.some((fn) => isFnUse("set", fn.toString()));
  const hasSet = setHeader && Object.keys(setHeader).length || hasTraceSet || hasCookie || lifeCycleLiteral.some((fn) => isFnUse("set", fn)) || onRequest.some((fn) => isFnUse("set", fn.toString()));
  if (hasTrace)
    fnLiteral += "\nconst id = c.$$requestId\n";
  const report = createReport({
    hasTrace,
    hasTraceSet,
    condition: traceConditions,
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  fnLiteral += hasErrorHandler ? "\n try {\n" : "";
  if (hasTraceSet) {
    fnLiteral += `
const traceDone = Promise.all([`;
    for (let i = 0;i < hooks.trace.length; i++) {
      fnLiteral += `new Promise(r => { reporter.once(\`res\${id}.${i}\`, r) }),`;
    }
    fnLiteral += `])
`;
  }
  const isAsyncHandler = typeof handler === "function" && isAsync(handler);
  const maybeAsync = hasCookie || hasBody || hasTraceSet || isAsyncHandler || !!hooks.mapResponse.length || hooks.parse.length > 0 || hooks.afterHandle.some(isAsync) || hooks.beforeHandle.some(isAsync) || hooks.transform.some(isAsync);
  const endParse = report("parse", {
    unit: hooks.parse.length
  });
  if (hasBody) {
    const type75 = getUnionedType(validator?.body);
    if (hooks.type && !Array.isArray(hooks.type)) {
      if (hooks.type) {
        switch (hooks.type) {
          case "json":
          case "application/json":
            fnLiteral += `c.body = await c.request.json()
`;
            break;
          case "text":
          case "text/plain":
            fnLiteral += `c.body = await c.request.text()
`;
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            fnLiteral += `c.body = parseQuery(await c.request.text())
`;
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            fnLiteral += `c.body = await c.request.arrayBuffer()
`;
            break;
          case "formdata":
          case "multipart/form-data":
            fnLiteral += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
`;
            break;
        }
      }
      if (hooks.parse.length)
        fnLiteral += "}}";
    } else {
      const getAotParser = () => {
        if (hooks.parse.length && type75 && !Array.isArray(hooks.type)) {
          const schema22 = validator?.body?.schema;
          switch (type75) {
            case "object":
              if (hasType("File", schema22) || hasType("Files", schema22))
                return `c.body = {}

								const form = await c.request.formData()
								for (const key of form.keys()) {
									if (c.body[key])
										continue

									const value = form.getAll(key)
									if (value.length === 1)
										c.body[key] = value[0]
									else c.body[key] = value
								}`;
              break;
            default:
              break;
          }
        }
      };
      const aotParse = getAotParser();
      if (aotParse)
        fnLiteral += aotParse;
      else {
        fnLiteral += "\n";
        fnLiteral += hasHeaders ? `let contentType = c.headers['content-type']` : `let contentType = c.request.headers.get('content-type')`;
        fnLiteral += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)
`;
        if (hooks.parse.length) {
          fnLiteral += `let used = false
`;
          const endReport = report("parse", {
            unit: hooks.parse.length
          });
          for (let i = 0;i < hooks.parse.length; i++) {
            const endUnit = report("parse.unit", {
              name: hooks.parse[i].name
            });
            const name = `bo${i}`;
            if (i !== 0)
              fnLiteral += `if(!used) {
`;
            fnLiteral += `let ${name} = parse[${i}](c, contentType)
`;
            fnLiteral += `if(${name} instanceof Promise) ${name} = await ${name}
`;
            fnLiteral += `if(${name} !== undefined) { c.body = ${name}; used = true }
`;
            endUnit();
            if (i !== 0)
              fnLiteral += `}`;
          }
          endReport();
        }
        if (hooks.parse.length)
          fnLiteral += `if (!used)`;
        fnLiteral += `
				switch (contentType) {
					case 'application/json':
						c.body = await c.request.json()
						break

					case 'text/plain':
						c.body = await c.request.text()
						break

					case 'application/x-www-form-urlencoded':
						c.body = parseQuery(await c.request.text())
						break

					case 'application/octet-stream':
						c.body = await c.request.arrayBuffer();
						break

					case 'multipart/form-data':
						c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}

						break
					}
`;
        fnLiteral += "}\n";
      }
    }
    fnLiteral += "\n";
  }
  endParse();
  if (hooks?.transform) {
    const endTransform = report("transform", {
      unit: hooks.transform.length
    });
    for (let i = 0;i < hooks.transform.length; i++) {
      const transform7 = hooks.transform[i];
      const endUnit = report("transform.unit", {
        name: transform7.name
      });
      if (transform7.$elysia === "derive")
        fnLiteral += isAsync(transform7) ? `Object.assign(c, await transform[${i}](c));` : `Object.assign(c, transform[${i}](c));`;
      else
        fnLiteral += isAsync(transform7) ? `await transform[${i}](c);` : `transform[${i}](c);`;
      endUnit();
    }
    endTransform();
  }
  if (validator) {
    fnLiteral += "\n";
    if (validator.headers) {
      if (hasProperty("default", validator.headers.params))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.headers.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : `'${value15}'`;
          if (parsed)
            fnLiteral += `c.headers['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(headers.Check(c.headers) === false) {
				${composeValidation("headers")}
			}`;
      if (hasTransform(validator.headers.schema))
        fnLiteral += `
c.headers = headers.Decode(c.headers)
`;
    }
    if (validator.params) {
      if (hasProperty("default", validator.params.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.params.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : `'${value15}'`;
          if (parsed)
            fnLiteral += `c.params['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(params.Check(c.params) === false) {
				${composeValidation("params")}
			}`;
      if (hasTransform(validator.params.schema))
        fnLiteral += `
c.params = params.Decode(c.params)
`;
    }
    if (validator.query) {
      if (hasProperty("default", validator.query.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.query.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : `'${value15}'`;
          if (parsed)
            fnLiteral += `c.query['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(query.Check(c.query) === false) {
				${composeValidation("query")}
			}`;
      if (hasTransform(validator.query.schema))
        fnLiteral += `
c.query = query.Decode(Object.assign({}, c.query))
`;
    }
    if (validator.body) {
      if (hasProperty("default", validator.body.schema))
        fnLiteral += `if(body.Check(c.body) === false) {
    				c.body = Object.assign(${JSON.stringify(exports_value2.Default(validator.body.schema, null) ?? {})}, c.body)

    				if(body.Check(c.query) === false) {
        				${composeValidation("body")}
     			}
            }`;
      else
        fnLiteral += `if(body.Check(c.body) === false) {
			${composeValidation("body")}
		}`;
      if (hasTransform(validator.body.schema))
        fnLiteral += `
c.body = body.Decode(c.body)
`;
    }
    if (isNotEmpty(validator.cookie?.schema.properties ?? {})) {
      fnLiteral += `const cookieValue = {}
    			for(const [key, value] of Object.entries(c.cookie))
    				cookieValue[key] = value.value
`;
      if (hasProperty("default", validator.cookie.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.cookie.schema, {}))) {
          fnLiteral += `cookieValue['${key}'] = ${typeof value15 === "object" ? JSON.stringify(value15) : value15}
`;
        }
      fnLiteral += `if(cookie.Check(cookieValue) === false) {
				${composeValidation("cookie", "cookieValue")}
			}`;
      if (hasTransform(validator.cookie.schema))
        fnLiteral += `
c.cookie = params.Decode(c.cookie)
`;
    }
  }
  if (hooks?.beforeHandle) {
    const endBeforeHandle = report("beforeHandle", {
      unit: hooks.beforeHandle.length
    });
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      const beforeHandle = hooks.beforeHandle[i];
      const endUnit = report("beforeHandle.unit", {
        name: beforeHandle.name
      });
      const returning = hasReturn(beforeHandle.toString());
      if (beforeHandle.$elysia === "resolve") {
        fnLiteral += isAsync(beforeHandle) ? `Object.assign(c, await beforeHandle[${i}](c));` : `Object.assign(c, beforeHandle[${i}](c));`;
      } else if (!returning) {
        fnLiteral += isAsync(beforeHandle) ? `await beforeHandle[${i}](c);
` : `beforeHandle[${i}](c);
`;
        endUnit();
      } else {
        fnLiteral += isAsync(beforeHandle) ? `be = await beforeHandle[${i}](c);
` : `be = beforeHandle[${i}](c);
`;
        endUnit();
        fnLiteral += `if(be !== undefined) {
`;
        const endAfterHandle = report("afterHandle", {
          unit: hooks.transform.length
        });
        if (hooks.afterHandle) {
          report("handle", {
            name: isHandleFn ? handler.name : undefined
          })();
          for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
            const returning2 = hasReturn(hooks.afterHandle[i2].toString());
            const endUnit2 = report("afterHandle.unit", {
              name: hooks.afterHandle[i2].name
            });
            fnLiteral += `c.response = be
`;
            if (!returning2) {
              fnLiteral += isAsync(hooks.afterHandle[i2]) ? `await afterHandle[${i2}](c, be)
` : `afterHandle[${i2}](c, be)
`;
            } else {
              fnLiteral += isAsync(hooks.afterHandle[i2]) ? `af = await afterHandle[${i2}](c)
` : `af = afterHandle[${i2}](c)
`;
              fnLiteral += `if(af !== undefined) { c.response = be = af }
`;
            }
            endUnit2();
          }
        }
        endAfterHandle();
        if (validator.response)
          fnLiteral += composeResponseValidation("be");
        if (hooks.mapResponse.length) {
          fnLiteral += `c.response = be`;
          for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
            fnLiteral += `
if(mr === undefined) {
							mr = onMapResponse[${i2}](c)
							if(mr instanceof Promise) mr = await mr
							if(mr !== undefined) c.response = mr
						}
`;
          }
        }
        fnLiteral += encodeCookie;
        fnLiteral += `return mapEarlyResponse(be, c.set)}
`;
      }
    }
    endBeforeHandle();
  }
  if (hooks?.afterHandle.length) {
    const endHandle = report("handle", {
      name: isHandleFn ? handler.name : undefined
    });
    if (hooks.afterHandle.length)
      fnLiteral += isAsyncHandler ? `let r = c.response = await ${handle};
` : `let r = c.response = ${handle};
`;
    else
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
    endHandle();
    const endAfterHandle = report("afterHandle", {
      unit: hooks.afterHandle.length
    });
    for (let i = 0;i < hooks.afterHandle.length; i++) {
      const returning = hasReturn(hooks.afterHandle[i].toString());
      const endUnit = report("afterHandle.unit", {
        name: hooks.afterHandle[i].name
      });
      if (!returning) {
        fnLiteral += isAsync(hooks.afterHandle[i]) ? `await afterHandle[${i}](c)
` : `afterHandle[${i}](c)
`;
        endUnit();
      } else {
        fnLiteral += isAsync(hooks.afterHandle[i]) ? `af = await afterHandle[${i}](c)
` : `af = afterHandle[${i}](c)
`;
        endUnit();
        if (validator.response) {
          fnLiteral += `if(af !== undefined) {`;
          endAfterHandle();
          fnLiteral += composeResponseValidation("af");
          fnLiteral += `c.response = af }`;
        } else {
          fnLiteral += `if(af !== undefined) {`;
          endAfterHandle();
          fnLiteral += `c.response = af}
`;
        }
      }
    }
    endAfterHandle();
    fnLiteral += `r = c.response
`;
    if (validator.response)
      fnLiteral += composeResponseValidation();
    fnLiteral += encodeCookie;
    if (hooks.mapResponse.length) {
      for (let i = 0;i < hooks.mapResponse.length; i++) {
        fnLiteral += `
mr = onMapResponse[${i}](c)
				if(mr instanceof Promise) mr = await mr
				if(mr !== undefined) c.response = mr
`;
      }
    }
    if (hasSet)
      fnLiteral += `return mapResponse(r, c.set)
`;
    else
      fnLiteral += `return mapCompactResponse(r)
`;
  } else {
    const endHandle = report("handle", {
      name: isHandleFn ? handler.name : undefined
    });
    if (validator.response || hooks.mapResponse.length) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      endHandle();
      if (validator.response)
        fnLiteral += composeResponseValidation();
      report("afterHandle")();
      if (hooks.mapResponse.length) {
        fnLiteral += "c.response = r";
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          fnLiteral += `
if(mr === undefined) { 
						mr = onMapResponse[${i}](c)
						if(mr instanceof Promise) mr = await mr
    					if(mr !== undefined) r = c.response = mr
					}
`;
        }
      }
      fnLiteral += encodeCookie;
      if (handler instanceof Response)
        fnLiteral += `return ${handle}.clone()
`;
      else if (hasSet)
        fnLiteral += `return mapResponse(r, c.set)
`;
      else
        fnLiteral += `return mapCompactResponse(r)
`;
    } else {
      if (traceConditions.handle || hasCookie) {
        fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
        endHandle();
        report("afterHandle")();
        if (hooks.mapResponse.length) {
          fnLiteral += "c.response = r";
          for (let i = 0;i < hooks.mapResponse.length; i++) {
            fnLiteral += `
if(mr === undefined) {
							mr = onMapResponse[${i}](c)
							if(mr instanceof Promise) mr = await mr
    						if(mr !== undefined) r = c.response = mr
						}
`;
          }
        }
        fnLiteral += encodeCookie;
        if (hasSet)
          fnLiteral += `return mapResponse(r, c.set)
`;
        else
          fnLiteral += `return mapCompactResponse(r)
`;
      } else {
        endHandle();
        const handled = isAsyncHandler ? `await ${handle}` : handle;
        report("afterHandle")();
        if (handler instanceof Response)
          fnLiteral += `return ${handle}.clone()
`;
        else if (hasSet)
          fnLiteral += `return mapResponse(${handled}, c.set)
`;
        else
          fnLiteral += `return mapCompactResponse(${handled})
`;
      }
    }
  }
  if (hasErrorHandler || handleResponse) {
    fnLiteral += `
} catch(error) {`;
    if (!maybeAsync)
      fnLiteral += `return (async () => {`;
    fnLiteral += `const set = c.set

		if (!set.status || set.status < 300) set.status = error?.status || 500
	`;
    const endError = report("error", {
      unit: hooks.error.length
    });
    if (hooks.error.length) {
      fnLiteral += `
				c.error = error
				c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
			`;
      for (let i = 0;i < hooks.error.length; i++) {
        const name = `er${i}`;
        const endUnit = report("error.unit", {
          name: hooks.error[i].name
        });
        fnLiteral += `
let ${name} = handleErrors[${i}](c)
`;
        if (isAsync(hooks.error[i]))
          fnLiteral += `if (${name} instanceof Promise) ${name} = await ${name}
`;
        endUnit();
        fnLiteral += `${name} = mapEarlyResponse(${name}, set)
`;
        fnLiteral += `if (${name}) {`;
        fnLiteral += `return ${name} }
`;
      }
    }
    endError();
    fnLiteral += `return handleError(c, error)

`;
    if (!maybeAsync)
      fnLiteral += "})()";
    fnLiteral += "}";
    if (handleResponse || hasTrace) {
      fnLiteral += ` finally { `;
      const endResponse = report("response", {
        unit: hooks.onResponse.length
      });
      fnLiteral += handleResponse;
      endResponse();
      fnLiteral += `}`;
    }
  }
  fnLiteral = `const {
		handler,
		handleError,
		hooks: {
			transform,
			resolve,
			beforeHandle,
			afterHandle,
			mapResponse: onMapResponse,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError
		},
		schema,
		definitions,
		ERROR_CODE,
		getReporter,
		requestId,
		parseCookie,
		signCookie,
		decodeURIComponent
	} = hooks

	${hooks.onResponse.length ? `const ${hooks.onResponse.map((x, i) => `res${i} = onResponse[${i}]`).join(",")}` : ""}

	return ${maybeAsync ? "async" : ""} function handle(c) {
		${hooks.beforeHandle.length ? "let be" : ""}
		${hooks.afterHandle.length ? "let af" : ""}
		${hooks.mapResponse.length ? "let mr" : ""}

		${schema3 && definitions ? "c.schema = schema; c.defs = definitions;" : ""}
		${fnLiteral}
	}`;
  const createHandler = Function("hooks", fnLiteral);
  return createHandler({
    handler,
    hooks,
    validator,
    handleError,
    utils: {
      mapResponse,
      mapCompactResponse,
      mapEarlyResponse,
      parseQuery: import_fast_querystring.parse
    },
    error: {
      NotFoundError,
      ValidationError,
      InternalServerError
    },
    schema: schema3,
    definitions,
    ERROR_CODE,
    getReporter,
    requestId,
    parseCookie,
    signCookie,
    decodeURIComponent: import_fast_decode_uri_component.default
  });
};
var composeGeneralHandler = (app) => {
  let decoratorsLiteral = "";
  let fnLiteral = "";
  for (const key of Object.keys(app.decorators))
    decoratorsLiteral += `,${key}: app.decorators.${key}`;
  const { router, staticRouter } = app;
  const hasTrace = app.event.trace.length > 0;
  const findDynamicRoute = `
	const route = router.find(request.method, path) ${router.root.ALL ? '?? router.find("ALL", path)' : ""}
	if (route === null)
		return ${app.event.error.length ? `app.handleError(ctx, notFound)` : app.event.request.length ? `new Response(error404Message, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})` : `error404.clone()`}

	ctx.params = route.params

	return route.store(ctx)`;
  let switchMap = ``;
  for (const [path, { code, all }] of Object.entries(staticRouter.map))
    switchMap += `case '${path}':
switch(request.method) {
${code}
${all ?? `default: break map`}}

`;
  const maybeAsync = app.event.request.some(isAsync);
  fnLiteral += `const {
		app,
		app: { store, router, staticRouter, wsRouter },
		mapEarlyResponse,
		NotFoundError,
		requestId,
		getReporter,
		handleError
	} = data

	const notFound = new NotFoundError()

	${app.event.request.length ? `const onRequest = app.event.request` : ""}
	${staticRouter.variables}
	${app.event.error.length ? "" : `
	const error404Message = notFound.message.toString()
	const error404 = new Response(error404Message, { status: 404 });
	`}

	return ${maybeAsync ? "async" : ""} function map(request) {
`;
  if (app.event.request.length)
    fnLiteral += `let re`;
  const traceLiteral = app.event.trace.map((x) => x.toString());
  const report = createReport({
    hasTrace,
    hasTraceSet: app.event.trace.some((fn) => {
      const literal14 = fn.toString();
      return isFnUse("set", literal14) || isContextPassToFunction(literal14);
    }),
    condition: {
      request: traceLiteral.some((x) => isFnUse("request", x) || isContextPassToFunction(x))
    },
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  if (app.event.request.length) {
    fnLiteral += `
			${hasTrace ? "const id = +requestId.value++" : ""}

			const ctx = {
				request,
				store,
				set: {
					headers: ${Object.keys(app.setHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
					status: 200
				}
				${hasTrace ? ",$$requestId: +id" : ""}
				${decoratorsLiteral}
			}
		`;
    const endReport = report("request", {
      attribute: "ctx",
      unit: app.event.request.length
    });
    fnLiteral += `
 try {
`;
    for (let i = 0;i < app.event.request.length; i++) {
      const fn = app.event.request[i];
      const withReturn = hasReturn(fn.toString());
      const maybeAsync2 = isAsync(fn);
      const endUnit = report("request.unit", {
        name: app.event.request[i].name
      });
      if (withReturn) {
        fnLiteral += `re = mapEarlyResponse(
					${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx),
					ctx.set
				)
`;
        endUnit();
        if (withReturn)
          fnLiteral += `if(re !== undefined) return re
`;
      } else {
        fnLiteral += `${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx)
`;
        endUnit();
      }
    }
    fnLiteral += `} catch (error) {
			return app.handleError(ctx, error)
		}`;
    endReport();
    fnLiteral += `
		const url = request.url
		const s = url.indexOf('/', 11)
		const qi = ctx.qi = url.indexOf('?', s + 1)
		const path = ctx.path = url.substring(s, qi === -1 ? undefined : qi)`;
  } else {
    fnLiteral += `
		const url = request.url
		const s = url.indexOf('/', 11)
		const qi = url.indexOf('?', s + 1)
		const path = url.substring(s, qi === -1 ? undefined : qi)
		${hasTrace ? "const id = +requestId.value++" : ""}
		const ctx = {
			request,
			store,
			qi,
			path,
			set: {
				headers: ${Object.keys(app.setHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
				status: 200
			}
			${hasTrace ? ",$$requestId: id" : ""}
			${decoratorsLiteral}
		}`;
    report("request", {
      unit: app.event.request.length,
      attribute: traceLiteral.some((x) => isFnUse("context", x)) || traceLiteral.some((x) => isFnUse("store", x)) || traceLiteral.some((x) => isFnUse("set", x)) ? "ctx" : ""
    })();
  }
  const wsPaths = app.wsPaths;
  const wsRouter = app.wsRouter;
  if (Object.keys(wsPaths).length || wsRouter.history.length) {
    fnLiteral += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (const [path, index] of Object.entries(wsPaths)) {
      fnLiteral += `
					case '${path}':
						if(request.headers.get('upgrade') === 'websocket')
							return st${index}(ctx)

						break`;
    }
    fnLiteral += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = wsRouter.find('ws', path)

						if(route) {
							ctx.params = route.params

							return route.store(ctx)
						}
					}

					break
			}
		}
`;
  }
  fnLiteral += `
		map: switch(path) {
			${switchMap}

			default:
				break
		}

		${findDynamicRoute}
	}`;
  const handleError = composeErrorHandler(app);
  app.handleError = handleError;
  return Function("data", fnLiteral)({
    app,
    mapEarlyResponse,
    NotFoundError,
    getReporter: () => app.reporter,
    requestId,
    handleError
  });
};
var composeErrorHandler = (app) => {
  let fnLiteral = `const {
		app: { event: { error: onError, onResponse: res } },
		mapResponse,
		ERROR_CODE,
		ELYSIA_RESPONSE
	} = inject

	return ${app.event.error.find(isAsync) ? "async" : ""} function(context, error) {
		let r

		const { set } = context

		context.code = error.code
		context.error = error

		if(error[ELYSIA_RESPONSE]) {
			error.status = error[ELYSIA_RESPONSE]
			error.message = error.response
		}
`;
  for (let i = 0;i < app.event.error.length; i++) {
    const handler = app.event.error[i];
    const response = `${isAsync(handler) ? "await " : ""}onError[${i}](context)`;
    if (hasReturn(handler.toString()))
      fnLiteral += `r = ${response}; if(r !== undefined) {
				if(r instanceof Response) return r

				if(r[ELYSIA_RESPONSE]) {
					error.status = error[ELYSIA_RESPONSE]
					error.message = error.response
				}
		
				if(set.status === 200) set.status = error.status
				return mapResponse(r, set)
			}
`;
    else
      fnLiteral += response + "\n";
  }
  fnLiteral += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
		set.status = error.status ?? 400
		return new Response(
			error.message,
			{ headers: set.headers, status: set.status }
		)
	} else {
		if(error.code && typeof error.status === "number")
			return new Response(
				error.message,
				{ headers: set.headers, status: error.status }
			)

		return mapResponse(error, set)
	}
}`;
  return Function("inject", fnLiteral)({
    app,
    mapResponse,
    ERROR_CODE,
    ELYSIA_RESPONSE
  });
};
var createDynamicHandler = (app) => async (request) => {
  const set2 = {
    cookie: {},
    status: 200,
    headers: {}
  };
  let context;
  if (app.decorators) {
    context = app.decorators;
    context.request = request;
    context.set = set2;
    context.store = app.store;
  } else {
    context = {
      set: set2,
      store: app.store,
      request
    };
  }
  const url = request.url, s = url.indexOf("/", 11), q = url.indexOf("?", s + 1), path = q === -1 ? url.substring(s) : url.substring(s, q);
  try {
    for (let i = 0;i < app.event.request.length; i++) {
      const onRequest = app.event.request[i];
      let response2 = onRequest(context);
      if (response2 instanceof Promise)
        response2 = await response2;
      response2 = mapEarlyResponse(response2, set2);
      if (response2)
        return response2;
    }
    const handler = app.dynamicRouter.find(request.method, path) ?? app.dynamicRouter.find("ALL", path);
    if (!handler)
      throw new NotFoundError;
    const { handle, hooks, validator, content } = handler.store;
    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
      if (content) {
        switch (content) {
          case "application/json":
            body = await request.json();
            break;
          case "text/plain":
            body = await request.text();
            break;
          case "application/x-www-form-urlencoded":
            body = import_fast_querystring2.parse(await request.text());
            break;
          case "application/octet-stream":
            body = await request.arrayBuffer();
            break;
          case "multipart/form-data":
            body = {};
            const form = await request.formData();
            for (const key of form.keys()) {
              if (body[key])
                continue;
              const value15 = form.getAll(key);
              if (value15.length === 1)
                body[key] = value15[0];
              else
                body[key] = value15;
            }
            break;
        }
      } else {
        let contentType = request.headers.get("content-type");
        if (contentType) {
          const index = contentType.indexOf(";");
          if (index !== -1)
            contentType = contentType.slice(0, index);
          for (let i = 0;i < hooks.parse.length; i++) {
            let temp = hooks.parse[i](context, contentType);
            if (temp instanceof Promise)
              temp = await temp;
            if (temp) {
              body = temp;
              break;
            }
          }
          if (body === undefined) {
            switch (contentType) {
              case "application/json":
                body = await request.json();
                break;
              case "text/plain":
                body = await request.text();
                break;
              case "application/x-www-form-urlencoded":
                body = import_fast_querystring2.parse(await request.text());
                break;
              case "application/octet-stream":
                body = await request.arrayBuffer();
                break;
              case "multipart/form-data":
                body = {};
                const form = await request.formData();
                for (const key of form.keys()) {
                  if (body[key])
                    continue;
                  const value15 = form.getAll(key);
                  if (value15.length === 1)
                    body[key] = value15[0];
                  else
                    body[key] = value15;
                }
                break;
            }
          }
        }
      }
    }
    context.body = body;
    context.params = handler?.params || undefined;
    context.query = q === -1 ? {} : import_fast_querystring2.parse(url.substring(q + 1));
    context.headers = {};
    for (const [key, value15] of request.headers.entries())
      context.headers[key] = value15;
    const cookieMeta = validator?.cookie?.schema;
    context.cookie = await parseCookie(context.set, context.headers.cookie, cookieMeta ? {
      secret: cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets.join(",") : undefined,
      sign: cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? typeof cookieMeta.sign === "string" ? cookieMeta.sign : cookieMeta.sign.join(",") : undefined
    } : undefined);
    for (let i = 0;i < hooks.transform.length; i++) {
      const operation = hooks.transform[i](context);
      if (hooks.transform[i].$elysia === "derive") {
        if (operation instanceof Promise)
          Object.assign(context, await operation);
        else
          Object.assign(context, operation);
      } else if (operation instanceof Promise)
        await operation;
    }
    if (validator) {
      if (validator.headers) {
        const _header = {};
        for (const key in request.headers)
          _header[key] = request.headers.get(key);
        if (validator.headers.Check(_header) === false)
          throw new ValidationError("header", validator.headers, _header);
      }
      if (validator.params?.Check(context.params) === false)
        throw new ValidationError("params", validator.params, context.params);
      if (validator.query?.Check(context.query) === false)
        throw new ValidationError("query", validator.query, context.query);
      if (validator.cookie) {
        const cookieValue = {};
        for (const [key, value15] of Object.entries(context.cookie))
          cookieValue[key] = value15.value;
        if (validator.cookie?.Check(cookieValue) === false)
          throw new ValidationError("cookie", validator.cookie, cookieValue);
      }
      if (validator.body?.Check(body) === false)
        throw new ValidationError("body", validator.body, body);
    }
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      let response2 = hooks.beforeHandle[i](context);
      if (response2 instanceof Promise)
        response2 = await response2;
      if (response2 !== undefined) {
        context.response = response2;
        for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
          let newResponse = hooks.afterHandle[i2](context);
          if (newResponse instanceof Promise)
            newResponse = await newResponse;
          if (newResponse)
            response2 = newResponse;
        }
        const result = mapEarlyResponse(response2, context.set);
        if (result)
          return result;
      }
    }
    let response = handle(context);
    if (response instanceof Promise)
      response = await response;
    if (!hooks.afterHandle.length) {
      const responseValidator = validator?.response?.[response.status];
      if (responseValidator?.Check(response) === false)
        throw new ValidationError("response", responseValidator, response);
    } else {
      context.response = response;
      for (let i = 0;i < hooks.afterHandle.length; i++) {
        let newResponse = hooks.afterHandle[i](context);
        if (newResponse instanceof Promise)
          newResponse = await newResponse;
        const result = mapEarlyResponse(newResponse, context.set);
        if (result !== undefined) {
          const responseValidator = validator?.response?.[response.status];
          if (responseValidator?.Check(result) === false)
            throw new ValidationError("response", responseValidator, result);
          return result;
        }
      }
    }
    if (context.set.cookie && cookieMeta?.sign) {
      const secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
      if (cookieMeta.sign === true)
        for (const [key, cookie] of Object.entries(context.set.cookie))
          context.set.cookie[key].value = await signCookie(cookie.value, "${secret}");
      else
        for (const name of cookieMeta.sign) {
          if (!(name in cookieMeta.properties))
            continue;
          if (context.set.cookie[name]?.value) {
            context.set.cookie[name].value = await signCookie(context.set.cookie[name].value, secret);
          }
        }
    }
    return mapResponse(response, context.set);
  } catch (error22) {
    if (error22.status)
      set2.status = error22.status;
    return app.handleError(context, error22);
  } finally {
    for (const onResponse of app.event.onResponse)
      await onResponse(context);
  }
};
var createDynamicErrorHandler = (app) => async (context, error22) => {
  const errorContext = Object.assign(context, { error: error22, code: error22.code });
  errorContext.set = context.set;
  for (let i = 0;i < app.event.error.length; i++) {
    let response = app.event.error[i](errorContext);
    if (response instanceof Promise)
      response = await response;
    if (response !== undefined && response !== null)
      return mapResponse(response, context.set);
  }
  return new Response(typeof error22.cause === "string" ? error22.cause : error22.message, {
    headers: context.set.headers,
    status: error22.status ?? 500
  });
};
var t = Object.assign({}, Type);
try {
  TypeSystem.Format("email", (value15) => /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(value15));
  TypeSystem.Format("uuid", (value15) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value15));
  TypeSystem.Format("date", (value15) => !Number.isNaN(new Date(value15).getTime()));
  TypeSystem.Format("date-time", (value15) => !Number.isNaN(new Date(value15).getTime()));
} catch {
}
var parseFileUnit = (size) => {
  if (typeof size === "string")
    switch (size.slice(-1)) {
      case "k":
        return +size.slice(0, size.length - 1) * 1024;
      case "m":
        return +size.slice(0, size.length - 1) * 1048576;
      default:
        return +size;
    }
  return size;
};
var validateFile = (options, value15) => {
  if (!(value15 instanceof Blob))
    return false;
  if (options.minSize && value15.size < parseFileUnit(options.minSize))
    return false;
  if (options.maxSize && value15.size > parseFileUnit(options.maxSize))
    return false;
  if (options.extension)
    if (typeof options.extension === "string") {
      if (!value15.type.startsWith(options.extension))
        return false;
    } else {
      for (let i = 0;i < options.extension.length; i++)
        if (value15.type.startsWith(options.extension[i]))
          return true;
      return false;
    }
  return true;
};
var Files = TypeSystem.Type("Files", (options, value15) => {
  if (!Array.isArray(value15))
    return validateFile(options, value15);
  if (options.minItems && value15.length < options.minItems)
    return false;
  if (options.maxItems && value15.length > options.maxItems)
    return false;
  for (let i = 0;i < value15.length; i++)
    if (!validateFile(options, value15[i]))
      return false;
  return true;
});
exports_format.Set("numeric", (value15) => !!value15 && !isNaN(+value15));
exports_format.Set("boolean", (value15) => value15 === "true" || value15 === "false");
exports_format.Set("ObjectString", (value15) => {
  let start = value15.charCodeAt(0);
  if (start === 9 || start === 10 || start === 32)
    start = value15.trimStart().charCodeAt(0);
  if (start !== 123 && start !== 91)
    return false;
  try {
    JSON.parse(value15);
    return true;
  } catch {
    return false;
  }
});
var ElysiaType = {
  Numeric: (property) => {
    const schema3 = Type.Number(property);
    return t.Transform(t.Union([
      t.String({
        format: "numeric",
        default: 0
      }),
      t.Number(property)
    ], property)).Decode((value15) => {
      const number7 = +value15;
      if (isNaN(number7))
        return value15;
      if (property && !exports_value2.Check(schema3, number7))
        throw new ValidationError("property", schema3, number7);
      return number7;
    }).Encode((value15) => value15);
  },
  BooleanString: (property) => {
    const schema3 = Type.Boolean(property);
    return t.Transform(t.Union([
      t.String({
        format: "boolean",
        default: false
      }),
      t.Boolean(property)
    ], property)).Decode((value15) => {
      if (typeof value15 === "string")
        return value15 === "true";
      if (property && !exports_value2.Check(schema3, value15))
        throw new ValidationError("property", schema3, value15);
      return value15;
    }).Encode((value15) => value15);
  },
  ObjectString: (properties, options) => t.Transform(t.Union([
    t.String({
      format: "ObjectString",
      default: ""
    }),
    t.Object(properties, options)
  ], options)).Decode((value15) => {
    if (typeof value15 === "string")
      try {
        return JSON.parse(value15);
      } catch {
        return value15;
      }
    return value15;
  }).Encode((value15) => JSON.stringify(value15)),
  File: TypeSystem.Type("File", validateFile),
  Files: (options = {}) => t.Transform(t.Union([Files(options)])).Decode((value15) => {
    if (Array.isArray(value15))
      return value15;
    return [value15];
  }).Encode((value15) => value15),
  Nullable: (schema3) => t.Union([t.Null(), schema3]),
  MaybeEmpty: (schema3) => t.Union([t.Null(), t.Undefined(), schema3]),
  Cookie: (properties, options) => t.Object(properties, options)
};
t.BooleanString = ElysiaType.BooleanString;
t.ObjectString = ElysiaType.ObjectString;
t.Numeric = ElysiaType.Numeric;
t.File = (arg = {}) => ElysiaType.File({
  default: "File",
  ...arg,
  extension: arg?.type,
  type: "string",
  format: "binary"
});
t.Files = (arg = {}) => ElysiaType.Files({
  ...arg,
  elysiaMeta: "Files",
  default: "Files",
  extension: arg?.type,
  type: "array",
  items: {
    ...arg,
    default: "Files",
    type: "string",
    format: "binary"
  }
});
t.Nullable = (schema3) => ElysiaType.Nullable(schema3);
t.MaybeEmpty = ElysiaType.MaybeEmpty;
t.Cookie = ElysiaType.Cookie;
var Elysia = class _Elysia {
  constructor(config) {
    this.dependencies = {};
    this.store = {};
    this.decorators = {};
    this.definitions = {
      type: {},
      error: {}
    };
    this.schema = {};
    this.macros = [];
    this.event = {
      start: [],
      request: [],
      parse: [],
      transform: [],
      beforeHandle: [],
      afterHandle: [],
      mapResponse: [],
      onResponse: [],
      trace: [],
      error: [],
      stop: []
    };
    this.reporter = new eventemitter3_default;
    this.server = null;
    this.validator = null;
    this.router = new Memoirist;
    this.wsRouter = new Memoirist;
    this.routes = [];
    this.staticRouter = {
      handlers: [],
      variables: "",
      map: {},
      all: ""
    };
    this.wsPaths = {};
    this.dynamicRouter = new Memoirist;
    this.lazyLoadModules = [];
    this.path = "";
    this.stack = undefined;
    this.handle = async (request) => this.fetch(request);
    this.fetch = (request) => {
      if (false)
        ;
      return (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this))(request);
    };
    this.handleError = async (context, error22) => (this.handleError = this.config.aot ? composeErrorHandler(this) : createDynamicErrorHandler(this))(context, error22);
    this.outerErrorHandler = (error22) => new Response(error22.message || error22.name || "Error", {
      status: error22?.status ?? 500
    });
    this.listen = (options, callback) => {
      if (typeof Bun === "undefined")
        throw new Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
      this.compile();
      if (typeof options === "string") {
        options = +options.trim();
        if (Number.isNaN(options))
          throw new Error("Port must be a numeric value");
      }
      const fetch = this.fetch;
      const serve = typeof options === "object" ? {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        ...options || {},
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        fetch,
        error: this.outerErrorHandler
      } : {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        port: options,
        fetch,
        error: this.outerErrorHandler
      };
      this.server = Bun?.serve(serve);
      if (this.event.start.length)
        for (let i = 0;i < this.event.start.length; i++)
          this.event.start[i](this);
      if (callback)
        callback(this.server);
      process.on("beforeExit", () => {
        for (let i = 0;i < this.event.stop.length; i++)
          this.event.stop[i](this);
      });
      Promise.all(this.lazyLoadModules).then(() => {
        Bun?.gc(false);
      });
      return this;
    };
    this.stop = async () => {
      if (!this.server)
        throw new Error("Elysia isn't running. Call `app.listen` to start the server.");
      this.server.stop();
      if (this.event.stop.length)
        for (let i = 0;i < this.event.stop.length; i++)
          this.event.stop[i](this);
    };
    this.config = {
      forceErrorEncapsulation: true,
      prefix: "",
      aot: true,
      strictPath: false,
      scoped: false,
      cookie: {},
      analytic: false,
      ...config || {},
      seed: config?.seed === undefined ? "" : config?.seed
    };
    if (config?.analytic && (config?.name || config?.seed !== undefined))
      this.stack = new Error().stack;
  }
  getServer() {
    return this.server;
  }
  add(method, paths, handle, localHook, { allowMeta = false, skipPrefix = false } = {
    allowMeta: false,
    skipPrefix: false
  }) {
    if (typeof paths === "string")
      paths = [paths];
    for (let path of paths) {
      path = path === "" ? path : path.charCodeAt(0) === 47 ? path : `/${path}`;
      if (this.config.prefix && !skipPrefix && !this.config.scoped)
        path = this.config.prefix + path;
      if (localHook?.type)
        switch (localHook.type) {
          case "text":
            localHook.type = "text/plain";
            break;
          case "json":
            localHook.type = "application/json";
            break;
          case "formdata":
            localHook.type = "multipart/form-data";
            break;
          case "urlencoded":
            localHook.type = "application/x-www-form-urlencoded";
            break;
          case "arrayBuffer":
            localHook.type = "application/octet-stream";
            break;
          default:
            break;
        }
      const models = this.definitions.type;
      let cookieValidator = getSchemaValidator(localHook?.cookie ?? this.validator?.cookie, {
        dynamic: !this.config.aot,
        models,
        additionalProperties: true
      });
      if (isNotEmpty(this.config.cookie ?? {})) {
        if (cookieValidator) {
          cookieValidator.schema = mergeCookie(cookieValidator.schema, this.config.cookie ?? {});
        } else {
          cookieValidator = getSchemaValidator(t.Cookie({}, this.config.cookie), {
            dynamic: !this.config.aot,
            models,
            additionalProperties: true
          });
        }
      }
      const validator = {
        body: getSchemaValidator(localHook?.body ?? this.validator?.body, {
          dynamic: !this.config.aot,
          models
        }),
        headers: getSchemaValidator(localHook?.headers ?? this.validator?.headers, {
          dynamic: !this.config.aot,
          models,
          additionalProperties: true
        }),
        params: getSchemaValidator(localHook?.params ?? this.validator?.params, {
          dynamic: !this.config.aot,
          models
        }),
        query: getSchemaValidator(localHook?.query ?? this.validator?.query, {
          dynamic: !this.config.aot,
          models
        }),
        cookie: cookieValidator,
        response: getResponseSchemaValidator(localHook?.response ?? this.validator?.response, {
          dynamic: !this.config.aot,
          models
        })
      };
      const globalHook = this.event;
      const loosePath = path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
      if (this.macros.length) {
        const createManager = (stackName) => (type75, fn) => {
          if (typeof type75 === "function" || Array.isArray(type75)) {
            if (!localHook[stackName])
              localHook[stackName] = [];
            if (typeof localHook[stackName] === "function")
              localHook[stackName] = [localHook[stackName]];
            if (Array.isArray(type75))
              localHook[stackName] = localHook[stackName].concat(type75);
            else
              localHook[stackName].push(type75);
            return;
          }
          const { insert = "after", stack = "local" } = type75;
          if (stack === "global") {
            if (!Array.isArray(fn)) {
              if (insert === "before") {
                globalHook[stackName].unshift(fn);
              } else {
                globalHook[stackName].push(fn);
              }
            } else {
              if (insert === "before") {
                globalHook[stackName] = fn.concat(globalHook[stackName]);
              } else {
                globalHook[stackName] = globalHook[stackName].concat(fn);
              }
            }
            return;
          } else {
            if (!localHook[stackName])
              localHook[stackName] = [];
            if (typeof localHook[stackName] === "function")
              localHook[stackName] = [localHook[stackName]];
            if (!Array.isArray(fn)) {
              if (insert === "before") {
                localHook[stackName].unshift(fn);
              } else {
                localHook[stackName].push(fn);
              }
            } else {
              if (insert === "before") {
                localHook[stackName] = fn.concat(localHook[stackName]);
              } else {
                localHook[stackName] = localHook[stackName].concat(fn);
              }
            }
            return;
          }
        };
        const manager = {
          events: {
            global: globalHook,
            local: localHook
          },
          onParse: createManager("parse"),
          onTransform: createManager("transform"),
          onBeforeHandle: createManager("beforeHandle"),
          onAfterHandle: createManager("afterHandle"),
          onResponse: createManager("onResponse"),
          onError: createManager("error")
        };
        for (const macro of this.macros)
          traceBackMacro(macro(manager), localHook);
      }
      const hooks = mergeHook(globalHook, localHook);
      const isFn = typeof handle === "function";
      if (this.config.aot === false) {
        this.dynamicRouter.add(method, path, {
          validator,
          hooks,
          content: localHook?.type,
          handle
        });
        if (this.config.strictPath === false) {
          this.dynamicRouter.add(method, loosePath, {
            validator,
            hooks,
            content: localHook?.type,
            handle
          });
        }
        this.routes.push({
          method,
          path,
          composed: null,
          handler: handle,
          hooks
        });
        return;
      }
      const mainHandler = composeHandler({
        path,
        method,
        hooks,
        validator,
        handler: handle,
        handleError: this.handleError,
        onRequest: this.event.request,
        config: this.config,
        definitions: allowMeta ? this.definitions.type : undefined,
        schema: allowMeta ? this.schema : undefined,
        getReporter: () => this.reporter,
        setHeader: this.setHeaders
      });
      if (!isFn) {
        const context = Object.assign({
          headers: {},
          query: {},
          params: {},
          body: undefined,
          request: new Request(`http://localhost${path}`),
          store: this.store,
          path,
          set: {
            headers: this.setHeaders ?? {},
            status: 200
          }
        }, this.decorators);
        let response;
        for (const onRequest of Object.values(hooks.request)) {
          try {
            const inner = mapEarlyResponse(onRequest(context), context.set);
            if (inner !== undefined) {
              response = inner;
              break;
            }
          } catch (error22) {
            response = this.handleError(context, error22);
            break;
          }
        }
        if (response)
          mainHandler.response = response;
        else {
          try {
            mainHandler.response = mainHandler(context);
          } catch (error22) {
            mainHandler.response = this.handleError(context, error22);
          }
        }
      }
      const existingRouteIndex = this.routes.findIndex((route) => route.path === path && route.method === method);
      if (existingRouteIndex !== -1) {
        this.routes.splice(existingRouteIndex, 1);
      }
      this.routes.push({
        method,
        path,
        composed: mainHandler,
        handler: handle,
        hooks
      });
      if (method === "$INTERNALWS") {
        const loose = this.config.strictPath ? undefined : path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
        if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
          const index = this.staticRouter.handlers.length;
          this.staticRouter.handlers.push(mainHandler);
          if (mainHandler.response instanceof Response)
            this.staticRouter.variables += `const st${index} = staticRouter.handlers[${index}].response
`;
          else
            this.staticRouter.variables += `const st${index} = staticRouter.handlers[${index}]
`;
          this.wsPaths[path] = index;
          if (loose)
            this.wsPaths[loose] = index;
        } else {
          this.wsRouter.add("ws", path, mainHandler);
          if (loose)
            this.wsRouter.add("ws", loose, mainHandler);
        }
        return;
      }
      if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
        const index = this.staticRouter.handlers.length;
        this.staticRouter.handlers.push(mainHandler);
        if (mainHandler.response instanceof Response)
          this.staticRouter.variables += `const st${index} = staticRouter.handlers[${index}].response
`;
        else
          this.staticRouter.variables += `const st${index} = staticRouter.handlers[${index}]
`;
        if (!this.staticRouter.map[path])
          this.staticRouter.map[path] = {
            code: ""
          };
        if (method === "ALL")
          this.staticRouter.map[path].all = `default: return st${index}(ctx)
`;
        else {
          if (mainHandler.response instanceof Response)
            this.staticRouter.map[path].code = `case '${method}': return st${index}.clone()
${this.staticRouter.map[path].code}`;
          else
            this.staticRouter.map[path].code = `case '${method}': return st${index}(ctx)
${this.staticRouter.map[path].code}`;
        }
        if (!this.config.strictPath) {
          if (!this.staticRouter.map[loosePath])
            this.staticRouter.map[loosePath] = {
              code: ""
            };
          if (method === "ALL")
            this.staticRouter.map[loosePath].all = `default: return st${index}(ctx)
`;
          else {
            if (mainHandler.response instanceof Response)
              this.staticRouter.map[loosePath].code = `case '${method}': return st${index}.clone()
${this.staticRouter.map[loosePath].code}`;
            else
              this.staticRouter.map[loosePath].code = `case '${method}': return st${index}(ctx)
${this.staticRouter.map[loosePath].code}`;
          }
        }
      } else {
        this.router.add(method, path, mainHandler);
        if (!this.config.strictPath)
          this.router.add(method, path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/", mainHandler);
      }
    }
  }
  headers(header) {
    if (!header)
      return this;
    if (!this.setHeaders)
      this.setHeaders = {};
    this.setHeaders = mergeDeep(this.setHeaders, header);
    return this;
  }
  onStart(handler) {
    this.on("start", handler);
    return this;
  }
  onRequest(handler) {
    this.on("request", handler);
    return this;
  }
  onParse(parser) {
    this.on("parse", parser);
    return this;
  }
  onTransform(handler) {
    this.on("transform", handler);
    return this;
  }
  resolve(resolver2) {
    resolver2.$elysia = "resolve";
    return this.onBeforeHandle(resolver2);
  }
  onBeforeHandle(handler) {
    this.on("beforeHandle", handler);
    return this;
  }
  onAfterHandle(handler) {
    this.on("afterHandle", handler);
    return this;
  }
  mapResponse(handler) {
    this.on("mapResponse", handler);
    return this;
  }
  onResponse(handler) {
    this.on("response", handler);
    return this;
  }
  trace(handler) {
    this.reporter.on("event", createTraceListener(() => this.reporter, this.event.trace.length, handler));
    this.on("trace", handler);
    return this;
  }
  error(name, error22) {
    switch (typeof name) {
      case "string":
        error22.prototype[ERROR_CODE] = name;
        this.definitions.error[name] = error22;
        return this;
      case "function":
        this.definitions.error = name(this.definitions.error);
        return this;
    }
    for (const [code, error32] of Object.entries(name)) {
      error32.prototype[ERROR_CODE] = code;
      this.definitions.error[code] = error32;
    }
    return this;
  }
  onError(handler) {
    this.on("error", handler);
    return this;
  }
  onStop(handler) {
    this.on("stop", handler);
    return this;
  }
  on(type75, handlers) {
    for (let handler of Array.isArray(handlers) ? handlers : [handlers]) {
      handler = asGlobal(handler);
      switch (type75) {
        case "start":
          this.event.start.push(handler);
          break;
        case "request":
          this.event.request.push(handler);
          break;
        case "parse":
          this.event.parse.splice(this.event.parse.length - 1, 0, handler);
          break;
        case "transform":
          this.event.transform.push(handler);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(handler);
          break;
        case "afterHandle":
          this.event.afterHandle.push(handler);
          break;
        case "mapResponse":
          this.event.mapResponse.push(handler);
          break;
        case "response":
          this.event.onResponse.push(handler);
          break;
        case "trace":
          this.event.trace.push(handler);
          break;
        case "error":
          this.event.error.push(handler);
          break;
        case "stop":
          this.event.stop.push(handler);
          break;
      }
    }
    return this;
  }
  group(prefix, schemaOrRun, run) {
    const instance = new _Elysia({
      ...this.config || {},
      prefix: ""
    });
    instance.store = this.store;
    instance.definitions = this.definitions;
    instance.getServer = () => this.server;
    const isSchema = typeof schemaOrRun === "object";
    const sandbox = (isSchema ? run : schemaOrRun)(instance);
    this.decorators = mergeDeep(this.decorators, instance.decorators);
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.onResponse.length)
      this.event.onResponse = [
        ...this.event.onResponse || [],
        ...sandbox.event.onResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.routes).forEach(({ method, path, handler, hooks }) => {
      path = (isSchema ? "" : this.config.prefix) + prefix + path;
      if (isSchema) {
        const hook = schemaOrRun;
        const localHook = hooks;
        this.add(method, path, handler, mergeHook(hook, {
          ...localHook || {},
          error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
            ...localHook.error || {},
            ...sandbox.event.error || {}
          ] : [
            localHook.error,
            ...sandbox.event.error || {}
          ]
        }));
      } else {
        this.add(method, path, handler, mergeHook(hooks, {
          error: sandbox.event.error
        }), {
          skipPrefix: true
        });
      }
    });
    return this;
  }
  guard(hook, run) {
    if (!run) {
      this.event = mergeLifeCycle(this.event, hook);
      this.validator = {
        body: hook.body,
        headers: hook.headers,
        params: hook.params,
        query: hook.query,
        response: hook.response
      };
      return this;
    }
    const instance = new _Elysia({
      ...this.config || {},
      prefix: ""
    });
    instance.store = this.store;
    instance.definitions = this.definitions;
    const sandbox = run(instance);
    this.decorators = mergeDeep(this.decorators, instance.decorators);
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.onResponse.length)
      this.event.onResponse = [
        ...this.event.onResponse || [],
        ...sandbox.event.onResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.routes).forEach(({ method, path, handler, hooks: localHook }) => {
      this.add(method, path, handler, mergeHook(hook, {
        ...localHook || {},
        error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
          ...localHook.error || {},
          ...sandbox.event.error || []
        ] : [localHook.error, ...sandbox.event.error || []]
      }));
    });
    return this;
  }
  use(plugin) {
    if (plugin instanceof Promise) {
      this.lazyLoadModules.push(plugin.then((plugin2) => {
        if (typeof plugin2 === "function") {
          return plugin2(this);
        }
        if (typeof plugin2.default === "function")
          return plugin2.default(this);
        return this._use(plugin2);
      }).then((x) => x.compile()));
      return this;
    } else
      return this._use(plugin);
    return this;
  }
  _use(plugin) {
    if (typeof plugin === "function") {
      const instance = plugin(this);
      if (instance instanceof Promise) {
        this.lazyLoadModules.push(instance.then((plugin2) => {
          if (plugin2 instanceof _Elysia) {
            this.compile();
            for (const {
              method,
              path,
              handler,
              hooks
            } of Object.values(plugin2.routes)) {
              this.add(method, path, handler, mergeHook(hooks, {
                error: plugin2.event.error
              }));
            }
            return plugin2;
          }
          if (typeof plugin2 === "function")
            return plugin2(this);
          if (typeof plugin2.default === "function")
            return plugin2.default(this);
          return this._use(plugin2);
        }).then((x) => x.compile()));
        return this;
      }
      return instance;
    }
    const { name, seed } = plugin.config;
    plugin.getServer = () => this.getServer();
    this.headers(plugin.setHeaders);
    const isScoped = plugin.config.scoped;
    if (isScoped) {
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies
        } : {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies,
          stack: plugin.stack,
          routes: plugin.routes,
          decorators: plugin.decorators,
          store: plugin.store,
          type: plugin.definitions.type,
          error: plugin.definitions.error,
          derive: plugin.event.transform.filter((x) => x.$elysia === "derive").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          })),
          resolve: plugin.event.transform.filter((x) => x.$elysia === "derive").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          }))
        });
      }
      plugin.model(this.definitions.type);
      plugin.error(this.definitions.error);
      plugin.macros = [...this.macros || [], ...plugin.macros || []];
      plugin.onRequest((context) => {
        Object.assign(context, this.decorators);
        Object.assign(context.store, this.store);
      });
      if (plugin.event.trace.length)
        plugin.event.trace.push(...plugin.event.trace);
      if (isScoped && !plugin.config.prefix)
        console.warn("When using scoped plugins it is recommended to use a prefix, else routing may not work correctly for the second scoped instance");
      if (plugin.event.error.length)
        plugin.event.error.push(...this.event.error);
      if (plugin.config.aot)
        plugin.compile();
      let instance;
      if (isScoped && plugin.config.prefix) {
        instance = this.mount(plugin.config.prefix + "/", plugin.fetch);
        for (const route of plugin.routes)
          this.routes.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
      } else {
        instance = this.mount(plugin.fetch);
        if (instance.routes.length)
          this.routes.push(...instance.routes);
      }
      return this;
    } else {
      plugin.reporter = this.reporter;
      for (const trace of plugin.event.trace)
        this.trace(trace);
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (!this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          this.macros.push(...plugin.macros || []);
        const macroHashes = [];
        for (let i = 0;i < this.macros.length; i++) {
          const macro = this.macros[i];
          if (macroHashes.includes(macro.$elysiaChecksum)) {
            this.macros.splice(i, 1);
            i--;
          }
          macroHashes.push(macro.$elysiaChecksum);
        }
      }
    }
    this.decorate(plugin.decorators);
    this.state(plugin.store);
    this.model(plugin.definitions.type);
    this.error(plugin.definitions.error);
    for (const { method, path, handler, hooks } of Object.values(plugin.routes)) {
      this.add(method, path, handler, mergeHook(hooks, {
        error: plugin.event.error
      }));
    }
    if (!isScoped)
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies
        } : {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies,
          stack: plugin.stack,
          routes: plugin.routes,
          decorators: plugin.decorators,
          store: plugin.store,
          type: plugin.definitions.type,
          error: plugin.definitions.error,
          derive: plugin.event.transform.filter((x) => x?.$elysia === "derive").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          })),
          resolve: plugin.event.transform.filter((x) => x?.$elysia === "resolve").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          }))
        });
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event), current);
      } else {
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event));
      }
    return this;
  }
  macro(macro) {
    macro.$elysiaChecksum = checksum(JSON.stringify({
      name: this.config.name,
      seed: this.config.seed,
      content: macro.toString()
    }));
    this.macros.push(macro);
    return this;
  }
  mount(path, handle) {
    if (path instanceof _Elysia || typeof path === "function" || path.length === 0 || path === "/") {
      const run = typeof path === "function" ? path : path instanceof _Elysia ? path.compile().fetch : handle instanceof _Elysia ? handle.compile().fetch : handle;
      const handler2 = async ({ request, path: path2 }) => run(new Request(replaceUrlPath(request.url, path2 || "/"), request));
      this.all("/", handler2, {
        type: "none"
      });
      this.all("/*", handler2, {
        type: "none"
      });
      return this;
    }
    const length = path.length;
    if (handle instanceof _Elysia)
      handle = handle.compile().fetch;
    const handler = async ({ request, path: path2 }) => handle(new Request(replaceUrlPath(request.url, path2.slice(length) || "/"), request));
    this.all(path, handler, {
      type: "none"
    });
    this.all(path + (path.endsWith("/") ? "*" : "/*"), handler, {
      type: "none"
    });
    return this;
  }
  get(path, handler, hook) {
    this.add("GET", path, handler, hook);
    return this;
  }
  post(path, handler, hook) {
    this.add("POST", path, handler, hook);
    return this;
  }
  put(path, handler, hook) {
    this.add("PUT", path, handler, hook);
    return this;
  }
  patch(path, handler, hook) {
    this.add("PATCH", path, handler, hook);
    return this;
  }
  delete(path, handler, hook) {
    this.add("DELETE", path, handler, hook);
    return this;
  }
  options(path, handler, hook) {
    this.add("OPTIONS", path, handler, hook);
    return this;
  }
  all(path, handler, hook) {
    this.add("ALL", path, handler, hook);
    return this;
  }
  head(path, handler, hook) {
    this.add("HEAD", path, handler, hook);
    return this;
  }
  connect(path, handler, hook) {
    this.add("CONNECT", path, handler, hook);
    return this;
  }
  ws(path, options) {
    const transform7 = options.transformMessage ? Array.isArray(options.transformMessage) ? options.transformMessage : [options.transformMessage] : undefined;
    let server = null;
    const validateMessage = getSchemaValidator(options?.body, {
      models: this.definitions.type
    });
    const validateResponse = getSchemaValidator(options?.response, {
      models: this.definitions.type
    });
    const parseMessage = (message) => {
      if (typeof message === "string") {
        const start = message?.charCodeAt(0);
        if (start === 47 || start === 123)
          try {
            message = JSON.parse(message);
          } catch {
          }
        else if (isNumericString(message))
          message = +message;
      }
      if (transform7?.length)
        for (let i = 0;i < transform7.length; i++) {
          const temp = transform7[i](message);
          if (temp !== undefined)
            message = temp;
        }
      return message;
    };
    this.route("$INTERNALWS", path, (context) => {
      const { set: set2, path: path2, qi, headers, query, params } = context;
      if (server === null)
        server = this.getServer();
      if (server?.upgrade(context.request, {
        headers: typeof options.upgrade === "function" ? options.upgrade(context) : options.upgrade,
        data: {
          validator: validateResponse,
          open(ws) {
            options.open?.(new ElysiaWS(ws, context));
          },
          message: (ws, msg) => {
            const message = parseMessage(msg);
            if (validateMessage?.Check(message) === false)
              return void ws.send(new ValidationError("message", validateMessage, message).message);
            options.message?.(new ElysiaWS(ws, context), message);
          },
          drain(ws) {
            options.drain?.(new ElysiaWS(ws, context));
          },
          close(ws, code, reason) {
            options.close?.(new ElysiaWS(ws, context), code, reason);
          }
        }
      }))
        return;
      set2.status = 400;
      return "Expected a websocket connection";
    }, {
      beforeHandle: options.beforeHandle,
      transform: options.transform,
      headers: options.headers,
      params: options.params,
      query: options.query
    });
    return this;
  }
  route(method, path, handler, {
    config,
    ...hook
  } = {
    config: {
      allowMeta: false
    }
  }) {
    this.add(method, path, handler, hook, config);
    return this;
  }
  state(name, value15) {
    switch (typeof name) {
      case "object":
        this.store = mergeDeep(this.store, name);
        return this;
      case "function":
        this.store = name(this.store);
        return this;
    }
    if (!(name in this.store)) {
      this.store[name] = value15;
    }
    return this;
  }
  decorate(name, value15) {
    switch (typeof name) {
      case "object":
        this.decorators = mergeDeep(this.decorators, name);
        return this;
      case "function":
        this.decorators = name(this.decorators);
        return this;
    }
    if (!(name in this.decorators))
      this.decorators[name] = value15;
    return this;
  }
  derive(transform7) {
    transform7.$elysia = "derive";
    return this.onTransform(transform7);
  }
  model(name, model) {
    switch (typeof name) {
      case "object":
        Object.entries(name).forEach(([key, value15]) => {
          if (!(key in this.definitions.type))
            this.definitions.type[key] = value15;
        });
        return this;
      case "function":
        this.definitions.type = name(this.definitions.type);
        return this;
    }
    this.definitions.type[name] = model;
    return this;
  }
  mapDerive(mapper) {
    mapper.$elysia = "derive";
    return this.onTransform(mapper);
  }
  affix(base, type75, word) {
    if (word === "")
      return this;
    const delimieter = ["_", "-", " "];
    const capitalize2 = (word2) => word2[0].toUpperCase() + word2.slice(1);
    const joinKey = base === "prefix" ? (prefix, word2) => delimieter.includes(prefix.at(-1) ?? "") ? prefix + word2 : prefix + capitalize2(word2) : delimieter.includes(word.at(-1) ?? "") ? (suffix, word2) => word2 + suffix : (suffix, word2) => word2 + capitalize2(suffix);
    const remap = (type210) => {
      const store = {};
      switch (type210) {
        case "decorator":
          for (const key in this.decorators)
            store[joinKey(word, key)] = this.decorators[key];
          this.decorators = store;
          break;
        case "state":
          for (const key in this.store)
            store[joinKey(word, key)] = this.store[key];
          this.store = store;
          break;
        case "model":
          for (const key in this.definitions.type)
            store[joinKey(word, key)] = this.definitions.type[key];
          this.definitions.type = store;
          break;
        case "error":
          for (const key in this.definitions.error)
            store[joinKey(word, key)] = this.definitions.error[key];
          this.definitions.error = store;
          break;
      }
    };
    const types = Array.isArray(type75) ? type75 : [type75];
    for (const type210 of types.some((x) => x === "all") ? ["decorator", "state", "model", "error"] : types)
      remap(type210);
    return this;
  }
  prefix(type75, word) {
    return this.affix("prefix", type75, word);
  }
  suffix(type75, word) {
    return this.affix("suffix", type75, word);
  }
  compile() {
    this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this);
    if (typeof this.server?.reload === "function")
      this.server.reload({
        ...this.server || {},
        fetch: this.fetch
      });
    return this;
  }
  get modules() {
    return Promise.all(this.lazyLoadModules);
  }
};

// src/index.ts
var app = new Elysia;
var users = [];
var connectedUsers = new Map;
app.ws("/ws", {
  close(ws) {
    console.log(ws.id, "disconnected");
    users = users.filter((u) => u.id !== ws.id);
    const connectedTo = connectedUsers.get(ws.id);
    if (connectedTo) {
      connectedTo.send({ type: "info", data: "match-disconnected" });
      connectedUsers.delete(connectedTo.id);
    }
    connectedUsers.delete(ws.id);
  },
  message(ws, message) {
    if (message.type === "message") {
      if (connectedUsers.get(ws.id)) {
        connectedUsers.get(ws.id).send(message);
      }
    }
  },
  open(ws) {
    console.log(ws.id, "connected");
    users.push(ws);
    ws.send({ type: "info", data: "enqueued" });
    if (users.length > 1) {
      const user1 = users.pop();
      const user2 = users.pop();
      user1.send({ type: "info", data: "connected" });
      user2.send({ type: "info", data: "connected" });
      connectedUsers.set(user1.id, user2);
      connectedUsers.set(user2.id, user1);
    }
  }
}).listen(8080);
console.log(`\uD83E\uDD8A Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
