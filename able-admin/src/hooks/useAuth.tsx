import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import apiClient, { TOKEN_STORAGE_KEY } from 'api/apiClient';

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  login: async () => false,
  logout: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [isLoading, setIsLoading] = useState(true);

  // Belépettnek azt tekintjük, akinek van tokenje.
  // A user betöltése ettől még tarthat egy pillanatig.
  const isLoggedIn = !!token;

  // Ha token változik, állítsuk be az Authorization headert az axioson
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common.Authorization;
    }
  }, [token]);

  // Oldalfrissítés után, ha van token -> kérjük le a usert
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      if (!token) {
        setIsLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await apiClient.get<User>('/me');
        if (!cancelled) setUser(res.data);
      } catch {
        // Token invalid -> takarítás
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        if (!cancelled) {
          setUser(null);
          setToken(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    setIsLoading(true);
    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiClient.post('/login', { email, password });

      const accessToken = res.data.access_token as string;
      const loggedInUser = res.data.user as User;

      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      setToken(accessToken);
      setUser(loggedInUser);

      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/logout');
    } catch {
      // nem gond, ha 401
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
      setToken(null);
    }
  };

  const value = useMemo(
    () => ({ isLoggedIn, isLoading, user, login, logout }),
    [isLoggedIn, isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
