import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {useTheme} from '../../../utils/colors';
import {createStyles} from './styles';
import {Avatar} from 'react-native-elements';
import ProfileAvatar from '../../../components/ProfileAvatar';
import ProfileInformation from '../../../components/PersonalInformation';
import {MaterialIcons} from '../../../utils/Icon';
import {userLogout} from '../../../services/AuthService';
import {useToast} from '../../../context/ToastContext';
import {useAuth} from '../../../context/AuthContext';
import {AxiosError} from 'axios';
import {ApiError} from '../../../utils/types';

const ProfileScreen = () => {
  const styles = createStyles();
  const {theme} = useTheme();
  const {showToast} = useToast();
  const {logout} = useAuth();

  const {mutate, isLoading} = userLogout();

  const handleLogout = () => {
    mutate('', {
      onSuccess: response => {
        showToast(response.message, 'success');
        logout();
      },
      onError: (error: AxiosError<ApiError>) => {
        console.log('res===>', error?.response);
        if (error?.response?.data?.errors) {
          showToast(error.response.data.errors?.[0]?.message, 'error');
        } else {
          const errorMessage =
            error.response?.data?.message ||
            'Registration failed. Please try again.';
          showToast(errorMessage, 'error');
        }
      },
    });
  };

  return (
    <BackgroundWrapper>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.4}
          onPress={handleLogout}>
          <MaterialIcons name="logout" size={36} color={theme.TEXT} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <ProfileAvatar />
      </View>
      <ProfileInformation />
    </BackgroundWrapper>
  );
};

export default ProfileScreen;
