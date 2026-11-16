"use client";

import FeedbackBox from "@/app/components/feedback-box";
import ActivityFilterListbox from "@/app/components/riwayat-aktivitas/activity-filter-listbox";
import ActivityPagination from "@/app/components/riwayat-aktivitas/activity-pagination";
import ActivityTable from "@/app/components/riwayat-aktivitas/activity-table";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import {
  ActivityGroup,
  IActivityFilters,
  IActivityQuery,
} from "@/app/interfaces/activity/activity.interface";
import useActivityStore from "@/app/store/useActivityStore";
import useAuthStore from "@/app/store/useAuthStore";
import usePeriodStore from "@/app/store/usePeriodStore";
import {
  ACTIVITY_GROUPS,
  EMPTY_ACTIVITY_FILTERS,
  MAX_KEYWORD_LENGTH,
  activityDateError,
  hasActivityFilters,
  isCompleteDate,
  periodOptionLabel,
} from "@/app/utils/activity";
import { Field, Input } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FIRST_PAGE: IActivityQuery = { ...EMPTY_ACTIVITY_FILTERS, page: 1 };

const GROUP_OPTIONS: { value: ActivityGroup | ""; label: string }[] = [
  { value: "", label: "Semua aksi" },
  ...ACTIVITY_GROUPS,
];

const DATE_INPUT_CLASS_NAME =
  "h-[44px] rounded-xl bg-white px-4 text-sm font-semibold text-[#1D1D1D] data-focus:outline-[#3272CA]";

const CHIP_CLASS_NAME =
  "h-fit w-fit shrink-0 rounded-full border-2 border-[#BFD9EF] bg-white p-3 text-xs font-semibold text-[#3272CA] disabled:cursor-not-allowed disabled:opacity-40";

export default function RiwayatAktivitas() {
  const { userData } = useAuthStore();
  const {
    periodsData,
    isLoaded: isPeriodsLoaded,
    getPeriods,
    refreshPeriods,
  } = usePeriodStore();
  const {
    activitiesData,
    page,
    pageSize,
    total,
    totalPages,
    isLoading,
    isLoaded,
    loadError,
    getActivities,
    reset,
  } = useActivityStore();
  const [query, setQuery] = useState<IActivityQuery>(FIRST_PAGE);
  const [search, setSearch] = useState("");
  const [dateInputKey, setDateInputKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const canView = !userData || userData.role === "LABORAN";
  const dateError = activityDateError(query);

  useEffect(() => {
    if (!isPeriodsLoaded) getPeriods();
  }, [isPeriodsLoaded, getPeriods]);

  useRealtimeEvents(({ type }) => {
    if (type === "ready" || type === "period") refreshPeriods();
  });

  useEffect(() => reset, [reset]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = search.trim();

      setQuery((current) =>
        current.q === q ? current : { ...current, q, page: 1 },
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (canView && !activityDateError(query)) getActivities(query);
  }, [canView, query, getActivities]);

  const changeFilter = (filter: Partial<IActivityFilters>) =>
    setQuery((current) => ({ ...current, ...filter, page: 1 }));

  const changeDate = (key: "from" | "to", value: string) => {
    if (isCompleteDate(value)) changeFilter({ [key]: value });
  };

  const changePage = (next: number) => {
    setQuery((current) => ({ ...current, page: next }));
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const clearFilters = () => {
    setSearch("");
    setDateInputKey((key) => key + 1);
    setQuery(FIRST_PAGE);
  };

  const isFiltered = hasActivityFilters(query) || search.trim() !== "";
  const showTable = !dateError;
  const showLoading =
    !loadError && activitiesData.length === 0 && (isLoading || !isLoaded);

  const emptyMessage = () => {
    if (!isLoaded || isLoading || loadError || activitiesData.length > 0)
      return null;

    if (total > 0) return "Halaman ini sudah kosong.";

    return isFiltered
      ? "Tidak ada catatan yang cocok dengan filter ini."
      : "Belum ada catatan aktivitas.";
  };

  const periodOptions = [
    { value: "", label: "Semua periode" },
    ...periodsData.map((period) => ({
      value: period.id,
      label: periodOptionLabel(period),
    })),
  ];

  if (!canView) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-base font-semibold text-[#5E6278]">
          Hanya laboran yang dapat melihat riwayat aktivitas.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex h-full w-full flex-col space-y-5 overflow-auto overscroll-contain"
    >
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col space-y-1">
          <p className="text-[32px] font-bold text-black">Riwayat Aktivitas</p>
          <p className="text-sm font-semibold text-[#5E6278]">
            Siapa mengubah apa dan kapan, terbaru di atas.
          </p>
        </div>
        <button
          type="button"
          disabled={isLoading || !!dateError}
          onClick={() => getActivities(query)}
          className={CHIP_CLASS_NAME}
        >
          Muat Ulang
        </button>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-3">
        <ActivityFilterListbox
          label="Periode"
          value={query.periodId}
          options={periodOptions}
          onChange={(periodId) => changeFilter({ periodId })}
        />
        <ActivityFilterListbox
          label="Jenis Aksi"
          value={query.group}
          options={GROUP_OPTIONS}
          onChange={(group) => changeFilter({ group })}
        />
        <div className="flex flex-row items-center space-x-3">
          <p className="text-sm font-semibold text-[#5E6278]">Tanggal</p>
          <Input
            key={`from-${dateInputKey}`}
            type="date"
            aria-label="Dari tanggal"
            max={query.to || undefined}
            onChange={(e) => changeDate("from", e.target.value)}
            className={DATE_INPUT_CLASS_NAME}
          />
          <p className="text-sm font-semibold text-[#5E6278]">sampai</p>
          <Input
            key={`to-${dateInputKey}`}
            type="date"
            aria-label="Sampai tanggal"
            min={query.from || undefined}
            onChange={(e) => changeDate("to", e.target.value)}
            className={DATE_INPUT_CLASS_NAME}
          />
        </div>
      </div>
      <div className="flex w-full flex-row items-center space-x-3">
        <Field className="relative h-12 min-w-0 flex-1">
          <div className="pointer-events-none absolute left-2 top-1/2 z-10 size-[24px] -translate-y-1/2">
            <Image
              src={"/search.png"}
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <Input
            value={search}
            maxLength={MAX_KEYWORD_LENGTH}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, NIM/NIY, mata kuliah, atau kelas"
            className={
              "h-full w-full rounded-2xl pl-10 data-focus:outline-[#3272CA]"
            }
          />
        </Field>
        {isFiltered && (
          <button
            type="button"
            onClick={clearFilters}
            className={CHIP_CLASS_NAME}
          >
            Hapus Filter
          </button>
        )}
      </div>
      <FeedbackBox
        feedback={
          dateError
            ? { ok: false, message: dateError }
            : loadError
              ? {
                  ok: false,
                  message: `Riwayat aktivitas gagal dimuat. ${loadError}`,
                }
              : null
        }
      />
      {showTable && (
        <>
          <ActivityTable
            activities={activitiesData}
            isLoading={isLoading}
            showLoading={showLoading}
            emptyMessage={emptyMessage()}
          />
          <ActivityPagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            shown={activitiesData.length}
            disabled={isLoading}
            onPageChange={changePage}
          />
        </>
      )}
    </div>
  );
}
