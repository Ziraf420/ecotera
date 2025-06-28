import EStyleSheet from 'react-native-extended-stylesheet';

// Define tema warna dan ukuran dasar aplikasi
const theme = {
  // Warna dasar
  colors: {
    primary: '#4CAF50',
    background: '#000000',
    card: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#aaaaaa',
  },
  
  // Ukuran font
  fontSizes: {
    small: 12,
    medium: 16,
    large: 24,
  },
  
  // Padding & margin
  spacing: {
    small: 8,
    medium: 16,
    large: 30,
  },
  
  // Border radius
  borderRadius: {
    small: 5,
    medium: 10,
    large: 25,
  }
};

// Inisialisasi EStyleSheet dengan rem unit (1rem = 16dp)
EStyleSheet.build({
  $rem: 16,
  
  // Global variables untuk tema
  $primaryColor: theme.colors.primary,
  $backgroundColor: theme.colors.background,
  $cardColor: theme.colors.card,
  $textColor: theme.colors.text,
  $textSecondaryColor: theme.colors.textSecondary,
  
  $fontSmall: theme.fontSizes.small,
  $fontMedium: theme.fontSizes.medium, 
  $fontLarge: theme.fontSizes.large,
  
  $spacingSmall: theme.spacing.small,
  $spacingMedium: theme.spacing.medium,
  $spacingLarge: theme.spacing.large,
  
  $borderRadiusSmall: theme.borderRadius.small,
  $borderRadiusMedium: theme.borderRadius.medium,
  $borderRadiusLarge: theme.borderRadius.large,
});

export default theme; 