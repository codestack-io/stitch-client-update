import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { useForm, useWatch } from 'react-hook-form';
import Container from '../Shared/Container/Container';
import { useParams } from 'react-router';
import UseAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const NewOrder = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);

  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

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
    const confirmed = await Swal.fire({
      title: 'Confirm Order',
      text: `You will pay ${totalPrice} taka for this order`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay Now',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#ef4444',
      background: '#0f172a',
      color: '#fff',
    });

    if (!confirmed.isConfirmed) return;

    try {
      const res = await axiosSecure.post('/create-checkout-session', {
        productName: model.productName,
        price: totalPrice,
        senderEmail: data.email,
        productId: id,   // ✅ FIXED (important)
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        Swal.fire('Error', 'Stripe session failed', 'error');
      }
    } catch (err) {
      console.log(err);
      Swal.fire('Error', 'Payment initiation failed', 'error');
    }
  };

  return (
    <Container>
      <Navbar />

      <h2 className="text-2xl font-bold text-amber-950">
        Create new order
      </h2>

      <form onSubmit={handleSubmit(handleNewOrder)} className="mt-5 p-4 text-black">

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

        <input
          type="submit"
          value="Create Order"
          className="btn btn-primary mt-4"
        />
      </form>

      <Footer />
    </Container>
  );
};

export default NewOrder;