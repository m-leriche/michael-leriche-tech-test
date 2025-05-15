import type { FormData } from '../components/Form/Form';
import { validatePhone } from './validatePhone';
import { validateCorporationNumber } from './validateCorporateNumber';

export const getValidationErrors = (
  data: FormData
): Promise<Partial<Record<keyof FormData, string>>> => {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';
  if (!validatePhone(data.phone)) {
    errors.phone = 'Invalid Canadian phone number. Format: +1XXXXXXXXXX';
  }

  return validateCorporationNumber(data.corporation).then((corpError) => {
    if (corpError) errors.corporation = corpError;
    return errors;
  });
};
