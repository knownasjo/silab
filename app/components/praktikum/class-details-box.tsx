import { formatDay } from "@/app/utils/day";
import AddCollaboratorsButton from "@/app/components/praktikum/add-collaborators-button";
import { IGetClassByIdResponseBody } from "@/app/interfaces/class/class.interface";
import useAuthStore from "@/app/store/useAuthStore";
import { IGetCollaboratorsResponseBody } from "@/app/interfaces/collaborator/collaborator.interface";
interface IClassDetailBox {
  data: IGetClassByIdResponseBody;
  assistant: IGetCollaboratorsResponseBody[];
  readOnly?: boolean;
}

const Divider = () => (
  <div className="w-[0.3px] shrink-0 self-stretch rounded-full border border-dashed border-[#1d1d1d]/30"></div>
);

const ClassDetailsBox: React.FC<IClassDetailBox> = ({
  data,
  assistant,
  readOnly = false,
}) => {
  const { userData } = useAuthStore();

  return (
    <div className="flex min-h-[150px] w-full flex-row space-x-6 rounded-[20px] bg-white p-5">
      <div className="flex shrink-0 flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Hari, Jam</p>
        <p className="text-[18px] font-semibold text-black">
          {formatDay(data.day)}, <br />
          <span className="whitespace-nowrap">
            {data.startAt} - {data.endAt}
          </span>
        </p>
      </div>
      <Divider />
      <div className="flex shrink-0 flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Ruangan</p>
        <p className="whitespace-nowrap text-[18px] font-semibold text-black">
          {data.room}
        </p>
      </div>
      <Divider />
      <div className="flex min-w-0 flex-1 flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Dosen</p>
        <p className="break-words text-[18px] font-semibold text-black">
          {data.lecturer}
        </p>
      </div>
      <Divider />
      <div className="flex min-w-0 flex-[2] flex-col space-y-4">
        <div className="flex flex-row items-center space-x-2">
          <p className="text-[16px] font-semibold text-[#5E6278]">
            Asisten Praktikum
          </p>
          {userData?.role === "LABORAN" && !readOnly && (
            <AddCollaboratorsButton
              classId={data.id}
              classLabel={`${data.subject_name} — Kelas ${data.name}`}
            />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          {assistant.length !== 0 &&
            assistant.map((assistant, idx) => (
              <div className="flex flex-row space-x-[10px]" key={idx}>
                <div className="w-[6px] shrink-0 self-stretch rounded-full bg-[#D2E3F1]"></div>
                <p className="min-w-0 break-words text-[18px] font-semibold text-black">
                  {assistant.fullname}
                </p>
              </div>
            ))}
          {assistant.length === 0 && (
            <div className="flex flex-row space-x-[10px]">
              <p className="text-[18px] font-semibold text-black">
                Asisten Praktikum Belum Ditambahkan
              </p>
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div className="flex shrink-0 flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Kuota</p>
        <p className="whitespace-nowrap text-[18px] font-semibold text-black">
          {data.participants} / {data.quota}
        </p>
      </div>
    </div>
  );
};

export default ClassDetailsBox;
