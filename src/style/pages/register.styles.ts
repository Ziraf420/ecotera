import EStyleSheet from 'react-native-extended-stylesheet';

const registerStyles = EStyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '$backgroundColor',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: '$spacingMedium',
    paddingVertical: '2.5rem',
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
  subtitleWithMargin: {
    fontSize: '$fontMedium',
    color: '$textColor',
    marginBottom: '$spacingLarge',
  },
  // Custom dropdown styling
  customDropdownInput: {
    width: '85%',
    backgroundColor: '$cardColor',
    borderRadius: '$borderRadiusMedium',
    padding: '0.625rem',
    marginVertical: '$spacingSmall',
    height: '3.125rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdownInputText: {
    color: '$textColor',
    fontSize: '$fontMedium',
  },
  dropdownPlaceholderText: {
    color: '$textSecondaryColor',
    fontSize: '$fontMedium',
  },
  dropdownArrow: {
    color: '$primaryColor',
    fontSize: '1.125rem',
  },
  // Modal styling
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '$cardColor',
    borderTopLeftRadius: '$borderRadiusLarge',
    borderTopRightRadius: '$borderRadiusLarge',
    padding: '$spacingMedium',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '$textColor',
    marginBottom: '0.94rem',
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: '0.94rem',
    paddingHorizontal: '0.625rem',
  },
  modalItemText: {
    color: '$textColor',
    fontSize: '1.125rem',
    textAlign: 'center',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: '0.3rem',
  },
  modalCloseButton: {
    marginTop: '0.94rem',
    padding: '0.625rem',
    backgroundColor: '$primaryColor',
    borderRadius: '$borderRadiusMedium',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '$textColor',
    fontWeight: 'bold',
    fontSize: '$fontMedium',
  },
  // Footer
  footerContainer: {
    marginTop: '$spacingLarge',
  },
  footerText: {
    color: '$textSecondaryColor',
    fontSize: '$fontSmall',
    textAlign: 'center',
  },
  signInText: {
    color: '$primaryColor',
    fontWeight: 'bold',
  },
});

export default registerStyles; 