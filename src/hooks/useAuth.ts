import { useState, useEffect, useCallback } from 'react';
import { 
  loginUser, 
  logoutUser, 
  checkAuthStatus,
  registerUser,
  AuthResponse, 
  LoginRequest,
  RegisterRequest,
  TOKEN_KEY
} from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: AuthResponse['user'] | null;
  message: string | null;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true, // Default loading untuk cek status autentikasi
    isLoggedIn: false,
    user: null,
    message: null,
    error: null,
  });

  // Cek status autentikasi saat hook dimuat
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Cek token dari AsyncStorage
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) {
          // Jika token ada, ambil data user dari AsyncStorage
          const userData = await AsyncStorage.getItem('userData');
          const user = userData ? JSON.parse(userData) : null;
          
          setAuthState({
            isLoading: false,
            isLoggedIn: true,
            user: user,
            message: null,
            error: null,
          });
        } else {
          setAuthState({
            isLoading: false,
            isLoggedIn: false,
            user: null,
            message: null,
            error: null,
          });
        }
      } catch (err) {
        const errorMessage = typeof err === 'object' && err !== null && 'message' in err 
          ? String(err.message) 
          : 'Gagal memuat status autentikasi';
          
        setAuthState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
          message: null,
          error: errorMessage,
        });
      }
    };

    initAuth();
  }, []);

  // Login handler
  const login = useCallback(async (data: LoginRequest) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await loginUser(data);
      
      setAuthState({
        isLoading: false,
        isLoggedIn: true,
        user: response.user,
        message: response.message,
        error: null,
      });
      
      return true;
    } catch (err) {
      const errorMessage = typeof err === 'object' && err !== null && 'message' in err 
        ? String(err.message) 
        : 'Terjadi kesalahan saat login';
        
      setAuthState(prev => ({ 
        ...prev,
        isLoading: false,
        message: null, 
        error: errorMessage,
      }));
      
      return false;
    }
  }, []);

  // Register handler
  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await registerUser(data);
      
      setAuthState({
        isLoading: false,
        isLoggedIn: true,
        user: response.user,
        message: response.message,
        error: null,
      });
      
      return true;
    } catch (err) {
      const errorMessage = typeof err === 'object' && err !== null && 'message' in err 
        ? String(err.message) 
        : 'Terjadi kesalahan saat registrasi';
        
      setAuthState(prev => ({ 
        ...prev,
        isLoading: false,
        message: null, 
        error: errorMessage,
      }));
      
      return false;
    }
  }, []);

  // Logout handler
  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      await logoutUser();
      
      setAuthState({
        isLoading: false,
        isLoggedIn: false,
        user: null,
        message: "Logout berhasil",
        error: null,
      });
      
      return true;
    } catch (err) {
      const errorMessage = typeof err === 'object' && err !== null && 'message' in err 
        ? String(err.message) 
        : 'Terjadi kesalahan saat logout';
        
      setAuthState(prev => ({ 
        ...prev,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        message: null,
        error: errorMessage,
      }));
      
      return false;
    }
  }, []);

  // Handler untuk reset error message
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // Handler untuk reset success message
  const clearMessage = useCallback(() => {
    setAuthState(prev => ({ ...prev, message: null }));
  }, []);

  return {
    login,
    register,
    logout,
    clearError,
    clearMessage,
    authState,
  };
}; 