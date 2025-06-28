// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import {
  Text,
  ImageBackground,
  View,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../interfaces/navigation.types';

// Import styles
import splashStyles from '../style/pages/splash.styles';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Efek fade in ketika komponen mount, lalu pindah ke halaman Login setelah 2 detik
  useEffect(() => {
    // Animasi fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Timer untuk navigasi ke Login setelah 2 detik
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 2000);

    // Cleanup timer saat unmount
    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={splashStyles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={splashStyles.bg}
        resizeMode="cover"
      >
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <Image source={require('../assets/logo.png')} style={splashStyles.logo} />
          <Text style={splashStyles.title}>ECOTERRA</Text>
          <Text style={splashStyles.subtitle}>
            Selaras dengan Alam Bersama untuk Bumi
          </Text>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
