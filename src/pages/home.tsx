import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../interfaces/navigation.types';
import homeStyles from '../style/pages/home.styles';
import { useAuth } from '../hooks/useAuth';
import CustomAlert from '../components/CustomAlert';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout, authState } = useAuth();
  const [logoutAlert, setLogoutAlert] = React.useState(false);
  
  const handleLogout = () => {
    setLogoutAlert(true);
  };
  
  const confirmLogout = async () => {
    const success = await logout();
    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
    setLogoutAlert(false);
  };
  
  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.content}>
        <Text style={homeStyles.title}>ECOTERRA</Text>
        <Text style={homeStyles.welcomeText}>Selamat Datang di Ecoterra!</Text>
        
        {/* Info User */}
        <View style={homeStyles.userInfo}>
          <Text style={homeStyles.userInfoTitle}>Informasi Pengguna</Text>
          <Text style={homeStyles.userInfoText}>Nama: {authState.user?.fullName}</Text>
          <Text style={homeStyles.userInfoText}>Username: {authState.user?.username}</Text>
          <Text style={homeStyles.userInfoText}>Email: {authState.user?.email}</Text>
          <Text style={homeStyles.userInfoText}>Kategori: {authState.user?.category}</Text>
        </View>
        
        <Text style={homeStyles.description}>
          Temukan berbagai cara untuk menjaga lingkungan dan bergabunglah dengan
          komunitas yang peduli terhadap Bumi.
        </Text>
        
        {/* Logout Button */}
        <Button 
          title="Logout" 
          onPress={handleLogout}
          style={homeStyles.logoutButton}
          loading={authState.isLoading}
        />
        
        {/* Custom Alert untuk konfirmasi logout */}
        <CustomAlert
          visible={logoutAlert}
          title="Konfirmasi Logout"
          message="Apakah Anda yakin ingin keluar?"
          type="warning"
          onClose={() => setLogoutAlert(false)}
          onConfirm={confirmLogout}
          confirmText="Logout"
          showCancel={true}
          cancelText="Batal"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
