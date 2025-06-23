import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RegisterForm } from "@/components";
import {
  registerUser,
  loginUser,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
  clearError,
} from "@/store/AuthSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleRegister = async (userData) => {
    try {
      const result = await dispatch(registerUser(userData));
      if (registerUser.fulfilled.match(result)) {
        setRegistrationSuccess(true);

        // Auto-login after successful registration
        const loginResult = await dispatch(
          loginUser({
            username: userData.username,
            password: userData.password,
          })
        );

        if (loginUser.fulfilled.match(loginResult)) {
          // Login successful, redirect will happen via useEffect
          console.log("Registration and auto-login successful");
        }
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div>
      {registrationSuccess && !error && (
        <div className="mx-auto mb-6 max-w-lg">
          <div className="bg-green-50 p-4 border border-green-200 rounded-md">
            <p className="text-green-600 text-sm text-center">
              Registration successful! Logging you in...
            </p>
          </div>
        </div>
      )}
      <RegisterForm
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export { RegisterPage };
