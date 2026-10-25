export enum AnnouncementTypeEnum {
  ASSISTANT = "ASSISTANT",
  PRACTICUM = "PRACTICUM",
  INHALL = "INHALL",
  BASIC = "BASIC",
}

export interface IAddAnnouncementRequestBody {
  type: AnnouncementTypeEnum;
  title: string;
  body: string;
  subjectIds?: string[];
}

export interface IAnnouncementSubject {
  id: string;
  subjectName: string;
  subjectCode: string;
}

export interface IGetAllAnnouncementsResponseBody {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  type: AnnouncementTypeEnum;
  author: string;
  forAll: boolean;
  subjects: IAnnouncementSubject[];
  period: string | null;
}

export type AnnouncementType = {
  title: string;
  value: AnnouncementTypeEnum;
};
