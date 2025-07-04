import { Link } from "react-router";
import { Button, Input } from "@/components/ui";

// Pure presentational component with no business logic
const RegisterForm = ({
  register,
  errors,
  isLoading,
  isSubmitting,
  handleSubmit,
  onSubmit,
  error,
}) => {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-gray-900 text-3xl">
            Join <span className="text-orange-400">Foodie</span>
          </h1>
          <p className="text-gray-600">
            Create your account to start sharing recipes
          </p>
        </div>

        {error && (
          <div className="bg-red-50 mb-6 p-4 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Input
                {...register("firstName")}
                name="firstName"
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                error={errors.firstName}
                disabled={isLoading || isSubmitting}
              />
            </div>

            <div>
              <Input
                {...register("lastName")}
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                error={errors.lastName}
                disabled={isLoading || isSubmitting}
              />
            </div>
          </div>

          {/* Username Field */}
          <div>
            <Input
              {...register("username")}
              name="username"
              type="text"
              label="Username"
              placeholder="Choose a unique username"
              error={errors.username}
              disabled={isLoading || isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div>
            <Input
              {...register("email")}
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              error={errors.email}
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
              placeholder="Create a strong password"
              error={errors.password}
              disabled={isLoading || isSubmitting}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <Input
              {...register("confirmPassword")}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              disabled={isLoading || isSubmitting}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full"
            size="large"
          >
            {isLoading || isSubmitting ? (
              <div className="flex justify-center items-center">
                <div className="mr-2 border-white border-b-2 rounded-full w-4 h-4 animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
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
                Already have an account?
              </span>
            </div>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            <Link
              to="/login"
              className="font-medium text-orange-500 hover:text-orange-600"
            >
              Sign in to your existing account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { RegisterForm };
