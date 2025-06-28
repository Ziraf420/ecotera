import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: object;
  textStyle?: object;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  fullWidth = true,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : EStyleSheet.value('$primaryColor')} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  button: {
    padding: '0.75rem',
    borderRadius: '$borderRadiusLarge',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '$primaryColor',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '$primaryColor',
  },
  fullWidth: {
    width: '85%',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '$textColor',
    fontWeight: 'bold',
  },
});

export default Button; 