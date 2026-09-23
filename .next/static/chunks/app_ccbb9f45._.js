(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/components/success-dialog.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SuccessDialog)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$button$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/button/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
;
function SuccessDialog({ dialogOpen, onClose, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        onClose: onClose,
        open: dialogOpen,
        as: "div",
        className: `relative z-10 focus:outline-none`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                className: "fixed inset-0 bg-black/30"
            }, void 0, false, {
                fileName: "[project]/app/components/success-dialog.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-10 w-screen overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-full items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPanel"], {
                        transition: true,
                        className: `data-[closed]:transform-[scale(95%)] flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-[#E8FFF3] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-[100px] w-full self-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/success.png",
                                    alt: "success",
                                    fill: true,
                                    style: {
                                        objectFit: "contain"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/success-dialog.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/success-dialog.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                as: "h3",
                                className: "mt-3 w-full self-center text-center text-xl font-extrabold text-[#1D1D1D]",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/components/success-dialog.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$button$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white",
                                    onClick: onClose,
                                    children: "Tutup"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/success-dialog.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/success-dialog.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/success-dialog.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/success-dialog.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/success-dialog.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/success-dialog.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = SuccessDialog;
var _c;
__turbopack_context__.k.register(_c, "SuccessDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/meeting/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "deleteStudentAttendance": (()=>deleteStudentAttendance),
    "getMeetingQrToken": (()=>getMeetingQrToken),
    "getMeetings": (()=>getMeetings),
    "postMeeting": (()=>postMeeting),
    "putMeetingStatus": (()=>putMeetingStatus),
    "putStudentAttendance": (()=>putStudentAttendance)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/satellite/index.ts [app-client] (ecmascript)");
;
const postMeeting = async (body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/meeting", body);
    return res.data;
};
const getMeetings = async (classId)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/meeting/${classId}`);
    return res.data;
};
const getMeetingQrToken = async (meetingId)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/meeting/${meetingId}/qr`);
    return res.data;
};
const putMeetingStatus = async (meetingId, body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/meeting/${meetingId}/status`, body);
    return res.data;
};
const putStudentAttendance = async (meetingId, userId, body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/meeting/${meetingId}/attendances/${userId}`, body);
    return res.data;
};
const deleteStudentAttendance = async (meetingId, userId)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/meeting/${meetingId}/attendances/${userId}`);
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
"[project]/app/store/useMeetingStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$meeting$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/meeting/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/coalesce.ts [app-client] (ecmascript)");
;
;
;
const initialState = {
    isLoading: false,
    error: null,
    meetingsData: [],
    meetingsClassId: null,
    message: null,
    qrToken: null,
    qrError: null
};
const useMeetingStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialState,
        getMeetings: async (classId)=>{
            set({
                isLoading: true,
                error: null,
                meetingsClassId: classId
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$meeting$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMeetings"])(classId);
                if (res.status && res.data) {
                    set({
                        meetingsData: res.data
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
        refreshMeetings: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(async (classId)=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$meeting$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMeetings"])(classId);
            if (get().meetingsClassId === classId && res.status && res.data) {
                set({
                    meetingsData: res.data
                });
            }
        }),
        getQrToken: async (meetingId)=>{
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$meeting$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMeetingQrToken"])(meetingId);
                if (res.status && res.data) {
                    set({
                        qrToken: {
                            meetingId,
                            token: res.data.token,
                            periodSeconds: res.data.period_seconds,
                            expiresAt: Date.now() + res.data.expires_in_ms
                        },
                        qrError: null
                    });
                } else {
                    set({
                        qrToken: null,
                        qrError: res.message
                    });
                }
            } catch (error) {
                set({
                    qrToken: null,
                    qrError: error?.message ?? "Terjadi kesalahan"
                });
            }
        },
        clearQrToken: ()=>{
            set({
                qrToken: null,
                qrError: null
            });
        },
        addMeeting: async (body)=>{
            set({
                isLoading: true,
                error: null,
                message: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$meeting$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postMeeting"])(body);
                if (res.status) {
                    set({
                        message: res.message
                    });
                    await get().getMeetings(body.classId);
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
        updateMeetingStatus: async (meetingId, status, classId)=>{
            set({
                isLoading: true,
                error: null,
                message: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$meeting$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["putMeetingStatus"])(meetingId, {
                    status
                });
                if (res.status) {
                    set({
                        message: res.message
                    });
                    await get().getMeetings(classId);
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
        updateStudentAttendance: async (meetingId, userId, status, classId)=>{
            set({
                isLoading: true,
                error: null,
                message: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$meeting$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["putStudentAttendance"])(meetingId, userId, {
                    status
                });
                if (res.status) {
                    set({
                        message: res.message
                    });
                    await get().getMeetings(classId);
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
        resetStudentAttendance: async (meetingId, userId, classId)=>{
            set({
                isLoading: true,
                error: null,
                message: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$meeting$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteStudentAttendance"])(meetingId, userId);
                if (res.status) {
                    set({
                        message: res.message
                    });
                    await get().getMeetings(classId);
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
const __TURBOPACK__default__export__ = useMeetingStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/praktikum/add-meeting-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AddMeetingButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$success$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/success-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useMeetingStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AddMeetingButton({ classId }) {
    _s();
    const [isAddMeetingOpen, setIsAddMeetingOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [meetingName, setMeetingName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dialogError, setDialogError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { addMeeting, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const openDialog = ()=>{
        setMeetingName("");
        setDialogError("");
        setIsAddMeetingOpen(true);
    };
    const handleSave = async ()=>{
        if (!classId) {
            setDialogError("Kelas tidak ditemukan!");
            return;
        }
        if (meetingName.trim() === "") {
            setDialogError("Judul pertemuan wajib diisi!");
            return;
        }
        await addMeeting({
            classId,
            meetingName: meetingName.trim()
        });
        const { error, message } = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getState();
        if (error) {
            setDialogError(error);
            return;
        }
        setIsAddMeetingOpen(false);
        setMeetingName("");
        setSuccessMessage(message ?? "Pertemuan berhasil ditambahkan");
        setIsSuccessDialogOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: openDialog,
                className: "h-fit content-center rounded-full bg-[#D2E3F1] p-3 text-sm font-semibold text-[#3272CA]",
                children: "Tambah Pertemuan"
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                onClose: ()=>setIsAddMeetingOpen(false),
                open: isAddMeetingOpen,
                className: "relative z-50 h-full w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                        className: "fixed inset-0 bg-black/30"
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 flex h-full w-screen items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPanel"], {
                            className: "flex h-2/4 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "font-bold text-[#1d1d1d]",
                                    children: "Tambah Pertemuan Praktikum"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full w-full flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                                            className: "w-full space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-base font-semibold text-[#5E6278]",
                                                    children: [
                                                        "Judul Pertemuan",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-light text-gray-500",
                                                            children: "e.g Pertemuan 1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                                            lineNumber: 82,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    required: true,
                                                    className: "h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]",
                                                    placeholder: "Judul pertemuan",
                                                    onChange: (e)=>{
                                                        setMeetingName(e.target.value);
                                                        setDialogError("");
                                                    },
                                                    value: meetingName
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 17
                                                }, this),
                                                dialogError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-[#F1416C]",
                                                    children: dialogError
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full flex-col justify-end",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSave,
                                                disabled: isLoading,
                                                className: "h-fit w-1/3 self-end rounded-full bg-[#D2E3F1] py-3 font-bold text-[#3272CA] disabled:bg-gray-300 disabled:text-white",
                                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "loading loading-dots loading-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 21
                                                }, this) : "Simpan"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$success$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                dialogOpen: isSuccessDialogOpen,
                onClose: ()=>setIsSuccessDialogOpen(false),
                title: successMessage
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/add-meeting-button.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AddMeetingButton, "znc0/bBISDGXnD6VI2eBc9zax64=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = AddMeetingButton;
var _c;
__turbopack_context__.k.register(_c, "AddMeetingButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/meetings-dropdown.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MeetingsDropDown)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/listbox/listbox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useMeetingStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function MeetingsDropDown({ onMeetingSelected }) {
    _s();
    const [selectedMeeting, setSelectedMeeting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const { meetingsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const handleSelectedMeeting = (meetingId)=>{
        setSelectedMeeting(meetingId);
        if (onMeetingSelected) onMeetingSelected(meetingId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Listbox"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxButton"], {
                value: selectedMeeting,
                className: `flex h-fit flex-row content-center items-center space-x-4 rounded-full bg-[#D2E3F1] p-3 text-sm font-semibold text-[#3272CA]`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            selectedMeeting && meetingsData?.find((meeting)=>meeting.id === selectedMeeting)?.meeting_name,
                            !selectedMeeting && "Pilih Pertemuan"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/meetings-dropdown.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative size-[20px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/down-blue.png",
                            alt: "chevron down",
                            fill: true,
                            style: {
                                objectFit: "contain"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/components/meetings-dropdown.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/meetings-dropdown.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/meetings-dropdown.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOptions"], {
                anchor: "bottom",
                className: `mt-1 w-[var(--button-width)] rounded-2xl bg-[#D2E3F1] text-sm font-semibold text-[#3272CA]`,
                children: meetingsData && meetingsData.map((meeting)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOption"], {
                        as: "button",
                        onClick: ()=>handleSelectedMeeting(meeting.id),
                        value: meeting.id,
                        className: `w-full p-3 hover:bg-[#3272CA] hover:text-white`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "w-full items-center",
                            children: meeting.meeting_name
                        }, void 0, false, {
                            fileName: "[project]/app/components/meetings-dropdown.tsx",
                            lineNumber: 62,
                            columnNumber: 17
                        }, this)
                    }, meeting.id, false, {
                        fileName: "[project]/app/components/meetings-dropdown.tsx",
                        lineNumber: 55,
                        columnNumber: 15
                    }, this)).reverse()
            }, void 0, false, {
                fileName: "[project]/app/components/meetings-dropdown.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/meetings-dropdown.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(MeetingsDropDown, "9C4sO/xu+Skg/BfUZEwIuIvtM+Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = MeetingsDropDown;
var _c;
__turbopack_context__.k.register(_c, "MeetingsDropDown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/error-dialog.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ErrorDialog)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$button$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/button/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
;
function ErrorDialog({ dialogOpen, onClose, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        onClose: onClose,
        open: dialogOpen,
        as: "div",
        className: `relative z-10 focus:outline-none`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                className: "fixed inset-0 bg-black/30"
            }, void 0, false, {
                fileName: "[project]/app/components/error-dialog.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-10 w-screen overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-full items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPanel"], {
                        transition: true,
                        className: `data-[closed]:transform-[scale(95%)] flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-[#FF0000] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-[100px] w-full self-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/error.png",
                                    alt: "error",
                                    fill: true,
                                    style: {
                                        objectFit: "contain"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/error-dialog.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/error-dialog.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                as: "h3",
                                className: "mt-3 w-full self-center text-center text-xl font-extrabold text-white",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/components/error-dialog.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$button$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "data-[hover]:bg-white-600 inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-[#FF0000] shadow-inner shadow-white/10 focus:outline-none data-[open]:bg-white",
                                    onClick: onClose,
                                    children: "Tutup"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/error-dialog.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/error-dialog.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/error-dialog.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/error-dialog.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/error-dialog.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/error-dialog.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = ErrorDialog;
var _c;
__turbopack_context__.k.register(_c, "ErrorDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/open-attendance-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>OpenAttendancesButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$success$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/success-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$error$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/error-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useMeetingStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function OpenAttendancesButton({ classId, meeting, selectedMeeting }) {
    _s();
    const { updateMeetingStatus, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const [dialogMessage, setDialogMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentMeeting = meeting?.find((m)=>m.id === selectedMeeting);
    const isOpen = currentMeeting?.is_open === true;
    const isDisabled = !classId || !currentMeeting || isLoading;
    const handleToggleAttendance = async ()=>{
        if (!classId || !currentMeeting) return;
        await updateMeetingStatus(currentMeeting.id, !isOpen, classId);
        const { error, message } = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getState();
        if (error) {
            setDialogMessage(error);
            setIsErrorDialogOpen(true);
        } else {
            setDialogMessage(message ?? "Berhasil");
            setIsSuccessDialogOpen(true);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleToggleAttendance,
                disabled: isDisabled,
                className: `h-fit content-center rounded-full p-3 text-sm font-semibold text-white ${isDisabled ? "cursor-not-allowed bg-[#B5B5C3]" : isOpen ? "bg-[#F1416C]" : "bg-[#3272CA]"}`,
                children: isLoading ? "Memproses..." : isOpen ? "Tutup Presensi" : "Buka Presensi"
            }, void 0, false, {
                fileName: "[project]/app/components/open-attendance-button.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$success$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                dialogOpen: isSuccessDialogOpen,
                onClose: ()=>setIsSuccessDialogOpen(false),
                title: dialogMessage
            }, void 0, false, {
                fileName: "[project]/app/components/open-attendance-button.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$error$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                dialogOpen: isErrorDialogOpen,
                onClose: ()=>setIsErrorDialogOpen(false),
                title: dialogMessage
            }, void 0, false, {
                fileName: "[project]/app/components/open-attendance-button.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(OpenAttendancesButton, "cQA5TvhdbjB9LqHckTptuxSjeiY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = OpenAttendancesButton;
var _c;
__turbopack_context__.k.register(_c, "OpenAttendancesButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/praktikum/show-qr-code-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ShowQrCodeButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-qr-code/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useMeetingStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const REFRESH_DELAY_MS = 300;
const RETRY_DELAY_MS = 3000;
function ShowQrCodeButton({ meetingId, meetingName }) {
    _s();
    const [isQrDialogOpen, setIsQrDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsQrDialogOpen(true),
                className: "flex flex-row items-center space-x-3 rounded-2xl bg-[#FFBF01] p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    alt: "QR Code Icon",
                    src: "/qr.png",
                    width: 32,
                    height: 32
                }, void 0, false, {
                    fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                onClose: ()=>setIsQrDialogOpen(false),
                open: isQrDialogOpen,
                className: "relative z-50 h-full w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                        className: "fixed inset-0 bg-black/30"
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 flex h-full w-screen items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPanel"], {
                            className: "flex h-3/4 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "font-bold text-[#1d1d1d]",
                                    children: [
                                        "Kode QR Presensi",
                                        meetingName && ` · ${meetingName}`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RotatingQrCode, {
                                    meetingId: meetingId
                                }, void 0, false, {
                                    fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ShowQrCodeButton, "4xfoga81PPCuRfQRpWeU47IiBeI=");
_c = ShowQrCodeButton;
function RotatingQrCode({ meetingId }) {
    _s1();
    const { qrToken, qrError, getQrToken, clearQrToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "RotatingQrCode.useState": ()=>Date.now()
    }["RotatingQrCode.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RotatingQrCode.useEffect": ()=>{
            let timer;
            let isActive = true;
            const refresh = {
                "RotatingQrCode.useEffect.refresh": async ()=>{
                    await getQrToken(meetingId);
                    if (!isActive) return;
                    const { qrToken } = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getState();
                    const delay = qrToken ? Math.max(qrToken.expiresAt - Date.now(), 0) + REFRESH_DELAY_MS : RETRY_DELAY_MS;
                    timer = setTimeout(refresh, delay);
                }
            }["RotatingQrCode.useEffect.refresh"];
            clearQrToken();
            refresh();
            return ({
                "RotatingQrCode.useEffect": ()=>{
                    isActive = false;
                    clearTimeout(timer);
                    clearQrToken();
                }
            })["RotatingQrCode.useEffect"];
        }
    }["RotatingQrCode.useEffect"], [
        meetingId,
        getQrToken,
        clearQrToken
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RotatingQrCode.useEffect": ()=>{
            const interval = setInterval({
                "RotatingQrCode.useEffect.interval": ()=>setNow(Date.now())
            }["RotatingQrCode.useEffect.interval"], 250);
            return ({
                "RotatingQrCode.useEffect": ()=>clearInterval(interval)
            })["RotatingQrCode.useEffect"];
        }
    }["RotatingQrCode.useEffect"], []);
    const current = qrToken?.meetingId === meetingId ? qrToken : null;
    if (!current) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full w-full items-center justify-center text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: qrError ? "font-semibold text-[#F1416C]" : "text-[#5E6278]",
                children: qrError ?? "Memuat kode QR..."
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    }
    const periodMs = current.periodSeconds * 1000;
    const remainingMs = Math.min(Math.max(current.expiresAt - now, 0), periodMs);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full flex-col items-center justify-center space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                value: current.token
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-64 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 w-full overflow-hidden rounded-full bg-[#F1F1F2]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full bg-[#3272CA] transition-[width] duration-200 ease-linear",
                            style: {
                                width: `${remainingMs / periodMs * 100}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-sm text-[#5E6278]",
                        children: remainingMs > 0 ? `QR berganti dalam ${Math.ceil(remainingMs / 1000)} detik` : "Memperbarui QR..."
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/praktikum/show-qr-code-button.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s1(RotatingQrCode, "Uef0BlYFACj6VbjOLFqVSvo4lUM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c1 = RotatingQrCode;
var _c, _c1;
__turbopack_context__.k.register(_c, "ShowQrCodeButton");
__turbopack_context__.k.register(_c1, "RotatingQrCode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/student-attendance-edit-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>StudentAttendanceEditButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$switch$2f$switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/switch/switch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useMeetingStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function StudentAttendanceEditButton({ student, meetingId, classId }) {
    _s();
    const { updateStudentAttendance, resetStudentAttendance, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const [isDialogOpen, setIsDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [presenceStatus, setPresenceStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const hasRecord = student.submitted_at !== null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentAttendanceEditButton.useEffect": ()=>{
            if (isDialogOpen) {
                setPresenceStatus(hasRecord && student.is_attended === true);
                setErrorMessage("");
            }
        }
    }["StudentAttendanceEditButton.useEffect"], [
        isDialogOpen,
        hasRecord,
        student.is_attended
    ]);
    const handleSave = async ()=>{
        await updateStudentAttendance(meetingId, student.student_id, presenceStatus, classId);
        const { error } = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getState();
        if (error) {
            setErrorMessage(error);
            return;
        }
        setIsDialogOpen(false);
    };
    const handleReset = async ()=>{
        await resetStudentAttendance(meetingId, student.student_id, classId);
        const { error } = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getState();
        if (error) {
            setErrorMessage(error);
            return;
        }
        setIsDialogOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsDialogOpen(true),
                className: "relative flex h-6 w-2/12 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/edit-blue.png",
                    alt: "action",
                    fill: true,
                    style: {
                        objectFit: "contain"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                onClose: ()=>setIsDialogOpen(false),
                open: isDialogOpen,
                className: "relative z-50 h-full w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                        className: "fixed inset-0 bg-black/30"
                    }, void 0, false, {
                        fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 flex h-full w-screen items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPanel"], {
                            className: "flex h-3/5 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "font-bold text-[#1d1d1d]",
                                    children: "Ubah Status Presensi Mahasiswa"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full w-full flex-col justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full w-full flex-col space-y-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-semibold text-[#5E6278]",
                                                            children: "NIM"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-bold text-[#1D1D1D]",
                                                            children: student.nim
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                            lineNumber: 101,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-semibold text-[#5E6278]",
                                                            children: "Nama Lengkap"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-bold text-[#1D1D1D]",
                                                            children: student.student_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-semibold text-[#5E6278]",
                                                            children: "Status Presensi"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 flex flex-row items-center space-x-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-bold text-[#1D1D1D]",
                                                                    children: "Tidak Hadir"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                                    lineNumber: 118,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$switch$2f$switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                                    checked: presenceStatus,
                                                                    onChange: setPresenceStatus,
                                                                    className: "group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#D9D9D9] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-[#3272CA] data-[focus]:outline-1 data-[focus]:outline-white",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        "aria-hidden": "true",
                                                                        className: "pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-[white] shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                                        lineNumber: 126,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-bold text-[#1D1D1D]",
                                                                    children: "Hadir"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                                    lineNumber: 131,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 17
                                                }, this),
                                                errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-[#F1416C]",
                                                    children: errorMessage
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSave,
                                                    disabled: isLoading,
                                                    className: "w-full rounded-full bg-[#D2E3F1] p-4 font-semibold text-[#3272CA] disabled:opacity-50",
                                                    children: isLoading ? "Menyimpan..." : "Simpan Perubahan"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this),
                                                hasRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleReset,
                                                    disabled: isLoading,
                                                    className: "w-full rounded-full bg-[#FFF5F8] p-4 font-semibold text-[#F1416C] disabled:opacity-50",
                                                    children: "Kembalikan ke Belum Presensi"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/student-attendance-edit-button.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(StudentAttendanceEditButton, "Gpn1Ej340jy4lMCHxMPAi2iuU6U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = StudentAttendanceEditButton;
var _c;
__turbopack_context__.k.register(_c, "StudentAttendanceEditButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/attendance.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getAttendanceStatus": (()=>getAttendanceStatus),
    "statusStyle": (()=>statusStyle)
});
const statusStyle = {
    Hadir: "bg-[#E8FFF3] text-[#50CD89]",
    "Tidak Hadir": "bg-[#FFF5F8] text-[#F1416C]",
    "Belum Presensi": "bg-[#F1F1F2] text-[#181C32]"
};
const getAttendanceStatus = (student)=>{
    if (student.submitted_at === null) return "Belum Presensi";
    return student.is_attended ? "Hadir" : "Tidak Hadir";
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/praktikum/class-meetings-content.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ClassMeetingsContent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$add$2d$meeting$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/praktikum/add-meeting-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$meetings$2d$dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/meetings-dropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$open$2d$attendance$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/open-attendance-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$show$2d$qr$2d$code$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/praktikum/show-qr-code-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$student$2d$attendance$2d$edit$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/student-attendance-edit-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$attendance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/attendance.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function ClassMeetingsContent({ classId, meetingData }) {
    _s();
    const [selectedMeeting, setSelectedMeeting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const currentMeeting = meetingData?.find((meeting)=>meeting.id === selectedMeeting);
    const students = currentMeeting?.students ?? [];
    const attendedCount = students.filter((student)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$attendance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttendanceStatus"])(student) === "Hadir").length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full flex-row justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-1/6 flex-row space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$add$2d$meeting$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                classId: classId
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$meetings$2d$dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onMeetingSelected: setSelectedMeeting
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-1/6 flex-row space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$open$2d$attendance$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                classId: classId,
                                meeting: meetingData,
                                selectedMeeting: selectedMeeting
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: {
                                    pathname: "recap-attendances",
                                    query: {
                                        classId: classId
                                    }
                                },
                                className: "h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white",
                                children: "Rekap All"
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            !selectedMeeting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full flex-1 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Pilih Pertemuan untuk Melihat Daftar Presensi! "
                }, void 0, false, {
                    fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            selectedMeeting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex-1 space-y-10 rounded-[20px] bg-white p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-row items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-row items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$show$2d$qr$2d$code$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        meetingId: selectedMeeting,
                                        meetingName: currentMeeting?.meeting_name
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: {
                                            pathname: "recap-attendances",
                                            query: {
                                                classId: classId,
                                                meetingId: selectedMeeting
                                            }
                                        },
                                        "aria-disabled": selectedMeeting === "" || !selectedMeeting,
                                        className: selectedMeeting === "" || !selectedMeeting ? "pointer-events-none" : "flex flex-row items-center space-x-3 rounded-2xl bg-[#3272CA] p-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            alt: "QR Code Icon",
                                            src: "/pdf.png",
                                            width: 32,
                                            height: 32
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base font-bold",
                                        children: currentMeeting?.meeting_name
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `rounded-md p-2 text-xs font-semibold ${currentMeeting?.is_open ? "bg-[#E8FFF3] text-[#50CD89]" : "bg-[#F1F1F2] text-[#181C32]"}`,
                                        children: currentMeeting?.is_open ? "Presensi Dibuka" : "Presensi Ditutup"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base font-semibold text-[#5E6278]",
                                children: [
                                    "Jumlah hadir ",
                                    attendedCount,
                                    "/",
                                    students.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "recap-attendances",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full flex-row border-b border-[#F1F1F2] pb-3 text-base font-bold text-[#5E6278]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "flex w-2/12 items-center justify-center",
                                        children: "NIM"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "flex w-5/12 items-center justify-center",
                                        children: "Nama"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "flex w-3/12 items-center justify-center",
                                        children: "Presensi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex w-2/12 items-center justify-center"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            students.map((student)=>{
                                const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$attendance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttendanceStatus"])(student);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex w-full flex-row items-center border-b border-[#F1F1F2] py-3 text-base font-semibold text-[#5E6278] last:border-b-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex w-2/12 items-center justify-center",
                                            children: student.nim
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex w-5/12 items-center justify-center",
                                            children: student.student_name
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex w-3/12 items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `rounded-md p-2 text-sm font-semibold ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$attendance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statusStyle"][status]}`,
                                                children: status
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                                lineNumber: 139,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                            lineNumber: 138,
                                            columnNumber: 19
                                        }, this),
                                        classId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$student$2d$attendance$2d$edit$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            student: student,
                                            meetingId: selectedMeeting,
                                            classId: classId
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                            lineNumber: 146,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, student.student_id, true, {
                                    fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-meetings-content.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ClassMeetingsContent, "oCGv8lZ/ngNWrPZTiWvoiHzY4N4=");
_c = ClassMeetingsContent;
var _c;
__turbopack_context__.k.register(_c, "ClassMeetingsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/praktikum/class-title-header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ClassTitleHeader = ({ data })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-full flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[18px] font-semibold text-[#5E6278]",
                children: [
                    "Semester ",
                    data.semester
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-title-header.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[32px] font-bold text-black",
                children: [
                    "Praktikum ",
                    data.subject_name
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-title-header.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/praktikum/class-title-header.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
_c = ClassTitleHeader;
const __TURBOPACK__default__export__ = ClassTitleHeader;
var _c;
__turbopack_context__.k.register(_c, "ClassTitleHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/day.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DAY_LABELS": (()=>DAY_LABELS),
    "formatDay": (()=>formatDay)
});
const DAY_LABELS = {
    MONDAY: "Senin",
    TUESDAY: "Selasa",
    WEDNESDAY: "Rabu",
    THURSDAY: "Kamis",
    FRIDAY: "Jumat"
};
const formatDay = (day)=>day ? DAY_LABELS[day] ?? day : "";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/user/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getAsisten": (()=>getAsisten),
    "getDosen": (()=>getDosen)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/satellite/index.ts [app-client] (ecmascript)");
;
const getDosen = async ()=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/user/dosen`);
    return res.data;
};
const getAsisten = async (query)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/user/asisten?name=${query}`);
    return res.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/store/useAsistenStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$user$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/user/api.ts [app-client] (ecmascript)");
;
;
const initialState = {
    isLoading: false,
    error: null,
    asistenData: [],
    query: undefined
};
const useAsistenStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialState,
        setQuery: (query)=>set({
                query
            }),
        getAsisten: async ()=>{
            const { query } = get();
            set({
                isLoading: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$user$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAsisten"])(query);
                if (res.status && res.data) {
                    set({
                        asistenData: res.data
                    });
                } else {
                    set({
                        error: res.message
                    });
                }
            } catch  {
                console.log(get().error);
            } finally{
                set({
                    isLoading: false
                });
            }
        }
    }));
const __TURBOPACK__default__export__ = useAsistenStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/class-assistants.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ClassAssistantsComboBox)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/combobox/combobox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAsistenStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useAsistenStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function ClassAssistantsComboBox({ onClassAssistantsChange, value }) {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { getAsisten, asistenData, setQuery } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAsistenStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClassAssistantsComboBox.useEffect": ()=>{
            getAsisten();
        }
    }["ClassAssistantsComboBox.useEffect"], [
        getAsisten
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClassAssistantsComboBox.useEffect": ()=>{
            const selectedUsers = asistenData.filter({
                "ClassAssistantsComboBox.useEffect.selectedUsers": (user)=>value.includes(user)
            }["ClassAssistantsComboBox.useEffect.selectedUsers"]);
            setSelected(selectedUsers);
        }
    }["ClassAssistantsComboBox.useEffect"], [
        value,
        asistenData
    ]);
    const handleOnAsistenChange = (selected)=>{
        const isExist = value.find((user)=>user.id === selected.id);
        if (!isExist) {
            onClassAssistantsChange([
                ...value,
                selected
            ]);
        } else {
            return;
        }
    };
    const removeAsisten = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClassAssistantsComboBox.useCallback[removeAsisten]": (selected)=>{
            const updatedCollaboratorsList = value.filter({
                "ClassAssistantsComboBox.useCallback[removeAsisten].updatedCollaboratorsList": (user)=>user.id !== selected.id
            }["ClassAssistantsComboBox.useCallback[removeAsisten].updatedCollaboratorsList"]);
            if (updatedCollaboratorsList.length !== value.length) {
                onClassAssistantsChange(updatedCollaboratorsList);
            }
        }
    }["ClassAssistantsComboBox.useCallback[removeAsisten]"], [
        onClassAssistantsChange,
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "block w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                onChange: (value)=>handleOnAsistenChange(value),
                onClose: ()=>setQuery(""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                alt: "search icon",
                                src: "/search.png",
                                width: 24,
                                height: 24,
                                className: "absolute inset-y-3.5 left-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/class-assistants.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxInput"], {
                                className: `h-[54px] w-full rounded-2xl bg-[#f5f5f5] pl-14 focus:outline-[#3272CA]`,
                                onChange: (event)=>setQuery(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/class-assistants.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxButton"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/down.png",
                                    alt: "chevron down",
                                    width: 24,
                                    height: 24,
                                    className: "absolute inset-y-3.5 right-3"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/class-assistants.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/class-assistants.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/class-assistants.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxOptions"], {
                        anchor: "bottom",
                        className: `w-[var(--input-width)] rounded-2xl`,
                        children: asistenData.map((asisten)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxOption"], {
                                value: asisten,
                                className: `flex w-full flex-row items-start bg-[#f5f5f5] p-4 data-[focus]:bg-[#3272CA] data-[focus]:text-white`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "h-full w-full hover:bg-[#3272CA] hover:text-white",
                                    onClick: ()=>{
                                        handleOnAsistenChange(asisten);
                                    },
                                    children: asisten.fullname
                                }, void 0, false, {
                                    fileName: "[project]/app/components/class-assistants.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            }, asisten?.id, false, {
                                fileName: "[project]/app/components/class-assistants.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/class-assistants.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/class-assistants.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-6 flex h-full w-full flex-col space-y-6 px-10`,
                children: value.length !== 0 && value.map((asisten)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `h-[56px] w-full flex-row items-center justify-between ${asisten !== undefined ? "flex" : "hidden"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: asisten?.fullname
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/class-assistants.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: asisten?.nim
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/class-assistants.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/class-assistants.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>removeAsisten(asisten),
                                className: "relative h-[21.5px] w-[21.5px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/cross-square.png",
                                    alt: "delete assistants",
                                    fill: true,
                                    style: {
                                        objectFit: "contain"
                                    },
                                    className: "static"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/class-assistants.tsx",
                                    lineNumber: 126,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/class-assistants.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this)
                        ]
                    }, asisten?.id, true, {
                        fileName: "[project]/app/components/class-assistants.tsx",
                        lineNumber: 114,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/class-assistants.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/class-assistants.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(ClassAssistantsComboBox, "uU42R3fZl+Na5+Ib+8gs2YYQDSY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAsistenStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ClassAssistantsComboBox;
var _c;
__turbopack_context__.k.register(_c, "ClassAssistantsComboBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/collaborator/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getClassCollaborators": (()=>getClassCollaborators),
    "postCollaborators": (()=>postCollaborators)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/satellite/index.ts [app-client] (ecmascript)");
;
const postCollaborators = async (body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/collaborator", body);
    return res.data;
};
const getClassCollaborators = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/collaborator/${id}`);
    return res.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/store/useCollaboratorStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$collaborator$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/collaborator/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/coalesce.ts [app-client] (ecmascript)");
;
;
;
const initialState = {
    isLoading: false,
    error: null,
    collaboratorsData: []
};
const useCollaboratorStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialState,
        addClassCollaborators: async (body)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$collaborator$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postCollaborators"])(body);
                if (!res.status) {
                    set({
                        error: res.message
                    });
                }
            } catch  {
                console.log(get().error);
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        refreshClassCollaborators: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(async (id)=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$collaborator$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClassCollaborators"])(id);
            if (res.status && res.data) set({
                collaboratorsData: res.data
            });
        }),
        getClassCollaborators: async (id)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$collaborator$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClassCollaborators"])(id);
                if (res.status && res.data) {
                    set({
                        collaboratorsData: res.data
                    });
                } else {
                    set({
                        error: res.message
                    });
                }
            } catch  {
                console.log(get().error);
            } finally{
                set({
                    isLoading: false
                });
            }
        }
    }));
const __TURBOPACK__default__export__ = useCollaboratorStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/praktikum/add-collaborators-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AddCollaboratorsButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$class$2d$assistants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/class-assistants.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$success$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/success-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCollaboratorStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useCollaboratorStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function AddCollaboratorsButton({ classId }) {
    _s();
    const [isAddCollaboratorsOpen, setIsAddCollaboratorsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedCollaborators, setSelectedCollaborators] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { addClassCollaborators } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCollaboratorStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    // const addCollaborators = async (
    //   collaborators: string[],
    //   classId?: string,
    // ) => {
    //   setLoading(true);
    //   try {
    //     const response: any = await postCollaborators(collaborators, classId);
    //     if (response["status"] === "success") {
    //       setMessage(response["message"]);
    //       setIsSuccessDialogOpen(true);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setLoading(false);
    //     setIsAddCollaboratorsOpen(false);
    //   }
    // };
    const handleCollaboratorsChange = (value)=>{
        const validCollaborators = value.filter((collaborator)=>collaborator != null);
        setSelectedCollaborators(validCollaborators);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsAddCollaboratorsOpen(true),
                className: "relative size-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/edit.png",
                    alt: "Edit Collaborators",
                    fill: true,
                    style: {
                        objectFit: "contain"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                onClose: ()=>setIsAddCollaboratorsOpen(false),
                open: isAddCollaboratorsOpen,
                className: "relative z-50 h-full w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                        className: "fixed inset-0 bg-black/30"
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 flex h-full w-screen items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPanel"], {
                            className: "flex h-3/4 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "font-bold text-[#1d1d1d]",
                                    children: "Edit Kolaborator / Asisten"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$class$2d$assistants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    onClassAssistantsChange: handleCollaboratorsChange,
                                    value: selectedCollaborators
                                }, void 0, false, {
                                    fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full flex-col justify-end",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: selectedCollaborators.length === 0 ? true : false,
                                        onClick: ()=>{
                                            const collaboratorsId = selectedCollaborators.map((collaborator)=>collaborator.id);
                                            addClassCollaborators({
                                                classId: classId,
                                                collaborators: collaboratorsId
                                            });
                                        },
                                        className: "h-fit w-1/3 self-end rounded-full bg-[#D2E3F1] py-3 font-bold text-[#3272CA] disabled:bg-gray-300 disabled:text-white",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "loading loading-dots loading-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, this) : "Simpan"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$success$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                dialogOpen: isSuccessDialogOpen,
                onClose: ()=>setIsSuccessDialogOpen(false),
                title: message
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/add-collaborators-button.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AddCollaboratorsButton, "jsD6BNlr8F+YI7BAY+diQn8lE2A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCollaboratorStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = AddCollaboratorsButton;
var _c;
__turbopack_context__.k.register(_c, "AddCollaboratorsButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/praktikum/class-details-box.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$day$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/day.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$add$2d$collaborators$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/praktikum/add-collaborators-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useAuthStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const ClassDetailsBox = ({ data, assistant })=>{
    _s();
    const { userData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-[150px] w-full flex-row justify-between space-x-6 rounded-[20px] bg-white p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full flex-col space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[16px] font-semibold text-[#5E6278]",
                        children: "Hari, Jam"
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[18px] font-semibold text-black",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$day$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDay"])(data.day),
                            ", ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                lineNumber: 21,
                                columnNumber: 34
                            }, this),
                            " ",
                            data.startAt,
                            " - ",
                            data.endAt
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full flex-col space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[16px] font-semibold text-[#5E6278]",
                        children: "Dosen"
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[18px] font-semibold text-black",
                        children: data.lecturer
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full flex-col space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-row items-center justify-between space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[16px] font-semibold text-[#5E6278]",
                                children: "Asisten Praktikum"
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            userData?.role === "LABORAN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$add$2d$collaborators$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                classId: data.id
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col space-y-2",
                        children: [
                            assistant.length !== 0 && assistant.map((assistant, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-row space-x-[10px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full w-[6px] rounded-full bg-[#D2E3F1]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[18px] font-semibold text-black",
                                            children: assistant.fullname
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                            lineNumber: 44,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)),
                            assistant.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-row space-x-[10px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[18px] font-semibold text-black",
                                    children: "Asisten Praktikum Belum Ditambahkan"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full flex-col space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[16px] font-semibold text-[#5E6278]",
                        children: "Kuota"
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[18px] font-semibold text-black",
                        children: [
                            data.participants,
                            " / ",
                            data.quota
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full w-[0.3px] rounded-full border border-dashed border-[#1d1d1d]/30"
            }, void 0, false, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full w-[100px] flex-col space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[16px] font-semibold text-[#5E6278]",
                        children: "Modul"
                    }, void 0, false, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: {
                            pathname: "/dashboard/segera-hadir",
                            query: {
                                fitur: "Modul"
                            }
                        },
                        className: "flex w-full flex-row items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "w-[53px] text-start text-[14px] font-semibold leading-none text-[#3272CA]",
                                children: "Click to Open"
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-[24px] w-[24px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/open.png",
                                    fill: true,
                                    alt: "open module",
                                    style: {
                                        objectFit: "contain"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/praktikum/class-details-box.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/praktikum/class-details-box.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
};
_s(ClassDetailsBox, "7jf4K+3FWMo4+XHDBxvGJJiSJDk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ClassDetailsBox;
const __TURBOPACK__default__export__ = ClassDetailsBox;
var _c;
__turbopack_context__.k.register(_c, "ClassDetailsBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/class/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getAllClass": (()=>getAllClass),
    "getClassById": (()=>getClassById),
    "postClass": (()=>postClass)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/satellite/index.ts [app-client] (ecmascript)");
;
const getAllClass = async ()=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/class");
    return res.data;
};
const getClassById = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/class/${id}`);
    return res.data;
};
const postClass = async (body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/class", body);
    return res.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/store/useClassStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$class$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/class/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/coalesce.ts [app-client] (ecmascript)");
;
;
;
const initialState = {
    isLoading: false,
    error: null,
    classesData: [],
    classData: null
};
const useClassStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialState,
        getAllClass: async ()=>{
            set({
                isLoading: true
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$class$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllClass"])();
                if (res.status && res.data) {
                    set({
                        classesData: res.data
                    });
                } else {
                    set({
                        error: res.message
                    });
                }
            } catch  {
                console.log(get().error);
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        getClassById: async (id)=>{
            set({
                isLoading: true
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$class$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClassById"])(id);
                if (res.status && res.data) {
                    set({
                        classData: res.data
                    });
                } else {
                    set({
                        error: res.message
                    });
                }
            } catch  {
                console.log(get().error);
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        refreshAllClass: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(async ()=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$class$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllClass"])();
            if (res.status && res.data) set({
                classesData: res.data
            });
        }),
        refreshClassById: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$coalesce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coalesce"])(async (id)=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$class$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClassById"])(id);
            if (get().classData?.id === id && res.status && res.data) {
                set({
                    classData: res.data
                });
            }
        }),
        addClass: async (body)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$class$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postClass"])(body);
                if (!res.status) {
                    set({
                        error: res.message
                    });
                }
            } catch  {
                console.log(get().error);
            } finally{
                set({
                    isLoading: false
                });
            }
        }
    }));
const __TURBOPACK__default__export__ = useClassStore;
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
"[project]/app/dashboard/praktikum/[classId]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$class$2d$meetings$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/praktikum/class-meetings-content.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$class$2d$title$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/praktikum/class-title-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$class$2d$details$2d$box$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/praktikum/class-details-box.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useClassStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useClassStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useMeetingStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCollaboratorStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useCollaboratorStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useRealtimeEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useRealtimeEvents.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const ClassDetails = ()=>{
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { getClassById, refreshClassById, classData, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useClassStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const { getMeetings, refreshMeetings, meetingsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const { getClassCollaborators, refreshClassCollaborators, collaboratorsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCollaboratorStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClassDetails.useEffect": ()=>{
            getClassCollaborators(params.classId);
            getClassById(params.classId);
            getMeetings(params.classId);
        }
    }["ClassDetails.useEffect"], [
        getClassById,
        getMeetings,
        params.classId,
        getClassCollaborators
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useRealtimeEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "ClassDetails.useRealtimeEvents": ({ type, data })=>{
            const isReady = type === "ready";
            if (!isReady && data.class_id !== params.classId) return;
            if (isReady || [
                "meeting",
                "attendance",
                "class"
            ].includes(type)) {
                refreshMeetings(params.classId);
            }
            if (isReady || type === "class") {
                refreshClassById(params.classId);
                refreshClassCollaborators(params.classId);
            }
        }
    }["ClassDetails.useRealtimeEvents"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full flex-col space-y-10 overflow-auto overscroll-contain",
        children: !isLoading && classData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$class$2d$title$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    data: classData
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/praktikum/[classId]/page.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$class$2d$details$2d$box$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    data: classData,
                    assistant: collaboratorsData
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/praktikum/[classId]/page.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$praktikum$2f$class$2d$meetings$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    classId: classData.id,
                    meetingData: meetingsData
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/praktikum/[classId]/page.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/praktikum/[classId]/page.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
};
_s(ClassDetails, "bTSiwti+ENgA9ejaPEkoHxjbiY0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useClassStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useMeetingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCollaboratorStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useRealtimeEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ClassDetails;
const __TURBOPACK__default__export__ = ClassDetails;
var _c;
__turbopack_context__.k.register(_c, "ClassDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_ccbb9f45._.js.map