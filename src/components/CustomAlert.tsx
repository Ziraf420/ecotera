import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { alertStyles } from '../style/components/alert.styles';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  type = 'info',
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Batal',
  showCancel = false
}) => {
  
  // Icon dan warna berdasarkan tipe alert
  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { 
          icon: 'check-circle', 
          colorStyle: alertStyles.colorSuccess 
        };
      case 'error':
        return { 
          icon: 'error', 
          colorStyle: alertStyles.colorError 
        };
      case 'warning':
        return { 
          icon: 'warning', 
          colorStyle: alertStyles.colorWarning 
        };
      case 'info':
      default:
        return { 
          icon: 'info', 
          colorStyle: alertStyles.colorInfo 
        };
    }
  };

  const { icon, colorStyle } = getIconAndColor();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={alertStyles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={alertStyles.modalContainer}>
              <View style={[alertStyles.iconContainer, colorStyle]}>
                <Icon name={icon} size={36} color="#FFFFFF" />
              </View>
              
              <Text style={alertStyles.title}>{title}</Text>
              <Text style={alertStyles.message}>{message}</Text>
              
              <View style={alertStyles.buttonContainer}>
                {showCancel && (
                  <TouchableOpacity
                    style={[alertStyles.button, alertStyles.cancelButton]}
                    onPress={onClose}
                  >
                    <Text style={alertStyles.cancelText}>{cancelText}</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity
                  style={[
                    alertStyles.button, 
                    alertStyles.confirmButton,
                    colorStyle
                  ]}
                  onPress={onConfirm || onClose}
                >
                  <Text style={alertStyles.confirmText}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomAlert; 