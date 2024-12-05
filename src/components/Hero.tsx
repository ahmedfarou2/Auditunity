import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSpreadsheet, Users } from 'lucide-react';
import { useAuth } from '../contexts/SupabaseAuthContext';
import { useAppearanceStore } from '../stores/appearanceStore';

interface HeroProps {
  isArabic: boolean;
}

const Hero: React.FC<HeroProps> = ({ isArabic }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isVerticalLayout } = useAppearanceStore();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text Content */}
        <div className="text-center py-12 lg:py-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">
              {isArabic ? 'منصة متكاملة' : 'Complete Platform for'}
            </span>{' '}
            <span className="block text-indigo-600 dark:text-indigo-400">
              {isArabic ? 'للمراجعة المالية' : 'Financial Auditing'}
            </span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
            {isArabic
              ? 'منصة متخصصة تربط بين مكاتب المراجعة والشركات لإعداد وتبادل القوائم المالية والتقارير بكفاءة عالية'
              : 'Specialized platform connecting audit firms with companies for efficient financial statement preparation and report exchange'}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              {isArabic ? 'ابدأ الآن' : 'Get Started'}
            </button>
            <button
              onClick={() => navigate('/about')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-400 dark:bg-indigo-900/50 dark:hover:bg-indigo-900 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              {isArabic ? 'تعرف أكثر' : 'Learn More'}
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative mx-auto max-w-5xl aspect-[16/9] mt-8 lg:mt-12">
          <img
            className="w-full h-full object-cover rounded-xl shadow-2xl"
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
            alt="Financial statements and analysis"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;