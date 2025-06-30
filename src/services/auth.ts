import axios, { InternalAxiosRequestConfig } from 'axios';

// Definisikan base URL API
const API_URL = 'http://192.168.0.100:3000'; // Ganti dengan URL API sebenarnya

// Interface untuk request dan response
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
  category: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    username: string;
    category: string;
    token: string;
  };
}

// Untuk React Native, kita perlu menggunakan AsyncStorage bukan localStorage
// Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = 'ecoterraToken';

// Simpan token di AsyncStorage
const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Ambil token dari AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Hapus token dari AsyncStorage
const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Setup axios instance dengan interceptor untuk auth
const apiClient = axios.create({
  baseURL: API_URL,
});

// Tambahkan token ke header setiap request jika tersedia
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// Login user
export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    // Menggunakan FormData untuk login karena backend login mengharapkan ini
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.rememberMe !== undefined) {
      formData.append('rememberMe', String(data.rememberMe));
    }
    
    console.log('Sending login data:', { 
      email: data.email,
      rememberMe: data.rememberMe
    });
    
    const response = await apiClient.post('/api/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    // Simpan token dari respons
    await storeToken(response.data.user.token);
    
    // Simpan data user lengkap
    await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    
    return response.data;
    
  } catch (err: unknown) {
    // Handle error dan tampilkan pesan yang lebih user-friendly
    if (axios.isAxiosError(err)) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Terjadi kesalahan saat login';
      throw new Error(errorMsg);
    }
    throw new Error('Terjadi kesalahan saat login');
  }
};

// Register user
export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  try {
    // Menggunakan JSON untuk mengirim data registrasi (sudah berfungsi)
    const payload = {
      fullname: data.fullName, // Menggunakan lowercase 'fullname' sesuai dengan kolom di database
      username: data.username,
      email: data.email,
      password: data.password,
      category: data.category
    };
    
    console.log('Sending registration data:', { 
      fullname: data.fullName,
      username: data.username,
      email: data.email,
      category: data.category
    });
    
    const response = await apiClient.post('/api/regis', payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // Tidak perlu menyimpan token atau data user setelah registrasi
    // Pengguna akan login setelah registrasi
    
    return response.data;
    
  } catch (err: unknown) {
    // Handle error dan tampilkan pesan yang lebih user-friendly
    if (axios.isAxiosError(err)) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Terjadi kesalahan saat registrasi';
      throw new Error(errorMsg);
    }
    throw new Error('Terjadi kesalahan saat registrasi');
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    // Menggunakan API call dengan axios
    const token = await getToken();
    if (token) {
      // Gunakan JSON untuk mengirim token
      await apiClient.post('/api/logout', { token }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
    
    // Hapus token dan data user dari AsyncStorage
    await removeToken();
    await AsyncStorage.removeItem('userData');
  } catch (err: unknown) {
    // Handle error
    console.error('Error during logout:', err);
    // Tetap hapus token dan data user meski terjadi error
    await removeToken();
    await AsyncStorage.removeItem('userData');
    throw new Error('Terjadi kesalahan saat logout');
  }
};

// Cek status autentikasi user
export const checkAuthStatus = async (): Promise<AuthResponse | null> => {
  try {
    const token = await getToken();
    if (!token) return null;
    
    // Coba menggunakan endpoint /api/user daripada /api/me karena /api/me mengembalikan 404
    const response = await apiClient.get('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
    
  } catch (err: unknown) {
    console.error('Error checking auth status:', err);
    // Token tidak valid, logout user
    await removeToken();
    return null;
  }
};
