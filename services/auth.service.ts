import api from '@/lib/axiosInstance';

export const login = async (loginFormData: {
  email: string;
  password: string;
}) => {
  const res = await api.post(`/auth/login`, loginFormData);
  return res;
};

export const register = async (registerFormData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const res = await api.post(`/auth/register`, registerFormData);
  return res;
};

export const logout = async () => {
  const res = await api.post(`/auth/logout`);
  return res;
};

export const refreshToken = async () => {
  const res = await api.post(`/auth/refresh`);
  return res;
};

// Google Authentication Service
export class GoogleAuthService {
  private static readonly API_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL || 'http://localhost:8080';

  /**
   * Initiates Google OAuth login by opening a popup window
   * @returns Promise that resolves when authentication is complete
   */
  static initiateGoogleAuth(): Promise<{ accessToken: string; user: any }> {
    return new Promise((resolve, reject) => {
      const googleAuthUrl = `${this.API_URL}/auth/google`;

      // Open popup window for Google OAuth
      const popup = window.open(
        googleAuthUrl,
        'google-auth',
        'width=500,height=600,scrollbars=yes,resizable=yes,top=100,left=100'
      );

      if (!popup) {
        reject(new Error('Popup blocked! Please allow popups for this site.'));
        return;
      }

      // Listen for messages from the popup
      const messageListener = (event: MessageEvent) => {
        console.log("Event mess", event);
        // Verify origin for security
        if (event.origin !== this.API_URL) {
          return;
        }

        if (event.data && event.data.accessToken && event.data.user) {
          // Clean up
          window.removeEventListener('message', messageListener);
          popup.close();

          // Resolve with the authentication data
          resolve({
            accessToken: event.data.accessToken,
            user: event.data.user._doc
          });
        } else if (event.data && event.data.error) {
          // Handle error
          window.removeEventListener('message', messageListener);
          popup.close();
          reject(new Error(event.data.error));
        }
      };

      // Add message listener
      window.addEventListener('message', messageListener);

      // Handle popup closed manually
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          reject(new Error('Authentication cancelled by user'));
        }
      }, 1000);
    });
  }
}

export const loginWithGoogle = GoogleAuthService.initiateGoogleAuth;
