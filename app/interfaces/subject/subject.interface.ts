export interface IGetSubjectResponseBody {
  id: string;
  subject_code: string;
  subject_name: string;
  semester: string;
  lecturer_id: string;
  lecturer: string;
}

export type IUpdateSubjectRequestBody = IAddSubjectRequestBody;

export interface IAddSubjectRequestBody {
  subject_code: string;
  subject_name: string;
  semester: string;
  lecturer_id: string;
}
