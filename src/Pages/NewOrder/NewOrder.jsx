import React  from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { useForm,useWatch } from 'react-hook-form';
import Container from '../Shared/Container/Container';
import { useLoaderData } from 'react-router';
import UseAuth from '../../Components/Hooks/useAuth';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';




const NewOrder = () => {

 const model = useLoaderData();
 console.log(model);

//  const navigate = useNavigate();

 const { register, handleSubmit, control, formState: { errors } } = useForm();
 const axiosSecure = useAxiosSecure();
 const {user} = UseAuth();
 const quantity = useWatch({ control, name: "orderQuantity" }) || model?.result?.minimumOrder;
 const totalPrice = quantity * model?.result?.price;
 console.log(totalPrice);

 const handleNewOrder = (data) => {
  console.log(data);
  axiosSecure.post('/neworder', data)
    .then(res=>{
     console.log('after saving orders',res.data);
    })
   
}

// const {_id, productName,productImage,category,price,availableQuantity} = model || {}

// const handlePayment = async()=>{
//     if (!price || isNaN(Number(price))) {
//     alert("Invalid product price");
//     return;
//   }

//   if (!quantity || Number(quantity) < 1) {
//     alert("Invalid quantity");
//     return;
//   }

//   if (!user?.email) {
//     alert("Please login to continue payment");
//     return;
//   }

  //  const paymentInfo = {
  //     _id,
  //   productName,
  //   product_image: productImage,        
  //   category,
  //   price: Number(price),               
  //   orderQuantity: Number(quantity),    
  //   totalPrice: Number(totalPrice),
  //     availableQuantity:
  //     availableQuantity,
  //     customer:{
  //       name:user?.displayName,
  //       email:user?.email,
  //     }
  //  }
  //  console.log(price);
  //  try{
  //  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo);
  // console.log(data);
   

    // Redirect to Stripe
  //   window.location.href = data.url;
  //   console.log("Stripe session URL:", data.url);
  // } catch (err) {
  //   console.error("Checkout failed:", err.response?.data || err.message);
  //   alert("Unable to start checkout. Please try again.");
  // }
  // console.log("Payment info received:", paymentInfo);
    
return(
        <Container>
       <div>
            <section>
                <Navbar></Navbar>
            </section>
            <div>
             <h2 className='text-2xl font-bold text-amber-950'>Create new order </h2>
             <form onSubmit={handleSubmit(handleNewOrder)}
             
             className='mt-5 p-4 text-black' >
                
            <div>
                  <label className="label">
                    <input type="radio"
                      {...register('ProductType',{ required: "Product type is required" })}
                    value="document" className="radio" />
                    Document</label>
                    {errors?.ProductType && (
                   <p className="text-red-500">{errors.ProductType.message}</p>
                  )}
            </div>
               <div>
                  <label className="label">
                    <input type="radio"
                      {...register('ProductType',{ required: "Product type is required" })}
                    value="non-document" className="radio"  />
                    Non-Document</label>
                    
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email"{...register('email')} defaultValue={user?.email} className="input" placeholder="Email" />
          </fieldset>

           <fieldset className="fieldset">
          <label className="label">Product Name</label> 
          <input type="text"{...register('productName')} className="input" placeholder="Product Name" />
          </fieldset>

          
           
           <fieldset className="fieldset">
          <label className="label">First Name</label>
          <input type="text"{...register('firstName')} className="input" placeholder="First Name" />
          </fieldset>
          
           <fieldset className="fieldset">
          <label className="label">Last Name</label>
          <input type="text"{...register('lastName')} className="input" placeholder="Last Name" />
          </fieldset>
           
          



<label className="form-control w-full">
                    <span className="label-text text-gray-400 w-40">Payment Method</span>
                   <select
                  {...register("paymentMethod", { required: true })}
                   className="select select-bordered w-full"
                     >
                <option value="">Select Method</option>
                <option value="Bkash" className='flex'>
              
                  Bkash
                  </option>
                <option value="Nagad" className='flex'>
                 
                Nagad
                </option>
                <option value="COD" className='flex'>
                  
                Cash On Delivery
                </option>
               </select>
                </label>
        
<fieldset className="fieldset">
  <label className="label font-semibold">Order Quantity</label>

  <input
    type="number"
    className="input input-bordered w-full"
    defaultValue={model.minimumOrder}
    {...register("orderQuantity", {
      required: "Quantity is required",
      min: {
        value: model.minimumOrder,
        message: `Minimum order is ${model.minimumOrder}`
      },
      max: {
        value: model.availableQuantity,
        message: `Maximum available quantity is ${model.availableQuantity}`
      }
    })}
  />

  {errors.orderQuantity && (
    <p className="text-red-500 text-sm">
      {errors.orderQuantity.message}
    </p>
  )}
</fieldset>

<fieldset className="fieldset">
  <label className="label font-semibold">Order Price</label>

  <input
    type="text"
    readOnly
    className="input input-bordered w-full bg-gray-100"
    value={`${totalPrice} tk`}
  />
</fieldset>

 <fieldset className="fieldset">
  <label className="label">Contact Number</label> 
  <input type="number"{...register('contactNumber')} className="input" placeholder="Contact Number" />
  </fieldset>

   <fieldset className="fieldset">
  <label className="label">Delivery Address</label> 
  <input type="text"{...register('deliveryAddress')} className="input" placeholder="Delivery Address" />
  </fieldset>




            </div>

            <input type='submit'
            className="btn btn-primary text-black" value="Create Order" />
             
             </form>
            

            </div>
            <section>
                <Footer></Footer>
            </section>
        </div>
         </Container>
    );
};

export default NewOrder;