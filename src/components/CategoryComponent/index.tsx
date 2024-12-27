export interface CategoryProps {
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../utils/colors';
import {createStyles} from './styles';

export const Category: React.FC<CategoryProps> = ({
  title,
  onEdit,
  onDelete,
}) => {
  const {theme} = useTheme();
  const styles = createStyles();

  return (
    <View style={[styles.container, {backgroundColor: theme.BACKGROUND}]}>
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: theme.BACKGROUND_LIGHT},
          ]}>
          <Icon name="shopping-cart" size={24} color={theme.PURPLE} />
        </View>
        <Text style={[styles.title, {color: theme.TEXT}]}>{title}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={20} color={theme.TEXT} />
        </TouchableOpacity>
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
