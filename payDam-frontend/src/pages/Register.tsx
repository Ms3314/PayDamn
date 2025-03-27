import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { z } from 'zod';

// Zod schema for registration validation
const RegistrationSchema = z.object({
  fullname: z.string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name must not exceed 50 characters" }),
  
  email: z.string()
    .email({ message: "Invalid email address" }),
  
  phoneNumber: z.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 
      { message: "Invalid phone number" }),
  
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      { message: "Password must include uppercase, lowercase, number, and special character" })
});

// Infer the type from the Zod schema
type RegistrationData = z.infer<typeof RegistrationSchema>;

const RegisterPage: React.FC = () => {
  // Form data state
  const [formData, setFormData] = useState<RegistrationData>({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  // Validation error state
  const [validationErrors, setValidationErrors] = useState<{
    fullname?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }>({});

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
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
    setSuccess(false);
    setValidationErrors({});

    try {
      // Validate input using Zod
      const result = RegistrationSchema.safeParse(formData);

      if (!result.success) {
        // Handle validation errors
        const errors = result.error.flatten().fieldErrors;
        setValidationErrors({
          fullname: errors.fullname?.[0],
          email: errors.email?.[0],
          phoneNumber: errors.phoneNumber?.[0],
          password: errors.password?.[0]
        });
        setIsLoading(false);
        return;
      }

      // If validation passes, proceed with registration
      const response = await axios.post('/api/register', formData);
      
      // Handle successful registration
      console.log('Registration successful', response.data);
      setSuccess(true);
      // Clear form
      setFormData({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: ''
      });
    } catch (err) {
      // Handle registration error
      console.error('Registration failed', err);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-md p-8 space-y-4"
        >
          <h2 className="text-white text-2xl font-bold mb-6">Register</h2>
          
          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-500 text-white p-2 rounded mb-4">
              Registration Successful!
            </div>
          )}
          
          <div>
            <input
              type="text"
              name="fullname"
              placeholder="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full p-2 bg-transparent border ${
                validationErrors.fullname 
                  ? 'border-red-500' 
                  : 'border-gray-600'
              } text-white placeholder-gray-500 focus:outline-none focus:border-white`}
              required
            />
            {validationErrors.fullname && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.fullname}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 bg-transparent border ${
                validationErrors.email 
                  ? 'border-red-500' 
                  : 'border-gray-600'
              } text-white placeholder-gray-500 focus:outline-none focus:border-white`}
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full p-2 bg-transparent border ${
                validationErrors.phoneNumber 
                  ? 'border-red-500' 
                  : 'border-gray-600'
              } text-white placeholder-gray-500 focus:outline-none focus:border-white`}
              required
            />
            {validationErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.phoneNumber}
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
            disabled={isLoading}
            className="w-full p-2 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          
          <Link to="/login" className='text-slate-300 text-lg'>
            Already have an account? Login
          </Link>
        </form>

      </div>
      <div className="w-1/2 bg-zinc-900 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold">PayDam</h1>
        <p className='text-slate-300 text-lg'>A Transactions Web App</p>
      </div>
    </div>
  );
};

export default RegisterPage;