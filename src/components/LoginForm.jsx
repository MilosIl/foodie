import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { Link } from "react-router";

const LoginForm = ({
  onSubmit,
  isLoading = false,
  error = null,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-bold text-gray-900 text-3xl">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Global Error Message */}
        {error && (
          <div className="bg-red-50 mb-6 p-4 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Username Field */}
          <div>
            <Input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers, and underscores",
                },
              })}
              name="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
              error={errors.username}
              disabled={isLoading || isSubmitting}
            />
          </div>

          {/* Password Field */}
          <div>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              disabled={isLoading || isSubmitting}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="border-gray-300 rounded focus:ring-orange-500 w-4 h-4 text-orange-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-gray-700 text-sm"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-orange-500 hover:text-orange-600"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full"
            size="large"
          >
            {isLoading || isSubmitting ? (
              <div className="flex justify-center items-center">
                <div className="mr-2 border-white border-b-2 rounded-full w-4 h-4 animate-spin"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-8 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="border-gray-300 border-t w-full" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                New to Foodie?
              </span>
            </div>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-orange-500 hover:text-orange-600"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginForm };
