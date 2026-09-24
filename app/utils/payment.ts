import {
  IGetActivationResponseBody,
  IStudentActivations,
} from "../interfaces/activation/activation.interface";

export const groupActivationsByStudent = (
  activations: IGetActivationResponseBody[],
): IStudentActivations[] => {
  const students = new Map<string, IStudentActivations>();

  for (const activation of activations) {
    const student = students.get(activation.user_id) ?? {
      user_id: activation.user_id,
      nim: activation.nim,
      student: activation.student,
      paid: 0,
      activations: [],
    };

    student.activations.push(activation);
    if (activation.status) student.paid += 1;
    students.set(activation.user_id, student);
  }

  return Array.from(students.values());
};

export const isFullyPaid = ({ paid, activations }: IStudentActivations) =>
  paid === activations.length;

export const summarizePayment = (student: IStudentActivations) => {
  const total = student.activations.length;

  if (isFullyPaid(student)) {
    return {
      label: total > 1 ? "Lunas semua" : "Sudah Bayar",
      className: "bg-[#E8FFF3] text-[#50CD89]",
    };
  }

  if (total === 1)
    return { label: "Belum Bayar", className: "bg-[#F1F1F2] text-[#5E6278]" };

  return {
    label: `${student.paid} dari ${total} lunas`,
    className:
      student.paid === 0
        ? "bg-[#F1F1F2] text-[#5E6278]"
        : "bg-[#FFF8DD] text-[#B58100]",
  };
};

export const activationSubjectName = (activation: IGetActivationResponseBody) =>
  activation.subjects.map((subject) => subject.subject_name).join(", ");
