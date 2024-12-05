import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/SupabaseAuthContext';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type LoginFormData = z.infer<typeof schema>;

interface LoginProps {
  isArabic: boolean;
}

const Login: React.FC<LoginProps> = ({ isArabic }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data.email);
      setShowSuccess(true);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <Mail className="mx-auto h-12 w-12 text-indigo-600" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {isArabic ? 'تحقق من بريدك الإلكتروني' : 'Check your email'}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {isArabic
                  ? 'لقد أرسلنا رابط تسجيل الدخول إلى بريدك الإلكتروني'
                  : 'We\'ve sent a login link to your email'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isArabic ? 'تسجيل الدخول' : 'Sign in to your account'}
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          {isArabic
            ? 'سنرسل لك رابط تسجيل الدخول عبر البريد الإلكتروني'
            : 'We\'ll send you a login link via email'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {isArabic ? 'البريد الإلكتروني' : 'Email address'}
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {isArabic ? 'يرجى إدخال بريد إلكتروني صحيح' : errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  isArabic ? 'إرسال رابط تسجيل الدخول' : 'Send login link'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isArabic ? 'ليس لديك حساب؟' : "Don't have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                {isArabic ? 'إنشاء حساب جديد' : 'Create new account'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;