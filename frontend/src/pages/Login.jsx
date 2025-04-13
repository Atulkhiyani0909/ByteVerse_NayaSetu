
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { BACKEND_URL } from '../lib/config';
import { useAuth } from '../../hooks/auth-context';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signin`, formData);
      
      if (response.data) {
        login(response.data.AccessToken);
        toast.success('Login successful!');
        navigate('/'); 
      }

      console.log("Login Attempt");

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1A5F7A]">Login</h2>
              <p className="text-gray-600 mt-2">Access your NyayaSetu account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="Email" 
                  type="email" 
                  placeholder="your-email@example.com" 
                  required
                  value={formData.Email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="Password" 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  value={formData.Password}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 text-[#1A5F7A] rounded border-gray-300" 
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-600">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-[#1A5F7A] hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#1A5F7A] hover:bg-[#164B61] text-white"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#FF6B35] hover:underline">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
