import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c=class{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c.prototype,i$1.prototype),Object.assign(c.prototype,l$1.prototype),c}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "5b925540-9ad2-498e-a988-12407b8895e5",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const plugins = [
  
];

const assets = {
  "/_nuxt/B5PFVajo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"228e-awBTmXLXfyeaT+/L2hvqodOV1dk\"",
    "mtime": "2025-12-14T22:12:03.757Z",
    "size": 8846,
    "path": "../public/_nuxt/B5PFVajo.js"
  },
  "/_nuxt/C794BWC4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d54-73Oe82WHACqmk5TO0YwIYEnJrSQ\"",
    "mtime": "2025-12-14T22:12:03.758Z",
    "size": 3412,
    "path": "../public/_nuxt/C794BWC4.js"
  },
  "/_nuxt/Cr7hHY3R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f7-P5aZMkD1eaixUjsUorTfmiZ01rU\"",
    "mtime": "2025-12-14T22:12:03.758Z",
    "size": 247,
    "path": "../public/_nuxt/Cr7hHY3R.js"
  },
  "/_nuxt/CXZ97Ete.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dc-PHEooKKBklM51QGuSAvs0Gp/ehI\"",
    "mtime": "2025-12-14T22:12:03.758Z",
    "size": 220,
    "path": "../public/_nuxt/CXZ97Ete.js"
  },
  "/_nuxt/DqQxM3r2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28c78-Lr/7koR+GjWzevPZ7Q6lBpHSjqs\"",
    "mtime": "2025-12-14T22:12:03.757Z",
    "size": 167032,
    "path": "../public/_nuxt/DqQxM3r2.js"
  },
  "/_nuxt/error-404.CYUhy3y9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dca-005xQIrTNdE7LUqKJ7YOCC8lzEw\"",
    "mtime": "2025-12-14T22:12:03.757Z",
    "size": 3530,
    "path": "../public/_nuxt/error-404.CYUhy3y9.css"
  },
  "/_nuxt/error-500.CVLkTsZM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75a-W5VxOFBjAs2NvcF8lJBDWJ0iI/o\"",
    "mtime": "2025-12-14T22:12:03.757Z",
    "size": 1882,
    "path": "../public/_nuxt/error-500.CVLkTsZM.css"
  },
  "/_nuxt/HrawAvUe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8aa5-xp9nBhgw1auR4ghPK79nX30iZKg\"",
    "mtime": "2025-12-14T22:12:03.758Z",
    "size": 35493,
    "path": "../public/_nuxt/HrawAvUe.js"
  },
  "/_nuxt/index.BYYKMe45.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e7-XAoWTmLdMv+QC/Q4BMc/Ni9NIOg\"",
    "mtime": "2025-12-14T22:12:03.746Z",
    "size": 231,
    "path": "../public/_nuxt/index.BYYKMe45.css"
  },
  "/images/01aeef63254768e49ab6048b3abaf4bf59b13e58.svg": {
    "type": "image/svg+xml",
    "etag": "\"121-PAhsr7O15VD67zTSt/WoryYlSd4\"",
    "mtime": "2025-12-12T02:07:34.982Z",
    "size": 289,
    "path": "../public/images/01aeef63254768e49ab6048b3abaf4bf59b13e58.svg"
  },
  "/images/060b55a415afe91c18cede05f096471c4bc8fbe3.svg": {
    "type": "image/svg+xml",
    "etag": "\"1026-dJXckFob2XDxHUgLqTqkTH5bhU0\"",
    "mtime": "2025-12-12T02:07:43.942Z",
    "size": 4134,
    "path": "../public/images/060b55a415afe91c18cede05f096471c4bc8fbe3.svg"
  },
  "/images/067ec42d2044e0b190a5d653a4a7fc2e450e9b35.png": {
    "type": "image/png",
    "etag": "\"7c11d-Bn7ELSBE4LGQpdZTpKf8LkUOmzU\"",
    "mtime": "2025-12-12T02:07:37.110Z",
    "size": 508189,
    "path": "../public/images/067ec42d2044e0b190a5d653a4a7fc2e450e9b35.png"
  },
  "/images/07e9be1ab961307ebd543faf316c6043e9d78e14.svg": {
    "type": "image/svg+xml",
    "etag": "\"164-1SSy1tv+L8cPufXf8OAFmR3GJpw\"",
    "mtime": "2025-12-12T02:07:47.058Z",
    "size": 356,
    "path": "../public/images/07e9be1ab961307ebd543faf316c6043e9d78e14.svg"
  },
  "/images/0a3834175d928923178ac9460d79fee76f18d401.svg": {
    "type": "image/svg+xml",
    "etag": "\"151-duIC4kxgJ3ertpxCFg4JvJqNhrM\"",
    "mtime": "2025-12-12T02:07:45.197Z",
    "size": 337,
    "path": "../public/images/0a3834175d928923178ac9460d79fee76f18d401.svg"
  },
  "/images/0dc5cab7427ad4b9ea2afb16006399a9009bd28d.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a5-DtS97cmKCitnUvUwuxWGpiJJnOc\"",
    "mtime": "2025-12-12T02:07:43.219Z",
    "size": 421,
    "path": "../public/images/0dc5cab7427ad4b9ea2afb16006399a9009bd28d.svg"
  },
  "/images/11dfb6d0c179847dedb1585f97c42324de436bcd.png": {
    "type": "image/png",
    "etag": "\"47657-Ed+20MF5hH3tsVhfl8QjJN5Da80\"",
    "mtime": "2025-12-12T02:07:33.621Z",
    "size": 292439,
    "path": "../public/images/11dfb6d0c179847dedb1585f97c42324de436bcd.png"
  },
  "/images/12fbca34f1dfe6e574579a97178a2b33237e4eaa.png": {
    "type": "image/png",
    "etag": "\"88-EvvKNPHf5uV0V5qXF4orMyN+Tqo\"",
    "mtime": "2025-12-12T02:07:35.255Z",
    "size": 136,
    "path": "../public/images/12fbca34f1dfe6e574579a97178a2b33237e4eaa.png"
  },
  "/images/133dbb123dcd0b48c52b100b427643533ccf90f2.png": {
    "type": "image/png",
    "etag": "\"59f03-Ez27Ej3NC0jFKxALQnZDUzzPkPI\"",
    "mtime": "2025-12-12T02:07:47.078Z",
    "size": 368387,
    "path": "../public/images/133dbb123dcd0b48c52b100b427643533ccf90f2.png"
  },
  "/images/157a12fe64fe9099717b627b416b3673833c632f.svg": {
    "type": "image/svg+xml",
    "etag": "\"21e9-PFYzF7rA/1fTOGBYXOHWi8mnDX0\"",
    "mtime": "2025-12-12T02:07:42.811Z",
    "size": 8681,
    "path": "../public/images/157a12fe64fe9099717b627b416b3673833c632f.svg"
  },
  "/images/16461dfe6ba33d84cf3e623740c4747dab1b9404.svg": {
    "type": "image/svg+xml",
    "etag": "\"4677-5FNM4equbEDZQxlfeQkoorjV5Vs\"",
    "mtime": "2025-12-12T02:07:34.900Z",
    "size": 18039,
    "path": "../public/images/16461dfe6ba33d84cf3e623740c4747dab1b9404.svg"
  },
  "/images/16a97598f0b3ff02f46eb2a5d484cca947a91848.png": {
    "type": "image/png",
    "etag": "\"1aa82a-Fql1mPCz/wL0brKl1ITMqUepGEg\"",
    "mtime": "2025-12-12T02:07:49.339Z",
    "size": 1746986,
    "path": "../public/images/16a97598f0b3ff02f46eb2a5d484cca947a91848.png"
  },
  "/images/18fd25da4aa572d6529eb8a6f8b15d115cd68188.png": {
    "type": "image/png",
    "etag": "\"3a3b0c-GP0l2kqlctZSnrim+LFdEVzWgYg\"",
    "mtime": "2025-12-12T02:07:48.659Z",
    "size": 3816204,
    "path": "../public/images/18fd25da4aa572d6529eb8a6f8b15d115cd68188.png"
  },
  "/images/19b967a4261ccefed825f3c7c7391baa1da4b90d.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c44-gdlZS9ia9OmLlJ5qKLYEpU520Z8\"",
    "mtime": "2025-12-12T02:07:35.090Z",
    "size": 15428,
    "path": "../public/images/19b967a4261ccefed825f3c7c7391baa1da4b90d.svg"
  },
  "/images/1b28585010363988b98856ae770fd71a1ed54149.png": {
    "type": "image/png",
    "etag": "\"348f7-GyhYUBA2OYi5iFaudw/XGh7VQUk\"",
    "mtime": "2025-12-12T02:07:34.007Z",
    "size": 215287,
    "path": "../public/images/1b28585010363988b98856ae770fd71a1ed54149.png"
  },
  "/images/1bcfa5249e1203d0181cae23b6381be25716ae47.svg": {
    "type": "image/svg+xml",
    "etag": "\"2a8-TG5GqILG8DBrgRSkRfNlpb71txk\"",
    "mtime": "2025-12-12T02:07:47.083Z",
    "size": 680,
    "path": "../public/images/1bcfa5249e1203d0181cae23b6381be25716ae47.svg"
  },
  "/images/1e54ea5bdd125d5ee2e4fe7213ae68e870be39b7.svg": {
    "type": "image/svg+xml",
    "etag": "\"f9-LCoyZvJMJqvaSvF1osfMUDPtaFk\"",
    "mtime": "2025-12-12T02:07:31.214Z",
    "size": 249,
    "path": "../public/images/1e54ea5bdd125d5ee2e4fe7213ae68e870be39b7.svg"
  },
  "/images/230bfa506cb31cfc07d183c620dcedabda85e94e.svg": {
    "type": "image/svg+xml",
    "etag": "\"117-lpTd8tlwKxomyuPa2UpERA2ABn8\"",
    "mtime": "2025-12-12T02:07:42.225Z",
    "size": 279,
    "path": "../public/images/230bfa506cb31cfc07d183c620dcedabda85e94e.svg"
  },
  "/images/266adcc9c724696aa9c879ec230b5297a4d13cdd.svg": {
    "type": "image/svg+xml",
    "etag": "\"162-OM0LEQTztnV0kKiAdooAoed9LjM\"",
    "mtime": "2025-12-12T02:07:30.435Z",
    "size": 354,
    "path": "../public/images/266adcc9c724696aa9c879ec230b5297a4d13cdd.svg"
  },
  "/images/2770c562d34e11a7c6e5e8aa7e8a4d637fd5948d.svg": {
    "type": "image/svg+xml",
    "etag": "\"14d-/WC6MnwllY9MlSAqpsILZfTvsLs\"",
    "mtime": "2025-12-12T02:07:45.910Z",
    "size": 333,
    "path": "../public/images/2770c562d34e11a7c6e5e8aa7e8a4d637fd5948d.svg"
  },
  "/images/29a6673eca79081d1d6f68860dfe0515cb7e20fa.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e79-esbWfSdH7uG4XpFrtBwUarjBpCQ\"",
    "mtime": "2025-12-12T02:07:32.485Z",
    "size": 15993,
    "path": "../public/images/29a6673eca79081d1d6f68860dfe0515cb7e20fa.svg"
  },
  "/images/2a3be60081d81d1d2248e11db03060f58e2708a9.svg": {
    "type": "image/svg+xml",
    "etag": "\"ff-lUxDgrW4eMzig0Hn1Th80VdJhaw\"",
    "mtime": "2025-12-12T02:07:48.694Z",
    "size": 255,
    "path": "../public/images/2a3be60081d81d1d2248e11db03060f58e2708a9.svg"
  },
  "/images/2aa9d4fe99e3165c0b949edc5ad2f842aea3fb03.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b67-OXO9KD8DUwiOFFETCc9fBpnEmgI\"",
    "mtime": "2025-12-12T02:07:32.403Z",
    "size": 15207,
    "path": "../public/images/2aa9d4fe99e3165c0b949edc5ad2f842aea3fb03.svg"
  },
  "/images/2b815c867d334464649d6b6d67864e36eb3c7c04.svg": {
    "type": "image/svg+xml",
    "etag": "\"2c9-OWBs78xgy+7TrJNuxzN7dL4f24k\"",
    "mtime": "2025-12-12T02:07:47.089Z",
    "size": 713,
    "path": "../public/images/2b815c867d334464649d6b6d67864e36eb3c7c04.svg"
  },
  "/images/2b9684c1a6e3c0c1e76a766bf50c58725cf367fa.png": {
    "type": "image/png",
    "etag": "\"61cd70-K5aEwabjwMHnanZr9QxYclzzZ/o\"",
    "mtime": "2025-12-12T02:07:49.473Z",
    "size": 6409584,
    "path": "../public/images/2b9684c1a6e3c0c1e76a766bf50c58725cf367fa.png"
  },
  "/images/301c073e3fcb87f314accddb3e1a73d012cf770f.png": {
    "type": "image/png",
    "etag": "\"88-MBwHPj/Lh/MUrM3bPhpz0BLPdw8\"",
    "mtime": "2025-12-12T02:07:36.059Z",
    "size": 136,
    "path": "../public/images/301c073e3fcb87f314accddb3e1a73d012cf770f.png"
  },
  "/images/306bed5cc33d9a7790805a8f298d316f3d1450b2.png": {
    "type": "image/png",
    "etag": "\"f7f9-MGvtXMM9mneQgFqPKY0xbz0UULI\"",
    "mtime": "2025-12-12T02:07:50.188Z",
    "size": 63481,
    "path": "../public/images/306bed5cc33d9a7790805a8f298d316f3d1450b2.png"
  },
  "/images/3110885e6cc923a6ff5528dca3d4c977eca4366b.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b4d-yBXOGb1dbFJQlaKo0T4GwPVG3t0\"",
    "mtime": "2025-12-12T02:07:46.092Z",
    "size": 15181,
    "path": "../public/images/3110885e6cc923a6ff5528dca3d4c977eca4366b.svg"
  },
  "/images/35608f176dca9dd90ba6afa2dccee6c90c47f04e.png": {
    "type": "image/png",
    "etag": "\"220e48-NWCPF23KndkLpq+i3M7myQxH8E4\"",
    "mtime": "2025-12-12T02:07:37.018Z",
    "size": 2231880,
    "path": "../public/images/35608f176dca9dd90ba6afa2dccee6c90c47f04e.png"
  },
  "/images/37526a0d1bdec7bacb067f168e836c7c7726beba.svg": {
    "type": "image/svg+xml",
    "etag": "\"28b-MWH9eJWrC2bnYLHT9PCPdkg6tI8\"",
    "mtime": "2025-12-12T02:07:50.018Z",
    "size": 651,
    "path": "../public/images/37526a0d1bdec7bacb067f168e836c7c7726beba.svg"
  },
  "/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.png": {
    "type": "image/png",
    "etag": "\"158ba3-OV/d9zRTpMXqBHvQnPo+9hTCngg\"",
    "mtime": "2025-12-12T02:07:33.890Z",
    "size": 1412003,
    "path": "../public/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.png"
  },
  "/images/3f06c2af3e6c243a1ef5a2c3965b96b8144a82aa.png": {
    "type": "image/png",
    "etag": "\"6541db-PwbCrz5sJDoe9aLDlluWuBRKgqo\"",
    "mtime": "2025-12-12T02:07:48.596Z",
    "size": 6635995,
    "path": "../public/images/3f06c2af3e6c243a1ef5a2c3965b96b8144a82aa.png"
  },
  "/images/3f33cc1b706f4023645399dbc059d1dcb6f70900.svg": {
    "type": "image/svg+xml",
    "etag": "\"2fe-lpqrtBDlVXMs39r+xthVyRcF8CE\"",
    "mtime": "2025-12-12T02:07:44.901Z",
    "size": 766,
    "path": "../public/images/3f33cc1b706f4023645399dbc059d1dcb6f70900.svg"
  },
  "/images/4375a087c5c61049047485b5f36d6b92c68fd3aa.svg": {
    "type": "image/svg+xml",
    "etag": "\"106-PpY6SzbVgS9QSYG01veLp+Gw1B0\"",
    "mtime": "2025-12-12T02:07:50.154Z",
    "size": 262,
    "path": "../public/images/4375a087c5c61049047485b5f36d6b92c68fd3aa.svg"
  },
  "/images/497237dd208c092c32a12effe38115249643178f.svg": {
    "type": "image/svg+xml",
    "etag": "\"100-ug0wS9hHibmj6znL+vCT3FTWQAo\"",
    "mtime": "2025-12-12T02:07:36.213Z",
    "size": 256,
    "path": "../public/images/497237dd208c092c32a12effe38115249643178f.svg"
  },
  "/images/4988991b7ae3068163db2ace7500b3737803ca07.svg": {
    "type": "image/svg+xml",
    "etag": "\"114-UdzqnG73K4rUPsHM9s49KhZxl6k\"",
    "mtime": "2025-12-12T02:07:34.923Z",
    "size": 276,
    "path": "../public/images/4988991b7ae3068163db2ace7500b3737803ca07.svg"
  },
  "/images/4a6bf01676505898797543f7f8aa7c984ce99d53.svg": {
    "type": "image/svg+xml",
    "etag": "\"2164f-CA9Vv0vw2i66u1oiNxF1Tr7tsXI\"",
    "mtime": "2025-12-12T02:07:33.817Z",
    "size": 136783,
    "path": "../public/images/4a6bf01676505898797543f7f8aa7c984ce99d53.svg"
  },
  "/images/4ae485ac5405ad65022d5d33002008290511498a.svg": {
    "type": "image/svg+xml",
    "etag": "\"112-/p/Fa1+6cI2frvDf4kB3uVX/ODk\"",
    "mtime": "2025-12-12T02:07:48.668Z",
    "size": 274,
    "path": "../public/images/4ae485ac5405ad65022d5d33002008290511498a.svg"
  },
  "/images/4b48eff28f70244134c7acaad36edeb391dd31e5.svg": {
    "type": "image/svg+xml",
    "etag": "\"32e-pYVrM6Xgx8A0J5Wvim05lFtVqpw\"",
    "mtime": "2025-12-12T02:07:47.065Z",
    "size": 814,
    "path": "../public/images/4b48eff28f70244134c7acaad36edeb391dd31e5.svg"
  },
  "/images/51b71561de89d7e6a8ed025747a21b230b4a8e85.svg": {
    "type": "image/svg+xml",
    "etag": "\"27c-RXlOslHDFrf8/1K5C8xbH62aFyA\"",
    "mtime": "2025-12-12T02:07:49.279Z",
    "size": 636,
    "path": "../public/images/51b71561de89d7e6a8ed025747a21b230b4a8e85.svg"
  },
  "/images/54ecf3fc9fe4d54e0ee55b7dbaae1d95a5ab1f83.svg": {
    "type": "image/svg+xml",
    "etag": "\"5aa-pNWchWC8tVQDfm+ZkcsEnxu/pOE\"",
    "mtime": "2025-12-12T02:07:44.530Z",
    "size": 1450,
    "path": "../public/images/54ecf3fc9fe4d54e0ee55b7dbaae1d95a5ab1f83.svg"
  },
  "/images/5638189ffdc00f0337ef7fff9ef60ea8496dbd98.png": {
    "type": "image/png",
    "etag": "\"67d1e-VjgYn/3ADwM373//nvYOqEltvZg\"",
    "mtime": "2025-12-12T02:07:37.070Z",
    "size": 425246,
    "path": "../public/images/5638189ffdc00f0337ef7fff9ef60ea8496dbd98.png"
  },
  "/images/5691212f86a7d42b4b0b3ada0c3bef2c53bdc4f0.png": {
    "type": "image/png",
    "etag": "\"eabbe-VpEhL4an1CtLCzraDDvvLFO9xPA\"",
    "mtime": "2025-12-12T02:07:27.520Z",
    "size": 961470,
    "path": "../public/images/5691212f86a7d42b4b0b3ada0c3bef2c53bdc4f0.png"
  },
  "/images/57460b9bbbe8b9d7b9909ba756a045c7d0466429.png": {
    "type": "image/png",
    "etag": "\"35aaab-V0YLm7voude5kJunVqBFx9BGZCk\"",
    "mtime": "2025-12-12T02:07:34.979Z",
    "size": 3517099,
    "path": "../public/images/57460b9bbbe8b9d7b9909ba756a045c7d0466429.png"
  },
  "/images/5b304e10a1f9474bf67450a6d3935467a46840b6.svg": {
    "type": "image/svg+xml",
    "etag": "\"3cd4-JwnaT7dKZXBeT7EoqCE/w0W5q58\"",
    "mtime": "2025-12-12T02:07:36.218Z",
    "size": 15572,
    "path": "../public/images/5b304e10a1f9474bf67450a6d3935467a46840b6.svg"
  },
  "/images/5eeca46e6664fa7c7ae94ec8b6ebed4d3f163b49.png": {
    "type": "image/png",
    "etag": "\"70ce04-XuykbmZk+nx66U7ItuvtTT8WO0k\"",
    "mtime": "2025-12-12T02:07:47.952Z",
    "size": 7392772,
    "path": "../public/images/5eeca46e6664fa7c7ae94ec8b6ebed4d3f163b49.png"
  },
  "/images/5f3f26c7b063c7723209058434aa87bf5fb1ec40.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e9-Y3uFRH/6pxUCTNlxVRtL5bvT0UI\"",
    "mtime": "2025-12-12T02:07:50.385Z",
    "size": 489,
    "path": "../public/images/5f3f26c7b063c7723209058434aa87bf5fb1ec40.svg"
  },
  "/images/6007bba30a9ca0e358386f11d05328b85164189b.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e77-N9Phf+x6gsZnfsnGWGyJpJiBVQg\"",
    "mtime": "2025-12-12T02:07:32.550Z",
    "size": 15991,
    "path": "../public/images/6007bba30a9ca0e358386f11d05328b85164189b.svg"
  },
  "/images/6173787c2b47f91d8249fa4d082f3f0ecb241845.svg": {
    "type": "image/svg+xml",
    "etag": "\"106-PIHpPcPm5Kyh1vakFD+Lgp8A+D8\"",
    "mtime": "2025-12-12T02:07:47.012Z",
    "size": 262,
    "path": "../public/images/6173787c2b47f91d8249fa4d082f3f0ecb241845.svg"
  },
  "/images/62edddeb3de23302b408561215e02f4be411ad1e.png": {
    "type": "image/png",
    "etag": "\"15ce4-Yu3d6z3iMwK0CFYSFeAvS+QRrR4\"",
    "mtime": "2025-12-12T02:07:36.203Z",
    "size": 89316,
    "path": "../public/images/62edddeb3de23302b408561215e02f4be411ad1e.png"
  },
  "/images/638a1364f190f88e0c2b70e136862a052a22c7ce.png": {
    "type": "image/png",
    "etag": "\"18409-Y4oTZPGQ+I4MK3DhNoYqBSoix84\"",
    "mtime": "2025-12-12T02:07:33.997Z",
    "size": 99337,
    "path": "../public/images/638a1364f190f88e0c2b70e136862a052a22c7ce.png"
  },
  "/images/63f37c8e9ae0bd1a421e609fd6f076b7fb348637.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b53-Jb9OyElfc/l8iRBf97H3I1NmV3w\"",
    "mtime": "2025-12-12T02:07:31.224Z",
    "size": 15187,
    "path": "../public/images/63f37c8e9ae0bd1a421e609fd6f076b7fb348637.svg"
  },
  "/images/6410f9e6590d6f41825444df0cad2a2c10a5cc85.png": {
    "type": "image/png",
    "etag": "\"4a208-ZBD55lkNb0GCVETfDK0qLBClzIU\"",
    "mtime": "2025-12-12T02:07:33.656Z",
    "size": 303624,
    "path": "../public/images/6410f9e6590d6f41825444df0cad2a2c10a5cc85.png"
  },
  "/images/656bae854cdd2c7067d2a5094c9e28b865822c77.svg": {
    "type": "image/svg+xml",
    "etag": "\"13f-g+w55qvcZCSEQkdVjD4cuxVPwnY\"",
    "mtime": "2025-12-12T02:07:33.610Z",
    "size": 319,
    "path": "../public/images/656bae854cdd2c7067d2a5094c9e28b865822c77.svg"
  },
  "/images/668d2a759b8d30320a8d0c56da8ddcc5fe32c20b.svg": {
    "type": "image/svg+xml",
    "etag": "\"272-qtluge2cBNdjkpJ77SZY5cjKiuQ\"",
    "mtime": "2025-12-12T02:07:32.319Z",
    "size": 626,
    "path": "../public/images/668d2a759b8d30320a8d0c56da8ddcc5fe32c20b.svg"
  },
  "/images/67339403cc0a48f70e08d2ed12648f274d7fc91d.svg": {
    "type": "image/svg+xml",
    "etag": "\"58fb-1nINqYYSZHBjkfCgReMNfoet/jU\"",
    "mtime": "2025-12-12T02:07:32.477Z",
    "size": 22779,
    "path": "../public/images/67339403cc0a48f70e08d2ed12648f274d7fc91d.svg"
  },
  "/images/6a3755baf082fa762192570e82bbb2315b5e3fc3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3db8-nL2zsR+bVn/2f0VAmWRGOZ27Wu8\"",
    "mtime": "2025-12-12T02:07:45.997Z",
    "size": 15800,
    "path": "../public/images/6a3755baf082fa762192570e82bbb2315b5e3fc3.svg"
  },
  "/images/6b696505a3a2c96eafe67fe90356119c9d4f92a7.svg": {
    "type": "image/svg+xml",
    "etag": "\"7fd-Pg0UcJ8zYksHltYYZu59cifaUcQ\"",
    "mtime": "2025-12-12T02:07:47.032Z",
    "size": 2045,
    "path": "../public/images/6b696505a3a2c96eafe67fe90356119c9d4f92a7.svg"
  },
  "/images/6cd8fce5ebe0b75352cf061e319a139e61088f45.svg": {
    "type": "image/svg+xml",
    "etag": "\"2a1-KEhv4GJjTX+/K6BuCPF9iSndumI\"",
    "mtime": "2025-12-12T02:07:50.029Z",
    "size": 673,
    "path": "../public/images/6cd8fce5ebe0b75352cf061e319a139e61088f45.svg"
  },
  "/images/6fb388d55c15cc8b5f4b0744cfff8648d30662ef.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a8-Q1lSoaoEuGKx6mKVo15+KOJKiEg\"",
    "mtime": "2025-12-12T02:07:44.417Z",
    "size": 424,
    "path": "../public/images/6fb388d55c15cc8b5f4b0744cfff8648d30662ef.svg"
  },
  "/images/708d25bbb3711c7c8200a67b254b0cae7ec28f0a.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a8-Fo7PpRcB7eOI1EyU+m1TuQZVzEI\"",
    "mtime": "2025-12-12T02:07:43.547Z",
    "size": 424,
    "path": "../public/images/708d25bbb3711c7c8200a67b254b0cae7ec28f0a.svg"
  },
  "/images/715d0300eaf55446a785a49df8f850b6485f1273.png": {
    "type": "image/png",
    "etag": "\"77a9ac-cV0DAOr1VEanhaSd+PhQtkhfEnM\"",
    "mtime": "2025-12-12T02:07:48.038Z",
    "size": 7842220,
    "path": "../public/images/715d0300eaf55446a785a49df8f850b6485f1273.png"
  },
  "/images/723deea0350b46639b6a2f28605c534489dbb5a0.png": {
    "type": "image/png",
    "etag": "\"6f2db-cj3uoDULRmObai8oYFxTRInbtaA\"",
    "mtime": "2025-12-12T02:07:37.028Z",
    "size": 455387,
    "path": "../public/images/723deea0350b46639b6a2f28605c534489dbb5a0.png"
  },
  "/images/7241ffe4ab7c5706f4f4a60a74d61daaa87af4a0.svg": {
    "type": "image/svg+xml",
    "etag": "\"119-w8pWUp+mGzoOb9rSnxGMQLjysR8\"",
    "mtime": "2025-12-12T02:07:50.093Z",
    "size": 281,
    "path": "../public/images/7241ffe4ab7c5706f4f4a60a74d61daaa87af4a0.svg"
  },
  "/images/7496c16a6da114fc6abc42b48703c38411c89fd8.png": {
    "type": "image/png",
    "etag": "\"6dc3ef-dJbBam2hFPxqvEK0hwPDhBHIn9g\"",
    "mtime": "2025-12-12T02:07:49.944Z",
    "size": 7193583,
    "path": "../public/images/7496c16a6da114fc6abc42b48703c38411c89fd8.png"
  },
  "/images/75c960db5a9df8aab48daf0082c24af310c27875.svg": {
    "type": "image/svg+xml",
    "etag": "\"227-f2r9UDZoeotepO1WDUDgZzUP6TI\"",
    "mtime": "2025-12-12T02:07:45.955Z",
    "size": 551,
    "path": "../public/images/75c960db5a9df8aab48daf0082c24af310c27875.svg"
  },
  "/images/75cf6690603dc2edeca808c5a0e2c4fd7b5886bb.svg": {
    "type": "image/svg+xml",
    "etag": "\"2a0-t7RNJvAQF7sosO7ZZ1FupcN2knc\"",
    "mtime": "2025-12-12T02:07:49.296Z",
    "size": 672,
    "path": "../public/images/75cf6690603dc2edeca808c5a0e2c4fd7b5886bb.svg"
  },
  "/images/7a6961f1a9975fef5728cefeccedfd5269655233.svg": {
    "type": "image/svg+xml",
    "etag": "\"78c-2zWdcOw8D3qxf22w8QHWrd7bjiY\"",
    "mtime": "2025-12-12T02:07:50.165Z",
    "size": 1932,
    "path": "../public/images/7a6961f1a9975fef5728cefeccedfd5269655233.svg"
  },
  "/images/7d4bbf038c91b5a1ad58efeceff22b47533be34a.png": {
    "type": "image/png",
    "etag": "\"42287b-fUu/A4yRtaGtWO/s7/IrR1M740o\"",
    "mtime": "2025-12-12T02:07:51.323Z",
    "size": 4335739,
    "path": "../public/images/7d4bbf038c91b5a1ad58efeceff22b47533be34a.png"
  },
  "/images/7e37782118b8a03d0af28c3651459e344c85cbb8.svg": {
    "type": "image/svg+xml",
    "etag": "\"3cad-LkwsLuKQ8jaQfA9AgAfkkWtNyzk\"",
    "mtime": "2025-12-12T02:07:28.914Z",
    "size": 15533,
    "path": "../public/images/7e37782118b8a03d0af28c3651459e344c85cbb8.svg"
  },
  "/images/7eae95094aac76c3dd09614f3b6143d57d8f3f7e.svg": {
    "type": "image/svg+xml",
    "etag": "\"25c-3acGpndeIUAw3iFZ90wHPXF1RyU\"",
    "mtime": "2025-12-12T02:07:46.097Z",
    "size": 604,
    "path": "../public/images/7eae95094aac76c3dd09614f3b6143d57d8f3f7e.svg"
  },
  "/images/8034f8757d4d9c8f7b23873b7f07dc816d02c645.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c56-2tLlgEI97kSJqFtAZ8471PRNQ44\"",
    "mtime": "2025-12-12T02:07:34.743Z",
    "size": 15446,
    "path": "../public/images/8034f8757d4d9c8f7b23873b7f07dc816d02c645.svg"
  },
  "/images/814a244db2161cad8849dbaec1513978b191441d.png": {
    "type": "image/png",
    "etag": "\"fea9-gUokTbIWHK2ISduuwVE5eLGRRB0\"",
    "mtime": "2025-12-12T02:07:34.867Z",
    "size": 65193,
    "path": "../public/images/814a244db2161cad8849dbaec1513978b191441d.png"
  },
  "/images/862380c6a45e4b98f2e16ebf7c002544376e73e3.png": {
    "type": "image/png",
    "etag": "\"695764-hiOAxqReS5jy4W6/fAAlRDduc+M\"",
    "mtime": "2025-12-12T02:07:49.417Z",
    "size": 6903652,
    "path": "../public/images/862380c6a45e4b98f2e16ebf7c002544376e73e3.png"
  },
  "/images/86796c6cb08432397f67604764eba6a806e696ca.png": {
    "type": "image/png",
    "etag": "\"8a206c-hnlsbLCEMjl/Z2BHZOumqAbmlso\"",
    "mtime": "2025-12-12T02:07:33.253Z",
    "size": 9052268,
    "path": "../public/images/86796c6cb08432397f67604764eba6a806e696ca.png"
  },
  "/images/8812154303890534de875388fccc69be8916c79f.png": {
    "type": "image/png",
    "etag": "\"8831-iBIVQwOJBTTeh1OI/MxpvokWx58\"",
    "mtime": "2025-12-12T02:07:47.029Z",
    "size": 34865,
    "path": "../public/images/8812154303890534de875388fccc69be8916c79f.png"
  },
  "/images/8876cb186746f21f7d677fa51e0c9942805c93f9.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b60-9lkYAoZqIp9n2p7+3BYLJYro204\"",
    "mtime": "2025-12-12T02:07:35.116Z",
    "size": 15200,
    "path": "../public/images/8876cb186746f21f7d677fa51e0c9942805c93f9.svg"
  },
  "/images/893b721958ecc1903812ca6d7042f2da32b38bd9.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e84-8ocbd6HoFBt/9NgNFEXpYv54B84\"",
    "mtime": "2025-12-12T02:07:32.541Z",
    "size": 16004,
    "path": "../public/images/893b721958ecc1903812ca6d7042f2da32b38bd9.svg"
  },
  "/images/89773b428100405d32179a6cdbdd594de9ee8474.png": {
    "type": "image/png",
    "etag": "\"2915c3-iXc7QoEAQF0yF5ps291ZTenuhHQ\"",
    "mtime": "2025-12-12T02:07:35.024Z",
    "size": 2692547,
    "path": "../public/images/89773b428100405d32179a6cdbdd594de9ee8474.png"
  },
  "/images/89f4866d294c6082c4b8fa4beb6ea97b0d96edcb.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c48-GylKFvQjNwsewgDRe0XuPIdULnc\"",
    "mtime": "2025-12-12T02:07:32.533Z",
    "size": 15432,
    "path": "../public/images/89f4866d294c6082c4b8fa4beb6ea97b0d96edcb.svg"
  },
  "/images/8cc1a6c1495747b7c5d504a833f56c3a064ee1fd.svg": {
    "type": "image/svg+xml",
    "etag": "\"186-/lO2ClDdJXkfSHdX5C88K0UjxjQ\"",
    "mtime": "2025-12-12T02:07:47.053Z",
    "size": 390,
    "path": "../public/images/8cc1a6c1495747b7c5d504a833f56c3a064ee1fd.svg"
  },
  "/images/8d90b8d05e91390ec16d6716c15ec39b1baf03a3.png": {
    "type": "image/png",
    "etag": "\"aba2-jZC40F6ROQ7BbWcWwV7DmxuvA6M\"",
    "mtime": "2025-12-12T02:07:34.932Z",
    "size": 43938,
    "path": "../public/images/8d90b8d05e91390ec16d6716c15ec39b1baf03a3.png"
  },
  "/images/8eb0fa5c23e773b560582f5e95f3ec1f17c82b83.png": {
    "type": "image/png",
    "etag": "\"210018-jrD6XCPnc7VgWC9elfPsHxfIK4M\"",
    "mtime": "2025-12-12T02:07:32.379Z",
    "size": 2162712,
    "path": "../public/images/8eb0fa5c23e773b560582f5e95f3ec1f17c82b83.png"
  },
  "/images/8f72c0cf95434171c275f293d99f7f4076aaeb9d.png": {
    "type": "image/png",
    "etag": "\"18ce6-j3LAz5VDQXHCdfKT2Z9/QHaq650\"",
    "mtime": "2025-12-12T02:07:50.133Z",
    "size": 101606,
    "path": "../public/images/8f72c0cf95434171c275f293d99f7f4076aaeb9d.png"
  },
  "/images/90fdc30b51bcd5b3e48e5d86cb285af90804036d.png": {
    "type": "image/png",
    "etag": "\"755a4-kP3DC1G81bPkjl2Gyyha+QgEA20\"",
    "mtime": "2025-12-12T02:07:36.986Z",
    "size": 480676,
    "path": "../public/images/90fdc30b51bcd5b3e48e5d86cb285af90804036d.png"
  },
  "/images/92d8570c1ac60e14d7620b9851f4aa889174de3d.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b6a-32jiOelHSWsuW4vaZ0ysiSktoVc\"",
    "mtime": "2025-12-12T02:07:49.266Z",
    "size": 15210,
    "path": "../public/images/92d8570c1ac60e14d7620b9851f4aa889174de3d.svg"
  },
  "/images/94e6521c4a353274051418ce7a9fc0f610853fa5.svg": {
    "type": "image/svg+xml",
    "etag": "\"3bee-TzeqXixvHAHkJq+ESa8t6j+r8tc\"",
    "mtime": "2025-12-12T02:07:34.918Z",
    "size": 15342,
    "path": "../public/images/94e6521c4a353274051418ce7a9fc0f610853fa5.svg"
  },
  "/images/95000c29352d62b7d4b9e4c9b2ce3e6d1beb4532.svg": {
    "type": "image/svg+xml",
    "etag": "\"4fb7-vcaXIa/A63hd2HUV6LvylCgIG10\"",
    "mtime": "2025-12-12T02:07:34.891Z",
    "size": 20407,
    "path": "../public/images/95000c29352d62b7d4b9e4c9b2ce3e6d1beb4532.svg"
  },
  "/images/95f20e6f8e1d04b48264393af4ed6177204a1cbf.svg": {
    "type": "image/svg+xml",
    "etag": "\"366-ntPTatrt1voLC/P64onunBqFOn4\"",
    "mtime": "2025-12-12T02:07:34.884Z",
    "size": 870,
    "path": "../public/images/95f20e6f8e1d04b48264393af4ed6177204a1cbf.svg"
  },
  "/images/9805d94acfe05aa31893e9e5e8cb2bc336024109.svg": {
    "type": "image/svg+xml",
    "etag": "\"112-DQ/yoXbgx1P5Zdfhr72GQYZnvyc\"",
    "mtime": "2025-12-12T02:07:48.679Z",
    "size": 274,
    "path": "../public/images/9805d94acfe05aa31893e9e5e8cb2bc336024109.svg"
  },
  "/images/9828bed64f6627e5622b59107f03e0aa76e8a233.svg": {
    "type": "image/svg+xml",
    "etag": "\"3ea4-52seOirtY1N+46m3xkxb4hDGOXY\"",
    "mtime": "2025-12-12T02:07:32.501Z",
    "size": 16036,
    "path": "../public/images/9828bed64f6627e5622b59107f03e0aa76e8a233.svg"
  },
  "/images/987c8fb79aaaf1bcffad714c25b4ff4d60df7188.png": {
    "type": "image/png",
    "etag": "\"2acf46-mHyPt5qq8bz/rXFMJbT/TWDfcYg\"",
    "mtime": "2025-12-12T02:07:33.580Z",
    "size": 2805574,
    "path": "../public/images/987c8fb79aaaf1bcffad714c25b4ff4d60df7188.png"
  },
  "/images/991d1905e6ef6b45516b299c949a55312530bdf1.svg": {
    "type": "image/svg+xml",
    "etag": "\"100-/xjsVPg+xaAbMYYu5YT9ThaQTn0\"",
    "mtime": "2025-12-12T02:07:37.132Z",
    "size": 256,
    "path": "../public/images/991d1905e6ef6b45516b299c949a55312530bdf1.svg"
  },
  "/images/9af09c835e8fa942aeecd800314c0bbe887c3a36.svg": {
    "type": "image/svg+xml",
    "etag": "\"108-HUJuQWVHyoJevkqLK1USSGf7jAU\"",
    "mtime": "2025-12-12T02:07:47.020Z",
    "size": 264,
    "path": "../public/images/9af09c835e8fa942aeecd800314c0bbe887c3a36.svg"
  },
  "/images/9b597968e390e1ea182910f19d7c59e5551b8248.png": {
    "type": "image/png",
    "etag": "\"eebe2-m1l5aOOQ4eoYKRDxnXxZ5VUbgkg\"",
    "mtime": "2025-12-12T02:07:49.310Z",
    "size": 977890,
    "path": "../public/images/9b597968e390e1ea182910f19d7c59e5551b8248.png"
  },
  "/images/9e1d09db2532e6776c3f7674f3246325fdd845fa.svg": {
    "type": "image/svg+xml",
    "etag": "\"121-7kvysrDG6bmbFWpR64Ln16Nh5Ok\"",
    "mtime": "2025-12-12T02:07:29.726Z",
    "size": 289,
    "path": "../public/images/9e1d09db2532e6776c3f7674f3246325fdd845fa.svg"
  },
  "/images/a05be17a1f410db5f2557a07708057022914751f.png": {
    "type": "image/png",
    "etag": "\"573c8e-oFvheh9BDbXyVXoHcIBXAikUdR8\"",
    "mtime": "2025-12-12T02:07:48.504Z",
    "size": 5717134,
    "path": "../public/images/a05be17a1f410db5f2557a07708057022914751f.png"
  },
  "/images/a1034a5fa81a6750e17145ce2613077ac5efda8e.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c69-npE4IgvW58Vd4W+CjrTo+mplnJ0\"",
    "mtime": "2025-12-12T02:07:34.765Z",
    "size": 15465,
    "path": "../public/images/a1034a5fa81a6750e17145ce2613077ac5efda8e.svg"
  },
  "/images/a14b6a81c0dfc5df06d9d47765ede9a6daffb03e.png": {
    "type": "image/png",
    "etag": "\"8a-oUtqgcDfxd8G2dR3Ze3pptr/sD4\"",
    "mtime": "2025-12-12T02:07:35.889Z",
    "size": 138,
    "path": "../public/images/a14b6a81c0dfc5df06d9d47765ede9a6daffb03e.png"
  },
  "/images/a19bfe4bf6d884a9a6bd2b14d6240b67fd9b959f.png": {
    "type": "image/png",
    "etag": "\"8a-oZv+S/bYhKmmvSsU1iQLZ/2blZ8\"",
    "mtime": "2025-12-12T02:07:35.249Z",
    "size": 138,
    "path": "../public/images/a19bfe4bf6d884a9a6bd2b14d6240b67fd9b959f.png"
  },
  "/images/a827d14c4c8566261b0cba6d52fa80e79292303f.png": {
    "type": "image/png",
    "etag": "\"3df99-qCfRTEyFZiYbDLptUvqA55KSMD8\"",
    "mtime": "2025-12-12T02:07:50.068Z",
    "size": 253849,
    "path": "../public/images/a827d14c4c8566261b0cba6d52fa80e79292303f.png"
  },
  "/images/a8c53f2903d7dc0e94a50208a8c67b019a7eafa5.svg": {
    "type": "image/svg+xml",
    "etag": "\"143-KPFDt0fxF7y5YjUSWKaNz8XvbNo\"",
    "mtime": "2025-12-12T02:07:34.858Z",
    "size": 323,
    "path": "../public/images/a8c53f2903d7dc0e94a50208a8c67b019a7eafa5.svg"
  },
  "/images/a8c666368967e1c2b330b0e773c852b52ccba56f.svg": {
    "type": "image/svg+xml",
    "etag": "\"15b-knixG+kfPM5X8lBUM5Tz0dGCGk8\"",
    "mtime": "2025-12-12T02:07:45.923Z",
    "size": 347,
    "path": "../public/images/a8c666368967e1c2b330b0e773c852b52ccba56f.svg"
  },
  "/images/a9f3495b5dc55635957a7aade82d1b35127bfe7d.png": {
    "type": "image/png",
    "etag": "\"47a857-qfNJW13FVjWVenqt6C0bNRJ7/n0\"",
    "mtime": "2025-12-12T02:07:32.623Z",
    "size": 4696151,
    "path": "../public/images/a9f3495b5dc55635957a7aade82d1b35127bfe7d.png"
  },
  "/images/aa036df12ec50d331edbafd46b05ce0fe104c833.png": {
    "type": "image/png",
    "etag": "\"10e96-qgNt8S7FDTMe26/UawXOD+EEyDM\"",
    "mtime": "2025-12-12T02:07:49.316Z",
    "size": 69270,
    "path": "../public/images/aa036df12ec50d331edbafd46b05ce0fe104c833.png"
  },
  "/images/ab20dc0ce42df0f0e47b3f0d2e8533b35b7383a8.svg": {
    "type": "image/svg+xml",
    "etag": "\"51f-MFfCEPd+r/KMs61wMz/K+YDzEq4\"",
    "mtime": "2025-12-12T02:07:36.229Z",
    "size": 1311,
    "path": "../public/images/ab20dc0ce42df0f0e47b3f0d2e8533b35b7383a8.svg"
  },
  "/images/ad78f5dc564e392ac67d7bf141a977954787c6aa.svg": {
    "type": "image/svg+xml",
    "etag": "\"564-rqBj931gpw71B+6gdB7+diCCHjE\"",
    "mtime": "2025-12-12T02:07:47.045Z",
    "size": 1380,
    "path": "../public/images/ad78f5dc564e392ac67d7bf141a977954787c6aa.svg"
  },
  "/images/ae9598845a45a5dd800e557303609d05f6fe9b59.png": {
    "type": "image/png",
    "etag": "\"997d3-rpWYhFpFpd2ADlVzA2CdBfb+m1k\"",
    "mtime": "2025-12-12T02:07:41.683Z",
    "size": 628691,
    "path": "../public/images/ae9598845a45a5dd800e557303609d05f6fe9b59.png"
  },
  "/images/afc0ea37a49a488636ecd5e9884fc438413e6dea.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c7a-OIcAThH/fYgLXG1oo1GEFc01fcQ\"",
    "mtime": "2025-12-12T02:07:34.784Z",
    "size": 15482,
    "path": "../public/images/afc0ea37a49a488636ecd5e9884fc438413e6dea.svg"
  },
  "/images/b05d7a39ef3d276280feb7e3ddec60f474dc5a7d.svg": {
    "type": "image/svg+xml",
    "etag": "\"2169f-rVMSaWnHP2HSlaRqYGIynyVSbqk\"",
    "mtime": "2025-12-12T02:07:33.852Z",
    "size": 136863,
    "path": "../public/images/b05d7a39ef3d276280feb7e3ddec60f474dc5a7d.svg"
  },
  "/images/b623d4dec5b13e4c531de1a9379592257c83da5f.svg": {
    "type": "image/svg+xml",
    "etag": "\"986-v99x2IJXF/NOYyexx2wGSv4F7FA\"",
    "mtime": "2025-12-12T02:07:45.951Z",
    "size": 2438,
    "path": "../public/images/b623d4dec5b13e4c531de1a9379592257c83da5f.svg"
  },
  "/images/b81d64572a8e3e93c6958707f8b55c1bbc398e68.png": {
    "type": "image/png",
    "etag": "\"fa2a-uB1kVyqOPpPGlYcH+LVcG7w5jmg\"",
    "mtime": "2025-12-12T02:07:45.918Z",
    "size": 64042,
    "path": "../public/images/b81d64572a8e3e93c6958707f8b55c1bbc398e68.png"
  },
  "/images/b89d8ebbba4324f1ce1a904cfa727e19acf5a8c4.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c56-+O05xOwZymsd0FfHMV0GmGqv+xI\"",
    "mtime": "2025-12-12T02:07:34.698Z",
    "size": 15446,
    "path": "../public/images/b89d8ebbba4324f1ce1a904cfa727e19acf5a8c4.svg"
  },
  "/images/bbb6280da1d6f7b001ea956594ae72576a482236.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ca-IIiMq8nPTFCFLE6GUvo2bPpsO6k\"",
    "mtime": "2025-12-12T02:07:48.617Z",
    "size": 714,
    "path": "../public/images/bbb6280da1d6f7b001ea956594ae72576a482236.svg"
  },
  "/images/bc9facb16b5c51861c61853f1b2f882a42729b9a.png": {
    "type": "image/png",
    "etag": "\"9c2-vJ+ssWtcUYYcYYU/Gy+IKkJym5o\"",
    "mtime": "2025-12-12T02:08:00.981Z",
    "size": 2498,
    "path": "../public/images/bc9facb16b5c51861c61853f1b2f882a42729b9a.png"
  },
  "/images/c1c92251deed0b35fda02e11c3bacfde36c592fe.png": {
    "type": "image/png",
    "etag": "\"89-wckiUd7tCzX9oC4Rw7rP3jbFkv4\"",
    "mtime": "2025-12-12T02:07:35.282Z",
    "size": 137,
    "path": "../public/images/c1c92251deed0b35fda02e11c3bacfde36c592fe.png"
  },
  "/images/c1f04ebb1517bc6ebe8f8a24da4112a2ec220eab.svg": {
    "type": "image/svg+xml",
    "etag": "\"3f30-YHAyPy6mUPxVlidNL2l05u5nsFU\"",
    "mtime": "2025-12-12T02:07:29.047Z",
    "size": 16176,
    "path": "../public/images/c1f04ebb1517bc6ebe8f8a24da4112a2ec220eab.svg"
  },
  "/images/c360a8e3d4effa35e22d207377441a0f1287b7ed.png": {
    "type": "image/png",
    "etag": "\"2763a-w2Co49Tv+jXiLSBzd0QaDxKHt+0\"",
    "mtime": "2025-12-12T02:07:34.022Z",
    "size": 161338,
    "path": "../public/images/c360a8e3d4effa35e22d207377441a0f1287b7ed.png"
  },
  "/images/c41591fd460a38d3855551bdf10e4e0f82a47b2f.svg": {
    "type": "image/svg+xml",
    "etag": "\"101-jmbThVPcyAwNoPWF1hsmtvGLJms\"",
    "mtime": "2025-12-12T02:07:48.688Z",
    "size": 257,
    "path": "../public/images/c41591fd460a38d3855551bdf10e4e0f82a47b2f.svg"
  },
  "/images/c5ee8ee14e894c1adff5f3904ccdd612b3b89924.png": {
    "type": "image/png",
    "etag": "\"88-xe6O4U6JTBrf9fOQTM3WErO4mSQ\"",
    "mtime": "2025-12-12T02:07:35.269Z",
    "size": 136,
    "path": "../public/images/c5ee8ee14e894c1adff5f3904ccdd612b3b89924.png"
  },
  "/images/c83089ea2e2926facc870b7a3e694d84d9c0f17b.svg": {
    "type": "image/svg+xml",
    "etag": "\"33b-WTz54N39S68O68/tO5mXVNaXGOs\"",
    "mtime": "2025-12-12T02:07:45.897Z",
    "size": 827,
    "path": "../public/images/c83089ea2e2926facc870b7a3e694d84d9c0f17b.svg"
  },
  "/images/c859f641180e02cd73a1bc4f2541683d01c04760.png": {
    "type": "image/png",
    "etag": "\"51e15-yFn2QRgOAs1zobxPJUFoPQHAR2A\"",
    "mtime": "2025-12-12T02:07:34.878Z",
    "size": 335381,
    "path": "../public/images/c859f641180e02cd73a1bc4f2541683d01c04760.png"
  },
  "/images/c9667fc5d8cd6e96409b6a662dc1ebffea2486c1.svg": {
    "type": "image/svg+xml",
    "etag": "\"191-+xi4Q+MLTqcadDrtjUU7bxHkzP0\"",
    "mtime": "2025-12-12T02:07:34.987Z",
    "size": 401,
    "path": "../public/images/c9667fc5d8cd6e96409b6a662dc1ebffea2486c1.svg"
  },
  "/images/caaadbdae11df421997a2d0ac159d990ba6f8b19.svg": {
    "type": "image/svg+xml",
    "etag": "\"3dca-EbWhYP40dq3YX+0yGgD41A34ysQ\"",
    "mtime": "2025-12-12T02:07:32.437Z",
    "size": 15818,
    "path": "../public/images/caaadbdae11df421997a2d0ac159d990ba6f8b19.svg"
  },
  "/images/cd2c56c1cef71fa605ba6ec3ee0422a8e82a17c6.png": {
    "type": "image/png",
    "etag": "\"768d0-zSxWwc73H6YFum7D7gQiqOgqF8Y\"",
    "mtime": "2025-12-12T02:07:33.926Z",
    "size": 485584,
    "path": "../public/images/cd2c56c1cef71fa605ba6ec3ee0422a8e82a17c6.png"
  },
  "/images/cd33cda9b2ecadb1703dd604d4d29de35746d509.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a8-0/rkDGwCV9cQhxQTrHGOo+3LYhk\"",
    "mtime": "2025-12-12T02:07:45.929Z",
    "size": 424,
    "path": "../public/images/cd33cda9b2ecadb1703dd604d4d29de35746d509.svg"
  },
  "/images/cf2238634bf9e499c3cf1bc6ceaeaddc36b6d364.png": {
    "type": "image/png",
    "etag": "\"88-zyI4Y0v55JnDzxvGzq6t3Da202Q\"",
    "mtime": "2025-12-12T02:07:36.069Z",
    "size": 136,
    "path": "../public/images/cf2238634bf9e499c3cf1bc6ceaeaddc36b6d364.png"
  },
  "/images/d08a325c257a83f320f797bc51e9c7bd0a8dbd01.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b74-UukTflzciIUh9wj+X+4YJuYl0OY\"",
    "mtime": "2025-12-12T02:07:45.972Z",
    "size": 15220,
    "path": "../public/images/d08a325c257a83f320f797bc51e9c7bd0a8dbd01.svg"
  },
  "/images/d1094bc8c66a0d0e6c262567912a7a7d9486b63c.png": {
    "type": "image/png",
    "etag": "\"89-0QlLyMZqDQ5sJiVnkSp6fZSGtjw\"",
    "mtime": "2025-12-12T02:07:35.262Z",
    "size": 137,
    "path": "../public/images/d1094bc8c66a0d0e6c262567912a7a7d9486b63c.png"
  },
  "/images/d2235a4d3056b67f5809ec56d38b68284ebeb94d.svg": {
    "type": "image/svg+xml",
    "etag": "\"33a-PYB0mLrMTm5EO0UQS+roR55isC4\"",
    "mtime": "2025-12-12T02:07:44.544Z",
    "size": 826,
    "path": "../public/images/d2235a4d3056b67f5809ec56d38b68284ebeb94d.svg"
  },
  "/images/d3c5283687d44afd2e6290d2b1c87d982be47f19.png": {
    "type": "image/png",
    "etag": "\"14880-08UoNofUSv0uYpDSsch9mCvkfxk\"",
    "mtime": "2025-12-12T02:07:50.116Z",
    "size": 84096,
    "path": "../public/images/d3c5283687d44afd2e6290d2b1c87d982be47f19.png"
  },
  "/images/d48c6b51b907c167377337c557c5a91f872e2d68.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b5f-UKbu7LNT96d9JC6YYhxRk8xod0Y\"",
    "mtime": "2025-12-12T02:07:32.386Z",
    "size": 15199,
    "path": "../public/images/d48c6b51b907c167377337c557c5a91f872e2d68.svg"
  },
  "/images/d6f487a4ddcbe186622f9531bd7319214a3f4545.svg": {
    "type": "image/svg+xml",
    "etag": "\"ad3-a8hrfvTVd65Zs30u5EbB5Cchjxk\"",
    "mtime": "2025-12-12T02:07:59.590Z",
    "size": 2771,
    "path": "../public/images/d6f487a4ddcbe186622f9531bd7319214a3f4545.svg"
  },
  "/images/d829d2cb3e6527b5ec6f0c50114f4557997d5798.png": {
    "type": "image/png",
    "etag": "\"22aaa-2CnSyz5lJ7XsbwxQEU9FV5l9V5g\"",
    "mtime": "2025-12-12T02:07:37.083Z",
    "size": 141994,
    "path": "../public/images/d829d2cb3e6527b5ec6f0c50114f4557997d5798.png"
  },
  "/images/d82e3211e7359f5fbb031ff781fc8d06d40a8afa.svg": {
    "type": "image/svg+xml",
    "etag": "\"106-wgIfTimLH+BeM0ecAEILecTmCtg\"",
    "mtime": "2025-12-12T02:07:50.143Z",
    "size": 262,
    "path": "../public/images/d82e3211e7359f5fbb031ff781fc8d06d40a8afa.svg"
  },
  "/images/d8892b231b8e04ce39f62542f365b0c1b3633194.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c70-kKgt3oImGym7tMjisrk4MWDZftk\"",
    "mtime": "2025-12-12T02:07:34.753Z",
    "size": 15472,
    "path": "../public/images/d8892b231b8e04ce39f62542f365b0c1b3633194.svg"
  },
  "/images/d8b6799a55cfc1d0681fd4004e79c9a2e5d73312.svg": {
    "type": "image/svg+xml",
    "etag": "\"2b4-agDW3M8FvnGY/J0yLGLadbqOMXY\"",
    "mtime": "2025-12-12T02:07:36.971Z",
    "size": 692,
    "path": "../public/images/d8b6799a55cfc1d0681fd4004e79c9a2e5d73312.svg"
  },
  "/images/d8ee976f4aa3eddb2a5d85043a85ee4ec2f70ecd.svg": {
    "type": "image/svg+xml",
    "etag": "\"1fc-tuQfGge+BQIAcd1inNVfuw9ExvM\"",
    "mtime": "2025-12-12T02:07:50.178Z",
    "size": 508,
    "path": "../public/images/d8ee976f4aa3eddb2a5d85043a85ee4ec2f70ecd.svg"
  },
  "/images/de62bedddc3aedadfcd1afc5ec1f21da6e1263c1.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-KGZGq1MGWd4IldyaP3NPptKvNnE\"",
    "mtime": "2025-12-12T02:07:45.963Z",
    "size": 767,
    "path": "../public/images/de62bedddc3aedadfcd1afc5ec1f21da6e1263c1.svg"
  },
  "/images/df238b2245f68e0243be1f292f3639f516d4bd3f.svg": {
    "type": "image/svg+xml",
    "etag": "\"572-eICNjR7oVCChMTWBU+itaDfMW8c\"",
    "mtime": "2025-12-12T02:07:45.936Z",
    "size": 1394,
    "path": "../public/images/df238b2245f68e0243be1f292f3639f516d4bd3f.svg"
  },
  "/images/df40a4508825e8999911d774eda9e30a3141086f.png": {
    "type": "image/png",
    "etag": "\"19ade-30CkUIgl6JmZEdd07anjCjFBCG8\"",
    "mtime": "2025-12-12T02:07:50.105Z",
    "size": 105182,
    "path": "../public/images/df40a4508825e8999911d774eda9e30a3141086f.png"
  },
  "/images/e06e517bc5b9bd994651c0287587f961ea5d1c2e.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b67-OXO9KD8DUwiOFFETCc9fBpnEmgI\"",
    "mtime": "2025-12-12T02:07:49.254Z",
    "size": 15207,
    "path": "../public/images/e06e517bc5b9bd994651c0287587f961ea5d1c2e.svg"
  },
  "/images/e10b4c5b0f431d5ffb23e1d2f673bb0c7a033928.png": {
    "type": "image/png",
    "etag": "\"343253-4QtMWw9DHV/7I+HS9nO7DHoDOSg\"",
    "mtime": "2025-12-12T02:07:47.140Z",
    "size": 3420755,
    "path": "../public/images/e10b4c5b0f431d5ffb23e1d2f673bb0c7a033928.png"
  },
  "/images/e202e42826adf97f90e3b5e6d1f26349274451b5.svg": {
    "type": "image/svg+xml",
    "etag": "\"254-qjHOtwlNvgTmysfF8f5G51VcT+A\"",
    "mtime": "2025-12-12T02:07:45.836Z",
    "size": 596,
    "path": "../public/images/e202e42826adf97f90e3b5e6d1f26349274451b5.svg"
  },
  "/images/e237870156ae6f88344b6b5b92cf0738bfa60b99.svg": {
    "type": "image/svg+xml",
    "etag": "\"2a9-ceC29zGwP2cJ9xAxQ3OmCqxoL20\"",
    "mtime": "2025-12-12T02:07:48.606Z",
    "size": 681,
    "path": "../public/images/e237870156ae6f88344b6b5b92cf0738bfa60b99.svg"
  },
  "/images/e38f005d8f86a1fc52f93c5fe4ed474115f97c6c.png": {
    "type": "image/png",
    "etag": "\"1628ea-448AXY+GofxS+Txf5O1HQRX5fGw\"",
    "mtime": "2025-12-12T02:07:33.647Z",
    "size": 1452266,
    "path": "../public/images/e38f005d8f86a1fc52f93c5fe4ed474115f97c6c.png"
  },
  "/images/e425d5daff4330ef150d2edae6b60480427ce1ca.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b5e-ROdf6CP//5FXM0wylA0bBzK5ofM\"",
    "mtime": "2025-12-12T02:07:49.271Z",
    "size": 15198,
    "path": "../public/images/e425d5daff4330ef150d2edae6b60480427ce1ca.svg"
  },
  "/images/e727bcffa8ac7d76b109eeb34171b23e800c5a60.png": {
    "type": "image/png",
    "etag": "\"89-5ye8/6isfXaxCe6zQXGyPoAMWmA\"",
    "mtime": "2025-12-12T02:07:35.287Z",
    "size": 137,
    "path": "../public/images/e727bcffa8ac7d76b109eeb34171b23e800c5a60.png"
  },
  "/images/e7515f7ef8c303911576e7a8da4bb3f7b708ae0d.svg": {
    "type": "image/svg+xml",
    "etag": "\"143-Z/bRCMArFqvPXBPfo7UVQQX4oPg\"",
    "mtime": "2025-12-12T02:07:29.357Z",
    "size": 323,
    "path": "../public/images/e7515f7ef8c303911576e7a8da4bb3f7b708ae0d.svg"
  },
  "/images/e7ce86ab6f8627cf7e1f83c4d2cdbdd293b13af9.png": {
    "type": "image/png",
    "etag": "\"4f3983-586Gq2+GJ89+H4PE0s290pOxOvk\"",
    "mtime": "2025-12-12T02:07:46.995Z",
    "size": 5192067,
    "path": "../public/images/e7ce86ab6f8627cf7e1f83c4d2cdbdd293b13af9.png"
  },
  "/images/e7ea4434249f6f88521312204db4c80e44a182c9.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b3c-h1se/sl3plRvHKvj9YRZ3Wg/jno\"",
    "mtime": "2025-12-12T02:07:45.967Z",
    "size": 15164,
    "path": "../public/images/e7ea4434249f6f88521312204db4c80e44a182c9.svg"
  },
  "/images/eb9dbec2afd289538aaf2338c1e7cdabd120fdd9.svg": {
    "type": "image/svg+xml",
    "etag": "\"2e1-Nx2ej1swFOYQ8O8K/pD51ERTlsk\"",
    "mtime": "2025-12-12T02:07:47.069Z",
    "size": 737,
    "path": "../public/images/eb9dbec2afd289538aaf2338c1e7cdabd120fdd9.svg"
  },
  "/images/ebafb53af7fa88c516d7b2e1d6b2ccbd7f1c23c5.svg": {
    "type": "image/svg+xml",
    "etag": "\"100-2axqBU8zanF1SNcJRR/204WWh/I\"",
    "mtime": "2025-12-12T02:07:57.624Z",
    "size": 256,
    "path": "../public/images/ebafb53af7fa88c516d7b2e1d6b2ccbd7f1c23c5.svg"
  },
  "/images/ec080aa47c13abea2a7877711932d272fe4017cd.svg": {
    "type": "image/svg+xml",
    "etag": "\"589-lbC1405qgX969SUKd2IizLCyCAI\"",
    "mtime": "2025-12-12T02:07:43.515Z",
    "size": 1417,
    "path": "../public/images/ec080aa47c13abea2a7877711932d272fe4017cd.svg"
  },
  "/images/ec189ce9152d75ecae8a76a27e4a97f868029f45.svg": {
    "type": "image/svg+xml",
    "etag": "\"ff-DAr3NVQQqc9pgthGhcNHPKqxch4\"",
    "mtime": "2025-12-12T02:07:49.196Z",
    "size": 255,
    "path": "../public/images/ec189ce9152d75ecae8a76a27e4a97f868029f45.svg"
  },
  "/images/ed391c7906e87b9834fb38e2f4cfed303c332f9e.svg": {
    "type": "image/svg+xml",
    "etag": "\"25b-cqsBoBrlGIy3Yf0Xgi3vR5a37d8\"",
    "mtime": "2025-12-12T02:07:33.188Z",
    "size": 603,
    "path": "../public/images/ed391c7906e87b9834fb38e2f4cfed303c332f9e.svg"
  },
  "/images/f0173d196313e29dabae8e995fee348a083a72f0.png": {
    "type": "image/png",
    "etag": "\"5e6bb-8Bc9GWMT4p2rro6ZX+40igg6cvA\"",
    "mtime": "2025-12-12T02:07:33.947Z",
    "size": 386747,
    "path": "../public/images/f0173d196313e29dabae8e995fee348a083a72f0.png"
  },
  "/images/f0aec34db6d49a989d80cc807ac8cf657d22bc68.svg": {
    "type": "image/svg+xml",
    "etag": "\"3f16-FyfHNRtqhETV9bWh7xR7yYO946Q\"",
    "mtime": "2025-12-12T02:07:30.501Z",
    "size": 16150,
    "path": "../public/images/f0aec34db6d49a989d80cc807ac8cf657d22bc68.svg"
  },
  "/images/f2b0f28d34144116dee1c72499c01d2ccb70ae46.svg": {
    "type": "image/svg+xml",
    "etag": "\"794-vDD6aGYgFxEi4/fB0oyGrZiJwGU\"",
    "mtime": "2025-12-12T02:07:37.148Z",
    "size": 1940,
    "path": "../public/images/f2b0f28d34144116dee1c72499c01d2ccb70ae46.svg"
  },
  "/images/f2ed356a28ea3c761e451f98ce12015c9214c5a4.svg": {
    "type": "image/svg+xml",
    "etag": "\"42dc-Y/gK9/qwYVfJ7Qqz7aD2plkO9A8\"",
    "mtime": "2025-12-12T02:07:35.031Z",
    "size": 17116,
    "path": "../public/images/f2ed356a28ea3c761e451f98ce12015c9214c5a4.svg"
  },
  "/images/f38ebc9c5966cb39991847209b7ac59fb8593345.svg": {
    "type": "image/svg+xml",
    "etag": "\"114-XoNOQlgJDJwg5u/XOt2uYZCYzpY\"",
    "mtime": "2025-12-12T02:07:45.943Z",
    "size": 276,
    "path": "../public/images/f38ebc9c5966cb39991847209b7ac59fb8593345.svg"
  },
  "/images/f4572bc68aa4800f68da6a90d1edfdd476b3cc0e.svg": {
    "type": "image/svg+xml",
    "etag": "\"3f6d-pzg6/xBBiXmQuaHOLzxpoez8yYQ\"",
    "mtime": "2025-12-12T02:07:35.159Z",
    "size": 16237,
    "path": "../public/images/f4572bc68aa4800f68da6a90d1edfdd476b3cc0e.svg"
  },
  "/images/f92b3d3cba69148135b35c3a226b9d4d607fb140.png": {
    "type": "image/png",
    "etag": "\"255249-+Ss9PLppFIE1s1w6ImudTWB/sUA\"",
    "mtime": "2025-12-12T02:07:34.520Z",
    "size": 2445897,
    "path": "../public/images/f92b3d3cba69148135b35c3a226b9d4d607fb140.png"
  },
  "/images/fa2c0179c0f0368dff874ff245013e9c1aa7a6aa.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d7-KblumHFMHHjQvFvnfg0cbJcM4KI\"",
    "mtime": "2025-12-12T02:07:36.196Z",
    "size": 727,
    "path": "../public/images/fa2c0179c0f0368dff874ff245013e9c1aa7a6aa.svg"
  },
  "/images/fabab5ef05e1fdb588934efa8c1ae61fe8945f85.png": {
    "type": "image/png",
    "etag": "\"1b5b5c-+rq17wXh/bWIk076jBrmH+iUX4U\"",
    "mtime": "2025-12-12T02:07:35.072Z",
    "size": 1792860,
    "path": "../public/images/fabab5ef05e1fdb588934efa8c1ae61fe8945f85.png"
  },
  "/images/fd620f2cfc7a1a755e634159ca8ecff7792a7bc7.png": {
    "type": "image/png",
    "etag": "\"8a-/WIPLPx6GnVeY0FZyo7P93kqe8c\"",
    "mtime": "2025-12-12T02:07:35.292Z",
    "size": 138,
    "path": "../public/images/fd620f2cfc7a1a755e634159ca8ecff7792a7bc7.png"
  },
  "/images/fe41cae0736955bfefda85dcc946ed1486bb8a5f.png": {
    "type": "image/png",
    "etag": "\"3faa9f-/kHK4HNpVb/v2oXcyUbtFIa7il8\"",
    "mtime": "2025-12-12T02:07:34.853Z",
    "size": 4172447,
    "path": "../public/images/fe41cae0736955bfefda85dcc946ed1486bb8a5f.png"
  },
  "/images/fe96f811b59f4bc47f7f21f015ccda19f35c8fdf.png": {
    "type": "image/png",
    "etag": "\"8a-/pb4EbWfS8R/fyHwFczaGfNcj98\"",
    "mtime": "2025-12-12T02:07:35.278Z",
    "size": 138,
    "path": "../public/images/fe96f811b59f4bc47f7f21f015ccda19f35c8fdf.png"
  },
  "/images/hero-aerial.jpg": {
    "type": "image/jpeg",
    "etag": "\"3564d1-uEH7TalJKCa0e1kWvhiLVbg2dow\"",
    "mtime": "2025-12-14T19:12:19.903Z",
    "size": 3499217,
    "path": "../public/images/hero-aerial.jpg"
  },
  "/images/hero-bg.png": {
    "type": "image/png",
    "etag": "\"42287b-fUu/A4yRtaGtWO/s7/IrR1M740o\"",
    "mtime": "2025-12-14T18:30:19.375Z",
    "size": 4335739,
    "path": "../public/images/hero-bg.png"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-uZjhw9e32OcSStlemi0q42lomTQ\"",
    "mtime": "2025-12-14T22:12:05.491Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/5b925540-9ad2-498e-a988-12407b8895e5.json": {
    "type": "application/json",
    "etag": "\"8b-TmY9/QNGu6YRUKMiCq5BWIOQ8PQ\"",
    "mtime": "2025-12-14T22:12:05.492Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/5b925540-9ad2-498e-a988-12407b8895e5.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _BudYd0 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_xcH46L = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _BudYd0, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_xcH46L, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_xcH46L, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { $fetch as $, withoutTrailingSlash as A, trapUnhandledNodeErrors as a, useNitroApp as b, getResponseStatus as c, destr as d, defineRenderHandler as e, getQuery as f, getResponseStatusText as g, createError$1 as h, getRouteRules as i, joinRelativeURL as j, hasProtocol as k, isScriptProtocol as l, joinURL as m, sanitizeStatusCode as n, getContext as o, createHooks as p, executeAsync as q, toRouteMatcher as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, createRouter$1 as v, withQuery as w, defu as x, parseQuery as y, withTrailingSlash as z };
//# sourceMappingURL=nitro.mjs.map
