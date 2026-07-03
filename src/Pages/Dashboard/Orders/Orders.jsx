import React from "react";

const Orders = () => {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        All Orders
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <p>Total Orders : 120</p>

        <p>Pending : 25</p>

        <p>Approved : 95</p>

      </div>

    </div>
  );
};

export default Orders;