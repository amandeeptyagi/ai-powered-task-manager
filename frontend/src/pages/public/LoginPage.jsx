import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Mail, Lock } from 'lucide-react';
import { login } from '@/services/authApi';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(formData);
      setUser(res.data.user);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-tl-none rounded-tr-[42px] rounded-bl-[42px] rounded-br-none">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-lime-700/10 rounded-full">
              <LogIn className="h-8 w-8 text-lime-700" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-lime-700">Welcome Back</CardTitle>
          <CardDescription className="text-lime-700">Login to manage your tasks efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-lime-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-lime-700" />
                <Input
                  type="email"
                  placeholder="amit@gmail.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-lime-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-lime-700" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <Button type="submit" className="w-full text-white bg-lime-700 hover:cursor-pointer" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-lime-700">Don’t have an account? </span>
            <Link to="/register-user" className="font-medium hover:underline text-lime-700">Register here</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
