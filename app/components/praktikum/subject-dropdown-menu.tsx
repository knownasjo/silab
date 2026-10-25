import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { IGetSubjectResponseBody } from "@/app/interfaces/subject/subject.interface";

interface SubjectDropdownMenuProps {
  subjects: IGetSubjectResponseBody[];
  value: string;
  placeholder: string;
  isDisabled: boolean;
  onSubjectChange: (value: string) => void;
}

export default function SubjectDropdownMenu({
  subjects,
  value,
  placeholder,
  isDisabled,
  onSubjectChange,
}: SubjectDropdownMenuProps) {
  const selected = subjects.find((subject) => subject.id === value);
  const sortedSubjects = [...subjects].sort((a, b) =>
    a.subjectName.localeCompare(b.subjectName),
  );

  return (
    <Listbox value={value} onChange={onSubjectChange} disabled={isDisabled}>
      <ListboxButton className="flex h-[54px] w-[400px] max-w-full flex-row items-center justify-between space-x-3 rounded-full bg-white px-[15px] text-black disabled:cursor-not-allowed disabled:opacity-60">
        <p className="truncate" title={selected?.subjectName}>
          {selected?.subjectName ?? placeholder}
        </p>
        <div className="relative h-[24px] w-[24px] shrink-0">
          <Image src={"/down.png"} alt="chevron down" fill />
        </div>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className={`w-[var(--button-width)] rounded-lg bg-white`}
      >
        {sortedSubjects.map((subject) => (
          <ListboxOption
            value={subject.id}
            key={subject.id}
            className={`group cursor-pointer px-[15px] py-2 data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
          >
            <p>{subject.subjectName}</p>
            <p className="text-xs font-semibold text-[#5E6278] group-data-[focus]:text-white">
              Semester {subject.semester}
            </p>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
