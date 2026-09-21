import { Button } from '@/components/ui/button/button';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
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
