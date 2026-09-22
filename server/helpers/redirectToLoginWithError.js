export const redirectToLoginWithError = (res, errorCode) => {
  const clientUrl = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

  return res.redirect(
    `${clientUrl}/login?error=${encodeURIComponent(errorCode)}`,
  );
};
