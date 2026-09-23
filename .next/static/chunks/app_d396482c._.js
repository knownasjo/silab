(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/services/announcement/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "deleteAnnouncement": (()=>deleteAnnouncement),
    "getAllAnnouncements": (()=>getAllAnnouncements),
    "getAnnouncementById": (()=>getAnnouncementById),
    "postAnnouncement": (()=>postAnnouncement),
    "putAnnouncement": (()=>putAnnouncement)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/satellite/index.ts [app-client] (ecmascript)");
;
const postAnnouncement = async (body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/announcement", body);
    return res.data;
};
const getAllAnnouncements = async ()=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/announcement");
    return res.data;
};
const getAnnouncementById = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/announcement/${id}`);
    return res.data;
};
const putAnnouncement = async (id, body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/announcement/${id}`, body);
    return res.data;
};
const deleteAnnouncement = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/announcement/${id}`);
    return res.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/coalesce.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "coalesce": (()=>coalesce)
});
function coalesce(task) {
    const pending = new Map();
    return async (...args)=>{
        const key = JSON.stringify(args);
        const running = pending.get(key);
        if (running) {
            running.queued = true;
            return;
        }
        const entry = {
            queued: false
        };
        pending.set(key, entry);
        try {
            do {
                entry.queued = false;
                await task(...args).catch(()=>undefined);
            }while (entry.queued)
        } finally{
            pending.delete(key);
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/store/useAnnouncementStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/announcement/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/coalesce.ts [app-client] (ecmascript)");
;
;
;
const initialState = {
    isLoading: false,
    error: null,
    announcementsData: [],
    announcementData: null,
    message: null
};
const useAnnouncementStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialState,
        addAnnouncement: async (body)=>{
            set({
                isLoading: true,
                error: null,
                message: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postAnnouncement"])(body);
                if (res.status) {
                    set({
                        message: res.message
                    });
                    return true;
                }
                set({
                    error: res.message
                });
                return false;
            } catch (error) {
                set({
                    error: error?.message ?? "Terjadi kesalahan"
                });
                return false;
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        updateAnnouncement: async (id, body)=>{
            set({
                isLoading: true,
                error: null,
                message: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["putAnnouncement"])(id, body);
                if (res.status) {
                    set({
                        message: res.message
                    });
                    await get().getAllAnnouncements();
                    return true;
                }
                set({
                    error: res.message
                });
                return false;
            } catch (error) {
                set({
                    error: error?.message ?? "Terjadi kesalahan"
                });
                return false;
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        removeAnnouncement: async (id)=>{
            set({
                isLoading: true,
                error: null,
                message: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteAnnouncement"])(id);
                if (res.status) {
                    set({
                        message: res.message
                    });
                    await get().getAllAnnouncements();
                    return true;
                }
                set({
                    error: res.message
                });
                return false;
            } catch (error) {
                set({
                    error: error?.message ?? "Terjadi kesalahan"
                });
                return false;
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        getAllAnnouncements: async ()=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllAnnouncements"])();
                if (res.status && res.data) {
                    set({
                        announcementsData: res.data
                    });
                } else {
                    set({
                        error: res.message
                    });
                }
            } catch (error) {
                set({
                    error: error?.message ?? "Terjadi kesalahan"
                });
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        refreshAllAnnouncements: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(async ()=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllAnnouncements"])();
            if (res.status && res.data) set({
                announcementsData: res.data
            });
        }),
        refreshAnnouncementById: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(async (id)=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnnouncementById"])(id);
            if (get().announcementData?.id === id && res.status && res.data) {
                set({
                    announcementData: res.data
                });
            }
        }),
        getAnnouncementById: async (id)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnnouncementById"])(id);
                if (res.status && res.data) {
                    set({
                        announcementData: res.data
                    });
                } else {
                    set({
                        error: res.message
                    });
                }
            } catch (error) {
                set({
                    error: error?.message ?? "Terjadi kesalahan"
                });
            } finally{
                set({
                    isLoading: false
                });
            }
        }
    }));
const __TURBOPACK__default__export__ = useAnnouncementStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/realtime/events.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "subscribeRealtime": (()=>subscribeRealtime)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/satellite/index.ts [app-client] (ecmascript)");
;
const RETRY_BASE_MS = 1_000;
const RETRY_MAX_MS = 30_000;
const IDLE_TIMEOUT_MS = 60_000;
const STOP_DELAY_MS = 5_000;
const EXPIRED_TOKEN_MESSAGE = "jwt expired";
const listeners = new Set();
let connection = null;
let stopTimer;
const wait = (ms, signal)=>new Promise((resolve)=>{
        if (signal.aborted) return resolve();
        const timer = setTimeout(resolve, ms);
        signal.addEventListener("abort", ()=>{
            clearTimeout(timer);
            resolve();
        }, {
            once: true
        });
    });
const parseData = (raw)=>{
    try {
        const data = JSON.parse(raw ?? "{}");
        return data && typeof data === "object" ? data : {};
    } catch  {
        return {};
    }
};
const emit = (event)=>listeners.forEach((listener)=>queueMicrotask(()=>listener(event)));
async function connect(signal) {
    const open = (token)=>fetch(`${("TURBOPACK compile-time value", "http://localhost:3000")}/events`, {
            headers: {
                Accept: "text/event-stream",
                ...token ? {
                    Authorization: `Bearer ${token}`
                } : {}
            },
            cache: "no-store",
            signal
        });
    let response = await open(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRequestToken"])());
    if (!response.ok) {
        const message = (await response.json().catch(()=>null))?.message;
        const token = message === EXPIRED_TOKEN_MESSAGE ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshOnce"])() : undefined;
        if (token) response = await open(token);
    }
    if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.body;
}
async function readEvents(body, onEvent) {
    const reader = body.pipeThrough(new TextDecoderStream()).getReader();
    let idleTimer;
    let buffer = "";
    const resetIdleTimer = ()=>{
        clearTimeout(idleTimer);
        idleTimer = setTimeout(()=>reader.cancel(), IDLE_TIMEOUT_MS);
    };
    try {
        for(resetIdleTimer();; resetIdleTimer()){
            const { value, done } = await reader.read();
            if (done) return;
            buffer += value;
            let boundary;
            while((boundary = buffer.indexOf("\n\n")) !== -1){
                const block = buffer.slice(0, boundary);
                buffer = buffer.slice(boundary + 2);
                const type = block.match(/^event: ?(.*)$/m)?.[1];
                const data = block.match(/^data: ?(.*)$/m)?.[1];
                if (type) onEvent({
                    type,
                    data: parseData(data)
                });
            }
        }
    } finally{
        clearTimeout(idleTimer);
    }
}
async function run(signal) {
    let failures = 0;
    while(!signal.aborted){
        try {
            const body = await connect(signal);
            await readEvents(body, (event)=>{
                failures = 0;
                if (event.type !== "ping") emit(event);
            });
        } catch  {
            if (signal.aborted) return;
            failures += 1;
        }
        await wait(Math.min(RETRY_BASE_MS * 2 ** failures, RETRY_MAX_MS), signal);
    }
}
function subscribeRealtime(listener) {
    listeners.add(listener);
    clearTimeout(stopTimer);
    if (!connection) {
        connection = new AbortController();
        run(connection.signal);
    }
    return ()=>{
        listeners.delete(listener);
        if (listeners.size > 0) return;
        clearTimeout(stopTimer);
        stopTimer = setTimeout(()=>{
            connection?.abort();
            connection = null;
        }, STOP_DELAY_MS);
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/hooks/useRealtimeEvents.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>useRealtimeEvents)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$realtime$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/realtime/events.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useRealtimeEvents(onEvent) {
    _s();
    const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onEvent);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRealtimeEvents.useEffect": ()=>{
            handler.current = onEvent;
        }
    }["useRealtimeEvents.useEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRealtimeEvents.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$realtime$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeRealtime"])({
                "useRealtimeEvents.useEffect": (event)=>handler.current(event)
            }["useRealtimeEvents.useEffect"])
    }["useRealtimeEvents.useEffect"], []);
}
_s(useRealtimeEvents, "eY+dvYTNrnXzH1jlF+mt8POmdSk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/dashboard/pengumuman/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AnnouncementDetails)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAnnouncementStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useAnnouncementStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useRealtimeEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useRealtimeEvents.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AnnouncementDetails() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { getAnnouncementById, refreshAnnouncementById, announcementData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAnnouncementStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnnouncementDetails.useEffect": ()=>{
            getAnnouncementById(params.id);
        }
    }["AnnouncementDetails.useEffect"], [
        getAnnouncementById,
        params.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useRealtimeEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "AnnouncementDetails.useRealtimeEvents": ({ type, data })=>{
            if (type === "ready") refreshAnnouncementById(params.id);
            if (type !== "announcement" || data.announcement_id !== params.id) return;
            if (data.action === "deleted") {
                router.replace("/dashboard/pengumuman/list-pengumuman");
            } else {
                refreshAnnouncementById(params.id);
            }
        }
    }["AnnouncementDetails.useRealtimeEvents"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full overflow-auto overscroll-contain",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-10 text-[22px] font-bold text-[#1D1D1D]",
                    children: announcementData?.title
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-10 text-[18px] font-semibold text-[#1D1D1D]",
                    children: announcementData?.body
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "my-10 h-[1px] w-full bg-[#1D1D1D]/20"
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-full flex-col space-y-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-row justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "w-1/3 text-lg font-bold text-[#1D1D1D]/50",
                                children: "Tanggal / Waktu Posting"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "w-1/3 text-lg font-bold text-[#1D1D1D]",
                                children: announcementData?.created_at
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/pengumuman/[id]/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(AnnouncementDetails, "+CNHQ4UpaIgPZGyIQQZmRB7zUHA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAnnouncementStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useRealtimeEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = AnnouncementDetails;
var _c;
__turbopack_context__.k.register(_c, "AnnouncementDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_d396482c._.js.map