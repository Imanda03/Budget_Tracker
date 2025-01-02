import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import React from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import AuthHeader from '../../../components/core/AuthHeader';
import {createStyles} from './styles';
import ButtonIconComponent from '../../../components/core/ButtonIcon';
import Input from '../../../components/core/Input';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {userRegister} from '../../../services/AuthService';
import {ApiError, userDataProps} from '../../../utils/types';
import {useToast} from '../../../context/ToastContext';
import {AxiosError} from 'axios';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  secureTextEntry?: boolean;
}

interface SignUpProps {
  navigation: {
    replace: (screen: string) => void;
  };
}

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const styles = createStyles();
  const {showToast} = useToast();

  const {mutate, isLoading, isError, error} = userRegister();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setError,
  } = useForm<userDataProps>({
    defaultValues: {
      fullName: '',
      address: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<userDataProps> = (
    data: userDataProps,
  ): void => {
    mutate(data, {
      onSuccess: response => {
        showToast(response.message, 'success');
        navigation.replace('SignIn');
      },
      onError: (error: AxiosError<ApiError>) => {
        if (error?.response?.data?.errors) {
          if (error.response.data.errors?.length === 1) {
            showToast(error.response.data.errors?.[0]?.message, 'error');
          } else {
            showToast('Please check the form for errors', 'error');
          }
          const backendErrors = error.response.data.errors;

          backendErrors.forEach(({field, message}: any) => {
            console.log(`Setting error for field ${field}:`, message);
            field &&
              setError(field as keyof userDataProps, {
                type: 'manual',
                message,
              });
          });
        } else {
          const errorMessage =
            error.response?.data?.message ||
            'Registration failed. Please try again.';
          showToast(errorMessage, 'error');
        }
      },
    });
  };

  const formFields: Array<{
    name: keyof userDataProps;
    placeholder: string;
    rules: Object;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
  }> = [
    {
      name: 'fullName',
      placeholder: 'Full name',
      rules: {required: 'Full name is required'},
      keyboardType: 'default',
    },
    {
      name: 'address',
      placeholder: 'Address',
      rules: {required: 'Address is required'},
      keyboardType: 'default',
    },
    {
      name: 'email',
      placeholder: 'Email',
      keyboardType: 'default',
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email',
        },
      },
    },
    {
      name: 'phoneNumber',
      placeholder: 'Phone Number',
      keyboardType: 'number-pad',
      rules: {
        required: 'Phone number is required',
        pattern: {
          value: /^\d{10}$/,
          message: 'Please enter a valid 10-digit phone number',
        },
      },
    },
    {
      name: 'password',
      placeholder: 'Password',
      rules: {required: 'Password is required'},
      secureTextEntry: true,
      keyboardType: 'default',
    },
    {
      name: 'confirmPassword',
      placeholder: 'Confirm Password',
      keyboardType: 'default',
      rules: {
        required: 'Please confirm your password',
        validate: (val: string) =>
          watch('password') === val || 'Passwords do not match',
      },
      secureTextEntry: true,
    },
  ];

  return (
    <BackgroundWrapper>
      <AuthHeader title="Register" />
      <Text style={styles.title as TextStyle}>
        Join, Plan, Prosper – Register to Take Charge of Your Finances!
      </Text>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.loginField}>
          {formFields.map(field => (
            <Controller
              key={field.name}
              control={control}
              name={field.name}
              rules={field.rules}
              render={({field: {onChange, value}}) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder={field.placeholder}
                  error={errors[field.name]?.message}
                  secureTextEntry={field.secureTextEntry}
                  keyboardType={field.keyboardType}
                />
              )}
            />
          ))}

          <ButtonIconComponent
            marginTop={20}
            title="Register"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.replace('SignIn')}>
              <Text style={styles.forgetText as TextStyle}>
                Already have account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default SignUp;
