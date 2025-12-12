import { createContext, useContext, useEffect, useState } from 'react';
import apiClient, { TOKEN_STORAGE_KEY } from 'api/apiClient';

// User típus – backend válasza alapján
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// alap context – csak default értékek
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => false,
  logout: async () => {},
});

// Ezt a Providert kell majd a teljes app köré tenni
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const isLoggedIn = !!user;

  // Ha van token (pl. oldalfrissítés után), próbáljuk betölteni a usert a /me-ből
  useEffect(() => {
    if (!token) return;

    apiClient
      .get<User>('/me')
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        // Ha érvénytelen a token, töröljük
        setUser(null);
        setToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      });
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiClient.post('/login', { email, password });

      const accessToken = res.data.access_token as string;
      const loggedInUser = res.data.user as User;

      // token elmentése
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      setToken(accessToken);
      setUser(loggedInUser);

      return true;
    } catch (error) {
      // pl. hibás email/jelszó
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/logout');
    } catch {
      // ha lejárt tokennel hívjuk, az se baj
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Ez az a hook, amit a Login2 használ: const { isLoggedIn } = useAuth();
export default function useAuth() {
  return useContext(AuthContext);
}
