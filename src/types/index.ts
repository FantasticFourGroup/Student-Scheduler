export interface OptionProps {
  [key: string]: boolean;
}

export interface EditingOptionsSelectorProps {
  options: OptionProps;
  onOptionsChange: any;
}

export interface EditingOptionsProps {
  id: string;
  text: string;
}

export interface ScheduleProps {
  title: string;
  startDate: Date;
  endDate: Date;
  id: number;
}

export interface DataRangeProps {
  date1: { title: string; startDate: Date; endDate: Date; id: number };
  date2: { title: string; startDate: Date; endDate: Date; id: number };
}

export interface Category {
  name: string;
  appointments: number[];
}
