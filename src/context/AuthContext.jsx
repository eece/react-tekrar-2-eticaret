import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser, removeUser] = useLocalStorage('auth_user', null);
    const [token, setToken, removeToken] = useLocalStorage('auth_token', null);
    
    // Login sonrası çalıştıracağımız metod
    const login = async(userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
    }

    // Logout sonrası çalıştıracağımız metod
    const logout = () => {
        removeUser();
        removeToken();
    }

    return <AuthContext.Provider value={{user, token, login, logout, isAuthenticated: Boolean(token)}}>
        {children}
    </AuthContext.Provider>
}

// useAuth hook'u ile context'e erişim sağlıyoruz
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
  return context;
}

export default AuthContext;