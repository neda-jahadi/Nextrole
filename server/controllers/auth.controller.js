import { prisma } from '../configs/prisma.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import crypto from 'crypto';
import { googleOAuthClient } from '../utils/googleOAuth.js';
import { redirectToLoginWithError } from '../helpers/redirectToLoginWithError.js';

// https://www.webfx.com/web-development/glossary/http-status-codes/

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Hash password : npm i bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    // Generate JWT Token
    generateToken(user.id, res);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Register user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to register user',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { company: true },
    });

    if (!user || !user.password) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT Token
    generateToken(user.id, res);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        company: user.company ? { status: user.company.status } : null,
      },
    });
  } catch (error) {
    console.error('User login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to login',
    });
  }
};

export const logoutUser = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('jwt', '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        company: user.company
          ? {
              name: user.company.name,
              description: user.company.description,
              contactEmail: user.company.contactEmail,
              contactPhone: user.company.contactPhone,
              status: user.company.status,
              region: user.company.region.name,
              municipality: user.company.municipality.name,
            }
          : null,
      },
    });
  } catch (error) {
    console.error('getMe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    });
  }
};

export const startGoogleOAuth = async (req, res) => {
  // Temporary production diagnostic. Never log OAuth credential values.
  console.log('Google OAuth config:', {
    hasClientId: Boolean(process.env.GOOGLE_CLIENT_ID),
    hasClientSecret: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    clientIdLength: process.env.GOOGLE_CLIENT_ID?.length,
    clientSecretLength: process.env.GOOGLE_CLIENT_SECRET?.length,
    clientSecretFingerprint: process.env.GOOGLE_CLIENT_SECRET
      ? crypto
          .createHash('sha256')
          .update(process.env.GOOGLE_CLIENT_SECRET)
          .digest('hex')
          .slice(0, 12)
      : undefined,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  });

  const state = crypto.randomBytes(32).toString('hex');

  res.cookie('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 10 * 60 * 1000,
  });

  const authorizationUrl = googleOAuthClient.generateAuthUrl({
    scope: ['openid', 'email', 'profile'],
    state,
  });
  res.redirect(authorizationUrl);
};

export const googleOAuthCallback = async (req, res) => {
  try {
    const { code, state, error } = req.query;
    const savedState = req.cookies.oauth_state;

    // Google login was cancelled or failed
    if (error) {
      res.clearCookie('oauth_state');

      return redirectToLoginWithError(res, 'google_auth_cancelled');
    }

    // Validate authorization code
    if (!code) {
      return redirectToLoginWithError(res, 'google_auth_failed');
    }

    // Validate OAuth state
    if (!state || !savedState || state !== savedState) {
      res.clearCookie('oauth_state');

      return redirectToLoginWithError(res, 'google_auth_failed');
    }

    // State has been successfully validated and is no longer needed
    res.clearCookie('oauth_state');

    // Exchange authorization code for Google tokens
    const { tokens } = await googleOAuthClient.getToken(code);

    if (!tokens.id_token) {
      return redirectToLoginWithError(res, 'google_auth_failed');
    }

    // Verify Google's ID token
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Require a valid Google identity with a verified email
    if (!payload?.sub || !payload?.email || !payload.email_verified) {
      return redirectToLoginWithError(res, 'google_auth_failed');
    }

    // Google is authoritative for Gmail addresses and
    // Google Workspace identities represented by the hd claim.
    const isGmail = payload.email.endsWith('@gmail.com');
    const isGoogleWorkspace = Boolean(payload.hd);

    const googleIsAuthoritativeForEmail = isGmail || isGoogleWorkspace;

    // Find an existing Google identity
    const authAccount = await prisma.authAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'GOOGLE',
          providerAccountId: payload.sub,
        },
      },
    });

    let user;

    if (authAccount) {
      // Returning Google user
      user = await prisma.user.findUnique({
        where: {
          id: authAccount.userId,
        },
      });
    } else {
      // No Google AuthAccount yet.
      // Check whether a NextRole user already uses this email.
      const existingUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (existingUser) {
        // Don't automatically attach a Google identity to an
        // existing account unless Google is authoritative for the email.
        if (!googleIsAuthoritativeForEmail) {
          return redirectToLoginWithError(res, 'account_link_required');
        }

        await prisma.authAccount.create({
          data: {
            provider: 'GOOGLE',
            providerAccountId: payload.sub,
            userId: existingUser.id,
          },
        });

        user = existingUser;
      } else {
        // Completely new Google user.
        // Create User + AuthAccount atomically.
        user = await prisma.$transaction(async (tx) => {
          const newUser = await tx.user.create({
            data: {
              name: payload.name || payload.email,
              email: payload.email,
              password: null,
            },
          });

          await tx.authAccount.create({
            data: {
              provider: 'GOOGLE',
              providerAccountId: payload.sub,
              userId: newUser.id,
            },
          });

          return newUser;
        });
      }
    }

    // Create NextRole's own authenticated session
    generateToken(user.id, res);

    // Return the browser to the React application
    return res.redirect(process.env.CLIENT_ORIGIN || 'http://localhost:5173');
  } catch (error) {
    console.error('Google OAuth callback error:', error);

    res.clearCookie('oauth_state');

    return redirectToLoginWithError(res, 'google_auth_failed');
  }
};
