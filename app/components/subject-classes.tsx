import { useEffect } from "react";
import useClassStore from "../store/useClassStore";
import ClassCard from "./praktikum/class-card";

interface ISubjectClassesCardProps {
  subjectId: string;
}

const SubjectClasses: React.FC<ISubjectClassesCardProps> = ({ subjectId }) => {
  const { getAllClass, classesData } = useClassStore();

  useEffect(() => {
    getAllClass();
  }, [getAllClass]);

  const filteredSubjectClasses = classesData.filter(
    (value) => value.subjectId === subjectId,
  );

  return (
    <div className="mt-10 grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {filteredSubjectClasses.map((subjectClass) => (
        <ClassCard subjectClass={subjectClass} key={subjectClass.id} />
      ))}
    </div>
  );
};

export default SubjectClasses;
