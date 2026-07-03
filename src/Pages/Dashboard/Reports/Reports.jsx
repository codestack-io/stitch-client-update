import React from "react";

const Reports = () => {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Reports
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Revenue</h2>
            <p>$12,450</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Orders</h2>
            <p>120 Orders</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Customers</h2>
            <p>40 Users</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Reports;