import type { jsPDF } from "jspdf";
import { AttendanceStatus } from "@/app/utils/attendance";
import { Recap, statusCode, statusLegend } from "./recap";

export interface RecapPdfInfo {
  subjectName: string;
  className: string;
  semester: string;
  meetingName?: string;
}

interface PdfColumn {
  label: string;
  width: number;
  align: "left" | "center";
}

// Satuan mm, A4 landscape (297 x 210).
const MARGIN = 12;
const ROW_HEIGHT = 7;
const HEADER_LINE_HEIGHT = 3.5;

const TEXT_COLOR = "#5E6278";
const TITLE_COLOR = "#181C32";
const BORDER_COLOR = "#E1E3EA";
const HEADER_FILL = "#F1F1F2";

const statusColor: Record<AttendanceStatus, string> = {
  Hadir: "#50CD89",
  "Tidak Hadir": "#F1416C",
  "Belum Presensi": "#A1A5B7",
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Potong teks yang lebih lebar dari kolom, pakai font yang sedang aktif. */
const fitText = (pdf: jsPDF, text: string, maxWidth: number) => {
  if (pdf.getTextWidth(text) <= maxWidth) return text;

  let fitted = text;
  while (fitted.length > 0 && pdf.getTextWidth(`${fitted}...`) > maxWidth) {
    fitted = fitted.slice(0, -1);
  }

  return `${fitted}...`;
};

const textX = (column: PdfColumn, x: number) =>
  column.align === "center" ? x + column.width / 2 : x + 2;

/**
 * Menggambar tabel langsung dengan jsPDF, bukan screenshot html2canvas:
 * teks tetap tajam dan bisa dicari, tabel panjang otomatis pindah halaman,
 * dan tidak bergantung pada warna oklch DaisyUI yang tidak dipahami
 * html2canvas.
 */
export const downloadRecapPdf = async (recap: Recap, info: RecapPdfInfo) => {
  // Build ES jspdf (yang dipakai bundler) hanya punya named export.
  const { jsPDF: JsPDF } = await import("jspdf");

  const pdf = new JsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGIN * 2;
  const bottomLimit = pageHeight - MARGIN - 6; // sisakan tempat nomor halaman

  const meetingCount = recap.columns.length;
  const showTotal = meetingCount > 1;

  // No, NIM, dan Hadir lebarnya tetap; sisanya dibagi antara Nama
  // (minimal 50 mm) dan kolom pertemuan (maksimal 14 mm).
  const fixedWidth = 10 + 26 + (showTotal ? 16 : 0);
  const meetingWidth = Math.min(
    14,
    (contentWidth - fixedWidth - 50) / meetingCount,
  );
  const nameWidth = Math.min(
    90,
    contentWidth - fixedWidth - meetingWidth * meetingCount,
  );

  const columns: PdfColumn[] = [
    { label: "No", width: 10, align: "center" },
    { label: "NIM", width: 26, align: "center" },
    { label: "Nama", width: nameWidth, align: "left" },
    ...recap.columns.map(
      (column): PdfColumn => ({
        label: column.label,
        width: meetingWidth,
        align: "center",
      }),
    ),
    ...(showTotal
      ? [{ label: "Hadir", width: 16, align: "center" } as PdfColumn]
      : []),
  ];

  const drawHeaderRow = (y: number): number => {
    pdf.setDrawColor(BORDER_COLOR);
    pdf.setLineWidth(0.2);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(TEXT_COLOR);

    const labels = columns.map(
      (column) => pdf.splitTextToSize(column.label, column.width - 2) as string[],
    );
    const height =
      Math.max(...labels.map((lines) => lines.length)) * HEADER_LINE_HEIGHT + 3;

    let x = MARGIN;
    columns.forEach((column, index) => {
      // Di PDF, warna teks dan warna isian memakai state yang sama, jadi
      // warna isian harus diset ulang setelah label sebelumnya digambar.
      pdf.setFillColor(HEADER_FILL);
      pdf.setTextColor(TEXT_COLOR);
      pdf.rect(x, y, column.width, height, "FD");

      const lines = labels[index];
      const firstLineY =
        y + height / 2 - ((lines.length - 1) * HEADER_LINE_HEIGHT) / 2;
      lines.forEach((line, lineIndex) => {
        pdf.text(
          line,
          textX(column, x),
          firstLineY + lineIndex * HEADER_LINE_HEIGHT,
          { align: column.align, baseline: "middle" },
        );
      });

      x += column.width;
    });

    return y + height;
  };

  // Judul
  const subtitle = [
    `Praktikum ${info.subjectName}`,
    `Kelas ${info.className}`,
    `Semester ${info.semester}`,
    info.meetingName,
  ]
    .filter(Boolean)
    .join(" · ");
  const printedAt = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(TITLE_COLOR);
  pdf.text("Rekap Presensi Praktikum", MARGIN, MARGIN + 4);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(TEXT_COLOR);
  pdf.text(subtitle, MARGIN, MARGIN + 10);

  pdf.setFontSize(8);
  pdf.text(`Dicetak ${printedAt}`, MARGIN, MARGIN + 15);

  // Tabel
  let y = drawHeaderRow(MARGIN + 20);

  recap.rows.forEach((row, index) => {
    if (y + ROW_HEIGHT > bottomLimit) {
      pdf.addPage();
      y = drawHeaderRow(MARGIN);
    }

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);

    const cells: { text: string; color?: string }[] = [
      { text: String(index + 1) },
      { text: row.nim },
      { text: fitText(pdf, row.studentName, nameWidth - 4) },
      ...row.statuses.map((status) => ({
        text: statusCode[status],
        color: statusColor[status],
      })),
      ...(showTotal ? [{ text: `${row.attendedCount}/${meetingCount}` }] : []),
    ];

    let x = MARGIN;
    cells.forEach((cell, cellIndex) => {
      const column = columns[cellIndex];

      pdf.rect(x, y, column.width, ROW_HEIGHT);
      pdf.setTextColor(cell.color ?? TEXT_COLOR);
      pdf.text(cell.text, textX(column, x), y + ROW_HEIGHT / 2, {
        align: column.align,
        baseline: "middle",
      });

      x += column.width;
    });

    y += ROW_HEIGHT;
  });

  // Keterangan
  if (y + 8 > bottomLimit) {
    pdf.addPage();
    y = MARGIN;
  }

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(TEXT_COLOR);
  pdf.text(`Keterangan: ${statusLegend}`, MARGIN, y + 6);

  // Nomor halaman
  const pageCount = pdf.getNumberOfPages();
  for (let page = 1; page <= pageCount; page++) {
    pdf.setPage(page);
    pdf.setFontSize(8);
    pdf.setTextColor(TEXT_COLOR);
    pdf.text(
      `Halaman ${page} dari ${pageCount}`,
      pageWidth - MARGIN,
      pageHeight - MARGIN / 2,
      { align: "right" },
    );
  }

  const fileName = [
    "rekap-presensi",
    info.subjectName,
    `kelas-${info.className}`,
    info.meetingName,
  ]
    .filter((part): part is string => Boolean(part))
    .map(slugify)
    .join("-");

  pdf.save(`${fileName}.pdf`);
};
