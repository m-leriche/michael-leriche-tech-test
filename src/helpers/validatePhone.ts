export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+1\d{10}$/;
  return phoneRegex.test(phone);
};
