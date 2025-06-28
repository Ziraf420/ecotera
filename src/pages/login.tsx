// src/screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../interfaces/navigation.types';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import components
import Button from '../components/Button';
import Input from '../components/Input';
import CustomAlert from '../components/CustomAlert';

// Import styles
import loginStyles from '../style/pages/login.styles';

// Import hooks
import { useAuth } from '../hooks/useAuth';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { login, authState, clearError, clearMessage } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
  const [formSubmitted, setFormSubmitted] = useState(false); // Track jika form sudah di-submit
  
  // Alert state
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  });
  
  // Reset error & message saat komponen unmount
  useEffect(() => {
    return () => {
      clearError();
      clearMessage();
    };
  }, [clearError, clearMessage]);

  // Jika sudah login, pindahkan ke Home
  useEffect(() => {
    if (authState.isLoggedIn && authState.user) {
      navigation.navigate('Home');
    }
  }, [authState.isLoggedIn, authState.user, navigation]);
  
  // Tampilkan error dari API sebagai alert
  useEffect(() => {
    if (authState.error) {
      setAlertConfig({
        title: 'Error',
        message: authState.error,
        type: 'error'
      });
      setAlertVisible(true);
    } else if (authState.message) {
      setAlertConfig({
        title: 'Sukses',
        message: authState.message,
        type: 'success'
      });
      setAlertVisible(true);
    }
  }, [authState.error, authState.message]);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async () => {
    setFormSubmitted(true); // Set flag bahwa form sudah di-submit
    
    // Validasi dasar
    if (!email || !password) {
      // Validasi lokal, jadi tidak perlu menggunakan authState.error
      setAlertConfig({
        title: 'Perhatian',
        message: 'Email dan password harus diisi',
        type: 'warning'
      });
      setAlertVisible(true);
      return;
    }
    
    const success = await login({ email, password, rememberMe });
    if (success) {
      setAlertConfig({
        title: 'Login Berhasil',
        message: 'Selamat datang di Ecoterra!',
        type: 'success'
      });
      setAlertVisible(true);
      // Redirect akan dilakukan oleh useEffect yang memonitor authState.isLoggedIn
    }
  };
  
  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  // Hanya tampilkan error jika form sudah di-submit dan field kosong
  const getEmailError = () => {
    if (formSubmitted && !email) {
      return 'Email harus diisi';
    }
    return undefined;
  };

  const getPasswordError = () => {
    if (formSubmitted && !password) {
      return 'Password harus diisi';
    }
    return undefined;
  };

  return (
    <View style={loginStyles.container}>
      <Image source={require('../assets/logo.png')} style={loginStyles.logo} />
      <Text style={loginStyles.title}>ECOTERRA</Text>
      <Text style={loginStyles.subtitle}>SIGN IN</Text>
      
      <Text style={loginStyles.welcomeText}>
        Masuk Sekarang dan Mulai Perubahan!
      </Text>
      
      <Input
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        error={getEmailError()}
      />
      
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword} // Toggle berdasarkan state
        error={getPasswordError()}
        rightIcon={
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon 
              name={showPassword ? 'visibility-off' : 'visibility'} 
              size={16} 
              color="#4CAF50" 
            />
          </TouchableOpacity>
        }
      />
      
      <TouchableOpacity 
        onPress={() => setRememberMe(!rememberMe)}
        style={{ alignSelf: 'flex-start', marginLeft: '7.5%', marginBottom: 15 }}
      >
        <Text style={loginStyles.rememberText}>
          {rememberMe ? '☑ ' : '☐ '} Remember Me
        </Text>
      </TouchableOpacity>
      
      <Button 
        title="SIGN IN" 
        onPress={handleLogin}
        loading={authState.isLoading}
      />
      
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={loginStyles.footerContainer}
      >
        <Text style={loginStyles.footerText}>
          Discover the Ecosystem with Ecoterra -{' '}
          <Text style={loginStyles.signUpText}>Sign Up Now!</Text>
        </Text>
      </TouchableOpacity>
      
      {/* Custom Alert */}
      <CustomAlert 
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={handleAlertClose}
        onConfirm={handleAlertClose}
      />
    </View>
  );
};

export default LoginScreen;
