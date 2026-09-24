export interface IGetActivationResponseBody {
  id: string;
  user_id: string;
  nim: string;
  student: string;
  status: boolean;
  subject_id: string;
  subjects: IActivationSubjects[];
  registered_class: IRegisteredClass | null;
  available_classes: IAvailableClass[];
}

interface IActivationSubjects {
  subject_name: string;
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
  session_time: string;
  room: string;
  quota: number;
  registered_students: number;
  is_full: boolean;
}

export interface IStudentActivations {
  user_id: string;
  nim: string;
  student: string;
  paid: number;
  activations: IGetActivationResponseBody[];
}
