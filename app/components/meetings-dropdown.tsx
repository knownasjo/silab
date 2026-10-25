import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import useMeetingStore from "../store/useMeetingStore";

interface MeetingsDropDownProps {
  selectedMeeting?: string;
  onMeetingSelected?: (meetingId: string) => void;
}

export default function MeetingsDropDown({
  selectedMeeting,
  onMeetingSelected,
}: MeetingsDropDownProps) {
  const { meetingsData } = useMeetingStore();

  const handleSelectedMeeting = (meetingId: string) => {
    if (onMeetingSelected) onMeetingSelected(meetingId);
  };

  return (
    <Listbox value={selectedMeeting ?? ""} onChange={handleSelectedMeeting}>
      <ListboxButton
        className={`flex h-fit flex-row content-center items-center space-x-4 rounded-full bg-[#D2E3F1] p-3 text-sm font-semibold text-[#3272CA]`}
      >
        <p className="whitespace-nowrap">
          {selectedMeeting &&
            meetingsData?.find((meeting) => meeting.id === selectedMeeting)
              ?.meetingName}
          {!selectedMeeting && "Pilih Pertemuan"}
        </p>
        <div className="relative size-[20px]">
          <Image
            src={"/down-blue.png"}
            alt="chevron down"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </ListboxButton>
      <ListboxOptions
        anchor={{ to: "bottom", gap: 4, padding: 16 }}
        className={`w-56 min-w-[var(--button-width)] rounded-2xl bg-[#D2E3F1] text-sm font-semibold text-[#3272CA]`}
      >
        {meetingsData &&
          meetingsData.map((meeting) => (
            <ListboxOption
              key={meeting.id}
              value={meeting.id}
              className={`w-full cursor-pointer p-3 data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
            >
              <p className="flex w-full flex-row items-center justify-between space-x-3">
                <span className="text-left">{meeting.meetingName}</span>
                {meeting.isOpen && (
                  <span className="rounded-md bg-[#E8FFF3] px-2 py-0.5 text-xs text-[#50CD89]">
                    Dibuka
                  </span>
                )}
              </p>
            </ListboxOption>
          ))}
      </ListboxOptions>
    </Listbox>
  );
}
