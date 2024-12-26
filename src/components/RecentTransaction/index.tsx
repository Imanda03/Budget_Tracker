import {View, Text} from 'react-native';
import React from 'react';
import {createStyles} from './styles';
import {Avatar} from 'react-native-elements';
import {useTheme} from '../../utils/colors';

const RecentTransaction = () => {
  const styles = createStyles();
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Avatar
          size="medium"
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          iconStyle={styles.icon}
          containerStyle={styles.avatar}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Shopping T-shirt</Text>
          <Text style={styles.bottomText}>27 May, 1:14 PM</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.price, {color: theme.PRICE_ERROR}]}>
          - Rs 1000
        </Text>
      </View>
    </View>
  );
};

export default RecentTransaction;
