import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const trackingStatuses = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery"
];

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: approvedOrders = [], refetch } = useQuery({
    queryKey: ["approvedOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/allorders?productStatus=Approved"
      );
      return res.data;
    }
  });

  // ADD TRACKING

  const handleViewTracking = async (id) => {
  try {
    const res = await axiosSecure.get(`/allorders/tracking/${id}`);

    setSelectedOrder({
      tracking: res.data,
    });

    document.getElementById("viewTracking").showModal();
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Couldn't load tracking", "error");
  }
};
  const handleAddTracking = async e => {
    e.preventDefault();
    const form = e.target;

    const trackingData = {
      location: form.location.value,
      note: form.note.value,
      status: form.status.value,
      time: new Date().toISOString()
    };

    

    const res = await axiosSecure.patch(
      `/allorders/tracking/${selectedOrder._id}`,
      trackingData
    );

    if (res.data.modifiedCount) {
      Swal.fire("Success", "Tracking added", "success");
      refetch();
      document.getElementById("trackingModal").close();
      form.reset();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Approved Orders ({approvedOrders.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {approvedOrders.map(order => (
              <tr key={order._id}>
                <td>{order._id.slice(0, 8)}...</td>
                <td>{order.email}</td>
                <td>{order.productName}</td>
                <td>{order.orderQuantity}</td>
                <td>
                  {new Date(order.updatedAt || order.createdAt)
                    .toLocaleDateString()}
                </td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      setSelectedOrder(order);
                      document
                        .getElementById("trackingModal")
                        .showModal();
                    }}
                  >
                    Add Tracking
                  </button>

    <button
  className="btn btn-sm btn-info"
  onClick={() => handleViewTracking(order._id)}
>
  View Tracking
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD TRACKING MODAL */}
      <dialog id="trackingModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Tracking Update</h3>

          <form onSubmit={handleAddTracking} className="space-y-3 mt-4">
            <input
              name="location"
              placeholder="Location"
              className="input input-bordered w-full"
              required
            />

            <textarea
              name="note"
              placeholder="Note"
              className="textarea textarea-bordered w-full"
            />

            <select
              name="status"
              className="select select-bordered w-full"
              required
            >
              {trackingStatuses.map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <div className="modal-action">
              <button className="btn btn-success">Save</button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("trackingModal").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* VIEW TRACKING MODAL */}
      <dialog id="viewTracking" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Tracking Timeline
          </h3>

          {selectedOrder?.tracking?.length ? (
            <ul className="timeline timeline-vertical">
              {selectedOrder.tracking.map((t, i) => (
                <li key={i}>
                  <div className="timeline-start">
                    {new Date(t.time).toLocaleString()}
                  </div>
                  <div className="timeline-middle">●</div>
                  <div className="timeline-end">
                    <p className="font-semibold">{t.status}</p>
                    <p>{t.location}</p>
                    <p className="text-sm text-gray-500">
                      {t.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tracking info yet</p>
          )}

          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                document.getElementById("viewTracking").close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApprovedOrders;
