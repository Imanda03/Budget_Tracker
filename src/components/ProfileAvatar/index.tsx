import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useQuery} from 'react-query';
import {getUserDetails} from '../../services/AuthService';

const ProfileAvatar = ({name}: {name?: string}) => {
  const {data, isLoading} = useQuery(['UserProfile'], getUserDetails, {
    enabled: true,
  });

  // const renderAvatar = imageUri ? (
  //   // <Image source={{uri: imageUri}} style={styles.avatar} />
  //   <Image
  //     source={require('../../assets/Image/Profile.png')}
  //     style={styles.avatar}
  //   />
  // ) : (
  //   <View style={styles.avatar}>
  //     <Text style={styles.avatarText}>A</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      {/* {renderAvatar} */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {data?.fullName?.charAt(0).toLocaleUpperCase()}
        </Text>
      </View>
      {/* <TouchableOpacity
        style={styles.editButton}
        onPress={() => console.log('Edit pressed')}
        activeOpacity={0.4}>
        <Feather name="edit-2" size={18} color="#4A5568" />
      </TouchableOpacity> */}
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A5568',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
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
