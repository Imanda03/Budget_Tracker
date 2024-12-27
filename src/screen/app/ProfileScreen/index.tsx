import {View, Text, Button} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {useTheme} from '../../../utils/colors';
import {createStyles} from './styles';
import {Avatar} from 'react-native-elements';
import ProfileAvatar from '../../../components/ProfileAvatar';
import ProfileInformation from '../../../components/PersonalInformation';

const ProfileScreen = () => {
  const styles = createStyles();
  const haveImage: boolean = false;

  return (
    <BackgroundWrapper>
      <View style={styles.headerContainer} />
      <View style={styles.avatarContainer}>
        <ProfileAvatar />
      </View>
      <ProfileInformation />
    </BackgroundWrapper>
  );
};

export default ProfileScreen;
