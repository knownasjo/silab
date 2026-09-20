(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/dashboard/praktikum/recap-attendances/downloadpdf.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DownloadPDFClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html2canvas/dist/html2canvas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function DownloadPDFClient() {
    _s();
    const downloadPDF = async ()=>{
        const element = document.getElementById("recap-attendances");
        if (!element) {
            console.error("Element not found for PDF generation.");
            return;
        }
        const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(element, {
            scale: 2
        });
        const imageData = canvas.toDataURL("image/png");
        const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
            orientation: "portrait",
            unit: "px",
            format: "a4"
        });
        // A4 size dimensions
        const pageWidth = 210; // mm
        const pageHeight = 297; // mm
        // Calculate image dimensions to maintain aspect ratio
        const imgWidth = pageWidth - 20; // Leave 10mm margin on each side
        const imgHeight = canvas.height * imgWidth / canvas.width;
        // Center the image vertically on the page
        const xOffset = (pageWidth - imgWidth) / 2;
        const yOffset = (pageHeight - imgHeight) / 2;
        // Add the image to the PDF
        pdf.addImage(imageData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
        // Save the PDF
        pdf.save("attendance-recap.pdf");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DownloadPDFClient.useEffect": ()=>{
            downloadPDF();
        }
    }["DownloadPDFClient.useEffect"], []); // Runs once when the component mounts
    return null; // No visible UI
}
_s(DownloadPDFClient, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = DownloadPDFClient;
var _c;
__turbopack_context__.k.register(_c, "DownloadPDFClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_dashboard_praktikum_recap-attendances_downloadpdf_tsx_e7330286._.js.map