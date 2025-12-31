import React from 'react';
import image from '../../../assets/Register.jpg'
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Components/Hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {

    const{register,handleSubmit, formState:{errors}} = useForm();
    const{registerUser} = UseAuth()

    const handleRegistration = (data)=>{
        console.log('after register',data)
        registerUser(data.email,data.password)
        .then(result => {
          console.log(result.user)
        })
        .catch(error=>{
          console.log(error)
        })

    }
    return (
       <div>
        <form onSubmit={handleSubmit(handleRegistration)}>
           <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold text-amber-400">Please Register!</h1>
                <img src={image} className='h-100 w-140'/>
              </div>
              <div className="card  h-100 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                  <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email"{...register('email',{required:true})} className="input" placeholder="Email" />
                   
                    {errors.email?.type==='required'&&<p className='text-amber-500'>Email is required.</p>}
                    <label className="label">Password</label>
                    <input type="password" {...register('password',{required:true, minlength:6,pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/})} className="input" placeholder="Password" />
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
                    <button className="btn btn-neutral bg-lime-900 mt-4">Register</button>
                    <p>Registered before ? then <Link className='text-amber-800 underline' to='/login'> login </Link> </p>
                  </fieldset>
                  <SocialLogin></SocialLogin>
                </div>
              </div>
            </div>
          </div>   
        </form>
       </div>
    
        
    );
};

export default Register;