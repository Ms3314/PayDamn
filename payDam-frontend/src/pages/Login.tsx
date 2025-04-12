import React, { useState } from 'react';
import { z } from 'zod';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import axiosInstance from '../helpers/axiosInstance';
import { useStore } from '../Zustand/store';

// Zod schema for login input
const LoginSchema = z.object({
  identifier: z.string().refine(value => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone number validation (allows various international formats)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    return emailRegex.test(value) || phoneRegex.test(value);
  }, {
    message: "Must be a valid email or phone number"
  }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

// Infer the type from the Zod schema

const LoginPage: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  
  // State for validation errors
  const [validationErrors, setValidationErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});

  

  // Loading and general error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Move useStore call here
  const setToken = useStore((state) => state.setToken);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific field error when typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      // Validate input using Zod
      const result = LoginSchema.safeParse(formData);

      if (!result.success) {
        // Handle validation errors
        const errors = result.error.flatten().fieldErrors;
        setValidationErrors({
          identifier: errors.identifier?.[0],
          password: errors.password?.[0]
        });
        setIsLoading(false);
        return;
      }
      console.log(formData , "this is the form datas")
      // If validation passes, proceed with login
      const response = await axiosInstance.post('/api/v1/auth/login', formData);
      if (response.status != 200) {
        setIsLoading(false);
        setError('Login failed. Please check your credentials.');
        return;
      }
      // Handle successful login
      console.log('Login successful', response.data);
      // Add logic for successful login (e.g., store token, redirect)

      setToken(response.data.accesstoken);
      // Clear form
      setFormData({
        identifier: '',
        password: ''
      });
    } catch (err) {
      // Handle login error
      console.error('Login failed', err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-md p-8 space-y-4"
        >
          <h2 className="text-white text-2xl font-bold mb-6">Login</h2>
          
          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {error}
            </div>
          )}
          
          <div>
            <input
              type="text"
              name="identifier"
              placeholder="email or phone number"
              value={formData.identifier}
              onChange={handleChange}
              className={`w-full p-2 bg-transparent border ${
                validationErrors.identifier 
                  ? 'border-red-500' 
                  : 'border-gray-600'
              } text-white placeholder-gray-500 focus:outline-none focus:border-white`}
              required
            />
            {validationErrors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.identifier}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 bg-transparent border ${
                validationErrors.password 
                  ? 'border-red-500' 
                  : 'border-gray-600'
              } text-white placeholder-gray-500 focus:outline-none focus:border-white`}
              required
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full p-2 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <Link to="/register" className='text-slate-300 text-md'>New to PayDam ? Register</Link>
        </form>
      </div>
      <div className="w-1/2 hidden  bg-zinc-900 lg:flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl font-bold">PayDam</h1>
        <p className='text-slate-300 text-lg'>A Transactions Web App </p>
      </div>
    </div>
  );
};

export default LoginPage;
