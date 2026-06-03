import type { BaseEntity } from './common.types';

export interface Teacher extends BaseEntity {
  employeeId: string;
  firstName: string;
  lastName?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  classTeacherOf?: string;
  qualification?: string;
  joiningDate?: string;
  profileImage?: string;
}

export interface TimetableSlot extends BaseEntity {
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacherName?: string;
  className: string;
  section?: string;
  room?: string;
}

export interface Notice extends BaseEntity {
  title: string;
  description: string;
  audience: 'all' | 'students' | 'teachers' | 'parents';
  date: string;
  priority?: 'low' | 'medium' | 'high';
}
