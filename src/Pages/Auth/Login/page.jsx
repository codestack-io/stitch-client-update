import React from "react";
import image from "../../../assets/login object.jpg";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Components/Hooks/useAuth";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signInUser, resetPassword, user } = UseAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const email = watch("email");

  // Redirect user to previous page after login
  const from = location.state?.from || "/";

  // If already logged in
  if (user) {
    return <Navigate to={from} replace />;
  }

  // Login
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  // Demo Login
  const demoLogin = () => {
    signInUser("demo@gmail.com", "123456")
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  // Forgot Password
  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    resetPassword(email)
      .then(() => {
        alert("Password reset email sent.");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">

        {/* Left Side */}
        <div className="text-center lg:text-left">
          <h3 className="text-5xl font-bold text-amber-400">
            Welcome!
          </h3>

          <p className="text-5xl font-bold text-amber-800">
            Please Login!
          </p>

          <img
            src={image}
            className="h-100 w-140"
            alt="Login"
          />
        </div>

        {/* Login Card */}
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">

          <form
            className="card-body"
            onSubmit={handleSubmit(handleLogin)}
          >
            <fieldset className="fieldset">

              {/* Email */}
              <label className="label">Email</label>

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}

              {/* Password */}
              <label className="label mt-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                    message:
                      "Password must contain both letters and numbers",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              {/* Forgot Password */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-left text-blue-600 hover:underline mt-2"
              >
                Forgot Password?
              </button>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-neutral bg-lime-900 mt-4"
              >
                Login
              </button>

              {/* Demo Login */}
              <button
                type="button"
                onClick={demoLogin}
                className="btn btn-warning mt-2"
              >
                Demo Login
              </button>

              {/* Register */}
              <p className="text-center mt-4">
                New here?{" "}
                <Link
                  to="/register"
                  className="text-amber-700 font-semibold underline"
                >
                  Register
                </Link>
              </p>

            </fieldset>
          </form>

          <SocialLogin />

        </div>
      </div>
    </div>
  );
};

export default Login;