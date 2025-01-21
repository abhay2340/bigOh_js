import { useRef, useState, useCallback } from "react";

interface ValidationRules {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: any) => string | undefined;
}

interface FormState {
  errors: Record<string, string | undefined>;
  isSubmitting: boolean;
  isValid: boolean;
}

type FieldValues = Record<string, any>;

interface UseFormOptions<T> {
  defaultValues?: Partial<T>; // Default values for form initialization
}

export function useForm<T extends FieldValues = FieldValues>(
  options: UseFormOptions<T> = {}
) {
  const { defaultValues = {} } = options;

  const valuesRef = useRef<T>({ ...defaultValues } as T); // Store field values
  const errorsRef = useRef<Record<string, string | undefined>>({}); // Store errors
  const validationRulesRef = useRef<Record<string, ValidationRules>>({}); // Store validation rules
  const fieldsRef = useRef(new Map<string, HTMLInputElement>()); // Store DOM fields

  const [formState, setFormState] = useState<FormState>({
    errors: {},
    isSubmitting: false,
    isValid: true,
  });


//   -------------Update Errors State---------------------

  const updateErrorsState = useCallback(() => {
    const newErrors = { ...errorsRef.current };
    const isValid = Object.keys(newErrors).length === 0;

    setFormState((prevState) => {
      if (
        JSON.stringify(prevState.errors) !== JSON.stringify(newErrors) ||
        prevState.isValid !== isValid
      ) {
        return { ...prevState, errors: newErrors, isValid };
      }
      return prevState; // Avoid unnecessary state updates
    });
  }, []);


// ----------------------Validatee-----------------------------

  const validateField = useCallback((name: string, value: any) => {
    const rules = validationRulesRef.current[name];
    let error: string | undefined;

    if (rules) {
      if (rules.required && (!value || value === "")) {
        error = typeof rules.required === "string" ? rules.required : "This field is required";
      } else if (rules.minLength && value.length < rules.minLength.value) {
        error = rules.minLength.message;
      } else if (rules.maxLength && value.length > rules.maxLength.value) {
        error = rules.maxLength.message;
      } else if (rules.pattern && !rules.pattern.value.test(value)) {
        error = rules.pattern.message;
      } else if (rules.validate) {
        error = rules.validate(value);
      }
    }

    // Update errorsRef directly
    if (error) {
      errorsRef.current[name] = error;
    } else {
      delete errorsRef.current[name];
    }

    // Trigger a state update only if errors change
    updateErrorsState();

    return error;
  }, [updateErrorsState]);


// --------------------Register----------------
  const register = useCallback(
    (name: keyof T, rules?: ValidationRules) => {
      if (rules) {
        validationRulesRef.current[name as string] = rules;
      }

      return {
        name,
        defaultValue: valuesRef.current[name], // Initialize input value with defaultValues
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;
          valuesRef.current[name] = value as T[keyof T];
          validateField(name as string, value); // Validate the field
        },
        onBlur: () => {
          validateField(name as string, valuesRef.current[name]); // Validate on blur
        },
        ref: (el: HTMLInputElement | null) => {
          if (el) {
            fieldsRef.current.set(name as string, el);
            el.value = valuesRef.current[name] || ""; // Set default value in the DOM
          } else {
            fieldsRef.current.delete(name as string);
          }
        },
      };
    },
    [validateField]
  );

  const handleSubmit = (callback: (data: T) => void) => (event: React.FormEvent) => {
    event.preventDefault();

    let hasErrors = false;
    Object.keys(validationRulesRef.current).forEach((name) => {
      const error = validateField(name, valuesRef.current[name]);
      if (error) hasErrors = true;
    });

    if (!hasErrors) {
      setFormState((prevState) => ({ ...prevState, isSubmitting: true }));
      callback(valuesRef.current);
      setFormState((prevState) => ({ ...prevState, isSubmitting: false }));
      reset()
    }
  };

  const reset = (values: Partial<T> = defaultValues) => {
    valuesRef.current = { ...values } as T;
    errorsRef.current = {};
    fieldsRef.current.forEach((field, name) => {
      const newValue = values[name as keyof T] || "";
      field.value = newValue; // Update DOM element with new value
    });

    setFormState({
      errors: {},
      isSubmitting: false,
      isValid: true,
    });
  };

  const resetField = (name: keyof T, value: any = "") => {
    valuesRef.current[name] = value;
    delete errorsRef.current[name as string];
    const field = fieldsRef.current.get(name as string);
    if (field) field.value = value;

    updateErrorsState();
  };

  const setError = (name: keyof T, error: string) => {
    errorsRef.current[name as string] = error;
    updateErrorsState();
  };

  const clearErrors = (name?: keyof T) => {
    if (name) {
      delete errorsRef.current[name as string];
    } else {
      errorsRef.current = {};
    }

    updateErrorsState();
  };

  const setValue = (name: keyof T, value: any) => {
    valuesRef.current[name] = value;
    const field = fieldsRef.current.get(name as string);
    if (field) field.value = value;
  };

  const getValues = () => {
    return valuesRef.current;
  };

  return {
    register,
    handleSubmit,
    reset,
    resetField,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState,
  };
}
