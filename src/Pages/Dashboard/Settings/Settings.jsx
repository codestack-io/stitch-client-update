import { useState } from "react";
import UseAuth from "../../../Components/Hooks/useAuth";
import Swal from "sweetalert2";

const Settings = () => {
  const { user } = UseAuth();

  const [name, setName] = useState(user?.displayName || "");

  const handleSave = (e) => {
    e.preventDefault();

    // Later you can update Firebase profile here

    Swal.fire({
      icon: "success",
      title: "Settings Updated",
      text: "Your profile settings have been saved.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="bg-white shadow rounded-xl p-6">

        <form onSubmit={handleSave} className="space-y-5">

          <div>
            <label className="font-semibold">
              Display Name
            </label>

            <input
              type="text"
              className="input input-bordered w-full mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              className="input input-bordered w-full mt-2"
              value={user?.email || ""}
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold">
              Password
            </label>

            <input
              type="password"
              className="input input-bordered w-full mt-2"
              placeholder="********"
              disabled
            />

            <p className="text-sm text-gray-500 mt-1">
              Password changes can be implemented later using Firebase Authentication.
            </p>
          </div>

          <button className="btn btn-primary">
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default Settings;