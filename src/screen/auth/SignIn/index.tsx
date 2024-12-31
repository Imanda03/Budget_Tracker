import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {useForm, Controller} from 'react-hook-form';
import AuthHeader from '../../../components/core/AuthHeader';
import {createStyles} from './styles';
import Input from '../../../components/core/Input';
import ButtonIconComponent from '../../../components/core/ButtonIcon';
import BackgroundWrapper from '../../../components/BackgroundWrapper';

interface FormData {
  email: string;
  password: string;
}

const formFields = [
  {
    name: 'email',
    placeholder: 'Email',
    secureTextEntry: false,
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email',
      },
    },
  },
  {
    name: 'password',
    placeholder: 'Password',
    rules: {required: 'Password is required'},
    secureTextEntry: true,
  },
] as const;

const FormInput = React.memo(
  ({
    field,
    fieldConfig,
    error,
  }: {
    field: any;
    fieldConfig: (typeof formFields)[number];
    error?: string;
  }) => (
    <Input
      value={field.value}
      onChangeText={field.onChange}
      placeholder={fieldConfig.placeholder}
      secureTextEntry={fieldConfig.secureTextEntry}
      error={error}
    />
  ),
);

const SignIn = React.memo(({navigation}: any) => {
  const styles = createStyles();

  console.log('checked');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback((data: FormData) => {
    console.log(data);
  }, []);

  return (
    <BackgroundWrapper>
      <AuthHeader title="Login" />
      <View>
        <Text style={[styles.title, {marginVertical: '3%'}]}>
          Track, Save, Succeed – Log In to Own Your Finances!
        </Text>
        <View style={styles.imageContainer}>
          <View style={styles.shadowContainer} />
          <Image
            source={require('../../../assets/Image/login.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loginField}>
          <Text style={[styles.title, {textAlign: 'left'}]}>Login</Text>
          {formFields.map(field => (
            <Controller
              key={field.name}
              control={control}
              name={field.name as keyof FormData}
              rules={field.rules}
              render={({field: fieldProps}) => (
                <FormInput
                  field={fieldProps}
                  fieldConfig={field}
                  error={errors[field.name as keyof FormData]?.message}
                />
              )}
            />
          ))}
          <ButtonIconComponent
            marginTop={10}
            title="Login"
            onPress={handleSubmit(onSubmit)}
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={styles.forgetText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.replace('SignUp')}>
              <Text style={styles.forgetText}>Create new account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundWrapper>
  );
});

export default SignIn;
