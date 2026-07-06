import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { useForm, useWatch } from 'react-hook-form';
import Container from '../Shared/Container/Container';
import { useParams } from 'react-router-dom';
import UseAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const NewOrder = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);

  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  console.log("NewOrder component rendered");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm();

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        setModel(res.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) fetchProduct();
  }, [id]);
  

  // AUTO EMAIL
  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const watchedQuantity = useWatch({
    control,
    name: "orderQuantity",
  });

  const quantity = Number(watchedQuantity || model?.minimumOrder || 1);
  const price = Number(model?.price || 0);
  const totalPrice = quantity * price;

  if (!model) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  // ✅ FIXED STRIPE FLOW
const handleNewOrder = async (data) => {
  console.log("1. handleNewOrder called");

  const confirmed = await Swal.fire({
    title: "Confirm Order",
    text: `You will pay ${totalPrice} taka`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Pay Now",
    cancelButtonText: "Cancel",
  });

  console.log("2. Swal finished", confirmed);

  if (!confirmed.isConfirmed) {
    console.log("3. User cancelled");
    return;
  }

  console.log("4. User confirmed");

  try {
    console.log("5. Sending request...");

   // 1. Save Order
const order = {
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  paymentMethod: data.paymentMethod,
  orderQuantity: Number(data.orderQuantity),
  deliveryAddress: data.deliveryAddress,

  productName: model.productName,
  productId: id,

  paymentStatus: "unpaid",
  productStatus: "Pending",
};

const orderRes = await axiosSecure.post("/neworder", order);

const orderId = orderRes.data.result.insertedId;

// 2. Create Stripe Session
const res = await axiosSecure.post("/create-checkout-session", {
  orderId,
  productName: model.productName,
  price: totalPrice,
  senderEmail: data.email,
});

window.location.href = res.data.url;

    console.log("6. Backend response:", res.data);

    if (res.data.url) {
      console.log("7. Redirecting to Stripe...");
      window.location.href = res.data.url;
    } else {
      Swal.fire({
        icon: "error",
        title: "No Stripe URL received",
      });
    }
  } catch (err) {
    console.log("ERROR:", err);

    Swal.fire({
      icon: "error",
      title: "Checkout Failed",
      text: err.response?.data?.message || err.message,
    });
  }
};
  return (
    <Container>
      <Navbar />

      <h2 className="text-2xl font-bold text-amber-950">
        Create new order
      </h2>

<form
  onSubmit={handleSubmit(
    handleNewOrder,
    (errors) => {
      console.log(errors);
    }
  )}
>

        {/* PRODUCT TYPE */}
        <div>
          <label className="label">
            <input
              type="radio"
              value="document"
              {...register('ProductType', { required: "Product type is required" })}
              className="radio"
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              value="non-document"
              {...register('ProductType', { required: "Product type is required" })}
              className="radio"
            />
            Non-Document
          </label>

          {errors.ProductType && (
            <p className="text-red-500">{errors.ProductType.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">

          {/* EMAIL */}
          <fieldset className="fieldset">
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} className="input" />
          </fieldset>

          {/* PRODUCT NAME */}
          <fieldset className="fieldset">
            <label>Product Name</label>
            <input value={model.productName} readOnly className="input bg-gray-100" />
          </fieldset>

          {/* STATUS */}
          <fieldset className="fieldset">
            <label>Status</label>
            <input value={model.Status} readOnly className="input bg-gray-100" />
          </fieldset>

          {/* FIRST NAME */}
          <input {...register('firstName')} placeholder="First Name" className="input" />

          {/* LAST NAME */}
          <input {...register('lastName')} placeholder="Last Name" className="input" />

          {/* PAYMENT METHOD */}
          <select {...register("paymentMethod", { required: true })} className="select">
            <option value="">Select Method</option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
            <option value="COD">Cash On Delivery</option>
          </select>

          {/* QUANTITY */}
          <input
            type="number"
            defaultValue={model.minimumOrder}
            {...register("orderQuantity", {
              required: true,
              min: model.minimumOrder,
              max: model.availableQuantity,
            })}
            className="input"
          />

          {/* PRICE */}
          <input value={`${totalPrice} tk`} readOnly className="input bg-gray-100" />

          {/* ADDRESS */}
          <input {...register('deliveryAddress')} placeholder="Address" className="input" />
        </div>

  <button
  type="submit"
  className="btn btn-primary mt-4"
>
  Create Order
</button>
      </form>

      <Footer />
    </Container>
  );
};

export default NewOrder;