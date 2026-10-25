export interface ISessionResponseBody {
  id: string;
  room: string;
  day: string;
  number: number;
  startAt: string;
  endAt: string;
  is_active: boolean;
  classes: number;
}

export interface IAddSessionRequestBody {
  room: string;
  day: string;
  number: number;
  startAt: string;
  endAt: string;
  also_days: string[];
}

export interface IUpdateSessionRequestBody {
  number?: number;
  startAt?: string;
  endAt?: string;
  is_active?: boolean;
  also_days?: string[];
}
