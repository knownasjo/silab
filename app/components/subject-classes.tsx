import useClassStore from "../store/useClassStore";
import ClassCard from "./praktikum/class-card";

interface ISubjectClassesCardProps {
  subjectId: string;
}

const SubjectClasses: React.FC<ISubjectClassesCardProps> = ({ subjectId }) => {
  const { classesData, isLoading, loadError } = useClassStore();

  const filteredSubjectClasses = classesData
    .filter((value) => value.subjectId === subjectId)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (filteredSubjectClasses.length === 0) {
    if (loadError) return null;

    return (
      <p className="mt-4 text-sm font-semibold text-[#5E6278]">
        {isLoading ? "Loading..." : "Belum ada kelas di periode ini."}
      </p>
    );
  }

  return (
    <div className="mt-10 grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {filteredSubjectClasses.map((subjectClass) => (
        <ClassCard subjectClass={subjectClass} key={subjectClass.id} />
      ))}
    </div>
  );
};

export default SubjectClasses;
