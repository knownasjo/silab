import type { jsPDF } from "jspdf";
import { AttendanceStatus } from "@/app/utils/attendance";
import { Recap, statusCode, statusLegend } from "./recap";

export interface RecapPdfInfo {
  subjectCode: string;
  subjectName: string;
  className: string;
  semester: string;
  periodName?: string;
  lecturer?: string;
  meetingName?: string;
}

interface PdfColumn {
  label: string;
  width: number;
  align: "left" | "center";
}

interface PdfCell {
  lines: string[];
  color?: string;
}

const MARGIN = 12;
const ROW_HEIGHT = 7;
const LINE_HEIGHT = 4;
const HEADER_FONT_SIZE = 8;
const MIN_HEADER_FONT_SIZE = 5.5;
const HEADER_LINE_HEIGHT = 3.5;
const MEETING_WIDTH = 14;
const MAX_SINGLE_MEETING_WIDTH = 60;
const MIN_NAME_WIDTH = 90;

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

const textX = (column: PdfColumn, x: number) =>
  column.align === "center" ? x + column.width / 2 : x + 2;

const fitHeader = (pdf: jsPDF, label: string, width: number) => {
  const words = label.split(" ");
  let size = HEADER_FONT_SIZE;
  pdf.setFontSize(size);

  while (
    size > MIN_HEADER_FONT_SIZE &&
    words.some((word) => pdf.getTextWidth(word) > width - 1)
  ) {
    size -= 0.5;
    pdf.setFontSize(size);
  }

  return {
    size,
    lineHeight: (HEADER_LINE_HEIGHT * size) / HEADER_FONT_SIZE,
    lines: pdf.splitTextToSize(label, width - 1) as string[],
  };
};

export const downloadRecapPdf = async (recap: Recap, info: RecapPdfInfo) => {
  const { jsPDF: JsPDF } = await import("jspdf");

  const pdf = new JsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGIN * 2;
  const bottomLimit = pageHeight - MARGIN - 6;

  const meetingCount = recap.columns.length;
  const showTotal = meetingCount > 1;

  const fixedWidth = 10 + 26 + (showTotal ? 16 : 0);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(HEADER_FONT_SIZE);
  const meetingWidth = showTotal
    ? Math.min(MEETING_WIDTH, (contentWidth - fixedWidth - 50) / meetingCount)
    : Math.min(
        MAX_SINGLE_MEETING_WIDTH,
        Math.max(MEETING_WIDTH, pdf.getTextWidth(recap.columns[0].label) + 4),
      );

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  const longestName = Math.max(
    0,
    ...recap.rows.map((row) => pdf.getTextWidth(row.studentName)),
  );
  const nameWidth = Math.min(
    contentWidth - fixedWidth - meetingWidth * meetingCount,
    Math.max(MIN_NAME_WIDTH, longestName + 4),
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
    pdf.setTextColor(TEXT_COLOR);

    const labels = columns.map((column) =>
      fitHeader(pdf, column.label, column.width),
    );
    const height =
      Math.max(
        ...labels.map((label) => label.lines.length * label.lineHeight),
      ) + 3;

    let x = MARGIN;
    columns.forEach((column, index) => {
      pdf.setFillColor(HEADER_FILL);
      pdf.setTextColor(TEXT_COLOR);
      pdf.rect(x, y, column.width, height, "FD");

      const { size, lineHeight, lines } = labels[index];
      pdf.setFontSize(size);
      const firstLineY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, lineIndex) => {
        pdf.text(line, textX(column, x), firstLineY + lineIndex * lineHeight, {
          align: column.align,
          baseline: "middle",
        });
      });

      x += column.width;
    });

    return y + height;
  };

  const drawRow = (cells: PdfCell[], y: number, height: number) => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);

    let x = MARGIN;
    cells.forEach((cell, cellIndex) => {
      const column = columns[cellIndex];

      pdf.rect(x, y, column.width, height);
      pdf.setTextColor(cell.color ?? TEXT_COLOR);
      const firstLineY =
        y + height / 2 - ((cell.lines.length - 1) * LINE_HEIGHT) / 2;
      cell.lines.forEach((line, lineIndex) => {
        pdf.text(line, textX(column, x), firstLineY + lineIndex * LINE_HEIGHT, {
          align: column.align,
          baseline: "middle",
        });
      });

      x += column.width;
    });
  };

  const subtitle = [
    `Praktikum ${info.subjectName} (${info.subjectCode})`,
    `Kelas ${info.className}`,
    `Semester ${info.semester}`,
    info.meetingName,
  ]
    .filter(Boolean)
    .join(" · ");
  const details = [
    info.periodName && `Periode ${info.periodName}`,
    info.lecturer && `Dosen pengampu: ${info.lecturer}`,
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

  let y = MARGIN + 10;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(TEXT_COLOR);
  (pdf.splitTextToSize(subtitle, contentWidth) as string[]).forEach((line) => {
    pdf.text(line, MARGIN, y);
    y += 5;
  });

  if (details) {
    pdf.setFontSize(9);
    (pdf.splitTextToSize(details, contentWidth) as string[]).forEach((line) => {
      pdf.text(line, MARGIN, y);
      y += 4.5;
    });
  }

  pdf.setFontSize(8);
  pdf.text(`Dicetak ${printedAt}`, MARGIN, y);

  y = drawHeaderRow(y + 5);

  recap.rows.forEach((row, index) => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    const nameLines = pdf.splitTextToSize(
      row.studentName,
      nameWidth - 4,
    ) as string[];
    const height = Math.max(ROW_HEIGHT, nameLines.length * LINE_HEIGHT + 3);

    if (y + height > bottomLimit) {
      pdf.addPage();
      y = drawHeaderRow(MARGIN);
    }

    drawRow(
      [
        { lines: [String(index + 1)] },
        { lines: [row.nim] },
        { lines: nameLines },
        ...row.statuses.map((status) => ({
          lines: [statusCode[status]],
          color: statusColor[status],
        })),
        ...(showTotal
          ? [{ lines: [`${row.attendedCount}/${meetingCount}`] }]
          : []),
      ],
      y,
      height,
    );

    y += height;
  });

  if (y + ROW_HEIGHT > bottomLimit) {
    pdf.addPage();
    y = drawHeaderRow(MARGIN);
  }

  const labelWidth = columns[0].width + columns[1].width + columns[2].width;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setFillColor(HEADER_FILL);
  pdf.setTextColor(TEXT_COLOR);
  pdf.rect(MARGIN, y, labelWidth, ROW_HEIGHT, "FD");
  pdf.text("Jumlah hadir", MARGIN + 2, y + ROW_HEIGHT / 2, {
    baseline: "middle",
  });

  let x = MARGIN + labelWidth;
  columns.slice(3).forEach((column, index) => {
    pdf.setFillColor(HEADER_FILL);
    pdf.rect(x, y, column.width, ROW_HEIGHT, "FD");
    if (index < meetingCount) {
      pdf.text(
        `${recap.columns[index].attendedCount}/${recap.rows.length}`,
        x + column.width / 2,
        y + ROW_HEIGHT / 2,
        { align: "center", baseline: "middle" },
      );
    }
    x += column.width;
  });

  y += ROW_HEIGHT;

  if (y + 8 > bottomLimit) {
    pdf.addPage();
    y = MARGIN;
  }

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(TEXT_COLOR);
  pdf.text(`Keterangan: ${statusLegend}`, MARGIN, y + 6);

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
