import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {createStyles} from './styles';
import InputNumber from '../core/InputNumber';
import Select from '../core/Select';
import DatePicker from '../core/DatePicker';
import TextArea from '../core/TextArea';
import ButtonIconComponent from '../core/ButtonIcon';

type FormData = {
  amount: string;
  category: string;
  date: Date;
  note: string;
};

interface IncomeExpensesProps {
  type: 'income' | 'expense';
}

const IncomeExpenses: React.FC<IncomeExpensesProps> = ({type}) => {
  const styles = createStyles();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>({
    defaultValues: {
      amount: '',
      category: '',
      date: new Date(),
      note: '',
    },
  });

  // Reset form when type changes
  useEffect(() => {
    reset({
      amount: '',
      category: '',
      date: new Date(),
      note: '',
    });
  }, [type, reset]);

  const onSubmit = (data: FormData) => {
    console.log(type, data);
    // Handle submission based on type
  };

  // Get categories based on type
  const getCategories = () => {
    if (type === 'income') {
      return ['Salary', 'Freelance', 'Investment'];
    }
    return ['Food', 'Transport', 'Shopping'];
  };

  return (
    <View style={styles.container}>
      <View>
        <Controller
          control={control}
          name="amount"
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
              error={errors.amount?.message}
              placeholder={`Enter ${type} amount`}
            />
          )}
        />

        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category is required',
          }}
          render={({field: {onChange, value}}) => (
            <Select
              value={value}
              onPress={onChange}
              error={errors.category?.message}
              placeholder={`Select ${type} category`}
              options={getCategories()}
            />
          )}
        />

        <Controller
          control={control}
          name="date"
          rules={{
            required: 'Date is required',
          }}
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
          name="note"
          render={({field: {onChange, value}}) => (
            <TextArea
              value={value}
              onChangeText={onChange}
              placeholder="Add a note"
            />
          )}
        />
      </View>
      <View>
        <ButtonIconComponent
          title="Save Transaction"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default React.memo(IncomeExpenses);
