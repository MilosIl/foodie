import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { z } from "zod";
import {LoginForm} from "@/components";

// Define validation schema
const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional().default(false),
});

// Container component that handles login logic and state
const LoginContainer = ({
  onSubmit: submitCallback,
  isLoading = false,
  error = null,
}) => {
  const navigate = useNavigate();

  // Load saved credentials from localStorage
  const getSavedCredentials = () => {
    try {
      const savedCredentials = localStorage.getItem("foodie_credentials");
      return savedCredentials ? JSON.parse(savedCredentials) : null;
    } catch (error) {
      console.error("Error loading saved credentials:", error);
      return null;
    }
  };

  const savedCredentials = getSavedCredentials();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: savedCredentials?.username || "",
      password: savedCredentials?.password || "",
      rememberMe: !!savedCredentials,
    },
  });

  // Set values when saved credentials are loaded
  useEffect(() => {
    if (savedCredentials) {
      setValue("username", savedCredentials.username);
      setValue("password", savedCredentials.password);
      setValue("rememberMe", true);
    }
  }, [savedCredentials, setValue]);

  // Form submission handler
  const handleFormSubmit = (data) => {
    // Save or remove credentials based on rememberMe checkbox
    if (data.rememberMe) {
      // Save credentials to localStorage
      const credentials = {
        username: data.username,
        password: data.password,
      };
      localStorage.setItem("foodie_credentials", JSON.stringify(credentials));
    } else {
      // Remove saved credentials if they exist
      localStorage.removeItem("foodie_credentials");
    }

    if (submitCallback) {
      submitCallback(data);
    }
    navigate("/");
  };

  // Pass the logic and state to the presentational component
  return (
    <LoginForm
      register={register}
      errors={errors}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
      onSubmit={handleFormSubmit}
      error={error}
    />
  );
};

export { LoginContainer };
