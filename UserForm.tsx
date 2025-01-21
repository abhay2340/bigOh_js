import { useRef } from "react";
import { useForm } from "./hooks/useForm";
import './useform.css'

interface FormData {
  username: string;
  email: string;
  password: string;
}

const UserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({defaultValues:{
    username: '',
    email: '',
    password: '',
  }});

  const onSubmit = (data: FormData) => {
    console.log("Form submitted successfully:", data);
    alert(JSON.stringify(data, null, 2));
  };

  const handleLogValues = () => {
    const currentValues = getValues();
    console.log("Current Form Values:", currentValues);
  };

const renderCount=useRef(0)
renderCount.current++

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{renderCount.current}</h1>
      <div>
        <label>Username:</label>
        <input
          {...register("username", {
            required: "Username is required",
            minLength: { value: 3, message: "Must be at least 3 characters" },
          })}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </button>
      <button type="button" onClick={() => reset()}>
        Reset Form
      </button>
      <button type="button" onClick={() => resetField("password")}>
        Reset Password Field
      </button>
      <button type="button" onClick={() => setValue("username", "JohnDoe")}>
        Set Username
      </button>
      <button type="button" onClick={() => setError("email", "Email is invalid.")}>
        Set Email Error
      </button>
      <button type="button" onClick={() => clearErrors()}>
        Clear All Errors
      </button>
      <button type="button" onClick={handleLogValues}>
        Log Current Values
      </button>
    </form>
  );
};

export default UserForm;
