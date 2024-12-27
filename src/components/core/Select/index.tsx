import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from '../../../utils/colors';
import {createStyles} from '../sharedStyles';

interface SelectProps {
  value: string;
  onPress: (selectedValue: string) => void;
  error?: string;
  placeholder?: string;
  options: string[]; // Add options prop
}

const SelectComponent = ({
  value,
  onPress,
  error,
  placeholder = 'Select option',
  options,
}: SelectProps) => {
  const styles = createStyles();
  const {theme} = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={[styles.inputContainer, error && styles.inputError]}>
        <Text style={value ? styles.input : styles.placeholderText}>
          {value || placeholder}
        </Text>
        <Entypo name="chevron-right" size={22} color={theme.TEXT} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Modal for showing options */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  onPress(item);
                  setIsModalVisible(false);
                }}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(SelectComponent);
