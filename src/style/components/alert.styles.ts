import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../theme';

export const alertStyles = EStyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -35,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  confirmButton: {
    flex: 1,
  },
  cancelText: {
    color: '#666666',
    fontWeight: 'bold',
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Colors for different alert types
  colorSuccess: {
    backgroundColor: theme.colors.primary, // Warna sukses (hijau)
  },
  colorError: {
    backgroundColor: '#F44336', // Warna error (merah)
  },
  colorWarning: {
    backgroundColor: '#FF9800', // Warna warning (oranye)
  },
  colorInfo: {
    backgroundColor: '#2196F3', // Warna info (biru)
  },
}); 