import { formatDay } from "@/app/utils/day";
import AddCollaboratorsButton from "@/app/components/praktikum/add-collaborators-button";
import { IGetClassByIdResponseBody } from "@/app/interfaces/class/class.interface";
import useAuthStore from "@/app/store/useAuthStore";
import useCollaboratorStore from "@/app/store/useCollaboratorStore";
import { IGetCollaboratorsResponseBody } from "@/app/interfaces/collaborator/collaborator.interface";
interface IClassDetailBox {
  data: IGetClassByIdResponseBody;
  assistant: IGetCollaboratorsResponseBody[];
  readOnly?: boolean;
}

const Divider = () => (
  <div className="hidden w-[0.3px] shrink-0 self-stretch rounded-full border border-dashed border-[#1d1d1d]/30 xl:block"></div>
);

const ClassDetailsBox: React.FC<IClassDetailBox> = ({
  data,
  assistant,
  readOnly = false,
}) => {
  const { userData } = useAuthStore();
  const { collaboratorsClassId, isLoaded, loadError } = useCollaboratorStore();
  const isListCurrent = collaboratorsClassId === data.id;
  const listError = isListCurrent && loadError;
  const isListLoaded = isListCurrent && isLoaded;

  return (
    <div className="grid min-h-[150px] w-full shrink-0 grid-cols-3 gap-x-6 gap-y-5 rounded-[20px] bg-white p-5 xl:flex xl:flex-row xl:gap-0 xl:space-x-6">
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
      <div className="col-start-1 row-start-2 flex min-w-0 flex-1 flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Dosen</p>
        <p className="break-words text-[18px] font-semibold text-black">
          {data.lecturer}
        </p>
      </div>
      <Divider />
      <div className="col-span-2 col-start-2 row-start-2 flex min-w-0 flex-[2] flex-col space-y-4">
        <div className="flex flex-row items-center space-x-2">
          <p className="text-[16px] font-semibold text-[#5E6278]">
            Asisten Praktikum
          </p>
          {userData?.role === "LABORAN" && !readOnly && (
            <AddCollaboratorsButton
              classId={data.id}
              classLabel={`${data.subjectName} — Kelas ${data.name}`}
            />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          {listError && (
            <p className="text-[16px] font-semibold text-[#F1416C]">
              Daftar asisten gagal dimuat.
            </p>
          )}
          {!listError && !isListLoaded && (
            <p className="text-sm font-semibold text-[#5E6278]">Loading...</p>
          )}
          {!listError &&
            isListLoaded &&
            assistant.length !== 0 &&
            assistant.map((assistant, idx) => (
              <div className="flex flex-row space-x-[10px]" key={idx}>
                <div className="w-[6px] shrink-0 self-stretch rounded-full bg-[#D2E3F1]"></div>
                <p className="min-w-0 break-words text-[18px] font-semibold text-black">
                  {assistant.fullname}
                </p>
              </div>
            ))}
          {!listError && isListLoaded && assistant.length === 0 && (
            <div className="flex flex-row space-x-[10px]">
              <p className="text-[18px] font-semibold text-black">
                Asisten Praktikum Belum Ditambahkan
              </p>
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div className="col-start-3 row-start-1 flex shrink-0 flex-col space-y-4">
        <p className="text-[16px] font-semibold text-[#5E6278]">Kuota</p>
        <p className="whitespace-nowrap text-[18px] font-semibold text-black">
          {data.participants} / {data.quota}
        </p>
      </div>
    </div>
  );
};

export default ClassDetailsBox;
