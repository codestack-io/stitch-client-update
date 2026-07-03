import React from "react";
import image from "../../../assets/Register.jpg";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Components/Hooks/useAuth";
import { Link, useLocation, Navigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    registerUser,
    updateUserProfile,
    user,
    loading,
  } = UseAuth();

  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const from = location.state?.from?.pathname || "/";

  // ✅ FIXED: correct redirect (NO navigate inside render)
  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      // 1. Create user in auth
      await registerUser(data.email, data.password);

      // 2. Upload image
      const formData = new FormData();
      formData.append("image", profileImg);

      const Image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      const imgRes = await axios.post(Image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // 3. Prepare user data
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
        role: data.role || "user",
      };

      // 4. Save to DB
     
const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/users`,
  userInfo
);

if (res.data.success) {
  toast.success("User created successfully");
}

      // 5. Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">

            {/* LEFT SIDE */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-amber-400">
                Please Register!
              </h1>
              <img src={image} className="h-100 w-140" />
            </div>

            {/* FORM CARD */}
            <div className="card h-150 bg-base-100 w-full max-w-sm shadow-2xl">
              <div className="card-body p-10">

                {/* EMAIL */}
                <label>Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input"
                />
                {errors.email && (
                  <p className="text-amber-500">Email is required</p>
                )}

                {/* NAME */}
                <label>Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input"
                />
                {errors.name && (
                  <p className="text-amber-500">Name is required</p>
                )}

                {/* ROLE */}
                <label>Role</label>
                <select
                  {...register("role", { required: true })}
                  className="select select-bordered"
                  defaultValue="user"
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>

                {errors.role && (
                  <p className="text-amber-500">Role is required</p>
                )}

                {/* PHOTO */}
                <label>Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input"
                />
                {errors.photo && (
                  <p className="text-amber-500">Photo is required</p>
                )}

                {/* PASSWORD */}
                <label>Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  })}
                  className="input"
                />

                {errors.password?.type === "required" && (
                  <p className="text-amber-500">Password is required</p>
                )}

                {errors.password?.type === "minLength" && (
                  <p className="text-amber-500">
                    Password must be at least 6 characters
                  </p>
                )}

                {errors.password?.type === "pattern" && (
                  <p className="text-amber-500">
                    Password must contain letters and numbers
                  </p>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  className="btn btn-neutral bg-lime-900 mt-4"
                >
                  Register
                </button>

                <p>
                  Already registered?{" "}
                  <Link to="/login" className="text-amber-800 underline">
                    Login
                  </Link>
                </p>

                <SocialLogin />
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;