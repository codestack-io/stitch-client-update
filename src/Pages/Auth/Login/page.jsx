import React from 'react';
import image from '../../../assets/login object.jpg';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Components/Hooks/useAuth';
import { Link, Navigate, useLocation } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const {
    signInUser,
    resetPassword,
    user
  } = UseAuth() || {};

  const location = useLocation();
  const email = watch('email');

  const from = location.state || '/';

  // redirect if already logged in
  if (user) return <Navigate to={from} replace={true} />;

  // normal login
  const handleLogin = (data) => {
    console.log('form data', data);

    signInUser(data.email, data.password)
      .then(result => {
        console.log('Login success:', result);
      })
      .catch(error => {
        console.log('Login error:', error);
      });
  };

  // demo login (NEW FEATURE)
  const demoLogin = () => {
    signInUser("demo@gmail.com", "123456")
      .then(result => {
        console.log('Demo login success:', result);
      })
      .catch(error => {
        console.log('Demo login error:', error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">

        {/* LEFT SIDE */}
        <div className="text-center lg:text-left">
          <h3 className="text-5xl font-bold text-amber-400">Welcome!</h3>
          <p className="text-5xl font-bold text-amber-800">Please Login!</p>
          <img src={image} className='h-100 w-140' alt="login" />
        </div>

        {/* FORM CARD */}
        <div className="card h-110 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

          <form className="card-body" onSubmit={handleSubmit(handleLogin)}>

            <fieldset className="fieldset">

              {/* EMAIL */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === 'required' && (
                <p className='text-amber-500'>Email is required.</p>
              )}

              {/* PASSWORD */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/
                })}
                className="input"
                placeholder="Password"
              />

              {errors.password?.type === 'required' && (
                <p className='text-amber-500'>Password is required</p>
              )}

              {errors.password?.type === 'minLength' && (
                <p className='text-amber-500'>
                  Password must be 6 characters or longer
                </p>
              )}

              {errors.password?.type === 'pattern' && (
                <p className='text-amber-500'>
                  Password must contain letters and numbers
                </p>
              )}

              {/* FORGOT PASSWORD */}
              <p
                className="link link-hover text-blue-600 mt-2"
                onClick={() => {
                  if (!email) {
                    alert('Please enter your email first');
                    return;
                  }

                  resetPassword(email)
                    .then(() => alert('Password reset email sent'))
                    .catch(err => alert(err.message));
                }}
              >
                Forgot password?
              </p>

              {/* LOGIN BUTTON */}
              <button className="btn btn-neutral bg-lime-900 mt-4">
                Login
              </button>

              {/* DEMO LOGIN BUTTON (NEW) */}
              <button
                type="button"
                onClick={demoLogin}
                className="btn btn-warning mt-2"
              >
                Demo Login
              </button>

              {/* REGISTER LINK */}
              <p>
                If you are a newcomer please feel free to{' '}
                <Link className='text-amber-800 underline' to='/register'>
                  register
                </Link>
              </p>

            </fieldset>
          </form>

          <SocialLogin />

        </div>
      </div>
    </div>
  );
};

export default Login;