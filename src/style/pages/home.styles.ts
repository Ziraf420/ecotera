import EStyleSheet from 'react-native-extended-stylesheet';

const homeStyles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '$backgroundColor',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '$spacingMedium',
    },
    title: {
      fontSize: '$fontLarge',
      fontWeight: 'bold',
      color: '$textColor',
      marginBottom: '$spacingMedium',
    },
    welcomeText: {
      fontSize: '$fontMedium',
      color: '$primaryColor',
      marginBottom: '$spacingLarge',
      fontWeight: 'bold',
    },
    description: {
      fontSize: '$fontMedium',
      color: '$textColor',
      textAlign: 'center',
      marginBottom: '$spacingLarge',
    },
    userInfo: {
      backgroundColor: '$cardColor',
      padding: '$spacingMedium',
      borderRadius: '$borderRadiusMedium',
      width: '100%',
      marginBottom: '$spacingLarge',
    },
    userInfoTitle: {
      fontSize: '$fontMedium',
      fontWeight: 'bold',
      color: '$primaryColor',
      marginBottom: '$spacingSmall',
    },
    userInfoText: {
      fontSize: '$fontMedium',
      color: '$textColor',
      marginBottom: '$spacingSmall',
    },
    logoutButton: {
      backgroundColor: '#ff5252',
      marginTop: '$spacingMedium',
    }
  });
  
export default homeStyles;