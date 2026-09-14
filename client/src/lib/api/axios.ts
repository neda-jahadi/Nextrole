import axios from 'axios';

export const api = axios.create({
  // In production, use the frontend origin. Vercel rewrites /api/* to the
  // Express deployment so auth cookies stay first-party in the browser.
  // Local development still points directly to the local Express server.
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_API_URL : undefined,
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
});
