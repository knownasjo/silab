import { IGetClassResponseBody } from "@/app/interfaces/class/class.interface";
import ClassCard from "@/app/components/praktikum/class-card";

interface ClassesPreviewProps {
  subjectClasses: IGetClassResponseBody[];
}

export default function ClassesPreview({
  subjectClasses,
}: ClassesPreviewProps) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {[...subjectClasses]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((subjectClass) => (
          <ClassCard subjectClass={subjectClass} key={subjectClass.id} />
        ))}
    </div>
  );
}
