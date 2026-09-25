interface ClassQuotaFieldProps {
  onClassQuotaChange: (value: string) => void;
  value: string;
}

export default function ClassQuotaField({
  onClassQuotaChange,
  value,
}: ClassQuotaFieldProps) {
  return (
    <div className="flex h-full w-fit flex-col space-y-3">
      <label
        htmlFor="class-quota"
        className="text-base font-semibold text-[#5E6278]"
      >
        Kuota
      </label>
      <input
        id="class-quota"
        className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
        maxLength={2}
        placeholder="25"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(event) =>
          onClassQuotaChange(event.target.value.replace(/\D/g, "").slice(0, 2))
        }
      />
    </div>
  );
}
