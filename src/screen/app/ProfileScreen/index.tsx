import {View, Text, Button} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {useTheme} from '../../../utils/colors';

const ProfileScreen = () => {
  const {setTheme} = useTheme();
  return (
    <BackgroundWrapper>
      <Button
        onPress={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
        title="Switch Mode"
      />
      <Text>ProfileScreen</Text>
    </BackgroundWrapper>
  );
};

export default ProfileScreen;
