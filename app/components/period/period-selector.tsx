"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect } from "react";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import { IPeriodResponseBody } from "@/app/interfaces/period/period.interface";
import usePeriodStore, { usePeriodView } from "@/app/store/usePeriodStore";

const optionLabel = (period: IPeriodResponseBody) =>
  period.is_active ? `${period.name} (aktif)` : period.name;

export default function PeriodSelector() {
  const { periodsData, isLoaded, getPeriods, refreshPeriods, selectPeriod } =
    usePeriodStore();
  const { viewedPeriod } = usePeriodView();

  useEffect(() => {
    if (!isLoaded) getPeriods();
  }, [isLoaded, getPeriods]);

  useRealtimeEvents(({ type }) => {
    if (type === "ready" || type === "period") refreshPeriods();
  });

  if (!viewedPeriod) return null;

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="text-sm font-semibold text-[#5E6278]">Periode</p>
      <Listbox
        value={viewedPeriod.id}
        onChange={(id: string) =>
          selectPeriod(
            periodsData.find((period) => period.id === id)?.is_active
              ? null
              : id,
          )
        }
      >
        <ListboxButton
          aria-label="Pilih periode"
          className="flex h-[44px] min-w-[240px] flex-row items-center justify-between space-x-3 rounded-xl bg-white px-4 text-sm font-semibold text-[#1D1D1D]"
        >
          <span>{optionLabel(viewedPeriod)}</span>
          <span className="relative h-[20px] w-[20px]">
            <Image src={"/down.png"} alt="" fill />
          </span>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="z-50 mt-2 w-[var(--button-width)] rounded-xl bg-white py-1 shadow-lg"
        >
          {periodsData.map((period) => (
            <ListboxOption
              key={period.id}
              value={period.id}
              className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
            >
              {optionLabel(period)}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
