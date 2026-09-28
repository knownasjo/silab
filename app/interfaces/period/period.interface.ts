export type AcademicTerm = "GANJIL" | "GENAP";

export interface IPeriodResponseBody {
  id: string;
  year: string;
  term: AcademicTerm;
  name: string;
  is_active: boolean;
  classes: number;
  activations: number;
}

export interface IStartPeriodRequestBody {
  year?: string;
  term?: AcademicTerm;
}

export interface IStartPeriodResponseBody {
  id: string;
  name: string;
  closed_meetings: number;
}

export interface IClassPeriod {
  id: string;
  name: string;
  is_active: boolean;
}
