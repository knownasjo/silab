(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/components/sidebar-item.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SideBarItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SideBarItem({ route, imageSrc, title, collapsed = false }) {
    _s();
    const pathName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = route === "/dashboard" ? pathName === "/dashboard" : pathName.startsWith(route);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group/sidebaritem",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: route,
            title: collapsed ? title : undefined,
            "aria-label": collapsed ? title : undefined,
            className: `flex w-full flex-row rounded-full py-3 font-semibold text-[#5E6278] ${collapsed ? "justify-center" : "space-x-3 px-4"} ${isActive ? "bg-[#3285CA] bg-opacity-30" : ""} transition-all duration-300 group-hover/sidebaritem:bg-[#3285CA] group-hover/sidebaritem:bg-opacity-10`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: collapsed ? "" : "transition-all duration-300 group-hover/sidebaritem:translate-x-3",
                    src: imageSrc,
                    height: 24,
                    width: 24,
                    alt: title,
                    priority: true
                }, void 0, false, {
                    fileName: "[project]/app/components/sidebar-item.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "whitespace-nowrap transition-all duration-300 group-hover/sidebaritem:translate-x-3",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/components/sidebar-item.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/sidebar-item.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/sidebar-item.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(SideBarItem, "28xf+Q/MMfpBebWfp+J7Y3ZZbws=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SideBarItem;
var _c;
__turbopack_context__.k.register(_c, "SideBarItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/data:90aab3 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"00c716041119548c04d049d6dfef4615126f61b684":"getToken"},"app/utils/cookie.ts",""] */ __turbopack_context__.s({
    "getToken": (()=>getToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getToken = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00c716041119548c04d049d6dfef4615126f61b684", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getToken"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29va2llLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG4vLyBBY2Nlc3MgdG9rZW4gZGlwZXJiYXJ1aSBzZWRpa2l0IHNlYmVsdW0ga2VkYWx1d2Fyc2EsIHN1cGF5YSBwZXJtaW50YWFuIHlhbmdcbi8vIHNlZGFuZyBiZXJqYWxhbiB0aWRhayBkaXRvbGFrIGJhY2tlbmQgZGkgdGVuZ2FoIGphbGFuLlxuY29uc3QgUkVGUkVTSF9NQVJHSU5fTVMgPSAzMF8wMDA7XG5cbi8qKiBXYWt0dSBrZWRhbHV3YXJzYSBKV1QgZGFsYW0gbWlsaWRldGlrLCBhdGF1IDAgYmlsYSB0b2tlbiB0aWRhayB0ZXJiYWNhLiAqL1xuZnVuY3Rpb24gcmVhZEV4cGlyeSh0b2tlbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShcbiAgICAgIEJ1ZmZlci5mcm9tKHRva2VuLnNwbGl0KFwiLlwiKVsxXSwgXCJiYXNlNjRcIikudG9TdHJpbmcoKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLmV4cCA9PT0gXCJudW1iZXJcIiA/IHBheWxvYWQuZXhwICogMTAwMCA6IDA7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbi8qKlxuICogQWNjZXNzIHRva2VuIHlhbmcgbWFzaWggYmVybGFrdS4gQmlsYSBjb29raWUtbnlhIHN1ZGFoIGhhYmlzIGF0YXUgaGFtcGlyXG4gKiBoYWJpcywgdG9rZW4gYmFydSBkaW1pbnRhIGxlYmloIGR1bHUgZGVuZ2FuIHJlZnJlc2ggdG9rZW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgdG9rZW4gPSBjb29raWUuZ2V0KFwiYWNjZXNzVG9rZW5cIik/LnZhbHVlO1xuXG4gIGlmICh0b2tlbiAmJiByZWFkRXhwaXJ5KHRva2VuKSAtIERhdGUubm93KCkgPiBSRUZSRVNIX01BUkdJTl9NUykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHJldHVybiAoYXdhaXQgcmVmcmVzaEFjY2Vzc1Rva2VuKCkpID8/IHRva2VuO1xufVxuXG4vKipcbiAqIE1lbnVrYXIgcmVmcmVzaCB0b2tlbiBkZW5nYW4gYWNjZXNzIHRva2VuIGJhcnUgZGkgYmFja2VuZCBsYWx1XG4gKiBtZW55aW1wYW5ueWEuIEJpbGEgYmFja2VuZCBtZW5vbGFrIChzZXNpIGxld2F0IDEgaGFyaSksIHNlbXVhIGNvb2tpZSBzZXNpXG4gKiBkaWhhcHVzIHN1cGF5YSBwZW5nZ3VuYSBkaWFyYWhrYW4ga2UgaGFsYW1hbiBsb2dpbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgcmVmcmVzaFRva2VuID0gY29va2llLmdldChcInJlZnJlc2hUb2tlblwiKT8udmFsdWU7XG5cbiAgaWYgKCFyZWZyZXNoVG9rZW4pIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcbiAgdHJ5IHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9hdXRoL3JlZnJlc2hgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWZyZXNoVG9rZW4gfSksXG4gICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBCYWNrZW5kIHRpZGFrIHRlcmphbmdrYXU6IHNlc2kgZGliaWFya2FuLCBkaWNvYmEgbGFnaSBwYWRhIHBlcm1pbnRhYW5cbiAgICAvLyBiZXJpa3V0bnlhLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCAmJiByZXNwb25zZS5zdGF0dXMgPCA1MDApIHtcbiAgICBhd2FpdCBkZWxldGVUb2tlbigpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IChhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gbnVsbCkpPy5kYXRhXG4gICAgPy5hY2Nlc3NUb2tlbjtcblxuICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGF3YWl0IHNldFRva2VuKGFjY2Vzc1Rva2VuKTtcbiAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckRhdGEoKTogUHJvbWlzZTx7XG4gIHJvbGU6IHN0cmluZztcbiAgZnVsbG5hbWU6IHN0cmluZztcbiAgbmltOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG59IHwgbnVsbD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3Qgcm9sZSA9IGNvb2tpZS5nZXQoXCJyb2xlXCIpO1xuICBjb25zdCBmdWxsbmFtZSA9IGNvb2tpZS5nZXQoXCJmdWxsbmFtZVwiKTtcbiAgY29uc3QgbmltID0gY29va2llLmdldChcIm5pbVwiKTtcbiAgY29uc3QgZW1haWwgPSBjb29raWUuZ2V0KFwiZW1haWxcIik7XG5cbiAgaWYgKHJvbGUgJiYgZnVsbG5hbWUgJiYgZW1haWwgJiYgbmltKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvbGU6IHJvbGUudmFsdWUsXG4gICAgICBmdWxsbmFtZTogZnVsbG5hbWUudmFsdWUsXG4gICAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgICBuaW06IG5pbS52YWx1ZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwiYWNjZXNzVG9rZW5cIiwgdG9rZW4sIHtcbiAgICAgIGV4cGlyZXM6IG5ldyBEYXRlKHJlYWRFeHBpcnkodG9rZW4pKSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlZnJlc2ggdG9rZW4gaGFueWEgZGliYWNhIGRpIHNlcnZlciAobGloYXQgcmVmcmVzaEFjY2Vzc1Rva2VuKSwgamFkaVxuICogY29va2llLW55YSBodHRwT25seTogSmF2YVNjcmlwdCBkaSBoYWxhbWFuIHRpZGFrIGJpc2EgbWVtYmFjYW55YS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFJlZnJlc2hUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwicmVmcmVzaFRva2VuXCIsIHRva2VuLCB7XG4gICAgICBleHBpcmVzOiBuZXcgRGF0ZShyZWFkRXhwaXJ5KHRva2VuKSksXG4gICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRVc2VyUm9sZShyb2xlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29va2llID0gYXdhaXQgY29va2llcygpO1xuXG4gIGlmIChyb2xlKSB7XG4gICAgY29va2llLnNldChcInJvbGVcIiwgcm9sZSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29va2llLmRlbGV0ZShcImFjY2Vzc1Rva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicmVmcmVzaFRva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicm9sZVwiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoicVJBeUJzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/data:86ca72 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"00e6fdd9efd39a070309a1e2c81e074e08e73b2e25":"refreshAccessToken"},"app/utils/cookie.ts",""] */ __turbopack_context__.s({
    "refreshAccessToken": (()=>refreshAccessToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var refreshAccessToken = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00e6fdd9efd39a070309a1e2c81e074e08e73b2e25", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "refreshAccessToken"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29va2llLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG4vLyBBY2Nlc3MgdG9rZW4gZGlwZXJiYXJ1aSBzZWRpa2l0IHNlYmVsdW0ga2VkYWx1d2Fyc2EsIHN1cGF5YSBwZXJtaW50YWFuIHlhbmdcbi8vIHNlZGFuZyBiZXJqYWxhbiB0aWRhayBkaXRvbGFrIGJhY2tlbmQgZGkgdGVuZ2FoIGphbGFuLlxuY29uc3QgUkVGUkVTSF9NQVJHSU5fTVMgPSAzMF8wMDA7XG5cbi8qKiBXYWt0dSBrZWRhbHV3YXJzYSBKV1QgZGFsYW0gbWlsaWRldGlrLCBhdGF1IDAgYmlsYSB0b2tlbiB0aWRhayB0ZXJiYWNhLiAqL1xuZnVuY3Rpb24gcmVhZEV4cGlyeSh0b2tlbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShcbiAgICAgIEJ1ZmZlci5mcm9tKHRva2VuLnNwbGl0KFwiLlwiKVsxXSwgXCJiYXNlNjRcIikudG9TdHJpbmcoKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLmV4cCA9PT0gXCJudW1iZXJcIiA/IHBheWxvYWQuZXhwICogMTAwMCA6IDA7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbi8qKlxuICogQWNjZXNzIHRva2VuIHlhbmcgbWFzaWggYmVybGFrdS4gQmlsYSBjb29raWUtbnlhIHN1ZGFoIGhhYmlzIGF0YXUgaGFtcGlyXG4gKiBoYWJpcywgdG9rZW4gYmFydSBkaW1pbnRhIGxlYmloIGR1bHUgZGVuZ2FuIHJlZnJlc2ggdG9rZW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgdG9rZW4gPSBjb29raWUuZ2V0KFwiYWNjZXNzVG9rZW5cIik/LnZhbHVlO1xuXG4gIGlmICh0b2tlbiAmJiByZWFkRXhwaXJ5KHRva2VuKSAtIERhdGUubm93KCkgPiBSRUZSRVNIX01BUkdJTl9NUykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHJldHVybiAoYXdhaXQgcmVmcmVzaEFjY2Vzc1Rva2VuKCkpID8/IHRva2VuO1xufVxuXG4vKipcbiAqIE1lbnVrYXIgcmVmcmVzaCB0b2tlbiBkZW5nYW4gYWNjZXNzIHRva2VuIGJhcnUgZGkgYmFja2VuZCBsYWx1XG4gKiBtZW55aW1wYW5ueWEuIEJpbGEgYmFja2VuZCBtZW5vbGFrIChzZXNpIGxld2F0IDEgaGFyaSksIHNlbXVhIGNvb2tpZSBzZXNpXG4gKiBkaWhhcHVzIHN1cGF5YSBwZW5nZ3VuYSBkaWFyYWhrYW4ga2UgaGFsYW1hbiBsb2dpbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgcmVmcmVzaFRva2VuID0gY29va2llLmdldChcInJlZnJlc2hUb2tlblwiKT8udmFsdWU7XG5cbiAgaWYgKCFyZWZyZXNoVG9rZW4pIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcbiAgdHJ5IHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9hdXRoL3JlZnJlc2hgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWZyZXNoVG9rZW4gfSksXG4gICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBCYWNrZW5kIHRpZGFrIHRlcmphbmdrYXU6IHNlc2kgZGliaWFya2FuLCBkaWNvYmEgbGFnaSBwYWRhIHBlcm1pbnRhYW5cbiAgICAvLyBiZXJpa3V0bnlhLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCAmJiByZXNwb25zZS5zdGF0dXMgPCA1MDApIHtcbiAgICBhd2FpdCBkZWxldGVUb2tlbigpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IChhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gbnVsbCkpPy5kYXRhXG4gICAgPy5hY2Nlc3NUb2tlbjtcblxuICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGF3YWl0IHNldFRva2VuKGFjY2Vzc1Rva2VuKTtcbiAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckRhdGEoKTogUHJvbWlzZTx7XG4gIHJvbGU6IHN0cmluZztcbiAgZnVsbG5hbWU6IHN0cmluZztcbiAgbmltOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG59IHwgbnVsbD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3Qgcm9sZSA9IGNvb2tpZS5nZXQoXCJyb2xlXCIpO1xuICBjb25zdCBmdWxsbmFtZSA9IGNvb2tpZS5nZXQoXCJmdWxsbmFtZVwiKTtcbiAgY29uc3QgbmltID0gY29va2llLmdldChcIm5pbVwiKTtcbiAgY29uc3QgZW1haWwgPSBjb29raWUuZ2V0KFwiZW1haWxcIik7XG5cbiAgaWYgKHJvbGUgJiYgZnVsbG5hbWUgJiYgZW1haWwgJiYgbmltKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvbGU6IHJvbGUudmFsdWUsXG4gICAgICBmdWxsbmFtZTogZnVsbG5hbWUudmFsdWUsXG4gICAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgICBuaW06IG5pbS52YWx1ZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwiYWNjZXNzVG9rZW5cIiwgdG9rZW4sIHtcbiAgICAgIGV4cGlyZXM6IG5ldyBEYXRlKHJlYWRFeHBpcnkodG9rZW4pKSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlZnJlc2ggdG9rZW4gaGFueWEgZGliYWNhIGRpIHNlcnZlciAobGloYXQgcmVmcmVzaEFjY2Vzc1Rva2VuKSwgamFkaVxuICogY29va2llLW55YSBodHRwT25seTogSmF2YVNjcmlwdCBkaSBoYWxhbWFuIHRpZGFrIGJpc2EgbWVtYmFjYW55YS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFJlZnJlc2hUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwicmVmcmVzaFRva2VuXCIsIHRva2VuLCB7XG4gICAgICBleHBpcmVzOiBuZXcgRGF0ZShyZWFkRXhwaXJ5KHRva2VuKSksXG4gICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRVc2VyUm9sZShyb2xlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29va2llID0gYXdhaXQgY29va2llcygpO1xuXG4gIGlmIChyb2xlKSB7XG4gICAgY29va2llLnNldChcInJvbGVcIiwgcm9sZSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29va2llLmRlbGV0ZShcImFjY2Vzc1Rva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicmVmcmVzaFRva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicm9sZVwiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1JBMENzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/satellite/index.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$90aab3__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/utils/data:90aab3 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$86ca72__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/utils/data:86ca72 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
;
const satellite = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:3000"),
    timeout: 20_000
});
/**
 * Membaca cookie accessToken langsung dari browser.
 *
 * Sebelumnya setiap permintaan memanggil getToken(), sebuah server action,
 * sehingga harus bolak-balik ke server hanya untuk membaca cookie. Tepat
 * setelah login, panggilan itu mengantre di belakang navigasi yang sedang
 * berjalan dan membuat halaman tampak kosong sampai di-refresh.
 *
 * Cookie ini memang terbaca JavaScript karena diset tanpa httpOnly, jadi
 * membacanya di sini tidak menambah risiko apa pun yang belum ada.
 */ const readTokenFromBrowser = ()=>{
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : undefined;
};
satellite.interceptors.request.use(async (request)=>{
    // Cookie accessToken hilang sendiri saat tokennya kedaluwarsa; getToken()
    // lalu meminta token baru dengan refresh token.
    const token = readTokenFromBrowser() ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$90aab3__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getToken"])();
    if (token) request.headers["Authorization"] = `Bearer ${token}`;
    return request;
}, async (error)=>Promise.reject(error));
// Beberapa permintaan yang gagal bersamaan cukup memicu satu refresh.
let pendingRefresh = null;
const refreshOnce = ()=>pendingRefresh ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$86ca72__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["refreshAccessToken"])().finally(()=>{
        pendingRefresh = null;
    });
satellite.interceptors.response.use(async (response)=>response, async (error)=>{
    const request = error.config;
    // Jam browser bisa tertinggal dari jam server, sehingga cookie masih
    // terkirim padahal backend sudah menganggap tokennya kedaluwarsa.
    // Permintaan itu diulang sekali dengan token baru.
    if (error.response?.data?.message === "jwt expired" && request && !request._retried) {
        const token = await refreshOnce();
        if (token) {
            request._retried = true;
            request.headers["Authorization"] = `Bearer ${token}`;
            return satellite(request);
        }
    }
    if (error.response) {
        const errorMessage = error.response.data.message || "An unknown error occurred";
        return Promise.reject({
            status: false,
            message: errorMessage
        });
    }
    return Promise.reject({
        status: false,
        message: "Network error, please try again!"
    });
});
const __TURBOPACK__default__export__ = satellite;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/auth/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getMe": (()=>getMe),
    "postLogin": (()=>postLogin)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/satellite/index.ts [app-client] (ecmascript)");
;
const postLogin = async (body)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/auth/login", body);
    return res.data;
};
const getMe = async ()=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$satellite$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/auth/me");
    return res.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/data:f6653c [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"00cb91416e49994049c15005d61718a3498624f979":"deleteToken"},"app/utils/cookie.ts",""] */ __turbopack_context__.s({
    "deleteToken": (()=>deleteToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var deleteToken = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00cb91416e49994049c15005d61718a3498624f979", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "deleteToken"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29va2llLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG4vLyBBY2Nlc3MgdG9rZW4gZGlwZXJiYXJ1aSBzZWRpa2l0IHNlYmVsdW0ga2VkYWx1d2Fyc2EsIHN1cGF5YSBwZXJtaW50YWFuIHlhbmdcbi8vIHNlZGFuZyBiZXJqYWxhbiB0aWRhayBkaXRvbGFrIGJhY2tlbmQgZGkgdGVuZ2FoIGphbGFuLlxuY29uc3QgUkVGUkVTSF9NQVJHSU5fTVMgPSAzMF8wMDA7XG5cbi8qKiBXYWt0dSBrZWRhbHV3YXJzYSBKV1QgZGFsYW0gbWlsaWRldGlrLCBhdGF1IDAgYmlsYSB0b2tlbiB0aWRhayB0ZXJiYWNhLiAqL1xuZnVuY3Rpb24gcmVhZEV4cGlyeSh0b2tlbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShcbiAgICAgIEJ1ZmZlci5mcm9tKHRva2VuLnNwbGl0KFwiLlwiKVsxXSwgXCJiYXNlNjRcIikudG9TdHJpbmcoKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLmV4cCA9PT0gXCJudW1iZXJcIiA/IHBheWxvYWQuZXhwICogMTAwMCA6IDA7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbi8qKlxuICogQWNjZXNzIHRva2VuIHlhbmcgbWFzaWggYmVybGFrdS4gQmlsYSBjb29raWUtbnlhIHN1ZGFoIGhhYmlzIGF0YXUgaGFtcGlyXG4gKiBoYWJpcywgdG9rZW4gYmFydSBkaW1pbnRhIGxlYmloIGR1bHUgZGVuZ2FuIHJlZnJlc2ggdG9rZW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgdG9rZW4gPSBjb29raWUuZ2V0KFwiYWNjZXNzVG9rZW5cIik/LnZhbHVlO1xuXG4gIGlmICh0b2tlbiAmJiByZWFkRXhwaXJ5KHRva2VuKSAtIERhdGUubm93KCkgPiBSRUZSRVNIX01BUkdJTl9NUykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHJldHVybiAoYXdhaXQgcmVmcmVzaEFjY2Vzc1Rva2VuKCkpID8/IHRva2VuO1xufVxuXG4vKipcbiAqIE1lbnVrYXIgcmVmcmVzaCB0b2tlbiBkZW5nYW4gYWNjZXNzIHRva2VuIGJhcnUgZGkgYmFja2VuZCBsYWx1XG4gKiBtZW55aW1wYW5ueWEuIEJpbGEgYmFja2VuZCBtZW5vbGFrIChzZXNpIGxld2F0IDEgaGFyaSksIHNlbXVhIGNvb2tpZSBzZXNpXG4gKiBkaWhhcHVzIHN1cGF5YSBwZW5nZ3VuYSBkaWFyYWhrYW4ga2UgaGFsYW1hbiBsb2dpbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgcmVmcmVzaFRva2VuID0gY29va2llLmdldChcInJlZnJlc2hUb2tlblwiKT8udmFsdWU7XG5cbiAgaWYgKCFyZWZyZXNoVG9rZW4pIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcbiAgdHJ5IHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9hdXRoL3JlZnJlc2hgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWZyZXNoVG9rZW4gfSksXG4gICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBCYWNrZW5kIHRpZGFrIHRlcmphbmdrYXU6IHNlc2kgZGliaWFya2FuLCBkaWNvYmEgbGFnaSBwYWRhIHBlcm1pbnRhYW5cbiAgICAvLyBiZXJpa3V0bnlhLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCAmJiByZXNwb25zZS5zdGF0dXMgPCA1MDApIHtcbiAgICBhd2FpdCBkZWxldGVUb2tlbigpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IChhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gbnVsbCkpPy5kYXRhXG4gICAgPy5hY2Nlc3NUb2tlbjtcblxuICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGF3YWl0IHNldFRva2VuKGFjY2Vzc1Rva2VuKTtcbiAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckRhdGEoKTogUHJvbWlzZTx7XG4gIHJvbGU6IHN0cmluZztcbiAgZnVsbG5hbWU6IHN0cmluZztcbiAgbmltOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG59IHwgbnVsbD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3Qgcm9sZSA9IGNvb2tpZS5nZXQoXCJyb2xlXCIpO1xuICBjb25zdCBmdWxsbmFtZSA9IGNvb2tpZS5nZXQoXCJmdWxsbmFtZVwiKTtcbiAgY29uc3QgbmltID0gY29va2llLmdldChcIm5pbVwiKTtcbiAgY29uc3QgZW1haWwgPSBjb29raWUuZ2V0KFwiZW1haWxcIik7XG5cbiAgaWYgKHJvbGUgJiYgZnVsbG5hbWUgJiYgZW1haWwgJiYgbmltKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvbGU6IHJvbGUudmFsdWUsXG4gICAgICBmdWxsbmFtZTogZnVsbG5hbWUudmFsdWUsXG4gICAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgICBuaW06IG5pbS52YWx1ZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwiYWNjZXNzVG9rZW5cIiwgdG9rZW4sIHtcbiAgICAgIGV4cGlyZXM6IG5ldyBEYXRlKHJlYWRFeHBpcnkodG9rZW4pKSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlZnJlc2ggdG9rZW4gaGFueWEgZGliYWNhIGRpIHNlcnZlciAobGloYXQgcmVmcmVzaEFjY2Vzc1Rva2VuKSwgamFkaVxuICogY29va2llLW55YSBodHRwT25seTogSmF2YVNjcmlwdCBkaSBoYWxhbWFuIHRpZGFrIGJpc2EgbWVtYmFjYW55YS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFJlZnJlc2hUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwicmVmcmVzaFRva2VuXCIsIHRva2VuLCB7XG4gICAgICBleHBpcmVzOiBuZXcgRGF0ZShyZWFkRXhwaXJ5KHRva2VuKSksXG4gICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRVc2VyUm9sZShyb2xlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29va2llID0gYXdhaXQgY29va2llcygpO1xuXG4gIGlmIChyb2xlKSB7XG4gICAgY29va2llLnNldChcInJvbGVcIiwgcm9sZSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29va2llLmRlbGV0ZShcImFjY2Vzc1Rva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicmVmcmVzaFRva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicm9sZVwiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoid1JBd0lzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/data:62d7ff [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"400766dd8b9e4dbb6ff82ea71693332a2e871cba65":"setRefreshToken"},"app/utils/cookie.ts",""] */ __turbopack_context__.s({
    "setRefreshToken": (()=>setRefreshToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var setRefreshToken = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("400766dd8b9e4dbb6ff82ea71693332a2e871cba65", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "setRefreshToken"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29va2llLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG4vLyBBY2Nlc3MgdG9rZW4gZGlwZXJiYXJ1aSBzZWRpa2l0IHNlYmVsdW0ga2VkYWx1d2Fyc2EsIHN1cGF5YSBwZXJtaW50YWFuIHlhbmdcbi8vIHNlZGFuZyBiZXJqYWxhbiB0aWRhayBkaXRvbGFrIGJhY2tlbmQgZGkgdGVuZ2FoIGphbGFuLlxuY29uc3QgUkVGUkVTSF9NQVJHSU5fTVMgPSAzMF8wMDA7XG5cbi8qKiBXYWt0dSBrZWRhbHV3YXJzYSBKV1QgZGFsYW0gbWlsaWRldGlrLCBhdGF1IDAgYmlsYSB0b2tlbiB0aWRhayB0ZXJiYWNhLiAqL1xuZnVuY3Rpb24gcmVhZEV4cGlyeSh0b2tlbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShcbiAgICAgIEJ1ZmZlci5mcm9tKHRva2VuLnNwbGl0KFwiLlwiKVsxXSwgXCJiYXNlNjRcIikudG9TdHJpbmcoKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLmV4cCA9PT0gXCJudW1iZXJcIiA/IHBheWxvYWQuZXhwICogMTAwMCA6IDA7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbi8qKlxuICogQWNjZXNzIHRva2VuIHlhbmcgbWFzaWggYmVybGFrdS4gQmlsYSBjb29raWUtbnlhIHN1ZGFoIGhhYmlzIGF0YXUgaGFtcGlyXG4gKiBoYWJpcywgdG9rZW4gYmFydSBkaW1pbnRhIGxlYmloIGR1bHUgZGVuZ2FuIHJlZnJlc2ggdG9rZW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgdG9rZW4gPSBjb29raWUuZ2V0KFwiYWNjZXNzVG9rZW5cIik/LnZhbHVlO1xuXG4gIGlmICh0b2tlbiAmJiByZWFkRXhwaXJ5KHRva2VuKSAtIERhdGUubm93KCkgPiBSRUZSRVNIX01BUkdJTl9NUykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHJldHVybiAoYXdhaXQgcmVmcmVzaEFjY2Vzc1Rva2VuKCkpID8/IHRva2VuO1xufVxuXG4vKipcbiAqIE1lbnVrYXIgcmVmcmVzaCB0b2tlbiBkZW5nYW4gYWNjZXNzIHRva2VuIGJhcnUgZGkgYmFja2VuZCBsYWx1XG4gKiBtZW55aW1wYW5ueWEuIEJpbGEgYmFja2VuZCBtZW5vbGFrIChzZXNpIGxld2F0IDEgaGFyaSksIHNlbXVhIGNvb2tpZSBzZXNpXG4gKiBkaWhhcHVzIHN1cGF5YSBwZW5nZ3VuYSBkaWFyYWhrYW4ga2UgaGFsYW1hbiBsb2dpbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgcmVmcmVzaFRva2VuID0gY29va2llLmdldChcInJlZnJlc2hUb2tlblwiKT8udmFsdWU7XG5cbiAgaWYgKCFyZWZyZXNoVG9rZW4pIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcbiAgdHJ5IHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9hdXRoL3JlZnJlc2hgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWZyZXNoVG9rZW4gfSksXG4gICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBCYWNrZW5kIHRpZGFrIHRlcmphbmdrYXU6IHNlc2kgZGliaWFya2FuLCBkaWNvYmEgbGFnaSBwYWRhIHBlcm1pbnRhYW5cbiAgICAvLyBiZXJpa3V0bnlhLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCAmJiByZXNwb25zZS5zdGF0dXMgPCA1MDApIHtcbiAgICBhd2FpdCBkZWxldGVUb2tlbigpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IChhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gbnVsbCkpPy5kYXRhXG4gICAgPy5hY2Nlc3NUb2tlbjtcblxuICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGF3YWl0IHNldFRva2VuKGFjY2Vzc1Rva2VuKTtcbiAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckRhdGEoKTogUHJvbWlzZTx7XG4gIHJvbGU6IHN0cmluZztcbiAgZnVsbG5hbWU6IHN0cmluZztcbiAgbmltOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG59IHwgbnVsbD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3Qgcm9sZSA9IGNvb2tpZS5nZXQoXCJyb2xlXCIpO1xuICBjb25zdCBmdWxsbmFtZSA9IGNvb2tpZS5nZXQoXCJmdWxsbmFtZVwiKTtcbiAgY29uc3QgbmltID0gY29va2llLmdldChcIm5pbVwiKTtcbiAgY29uc3QgZW1haWwgPSBjb29raWUuZ2V0KFwiZW1haWxcIik7XG5cbiAgaWYgKHJvbGUgJiYgZnVsbG5hbWUgJiYgZW1haWwgJiYgbmltKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvbGU6IHJvbGUudmFsdWUsXG4gICAgICBmdWxsbmFtZTogZnVsbG5hbWUudmFsdWUsXG4gICAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgICBuaW06IG5pbS52YWx1ZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwiYWNjZXNzVG9rZW5cIiwgdG9rZW4sIHtcbiAgICAgIGV4cGlyZXM6IG5ldyBEYXRlKHJlYWRFeHBpcnkodG9rZW4pKSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlZnJlc2ggdG9rZW4gaGFueWEgZGliYWNhIGRpIHNlcnZlciAobGloYXQgcmVmcmVzaEFjY2Vzc1Rva2VuKSwgamFkaVxuICogY29va2llLW55YSBodHRwT25seTogSmF2YVNjcmlwdCBkaSBoYWxhbWFuIHRpZGFrIGJpc2EgbWVtYmFjYW55YS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFJlZnJlc2hUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwicmVmcmVzaFRva2VuXCIsIHRva2VuLCB7XG4gICAgICBleHBpcmVzOiBuZXcgRGF0ZShyZWFkRXhwaXJ5KHRva2VuKSksXG4gICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRVc2VyUm9sZShyb2xlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29va2llID0gYXdhaXQgY29va2llcygpO1xuXG4gIGlmIChyb2xlKSB7XG4gICAgY29va2llLnNldChcInJvbGVcIiwgcm9sZSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29va2llLmRlbGV0ZShcImFjY2Vzc1Rva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicmVmcmVzaFRva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicm9sZVwiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNFJBb0hzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/data:3fc9af [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"40edbeaf989a13a4d0da396a0295b9a8a34e7956dd":"setToken"},"app/utils/cookie.ts",""] */ __turbopack_context__.s({
    "setToken": (()=>setToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var setToken = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40edbeaf989a13a4d0da396a0295b9a8a34e7956dd", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "setToken"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29va2llLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG4vLyBBY2Nlc3MgdG9rZW4gZGlwZXJiYXJ1aSBzZWRpa2l0IHNlYmVsdW0ga2VkYWx1d2Fyc2EsIHN1cGF5YSBwZXJtaW50YWFuIHlhbmdcbi8vIHNlZGFuZyBiZXJqYWxhbiB0aWRhayBkaXRvbGFrIGJhY2tlbmQgZGkgdGVuZ2FoIGphbGFuLlxuY29uc3QgUkVGUkVTSF9NQVJHSU5fTVMgPSAzMF8wMDA7XG5cbi8qKiBXYWt0dSBrZWRhbHV3YXJzYSBKV1QgZGFsYW0gbWlsaWRldGlrLCBhdGF1IDAgYmlsYSB0b2tlbiB0aWRhayB0ZXJiYWNhLiAqL1xuZnVuY3Rpb24gcmVhZEV4cGlyeSh0b2tlbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShcbiAgICAgIEJ1ZmZlci5mcm9tKHRva2VuLnNwbGl0KFwiLlwiKVsxXSwgXCJiYXNlNjRcIikudG9TdHJpbmcoKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLmV4cCA9PT0gXCJudW1iZXJcIiA/IHBheWxvYWQuZXhwICogMTAwMCA6IDA7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbi8qKlxuICogQWNjZXNzIHRva2VuIHlhbmcgbWFzaWggYmVybGFrdS4gQmlsYSBjb29raWUtbnlhIHN1ZGFoIGhhYmlzIGF0YXUgaGFtcGlyXG4gKiBoYWJpcywgdG9rZW4gYmFydSBkaW1pbnRhIGxlYmloIGR1bHUgZGVuZ2FuIHJlZnJlc2ggdG9rZW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgdG9rZW4gPSBjb29raWUuZ2V0KFwiYWNjZXNzVG9rZW5cIik/LnZhbHVlO1xuXG4gIGlmICh0b2tlbiAmJiByZWFkRXhwaXJ5KHRva2VuKSAtIERhdGUubm93KCkgPiBSRUZSRVNIX01BUkdJTl9NUykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHJldHVybiAoYXdhaXQgcmVmcmVzaEFjY2Vzc1Rva2VuKCkpID8/IHRva2VuO1xufVxuXG4vKipcbiAqIE1lbnVrYXIgcmVmcmVzaCB0b2tlbiBkZW5nYW4gYWNjZXNzIHRva2VuIGJhcnUgZGkgYmFja2VuZCBsYWx1XG4gKiBtZW55aW1wYW5ueWEuIEJpbGEgYmFja2VuZCBtZW5vbGFrIChzZXNpIGxld2F0IDEgaGFyaSksIHNlbXVhIGNvb2tpZSBzZXNpXG4gKiBkaWhhcHVzIHN1cGF5YSBwZW5nZ3VuYSBkaWFyYWhrYW4ga2UgaGFsYW1hbiBsb2dpbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3QgcmVmcmVzaFRva2VuID0gY29va2llLmdldChcInJlZnJlc2hUb2tlblwiKT8udmFsdWU7XG5cbiAgaWYgKCFyZWZyZXNoVG9rZW4pIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcbiAgdHJ5IHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9hdXRoL3JlZnJlc2hgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWZyZXNoVG9rZW4gfSksXG4gICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBCYWNrZW5kIHRpZGFrIHRlcmphbmdrYXU6IHNlc2kgZGliaWFya2FuLCBkaWNvYmEgbGFnaSBwYWRhIHBlcm1pbnRhYW5cbiAgICAvLyBiZXJpa3V0bnlhLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCAmJiByZXNwb25zZS5zdGF0dXMgPCA1MDApIHtcbiAgICBhd2FpdCBkZWxldGVUb2tlbigpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IChhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gbnVsbCkpPy5kYXRhXG4gICAgPy5hY2Nlc3NUb2tlbjtcblxuICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGF3YWl0IHNldFRva2VuKGFjY2Vzc1Rva2VuKTtcbiAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckRhdGEoKTogUHJvbWlzZTx7XG4gIHJvbGU6IHN0cmluZztcbiAgZnVsbG5hbWU6IHN0cmluZztcbiAgbmltOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG59IHwgbnVsbD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3Qgcm9sZSA9IGNvb2tpZS5nZXQoXCJyb2xlXCIpO1xuICBjb25zdCBmdWxsbmFtZSA9IGNvb2tpZS5nZXQoXCJmdWxsbmFtZVwiKTtcbiAgY29uc3QgbmltID0gY29va2llLmdldChcIm5pbVwiKTtcbiAgY29uc3QgZW1haWwgPSBjb29raWUuZ2V0KFwiZW1haWxcIik7XG5cbiAgaWYgKHJvbGUgJiYgZnVsbG5hbWUgJiYgZW1haWwgJiYgbmltKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvbGU6IHJvbGUudmFsdWUsXG4gICAgICBmdWxsbmFtZTogZnVsbG5hbWUudmFsdWUsXG4gICAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgICBuaW06IG5pbS52YWx1ZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwiYWNjZXNzVG9rZW5cIiwgdG9rZW4sIHtcbiAgICAgIGV4cGlyZXM6IG5ldyBEYXRlKHJlYWRFeHBpcnkodG9rZW4pKSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlZnJlc2ggdG9rZW4gaGFueWEgZGliYWNhIGRpIHNlcnZlciAobGloYXQgcmVmcmVzaEFjY2Vzc1Rva2VuKSwgamFkaVxuICogY29va2llLW55YSBodHRwT25seTogSmF2YVNjcmlwdCBkaSBoYWxhbWFuIHRpZGFrIGJpc2EgbWVtYmFjYW55YS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFJlZnJlc2hUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGNvb2tpZXMoKTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBjb29raWUuc2V0KFwicmVmcmVzaFRva2VuXCIsIHRva2VuLCB7XG4gICAgICBleHBpcmVzOiBuZXcgRGF0ZShyZWFkRXhwaXJ5KHRva2VuKSksXG4gICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRVc2VyUm9sZShyb2xlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29va2llID0gYXdhaXQgY29va2llcygpO1xuXG4gIGlmIChyb2xlKSB7XG4gICAgY29va2llLnNldChcInJvbGVcIiwgcm9sZSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBjb29raWUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29va2llLmRlbGV0ZShcImFjY2Vzc1Rva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicmVmcmVzaFRva2VuXCIpO1xuICBjb29raWUuZGVsZXRlKFwicm9sZVwiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoicVJBc0dzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/store/useAuthStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$auth$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/auth/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$f6653c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/utils/data:f6653c [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$62d7ff__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/utils/data:62d7ff [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$3fc9af__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/utils/data:3fc9af [app-client] (ecmascript) <text/javascript>");
;
;
;
const initialAuthState = {
    isLoading: false,
    error: null,
    userData: null
};
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialAuthState,
        login: async (body)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$auth$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postLogin"])(body);
                if (res.status && res.data) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$3fc9af__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["setToken"])(res.data.accessToken);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$62d7ff__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["setRefreshToken"])(res.data.refreshToken);
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
        logout: async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$data$3a$f6653c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteToken"])();
            set({
                ...initialAuthState
            });
        },
        me: async ()=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$auth$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])();
                if (res.status && res.data) {
                    set({
                        userData: res.data
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
        reset: async ()=>{
            set({
                ...initialAuthState
            });
        }
    }));
const __TURBOPACK__default__export__ = useAuthStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/signout-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SignOutButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useAuthStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function SignOutButton({ collapsed = false }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { logout, userData, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignOutButton.useEffect": ()=>{
            if (!userData && !isLoading && error) {
                router.replace("/auth");
            }
        }
    }["SignOutButton.useEffect"], [
        router,
        userData,
        isLoading,
        error
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group/sidebaritem",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(true),
                title: collapsed ? "Sign Out" : undefined,
                "aria-label": collapsed ? "Sign Out" : undefined,
                className: `flex w-full flex-row rounded-full py-3 font-semibold text-[#FE2F60] transition-all duration-300 group-hover/sidebaritem:bg-[#FBEFEF] ${collapsed ? "justify-center" : "space-x-3 px-4"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: collapsed ? "" : "transition-all duration-300 group-hover/sidebaritem:translate-x-3",
                        src: "/logout.png",
                        height: 24,
                        width: 24,
                        alt: "logout"
                    }, void 0, false, {
                        fileName: "[project]/app/components/signout-button.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "whitespace-nowrap transition-all duration-300 group-hover/sidebaritem:translate-x-3",
                        children: "Sign Out"
                    }, void 0, false, {
                        fileName: "[project]/app/components/signout-button.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/signout-button.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                onClose: ()=>setIsOpen(false),
                open: isOpen,
                className: "relative z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"], {
                        className: "fixed inset-0 bg-black/30"
                    }, void 0, false, {
                        fileName: "[project]/app/components/signout-button.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 flex w-screen items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPanel"], {
                            className: "flex h-[200px] w-[500px] flex-col justify-between rounded-2xl bg-white p-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "font-bold text-[#FE2F60]",
                                    children: "Sign Out"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/signout-button.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Apakah anda ingin keluar?"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/signout-button.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "rounded-full bg-[#FF0000] px-4 py-2 text-white",
                                            onClick: ()=>setIsOpen(false),
                                            children: "Batal"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/signout-button.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-[#FF0000]",
                                            onClick: async ()=>{
                                                await logout();
                                                setIsOpen(false);
                                                router.replace("/auth");
                                            },
                                            children: "Keluar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/signout-button.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/signout-button.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/signout-button.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/signout-button.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/signout-button.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/signout-button.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(SignOutButton, "2wg/Ia2SWJURg5Q598gBX+BHHVM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = SignOutButton;
var _c;
__turbopack_context__.k.register(_c, "SignOutButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/sidebar-group.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SidebarGroup)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$close$2d$button$2f$close$2d$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/close-button/close-button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$disclosure$2f$disclosure$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/disclosure/disclosure.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/popover/popover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SidebarGroup({ title, icon, basePath, links, collapsed }) {
    _s();
    const pathName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = pathName.startsWith(basePath);
    const linkClassName = (href)=>`flex h-full w-full flex-row items-center space-x-2 rounded-full px-3 py-2 hover:bg-[#3285CA] hover:bg-opacity-10 ${pathName.startsWith(href) ? "bg-[#3285CA] bg-opacity-30" : ""}`;
    const linkContent = (link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative h-[20px] w-[20px] shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: link.icon,
                        alt: "",
                        fill: true,
                        style: {
                            objectFit: "contain"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/sidebar-group.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/sidebar-group.tsx",
                    lineNumber: 45,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "whitespace-nowrap text-base font-medium text-[#5E6278]",
                    children: link.title
                }, void 0, false, {
                    fileName: "[project]/app/components/sidebar-group.tsx",
                    lineNumber: 48,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true);
    if (collapsed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
            className: "w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverButton"], {
                    title: title,
                    "aria-label": title,
                    className: `flex w-full items-center justify-center rounded-full py-3 outline-none transition-all duration-300 hover:bg-[#3285CA] hover:bg-opacity-10 ${isActive ? "bg-[#3285CA] bg-opacity-30" : ""}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: icon,
                        alt: "",
                        width: 24,
                        height: 24
                    }, void 0, false, {
                        fileName: "[project]/app/components/sidebar-group.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/sidebar-group.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverPanel"], {
                    anchor: {
                        to: "right start",
                        gap: 16
                    },
                    className: "z-50 flex w-60 flex-col space-y-1 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "px-3 pb-1 text-sm font-semibold text-[#5E6278]",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/app/components/sidebar-group.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$close$2d$button$2f$close$2d$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloseButton"], {
                                as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                href: link.href,
                                className: linkClassName(link.href),
                                children: linkContent(link)
                            }, link.href, false, {
                                fileName: "[project]/app/components/sidebar-group.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/sidebar-group.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/sidebar-group.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group/sidebaritem w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$disclosure$2f$disclosure$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Disclosure"], {
            defaultOpen: isActive,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$disclosure$2f$disclosure$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisclosureButton"], {
                    className: `group flex w-full flex-row items-center justify-between rounded-full py-3 pl-4 pr-6 transition-all duration-300 group-hover/sidebaritem:bg-[#3285CA] group-hover/sidebaritem:bg-opacity-10 ${isActive ? "bg-[#3285CA] bg-opacity-30" : ""}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-row space-x-3 transition-all duration-300 group-hover/sidebaritem:translate-x-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: icon,
                                    alt: "",
                                    width: 24,
                                    height: 24
                                }, void 0, false, {
                                    fileName: "[project]/app/components/sidebar-group.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "whitespace-nowrap font-semibold text-[#5E6278]",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/app/components/sidebar-group.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/sidebar-group.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative h-5 w-5 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/down.png",
                                alt: "",
                                fill: true,
                                style: {
                                    objectFit: "contain"
                                },
                                className: "duration-300 group-hover/sidebaritem:translate-x-3 group-data-[open]:rotate-180"
                            }, void 0, false, {
                                fileName: "[project]/app/components/sidebar-group.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/sidebar-group.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/sidebar-group.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$disclosure$2f$disclosure$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisclosurePanel"], {
                    className: `ml-8 mt-2 space-y-3`,
                    children: links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: link.href,
                            className: linkClassName(link.href),
                            children: linkContent(link)
                        }, link.href, false, {
                            fileName: "[project]/app/components/sidebar-group.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/sidebar-group.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/sidebar-group.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/sidebar-group.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(SidebarGroup, "28xf+Q/MMfpBebWfp+J7Y3ZZbws=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SidebarGroup;
var _c;
__turbopack_context__.k.register(_c, "SidebarGroup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/sidebar.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Dibaca layout di server supaya lebar sidebar sudah benar sejak render
// pertama, tanpa kedipan saat halaman dimuat ulang.
__turbopack_context__.s({
    "SIDEBAR_COLLAPSED_COOKIE": (()=>SIDEBAR_COLLAPSED_COOKIE)
});
const SIDEBAR_COLLAPSED_COOKIE = "sidebar-collapsed";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/sidebar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SideBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/sidebar-item.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$signout$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/signout-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/sidebar-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useAuthStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$sidebar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/sidebar.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$loading$2d$skeleton$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-loading-skeleton/dist/index.js [app-client] (ecmascript)");
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
const sideBarItems = [
    {
        imageSrc: "/dashboard.png",
        route: "/dashboard",
        title: "Dashboard"
    },
    {
        imageSrc: "/bookmark.png",
        route: "/dashboard/praktikum",
        title: "Praktikum"
    }
];
const masterDataLinks = [
    {
        href: "/dashboard/master-data/add-subject",
        title: "Tambah Mata Kuliah",
        icon: "/add-announcement.png"
    },
    {
        href: "/dashboard/master-data/pembayaran",
        title: "Pembayaran",
        icon: "/information.png"
    }
];
const pengumumanLinks = [
    {
        href: "/dashboard/pengumuman/add-pengumuman",
        title: "Buat Pengumuman",
        icon: "/add-announcement.png"
    },
    {
        href: "/dashboard/pengumuman/list-pengumuman",
        title: "List Pengumuman",
        icon: "/announcement-list.png"
    }
];
function SideBar({ initialCollapsed = false }) {
    _s();
    const { userData, me, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCollapsed);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SideBar.useEffect": ()=>{
            me();
        }
    }["SideBar.useEffect"], [
        me
    ]);
    const toggleCollapsed = ()=>{
        const next = !collapsed;
        setCollapsed(next);
        document.cookie = `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$sidebar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIDEBAR_COLLAPSED_COOKIE"]}=${next ? "1" : "0"}; path=/; max-age=31536000; samesite=lax`;
    };
    const isRoleUnknown = !userData && isLoading;
    const toggleLabel = collapsed ? "Perluas menu" : "Perkecil menu";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: `relative flex h-full shrink-0 flex-col justify-between py-12 transition-[width,padding] duration-300 ${collapsed ? "w-[104px] px-6" : "w-[300px] px-8"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: toggleCollapsed,
                title: toggleLabel,
                "aria-label": toggleLabel,
                "aria-expanded": !collapsed,
                className: "absolute -right-4 top-14 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#E4E6EF] bg-white shadow-sm transition-colors hover:bg-[#F1F1F2]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `relative h-4 w-4 transition-transform duration-300 ${collapsed ? "-rotate-90" : "rotate-90"}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/down.png",
                        alt: "",
                        fill: true,
                        style: {
                            objectFit: "contain"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/sidebar.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/sidebar.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/sidebar.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex min-h-0 w-full flex-1 flex-col space-y-5 overflow-y-auto overflow-x-hidden",
                children: [
                    sideBarItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            imageSrc: item.imageSrc,
                            route: item.route,
                            title: item.title,
                            collapsed: collapsed
                        }, item.title, false, {
                            fileName: "[project]/app/components/sidebar.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)),
                    isRoleUnknown && [
                        ...Array(2)
                    ].map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-10 w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$loading$2d$skeleton$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                height: 40,
                                borderRadius: 9999
                            }, void 0, false, {
                                fileName: "[project]/app/components/sidebar.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this)
                        }, index, false, {
                            fileName: "[project]/app/components/sidebar.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)),
                    userData?.role === "LABORAN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                title: "Master Data",
                                icon: "/master-data.png",
                                basePath: "/dashboard/master-data/",
                                links: masterDataLinks,
                                collapsed: collapsed
                            }, void 0, false, {
                                fileName: "[project]/app/components/sidebar.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                title: "Pengumuman",
                                icon: "/announcement.png",
                                basePath: "/dashboard/pengumuman/",
                                links: pengumumanLinks,
                                collapsed: collapsed
                            }, void 0, false, {
                                fileName: "[project]/app/components/sidebar.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/sidebar.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$signout$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    collapsed: collapsed
                }, void 0, false, {
                    fileName: "[project]/app/components/sidebar.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/sidebar.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/sidebar.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(SideBar, "D0/PKVC9RdGL8xjyhT1/Fe9AO7c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useAuthStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = SideBar;
var _c;
__turbopack_context__.k.register(_c, "SideBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_8facca92._.js.map