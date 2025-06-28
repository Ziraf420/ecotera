import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  style?: object;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  style,
  rightIcon,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.inputError, style]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={EStyleSheet.value('$textSecondaryColor')}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: '85%',
    marginVertical: '$spacingSmall',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '$cardColor',
    borderRadius: '$borderRadiusMedium',
    paddingHorizontal: '0.625rem',
    width: '100%',
  },
  input: {
    flex: 1,
    color: '$textColor',
    paddingVertical: '0.625rem',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: '$fontSmall',
    marginTop: '0.25rem',
  },
  rightIconContainer: {
    paddingLeft: '0.5rem',
  },
});

export default Input; 