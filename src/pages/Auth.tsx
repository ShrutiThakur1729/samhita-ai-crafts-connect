import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { IconBrandGoogle, IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import { z } from 'zod';

type AuthMode = 'login' | 'signup' | 'reset';

// Input validation schemas
const emailSchema = z.string().trim().email({ message: "Invalid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" }).max(100);

const Auth = () => {
  const [searchParams] = useSearchParams();
  const userType = (searchParams.get('type') as 'buyer' | 'seller') || 'buyer';
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const { signUp, signIn, signInWithGoogle, resetPassword, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      // Redirect based on user type
      const redirectPath = userType === 'seller' ? '/seller-onboarding' : '/marketplace';
      navigate(redirectPath);
    }
  }, [user, userType, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailError('');
    setPasswordError('');

    try {
      // Validate email
      const emailValidation = emailSchema.safeParse(email);
      if (!emailValidation.success) {
        setEmailError(emailValidation.error.errors[0].message);
        throw new Error(emailValidation.error.errors[0].message);
      }

      if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) throw error;
        toast({
          title: "Check your email",
          description: "Password reset link has been sent",
        });
        setMode('login');
      } else if (mode === 'signup') {
        // Validate password
        const passwordValidation = passwordSchema.safeParse(password);
        if (!passwordValidation.success) {
          setPasswordError(passwordValidation.error.errors[0].message);
          throw new Error(passwordValidation.error.errors[0].message);
        }

        if (password !== confirmPassword) {
          setPasswordError('Passwords do not match');
          throw new Error('Passwords do not match');
        }
        const { error } = await signUp(email, password, userType);
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Welcome to SAMHITA",
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-samhita-navy via-samhita-dark to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-samhita-navy mb-2">
            {mode === 'reset' ? t('resetPassword') : mode === 'signup' ? t('createAccount') : t('signInToContinue')}
          </h1>
          <p className="text-gray-600">
            {userType === 'seller' ? t('seller') : t('buyer')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('email')}</label>
            <div className="relative">
              <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className={`pl-10 ${emailError ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium mb-2">{t('password')}</label>
              <div className="relative">
                <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className={`pl-10 pr-10 ${passwordError ? 'border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium mb-2">{t('confirmPassword')}</label>
              <div className="relative">
                <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : mode === 'reset' ? t('resetPassword') : mode === 'signup' ? t('signup') : t('login')}
          </Button>
        </form>

        {mode !== 'reset' && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <IconBrandGoogle className="mr-2 h-5 w-5" />
              {t('continueWithGoogle')}
            </Button>
          </>
        )}

        <div className="mt-6 text-center space-y-2">
          {mode === 'login' && (
            <>
              <button
                type="button"
                onClick={() => setMode('reset')}
                className="text-sm text-samhita-gold hover:underline"
              >
                {t('forgotPassword')}
              </button>
              <div>
                <span className="text-sm text-gray-600">{t('dontHaveAccount')} </span>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-sm text-samhita-gold hover:underline font-medium"
                >
                  {t('signup')}
                </button>
              </div>
            </>
          )}
          {mode === 'signup' && (
            <div>
              <span className="text-sm text-gray-600">{t('alreadyHaveAccount')} </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-sm text-samhita-gold hover:underline font-medium"
              >
                {t('login')}
              </button>
            </div>
          )}
          {mode === 'reset' && (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-sm text-samhita-gold hover:underline"
            >
              {t('backToLogin')}
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Auth;
