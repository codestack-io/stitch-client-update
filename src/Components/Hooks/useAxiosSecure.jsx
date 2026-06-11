import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UseAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          // Get fresh token
          const token = await user.getIdToken(true);
          config.headers.Authorization = `Bearer ${token}`;
          console.log('Token sent to backend:', token);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
   const resInterceptor = axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;

    if (statusCode === 401 || statusCode === 403) {
      console.log('Auth failed → logging out user');

      await logOut();
      navigate('/login', { replace: true });
    }

    return Promise.reject(error);
  }
);

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
