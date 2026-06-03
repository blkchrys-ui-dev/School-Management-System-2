import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import { loginUser } from '../../../api/auth.api';
import type { LoginRequest, UserRole } from '../../../types/auth.types';

const DEMO_USERS: Record<UserRole, { id: string; name: string; email: string; token: string; className?: string; section?: string; rollNumber?: string; subject?: string; employeeId?: string }> = {
  student: { id: 'STU-1001', name: 'Aarav Sharma', email: 'student@oasis.edu', token: 'demo-student-token', className: '10', section: 'A', rollNumber: '24' },
  teacher: { id: 'TCH-203', name: 'Priya Mehta', email: 'teacher@oasis.edu', token: 'demo-teacher-token', subject: 'Mathematics', employeeId: 'EMP-203' },
  admin: { id: 'ADM-001', name: 'School Admin', email: 'admin@oasis.edu', token: 'demo-admin-token' },
};

const DASHBOARD_MAP: Record<UserRole, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  admin: '/admin/dashboard',
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const submitLogin = async (payload: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      const response = import.meta.env.VITE_API_BASE_URL
        ? await loginUser(payload)
        : { ...DEMO_USERS[payload.role], role: payload.role };

      login(response);
      navigate(DASHBOARD_MAP[response.role], { replace: true });
    } catch {
      setError('Unable to sign in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { submitLogin, isLoading, error };
};

export default useLogin;
