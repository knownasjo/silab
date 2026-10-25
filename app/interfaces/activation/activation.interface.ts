export interface IGetActivationResponseBody {
  id: string;
  userId: string;
  nim: string;
  student: string;
  status: boolean;
  subjectId: string;
  subjects: IActivationSubjects[];
  registeredClass: IRegisteredClass | null;
  availableClasses: IAvailableClass[];
}

interface IActivationSubjects {
  subjectName: string;
  semester: string;
}

export interface IRegisteredClass {
  id: string;
  name: string;
}

export interface IAvailableClass {
  id: string;
  name: string;
  day: string;
  sessionTime: string;
  room: string;
  quota: number;
  registeredStudents: number;
  isFull: boolean;
}

export interface IStudentActivations {
  userId: string;
  nim: string;
  student: string;
  paid: number;
  activations: IGetActivationResponseBody[];
}
