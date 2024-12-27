import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const ProfileAvatar = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Image/Profile.png')}
        style={styles.avatar}
      />
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => console.log('Edit pressed')}
        activeOpacity={0.4}>
        <Feather name="edit-2" size={18} color="#4A5568" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '70%',
    height: '70%',
    borderRadius: 48,
  },
  editButton: {
    position: 'absolute',
    right: 35,
    bottom: 25,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProfileAvatar;
