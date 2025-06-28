import EStyleSheet from 'react-native-extended-stylesheet';

const loginStyles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '$spacingMedium',
  },
  logo: { 
    width: '5rem',
    height: '5rem',
    marginBottom: '$spacingSmall',
  },
  title: { 
    fontSize: '$fontLarge', 
    fontWeight: 'bold', 
    color: '$textColor',
  },
  subtitle: { 
    fontSize: '$fontMedium', 
    color: '$textColor',
  },
  welcomeText: {
    color: '$primaryColor',
    marginTop: '$spacingSmall',
    textAlign: 'center',
    marginBottom: '$spacingLarge',
  },
  rememberText: { 
    color: '$textColor', 
    marginBottom: '0.94rem',
  },
  footerContainer: {
    marginTop: '$spacingLarge',
  },
  footerText: {
    color: '$textSecondaryColor',
    fontSize: '$fontSmall',
    textAlign: 'center',
  },
  signUpText: {
    color: '$primaryColor',
    fontWeight: 'bold',
  },
});

export default loginStyles; 