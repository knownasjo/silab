module.exports = {

"[project]/app/interfaces/announcement/announcement.interface.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AnnouncementTypeEnum": (()=>AnnouncementTypeEnum)
});
var AnnouncementTypeEnum = /*#__PURE__*/ function(AnnouncementTypeEnum) {
    AnnouncementTypeEnum["ASSISTANT"] = "ASSISTANT";
    AnnouncementTypeEnum["PRACTICUM"] = "PRACTICUM";
    AnnouncementTypeEnum["INHALL"] = "INHALL";
    AnnouncementTypeEnum["BASIC"] = "BASIC";
    return AnnouncementTypeEnum;
}({});
}}),
"[project]/app/components/pengumuman/announcement-type-dropdown.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AnnouncementTypeDropdown)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/menu/menu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interfaces$2f$announcement$2f$announcement$2e$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/interfaces/announcement/announcement.interface.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const announcementTypeList = [
    {
        title: "Pengumuman",
        value: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interfaces$2f$announcement$2f$announcement$2e$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementTypeEnum"].BASIC
    },
    {
        title: "Pendaftaran Praktikum",
        value: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interfaces$2f$announcement$2f$announcement$2e$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementTypeEnum"].PRACTICUM
    },
    {
        title: "Pendaftaran Inhal",
        value: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interfaces$2f$announcement$2f$announcement$2e$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementTypeEnum"].INHALL
    },
    {
        title: "Pendaftaran Asisten Praktikum",
        value: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interfaces$2f$announcement$2f$announcement$2e$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementTypeEnum"].ASSISTANT
    }
];
function AnnouncementTypeDropdown({ value, onAnnouncementTypeChange }) {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full flex-col justify-between space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base font-semibold text-[#5E6278]",
                children: "Pengumuman"
            }, void 0, false, {
                fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Menu"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuButton"], {
                        value: value,
                        className: `flex h-[64px] w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D]`,
                        children: [
                            selected === undefined ? "Pengumuman" : selected,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-[24px] w-[24px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/down.png",
                                    alt: "chevron down",
                                    fill: true
                                }, void 0, false, {
                                    fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItems"], {
                        anchor: "bottom",
                        className: `w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`,
                        children: announcementTypeList.map((announcement)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setSelected(announcement.value);
                                        onAnnouncementTypeChange(announcement.value);
                                    },
                                    className: "flex w-full flex-row items-start justify-start px-[15px] py-2 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white",
                                    children: announcement.title
                                }, void 0, false, {
                                    fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this)
                            }, announcement.value, false, {
                                fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/pengumuman/announcement-type-dropdown.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/components/error-dialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ErrorDialog)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$button$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/button/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
;
;
;
function ErrorDialog({ dialogOpen, onClose, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        onClose: onClose,
        open: dialogOpen,
        as: "div",
        className: `relative z-10 focus:outline-none`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                className: "fixed inset-0 bg-black/30"
            }, void 0, false, {
                fileName: "[project]/app/components/error-dialog.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-10 w-screen overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-full items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogPanel"], {
                        transition: true,
                        className: `data-[closed]:transform-[scale(95%)] flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-[#FF0000] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-[100px] w-full self-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                as: "h3",
                                className: "mt-3 w-full self-center text-center text-xl font-extrabold text-white",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/components/error-dialog.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$button$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
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
}}),
"[project]/app/components/success-dialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SuccessDialog)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$button$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/button/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
;
;
;
function SuccessDialog({ dialogOpen, onClose, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        onClose: onClose,
        open: dialogOpen,
        as: "div",
        className: `relative z-10 focus:outline-none`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                className: "fixed inset-0 bg-black/30"
            }, void 0, false, {
                fileName: "[project]/app/components/success-dialog.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-10 w-screen overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-full items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogPanel"], {
                        transition: true,
                        className: `data-[closed]:transform-[scale(95%)] flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-[#E8FFF3] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-[100px] w-full self-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                as: "h3",
                                className: "mt-3 w-full self-center text-center text-xl font-extrabold text-[#1D1D1D]",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/components/success-dialog.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$button$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
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
}}),
"[project]/app/components/pengumuman/add-pengumuman/add-pengumuman-title.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AddPengumumanTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function AddPengumumanTitle() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "w-full text-[32px] font-semibold text-[#1D1D1D]",
        children: [
            "Buat ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-extrabold",
                children: "pengumuman"
            }, void 0, false, {
                fileName: "[project]/app/components/pengumuman/add-pengumuman/add-pengumuman-title.tsx",
                lineNumber: 4,
                columnNumber: 12
            }, this),
            " yang akan disebarkan ke mahasiswa"
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/pengumuman/add-pengumuman/add-pengumuman-title.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/services/announcement/api.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "deleteAnnouncement": (()=>deleteAnnouncement),
    "getAllAnnouncements": (()=>getAllAnnouncements),
    "getAnnouncementById": (()=>getAnnouncementById),
    "postAnnouncement": (()=>postAnnouncement),
    "putAnnouncement": (()=>putAnnouncement)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/satellite/index.ts [app-ssr] (ecmascript)");
;
const postAnnouncement = async (body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/announcement", body);
    return res.data;
};
const getAllAnnouncements = async ()=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/announcement");
    return res.data;
};
const getAnnouncementById = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/announcement/${id}`);
    return res.data;
};
const putAnnouncement = async (id, body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/announcement/${id}`, body);
    return res.data;
};
const deleteAnnouncement = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/announcement/${id}`);
    return res.data;
};
}}),
"[project]/app/store/useAnnouncementStore.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/announcement/api.ts [app-ssr] (ecmascript)");
;
;
const initialState = {
    isLoading: false,
    error: null,
    announcementsData: [],
    announcementData: null,
    message: null
};
const useAnnouncementStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialState,
        addAnnouncement: async (body)=>{
            set({
                isLoading: true,
                error: null,
                message: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["postAnnouncement"])(body);
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
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["putAnnouncement"])(id, body);
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
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteAnnouncement"])(id);
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
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllAnnouncements"])();
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
        refreshAllAnnouncements: coalesce(async ()=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllAnnouncements"])();
            if (res.status && res.data) set({
                announcementsData: res.data
            });
        }),
        refreshAnnouncementById: coalesce(async (id)=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAnnouncementById"])(id);
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
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$announcement$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAnnouncementById"])(id);
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
}}),
"[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Pengumuman)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$pengumuman$2f$announcement$2d$type$2d$dropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/pengumuman/announcement-type-dropdown.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$error$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/error-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$success$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/success-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$pengumuman$2f$add$2d$pengumuman$2f$add$2d$pengumuman$2d$title$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/pengumuman/add-pengumuman/add-pengumuman-title.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interfaces$2f$announcement$2f$announcement$2e$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/interfaces/announcement/announcement.interface.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAnnouncementStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useAnnouncementStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const MAX_BODY_LENGTH = 200;
const MAX_TITLE_LENGTH = 150;
const emptyAnnouncement = {
    type: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interfaces$2f$announcement$2f$announcement$2e$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementTypeEnum"].BASIC,
    title: "",
    body: ""
};
function Pengumuman() {
    const [successDialogOpen, setSuccessDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorDialogOpen, setErrorDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [dialogMessage, setDialogMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [announcement, setAnnouncement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(emptyAnnouncement);
    const { isLoading, addAnnouncement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAnnouncementStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const handleValueChange = (field, value)=>{
        setAnnouncement((prev)=>({
                ...prev,
                [field]: value
            }));
        setFormError("");
    };
    const resetAnnouncement = ()=>{
        setAnnouncement(emptyAnnouncement);
        setFormError("");
    };
    const handleAddNewAnnouncement = async ()=>{
        const title = announcement.title.trim();
        const body = announcement.body.trim();
        if (title === "") {
            setFormError("Judul pengumuman wajib diisi!");
            return;
        }
        if (body === "") {
            setFormError("Deskripsi pengumuman wajib diisi!");
            return;
        }
        if (!announcement.type) {
            setFormError("Jenis pengumuman wajib dipilih!");
            return;
        }
        const isSuccess = await addAnnouncement({
            type: announcement.type,
            title,
            body
        });
        const { error, message } = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAnnouncementStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].getState();
        if (!isSuccess) {
            setDialogMessage(error ?? "Gagal menerbitkan pengumuman");
            setErrorDialogOpen(true);
            return;
        }
        resetAnnouncement();
        setDialogMessage(message ?? "Pengumuman berhasil diterbitkan");
        setSuccessDialogOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full flex-col space-y-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$pengumuman$2f$add$2d$pengumuman$2f$add$2d$pengumuman$2d$title$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-screen w-full flex-col space-y-10 overflow-auto overscroll-contain rounded-[20px] bg-white p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[22px] font-bold text-[#1D1D1D]",
                        children: "Buat Pengumuman"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-base font-semibold text-[#5E6278]",
                                children: [
                                    "Judul Pengumuman",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-normal text-[#5E6278]/75",
                                        children: [
                                            "(maks: ",
                                            MAX_TITLE_LENGTH,
                                            " karakter)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                required: true,
                                className: "h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]",
                                placeholder: "Judul pengumuman",
                                maxLength: MAX_TITLE_LENGTH,
                                onChange: (e)=>handleValueChange("title", e.target.value),
                                value: announcement.title ?? ""
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[85px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$pengumuman$2f$announcement$2d$type$2d$dropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onAnnouncementTypeChange: (value)=>handleValueChange("type", value),
                            value: announcement.type
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-base font-semibold text-[#5E6278]",
                                children: [
                                    "Deskripsi Pengumuman",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-normal text-[#5E6278]/75",
                                        children: [
                                            "(maks: ",
                                            MAX_BODY_LENGTH,
                                            " karakter)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                required: true,
                                className: "h-[140px] w-full resize-none rounded-2xl bg-[#F5F5F5] pl-5 pt-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]",
                                placeholder: "Deskripsi pengumuman",
                                maxLength: MAX_BODY_LENGTH,
                                inputMode: "text",
                                onChange: (e)=>handleValueChange("body", e.target.value),
                                value: announcement.body ?? ""
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-right text-xs font-semibold text-[#5E6278]/75",
                                children: [
                                    announcement.body.length,
                                    "/",
                                    MAX_BODY_LENGTH
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-[#F1416C]",
                        children: formError
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-10 h-[1px] w-full bg-[#1D1D1D]/30"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full flex-row justify-end space-x-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: resetAnnouncement,
                                disabled: isLoading,
                                className: "rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60] disabled:opacity-50",
                                children: "Hapus"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddNewAnnouncement,
                                disabled: isLoading,
                                className: "rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:opacity-50",
                                children: !isLoading ? "Simpan" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "loading loading-dots loading-sm"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$success$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                dialogOpen: successDialogOpen,
                onClose: ()=>setSuccessDialogOpen(false),
                title: dialogMessage
            }, void 0, false, {
                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$error$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                dialogOpen: errorDialogOpen,
                onClose: ()=>setErrorDialogOpen(false),
                title: dialogMessage
            }, void 0, false, {
                fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/pengumuman/add-pengumuman/page.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/@headlessui/react/dist/hooks/use-did-element-move.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useDidElementMove": (()=>s)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
;
;
function s(n, t) {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        left: 0,
        top: 0
    });
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (!t) return;
        let r = t.getBoundingClientRect();
        r && (e.current = r);
    }, [
        n,
        t
    ]), t == null || !n || t === document.activeElement) return !1;
    let o = t.getBoundingClientRect();
    return o.top !== e.current.top || o.left !== e.current.left;
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/utils/get-text-value.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getTextValue": (()=>g)
});
let a = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function o(e) {
    var r, i;
    let n = (r = e.innerText) != null ? r : "", t = e.cloneNode(!0);
    if (!(t instanceof HTMLElement)) return n;
    let u = !1;
    for (let f of t.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))f.remove(), u = !0;
    let l = u ? (i = t.innerText) != null ? i : "" : n;
    return a.test(l) && (l = l.replace(a, "")), l;
}
function g(e) {
    let n = e.getAttribute("aria-label");
    if (typeof n == "string") return n.trim();
    let t = e.getAttribute("aria-labelledby");
    if (t) {
        let u = t.split(" ").map((l)=>{
            let r = document.getElementById(l);
            if (r) {
                let i = r.getAttribute("aria-label");
                return typeof i == "string" ? i.trim() : o(r).trim();
            }
            return null;
        }).filter(Boolean);
        if (u.length > 0) return u.join(", ");
    }
    return o(e).trim();
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/hooks/use-text-value.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTextValue": (()=>s)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$get$2d$text$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/get-text-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
;
;
;
function s(c) {
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(""), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        let e = c.current;
        if (!e) return "";
        let u = e.innerText;
        if (t.current === u) return r.current;
        let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$get$2d$text$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTextValue"])(e).trim().toLowerCase();
        return t.current = u, r.current = n, n;
    });
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTrackedPointer": (()=>u)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function t(e) {
    return [
        e.screenX,
        e.screenY
    ];
}
function u() {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([
        -1,
        -1
    ]);
    return {
        wasMoved (r) {
            let n = t(r);
            return e.current[0] === n[0] && e.current[1] === n[1] ? !1 : (e.current = n, !0);
        },
        update (r) {
            e.current = t(r);
        }
    };
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/hooks/use-tree-walker.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTreeWalker": (()=>F)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
;
;
;
function F(c, { container: e, accept: t, walk: r }) {
    let o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(t), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(r);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        o.current = t, l.current = r;
    }, [
        t,
        r
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (!e || !c) return;
        let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnerDocument"])(e);
        if (!n) return;
        let f = o.current, p = l.current, i = Object.assign((m)=>f(m), {
            acceptNode: f
        }), u = n.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, i, !1);
        for(; u.nextNode();)p(u.currentNode);
    }, [
        e,
        c,
        o,
        l
    ]);
}
;
}}),
"[project]/node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = React.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef(null);
        if (null === instRef.current) {
            var inst = {
                hasValue: !1,
                value: null
            };
            instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo(function() {
            function memoizedSelector(nextSnapshot) {
                if (!hasMemo) {
                    hasMemo = !0;
                    memoizedSnapshot = nextSnapshot;
                    nextSnapshot = selector(nextSnapshot);
                    if (void 0 !== isEqual && inst.hasValue) {
                        var currentSelection = inst.value;
                        if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
                    }
                    return memoizedSelection = nextSnapshot;
                }
                currentSelection = memoizedSelection;
                if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
                var nextSelection = selector(nextSnapshot);
                if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
                memoizedSnapshot = nextSnapshot;
                return memoizedSelection = nextSelection;
            }
            var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
                function() {
                    return memoizedSelector(getSnapshot());
                },
                null === maybeGetServerSnapshot ? void 0 : function() {
                    return memoizedSelector(maybeGetServerSnapshot());
                }
            ];
        }, [
            getSnapshot,
            getServerSnapshot,
            selector,
            isEqual
        ]);
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect(function() {
            inst.hasValue = !0;
            inst.value = value;
        }, [
            value
        ]);
        useDebugValue(value);
        return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}}),
"[project]/node_modules/use-sync-external-store/with-selector.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js [app-ssr] (ecmascript)");
}
}}),
"[project]/node_modules/@headlessui/react/dist/machine.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Machine": (()=>m),
    "batch": (()=>g),
    "shallowEqual": (()=>h)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$default$2d$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/default-map.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var f = (t, e, r)=>{
    if (!e.has(t)) throw TypeError("Cannot " + r);
};
var a = (t, e, r)=>(f(t, e, "read from private field"), r ? r.call(t) : e.get(t)), l = (t, e, r)=>{
    if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
    e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, c = (t, e, r, n)=>(f(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r);
var i, s, o;
;
;
class m {
    constructor(e){
        l(this, i, {});
        l(this, s, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$default$2d$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefaultMap"](()=>new Set));
        l(this, o, new Set);
        c(this, i, e);
    }
    get state() {
        return a(this, i);
    }
    subscribe(e, r) {
        let n = {
            selector: e,
            callback: r,
            current: e(a(this, i))
        };
        return a(this, o).add(n), ()=>{
            a(this, o).delete(n);
        };
    }
    on(e, r) {
        return a(this, s).get(e).add(r), ()=>{
            a(this, s).get(e).delete(r);
        };
    }
    send(e) {
        c(this, i, this.reduce(a(this, i), e));
        for (let r of a(this, o)){
            let n = r.selector(a(this, i));
            h(r.current, n) || (r.current = n, r.callback(n));
        }
        for (let r of a(this, s).get(e.type))r(a(this, i), e);
    }
}
i = new WeakMap, s = new WeakMap, o = new WeakMap;
function h(t, e) {
    return Object.is(t, e) ? !0 : typeof t != "object" || t === null || typeof e != "object" || e === null ? !1 : Array.isArray(t) && Array.isArray(e) ? t.length !== e.length ? !1 : u(t[Symbol.iterator](), e[Symbol.iterator]()) : t instanceof Map && e instanceof Map || t instanceof Set && e instanceof Set ? t.size !== e.size ? !1 : u(t.entries(), e.entries()) : S(t) && S(e) ? u(Object.entries(t)[Symbol.iterator](), Object.entries(e)[Symbol.iterator]()) : !1;
}
function u(t, e) {
    do {
        let r = t.next(), n = e.next();
        if (r.done && n.done) return !0;
        if (r.done || n.done || !Object.is(r.value, n.value)) return !1;
    }while (!0)
}
function S(t) {
    if (Object.prototype.toString.call(t) !== "[object Object]") return !1;
    let e = Object.getPrototypeOf(t);
    return e === null || Object.getPrototypeOf(e) === null;
}
function g(t) {
    let [e, r] = t(), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])();
    return (...b)=>{
        e(...b), n.dispose(), n.microTask(r);
    };
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/react-glue.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useSlice": (()=>S)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$with$2d$selector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-sync-external-store/with-selector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/machine.js [app-ssr] (ecmascript)");
;
;
;
function S(e, n, r = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shallowEqual"]) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$with$2d$selector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStoreWithSelector"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((i)=>e.subscribe(s, i)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>e.state), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>e.state), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(n), r);
}
function s(e) {
    return e;
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/utils/calculate-active-index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Focus": (()=>c),
    "calculateActiveIndex": (()=>f)
});
function u(l) {
    throw new Error("Unexpected object: " + l);
}
var c = ((i)=>(i[i.First = 0] = "First", i[i.Previous = 1] = "Previous", i[i.Next = 2] = "Next", i[i.Last = 3] = "Last", i[i.Specific = 4] = "Specific", i[i.Nothing = 5] = "Nothing", i))(c || {});
function f(l, n) {
    let t = n.resolveItems();
    if (t.length <= 0) return null;
    let r = n.resolveActiveIndex(), s = r != null ? r : -1;
    switch(l.focus){
        case 0:
            {
                for(let e = 0; e < t.length; ++e)if (!n.resolveDisabled(t[e], e, t)) return e;
                return r;
            }
        case 1:
            {
                s === -1 && (s = t.length);
                for(let e = s - 1; e >= 0; --e)if (!n.resolveDisabled(t[e], e, t)) return e;
                return r;
            }
        case 2:
            {
                for(let e = s + 1; e < t.length; ++e)if (!n.resolveDisabled(t[e], e, t)) return e;
                return r;
            }
        case 3:
            {
                for(let e = t.length - 1; e >= 0; --e)if (!n.resolveDisabled(t[e], e, t)) return e;
                return r;
            }
        case 4:
            {
                for(let e = 0; e < t.length; ++e)if (n.resolveId(t[e], e, t) === l.id) return e;
                return r;
            }
        case 5:
            return null;
        default:
            u(l);
    }
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/internal/id.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "IdProvider": (()=>f),
    "useProvidedId": (()=>u)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(void 0);
function u() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(e);
}
function f({ id: t, children: r }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(e.Provider, {
        value: t
    }, r);
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/components/label/label.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Label": (()=>Q),
    "useLabelContext": (()=>P),
    "useLabelledBy": (()=>I),
    "useLabels": (()=>K)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$disabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/internal/disabled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$id$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/internal/id.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
let c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
c.displayName = "LabelContext";
function P() {
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(c);
    if (r === null) {
        let l = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
        throw Error.captureStackTrace && Error.captureStackTrace(l, P), l;
    }
    return r;
}
function I(r) {
    var a, e, o;
    let l = (e = (a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(c)) == null ? void 0 : a.value) != null ? e : void 0;
    return ((o = r == null ? void 0 : r.length) != null ? o : 0) > 0 ? [
        l,
        ...r
    ].filter(Boolean).join(" ") : l;
}
function K({ inherit: r = !1 } = {}) {
    let l = I(), [a, e] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]), o = r ? [
        l,
        ...a
    ].filter(Boolean) : a;
    return [
        o.length > 0 ? o.join(" ") : void 0,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>function(t) {
                let s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((i)=>(e((p)=>[
                            ...p,
                            i
                        ]), ()=>e((p)=>{
                            let u = p.slice(), d = u.indexOf(i);
                            return d !== -1 && u.splice(d, 1), u;
                        }))), m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
                        register: s,
                        slot: t.slot,
                        name: t.name,
                        props: t.props,
                        value: t.value
                    }), [
                    s,
                    t.slot,
                    t.name,
                    t.props,
                    t.value
                ]);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(c.Provider, {
                    value: m
                }, t.children);
            }, [
            e
        ])
    ];
}
let N = "label";
function G(r, l) {
    var y;
    let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), e = P(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$id$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProvidedId"])(), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$disabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisabled"])(), { id: t = `headlessui-label-${a}`, htmlFor: s = o != null ? o : (y = e.props) == null ? void 0 : y.htmlFor, passive: m = !1, ...i } = r, p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(l);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>e.register(t), [
        t,
        e.register
    ]);
    let u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((L)=>{
        let b = L.currentTarget;
        if (b instanceof HTMLLabelElement && L.preventDefault(), e.props && "onClick" in e.props && typeof e.props.onClick == "function" && e.props.onClick(L), b instanceof HTMLLabelElement) {
            let n = document.getElementById(b.htmlFor);
            if (n) {
                let E = n.getAttribute("disabled");
                if (E === "true" || E === "") return;
                let x = n.getAttribute("aria-disabled");
                if (x === "true" || x === "") return;
                (n instanceof HTMLInputElement && (n.type === "radio" || n.type === "checkbox") || n.role === "radio" || n.role === "checkbox" || n.role === "switch") && n.click(), n.focus({
                    preventScroll: !0
                });
            }
        }
    }), d = g || !1, C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            ...e.slot,
            disabled: d
        }), [
        e.slot,
        d
    ]), f = {
        ref: p,
        ...e.props,
        id: t,
        htmlFor: s,
        onClick: u
    };
    return m && ("onClick" in f && (delete f.htmlFor, delete f.onClick), "onClick" in i && delete i.onClick), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: f,
        theirProps: i,
        slot: C,
        defaultTag: s ? N : "div",
        name: e.name || "Label"
    });
}
let U = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(G), Q = Object.assign(U, {});
;
}}),
"[project]/node_modules/@headlessui/react/dist/components/menu/menu-machine.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ActionTypes": (()=>b),
    "ActivationTrigger": (()=>T),
    "MenuMachine": (()=>x),
    "MenuState": (()=>M)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/machine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/calculate-active-index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/focus-management.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)");
var h = Object.defineProperty;
var y = (e, n, t)=>n in e ? h(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t;
var v = (e, n, t)=>(y(e, typeof n != "symbol" ? n + "" : n, t), t);
;
;
;
;
var M = ((t)=>(t[t.Open = 0] = "Open", t[t.Closed = 1] = "Closed", t))(M || {}), T = ((t)=>(t[t.Pointer = 0] = "Pointer", t[t.Other = 1] = "Other", t))(T || {}), b = ((i)=>(i[i.OpenMenu = 0] = "OpenMenu", i[i.CloseMenu = 1] = "CloseMenu", i[i.GoToItem = 2] = "GoToItem", i[i.Search = 3] = "Search", i[i.ClearSearch = 4] = "ClearSearch", i[i.RegisterItems = 5] = "RegisterItems", i[i.UnregisterItems = 6] = "UnregisterItems", i[i.SetButtonElement = 7] = "SetButtonElement", i[i.SetItemsElement = 8] = "SetItemsElement", i[i.SortItems = 9] = "SortItems", i))(b || {});
function S(e, n = (t)=>t) {
    let t = e.activeItemIndex !== null ? e.items[e.activeItemIndex] : null, r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortByDomNode"])(n(e.items.slice()), (u)=>u.dataRef.current.domRef.current), l = t ? r.indexOf(t) : null;
    return l === -1 && (l = null), {
        items: r,
        activeItemIndex: l
    };
}
let F = {
    [1] (e) {
        return e.menuState === 1 ? e : {
            ...e,
            activeItemIndex: null,
            pendingFocus: {
                focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Nothing
            },
            menuState: 1
        };
    },
    [0] (e, n) {
        return e.menuState === 0 ? e : {
            ...e,
            __demoMode: !1,
            pendingFocus: n.focus,
            menuState: 0
        };
    },
    [2]: (e, n)=>{
        var u, m, d, a, I;
        if (e.menuState === 1) return e;
        let t = {
            ...e,
            searchQuery: "",
            activationTrigger: (u = n.trigger) != null ? u : 1,
            __demoMode: !1
        };
        if (n.focus === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Nothing) return {
            ...t,
            activeItemIndex: null
        };
        if (n.focus === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Specific) return {
            ...t,
            activeItemIndex: e.items.findIndex((i)=>i.id === n.id)
        };
        if (n.focus === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Previous) {
            let i = e.activeItemIndex;
            if (i !== null) {
                let g = e.items[i].dataRef.current.domRef, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateActiveIndex"])(n, {
                    resolveItems: ()=>e.items,
                    resolveActiveIndex: ()=>e.activeItemIndex,
                    resolveId: (s)=>s.id,
                    resolveDisabled: (s)=>s.dataRef.current.disabled
                });
                if (o !== null) {
                    let s = e.items[o].dataRef.current.domRef;
                    if (((m = g.current) == null ? void 0 : m.previousElementSibling) === s.current || ((d = s.current) == null ? void 0 : d.previousElementSibling) === null) return {
                        ...t,
                        activeItemIndex: o
                    };
                }
            }
        } else if (n.focus === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Next) {
            let i = e.activeItemIndex;
            if (i !== null) {
                let g = e.items[i].dataRef.current.domRef, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateActiveIndex"])(n, {
                    resolveItems: ()=>e.items,
                    resolveActiveIndex: ()=>e.activeItemIndex,
                    resolveId: (s)=>s.id,
                    resolveDisabled: (s)=>s.dataRef.current.disabled
                });
                if (o !== null) {
                    let s = e.items[o].dataRef.current.domRef;
                    if (((a = g.current) == null ? void 0 : a.nextElementSibling) === s.current || ((I = s.current) == null ? void 0 : I.nextElementSibling) === null) return {
                        ...t,
                        activeItemIndex: o
                    };
                }
            }
        }
        let r = S(e), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateActiveIndex"])(n, {
            resolveItems: ()=>r.items,
            resolveActiveIndex: ()=>r.activeItemIndex,
            resolveId: (i)=>i.id,
            resolveDisabled: (i)=>i.dataRef.current.disabled
        });
        return {
            ...t,
            ...r,
            activeItemIndex: l
        };
    },
    [3]: (e, n)=>{
        let r = e.searchQuery !== "" ? 0 : 1, l = e.searchQuery + n.value.toLowerCase(), m = (e.activeItemIndex !== null ? e.items.slice(e.activeItemIndex + r).concat(e.items.slice(0, e.activeItemIndex + r)) : e.items).find((a)=>{
            var I;
            return ((I = a.dataRef.current.textValue) == null ? void 0 : I.startsWith(l)) && !a.dataRef.current.disabled;
        }), d = m ? e.items.indexOf(m) : -1;
        return d === -1 || d === e.activeItemIndex ? {
            ...e,
            searchQuery: l
        } : {
            ...e,
            searchQuery: l,
            activeItemIndex: d,
            activationTrigger: 1
        };
    },
    [4] (e) {
        return e.searchQuery === "" ? e : {
            ...e,
            searchQuery: "",
            searchActiveItemIndex: null
        };
    },
    [5]: (e, n)=>{
        let t = e.items.concat(n.items.map((l)=>l)), r = e.activeItemIndex;
        return e.pendingFocus.focus !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Nothing && (r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateActiveIndex"])(e.pendingFocus, {
            resolveItems: ()=>t,
            resolveActiveIndex: ()=>e.activeItemIndex,
            resolveId: (l)=>l.id,
            resolveDisabled: (l)=>l.dataRef.current.disabled
        })), {
            ...e,
            items: t,
            activeItemIndex: r,
            pendingFocus: {
                focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Nothing
            },
            pendingShouldSort: !0
        };
    },
    [6]: (e, n)=>{
        let t = e.items, r = [], l = new Set(n.items);
        for (let [u, m] of t.entries())if (l.has(m.id) && (r.push(u), l.delete(m.id), l.size === 0)) break;
        if (r.length > 0) {
            t = t.slice();
            for (let u of r.reverse())t.splice(u, 1);
        }
        return {
            ...e,
            items: t,
            activationTrigger: 1
        };
    },
    [7]: (e, n)=>e.buttonElement === n.element ? e : {
            ...e,
            buttonElement: n.element
        },
    [8]: (e, n)=>e.itemsElement === n.element ? e : {
            ...e,
            itemsElement: n.element
        },
    [9]: (e)=>e.pendingShouldSort ? {
            ...e,
            ...S(e),
            pendingShouldSort: !1
        } : e
};
class x extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Machine"] {
    constructor(t){
        super(t);
        v(this, "actions", {
            registerItem: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["batch"])(()=>{
                let t = [], r = new Set;
                return [
                    (l, u)=>{
                        r.has(u) || (r.add(u), t.push({
                            id: l,
                            dataRef: u
                        }));
                    },
                    ()=>(r.clear(), this.send({
                            type: 5,
                            items: t.splice(0)
                        }))
                ];
            }),
            unregisterItem: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["batch"])(()=>{
                let t = [];
                return [
                    (r)=>t.push(r),
                    ()=>this.send({
                            type: 6,
                            items: t.splice(0)
                        })
                ];
            })
        });
        v(this, "selectors", {
            activeDescendantId (t) {
                var u;
                let r = t.activeItemIndex, l = t.items;
                return r === null || (u = l[r]) == null ? void 0 : u.id;
            },
            isActive (t, r) {
                var m;
                let l = t.activeItemIndex, u = t.items;
                return l !== null ? ((m = u[l]) == null ? void 0 : m.id) === r : !1;
            },
            shouldScrollIntoView (t, r) {
                return t.__demoMode || t.menuState !== 0 || t.activationTrigger === 0 ? !1 : this.isActive(t, r);
            }
        });
        this.on(5, ()=>{
            requestAnimationFrame(()=>{
                this.send({
                    type: 9
                });
            });
        });
    }
    static new({ __demoMode: t = !1 } = {}) {
        return new x({
            __demoMode: t,
            menuState: t ? 0 : 1,
            buttonElement: null,
            itemsElement: null,
            items: [],
            searchQuery: "",
            activeItemIndex: null,
            activationTrigger: 1,
            pendingShouldSort: !1,
            pendingFocus: {
                focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Nothing
            }
        });
    }
    reduce(t, r) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(r.type, F, t, r);
    }
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/components/menu/menu-machine-glue.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MenuContext": (()=>a),
    "useMenuMachine": (()=>i),
    "useMenuMachineContext": (()=>l)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/menu/menu-machine.js [app-ssr] (ecmascript)");
;
;
const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function l(e) {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(a);
    if (n === null) {
        let t = new Error(`<${e} /> is missing a parent <Menu /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, i), t;
    }
    return n;
}
function i({ __demoMode: e = !1 } = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuMachine"].new({
            __demoMode: e
        }), []);
}
;
}}),
"[project]/node_modules/@headlessui/react/dist/components/menu/menu.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Menu": (()=>to),
    "MenuButton": (()=>mt),
    "MenuHeading": (()=>yt),
    "MenuItem": (()=>ft),
    "MenuItems": (()=>Tt),
    "MenuSection": (()=>ct),
    "MenuSeparator": (()=>Et)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-aria/focus/dist/useFocusRing.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-aria/interactions/dist/useHover.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$active$2d$press$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-active-press.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$did$2d$element$2d$move$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-did-element-move.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$element$2d$size$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-element-size.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$inert$2d$others$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-inert-others.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$disappear$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-on-disappear.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$outside$2d$click$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-outside-click.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$resolve$2d$button$2d$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$scroll$2d$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-scroll-lock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$text$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-text-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tracked$2d$pointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-transition.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tree$2d$walker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/hooks/use-tree-walker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/internal/floating.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/internal/open-closed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/react-glue.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$bugs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/bugs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/calculate-active-index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/focus-management.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$description$2f$description$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/description/description.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/keyboard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$label$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/label/label.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$portal$2f$portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/portal/portal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/menu/menu-machine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/menu/menu-machine-glue.js [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
let ze = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"];
function Qe(T, E) {
    let { __demoMode: i = !1, ...a } = T, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuMachine"])({
        __demoMode: i
    }), [s, o, P] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(n, (p)=>[
            p.menuState,
            p.itemsElement,
            p.buttonElement
        ]), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(E), _ = s === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$outside$2d$click$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOutsideClick"])(_, [
        P,
        o
    ], (p, F)=>{
        var A;
        n.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFocusableElement"])(F, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusableMode"].Loose) || (p.preventDefault(), (A = n.state.buttonElement) == null || A.focus());
    });
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        n.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        });
    }), R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            open: s === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open,
            close: t
        }), [
        s,
        t
    ]), I = {
        ref: c
    }, g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingProvider"], null, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuContext"].Provider, {
        value: n
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OpenClosedProvider"], {
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(s, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Open,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Closed]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Closed
        })
    }, g({
        ourProps: I,
        theirProps: a,
        slot: R,
        defaultTag: ze,
        name: "Menu"
    }))));
}
let Ye = "button";
function Ze(T, E) {
    let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuMachineContext"])("Menu.Button"), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), { id: n = `headlessui-menu-button-${a}`, disabled: s = !1, autoFocus: o = !1, ...P } = T, c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingReferenceProps"])(), t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(E, c, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingReference"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((l)=>i.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].SetButtonElement,
            element: l
        }))), R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((l)=>{
        switch(l.key){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Space:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Enter:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].ArrowDown:
                l.preventDefault(), l.stopPropagation(), i.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].OpenMenu,
                    focus: {
                        focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].First
                    }
                });
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].ArrowUp:
                l.preventDefault(), l.stopPropagation(), i.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].OpenMenu,
                    focus: {
                        focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Last
                    }
                });
                break;
        }
    }), I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((l)=>{
        switch(l.key){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Space:
                l.preventDefault();
                break;
        }
    }), [g, p] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(i, (l)=>[
            l.menuState,
            l.itemsElement
        ]), F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((l)=>{
        var H;
        if (l.button === 0) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$bugs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDisabledReactIssue7711"])(l.currentTarget)) return l.preventDefault();
            s || (g === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open ? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"])(()=>i.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
                })), (H = c.current) == null || H.focus({
                preventScroll: !0
            })) : (l.preventDefault(), i.send({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].OpenMenu,
                focus: {
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Nothing
                },
                trigger: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActivationTrigger"].Pointer
            })));
        }
    }), { isFocusVisible: A, focusProps: f } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFocusRing"])({
        autoFocus: o
    }), { isHovered: M, hoverProps: L } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHover"])({
        isDisabled: s
    }), { pressed: S, pressProps: O } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$active$2d$press$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActivePress"])({
        disabled: s
    }), x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            open: g === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open,
            active: S || g === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open,
            disabled: s,
            hover: M,
            focus: A,
            autofocus: o
        }), [
        g,
        M,
        A,
        S,
        s,
        o
    ]), U = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(_(), {
        ref: t,
        id: n,
        type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$resolve$2d$button$2d$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResolveButtonType"])(T, c.current),
        "aria-haspopup": "menu",
        "aria-controls": p == null ? void 0 : p.id,
        "aria-expanded": g === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open,
        disabled: s || void 0,
        autoFocus: o,
        onKeyDown: R,
        onKeyUp: I,
        onMouseDown: F
    }, f, L, O);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: U,
        theirProps: P,
        slot: x,
        defaultTag: Ye,
        name: "Menu.Button"
    });
}
let et = "div", tt = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderFeatures"].RenderStrategy | __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderFeatures"].Static;
function ot(T, E) {
    let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), { id: a = `headlessui-menu-items-${i}`, anchor: n, portal: s = !1, modal: o = !0, transition: P = !1, ...c } = T, _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResolvedAnchor"])(n), t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuMachineContext"])("Menu.Items"), [R, I] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingPanel"])(_), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingPanelProps"])(), [p, F] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), A = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(E, _ ? R : null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((e)=>t.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].SetItemsElement,
            element: e
        })), F), [f, M] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(t, (e)=>[
            e.menuState,
            e.buttonElement
        ]), L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOwnerDocument"])(M), S = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOwnerDocument"])(p);
    _ && (s = !0);
    let O = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenClosed"])(), [x, U] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])(P, p, O !== null ? (O & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Open) === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Open : f === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$disappear$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOnDisappear"])(x, M, ()=>{
        t.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        });
    });
    let G = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(t, (e)=>e.__demoMode), l = G ? !1 : o && f === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$scroll$2d$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollLock"])(l, S);
    let H = G ? !1 : o && f === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$inert$2d$others$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInertOthers"])(H, {
        allowed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>[
                M,
                p
            ], [
            M,
            p
        ])
    });
    let u = f !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open, ae = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$did$2d$element$2d$move$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDidElementMove"])(u, M) ? !1 : x;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let e = p;
        e && f === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open && e !== (S == null ? void 0 : S.activeElement) && e.focus({
            preventScroll: !0
        });
    }, [
        f,
        p,
        S
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tree$2d$walker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTreeWalker"])(f === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open, {
        container: p,
        accept (e) {
            return e.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : e.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
        },
        walk (e) {
            e.setAttribute("role", "none");
        }
    });
    let q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisposables"])(), se = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((e)=>{
        var N, z, Q;
        switch(q.dispose(), e.key){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Space:
                if (t.state.searchQuery !== "") return e.preventDefault(), e.stopPropagation(), t.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].Search,
                    value: e.key
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Enter:
                if (e.preventDefault(), e.stopPropagation(), t.state.activeItemIndex !== null) {
                    let { dataRef: de } = t.state.items[t.state.activeItemIndex];
                    (z = (N = de.current) == null ? void 0 : N.domRef.current) == null || z.click();
                }
                t.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
                }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restoreFocusIfNecessary"])(t.state.buttonElement);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].ArrowDown:
                return e.preventDefault(), e.stopPropagation(), t.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Next
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].ArrowUp:
                return e.preventDefault(), e.stopPropagation(), t.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Previous
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Home:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].PageUp:
                return e.preventDefault(), e.stopPropagation(), t.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].First
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].End:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].PageDown:
                return e.preventDefault(), e.stopPropagation(), t.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Last
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Escape:
                e.preventDefault(), e.stopPropagation(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"])(()=>t.send({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
                    })), (Q = t.state.buttonElement) == null || Q.focus({
                    preventScroll: !0
                });
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Tab:
                e.preventDefault(), e.stopPropagation(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"])(()=>t.send({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
                    })), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusFrom"])(t.state.buttonElement, e.shiftKey ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Previous : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Next);
                break;
            default:
                e.key.length === 1 && (t.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].Search,
                    value: e.key
                }), q.setTimeout(()=>t.send({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].ClearSearch
                    }), 350));
                break;
        }
    }), le = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((e)=>{
        switch(e.key){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Space:
                e.preventDefault();
                break;
        }
    }), pe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            open: f === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open
        }), [
        f
    ]), ie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(_ ? g() : {}, {
        "aria-activedescendant": (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(t, t.selectors.activeDescendantId),
        "aria-labelledby": (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(t, (e)=>{
            var N;
            return (N = e.buttonElement) == null ? void 0 : N.id;
        }),
        id: a,
        onKeyDown: se,
        onKeyUp: le,
        role: "menu",
        tabIndex: f === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuState"].Open ? 0 : void 0,
        ref: A,
        style: {
            ...c.style,
            ...I,
            "--button-width": (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$element$2d$size$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useElementSize"])(M, !0).width
        },
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionDataAttributes"])(U)
    }), ue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$portal$2f$portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        enabled: s ? T.static || x : !1,
        ownerDocument: L
    }, ue({
        ourProps: ie,
        theirProps: c,
        slot: pe,
        defaultTag: et,
        features: tt,
        visible: ae,
        name: "Menu.Items"
    }));
}
let nt = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"];
function rt(T, E) {
    let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), { id: a = `headlessui-menu-item-${i}`, disabled: n = !1, ...s } = T, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuMachineContext"])("Menu.Item"), P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(o, (u)=>o.selectors.isActive(u, a)), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(E, c), t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(o, (u)=>o.selectors.shouldScrollIntoView(u, a));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (t) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])().requestAnimationFrame(()=>{
            var u, J;
            (J = (u = c.current) == null ? void 0 : u.scrollIntoView) == null || J.call(u, {
                block: "nearest"
            });
        });
    }, [
        t,
        c
    ]);
    let R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$text$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTextValue"])(c), I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        disabled: n,
        domRef: c,
        get textValue () {
            return R();
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        I.current.disabled = n;
    }, [
        I,
        n
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>(o.actions.registerItem(a, I), ()=>o.actions.unregisterItem(a)), [
        I,
        a
    ]);
    let g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        });
    }), p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((u)=>{
        if (n) return u.preventDefault();
        o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restoreFocusIfNecessary"])(o.state.buttonElement);
    }), F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        if (n) return o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Nothing
        });
        o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Specific,
            id: a
        });
    }), A = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tracked$2d$pointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTrackedPointer"])(), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((u)=>{
        A.update(u), !n && (P || o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Specific,
            id: a,
            trigger: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActivationTrigger"].Pointer
        }));
    }), M = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((u)=>{
        A.wasMoved(u) && (n || P || o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Specific,
            id: a,
            trigger: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActivationTrigger"].Pointer
        }));
    }), L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((u)=>{
        A.wasMoved(u) && (n || P && o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Nothing
        }));
    }), [S, O] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$label$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLabels"])(), [x, U] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$description$2f$description$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDescriptions"])(), G = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            active: P,
            focus: P,
            disabled: n,
            close: g
        }), [
        P,
        n,
        g
    ]), l = {
        id: a,
        ref: _,
        role: "menuitem",
        tabIndex: n === !0 ? void 0 : -1,
        "aria-disabled": n === !0 ? !0 : void 0,
        "aria-labelledby": S,
        "aria-describedby": x,
        disabled: void 0,
        onClick: p,
        onFocus: F,
        onPointerEnter: f,
        onMouseEnter: f,
        onPointerMove: M,
        onMouseMove: M,
        onPointerLeave: L,
        onMouseLeave: L
    }, H = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(O, null, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(U, null, H({
        ourProps: l,
        theirProps: s,
        slot: G,
        defaultTag: nt,
        name: "Menu.Item"
    })));
}
let at = "div";
function st(T, E) {
    let [i, a] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$label$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLabels"])(), n = T, s = {
        ref: E,
        "aria-labelledby": i,
        role: "group"
    }, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(a, null, o({
        ourProps: s,
        theirProps: n,
        slot: {},
        defaultTag: at,
        name: "Menu.Section"
    }));
}
let lt = "header";
function pt(T, E) {
    let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), { id: a = `headlessui-menu-heading-${i}`, ...n } = T, s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$label$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLabelContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>s.register(a), [
        a,
        s.register
    ]);
    let o = {
        id: a,
        ref: E,
        role: "presentation",
        ...s.props
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: o,
        theirProps: n,
        slot: {},
        defaultTag: lt,
        name: "Menu.Heading"
    });
}
let it = "div";
function ut(T, E) {
    let i = T, a = {
        ref: E,
        role: "separator"
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: a,
        theirProps: i,
        slot: {},
        defaultTag: it,
        name: "Menu.Separator"
    });
}
let dt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Qe), mt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Ze), Tt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(ot), ft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(rt), ct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(st), yt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(pt), Et = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(ut), to = Object.assign(dt, {
    Button: mt,
    Items: Tt,
    Item: ft,
    Section: ct,
    Heading: yt,
    Separator: Et
});
;
}}),

};

//# sourceMappingURL=_aad55931._.js.map