interface ClassNameFieldProps {
  onClassNameChange: (value: string) => void;
  value?: string;
}

export default function ClassNameField({
  onClassNameChange,
  value,
}: ClassNameFieldProps) {
  return (
    <div className="flex w-[72px] shrink-0 flex-col space-y-3">
      <label
        htmlFor="class-name"
        className="text-base font-semibold text-[#5E6278]"
      >
        Kelas
      </label>
      <input
        id="class-name"
        className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] px-2 text-center font-semibold text-[#1D1D1D] focus:outline-[#3272CA] disabled:cursor-not-allowed disabled:opacity-60"
        placeholder="A"
        type="text"
        autoComplete="off"
        value={value}
        onChange={(event) => {
          const letters = event.target.value
            .toUpperCase()
            .replace(/[^A-Z]/g, "");

          onClassNameChange(
            (letters.replace(value ?? "", "") || letters).slice(-1),
          );
        }}
      />
    </div>
  );
}
