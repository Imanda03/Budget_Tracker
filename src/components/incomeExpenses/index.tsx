import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {createStyles} from './styles';
import InputNumber from '../core/InputNumber';
import Select from '../core/Select';
import DatePicker from '../core/DatePicker';
import TextArea from '../core/TextArea';
import ButtonIconComponent from '../core/ButtonIcon';
import {useQuery, useQueryClient} from 'react-query';
import {getCategory} from '../../services/CategoryService';
import {createTransaction} from '../../services/TransactionService';
import InputComponent from '../core/Input';
import {useToast} from '../../context/ToastContext';

interface Category {
  id: string;
  title: string;
  icon: string;
  type: 'income' | 'expense';
}

type FormData = {
  price: string;
  categoryId: string;
  date: Date;
  description: string;
  title: string;
};

interface IncomeExpensesProps {
  type: 'income' | 'expense';
}

const IncomeExpenses: React.FC<IncomeExpensesProps> = ({type}) => {
  const styles = createStyles();
  const {showToast} = useToast();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
  } = useForm<FormData>();

  const {data: categories = []} = useQuery(['CategoryList'], getCategory);

  const {mutate, isLoading} = createTransaction();
  const queryClient = useQueryClient();

  const formReset = {
    price: '',
    categoryId: '',
    date: new Date(),
    description: '',
    title: '',
  };

  useEffect(() => {
    reset(formReset);
  }, [type, reset]);

  const onSubmit = (data: FormData) => {
    const submitData = {
      ...data,
      type: type,
    };
    mutate(submitData, {
      onSuccess: response => {
        showToast(response.message, 'success');
        reset(formReset);
        queryClient.invalidateQueries({
          queryKey: ['TransactionList'],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ['LatestTransactionList'],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ['Balance'],
          exact: true,
        });
      },
      onError: (error: any) => {
        if (error?.response?.data?.errors) {
          const backendErrors = error.response.data.errors;
          backendErrors.forEach(({field, message}: any) => {
            field &&
              setError(field as keyof FormData, {
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

  const filteredCategories = (categories as Category[]).filter(
    category => category.type === type,
  );

  return (
    <View style={styles.container}>
      <View>
        <Controller
          control={control}
          name="title"
          rules={{
            required: 'Title is required',
          }}
          render={({field: {onChange, value}}) => (
            <InputComponent
              value={value}
              onChangeText={onChange}
              error={errors.title?.message}
              placeholder={`Add title`}
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          rules={{
            required: 'Amount is required',
            pattern: {
              value: /^\d+(\.\d{0,2})?$/,
              message: 'Please enter a valid amount',
            },
          }}
          render={({field: {onChange, value}}) => (
            <InputNumber
              value={value}
              onChangeText={onChange}
              error={errors.price?.message}
              placeholder={`Enter ${type} amount`}
            />
          )}
        />

        <Controller
          control={control}
          name="categoryId"
          rules={{required: 'Category is required'}}
          render={({field: {onChange, value}}) => (
            <Select
              value={value}
              onPress={onChange}
              error={errors.categoryId?.message}
              placeholder={`Select ${type} category`}
              options={filteredCategories}
            />
          )}
        />

        <Controller
          control={control}
          name="date"
          rules={{required: 'Date is required'}}
          render={({field: {onChange, value}}) => (
            <DatePicker
              value={value}
              onChange={onChange}
              error={errors.date?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{required: 'Note is required'}}
          render={({field: {onChange, value}}) => (
            <TextArea
              value={value}
              onChangeText={onChange}
              placeholder="Add a note"
              error={errors.description?.message}
            />
          )}
        />
      </View>
      <View>
        <ButtonIconComponent
          title="Save Transaction"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default React.memo(IncomeExpenses);
