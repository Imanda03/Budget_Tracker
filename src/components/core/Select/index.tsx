import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from '../../../utils/colors';
import {createStyles} from './styles';

interface Category {
  id: string;
  title: string;
  icon: string;
  type: 'income' | 'expense';
}

interface SelectProps {
  value: string;
  onPress: (selectedValue: string) => void;
  error?: string;
  placeholder?: string;
  options: Category[];
  label?: string;
}

const SelectComponent = ({
  value,
  onPress,
  error,
  placeholder = 'Select option',
  options,
  label,
}: SelectProps) => {
  const {theme} = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const styles = createStyles();

  const toggleModal = (visible: boolean) => {
    setIsModalVisible(visible);
    Animated.spring(animation, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  const selectedCategory = options.find(cat => cat.id === value);
  const modalTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={() => toggleModal(true)}
        style={[
          styles.inputContainer,
          error && {borderColor: theme.ERROR},
          !error && {borderColor: value ? theme.PRIMARY : theme.BORDER_COLOR},
        ]}>
        <Text style={value ? styles.input : styles.placeholderText}>
          {selectedCategory?.title || placeholder}
        </Text>
        <Entypo
          name={isModalVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={error ? theme.ERROR : theme.TEXT}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => toggleModal(false)}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {transform: [{translateY: modalTranslateY}]},
            ]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    value === item.id && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onPress(item.id);
                    toggleModal(false);
                  }}>
                  <Text
                    style={[
                      styles.optionText,
                      value === item.id && styles.selectedOptionText,
                    ]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => toggleModal(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(SelectComponent);
