export interface CategoryProps {
  title: string;
  icon: string;
  type: 'income' | 'expense';
  onEdit?: () => void;
  id?: string;
}

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../utils/colors';
import {createStyles} from './styles';
import {capitalize, ICONS} from '../../utils/helper';
import {deleteCategory} from '../../services/CategoryService';
import {useToast} from '../../context/ToastContext';
import {useQueryClient} from 'react-query';

export const Category: React.FC<CategoryProps> = ({
  title,
  icon,
  onEdit,
  type,
  id,
}) => {
  const {theme} = useTheme();
  const styles = createStyles();
  const {showToast} = useToast();

  const selectedIcon = ICONS.find(i => i.value === icon)?.name || '❓';
  const queryClient = useQueryClient();

  const onDelete = () => {
    if (id) {
      Alert.alert(
        'Delete Category',
        `Are you sure you want to delete the category "${title}"?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteCategory(id);
                showToast(`${title} deleted successfully`, 'success');
                await queryClient.invalidateQueries({
                  queryKey: ['CategoryList'],
                  exact: true,
                });
              } catch (error) {
                showToast('Failed to delete category', 'error');
              }
            },
          },
        ],
      );
    } else {
      showToast('Category ID is missing', 'error');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.LIST_BG}]}>
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: theme.BACKGROUND_LIGHT},
          ]}>
          <Text style={{fontSize: 28}}>{selectedIcon}</Text>
        </View>
        <View style={{gap: 5}}>
          <Text style={[styles.title, {color: theme.TEXT, letterSpacing: 0.8}]}>
            {capitalize(title)}
          </Text>
          <Text
            style={[
              styles.title,
              {
                fontSize: 12,
                color: type === 'income' ? theme.SUCCESS : theme.ERROR,
                fontWeight: '400',
              },
            ]}>
            {capitalize(type)}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        {/* <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={20} color={theme.TEXT} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Icon name="delete" size={20} color={theme.TEXT} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AddCategory: React.FC<{onPress: () => void}> = ({onPress}) => {
  const {theme} = useTheme();
  const styles = createStyles();

  return (
    <TouchableOpacity
      style={[styles.addButton, {borderColor: theme.PURPLE}]}
      onPress={onPress}>
      <Icon name="add" size={24} color={theme.PURPLE} />
      <Text style={[styles.addText, {color: theme.PURPLE}]}>Add Category</Text>
    </TouchableOpacity>
  );
};
