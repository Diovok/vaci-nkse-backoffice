import { createContext, useEffect, useState } from "react";
import apiClient, { TOKEN_STORAGE_KEY } from "../api/apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_STORAGE_KEY)
  );

  useEffect(() => {
    if (token) {
      apiClient
        .get("/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          setToken(null);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        });
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await apiClient.post("/login", { email, password });

      const accessToken = res.data.access_token;
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      setToken(accessToken);
      setUser(res.data.user);

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    apiClient.post("/logout").finally(() => {
      setUser(null);
      setToken(null);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
