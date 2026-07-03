import React from "react";

const MyItems = () => {
  const items = [
    {
      id: 1,
      name: "Men's Shirt",
      status: "Completed",
    },
    {
      id: 2,
      name: "Punjabi",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">

          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default MyItems;