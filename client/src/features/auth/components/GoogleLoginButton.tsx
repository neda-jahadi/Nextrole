import { Button } from '@/components/ui/button/button';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const apiBaseUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

    window.location.href = `${apiBaseUrl}/api/auth/google`;
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outline"
      className="flex justify-center"
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
