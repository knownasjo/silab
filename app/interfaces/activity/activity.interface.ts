export type ActivityActorRole = "LABORAN" | "DOSEN" | "ASISTEN" | "TERMINAL";

export type ActivityGroup =
  | "LOGIN"
  | "PAYMENT"
  | "MEETING"
  | "ATTENDANCE"
  | "CLASS"
  | "SESSION"
  | "SUBJECT"
  | "ANNOUNCEMENT"
  | "ASSISTANT"
  | "ACCOUNT"
  | "PERIOD";

export interface IActivityActor {
  id: string | null;
  name: string;
  nim: string | null;
  role: ActivityActorRole;
}

export interface IActivityResponseBody {
  id: string;
  action: string;
  actionLabel: string;
  group: ActivityGroup;
  actor: IActivityActor;
  description: string;
  change: string | null;
  attempts: number;
  periodId: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface IActivityListResponseBody {
  items: IActivityResponseBody[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface IActivityFilters {
  periodId: string;
  group: ActivityGroup | "";
  from: string;
  to: string;
  q: string;
}

export interface IActivityQuery extends IActivityFilters {
  page: number;
}
