export interface IGetSubjectResponseBody {
  id: string;
  subjectCode: string;
  subjectName: string;
  semester: string;
  lecturerId: string;
  lecturer: string;
}

export type IUpdateSubjectRequestBody = IAddSubjectRequestBody;

export interface IAddSubjectRequestBody {
  subjectCode: string;
  subjectName: string;
  semester: string;
  lecturerId: string;
}
