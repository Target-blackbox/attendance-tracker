export interface Subject {
  id: string;
  name: string;
  code: string;
  professor: string;
  slots: TimeSlot[];
  totalClasses: number;
  attendedClasses: number;
  color: string;
  requiredClasses: number;
}

export interface TimeSlot {
  day: string;
  time: string;
  slot: string;
}

export interface SubjectFormData {
  name: string;
  code: string;
  professor: string;
  slots: TimeSlot[];
  totalClasses: number;
}

export interface WeeklySchedule {
  [key: string]: {
    [key: string]: string;
  };
}