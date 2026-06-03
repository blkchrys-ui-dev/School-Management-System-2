const DEFAULT_PREFIX = 'SMS';

export const generateId = (prefix = DEFAULT_PREFIX): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `${prefix}-${timestamp}-${randomPart}`;
};

export const generateAdmissionNumber = (): string => {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);

  return `ADM-${year}-${randomPart}`;
};

export default generateId;
