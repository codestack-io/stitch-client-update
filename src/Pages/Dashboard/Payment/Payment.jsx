import { useParams } from 'react-router';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../Components/Hooks/useAuth';

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = UseAuth();

  const { isLoading, data: neworder } = useQuery({
    queryKey: ['neworder', id],
    enabled: !!id, // extra safety
    queryFn: async () => {
      const res = await axiosSecure.get(`/neworder/${id}`);
      return res.data;
    }
  
  });
  console.log("neworder:", neworder);

  // console.log("useParams id:", id);
  // console.log('products', id);
  // console.log("Route param id:", id);
  // console.log("Products from API:", neworder);
const handlePayment = async () => {
const paymentInfo = {
  price: Number(neworder?.orderprice),
  orderId: neworder?._id,
  senderEmail: user?.email,
  productName: neworder?.productName,
};

 console.log("paymentInfo", paymentInfo);

  try {
    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    console.log("Stripe response:", res.data);
    

    if (res.data?.url) {
      window.location.assign(res.data.url);
    } else {
      console.error("Stripe session URL not found");
    }
  } catch (err) {
    console.error(err);
  }
};


  

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
    <h2>
    Pay please ${neworder?.orderprice}: {neworder?.productName}
     </h2>

      <button onClick={handlePayment} className='btn btn-primary text-black'>Pay</button>
    </div>
  );
};

export default Payment;
