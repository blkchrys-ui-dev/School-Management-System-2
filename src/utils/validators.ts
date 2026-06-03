export const isRequired = (value: unknown): boolean => {
  return value !== null && value !== undefined && String(value).trim().length > 0;
};

export const isEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export const isPhoneNumber = (value: string): boolean => {
  return /^[6-9]\d{9}$/.test(value.replace(/\D/g, ''));
};

export const minLength = (value: string, length: number): boolean => {
  return value.trim().length >= length;
};

export const getFieldError = (label: string, value: unknown): string => {
  return isRequired(value) ? '' : `${label} is required`;
};
