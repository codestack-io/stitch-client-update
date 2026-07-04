import UseAuth from '../../../Components/Hooks/useAuth';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdEdit } from "react-icons/md";
import { MdPreview } from "react-icons/md";
import { Link } from 'react-router';
const AllOrders = () => {
  const { user,loading: userLoading} = UseAuth();
  const axiosSecure = useAxiosSecure();
  

  console.log('Logged in user email:', user?.email);

  
  const { data: neworder = [],isLoading } = useQuery({
  queryKey: ['my-orders', user?.email],
   enabled: !!user?.email && !userLoading,
  queryFn: async () => {
    console.log("Fetching orders for email:",user?.email); // ← add this

    if (!user?.email) {
      throw new Error("User email missing – query should not have run");
    }
const res = await axiosSecure.get(`/neworder?email=${user?.email}`);

return res.data.map(order => ({
  ...order,
  normalizedPaymentStatus: order.paymentStatus,
}));
  }
});

  


  if (userLoading || isLoading) {
    return <div className="text-center p-4">Loading orders...</div>;
  }
  if (!user?.email) {
  return <div className="text-center p-4 text-red-600">Please log in to view orders.</div>;
}

 

  return (
    <div>
      <h2> All of my orders : {neworder.length}</h2>
      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>ID</th>
        
        <th>Product Name</th>
        <th>Quantity</th>
        <th>TrackingId</th>
        <th>Status</th>
         <th>Payment</th>
        <th>Action</th>
        <th>View</th>
        
      </tr>
    </thead>
    <tbody>
      {
        neworder.map(products => <tr key={products._id}>
        <th>{products._id}</th>
        <td>{products.productName}</td>
        <td>{products.orderQuantity}</td>
        <td>{products.trackingId}</td>
        <td>{products.productStatus}</td>
        
        
         <td>
        {
         products.normalizedPaymentStatus === 'paid'?
          <span className="text-green-600 font-bold">Paid</span> :
          <Link to={`/dashboard/payment/${products._id}`}><button className="btn btn-sm btn-primary">Pay</button></Link>
        }
      </td>
        <td><button  className="btn btn-warning hover:bg-amber-300"><MdEdit /></button></td>
         <td><button  className="btn btn-warning hover:bg-amber-300"><MdPreview /> </button></td>
      </tr> )
      }
     
     
    </tbody>
  </table>
</div>
    </div>
  );
};

export default AllOrders;
