type FormFieldProps = {
    id: string;
    label: string;
    value: string;
    type?: string;
    placeholder?: string;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>;
  
  export function FormField({
    id,
    label,
    value,
    type = 'text',
    placeholder,
    error,
    onChange,
    onBlur,
    ...rest
  }: FormFieldProps) {
    const errorId = `${id}-error`;
  
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block mb-1 text-sm font-medium">
          {label}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          {...rest}
        />
        
        {error && (
          <p id={errorId} className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }