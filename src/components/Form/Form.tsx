import { validateCorporationNumber } from '../../helpers/validateCorporateNumber';
import { validatePhone } from '../../helpers/validatePhone';
import { useState, useCallback } from 'react';
import beanImage from '../../assets/bean.jpg';
import { FormField } from '../FormField/FormField';
import { getValidationErrors } from '../../helpers/getValidationErrors';

export type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  corporation: string;
};

export function Form() {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    corporation: '',
  });

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error: string | null = null;

    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        break;
      case 'phone':
        if (!validatePhone(value)) {
          error = 'Invalid Canadian phone number. Format: +1XXXXXXXXXX';
        }
        break;
      case 'corporation':
        error = await validateCorporationNumber(value);
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if ((name === 'firstName' || name === 'lastName') && value.length > 50)
        return;

      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      setSuccess(null);
    },
    [setFormData]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = await getValidationErrors(formData);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstField = Object.keys(newErrors)[0];
      const el = document.getElementById(firstField);
      el?.focus();
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSuccess('Form submitted successfully!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="onboarding-heading"
      role="form"
      className="bg-white rounded-2xl p-8 max-w-xl mx-auto shadow-sm"
    >
      <h1
        id="onboarding-heading"
        className="text-2xl font-medium text-center mb-6"
      >
        Onboarding Form
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          value={formData.firstName}
          error={errors.firstName}
          onChange={handleChange}
          maxLength={50}
          inputMode="text"
          onBlur={handleBlur}
        />

        <FormField
          id="lastName"
          label="Last Name"
          value={formData.lastName}
          error={errors.lastName}
          onChange={handleChange}
          maxLength={50}
          inputMode="text"
          onBlur={handleBlur}
        />
      </div>

      <FormField
        id="phone"
        label="Phone Number"
        type="tel"
        value={formData.phone}
        error={errors.phone}
        onChange={handleChange}
        placeholder="Must use this format +11234567890"
        inputMode="numeric"
        maxLength={12}
        onBlur={handleBlur}
      />

      <FormField
        id="corporation"
        label="Corporation Number"
        type="text"
        value={formData.corporation}
        error={errors.corporation}
        onChange={handleChange}
        inputMode="numeric"
        maxLength={9}
        onBlur={handleBlur}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="mt-4 w-full bg-black text-white rounded-xl py-3 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit →'}
      </button>

      {success && (
        <div
          className="flex flex-col items-center"
          role="status"
          aria-live="polite"
        >
          <p className="text-green-600 text-sm mt-4 text-center">{success}</p>
          <img
            src={beanImage}
            alt="Mr. Bean tells you nice job!"
            className="w-[100px] p-2"
          />
        </div>
      )}
    </form>
  );
}
