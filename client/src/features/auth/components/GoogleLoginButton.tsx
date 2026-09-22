import { Button } from '@/components/ui/button/button';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const apiBaseUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

    window.location.href = `${apiBaseUrl}/api/auth/google`;
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      variant="outline"
      className="flex items-center justify-center gap-3"
    >
      <FcGoogle className="size-5 shrink-0" aria-hidden="true" />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
