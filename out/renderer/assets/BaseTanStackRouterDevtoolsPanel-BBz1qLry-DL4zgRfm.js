import { C as clsx, M as interpolatePath, N as trimPath, P as invariant, j as rootRouteId } from "./index-B6waIkEG.js";
var sharedConfig = {
	context: void 0,
	registry: void 0,
	effects: void 0,
	done: false,
	getContextId() {
		return getContextId(this.context.count);
	},
	getNextContextId() {
		return getContextId(this.context.count++);
	}
};
function getContextId(count) {
	const num = String(count), len = num.length - 1;
	return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
}
function setHydrateContext(context) {
	sharedConfig.context = context;
}
var equalFn = (a$1, b$1) => a$1 === b$1;
var $PROXY = Symbol("solid-proxy");
var SUPPORTS_PROXY = typeof Proxy === "function";
var $TRACK = Symbol("solid-track");
var signalOptions = { equals: equalFn };
var runEffects = runQueue;
var STALE = 1;
var PENDING = 2;
var UNOWNED = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
};
var Owner = null;
var Listener = null;
var Updates = null;
var Effects = null;
var ExecCount = 0;
function createRoot(fn, detachedOwner) {
	const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === void 0 ? owner : detachedOwner, root = unowned ? UNOWNED : {
		owned: null,
		cleanups: null,
		context: current ? current.context : null,
		owner: current
	}, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
	Owner = root;
	Listener = null;
	try {
		return runUpdates(updateFn, true);
	} finally {
		Listener = listener;
		Owner = owner;
	}
}
function createSignal(value, options) {
	options = options ? Object.assign({}, signalOptions, options) : signalOptions;
	const s$1 = {
		value,
		observers: null,
		observerSlots: null,
		comparator: options.equals || void 0
	};
	const setter = (value2) => {
		if (typeof value2 === "function") value2 = value2(s$1.value);
		return writeSignal(s$1, value2);
	};
	return [readSignal.bind(s$1), setter];
}
function createRenderEffect(fn, value, options) {
	updateComputation(createComputation(fn, value, false, STALE));
}
function createEffect(fn, value, options) {
	runEffects = runUserEffects;
	const c$1 = createComputation(fn, value, false, STALE);
	if (!options || !options.render) c$1.user = true;
	Effects ? Effects.push(c$1) : updateComputation(c$1);
}
function createMemo(fn, value, options) {
	options = options ? Object.assign({}, signalOptions, options) : signalOptions;
	const c$1 = createComputation(fn, value, true, 0);
	c$1.observers = null;
	c$1.observerSlots = null;
	c$1.comparator = options.equals || void 0;
	updateComputation(c$1);
	return readSignal.bind(c$1);
}
function untrack(fn) {
	if (Listener === null) return fn();
	const listener = Listener;
	Listener = null;
	try {
		return fn();
	} finally {
		Listener = listener;
	}
}
function onCleanup(fn) {
	if (Owner === null);
	else if (Owner.cleanups === null) Owner.cleanups = [fn];
	else Owner.cleanups.push(fn);
	return fn;
}
function createContext(defaultValue, options) {
	const id = Symbol("context");
	return {
		id,
		Provider: createProvider(id),
		defaultValue
	};
}
function useContext(context) {
	let value;
	return Owner && Owner.context && (value = Owner.context[context.id]) !== void 0 ? value : context.defaultValue;
}
function children(fn) {
	const children2 = createMemo(fn);
	const memo2 = createMemo(() => resolveChildren(children2()));
	memo2.toArray = () => {
		const c$1 = memo2();
		return Array.isArray(c$1) ? c$1 : c$1 != null ? [c$1] : [];
	};
	return memo2;
}
function readSignal() {
	if (this.sources && this.state) if (this.state === STALE) updateComputation(this);
	else {
		const updates = Updates;
		Updates = null;
		runUpdates(() => lookUpstream(this), false);
		Updates = updates;
	}
	if (Listener) {
		const sSlot = this.observers ? this.observers.length : 0;
		if (!Listener.sources) {
			Listener.sources = [this];
			Listener.sourceSlots = [sSlot];
		} else {
			Listener.sources.push(this);
			Listener.sourceSlots.push(sSlot);
		}
		if (!this.observers) {
			this.observers = [Listener];
			this.observerSlots = [Listener.sources.length - 1];
		} else {
			this.observers.push(Listener);
			this.observerSlots.push(Listener.sources.length - 1);
		}
	}
	return this.value;
}
function writeSignal(node, value, isComp) {
	let current = node.value;
	if (!node.comparator || !node.comparator(current, value)) {
		node.value = value;
		if (node.observers && node.observers.length) runUpdates(() => {
			for (let i$1 = 0; i$1 < node.observers.length; i$1 += 1) {
				const o$1 = node.observers[i$1];
				if (!o$1.state) {
					if (o$1.pure) Updates.push(o$1);
					else Effects.push(o$1);
					if (o$1.observers) markDownstream(o$1);
				}
				o$1.state = STALE;
			}
			if (Updates.length > 1e6) {
				Updates = [];
				throw new Error();
			}
		}, false);
	}
	return value;
}
function updateComputation(node) {
	if (!node.fn) return;
	cleanNode(node);
	const time = ExecCount;
	runComputation(node, node.value, time);
}
function runComputation(node, value, time) {
	let nextValue;
	const owner = Owner, listener = Listener;
	Listener = Owner = node;
	try {
		nextValue = node.fn(value);
	} catch (err) {
		if (node.pure) {
			node.state = STALE;
			node.owned && node.owned.forEach(cleanNode);
			node.owned = null;
		}
		node.updatedAt = time + 1;
		return handleError(err);
	} finally {
		Listener = listener;
		Owner = owner;
	}
	if (!node.updatedAt || node.updatedAt <= time) {
		if (node.updatedAt != null && "observers" in node) writeSignal(node, nextValue);
		else node.value = nextValue;
		node.updatedAt = time;
	}
}
function createComputation(fn, init, pure, state = STALE, options) {
	const c$1 = {
		fn,
		state,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: init,
		owner: Owner,
		context: Owner ? Owner.context : null,
		pure
	};
	if (Owner === null);
	else if (Owner !== UNOWNED) if (!Owner.owned) Owner.owned = [c$1];
	else Owner.owned.push(c$1);
	return c$1;
}
function runTop(node) {
	if (node.state === 0) return;
	if (node.state === PENDING) return lookUpstream(node);
	if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
	const ancestors = [node];
	while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) if (node.state) ancestors.push(node);
	for (let i$1 = ancestors.length - 1; i$1 >= 0; i$1--) {
		node = ancestors[i$1];
		if (node.state === STALE) updateComputation(node);
		else if (node.state === PENDING) {
			const updates = Updates;
			Updates = null;
			runUpdates(() => lookUpstream(node, ancestors[0]), false);
			Updates = updates;
		}
	}
}
function runUpdates(fn, init) {
	if (Updates) return fn();
	let wait = false;
	if (!init) Updates = [];
	if (Effects) wait = true;
	else Effects = [];
	ExecCount++;
	try {
		const res = fn();
		completeUpdates(wait);
		return res;
	} catch (err) {
		if (!wait) Effects = null;
		Updates = null;
		handleError(err);
	}
}
function completeUpdates(wait) {
	if (Updates) {
		runQueue(Updates);
		Updates = null;
	}
	if (wait) return;
	const e$1 = Effects;
	Effects = null;
	if (e$1.length) runUpdates(() => runEffects(e$1), false);
}
function runQueue(queue) {
	for (let i$1 = 0; i$1 < queue.length; i$1++) runTop(queue[i$1]);
}
function runUserEffects(queue) {
	let i$1, userLength = 0;
	for (i$1 = 0; i$1 < queue.length; i$1++) {
		const e$1 = queue[i$1];
		if (!e$1.user) runTop(e$1);
		else queue[userLength++] = e$1;
	}
	if (sharedConfig.context) {
		if (sharedConfig.count) {
			sharedConfig.effects || (sharedConfig.effects = []);
			sharedConfig.effects.push(...queue.slice(0, userLength));
			return;
		}
		setHydrateContext();
	}
	if (sharedConfig.effects && (sharedConfig.done || !sharedConfig.count)) {
		queue = [...sharedConfig.effects, ...queue];
		userLength += sharedConfig.effects.length;
		delete sharedConfig.effects;
	}
	for (i$1 = 0; i$1 < userLength; i$1++) runTop(queue[i$1]);
}
function lookUpstream(node, ignore) {
	node.state = 0;
	for (let i$1 = 0; i$1 < node.sources.length; i$1 += 1) {
		const source = node.sources[i$1];
		if (source.sources) {
			const state = source.state;
			if (state === STALE) {
				if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
			} else if (state === PENDING) lookUpstream(source, ignore);
		}
	}
}
function markDownstream(node) {
	for (let i$1 = 0; i$1 < node.observers.length; i$1 += 1) {
		const o$1 = node.observers[i$1];
		if (!o$1.state) {
			o$1.state = PENDING;
			if (o$1.pure) Updates.push(o$1);
			else Effects.push(o$1);
			o$1.observers && markDownstream(o$1);
		}
	}
}
function cleanNode(node) {
	let i$1;
	if (node.sources) while (node.sources.length) {
		const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
		if (obs && obs.length) {
			const n$1 = obs.pop(), s$1 = source.observerSlots.pop();
			if (index < obs.length) {
				n$1.sourceSlots[s$1] = index;
				obs[index] = n$1;
				source.observerSlots[index] = s$1;
			}
		}
	}
	if (node.tOwned) {
		for (i$1 = node.tOwned.length - 1; i$1 >= 0; i$1--) cleanNode(node.tOwned[i$1]);
		delete node.tOwned;
	}
	if (node.owned) {
		for (i$1 = node.owned.length - 1; i$1 >= 0; i$1--) cleanNode(node.owned[i$1]);
		node.owned = null;
	}
	if (node.cleanups) {
		for (i$1 = node.cleanups.length - 1; i$1 >= 0; i$1--) node.cleanups[i$1]();
		node.cleanups = null;
	}
	node.state = 0;
}
function castError(err) {
	if (err instanceof Error) return err;
	return new Error(typeof err === "string" ? err : "Unknown error", { cause: err });
}
function handleError(err, owner = Owner) {
	throw castError(err);
}
function resolveChildren(children2) {
	if (typeof children2 === "function" && !children2.length) return resolveChildren(children2());
	if (Array.isArray(children2)) {
		const results = [];
		for (let i$1 = 0; i$1 < children2.length; i$1++) {
			const result = resolveChildren(children2[i$1]);
			Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
		}
		return results;
	}
	return children2;
}
function createProvider(id, options) {
	return function provider(props) {
		let res;
		createRenderEffect(() => res = untrack(() => {
			Owner.context = {
				...Owner.context,
				[id]: props.value
			};
			return children(() => props.children);
		}), void 0);
		return res;
	};
}
var FALLBACK = Symbol("fallback");
function dispose(d$1) {
	for (let i$1 = 0; i$1 < d$1.length; i$1++) d$1[i$1]();
}
function mapArray(list, mapFn, options = {}) {
	let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
	onCleanup(() => dispose(disposers));
	return () => {
		let newItems = list() || [], newLen = newItems.length, i$1, j;
		newItems[$TRACK];
		return untrack(() => {
			let newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
			if (newLen === 0) {
				if (len !== 0) {
					dispose(disposers);
					disposers = [];
					items = [];
					mapped = [];
					len = 0;
					indexes && (indexes = []);
				}
				if (options.fallback) {
					items = [FALLBACK];
					mapped[0] = createRoot((disposer) => {
						disposers[0] = disposer;
						return options.fallback();
					});
					len = 1;
				}
			} else if (len === 0) {
				mapped = new Array(newLen);
				for (j = 0; j < newLen; j++) {
					items[j] = newItems[j];
					mapped[j] = createRoot(mapper);
				}
				len = newLen;
			} else {
				temp = new Array(newLen);
				tempdisposers = new Array(newLen);
				indexes && (tempIndexes = new Array(newLen));
				for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);
				for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
					temp[newEnd] = mapped[end];
					tempdisposers[newEnd] = disposers[end];
					indexes && (tempIndexes[newEnd] = indexes[end]);
				}
				newIndices = /* @__PURE__ */ new Map();
				newIndicesNext = new Array(newEnd + 1);
				for (j = newEnd; j >= start; j--) {
					item = newItems[j];
					i$1 = newIndices.get(item);
					newIndicesNext[j] = i$1 === void 0 ? -1 : i$1;
					newIndices.set(item, j);
				}
				for (i$1 = start; i$1 <= end; i$1++) {
					item = items[i$1];
					j = newIndices.get(item);
					if (j !== void 0 && j !== -1) {
						temp[j] = mapped[i$1];
						tempdisposers[j] = disposers[i$1];
						indexes && (tempIndexes[j] = indexes[i$1]);
						j = newIndicesNext[j];
						newIndices.set(item, j);
					} else disposers[i$1]();
				}
				for (j = start; j < newLen; j++) if (j in temp) {
					mapped[j] = temp[j];
					disposers[j] = tempdisposers[j];
					if (indexes) {
						indexes[j] = tempIndexes[j];
						indexes[j](j);
					}
				} else mapped[j] = createRoot(mapper);
				mapped = mapped.slice(0, len = newLen);
				items = newItems.slice(0);
			}
			return mapped;
		});
		function mapper(disposer) {
			disposers[j] = disposer;
			if (indexes) {
				const [s$1, set] = createSignal(j);
				indexes[j] = set;
				return mapFn(newItems[j], s$1);
			}
			return mapFn(newItems[j]);
		}
	};
}
function createComponent(Comp, props) {
	return untrack(() => Comp(props || {}));
}
function trueFn() {
	return true;
}
var propTraps = {
	get(_, property, receiver) {
		if (property === $PROXY) return receiver;
		return _.get(property);
	},
	has(_, property) {
		if (property === $PROXY) return true;
		return _.has(property);
	},
	set: trueFn,
	deleteProperty: trueFn,
	getOwnPropertyDescriptor(_, property) {
		return {
			configurable: true,
			enumerable: true,
			get() {
				return _.get(property);
			},
			set: trueFn,
			deleteProperty: trueFn
		};
	},
	ownKeys(_) {
		return _.keys();
	}
};
function resolveSource(s$1) {
	return !(s$1 = typeof s$1 === "function" ? s$1() : s$1) ? {} : s$1;
}
function resolveSources() {
	for (let i$1 = 0, length = this.length; i$1 < length; ++i$1) {
		const v = this[i$1]();
		if (v !== void 0) return v;
	}
}
function mergeProps(...sources) {
	let proxy = false;
	for (let i$1 = 0; i$1 < sources.length; i$1++) {
		const s$1 = sources[i$1];
		proxy = proxy || !!s$1 && $PROXY in s$1;
		sources[i$1] = typeof s$1 === "function" ? (proxy = true, createMemo(s$1)) : s$1;
	}
	if (SUPPORTS_PROXY && proxy) return new Proxy({
		get(property) {
			for (let i$1 = sources.length - 1; i$1 >= 0; i$1--) {
				const v = resolveSource(sources[i$1])[property];
				if (v !== void 0) return v;
			}
		},
		has(property) {
			for (let i$1 = sources.length - 1; i$1 >= 0; i$1--) if (property in resolveSource(sources[i$1])) return true;
			return false;
		},
		keys() {
			const keys = [];
			for (let i$1 = 0; i$1 < sources.length; i$1++) keys.push(...Object.keys(resolveSource(sources[i$1])));
			return [...new Set(keys)];
		}
	}, propTraps);
	const sourcesMap = {};
	const defined = /* @__PURE__ */ Object.create(null);
	for (let i$1 = sources.length - 1; i$1 >= 0; i$1--) {
		const source = sources[i$1];
		if (!source) continue;
		const sourceKeys = Object.getOwnPropertyNames(source);
		for (let i2 = sourceKeys.length - 1; i2 >= 0; i2--) {
			const key = sourceKeys[i2];
			if (key === "__proto__" || key === "constructor") continue;
			const desc = Object.getOwnPropertyDescriptor(source, key);
			if (!defined[key]) defined[key] = desc.get ? {
				enumerable: true,
				configurable: true,
				get: resolveSources.bind(sourcesMap[key] = [desc.get.bind(source)])
			} : desc.value !== void 0 ? desc : void 0;
			else {
				const sources2 = sourcesMap[key];
				if (sources2) {
					if (desc.get) sources2.push(desc.get.bind(source));
					else if (desc.value !== void 0) sources2.push(() => desc.value);
				}
			}
		}
	}
	const target = {};
	const definedKeys = Object.keys(defined);
	for (let i$1 = definedKeys.length - 1; i$1 >= 0; i$1--) {
		const key = definedKeys[i$1], desc = defined[key];
		if (desc && desc.get) Object.defineProperty(target, key, desc);
		else target[key] = desc ? desc.value : void 0;
	}
	return target;
}
function splitProps(props, ...keys) {
	const len = keys.length;
	if (SUPPORTS_PROXY && $PROXY in props) {
		const blocked = len > 1 ? keys.flat() : keys[0];
		const res = keys.map((k) => {
			return new Proxy({
				get(property) {
					return k.includes(property) ? props[property] : void 0;
				},
				has(property) {
					return k.includes(property) && property in props;
				},
				keys() {
					return k.filter((property) => property in props);
				}
			}, propTraps);
		});
		res.push(new Proxy({
			get(property) {
				return blocked.includes(property) ? void 0 : props[property];
			},
			has(property) {
				return blocked.includes(property) ? false : property in props;
			},
			keys() {
				return Object.keys(props).filter((k) => !blocked.includes(k));
			}
		}, propTraps));
		return res;
	}
	const objects = [];
	for (let i$1 = 0; i$1 <= len; i$1++) objects[i$1] = {};
	for (const propName of Object.getOwnPropertyNames(props)) {
		let keyIndex = len;
		for (let i$1 = 0; i$1 < keys.length; i$1++) if (keys[i$1].includes(propName)) {
			keyIndex = i$1;
			break;
		}
		const desc = Object.getOwnPropertyDescriptor(props, propName);
		!desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable ? objects[keyIndex][propName] = desc.value : Object.defineProperty(objects[keyIndex], propName, desc);
	}
	return objects;
}
var counter = 0;
function createUniqueId() {
	return sharedConfig.context ? sharedConfig.getNextContextId() : `cl-${counter++}`;
}
var narrowedError = (name) => `Stale read from <${name}>.`;
function For(props) {
	const fallback = "fallback" in props && { fallback: () => props.fallback };
	return createMemo(mapArray(() => props.each, props.children, fallback || void 0));
}
function Show(props) {
	const keyed = props.keyed;
	const conditionValue = createMemo(() => props.when, void 0, void 0);
	const condition = keyed ? conditionValue : createMemo(conditionValue, void 0, { equals: (a$1, b$1) => !a$1 === !b$1 });
	return createMemo(() => {
		const c$1 = condition();
		if (c$1) {
			const child = props.children;
			return typeof child === "function" && child.length > 0 ? untrack(() => child(keyed ? c$1 : () => {
				if (!untrack(condition)) throw narrowedError("Show");
				return conditionValue();
			})) : child;
		}
		return props.fallback;
	}, void 0, void 0);
}
function Switch(props) {
	const chs = children(() => props.children);
	const switchFunc = createMemo(() => {
		const ch = chs();
		const mps = Array.isArray(ch) ? ch : [ch];
		let func = () => void 0;
		for (let i$1 = 0; i$1 < mps.length; i$1++) {
			const index = i$1;
			const mp = mps[i$1];
			const prevFunc = func;
			const conditionValue = createMemo(() => prevFunc() ? void 0 : mp.when, void 0, void 0);
			const condition = mp.keyed ? conditionValue : createMemo(conditionValue, void 0, { equals: (a$1, b$1) => !a$1 === !b$1 });
			func = () => prevFunc() || (condition() ? [
				index,
				conditionValue,
				mp
			] : void 0);
		}
		return func;
	});
	return createMemo(() => {
		const sel = switchFunc()();
		if (!sel) return props.fallback;
		const [index, conditionValue, mp] = sel;
		const child = mp.children;
		return typeof child === "function" && child.length > 0 ? untrack(() => child(mp.keyed ? conditionValue() : () => {
			if (untrack(switchFunc)()?.[0] !== index) throw narrowedError("Match");
			return conditionValue();
		})) : child;
	}, void 0, void 0);
}
function Match(props) {
	return props;
}
var Properties = /* @__PURE__ */ new Set([
	"className",
	"value",
	"readOnly",
	"noValidate",
	"formNoValidate",
	"isMap",
	"noModule",
	"playsInline",
	"adAuctionHeaders",
	"allowFullscreen",
	"browsingTopics",
	"defaultChecked",
	"defaultMuted",
	"defaultSelected",
	"disablePictureInPicture",
	"disableRemotePlayback",
	"preservesPitch",
	"shadowRootClonable",
	"shadowRootCustomElementRegistry",
	"shadowRootDelegatesFocus",
	"shadowRootSerializable",
	"sharedStorageWritable",
	...[
		"allowfullscreen",
		"async",
		"alpha",
		"autofocus",
		"autoplay",
		"checked",
		"controls",
		"default",
		"disabled",
		"formnovalidate",
		"hidden",
		"indeterminate",
		"inert",
		"ismap",
		"loop",
		"multiple",
		"muted",
		"nomodule",
		"novalidate",
		"open",
		"playsinline",
		"readonly",
		"required",
		"reversed",
		"seamless",
		"selected",
		"adauctionheaders",
		"browsingtopics",
		"credentialless",
		"defaultchecked",
		"defaultmuted",
		"defaultselected",
		"defer",
		"disablepictureinpicture",
		"disableremoteplayback",
		"preservespitch",
		"shadowrootclonable",
		"shadowrootcustomelementregistry",
		"shadowrootdelegatesfocus",
		"shadowrootserializable",
		"sharedstoragewritable"
	]
]);
var ChildProperties = /* @__PURE__ */ new Set([
	"innerHTML",
	"textContent",
	"innerText",
	"children"
]);
var Aliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
	className: "class",
	htmlFor: "for"
});
var PropAliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
	class: "className",
	novalidate: {
		$: "noValidate",
		FORM: 1
	},
	formnovalidate: {
		$: "formNoValidate",
		BUTTON: 1,
		INPUT: 1
	},
	ismap: {
		$: "isMap",
		IMG: 1
	},
	nomodule: {
		$: "noModule",
		SCRIPT: 1
	},
	playsinline: {
		$: "playsInline",
		VIDEO: 1
	},
	readonly: {
		$: "readOnly",
		INPUT: 1,
		TEXTAREA: 1
	},
	adauctionheaders: {
		$: "adAuctionHeaders",
		IFRAME: 1
	},
	allowfullscreen: {
		$: "allowFullscreen",
		IFRAME: 1
	},
	browsingtopics: {
		$: "browsingTopics",
		IMG: 1
	},
	defaultchecked: {
		$: "defaultChecked",
		INPUT: 1
	},
	defaultmuted: {
		$: "defaultMuted",
		AUDIO: 1,
		VIDEO: 1
	},
	defaultselected: {
		$: "defaultSelected",
		OPTION: 1
	},
	disablepictureinpicture: {
		$: "disablePictureInPicture",
		VIDEO: 1
	},
	disableremoteplayback: {
		$: "disableRemotePlayback",
		AUDIO: 1,
		VIDEO: 1
	},
	preservespitch: {
		$: "preservesPitch",
		AUDIO: 1,
		VIDEO: 1
	},
	shadowrootclonable: {
		$: "shadowRootClonable",
		TEMPLATE: 1
	},
	shadowrootdelegatesfocus: {
		$: "shadowRootDelegatesFocus",
		TEMPLATE: 1
	},
	shadowrootserializable: {
		$: "shadowRootSerializable",
		TEMPLATE: 1
	},
	sharedstoragewritable: {
		$: "sharedStorageWritable",
		IFRAME: 1,
		IMG: 1
	}
});
function getPropAlias(prop, tagName) {
	const a$1 = PropAliases[prop];
	return typeof a$1 === "object" ? a$1[tagName] ? a$1["$"] : void 0 : a$1;
}
var DelegatedEvents = /* @__PURE__ */ new Set([
	"beforeinput",
	"click",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
]);
var SVGElements = /* @__PURE__ */ new Set([
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animate",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"circle",
	"clipPath",
	"color-profile",
	"cursor",
	"defs",
	"desc",
	"ellipse",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"filter",
	"font",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignObject",
	"g",
	"glyph",
	"glyphRef",
	"hkern",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"metadata",
	"missing-glyph",
	"mpath",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"set",
	"stop",
	"svg",
	"switch",
	"symbol",
	"text",
	"textPath",
	"tref",
	"tspan",
	"use",
	"view",
	"vkern"
]);
var SVGNamespace = {
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace"
};
var memo = (fn) => createMemo(() => fn());
function reconcileArrays(parentNode, a$1, b$1) {
	let bLength = b$1.length, aEnd = a$1.length, bEnd = bLength, aStart = 0, bStart = 0, after = a$1[aEnd - 1].nextSibling, map = null;
	while (aStart < aEnd || bStart < bEnd) {
		if (a$1[aStart] === b$1[bStart]) {
			aStart++;
			bStart++;
			continue;
		}
		while (a$1[aEnd - 1] === b$1[bEnd - 1]) {
			aEnd--;
			bEnd--;
		}
		if (aEnd === aStart) {
			const node = bEnd < bLength ? bStart ? b$1[bStart - 1].nextSibling : b$1[bEnd - bStart] : after;
			while (bStart < bEnd) parentNode.insertBefore(b$1[bStart++], node);
		} else if (bEnd === bStart) while (aStart < aEnd) {
			if (!map || !map.has(a$1[aStart])) a$1[aStart].remove();
			aStart++;
		}
		else if (a$1[aStart] === b$1[bEnd - 1] && b$1[bStart] === a$1[aEnd - 1]) {
			const node = a$1[--aEnd].nextSibling;
			parentNode.insertBefore(b$1[bStart++], a$1[aStart++].nextSibling);
			parentNode.insertBefore(b$1[--bEnd], node);
			a$1[aEnd] = b$1[bEnd];
		} else {
			if (!map) {
				map = /* @__PURE__ */ new Map();
				let i$1 = bStart;
				while (i$1 < bEnd) map.set(b$1[i$1], i$1++);
			}
			const index = map.get(a$1[aStart]);
			if (index != null) if (bStart < index && index < bEnd) {
				let i$1 = aStart, sequence = 1, t$1;
				while (++i$1 < aEnd && i$1 < bEnd) {
					if ((t$1 = map.get(a$1[i$1])) == null || t$1 !== index + sequence) break;
					sequence++;
				}
				if (sequence > index - bStart) {
					const node = a$1[aStart];
					while (bStart < index) parentNode.insertBefore(b$1[bStart++], node);
				} else parentNode.replaceChild(b$1[bStart++], a$1[aStart++]);
			} else aStart++;
			else a$1[aStart++].remove();
		}
	}
}
var $$EVENTS = "_$DX_DELEGATE";
function template(html, isImportNode, isSVG, isMathML) {
	let node;
	const create = () => {
		const t$1 = document.createElement("template");
		t$1.innerHTML = html;
		return t$1.content.firstChild;
	};
	const fn = isImportNode ? () => untrack(() => document.importNode(node || (node = create()), true)) : () => (node || (node = create())).cloneNode(true);
	fn.cloneNode = fn;
	return fn;
}
function delegateEvents(eventNames, document2 = window.document) {
	const e$1 = document2[$$EVENTS] || (document2[$$EVENTS] = /* @__PURE__ */ new Set());
	for (let i$1 = 0, l$1 = eventNames.length; i$1 < l$1; i$1++) {
		const name = eventNames[i$1];
		if (!e$1.has(name)) {
			e$1.add(name);
			document2.addEventListener(name, eventHandler);
		}
	}
}
function setAttribute(node, name, value) {
	if (isHydrating(node)) return;
	if (value == null) node.removeAttribute(name);
	else node.setAttribute(name, value);
}
function setAttributeNS(node, namespace, name, value) {
	if (isHydrating(node)) return;
	if (value == null) node.removeAttributeNS(namespace, name);
	else node.setAttributeNS(namespace, name, value);
}
function setBoolAttribute(node, name, value) {
	if (isHydrating(node)) return;
	value ? node.setAttribute(name, "") : node.removeAttribute(name);
}
function className(node, value) {
	if (isHydrating(node)) return;
	if (value == null) node.removeAttribute("class");
	else node.className = value;
}
function addEventListener(node, name, handler, delegate) {
	if (delegate) if (Array.isArray(handler)) {
		node[`$$${name}`] = handler[0];
		node[`$$${name}Data`] = handler[1];
	} else node[`$$${name}`] = handler;
	else if (Array.isArray(handler)) {
		const handlerFn = handler[0];
		node.addEventListener(name, handler[0] = (e$1) => handlerFn.call(node, handler[1], e$1));
	} else node.addEventListener(name, handler, typeof handler !== "function" && handler);
}
function classList(node, value, prev = {}) {
	const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
	let i$1, len;
	for (i$1 = 0, len = prevKeys.length; i$1 < len; i$1++) {
		const key = prevKeys[i$1];
		if (!key || key === "undefined" || value[key]) continue;
		toggleClassKey(node, key, false);
		delete prev[key];
	}
	for (i$1 = 0, len = classKeys.length; i$1 < len; i$1++) {
		const key = classKeys[i$1], classValue = !!value[key];
		if (!key || key === "undefined" || prev[key] === classValue || !classValue) continue;
		toggleClassKey(node, key, true);
		prev[key] = classValue;
	}
	return prev;
}
function style(node, value, prev) {
	if (!value) return prev ? setAttribute(node, "style") : value;
	const nodeStyle = node.style;
	if (typeof value === "string") return nodeStyle.cssText = value;
	typeof prev === "string" && (nodeStyle.cssText = prev = void 0);
	prev || (prev = {});
	value || (value = {});
	let v, s$1;
	for (s$1 in prev) {
		value[s$1] ?? nodeStyle.removeProperty(s$1);
		delete prev[s$1];
	}
	for (s$1 in value) {
		v = value[s$1];
		if (v !== prev[s$1]) {
			nodeStyle.setProperty(s$1, v);
			prev[s$1] = v;
		}
	}
	return prev;
}
function spread(node, props = {}, isSVG, skipChildren) {
	const prevProps = {};
	if (!skipChildren) createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
	createRenderEffect(() => typeof props.ref === "function" && use(props.ref, node));
	createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
	return prevProps;
}
function use(fn, element, arg) {
	return untrack(() => fn(element, arg));
}
function insert(parent, accessor, marker, initial) {
	if (marker !== void 0 && !initial) initial = [];
	if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
	createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
}
function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
	props || (props = {});
	for (const prop in prevProps) if (!(prop in props)) {
		if (prop === "children") continue;
		prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef, props);
	}
	for (const prop in props) {
		if (prop === "children") continue;
		const value = props[prop];
		prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef, props);
	}
}
function getNextElement(template2) {
	let node, key;
	if (!isHydrating() || !(node = sharedConfig.registry.get(key = getHydrationKey()))) return template2();
	if (sharedConfig.completed) sharedConfig.completed.add(node);
	sharedConfig.registry.delete(key);
	return node;
}
function isHydrating(node) {
	return !!sharedConfig.context && !sharedConfig.done && (!node || node.isConnected);
}
function toPropertyName(name) {
	return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
}
function toggleClassKey(node, key, value) {
	const classNames = key.trim().split(/\s+/);
	for (let i$1 = 0, nameLen = classNames.length; i$1 < nameLen; i$1++) node.classList.toggle(classNames[i$1], value);
}
function assignProp(node, prop, value, prev, isSVG, skipRef, props) {
	let isCE, isProp, isChildProp, propAlias, forceProp;
	if (prop === "style") return style(node, value, prev);
	if (prop === "classList") return classList(node, value, prev);
	if (value === prev) return prev;
	if (prop === "ref") {
		if (!skipRef) value(node);
	} else if (prop.slice(0, 3) === "on:") {
		const e$1 = prop.slice(3);
		prev && node.removeEventListener(e$1, prev, typeof prev !== "function" && prev);
		value && node.addEventListener(e$1, value, typeof value !== "function" && value);
	} else if (prop.slice(0, 10) === "oncapture:") {
		const e$1 = prop.slice(10);
		prev && node.removeEventListener(e$1, prev, true);
		value && node.addEventListener(e$1, value, true);
	} else if (prop.slice(0, 2) === "on") {
		const name = prop.slice(2).toLowerCase();
		const delegate = DelegatedEvents.has(name);
		if (!delegate && prev) {
			const h$1 = Array.isArray(prev) ? prev[0] : prev;
			node.removeEventListener(name, h$1);
		}
		if (delegate || value) {
			addEventListener(node, name, value, delegate);
			delegate && delegateEvents([name]);
		}
	} else if (prop.slice(0, 5) === "attr:") setAttribute(node, prop.slice(5), value);
	else if (prop.slice(0, 5) === "bool:") setBoolAttribute(node, prop.slice(5), value);
	else if ((forceProp = prop.slice(0, 5) === "prop:") || (isChildProp = ChildProperties.has(prop)) || !isSVG && ((propAlias = getPropAlias(prop, node.tagName)) || (isProp = Properties.has(prop))) || (isCE = node.nodeName.includes("-") || "is" in props)) {
		if (forceProp) {
			prop = prop.slice(5);
			isProp = true;
		} else if (isHydrating(node)) return value;
		if (prop === "class" || prop === "className") className(node, value);
		else if (isCE && !isProp && !isChildProp) node[toPropertyName(prop)] = value;
		else node[propAlias || prop] = value;
	} else {
		const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
		if (ns) setAttributeNS(node, ns, prop, value);
		else setAttribute(node, Aliases[prop] || prop, value);
	}
	return value;
}
function eventHandler(e$1) {
	if (sharedConfig.registry && sharedConfig.events) {
		if (sharedConfig.events.find(([el, ev]) => ev === e$1)) return;
	}
	let node = e$1.target;
	const key = `$$${e$1.type}`;
	const oriTarget = e$1.target;
	const oriCurrentTarget = e$1.currentTarget;
	const retarget = (value) => Object.defineProperty(e$1, "target", {
		configurable: true,
		value
	});
	const handleNode = () => {
		const handler = node[key];
		if (handler && !node.disabled) {
			const data = node[`${key}Data`];
			data !== void 0 ? handler.call(node, data, e$1) : handler.call(node, e$1);
			if (e$1.cancelBubble) return;
		}
		node.host && typeof node.host !== "string" && !node.host._$host && node.contains(e$1.target) && retarget(node.host);
		return true;
	};
	const walkUpTree = () => {
		while (handleNode() && (node = node._$host || node.parentNode || node.host));
	};
	Object.defineProperty(e$1, "currentTarget", {
		configurable: true,
		get() {
			return node || document;
		}
	});
	if (sharedConfig.registry && !sharedConfig.done) sharedConfig.done = _$HY.done = true;
	if (e$1.composedPath) {
		const path = e$1.composedPath();
		retarget(path[0]);
		for (let i$1 = 0; i$1 < path.length - 2; i$1++) {
			node = path[i$1];
			if (!handleNode()) break;
			if (node._$host) {
				node = node._$host;
				walkUpTree();
				break;
			}
			if (node.parentNode === oriCurrentTarget) break;
		}
	} else walkUpTree();
	retarget(oriTarget);
}
function insertExpression(parent, value, current, marker, unwrapArray) {
	const hydrating = isHydrating(parent);
	if (hydrating) {
		!current && (current = [...parent.childNodes]);
		let cleaned = [];
		for (let i$1 = 0; i$1 < current.length; i$1++) {
			const node = current[i$1];
			if (node.nodeType === 8 && node.data.slice(0, 2) === "!$") node.remove();
			else cleaned.push(node);
		}
		current = cleaned;
	}
	while (typeof current === "function") current = current();
	if (value === current) return current;
	const t$1 = typeof value, multi = marker !== void 0;
	parent = multi && current[0] && current[0].parentNode || parent;
	if (t$1 === "string" || t$1 === "number") {
		if (hydrating) return current;
		if (t$1 === "number") {
			value = value.toString();
			if (value === current) return current;
		}
		if (multi) {
			let node = current[0];
			if (node && node.nodeType === 3) node.data !== value && (node.data = value);
			else node = document.createTextNode(value);
			current = cleanChildren(parent, current, marker, node);
		} else if (current !== "" && typeof current === "string") current = parent.firstChild.data = value;
		else current = parent.textContent = value;
	} else if (value == null || t$1 === "boolean") {
		if (hydrating) return current;
		current = cleanChildren(parent, current, marker);
	} else if (t$1 === "function") {
		createRenderEffect(() => {
			let v = value();
			while (typeof v === "function") v = v();
			current = insertExpression(parent, v, current, marker);
		});
		return () => current;
	} else if (Array.isArray(value)) {
		const array = [];
		const currentArray = current && Array.isArray(current);
		if (normalizeIncomingArray(array, value, current, unwrapArray)) {
			createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
			return () => current;
		}
		if (hydrating) {
			if (!array.length) return current;
			if (marker === void 0) return current = [...parent.childNodes];
			let node = array[0];
			if (node.parentNode !== parent) return current;
			const nodes = [node];
			while ((node = node.nextSibling) !== marker) nodes.push(node);
			return current = nodes;
		}
		if (array.length === 0) {
			current = cleanChildren(parent, current, marker);
			if (multi) return current;
		} else if (currentArray) if (current.length === 0) appendNodes(parent, array, marker);
		else reconcileArrays(parent, current, array);
		else {
			current && cleanChildren(parent);
			appendNodes(parent, array);
		}
		current = array;
	} else if (value.nodeType) {
		if (hydrating && value.parentNode) return current = multi ? [value] : value;
		if (Array.isArray(current)) {
			if (multi) return current = cleanChildren(parent, current, marker, value);
			cleanChildren(parent, current, null, value);
		} else if (current == null || current === "" || !parent.firstChild) parent.appendChild(value);
		else parent.replaceChild(value, parent.firstChild);
		current = value;
	}
	return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap) {
	let dynamic = false;
	for (let i$1 = 0, len = array.length; i$1 < len; i$1++) {
		let item = array[i$1], prev = current && current[normalized.length], t$1;
		if (item == null || item === true || item === false);
		else if ((t$1 = typeof item) === "object" && item.nodeType) normalized.push(item);
		else if (Array.isArray(item)) dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
		else if (t$1 === "function") if (unwrap) {
			while (typeof item === "function") item = item();
			dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
		} else {
			normalized.push(item);
			dynamic = true;
		}
		else {
			const value = String(item);
			if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);
			else normalized.push(document.createTextNode(value));
		}
	}
	return dynamic;
}
function appendNodes(parent, array, marker = null) {
	for (let i$1 = 0, len = array.length; i$1 < len; i$1++) parent.insertBefore(array[i$1], marker);
}
function cleanChildren(parent, current, marker, replacement) {
	if (marker === void 0) return parent.textContent = "";
	const node = replacement || document.createTextNode("");
	if (current.length) {
		let inserted = false;
		for (let i$1 = current.length - 1; i$1 >= 0; i$1--) {
			const el = current[i$1];
			if (node !== el) {
				const isParent = el.parentNode === parent;
				if (!inserted && !i$1) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
				else isParent && el.remove();
			} else inserted = true;
		}
	} else parent.insertBefore(node, marker);
	return [node];
}
function getHydrationKey() {
	return sharedConfig.getNextContextId();
}
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
function createElement(tagName, isSVG = false, is = void 0) {
	return isSVG ? document.createElementNS(SVG_NAMESPACE, tagName) : document.createElement(tagName, { is });
}
function createDynamic(component, props) {
	const cached = createMemo(component);
	return createMemo(() => {
		const component2 = cached();
		switch (typeof component2) {
			case "function": return untrack(() => component2(props));
			case "string":
				const isSvg = SVGElements.has(component2);
				const el = sharedConfig.context ? getNextElement() : createElement(component2, isSvg, untrack(() => props.is));
				spread(el, props, isSvg);
				return el;
		}
	});
}
function Dynamic(props) {
	const [, others] = splitProps(props, ["component"]);
	return createDynamic(() => props.component, others);
}
var ShadowDomTargetContext = createContext(void 0);
var DevtoolsOnCloseContext = createContext(void 0);
var useDevtoolsOnClose = () => {
	const context = useContext(DevtoolsOnCloseContext);
	if (!context) throw new Error("useDevtoolsOnClose must be used within a TanStackRouterDevtools component");
	return context;
}, e = { data: "" }, t = (t$1) => {
	if ("object" == typeof window) {
		let e$1 = (t$1 ? t$1.querySelector("#_goober") : window._goober) || Object.assign(document.createElement("style"), {
			innerHTML: " ",
			id: "_goober"
		});
		return e$1.nonce = window.__nonce__, e$1.parentNode || (t$1 || document.head).appendChild(e$1), e$1.firstChild;
	}
	return t$1 || e;
}, l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a = /\/\*[^]*?\*\/|  +/g, n = /\n+/g, o = (e$1, t$1) => {
	let r$1 = "", l$1 = "", a$1 = "";
	for (let n$1 in e$1) {
		let c$1 = e$1[n$1];
		"@" == n$1[0] ? "i" == n$1[1] ? r$1 = n$1 + " " + c$1 + ";" : l$1 += "f" == n$1[1] ? o(c$1, n$1) : n$1 + "{" + o(c$1, "k" == n$1[1] ? "" : t$1) + "}" : "object" == typeof c$1 ? l$1 += o(c$1, t$1 ? t$1.replace(/([^,])+/g, (e$2) => n$1.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t$2) => /&/.test(t$2) ? t$2.replace(/&/g, e$2) : e$2 ? e$2 + " " + t$2 : t$2)) : n$1) : null != c$1 && (n$1 = /^--/.test(n$1) ? n$1 : n$1.replace(/[A-Z]/g, "-$&").toLowerCase(), a$1 += o.p ? o.p(n$1, c$1) : n$1 + ":" + c$1 + ";");
	}
	return r$1 + (t$1 && a$1 ? t$1 + "{" + a$1 + "}" : a$1) + l$1;
}, c = {}, s = (e$1) => {
	if ("object" == typeof e$1) {
		let t$1 = "";
		for (let r$1 in e$1) t$1 += r$1 + s(e$1[r$1]);
		return t$1;
	}
	return e$1;
}, i = (e$1, t$1, r$1, i$1, p$1) => {
	let u$1 = s(e$1), d$1 = c[u$1] || (c[u$1] = ((e$2) => {
		let t$2 = 0, r$2 = 11;
		for (; t$2 < e$2.length;) r$2 = 101 * r$2 + e$2.charCodeAt(t$2++) >>> 0;
		return "go" + r$2;
	})(u$1));
	if (!c[d$1]) {
		let t$2 = u$1 !== e$1 ? e$1 : ((e$2) => {
			let t$3, r$2, o$1 = [{}];
			for (; t$3 = l.exec(e$2.replace(a, ""));) t$3[4] ? o$1.shift() : t$3[3] ? (r$2 = t$3[3].replace(n, " ").trim(), o$1.unshift(o$1[0][r$2] = o$1[0][r$2] || {})) : o$1[0][t$3[1]] = t$3[2].replace(n, " ").trim();
			return o$1[0];
		})(e$1);
		c[d$1] = o(p$1 ? { ["@keyframes " + d$1]: t$2 } : t$2, r$1 ? "" : "." + d$1);
	}
	let f$1 = r$1 && c.g ? c.g : null;
	return r$1 && (c.g = c[d$1]), ((e$2, t$2, r$2, l$1) => {
		l$1 ? t$2.data = t$2.data.replace(l$1, e$2) : -1 === t$2.data.indexOf(e$2) && (t$2.data = r$2 ? e$2 + t$2.data : t$2.data + e$2);
	})(c[d$1], t$1, i$1, f$1), d$1;
}, p = (e$1, t$1, r$1) => e$1.reduce((e$2, l$1, a$1) => {
	let n$1 = t$1[a$1];
	if (n$1 && n$1.call) {
		let e$3 = n$1(r$1), t$2 = e$3 && e$3.props && e$3.props.className || /^go/.test(e$3) && e$3;
		n$1 = t$2 ? "." + t$2 : e$3 && "object" == typeof e$3 ? e$3.props ? "" : o(e$3, "") : !1 === e$3 ? "" : e$3;
	}
	return e$2 + l$1 + (null == n$1 ? "" : n$1);
}, "");
function u(e$1) {
	let r$1 = this || {}, l$1 = e$1.call ? e$1(r$1.p) : e$1;
	return i(l$1.unshift ? l$1.raw ? p(l$1, [].slice.call(arguments, 1), r$1.p) : l$1.reduce((e$2, t$1) => Object.assign(e$2, t$1 && t$1.call ? t$1(r$1.p) : t$1), {}) : l$1, t(r$1.target), r$1.g, r$1.o, r$1.k);
}
u.bind({ g: 1 });
u.bind({ k: 1 });
var isServer = typeof window === "undefined";
function getStatusColor(match) {
	return match.isFetching && match.status === "success" ? match.isFetching === "beforeLoad" ? "purple" : "blue" : {
		pending: "yellow",
		success: "green",
		error: "red",
		notFound: "purple",
		redirected: "gray"
	}[match.status];
}
function getRouteStatusColor(matches, route) {
	const found = matches.find((d$1) => d$1.routeId === route.id);
	if (!found) return "gray";
	return getStatusColor(found);
}
function useIsMounted() {
	const [isMounted, setIsMounted] = createSignal(false);
	(isServer ? createEffect : createRenderEffect)(() => {
		setIsMounted(true);
	});
	return isMounted;
}
var displayValue = (value) => {
	const name = Object.getOwnPropertyNames(Object(value));
	const newValue = typeof value === "bigint" ? `${value.toString()}n` : value;
	try {
		return JSON.stringify(newValue, name);
	} catch (e$1) {
		return `unable to stringify`;
	}
};
function multiSortBy(arr, accessors = [(d$1) => d$1]) {
	return arr.map((d$1, i$1) => [d$1, i$1]).sort(([a$1, ai], [b$1, bi]) => {
		for (const accessor of accessors) {
			const ao = accessor(a$1);
			const bo = accessor(b$1);
			if (typeof ao === "undefined") {
				if (typeof bo === "undefined") continue;
				return 1;
			}
			if (ao === bo) continue;
			return ao > bo ? 1 : -1;
		}
		return ai - bi;
	}).map(([d$1]) => d$1);
}
var tokens = {
	colors: {
		inherit: "inherit",
		current: "currentColor",
		transparent: "transparent",
		black: "#000000",
		white: "#ffffff",
		neutral: {
			50: "#f9fafb",
			100: "#f2f4f7",
			200: "#eaecf0",
			300: "#d0d5dd",
			400: "#98a2b3",
			500: "#667085",
			600: "#475467",
			700: "#344054",
			800: "#1d2939",
			900: "#101828"
		},
		darkGray: {
			50: "#525c7a",
			100: "#49536e",
			200: "#414962",
			300: "#394056",
			400: "#313749",
			500: "#292e3d",
			600: "#212530",
			700: "#191c24",
			800: "#111318",
			900: "#0b0d10"
		},
		gray: {
			50: "#f9fafb",
			100: "#f2f4f7",
			200: "#eaecf0",
			300: "#d0d5dd",
			400: "#98a2b3",
			500: "#667085",
			600: "#475467",
			700: "#344054",
			800: "#1d2939",
			900: "#101828"
		},
		blue: {
			25: "#F5FAFF",
			50: "#EFF8FF",
			100: "#D1E9FF",
			200: "#B2DDFF",
			300: "#84CAFF",
			400: "#53B1FD",
			500: "#2E90FA",
			600: "#1570EF",
			700: "#175CD3",
			800: "#1849A9",
			900: "#194185"
		},
		green: {
			25: "#F6FEF9",
			50: "#ECFDF3",
			100: "#D1FADF",
			200: "#A6F4C5",
			300: "#6CE9A6",
			400: "#32D583",
			500: "#12B76A",
			600: "#039855",
			700: "#027A48",
			800: "#05603A",
			900: "#054F31"
		},
		red: {
			50: "#fef2f2",
			100: "#fee2e2",
			200: "#fecaca",
			300: "#fca5a5",
			400: "#f87171",
			500: "#ef4444",
			600: "#dc2626",
			700: "#b91c1c",
			800: "#991b1b",
			900: "#7f1d1d",
			950: "#450a0a"
		},
		yellow: {
			25: "#FFFCF5",
			50: "#FFFAEB",
			100: "#FEF0C7",
			200: "#FEDF89",
			300: "#FEC84B",
			400: "#FDB022",
			500: "#F79009",
			600: "#DC6803",
			700: "#B54708",
			800: "#93370D",
			900: "#7A2E0E"
		},
		purple: {
			25: "#FAFAFF",
			50: "#F4F3FF",
			100: "#EBE9FE",
			200: "#D9D6FE",
			300: "#BDB4FE",
			400: "#9B8AFB",
			500: "#7A5AF8",
			600: "#6938EF",
			700: "#5925DC",
			800: "#4A1FB8",
			900: "#3E1C96"
		},
		teal: {
			25: "#F6FEFC",
			50: "#F0FDF9",
			100: "#CCFBEF",
			200: "#99F6E0",
			300: "#5FE9D0",
			400: "#2ED3B7",
			500: "#15B79E",
			600: "#0E9384",
			700: "#107569",
			800: "#125D56",
			900: "#134E48"
		},
		pink: {
			25: "#fdf2f8",
			50: "#fce7f3",
			100: "#fbcfe8",
			200: "#f9a8d4",
			300: "#f472b6",
			400: "#ec4899",
			500: "#db2777",
			600: "#be185d",
			700: "#9d174d",
			800: "#831843",
			900: "#500724"
		},
		cyan: {
			25: "#ecfeff",
			50: "#cffafe",
			100: "#a5f3fc",
			200: "#67e8f9",
			300: "#22d3ee",
			400: "#06b6d4",
			500: "#0891b2",
			600: "#0e7490",
			700: "#155e75",
			800: "#164e63",
			900: "#083344"
		}
	},
	alpha: {
		90: "e5",
		70: "b3",
		20: "33"
	},
	font: {
		size: {
			"2xs": "calc(var(--tsrd-font-size) * 0.625)",
			xs: "calc(var(--tsrd-font-size) * 0.75)",
			sm: "calc(var(--tsrd-font-size) * 0.875)",
			md: "var(--tsrd-font-size)"
		},
		lineHeight: {
			xs: "calc(var(--tsrd-font-size) * 1)",
			sm: "calc(var(--tsrd-font-size) * 1.25)"
		},
		weight: {
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700"
		},
		fontFamily: {
			sans: "ui-sans-serif, Inter, system-ui, sans-serif, sans-serif",
			mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`
		}
	},
	border: { radius: {
		xs: "calc(var(--tsrd-font-size) * 0.125)",
		sm: "calc(var(--tsrd-font-size) * 0.25)",
		md: "calc(var(--tsrd-font-size) * 0.375)",
		full: "9999px"
	} },
	size: {
		0: "0px",
		.5: "calc(var(--tsrd-font-size) * 0.125)",
		1: "calc(var(--tsrd-font-size) * 0.25)",
		1.5: "calc(var(--tsrd-font-size) * 0.375)",
		2: "calc(var(--tsrd-font-size) * 0.5)",
		2.5: "calc(var(--tsrd-font-size) * 0.625)",
		3: "calc(var(--tsrd-font-size) * 0.75)",
		3.5: "calc(var(--tsrd-font-size) * 0.875)",
		4: "calc(var(--tsrd-font-size) * 1)",
		5: "calc(var(--tsrd-font-size) * 1.25)",
		8: "calc(var(--tsrd-font-size) * 2)"
	}
};
var stylesFactory$1 = (shadowDOMTarget) => {
	const { colors, font, size, alpha, border } = tokens;
	const { fontFamily, lineHeight, size: fontSize } = font;
	const css = shadowDOMTarget ? u.bind({ target: shadowDOMTarget }) : u;
	return {
		devtoolsPanelContainer: css`
      direction: ltr;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 99999;
      width: 100%;
      max-height: 90%;
      border-top: 1px solid ${colors.gray[700]};
      transform-origin: top;
    `,
		devtoolsPanelContainerVisibility: (isOpen) => {
			return css`
        visibility: ${isOpen ? "visible" : "hidden"};
      `;
		},
		devtoolsPanelContainerResizing: (isResizing) => {
			if (isResizing()) return css`
          transition: none;
        `;
			return css`
        transition: all 0.4s ease;
      `;
		},
		devtoolsPanelContainerAnimation: (isOpen, height) => {
			if (isOpen) return css`
          pointer-events: auto;
          transform: translateY(0);
        `;
			return css`
        pointer-events: none;
        transform: translateY(${height}px);
      `;
		},
		logo: css`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      font-family: ${fontFamily.sans};
      gap: ${tokens.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
		tanstackLogo: css`
      font-size: ${font.size.md};
      font-weight: ${font.weight.bold};
      line-height: ${font.lineHeight.xs};
      white-space: nowrap;
      color: ${colors.gray[300]};
    `,
		routerLogo: css`
      font-weight: ${font.weight.semibold};
      font-size: ${font.size.xs};
      background: linear-gradient(to right, #84cc16, #10b981);
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,
		devtoolsPanel: css`
      display: flex;
      font-size: ${fontSize.sm};
      font-family: ${fontFamily.sans};
      background-color: ${colors.darkGray[700]};
      color: ${colors.gray[300]};

      @media (max-width: 700px) {
        flex-direction: column;
      }
      @media (max-width: 600px) {
        font-size: ${fontSize.xs};
      }
    `,
		dragHandle: css`
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      cursor: row-resize;
      z-index: 100000;
      &:hover {
        background-color: ${colors.purple[400]}${alpha[90]};
      }
    `,
		firstContainer: css`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      border-right: 1px solid ${colors.gray[700]};
      display: flex;
      flex-direction: column;
    `,
		routerExplorerContainer: css`
      overflow-y: auto;
      flex: 1;
    `,
		routerExplorer: css`
      padding: ${tokens.size[2]};
    `,
		row: css`
      display: flex;
      align-items: center;
      padding: ${tokens.size[2]} ${tokens.size[2.5]};
      gap: ${tokens.size[2.5]};
      border-bottom: ${colors.darkGray[500]} 1px solid;
      align-items: center;
    `,
		detailsHeader: css`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${colors.darkGray[600]};
      padding: 0px ${tokens.size[2]};
      font-weight: ${font.weight.medium};
      font-size: ${font.size.xs};
      min-height: ${tokens.size[8]};
      line-height: ${font.lineHeight.xs};
      text-align: left;
      display: flex;
      align-items: center;
    `,
		maskedBadge: css`
      background: ${colors.yellow[900]}${alpha[70]};
      color: ${colors.yellow[300]};
      display: inline-block;
      padding: ${tokens.size[0]} ${tokens.size[2.5]};
      border-radius: ${border.radius.full};
      font-size: ${font.size.xs};
      font-weight: ${font.weight.normal};
      border: 1px solid ${colors.yellow[300]};
    `,
		maskedLocation: css`
      color: ${colors.yellow[300]};
    `,
		detailsContent: css`
      padding: ${tokens.size[1.5]} ${tokens.size[2]};
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${font.size.xs};
    `,
		routeMatchesToggle: css`
      display: flex;
      align-items: center;
      border: 1px solid ${colors.gray[500]};
      border-radius: ${border.radius.sm};
      overflow: hidden;
    `,
		routeMatchesToggleBtn: (active, showBorder) => {
			const classes = [css`
        appearance: none;
        border: none;
        font-size: 12px;
        padding: 4px 8px;
        background: transparent;
        cursor: pointer;
        font-family: ${fontFamily.sans};
        font-weight: ${font.weight.medium};
      `];
			if (active) {
				const activeStyles = css`
          background: ${colors.darkGray[400]};
          color: ${colors.gray[300]};
        `;
				classes.push(activeStyles);
			} else {
				const inactiveStyles = css`
          color: ${colors.gray[500]};
          background: ${colors.darkGray[800]}${alpha[20]};
        `;
				classes.push(inactiveStyles);
			}
			if (showBorder) classes.push(css`
          border-right: 1px solid ${tokens.colors.gray[500]};
        `);
			return classes;
		},
		detailsHeaderInfo: css`
      flex: 1;
      justify-content: flex-end;
      display: flex;
      align-items: center;
      font-weight: ${font.weight.normal};
      color: ${colors.gray[400]};
    `,
		matchRow: (active) => {
			const classes = [css`
        display: flex;
        border-bottom: 1px solid ${colors.darkGray[400]};
        cursor: pointer;
        align-items: center;
        padding: ${size[1]} ${size[2]};
        gap: ${size[2]};
        font-size: ${fontSize.xs};
        color: ${colors.gray[300]};
      `];
			if (active) {
				const activeStyles = css`
          background: ${colors.darkGray[500]};
        `;
				classes.push(activeStyles);
			}
			return classes;
		},
		matchIndicator: (color) => {
			const classes = [css`
        flex: 0 0 auto;
        width: ${size[3]};
        height: ${size[3]};
        background: ${colors[color][900]};
        border: 1px solid ${colors[color][500]};
        border-radius: ${border.radius.full};
        transition: all 0.25s ease-out;
        box-sizing: border-box;
      `];
			if (color === "gray") {
				const grayStyles = css`
          background: ${colors.gray[700]};
          border-color: ${colors.gray[400]};
        `;
				classes.push(grayStyles);
			}
			return classes;
		},
		matchID: css`
      flex: 1;
      line-height: ${lineHeight["xs"]};
    `,
		ageTicker: (showWarning) => {
			const classes = [css`
        display: flex;
        gap: ${size[1]};
        font-size: ${fontSize.xs};
        color: ${colors.gray[400]};
        font-variant-numeric: tabular-nums;
        line-height: ${lineHeight["xs"]};
      `];
			if (showWarning) {
				const warningStyles = css`
          color: ${colors.yellow[400]};
        `;
				classes.push(warningStyles);
			}
			return classes;
		},
		secondContainer: css`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      border-right: 1px solid ${colors.gray[700]};
      display: flex;
      flex-direction: column;
    `,
		thirdContainer: css`
      flex: 1 1 500px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      border-right: 1px solid ${colors.gray[700]};

      @media (max-width: 700px) {
        border-top: 2px solid ${colors.gray[700]};
      }
    `,
		fourthContainer: css`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
    `,
		routesContainer: css`
      overflow-x: auto;
      overflow-y: visible;
    `,
		routesRowContainer: (active, isMatch) => {
			const classes = [css`
        display: flex;
        border-bottom: 1px solid ${colors.darkGray[400]};
        align-items: center;
        padding: ${size[1]} ${size[2]};
        gap: ${size[2]};
        font-size: ${fontSize.xs};
        color: ${colors.gray[300]};
        cursor: ${isMatch ? "pointer" : "default"};
        line-height: ${lineHeight["xs"]};
      `];
			if (active) {
				const activeStyles = css`
          background: ${colors.darkGray[500]};
        `;
				classes.push(activeStyles);
			}
			return classes;
		},
		routesRow: (isMatch) => {
			const classes = [css`
        flex: 1 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${fontSize.xs};
        line-height: ${lineHeight["xs"]};
      `];
			if (!isMatch) {
				const matchStyles = css`
          color: ${colors.gray[400]};
        `;
				classes.push(matchStyles);
			}
			return classes;
		},
		routesRowInner: css`
      display: 'flex';
      align-items: 'center';
      flex-grow: 1;
      min-width: 0;
    `,
		routeParamInfo: css`
      color: ${colors.gray[400]};
      font-size: ${fontSize.xs};
      line-height: ${lineHeight["xs"]};
    `,
		nestedRouteRow: (isRoot) => {
			return css`
        margin-left: ${isRoot ? 0 : size[3.5]};
        border-left: ${isRoot ? "" : `solid 1px ${colors.gray[700]}`};
      `;
		},
		code: css`
      font-size: ${fontSize.xs};
      line-height: ${lineHeight["xs"]};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
		matchesContainer: css`
      flex: 1 1 auto;
      overflow-y: auto;
    `,
		cachedMatchesContainer: css`
      flex: 1 1 auto;
      overflow-y: auto;
      max-height: 50%;
    `,
		historyContainer: css`
      display: flex;
      flex: 1 1 auto;
      overflow-y: auto;
      max-height: 50%;
    `,
		historyOverflowContainer: css`
      padding: ${size[1]} ${size[2]};
      font-size: ${tokens.font.size.xs};
    `,
		maskedBadgeContainer: css`
      flex: 1;
      justify-content: flex-end;
      display: flex;
    `,
		matchDetails: css`
      display: flex;
      flex-direction: column;
      padding: ${tokens.size[2]};
      font-size: ${tokens.font.size.xs};
      color: ${tokens.colors.gray[300]};
      line-height: ${tokens.font.lineHeight.sm};
    `,
		matchStatus: (status, isFetching) => {
			const color = isFetching && status === "success" ? isFetching === "beforeLoad" ? "purple" : "blue" : {
				pending: "yellow",
				success: "green",
				error: "red",
				notFound: "purple",
				redirected: "gray"
			}[status];
			return css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-radius: ${tokens.border.radius.sm};
        font-weight: ${tokens.font.weight.normal};
        background-color: ${tokens.colors[color][900]}${tokens.alpha[90]};
        color: ${tokens.colors[color][300]};
        border: 1px solid ${tokens.colors[color][600]};
        margin-bottom: ${tokens.size[2]};
        transition: all 0.25s ease-out;
      `;
		},
		matchDetailsInfo: css`
      display: flex;
      justify-content: flex-end;
      flex: 1;
    `,
		matchDetailsInfoLabel: css`
      display: flex;
    `,
		mainCloseBtn: css`
      background: ${colors.darkGray[700]};
      padding: ${size[1]} ${size[2]} ${size[1]} ${size[1.5]};
      border-radius: ${border.radius.md};
      position: fixed;
      z-index: 99999;
      display: inline-flex;
      width: fit-content;
      cursor: pointer;
      appearance: none;
      border: 0;
      gap: 8px;
      align-items: center;
      border: 1px solid ${colors.gray[500]};
      font-size: ${font.size.xs};
      cursor: pointer;
      transition: all 0.25s ease-out;

      &:hover {
        background: ${colors.darkGray[500]};
      }
    `,
		mainCloseBtnPosition: (position) => {
			return css`
        ${position === "top-left" ? `top: ${size[2]}; left: ${size[2]};` : ""}
        ${position === "top-right" ? `top: ${size[2]}; right: ${size[2]};` : ""}
        ${position === "bottom-left" ? `bottom: ${size[2]}; left: ${size[2]};` : ""}
        ${position === "bottom-right" ? `bottom: ${size[2]}; right: ${size[2]};` : ""}
      `;
		},
		mainCloseBtnAnimation: (isOpen) => {
			if (!isOpen) return css`
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
        `;
			return css`
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      `;
		},
		routerLogoCloseButton: css`
      font-weight: ${font.weight.semibold};
      font-size: ${font.size.xs};
      background: linear-gradient(to right, #98f30c, #00f4a3);
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,
		mainCloseBtnDivider: css`
      width: 1px;
      background: ${tokens.colors.gray[600]};
      height: 100%;
      border-radius: 999999px;
      color: transparent;
    `,
		mainCloseBtnIconContainer: css`
      position: relative;
      width: ${size[5]};
      height: ${size[5]};
      background: pink;
      border-radius: 999999px;
      overflow: hidden;
    `,
		mainCloseBtnIconOuter: css`
      width: ${size[5]};
      height: ${size[5]};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(3px) saturate(1.8) contrast(2);
    `,
		mainCloseBtnIconInner: css`
      width: ${size[4]};
      height: ${size[4]};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
		panelCloseBtn: css`
      position: absolute;
      cursor: pointer;
      z-index: 100001;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${colors.darkGray[700]};
      &:hover {
        background-color: ${colors.darkGray[500]};
      }

      top: 0;
      right: ${size[2]};
      transform: translate(0, -100%);
      border-right: ${colors.darkGray[300]} 1px solid;
      border-left: ${colors.darkGray[300]} 1px solid;
      border-top: ${colors.darkGray[300]} 1px solid;
      border-bottom: none;
      border-radius: ${border.radius.sm} ${border.radius.sm} 0px 0px;
      padding: ${size[1]} ${size[1.5]} ${size[.5]} ${size[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${size[2.5]};
        height: ${size[1.5]};
        width: calc(100% + ${size[5]});
      }
    `,
		panelCloseBtnIcon: css`
      color: ${colors.gray[400]};
      width: ${size[2]};
      height: ${size[2]};
    `,
		navigateButton: css`
      background: none;
      border: none;
      padding: 0 0 0 4px;
      margin: 0;
      color: ${colors.gray[400]};
      font-size: ${fontSize.md};
      cursor: pointer;
      line-height: 1;
      vertical-align: middle;
      margin-right: 0.5ch;
      flex-shrink: 0;
      &:hover {
        color: ${colors.blue[300]};
      }
    `
	};
};
function useStyles$1() {
	const [_styles] = createSignal(stylesFactory$1(useContext(ShadowDomTargetContext)));
	return _styles;
}
var getItem = (key) => {
	try {
		const itemValue = localStorage.getItem(key);
		if (typeof itemValue === "string") return JSON.parse(itemValue);
		return;
	} catch {
		return;
	}
};
function useLocalStorage(key, defaultValue) {
	const [value, setValue] = createSignal();
	createEffect(() => {
		const initialValue = getItem(key);
		if (typeof initialValue === "undefined" || initialValue === null) setValue(typeof defaultValue === "function" ? defaultValue() : defaultValue);
		else setValue(initialValue);
	});
	const setter = (updater) => {
		setValue((old) => {
			let newVal = updater;
			if (typeof updater == "function") newVal = updater(old);
			try {
				localStorage.setItem(key, JSON.stringify(newVal));
			} catch {}
			return newVal;
		});
	};
	return [value, setter];
}
var _tmpl$$3 = /* @__PURE__ */ template(`<span><svg xmlns=http://www.w3.org/2000/svg width=12 height=12 fill=none viewBox="0 0 24 24"><path stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M9 18l6-6-6-6">`), _tmpl$2$1 = /* @__PURE__ */ template(`<div>`), _tmpl$3$1 = /* @__PURE__ */ template(`<button><span> `), _tmpl$4$1 = /* @__PURE__ */ template(`<div><div><button> [<!> ... <!>]`), _tmpl$5$1 = /* @__PURE__ */ template(`<button><span></span> 🔄 `), _tmpl$6$1 = /* @__PURE__ */ template(`<span>:`), _tmpl$7$1 = /* @__PURE__ */ template(`<span>`);
var Expander = ({ expanded, style: style$1 = {} }) => {
	const styles = useStyles();
	return (() => {
		var _el$ = _tmpl$$3(), _el$2 = _el$.firstChild;
		createRenderEffect((_p$) => {
			var _v$ = styles().expander, _v$2 = clsx(styles().expanderIcon(expanded));
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$2, "class", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
};
function chunkArray(array, size) {
	if (size < 1) return [];
	let i$1 = 0;
	const result = [];
	while (i$1 < array.length) {
		result.push(array.slice(i$1, i$1 + size));
		i$1 = i$1 + size;
	}
	return result;
}
function isIterable(x) {
	return Symbol.iterator in x;
}
function Explorer({ value, defaultExpanded, pageSize = 100, filterSubEntries, ...rest }) {
	const [expanded, setExpanded] = createSignal(Boolean(defaultExpanded));
	const toggleExpanded = () => setExpanded((old) => !old);
	const type = createMemo(() => typeof value());
	const subEntries = createMemo(() => {
		let entries = [];
		const makeProperty = (sub) => {
			const subDefaultExpanded = defaultExpanded === true ? { [sub.label]: true } : defaultExpanded?.[sub.label];
			return {
				...sub,
				value: () => sub.value,
				defaultExpanded: subDefaultExpanded
			};
		};
		if (Array.isArray(value())) entries = value().map((d$1, i$1) => makeProperty({
			label: i$1.toString(),
			value: d$1
		}));
		else if (value() !== null && typeof value() === "object" && isIterable(value()) && typeof value()[Symbol.iterator] === "function") entries = Array.from(value(), (val, i$1) => makeProperty({
			label: i$1.toString(),
			value: val
		}));
		else if (typeof value() === "object" && value() !== null) entries = Object.entries(value()).map(([key, val]) => makeProperty({
			label: key,
			value: val
		}));
		return filterSubEntries ? filterSubEntries(entries) : entries;
	});
	const subEntryPages = createMemo(() => chunkArray(subEntries(), pageSize));
	const [expandedPages, setExpandedPages] = createSignal([]);
	const [valueSnapshot, setValueSnapshot] = createSignal(void 0);
	const styles = useStyles();
	const refreshValueSnapshot = () => {
		setValueSnapshot(value()());
	};
	const handleEntry = (entry) => createComponent(Explorer, mergeProps({
		value,
		filterSubEntries
	}, rest, entry));
	return (() => {
		var _el$3 = _tmpl$2$1();
		insert(_el$3, (() => {
			var _c$ = memo(() => !!subEntryPages().length);
			return () => _c$() ? [(() => {
				var _el$4 = _tmpl$3$1(), _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild;
				_el$4.$$click = () => toggleExpanded();
				insert(_el$4, createComponent(Expander, { get expanded() {
					return expanded() ?? false;
				} }), _el$5);
				insert(_el$4, () => rest.label, _el$5);
				insert(_el$5, () => String(type).toLowerCase() === "iterable" ? "(Iterable) " : "", _el$6);
				insert(_el$5, () => subEntries().length, _el$6);
				insert(_el$5, () => subEntries().length > 1 ? `items` : `item`, null);
				createRenderEffect((_p$) => {
					var _v$3 = styles().expandButton, _v$4 = styles().info;
					_v$3 !== _p$.e && className(_el$4, _p$.e = _v$3);
					_v$4 !== _p$.t && className(_el$5, _p$.t = _v$4);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$4;
			})(), memo(() => memo(() => !!(expanded() ?? false))() ? memo(() => subEntryPages().length === 1)() ? (() => {
				var _el$7 = _tmpl$2$1();
				insert(_el$7, () => subEntries().map((entry, index) => handleEntry(entry)));
				createRenderEffect(() => className(_el$7, styles().subEntries));
				return _el$7;
			})() : (() => {
				var _el$8 = _tmpl$2$1();
				insert(_el$8, () => subEntryPages().map((entries, index) => {
					return (() => {
						var _el$9 = _tmpl$4$1(), _el$0 = _el$9.firstChild, _el$1 = _el$0.firstChild, _el$10 = _el$1.firstChild, _el$15 = _el$10.nextSibling, _el$16 = _el$15.nextSibling.nextSibling;
						_el$16.nextSibling;
						_el$1.$$click = () => setExpandedPages((old) => old.includes(index) ? old.filter((d$1) => d$1 !== index) : [...old, index]);
						insert(_el$1, createComponent(Expander, { get expanded() {
							return expandedPages().includes(index);
						} }), _el$10);
						insert(_el$1, index * pageSize, _el$15);
						insert(_el$1, index * pageSize + pageSize - 1, _el$16);
						insert(_el$0, (() => {
							var _c$2 = memo(() => !!expandedPages().includes(index));
							return () => _c$2() ? (() => {
								var _el$17 = _tmpl$2$1();
								insert(_el$17, () => entries.map((entry) => handleEntry(entry)));
								createRenderEffect(() => className(_el$17, styles().subEntries));
								return _el$17;
							})() : null;
						})(), null);
						createRenderEffect((_p$) => {
							var _v$5 = styles().entry, _v$6 = clsx(styles().labelButton, "labelButton");
							_v$5 !== _p$.e && className(_el$0, _p$.e = _v$5);
							_v$6 !== _p$.t && className(_el$1, _p$.t = _v$6);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						return _el$9;
					})();
				}));
				createRenderEffect(() => className(_el$8, styles().subEntries));
				return _el$8;
			})() : null)] : memo(() => type() === "function")() ? createComponent(Explorer, {
				get label() {
					return (() => {
						var _el$18 = _tmpl$5$1(), _el$19 = _el$18.firstChild;
						_el$18.$$click = refreshValueSnapshot;
						insert(_el$19, () => rest.label);
						createRenderEffect(() => className(_el$18, styles().refreshValueBtn));
						return _el$18;
					})();
				},
				value: valueSnapshot,
				defaultExpanded: {}
			}) : [
				(() => {
					var _el$20 = _tmpl$6$1(), _el$21 = _el$20.firstChild;
					insert(_el$20, () => rest.label, _el$21);
					return _el$20;
				})(),
				" ",
				(() => {
					var _el$22 = _tmpl$7$1();
					insert(_el$22, () => displayValue(value()));
					createRenderEffect(() => className(_el$22, styles().value));
					return _el$22;
				})()
			];
		})());
		createRenderEffect(() => className(_el$3, styles().entry));
		return _el$3;
	})();
}
var stylesFactory = (shadowDOMTarget) => {
	const { colors, font, size } = tokens;
	const { fontFamily, lineHeight, size: fontSize } = font;
	const css = shadowDOMTarget ? u.bind({ target: shadowDOMTarget }) : u;
	return {
		entry: css`
      font-family: ${fontFamily.mono};
      font-size: ${fontSize.xs};
      line-height: ${lineHeight.sm};
      outline: none;
      word-break: break-word;
    `,
		labelButton: css`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      background: transparent;
      border: none;
      padding: 0;
    `,
		expander: css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${size[3]};
      height: ${size[3]};
      padding-left: 3px;
      box-sizing: content-box;
    `,
		expanderIcon: (expanded) => {
			if (expanded) return css`
          transform: rotate(90deg);
          transition: transform 0.1s ease;
        `;
			return css`
        transform: rotate(0deg);
        transition: transform 0.1s ease;
      `;
		},
		expandButton: css`
      display: flex;
      gap: ${size[1]};
      align-items: center;
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      background: transparent;
      border: none;
      padding: 0;
    `,
		value: css`
      color: ${colors.purple[400]};
    `,
		subEntries: css`
      margin-left: ${size[2]};
      padding-left: ${size[2]};
      border-left: 2px solid ${colors.darkGray[400]};
    `,
		info: css`
      color: ${colors.gray[500]};
      font-size: ${fontSize["2xs"]};
      padding-left: ${size[1]};
    `,
		refreshValueBtn: css`
      appearance: none;
      border: 0;
      cursor: pointer;
      background: transparent;
      color: inherit;
      padding: 0;
      font-family: ${fontFamily.mono};
      font-size: ${fontSize.xs};
    `
	};
};
function useStyles() {
	const [_styles] = createSignal(stylesFactory(useContext(ShadowDomTargetContext)));
	return _styles;
}
delegateEvents(["click"]);
var _tmpl$$2 = /* @__PURE__ */ template(`<div><div></div><div>/</div><div></div><div>/</div><div>`);
function formatTime(ms) {
	const units = [
		"s",
		"min",
		"h",
		"d"
	];
	const values = [
		ms / 1e3,
		ms / 6e4,
		ms / 36e5,
		ms / 864e5
	];
	let chosenUnitIndex = 0;
	for (let i$1 = 1; i$1 < values.length; i$1++) {
		if (values[i$1] < 1) break;
		chosenUnitIndex = i$1;
	}
	return new Intl.NumberFormat(navigator.language, {
		compactDisplay: "short",
		notation: "compact",
		maximumFractionDigits: 0
	}).format(values[chosenUnitIndex]) + units[chosenUnitIndex];
}
function AgeTicker({ match, router }) {
	const styles = useStyles$1();
	if (!match) return null;
	const route = router().looseRoutesById[match.routeId];
	if (!route.options.loader) return null;
	const age = Date.now() - match.updatedAt;
	const staleTime = route.options.staleTime ?? router().options.defaultStaleTime ?? 0;
	const gcTime = route.options.gcTime ?? router().options.defaultGcTime ?? 1800 * 1e3;
	return (() => {
		var _el$ = _tmpl$$2(), _el$2 = _el$.firstChild, _el$4 = _el$2.nextSibling.nextSibling, _el$6 = _el$4.nextSibling.nextSibling;
		insert(_el$2, () => formatTime(age));
		insert(_el$4, () => formatTime(staleTime));
		insert(_el$6, () => formatTime(gcTime));
		createRenderEffect(() => className(_el$, clsx(styles().ageTicker(age > staleTime))));
		return _el$;
	})();
}
var _tmpl$$1 = /* @__PURE__ */ template(`<button type=button>➔`);
function NavigateButton({ to, params, search, router }) {
	const styles = useStyles$1();
	return (() => {
		var _el$ = _tmpl$$1();
		_el$.$$click = (e$1) => {
			e$1.stopPropagation();
			router().navigate({
				to,
				params,
				search
			});
		};
		setAttribute(_el$, "title", `Navigate to ${to}`);
		createRenderEffect(() => className(_el$, styles().navigateButton));
		return _el$;
	})();
}
delegateEvents(["click"]);
var _tmpl$ = /* @__PURE__ */ template(`<button><div>TANSTACK</div><div>TanStack Router v1`), _tmpl$2 = /* @__PURE__ */ template(`<div style=display:flex;align-items:center;width:100%><div style=flex-grow:1;min-width:0>`), _tmpl$3 = /* @__PURE__ */ template(`<code> `), _tmpl$4 = /* @__PURE__ */ template(`<code>`), _tmpl$5 = /* @__PURE__ */ template(`<div><div role=button><div>`), _tmpl$6 = /* @__PURE__ */ template(`<div>`), _tmpl$7 = /* @__PURE__ */ template(`<div><ul>`), _tmpl$8 = /* @__PURE__ */ template(`<div><button><svg xmlns=http://www.w3.org/2000/svg width=10 height=6 fill=none viewBox="0 0 10 6"><path stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.667 d="M1 1l4 4 4-4"></path></svg></button><div><div></div><div><div></div></div></div><div><div><div><span>Pathname</span></div><div><code></code></div><div><div><button type=button>Routes</button><button type=button>Matches</button><button type=button>History</button></div><div><div>age / staleTime / gcTime</div></div></div><div>`), _tmpl$9 = /* @__PURE__ */ template(`<div><span>masked`), _tmpl$0 = /* @__PURE__ */ template(`<div role=button><div>`), _tmpl$1 = /* @__PURE__ */ template(`<li><div>`), _tmpl$10 = /* @__PURE__ */ template(`<li>This panel displays the most recent 15 navigations.`), _tmpl$11 = /* @__PURE__ */ template(`<div><div><div>Cached Matches</div><div>age / staleTime / gcTime</div></div><div>`), _tmpl$12 = /* @__PURE__ */ template(`<div><div>Match Details</div><div><div><div><div></div></div><div><div>ID:</div><div><code></code></div></div><div><div>State:</div><div></div></div><div><div>Last Updated:</div><div></div></div></div></div><div>Explorer</div><div>`), _tmpl$13 = /* @__PURE__ */ template(`<div>Loader Data`), _tmpl$14 = /* @__PURE__ */ template(`<div><div><span>Search Params</span></div><div>`), _tmpl$15 = /* @__PURE__ */ template(`<span style=margin-left:0.5rem>`), _tmpl$16 = /* @__PURE__ */ template(`<button type=button aria-label="Copy value to clipboard"style=cursor:pointer>`);
var HISTORY_LIMIT = 15;
function Logo(props) {
	const { className: className$1, ...rest } = props;
	const styles = useStyles$1();
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
		spread(_el$, mergeProps(rest, { get ["class"]() {
			return clsx(styles().logo, className$1 ? className$1() : "");
		} }), false, true);
		createRenderEffect((_p$) => {
			var _v$ = styles().tanstackLogo, _v$2 = styles().routerLogo;
			_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
}
function NavigateLink(props) {
	return (() => {
		var _el$4 = _tmpl$2(), _el$5 = _el$4.firstChild;
		insert(_el$4, () => props.left, _el$5);
		insert(_el$5, () => props.children);
		insert(_el$4, () => props.right, null);
		createRenderEffect(() => className(_el$4, props.class));
		return _el$4;
	})();
}
function RouteComp({ routerState, router, route, isRoot, activeId, setActiveId }) {
	const styles = useStyles$1();
	const matches = createMemo(() => routerState().pendingMatches || routerState().matches);
	const match = createMemo(() => routerState().matches.find((d$1) => d$1.routeId === route.id));
	const param = createMemo(() => {
		try {
			if (match()?.params) {
				const p$1 = match()?.params;
				const r$1 = route.path || trimPath(route.id);
				if (r$1.startsWith("$")) {
					const trimmed = r$1.slice(1);
					if (p$1[trimmed]) return `(${p$1[trimmed]})`;
				}
			}
			return "";
		} catch (error) {
			return "";
		}
	});
	const navigationTarget = createMemo(() => {
		if (isRoot) return void 0;
		if (!route.path) return void 0;
		const allParams = Object.assign({}, ...matches().map((m) => m.params));
		const interpolated = interpolatePath({
			path: route.fullPath,
			params: allParams,
			decodeCharMap: router().pathParamsDecodeCharMap
		});
		return !interpolated.isMissingParams ? interpolated.interpolatedPath : void 0;
	});
	return (() => {
		var _el$6 = _tmpl$5(), _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild;
		_el$7.$$click = () => {
			if (match()) setActiveId(activeId() === route.id ? "" : route.id);
		};
		insert(_el$7, createComponent(NavigateLink, {
			get ["class"]() {
				return clsx(styles().routesRow(!!match()));
			},
			get left() {
				return createComponent(Show, {
					get when() {
						return navigationTarget();
					},
					children: (navigate) => createComponent(NavigateButton, {
						get to() {
							return navigate();
						},
						router
					})
				});
			},
			get right() {
				return createComponent(AgeTicker, {
					get match() {
						return match();
					},
					router
				});
			},
			get children() {
				return [(() => {
					var _el$9 = _tmpl$3(), _el$0 = _el$9.firstChild;
					insert(_el$9, () => isRoot ? rootRouteId : route.path || trimPath(route.id), _el$0);
					createRenderEffect(() => className(_el$9, styles().code));
					return _el$9;
				})(), (() => {
					var _el$1 = _tmpl$4();
					insert(_el$1, param);
					createRenderEffect(() => className(_el$1, styles().routeParamInfo));
					return _el$1;
				})()];
			}
		}), null);
		insert(_el$6, (() => {
			var _c$ = memo(() => !!route.children?.length);
			return () => _c$() ? (() => {
				var _el$10 = _tmpl$6();
				insert(_el$10, () => [...route.children].sort((a$1, b$1) => {
					return a$1.rank - b$1.rank;
				}).map((r$1) => createComponent(RouteComp, {
					routerState,
					router,
					route: r$1,
					activeId,
					setActiveId
				})));
				createRenderEffect(() => className(_el$10, styles().nestedRouteRow(!!isRoot)));
				return _el$10;
			})() : null;
		})(), null);
		createRenderEffect((_p$) => {
			var _v$3 = `Open match details for ${route.id}`, _v$4 = clsx(styles().routesRowContainer(route.id === activeId(), !!match())), _v$5 = clsx(styles().matchIndicator(getRouteStatusColor(matches(), route)));
			_v$3 !== _p$.e && setAttribute(_el$7, "aria-label", _p$.e = _v$3);
			_v$4 !== _p$.t && className(_el$7, _p$.t = _v$4);
			_v$5 !== _p$.a && className(_el$8, _p$.a = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$6;
	})();
}
var BaseTanStackRouterDevtoolsPanel = function BaseTanStackRouterDevtoolsPanel2({ ...props }) {
	const { isOpen = true, setIsOpen, handleDragStart, router, routerState, shadowDOMTarget, ...panelProps } = props;
	const { onCloseClick } = useDevtoolsOnClose();
	const styles = useStyles$1();
	const { className: className$1, style: style$1, ...otherPanelProps } = panelProps;
	invariant(router, "No router was found for the TanStack Router Devtools. Please place the devtools in the <RouterProvider> component tree or pass the router instance to the devtools manually.");
	const [currentTab, setCurrentTab] = useLocalStorage("tanstackRouterDevtoolsActiveTab", "routes");
	const [activeId, setActiveId] = useLocalStorage("tanstackRouterDevtoolsActiveRouteId", "");
	const [history, setHistory] = createSignal([]);
	const [hasHistoryOverflowed, setHasHistoryOverflowed] = createSignal(false);
	createEffect(() => {
		const matches = routerState().matches;
		const currentMatch = matches[matches.length - 1];
		if (!currentMatch) return;
		const historyUntracked = untrack(() => history());
		const lastMatch = historyUntracked[0];
		const sameLocation = lastMatch && lastMatch.pathname === currentMatch.pathname && JSON.stringify(lastMatch.search ?? {}) === JSON.stringify(currentMatch.search ?? {});
		if (!lastMatch || !sameLocation) {
			if (historyUntracked.length >= HISTORY_LIMIT) setHasHistoryOverflowed(true);
			setHistory((prev) => {
				const newHistory = [currentMatch, ...prev];
				newHistory.splice(HISTORY_LIMIT);
				return newHistory;
			});
		}
	});
	const activeMatch = createMemo(() => {
		return [
			...routerState().pendingMatches ?? [],
			...routerState().matches,
			...routerState().cachedMatches
		].find((d$1) => d$1.routeId === activeId() || d$1.id === activeId());
	});
	const hasSearch = createMemo(() => Object.keys(routerState().location.search).length);
	const explorerState = createMemo(() => {
		return {
			...router(),
			state: routerState()
		};
	});
	const routerExplorerValue = createMemo(() => Object.fromEntries(multiSortBy(Object.keys(explorerState()), [
		"state",
		"routesById",
		"routesByPath",
		"options",
		"manifest"
	].map((d$1) => (dd) => dd !== d$1)).map((key) => [key, explorerState()[key]]).filter((d$1) => typeof d$1[1] !== "function" && ![
		"__store",
		"basepath",
		"injectedHtml",
		"subscribers",
		"latestLoadPromise",
		"navigateTimeout",
		"resetNextScroll",
		"tempLocationKey",
		"latestLocation",
		"routeTree",
		"history"
	].includes(d$1[0]))));
	const activeMatchLoaderData = createMemo(() => activeMatch()?.loaderData);
	const activeMatchValue = createMemo(() => activeMatch());
	const locationSearchValue = createMemo(() => routerState().location.search);
	return (() => {
		var _el$11 = _tmpl$8(), _el$12 = _el$11.firstChild, _el$13 = _el$12.firstChild, _el$14 = _el$12.nextSibling, _el$15 = _el$14.firstChild, _el$16 = _el$15.nextSibling, _el$17 = _el$16.firstChild, _el$18 = _el$14.nextSibling, _el$19 = _el$18.firstChild, _el$20 = _el$19.firstChild;
		_el$20.firstChild;
		var _el$22 = _el$20.nextSibling, _el$23 = _el$22.firstChild, _el$24 = _el$22.nextSibling, _el$25 = _el$24.firstChild, _el$26 = _el$25.firstChild, _el$27 = _el$26.nextSibling, _el$28 = _el$27.nextSibling, _el$29 = _el$25.nextSibling, _el$30 = _el$24.nextSibling;
		spread(_el$11, mergeProps({
			get ["class"]() {
				return clsx(styles().devtoolsPanel, "TanStackRouterDevtoolsPanel", className$1 ? className$1() : "");
			},
			get style() {
				return style$1 ? style$1() : "";
			}
		}, otherPanelProps), false, true);
		insert(_el$11, handleDragStart ? (() => {
			var _el$34 = _tmpl$6();
			addEventListener(_el$34, "mousedown", handleDragStart, true);
			createRenderEffect(() => className(_el$34, styles().dragHandle));
			return _el$34;
		})() : null, _el$12);
		_el$12.$$click = (e$1) => {
			if (setIsOpen) setIsOpen(false);
			onCloseClick(e$1);
		};
		insert(_el$15, createComponent(Logo, {
			"aria-hidden": true,
			onClick: (e$1) => {
				if (setIsOpen) setIsOpen(false);
				onCloseClick(e$1);
			}
		}));
		insert(_el$17, createComponent(Explorer, {
			label: "Router",
			value: routerExplorerValue,
			defaultExpanded: {
				state: {},
				context: {},
				options: {}
			},
			filterSubEntries: (subEntries) => {
				return subEntries.filter((d$1) => typeof d$1.value() !== "function");
			}
		}));
		insert(_el$20, (() => {
			var _c$2 = memo(() => !!routerState().location.maskedLocation);
			return () => _c$2() ? (() => {
				var _el$35 = _tmpl$9(), _el$36 = _el$35.firstChild;
				createRenderEffect((_p$) => {
					var _v$24 = styles().maskedBadgeContainer, _v$25 = styles().maskedBadge;
					_v$24 !== _p$.e && className(_el$35, _p$.e = _v$24);
					_v$25 !== _p$.t && className(_el$36, _p$.t = _v$25);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$35;
			})() : null;
		})(), null);
		insert(_el$23, () => routerState().location.pathname);
		insert(_el$22, (() => {
			var _c$3 = memo(() => !!routerState().location.maskedLocation);
			return () => _c$3() ? (() => {
				var _el$37 = _tmpl$4();
				insert(_el$37, () => routerState().location.maskedLocation?.pathname);
				createRenderEffect(() => className(_el$37, styles().maskedLocation));
				return _el$37;
			})() : null;
		})(), null);
		_el$26.$$click = () => {
			setCurrentTab("routes");
		};
		_el$27.$$click = () => {
			setCurrentTab("matches");
		};
		_el$28.$$click = () => {
			setCurrentTab("history");
		};
		insert(_el$30, createComponent(Switch, { get children() {
			return [
				createComponent(Match, {
					get when() {
						return currentTab() === "routes";
					},
					get children() {
						return createComponent(RouteComp, {
							routerState,
							router,
							get route() {
								return router().routeTree;
							},
							isRoot: true,
							activeId,
							setActiveId
						});
					}
				}),
				createComponent(Match, {
					get when() {
						return currentTab() === "matches";
					},
					get children() {
						var _el$31 = _tmpl$6();
						insert(_el$31, () => (routerState().pendingMatches?.length ? routerState().pendingMatches : routerState().matches)?.map((match, _i) => {
							return (() => {
								var _el$38 = _tmpl$0(), _el$39 = _el$38.firstChild;
								_el$38.$$click = () => setActiveId(activeId() === match.id ? "" : match.id);
								insert(_el$38, createComponent(NavigateLink, {
									get left() {
										return createComponent(NavigateButton, {
											get to() {
												return match.pathname;
											},
											get params() {
												return match.params;
											},
											get search() {
												return match.search;
											},
											router
										});
									},
									get right() {
										return createComponent(AgeTicker, {
											match,
											router
										});
									},
									get children() {
										var _el$40 = _tmpl$4();
										insert(_el$40, () => `${match.routeId === "__root__" ? rootRouteId : match.pathname}`);
										createRenderEffect(() => className(_el$40, styles().matchID));
										return _el$40;
									}
								}), null);
								createRenderEffect((_p$) => {
									var _v$26 = `Open match details for ${match.id}`, _v$27 = clsx(styles().matchRow(match === activeMatch())), _v$28 = clsx(styles().matchIndicator(getStatusColor(match)));
									_v$26 !== _p$.e && setAttribute(_el$38, "aria-label", _p$.e = _v$26);
									_v$27 !== _p$.t && className(_el$38, _p$.t = _v$27);
									_v$28 !== _p$.a && className(_el$39, _p$.a = _v$28);
									return _p$;
								}, {
									e: void 0,
									t: void 0,
									a: void 0
								});
								return _el$38;
							})();
						}));
						return _el$31;
					}
				}),
				createComponent(Match, {
					get when() {
						return currentTab() === "history";
					},
					get children() {
						var _el$32 = _tmpl$7(), _el$33 = _el$32.firstChild;
						insert(_el$33, createComponent(For, {
							get each() {
								return history();
							},
							children: (match, index) => (() => {
								var _el$41 = _tmpl$1(), _el$42 = _el$41.firstChild;
								insert(_el$41, createComponent(NavigateLink, {
									get left() {
										return createComponent(NavigateButton, {
											get to() {
												return match.pathname;
											},
											get params() {
												return match.params;
											},
											get search() {
												return match.search;
											},
											router
										});
									},
									get right() {
										return createComponent(AgeTicker, {
											match,
											router
										});
									},
									get children() {
										var _el$43 = _tmpl$4();
										insert(_el$43, () => `${match.routeId === "__root__" ? rootRouteId : match.pathname}`);
										createRenderEffect(() => className(_el$43, styles().matchID));
										return _el$43;
									}
								}), null);
								createRenderEffect((_p$) => {
									var _v$29 = clsx(styles().matchRow(match === activeMatch())), _v$30 = clsx(styles().matchIndicator(index() === 0 ? "green" : "gray"));
									_v$29 !== _p$.e && className(_el$41, _p$.e = _v$29);
									_v$30 !== _p$.t && className(_el$42, _p$.t = _v$30);
									return _p$;
								}, {
									e: void 0,
									t: void 0
								});
								return _el$41;
							})()
						}), null);
						insert(_el$33, (() => {
							var _c$4 = memo(() => !!hasHistoryOverflowed());
							return () => _c$4() ? (() => {
								var _el$44 = _tmpl$10();
								createRenderEffect(() => className(_el$44, styles().historyOverflowContainer));
								return _el$44;
							})() : null;
						})(), null);
						return _el$32;
					}
				})
			];
		} }));
		insert(_el$18, (() => {
			var _c$5 = memo(() => !!routerState().cachedMatches.length);
			return () => _c$5() ? (() => {
				var _el$45 = _tmpl$11(), _el$46 = _el$45.firstChild, _el$48 = _el$46.firstChild.nextSibling, _el$49 = _el$46.nextSibling;
				insert(_el$49, () => routerState().cachedMatches.map((match) => {
					return (() => {
						var _el$50 = _tmpl$0(), _el$51 = _el$50.firstChild;
						_el$50.$$click = () => setActiveId(activeId() === match.id ? "" : match.id);
						insert(_el$50, createComponent(NavigateLink, {
							get left() {
								return createComponent(NavigateButton, {
									get to() {
										return match.pathname;
									},
									get params() {
										return match.params;
									},
									get search() {
										return match.search;
									},
									router
								});
							},
							get right() {
								return createComponent(AgeTicker, {
									match,
									router
								});
							},
							get children() {
								var _el$52 = _tmpl$4();
								insert(_el$52, () => `${match.id}`);
								createRenderEffect(() => className(_el$52, styles().matchID));
								return _el$52;
							}
						}), null);
						createRenderEffect((_p$) => {
							var _v$34 = `Open match details for ${match.id}`, _v$35 = clsx(styles().matchRow(match === activeMatch())), _v$36 = clsx(styles().matchIndicator(getStatusColor(match)));
							_v$34 !== _p$.e && setAttribute(_el$50, "aria-label", _p$.e = _v$34);
							_v$35 !== _p$.t && className(_el$50, _p$.t = _v$35);
							_v$36 !== _p$.a && className(_el$51, _p$.a = _v$36);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0
						});
						return _el$50;
					})();
				}));
				createRenderEffect((_p$) => {
					var _v$31 = styles().cachedMatchesContainer, _v$32 = styles().detailsHeader, _v$33 = styles().detailsHeaderInfo;
					_v$31 !== _p$.e && className(_el$45, _p$.e = _v$31);
					_v$32 !== _p$.t && className(_el$46, _p$.t = _v$32);
					_v$33 !== _p$.a && className(_el$48, _p$.a = _v$33);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$45;
			})() : null;
		})(), null);
		insert(_el$11, (() => {
			var _c$6 = memo(() => !!(activeMatch() && activeMatch()?.status));
			return () => _c$6() ? (() => {
				var _el$53 = _tmpl$12(), _el$54 = _el$53.firstChild, _el$55 = _el$54.nextSibling, _el$56 = _el$55.firstChild, _el$57 = _el$56.firstChild, _el$58 = _el$57.firstChild, _el$59 = _el$57.nextSibling, _el$61 = _el$59.firstChild.nextSibling, _el$62 = _el$61.firstChild, _el$63 = _el$59.nextSibling, _el$65 = _el$63.firstChild.nextSibling, _el$66 = _el$63.nextSibling, _el$68 = _el$66.firstChild.nextSibling, _el$69 = _el$55.nextSibling, _el$70 = _el$69.nextSibling;
				insert(_el$58, (() => {
					var _c$8 = memo(() => !!(activeMatch()?.status === "success" && activeMatch()?.isFetching));
					return () => _c$8() ? "fetching" : activeMatch()?.status;
				})());
				insert(_el$62, () => activeMatch()?.id);
				insert(_el$65, (() => {
					var _c$9 = memo(() => !!routerState().pendingMatches?.find((d$1) => d$1.id === activeMatch()?.id));
					return () => _c$9() ? "Pending" : routerState().matches.find((d$1) => d$1.id === activeMatch()?.id) ? "Active" : "Cached";
				})());
				insert(_el$68, (() => {
					var _c$0 = memo(() => !!activeMatch()?.updatedAt);
					return () => _c$0() ? new Date(activeMatch()?.updatedAt).toLocaleTimeString() : "N/A";
				})());
				insert(_el$53, (() => {
					var _c$1 = memo(() => !!activeMatchLoaderData());
					return () => _c$1() ? [(() => {
						var _el$71 = _tmpl$13();
						createRenderEffect(() => className(_el$71, styles().detailsHeader));
						return _el$71;
					})(), (() => {
						var _el$72 = _tmpl$6();
						insert(_el$72, createComponent(Explorer, {
							label: "loaderData",
							value: activeMatchLoaderData,
							defaultExpanded: {}
						}));
						createRenderEffect(() => className(_el$72, styles().detailsContent));
						return _el$72;
					})()] : null;
				})(), _el$69);
				insert(_el$70, createComponent(Explorer, {
					label: "Match",
					value: activeMatchValue,
					defaultExpanded: {}
				}));
				createRenderEffect((_p$) => {
					var _v$37 = styles().thirdContainer, _v$38 = styles().detailsHeader, _v$39 = styles().matchDetails, _v$40 = styles().matchStatus(activeMatch()?.status, activeMatch()?.isFetching), _v$41 = styles().matchDetailsInfoLabel, _v$42 = styles().matchDetailsInfo, _v$43 = styles().matchDetailsInfoLabel, _v$44 = styles().matchDetailsInfo, _v$45 = styles().matchDetailsInfoLabel, _v$46 = styles().matchDetailsInfo, _v$47 = styles().detailsHeader, _v$48 = styles().detailsContent;
					_v$37 !== _p$.e && className(_el$53, _p$.e = _v$37);
					_v$38 !== _p$.t && className(_el$54, _p$.t = _v$38);
					_v$39 !== _p$.a && className(_el$56, _p$.a = _v$39);
					_v$40 !== _p$.o && className(_el$57, _p$.o = _v$40);
					_v$41 !== _p$.i && className(_el$59, _p$.i = _v$41);
					_v$42 !== _p$.n && className(_el$61, _p$.n = _v$42);
					_v$43 !== _p$.s && className(_el$63, _p$.s = _v$43);
					_v$44 !== _p$.h && className(_el$65, _p$.h = _v$44);
					_v$45 !== _p$.r && className(_el$66, _p$.r = _v$45);
					_v$46 !== _p$.d && className(_el$68, _p$.d = _v$46);
					_v$47 !== _p$.l && className(_el$69, _p$.l = _v$47);
					_v$48 !== _p$.u && className(_el$70, _p$.u = _v$48);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0,
					o: void 0,
					i: void 0,
					n: void 0,
					s: void 0,
					h: void 0,
					r: void 0,
					d: void 0,
					l: void 0,
					u: void 0
				});
				return _el$53;
			})() : null;
		})(), null);
		insert(_el$11, (() => {
			var _c$7 = memo(() => !!hasSearch());
			return () => _c$7() ? (() => {
				var _el$73 = _tmpl$14(), _el$74 = _el$73.firstChild;
				_el$74.firstChild;
				var _el$76 = _el$74.nextSibling;
				insert(_el$74, typeof navigator !== "undefined" ? (() => {
					var _el$77 = _tmpl$15();
					insert(_el$77, createComponent(CopyButton, { getValue: () => {
						const search = routerState().location.search;
						return JSON.stringify(search);
					} }));
					return _el$77;
				})() : null, null);
				insert(_el$76, createComponent(Explorer, {
					value: locationSearchValue,
					get defaultExpanded() {
						return Object.keys(routerState().location.search).reduce((obj, next) => {
							obj[next] = {};
							return obj;
						}, {});
					}
				}));
				createRenderEffect((_p$) => {
					var _v$49 = styles().fourthContainer, _v$50 = styles().detailsHeader, _v$51 = styles().detailsContent;
					_v$49 !== _p$.e && className(_el$73, _p$.e = _v$49);
					_v$50 !== _p$.t && className(_el$74, _p$.t = _v$50);
					_v$51 !== _p$.a && className(_el$76, _p$.a = _v$51);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$73;
			})() : null;
		})(), null);
		createRenderEffect((_p$) => {
			var _v$6 = styles().panelCloseBtn, _v$7 = styles().panelCloseBtnIcon, _v$8 = styles().firstContainer, _v$9 = styles().row, _v$0 = styles().routerExplorerContainer, _v$1 = styles().routerExplorer, _v$10 = styles().secondContainer, _v$11 = styles().matchesContainer, _v$12 = styles().detailsHeader, _v$13 = styles().detailsContent, _v$14 = styles().detailsHeader, _v$15 = styles().routeMatchesToggle, _v$16 = currentTab() === "routes", _v$17 = clsx(styles().routeMatchesToggleBtn(currentTab() === "routes", true)), _v$18 = currentTab() === "matches", _v$19 = clsx(styles().routeMatchesToggleBtn(currentTab() === "matches", true)), _v$20 = currentTab() === "history", _v$21 = clsx(styles().routeMatchesToggleBtn(currentTab() === "history", false)), _v$22 = styles().detailsHeaderInfo, _v$23 = clsx(styles().routesContainer);
			_v$6 !== _p$.e && className(_el$12, _p$.e = _v$6);
			_v$7 !== _p$.t && setAttribute(_el$13, "class", _p$.t = _v$7);
			_v$8 !== _p$.a && className(_el$14, _p$.a = _v$8);
			_v$9 !== _p$.o && className(_el$15, _p$.o = _v$9);
			_v$0 !== _p$.i && className(_el$16, _p$.i = _v$0);
			_v$1 !== _p$.n && className(_el$17, _p$.n = _v$1);
			_v$10 !== _p$.s && className(_el$18, _p$.s = _v$10);
			_v$11 !== _p$.h && className(_el$19, _p$.h = _v$11);
			_v$12 !== _p$.r && className(_el$20, _p$.r = _v$12);
			_v$13 !== _p$.d && className(_el$22, _p$.d = _v$13);
			_v$14 !== _p$.l && className(_el$24, _p$.l = _v$14);
			_v$15 !== _p$.u && className(_el$25, _p$.u = _v$15);
			_v$16 !== _p$.c && (_el$26.disabled = _p$.c = _v$16);
			_v$17 !== _p$.w && className(_el$26, _p$.w = _v$17);
			_v$18 !== _p$.m && (_el$27.disabled = _p$.m = _v$18);
			_v$19 !== _p$.f && className(_el$27, _p$.f = _v$19);
			_v$20 !== _p$.y && (_el$28.disabled = _p$.y = _v$20);
			_v$21 !== _p$.g && className(_el$28, _p$.g = _v$21);
			_v$22 !== _p$.p && className(_el$29, _p$.p = _v$22);
			_v$23 !== _p$.b && className(_el$30, _p$.b = _v$23);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0,
			d: void 0,
			l: void 0,
			u: void 0,
			c: void 0,
			w: void 0,
			m: void 0,
			f: void 0,
			y: void 0,
			g: void 0,
			p: void 0,
			b: void 0
		});
		return _el$11;
	})();
};
function CopyButton({ getValue }) {
	const [copied, setCopied] = createSignal(false);
	let timeoutId = null;
	const handleCopy = async () => {
		if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
			console.warn("TanStack Router Devtools: Clipboard API unavailable");
			return;
		}
		try {
			const value = getValue();
			await navigator.clipboard.writeText(value);
			setCopied(true);
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setCopied(false), 2500);
		} catch (e$1) {
			console.error("TanStack Router Devtools: Failed to copy", e$1);
		}
	};
	onCleanup(() => {
		if (timeoutId) clearTimeout(timeoutId);
	});
	return (() => {
		var _el$78 = _tmpl$16();
		_el$78.$$click = handleCopy;
		insert(_el$78, () => copied() ? "✅" : "📋");
		createRenderEffect(() => setAttribute(_el$78, "title", copied() ? "Copied!" : "Copy"));
		return _el$78;
	})();
}
delegateEvents(["click", "mousedown"]);
var BaseTanStackRouterDevtoolsPanel$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	BaseTanStackRouterDevtoolsPanel,
	default: BaseTanStackRouterDevtoolsPanel
}, Symbol.toStringTag, { value: "Module" }));
export { setAttribute as _, useStyles$1 as a, className as c, createMemo as d, createRenderEffect as f, mergeProps as g, insert as h, useLocalStorage as i, createComponent as l, createUniqueId as m, BaseTanStackRouterDevtoolsPanel$1 as n, DevtoolsOnCloseContext as o, createSignal as p, useIsMounted as r, Dynamic as s, BaseTanStackRouterDevtoolsPanel as t, createEffect as u, spread as v, template as y };
