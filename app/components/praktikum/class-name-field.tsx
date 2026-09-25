interface ClassNameFieldProps {
  onClassNameChange: (value: string) => void;
  value?: string;
}

export default function ClassNameField({
  onClassNameChange,
  value,
}: ClassNameFieldProps) {
  return (
    <div className="flex h-full w-fit flex-col space-y-3">
      <label
        htmlFor="class-name"
        className="text-base font-semibold text-[#5E6278]"
      >
        Kelas
      </label>
      <input
        id="class-name"
        className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
        maxLength={1}
        placeholder="A"
        type="text"
        autoComplete="off"
        value={value}
        onChange={(event) =>
          onClassNameChange(
            event.target.value
              .toUpperCase()
              .replace(/[^A-Z]/g, "")
              .slice(0, 1),
          )
        }
      />
    </div>
  );
}
