import EStyleSheet from 'react-native-extended-stylesheet';

const splashStyles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
  },
  bg: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '6.25rem',
    height: '6.25rem',
    marginBottom: '$spacingMedium',
  },
  title: {
    color: '$textColor',
    fontSize: '1.75rem',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#a5d6a7', // Warna khusus untuk subtitle
    fontSize: '$fontMedium',
    marginTop: '$spacingSmall',
    textAlign: 'center',
  },
});

export default splashStyles; 