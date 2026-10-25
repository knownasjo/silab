export interface ISessionResponseBody {
  id: string;
  room: string;
  day: string;
  number: number;
  startAt: string;
  endAt: string;
  isActive: boolean;
  classes: number;
}

export interface IAddSessionRequestBody {
  room: string;
  day: string;
  number: number;
  startAt: string;
  endAt: string;
  alsoDays: string[];
}

export interface IUpdateSessionRequestBody {
  number?: number;
  startAt?: string;
  endAt?: string;
  isActive?: boolean;
  alsoDays?: string[];
}
