// ProfileScreen.tsx
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {useTheme} from '../../../utils/colors';
import {createStyles} from './styles';
import ProfileAvatar from '../../../components/ProfileAvatar';
import ProfileInformation from '../../../components/PersonalInformation';
import {MaterialIcons} from '../../../utils/Icon';
import {getUserDetails, userLogout} from '../../../services/AuthService';
import {useToast} from '../../../context/ToastContext';
import {useAuth} from '../../../context/AuthContext';
import {AxiosError} from 'axios';
import {ApiError} from '../../../utils/types';
import {useQuery, useQueryClient} from 'react-query';

const ProfileScreen = () => {
  const styles = createStyles();
  const {theme} = useTheme();
  const {showToast} = useToast();
  const {logout} = useAuth();
  const queryClient = useQueryClient();

  const {mutate: logoutMutate, isLoading} = userLogout();

  const {data: userDetails, refetch} = useQuery(
    ['UserProfile'],
    getUserDetails,
    {
      staleTime: 0, // Consider all data stale immediately
      cacheTime: 0, // Don't cache the data
    },
  );

  const handleLogout = () => {
    logoutMutate('', {
      onSuccess: response => {
        showToast(response.message, 'success');
        logout();
      },
      onError: (error: AxiosError<ApiError>) => {
        if (error?.response?.data?.errors) {
          showToast(error.response.data.errors?.[0]?.message, 'error');
        } else {
          const errorMessage =
            error.response?.data?.message || 'Logout failed. Please try again.';
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
          activeOpacity={0.2}
          onPress={handleLogout}>
          <MaterialIcons name="logout" size={36} color={theme.TEXT} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <ProfileAvatar name={userDetails?.currentUser?.fullName} />
      </View>
      <ProfileInformation onProfileUpdate={refetch} />
    </BackgroundWrapper>
  );
};

export default ProfileScreen;
