interface ActivityPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  shown: number;
  disabled: boolean;
  onPageChange: (page: number) => void;
}

const BUTTON_CLASS_NAME =
  "h-fit w-fit shrink-0 rounded-full border-2 border-[#BFD9EF] bg-white px-4 py-2 text-xs font-semibold text-[#3272CA] disabled:cursor-not-allowed disabled:opacity-40";

const formatCount = (count: number) => count.toLocaleString("id-ID");

export default function ActivityPagination({
  page,
  pageSize,
  total,
  totalPages,
  shown,
  disabled,
  onPageChange,
}: ActivityPaginationProps) {
  if (total === 0) return null;

  const first = (page - 1) * pageSize + 1;

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <p className="text-sm font-semibold text-[#5E6278]">
        {shown > 0
          ? `Menampilkan ${formatCount(first)}–${formatCount(first + shown - 1)} dari ${formatCount(total)} catatan`
          : `${formatCount(total)} catatan`}
      </p>
      {totalPages > 1 && (
        <div className="flex flex-row items-center space-x-3">
          <button
            type="button"
            disabled={disabled || page <= 1}
            onClick={() => onPageChange(Math.min(page - 1, totalPages))}
            className={BUTTON_CLASS_NAME}
          >
            Sebelumnya
          </button>
          <p className="text-sm font-semibold text-[#5E6278]">
            Halaman {formatCount(page)} dari {formatCount(totalPages)}
          </p>
          <button
            type="button"
            disabled={disabled || page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className={BUTTON_CLASS_NAME}
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
