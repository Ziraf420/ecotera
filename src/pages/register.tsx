import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../interfaces/navigation.types';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import components
import Input from '../components/Input';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import CustomAlert from '../components/CustomAlert';

// Import styles
import registerStyles from '../style/pages/register.styles';

// Import hooks
import { useAuth } from '../hooks/useAuth';

interface Category {
  label: string;
  value: string;
}

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { register, authState, clearError, clearMessage } = useAuth();

  // Form state
  const [fullName, setFullName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // Track jika form sudah di-submit
  
  // Alert state
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info'
  });
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Reset API error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
      clearMessage();
    };
  }, [clearError, clearMessage]);

  // Category options
  const categories: Category[] = [
    { label: 'Guru', value: 'guru' },
    { label: 'Murid', value: 'murid' },
    { label: 'Masyarakat', value: 'masyarakat' },
  ];

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category.value);
    if (formSubmitted) {
      // Hanya hapus error jika form sudah pernah di-submit
      if (formErrors.category) {
        setFormErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.category;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!fullName) newErrors.fullName = 'Nama lengkap harus diisi';
    if (!username) newErrors.username = 'Username harus diisi';
    
    if (!email) {
      newErrors.email = 'Email harus diisi';
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Format email tidak valid';
      }
    }
    
    if (!password) {
      newErrors.password = 'Password harus diisi';
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    if (!selectedCategory) newErrors.category = 'Kategori harus dipilih';
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    setFormSubmitted(true); // Set flag bahwa form sudah di-submit
    if (validateForm()) {
      // Panggil fungsi register dari useAuth
      const success = await register({
        fullName,
        username,
        email,
        password,
        category: selectedCategory as string
      });

      if (success) {
        setAlertConfig({
          title: 'Registrasi Berhasil',
          message: 'Akun berhasil dibuat! Silakan login dengan akun Anda.',
          type: 'success'
        });
        setAlertVisible(true);
      }
    }
  };
  
  const handleAlertClose = () => {
    setAlertVisible(false);
    if (alertConfig.type === 'success') {
      navigation.navigate('Login');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Hanya tampilkan error jika form sudah di-submit
  const getError = (field: string) => {
    return formSubmitted ? formErrors[field] : undefined;
  };

  // Tampilkan CustomAlert untuk error dari API
  useEffect(() => {
    if (authState.error) {
      setAlertConfig({
        title: 'Error',
        message: authState.error,
        type: 'error'
      });
      setAlertVisible(true);
    }
  }, [authState.error]);

  return (
    <ScrollView
      contentContainerStyle={registerStyles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={registerStyles.container}>
        <Image source={require('../assets/logo.png')} style={registerStyles.logo} />
        <Text style={registerStyles.title}>ECOTERRA</Text>
        <Text style={registerStyles.subtitleWithMargin}>SIGN UP</Text>

        <Input
          placeholder="Nama Lengkap"
          value={fullName}
          onChangeText={setFullName}
          error={getError('fullName')}
        />
        
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          error={getError('username')}
        />
        
        <Input
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={getError('email')}
        />
        
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          error={getError('password')}
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
        
        <Input
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          error={getError('confirmPassword')}
          rightIcon={
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Icon 
                name={showConfirmPassword ? 'visibility-off' : 'visibility'} 
                size={16} 
                color="#4CAF50" 
              />
            </TouchableOpacity>
          }
        />

        <Dropdown
          placeholder="Pilih Kategori Anda"
          options={categories}
          selectedValue={selectedCategory}
          onSelect={handleSelectCategory}
          style={formSubmitted && formErrors.category ? { borderWidth: 1, borderColor: '#ff0000' } : {}}
        />
        {formSubmitted && formErrors.category && (
          <Text style={{ color: '#ff0000', fontSize: 12, alignSelf: 'flex-start', marginLeft: '7.5%' }}>
            {formErrors.category}
          </Text>
        )}

        {/* Tampilkan pesan sukses dari API jika ada */}
        {authState.message && (
          <Text style={{ color: '#4CAF50', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
            {authState.message}
          </Text>
        )}

        <Button
          title="CREATE ACCOUNT"
          onPress={handleSignup}
          style={{ marginTop: 20 }}
          loading={authState.isLoading}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={registerStyles.footerContainer}
        >
          <Text style={registerStyles.footerText}>
            Confirm the Ecosystem with Ecoterra -{' '}
            <Text style={registerStyles.signInText}>Sign In Now!</Text>
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
    </ScrollView>
  );
};

export default SignUpScreen;
