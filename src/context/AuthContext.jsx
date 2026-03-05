import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { jwtAuth } from "../utils/jwtAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check JWT token first
    const storedToken = jwtAuth.getToken();
    const storedUser = jwtAuth.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setLoading(false);
      return;
    }

    // Fallback to Supabase auth
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    jwtAuth.clearToken();
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
