import React, { useState } from 'react';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FcApproval } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { MdPreview } from "react-icons/md";
import UseAuth from '../../../Components/Hooks/useAuth';
import Swal from 'sweetalert2';
import { useRef } from "react";
import { Link } from 'react-router';


const PendingOrders = () => {
    const {user} = UseAuth();
    const [order,setOrder] = useState(null);
    const axiosSecure = useAxiosSecure();
    
    
    const {data: allorders = [],refetch} = useQuery({
        queryKey: ['allorders','pendingOrders'],
        queryFn: async()=>{
            const res =  await axiosSecure.get(`/allorders?productStatus=Suspended`)
            return res.data;
        
        }
    });
     const handleUpdateStatus = async (allorder, productStatus) => {
  const updateInfo = {
    status: productStatus,
    email: user.email,
  };

  const res = await axiosSecure.patch(
    `/allorders/${allorder._id}`,
    updateInfo
  );

  if (res.data.modifiedCount) {
    Swal.fire({
      icon: "success",
      title: `${productStatus} Successfully`,
      timer: 1500,
      showConfirmButton: false,
    });

    refetch();
  }
};

         const modalRef = useRef(null);

  const openModal = allorder => {
    setOrder(allorder)
    if (modalRef.current) {
      modalRef.current?.showModal();
    }
  };
    return (
        <div>
            <h2>Pending Orders:{allorders.length}</h2>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Order Date</th>
        <th>Status</th>
        <th>View</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {allorders.map((allorder,index) =>
          <tr key= {allorder._id}>
        <th>{ index + 1 }</th>
        <td>{allorder.productName}</td>
        <td>{allorder.orderQuantity}</td>
        <td>{allorder.createdAt}</td>
        <td>{allorder.productStatus}</td>
         <td><Link to={`/product-details/${allorder._id}`} className="btn btn-warning hover:bg-amber-300"><MdPreview /></Link></td>
       <td>
  {allorder.productStatus === 'Approved' ? (
    <span className="text-green-600 font-bold">Approved</span>
  ) : (
    <button
      onClick={() => openModal(allorder)}
      className="btn btn-warning hover:bg-amber-300"
    >
      <FcApproval /> Approve
    </button>
  )}
</td>

    <td>
  <button
    disabled={allorder.productStatus === 'Approved'}
    onClick={() => handleUpdateStatus(allorder, "Rejected")}
    className="btn btn-warning hover:bg-amber-300"
  >
    <MdCancel /> Reject
  </button>
</td>



      </tr>
      )}
    
     
    </tbody>
  </table>
</div>


<dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Confirm Approval</h3>

    <p className="py-4">
      Are you sure you want to approve
      <span className="font-semibold">
        {" "}{order?.productName}
      </span>
      ?
    </p>

    <div className="modal-action">
      <button
        className="btn btn-success"
        onClick={() => {
          handleUpdateStatus(order, "Approved");
          modalRef.current.close();
        }}
      >
        Approve
      </button>

      <button
        className="btn"
        onClick={() => modalRef.current.close()}
      >
        Cancel
      </button>
    </div>
  </div>
</dialog>


        </div>
        
    );
};

export default PendingOrders;