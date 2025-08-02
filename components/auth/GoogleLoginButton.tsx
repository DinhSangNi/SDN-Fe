'use client';

import { Button } from '@/components/ui/button';
import { useGoogleAuth } from '@/hooks/auth/useGoogleAuth';
import { FcGoogle } from 'react-icons/fc';
import { cn } from '@/lib/utils';

interface GoogleLoginButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  fullWidth?: boolean;
  showIcon?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
}

export function GoogleLoginButton({
  className,
  variant = 'outline',
  size = 'default',
  fullWidth = false,
  showIcon = true,
  loadingText = 'Signing in...',
  children = 'Continue with Google',
}: GoogleLoginButtonProps) {
  const { handleGoogleLogin, isLoading } = useGoogleAuth();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(
        'flex items-center justify-center gap-2',
        fullWidth && 'w-full',
        className
      )}
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {showIcon && <FcGoogle size={20} />}
      {isLoading ? loadingText : children}
    </Button>
  );
}

// Example usage components
export function GoogleLoginButtonExamples() {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Google Login Button Examples</h2>
      
      {/* Default */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Default</h3>
        <GoogleLoginButton />
      </div>

      {/* Full Width */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Full Width</h3>
        <GoogleLoginButton fullWidth />
      </div>

      {/* Different Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Variants</h3>
        <div className="space-y-2">
          <GoogleLoginButton variant="default" />
          <GoogleLoginButton variant="secondary" />
          <GoogleLoginButton variant="outline" />
        </div>
      </div>

      {/* Different Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Sizes</h3>
        <div className="space-y-2">
          <GoogleLoginButton size="sm" />
          <GoogleLoginButton size="default" />
          <GoogleLoginButton size="lg" />
        </div>
      </div>

      {/* Custom Text */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Custom Text</h3>
        <GoogleLoginButton>Sign in with Google</GoogleLoginButton>
      </div>

      {/* Without Icon */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Without Icon</h3>
        <GoogleLoginButton showIcon={false}>Google Login</GoogleLoginButton>
      </div>

      {/* Custom Loading Text */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Custom Loading Text</h3>
        <GoogleLoginButton loadingText="Authenticating...">Login with Google</GoogleLoginButton>
      </div>
    </div>
  );
}
