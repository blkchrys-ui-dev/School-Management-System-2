import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import { loginUser } from '../../../api/auth.api';
import type { LoginRequest, LoginResponse, UserRole } from '../../../types/auth.types';

interface DemoUser extends LoginResponse {
  userId: string;
  password: string;
}

export const DEMO_USERS: Record<UserRole, DemoUser> = {
  student: {
    id: 'STU-1001',
    userId: 'student@oasis.edu',
    password: 'student123',
    name: 'Aarav Sharma',
    email: 'student@oasis.edu',
    token: 'demo-student-token',
    role: 'student',
    className: '10',
    section: 'A',
    rollNumber: '24',
  },
  teacher: {
    id: 'TCH-203',
    userId: 'teacher@oasis.edu',
    password: 'teacher123',
    name: 'Priya Mehta',
    email: 'teacher@oasis.edu',
    token: 'demo-teacher-token',
    role: 'teacher',
    subject: 'Mathematics',
    employeeId: 'EMP-203',
  },
  admin: {
    id: 'ADM-001',
    userId: 'admin@oasis.edu',
    password: 'admin123',
    name: 'School Admin',
    email: 'admin@oasis.edu',
    token: 'demo-admin-token',
    role: 'admin',
  },
};

const DASHBOARD_MAP: Record<UserRole, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  admin: '/admin/dashboard',
};

const getDemoLoginResponse = (payload: LoginRequest): LoginResponse => {
  const demoUser = DEMO_USERS[payload.role];
  const isMatchingUserId = payload.userId.trim().toLowerCase() === demoUser.userId.toLowerCase();
  const isMatchingPassword = payload.password === demoUser.password;

  if (!isMatchingUserId || !isMatchingPassword) {
    throw new Error('Invalid demo credentials');
  }

  const { userId: _userId, password: _password, ...loginResponse } = demoUser;

  return loginResponse;
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
        : getDemoLoginResponse(payload);

      login(response);
      navigate(DASHBOARD_MAP[response.role], { replace: true });
    } catch {
      setError('Unable to sign in. Please check your role, user ID, and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return { submitLogin, isLoading, error };
};

export default useLogin;
