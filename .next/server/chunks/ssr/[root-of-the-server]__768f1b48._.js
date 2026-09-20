module.exports = {

"[externals]/module [external] (module, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}}),
"[project]/app/dashboard/praktikum/recap-attendances/downloadpdf.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DownloadPDFClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function DownloadPDFClient() {
    const downloadPDF = async ()=>{
        const element = document.getElementById("recap-attendances");
        if (!element) {
            console.error("Element not found for PDF generation.");
            return;
        }
        const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(element, {
            scale: 2
        });
        const imageData = canvas.toDataURL("image/png");
        const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        downloadPDF();
    }, []); // Runs once when the component mounts
    return null; // No visible UI
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__768f1b48._.js.map