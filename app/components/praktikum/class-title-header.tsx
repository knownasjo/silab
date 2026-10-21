import { ReactNode } from "react";
import { IGetClassByIdResponseBody } from "@/app/interfaces/class/class.interface";

interface IClassTitleHeaderProps {
  data: IGetClassByIdResponseBody;
  children?: ReactNode;
}

const ClassTitleHeader: React.FC<IClassTitleHeaderProps> = ({
  data,
  children,
}) => {
  return (
    <div className="flex w-full flex-row items-end justify-between space-x-6">
      <div className="flex min-w-0 flex-col">
        <p className="text-[18px] font-semibold text-[#5E6278]">
          Semester {data.semester} · Kelas {data.name}
        </p>
        <p className="text-[26px] font-bold text-black xl:text-[32px]">
          Praktikum {data.subject_name}
        </p>
      </div>
      {children && (
        <div className="flex shrink-0 flex-row space-x-3">{children}</div>
      )}
    </div>
  );
};

export default ClassTitleHeader;
