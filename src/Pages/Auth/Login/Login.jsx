import React from 'react';
import image from '../../../assets/login object.jpg'
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Components/Hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
const Login = () => {
  const {register,handleSubmit, formState:{errors}} = useForm();
  const{signInUser} = UseAuth();

  const handleLogin =(data)=>{
    console.log('form data',data);
    signInUser(data.email,data.password)
    .then(result =>{
      console.log(result)
    })
    .catch(error =>{
      console.log(error)
    })

  }
    return (
       
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h3 className="text-5xl font-bold text-amber-400">Welcome!</h3>
      <p className="text-5xl font-bold text-amber-800">Please Login!</p>
      <img src={image} className='h-100 w-140'/>
    </div>
    <div className="card  h-110 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email', {required:true})} className="input" placeholder="Email" />
           {errors.email?.type==='required'&&<p className='text-amber-500'>Email is required.</p>}
          <label className="label">Password</label>
          <input type="password" {...register('password')} className="input" placeholder="Password" />
                    {
                      errors.password?.type ==='required' && <p className='text-amber-500'>Password is required</p>
                    }
                    {
                      errors.password?.type === 'minLength'
                      && <p className='text-amber-500'>Password must be 6 characters or longer</p>
                    }
                    {
                      errors.password?.type ==='pattern' &&  <p className='text-amber-500'>Password must have at least one upper case or lower case </p>
                    }
          
          
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral bg-lime-900 mt-4">Login</button>
          <p>If you are a newcomer please, feel free to <Link className='text-amber-800 underline' to='/register'> register</Link> </p>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  </div>
</div>
    );
};

export default Login;