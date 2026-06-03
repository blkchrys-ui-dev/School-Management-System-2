import type { BaseEntity } from './common.types';

export interface Student extends BaseEntity {
  admissionNo: string;
  firstName: string;
  lastName?: string;
  name: string;
  className: string;
  section: string;
  rollNumber: string;
  email?: string;
  phone?: string;
  guardianName?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  profileImage?: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'holiday' | 'leave';
  remarks?: string;
}

export interface HomeworkItem extends BaseEntity {
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  className: string;
  section?: string;
}

export interface FeeSummary {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate?: string;
}
