import { Link } from "react-router";
import { Button, Input } from "@/components/ui";

// Pure presentational component with no business logic
const LoginForm = ({
  register,
  errors,
  isLoading,
  isSubmitting,
  handleSubmit,
  onSubmit,
  error,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-bold text-gray-900 text-3xl">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 mb-6 p-4 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div>
            <Input
              {...register("username")}
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
              {...register("password")}
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              disabled={isLoading || isSubmitting}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                {...register("rememberMe")}
                id="remember-me"
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
          </div>

          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full"
            label={"Login"}
          />
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
