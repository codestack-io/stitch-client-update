import React, { useState } from "react";
import UseAuth from "../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);

    await axiosSecure.patch("/users/update-profile", formData);
    alert("Profile updated");
  };

  const handlePassword = async () => {
    await axiosSecure.patch("/users/update-password", {
      password,
    });
    alert("Password updated");
  };

  return (
    <div className="p-6 bg-white">

      <h2 className="text-xl font-bold mb-4">Profile</h2>

      {/* NAME */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input mb-3"
      />

      {/* IMAGE */}
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
        className="mb-3"
      />

      <button onClick={handleUpdate} className="btn btn-primary">
        Update Profile
      </button>

      <hr className="my-4" />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
        className="input mb-3"
      />

      <button onClick={handlePassword} className="btn btn-warning">
        Change Password
      </button>

    </div>
  );
};

export default MyProfile;