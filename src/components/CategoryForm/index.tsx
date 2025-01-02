import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {useTheme} from '../../utils/colors';
import {createStyles} from './styles';
import {CategoryFormData} from '../../utils/types';
import {ICONS} from '../../utils/helper';
import {useToast} from '../../context/ToastContext';
import ButtonIconComponent from '../core/ButtonIcon';
import {createCategory} from '../../services/CategoryService';
import {useQueryClient} from 'react-query';

const defaultValues: any = {
  title: '',
  icon: ICONS[0].value,
  type: 'expense',
};

const formFields = {
  title: {
    name: 'title',
    rules: {
      required: 'Category name is required',
      minLength: {
        value: 2,
        message: 'Category name must be at least 2 characters',
      },
    },
  },
  icon: {
    name: 'icon',
    rules: {required: 'Please select an icon'},
  },
  type: {
    name: 'type',
    rules: {required: 'Please select a type'},
  },
} as const;

export const AddCategoryForm = () => {
  const {theme} = useTheme();
  const {showToast} = useToast();
  const {mutate, isLoading} = createCategory();
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
  } = useForm<CategoryFormData>({
    defaultValues,
  });

  const onSubmit = (data: CategoryFormData) => {
    mutate(data, {
      onSuccess: response => {
        showToast('Category created successfully', 'success');
        reset(defaultValues);
        navigation.goBack();
        queryClient.invalidateQueries({
          queryKey: ['CategoryList'],
          exact: true,
        });
      },
      onError: (error: any) => {
        if (error?.response?.data?.errors) {
          const backendErrors = error.response.data.errors;
          backendErrors.forEach(({field, message}: any) => {
            field &&
              setError(field as keyof CategoryFormData, {
                type: 'manual',
                message,
              });
          });
          showToast('Please check the form for errors', 'error');
        } else {
          showToast(
            error.response?.data?.message || 'Failed to create category',
            'error',
          );
        }
      },
    });
  };

  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.label, {color: theme.TEXT}]}>Name</Text>
        <Controller
          control={control}
          name="title"
          rules={formFields.title.rules}
          render={({field: {onChange, value}}) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.INPUT_BACKGROUND,
                    color: theme.TEXT,
                    borderColor: errors.title ? 'red' : theme.INPUT_BACKGROUND,
                  },
                ]}
                placeholder="Category name"
                placeholderTextColor={theme.PLACEHOLDER_COLOR}
                value={value}
                onChangeText={onChange}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title.message}</Text>
              )}
            </>
          )}
        />

        <Text style={[styles.label, {color: theme.TEXT}]}>Icon</Text>
        <Controller
          control={control}
          name="icon"
          rules={formFields.icon.rules}
          render={({field: {onChange, value}}) => (
            <>
              <View style={styles.iconGrid}>
                {ICONS.map(icon => (
                  <TouchableOpacity
                    key={icon.id}
                    style={[
                      styles.iconButton,
                      {
                        backgroundColor: theme.INPUT_BACKGROUND,
                        borderColor:
                          value === icon.value ? theme.PURPLE : 'transparent',
                      },
                    ]}
                    onPress={() => onChange(icon.value)}>
                    <Text style={styles.iconText}>{icon.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.icon && (
                <Text style={styles.errorText}>{errors.icon.message}</Text>
              )}
            </>
          )}
        />

        <Text style={[styles.label, {color: theme.TEXT}]}>Type</Text>
        <Controller
          control={control}
          name="type"
          rules={formFields.type.rules}
          render={({field: {onChange, value}}) => (
            <>
              <View style={styles.typeContainer}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor:
                        value === 'expense'
                          ? theme.PURPLE
                          : theme.INPUT_BACKGROUND,
                    },
                  ]}
                  onPress={() => onChange('expense')}>
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color:
                          value === 'expense' ? theme.SECONDARY : theme.TEXT,
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
                        value === 'income'
                          ? theme.PURPLE
                          : theme.INPUT_BACKGROUND,
                    },
                  ]}
                  onPress={() => onChange('income')}>
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color:
                          value === 'income' ? theme.SECONDARY : theme.TEXT,
                      },
                    ]}>
                    Income
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.type && (
                <Text style={styles.errorText}>{errors.type.message}</Text>
              )}
            </>
          )}
        />
      </View>
      <ButtonIconComponent
        title="Create Category"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
    </View>
  );
};

export default AddCategoryForm;
