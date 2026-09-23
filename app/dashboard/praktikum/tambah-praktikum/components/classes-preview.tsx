import { IGetClassResponseBody } from "@/app/interfaces/class/class.interface";
import SmallClassCard from "./small-class-card";

interface ClassesPreviewProps {
  subjectClasses: IGetClassResponseBody[];
}

export default function ClassesPreview({
  subjectClasses,
}: ClassesPreviewProps) {
  return (
    <div className="mt-10 grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {subjectClasses.map((subjectClass) => (
        <SmallClassCard subjectClass={subjectClass} key={subjectClass.id} />
      ))}
    </div>
  );
}
