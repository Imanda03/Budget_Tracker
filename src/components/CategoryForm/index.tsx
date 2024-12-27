import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../../utils/colors';
import {createStyles} from './styles';

const ICONS = [
  {id: 1, name: '🛒', value: 'shopping-cart'},
  {id: 2, name: '🏠', value: 'home'},
  {id: 3, name: '🚗', value: 'car'},
  {id: 4, name: '🎮', value: 'game'},
  {id: 5, name: '🍔', value: 'food'},
  {id: 6, name: '✈️', value: 'flight'},
  {id: 7, name: '🎵', value: 'music'},
  {id: 8, name: '💰', value: 'money'},
];

interface CategoryFormData {
  name: string;
  icon: string;
  type: 'expense' | 'income';
}

export const AddCategoryForm = () => {
  const {theme} = useTheme();
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    icon: ICONS[0].value,
    type: 'expense',
  });

  const handleSubmit = () => {
    console.log('Form Data:', formData);
  };

  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.label, {color: theme.TEXT}]}>Name</Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: theme.INPUT_BACKGROUND, color: theme.TEXT},
          ]}
          placeholder="Category name"
          placeholderTextColor={theme.PLACEHOLDER_COLOR}
          value={formData.name}
          onChangeText={text => setFormData({...formData, name: text})}
        />

        <Text style={[styles.label, {color: theme.TEXT}]}>Icon</Text>
        <View style={styles.iconGrid}>
          {ICONS.map(icon => (
            <TouchableOpacity
              key={icon.id}
              style={[
                styles.iconButton,
                {
                  backgroundColor: theme.INPUT_BACKGROUND,
                  borderColor:
                    formData.icon === icon.value ? theme.PURPLE : 'transparent',
                },
              ]}
              onPress={() => setFormData({...formData, icon: icon.value})}>
              <Text style={styles.iconText}>{icon.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, {color: theme.TEXT}]}>Type</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              {
                backgroundColor:
                  formData.type === 'expense'
                    ? theme.PURPLE
                    : theme.INPUT_BACKGROUND,
              },
            ]}
            onPress={() => setFormData({...formData, type: 'expense'})}>
            <Text
              style={[
                styles.typeText,
                {
                  color:
                    formData.type === 'expense' ? theme.SECONDARY : theme.TEXT,
                },
              ]}>
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              {
                backgroundColor:
                  formData.type === 'income'
                    ? theme.PURPLE
                    : theme.INPUT_BACKGROUND,
              },
            ]}
            onPress={() => setFormData({...formData, type: 'income'})}>
            <Text
              style={[
                styles.typeText,
                {
                  color:
                    formData.type === 'income' ? theme.SECONDARY : theme.TEXT,
                },
              ]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, {backgroundColor: theme.PURPLE}]}
        onPress={handleSubmit}>
        <Text style={[styles.submitText, {color: theme.SECONDARY}]}>
          Create Category
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCategoryForm;
