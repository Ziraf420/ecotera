import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  Modal, 
  View, 
  FlatList, 
  TouchableWithoutFeedback 
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue: string | null;
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  style?: object;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = 'Pilih Opsi',
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Find selected label
  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !selectedOption;
  
  const ItemSeparator = () => <View style={styles.itemSeparator} />;
  
  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.dropdownContainer, style]}
        onPress={() => setIsVisible(true)}
      >
        <Text
          style={
            isPlaceholder ? styles.placeholderText : styles.selectedText
          }
        >
          {displayText}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{placeholder}</Text>
                
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={ItemSeparator}
                />
                
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Tutup</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = EStyleSheet.create({
  dropdownContainer: {
    width: '85%',
    backgroundColor: '$cardColor',
    borderRadius: '$borderRadiusMedium',
    marginTop: '$spacingSmall',
    padding: '0.625rem',
    height: '2.5rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    color: '$textColor',
    fontSize: '$fontMedium',
  },
  placeholderText: {
    color: '$textSecondaryColor',
    fontSize: '$fontMedium',
  },
  arrow: {
    color: '$primaryColor',
    fontSize: '$fontSmall',
  },
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
    fontSize: '$fontLarge',
    fontWeight: 'bold',
    color: '$textColor',
    marginBottom: '$spacingMedium',
    textAlign: 'center',
  },
  optionItem: {
    paddingVertical: '$spacingSmall',
    paddingHorizontal: '$spacingSmall',
  },
  optionText: {
    color: '$textColor',
    fontSize: '$fontMedium',
    textAlign: 'center',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: '0.25rem',
  },
  closeButton: {
    marginTop: '$spacingMedium',
    backgroundColor: '$primaryColor',
    borderRadius: '$borderRadiusMedium',
    padding: '$spacingSmall',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '$textColor',
    fontWeight: 'bold',
    fontSize: '$fontMedium',
  },
});

export default Dropdown; 