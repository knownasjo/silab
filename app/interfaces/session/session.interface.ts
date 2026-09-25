export type SessionDayGroup = "WEEKDAY" | "FRIDAY";

export interface ISessionResponseBody {
  id: string;
  day_group: SessionDayGroup;
  number: number;
  startAt: string;
  endAt: string;
  is_active: boolean;
  classes: number;
}

export interface IAddSessionRequestBody {
  day_group: SessionDayGroup;
  number: number;
  startAt: string;
  endAt: string;
}

export interface IUpdateSessionRequestBody {
  number?: number;
  startAt?: string;
  endAt?: string;
  is_active?: boolean;
}
