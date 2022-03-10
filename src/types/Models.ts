export interface AppointmentRecord {
  title: string;
  stubCode: string;
  start: string;
  end: string;
  days: string[];
  id: number;
  colorId?: string | number;
  checked?: boolean;
}

export interface AppointmentModel {
  title: string;
  startDate: Date;
  endDate: Date;
  id: number;
  colorId?: string | number;
}

export type RecordsModel = { [key: number]: AppointmentRecord };
