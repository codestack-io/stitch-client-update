import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const OrdersTable = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axiosSecure.get("/allorders");
    setOrders(res.data);
  };

  const filtered = orders.filter(o =>
    o.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* FILTER */}
      <input
        placeholder="Search by email..."
        className="input mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="table w-full bg-white">
        <thead>
          <tr>
            <th>Email</th>
            <th>Product</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((o) => (
            <tr key={o._id}>
              <td>{o.email}</td>
              <td>{o.productName}</td>
              <td>{o.productStatus}</td>
              <td>{o.orderprice}</td>

              <td className="flex gap-2">
                <button className="btn btn-sm btn-info">View</button>
                <button className="btn btn-sm btn-warning">Edit</button>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default OrdersTable;